import { expect } from 'chai';

import { Paramus } from '../paramus';

import { ObjectStore } from './object';

describe('object store', () => {
    it('implements IStore', () => {
        const objStore = new ObjectStore();
        expect(objStore.id).to.equal('object');
        expect(typeof objStore.get).to.equal('function');
        expect(typeof objStore.set).to.equal('function');
        expect(typeof objStore.init).to.equal('function');
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

    it('arrays', () => {
        const state = Paramus('object', {
            arr: [1, 2, 3] 
         }, newState => {
            expect(newState.arr.length).to.equal(3);
         });
         expect(state.arr.length).to.equal(3);
         expect(state.arr[0]).to.equal(1);
         expect(state.arr[1]).to.equal(2);
         expect(state.arr[2]).to.equal(3);

         state.arr[0] = 2;
         expect(state.arr[0]).to.equal(2);
    });
});