import {
  generateCurlRequest,
  getStatusBadgeColor,
  getStatusText,
  isObjectEmpty,
} from "@/utils";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { nightOwl } from "react-syntax-highlighter/dist/esm/styles/prism";
import { Badge } from "../ui/badge";
import { Separator } from "../ui/separator";
import { Button } from "../ui/button";
import { useSelector } from "react-redux";
import { useToast } from "@/hooks/use-toast";
import { ConfigState } from "@/store/configSlice";

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
          <div className="flex items-center gap-x-3  px-3 py-2 h-12">
            <Badge
              className={`${getStatusBadgeColor(
                response?.status
              )} rounded-sm py-1 px-2 font-code text-sm gap-x-2`}
            >
              <span>{response?.status}</span>
              <span>{getStatusText(response?.status)}</span>
            </Badge>
            <Badge
              className={`rounded-sm py-1 px-2 font-code text-sm gap-x-2 bg-zinc-900`}
            >
              <span>{`${response?.timeTaken} ms`}</span>
            </Badge>
            {response?.headers?.["content-length"] && (
              <Badge
                className={`rounded-sm py-1 px-2 font-code text-sm gap-x-2 bg-zinc-900`}
              >
                <span>{`${response?.headers?.["content-length"]} B`}</span>
              </Badge>
            )}
            <Button
              onClick={createCurlRequest}
              className="font-nunito bg-blue-500"
            >
              Generate cURL
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
