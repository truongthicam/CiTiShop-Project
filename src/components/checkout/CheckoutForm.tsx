import { Formik } from "formik";
import Link from "next/link";
import { useRouter } from "next/router";
import * as yup from "yup";
import Button from "../buttons/Button";
import { Card1 } from "../Card1";
import Grid from "../grid/Grid";
import TextField from "../text-field/TextField";
import Typography from "../Typography";

const CheckoutForm = () => {
  const router = useRouter();

  const handleFormSubmit = async (values) => {
    console.log(values);
    router.push("/payment");
  };

 

  return (
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
          <Card1 mb="2rem">
            <Typography fontWeight="600" mb="1rem">
              Thông tin nhận hàng
            </Typography>

            <Grid container spacing={7}>
              <Grid item sm={6} xs={12}>
                <TextField
                  name="shipping_name"
                  label="Người nhận"
                  fullwidth
                  mb="1rem"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.shipping_name || ""}
                  errorText={touched.shipping_name && errors.shipping_name}
                />
                <TextField
                  name="shipping_contact"
                  label="Số điện thoại"
                  fullwidth
                  mb="1rem"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.shipping_contact || ""}
                  errorText={
                    touched.shipping_contact && errors.shipping_contact
                  }
                />
                
              </Grid>
              <Grid item sm={6} xs={12}>
                <TextField
                  name="shipping_email"
                  label="Email"
                  type="email"
                  fullwidth
                  mb="1rem"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.shipping_email || ""}
                  errorText={touched.shipping_email && errors.shipping_email}
                />
                <TextField
                  name="shipping_address"
                  label="Địa chỉ"
                  fullwidth
                  mb="1rem"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.shipping_address || ""}
                  errorText={
                    touched.shipping_address && errors.shipping_address
                  }
                />
                
              </Grid>
            </Grid>
          </Card1>

          

          <Grid container spacing={7}>
            <Grid item sm={6} xs={12}>
              <Link href="/cart">
                <Button
                  variant="outlined"
                  color="primary"
                  type="button"
                  fullwidth
                >
                  Về giỏ hàng
                </Button>
              </Link>
            </Grid>
            <Grid item sm={6} xs={12}>
              <Button
                variant="contained"
                color="primary"
                type="submit"
                fullwidth
              >
                Thanh toán
              </Button>
            </Grid>
          </Grid>
        </form>
      )}
    </Formik>
  );
};

const initialValues = {
  shipping_name: "",
  shipping_email: "",
  shipping_contact: "",
  shipping_address: "",
 


};

const checkoutSchema = yup.object().shape({
  shipping_name: yup.string().required("Vui lòng nhập tên"),
  shipping_email: yup.string().email("invalid email").required("Vui lòng nhập email"),
  shipping_contact: yup.string().required("Vui lòng nhập số điện thoại"),
  shipping_address: yup.string().required("Vui lòng nhập địa chỉ"),
  
});

export default CheckoutForm;
