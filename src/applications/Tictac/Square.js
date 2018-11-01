import React from 'react'
import './Tictac.css' 

export default function Square(props) {
    return (
      <button className={props.isWinningSquare? "specialSquare": "square"} onClick={props.onClick}>
        {props.value}
      </button>
    );
  }
  