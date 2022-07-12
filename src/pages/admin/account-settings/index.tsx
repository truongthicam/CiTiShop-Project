import Avatar from "@component/avatar/Avatar";
import Box from "@component/Box";
import Button from "@component/buttons/Button";
import { Card1 } from "@component/Card1";
import Grid from "@component/grid/Grid";
import Hidden from "@component/hidden/Hidden";
import Icon from "@component/icon/Icon";
import AdminDashboardLayout from "@component/layout/AdminDashboardLayout";
import DashboardPageHeader from "@component/layout/DashboardPageHeader";
import Spinner from "@component/Spinner";
import TextField from "@component/text-field/TextField";
import { UserDto } from "@utils/apiTypes";
import { apiEndpoint } from "@utils/constants";
import { Formik } from "formik";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import * as yup from "yup";

const AccountSettings = () => {
  const [buttonDisable, setButtonDisable] = useState(false);
  const [admin, setAdmin] = useState<UserDto>(undefined);
  const router = useRouter();

  useEffect(() => {
    // Perform localStorage action
    const userJson = localStorage.getItem('User');
    if (!userJson) {
      router.replace("/403");
    } else {
      let userDto: UserDto = JSON.parse(userJson);
      if (userDto.isAdmin) {
        setAdmin(userDto);
      } else {
        router.replace("/403");
      }
    }
  }, []);

  const handleFormSubmit = async (values) => {
    setButtonDisable(true);
    let response = await fetch(new URL(`/api/User/${admin.email}`, apiEndpoint).href, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ ...values }),
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
      const errors = data.errors;
      if (errors.fullName) alert(`Họ tên: ${Array(...errors.fullName).pop()}`);
      else if (errors.phoneNumber) alert(`Số điện thoại: ${Array(...errors.phoneNumber).pop()}`);

    } else {
      alert(response.status);
    }

    // console.log(values);
    setButtonDisable(false);
  };

  return (
    <div>
      <DashboardPageHeader title="Thông tin tài khoản" iconName="settings_filled" />

      <Card1 p="24px 30px">
        <Box
          borderRadius="10px"
          overflow="hidden"
          height="173px"
          mb="1.5rem"
          position="relative"
          style={{
            background:
              "url(/assets/images/banners/banner-10.png) center/cover",
          }}
        >
          <Box
            display="flex"
            alignItems="flex-end"
            position="absolute"
            bottom="20px"
            left="24px"
          >
            <Avatar
              src="/assets/images/faces/propic(9).png"
              size={80}
              border="4px solid"
              borderColor="gray.100"
            />

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
          </Box>


        </Box>

        {!admin ? <Spinner /> :
          <Formik
            initialValues={{
              fullName: admin?.fullName || "",
              phoneNumber: admin?.phoneNumber || "",
              dateOfBirth: "",
            }}
            validationSchema={accountSchema}
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
                        type="tel"
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
        }
      </Card1>
    </div>
  );
};

// const initialValues = {
//   first_name: "",
//   last_name: "",
//   email: "",
//   contact: "",
// };

const accountSchema = yup.object().shape({
  fullName: yup.string().required("vui lòng nhập tên"),
  // email: yup.string().email("Email không hợp lệ").required("Vui lòng nhập Email"),
  phoneNumber: yup.string().required("Vui lòng nhập số điện thoại"),
  dateOfBirth: yup.date().required("Vui lòng nhập ngày sinh"),
});

AccountSettings.layout = AdminDashboardLayout;

export default AccountSettings;
