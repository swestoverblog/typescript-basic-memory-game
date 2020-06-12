/**
 * Fisher Yates shuffle
 * @param array an array of items that need to be shuffled.
 */
export default function shuffle(array: any[]) {
  let currentIndex: number = array.length;
  let temporaryValue: any;
  let randomIndex: number;

  while (currentIndex !== 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}
