export interface IStore {
  readonly type: string;
  init(defaultState: object): void;
  get(key: string): any;
  set(key: string, value: any);
  snapshot(): object;
}

export interface IParamus {
  <T>(storeType: string, defaultState: T, onChangeCb: (state: T) => void): T;
  extend(store: IStore): void;
  snapshot<T>()
}

export const Internal = (): IParamus => {
  const stores: IStore[] = [];
  const getStore = (type: string) => stores.find(s => s.type === type);

  const paramus: IParamus = function<T extends object>(
        storeType: string, 
        defaultState: T, 
        onChangeCb: (state: T) => void): T {

    const store: IStore = getStore(storeType);
    if (store === undefined) {
      throw new Error(`Couldn't find store of type ${storeType}`);
    }
    store.init(defaultState);
    
    return Object.keys(defaultState).reduce((res, k) => {
      Object.defineProperty(res, k, {
        get: () => store.get(k),
        set: (val) => { 
          store.set(k, val); 
          onChangeCb(<T>store.snapshot());
        }
      });
      return res;
    }, Object.assign({}, defaultState));
  }.bind(this) as any;

  paramus.extend = newStore => {
    stores.push(newStore);
  };
  
  return paramus;
}
