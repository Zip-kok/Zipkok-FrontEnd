interface ZipkokResponse<T> {
  code: number;
  message: string;
  result: T;
  timestamp?: string;
}

export type { ZipkokResponse };
