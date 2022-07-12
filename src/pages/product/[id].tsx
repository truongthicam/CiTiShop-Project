import Box from "@component/Box";
import FlexBox from "@component/FlexBox";
import NavbarLayout from "@component/layout/NavbarLayout";
import ProductDescription from "@component/products/ProductDescription";
import ProductIntro from "@component/products/ProductIntro";
import ProductReview from "@component/products/ProductReview";
import RelatedProducts from "@component/products/RelatedProducts";
import Spinner from "@component/Spinner";
import { H5 } from "@component/Typography";
import { ProductDto } from "@utils/apiTypes";
import { apiEndpoint } from "@utils/constants";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
// database citishop
const ProductDetails = () => {
  const [loading, setLoading] = useState(true);
  const [product, setProduct] = useState<ProductDto>(undefined);
  const router = useRouter();
  const { id } = router.query;

  useEffect(() => {
    if (id) {
      // console.log(id);
      fetch(new URL(`/api/Product/${id}`, apiEndpoint))
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

  // const state = {
  //   title: "Toner klair",
  //   price: 135000,
  // };

  const [selectedOption, setSelectedOption] = useState("description");

  const handleOptionClick = (opt) => () => {
    setSelectedOption(opt);
  };

  return (
    loading ? <Spinner /> :
      <div>
        
        <ProductIntro id={product?.id}
          title={product?.name}
          price={product?.discountPrice ?? product?.price}
          imgUrl={[product?.imageUrl]}
          quantity={product?.quantity} />

        <FlexBox
          borderBottom="1px solid"
          borderColor="gray.400"
          mt="80px"
          mb="26px"
        >
          <H5
            className="cursor-pointer"
            mr="25px"
            p="4px 10px"
            color={
              selectedOption === "description" ? "primary.main" : "text.muted"
            }
            borderBottom={selectedOption === "description" && "2px solid"}
            borderColor="primary.main"
            onClick={handleOptionClick("description")}
          >
            Mô tả
          </H5>
          <H5
            className="cursor-pointer"
            p="4px 10px"
            color={selectedOption === "review" ? "primary.main" : "text.muted"}
            onClick={handleOptionClick("review")}
            borderBottom={selectedOption === "review" && "2px solid"}
            borderColor="primary.main"
          >
            Đánh giá
          </H5>
        </FlexBox>

        <Box mb="50px">
          {selectedOption === "description" && <ProductDescription description={product?.description} />}
          {selectedOption === "review" && <ProductReview />}
        </Box>


        <RelatedProducts />
      </div>
  );
};

ProductDetails.layout = NavbarLayout;

export default ProductDetails;
