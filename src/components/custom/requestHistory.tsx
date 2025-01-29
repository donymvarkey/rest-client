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
import { Trash2 } from "lucide-react";
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
      <div className="flex flex-col gap-y-1 w-full">
        {history.length > 0 ? (
          <>
            {history?.map((h: any, index: number) => (
              <div
                className="flex w-full items-center justify-between hover:bg-zinc-900 hover:cursor-pointer rounded px-2 py-1"
                onMouseEnter={() => setHoverIndex(h?.id)}
                onMouseLeave={() => setHoverIndex(null)}
                key={index}
              >
                <div className="w-full flex items-center justify-start gap-x-2">
                  <div
                    role="button"
                    onClick={() => handleSelectFromHistory(h)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" || e.key === " ")
                        handleSelectFromHistory(h);
                    }}
                    className="flex-1 flex items-center gap-x-2 overflow-hidden"
                  >
                    <p
                      className={`text-xs font-medium font-code text-left ${getHttpMethodTextColor(
                        h?.method?.label
                      )}`}
                    >
                      {getHttpMethodShorts(h?.method?.label)}
                    </p>
                    <span className="truncate text-ellipsis text-xs font-nunito font-normal">
                      {h?.url}
                    </span>
                  </div>
                  {hoverIndex === h?.id && (
                    <div className="flex items-center gap-x-2">
                      {/* <CommonTooltip text="Add to Collection">
                        <button
                          className="shadow-none text-xs h-0
                    text-blue-200 hover:bg-transparent flex items-center
                    float-end font-nunito"
                        >
                          <PlusCircle className="w-4 h-4" />
                        </button>
                      </CommonTooltip> */}

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
