import { Accessor, createRenderEffect, onCleanup } from "solid-js";
import dayjs from "dayjs";

export function modelSelect(el: HTMLSelectElement, value: Accessor<any>) {
  const [field, setField] = value();

  createRenderEffect(() => {
    console.log(field());

    el.value = field();
  });

  function onChange(this: HTMLElement, ev: Event) {
    setField((ev.target as HTMLSelectElement).value);
  }
  el.addEventListener("change", onChange);

  onCleanup(() => {
    el.removeEventListener("change", onChange);
  });
}

export function modelText(el: HTMLInputElement, value: Accessor<any>) {
  const [field, setField] = value();

  createRenderEffect(() => (el.value = field()));

  function onInput(this: HTMLElement, ev: Event) {
    setField((ev.target as HTMLInputElement).value);
  }
  el.addEventListener("input", onInput);

  onCleanup(() => {
    el.removeEventListener("input", onInput);
  });
}

export function modelNumber(el: HTMLInputElement, value: Accessor<any>) {
  const [field, setField] = value();

  createRenderEffect(() => (el.value = field()));

  function onInput(this: HTMLElement, ev: Event) {
    setField(Number((ev.target as HTMLInputElement).value));
  }
  el.addEventListener("input", onInput);

  onCleanup(() => {
    el.removeEventListener("input", onInput);
  });
}

export function modelDateTime(el: HTMLInputElement, value: Accessor<any>) {
  const [field, setField] = value();

  createRenderEffect(
    () => (el.value = dayjs(field()).format("YYYY-MM-DDTHH:mm")),
  );

  function onInput(this: HTMLElement, ev: Event) {
    setField(Number((ev.target as HTMLInputElement).value));
  }
  el.addEventListener("input", onInput);

  onCleanup(() => {
    el.removeEventListener("input", onInput);
  });
}

export function resizeObserver(el: HTMLElement, value: Accessor<any>) {
  const onResize = value();
  const observer = new ResizeObserver((entries) => {
    if (!entries[0]) return;
    onResize(entries[0].contentRect);
  });

  observer.observe(el);

  onCleanup(() => {
    observer.disconnect();
  });
}

export function dialogWithMouse(node: HTMLElement) {
  createEffect(() => {
    if (node.dataset.draggable === "true") {
      draggable(node, ".drag-handler");
    }
    if (node.dataset.resizable === "true") {
      resizable(node, ".resize-handler");
    }
  })
}
/**
 * @param {HTMLElement} node
 * @param {string} header
 */
export function draggable(node: HTMLElement, handler: string) {
  let posX = 0, posY = 0;

  let dragHandler: HTMLElement;
  if (handler) {
    const headerEl = node.querySelector(handler) as HTMLElement;
    if (!headerEl) throw new Error(handler + " can not be found!");
    dragHandler = headerEl;
  } else {
    dragHandler = node;
  }

  dragHandler.addEventListener("mousedown", startDragging);

  function startDragging(this: HTMLElement, evt: MouseEvent) {
    evt.preventDefault();
    // get the starting mouse's position
    posX = evt.clientX;
    posY = evt.clientY;
    // setup event listeners handles when mouse moves and stops
    document.addEventListener("mouseup", stopDragging);
    document.addEventListener("mousemove", moveNode);
  }

  function moveNode(this: Document, evt: MouseEvent) {
    evt.preventDefault();
    // get the new mouse position
    const x = posX - evt.clientX;
    const y = posY - evt.clientY;
    posX = evt.clientX;
    posY = evt.clientY;
    // set `node` to the new position
    requestAnimationFrame(() => {
      node.style.top = node.offsetTop - y + "px";
      node.style.left = node.offsetLeft - x + "px";
    });
  }

  function stopDragging() {
    // release events to stop moving when mouse is released
    document.removeEventListener("mouseup", stopDragging);
    document.removeEventListener("mousemove", moveNode);
  }

  onCleanup(() => {
    stopDragging();
    dragHandler.removeEventListener("mousedown", startDragging);
  });
}

export function resizable(node: HTMLElement, handler: string) {
  let posX = 0, posY = 0;
  let width = 0, height = 0;

  let dragHandler = node.querySelector(handler) as HTMLElement;
  if (!dragHandler) return;

  dragHandler.addEventListener("mousedown", startDragging);

  function startDragging(this: HTMLElement, evt: MouseEvent) {
    evt.preventDefault();
    // get the starting mouse's position
    posX = evt.clientX;
    posY = evt.clientY;
    // get the current size
    width = node.clientWidth;
    height = node.clientHeight;
    // setup event listeners handles when mouse moves and stops
    document.addEventListener("mouseup", stopDragging);
    document.addEventListener("mousemove", resizeNode);
  }

  function resizeNode(this: Document, evt: MouseEvent) {
    evt.preventDefault();
    // compute new size based on mouse pos
    width -= posX - evt.clientX;
    height -= posY - evt.clientY;
    // get the new mouse position
    posX = evt.clientX;
    posY = evt.clientY;
    // set `node` to the new size
    requestAnimationFrame(() => {
      node.style.width = width + "px";
      node.style.height = height + "px";
    });
  }

  function stopDragging() {
    // release events to stop moving when mouse is released
    document.removeEventListener("mouseup", stopDragging);
    document.removeEventListener("mousemove", resizeNode);
  }

  onCleanup(() => {
    stopDragging();
    dragHandler.removeEventListener("mousedown", startDragging);
  });
}
