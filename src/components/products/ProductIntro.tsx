import Image from "@component/Image";
import { useAppContext } from "@context/app/AppContext";
import { CartItem } from "@reducer/cartReducer";
import { useRouter } from "next/router";
import React, { useCallback, useState } from "react";
import Avatar from "../avatar/Avatar";
import Box from "../Box";
import Button from "../buttons/Button";
import FlexBox from "../FlexBox";
import Grid from "../grid/Grid";
import Icon from "../icon/Icon";
import Rating from "../rating/Rating";
import { H1, H2, H3, H6, SemiSpan } from "../Typography";

export interface ProductIntroProps {
  imgUrl?: string[];
  title: string;
  price: number;
  id?: string | number;
  quantity?: number;
}

const ProductIntro: React.FC<ProductIntroProps> = ({
  imgUrl,
  title,
  price = 200000,
  id,
  quantity = 0,
}) => {
  const [selectedImage, setSelectedImage] = useState(0);
  const { state, dispatch } = useAppContext();
  const cartList: CartItem[] = state.cart.cartList;
  const router = useRouter();
  const routerId = router.query.id as string;
  const cartItem = cartList.find(
    (item) => item.id === id || item.id === routerId
  );

  const handleImageClick = (ind) => () => {
    setSelectedImage(ind);
  };

  const handleCartAmountChange = useCallback(
    (amount) => () => {
      dispatch({
        type: "CHANGE_CART_AMOUNT",
        payload: {
          qty: amount,
          name: title,
          price,
          imgUrl: imgUrl[0],
          id: id || routerId,
        },
      });
    },
    []
  );

  return (
    <Box overflow="hidden">
      <Grid container justifyContent="center" spacing={16}>
        <Grid item md={6} xs={12} alignItems="center">
          <Box>
            <FlexBox justifyContent="center" mb="50px">
              <Image
                width={300}
                height={300}
                src={imgUrl[selectedImage]}
                style={{ objectFit: "contain" }}
              />
            </FlexBox>
            <FlexBox overflow="auto">
              {imgUrl.map((url, ind) => (
                <Box
                  size={70}
                  minWidth={70}
                  bg="white"
                  borderRadius="10px"
                  display="flex"
                  justifyContent="center"
                  alignItems="center"
                  cursor="pointer"
                  border="1px solid"
                  key={ind}
                  ml={ind === 0 && "auto"}
                  mr={ind === imgUrl.length - 1 ? "auto" : "10px"}
                  borderColor={
                    selectedImage === ind ? "primary.main" : "gray.400"
                  }
                  onClick={handleImageClick(ind)}
                >
                  <Avatar src={url} borderRadius="10px" size={40} />
                </Box>
              ))}
            </FlexBox>
          </Box>
        </Grid>
{/* Database CitiShop Th????ng hi???u */}
        <Grid item md={6} xs={12} alignItems="center">
          <H1 mb="1rem">{title}</H1>

          {/* <FlexBox alignItems="center" mb="1rem">
            <SemiSpan>Th????ng hi???u:</SemiSpan>
            <H6 ml="8px">T??n th????ng hi???u</H6>
          </FlexBox> */}

          <FlexBox alignItems="center" mb="1rem">
            <SemiSpan>????nh gi??:</SemiSpan>
            <Box ml="8px" mr="8px">
              <Rating color="warn" value={4} outof={5} />
            </Box>
            <H6>(50)</H6>
          </FlexBox>
{/* Database CitiShop */}
          <Box mb="10px">
            <H2 color="primary.main" mb="4px" lineHeight="1">
              {price} VND
            </H2>
            <SemiSpan color="inherit">??ang b??n</SemiSpan>
          </Box>
          <Box mb="20px">
            
            <SemiSpan color="inherit">Kho: {quantity} s???n ph???m</SemiSpan>
          </Box>
          

          {!cartItem?.qty ? (
            <Button
            variant="contained"
            size="small"
            color="primary"
            mb="36px"
            onClick={handleCartAmountChange(1)}
            disabled={quantity <= 0}
          >
            Th??m v??o gi??? h??ng
          </Button>
            
          ) : (
            <FlexBox alignItems="center" mb="36px">
              <Button
                p="9px"
                variant="outlined"
                size="small"
                color="primary"
                onClick={handleCartAmountChange(cartItem?.qty - 1)}
              >
                <Icon variant="small">minus</Icon>
              </Button>
              <H3 fontWeight="600" mx="20px">
                {cartItem?.qty.toString().padStart(2, "0")}
              </H3>
              <Button
                p="9px"
                variant="outlined"
                size="small"
                color="primary"
                onClick={handleCartAmountChange(cartItem?.qty + 1)}
              >
                <Icon variant="small">plus</Icon>
              </Button>
            </FlexBox>
          )}

          {/* <FlexBox alignItems="center" mb="1rem">
            <SemiSpan>Gi?? th??? tr?????ng: 155200 VND</SemiSpan>
          </FlexBox> */}
        </Grid>
      </Grid>
    </Box>
  );
};

ProductIntro.defaultProps = {
  imgUrl: [
    "/assets/images/products/tonerKlairs.jpg",
    "/assets/images/products/tonerKlairs.jpg",
    "/assets/images/products/tonerKlairs.jpg",
  ],
  title: "",
  price: 185000,
};

export default ProductIntro;
