import Box from "@component/Box";
import Button from "@component/buttons/Button";
import { Card1 } from "@component/Card1";
import Grid from "@component/grid/Grid";
import DashboardPageHeader from "@component/layout/DashboardPageHeader";
import Spinner from "@component/Spinner";
import TextField from "@component/text-field/TextField";
import { AddressDto, UserDto } from "@utils/apiTypes";
import { apiEndpoint } from "@utils/constants";
import { Formik } from "formik";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import * as yup from "yup";

export interface AddressEditorProps {
  id?: number;
  user: UserDto;
}

const AddressEditor: React.FC<AddressEditorProps> = ({
  id, user,
}) => {
  const [buttonDisable, setButtonDisable] = useState(false);
  const router = useRouter();

  const [addressDto, setAddressDto] = useState<AddressDto>(undefined);

  useEffect(() => {
    if (id) { // Edit
      fetch(new URL(new URL(`/api/UserDeliveryAddress/${user.id}/${id}`, apiEndpoint)))
        .then(async response => {
          let data = await response.json();
          if (response.ok) {
            setAddressDto(data);
          } else {
            alert(response.status);
          }
        }, (err) => {
          console.log(err);
        })
    }
  }, []);

  const handleFormSubmit = async (values) => {
    setButtonDisable(true);
    if (id) { // Edit
      let response = await fetch(new URL(`/api/UserDeliveryAddress/${user.id}/${id}`, apiEndpoint), {
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
        alert('Chỉnh sửa thông tin thành công!');
      } else if (response.status == 400) {
        // console.log(data);
        let errors = data.errors;
        let message = errors.receiverName ? Array(...errors.receiverName).pop() : "" + "\n" +
          errors.deliveryAddress ? Array(...errors.deliveryAddress).pop() : "" + "\n" +
            errors.phoneNumber ? Array(...errors.phoneNumber).pop() : "";
        alert(message);
      } else {
        alert(response.status);
      }
    } else { // Create
      let response = await fetch(new URL(`/api/UserDeliveryAddress/`, apiEndpoint), {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ ...values, userId: user.id }),
      });
      // console.log(response);
      let data = await response.json();
      // console.log(data);
      if (response.ok) {
        alert('Thêm thông tin thành công!');
        router.push('/address')
      } else if (response.status == 400) {
        // console.log(data);
        const errors = data.errors;
        if (errors.receiverName) alert(`Tên người nhận: ${Array(...errors.receiverName).pop()}`);
        else if (errors.deliveryAddress) alert(`Địa chỉ nhận hàng: ${Array(...errors.deliveryAddress).pop()}`);
        else if (errors.phoneNumber) alert(`Số điện thoại: ${Array(...errors.phoneNumber).pop()}`);

      } else {
        alert(response.status);
      }
    }
    // console.log(values);
    setButtonDisable(false);
  };

  const initialValues = {
    receiverName: user?.fullName ?? "",
    deliveryAddress: "",
    phoneNumber: user?.phoneNumber ?? "",
  };

  return (
    (id && !addressDto) ? <Spinner /> :
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
            initialValues={!id ? initialValues : {
              receiverName: addressDto?.receiverName ?? "",
              deliveryAddress: addressDto?.deliveryAddress ?? "",
              phoneNumber: addressDto?.phoneNumber ?? "",
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
                    <Grid item md={6} xs={12}>
                      <TextField
                        name="receiverName"
                        label="Tên người nhận"
                        fullwidth
                        onBlur={handleBlur}
                        onChange={handleChange}
                        value={values.receiverName || ""}
                        errorText={touched.receiverName && errors.receiverName}
                      />
                    </Grid>
                    <Grid item md={6} xs={12}>
                      <TextField
                        name="deliveryAddress"
                        label="Địa chỉ nhận hàng"
                        fullwidth
                        onBlur={handleBlur}
                        onChange={handleChange}
                        value={values.deliveryAddress || ""}
                        errorText={touched.deliveryAddress && errors.deliveryAddress}
                      />
                    </Grid>
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
                  </Grid>
                </Box>

                <Button type="submit" variant="contained" color="primary" disabled={buttonDisable}>
                  Lưu &nbsp;{buttonDisable && <Spinner />}
                </Button>
              </form>
            )}
          </Formik>
        </Card1>
      </div>
  );
};

const checkoutSchema = yup.object().shape({
  receiverName: yup.string().required("Vui lòng nhập tên"),
  deliveryAddress: yup.string().required("Vui lòng nhập địa chỉ"),
  phoneNumber: yup.string().required("Vui òng nhập số điện thoại"),
});

// AddressEditor.layout = DashboardLayout;

export default AddressEditor;
