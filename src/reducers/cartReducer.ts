const CHANGE_CART_AMOUNT = "CHANGE_CART_AMOUNT";
const CLEAR_CART = "CLEAR_CART";

export const cartInitialState = {
  cartList: [
    // {
    //   price: 250000,
    //   name: "Son 3CE",
    //   imgUrl: "/assets/images/products/son3ce.jpg",
    //   id: "7222243834583537",
    //   qty: 1,
    // },
    // {
    //   price: 190000,
    //   name: "Son Loreal",
    //   imgUrl: "/assets/images/products/sonloreal.jpg",
    //   id: "38553442244076086",
    //   qty: 1,
    // },
    // {
    //   price: 290000,
    //   name: "Sữa rửa mặt Cetaphil",
    //   imgUrl:
    //     "/assets/images/products/srmcetaphil.jpg",
    //   id: "9573201630529315",
    //   qty: 1,
    // },
  ],
};

export type CartItem = {
  id: string | number;
  name: string;
  qty: number;
  price: number;
  imgUrl?: string;
};

export type cartStateType = {
  cartList: CartItem[];
};

export type cartActionType = {
  type: typeof CHANGE_CART_AMOUNT | typeof CLEAR_CART;
  payload: CartItem | any;
};

export const cartReducer: React.Reducer<cartStateType, cartActionType> = (
  state: cartStateType,
  action: cartActionType
) => {
  switch (action.type) {
    case CHANGE_CART_AMOUNT:
      let cartList = state.cartList;
      let cartItem = action.payload;
      let exist = cartList.find((item) => item.id === cartItem.id); console.log(cartList);

      if (cartItem.qty < 1)
        return {
          cartList: cartList.filter((item) => item.id !== cartItem.id),
        };
      else if (exist)
        return {
          cartList: cartList.map((item) => {
            if (item.id === cartItem.id) return { ...item, qty: cartItem.qty };
            else return item;
          }),
        };
      else
        return {
          cartList: [...cartList, cartItem],
        };

    case CLEAR_CART:
      return {
        cartList: [],
      };

    default: {
    }
  }
};
