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

## Adding your own store
### `Paramus.extend(extension: Store)`

```ts
export class ObjectStore extends Store {
    public readonly name = 'object';
    public init(initial: object) {
      // Called when a new instance of Paramus is created with the storeType equal to <this.name>
      // defaultState is the state object passed to Paramus
    }
    public get(key: string): any {
      // Called whenever a parameter is read from 
    }
    public set(key: string, value: any) {
      // Called whenever a parameter is assigned to
    }
    public snapshot() {
        // Needs to return an object representation of the current state
        // Used to call onChange
    }
}
Paramus.extend( new ObjectStore() );
```


