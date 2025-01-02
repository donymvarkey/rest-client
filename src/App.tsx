import { useDispatch } from "react-redux";
import Layout from "./layout/Layout";
import { useLiveQuery } from "dexie-react-hooks";
import { db } from "./database";
import { addToHistory } from "./store/historySlice";
import { useEffect } from "react";

const App = () => {
  const dispatch = useDispatch();
  const historyData = useLiveQuery(() =>
    db.history.reverse().sortBy("createdAt")
  );
  const hydrateHistory = () => {
    historyData?.length && dispatch(addToHistory([...historyData]));
  };

  useEffect(() => {
    hydrateHistory();
  }, [historyData]);

  return (
    <div className="w-screen h-screen bg-zinc-800">
      <Layout />
    </div>
  );
};

export default App;
