const HTTP_METHODS = [
  { label: "GET", value: "get", color: "text-green-500", short: "GET" },
  { label: "POST", value: "post", color: "text-blue-500", short: "POST" },
  { label: "PUT", value: "put", color: "text-yellow-500", short: "PUT" },
  { label: "PATCH", value: "patch", color: "text-orange-500", short: "PTCH" },
  { label: "DELETE", value: "delete", color: "text-red-500", short: "DEL" },
  { label: "OPTIONS", value: "options", color: "text-gray-500", short: "OPT" },
  { label: "HEAD", value: "head", color: "text-green-300", short: "HEAD" },
  // { label: "TRACE", value: "trace", color: "text-teal-500", short: "GET" },
  // { label: "CONNECT", value: "connect", color: "text-purple-500", short: "GET" },
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
