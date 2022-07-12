import AdminDashboardLayout from "@component/layout/AdminDashboardLayout";
import DashboardPageHeader from "@component/layout/DashboardPageHeader";
import AdminUserList from "@component/user/AdminUserList";
import { UserDto } from "@utils/apiTypes";
import { useRouter } from "next/router";
import { useEffect } from "react";

const Users = () => {
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
      <DashboardPageHeader title="Khách hàng" iconName="bag_filled" />
      <AdminUserList />
    </div>
  );
};

Users.layout = AdminDashboardLayout;

export default Users;
