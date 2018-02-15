# Paramus

`Paramus(initialState, options)`

```js
const state = Paramus({
   foo: 3, 
   bar: 42
}, {
   onChange(newState) {
      // Triggers whenever a value is changed, ex: state.foo = 42
   },
   onLoad(state, foundOldState) {
      // Triggers when the state is ready, foundOldState is true if paramus could load an old state
   },
   onError(error) {
      // Triggers whenever an unexpected error is thrown
   },
   storeType: 'url', // url (default) | sessionStorage | localStorage | cookie | object | indexedDB | webSQL
   nestingSeparator: '.' // if the state contains other objects, this will be used as a deliminator to generate unique keys, ex: {foo: {bar: 3}, biz: 1} => ?foo.bar=3&biz=1
});

console.log( state.foo ); // 3
state.foo = 7;
console.log( state.foo ); // 7


console.log( Paramus.snapshot(state) ); // foo=7&bar=42
```
https://jsfiddle.net/rcbu9e29/27/

## Extend Paramus
### `Paramus.storeType(storeTypeName, extensionPoints)`

```js
Paramus.storeType('url', {
   get(key) {
      // Called whenever a parameter is read from 
   },
   set(key, value) {
      // Called whenever a parameter is assigned to
   },
   load(defaultState) {
      // Called when a new instance of Paramus is instanciated with the storeType equal to 'url'
      // defaultState is the state object passed to Paramus
   }, 
   snapshot() {
      // Needs to return a string representation of the current state
      // Useful when testing or logging entire state
   }
});
```

### `Paramus.proxy(eventName, callback)`

```js
Paramus.proxy('onChange', state => {
   // Triggers prior to the onChange provided in the options object to Paramus
   // Trigger order:
   // 1. storeType.set
   // 2. proxy.onChange
   // 3. options.onChange
});
```

Events: 
* `onAccessed`
* `onChange`
* `onLoad`
* `onError`


