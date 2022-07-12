import CustomerDashboardLayout from "@component/layout/CustomerDashboardLayout";
import CustomerOrderList from "@component/orders/CustomerOrderList";
import Spinner from "@component/Spinner";
import { UserDto } from "@utils/apiTypes";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";

const Orders = () => {
  const [user, setUser] = useState<UserDto>(undefined);
  const router = useRouter();

  useEffect(() => {
    // Perform localStorage action
    const userJson = localStorage.getItem('User');
    if (!userJson) {
      router.replace("/403");
    } else {
      setUser(JSON.parse(userJson));
    }
  }, []);

  return !user ? <Spinner /> : <CustomerOrderList user={user} />;
};

Orders.layout = CustomerDashboardLayout;

export default Orders;
