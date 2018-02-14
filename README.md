# Paramus

### MVP

`Paramus(initialState, options)`

```
const state = Paramus({
   foo: 3, 
   bar: 42
}, {
   onChange(newState, oldState, diffState) {
   },
   storeType: 'url' // url (default) | sessionStorage | localStorage | cookie | none | indexedDB | webSQL
});

console.log(state.foo); // 3
state.foo = 7;
console.log(state.foo); // 7

// URL
// localhost:8080?foo=7&bar=42
```
https://jsfiddle.net/rcbu9e29/27/

