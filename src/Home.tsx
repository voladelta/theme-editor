import Button from "./element/Button";
import Toolbar from "./element/Toolbar";
import ThemeEditorDialog from "./component/ThemeEditorDialog";
import { useToggle } from "./lib/fn";

export default function Home() {
  const editorVisibleModel = useToggle(false);

  return (
    <div
      id="vchart"
      class="bp-app"
      style={{
        position: "relative",
        "overflow-y": "auto",
        width: "100%",
        height: "100%",
        "min-height": "100vh",
      }}
    >
      <Toolbar>
        <Button onClick={() => editorVisibleModel[1]()}>
          Editor
        </Button>
      </Toolbar>
      <div>
        <ThemeEditorDialog
          model={editorVisibleModel}
        />
      </div>
    </div>
  );
}
