import { useState, useEffect } from 'react';

const Button = ({ items, player, idx, setPlayerPicks, computer, computerPicks, setIndex }) => {
    const [aval, setAval] = useState(false);
    const [comAval, setComAval] = useState(false);
    useEffect(() => {
        setTimeout(() => {
            if (items[0] === computerPicks[0]) {
                setComAval(true);
            } 
        }, 600)
    }, [computerPicks]);
     
    const handleBtn = (id) => {
        if (player && id) {
            setAval(true);
            setPlayerPicks(id);  
            setIndex(idx);
        } else if (!player) {
            alert("Select between X or O");
        }
    }


    return (
        <li className="main_btn" onClick={() => handleBtn(items[0])}>{aval ? player : comAval ? computer : items[1]}</li>
    )
}

export default Button