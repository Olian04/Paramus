# Paramus

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

### `Paramus(storeType: string, initialState: object, onChangeCallback: newState => void)`

```ts
import { Paramus } from 'paramus';

/* url | object | <Paramus.extend> + planned "sessionStorage | localStorage | cookie | indexedDB | webSQL"  */
const state = Paramus('url', {
   foo: 3, 
   bar: 42
}, newState => {
   // Triggers whenever a value is changed, ex: state.foo = 42
   // any changes made to  newState won't persist
});

console.log( state.foo ); // 3
state.foo = 7;
console.log( state.foo ); // 7
```

## Adding your own store

### `Paramus.extend(extension: Store)`

```ts
class ObjectStore implements Store {
    public readonly name = 'object';
    public init(initial: object) {
      // Called when a new instance of Paramus is created with the storeType equal to 'object'
      // initial is the state object passed to Paramus
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


