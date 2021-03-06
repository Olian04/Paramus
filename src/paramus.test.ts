import { expect } from 'chai';

import { Paramus } from './paramus';

describe('init / get / set', () => {
    it('recursive assignment', () => {
        const state = Paramus('object', {
            foo: 0
         }, newState => {
             if (newState.foo < 3) {
                 newState.foo++;
             }
             expect(newState.foo).to.equal(3);
         });
        expect(state.foo).to.equal(3);
    });

    it('single value', () => {
        Paramus.extend({
            id: 'test',
            get(key) {    
                expect(key).to.equal('foo'); 
            },
            set(key, value) { 
                expect(key).to.equal('foo'); 
                expect(value).to.equal(1); 
            },
            init(initial) {
                expect(initial).to.have.key('foo');
                expect(initial['foo']).to.equal(0); 
            }
        });
        const state = Paramus('test', {
            foo: 0
         });
        state.foo;
        state.foo = 1;
    });

    it('array', () => {
        Paramus.extend({
            id: 'test',
            get(key) {    
                expect(key).to.equal('foo'); 
                return [1, 2]; // state.foo[0] = 2; <=> v = state.get('foo'); v[0] = 2; state.set('foo', v);
            },
            set(key, value) { 
                expect(key).to.equal('foo'); 
                expect(value).to.deep.equal([2, 2]); 
            },
            init(initial) {
                expect(initial).to.have.key('foo');
                expect(initial['foo']).to.deep.equal([1, 2]); 
            }
        });
        const state = Paramus('test', {
            foo: [1, 2]
         });
        state.foo;
        state.foo[0] = 2;
    });
});