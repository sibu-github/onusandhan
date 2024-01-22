import { splitWord } from 'split-bengali-word';
import { WORD_LENGTH } from './constants';

export enum MatchType {
  FullCorrectPos,
  FullIncorrectPos,
  PartialCorrectPos,
  PartialIncorrectPos,
  Wrong,
  Empty,
}

export type MatchResult = {
  str: string;
  matchType: MatchType;
};

const MAIN_CHARS_LOWER = 2437;
const MAIN_CHARS_UPPER = 2489;
const CHAR_RHA = 2525;
const CHAR_RRA = 2524;
const CHAR_ANUSVARA = 2434;
const CHAR_KHANDATA = 2510;
const CHAR_YYA = 2527;
const CHAR_RRI = 2528;

function isMainChars(ch: number): boolean {
  return (
    ch === CHAR_ANUSVARA ||
    ch === CHAR_RHA ||
    ch === CHAR_RRA ||
    ch === CHAR_KHANDATA ||
    ch === CHAR_YYA ||
    ch === CHAR_RRI ||
    (ch >= MAIN_CHARS_LOWER && ch <= MAIN_CHARS_UPPER)
  );
}

function isPartialMatch(s1: string, s2: string): boolean {
  const v1 = s1.split('').map((s) => s.charCodeAt(0));
  const v2 = s2.split('').map((s) => s.charCodeAt(0));
  return v1.some((n1) => isMainChars(n1) && v2.includes(n1));
}

export function getMatchResult(input: string, actual: string): MatchResult[] {
  const inputSplitted = splitWord(input);
  const actualSplitted = splitWord(actual);
  if (inputSplitted.length !== actualSplitted.length || actualSplitted.length !== WORD_LENGTH) {
    throw new Error('Incorrect word length');
  }
  const result: MatchResult[] = [];
  let idx = 0;
  while (idx < inputSplitted.length) {
    const e1 = inputSplitted[idx];
    const e2 = actualSplitted[idx];
    if (e1 === e2) {
      result.push({ str: e1, matchType: MatchType.FullCorrectPos });
      inputSplitted.shift();
      actualSplitted.shift();
      continue;
    } else if (actualSplitted.includes(e1)) {
      result.push({ str: e1, matchType: MatchType.FullIncorrectPos });
    } else if (isPartialMatch(e1, e2)) {
      result.push({ str: e1, matchType: MatchType.PartialCorrectPos });
    } else if (actualSplitted.some((e) => isPartialMatch(e1, e))) {
      result.push({ str: e1, matchType: MatchType.PartialIncorrectPos });
    } else {
      result.push({ str: e1, matchType: MatchType.Wrong });
    }
    idx++;
  }
  return result;
}
