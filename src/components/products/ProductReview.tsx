import { useFormik } from "formik";
import React from "react";
import * as yup from "yup";
import Box from "../Box";
import Button from "../buttons/Button";
import FlexBox from "../FlexBox";
import Rating from "../rating/Rating";
import TextArea from "../textarea/TextArea";
import { H2, H5 } from "../Typography";
import ProductComment from "./ProductComment";

export interface ProductReviewProps {}

const ProductReview: React.FC<ProductReviewProps> = () => {
  const handleFormSubmit = async (values, { resetForm }) => {
    console.log(values);
    resetForm();
  };

  const {
    values,
    errors,
    touched,
    dirty,
    isValid,
    handleChange,
    handleBlur,
    handleSubmit,
    setFieldValue,
  } = useFormik({
    initialValues: initialValues,
    validationSchema: reviewSchema,
    onSubmit: handleFormSubmit,
  });

  return (
    <Box>
      {commentList.map((item, ind) => (
        <ProductComment {...item} key={ind} />
      ))}

      <H2 fontWeight="600" mt="55px" mb="20">
        Đánh giá
      </H2>

      <form onSubmit={handleSubmit}>
        <Box mb="20px">
          <FlexBox mb="12px">
            <H5 color="gray.700" mr="6px">
              Đánh giá sản phẩm này
            </H5>
            <H5 color="error.main">*</H5>
          </FlexBox>

          <Rating
            outof={5}
            color="warn"
            size="medium"
            readonly={false}
            value={values.rating || 0}
            onChange={(value) => setFieldValue("rating", value)}
          />
        </Box>

        <Box mb="24px">
          <FlexBox mb="12px">
            <H5 color="gray.700" mr="6px">
            Viết nhận xét
            </H5>
            <H5 color="error.main">*</H5>
          </FlexBox>

          <TextArea
            name="comment"
            placeholder="Write a review here..."
            fullwidth
            rows={8}
            onBlur={handleBlur}
            onChange={handleChange}
            value={values.comment || ""}
            errorText={touched.comment && errors.comment}
          />
        </Box>

        <Button
          variant="contained"
          color="primary"
          size="small"
          type="submit"
          disabled={!(dirty && isValid)}
        >
          Gửi
        </Button>
      </form>
    </Box>
  );
};

const commentList = [
  {
    name: "Camcam",
    imgUrl: "/assets/images/faces/7.png",
    rating: 4.7,
    date: "2022-05-14",
    comment:
      "Sản phẩm tốt",
  },
  {
    name: "tâm",
    imgUrl: "/assets/images/faces/6.png",
    rating: 4.7,
    date: "2019-08-10",
    comment: "Sản phẩm ok",
  },
  
];

const initialValues = {
  rating: "",
  comment: "",
  date: new Date().toISOString(),
};

const reviewSchema = yup.object().shape({
  rating: yup.number().required("Vui lòng đánh giá sao"),
  comment: yup.string().required("Vui lòng viết thêm bình luận"),
});

export default ProductReview;
