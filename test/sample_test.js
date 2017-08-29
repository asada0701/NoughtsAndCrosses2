import assert from 'power-assert'
import Cat from '../src/cat'

describe('Cat', () => {
    var tama;
    beforeEach(() => {
        tama = new Cat('tama')
    });

    describe("greet()", () => {
        it("挨拶をする", () => {
            assert.equal(tama.greet(), 'Nyaaaan! I am neko');
        });
    });
});