import { useState } from "react";
// import JSONCodeEditor from "./jsonEditor";
import { useDispatch, useSelector } from "react-redux";
import { ConfigState, setRequestBody } from "@/store/configSlice";
import JsonEditor from "./JsonEditorMonaco";

const Body = () => {
  const { body } = useSelector(
    ({ appConfig }: { appConfig: ConfigState }) => appConfig
  );
  // const [bodyJson, setBodyJson] = useState("");
  const dispatch = useDispatch();
  // const handleChange = (value: string) => {
  //   setBodyJson(value);
  // };
  const [jsonValue, setJsonValue] = useState(JSON.stringify(body));
  const [_isValid, setIsValid] = useState(true);
  // const [parsedJson, setParsedJson] = useState(body);

  const handleJsonChange = (value: string | undefined) => {
    const newValue = value || "";
    setJsonValue(newValue);

    try {
      const parsed = JSON.parse(newValue);
      // setParsedJson(parsed);
      dispatch(setRequestBody(parsed));
    } catch (error) {
      // If JSON is invalid, we don't update the parsed value
      // The isValid state will be handled by the editor's validation
    }
  };

  // const onBlur = () => {
  //   const parsedJson = JSON.parse(bodyJson);
  //   dispatch(setRequestBody(parsedJson));
  // };
  return (
    <div>
      {/* <JSONCodeEditor onBlur={onBlur} onChange={handleChange} value={body} /> */}
      <JsonEditor
        value={jsonValue}
        onChange={handleJsonChange}
        onValidate={setIsValid}
        height="400px"
      />
    </div>
  );
};

export default Body;
