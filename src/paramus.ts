import { Internal, IParamus } from './index';
export { IStore } from './index';

export const Paramus: IParamus = Internal();
export default Paramus;
declare global {
    interface Window {
        Paramus: IParamus;
    }
}
if (typeof window !== 'undefined') {
    window.Paramus = Paramus;
}

import { ObjectStore } from './stores/object';
Paramus.extend( new ObjectStore() );

import { UrlStore } from './stores/url';
Paramus.extend( new UrlStore() );
