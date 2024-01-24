import Cookies from 'js-cookie';
import millisecondsToDays from 'utils/millisecondsToDays';

/**
 * 액세스 토큰과 리프레시 토큰을 받아 쿠키에 저장합니다.
 * @param accessToken 쿠키에 저장할 accessToken
 * @param refreshToken 쿠키에 저장할 refreshToken
 * @param expiresIn accessToken의 만료 시간 (밀리초)
 * @param refreshTokenExpiresIn refreshToken의 만료 시간 (밀리초)
 */
export default function storeToken(
  accessToken: string,
  refreshToken: string,
  expiresIn: number,
  refreshTokenExpiresIn: number,
) {
  Cookies.set('accessToken', accessToken, {
    expires: millisecondsToDays(expiresIn),
    secure: true,
    sameSite: 'none',
  });
  Cookies.set('refreshToken', refreshToken, {
    expires: millisecondsToDays(refreshTokenExpiresIn),
    secure: true,
    sameSite: 'none',
  });
}
