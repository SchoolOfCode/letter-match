import React from "react";
import css from "./App.module.css";
import { useState } from "react";
import { useEffect } from "react";

// random pairs of shapes
// choice 1
// choice 2
// check if they match
// cant choose same twice
// game over when matched all pairs
const choiceLimit = 2;

const initialShapes = [..."abcde".repeat(choiceLimit)].sort(
  () => 0.5 - Math.random()
);

function App() {
  const [shapes, setShapes] = useState(initialShapes);
  const [choices, setChoices] = useState([]);

  function makeChoice(i) {
    if (choices.length >= choiceLimit) return;
    if (choices.includes(i)) {
      return setChoices(choices.filter(choice => choice !== i));
    }
    setChoices([...choices, i]);
  }

  useEffect(() => {
    if (choices.length === choiceLimit) {
      if (checkMatch()) {
        setShapes(shapes.filter(shape => shape !== shapes[choices[0]]));
      }
      setChoices([]);
    }
  }, [choices]);

  function checkMatch() {
    return choices.every(i => shapes[i] === shapes[choices[0]]);
  }

  return (
    <div className={css.container}>
      {shapes.map((shape, i) => (
        <p
          style={choices.includes(i) ? { color: "red" } : {}}
          onClick={() => makeChoice(i)}
        >
          {shape}
        </p>
      ))}
      {!shapes.length && <h1>YOU WIN!!</h1>}
    </div>
  );
}

export default App;
