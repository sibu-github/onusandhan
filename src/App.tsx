import React, { useEffect, useState } from 'react';
import { splitWord } from 'split-bengali-word';

import { INCORRECT_WORD_LENGTH, TOTAL_RETRY_COUNT, WORD_LENGTH } from './constants';
import Board from './Board';
import Header from './Header';
import Rules from './Rules';
import { MatchResult, MatchType, getMatchResult } from './matcher';
import { getAnswer } from './constants/answers';
import './App.css';

function createEmptyBoard(): MatchResult[][] {
  return new Array(TOTAL_RETRY_COUNT)
    .fill(0)
    .map(() => new Array(WORD_LENGTH).fill(0).map(() => ({ str: '', matchType: MatchType.Empty })));
}

function App() {
  const [actualWord, setActualWord] = useState('');
  const [currRow, setCurrRow] = useState(0);
  const [finished, setFinished] = useState(false);
  const [boardValue, setBoardValue] = useState<MatchResult[][]>(createEmptyBoard());
  const [inputWord, setInputWord] = useState('');
  const [suggestedWords, setSuggestedWords] = useState<string[]>([]);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    setActualWord(getAnswer());
  }, []);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      const val = inputWord.trim();
      if (!val) {
        setSuggestedWords([]);
        return;
      }
      const url = `https://inputtools.google.com/request?text=${val}&itc=bn-t-i0-und&num=5&cp=0&cs=1&ie=utf-8&oe=utf-8&app=demopage`;
      fetch(url, { method: 'POST' })
        .then((res) => res.json())
        .then((data) => {
          if (!Array.isArray(data) || data.length < 2 || data[0] !== 'SUCCESS') {
            throw new Error('Incorrect response: ' + JSON.stringify(data));
          }
          if (!Array.isArray(data[1]) || data[1].length < 1) {
            throw new Error('Incorrect response: ' + JSON.stringify(data));
          }
          const innerData = data[1][0];
          if (!Array.isArray(innerData) || innerData.length < 2) {
            throw new Error('Incorrect response: ' + JSON.stringify(data));
          }
          const suggested = innerData[1];
          if (Array.isArray(suggested) && suggested.length > 0) {
            setSuggestedWords(suggested);
          }
        })
        .catch(console.log);
    }, 250);

    return () => clearTimeout(timeoutId);
  }, [inputWord]);

  useEffect(() => {
    if (currRow === TOTAL_RETRY_COUNT) {
      setFinished(true);
      setErrorMessage(`সঠিক শব্দটি হল "${actualWord}"`);
    }
  }, [actualWord, currRow]);

  const onSelect = (word: string) => {
    if (finished) {
      return;
    }
    setErrorMessage('');
    const splitted = splitWord(word);
    if (splitted.length !== WORD_LENGTH) {
      setErrorMessage(INCORRECT_WORD_LENGTH);
      return;
    }
    const matchResult = getMatchResult(word, actualWord);
    const updatedValue = boardValue.map((v, i) =>
      i === currRow ? matchResult : v.map((e) => ({ ...e }))
    );
    setBoardValue(updatedValue);
    setCurrRow((prev) => prev + 1);
    setInputWord('');
    if (word === actualWord) {
      setFinished(true);
      setErrorMessage('আপনার অনুমান সম্পূর্ণভাবে মিলে গেছে।');
    }
  };

  return (
    <div className="App">
      <Header />
      <div className="line" />
      <Rules />
      <Board value={boardValue} />
      <input
        className="input-box"
        type="text"
        placeholder="আপনার নির্বাচিত শব্দটি এখানে লিখুন। "
        value={inputWord}
        onChange={(e) => setInputWord(e.target.value)}
      />
      {errorMessage ? <div className="error-msg">{errorMessage}</div> : false}
      {suggestedWords.length > 0 ? (
        <div className="suggestion-box">
          {suggestedWords.map((w, idx) => (
            <div key={idx} className="suggestion-item" onClick={() => onSelect(w)}>
              {w}
            </div>
          ))}
        </div>
      ) : (
        false
      )}
    </div>
  );
}

export default App;
