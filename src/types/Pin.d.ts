interface Pin {
  id: number;
  name: string;
  address: {
    addressName: string;
    x: number;
    y: number;
  };
}
export type { Pin };
