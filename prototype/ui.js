/**
 * UIに関するものを集める
 *
 * @author asada
 */
const WIN = 'あなたの勝ちです';
const LOSE = 'あなたの負けです';
const DRAW = '引き分けです';
const NOT_FINISH = '';

const ALREADY_PUT = 'そこはすでに埋まっています';
const NO_ERROR = '';

/**
 * 試合結果を表示する
 *
 * @param result 表示したいものを渡す
 */
const setResult = result => document.getElementById('result').innerHTML = result;

/**
 * ボードに駒を置く
 *
 * @param boardId 変えたいボードのID
 * @param state どう変えたいかを渡す
 */
const put = (boardId, state) => document.getElementById(boardId).innerHTML = state;

/**
 * HTML上のボードの状態を取得する
 */
const getGameBoard = () => {
    let gameBoard = new Array(3);
    for (let x = 0; x < 3; x++) {
        gameBoard[x] = new Array(3);
        for (let y = 0; y < 3; y++) {
            gameBoard[x][y] = document.getElementById(`${x + 1}${y + 1}`).innerHTML;
        }
    }
    return gameBoard;
};

/**
 * HTML上のボードの状態を取得する
 *
 * @param boardId 取得したいボードのID
 */
const getGameBoardById = boardId => {
    return document.getElementById(boardId).innerHTML;
};

/**
 * エラーを表示する。
 * または表示したエラーを削除する。
 *
 * @param message
 */
const printError = message => document.getElementById('error').innerHTML = message;