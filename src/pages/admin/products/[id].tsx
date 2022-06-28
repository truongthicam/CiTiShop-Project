import Button from "@component/buttons/Button";
import Card from "@component/Card";
import DropZone from "@component/DropZone";
import Grid from "@component/grid/Grid";
import AdminDashboardLayout from "@component/layout/AdminDashboardLayout";
import DashboardPageHeader from "@component/layout/DashboardPageHeader";
import Select from "@component/Select";
import TextField from "@component/text-field/TextField";
import TextArea from "@component/textarea/TextArea";
import { Formik } from "formik";
import Link from "next/link";
import { useRouter } from "next/router";
import * as yup from "yup";

const OrderDetails = () => {
  const router = useRouter();
  const { id } = router.query;

  const handleFormSubmit = async (values) => {
    console.log(values);
  };

  console.log(id);

  return (
    <div>
      <DashboardPageHeader
        title="Chỉnh sửa sản phẩm"
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
              <Grid item sm={6} xs={12}>
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
                </Grid>
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
                    name="category"
                    label="Danh mục"
                    defaultValue={categories[0]}
                    placeholder="Chọn danh mục"
                    options={categories}
                    
                  />
                </Grid>
                <Grid item sm={6} xs={12}>
                  <TextField
                    name="stock"
                    label="Tồn kho"
                    placeholder="Tồn kho"
                    type="number"
                    fullwidth
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.stock || ""}
                    errorText={touched.stock && errors.stock}
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
                <Grid item sm={6} xs={12}>
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
                </Grid>
                <Grid item xs={12}>
                  <DropZone
                    onChange={(files) => {
                      console.log(files);
                    }}
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
              >
                Lưu
              </Button>
            </form>
          )}
        </Formik>
      </Card>
    </div>
  );
};

const categories = [
  { label: "Kem chống nắng", value: "Kem chống nắng" },
  { label: "Sữa rửa mặt", value: "Sữa rửa mặt" },
  { label: "Phấn mắt", value: "Phấn mắt" },
  { label: "Tẩy trang", value: "Tẩy trang" },
  { label: "Mặt nạ", value: "Mặt nạ" },
  { label: "Toner", value: "Toner" },
  { label: "Kem dưỡng", value: "Kem dưỡng" },
  
];
const initialValues = {
  name: "",
  stock: "",
  price: "",
  sale: "",
  description: "",
  ID: "",
  category: "",
};

const checkoutSchema = yup.object().shape({
  name: yup.string().required("Vui lòng nhập tên sản phẩm"),
  category: yup.string().required("Vui lòng chọn danh mục"),
  description: yup.string().required("Vui lòng nhập mô tả"),
  stock: yup.number().required("Vui lòng nhập số lượng"),
  price: yup.number().required("Vui lòng nhập giá"),
  sale: yup.number().required("Vui lòng nhập % giảm giá"),
  ID: yup.object().required("Vui lòng nhập ID cho sản phẩm"),
});

OrderDetails.layout = AdminDashboardLayout;

export default OrderDetails;
