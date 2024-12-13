import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { HTTP_METHODS, TABS } from "@/constants";
import { getHttpMethodTextColor } from "@/utils";
import { Separator } from "../ui/separator";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Params from "./paramsTab";
import Body from "./bodyTab";
import Headers from "./headersTab";
import { useSelector } from "react-redux";
import { ConfigState } from "@/store/configSlice";

const ApiRequest = ({ onSelect, selectedMethod, onChange, onSend }) => {
  const { url } = useSelector(
    ({ appConfig }: { appConfig: ConfigState }) => appConfig
  );
  return (
    <div className="w-full h-full">
      <div className="flex flex-row items-center h-12 w-full gap-x-3 px-3 py-2 justify-between">
        <Select onValueChange={(value) => onSelect(value)}>
          <SelectTrigger
            className={`w-[150px] border-0 shadow-none h-7 ${getHttpMethodTextColor(
              selectedMethod
            )} font-semibold font-code`}
          >
            <SelectValue placeholder={HTTP_METHODS[0].label} />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              {HTTP_METHODS.map((method, index) => (
                <SelectItem
                  key={index}
                  className={`${method?.color} font-medium font-code`}
                  value={method?.value}
                >
                  {method.label}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
        <Separator orientation="vertical" className="h-7 bg-zinc-600" />
        <Input
          defaultValue={url}
          onChange={(e) => onChange(e.target.value)}
          className="border-0 text-zinc-100 focus-visible:ring-0 font-medium font-nunito shadow-none h-7 text-ellipsis"
        />
        <Separator orientation="vertical" className="h-7 bg-zinc-600" />
        <Button
          onClick={onSend}
          className="w-32 bg-slate-200 text-purple-600 font-nunito  font-semibold text-md hover:bg-slate-300"
        >
          Send
        </Button>
      </div>
      <Separator className="w-full bg-zinc-600" />
      <div className="w-full">
        <Tabs
          defaultValue={TABS[0].value}
          className="min-w-full bg-zinc-800 text-zinc-100 border-0"
        >
          <TabsList className="h-5">
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
    </div>
  );
};

export default ApiRequest;
