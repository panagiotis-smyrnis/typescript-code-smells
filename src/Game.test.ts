
import { Game, Coordinates, Player } from "./Game"

describe('TicTacToe game', () => {
    let game : Game;

    beforeEach(() => {
        game = new Game();
    });

    // it('should not allow player O to play first', () => {
    //     expect(() => game.Play(Player.playerTwo, { X:0, Y:0 } as Coordinates)).toThrow();
    // });

    // it('should not allow player x to play twice in a row', () =>{
    //     game.Play(Player.playerOne, { X:0, Y:0 } as Coordinates);
    //     expect(() => game.Play(Player.playerOne, { X:1, Y:0 } as Coordinates)).toThrow();
    // });

    it('should not allow a player to play in last played position', () => {
        game.Play({ X:0, Y:0 } as Coordinates);
        expect(() => game.Play({ X:0, Y:0 } as Coordinates)).toThrow();
    });

    it('should not allow a player to play in any played position', () => {
        game.Play({ X:0, Y:0 } as Coordinates);
        game.Play({ X:1, Y:0 } as Coordinates);
        expect(() => game.Play({ X:0, Y:0 } as Coordinates)).toThrow();
    });

    it('should declare player X as winner if it plays three in top row', () =>{
        game.Play({ X:0, Y:0 } as Coordinates);
        game.Play({ X:1, Y:0 } as Coordinates);
        game.Play({ X:0, Y:1 } as Coordinates);
        game.Play({ X:1, Y:1 } as Coordinates);
        game.Play({ X:0, Y:2 } as Coordinates);

        var winner = game.Winner();

        expect(winner).toBe("X");
    });

    it('should declare player O as winner if it plays three in top row', () => {
        game.Play({ X:1, Y:0 } as Coordinates);
        game.Play({ X:0, Y:0 } as Coordinates);
        game.Play({ X:1, Y:1 } as Coordinates);
        game.Play({ X:0, Y:1 } as Coordinates);
        game.Play({ X:2, Y:2 } as Coordinates);
        game.Play({ X:0, Y:2 } as Coordinates);

        var winner = game.Winner();

        expect(winner).toBe("O");
    });

    it('should declare player X as winner if it plays three in middle row', () => {
        game.Play({ X:1, Y:0 } as Coordinates);
        game.Play({ X:0, Y:0 } as Coordinates);
        game.Play({ X:1, Y:1 } as Coordinates);
        game.Play({ X:0, Y:1 } as Coordinates);
        game.Play({ X:1, Y:2 } as Coordinates);

        var winner = game.Winner();

        expect(winner).toBe("X");
    });

    it('should declare player O as winner if it plays three in middle row', () => {
        game.Play({ X:0, Y:0 } as Coordinates);
        game.Play({ X:1, Y:0 } as Coordinates);
        game.Play({ X:2, Y:1 } as Coordinates);
        game.Play({ X:1, Y:1 } as Coordinates);
        game.Play({ X:2, Y:2 } as Coordinates);
        game.Play({ X:1, Y:2 } as Coordinates);

        var winner = game.Winner();

        expect(winner).toBe("O");
    });

    it('should declare player X as winner if it plays three in bottom row', () => {
        game.Play({ X:2, Y:0 } as Coordinates);
        game.Play({ X:0, Y:0 } as Coordinates);
        game.Play({ X:2, Y:1 } as Coordinates);
        game.Play({ X:0, Y:1 } as Coordinates);
        game.Play({ X:2, Y:2 } as Coordinates);

        var winner = game.Winner();

        expect(winner).toBe("X");
    });

    it('should declare player O as winner if it plays three in bottom row', () => {
        game.Play({ X:0, Y:0 } as Coordinates);
        game.Play({ X:2, Y:0 } as Coordinates);
        game.Play({ X:1, Y:1 } as Coordinates);
        game.Play({ X:2, Y:1 } as Coordinates);
        game.Play({ X:0, Y:1 } as Coordinates);
        game.Play({ X:2, Y:2 } as Coordinates);

        var winner = game.Winner();

        expect(winner).toBe("O");
    });
});
