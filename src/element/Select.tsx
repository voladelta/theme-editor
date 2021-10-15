import { Accessor, Setter } from "solid-js";
import { classSelectContainer, classSelectElement } from "./Select.css";

type SelectProps = {
  options: Accessor<{ name: string; value: string }[]>;
  model: [Accessor<string>, Setter<string>];
};
export default function Select({ options, model }: SelectProps) {
  return (
    <div class={classSelectContainer}>
      <select class={classSelectElement} use:modelSelect={model}>
        <For each={options()}>
          {(o) => <option value={o.value}>{o.name}</option>}
        </For>
      </select>
    </div>
  );
}
