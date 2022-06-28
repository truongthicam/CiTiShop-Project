import Box from "@component/Box";
import Button from "@component/buttons/Button";
import { Card1 } from "@component/Card1";
import Grid from "@component/grid/Grid";
import DashboardPageHeader from "@component/layout/DashboardPageHeader";
import TextField from "@component/text-field/TextField";
import { Formik } from "formik";
import Link from "next/link";
import * as yup from "yup";
import DashboardLayout from "../layout/CustomerDashboardLayout";

const AddressEditor = () => {
  const handleFormSubmit = async (values) => {
    console.log(values);
  };

  return (
    <div>
      <DashboardPageHeader
        iconName="pin_filled"
        title="Thêm địa chỉ"
        button={
          <Link href="/address">
            <Button color="primary" bg="primary.light" px="2rem">
              Quay lại
            </Button>
          </Link>
        }
      />

      <Card1>
        <Formik
          initialValues={initialValues}
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
                  <Grid item md={6} xs={12}>
                    <TextField
                      name="name"
                      label="Tên người nhận"
                      fullwidth
                      onBlur={handleBlur}
                      onChange={handleChange}
                      value={values.name || ""}
                      errorText={touched.name && errors.name}
                    />
                  </Grid>
                  <Grid item md={6} xs={12}>
                    <TextField
                      name="address"
                      label="Địa chỉ nhận hàng"
                      fullwidth
                      onBlur={handleBlur}
                      onChange={handleChange}
                      value={values.address || ""}
                      errorText={touched.address && errors.address}
                    />
                  </Grid>
                  <Grid item md={6} xs={12}>
                    <TextField
                      name="contact"
                      label="Số điện thoại"
                      fullwidth
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
  name: "",
  address: "",
  contact: "",
};

const checkoutSchema = yup.object().shape({
  name: yup.string().required("Vui lòng nhập tên"),
  address: yup.string().required("Vui lòng nhập địa chỉ"),
  contact: yup.string().required("Vui òng nhập số điện thoại"),
});

AddressEditor.layout = DashboardLayout;

export default AddressEditor;
