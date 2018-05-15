import { IStore } from '../index';

export class LocalstorageStore implements IStore {
    public readonly id = 'localstorage';
    public init(initial: object) {
        Object.keys(initial).forEach(k => {
            window.localStorage.setItem(k, initial[k]);
        })
    }
    public get(key: string): any {
        return window.localStorage.getItem(key);
    }
    public set(key: string, value: any) {
        window.localStorage.setItem(key, value);
    }
}

