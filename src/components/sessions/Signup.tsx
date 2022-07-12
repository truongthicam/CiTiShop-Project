import Spinner from "@component/Spinner";
import { apiEndpoint } from "@utils/constants";
import { useFormik } from "formik";
import Link from "next/link";
import React, { useState } from "react";
import * as yup from "yup";
import Box from "../Box";
import Button from "../buttons/Button";
import IconButton from "../buttons/IconButton";
import CheckBox from "../CheckBox";
import Divider from "../Divider";
import FlexBox from "../FlexBox";
import Icon from "../icon/Icon";
import TextField from "../text-field/TextField";
import { H3, H5, H6, SemiSpan, Small, Span } from "../Typography";
import { StyledSessionCard } from "./SessionStyle";

const Signup: React.FC = () => {
  const [buttonDisable, setButtonDisable] = useState(false);
  const [passwordVisibility, setPasswordVisibility] = useState(false);

  const togglePasswordVisibility = () => {
    setPasswordVisibility((visible) => !visible);
  };

  const handleFormSubmit = async (values) => {
    setButtonDisable(true);
    let response = await fetch(new URL("/api/User/Register", apiEndpoint), {
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
      alert('Đăng ký thành công! Vui lòng kiểm tra email để xác nhận');
    } else {
      // console.log(data);
      let errors = Array(...data);
      let emailErrors = errors.find(err => err.code === 'DuplicateEmail');
      if (emailErrors) {
        setFieldError('email', emailErrors.description);
      } else {
        setFieldError('password', errors.pop().description);
      }
    }

    // console.log(values);
    setButtonDisable(false);
  };

  const {
    values,
    errors,
    touched,
    setFieldError,
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
          ĐĂNG KÝ TÀI KHOẢN CITI SHOP
        </H3>
        <H5
          fontWeight="600"
          fontSize="12px"
          color="gray.800"
          textAlign="center"
          mb="2.25rem"
        >
          Vui lòng điền các thông tin bên dưới
        </H5>

        <TextField
          mb="0.75rem"
          name="fullName"
          label="Họ và tên"
          placeholder="Nguyễn Văn A"
          fullwidth
          onBlur={handleBlur}
          onChange={handleChange}
          value={values.fullName || ""}
          errorText={touched.fullName && errors.fullName}
        />
        <TextField
          mb="0.75rem"
          name="email"
          placeholder="nguyenvana@gmail.com"
          label="Email"
          type="email"
          fullwidth
          onBlur={handleBlur}
          onChange={handleChange}
          value={values.email || ""}
          errorText={touched.email && errors.email}
        />
        <TextField
          mb="0.75rem"
          name="password"
          placeholder="*********"
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
        <TextField
          mb="1rem"
          name="confirmPassword"
          placeholder="*********"
          type={passwordVisibility ? "text" : "password"}
          label="Xác nhận mật khẩu"
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
          value={values.confirmPassword || ""}
          errorText={touched.confirmPassword && errors.confirmPassword}
        />

        <CheckBox
          mb="1.75rem"
          name="agreement"
          color="secondary"
          checked={values.agreement}
          onChange={handleChange}
          label={
            <FlexBox>
              <SemiSpan>Đồng ý với</SemiSpan>
              <a href="/" target="_blank" rel="noreferrer noopener">
                <H6 ml="0.5rem" borderBottom="1px solid" borderColor="gray.900">
                  Chính sách và điều khoản
                </H6>
              </a>
            </FlexBox>
          }
        />
        {touched.agreement && errors.agreement && <p style={{ color: "red" }}>{errors.agreement}</p>}

        <Button
          mb="1.65rem"
          variant="contained"
          color="primary"
          type="submit"
          fullwidth
          disabled={buttonDisable}
        >
          ĐĂNG KÝ &nbsp;{buttonDisable && <Spinner />}
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
      </form>
      <FlexBox justifyContent="center" bg="gray.200" py="19px">
        <SemiSpan>Bạn đã có tài khoản?</SemiSpan>
        <Link href="/login">
          <a>
            <H6 ml="0.5rem" borderBottom="1px solid" borderColor="gray.900">
              Đăng nhập
            </H6>
          </a>
        </Link>
      </FlexBox>
    </StyledSessionCard>
  );
};

const initialValues = {
  fullName: "",
  email: "",
  password: "",
  confirmPassword: "",
  agreement: false,
};

const formSchema = yup.object().shape({
  fullName: yup.string().required("Vui lòng nhập tên"),
  email: yup.string().email("Email không đúng định dạng").required("Vui lòng nhập email"),
  password: yup.string().required("Vui lòng nhập mật khẩu"),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password"), null], "Mật khẩu không khớp")
    .required("Vui lòng nhập lại mật khẩu"),
  agreement: yup
    .bool()
    .test(
      "agreement",
      "Bạn phải đồng ý với chính sách và điều khoản của CiTi Shop!",
      (value) => value === true
    )
    .required("Bạn phải đồng ý với chính sách và điều khoản của chúng tôi"),
});

export default Signup;
