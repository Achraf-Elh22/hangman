import React, { Component } from "react";
import { randomWord } from "./words";
import AlphaButtons from "./AlphaButtons";
import "./Hangman.css";
import img0 from "./0.jpg";
import img1 from "./1.jpg";
import img2 from "./2.jpg";
import img3 from "./3.jpg";
import img4 from "./4.jpg";
import img5 from "./5.jpg";
import img6 from "./6.jpg";

class Hangman extends Component {
  /** by default, allow 6 guesses and use provided gallows images. */
  static defaultProps = {
    maxWrong: 6,
    images: [img0, img1, img2, img3, img4, img5, img6]
  };

  constructor(props) {
    super(props);
    this.state = { nWrong: 0, guessed: new Set(), answer: randomWord() };
    this.handleGuess = this.handleGuess.bind(this);
  }

  /** guessedWord: show current-state of word:
    if guessed letters are {a,p,e}, show "app_e" for "apple"
  */
  guessedWord() {
    return this.state.answer
      .split("")
      .map(ltr => (this.state.guessed.has(ltr) ? ltr : "_"));
  }

  /** handleGuest: handle a guessed letter:
    - add to guessed letters
    - if not in answer, increase number-wrong guesses
  */
  handleGuess(evt) {
    let ltr = evt.target.value;
    this.setState(st => ({
      guessed: st.guessed.add(ltr),
      nWrong: st.nWrong + (st.answer.includes(ltr) ? 0 : 1)
    }));
  }


  // Handle reset: reset guessed list and number of wrong guesses.
  handleReset = () => {
    this.reset()
  }

  reset = () => {
    this.setState((curSt) => ({
      guessed: new Set(),
      nWrong: 0,
      answer: randomWord()
    }))
  }

  /** render: render game */
  render() {
    return (
      <div className='Hangman'>
        <h1>Hangman</h1>
        <img src={this.props.images[this.state.nWrong]} alt={`${this.state.nWrong} wrong guesses`} />
        <p>{`Number Wrong: ${this.state.nWrong}`}</p>
        {(this.state.nWrong >= this.props.maxWrong) ? <p style={{ fontSize: '24px', fontWeight: "bolder" }}>You Lose</p> : ""}
        <p className='Hangman-word'>{(this.state.nWrong >= this.props.maxWrong) ? this.state.answer : this.guessedWord()}</p>
        <AlphaButtons nWrong={this.state.nWrong} maxWrong={this.props.maxWrong} guessed={this.state.guessed} handleGuess={this.handleGuess} />
        <button className="reset-btn" onClick={this.handleReset} >Reset</button>
      </div>
    );
  }
}

export default Hangman;