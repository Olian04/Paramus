# Paramus

`Paramus(initialState, options)`

```
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
   storeType: 'url', // url (default) | sessionStorage | localStorage | cookie | none | indexedDB | webSQL
   nestingSeparator: '.' // if the state contains other objects, this will be used as a deliminator to generate unique keys, ex: {foo: {bar: 3}, biz: 1} => ?foo.bar=3&biz=1
});

console.log(state.foo); // 3
state.foo = 7;
console.log(state.foo); // 7

// URL
// localhost:8080?foo=7&bar=42
```
https://jsfiddle.net/rcbu9e29/27/

