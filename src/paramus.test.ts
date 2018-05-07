import { expect } from 'chai';
import jsdom from 'mocha-jsdom';

import { Paramus } from './paramus';

describe('API', () => {
    jsdom();

    it('no options', () => {
        const obj = Paramus({
            foo: 42,
            bar: 'hello world'
        });
        expect(obj.foo).to.equal(42);
        expect(obj.bar).to.equal('hello world');
    });
});