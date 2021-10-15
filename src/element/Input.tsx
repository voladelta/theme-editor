import { Accessor, Setter } from "solid-js";
import { classInputBase } from "./Input.css";

type InputProps = Record<string, any> & {
  model: [Accessor<string>, Setter<string>];
  debounce?: number;
  placeholder?: string;
  name?: string;
};

export default function Input({ model, ...others }: InputProps) {
  return (
    <input
      class={classInputBase}
      use:modelText={model}
      {...others}
    />
  );
}
