import type { Option } from 'apis/getUserKokOption';
import type { CheckListGroup } from 'types/CheckList';

/*
 * 옵션들을 체크리스트 그룹으로 변환합니다.
 * @param options 변환할 옵션들
 * @returns 변환된 체크리스트 그룹들
 */
export default function optionsToCheckListGroups(options: Option[]) {
  const result: CheckListGroup[] = [];
  const sortedOptions = options.sort((a, b) => a.orderNumber - b.orderNumber);

  for (const option of sortedOptions) {
    const sortedDetailOptions = option.detailOptions.sort(
      (a, b) => a.detailOptionId - b.detailOptionId,
    );

    const checkListItems = sortedDetailOptions.map((detailOption) => ({
      name: detailOption.detailOptionTitle,
      enabled: detailOption.detailOptionIsVisible,
    }));

    result.push({
      id: option.optionId,
      name: option.optionTitle,
      items: checkListItems,
      enabled: option.isVisible,
    });
  }

  return result;
}
