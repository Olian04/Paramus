import { isString, isObject, isArray, isNumber } from "util";

export interface ITypeHandler {
    store: (key: string, value: any) => void;
    fetch: (key: string) =>  DataType;
    snapshot(): {[key: string]: DataType};
}

export enum DataType {
    String = 'string', 
    Number = 'number', 
    Array = 'array', 
    Object = 'object', 
    Invalid = 'invalid'
}

export function TypeHandler(): ITypeHandler {
    const typeStore: { [key: string]: DataType } = {};
    return {
        store(k, v) {
            if (isNumber(v)) {
                typeStore[k] = DataType.Number;
            } else if (isString(v)) {
                typeStore[k] = DataType.String;
            } else if (isArray(v)) {
                typeStore[k] = DataType.Array;
            } else if (isObject(v)) {
                typeStore[k] = DataType.Object;
            }  else {
                typeStore[k] = DataType.Invalid;
            }
        },
        fetch(key) {
            const type = typeStore[key] ? typeStore[key] : DataType.Invalid;
            return type
        },
        snapshot() {
            return Object.assign({}, typeStore);
        }
    };
}