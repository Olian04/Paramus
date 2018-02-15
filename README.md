# Paramus

Note to self: Design system with different storeTypes in mind. Maybe like a plugin system.

`Paramus(initialState, options)`

```js
const state = Paramus({
   foo: 3, 
   bar: 42
}, {
   onChange(newState, oldState, diffState) {
      // Triggers whenever a value is changed, ex: state.foo = 42
   },
   onAccessed(key, value) {
      // Triggers when a value is accessed, ex: state.foo
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
`Paramus.storeType(name, extentionpoints);`

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
