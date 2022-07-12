import { CreateInvoiceDto, UserDto } from "@utils/apiTypes";
import { Formik } from "formik";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";
import * as yup from "yup";
import Button from "../buttons/Button";
import { Card1 } from "../Card1";
import Grid from "../grid/Grid";
import TextField from "../text-field/TextField";
import Typography from "../Typography";

export interface CheckoutFormProps {
  user: UserDto;
}

const CheckoutForm: React.FC<CheckoutFormProps> = ({
  user,
}) => {
  const [invoice, setInvoice] = useState<CreateInvoiceDto>(undefined);
  const router = useRouter();

  const initialValues = () => {
    return {
      receiverName: user?.fullName ?? "",
      email: user?.email ?? "",
      phoneNumber: user?.phoneNumber ?? "",
      deliveryAddress: "",
    }
  };

  const handleFormSubmit = async (values) => {
    // console.log(values);
    setInvoice({ ...invoice, ...values });
    let createInvoiceStr = JSON.stringify({ ...invoice, ...values });
    localStorage.setItem('CreateInvoice', createInvoiceStr);
    router.push("/payment");
  };

  return (
    <Formik
      initialValues={initialValues()}
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
                  name="receiverName"
                  label="Người nhận"
                  fullwidth
                  mb="1rem"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.receiverName || ""}
                  errorText={touched.receiverName && errors.receiverName}
                />
                <TextField
                  name="phoneNumber"
                  label="Số điện thoại"
                  fullwidth
                  mb="1rem"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.phoneNumber || ""}
                  errorText={
                    touched.phoneNumber && errors.phoneNumber
                  }
                />

              </Grid>
              <Grid item sm={6} xs={12}>
                <TextField
                  name="email"
                  label="Email"
                  type="email"
                  fullwidth
                  mb="1rem"
                  onBlur={handleBlur}
                  // onChange={handleChange}
                  value={values.email || ""}
                  errorText={touched.email && errors.email}
                />
                <TextField
                  name="deliveryAddress"
                  label="Địa chỉ"
                  fullwidth
                  mb="1rem"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.deliveryAddress || ""}
                  errorText={
                    touched.deliveryAddress && errors.deliveryAddress
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

const checkoutSchema = yup.object().shape({
  receiverName: yup.string().required("Vui lòng nhập tên"),
  email: yup.string().email("invalid email").required("Vui lòng nhập email"),
  phoneNumber: yup.string().required("Vui lòng nhập số điện thoại"),
  deliveryAddress: yup.string().required("Vui lòng nhập địa chỉ"),
});

export default CheckoutForm;
