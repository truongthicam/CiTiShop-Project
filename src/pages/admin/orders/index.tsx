import AdminDashboardLayout from "@component/layout/AdminDashboardLayout";
import DashboardPageHeader from "@component/layout/DashboardPageHeader";
import AdminOrderList from "@component/orders/AdminOrderList";
import { UserDto } from "@utils/apiTypes";
import { useRouter } from "next/router";
import { useEffect } from "react";

const Orders = () => {
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

  return (
    <div>
      <DashboardPageHeader title="Đơn hàng" iconName="bag_filled" />
      <AdminOrderList />
    </div>
  );
};

Orders.layout = AdminDashboardLayout;

export default Orders;
