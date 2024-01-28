import Cookies from 'js-cookie';

/**
 * 현재 쿠키에 저장된 토큰을 제거하여 로그아웃합니다.
 */
export default function logout() {
  Cookies.remove('accessToken');
  Cookies.remove('refreshToken');
}
