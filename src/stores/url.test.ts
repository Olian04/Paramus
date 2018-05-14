import { expect } from 'chai';
import jsdom from 'mocha-jsdom';

import { Paramus } from '../paramus';
import { UrlStore } from './url';

describe('url store (empty)', () => {
    jsdom({
        url: 'https://www.google.com'
    });

    it('implements IStore', () => {
        const objStore = new UrlStore();
        expect(objStore.type).to.equal('url');
        expect(typeof objStore.get).to.equal('function');
        expect(typeof objStore.set).to.equal('function');
        expect(typeof objStore.init).to.equal('function');
    });
    
    it('no unintended side effects', () => {
        const state = Paramus('url', {
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
        const state = Paramus('url', {
            arr: [1, 2, 3] 
         }, newState => {
             expect( Array.isArray(newState.arr) ).true;
             expect(newState.arr.length).to.equal(3);
         });

         expect( Array.isArray(state.arr) ).true;
         expect(state.arr.length).to.equal(3);
         expect(state.arr[0]).to.equal(1);
         expect(state.arr[1]).to.equal(2);
         expect(state.arr[2]).to.equal(3);

         state.arr[0] = 2;
         expect(state.arr).to.deep.equal([2, 2, 3]);

         state.arr.map(v => v * 2);
         expect(state.arr).to.deep.equal([2, 2, 3]);

         state.arr = state.arr.map(v => v * 2);
         expect(state.arr).to.deep.equal([4, 4, 6]);
    });
});

describe('url store (?foo=2&arr=3)', () => {
    jsdom({
        url: 'https://www.google.com?foo=2&arr=3'
    });

    it('no unintended side effects', () => {
        const state = Paramus('url', {
            foo: 3, 
            bar: ''
         }, newState => {
            expect(newState.foo).to.equal(2);
            expect(newState.bar).to.equal('hello world');
         });
        expect(state.foo).to.equal(2);
        state.bar = 'hello world';
        expect(state.bar).to.equal('hello world');
    });

    it('arrays', () => {
        const state = Paramus('url', {
            arr: [1, 2, 3] 
         }, newState => {
             expect( Array.isArray(newState.arr) ).true;
             expect(newState.arr.length).to.equal(1);
         });

         expect( Array.isArray(state.arr) ).true;
         expect(state.arr.length).to.equal(1);
         expect(state.arr[0]).to.equal(3);

         state.arr[0] = 1;
         expect(state.arr).to.deep.equal([1]);
    });
});