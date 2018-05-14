# [Paramus](https://www.npmjs.com/package/paramus)

Paramus is a persistent state-storage for small web applications

[Demo Fiddle (WIP)](https://jsfiddle.net/gh/get/library/pure/Olian04/Paramus/tree/master/demo)

## NPM
```
npm i --save paramus
```

## CDN

```html
<script src="https://unpkg.com/paramus"></script>
```

## API

### `Paramus<T>(storeId: string, initialState: T, onChangeCallback?: (state: T) => void): T`

```ts
import { Paramus } from 'paramus';

/* url | object | <Paramus.extend> + planned "sessionStorage | localStorage | cookie | indexedDB | webSQL"  */
const state = Paramus('url', {
   foo: 3, 
   bar: 42
}, newState => {
   // Triggers whenever a value is changed, ex: state.foo = 7
});

console.log( state.foo ); // 3
state.foo = 7;
console.log( state.foo ); // 7
```

## Adding your own store

### `Paramus.extend(newStore)`

```ts
Paramus.extend({
   id: 'object',
   init(initial: object) {
      // Called when a new instance of Paramus is created with the storeType equal to 'object'
      // initial is the state object passed to Paramus
   },
   get(key: string): any {
      // Called whenever a parameter is read from 
   },
   set(key: string, value: any) {
      // Called whenever a parameter is assigned to
   }
});
```


