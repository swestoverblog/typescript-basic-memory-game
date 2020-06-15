import shuffle from './shuffle';
import Card from './Card';

function cardsMatch(card1: Card, card2: Card): boolean {
  return card1.getType() === card2.getType();
}

export default class MemoryGame {
  protected cards: Card[];
  private numberOfMoves!: number;
  private selectedCard!: Card|null;
  private lockGame!: boolean;

  constructor(cards: Card[]) {
    this.cards = cards;
    this.resetGame();
  }

  public resetGame(): void {
    this.shuffleCards();
    this.numberOfMoves = 0;
    this.selectedCard = null;
    this.lockGame = false;
    this.flipCards();
  }

  public getCards(): Card[] {
    return this.cards;
  }

  public async selectCard(card: Card): Promise<void> {
    // check to see if the selected card is already face up
    if (!card.isVisible()) {
      // check to see if game is locked (for animations and time based events)
      if (!this.lockGame) {
        // this is the first card selected
        if (this.selectedCard === null) {
          this.selectedCard = card;
          // display card until a second card is choosen
          await card.flipCard();
        } else {
          // lock game until animations are complete
          this.lockGame = true;
          // display second card
          await card.flipCard();
          // second card was selected, increment total number of moves
          this.incrementTotalNumberOfMoves();
          // check for a match, if not a match flip cards over
          if (!cardsMatch(this.selectedCard, card)) {
            await Promise.all([card.flipCard(), this.selectedCard.flipCard()]);
          }
          // reset selected card
          this.selectedCard = null;
          // re-enable game
          this.lockGame = false;
        }
      }
    }
  }

  public getNumberOfMoves(): number {
    return this.numberOfMoves;
  }

  private shuffleCards(): void {
    this.cards = shuffle(this.cards);
  }

  private incrementTotalNumberOfMoves(): void {
    this.numberOfMoves += 1;
  }

  private flipCards(): void {
    this.cards.forEach((card: Card) => {
      card.flipCardFaceDown();
    });
  }

  public showRemainingCards(): void {
    this.cards.forEach((card: Card) => {
      console.log(card.isVisible());
    });
  }
}
