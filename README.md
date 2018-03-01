# Paramus

`Paramus<T>(initialState: T, options: IOptions)`

```ts
const state = Paramus({
   foo: 3, 
   bar: 42
}, {
   onChange(newState) {
      // Triggers whenever a value is changed, ex: state.foo = 42
   },
   onError(error) {
      // Triggers whenever an unexpected error is thrown
   },
   storeType: 'url', // url (default) | sessionStorage | localStorage | cookie | object | indexedDB | webSQL
});

console.log( state.foo ); // 3
state.foo = 7;
console.log( state.foo ); // 7


console.log( Paramus.snapshot(state) ); // foo=7&bar=42
```
https://jsfiddle.net/rcbu9e29/27/

## Extend Paramus
### `Paramus.storeType(storeType: string, extensionPoints: IExtensionPoints)`

```ts
export class ObjectStore extends Store {
    public readonly name = 'object';
    public get(key: string): any {
      // Called whenever a parameter is read from 
    }
    public set(key: string, value: any) {
      // Called whenever a parameter is assigned to
    }
    public init(initial: object) {
      // Called when a new instance of Paramus is instanciated with the storeType equal to 'url'
      // defaultState is the state object passed to Paramus
    }
    public snapshot() {
        // Needs to return an object representation of the current state
        // Used to call onChange
    }
}
Paramus.storeType( new ObjectStore() );
```

### `Paramus.proxy(event: string, callback: (...args: any[]) => any)`

```ts
Paramus.proxy('onChange', state => {
   // Trigger order:
   // 1. storeType.set
   // 2. proxy.onChange
   // 3. options.onChange
});
```

Events: 
* `onSnapshot`
* `onChange`
* `onError`


