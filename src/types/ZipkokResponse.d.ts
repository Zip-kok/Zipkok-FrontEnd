import type { StatusCode } from 'types/StatusCode';

interface ZipkokResponse<T> {
  code: StatusCode;
  message: string;
  result: T extends void ? undefined : T;
  timestamp?: string;
}

interface ZipkokResponseWithCode<T, C extends StatusCode> {
  code: C;
  message: string;
  result: T extends void ? undefined : T;
  timestamp?: string;
}

export type { ZipkokResponse, ZipkokResponseWithCode };
