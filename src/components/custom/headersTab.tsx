import { Plus, Trash, Trash2 } from "lucide-react";
import { Button } from "../ui/button";
import { useDispatch, useSelector } from "react-redux";
import { Input } from "../ui/input";
import { Separator } from "../ui/separator";
import { useState } from "react";
import { generateRandomUuid } from "@/utils";
import { clearHeaders, ConfigState, setHeaders } from "@/store/configSlice";

type HeaderType = {
  key: string;
  value: string;
  id: string;
};

const Headers = () => {
  const { headers } = useSelector(
    ({ appConfig }: { appConfig: ConfigState }) => appConfig
  );
  const dispatch = useDispatch();
  const [reqHeaders, setReqHeaders] = useState(headers);

  const addNewParam = () => {
    const newHeader = {
      id: generateRandomUuid(),
      key: "",
      value: "",
    };
    dispatch(setHeaders(newHeader));
    setReqHeaders([...headers, newHeader]);
  };

  const handleDeleteParam = (id: string) => {
    setReqHeaders((prevHeaders: Array<HeaderType>) => {
      const filtered = prevHeaders.filter((header) => header?.id !== id);
      dispatch(setHeaders([...filtered]));
      return filtered;
    });
    if (reqHeaders?.length === 0) {
      dispatch(setHeaders([]));
    }
  };

  const handleInputChange = (id: string, field: string, value: string) => {
    setReqHeaders((prevHeaders: Array<HeaderType>) => {
      return prevHeaders.map((header) =>
        header.id === id ? { ...header, [field]: value } : header
      );
    });
  };

  const handleDeleteAll = () => {
    setReqHeaders([]);
    dispatch(clearHeaders());
  };

  const onBlur = () => {
    dispatch(setHeaders([...reqHeaders]));
  };

  // useEffect(() => {
  //   setHeaders(headers);
  // }, []);
  return (
    <div className="w-full py-1 px-2">
      <div className="">
        <span className="text-xs font-nunito text-zinc-400">Headers</span>
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
        {reqHeaders?.map((header: HeaderType) => (
          <div className="flex flex-col" key={header?.id}>
            <div className="flex items-center justify-between gap-x-2">
              <Input
                defaultValue={header?.key}
                placeholder="Key"
                className="border-0 placeholder:text-xs text-zinc-100 focus-visible:ring-0 font-medium font-nunito shadow-none"
                onChange={(e) =>
                  handleInputChange(header?.id, "key", e.target.value)
                }
              />
              <Input
                defaultValue={header?.value}
                placeholder="Value"
                onBlur={onBlur}
                className="border-0 placeholder:text-xs text-zinc-100 focus-visible:ring-0 font-medium font-nunito shadow-none"
                onChange={(e) =>
                  handleInputChange(header?.id, "value", e.target.value)
                }
              />
              <Button
                onClick={() => handleDeleteParam(header?.id)}
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

export default Headers;
