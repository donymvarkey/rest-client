import { useState } from "react";
import sendApiRequest from "@/api";
import ApiRequest from "@/components/custom/apiRequest";
import ApiResponse from "@/components/custom/apiResponse";
import Header from "@/components/custom/header";
import History from "@/components/custom/history";
import { validateUrl } from "@/utils";
import { Separator } from "@/components/ui/separator";
import { useDispatch, useSelector } from "react-redux";
import { ConfigState, setBaseUrl, setUrl } from "@/store/configSlice";
import { addToHistory } from "@/store/historySlice";

const Layout = () => {
  const [method, setSelectedMethod] = useState("get");
  const [httpUrl, setHttpUrl] = useState("");
  const [response, setResponse] = useState({});
  const dispatch = useDispatch();

  const { url, body, headers } = useSelector(
    ({ appConfig }: { appConfig: ConfigState }) => appConfig
  );
  const { history } = useSelector((state: any) => state.history);

  const onSelectHttpMethod = (method: string) => {
    setSelectedMethod(method);
  };

  const onUrlInputChange = (url: string) => {
    const validatedUrl = validateUrl(url);
    setHttpUrl(validatedUrl);

    if (url) {
      dispatch(setUrl(validatedUrl));
      dispatch(setBaseUrl(validatedUrl));
    }
  };

  const onSendHttpRequest = async () => {
    let reqHeaders = {};
    if (headers.length > 0) {
      headers?.map(
        (header: { key: string; value: string }) =>
          (reqHeaders = {
            ...reqHeaders,
            [header.key]: header.value,
          })
      );
    }
    const httpResponse = await sendApiRequest(method, url, reqHeaders, body);
    setResponse(httpResponse);
    const historyData = {
      url: url,
      request_method: method,
      request_headers: reqHeaders,
      request_body: body,
    };
    dispatch(addToHistory(historyData));
    const result = await window.api.insertRequest(historyData);
    console.log("Data inserted successfully:", result);
  };

  return (
    <div className="flex flex-col h-screen w-full">
      {/* Header */}
      <Header />
      {/* Content */}
      <Separator className="w-full bg-zinc-600" />
      <div className="flex-1 bg-zinc-800 flex  rounded-br-md rounded-bl-md">
        <div className="w-1/6 border-0 border-zinc-600 border-r">
          <History history={history} />
        </div>
        <div className="w-5/6 flex flex-col h-full lg:flex-row border-0 border-zinc-600 border-r">
          <div className="lg:w-6/12 w-full min-h-1/3 lg:h-full">
            <ApiRequest
              onSelect={onSelectHttpMethod}
              selectedMethod={method}
              onChange={onUrlInputChange}
              onSend={onSendHttpRequest}
            />
          </div>
          <div className="lg:w-6/12 w-full h-1/2 lg:h-full lg:border-0 border-zinc-600 lg:border-l lg:border-t-0 border-t">
            <ApiResponse response={response} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Layout;
