import { getHttpMethodShorts, getHttpMethodTextColor } from "@/utils";
import { Badge } from "../ui/badge";
import { addToHistory } from "@/store/historySlice";
import { useDispatch, useSelector } from "react-redux";
import {
  setBaseUrl,
  setHeaders,
  setMethod,
  setRequestBody,
  setUrl,
  setUrlParams,
} from "@/store/configSlice";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "../ui/button";
import { Trash2 } from "lucide-react";
import { useState } from "react";
import { db } from "@/database";
import { HistoryItem } from "@/types";

const RequestHistory = () => {
  const { history } = useSelector((state: any) => state.history);
  const [deleteDialog, setDeleteDialog] = useState(false);
  const dispatch = useDispatch();

  const handleSelectFromHistory = (history: HistoryItem) => {
    dispatch(setBaseUrl(history?.url));
    dispatch(setUrl(history?.url));
    dispatch(setUrlParams(history?.params));
    dispatch(setHeaders([...history?.headers]));
    dispatch(setRequestBody(history?.body));
    dispatch(setMethod(history?.method));
  };

  const deleteHistory = () => {
    db.history.clear();
    setDeleteDialog(false);
    dispatch(addToHistory([]));
  };

  return (
    <div className="w-full">
      {history?.length > 0 && (
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                onClick={() => setDeleteDialog(true)}
                className="bg-transparent shadow-none text-xs p-0 text-red-500 hover:bg-transparent flex items-center float-end font-nunito"
              >
                <Trash2 />
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p className="font-nunito">Delete all</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      )}

      <Dialog
        open={deleteDialog}
        onOpenChange={() => setDeleteDialog((prevState) => !prevState)}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="font-nunito">
              Are you absolutely sure?
            </DialogTitle>
            <DialogDescription className="font-nunito">
              This action cannot be undone. This will permanently delete your
              history and cannot be recovered.
            </DialogDescription>
          </DialogHeader>
          <div className="flex items-center gap-x-3">
            <Button
              onClick={() => {
                setDeleteDialog(false);
              }}
              className="bg-transparent shadow-none font-nunito text-zinc-800 hover:bg-slate-200"
            >
              Cancel
            </Button>
            <Button
              onClick={deleteHistory}
              className="bg-red-500 shadow-none font-nunito text-slate-100 hover:bg-red-600"
            >
              Delete
            </Button>
          </div>
        </DialogContent>
      </Dialog>
      <div>
        {history.length > 0 ? (
          <>
            {history?.map((h: any, index: number) => (
              <div
                onClick={() => handleSelectFromHistory(h)}
                key={index}
                className="flex w-full items-center gap-x-2 hover: cursor-pointer"
              >
                <div className="flex items-center justify-center w-[10%]">
                  <Badge
                    className={`bg-transparent text-right w-full
                       shadow-none px-0 text-[0.8rem] text-slate-800 font-code hover:bg-transparent ${getHttpMethodTextColor(
                         h?.method?.label
                       )}`}
                  >
                    {getHttpMethodShorts(h?.method?.label)}
                  </Badge>
                </div>
                <div className="text-slate-100 font-nunito text-[0.8rem] w-[90%] ">
                  <p className="text-ellipsis overflow-hidden">{h?.url}</p>
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
