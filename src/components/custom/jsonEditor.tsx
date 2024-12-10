import CodeMirror from "@uiw/react-codemirror";
import { json } from "@codemirror/lang-json";
import { tokyoNight } from "@uiw/codemirror-themes-all";

const JsonEditor = ({ value, onChange, onBlur }) => {
  return (
    <CodeMirror
      onBlur={onBlur}
      value={JSON.stringify(value)}
      height="200px"
      theme={tokyoNight}
      extensions={[json()]}
      onChange={onChange}
    />
  );
};

export default JsonEditor;
