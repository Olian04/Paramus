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
   nestingSeparator: '.', // if the state contains other objects, this will be used as a deliminator to generate unique keys, ex: {foo: {bar: 3}, biz: 1} => ?foo.bar=3&biz=1
   immutableOnChange: false, // while false, changing the 'newState' object in the onChange callback will trigger an editional call to onChange. Aka: onChange(state) {state.foo++} will result in an infinate loop.
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
Paramus.storeType('url', {
   get(key: string): any { // TODO: The return type should reflect the value of key in defaultState
      // Called whenever a parameter is read from 
   },
   set(key: string, value: any) {
      // Called whenever a parameter is assigned to
   },
   init(defaultState: object) {
      // Called when a new instance of Paramus is instanciated with the storeType equal to 'url'
      // defaultState is the state object passed to Paramus
   }, 
   snapshot(): object {
      // Needs to return an object representation of the current state
      // The object strcture shoudl resemble the structure of the defaultState
      // Useful when testing
   }
});
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


