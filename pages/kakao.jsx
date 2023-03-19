
import { useRouter } from "next/router";
import { useEffect, useContext } from "react";
import { AuthContext } from "contexts/AuthContext";
import api from "api/cubApi";

const Kakao = () => {
  const authContext = useContext(AuthContext);
  const router = useRouter();
  const { code: authCode, error: kakaoServerError } = router.query;

  const loginHandler = async code => {
    await api.KakaoLoginAuth(code)
      .then(response => {
        sessionStorage.setItem("token", response.token);
        sessionStorage.setItem("user_uid", response.user_uid);
        authContext.onLogin();
        router.push("/");
      })
      .catch(error => {
        console.log(error);
      });
  };

  useEffect(() => {
    if (authCode) {
      loginHandler(authCode);

      // 인가코드를 제대로 못 받았을 경우에 에러 페이지를 띄운다.
    } else if (kakaoServerError) {
      router.push("/notifications/authentication-failed");
    }
  }, [loginHandler, authCode, kakaoServerError, router]);

  return <h2>로그인 중입니다..</h2>;
};

export default Kakao;
