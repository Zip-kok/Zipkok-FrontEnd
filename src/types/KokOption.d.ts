interface DetailKokOption {
  detailOptionId: number;
  detailOptionTitle: string;
  detailOptionIsVisible: boolean;
}

interface KokOption {
  id: number;
  optionTitle: string;
  orderNumber: number;
  isVisible: boolean;
  detailOptions: DetailKokOption[];
}

export type { KokOption, DetailKokOption };
