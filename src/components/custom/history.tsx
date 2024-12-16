import { HistoryState } from "@/store/historySlice";
import { Badge } from "../ui/badge";
import { getHttpMethodShorts, getHttpMethodTextColor } from "@/utils";
import { useDispatch } from "react-redux";
import {
  setBaseUrl,
  setHeaders,
  setMethod,
  setRequestBody,
  setUrl,
  setUrlParams,
} from "@/store/configSlice";
import { Button } from "../ui/button";
import { PlusCircle } from "lucide-react";

const History = ({ history }: { history: HistoryState }) => {
  const dispatch = useDispatch();
  const handleSelectFromHistory = (history: object) => {
    dispatch(setBaseUrl(history?.url));
    dispatch(setUrl(history?.url));
    dispatch(setUrlParams(history?.params));
    dispatch(setHeaders([...history?.headers]));
    dispatch(setRequestBody(history?.body));
    dispatch(setMethod(history?.method));
  };
  return (
    <div className="w-full h-full">
      <div className="w-full border-0 h-12 py-2 px-3 border-b-zinc-600 border-b flex items-center justify-start">
        <h3 className="text-zinc-300 text-md font-semibold font-nunito">
          History
        </h3>
      </div>
      <div className="flex items-center justify-between px-3 font-nunito">
        <span className="text-zinc-600 text-[14px]">Workspaces</span>
        <Button className="bg-transparent shadow-none hover:bg-transparent">
          <PlusCircle />
        </Button>
      </div>
      <div className="flex flex-col items-start justify-start gap-y-2 px-3 mt-3 w-full overflow-hidden text-ellipsis">
        {history?.map((h: any, index: number) => (
          <div
            onClick={() => handleSelectFromHistory(h)}
            key={index}
            className="flex w-full items-center gap-x-2 hover: cursor-pointer"
          >
            <div className="flex items-center justify-center w-[10%]">
              <Badge
                className={`bg-transparent shadow-none px-0 text-[0.8rem] text-slate-800 font-code hover:bg-transparent ${getHttpMethodTextColor(
                  h?.method
                )}`}
              >
                {getHttpMethodShorts(h?.method.toUpperCase())}
              </Badge>
            </div>
            <div className="text-slate-100 font-nunito text-[0.8rem] w-[90%] ">
              <p className="text-ellipsis overflow-hidden">{h?.url}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default History;
