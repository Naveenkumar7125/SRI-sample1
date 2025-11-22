export type Status = "Missing" | "Wanted";

export type ImageItem = {
  id: string;
  url?: string;
  file?: File;
  preview?: string;
};

export type PersonRecord = {
  id: string;
  name: string;
  age: number | string;
  status: Status;
  location?: string;
  lastSeenDate?: string;
  crime?: string;
  reward?: number | string;
  contact?: string;
  description?: string;
  images?: ImageItem[];
};
