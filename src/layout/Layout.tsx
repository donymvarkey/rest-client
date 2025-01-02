import { useState } from "react";
import sendApiRequest from "@/api";
import ApiRequest from "@/components/custom/apiRequest";
import ApiResponse from "@/components/custom/apiResponse";
import Header from "@/components/custom/header";
import History from "@/components/custom/history";
import { generateRandomUuid, validateUrl } from "@/utils";
import { Separator } from "@/components/ui/separator";
import { useDispatch, useSelector } from "react-redux";
import { ConfigState, setBaseUrl, setUrl } from "@/store/configSlice";
import { db } from "@/database";

const Layout = () => {
  const { url, body, headers, method } = useSelector(
    ({ appConfig }: { appConfig: ConfigState }) => appConfig
  );
  const [httpUrl, setHttpUrl] = useState("");
  const [response, setResponse] = useState({});
  const dispatch = useDispatch();

  const { collection } = useSelector((state: any) => state.collection);

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
    const httpResponse = await sendApiRequest(
      method?.value,
      url,
      reqHeaders,
      body
    );
    setResponse(httpResponse);
    const historyData = {
      id: generateRandomUuid(),
      url: url,
      method: method,
      headers: headers,
      body: body,
    };
    try {
      db.history.add({
        id: historyData?.id,
        url,
        body,
        method,
        headers: headers,
        params: [],
      });
    } catch (error) {
      console.log("error::", error);
    }
  };

  return (
    <div className="flex flex-col h-screen w-full">
      {/* Header */}
      <Header />
      {/* Content */}
      <Separator className="w-full bg-zinc-600" />
      <div className="flex-1 bg-zinc-800 flex  rounded-br-md rounded-bl-md">
        <div className="min-w-[20%] border-0 border-zinc-600 border-r border-b">
          <History collection={collection} />
        </div>
        <div className="min-w-[80%] flex flex-col h-full lg:flex-row border-0 border-zinc-600 border-r">
          <div className="lg:w-7/12 w-full min-h-1/3 lg:h-full">
            <ApiRequest
              onChange={onUrlInputChange}
              onSend={onSendHttpRequest}
            />
          </div>
          <div className="lg:w-5/12 w-full h-1/2 lg:h-full lg:border-0 border-zinc-600 lg:border-l lg:border-t-0 border-t">
            <ApiResponse response={response} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Layout;
