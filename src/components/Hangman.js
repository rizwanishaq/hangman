import React, { useState } from "react";
import "./Hangman.css";
import img0 from "../images/0.jpg";
import img1 from "../images/1.jpg";
import img2 from "../images/2.jpg";
import img3 from "../images/3.jpg";
import img4 from "../images/4.jpg";
import img5 from "../images/5.jpg";
import img6 from "../images/6.jpg";
import { randomWord } from "../words";

function Hangman() {
  const images = [img0, img1, img2, img3, img4, img5, img6];
  const maxWrong = 6;
  const [state, setState] = useState({
    nWrong: 0,
    guessed: new Set(),
    answer: randomWord()
  });

  const handleGuess = evt => {
    let ltr = evt.target.value;
    setState(st => ({
      ...state,
      guessed: st.guessed.add(ltr),
      nWrong: st.nWrong + (st.answer.includes(ltr) ? 0 : 1)
    }));
  };

  const generateButtons = () => {
    return "abcdefghijklmnopqrstuvwxyz".split("").map(ltr => (
      <button
        key={ltr}
        value={ltr}
        onClick={handleGuess}
        disabled={state.guessed.has(ltr)}
      >
        {ltr}
      </button>
    ));
  };

  const guessedWord = () => {
    return state.answer
      .split("")
      .map(ltr => (state.guessed.has(ltr) ? ltr : "_"));
  };

  const gameOver = state.nWrong >= maxWrong;
  const isWinner = guessedWord().join("") === state.answer;
  let gameState = generateButtons();
  if (isWinner) gameState = "You Win!";
  if (gameOver) gameState = "You Lose!";

  return (
    <div className="Hangman">
      <h1>Hangman</h1>
      <img
        src={images[state.nWrong]}
        alt={`${state.nWrong}/${maxWrong} guesses`}
      />
      <p>Guessed Wrong: {state.nWrong}</p>
      <p className="Hangman-word">{!gameOver ? guessedWord() : state.answer}</p>
      <p className="Hangman-btns">{gameState}</p>
      <button
        id="reset"
        onClick={() => {
          setState({
            nWrong: 0,
            guessed: new Set(),
            answer: randomWord()
          });
        }}
      >
        Restart?
      </button>
    </div>
  );
}

export default Hangman;
