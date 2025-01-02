import {
  generateCurlRequest,
  getStatusBadgeColor,
  getStatusText,
  isObjectEmpty,
} from "@/utils";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { nightOwl } from "react-syntax-highlighter/dist/esm/styles/prism";
import { Separator } from "../ui/separator";
import { Button } from "../ui/button";
import { useSelector } from "react-redux";
import { useToast } from "@/hooks/use-toast";
import { ConfigState } from "@/store/configSlice";
import { Clipboard } from "lucide-react";

const ApiResponse = ({ response }: { response: any }) => {
  const { toast } = useToast();
  const { url, body, headers, method, params } = useSelector(
    ({ appConfig }: { appConfig: ConfigState }) => appConfig
  );
  const createCurlRequest = () => {
    generateCurlRequest(method?.label, url, headers, body, params);
    toast({
      title: "Success",
      description: "cURL command copied to clipboard",
    });
  };
  return (
    <div className="text-xs w-full h-full">
      {!isObjectEmpty(response) && (
        <>
          <div className="flex items-center justify-between gap-x-3  px-3 py-2 h-12">
            <div className="flex items-center gap-x-2">
              <div
                className={`${getStatusBadgeColor(
                  response?.status
                )} rounded-sm py-1 flex items-center px-2 gap-x-2`}
              >
                <span className="font-code text-xs">{response?.status}</span>
                <span className="font-code text-xs">
                  {getStatusText(response?.status)}
                </span>
              </div>
              <div className={`rounded-sm py-1 px-2  gap-x-2 bg-zinc-900`}>
                <span className="text-white font-code text-xs">{`${response?.timeTaken} ms`}</span>
              </div>
              {response?.headers?.["content-length"] && (
                <div className={`rounded-sm py-1 px-2  gap-x-2 bg-zinc-900`}>
                  <span className="text-white text-xs font-code">{`${response?.headers?.["content-length"]} B`}</span>
                </div>
              )}
            </div>
            <Button
              onClick={createCurlRequest}
              className="font-nunito bg-blue-500 text-xs"
            >
              <Clipboard />
              Copy cURL
            </Button>
          </div>
          <Separator className="w-full bg-zinc-600" />
          <div className="px-2">
            <SyntaxHighlighter
              className="rounded-md max-h-[780px] overflow-scroll"
              showLineNumbers={true}
              language="json"
              style={nightOwl}
            >
              {JSON.stringify(response?.data, null, 2)}
            </SyntaxHighlighter>
          </div>
        </>
      )}
    </div>
  );
};

export default ApiResponse;
