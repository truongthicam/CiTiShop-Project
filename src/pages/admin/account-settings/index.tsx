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
import { ChangeEvent, useEffect, useState } from "react";
import * as yup from "yup";

const AccountSettings = () => {
  const [_image, setImage] = useState(undefined);
  const [imageSrc, setImageSrc] = useState("");
  const [buttonDisable, setButtonDisable] = useState(true);
  const [imageButtonLoading, _setImageButtonLoading] = useState(false);
  const [editButtonLoading, setEditButtonLoading] = useState(false);
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

        // fetch(new URL(`/api/Image/${userDto.email}`, apiEndpoint).href)
        //   .then(async response => {
        //     let data: string = await response.json();
        //     if (response.ok && !data.endsWith('/')) {
        //       setImageSrc(data);
        //     }
        //   }, (err) => {
        //     console.error(err);
        //   });
      } else {
        router.replace("/403");
      }
    }
    setButtonDisable(false);
  }, []);

  const handleFormSubmit = async (values) => {
    setButtonDisable(true);
    setEditButtonLoading(true);

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
      alert('Ch???nh s???a th??ng tin th??nh c??ng!');
    } else if (response.status == 400) {
      // console.log(data);
      const errors = data.errors;
      if (errors.fullName) alert(`H??? t??n: ${Array(...errors.fullName).pop()}`);
      else if (errors.phoneNumber) alert(`S??? ??i???n tho???i: ${Array(...errors.phoneNumber).pop()}`);

    } else {
      alert(response.status);
    }

    // console.log(values);
    setEditButtonLoading(false);
    setButtonDisable(false);
  };

  const handleLogout = () => {
    localStorage.removeItem('User');
    localStorage.removeItem('CreateInvoice');
    router.push("/");
  }

  const handleShowImage = async (e: ChangeEvent<HTMLInputElement>) => {
    console.log(e.target.files);
    if (e.target.files && e.target.files[0]) {
      let imageFile = e.target.files[0];
      const reader = new FileReader();
      reader.onload = x => {
        setImage(imageFile);
        setImageSrc(`${x.target.result}`); // C:/fakepath/..
      }
      reader.readAsDataURL(imageFile)
    }
  }

  // const handleImageSubmit = async (e: FormEvent<HTMLFormElement>) => {
  //   e.preventDefault();
  //   setButtonDisable(true);
  //   setImageButtonLoading(true);

  //   if (image) {
  //     const formData = new FormData();
  //     formData.append("file", image);
  //     let response = await fetch(new URL(`/api/Image/${admin.email}`, apiEndpoint).href, {
  //       method: 'POST',
  //       // headers: { // If set Content-Type header, upload won't work
  //       //   'Content-Type': 'multipart/form-data'
  //       // },
  //       body: formData,
  //     });
  //     // console.log(response);
  //     let data = await response.json();
  //     // console.log(data);
  //     if (response.ok) {
  //       let path: string = data.path;
  //       setImageSrc(path);
  //     } else if (response.status == 400) {
  //       let message: string = data;
  //       alert(message);
  //     } else {
  //       alert(response.status);
  //     }
  //   } else {
  //     alert("Kh??ng c?? h??nh ???nh n??o ???????c t???i l??n.");
  //   }

  //   // console.log(e);
  //   setImageButtonLoading(false);
  //   setButtonDisable(false);
  // }

  return (
    <div>
      <DashboardPageHeader title="Th??ng tin t??i kho???n" iconName="settings_filled"
        button={
          <Button color="primary" bg="primary.light" px="2rem" onClick={handleLogout}>
            ????ng xu???t &nbsp;<Icon size="20px">logout</Icon>
          </Button>
        }
      />

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
          {/* <form onSubmit={(e) => handleImageSubmit(e)}> */}
          <Box
            display="flex"
            alignItems="flex-end"
            position="absolute"
            bottom="20px"
            left="24px"
          >
            <Avatar
              src={imageSrc}
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
                  {imageButtonLoading ? <Spinner /> : <Icon>camera</Icon>}
                </Button>
              </label>
            </Box>
            <Hidden>
              <input
                className="hidden"
                onChange={(e) => handleShowImage(e)}
                id="profile-image"
                name="profile-image"
                accept="image/png, image/jpg, image/jpeg, image/gif"
                type="file"
                disabled={buttonDisable}
              />
            </Hidden>
            {/* <Button type="submit" variant="contained" bg="secondary.light" ml="2rem" disabled={buttonDisable}>
                L??u h??nh ???nh
              </Button> */}
          </Box>
          {/* </form> */}


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
                      label="H???"
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
                        label="H??? t??n"
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
                        label="S??? ??i???n tho???i"
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
                        label="Ng??y sinh"
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
                  L??u &nbsp;{editButtonLoading && <Spinner />}
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
  fullName: yup.string().required("vui l??ng nh???p t??n"),
  // email: yup.string().email("Email kh??ng h???p l???").required("Vui l??ng nh???p Email"),
  phoneNumber: yup.string().required("Vui l??ng nh???p s??? ??i???n tho???i"),
  dateOfBirth: yup.date().required("Vui l??ng nh???p ng??y sinh"),
});

AccountSettings.layout = AdminDashboardLayout;

export default AccountSettings;
