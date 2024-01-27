import { refreshTokens as getNewTokens } from 'apis';
import Cookies from 'js-cookie';
import { StatusCode } from 'types/StatusCode';
import storeToken from 'utils/storeToken';

/**
 * 쿠키에 저장된 리프레시 토큰을 이용해 새 토큰을 발급받아 쿠키에 저장합니다.
 * @returns 토큰 발급에 실패하면 `null`, 성공하면 새 토큰을 반환합니다.
 */
export default async function storeNewTokensToCookie() {
  const refreshToken = Cookies.get('refreshToken');
  if (!refreshToken) return null;

  const result = await getNewTokens(refreshToken).then((res) => {
    if (res.code === StatusCode.TOKEN_REFRESH_SUCCESS) {
      const { accessToken, refreshToken, expiresIn, refreshTokenExpiresIn } =
        res.result.authTokens;
      storeToken(accessToken, refreshToken, expiresIn, refreshTokenExpiresIn);
      return res.result.authTokens;
    }
    return null;
  });

  return result;
}
