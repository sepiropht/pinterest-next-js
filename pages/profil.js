import Header from "../components/Header";
import Profil from "../components/Profil";
import withRedux from "next-redux-wrapper";

import { initStore } from "../store";

const profil = () => (
  <Header>
    <Profil />
  </Header>
);
export default withRedux(initStore)(profil);
