import { PlayerChar, Ui } from './ui.js';
import HumanPlayer from './humanPlayer.js';
import { EasyCpu } from './cpu.js';
import { CpuLevel } from './cpuLevel.js';

export const GameState = Object.freeze({ END: 'end', NOT_END: 'notEnd', DRAW: 'draw' });

/**
 * OXGameクラス
 * 
 * @author asada
 */
export class OXGame {
    constructor(board, players, rootNode) {
        this.board = board;
        this.players = players;

        const el = createDOM(this);
        if (rootNode !== undefined) {
            console.log('未実装です。ごめんね。');
        } else {
            document.getElementById('root').appendChild(el);
        }
        this.init();
    }

    /**
     * ゲームの初期化を行う
     */
    init() {
        this.board.init();

        this.nowPlayer = this.players[0];

        //TODO while文にしないと Cpu Vs Cpu の場合に処理がストップすることになる。
        if (!(this.nowPlayer instanceof HumanPlayer)) {
            //CPUが先行の場合。
            this.nowPlayer.select(this.board);
            this.nowPlayer = this.getNextPlayer();
        }
        Ui.printBoard(this.board);

        //ゲームの状態
        this.state = GameState.NOT_END;
    }

    /**
     * 勝負の結果がついたか判定する
     */
    judge() {
        //TODO ここの処理は二回書いてあるので、一回にしたい。
        this.state = this.board.checkGameEnd(this.nowPlayer.playerId);
        Ui.printBoard(this.board);
        switch (this.state) {
            case GameState.END: {
                Ui.printResultMessage(GameState.END, this.nowPlayer.playerId);
                return;
            }
            case GameState.NOT_END: {
                break;
            }
            case GameState.DRAW: {
                Ui.printResultMessage(GameState.DRAW);
                return;
            }
            default:
                throw new Error('checkGameEndの戻り値が予期されないものでした。');
        }
        this.nowPlayer = this.getNextPlayer();

        //TODO while文にしないとHumanVsCpuVsCpuの場合に処理がストップすることになる。
        if (!(this.nowPlayer instanceof HumanPlayer)) {
            this.nowPlayer.select(this.board);
            this.board.checkGameEnd(this.nowPlayer.playerId);
            Ui.printBoard(this.board);
        }

        //TODO ここの処理は二回書いてあるので、一回にしたい。
        this.state = this.board.checkGameEnd(this.nowPlayer.playerId);
        Ui.printBoard(this.board);
        switch (this.state) {
            case GameState.END: {
                Ui.printResultMessage(GameState.END, this.nowPlayer.playerId);
                return;
            }
            case GameState.NOT_END: {
                break;
            }
            case GameState.DRAW: {
                Ui.printResultMessage(GameState.DRAW);
                return;
            }
            default:
                throw new Error('checkGameEndの戻り値が予期されないものでした。');
        }
        this.nowPlayer = this.getNextPlayer();
    }

    getNextPlayer() {
        return this.players[this.board.times % this.players.length];
    }
}

/**
 * index.htmlのコンテンツを作る。
 *
 * @param oxGame OXGameのオブジェクトを渡す。
 * @returns {Element} index.htmlのコンテンツを返す。
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
        //TODO CPUが複数いたとして、全部を一度に変更してしまうので注意
        for (let i = 0; i < oxGame.players.length; i++) {
            if (!(oxGame.players[i] instanceof HumanPlayer)) {
                switch (document.getElementById('CpuLevel').value) {
                    case CpuLevel.EASY:
                        oxGame.players[i] = new EasyCpu(2);
                        break;

                    default:
                        throw new Error('存在しないCPUが選択されました。');
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
        //buttonの表示でプレイヤーキャラを使う
        button.innerHTML = PlayerChar[0];
        button.addEventListener('click', () => {
            if (oxGame.state === GameState.NOT_END) {
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