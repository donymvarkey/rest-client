import { AUTH_TYPES } from "@/constants";
import { OptionSelectType } from "@/types";
import { useState } from "react";
import Select from "react-select";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Textarea } from "../ui/textarea";
import { useDispatch, useSelector } from "react-redux";
import { AuthStateType, setAuth, setAuthType } from "@/store/authSlice";
import {
  Select as ShadcnSelect,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ConfigState, setHeaders, setUrlParams } from "@/store/configSlice";

const AuthTab = () => {
  const { authType: auth, authValue: authValueRedux } = useSelector(
    ({ auth }: { auth: AuthStateType }) => auth
  );
  const { params, headers } = useSelector(
    ({ appConfig }: { appConfig: ConfigState }) => appConfig
  );

  const [authType, setAuthTypeState] = useState(auth);
  const [authValue, setAuthValueState] = useState<{ [key: string]: any }>({});
  const [apiKeyLocation, setApiKeyLocation] = useState("header");

  const dispatch = useDispatch();

  const handleAuthTypeChange = (value: OptionSelectType) => {
    setAuthTypeState(value);
    dispatch(setAuthType(value));
    // dispatch(setAuth({}));
    setAuthValueState({});
  };

  const handleFormFieldsChange = (key: string, e: any) => {
    const valueForAuth = { ...authValue, [key]: e.target.value };
    if (authType?.value === "apikey") {
      valueForAuth["location"] = apiKeyLocation;
    }
    setAuthValueState(valueForAuth);

    dispatch(setAuth(valueForAuth));
  };

  const handleApiKeyLocationChange = (value: string) => {
    setApiKeyLocation(value);
    if (value === "headers") {
      dispatch(setHeaders([...headers, authValue]));
    } else {
      dispatch(setUrlParams([...params, authValue]));
    }
    setAuthValueState({ ...authValue, location: value });
    dispatch(setAuth({ ...authValue, location: value }));
  };

  const getAuthFields = (authType: string) => {
    switch (authType) {
      case "noauth":
        return (
          <span className="text-xs font-nunito text-zinc-400">
            This request does not require any authentication.
          </span>
        );
      case "basic":
        return (
          <div className="w-full flex flex-col gap-y-2">
            <div className="w-full">
              <Label
                htmlFor="username"
                className="text-xs font-nunito text-zinc-400"
              >
                Username
              </Label>
              <Input
                onChange={(e) => handleFormFieldsChange("username", e)}
                id="username"
                type="text"
                className="w-full border border-zinc-500 rounded-md focus:outline-none focus:border-zinc-400"
              />
            </div>
            <div className="w-full">
              <Label
                htmlFor="password"
                className="text-xs font-nunito text-zinc-400"
              >
                Password
              </Label>
              <Input
                onChange={(e) => handleFormFieldsChange("password", e)}
                id="password"
                type="password"
                className="w-full border border-zinc-500 rounded-md focus:outline-none focus:border-zinc-400"
              />
            </div>
          </div>
        );
      case "bearer":
        return (
          <div className="w-full">
            <span className="text-xs font-nunito text-zinc-400">Token</span>
            <Textarea
              rows={1}
              defaultValue={authValueRedux?.token}
              onChange={(e) => handleFormFieldsChange("token", e)}
              className="w-full mt-1 px-2 py-1 border border-zinc-500 rounded-md focus:outline-none focus:border-zinc-400 text-ellipsis"
            />
          </div>
        );
      case "apikey":
        return (
          <div className="w-full">
            <Label htmlFor="key" className="text-xs font-nunito text-zinc-400">
              Key
            </Label>
            <Input
              id="key"
              onChange={(e) => handleFormFieldsChange("key", e)}
              type="text"
              className="w-full mt-1 px-2 py-1 border border-zinc-500 rounded-md focus:outline-none focus:border-zinc-400 mb-3"
            />
            <Label
              htmlFor="value"
              className="text-xs font-nunito text-zinc-400 "
            >
              Value
            </Label>
            <Input
              id="value"
              onChange={(e) => handleFormFieldsChange("value", e)}
              type="text"
              className="w-full mt-1 px-2 py-1 border border-zinc-500 rounded-md focus:outline-none focus:border-zinc-400 mb-3"
            />
            <Label htmlFor="in" className="text-xs font-nunito text-zinc-400">
              Add To
            </Label>
            <ShadcnSelect
              onValueChange={(value) => handleApiKeyLocationChange(value)}
              defaultValue={apiKeyLocation}
            >
              <SelectTrigger className="w-full mt-1 px-2 py-1 border border-zinc-500 rounded-md focus:outline-none focus:border-zinc-400">
                <SelectValue placeholder="Header" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="header">Header</SelectItem>
                <SelectItem value="query">Query Params</SelectItem>
              </SelectContent>
            </ShadcnSelect>
          </div>
        );
    }
  };
  return (
    <div className="w-full py-1 px-2">
      <div>
        <span className="text-xs font-nunito text-zinc-400">Authorization</span>
      </div>
      <div className="w-full flex items-start justify-between mt-3">
        <div className="w-1/2 h-full">
          <Select
            styles={{
              control: (baseStyles) => ({
                ...baseStyles,
                width: "140px",
                borderColor: "transparent",
                backgroundColor: "transparent",
                outline: "none",
                "&:hover": {
                  border: 0,
                  borderColor: "transparent",
                },
                "&:focus": {
                  outline: "none",
                },
              }),
              option: (base) => ({
                ...base,
                backgroundColor: "#fff",
                color: "#333",
                "&:hover": {
                  backgroundColor: "#f1f5f9",
                  color: "#333",
                },
                "&:active": {
                  backgroundColor: "#d1d5db",
                },
              }),
              singleValue: (base) => ({
                ...base,
                fontFamily: "Nunito",
                fontWeight: "medium",
                fontSize: 14,
                color: "#f1f5f9",
              }),
              placeholder: (base) => ({
                ...base,
                color: "#9ca3af",
              }),
            }}
            onChange={(newValue) => handleAuthTypeChange(newValue!!)}
            value={authType}
            placeholder={"Select"}
            options={AUTH_TYPES}
          />
        </div>
        <div className="w-1/2 h-full">{getAuthFields(authType?.value)}</div>
      </div>
    </div>
  );
};

export default AuthTab;
