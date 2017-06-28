import { game } from './app';

/**
 * コンピュータのプレイヤー
 *
 * @author asada
 */

const DEFAULT_SCORE = -1;

class Cpu {
    constructor(playerId) {
        this.playerId = playerId;
    }

    /**
     * CPUがボードに何を置くか決めるメソッド
     *
     * @throws {Error} CPUを継承してselectByCpuメソッドを実装しない場合にスローする
     */
    selectByCpu() {
        throw Error('不正なCPUが呼ばれました。');
    }
}

/**
 * 弱いCPU
 *
 * @author asada
 */
export class EasyCpu extends Cpu {
    constructor(playerId) {
        super(playerId);
    }

    selectByCpu() {
        let x, y;
        do {
            let random = Math.floor(Math.random() * game.board.getOneSideLength() * game.board.getOneSideLength());
            x = Math.floor(random / board.oneSideLength);
            y = random % game.board.oneSideLength;
        } while (game.board.isAlreadyPut(x, y));
        game.board.put(x, y, this.playerId);
    }
}