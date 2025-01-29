import React from "react";
import Editor, { OnMount, OnValidate } from "@monaco-editor/react";

import { Button } from "../ui/button";

interface JsonEditorProps {
  value: string;
  onChange: (value: string | undefined) => void;
  height?: string | number;
  readOnly?: boolean;
  onValidate?: (isValid: boolean) => void;
  className?: string;
}

const JsonEditor: React.FC<JsonEditorProps> = ({
  value,
  onChange,
  height = "500px",
  readOnly = false,
  onValidate,
  className = "",
}) => {
  const [isValid, setIsValid] = React.useState(true);
  const [editorInstance, setEditorInstance] = React.useState<any>(null);

  const handleEditorDidMount: OnMount = (editor) => {
    setEditorInstance(editor);

    // Format the code on mount
    setTimeout(() => {
      editor.getAction("editor.action.formatDocument").run();
    }, 100);
  };

  const handleValidation: OnValidate = (markers) => {
    const valid = markers.length === 0;
    setIsValid(valid);
    onValidate?.(valid);
  };

  const formatDocument = () => {
    if (editorInstance) {
      editorInstance.getAction("editor.action.formatDocument").run();
    }
  };

  return (
    <div className={`flex flex-col gap-2 ${className} `}>
      <div className="flex items-center justify-end">
        <Button
          onClick={formatDocument}
          className="bg-transparent shadow-none text-xs hover:bg-gray-700"
        >
          Beautify
        </Button>
      </div>
      <Editor
        height={height}
        theme="vs-dark"
        defaultLanguage="json"
        value={value}
        onChange={onChange}
        options={{
          minimap: { enabled: false },
          fontSize: 12,
          lineNumbers: "on",
          tabSize: 2,
          readOnly,
          scrollBeyondLastLine: false,
          automaticLayout: true,
          formatOnPaste: true,
          formatOnType: true,
          fontFamily: "Fira Code",
          wrappingIndent: "indent",
          padding: { top: 10, bottom: 10 },
          matchBrackets: "always",
        }}
        onMount={handleEditorDidMount}
        onValidate={handleValidation}
        className="overflow-hidden rounded"
      />
    </div>
  );
};

export default JsonEditor;
