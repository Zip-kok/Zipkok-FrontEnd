interface CheckListGroupContainerProps {
  checkListGroups: CheckListGroup[];
  setCheckListGroups: React.Dispatch<React.SetStateAction<CheckListGroup[]>>;
}

interface CheckListItem {
  name: string;
  enabled: boolean;
}

interface CheckListGroup {
  id: number;
  name: string;
  enabled: boolean;
  items: CheckListItem[];
}

export type { CheckListGroup, CheckListItem, CheckListGroupContainerProps };
