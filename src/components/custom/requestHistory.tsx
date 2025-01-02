import { getHttpMethodShorts, getHttpMethodTextColor } from "@/utils";
import { useDispatch, useSelector } from "react-redux";
import {
  setBaseUrl,
  setHeaders,
  setMethod,
  setRequestBody,
  setUrl,
  setUrlParams,
} from "@/store/configSlice";
import { PlusCircle, Trash2 } from "lucide-react";
import { useState } from "react";
import { db } from "@/database";
import { HistoryItem } from "@/types";
import CommonTooltip from "./commonToolTip";

const RequestHistory = () => {
  const { history } = useSelector((state: any) => state.history);
  const [hoverIndex, setHoverIndex] = useState<string | null>("");
  const dispatch = useDispatch();

  const handleSelectFromHistory = (history: HistoryItem) => {
    dispatch(setBaseUrl(history?.url));
    dispatch(setUrl(history?.url));
    dispatch(setUrlParams(history?.params));
    dispatch(setHeaders([...history?.headers]));
    dispatch(setRequestBody(history?.body));
    dispatch(setMethod(history?.method));
  };

  const deleteItemFromHistory = async (id: string) => {
    await db.history.where("id").equals(id).delete();
  };

  return (
    <div className="w-full">
      <div>
        {history.length > 0 ? (
          <>
            {history?.map((h: any, index: number) => (
              <div
                onClick={() => handleSelectFromHistory(h)}
                onMouseEnter={() => setHoverIndex(h?.id)}
                onMouseLeave={() => setHoverIndex(null)}
                key={index}
                className="flex w-full items-center justify-between gap-x-2 py-1 hover:cursor-pointer hover:bg-zinc-700 hover:bg-opacity-50 rounded-sm"
              >
                <div className="flex items-center justify-end w-[15%] ">
                  <div
                    className={`bg-transparent
                       shadow-none text-[0.7rem] font-medium text-right font-code ${getHttpMethodTextColor(
                         h?.method?.label
                       )} hover:bg-transparent`}
                  >
                    {getHttpMethodShorts(h?.method?.label)}
                  </div>
                </div>
                <div className="text-slate-100 font-nunito text-[0.7rem] w-[85%] overflow-hidden">
                  <p className="text-ellipsis overflow-hidden">{h?.url}</p>
                </div>
                {hoverIndex === h?.id && (
                  <div className="flex items-center px-2 gap-x-2">
                    <CommonTooltip text="Add to Collection">
                      <button
                        className="shadow-none text-xs h-0
                    text-blue-200 hover:bg-transparent flex items-center
                    float-end font-nunito"
                      >
                        <PlusCircle className="w-4 h-4" />
                      </button>
                    </CommonTooltip>

                    <CommonTooltip text="Delete">
                      <button
                        onClick={() => deleteItemFromHistory(h?.id)}
                        className="bg-transparent shadow-none text-xs h-0 text-red-400 hover:bg-transparent flex items-center float-end font-nunito"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </CommonTooltip>
                  </div>
                )}
              </div>
            ))}
          </>
        ) : (
          <span className="text-xs font-nunito text-zinc-500">
            No History Found
          </span>
        )}
      </div>
    </div>
  );
};

export default RequestHistory;
