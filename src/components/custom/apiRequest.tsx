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
import { Send } from "lucide-react";
import { isObjectEmpty, validateUrl } from "@/utils";
import {
  ApiRequestProps,
  CollectionType,
  HttpMethodType,
  InputChangeEvent,
  SelectOption,
} from "@/types";
import AuthTab from "./authTab";
import SaveToCollection from "./saveToCollection";

const ApiRequest = ({ onSend }: ApiRequestProps) => {
  const dispatch = useDispatch();
  const { url, method, params, headers, body } = useSelector(
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
  const [activeTab, setActiveTab] = useState("params");

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

  const saveToCollection = (collectionId: string) => {
    console.log(collectionId);
  };

  const isItemEmpty = (title: string) => {
    const tabData: any = {
      body: !isObjectEmpty(body),
      params: params.length > 0,
      headers: headers.length > 0,
    };

    if (activeTab !== title && tabData[title]) {
      return (
        <div className="w-2 h-2 ms-1 rounded-full bg-green-500 relative top-0 right-0" />
      );
    }

    return null;
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
        {/* <Button
          onClick={() => setShowCollectionDialog(true)}
          className="font-nunito text-xs"
        >
          <SaveIcon />
          Save
        </Button> */}
        <Button
          onClick={onSend}
          className=" bg-blue-500 text-white font-nunito font-semibold text-xs hover:bg-blue-600"
        >
          <Send />
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
              <TabsTrigger
                onClick={() => setActiveTab(tab.value)}
                className="bg-none"
                key={index}
                value={tab.value}
              >
                {tab.title}
                {isItemEmpty(tab.value)}
              </TabsTrigger>
            ))}
          </TabsList>
          <Separator className="w-full bg-zinc-600" />
          <TabsContent value="params">
            <Params />
          </TabsContent>
          <TabsContent value="auth">
            <AuthTab />
          </TabsContent>
          <TabsContent value="body">
            <Body />
          </TabsContent>
          <TabsContent value="headers">
            <Headers />
          </TabsContent>
        </Tabs>
      </div>
      <SaveToCollection
        open={showCollectionDialog}
        setOpen={() => setSelectedCollection((prev) => !prev)}
        collection={collection}
        setSelectedCollection={setSelectedCollection}
        collectionName={collectionName}
        setCollectionName={setCollectionName}
        newCollection={newCollection}
        setNewCollection={setNewCollection}
        selectedCollection={selectedCollection}
        save={saveToCollection}
      />
    </div>
  );
};

export default ApiRequest;
