import React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Separator } from "../ui/separator";
import { Input } from "../ui/input";
import { createCollection } from "@/database/dbApi";
import { Button } from "../ui/button";
import { CollectionType } from "@/types";
import { CheckCircle, Folder } from "lucide-react";

type SaveCollectionPropTypes = {
  open: boolean;
  setOpen: (open: boolean) => void;
  selectedCollection: CollectionType | null;
  setSelectedCollection: (collection: CollectionType | null) => void;
  newCollection: boolean;
  setNewCollection: (newCollection: boolean) => void;
  collectionName: string;
  setCollectionName: (name: string) => void;
  collection: CollectionType[];
  save: (collectionId: string) => void;
};

const SaveToCollection: React.FC<SaveCollectionPropTypes> = ({
  open,
  setOpen,
  selectedCollection,
  setSelectedCollection,
  newCollection,
  setNewCollection,
  collectionName,
  setCollectionName,
  collection,
  save,
}) => {
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="text-slate-800 text-medium font-nunito">
            Save Request
          </DialogTitle>
          <DialogDescription className="flex items-center gap-x-2 w-full">
            <h3 className="font-nunito font-semibold text-slate-800 text-xs">
              Save to
            </h3>
            <div className="font-nunito font-normal text-zinc-400 text-xs flex-1">
              {selectedCollection &&
              Object.keys(selectedCollection).length > 0 ? (
                <div className="flex items-center gap-x-1">
                  <span
                    onClick={() => setSelectedCollection(null)}
                    className="hover:cursor-pointer hover:text-zinc-500"
                  >
                    My Workspace
                  </span>
                  <span>/{selectedCollection?.name || ""}</span>
                </div>
              ) : (
                "Select a collection or create new"
              )}
            </div>
          </DialogDescription>
        </DialogHeader>
        <Separator className="w-full bg-slate-300 rounded-md" />
        <div className="">
          <Input
            placeholder="Search for collection name"
            className="placeholder:text-slate-300"
          />
          <div className="w-full border mt-2 h-[300px] rounded-md">
            {newCollection && (
              <div className="flex items-center gap-x-3 w-full px-2 py-3">
                <div className="flex-1">
                  <Input
                    onChange={(e) => setCollectionName(e.target.value)}
                    placeholder="New collection name"
                    className="placeholder:text-slate-300 flex-1 h-8"
                  />
                </div>
                <div>
                  <div className="flex items-center gap-x-1">
                    <Button
                      onClick={() => {
                        createCollection(collectionName);
                        setNewCollection(false);
                      }}
                      className="bg-slate-500 h-8 text-slate-100 hover:bg-slate-600 font-nunito text-xs shadow-none"
                    >
                      Create
                    </Button>
                    <Button
                      onClick={() => setNewCollection(false)}
                      className="bg-slate-100 h-8 text-slate-800 hover:bg-slate-200 font-nunito text-xs shadow-none"
                    >
                      Cancel
                    </Button>
                  </div>
                </div>
              </div>
            )}
            <div className="flex flex-col px-3 py-3 text-[14px] font-nunito text-medium text-slate-600 gap-y-2">
              {collection?.map((c: CollectionType) => (
                <div
                  onClick={() => setSelectedCollection(c)}
                  key={c?.id}
                  className="flex items-center justify-between text-sm gap-x-2 cursor-pointer"
                >
                  <div className="flex items-center gap-x-2">
                    <Folder className="w-4 h-4" />
                    <span>{c?.name}</span>
                  </div>

                  {selectedCollection?.id === c?.id && (
                    <CheckCircle className="w-3 h-3 text-green-500" />
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="flex items-center justify-between">
          <Button
            onClick={() => setNewCollection(true)}
            className="bg-transparent text-slate-800 hover:bg-transparent shadow-none font-nunito"
          >
            New Collection
          </Button>
          <div className="flex items-center gap-x-3">
            <Button
              onClick={() => setOpen(false)}
              className="bg-slate-100 text-slate-800 hover:bg-slate-200 font-nunito"
            >
              Cancel
            </Button>
            <Button
              onClick={() => save(selectedCollection?.id!)}
              className="bg-blue-500 text-slate-100 hover:bg-blue-600 font-nunito"
            >
              Save
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default SaveToCollection;
