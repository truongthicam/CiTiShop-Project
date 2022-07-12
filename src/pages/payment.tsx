import { useRouter } from "next/router";
import { useEffect } from "react";
import Grid from "../components/grid/Grid";
import CheckoutNavLayout from "../components/layout/CheckoutNavLayout";
import PaymentForm from "../components/payment/PaymentForm";
import PaymentSummary from "../components/payment/PaymentSummary";

const Checkout = () => {
  // const [user, setUser] = useState<UserDto>(undefined);
  const router = useRouter();

  useEffect(() => {
    // Perform localStorage action
    const userJson = localStorage.getItem('User');
    if (!userJson) {
      router.replace("/login");
    }
    // else {
    //   setUser(JSON.parse(userJson));
    // }
  }, [])

  return (
    <Grid container flexWrap="wrap-reverse" spacing={6}>
      <Grid item lg={8} md={8} xs={12}>
        <PaymentForm />
      </Grid>
      <Grid item lg={4} md={4} xs={12}>
        <PaymentSummary />
      </Grid>
    </Grid>
  );
};

Checkout.layout = CheckoutNavLayout;

export default Checkout;
