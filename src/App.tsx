import React, { useEffect, useState } from 'react';
import { splitWord } from 'split-bengali-word';

import './App.css';

function App() {
  const [inputWord, setInputWord] = useState('');
  const [suggestedWords, setSuggestedWords] = useState<string[]>([]);

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

  return (
    <div className="App">
      <input
        className="input-box"
        type="text"
        placeholder="আপনার নির্বাচিত শব্দটি এখানে লিখুন। "
        value={inputWord}
        onChange={(e) => setInputWord(e.target.value)}
      />
      {suggestedWords.length > 0 ? (
        <div className="suggestion-box">
          {suggestedWords.map((w, idx) => (
            <div key={idx} className="suggestion-item">
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
