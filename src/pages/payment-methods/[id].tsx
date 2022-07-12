import Box from "@component/Box";
import Button from "@component/buttons/Button";
import { Card1 } from "@component/Card1";
import Grid from "@component/grid/Grid";
import DashboardLayout from "@component/layout/CustomerDashboardLayout";
import DashboardPageHeader from "@component/layout/DashboardPageHeader";
import TextField from "@component/text-field/TextField";
import { Formik } from "formik";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect } from "react";
import * as yup from "yup";

const PaymentMethodEditor = () => {
  // const [user, setUser] = useState<UserDto>(undefined);
  const router = useRouter();

  useEffect(() => {
    // Perform localStorage action
    const userJson = localStorage.getItem('User');
    if (!userJson) {
      router.replace("/403");
    }
    // else {
    //   setUser(JSON.parse(userJson));
    // }
  }, [])

  const {
    query: { id },
  } = useRouter();

  const handleFormSubmit = async (values) => {
    console.log(values);
  };

  return (
    <div>
      <DashboardPageHeader
        iconName="credit-card_filled"
        title={`${id === "add" ? "Thêm" : "Chỉnh sửa"} Phương thức thanh toán`}
        button={
          <Link href="/payment-methods">
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
                      name="card_no"
                      label="Số thẻ"
                      fullwidth
                      onBlur={handleBlur}
                      onChange={handleChange}
                      value={values.card_no || ""}
                      errorText={touched.card_no && errors.card_no}
                    />
                  </Grid>
                  <Grid item md={6} xs={12}>
                    <TextField
                      name="name"
                      label="Tên trên thẻ"
                      fullwidth
                      onBlur={handleBlur}
                      onChange={handleChange}
                      value={values.name || ""}
                      errorText={touched.name && errors.name}
                    />
                  </Grid>
                  <Grid item md={6} xs={12}>
                    <TextField
                      name="exp"
                      label="Ngày hết hạn"
                      fullwidth
                      onBlur={handleBlur}
                      onChange={handleChange}
                      value={values.exp || ""}
                      errorText={touched.exp && errors.exp}
                    />
                  </Grid>
                  <Grid item md={6} xs={12}>
                    <TextField
                      name="cvc"
                      label="CVC/CCV"
                      fullwidth
                      onBlur={handleBlur}
                      onChange={handleChange}
                      value={values.cvc || ""}
                      errorText={touched.cvc && errors.cvc}
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
  card_no: "",
  name: "",
  exp: "",
  cvc: "",
};

const checkoutSchema = yup.object().shape({
  name: yup.string().required("Vui lòng nhập tên trên thẻ"),
  card_no: yup.string().required("Vui lòng nhập số thẻ"),
  exp: yup.string().required("Vui lòng nhập ngày hết hạn"),
  cvc: yup.string().required("Vui lòng nhập CVV/CVC"),
});

PaymentMethodEditor.layout = DashboardLayout;

export default PaymentMethodEditor;
