import JSONCodeEditor from "./jsonEditor";

const Body = ({ json, setJson }: { json: object; setJson: () => {} }) => {
  const handleChange = (value: string) => {
    // const parsedJson = JSON.parse(value);
    setJson(value);
  };
  return (
    <div>
      {/* <Textarea
        // defaultValue={json}
        onChange={(e) => handleChange(e.target.value)}
        rows={10}
        placeholder="..."
        className="w-full p-2 border border-zinc-600 rounded font-mono"
      /> */}
      <JSONCodeEditor onChange={handleChange} value={undefined} />
    </div>
  );
};

export default Body;
