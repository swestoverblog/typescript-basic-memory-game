import Card from './app/Card';
import MemoryGame from './app/MemoryGame';

const cards: Card[] = [
  new Card('1'),
  new Card('1'),
  new Card('2'),
  new Card('2'),
];

(window as any).memoryGame = new MemoryGame(cards);
