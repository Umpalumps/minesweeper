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
          isBomb: false,
          isFlagged: false,
          ajMineCount: 0,
        }))
      );

      let placedMines = 0;
      while (placedMines < MINES) {
        const randomRow = Math.floor(Math.random() * BOARD_ROWS);
        const randomCol = Math.floor(Math.random() * BOARD_COLUMNS);

        if (!newBoard[randomRow] || !newBoard[randomRow][randomCol]) {
          continue;
        }

        if (!newBoard[randomRow][randomCol].isBomb) {
          newBoard[randomRow][randomCol].isBomb = true;
          placedMines++;
        }
      }

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
    if (gameOver) return;

    const newBoard = board.map((row) => row.map((cell) => ({ ...cell })));
    const cell = newBoard[row][col];

    if (cell.isBomb) {
      revealAllCells(newBoard);
      setGameOver(true);
      setBoard(newBoard);
      console.log("game over");
      return;
    }

    if (cell.ajMineCount > 0) {
      //opening only the cell that's adjacent to a bomb
      cell.isOpen = true;
    } else {
      revealCell(newBoard, cell); // if clicked on 0 recursively looping to check adjacent cells to explode all xeros
    }

    setBoard(newBoard);
  };

  const handleRightClick = (row, col, e) => {                             ///// RIGHT CLICK
    e.preventDefault();
    console.log(`Right-clicked on cell (${row}, ${col})`);
    const newBoard = board.map((r) => r.map((cell) => ({ ...cell })));
    const cell = newBoard[row][col];

    cell.isFlagged = !cell.isFlagged;

    setBoard(newBoard);
  };

  const revealAllCells = (board) => {
    board.forEach((row) => row.forEach((cell) => (cell.isOpen = true)));
  };

  const revealCell = (board, cell) => {
    const offsets = [-1, 0, 1];

    if (cell.isOpen || cell.isBomb) return;

    cell.isOpen = true;

    for (let i of offsets) {
      for (let j of offsets) {
        if (i === 0 && j === 0) continue;
        const ajRow = cell.x + i; // [clicked on 2;1] checking cell.x + i = 2-1,  2+1  skipped 2+0 (original cell)
        const ajCol = cell.y + j; //                 checking cell.y + j = 1-1, 1+1   skipped 1+0

        if (
          ajRow >= 0 &&
          ajRow < BOARD_ROWS &&
          ajCol >= 0 &&
          ajCol < BOARD_COLUMNS
        ) {
          //checking if its within the boundaries of the board
          const ajCell = board[ajRow][ajCol];
          if (!ajCell.isOpen && !ajCell.isBomb) {
            if (ajCell.ajMineCount === 0) {
              revealCell(board, ajCell); // recursively opened all the neighboring 0 cells
            } else {
              ajCell.isOpen = true; // opened adjacent cells that are adjacent to the mines but not recursively
            }
          }
        }
      }
    }
  };

  const showCellContent = (cell) => {
    if (cell.isFlagged && !cell.isOpen) {
      return "🚩";
    }
    if (cell.isOpen) {
      return cell.isBomb ? "💣" : cell.ajMineCount || "";
    }
    return "";
  };
  //console.log(board.map((arr) => arr.map((one) => one.isOpen)))
  //console.log("Updated board:", board);

    const checkClick = (e) => {
      e.preventDefault();
      console.log('Right-click detected');
    };

  return (
    <><div className="board">
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
                onContextMenu={(e) => handleRightClick(rowIndex, colIndex, e)}
              >
                {showCellContent(cell)}
              </Button>
            ))}
          </div>
        ))
      ) : (
        <p>Loading board...</p>
      )}
    </div>
    <div onContextMenu={checkClick} style={{ width: '100px', height: '100px', border: '1px solid black' }}>
      Right Click Here
    </div>
    </>
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
