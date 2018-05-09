import { IStore } from '../index';

const getParams = () => {
    const fixType = val => isNaN(val) ? decodeURI(val) :  parseFloat(val);
    return window.location.search
        .slice(1) // remove leading ? (question mark)
        .split('&') // each pair is separated by an & symbol
        .map(v => v.split('=')) // each pair consists of a key and a value with an = sign between
        .reduce((res, [k, v]) => {
            if ( res[k] ) {
                if ( Array.isArray(res[k]) ) {
                    res[k] = [...res[k], fixType(v)];
                } else {
                    res[k] = [res[k], fixType(v)];
                }
            } else {
                if (typeMap[k] === 'array') {
                    res[k] = [ fixType(v) ];
                } else {
                    res[k] = fixType(v);
                }
            }
            return res;
        }, {}); // restructure into an object instead of a 2D list
}

const typeMap = {};

const setParams = obj => {
    const str = '?' + Object.keys(obj).map(k => {
        if ( Array.isArray(obj[k]) ) {
            return obj[k].map(v => `${k}=${v}`).join('&')
        } else {
            return `${k}=${obj[k]}`
        }
    }).join('&');
    history.pushState({}, document.title, str);
}

export class UrlStore implements IStore {
    private cache = {};
    public readonly type = 'url';
    public init(initial: object) {
        const prev_params = getParams();
        const new_params = Object.keys(initial).map(k => {
            if (Array.isArray(initial[k])) {
                typeMap[k] = 'array';
            }
            if (prev_params[k]  !== undefined) {
                if (Array.isArray(initial[k]) && !Array.isArray(prev_params[k])) {
                    return [k, [prev_params[k]]];
                } else {
                    return [k, prev_params[k]];
                }
            } else {
                return [k, initial[k]];
            }
        }).reduce((res, [k, v]) => {
            res[k] = v;
            return res;
        },{});
        this.cache = {...prev_params, ...new_params};
        setParams(this.cache);
    }
    public get(key: string): any {
        return this.cache[key];
    }
    public set(key: string, value: any) {
        this.cache[key] = value;
        setParams(this.cache);
    }
    public snapshot() {
        this.cache = getParams();
        return this.cache;
    }
}

