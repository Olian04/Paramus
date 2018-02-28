import { expect } from 'chai';

import { Paramus } from '../paramus';

it('storeType === "object"', () => {
    const obj = Paramus({
        foo: 42,
        bar: 'hello world'
    }, {
        storeType: 'object'
    });
    expect(obj.foo).to.equal(42);
    expect(obj.bar).to.equal('hello world');
});