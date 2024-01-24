import type { StatusCode } from 'types/StatusCode';

interface ZipkokResponse<T> {
  code: StatusCode;
  message: string;
  result: T;
  timestamp?: string;
}

export type { ZipkokResponse };
