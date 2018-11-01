import React, { Component } from 'react';
import './TicTacOld.css'

export default class TicTacOld extends Component  { 

    constructor (props) {
        super(props);
        this.state = this.initialState();
    }    

    initialState() {
        const init  = { 
            dimensions: [' ',' ',' ',' ',' ',' ',' ',' ',' '],
            player: 1,
            isGameRunning: true,
            sideMessage: ''
        };
        return init;
    }
       

    reset = () => {
        this.setState(this.initialState());
        console.log(this.state);
    }

    handleClick = (index) => {
        let dimensionsLocal = this.state.dimensions;
            if(dimensionsLocal[index] === ' '){
            if(this.state.player === 1){
                console.log('1')
                dimensionsLocal[index] = 'X'
            }else {
                console.log('2')
                dimensionsLocal[index] = 'O'
            }
            this.setState({dimensions: dimensionsLocal})
            this.checkCases();
        }
    }

    flipPlayer = () => {
        console.log('Flipplayer called')
        this.setState({player: this.state.player === 1 ? 2 : 1 ,sideMessage: 'It is Player' +  this.state.player  + '\'s go'})
        console.log(this.state.player)
    }

    endGame = () => {
        console.log('endgame called')
        this.setState({isGameRunning: false, sideMessage: "Player " + this.state.player + " Wins!"})
    }

    checkCases = () => {
        const dimensions = this.state.dimensions;
        console.log(dimensions);
        if (dimensions[0] !== ' ' && dimensions[0] === dimensions[1] === dimensions[2]) {
            console.log('Top row');
            this.endGame();
        }
        else if (dimensions[3] !== ' ' && dimensions[3] === dimensions[4] && dimensions[4] === dimensions[5]) {
            console.log('middle Row');
            this.endGame();
        }
        else if (dimensions[6] !== ' ' && dimensions[6] === dimensions[7] && dimensions[7] === dimensions[8]) {
            console.log('bottom Row');
            this.endGame();
        }
        else if ( dimensions[0] !== ' ' && dimensions[0] === dimensions[3] && dimensions[3] === dimensions[6]) {
            console.log('left column');
            this.endGame();
        }
        else if (dimensions[1] !== ' ' && dimensions[1] === dimensions[4] && dimensions[4] === dimensions[7]) {
            console.log('middle column');
            this.endGame();
        }
        else if (dimensions[2] !== ' ' && dimensions[2] === dimensions[5] && dimensions[5] === dimensions[8]) {
            console.log('right column');
            this.endGame();
        }
        else if (dimensions[0] !== ' ' && dimensions[0] === dimensions[4] && dimensions[4] === dimensions[8]) {
            console.log('left diagonal');
            this.endGame();
        }
        else if (dimensions[2] !== ' ' && dimensions[2] === dimensions[4] && dimensions[4]  === dimensions[6]) {
            console.log('right diagonal');
            this.endGame();
        }
        else {
            console.log('Nothing yet');
            this.flipPlayer();
        }
    };

    render() {
        const dimensions = this.state.dimensions;
        return (
            <div className='boardAndSideBarWrapper'>
                <div className='board'>
                    <div className='column'>
                        <div className='box' onClick = {this.state.isGameRunning ? () => this.handleClick(0) : ()=>{}}> {dimensions[0]} </div>
                        <div className='box' onClick = {this.state.isGameRunning ? () => this.handleClick(1) : ()=>{}}> {dimensions[1]} </div>
                        <div className='box' onClick = {this.state.isGameRunning ? () => this.handleClick(2) : ()=>{}}> {dimensions[2]} </div>
                    </div>
                    <div className='column'>
                        <div className='box' onClick = {this.state.isGameRunning ? () => this.handleClick(3) : ()=>{}}> {dimensions[3]} </div>
                        <div className='box' onClick = {this.state.isGameRunning ? () => this.handleClick(4) : ()=>{}}> {dimensions[4]} </div>
                        <div className='box' onClick = {this.state.isGameRunning ? () => this.handleClick(5) : ()=>{}}> {dimensions[5]} </div>
                    </div>
                    <div className='column'>
                        <div className='box' onClick = {this.state.isGameRunning ? () => this.handleClick(6) : ()=>{}}> {dimensions[6]} </div>
                        <div className='box' onClick = {this.state.isGameRunning ? () => this.handleClick(7) : ()=>{}}> {dimensions[7]} </div>
                        <div className='box' onClick = {this.state.isGameRunning ? () => this.handleClick(8) : ()=>{}}> {dimensions[8]} </div>
                    </div>
                </div>
                <div className='sidebar'>
                    <button onClick={() => this.reset()} >Reset</button>
                    <span>{this.state.sideMessage}</span>
                </div>
            </div>
        )
    }

}