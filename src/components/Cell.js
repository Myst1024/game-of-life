import React from 'react';

const Cell = ({ x, y, setCell, board }) => {
    const value = board[x][y];
    const tree = <img alt="tree" src="https://i.imgur.com/DS2hAeo.png"/>
    const bear = <img alt="bear" src="https://i.imgur.com/5EfAEdA.png"/>
    return <div className="cell" onClick={() => setCell(x, y, value)}>{value && bear}{value === false && tree}</div>
}

export default Cell