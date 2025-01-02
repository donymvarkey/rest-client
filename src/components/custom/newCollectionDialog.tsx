import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Separator } from "../ui/separator";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { createCollection } from "@/database/dbApi";

const NewCollection = ({
  open,
  onOpenChange,
}: {
  open: boolean;
  onOpenChange: () => void;
}) => {
  const [collectionName, setCollectionName] = useState("");

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="font-nunito text-slate-700">
            Create new Collection
          </DialogTitle>
        </DialogHeader>
        <Separator className="w-full bg-zinc-200" />
        <div className="flex flex-col my-5">
          <Label
            htmlFor="collectionName"
            className="mb-3 font-nunito text-slate-700"
          >
            Collection Name
          </Label>
          <Input
            onChange={(e) => setCollectionName(e.target.value)}
            id="collectionName"
            className="focus:ring-slate-500"
          />
        </div>
        <div className="w-full">
          <Button
            onClick={() => {
              createCollection(collectionName);
              onOpenChange();
            }}
            disabled={collectionName.length === 0}
            className="w-full"
          >
            Create Collection
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default NewCollection;
