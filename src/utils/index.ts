import { v4 as uuidv4 } from "uuid";
import { HTTP_METHODS, STATUS_TEXT } from "@/constants";
import qs from "query-string";
import { AuthHeadersType } from "@/types";

type HeaderObject = {
  id: String;
  key: String;
  value: String;
};

export const getHttpMethodTextColor = (method: string) => {
  const methodObj = HTTP_METHODS.find(
    (m) => m.value.toLowerCase() === method.toLowerCase()
  );

  // Return the color if found, or a default color
  return methodObj ? methodObj.color : "#22c55e";
};

export const getHttpMethodShorts = (method: string) => {
  const methodObj = HTTP_METHODS.find((m) => m?.label === method);
  return methodObj?.short;
};

export const validateUrl = (url: string) => {
  const trimmedUrl = url.trim();

  if (/^https?:\/\//i.test(trimmedUrl)) {
    return trimmedUrl;
  }

  if (/^localhost(:\d+)?(\/.*)?$/i.test(trimmedUrl)) {
    return `http://${trimmedUrl}`;
  }

  return `https://${trimmedUrl}`;
};

export function isObjectEmpty(obj: object) {
  if (obj == null || typeof obj !== "object") {
    throw new Error("Input must be a non-null object");
  }

  return Object.keys(obj).length === 0;
}

export const getStatusBadgeColor = (status: number) => {
  if (status >= 200 && status < 300) {
    return "bg-green-500 text-white"; // Success
  } else if (status >= 300 && status < 400) {
    return "bg-blue-500 text-white"; // Redirect
  } else if (status >= 400 && status < 500) {
    return "bg-yellow-500 text-black"; // Client Error
  } else if (status >= 500) {
    return "bg-red-500 text-white"; // Server Error
  } else {
    return "bg-gray-500 text-white"; // Default
  }
};

export const getStatusText = (status: number) => {
  const statusString = String(status);
  return STATUS_TEXT[statusString as keyof typeof STATUS_TEXT];
};

export const generateRandomUuid = () => {
  return uuidv4();
};

export function appendQueryParams(
  url: string,
  params: Array<{ key: string; value: string }>
) {
  // Parse the current query parameters from the URL
  // if (params.length === 0) {
  //   return url;
  // }
  const [baseUrl, query = ""] = url.split("?");
  const existingParams = qs.parse(query);

  // Convert the array of params to an object and merge with existing ones
  const newParams = params.reduce(
    (acc: any, { key, value }: { key: string; value: string }) => {
      acc[key] = value;
      return acc;
    },
    existingParams
  );

  // Stringify the updated query parameters
  const updatedQuery = qs.stringify(newParams);

  // Return the updated URL
  return `${baseUrl}?${updatedQuery}`;
}

export const generateCurlRequest = (
  method: string,
  url: string,
  headers: Array<HeaderObject>,
  body: object,
  params: Array<object>
) => {
  let curlCommand = `curl -X ${method.toUpperCase()} "${url}"`;

  if (headers && headers.length > 0) {
    headers.forEach((header: HeaderObject) => {
      curlCommand += ` -H "${header?.key}: ${header?.value}"`;
    });
  }

  if (body && Object.keys(body).length > 0) {
    curlCommand += ` -d '${JSON.stringify(body)}'`;
  }

  if (params && params.length > 0) {
    const queryString = qs.stringify(params);
    curlCommand += `?${queryString}`;
  }
  navigator.clipboard.writeText(curlCommand);
  console.log("cURL command copied to clipboard:", curlCommand);
};

export const createAuthHeaders = (authType: string, auth: AuthHeadersType) => {
  switch (authType) {
    case "noauth":
      return null;
    case "bearer":
      return { Authorization: `Bearer ${auth?.token}` };
    case "basic":
      const encoded = btoa(`${auth?.username}:${auth.password}`);
      return { Authorization: `Basic ${encoded}` };
  }
};
