import Cookies from 'js-cookie';
import storeNewTokensToCookie from 'utils/storeNewTokensToCookie';

import type { UserInfo } from 'types/UserInfo';
import type { ZipkokResponse } from 'types/ZipkokResponse';

type User = Omit<UserInfo, 'imageUrl'>;

/**
 * 사용자 프로필 업데이트를 위한 PUT API 호출 함수
 */
export async function putUser(user: User, file?: File) {
  const formData = new FormData();
  if (file) formData.append('file', file, file.name);
  formData.append(
    'data',
    new Blob([JSON.stringify(user)], {
      type: 'application/json',
    }),
  );

  let accessToken = Cookies.get('accessToken');

  // access token 만료 시
  if (accessToken === undefined) {
    accessToken = await storeNewTokensToCookie().then((res) => {
      if (res === null) throw new Error('로그인이 필요합니다.');
      return res.accessToken;
    });
  }

  const res = (await fetch('https://zipkok.store/user', {
    method: 'PUT',
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
    body: formData,
  }).then((res) => res.json())) as ZipkokResponse<undefined>;
  return res;
}
