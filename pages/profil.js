import Header from "../components/Header";
import Profil from "../components/Profil";
import withRedux from "next-redux-wrapper";
const diceVal = {
  1: 1000,
  6: 600,
  5: 500,
  4: 400,
  3: 300,
  2: 200,
  "1bis": 100,
  "5bis": 50
};
const score = dice => {
  const objDice = dice.reduce(
    (acc, curr) =>
      Object.assign(acc, { [curr]: acc[curr] ? acc[curr] + 1 : 1 }),
    {}
  );
  return Object.key(objDice).reduce(
    (acc, curr) => {
      if (objDice[curr] === 3) return acc + diceVal[curr];
      if (objDice[curr] === 1 && curr === 1) return acc + diceVal["1bis"];
      if (objDice[curr] === 1 && curr === 5) return acc + diceVal["5bis"];
      if (objDice[curr] === 4 && curr === 1)
        return acc + diceVal["1bis"] + diceVal[1];
      if (objDice[curr] === 4 && curr === 5)
        return acc + diceVal["5bis"] + diceVal[5];
    },
    0
  );
};
import { initStore } from "../store";

const profil = () => (
  <Header>
    <Profil />
  </Header>
);
export default withRedux(initStore)(profil);
