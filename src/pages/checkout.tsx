import CheckoutForm from "@component/checkout/CheckoutForm";
import Spinner from "@component/Spinner";
import { UserDto } from "@utils/apiTypes";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import CheckoutSummary from "../components/checkout/CheckoutSummary";
import Grid from "../components/grid/Grid";
import CheckoutNavLayout from "../components/layout/CheckoutNavLayout";

const Checkout = () => {
  const [user, setUser] = useState<UserDto>(undefined);
  const router = useRouter();

  useEffect(() => {
    // Perform localStorage action
    const userJson = localStorage.getItem('User');
    if (!userJson) {
      router.replace("/login");
    } else {
      setUser(JSON.parse(userJson));
    }
  }, [])

  return (
    !user ? <Spinner /> :
      <Grid container flexWrap="wrap-reverse" spacing={6}>
        <Grid item lg={8} md={8} xs={12}>
          <CheckoutForm user={user} />
        </Grid>
        <Grid item lg={4} md={4} xs={12}>
          <CheckoutSummary />
        </Grid>
      </Grid>
  );
};

Checkout.layout = CheckoutNavLayout;

export default Checkout;
