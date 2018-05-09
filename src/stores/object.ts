import { IStore } from '../index';

export class ObjectStore implements IStore {
    private state = {};
    public readonly type = 'object';
    public get(key: string): any {
        return this.state[key];
    }
    public set(key: string, value: any) {
        this.state[key] = value;
    }
    public init(initial: object) {
        this.state = initial;
    }
    public snapshot() {
        return this.state;
    }
}

