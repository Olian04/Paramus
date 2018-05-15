import { expect } from 'chai';
import jsdom from 'mocha-jsdom';

import { Paramus } from '../paramus';
import { LocalstorageStore } from './localstorage';

describe('localstorage store', () => {
    jsdom();

    before(() => {
        //@ts-ignore
        window.localStorage = window.sessionStorage = {
            getItem: function (key) {
                return this[key];
            },
            setItem: function (key, value) {
                this[key] = value;
            }
        };
    })

    it('implements IStore', () => {
        const objStore = new LocalstorageStore();
        expect(objStore.id).to.equal('localstorage');
        expect(typeof objStore.get).to.equal('function');
        expect(typeof objStore.set).to.equal('function');
        expect(typeof objStore.init).to.equal('function');
    });

    it('no unintended side effects', () => {
        const state = Paramus('localstorage', {
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
        const state = Paramus('localstorage', {
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