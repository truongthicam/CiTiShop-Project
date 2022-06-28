import AdminDashboardLayout from "@component/layout/AdminDashboardLayout";
import DashboardPageHeader from "@component/layout/DashboardPageHeader";
import AdminOrderList from "@component/orders/AdminOrderList";

const Orders = () => {
  return (
    <div>
      <DashboardPageHeader title="Đơn hàng" iconName="bag_filled" />
      <AdminOrderList />
    </div>
  );
};

Orders.layout = AdminDashboardLayout;

export default Orders;
