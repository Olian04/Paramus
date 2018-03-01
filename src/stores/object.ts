import { IParamus, Store } from '../index';

export class ObjectStore extends Store {
    private state = {};
    public readonly name = 'object';
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

