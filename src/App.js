import React ,{useState} from "react";
import Board from './components/Board'
import { calculateWinner } from "./helpers";


export default () => {

  const [board, setBoard] = useState(Array(9).fill(null));
  const [isXNext,setisXNext] = useState(false);

  const winner = calculateWinner(board);

  const message = winner ? `Winner is ${winner}`: `Next player is ${isXNext ? 'X':'0'}`;

  const handleSquareClick =(position)=>{
      if(board[position] || winner){
          return;
      }
      setBoard((prev)=>{
          return prev.map((square,pos)=>{
              if(pos===position){
                  return isXNext ?'X': '0';
              }

              return square;
          })
      })
      setisXNext((prev)=>!prev)
  }
  return (
    <div className="app">
  <h1>Tic Tac Toe App</h1>
  <h2>{message}</h2>
    <Board handleSquareClick={handleSquareClick} board={board}/>
  </div>
  )
  
};
