const assert = require("assert");
const localmodule = require('../src/localmodule');

//describeはフォルダ、第一引数はフォルダ名のような感覚。
describe('local module', function () {     // "describe"を記述すると
    // テスト結果が分かりやすくなります
    describe('helloSync', function () {
        /*
        it()の中では、アサーションと呼ばれる関数を使い、テストを実施する
        第一引数はテスト項目の説明をする。
        第二引数はテストを実施する関数を渡す。
        */
        it('引数に応じて決まった文字列を返すこと', function () {
            assert.equal(localmodule.helloSync('taro'), 'Hello taro');
        });
    });

    describe('hello', function () {
        it('引数に応じてコールバック内で決まった文字列になること', function (done) {
            localmodule.hello('hanako', function (name) {
                assert.equal(name, 'Hello hanako');
                done();
            });
        });
    });

    describe('fail', function () {
        it('失敗してみる', function () {
            assert.fail();
        })
    })
})
