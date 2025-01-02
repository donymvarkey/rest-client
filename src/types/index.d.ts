export type IHttpMethod = {
  value: string;
  label: string;
  color: string;
};

export interface SelectOption {
  value: string;
  label: string;
  color: string;
  short: string;
}

export interface InputChangeEvent {
  target: {
    value: string;
  };
}

export interface CollectionType {
  id: string;
  name: string;
  createdAt: Date;
}

export interface ApiRequestProps {
  onSend: () => void;
}

export type HttpMethodType = {
  value: string;
  label: string;
  color: string;
  short: string;
};

export interface HistoryItem {
  url: string;
  params: any;
  headers: any[];
  body: any;
  method: any;
}
