import { Result, SquareBoard } from './board.js';
import { PlayerChar, Ui } from './ui.js';
import HumanPlayer from './humanPlayer.js';
import { EasyCpu, TestCpu } from './cpu.js';
import { CpuLevel } from './cpuLevel.js';

/**
 * OXGameクラス
 * 
 * @author asada
 */
class OXGame {
    constructor(board, players) {
        this.board = board;
        this.players = players;

        const el = createDOM(this);
        document.getElementById('root').appendChild(el);

        this.init();
    }

    init() {
        this.board.init();

        this.nowPlayer = this.players[0];

        //TODO while文にしないとCpuVsCpuの場合に処理がストップすることになる。
        if (!(this.nowPlayer instanceof HumanPlayer)) {
            //CPUが先行の場合。
            this.nowPlayer.select(this.board);
            this.nowPlayer = this.getNextPlayer();
        }
        Ui.printBoard(this.board);

        this.state = Result.NOT_END;
    }

    judge() {
        this.state = this.board.checkGameEnd(this.nowPlayer.playerId);
        switch (this.state) {
            case Result.END: {
                Ui.printBoard(this.board);
                Ui.printResultMessage(Result.END, this.nowPlayer.playerId);
                return;
            }
            case Result.NOT_END: {
                break;
            }
            case Result.DRAW: {
                Ui.printBoard(this.board);
                Ui.printResultMessage(Result.DRAW);
                return;
            }
            default:
                throw new Error('checkGameEndの戻り値が予期されないものでした。');
        }

        this.nowPlayer = this.getNextPlayer();

        if (!(this.nowPlayer instanceof HumanPlayer)) {
            this.nowPlayer.select(this.board);
            this.board.checkGameEnd(this.nowPlayer.playerId);
            Ui.printBoard(this.board);
        }

        this.state = this.board.checkGameEnd(this.nowPlayer.playerId);
        switch (this.state) {
            case Result.END: {
                Ui.printBoard(this.board);
                Ui.printResultMessage(Result.END, this.nowPlayer.playerId);
                return;
            }
            case Result.NOT_END: {
                break;
            }
            case Result.DRAW: {
                Ui.printBoard(this.board);
                Ui.printResultMessage(Result.DRAW);
                return;
            }
            default:
                throw new Error('checkGameEndの戻り値が予期されないものでした。');
        }

        this.nowPlayer = this.getNextPlayer();

        Ui.printBoard(this.board);
    }

    getNextPlayer() {
        return this.players[this.board.times % this.players.length];
    }
}

export function OXGame3by3HumanVsCpu() {
    const board = new SquareBoard(3);
    const players = [new HumanPlayer(1), new EasyCpu(2)];
    return new OXGame(board, players);
}

export function OXGame3by3CpuVsHuman() {
    const board = new SquareBoard(3);
    const players = [new EasyCpu(1), new HumanPlayer(2)];
    return new OXGame(board, players);
}

/**
 * index.htmlのコンテンツを作る。
 *
 * @param oxGame OXGameのオブジェクトを渡す。
 * @returns {Element} index.htmlの要素を返す。
 */
function createDOM(oxGame) {
    const divClassContent = document.createElement('div');
    divClassContent.className = 'content';

    divClassContent.appendChild(createTitle());

    divClassContent.appendChild(createCpuLevelSelectBox(oxGame));

    divClassContent.appendChild(createGameBoard(oxGame));

    divClassContent.appendChild(createResetButton(oxGame));

    return divClassContent;
}

function createTitle() {
    const title = document.createElement('h1');
    title.innerHTML = '○×ゲーム';
    return title;
}

function createCpuLevelSelectBox(oxGame) {
    const pTag = document.createElement('p');
    pTag.innerHTML = 'CPUの難易度:';

    //セレクトボックスを作る
    const select = document.createElement('select');
    select.id = 'CpuLevel';
    select.addEventListener('change', () => {
        //CpuをoxGame.playersから見つけてきて、中身を変更する。
        for (let i = 0; i < oxGame.players.length; i++) {
            if (!(oxGame.players[i] instanceof HumanPlayer)) {
                switch (document.getElementById('CpuLevel').value) {
                    case CpuLevel.EASY:
                        oxGame.players[i] = new EasyCpu(2);
                        break;

                    case CpuLevel.TEST:
                        oxGame.players[i] = new TestCpu(2);
                        break;

                    default:
                        window.alert('存在しないCPUが選択されました。');
                }
            }
        }
        oxGame.init();
    });

    //オプションを作る
    for (let value of Object.keys(CpuLevel)) {
        let option = document.createElement('option');
        option.value = CpuLevel[value];
        option.innerHTML = CpuLevel[value];
        select.appendChild(option);
    }

    pTag.appendChild(select);
    return pTag;
}

function createGameBoard(oxGame) {
    const fragment = document.createDocumentFragment();

    //pタグで段落をつける
    let pTag = document.createElement('p');
    for (let i = 0; i < oxGame.board.verticalLength * oxGame.board.horizontalLength; i++) {
        if (i % oxGame.board.horizontalLength === 0) {
            pTag = document.createElement('p');
        }

        let button = document.createElement('button');
        button.id = `${i}`;
        //buttonの表示でプレイヤーキャラを使うので注意。
        button.innerHTML = PlayerChar[0];
        button.addEventListener('click', () => {
            if (oxGame.state === Result.NOT_END) {
                oxGame.nowPlayer.select(oxGame.board, Ui, Math.floor(i / oxGame.board.verticalLength), i % oxGame.board.verticalLength);
                oxGame.judge();
            }
        });

        pTag.appendChild(button);
        fragment.appendChild(pTag);
    }
    return fragment;
}

function createResetButton(oxGame) {
    const resetButton = document.createElement('button');
    resetButton.innerHTML = 'リセット';
    resetButton.addEventListener('click', () => {
        oxGame.init();
    });
    return resetButton;
}