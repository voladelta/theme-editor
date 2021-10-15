import "virtual:windi.css";
import "tippy.js/dist/tippy.css";
import "tippy.js/animations/scale.css";
import "./index.css";

import { render } from "solid-js/web";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import App from "./App";
import { loadSettings } from "./store/settings";

dayjs.extend(utc);

;(async () => {
  await loadSettings()

  render(() => <App />, document.getElementById("root")!);
})()
