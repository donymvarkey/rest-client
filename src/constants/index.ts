const HTTP_METHODS = [
  { label: "GET", value: "get", color: "text-green-500", short: "GET" },
  { label: "POST", value: "post", color: "text-blue-500", short: "POST" },
  { label: "PUT", value: "put", color: "text-yellow-500", short: "PUT" },
  { label: "PATCH", value: "patch", color: "text-orange-500", short: "PTCH" },
  { label: "DELETE", value: "delete", color: "text-red-500", short: "DEL" },
  { label: "OPTIONS", value: "options", color: "text-teal-500", short: "OPT" },
  { label: "HEAD", value: "head", color: "text-purple-500", short: "HEAD" },
  // { label: "TRACE", value: "trace", color: "text-teal-500", short: "GET" },
  // { label: "CONNECT", value: "connect", color: "text-purple-500", short: "GET" },
];

const METHOD_COLORS = {
  get: "#22c55e",
  put: "#eab308",
  post: "#3b82f6",
  delete: "#ef4444",
  patch: "#f97316",
  head: "#a855f7",
  options: "#14b8a6",
};
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

const AUTH_TYPES = [
  {
    value: "noauth",
    label: "No Auth",
  },
  {
    value: "basic",
    label: "Basic Auth",
  },
  {
    value: "bearer",
    label: "Bearer Token",
  },
  // {
  //   value: "digest",
  //   label: "Digest Auth",
  // },
  // {
  //   value: "oauth1",
  //   label: "OAuth 1.0",
  // },
  // {
  //   value: "oauth2",
  //   label: "OAuth 2.0",
  // },
  // {
  //   value: "apikey",
  //   label: "API Key",
  // },
  // {
  //   value: "hawk",
  //   label: "Hawk Auth",
  // },
  // {
  //   value: "aws",
  //   label: "AWS Signature",
  // },
  // {
  //   value: "ntlm",
  //   label: "NTLM Auth",
  // },
];

const TABS = [
  {
    value: "params",
    title: "Params",
  },
  {
    value: "auth",
    title: "Authorization",
  },
  {
    value: "headers",
    title: "Headers",
  },
  {
    value: "body",
    title: "Body",
  },
];

export { HTTP_METHODS, STATUS_TEXT, TABS, METHOD_COLORS, AUTH_TYPES };
