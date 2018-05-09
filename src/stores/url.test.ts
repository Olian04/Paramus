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
        expect(typeof objStore.snapshot).to.equal('function');
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
});

describe('url store (?foo=2)', () => {
    jsdom({
        url: 'https://www.google.com?foo=2'
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
});