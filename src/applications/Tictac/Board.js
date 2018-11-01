import React from 'react'
import Square from './Square'
import './Tictac.css' 


export default class Board extends React.Component {
  renderSquare(i) {
    const isWinningSquare = this.props.winners ? this.props.winners.includes(i): null;
    console.log(isWinningSquare);
    return (
      <Square key={i}
        value={this.props.squares[i]}
        onClick={() => this.props.onClick(i)}
        isWinningSquare = {isWinningSquare}
      />
    );
  }

  render() {
    let boardStructure = []
    for(let i = 0 ;i < 3 ;i++){
      let innerStructure = []
      for(let j = 0 ;j < 3 ;j++){
        innerStructure.push(this.renderSquare((i*3) +  j));
      }
      boardStructure.push(<div key={i} className="board-row"> {innerStructure} </div>)
    }
    
    return (
      <div>
        {boardStructure}
      </div>
    );
  }
}