import AddressEditor from "@component/address/AddressEditor";
import DashboardLayout from "@component/layout/CustomerDashboardLayout";
import Spinner from "@component/Spinner";
import { UserDto } from "@utils/apiTypes";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";

const AddressUpdater = () => {
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
  }, [])

  return !user ? <Spinner /> : <AddressEditor user={user} />;
};

AddressUpdater.layout = DashboardLayout;

export default AddressUpdater;
