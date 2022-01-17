declare type Indexable<T = any> = {
  [key: string]: T;
};
declare type Recordable<T = any> = Record<string, T>;

export interface Response {
  message: string
  timestamp: Date
  code: number
}

