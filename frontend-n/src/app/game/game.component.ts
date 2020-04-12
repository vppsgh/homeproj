import { Component, OnInit } from '@angular/core';


export class Attempt {

  constructor(
    public attemptDigits: number[],
    public exact: number,
    public notExact: number,
    ) 
    {    
      this.attemptDigits  = Object.assign([], attemptDigits);
    }
}

@Component({
  selector: 'game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css']
})
export class GameComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    this.resetGame();
  }

  digits : number[];
  showDigits : string[];
  attempts : Attempt[];
  guess = [];  // Current guess
  guessValid = false;
  gameOver = false;

  submitGuess() {
    if(this.validateGuess())
    {
      var result = this.checkResult();
      // Wait 500 ms
      this.attempts.push(new Attempt(this.guess, result[0], result[1]));
      this.guess = ['','','',''];
      this.guessValid = false;
      if (result[0] == 4)
      {
        this.gameOver = true;
        this.showDigits = this.digits.map(String);
      }
    } 
  }

  addGuessDigit(index : number, digit : number) : void {
    this.guess[index] = digit;
    this.guessValid = this.validateGuess();
  }

  validateGuess() : boolean {
    // Validate guess
    var res = this.guess.every((e) => {return !isNaN(parseInt(e));});
    if (!res) return false;
    res = this.guess.every((e) => {return this.guess.indexOf(e) == this.guess.lastIndexOf(e);});
    if (!res) return false;
    return true;
  }

  checkResult() : number[] {
    var exact = 0;
    var notExact = 0;
    this.guess.forEach( (e, i) => {
      if (this.digits.indexOf(parseInt(e)) == i)
      {
        exact++;
      }
      else if (this.digits.indexOf(parseInt(e)) != -1)
      {
        notExact++;
      }
    });
    return [exact, notExact];
  }

  resetGame() {
    this.resetDigits();
    this.attempts = [];
    this.guess = ['','','',''];
    this.guessValid = false;
    this.gameOver = false;
  }

  resetDigits() {
    this.digits = [];
    while(this.digits.length < 4){
        var r = Math.floor(Math.random() * Math.floor(10));
        if(this.digits.indexOf(r) === -1) this.digits.push(r);
    }
    this.showDigits = ['X','X','X','X'];
    console.log(this.digits);
  }
}
