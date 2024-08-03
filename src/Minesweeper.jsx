import { Button } from "@mui/material";
import React, { useEffect, useState } from "react";
import './source.css'

export function Minesweeper() {
  const BOARD_ROWS = 3;
  const BOARD_COLUMNS = 3;
  const MINES = 1;
  const [board, setBoard] = useState([]);

  useEffect(() => {
    const generateBoard = (currentRow = 0, currentCol = 0, newBoard = []) => {
      if (currentRow >= BOARD_ROWS) return newBoard;

      if (!newBoard[currentRow]) newBoard[currentRow] = [];

      if (currentCol >= BOARD_COLUMNS) {
        return generateBoard(currentRow + 1, 0, newBoard);
      }

      newBoard[currentRow].push({
        x: currentCol,
        y: currentRow,
        isOpen: false,
        hasMine: false,
        isFlaged: false,
      });

      return generateBoard(currentRow, currentCol + 1, newBoard);
    };
    setBoard(generateBoard());
  }, [BOARD_ROWS, BOARD_COLUMNS]);

  //console.log('board map',board.map(arr=>arr.map((one=> one.isOpen))));

  //Handle button click to update its state
  const handleButtonClick = (prop) => {
    const updateBoard = board.map((row) =>
      row.map((square) =>
      square.x === prop.x && square.y === prop.y ? { ...square, isOpen: true } : square
      )
    );
    console.log(
      prop.isOpen,
      board.map((arr) => arr.map((one) => one.isOpen))
    );
    setBoard(updateBoard)
    
  };
  
  console.log('Updated board:', board);

  return (
    <div className="board">
      {board.length > 0 ? (
        board.map((row, rowIndex) => (
          <div key={rowIndex} style={{ display: "flex" }}>
            {row.map((cell, colIndex) => (
              <Button
                key={colIndex}
                style={{
                  border: cell.isOpen ? 'black' : '3px outset rgb(231, 231, 231)',
                  width: "30px", // Set width
                  height: "60px",
                  margin: '1px',
                  backgroundColor: cell.isOpen ? 'initial' : 'lightgrey',
                }}
                onClick={() => handleButtonClick(cell)}
              >
                {/* Display cell coordinates or other cell data */}
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

// const BOARD_ROWS = 10;
// const BOARD_COLUMNS = 10;
// const [mines, setMines] = useState(2);
// const [board, setBoard] = useState([]);

// useEffect(() => {
//   const generateBoard = () => {
//     return Array.from({ length: BOARD_ROWS }, (_, row) =>
//       Array.from({ length: BOARD_COLUMNS }, (_, col) => ({
//         x: col,
//         y: row,
//         isOpen: false,
//         hasMine: false, // Optionally, set random mines later
//       }))
//     );
//   };

//   setBoard(generateBoard());
// }, [BOARD_COLUMNS, BOARD_ROWS]);

//   return (
//     <>
//       {Array.from({ length: gridSize }).map((_, rowIndex) => (
//         <RenderRow
//           key={rowIndex}
//           start={rowIndex * gridSize}
//           end={(rowIndex + 1) * gridSize}
//           buttons={buttons}
//         />
//       ))}
//     </>
//   );
// };
