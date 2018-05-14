export interface IStore {
  readonly id: string;
  init(defaultState: object): void;
  get(key: string): any;
  set(key: string, value: any);
}

export interface IParamus {
  <T>(storeId: string, defaultState: T, onChangeCb?: (state: T) => void): T;
  extend(store: IStore): void;
}

export const Internal = (): IParamus => {
  const stores: IStore[] = [];
  const getStore = (id: string) => stores.find(s => s.id === id);

  const paramus: IParamus = function<T extends object>(
        storeId: string, 
        defaultState: T, 
        onChangeCb?: (state: T) => void): T {

    if (onChangeCb === undefined) {
      onChangeCb = () => undefined;
    }
    const store: IStore = getStore(storeId);
    if (store === undefined) {
      throw new Error(`Couldn't find store with id "${storeId}".`);
    }
    store.init(defaultState);

    let stateProxy: T;
    const update = (key, value) => {
      store.set(key, value);
      onChangeCb(stateProxy);
    };
    
    stateProxy = Object.keys(defaultState).reduce((res, k) => {
      Object.defineProperty(res, k, {
        get: () => {
          const v = store.get(k);
          if ( Array.isArray(v) ) {
            // Return a proxy that watches for calls like arr[...]
            return new Proxy(v, {
              set: (arr, k_, v_) => {
                  v[k_] = v_;
                  update(k, v);
                  return true;
              }
            });
          } else {
            return v;
          }
        },
        set: (val) => { 
          update(k, val);
        }
      });
      return res;
    }, Object.assign({}, defaultState));

    return stateProxy;
  }.bind(this) as any;

  paramus.extend = newStore => {
    stores.push(newStore);
  };
  
  return paramus;
}
