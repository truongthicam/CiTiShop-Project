import AdminDashboardLayout from "@component/layout/AdminDashboardLayout";
import DashboardPageHeader from "@component/layout/DashboardPageHeader";
import AdminUserList from "@component/user/AdminUserList";

const Users = () => {
  return (
    <div>
      <DashboardPageHeader title="Khách hàng" iconName="bag_filled" />
      <AdminUserList />
    </div>
  );
};

Users.layout = AdminDashboardLayout;

export default Users;
