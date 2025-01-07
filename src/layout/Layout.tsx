import { useState } from "react";
import sendApiRequest from "@/api";
import ApiRequest from "@/components/custom/apiRequest";
import ApiResponse from "@/components/custom/apiResponse";
import Header from "@/components/custom/header";
import History from "@/components/custom/history";
import { createAuthHeaders, generateRandomUuid } from "@/utils";
import { Separator } from "@/components/ui/separator";
import { useSelector } from "react-redux";
import { ConfigState } from "@/store/configSlice";
import { db } from "@/database";
import { AuthStateType } from "@/store/authSlice";

const Layout = () => {
  const { url, body, headers, method } = useSelector(
    ({ appConfig }: { appConfig: ConfigState }) => appConfig
  );
  const { authValue, authType } = useSelector(
    ({ auth }: { auth: AuthStateType }) => auth
  );

  const [response, setResponse] = useState({});

  const onSendHttpRequest = async () => {
    let reqHeaders = {};
    let authHeaders = createAuthHeaders(authType?.value, authValue);
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
      { ...reqHeaders, ...authHeaders },
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
        createdAt: new Date(),
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
        <div className="min-w-[20%] border-0 border-zinc-600 border-r border-b-0">
          <History />
        </div>
        <div className="min-w-[80%] flex flex-col h-full lg:flex-row border-0 border-zinc-600 border-r">
          <div className="lg:w-7/12 w-full min-h-1/3 lg:h-full">
            <ApiRequest onSend={onSendHttpRequest} />
          </div>
          <div className="lg:w-5/12 w-full h-1/2 lg:h-full lg:border-0 border-zinc-600 lg:border-l lg:border-t-0 border-t">
            <ApiResponse response={response} />
          </div>
        </div>
      </div>
      <div className="w-full border-t border-zinc-600 text-xs flex items-center justify-center py-2 text-slate-400 font-nunito gap-x-1">
        Built with ❤️ by{" "}
        <span className="font-bold text-cyan-400">Dony M Varkey</span>
      </div>
    </div>
  );
};

export default Layout;
