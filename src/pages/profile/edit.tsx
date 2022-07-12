import Avatar from "@component/avatar/Avatar";
import Box from "@component/Box";
import Button from "@component/buttons/Button";
import { Card1 } from "@component/Card1";
import FlexBox from "@component/FlexBox";
import Grid from "@component/grid/Grid";
import Hidden from "@component/hidden/Hidden";
import Icon from "@component/icon/Icon";
import DashboardLayout from "@component/layout/CustomerDashboardLayout";
import DashboardPageHeader from "@component/layout/DashboardPageHeader";
import Spinner from "@component/Spinner";
import TextField from "@component/text-field/TextField";
import { UserDto } from "@utils/apiTypes";
import { apiEndpoint } from "@utils/constants";
import { Formik, useFormik } from "formik";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import * as yup from "yup";

const ProfileEditor = () => {
  const [buttonDisable, setButtonDisable] = useState(false);
  const [user, setUser] = useState<UserDto>(undefined);
  const router = useRouter();

  useEffect(() => {
    // Perform localStorage action
    const userJson = localStorage.getItem('User');
    if (!userJson) {
      router.replace("/403");
    } else {
      setUser(JSON.parse(userJson));
    }
  }, []);

  const handleFormSubmit = async (values) => {
    setButtonDisable(true);
    let response = await fetch(new URL(`/api/User/${user.email}`, apiEndpoint), {
      method: 'PUT',
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
      alert('Chỉnh sửa thông tin thành công!');
    } else if (response.status == 400) {
      // console.log(data);
      let errors = data.errors;
      let message = errors.fullName ? Array(...errors.fullName).pop() : "" + "\n" +
        errors.phoneNumber ? Array(...errors.phoneNumber).pop() : "";
      alert(message);
    } else {
      alert(response.status);
    }

    // console.log(values);
    setButtonDisable(false);
  };

  return (
    <div>
      <DashboardPageHeader
        iconName="user_filled"
        title="Chỉnh sửa thông tin"
        button={
          <Link href="/profile">
            <Button color="primary" bg="primary.light" px="2rem">
              Quay lại
            </Button>
          </Link>
        }
      />

      {!user ? <Spinner /> :
        <Card1>
          <FlexBox alignItems="flex-end" mb="22px">
            <Avatar src="" size={64} />

            <Box ml="-20px" zIndex={1}>
              <label htmlFor="profile-image">
                <Button
                  as="span"
                  size="small"
                  bg="gray.300"
                  color="secondary"
                  height="auto"
                  p="6px"
                  borderRadius="50%"
                >
                  <Icon>camera</Icon>
                </Button>
              </label>
            </Box>
            <Hidden>
              <input
                className="hidden"
                onChange={(e) => console.log(e.target.files)}
                id="profile-image"
                accept="image/*"
                type="file"
              />
            </Hidden>
          </FlexBox>

          <Formik
            initialValues={{
              fullName: user?.fullName || "",
              phoneNumber: user?.phoneNumber || "",
              dateOfBirth: "",
            }}
            validationSchema={checkoutSchema}
            onSubmit={handleFormSubmit}
          >
            {({
              values,
              errors,
              touched,
              handleChange,
              handleBlur,
              handleSubmit,
            }) => (
              <form onSubmit={handleSubmit}>
                <Box mb="30px">
                  <Grid container horizontal_spacing={6} vertical_spacing={4}>
                    {/* <Grid item md={6} xs={12}>
                    <TextField
                      name="first_name"
                      label="Họ"
                      fullwidth
                      onBlur={handleBlur}
                      onChange={handleChange}
                      value={values.first_name || ""}
                      errorText={touched.first_name && errors.first_name}
                    />
                  </Grid> */}
                    <Grid item md={6} xs={12}>
                      <TextField
                        name="fullName"
                        label="Họ tên"
                        fullwidth
                        onBlur={handleBlur}
                        onChange={handleChange}
                        value={values.fullName || ""}
                        errorText={touched.fullName && errors.fullName}
                      />
                    </Grid>
                    {/* <Grid item md={6} xs={12}>
                    <TextField
                      name="email"
                      type="email"
                      label="Email"
                      fullwidth
                      onBlur={handleBlur}
                      onChange={handleChange}
                      value={values.email || ""}
                      errorText={touched.email && errors.email}
                    />
                  </Grid> */}
                    <Grid item md={6} xs={12}>
                      <TextField
                        name="phoneNumber"
                        label="Số điện thoại"
                        fullwidth
                        onBlur={handleBlur}
                        onChange={handleChange}
                        value={values.phoneNumber || ""}
                        errorText={touched.phoneNumber && errors.phoneNumber}
                      />
                    </Grid>
                    <Grid item md={6} xs={12}>
                      <TextField
                        name="dateOfBirth"
                        label="Ngày sinh"
                        type="date"
                        fullwidth
                        onBlur={handleBlur}
                        onChange={handleChange}
                        value={values.dateOfBirth || ""}
                        errorText={touched.dateOfBirth && errors.dateOfBirth}
                      />
                    </Grid>
                  </Grid>
                </Box>

                <Button type="submit" variant="contained" color="primary" disabled={buttonDisable}>
                  Lưu &nbsp;{buttonDisable && <Spinner />}
                </Button>
              </form>
            )}
          </Formik>
        </Card1>}
    </div >
  );
};

// const initialValues = {
//   fullName: "",
//   // email: "",
//   phoneNumber: "",
//   dateOfBirth: "",
// };

const checkoutSchema = yup.object().shape({
  fullName: yup.string().required("vui lòng nhập tên"),
  // email: yup.string().email("Email không hợp lệ").required("Vui lòng nhập Email"),
  phoneNumber: yup.string().required("Vui lòng nhập số điện thoại"),
  dateOfBirth: yup.date().required("Vui lòng nhập ngày sinh"),
});

ProfileEditor.layout = DashboardLayout;

export default ProfileEditor;
