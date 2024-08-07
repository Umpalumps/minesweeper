import { Button } from "@mui/material";
import React, { useEffect, useState } from "react";
import "./source.css";

export function Minesweeper() {
  const BOARD_ROWS = 8;
  const BOARD_COLUMNS = 8;
  const MINES = 5;
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

      let placedMines = 0;
      while (placedMines < MINES) {
        const randomRow = Math.floor(Math.random() * BOARD_ROWS)
        const randomCol = Math.floor(Math.random() * BOARD_COLUMNS)

        if (!newBoard[randomRow] || !newBoard[randomRow][randomCol]) {
          continue
        }

        if (!newBoard[randomRow][randomCol].isBomb) {
          newBoard[randomRow][randomCol].isBomb = true
          placedMines++
        }
      };
      
      

      // newBoard[0][0].isBomb = true;
      // newBoard[0][2].isBomb = true;
      // newBoard[1][1].isBomb = true

      const countAjMines = (board, row, col) => {
        const offsets = [-1, 0, 1];
        let count = 0;

        for (let i of offsets) {
          for (let j of offsets) {
            if (i === 0 && j === 0) continue; // Skiping the cell itself

            const ajRow = row + i;
            const ajCol = col + j;

            if (
              ajRow >= 0 &&
              ajRow < BOARD_ROWS &&
              ajCol >= 0 &&
              ajCol < BOARD_COLUMNS &&
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

      return newBoard;
    };

    setBoard(generateBoard());
  }, []);

  // console.log(
  //   "board map",
  //   board.map((row) => row.map((col) => ({ ...col })))
  // );

  const handleCellClick = (row, col) => {
    if (gameOver) return

    const newBoard = board.map(row => row.map(cell => ({ ...cell })))
    const cell = newBoard[row][col]

    if (cell.isBomb) {
      setGameOver(true)
      console.log("game over")
      return;
    }

    if (cell.ajMineCount > 0) {  //opening only the cell that's adjacent to a bomb 
      cell.isOpen = true
    } else {
      revealCell(newBoard, cell) // if clicked on 0 recursively looping to check adjacent cells to explode all xeros
    }
    
    setBoard(newBoard)
  };



  const revealCell = (board, cell) => {
    const offsets = [-1, 0, 1];
    
    if (cell.isOpen || cell.isBomb) return;

    cell.isOpen = true;

    for(let i of offsets){
      for(let j of offsets){
        if(i===0 && j === 0) continue;
        const ajRow = cell.x + i;
        const ajCol = cell.y + j;

        if(ajRow >= 0 && ajRow < BOARD_ROWS && ajCol >= 0 && ajCol < BOARD_COLUMNS){
          const ajCell = board[ajRow][ajCol]
          if (!ajCell.isOpen && !ajCell.isBomb) {
            if (ajCell.ajMineCount === 0) {
              revealCell(board, ajCell);
            } else {
              ajCell.isOpen = true // opened adjacent cells that are adjacent to the mines but not recursively
            }} 
        }
      }
    }
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
                  border: cell.isOpen
                    ? " 1px solid lightgrey"
                    : "3px outset rgb(231, 231, 231)",
                  backgroundColor: cell.isOpen ? "white" : "lightgrey",
                }}
                onClick={() => handleCellClick(rowIndex, colIndex)}
              >
                {cell.isOpen ? (cell.isBomb ? "💣" : cell.ajMineCount) : ""}
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
