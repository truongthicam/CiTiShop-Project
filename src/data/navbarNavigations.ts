const navbarNavigations = [
  {
    title: "Sản phẩm",
    url: "/sale-page",
    
  },
  {
    title: "Tài khoản",
    child: [
      {
        title: "Đơn hàng",
        child: [
          {
            title: "Danh sách đơn hàng",
            url: "/orders",
          },
          {
            title: "Chi tiết đơn hàng",
            url: "/orders/5452423",
          },
        ],
      },
      {
        title: "Tài khoản của tôi",
        child: [
          {
            title: "Xem",
            url: "/profile",
          },
          {
            title: "Chỉnh sửa",
            url: "/profile/edit",
          },
        ],
      },
      {
        title: "Sổ địa chỉ",
        child: [
          {
            title: "Xem",
            url: "/address",
          },
          {
            title: "Thêm địa chỉ mới",
            url: "/address/512474",
          },
        ],
      },
     
      {
        title: "Yêu thích",
        url: "/wish-list",
      },
    ],
  },
  {
    title: "Quản lý",
    child: [
      {
        title: "Tổng quan",
        url: "/admin/dashboard",
      },
      {
        title: "Sản phẩm",
        url: "/admin/products",
      },
      {
        title: "Đơn hàng",
        url: "/admin/orders",
        
      },
      {
        title: "Khách hàng",
        url: "/admin/users",
        
      },
      {
        title: "Tài khoản quản lý",
        url: "/admin/account-settings",
      },
    ],
  },
  
];

export default navbarNavigations;
