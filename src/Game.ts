export interface Coordinates {
    X: number;
    Y: number;
}

export enum Player {
    playerOne = 'X',
    playerTwo = 'O',
}

export class Game {
    private _lastPlayer?: Player = undefined;
    private _board: Board = new Board();

    public Play(coordinates: Coordinates): void {
        const player = this.setCurrentPlayer();
        this.guardAgainstPlayingOnAnOccupiedPosition(coordinates);
        this.setLastPlayer(player);
        this.addTileToBoard(player, coordinates);
    }

    public Winner(): Player | undefined {
        return this.getRowWinner(1) || this.getRowWinner(2) || this.getRowWinner(3);
    }

    private getRowWinner(rowNumber: number): Player | undefined {
        if (this._board.TileAt({X: rowNumber - 1, Y: 0}).Symbol
            && this._board.TileAt({X: rowNumber - 1, Y: 0}).Symbol === this._board.TileAt({X: rowNumber - 1, Y: 1}).Symbol
            && this._board.TileAt({X: rowNumber - 1, Y: 2}).Symbol === this._board.TileAt({X: rowNumber - 1, Y: 1}).Symbol) {
            return this._board.TileAt({X: rowNumber - 1, Y: 0}).Symbol;
        }

        return undefined;
    }

    private guardAgainstPlayingOnAnOccupiedPosition(coordinates : Coordinates):void {
        if (this._board.TileAt(coordinates).Symbol) {
              throw new Error("Invalid position");
        }
    }

    private isFirstMove(): boolean {
        return !this._lastPlayer;
    }

    private isFirstPlayer(player: Player): boolean {
        return player === Player.playerOne;
    }

    private setLastPlayer(player: Player): void {
        this._lastPlayer = player;
    }

    private getLastPlayer(): Player | undefined {
       return this._lastPlayer;
    }

    private addTileToBoard(player: Player, coordinates: Coordinates): void {
        this._board.AddTileAt(player, coordinates);
    }

    private setCurrentPlayer(){
        if(this.isFirstMove()){
            return Player.playerOne;
        }

        if(this.getLastPlayer() === Player.playerOne){
            return Player.playerTwo;
        }

        return Player.playerOne;
    }
}

interface Tile {
    coordinates: Coordinates;
    Symbol: Player | undefined;
}

class Board {
    private _plays: Tile[] = [];

    constructor() {
        for (let i = 0; i < 3; i++) {
            for (let j = 0; j < 3; j++) {
                const tile: Tile = {coordinates: {X: i, Y: j}, Symbol: undefined};
                this._plays.push(tile);
            }
        }
    }

    public TileAt(coordinates: Coordinates): Tile {
        return this._plays.find((t: Tile) => t.coordinates.X === coordinates.X && t.coordinates.Y === coordinates.Y)!
    }

    public AddTileAt(player: Player, coordinates: Coordinates): void {
        this._plays.find((t: Tile) => t.coordinates.X === coordinates.X && t.coordinates.Y === coordinates.Y)!.Symbol = player;
    }
}
