import Cookies from 'js-cookie';

/**
 * 쿠키를 통해 로그인됐는지의 여부를 확인합니다.
 * @returns 로그인됐는지 여부
 */
export default function isLoggedIn() {
  return (
    Cookies.get('accessToken') !== undefined ||
    Cookies.get('refreshToken') !== undefined
  );
}
