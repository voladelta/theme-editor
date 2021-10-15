import { onCleanup, onMount } from "solid-js";
import Konva from "konva";

export type LayerMouse = {
  hLine: Konva.Line;
  vLine: Konva.Line;
  xText: Konva.Text;
  yText: Konva.Text;
  layer: Konva.Layer;
};

export type ChartCanvas = {
  mouse: LayerMouse;
  layerChart: Konva.Layer;
  chartWidth: number;
  chartHeight: number;
};

type MarkEventHandler = (pos: Konva.Vector2d | null) => void;
type MouseEventHandler = (pos: Konva.Vector2d | null) => void;

function setupEvents(
  stage: Konva.Stage,
  { onMark, onMouse }: {
    onMark?: MarkEventHandler;
    onMouse?: MouseEventHandler;
  },
) {
  if (onMouse) {
    stage.on("mousemove", () => {
      onMouse(stage.getPointerPosition());
    });
  }

  if (onMark) {
    stage.on("click", ({ evt }) => {
      if (!evt.shiftKey) return;

      onMark(stage.getPointerPosition());
    });
  }
}

function setupLayerMouse(
  layerMouse: Konva.Layer,
  width: number,
  height: number,
) {
  const hLine = new Konva.Line({
    points: [0, 0, width, 0],
    visible: false,
    stroke: "#0D9488",
    strokeWidth: 2,
  });
  const vLine = new Konva.Line({
    points: [0, 0, 0, height],
    visible: false,
    stroke: "#0D9488",
    strokeWidth: 2,
  });

  const xText = new Konva.Text({
    x: 0,
    y: height - 12,
    text: "",
    fontSize: 12,
    fontFamily: "Inter",
    fill: "#ffa600",
    align: "center",
    visible: false,
  });

  const yText = new Konva.Text({
    x: width - 55,
    y: 0,
    text: "",
    fontSize: 12,
    fontFamily: "Inter",
    fill: "#ffa600",
    align: "center",
    visible: false,
  });

  layerMouse.add(hLine, vLine, xText, yText);

  return {
    hLine,
    vLine,
    xText,
    yText,
    layer: layerMouse,
  };
}

type ResizeEventHandler = (rect: DOMRectReadOnly) => void;

type ChartBaseProps = {
  assignRef: Function;
  height: string;
  onResize?: ResizeEventHandler;
  onMouse?: MouseEventHandler;
  onMark?: MarkEventHandler;
};

export default function ChartBase(
  { assignRef, height, onResize, onMark, onMouse }: ChartBaseProps,
) {
  let container: HTMLDivElement;
  let stage: Konva.Stage;

  onMount(() => {
    const { width, height } = container.getBoundingClientRect();
    stage = new Konva.Stage({ container, width, height });

    const layerChart = new Konva.Layer({ listening: false });
    const layerMouse = new Konva.Layer({ listening: false });

    stage.add(layerChart, layerMouse);
    setupEvents(stage, { onMark, onMouse });

    assignRef({
      mouse: setupLayerMouse(layerMouse, width, height),
      layerChart,
      chartWidth: width,
      chartHeight: height,
    });

    onCleanup(() => {
      stage.destroy();
    });
  });

  function doResize(rect: DOMRectReadOnly) {
    stage?.size({ width: rect.width, height: rect.height });
    if (onResize) onResize(rect);
  }

  return (
    <div
      //@ts-ignore
      ref={container}
      use:resizeObserver={doResize}
      class="w-full h-full"
      style={`height: ${height}`}
    />
  );
}
