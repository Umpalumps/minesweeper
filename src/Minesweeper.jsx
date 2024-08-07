import { Button } from "@mui/material";
import React, { useEffect, useState } from "react";
import "./source.css";

export function Minesweeper() {
  const BOARD_ROWS = 4;
  const BOARD_COLUMNS = 4;
  const MINES = 1;
  const [board, setBoard] = useState([]);
  const [gameOver, setGameOver] = useState(false);

  useEffect(() => {
    const generateBoard = () => {
      // if (currentRow >= BOARD_ROWS) return newBoard;
      // if (!newBoard[currentRow]) newBoard[currentRow] = [];
      // if (currentCol >= BOARD_COLUMNS) {
      //   return generateBoard(currentRow + 1, 0, newBoard);}
      // newBoard[currentRow].push({
      //   x: currentCol,
      //   y: currentRow,
      //   isOpen: false,
      //   hasMine: false,
      //   isFlaged: false,
      // });

      const newBoard = Array.from({ length: BOARD_ROWS }, (_, rowIndex) =>
        Array.from({ length: BOARD_COLUMNS }, (_, colIndex) => ({
          x: rowIndex,
          y: colIndex,
          isOpen: false,
          isBomb: false, // bomb / 0 / 1
          isFlagged: false,
          ajMineCount: 0,
        }))
      );
      // let placedMines = 0;
      // while (placedMines < MINES) {
      //   const randomRow = Math.floor(Math.random() * BOARD_ROWS)
      //   const randomCol = Math.floor(Math.random() * BOARD_COLUMNS)

      //   if (!newBoard[randomRow] || !newBoard[randomRow][randomCol]) {
      //     continue
      //   }
       
      //   if (!newBoard[randomRow][randomCol].hasMine) {
      //     newBoard[randomRow][randomCol].hasMine = true
      //     placedMines++
      //   }
      // };
      // //console.log(newBoard[currentRow][currentCol])
      // //return generateBoard(currentRow, currentCol + 1, newBoard);
     
      newBoard[0][0].isBomb = true
      newBoard[0][2].isBomb = true
      newBoard[2][2].isBomb = true

    
      const countAjMines = (board, row, col) => {
        const offsets = [-1, 0, 1];
        let count = 0;
      
        for (let i of offsets) {
          for (let j of offsets) {
            if (i === 0 && j === 0) continue; // Skiping the cell itself
      
            const ajRow = row + i;
            const ajCol = col + j;
      
            if (
              ajRow >= 0 && ajRow < BOARD_ROWS &&
              ajCol >= 0 && ajCol < BOARD_COLUMNS &&
              board[ajRow][ajCol].isBomb
            ) {
              count++;
            }
          }
        }
      
        return count;
      };


      newBoard.forEach((row, rowIndex) =>
      row.forEach((cell, colIndex) => {
        if (!cell.isBomb) {
          cell.ajMineCount = countAjMines(newBoard, rowIndex, colIndex);
        }
      })
    );


      return newBoard
    };

    setBoard(generateBoard())

  }, []);




  // const updateBoard = (board, row, col) => {
  //   const newBoard = board.map(row => row.map(cell => ({ ...cell })));}

  console.log( "board map", board.map((row) => row.map((col) => ({...col})))); //

  const handleButtonClick = (prop) => {
    let updatedBoard = []
    if (prop.hasMine) {
      updatedBoard = board.map((row) =>
        row.map((square) => ({ ...square, isOpen: true }))
      );
      setBoard(updatedBoard)
      setGameOver(true)

    } else {
      updatedBoard = board.map((row) =>
        row.map((square) =>
          square.x === prop.x && square.y === prop.y
            ? { ...square, isOpen: true }
            : square
        )
      );
    }

    setBoard(updatedBoard)
  };

  //console.log(board.map((arr) => arr.map((one) => one.isOpen)))

  //console.log("Updated board:", board);

  return (
    <div className="board">
      {board.length > 0 ? (
        board.map((row, rowIndex) => (
          <div key={rowIndex}>
            {row.map((cell, colIndex) => (
              <Button
                className="button"
                key={colIndex}
                style={{
                  border: cell.isOpen ? " 1px solid lightgrey" : "3px outset rgb(231, 231, 231)",
                  backgroundColor: cell.isOpen ? "lightgreen" : "lightgrey",
                }}
                onClick={() => handleButtonClick(cell)}
              >
                {cell.isOpen && cell.isBomb ? "💣" : cell.ajMineCount}
              </Button>
            ))}
          </div>
        ))
      ) : (
        <p>Loading board...</p>
      )}
    </div>
  );
}



//const isWithinGrid = (indRow, indCol, row, col) => indRow < row && indRow >= 0 && indCol >= 0 && indCol < col;

// const countAdjacentMines = (row, col, board) => {
//   const adjacentCells = [
//     [-1, -1], [-1, 0], [-1, 1],
//     [0, -1],          [0, 1],
//     [1, -1], [1, 0], [1, 1],
//   ];}



// for (let i = 0; i < rows; i++) {
//   newBoard.push([]);
//   for (let j = 0; j < columns; j++) {
//     newBoard[i].push({
//       x: j,
//       y: i,
//       count: 0,
//       isOpen: false,
//       hasMine: false,
//       hasFlag: false,
//     });
//   }
// }
// setBoard(newBoard)
