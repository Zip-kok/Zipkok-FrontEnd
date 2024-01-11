import CheckListItem from './CheckListItem';

export default interface CheckListGroup {
  name: string;
  enabled: boolean;
  items: CheckListItem[];
}
