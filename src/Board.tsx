import React from 'react';
import { MatchResult, MatchType } from './matcher';
import {
  COLOR_BLACK,
  COLOR_BLUE,
  COLOR_GREEN,
  COLOR_GREY,
  COLOR_RED,
  COLOR_YELLOW,
} from './constants';

type BoardProps = {
  value: MatchResult[][];
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
  value: MatchResult[];
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
  value: MatchResult;
};

function BoardCell(props: CellProps) {
  const cellColor = { color: COLOR_BLACK };
  switch (props.value.matchType) {
    case MatchType.FullCorrectPos:
      cellColor.color = COLOR_GREEN;
      break;
    case MatchType.FullIncorrectPos:
      cellColor.color = COLOR_BLUE;
      break;
    case MatchType.PartialCorrectPos:
      cellColor.color = COLOR_YELLOW;
      break;
    case MatchType.PartialIncorrectPos:
      cellColor.color = COLOR_GREY;
      break;
    case MatchType.Wrong:
      cellColor.color = COLOR_RED;
      break;
    default:
      cellColor.color = COLOR_BLACK;
      break;
  }

  return (
    <div className="cell" style={cellColor}>
      {props.value.str}
    </div>
  );
}

export default Board;
