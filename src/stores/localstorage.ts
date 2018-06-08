import { IStore } from '../index';
import { DataType } from '../typehandler';

export class LocalstorageStore implements IStore {
    public readonly id = 'localstorage';
    public init(initial: object, types: {[key: string]: DataType}) {
        Object.keys(initial).forEach(k => {
            window.localStorage.setItem(k, initial[k]);
        })
    }
    public get(key: string, type: DataType): any {
        const val = window.localStorage.getItem(key);
        switch(type) {
            case DataType.Number:
                break;
            case DataType.Array:
                return JSON.parse(`{ "x": ${val}}`).x;
            case DataType.String:
                return val;
            case DataType.Object:
                throw new Error('Not yet implemented!');
            case DataType.Invalid:
                throw new Error('Invalid type!');
        }
        
    }
    public set(key: string, value: any, type: DataType) {
        window.localStorage.setItem(key, value);
    }
}

