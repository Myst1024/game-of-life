import React, { Component } from 'react';
import Cell from './Cell';
import Paper from '@material-ui/core/Paper';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline'
import RemoveCircleOutlineIcon from '@material-ui/icons/RemoveCircleOutline'
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

class Game extends Component {
    constructor(props) {
        super(props);
        this.setCell=this.setCell.bind(this);
        this.state = {
            width: 3,
            height: 3,
            board: [[false, false, false],[false, false, false],[false, false, false]]
        }
    }

    // takes 2D board array and generates a grid of <Cell>s based on board dimensions
    createDisplay() {
        // For each row, create a container.  For each column, populate with Cells 
        const display = this.state.board.map((row, xIndex) => {
            const column = row.map((cell, yIndex) => {
                return (
                    <Cell 
                        key={`x${xIndex}y${yIndex}`} 
                        x={xIndex} 
                        y={yIndex} 
                        setCell={this.setCell}
                        board={this.state.board}
                    />
                )
            })

            return (
                <div key={"row" + xIndex} className="game-column">{column}</div>
            )
        });
        return display
    }

    // Updates targeted cell with value parameter
    setCell(x, y, value) {
        let newBoard = this.state.board;
        newBoard[x][y] = !value;
        this.setState({board: newBoard});
    }
    
    // Creates a new board based on x and y parameters
    createNewBoard(width, height) {
        const newBoard = [...Array(height)].map(() => Array(width).fill(false));
        return newBoard;
    }

    // Calculates the life and death of each cell, then sets the new board state accordingly
    nextGeneration() {
        let newBoard = this.state.board.map((row, x) => {
            return row.map((cell, y) => {
                let alive = false;
                const neighbors = this.countNeighbors(x, y)
                // if alive with 2 or 3 neighbors, live
                if (cell && [2, 3].includes(neighbors)) {
                    alive = true;
                // if dead with 3 neighbors, live
                } else if (neighbors === 3) {
                    alive = true;
                }
                return alive;
            })
        });
        this.setState({board: newBoard})
    }

    // Returns the number of "live" neighbors from passed coordinate
    countNeighbors(x, y) {
        const board = this.state.board
        let neighbors = 0
        //checking all neighboring arrays by shifting the x and y coordinates by -1, 0, and 1
        for (let xShift = -1; xShift < 2; xShift++) {
            for (let yShift = -1; yShift < 2; yShift++) {
                // Making sure we arent testing the current cell (0,0)
                if (!(xShift === 0 && yShift === 0)) {
                    const xTest = x + xShift;
                    const yTest = y + yShift;
                    // checking if tested cell exists
                    if (typeof board[xTest] !== "undefined" && typeof board[xTest][yTest !== "undefined"]) {
                        // if the tested neighbor is true, increment neighbors
                        if (board[xTest][yTest]) {
                            neighbors++;
                        }
                    }
                }
                
            }
        }
        // Mr. Rogers would be proud
        return neighbors;
    }

    componentDidUpdate() {
        // if height or width of the board have changed, create a new board with updated dimensions
        if (this.state.board.length !== this.state.height || this.state.board[0].length !== this.state.width) {
            this.setState({board: this.createNewBoard(this.state.width, this.state.height)});
        }
    }

    render() {
        const display = this.createDisplay();
        
        return (
            <Paper className="game">
                <div className="controls">
                    <Typography component='span' variant='h6'>Columns: </Typography>
                    {this.state.width > 1 && <RemoveCircleOutlineIcon className="addRemove" onClick={() => this.setState({width: this.state.width - 1})} />}
                    <AddCircleOutlineIcon className="addRemove" onClick={() => this.setState({width: this.state.width + 1})} />
                    <br />
                    <Typography component='span' variant='h6'>Rows: </Typography>
                    {this.state.height > 1 && <RemoveCircleOutlineIcon className="addRemove" onClick={() => this.setState({height: this.state.height - 1})} />}
                    <AddCircleOutlineIcon className="addRemove" onClick={() => this.setState({height: this.state.height + 1})}/>
                </div>
                <div className="board">
                    {display}
                </div>
                <Button className="next-gen" variant="contained" color="primary" onClick={() => this.nextGeneration()}>New Generation</Button>
            </Paper>
        )
    }
}

export default Game