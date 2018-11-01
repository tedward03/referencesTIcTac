import React from 'react'
import Board from './Board'
import './Tictac.css' 

export default class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      history: [{
        lastChanged: null,
        squares: Array(9).fill(null)
      }],
      stepNumber: 0,
      isFirstPlayer: true,
      listDirection: true,
    };
  }

  handleClick(i) {
    // update the history so that when there is a click an alternate timeline is made 
    const history = this.state.history.slice(0,this.state.stepNumber + 1);
    // current is always the end of the list 
    const current = history[history.length - 1];
    const squares = current.squares.slice();

    if (calculateWinner(squares) || squares[i]) {
      return;
    }
    squares[i] = this.state.isFirstPlayer ? 'X' : 'O';
    this.setState({
      history: history.concat([{
        lastChanged: i,
        squares: squares
      }]),
      stepNumber: history.length,
      
      isFirstPlayer: !this.state.isFirstPlayer,
    });
  }
  
  determinePosition(squaresElementIndex){
    let col,row;
    if(squaresElementIndex === 0 || squaresElementIndex === 1 || squaresElementIndex === 2){
        col = "Top - ";
        if(squaresElementIndex === 0 ){
            row = "Left";
        } 
        else if(squaresElementIndex === 1 ){
            row = "Middle";
        }
        else {
            row = "Right";
        }
    }
    else if (squaresElementIndex === 3 || squaresElementIndex === 4 || squaresElementIndex === 5){
        col = "Middle - "; 
        if(squaresElementIndex === 3 ){
            row = "Left";
        } 
        else if(squaresElementIndex === 4 ){
            row = "Middle";
        }
        else {
            row = "Right";
        }
    }
    else {
        col = "Bottom - "; 
    } 
    if(squaresElementIndex === 0 || squaresElementIndex === 3 ||  squaresElementIndex === 6 ){
        row = "Left";
    } 
    else if(squaresElementIndex === 1 || squaresElementIndex === 4 || squaresElementIndex === 7 ){
        row = "Middle";
    }
    else {
        row = "Right";
    }
    return col + row;
  }

  jumpTo(step){
    this.setState({
        stepNumber : step,
        isFirstPlayer: (step % 2) === 0
    });
  }

  toggleListDirection() {
    this.setState({
        listDirection : !this.state.listDirection,
    });
  }

  render() {
    const history = this.state.history;
    const current = history[this.state.stepNumber];
    const winnerObject = calculateWinner(current.squares);    

    const moves = history.map((boardstate,moveNumber) => {
        const description = moveNumber ?
        "Go to move #" + this.determinePosition(boardstate.lastChanged):
        "Go to start";
        return (
            <li key = {moveNumber}>
            { this.state.stepNumber === moveNumber ? 
              <button onClick = {() => this.jumpTo(moveNumber)}>
                <strong>
                  {description}
                </strong>
              </button>
             :<button onClick = {() => this.jumpTo(moveNumber)}>
                {description}
              </button>
            }
            </li>
        );
    });


    let status;
    let localWinningNumbers= [];
    if (winnerObject) {
      status = 'Winner: ' + winnerObject.winner;
      localWinningNumbers =  winnerObject.winningNumbers;
    } else if (!current.squares.includes(null)){
      status = 'It\'s a draw';
    } else {
      status = 'Next player: ' + (this.state.isFirstPlayer ? 'X' : 'O');
    }
    return (
      <div className="game">
        <div className="game-board">
          <Board
            squares={current.squares}
            onClick={(i) => this.handleClick(i)}
            winners = {localWinningNumbers}
          />
        </div>
        <div className="game-info">
          <div>{status}</div>
          <button onClick= {() => this.toggleListDirection()}>{this.state.listDirection ? "Asc": "Desc"}</button>
          <ol>{this.state.listDirection ? moves: moves.slice(0).reverse()}</ol>
        </div>
      </div>
    );
  }
} 

function calculateWinner (squares) {
    const lines = [
      [0,1,2],
      [3,4,5],
      [6,7,8],
      [0,4,8],
      [2,4,6],
      [0,3,6],
      [1,4,7],
      [2,5,8]
    ];
    for(let i = 0; i < lines.length; i++){
      let [a,b,c] = lines[i];
      if(squares[a] && squares[a] === squares[b] && squares[a] === squares[c]){
        return {
          winner: squares[a],
          winningNumbers: [a,b,c]
        }
      }
    }
    return null;
}