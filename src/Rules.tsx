import React from 'react';
import { RULES } from './constants';

function Rules() {
  return (
    <div className="rules-container">
      <h2>নিয়মাবলী </h2>
      <ul>
        {RULES.map((r, i) => (
          <li key={i}>{r}</li>
        ))}
      </ul>
    </div>
  );
}

export default Rules;
