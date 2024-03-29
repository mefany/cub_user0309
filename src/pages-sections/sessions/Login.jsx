import { useCallback, useState, useEffect, useContext } from "react";
import { AuthContext } from "contexts/AuthContext";
import { Button, Card, Box, styled } from "@mui/material";
import Link from "next/link";
import * as yup from "yup";
import { useFormik } from "formik";
import { H1, H6 } from "components/Typography";
import CommonTextField from "components/CommonTextField";
import EyeToggleButton from "./EyeToggleButton";
import { FlexBox, FlexRowCenter } from "components/flex-box";
import { useRouter } from "next/router";
import api from "api/cubApi";

const fbStyle = {
  background: "#3B5998",
  color: "white",
};
const googleStyle = {
  background: "#4285F4",
  color: "white",
};
export const Wrapper = styled(({ children, passwordVisibility, ...rest }) => (
  <Card {...rest}>{children}</Card>
))(({ theme, passwordVisibility }) => ({
  width: 500,
  padding: "2rem 3rem",
  [theme.breakpoints.down("sm")]: {
    width: "100%",
  },
  ".passwordEye": {
    color: passwordVisibility
      ? theme.palette.grey[600]
      : theme.palette.grey[400],
  },
  ".facebookButton": {
    marginBottom: 10,
    ...fbStyle,
    "&:hover": fbStyle,
  },
  ".googleButton": { ...googleStyle, "&:hover": googleStyle },
  ".agreement": {
    marginTop: 12,
    marginBottom: 24,
  },
}));

const Login = () => {
  const authContext = useContext(AuthContext);
  const router = useRouter();
  const [isLoading, setLoading] = useState(false);
  const [passwordVisibility, setPasswordVisibility] = useState(false);
  const togglePasswordVisibility = useCallback(() => {
    setPasswordVisibility(visible => !visible);
  }, []);

  useEffect(() => {
    if (sessionStorage.getItem("token") !== null) {
      redirect();
    } else {
      setLoading(true);
    }
  }, []);

  const redirect = () => {
    sessionStorage.getItem("prevPath") === "null" || null || "/login"
      ? router.push("/")
      : router.push(sessionStorage.getItem("prevPath"));
  };

  const handleFormSubmit = async values => {
    sendForm(values);
  };

  const reqKakaoLogin = async () => {
    await api
      .KakaoLogin({})
      .then(response => {
        location.href = response;
      })
      .catch(error => {
        console.log(error);
      });
  };

  const sendForm = async values => {
    await api
      .Login({
        user_id: values.email,
        password: values.password,
        logout: false,
      })
      .then(response => {
        sessionStorage.setItem("token", response.token);
        sessionStorage.setItem("user_uid", response.user_uid);
        authContext.onLogin();
        redirect();
      })
      .catch(error => {
        console.log(error);
        alert("이메일 주소 또는 비밀번호를 확인해주세요.");
      });
  };

  const { values, errors, touched, handleBlur, handleChange, handleSubmit } =
    useFormik({
      initialValues,
      onSubmit: handleFormSubmit,
      validationSchema: formSchema,
    });

  if (!isLoading) return null;

  return (
    <Wrapper elevation={3} passwordVisibility={passwordVisibility}>
      <form onSubmit={handleSubmit}>
        <H1 textAlign='center' mt={1} mb={4} fontSize={16}>
          로그인 후 컵컵의 서비스를 만나보세요.
        </H1>
        <CommonTextField
          mb={1.5}
          fullWidth
          name='email'
          size='small'
          type='email'
          variant='outlined'
          onBlur={handleBlur}
          value={values.email}
          onChange={handleChange}
          label='이메일'
          placeholder='exmple@mail.com'
          error={!!touched.email && !!errors.email}
          helperText={touched.email && errors.email}
        />

        <CommonTextField
          mb={2}
          fullWidth
          size='small'
          name='password'
          label='비밀번호'
          autoComplete='on'
          variant='outlined'
          onBlur={handleBlur}
          onChange={handleChange}
          value={values.password}
          placeholder='*********'
          type={passwordVisibility ? "text" : "password"}
          error={!!touched.password && !!errors.password}
          helperText={touched.password && errors.password}
          InputProps={{
            endAdornment: (
              <EyeToggleButton
                show={passwordVisibility}
                click={togglePasswordVisibility}
              />
            ),
          }}
        />

        <Button
          fullWidth
          type='submit'
          color='primary'
          variant='contained'
          sx={{
            height: 44,
          }}
        >
          로그인
        </Button>
      </form>
      <Button
        onClick={reqKakaoLogin}
        fullWidth
        variant='contained'
        sx={{
          marginTop: "10px",
          backgroundColor: "#F9e000",
          color: "#000",
          height: 44,
        }}
      >
        카카오 로그인
      </Button>

      <FlexRowCenter mt='1.25rem'>
        <Box>아직 회원이 아니신가요?</Box>
        <Link href='/signup' passHref legacyBehavior>
          <a>
            <H6 ml={1} borderBottom='1px solid' borderColor='grey.900'>
              회원 가입
            </H6>
          </a>
        </Link>
      </FlexRowCenter>

      <FlexBox
        justifyContent='center'
        bgcolor='grey.200'
        borderRadius='4px'
        py={2.5}
        mt='1.25rem'
      >
        비밀번호를 잊으셨나요?
        <Link href='/reset-password' passHref legacyBehavior>
          <a>
            <H6 ml={1} borderBottom='1px solid' borderColor='grey.900'>
              비밀번호 찾기
            </H6>
          </a>
        </Link>
      </FlexBox>
    </Wrapper>
  );
};

const initialValues = {
  email: "",
  password: "",
};
const formSchema = yup.object().shape({
  password: yup.string().required("패스워드를 입력하세요."),
  email: yup
    .string()
    .email("이메일 주소 형식이 맞지 않습니다.")
    .required("이메일 주소를 입력하세요."),
});
export default Login;
