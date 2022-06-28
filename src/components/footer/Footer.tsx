import Image from "@component/Image";
import Link from "next/link";
import React from "react";
import styled from "styled-components";
import { getTheme } from "../../utils/utils";
import Box from "../Box";
import Container from "../Container";
import FlexBox from "../FlexBox";
import Grid from "../grid/Grid";
import Icon from "../icon/Icon";
import Typography, { Paragraph } from "../Typography";

const StyledLink = styled.a`
  position: relative;
  display: block;
  padding: 0.3rem 0rem;
  color: ${getTheme("colors.gray.500")};
  cursor: pointer;
  border-radius: 4px;
  :hover {
    color: ${getTheme("colors.gray.100")};
  }
`;

const Footer: React.FC = () => {
  return (
    <footer>
      <Box bg="#753e4e">
        <Container p="1rem" color="white">
          <Box py="5rem" overflow="hidden">
            <Grid container spacing={6}>
              <Grid item lg={4} md={6} sm={6} xs={12}>
                <Link href="/">
                  <a>
                    <Image
                      mb="0.25rem"
                      src="/assets/images/logo.svg"
                      alt="logo"
                    />
                  </a>
                </Link>

                <Paragraph mb="1.25rem" color="gray.500">
                CiTi Shop tự hào là một trong những cửa hàng mỹ phẩm uy tín nhất tại Sài Gòn,
                nơi có thể thỏa mãn niềm đam mê trong cuộc chơi phấn son của hàng triệu tín đồ yêu shopping. 
                Được ưu ái với tên gọi “Thiên Đường Mỹ Phẩm”,CiTi luôn sẵn sàng đáp ứng mọi nhu cầu làm đẹp cho phái đẹp lẫn phái mạnh mà không cần phải lo về giá và chất lượng sản phẩm.
                </Paragraph>

              </Grid>

              <Grid item lg={2} md={6} sm={6} xs={12}>
                <Typography
                  fontSize="25px"
                  fontWeight="600"
                  mb="1.25rem"
                  lineHeight="1"
                >
                  Về chúng tôi
                </Typography>

                <div>
                  {aboutLinks.map((item, ind) => (
                    <Link href="/" key={ind}>
                      <StyledLink>{item}</StyledLink>
                    </Link>
                  ))}
                </div>
              </Grid>

              <Grid item lg={3} md={6} sm={6} xs={12}>
                <Typography
                  fontSize="25px"
                  fontWeight="600"
                  mb="1.25rem"
                  lineHeight="1"
                >
                  Hỗ trợ khách hàng
                </Typography>

                <div>
                  {customerCareLinks.map((item, ind) => (
                    <Link href="/" key={ind}>
                      <StyledLink>{item}</StyledLink>
                    </Link>
                  ))}
                </div>
              </Grid>

              <Grid item lg={3} md={6} sm={6} xs={12}>
                <Typography
                  fontSize="25px"
                  fontWeight="600"
                  mb="1.25rem"
                  lineHeight="1"
                >
                  Liên hệ
                </Typography>
                <Typography py="0.3rem" color="gray.500">
                  01 Võ Văn Ngân, Linh Chiểu, Thủ Đức
                </Typography>
                <Typography py="0.3rem" color="gray.500">
                  Email: citishop@gmail.com
                </Typography>
                <Typography py="0.3rem" mb="1rem" color="gray.500">
                  Phone: 0383060695
                </Typography>

                <FlexBox className="flex" mx="-5px">
                  {iconList.map((item) => (
                    <a
                      href={item.url}
                      target="_blank"
                      rel="noreferrer noopenner"
                      key={item.iconName}
                    >
                      <Box
                        m="5px"
                        size="small"
                        p="10px"
                        bg="rgba(0,0,0,0.2)"
                        borderRadius="50%"
                      >
                        <Icon size="12px" defaultcolor="auto">
                          {item.iconName}
                        </Icon>
                      </Box>
                    </a>
                  ))}
                </FlexBox>
              </Grid>
            </Grid>
          </Box>
        </Container>
      </Box>
    </footer>
  );
};

const aboutLinks = [
  "Giới thiệu",
  "Tuyển dụng",
  "Chính sách bảo mật",
  "Điều khoản sử dụng",
  "Liên hệ",
];

const customerCareLinks = [
  "Trung tâm hỗ trợ",
  "Hướng dẫn mua hàng",
  "Phương thức vận chuyển",
  "Theo dõi đơn hàng",
  "Chính sách đổi trả",
];

const iconList = [
  { iconName: "facebook", url: "https://www.facebook.com/cam6776" },
  { iconName: "google", url: "/" },
  { iconName: "instagram", url: "https://www.instagram.com/camqtopp/" },
];

export default Footer;
