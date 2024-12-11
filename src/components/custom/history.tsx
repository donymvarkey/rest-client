import { HistoryState } from "@/store/historySlice";
import { Badge } from "../ui/badge";
import { Separator } from "../ui/separator";
import { getHttpMethodTextColor } from "@/utils";
import { useDispatch } from "react-redux";
import {
  setBaseUrl,
  setHeaders,
  setRequestBody,
  setUrl,
  setUrlParams,
} from "@/store/configSlice";

const History = ({ history }: { history: HistoryState }) => {
  const dispatch = useDispatch();
  const handleSelectFromHistory = (history: object) => {
    console.log(history);
    dispatch(setBaseUrl(history?.url));
    dispatch(setUrl(history?.url));
    dispatch(setUrlParams(history?.request_params));
    dispatch(setHeaders(history?.request_headers));
    dispatch(setRequestBody(history?.request_body));
  };
  return (
    <div className="w-full h-full px-2 py-2">
      <h3 className="text-zinc-300 text-md font-semibold font-nunito mt-2">
        History
      </h3>
      <Separator className="w-full bg-slate-600 my-2" />
      <div className="flex flex-col items-start justify-start gap-y-2 w-full overflow-hidden text-ellipsis">
        {history?.map((h: any, index: number) => (
          <div
            onClick={() => handleSelectFromHistory(h)}
            key={index}
            className="flex items-start gap-x-2 hover: cursor-pointer"
          >
            <Badge
              className={`bg-slate-200 text-[10px] text-slate-800 font-code hover:bg-slate-100 ${getHttpMethodTextColor(
                h?.request_method
              )}`}
            >
              {h?.request_method.toUpperCase()}
            </Badge>
            <div className="text-slate-100 font-nunito text-[0.8rem] ">
              {h?.url}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default History;
