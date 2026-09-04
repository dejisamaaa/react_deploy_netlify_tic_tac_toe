import { useState, useEffect, useRef } from 'react';
import Button from './Button'; 
const Main = () => {
  const ref = useRef([]);
  const logicRef = useRef([])
  const comLogicRef = useRef([])
   const winRef = useRef([[1, 2, 3], [4, 5, 6], [7, 8, 9], [1, 4, 7], [2, 5, 8], [3, 6, 9], [1, 5, 9], [3, 5, 7]]);
  const arrRef = useRef([[1, ''], [2, ''], [3, ''], [4, ''], [5, ''], [6, ''], [7, ''],
   [8, ''], [9, '']]);
  const [player, setPlayer] = useState('');
  const [computer, setComputer] = useState('');
  const [playerPicks, setPlayerPicks] = useState('');
  const [computerPicks, setComputerPicks] = useState('');
  const [index, setIndex] = useState('');
  const [winner, setWinner] = useState('')
  const btn = [[1, ''], [2, ''], [3, ''], [4, ''], [5, ''], [6, ''], [7, ''], [8, ''],
    [9, '']];

  const handleX = () => {
    setPlayer('X');
    setComputer('O');
  }

  const handleO = () => {
    setPlayer('O');
    setComputer('X');
  }

  useEffect(() => {
    if (player && computer) {
      if (playerPicks) {
        logicRef.current.push(index);
        ref.current.push(playerPicks);
        if (logicRef.current.length) {
          const result = winRef.current.filter(val => val.every(item => logicRef.current.includes(item)));
          if (result[0]) {
            console.log(result, 'Player Wins');
            setWinner("Player Wins 🏆")
          } else if (logicRef.current.length > 4 && !result[0]) {
            console.log('Tie Game');
            setWinner("Tie Game ⚖️")
          } 
        }
        arrRef.current = arrRef.current.filter((item) => !ref.current.includes(item[0]))
        if (arrRef.current.length) {
          const randNum = Math.floor(Math.random() * arrRef.current.length);
          const val = arrRef.current[randNum];
          arrRef.current = arrRef.current.filter(item => item !== val)
          comLogicRef.current.push(val[0]);
          console.log(comLogicRef.current);
          setComputerPicks(val);
          if (comLogicRef.current.length) {
            const result = winRef.current.filter(val => val.every(item => comLogicRef.current.includes(item)));
            if (result[0]) {
              console.log(result, 'Computer Wins');
              setWinner("Computer Wins 🤖")
            }
          }
        } else if (arrRef.current.length < 2) {
          setComputerPicks('');
        }
      }
    }
  }, [player, computer, playerPicks, index]);

  return (
    <main className="main">
        {
          !player ? <p className="main_p">
          Select between 
          <span className="main_p_btn"  onClick={handleX}>X</span>
           or  
          <span className="main_p_btn" onClick={handleO}>O</span>to start game
          </p> : winner ? <p className="main_p">Result: {winner}</p> : <p className='main_p'>{`Player is ${player} Computer is ${computer}`}</p> 
        } 
        <section className="main_sec">
          <ul className='main_sec_ul'>
            {btn.map((item, idx) => (<Button 
              key={item[0]}
              items={item} 
              idx={idx + 1}
              playerPicks={playerPicks}
              setPlayerPicks={setPlayerPicks}
              player={player}
              computer={computer}
              computerPicks={computerPicks}
              setComputerPicks={setComputerPicks}
              setIndex={setIndex}
            />))}
          </ul>
        </section>
        <button className="main_reset" onClick={() => window.location.reload()}>Play Again</button>
    </main>
  )
}

export default Main
