import { useState, useEffect, useCallback } from 'react';
import Confetti from 'react-confetti';
import { useWindowSize } from 'react-use';

const Main = () => {
  const { width, height } = useWindowSize();
  const WINNING_COMBOS = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8],
    [0, 3, 6], [1, 4, 7], [2, 5, 8], 
    [0, 4, 8], [2, 4, 6]             
  ];

  const [board, setBoard] = useState(Array(9).fill(''));
  const [isAiTurn, setIsAiTurn] = useState(false);
  const [player, setPlayer] = useState('');
  const [computer, setComputer] = useState('');
  
 );

  const handleX = () => {
    setPlayer('X');
    setComputer('O');
  }

  const handleO = () => {
    setPlayer('O');
    setComputer('X');
  }

  const checkWinner = useCallback((squares) => {
      for (let combo of WINNING_COMBOS) {
        const [a, b, c] = combo;
        if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
          return squares[a];
        }
      }
      if (squares.every(square => square !== '')) return 'tie';
      return '';
    }, [])

  const minimax = (squares, depth, isMaximizing) => {
    const winner = checkWinner(squares);
    
    console.log(winner)
    if (winner === computer) return 10 - depth;
    if (winner === player) return depth - 10; 
    if (winner === 'tie') return 0;

    if (isMaximizing) {
      let bestScore = -Infinity;
      for (let i = 0; i < squares.length; i++) {
        if (squares[i] === '') {
          squares[i] = computer; 
          let score = minimax(squares, depth + 1, false);
          squares[i] = '';
          bestScore = Math.max(score, bestScore);
        }
      }
      return bestScore;
    } else {
      let bestScore = Infinity;
      for (let i = 0; i < squares.length; i++) {
        if (squares[i] === '') {
          squares[i] = player; 
          let score = minimax(squares, depth + 1, true);
          squares[i] = '';
          bestScore = Math.min(score, bestScore);
        }
      }
      return bestScore;
    }
  };

  const findBestMove = useCallback((squares) => {
    let bestScore = -Infinity;
    let move = -1;

    for (let i = 0; i < squares.length; i++) {
      if (squares[i] === '') {
        squares[i] = computer;
        let score = minimax(squares, 0, false);
        squares[i] = '';

        if (score > bestScore) {
          bestScore = score;
          move = i;
        }
      }
    }
    return move;
  }, [])

  useEffect(() => {
    if (!isAiTurn) return;

    const winner = checkWinner(board)
    if (winner) return;

    const timer = setTimeout(() => {
      const bestMove = findBestMove([...board])
      if (bestMove !== -1) {
        const newBoard = [...board];
        newBoard[bestMove] = computer;
        setBoard(newBoard);
        setIsAiTurn(false);
      }
    }, 600);

    return () => clearTimeout(timer);
  }, [isAiTurn, board, checkWinner, computer, findBestMove]);

  const handleClick = (index) => {
    if (board[index] || checkWinner(board) || isAiTurn) return;

    const newBoard = [...board];
    newBoard[index] = player;
    setBoard(newBoard);
    setIsAiTurn(true);
  };

  const winner = checkWinner(board);

  console.log(board)

  return (
    <main className="main">
         {
          !player 
          ?  <p className="main_p">
              Select between 
              <span className="main_p_btn"  onClick={handleX}>X</span>
              or  
              <span className="main_p_btn" onClick={handleO}>O</span>
              to start game
            </p> 
          : winner ? 
          <div className="main_p">
            <Confetti width={width} height={height} numberOfPieces={200} recycle={true} /> 
            <p >{winner === "tie" ? "Tie Game" : `Winner is ${winner}`}</p>
          </div> 
          : <p className='main_p'>{`Player is ${player} Computer is ${computer}`}</p> 
        } 
         <div className="main_sec_div">
         {board.map((value, idx) => (
          <button
            className="main_btn"
            key={idx}
            onClick={() => handleClick(idx)}
           
          >
            {value}
          </button>
        ))}
      </div>
      <button className="main_reset" onClick={() => window.location.reload()}>Play Again</button> 
    </main>
  )
}

export default Main
