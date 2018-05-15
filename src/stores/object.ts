import { IStore } from '../index';

export class ObjectStore implements IStore {
    private state = {};
    public readonly id = 'object';
    public get(key: string): any {
        return this.state[key];
    }
    public set(key: string, value: any) {
        this.state[key] = value;
    }
    public init(initial: object) {
        this.state = initial;
    }
}

