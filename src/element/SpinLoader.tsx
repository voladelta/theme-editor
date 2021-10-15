import { Accessor, JSXElement } from "solid-js";

type SpinerProps = {
  color?: string;
  scale?: number;
};
export function Spinner({ color = "#14B8A6", scale = 1 }: SpinerProps) {
  const style = `--spinner-color: ${color}; transform: scale(${scale})`;

  return (
    <div class="lds-ripple" style={style}>
      <div />
      <div />
    </div>
  );
}

type SpinerLoaderProps = {
  isLoading: Accessor<boolean>;
  children: JSXElement;
};
export default function SpinerLoader(props: SpinerLoaderProps) {
  return (
    <div class="relative">
      <Show when={props.isLoading()}>
        <div class="bp-spin-loader">
          <Spinner />
        </div>
      </Show>
      {props.children}
    </div>
  );
}
