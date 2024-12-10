import { useState } from "react";
import sendApiRequest from "@/api";
import ApiRequest from "@/components/custom/apiRequest";
import ApiResponse from "@/components/custom/apiResponse";
import Header from "@/components/custom/header";
import History from "@/components/custom/history";
import { validateUrl } from "@/utils";
import { Separator } from "@/components/ui/separator";
import { useDispatch, useSelector } from "react-redux";
import { setBaseUrl, setUrl } from "@/store/configSlice";

const Layout = () => {
  const [method, setSelectedMethod] = useState("get");
  const [httpUrl, setHttpUrl] = useState("");
  const [response, setResponse] = useState({});
  const [requestBody, setRequestBody] = useState({});
  const [headers, setHeaders] = useState({});
  const dispatch = useDispatch();

  const { url } = useSelector((state) => state.appConfig);

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
    const httpResponse = await sendApiRequest(
      method,
      url,
      headers,
      requestBody
    );
    setResponse(httpResponse);
  };

  return (
    <div className="flex flex-col h-screen w-full">
      {/* Header */}
      <Header />
      {/* Content */}
      <Separator className="w-full bg-zinc-600" />
      <div className="flex-1 bg-zinc-800 flex  rounded-br-md rounded-bl-md">
        <div className="w-1/6 border-0 border-zinc-600 border-r">
          <History />
        </div>
        <div className="w-5/6 flex flex-col h-full lg:flex-row border-0 border-zinc-600 border-r">
          <div className="lg:w-6/12 w-full min-h-1/3 lg:h-full">
            <ApiRequest
              onSelect={onSelectHttpMethod}
              selectedMethod={method}
              onChange={onUrlInputChange}
              onSend={onSendHttpRequest}
              setUrl={setHttpUrl}
              requestBody={requestBody}
              setRequestBody={setRequestBody}
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
