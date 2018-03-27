export abstract class Store {
  public abstract readonly name: string;
  abstract init(defaultState: object): void;
  abstract get(key: string): any;
  abstract set(key: string, value: any);
  abstract snapshot(): object;
}

export interface IOptions<T> {
  onChange(newState: T): void;
  onError(error: Error): void; // Add lots of try catch
  storeType: string;
}

const getDefaultOptions = <T>(): IOptions<T> => ({
  onChange: state => {},
  onError: err => { throw err; },
  storeType: 'object'
});

export interface IParamus {
  <T>(defaultState: T, options?: Partial<IOptions<T>>): T;
  extend(store: Store): void;
  snapshot<T>()
}

export const Internal = (): IParamus => {
  const stores: Store[] = [];
  const getStore = (name: string) => stores.find(s => s.name === name);

  const paramus: IParamus = function<T>(defaultState: T, options?: Partial<IOptions<T>>): T {
    const opts = {...getDefaultOptions<T>(), ...options};
    const store: Store = getStore(opts.storeType);

    const state = Object.assign({}, defaultState);

    const tmpState = Object.assign({}, defaultState);
    return Object.keys(state).reduce((res, k) => {
      Object.defineProperty(res, k, {
        get: () => state[k],
        set: (val) => {state[k] = val;}
      });
      return res;
    }, tmpState);
  }.bind(this) as any;

  paramus.extend = newStore => {
    stores.push(newStore);
  };
  return paramus;
}
