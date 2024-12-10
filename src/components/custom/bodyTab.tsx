import { useState } from "react";
import JSONCodeEditor from "./jsonEditor";
import { useDispatch, useSelector } from "react-redux";
import { ConfigState, setRequestBody } from "@/store/configSlice";

const Body = () => {
  const { body } = useSelector(
    ({ appConfig }: { appConfig: ConfigState }) => appConfig
  );
  const [bodyJson, setBodyJson] = useState("");
  const dispatch = useDispatch();
  const handleChange = (value: string) => {
    setBodyJson(value);
  };

  const onBlur = () => {
    const parsedJson = JSON.parse(bodyJson);
    dispatch(setRequestBody(parsedJson));
  };
  return (
    <div>
      <JSONCodeEditor
        onBlur={onBlur}
        onChange={handleChange}
        value={body || undefined}
      />
    </div>
  );
};

export default Body;
