import Button from "@component/buttons/Button";
import Card from "@component/Card";
import Grid from "@component/grid/Grid";
import AdminDashboardLayout from "@component/layout/AdminDashboardLayout";
import DashboardPageHeader from "@component/layout/DashboardPageHeader";
import Select from "@component/Select";
import Spinner from "@component/Spinner";
import TextField from "@component/text-field/TextField";
import TextArea from "@component/textarea/TextArea";
import { ProductDto, UserDto } from "@utils/apiTypes";
import { apiEndpoint } from "@utils/constants";
import { Formik } from "formik";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import * as yup from "yup";

const OrderDetails = () => {
  const [buttonDisable, setButtonDisable] = useState(false);
  const [loading, setLoading] = useState(true);
  const [product, setProduct] = useState<ProductDto>(undefined);
  const router = useRouter();
  const { id } = router.query;

  useEffect(() => {
    setLoading(true);
    // Perform localStorage action
    const userJson = localStorage.getItem('User');
    if (!userJson) {
      router.replace("/403");
    } else {
      let userDto: UserDto = JSON.parse(userJson);
      if (!userDto.isAdmin) {
        router.replace("/403");
      }
    }

    if (id) {
      // console.log(id);
      fetch(new URL(`/api/Product/${id}`, apiEndpoint).href)
        .then(async response => {
          // console.log(response);
          let productJson: ProductDto = await response.json();
          if (response.ok) {
            setProduct(productJson);
            setLoading(false);
          } else {
            router.replace("/404");
          }
        }, (err) => {
          console.error(err);
        })
    }
  }, [id]);

  const handleFormSubmit = async (values) => {
    setButtonDisable(true);
    let response = await fetch(new URL(`/api/Product/${product.id}`, apiEndpoint).href, {
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
      alert('Ch???nh s???a th??ng tin th??nh c??ng!');
      router.push('/admin/products');
    } else if (response.status == 400) {
      // console.log(data);
      const errors = data.errors;
      if (errors.name) alert(`T??n s???n ph???m: ${Array(...errors.quantity).pop()}`);
      else if (errors.categoryId) alert(`Danh m???c ID: ${Array(...errors.categoryId).pop()}`);
      else if (errors.quantity) alert(`T???n kho: ${Array(...errors.quantity).pop()}`);
      else if (errors.price) alert(`Gi??: ${Array(...errors.price).pop()}`);
      else if (errors.imageUrl) alert(`URL h??nh ???nh: ${Array(...errors.imageUrl).pop()}`);
      else if (errors.description) alert(`M?? t???: ${Array(...errors.imageUrl).pop()}`);

    } else {
      alert(response.status);
    }

    // console.log(values);
    setButtonDisable(false);
  };

  return (
    loading ? <Spinner /> :
      <div>
        <DashboardPageHeader
          title="Ch???nh s???a s???n ph???m"
          iconName="delivery-box"
          button={
            <Link href="/admin/products">
              <Button color="primary" bg="primary.light" px="2rem">
                Danh s??ch s???n ph???m
              </Button>
            </Link>
          }
        />

        <Card p="30px">
          <Formik
            initialValues={{
              name: product?.name ?? "",
              price: product?.price ?? "",
              quantity: product?.quantity ?? "",
              description: product?.description ?? "",
              imageUrl: product?.imageUrl ?? "",
              categoryId: product?.categoryId ?? "",
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
              setFieldValue,
            }) => (
              <form onSubmit={handleSubmit}>
                <Grid container spacing={6}>
                  {/* <Grid item sm={6} xs={12}>
                    <TextField
                      name="ID"
                      label="ID"
                      placeholder="M?? s???n ph???m"
                      fullwidth
                      onBlur={handleBlur}
                      onChange={handleChange}
                      value={values.ID || ""}
                      errorText={touched.ID && errors.ID}
                    />
                  </Grid> */}
                  <Grid item sm={6} xs={12}>
                    <TextField
                      name="name"
                      label="T??n s???n ph???m"
                      placeholder="T??n s???n ph???m"
                      fullwidth
                      onBlur={handleBlur}
                      onChange={handleChange}
                      value={values.name || ""}
                      errorText={touched.name && errors.name}
                    />
                  </Grid>
                  <Grid item sm={6} xs={12}>
                    <Select
                      name="categoryId"
                      label="Danh m???c"
                      defaultValue={categories.find(x => x.value === product.categoryId)}
                      placeholder="Ch???n danh m???c"
                      options={categories}
                      onBlur={handleBlur}
                      onChange={(e: any) => setFieldValue('categoryId', e.value)}
                      errorText={touched.categoryId && errors.categoryId}
                    />
                  </Grid>
                  <Grid item sm={6} xs={12}>
                    <TextField
                      name="quantity"
                      label="T???n kho"
                      placeholder="T???n kho"
                      type="number"
                      fullwidth
                      onBlur={handleBlur}
                      onChange={handleChange}
                      value={values.quantity || ""}
                      errorText={touched.quantity && errors.quantity}
                    />
                  </Grid>

                  <Grid item sm={6} xs={12}>
                    <TextField
                      name="price"
                      label="Gi??"
                      placeholder="Gi??"
                      type="number"
                      fullwidth
                      onBlur={handleBlur}
                      onChange={handleChange}
                      value={values.price || ""}
                      errorText={touched.price && errors.price}
                    />
                  </Grid>
                  {/* <Grid item sm={6} xs={12}>
                    <TextField
                      name="sale"
                      label="Gi???m gi?? (%)"
                      placeholder="Gi???m gi??"
                      type="number"
                      fullwidth
                      onBlur={handleBlur}
                      onChange={handleChange}
                      value={values.sale || ""}
                      errorText={touched.sale && errors.sale}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <DropZone
                      onChange={(files) => {
                        console.log(files);
                      }}
                    />
                  </Grid> */}
                  <Grid item xs={12}>
                    <TextField
                      name="imageUrl"
                      label="URL h??nh ???nh s???n ph???m"
                      placeholder="URL h??nh ???nh s???n ph???m"
                      fullwidth
                      onBlur={handleBlur}
                      onChange={handleChange}
                      value={values.imageUrl || ""}
                      errorText={touched.imageUrl && errors.imageUrl}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextArea
                      name="description"
                      label="M?? t???"
                      placeholder="M?? t???"
                      rows={6}
                      fullwidth
                      onBlur={handleBlur}
                      onChange={handleChange}
                      value={values.description || ""}
                      errorText={touched.description && errors.description}
                    />
                  </Grid>

                </Grid>
                <Button
                  mt="25px"
                  variant="contained"
                  color="primary"
                  type="submit"
                  disabled={buttonDisable}
                >
                  L??u &nbsp;{buttonDisable && <Spinner />}
                </Button>
              </form>
            )}
          </Formik>
        </Card>
      </div>
  );
};

const categories = [
  { label: "Trang ??i???m", value: "ba4f7300-66af-45a6-b0d4-ee3cf5a7eae8" },
  { label: "Ch??m s??c da", value: "512df5ef-f164-47ab-a52a-f0a3650634df" },
  { label: "Ch??m s??c c?? th???", value: "a299c3cb-d65a-4405-a53b-74f29d688dfa" },
  { label: "Ch??m s??c t??c", value: "0bf8df34-1177-4935-85f4-ccfa035973b9" },
  { label: "N?????c hoa", value: "cf07b43d-1527-49bd-a3b8-8a210ceb50fb" },
  { label: "Th???c ph???m ch???c n??ng", value: "559517fa-27a0-46f4-9d01-3baa47c3db20" },
  { label: "Ph??? ki???n", value: "e4cdba4a-a804-4026-a64c-d57570437187" },
  { label: "D??nh cho nam", value: "6ce4f5b2-244c-4c4e-9da9-63ac829c4d66" },
  { label: "D??nh cho em b??", value: "e8449ff4-cfbf-4447-8054-e29545000372" },
  { label: "V??? sinh c?? nh??n", value: "acc874a2-7492-4bab-88ac-f017ade9158e" },
];
// const initialValues = {
//   name: "",
//   price: "",
//   // discountPrice: "",
//   quantity: "",
//   description: "",
//   imageUrl: "",
//   categoryId: "",
// };

const checkoutSchema = yup.object().shape({
  name: yup.string().required("Vui l??ng nh???p t??n s???n ph???m"),
  price: yup.number().required("Vui l??ng nh???p gi??"),
  quantity: yup.number().required("Vui l??ng nh???p s??? l?????ng"),
  description: yup.string().required("Vui l??ng nh???p m?? t???"),
  imageUrl: yup.string().required("Vui l??ng nh???p URL h??nh ???nh s???n ph???m"),
  categoryId: yup.string().required("Vui l??ng nh???p danh m???c"),
  // sale: yup.number().required("Vui l??ng nh???p % gi???m gi??"),
  // ID: yup.object().required("Vui l??ng nh???p ID cho s???n ph???m"),
});

OrderDetails.layout = AdminDashboardLayout;

export default OrderDetails;
