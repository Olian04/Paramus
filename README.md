# Paramus

Default value can be a string, a number, a boolean or an array of any one of those types. 
Stretch: objects (iterate through every key and do the basic bind on each) 

```
const state = Paramus(defaultsObject);

const Paramus = StateObserver(initStateObj, onChangeCallback);
// Setup a state container with a specific initial state and a callback on changes

//ex:
const Paramus = StateObserver(() => ({
  foo: [42],
  ‎biz: 'hello'
}), state => console.log(state));

const state = Paramus({
   foo: [1, 2, 3],
   ‎bar: 3, 
   ‎baz: 42
});

state.baz( 7 ); // logs { foo: [42], bar: 3, baz: 7} 
```

```
//API:
const foo = Paramus('foo', 3);
let f = foo(); // f === 3
f = foo(42); //  f === 42
```

```
//Internal mock:
const createParamus = store => (key, initValue) => {
   let value = store.get(key) || initValue;
   ‎return (...args) => {
   ‎   if(args.length > 0) {
   ‎				value = args[0];
   ‎        store.set(key, value);
   ‎   } 
   ‎   return value;
   ‎} 
} 
const data = Symbol('data');
const createParams = getUrl => ({
  [data]: parseParams(getUrl()), 
   get(key) {
   ‎   return this[data][key];
   ‎}, 
   ‎set(key, value) {
   ‎   this[data][key] = value;
   ‎   return this[data][key];
   ‎}
});

const Params = createParams( () => {
  return 'www.google.com?q=42&w=hello' ;
});

const Paramus = createParamus(Params);
```
