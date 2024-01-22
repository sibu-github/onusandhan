import React from 'react';
import { RULES } from './constants';

function Rules() {
  return (
    <>
      <div className="rules-container">
        <h2>নিয়মাবলী </h2>
        <ul>
          {RULES.map((r, i) => (
            <li key={i}>{r}</li>
          ))}
        </ul>
      </div>
      <div>
        <div className="dotbox-row">
          <div className="dotbox dotbox-green"></div>
          <div>অক্ষরটি সম্পূর্ণভাবে মিলে গেছে এবং সঠিক স্থানে রয়েছে।</div>
        </div>
        <div className="dotbox-row">
          <div className="dotbox dotbox-blue"></div>
          <div>অক্ষরটি সম্পূর্ণভাবে মিলে গেছে কিন্তু সঠিক স্থানে নেই।</div>
        </div>
        <div className="dotbox-row">
          <div className="dotbox dotbox-yellow"></div>
          <div>অক্ষরটি আংশিকভাবে মিলেছে এবং সঠিক স্থানে রয়েছে।</div>
        </div>
        <div className="dotbox-row">
          <div className="dotbox dotbox-grey"></div>
          <div>অক্ষরটি আংশিকভাবে মিলেছে কিন্তু সঠিক স্থানে নেই।</div>
        </div>
        <div className="dotbox-row">
          <div className="dotbox dotbox-red"></div>
          <div>অক্ষরটি উত্তরের শব্দের মধ্যে নেই।</div>
        </div>
      </div>
    </>
  );
}

export default Rules;
