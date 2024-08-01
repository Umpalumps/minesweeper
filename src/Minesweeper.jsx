import React, { useState } from "react";

// Recursive function to generate grid rows and columns
const generateGrid = (gridSize, rowIndex, buttonStates, handleButtonClick) => {

  if (rowIndex >= gridSize) {
    return null;
  }

  // Generate the current row
  const currentRow = [];
  for (let colIndex = 0; colIndex < gridSize; colIndex++) {
    const index = rowIndex * gridSize + colIndex;
    currentRow.push(
      <button
        key={index}
        style={{
          backgroundColor: buttonStates[index] ? "lightgrey" : "rgb(231, 231, 231)",
          color: "black",
          border: buttonStates[index] ? "2px solid rgb(167, 166, 166)" : "outset rgb(231, 231, 231)",
          cursor: "pointer",
        }}
        onClick={() => handleButtonClick(index)}
        className="square"
      >
        {buttonStates[index] ? index + 0 : ' _'}
      </button>
    );
  }

  return (
    <>
      <div className="board-row">
        {currentRow}
      </div>
      {generateGrid(gridSize, rowIndex + 1, buttonStates, handleButtonClick)}
    </>
  );
};

export function Minesweeper() {
  const gridSize = 3; // Fixed grid size

  const [buttonStates, setButtonStates] = useState(
    Array.from({ length: gridSize * gridSize }, () => false)
  );

  // Handle button click to update its state
  const handleButtonClick = (index) => {
    setButtonStates((prevStates) =>
      prevStates.map((state, i) => (i === index ? true : state))
    );
  };

  return (
    <div>
      {generateGrid(gridSize, 0, buttonStates, handleButtonClick)}
    </div>
  );
}

// {matrix.join('').map((number, index)=>{
//   <button value= {number} style={buttonStyle} onClick={() => handleButtonClick()}>

//     {buttonOpen ? "x" : ""}
//   </button>
//   })}

/* <Grid gridSize={gridSize} /> */
/* <button onClick={() => handleButtonSelection(9)}>9x9</button>
        <button onClick={() => handleButtonSelection(16)}>16x16</button> */

// const handleButtonSelection = (gridSize) => {
//   setGridSize(gridSize);
//   //console.log(generateButtons(gridSize));
// };

// //Generate a grid of buttons - creates an array of empty objects - 3x3 => [0,0,0,0,0,0,0,0,0], _ -undefined
// const generateButtons = (size) => {
//   return Array.from({ length: size * size }, (_,buttonIndex) => buttonIndex + 1);
//   //Array.from({ length: gridSize }, () => Array(gridSize).fill(""));

// };

// const RenderRow = ({ start, end, buttons }) => {
//   return (
//     <div>
//       {buttons.slice(start, end).map((index) => (
//         <button
//           key={index}
//           style={{
//             width: "30px",
//             height: "30px",
//             backgroundColor: "lightblue",
//             cursor: "pointer",
//           }}
//         />
//       ))}
//     </div>
//   );
// };

// // Component to render a grid of buttons
// const Grid = ({ gridSize }) => {

//   const buttons = generateButtons(gridSize);

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
