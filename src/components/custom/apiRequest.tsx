import Select, { SingleValue } from "react-select";
import { HTTP_METHODS, METHOD_COLORS, TABS } from "@/constants";
import { Separator } from "../ui/separator";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Params from "./paramsTab";
import Body from "./bodyTab";
import Headers from "./headersTab";
import { useDispatch, useSelector } from "react-redux";
import {
  ConfigState,
  setBaseUrl,
  setMethod,
  setUrl,
} from "@/store/configSlice";
import { useEffect, useState } from "react";
import { CheckCircle, Folder, SaveIcon } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { createCollection } from "@/database/dbApi";
import { validateUrl } from "@/utils";
import {
  ApiRequestProps,
  CollectionType,
  HttpMethodType,
  InputChangeEvent,
  SelectOption,
} from "@/types";

const ApiRequest = ({ onSend }: ApiRequestProps) => {
  const dispatch = useDispatch();
  const { url, method } = useSelector(
    ({ appConfig }: { appConfig: ConfigState }) => appConfig
  );
  const { collection } = useSelector(
    (state: { collection: any }) => state.collection
  );

  const [httpMethod, setHttpMethod] = useState(method);
  const [showCollectionDialog, setShowCollectionDialog] = useState(false);
  const [selectedCollection, setSelectedCollection] =
    useState<CollectionType | null>(null);
  const [newCollection, setNewCollection] = useState(false);
  const [collectionName, setCollectionName] = useState("");

  const getColor = (data: SelectOption) => {
    return METHOD_COLORS[data.value as keyof typeof METHOD_COLORS];
  };

  const handleChangeSelect = (newValue: SingleValue<HttpMethodType>) => {
    if (newValue) {
      setHttpMethod(newValue);
      dispatch(setMethod(newValue));
    }
  };

  const handleInputChange = (e: InputChangeEvent) => {
    const { value } = e.target;
    let validatedUrl = "";
    if (value.length !== 0) {
      validatedUrl = validateUrl(value);
    }
    dispatch(setUrl(validatedUrl));
    dispatch(setBaseUrl(validatedUrl));
  };

  useEffect(() => {
    setHttpMethod(method);
  }, [method]);

  return (
    <div className="w-full h-full">
      <div className="flex flex-row items-center h-12 w-full gap-x-3 px-3 py-2 justify-between border-0 border-b border-zinc-600">
        <Select
          styles={{
            control: (baseStyles) => ({
              ...baseStyles,
              width: "140px",
              borderColor: "transparent",
              backgroundColor: "transparent",
              color: " #fff",
              outline: "none",
              "&:hover": {
                border: 0,
                borderColor: "transparent",
              },
              "&:focus": {
                outline: "none",
              },
            }),
            option: (base, { data }) => ({
              ...base,
              color: getColor(data),
              backgroundColor: "#fff",
              "&:hover": {
                backgroundColor: "#f1f5f9",
                color: getColor(data),
              },
              "&:active": {
                backgroundColor: "#d1d5db",
              },
            }),
            singleValue: (base, { data }) => ({
              ...base,
              color: getColor(data),
              fontFamily: "Nunito",
              fontWeight: "bold",
              fontSize: 14,
            }),
            placeholder: (base) => ({
              ...base,
              color: "#9ca3af",
            }),
          }}
          onChange={(newValue) => handleChangeSelect(newValue)}
          value={httpMethod}
          placeholder={"Select"}
          options={HTTP_METHODS}
        />
        <Separator orientation="vertical" className="h-7 bg-zinc-600" />
        <Input
          defaultValue={url}
          placeholder="Enter URL"
          onChange={handleInputChange}
          className="border-0 text-zinc-100 focus-visible:ring-0 font-medium font-nunito shadow-none h-7 text-ellipsis"
        />
        <Separator orientation="vertical" className="h-7 bg-zinc-600" />
        <Button
          onClick={() => setShowCollectionDialog(true)}
          className="font-nunito"
        >
          <SaveIcon />
          Save
        </Button>
        <Button
          onClick={onSend}
          className=" bg-blue-500 text-white font-nunito font-semibold text-sm hover:bg-blue-600"
        >
          Send
        </Button>
      </div>
      <div className="w-full h-12">
        <Tabs
          defaultValue={TABS[0].value}
          className="min-w-full text-zinc-100 py-0"
        >
          <TabsList className="h-8">
            {TABS?.map((tab, index) => (
              <TabsTrigger className="bg-none" key={index} value={tab.value}>
                {tab.title}
              </TabsTrigger>
            ))}
          </TabsList>
          <Separator className="w-full bg-zinc-600" />
          <TabsContent value="params">
            <Params />
          </TabsContent>
          <TabsContent value="body">
            <Body />
          </TabsContent>
          <TabsContent value="headers">
            <Headers />
          </TabsContent>
        </Tabs>
      </div>
      <Dialog
        open={showCollectionDialog}
        onOpenChange={() => setShowCollectionDialog((prev) => !prev)}
      >
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
                onClick={() => setShowCollectionDialog(false)}
                className="bg-slate-100 text-slate-800 hover:bg-slate-200 font-nunito"
              >
                Cancel
              </Button>
              <Button className="bg-blue-500 text-slate-100 hover:bg-blue-600 font-nunito">
                Save
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ApiRequest;
