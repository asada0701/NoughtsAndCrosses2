// const assert = require("power-assert");
// //const localmodule = require('../src/localmodule');
// const EasyCpu = require('../src/cpu');

const assert = require('assert');
import { EasyCpu } from '../src/cpu'

describe('cpu', function () {
    it('コンストラクタのテスト', function () {
        let cpu = new EasyCpu(1);
        assert.equal(cpu.playerId, 1);
    })
})
