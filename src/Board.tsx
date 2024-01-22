import React from 'react';

type BoardProps = {
  value: string[][];
};

function Board(props: BoardProps) {
  return (
    <div className="board">
      {props.value.map((v, i) => (
        <BoardRow key={i} value={v} />
      ))}
    </div>
  );
}

type BoardRowProps = {
  value: string[];
};

function BoardRow(props: BoardRowProps) {
  return (
    <div className="row">
      {props.value.map((v, i) => (
        <BoardCell key={i} value={v} />
      ))}
    </div>
  );
}

type CellProps = {
  value: string;
};

function BoardCell(props: CellProps) {
  return <div className="cell">{props.value}</div>;
}

export default Board;
