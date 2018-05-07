# Paramus

`Paramus(initialState: object, onChangeCallback: (newState) => void, storeType?: string)`

```ts
const state = Paramus({
   foo: 3, 
   bar: 42
}, newState => {
   // Triggers whenever a value is changed, ex: state.foo = 42
}, 'url');
/* url (default) | sessionStorage | localStorage | cookie | object | indexedDB | webSQL */

console.log( state.foo ); // 3
state.foo = 7;
console.log( state.foo ); // 7
```
https://jsfiddle.net/rcbu9e29/27/

## Adding your own store
### `Paramus.extend(extension: Store)`

```ts
export class ObjectStore implements Store {
    public readonly name = 'object';
    public init(initial: object) {
      // Called when a new instance of Paramus is created with the storeType equal to 'object'
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


