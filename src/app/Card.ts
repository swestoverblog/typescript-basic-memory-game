export default class Card {
  private type: string;
  private visible: boolean;

  constructor(cardType: string) {
    this.type = cardType;
    this.visible = false;
  }

  public setType(type: string): void {
     this.type = type;
  }

  public getType(): string {
    return this.type;
  }

  public async flipCard(): Promise<void> {
    this.visible = !this.visible;
  }

  public isVisible(): boolean {
    return this.visible;
  }

  public flipCardFaceDown(): void {
    this.visible = false;
  }
}
