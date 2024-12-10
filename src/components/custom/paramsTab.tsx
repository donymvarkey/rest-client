import { appendQueryParams, generateRandomUuid } from "@/utils";
import { useEffect, useState } from "react";
import { Button } from "../ui/button";
import { Plus, Trash, Trash2 } from "lucide-react";
import { Input } from "../ui/input";
import { Separator } from "../ui/separator";
import { useDispatch, useSelector } from "react-redux";
import { setUrl, setUrlParams } from "@/store/configSlice";

const Params = () => {
  const [params, setParams] = useState([]);
  const [updatedUrl, setUpdatedUrl] = useState("");
  const dispatch = useDispatch();
  const { url, baseUrl } = useSelector((state) => state.appConfig);

  const addNewParam = () => {
    if (params.key !== "") {
      createNewHttpUrlWithParams();
    }
    const newParam = {
      id: generateRandomUuid(),
      key: "",
      value: "",
    };
    dispatch(setUrlParams(newParam));
    setParams([...params, newParam]);
  };

  const handleDeleteParam = (id: string) => {
    setParams((prevParams) => prevParams.filter((param) => param?.id !== id));
    dispatch(setUrlParams([...params]));
    if (params?.length === 0) {
      dispatch(setUrl(baseUrl));
    }
  };

  const handleInputChange = (id: string, field: string, value: string) => {
    setParams((prevParams) => {
      console.log("🚀 ~ handleInputChange ~ prevParams:", prevParams);
      return prevParams.map((param) =>
        param.id === id ? { ...param, [field]: value } : param
      );
    });
  };

  const createNewHttpUrlWithParams = () => {
    const newUrl = appendQueryParams(url, params);
    setUpdatedUrl(newUrl);
    setUrl(newUrl);
    dispatch(setUrl(newUrl));
  };

  const handleDeleteAll = () => {
    setParams([]);
    dispatch(setUrl(baseUrl));
    dispatch(setUrlParams([]));
  };

  const onBlur = () => {
    createNewHttpUrlWithParams();
    dispatch(setUrlParams([...params]));
  };

  // useEffect(() => {

  // }, [params]);
  return (
    <div className="w-full py-1 px-2">
      {/* URL preview on when adding params */}
      {updatedUrl.length > 0 && (
        <div className="w-full bg-zinc-700 rounded-md px-3 py-2 flex flex-col items-start justify-center gap-y-1">
          <span className="text-[10px] font-nunito text-zinc-400">
            URL preview
          </span>
          <span className="text-[12px] font-code">{url}</span>
        </div>
      )}

      <div className="">
        <span className="text-xs font-nunito text-zinc-400">
          Query Parameters
        </span>
        <div className="flex items-center gap-x-1 mt-2">
          <Button
            onClick={addNewParam}
            className="text-xs font-nunito font-medium bg-transparent shadow-none hover:bg-zinc-700 h-8"
          >
            <Plus className="text-xs" />
            Add
          </Button>
          <Button
            onClick={handleDeleteAll}
            className="text-xs font-nunito font-medium bg-transparent shadow-none hover:bg-zinc-700 h-8"
          >
            <Trash2 className="text-xs text-red-500" />
            Delete all
          </Button>
        </div>
      </div>
      <div className="flex flex-col w-full gap-y-1 mt-2">
        {params?.map((param) => (
          <div className="flex flex-col" key={param?.id}>
            <div className="flex items-center justify-between gap-x-2">
              <Input
                placeholder="Key"
                className="border-0 placeholder:text-xs text-zinc-100 focus-visible:ring-0 font-medium font-nunito shadow-none"
                onChange={(e) =>
                  handleInputChange(param?.id, "key", e.target.value)
                }
              />
              <Input
                placeholder="Value"
                onBlur={onBlur}
                className="border-0 placeholder:text-xs text-zinc-100 focus-visible:ring-0 font-medium font-nunito shadow-none"
                onChange={(e) =>
                  handleInputChange(param?.id, "value", e.target.value)
                }
              />
              <Button
                onClick={() => handleDeleteParam(param?.id)}
                className="bg-transparent text-zinc-200 hover:bg-transparent py-0 hover:text-red-500"
              >
                <Trash />
              </Button>
            </div>
            <Separator className="bg-zinc-700" />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Params;
