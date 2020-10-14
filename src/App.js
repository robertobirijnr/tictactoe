import React ,{useState} from "react";
import Board from './components/Board'
import History from './components/History'
import StatusMessage from "./components/StatusMessage";
import { calculateWinner } from "./helpers";


export default () => {
  const NewGame=[{board:Array(9).fill(null), isXNext:true}]

  const [history, setHistory] = useState(NewGame);
  const [currentMove,setCurrentMove] = useState(0)
  
  const current = history[currentMove];

  const {winner, winningSquare} = calculateWinner(current.board);

  
  const handleSquareClick =(position)=>{
      if(current.board[position] || winner){
          return;
      }
      setHistory((prev)=>{
        const last = prev[prev.length - 1];
          const newBoard = last.board.map((square,pos)=>{
              if(pos===position){
                  return last.isXNext ?'X': '0';
              }

              return square;
          })

          return prev.concat({board:newBoard, isXNext:!last.isXNext})
      })
      setCurrentMove(prev => prev +1);
  }

  const moveTo=(move)=>{
    setCurrentMove(move)
  }

  const reStartGame = ()=>{
    setHistory(NewGame)
    setCurrentMove(0)
  }


  return (
    <div className="app">
  <h1>Tic Tac Toe App</h1>
  <StatusMessage winner={winner} current={current}/>
    <Board handleSquareClick={handleSquareClick} board={current.board} winningSquare={winningSquare}/>
    <button type='button' onClick={reStartGame}>Restart Game</button>
    <History history={history} moveTo={moveTo} currentMove={currentMove}/>
  </div>
  )
  
};
