**Tests:** [![CircleCI](https://circleci.com/gh/Olian04/Paramus.svg?style=svg)](https://circleci.com/gh/Olian04/Paramus)

# Paramus

Paramus is a state store for small web applications, with the goal to work in any stack in with any limitations. The purpose of Paramus is to provide persistent state storage in a none-intrusive way.

For example if your app relies on localstorage, then Paramus can run on the session storage. Or if your app relies on both local- and sessionstorage, then Paramus can run on the url, or in a cookie.

No matter what technologies your app uses, Paramus should be able to find a vacant technology to use for it self.

[Demo Fiddle (WIP)](https://jsfiddle.net/gh/get/library/pure/Olian04/Paramus/tree/master/demo)

__Help me help you:__ <a href="https://www.buymeacoffee.com/olian04" target="_blank"><img src="https://www.buymeacoffee.com/assets/img/custom_images/orange_img.png" alt="Buy Me A Coffee" style="height: auto !important;width: auto !important;" ></a>

## Install

__NPM:__ [npm i --save paramus](https://www.npmjs.com/package/paramus)

__CDN:__ `<script src="https://unpkg.com/paramus"></script>`

## API

### `Paramus(storeId: string, initState: T, onChange?: (state: T) => void): T`

```ts
import { Paramus } from 'paramus';

/* url | object | <Paramus.extend> + planned "cookie | localStorage |sessionStorage | indexedDB | webSQL"  */
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
      // Called when a new instance of Paramus is created
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
