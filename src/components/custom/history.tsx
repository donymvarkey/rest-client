import { useDispatch } from "react-redux";
import { Button } from "../ui/button";
import { PlusCircle } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useEffect, useState } from "react";
import NewCollection from "./newCollectionDialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import RequestHistory from "./requestHistory";
import ApiCollections from "./apiCollections";
import { addToCollection } from "@/store/collectionSlice";
import { db } from "@/database";
import { useLiveQuery } from "dexie-react-hooks";
import { Separator } from "../ui/separator";

const History = () => {
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();

  const collectionData = useLiveQuery(() => {
    return db.collections.toArray();
  });

  const hydrateCollections = () => {
    if (collectionData) {
      dispatch(addToCollection(collectionData));
    }
  };

  const onOpenChange = (open: boolean) => {
    setOpen(open);
  };

  useEffect(() => {
    hydrateCollections();
  }, [collectionData]);
  return (
    <div className="w-full h-full">
      <div className="w-full border-0  h-12 py-2 px-3 border-b-zinc-600 border-b flex items-center justify-between">
        <h3 className="text-zinc-300 text-md font-semibold font-nunito">
          History
        </h3>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                onClick={() => {
                  setOpen(true);
                }}
                className="bg-transparent shadow-none hover:underline hover:bg-transparent p-0 m-0 border-0 text-xs"
              >
                <PlusCircle />
                New Collection
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p className="font-nunito">Create New Collection</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
      <NewCollection open={open} onOpenChange={onOpenChange} />
      <div>
        <Tabs defaultValue="history" className="w-full text-zinc-100 px-0 my-1">
          <TabsList className="h-7">
            <TabsTrigger className="" value="collection">
              Collections
            </TabsTrigger>
            <TabsTrigger className="" value="history">
              History
            </TabsTrigger>
          </TabsList>
          <Separator className="bg-zinc-600 w-full" />
          <TabsContent value="collection">
            <div className="flex flex-col items-start justify-start gap-y-2 px-3 mt-3 w-full overflow-hidden text-ellipsis">
              <ApiCollections />
            </div>
          </TabsContent>
          <TabsContent value="history">
            <div className="flex flex-col items-start justify-start gap-y-2 px-3 mt-3 w-full overflow-hidden text-ellipsis">
              <RequestHistory />
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default History;
