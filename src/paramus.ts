import { Internal, IParamus } from './index';
export { IStore } from './index';

export const Paramus: IParamus = Internal();

import { ObjectStore } from './stores/object';
Paramus.extend( new ObjectStore() );

import { UrlStore } from './stores/url';
Paramus.extend( new UrlStore() );
