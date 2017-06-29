/**
 * コンピュータのプレイヤー
 *
 * @author asada
 */
class Cpu {
    constructor(playerId) {
        this.playerId = playerId;
    }

    /**
     * CPUがボードに何を置くか決めるメソッド
     *
     * @throws {Error} Cpuを継承してselectメソッドを実装しない場合にスローする
     */
    select() {
        throw Error('不正なCPUが呼ばれました。');
    }
}

export class EasyCpu extends Cpu {
    constructor(playerId) {
        super(playerId);
    }

    select(board) {
        let x, y;
        do {
            x = Math.floor(Math.random() * board.verticalLength);
            y = Math.floor(Math.random() * board.horizontalLength);
        } while (board.isAlreadyPut(x, y));
        board.put(x, y, this.playerId);
    }
}