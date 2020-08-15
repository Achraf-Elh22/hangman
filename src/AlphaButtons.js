import React, { Component } from "react"

class AlphaButtons extends Component {
    /* generateButtons: return array of letter buttons to render */
    generateButtons() {
        return "abcdefghijklmnopqrstuvwxyz".split("").map(ltr => (
            <button
                key={ltr}
                value={ltr}
                onClick={this.props.handleGuess}
                disabled={(this.props.nWrong < this.props.maxWrong) ? this.props.guessed.has(ltr) : true}
            >
                {ltr}
            </button>
        ));
    }
    render() {
        return <p className='Hangman-btns'>{this.generateButtons()}</p>
    }
}

export default AlphaButtons;