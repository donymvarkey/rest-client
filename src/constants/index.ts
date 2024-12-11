const HTTP_METHODS = [
  { label: "GET", value: "get", color: "text-green-500" },
  { label: "POST", value: "post", color: "text-blue-500" },
  { label: "PUT", value: "put", color: "text-yellow-500" },
  { label: "PATCH", value: "patch", color: "text-orange-500" },
  { label: "DELETE", value: "delete", color: "text-red-500" },
  { label: "OPTIONS", value: "options", color: "text-gray-500" },
  { label: "HEAD", value: "head", color: "text-green-300" },
  { label: "TRACE", value: "trace", color: "text-teal-500" },
  { label: "CONNECT", value: "connect", color: "text-purple-500" },
];
const STATUS_TEXT = {
  "200": "OK",
  "201": "Created",
  "204": "No Content",
  "301": "Moved Permanently",
  "302": "Found",
  "400": "Bad Request",
  "401": "Unauthorized",
  "403": "Forbidden",
  "404": "Not Found",
  "500": "Internal Server Error",
  "502": "Bad Gateway",
  "503": "Service Unavailable",
};

const TABS = [
  {
    value: "params",
    title: "Params",
  },
  {
    value: "body",
    title: "Body",
  },
  // {
  //   value: "auth",
  //   title: "Auth",
  // },
  {
    value: "headers",
    title: "Headers",
  },
];

export { HTTP_METHODS, STATUS_TEXT, TABS };
