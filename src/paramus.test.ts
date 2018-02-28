import { expect } from 'chai';

import { Paramus } from './paramus';

it('no array + no object +  no options', () => {
    const obj = Paramus({
        foo: 42,
        bar: 'hello world'
    });
    expect(obj.foo).to.equal(42);
    expect(obj.bar).to.equal('hello world');
});