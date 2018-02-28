import { Internal, IParamus } from './index';

export { Store } from './index';
export const Paramus = Internal();

import { ObjectStore } from './stores/object';
Paramus.extend( new ObjectStore() );

