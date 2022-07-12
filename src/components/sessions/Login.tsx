import Spinner from "@component/Spinner";
import { UserDto } from "@utils/apiTypes";
import { apiEndpoint } from "@utils/constants";
import { useFormik } from "formik";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useCallback, useState } from "react";
import * as yup from "yup";
import Box from "../Box";
import Button from "../buttons/Button";
import IconButton from "../buttons/IconButton";
import Divider from "../Divider";
import FlexBox from "../FlexBox";
import Icon from "../icon/Icon";
import TextField from "../text-field/TextField";
import { H3, H5, H6, SemiSpan, Small, Span } from "../Typography";
import { StyledSessionCard } from "./SessionStyle";

const Login: React.FC = () => {
  const [buttonDisable, setButtonDisable] = useState(false);
  const [passwordVisibility, setPasswordVisibility] = useState(false);
  const router = useRouter();

  const togglePasswordVisibility = useCallback(() => {
    setPasswordVisibility((visible) => !visible);
  }, []);

  const handleFormSubmit = async (values) => {
    setButtonDisable(true);
    let response = await fetch(new URL("/api/User/Login", apiEndpoint), {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(values),
    });
    // console.log(response);
    let data = await response.json();
    // console.log(data);
    if (response.ok) {
      let userDto: UserDto = data;
      localStorage.setItem('User', JSON.stringify(userDto));
      if (userDto.isAdmin) {
        router.push("/admin/dashboard");
      } else {
        router.push("/");
      }
    } else {
      alert(data);
      // console.log(data);
    }
    // console.log(values);
    setButtonDisable(false);
  };

  const {
    values,
    errors,
    touched,
    handleBlur,
    handleChange,
    handleSubmit,
  } = useFormik({
    onSubmit: handleFormSubmit,
    initialValues,
    validationSchema: formSchema,
  });

  return (
    <StyledSessionCard mx="auto" my="2rem" boxShadow="large">
      <form className="content" onSubmit={handleSubmit}>
        <H3 textAlign="center" mb="0.5rem">
          CITI SHOP ĐĂNG NHẬP
        </H3>
        <H5
          fontWeight="600"
          fontSize="12px"
          color="gray.800"
          textAlign="center"
          mb="2.25rem"
        >
          Đăng nhập với tài khoản CiTi Shop
        </H5>

        <TextField
          mb="0.75rem"
          name="email"
          placeholder="exmple@mail.com"
          label="Email"
          type="email"
          fullwidth
          onBlur={handleBlur}
          onChange={handleChange}
          value={values.email || ""}
          errorText={touched.email && errors.email}
        />
        <TextField
          mb="1rem"
          name="password"
          placeholder="*********"
          autoComplete="on"
          type={passwordVisibility ? "text" : "password"}
          label="Mật khẩu"
          fullwidth
          endAdornment={
            <IconButton
              size="small"
              type="button"
              p="0.25rem"
              mr="0.25rem"
              color={passwordVisibility ? "gray.700" : "gray.600"}
              onClick={togglePasswordVisibility}
            >
              <Icon variant="small" defaultcolor="currentColor">
                {passwordVisibility ? "eye-alt" : "eye"}
              </Icon>
            </IconButton>
          }
          onBlur={handleBlur}
          onChange={handleChange}
          value={values.password || ""}
          errorText={touched.password && errors.password}
        />

        <Link href="/">
          <a>Quên mật khẩu?
          </a>
        </Link>
        <Button
          mb="1.65rem"
          variant="contained"
          color="primary"
          type="submit"
          fullwidth
          disabled={buttonDisable}
        >
          ĐĂNG NHẬP &nbsp;{buttonDisable && <Spinner />}
        </Button>

        <Box mb="1rem">
          <Divider width="200px" mx="auto" />
          <FlexBox justifyContent="center" mt="-14px">
            <Span color="text.muted" bg="body.paper" px="1rem">
              hoặc
            </Span>
          </FlexBox>
        </Box>



        <FlexBox
          justifyContent="center"
          alignItems="center"
          bg="#4285F4"
          borderRadius={5}
          height="40px"
          color="white"
          cursor="pointer"
          mb="1.25rem"
        >
          <Icon variant="small" defaultcolor="auto" mr="0.5rem">
            google-1
          </Icon>
          <Small fontWeight="600">Đăng nhập với Google</Small>
        </FlexBox>

        <FlexBox justifyContent="center" mb="1.25rem">
          <SemiSpan>Chưa có tài khoản?</SemiSpan>
          <Link href="/signup">
            <a>
              <H6 ml="0.5rem" borderBottom="1px solid" borderColor="gray.900">
                Đăng ký
              </H6>
            </a>
          </Link>
        </FlexBox>
      </form>
    </StyledSessionCard>
  );
};

const initialValues = {
  email: "",
  password: "",
};

const formSchema = yup.object().shape({
  email: yup.string().email("Email không đúng định dạng").required("Vui lòng nhập Email"),
  password: yup.string().required("Vui lòng nhập mật khẩu"),
});

export default Login;
