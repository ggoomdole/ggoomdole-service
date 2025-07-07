  import axios from 'axios';

  import UserRepository from '../repositories/authRepository';
  import { KakaoError } from '../utils/customError';

  class AuthService {
    async kakaoLoginService(code: string) {
      // 카카오로부터 access_token 받기
      const tokenResponse = await axios.post(
        'https://kauth.kakao.com/oauth/token',
        new URLSearchParams({
          grant_type: 'authorization_code',
          client_id: process.env.KAKAO_REST_API_KEY!,
          redirect_uri: process.env.KAKAO_REDIRECT_URI!,
          code,
        }),
        { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } }
      );
      const accessToken = tokenResponse.data.access_token;
      if (!accessToken) {
        throw new KakaoError('카카오 액세스 토큰을 받지 못했습니다.');
      }

      // access_token으로 사용자 카카오id 가져오기
      const userResponse = await axios.get('https://kapi.kakao.com/v2/user/me', {
        headers: { Authorization: `Bearer ${accessToken}` },
      });
      const kakaoId = userResponse.data.id;
      if (!kakaoId) {
        throw new KakaoError('카카오 사용자 정보를 받지 못했습니다.');
      }

      // DB에서 사용자 찾고 없으면 생성
      let user = await UserRepository.findUserByKakaoId(String(kakaoId));
      if (!user) {
        user = await UserRepository.createUser({
          kakaoId: String(kakaoId)
        });
      }

      return {
        userId: user.id,
        accessToken
      };
    }

    async kakaoUnlinkService(accessToken: string) {
      // 카카오 API에 unlink 요청(회원 탈퇴)
      const userInfo = await axios.post(
        'https://kapi.kakao.com/v1/user/unlink',
        null,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            'Content-Type': 'application/x-www-form-urlencoded',
          },
        }
      );
      if (!userInfo) { throw new KakaoError('카카오 unlink 실패');}

      // unlink API 호출 후 유저 정보 얻기
      const userResponse = await axios.get('https://kapi.kakao.com/v2/user/me', {
        headers: { Authorization: `Bearer ${accessToken}` },
      });
      const kakaoId = userResponse.data.id;
      if (!kakaoId) { throw new KakaoError('카카오 사용자 정보를 받지 못했습니다.');}

      // DB에서 사용자 삭제
      const deletedUser = await UserRepository.deleteUserByKakaoId(String(kakaoId));

      return { deletedUserId: deletedUser.id };
    }
  }

  export default new AuthService();