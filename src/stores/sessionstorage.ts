import { IStore } from '../index';

export class SessionstorageStore implements IStore {
    public readonly id = 'sessionstorage';
    public init(initial: object) {
        Object.keys(initial).forEach(k => {
            window.sessionStorage.setItem(k, initial[k]);
        })
    }
    public get(key: string): any {
        return window.sessionStorage.getItem(key);
    }
    public set(key: string, value: any) {
        window.sessionStorage.setItem(key, value);
    }
}

