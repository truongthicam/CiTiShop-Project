import Button from "@component/buttons/Button";
import FlexBox from "@component/FlexBox";
import Image from "@component/Image";
import { H1 } from "@component/Typography";
import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";

const Error403= () => {
  const router = useRouter();

  const handleGoBack = async () => {
    router.back();
  };

  return (
    <FlexBox
      flexDirection="column"
      minHeight="100vh"
      justifyContent="center"
      alignItems="center"
      px="1rem"
    >
      <H1>403</H1>
      <Image
        src="/assets/images/illustrations/403.svg"
        maxWidth="150px"
        width="100%"
        mb="2rem"
      />
      <FlexBox flexWrap="wrap">
        <Button
          variant="outlined"
          color="primary"
          m="0.5rem"
          onClick={handleGoBack}
        >
          Quay lại
        </Button>
        <Link href="/">
          <Button variant="contained" color="primary" m="0.5rem">
            Về trang chủ
          </Button>
        </Link>
      </FlexBox>
    </FlexBox>
  );
};

export default Error403;
