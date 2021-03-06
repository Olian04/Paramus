import { TypeHandler, DataType } from "./typehandler";

export interface IStore {
  readonly id: string;
  init(defaultState: object, types: {[key: string]: DataType}): void;
  get(key: string, type: DataType): any;
  set(key: string, value: any, type: DataType);
}

export interface IParamus {
  <T>(storeId: string, defaultState: T, onChangeCb?: (state: T) => void): T;
  extend(store: IStore): void;
}

export const Internal = (): IParamus => {
  const typeHandler = TypeHandler();
  const stores: { [k: string]: IStore } = {};
  const getStore = (id: string) => stores[id.toLowerCase()];

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
    Object.keys(defaultState).forEach(k => typeHandler.store(k, defaultState[k]));
    store.init(defaultState, typeHandler.snapshot());

    let stateProxy: T;
    const update = (key, value) => {
      store.set(key, value, typeHandler.fetch(key));
      onChangeCb(stateProxy);
    };
    
    stateProxy = Object.keys(defaultState).reduce((res, k) => {
      Object.defineProperty(res, k, {
        get: () => {
          const v = store.get(k, typeHandler.fetch(k));
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

    onChangeCb(stateProxy);
    return stateProxy;
  }.bind(this) as any;

  paramus.extend = newStore => {
    stores[newStore.id.toLowerCase()] = newStore;
  };
  
  return paramus;
}
