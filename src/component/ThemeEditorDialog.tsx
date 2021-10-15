import Dialog, { DialogProps } from "~/element/Dialog";
import ThemeEditor from "./ThemeEditor";

export default function ThemeEditorDialog(
  { model }: Pick<DialogProps, "model">,
) {
  return (
    <Dialog
      title="Theme Editor"
      model={model}
      isDraggable={true}
      isResizable={true}
    >
      <ThemeEditor />
    </Dialog>
  );
}
