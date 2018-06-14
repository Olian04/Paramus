import { expect } from 'chai';

import { TypeHandler, DataType } from './typehandler';

describe('typehandler', () => {
    it('number', () => {
        const th = TypeHandler();
        th.store('foo', 42);
        const type = th.fetch('foo');
        expect(type).to.equal(DataType.Number);
    });
    it('string', () => {
        const th = TypeHandler();
        th.store('foo', 'bar');
        const type = th.fetch('foo');
        expect(type).to.equal(DataType.String);
    });
    it('array', () => {
        const th = TypeHandler();
        th.store('foo', []);
        const type = th.fetch('foo');
        expect(type).to.equal(DataType.Array);
    });
    it('object', () => {
        const th = TypeHandler();
        th.store('foo', {});
        const type = th.fetch('foo');
        expect(type).to.equal(DataType.Object);
    });
    it('invalid', () => {
        const th = TypeHandler();
        const type = th.fetch('foo');
        expect(type).to.equal(DataType.Invalid);
    });
});