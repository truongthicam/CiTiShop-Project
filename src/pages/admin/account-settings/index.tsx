import Avatar from "@component/avatar/Avatar";
import Box from "@component/Box";
import Button from "@component/buttons/Button";
import { Card1 } from "@component/Card1";
import Grid from "@component/grid/Grid";
import Hidden from "@component/hidden/Hidden";
import Icon from "@component/icon/Icon";
import AdminDashboardLayout from "@component/layout/AdminDashboardLayout";
import DashboardPageHeader from "@component/layout/DashboardPageHeader";
import TextField from "@component/text-field/TextField";
import { Formik } from "formik";
import * as yup from "yup";

const AccountSettings = () => {
  const handleFormSubmit = async (values) => {
    console.log(values);
  };

  return (
    <div>
      <DashboardPageHeader title="Account" iconName="settings_filled" />

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

        <Formik
          initialValues={initialValues}
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
                  <Grid item md={6} xs={12}>
                    <TextField
                      name="first_name"
                      label="Họ"
                      fullwidth
                      onBlur={handleBlur}
                      onChange={handleChange}
                      value={values.first_name || ""}
                      errorText={touched.first_name && errors.first_name}
                    />
                  </Grid>
                  <Grid item md={6} xs={12}>
                    <TextField
                      name="last_name"
                      label="Tên"
                      fullwidth
                      onBlur={handleBlur}
                      onChange={handleChange}
                      value={values.last_name || ""}
                      errorText={touched.last_name && errors.last_name}
                    />
                  </Grid>
                  <Grid item md={6} xs={12}>
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
                  </Grid>
                  <Grid item md={6} xs={12}>
                    <TextField
                      name="contact"
                      label="Số điện thoại"
                      fullwidth
                      type="tel"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      value={values.contact || ""}
                      errorText={touched.contact && errors.contact}
                    />
                  </Grid>
                  
                  
                </Grid>
              </Box>

              <Button type="submit" variant="contained" color="primary">
                Lưu
              </Button>
            </form>
          )}
        </Formik>
      </Card1>
    </div>
  );
};

const initialValues = {
  first_name: "",
  last_name: "",
  email: "",
  contact: "",
};

const accountSchema = yup.object().shape({
  first_name: yup.string().required("Vui lòng nhập họ"),
  last_name: yup.string().required("Vui lòng nhập tên"),
  email: yup.string().email("Email không đúng định dạng").required("Vui lòng nhập email"),
  contact: yup.string().required("Vui lòng nhập số điện thoại"),
});

AccountSettings.layout = AdminDashboardLayout;

export default AccountSettings;
