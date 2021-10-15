import clsx from "clsx";
import { Accessor, createSelector, Setter } from "solid-js";
import { classRadio, classRadioSelected } from "./RadioGroup.css";
import { classSelectContainer } from "./Select.css";

type RadioGroupProps = {
  options: Accessor<{ name: string; value: string }[]>;
  model: [Accessor<string>, Setter<string>];
};
export default function RadioGroup(
  { options, model: [value, setValue] }: RadioGroupProps,
) {
  const isSelected = createSelector(() => options().map((it) => it.value));

  return (
    <div class={classSelectContainer}>
      <For each={options()}>
        {(item) => (
          <span
            class={clsx(classRadio, isSelected(value()) && classRadioSelected)}
            onClick={() => setValue(item.value)}
          >
            {item.name}
          </span>
        )}
      </For>
    </div>
  );
}
