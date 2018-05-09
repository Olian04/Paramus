import { expect } from 'chai';

import { Paramus } from '../paramus';

import { ObjectStore } from './object';

describe('object store', () => {
    it('implements IStore', () => {
        const objStore = new ObjectStore();
        expect(objStore.type).to.equal('object');
        expect(typeof objStore.get).to.equal('function');
        expect(typeof objStore.set).to.equal('function');
        expect(typeof objStore.init).to.equal('function');
        expect(typeof objStore.snapshot).to.equal('function');
    });
    it('no unintended side effects', () => {
        const state = Paramus('object', {
            foo: 3, 
            bar: ''
         }, newState => {
            expect(newState.foo).to.equal(3);
            expect(newState.bar).to.equal('hello world');
         });
        expect(state.foo).to.equal(3);
        state.bar = 'hello world';
        expect(state.bar).to.equal('hello world');
    });
});