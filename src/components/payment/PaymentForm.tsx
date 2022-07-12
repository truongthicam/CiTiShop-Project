// import { Formik } from "formik";
import Spinner from "@component/Spinner";
import { useAppContext } from "@context/app/AppContext";
import { CartItem } from "@reducer/cartReducer";
import { CreateInvoiceDto, InvoiceDto, MomoPaymentResponseDto } from "@utils/apiTypes";
import { apiEndpoint } from "@utils/constants";
import Link from "next/link";
import { useRouter } from "next/router";
import { Fragment, useCallback, useState } from "react";
// import * as yup from "yup";
import useWindowSize from "../../hooks/useWindowSize";
// import Box from "../Box";
import Button from "../buttons/Button";
import { Card1 } from "../Card1";
import Divider from "../Divider";
// import FlexBox from "../FlexBox";
import Grid from "../grid/Grid";
import Radio from "../radio/Radio";
// import TextField from "../text-field/TextField";
import Typography from "../Typography";

export interface PaymentFormProps {
  onSubmit?: (selected: number) => void;
}

const PaymentForm: React.FC<PaymentFormProps> = ({ onSubmit }) => {
  const [paymentMethod, setPaymentMethod] = useState("cod");

  const width = useWindowSize();
  const router = useRouter();
  const isMobile = width < 769;

  const [buttonDisable, setButtonDisable] = useState(false);
  const { state, dispatch } = useAppContext();
  const cartList: CartItem[] = state.cart.cartList;

  // const handleFormSubmit = async (values) => {
  //   console.log(values);
  //   router.push("/payment");
  // };

  const handleClearCart = useCallback(
    () => {
      dispatch({
        type: "CLEAR_CART",
        payload: undefined
      });
    },
    []
  );

  const getTotalPrice = () => {
    return (
      cartList.reduce(
        (accumulator, item) => accumulator + item.price * item.qty,
        0
      ) || 0
    );
  };

  const handlePaymentSubmit = async () => {
    // router.push("https://localhost:7008/swagger/index.html"); return;
    // console.log(paymentMethod);
    if (onSubmit) onSubmit(paymentMethod === "momo" ? 1 : 0)

    setButtonDisable(true);
    let invoiceStr = localStorage.getItem('CreateInvoice');
    if (invoiceStr) {
      let invoiceJson: CreateInvoiceDto = JSON.parse(invoiceStr);
      const currentUrl = new URL(window.location.href);
      let values: CreateInvoiceDto = {
        // 1. /cart
        cartItems: cartList.map((item) => { return { productId: item.id, quantity: item.qty } }),
        deliveryDescription: "",
        // 2. /checkout
        receiverName: invoiceJson.receiverName,
        email: invoiceJson.email,
        phoneNumber: invoiceJson.phoneNumber,
        deliveryAddress: invoiceJson.deliveryAddress,
        // 3. /payment
        paymentType: paymentMethod === "momo" ? 1 : 0, // 0: Nhận ; 1: Momo
        // CheckoutSummary
        totalCost: getTotalPrice(),
        totalFee: 40000,
        discount: 40000,
        returnUrl: new URL(currentUrl.pathname, currentUrl.origin).href,
      };
      // console.log(values);
      let response = await fetch(new URL("/api/Invoice/", apiEndpoint), {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(values),
      });
      // console.log(response);
      let data = await response.json();
      console.log('Response JSON: ', data);
      if (response.ok) {
        if (data.momoResponse) { // Pay using Momo
          let momoResponse: MomoPaymentResponseDto = data.momoResponse;
          console.log('Momo Response: ', momoResponse);
          if (momoResponse.errorCode === 0) { // Redirect to Momo Payment
            router.push(momoResponse.payUrl);
          } else {
            alert(momoResponse.localMessage);
          }
        } else { // COD
          let invoiceResponse: InvoiceDto = data;
          console.log('Invoice Response: ', invoiceResponse);
          router.push("/orders");
        }
        handleClearCart();
      }
    }

    setButtonDisable(false);
  };

  const handlePaymentMethodChange = ({ target: { name, value } }) => {
    setPaymentMethod(name);
    // console.log(name, value);
  };

  return (
    <Fragment>
      <Card1 mb="2rem">
        {/* <Radio
          name="credit-card"
          mb="1.5rem"
          color="secondary"
          checked={paymentMethod === "credit-card"}
          label={
            <Typography ml="6px" fontWeight="600" fontSize="18px">
              Thanh toán bằng thẻ
            </Typography>
          }
          onChange={handlePaymentMethodChange}
        />

        <Divider mb="1.25rem" mx="-2rem" />

        {paymentMethod === "credit-card" && (
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
                <Box mb="1.5rem">
                  <Grid container horizontal_spacing={6} vertical_spacing={4}>
                    <Grid item sm={6} xs={12}>
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
                    <Grid item sm={6} xs={12}>
                      <TextField
                        name="exp_date"
                        label="Ngày hết hạn"
                        placeholder="MM/YY"
                        fullwidth
                        onBlur={handleBlur}
                        onChange={handleChange}
                        value={values.exp_date || ""}
                        errorText={touched.exp_date && errors.exp_date}
                      />
                    </Grid>
                    <Grid item sm={6} xs={12}>
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
                    <Grid item sm={6} xs={12}>
                      <TextField
                        name="name"
                        label="CVV/CVC"
                        fullwidth
                        onBlur={handleBlur}
                        onChange={handleChange}
                        value={values.name || ""}
                        errorText={touched.name && errors.name}
                      />
                    </Grid>
                  </Grid>
                </Box>


                <Link href="/orders">
                <Button variant="outlined" color="primary" mb="30px">
                  Xong
                </Button>
                </Link>
                

                <Divider mb="1.5rem" mx="-2rem" />
              </form>
            )}
          </Formik>
        )} */}

        <Radio
          name="momo"
          value={1}
          mb="1.5rem"
          color="secondary"
          checked={paymentMethod === "momo"}
          label={
            <Typography ml="6px" fontWeight="600" fontSize="18px">
              Thanh toán với ví Momo
            </Typography>
          }
          onChange={handlePaymentMethodChange}
        />
        <Divider mb="1.5rem" mx="-2rem" />

        {/* {paymentMethod === "momo" && (
          <Fragment>
            <FlexBox alignItems="flex-end" mb="30px">
              <TextField
                name="qr"
                label="Quét Mã QR"
                type="qr"
                mr={isMobile ? "1rem" : "30px"}
                fullwidth
              />
              
            </FlexBox>
            <Link href="/orders">
                <Button variant="outlined" color="primary" mb="30px">
                  Xong
                </Button>
              </Link>

            <Divider mb="1.5rem" mx="-2rem" />
          </Fragment>
        )} */}

        <Radio
          name="cod"
          value={0}
          color="secondary"
          checked={paymentMethod === "cod"}
          label={
            <Typography ml="6px" fontWeight="600" fontSize="18px">
              Thanh toán khi nhận
            </Typography>
          }
          onChange={handlePaymentMethodChange}
        />
      </Card1>

      <Grid container spacing={7}>
        <Grid item sm={6} xs={12}>
          {!buttonDisable && <Link href="/checkout">
            <Button variant="outlined" color="primary" type="button" fullwidth>
              Quay lại
            </Button>
          </Link>}
        </Grid>
        <Grid item sm={6} xs={12}>
          <Button variant="contained" color="primary" type="submit" fullwidth
            disabled={buttonDisable} onClick={handlePaymentSubmit}>
            Đặt hàng &nbsp;{buttonDisable && <Spinner />}
          </Button>
        </Grid>
      </Grid>
    </Fragment>
  );
};

// const initialValues = {
//   card_no: "",
//   name: "",
//   exp_date: "",
//   cvc: "",
// };

// const checkoutSchema = yup.object().shape({
//   card_no: yup.string().required("Vui lòng nhập số thẻ"),
//   name: yup.string().required("Vui lòng nhập tên chủ thẻ"),
//   exp_date: yup.string().required("Vui lòng nhập ngày hết hạn"),
//   cvc: yup.string().required("Vui lòng nhập CVV/CVC"),
// });

export default PaymentForm;
