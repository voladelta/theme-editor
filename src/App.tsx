import type { Component } from "solid-js";
import { watchAndSave } from "~/store/settings";
import Home from "./Home";

const App: Component = () => {
  watchAndSave();
  return <Home />;
};

export default App;
