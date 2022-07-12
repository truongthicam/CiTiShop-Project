import Button from "@component/buttons/Button";
import Card from "@component/Card";
// import DropZone from "@component/DropZone";
import Grid from "@component/grid/Grid";
import AdminDashboardLayout from "@component/layout/AdminDashboardLayout";
import DashboardPageHeader from "@component/layout/DashboardPageHeader";
import Select from "@component/Select";
import Spinner from "@component/Spinner";
import TextField from "@component/text-field/TextField";
import TextArea from "@component/textarea/TextArea";
import { UserDto } from "@utils/apiTypes";
import { apiEndpoint } from "@utils/constants";
import { Formik } from "formik";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import * as yup from "yup";

const AddProduct = () => {
  const [buttonDisable, setButtonDisable] = useState(false);
  const router = useRouter();

  useEffect(() => {
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
  }, []);

  const handleFormSubmit = async (values) => {
    setButtonDisable(true);
    let response = await fetch(new URL(`/api/Product/`, apiEndpoint).href, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(values),
    });
    // console.log(response);
    let data = await response.json();
    // console.log(data);
    if (response.ok) {
      alert('Thêm thông tin thành công!');
      router.push('/admin/products');
    } else if (response.status == 400) {
      // console.log(data);
      const errors = data.errors;
      if (errors.name) alert(`Tên sản phẩm: ${Array(...errors.quantity).pop()}`);
      else if (errors.categoryId) alert(`Danh mục ID: ${Array(...errors.categoryId).pop()}`);
      else if (errors.quantity) alert(`Tồn kho: ${Array(...errors.quantity).pop()}`);
      else if (errors.price) alert(`Giá: ${Array(...errors.price).pop()}`);
      else if (errors.imageUrl) alert(`URL hình ảnh: ${Array(...errors.imageUrl).pop()}`);
      else if (errors.description) alert(`Mô tả: ${Array(...errors.imageUrl).pop()}`);

    } else {
      alert(response.status);
    }

    // console.log(values);
    setButtonDisable(false);
  };

  return (
    <div>
      <DashboardPageHeader
        title="Thêm sản phẩm"
        iconName="delivery-box"
        button={
          <Link href="/admin/products">
            <Button color="primary" bg="primary.light" px="2rem">
              Danh sách sản phẩm
            </Button>
          </Link>
        }
      />

      <Card p="30px">
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
            setFieldValue,
          }) => (
            <form onSubmit={handleSubmit}>
              <Grid container spacing={6}>
                {/* <Grid item sm={6} xs={12}>
                  <TextField
                    name="ID"
                    label="ID"
                    placeholder="Mã sản phẩm"
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
                    label="Tên sản phẩm"
                    placeholder="Tên sản phẩm"
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
                    label="Danh mục"
                    defaultValue={categories[0]}
                    placeholder="Chọn danh mục"
                    options={categories}
                    onBlur={handleBlur}
                    onChange={(e: any) => setFieldValue('categoryId', e.value)}
                    errorText={touched.categoryId && errors.categoryId}
                  />
                </Grid>
                <Grid item sm={6} xs={12}>
                  <TextField
                    name="quantity"
                    label="Tồn kho"
                    placeholder="Tồn kho"
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
                    label="Giá"
                    placeholder="Giá"
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
                    label="Giảm giá (%)"
                    placeholder="Giảm giá"
                    type="number"
                    fullwidth
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.sale || ""}
                    errorText={touched.sale && errors.sale}
                  />
                </Grid> */}
                {/* <Grid item xs={12}>
                  <DropZone
                    onChange={(files) => {
                      console.log(files);
                    }}
                  />
                </Grid> */}
                <Grid item xs={12}>
                  <TextField
                    name="imageUrl"
                    label="URL hình ảnh sản phẩm"
                    placeholder="URL hình ảnh sản phẩm"
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
                    label="Mô tả"
                    placeholder="Mô tả"
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
                Lưu &nbsp;{buttonDisable && <Spinner />}
              </Button>
            </form>
          )}
        </Formik>
      </Card>
    </div>
  );
};
const categories = [
  { label: "Trang điểm", value: "ba4f7300-66af-45a6-b0d4-ee3cf5a7eae8" },
  { label: "Chăm sóc da", value: "512df5ef-f164-47ab-a52a-f0a3650634df" },
  { label: "Chăm sóc cơ thể", value: "a299c3cb-d65a-4405-a53b-74f29d688dfa" },
  { label: "Chăm sóc tóc", value: "0bf8df34-1177-4935-85f4-ccfa035973b9" },
  { label: "Nước hoa", value: "cf07b43d-1527-49bd-a3b8-8a210ceb50fb" },
  { label: "Thực phẩm chức năng", value: "559517fa-27a0-46f4-9d01-3baa47c3db20" },
  { label: "Phụ kiện", value: "e4cdba4a-a804-4026-a64c-d57570437187" },
  { label: "Dành cho nam", value: "6ce4f5b2-244c-4c4e-9da9-63ac829c4d66" },
  { label: "Dành cho em bé", value: "e8449ff4-cfbf-4447-8054-e29545000372" },
  { label: "Vệ sinh cá nhân", value: "acc874a2-7492-4bab-88ac-f017ade9158e" },

];

const initialValues = {
  name: "",
  price: "",
  // discountPrice: "",
  quantity: "",
  description: "",
  imageUrl: "",
  categoryId: "",
};

const checkoutSchema = yup.object().shape({
  name: yup.string().required("Vui lòng nhập tên sản phẩm"),
  price: yup.number().required("Vui lòng nhập giá"),
  quantity: yup.number().required("Vui lòng nhập số lượng"),
  description: yup.string().required("Vui lòng nhập mô tả"),
  imageUrl: yup.string().required("Vui lòng nhập URL hình ảnh sản phẩm"),
  categoryId: yup.string().required("Vui lòng nhập danh mục"),
  // sale: yup.number().required("Vui lòng nhập % giảm giá"),
  // ID: yup.object().required("Vui lòng nhập ID cho sản phẩm"),
});

AddProduct.layout = AdminDashboardLayout;

export default AddProduct;
