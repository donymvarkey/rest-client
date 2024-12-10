import { useState } from "react";
import JSONCodeEditor from "./jsonEditor";
import { useDispatch } from "react-redux";
import { setRequestBody } from "@/store/configSlice";

const Body = () => {
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
        value={undefined}
      />
    </div>
  );
};

export default Body;
