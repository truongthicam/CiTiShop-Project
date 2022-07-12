export type UserDto = {
  id: string;
  fullName: string;
  email: string;
  emailConfirmed: boolean;
  phoneNumber: string;
  dateOfBirth: string;
  isAdmin: boolean;
};

export type ProductDto = {
  id: string;
  name: string;
  price: number;
  discountPrice: number;
  quantity: number;
  description: string;
  imageUrl: string;
  categoryId: string;
}

export type AddressDto = {
  id: string;
  userId: string;
  receiverName: string;
  deliveryAddress: string;
  phoneNumber: string;
}

export type PagedModel = {
  currentPage: number;
  totalItems: number;
  totalPages: number;
  items: [];
}

export type CreateInvoiceDto = {
  // 1. /cart
  cartItems: any[];
  deliveryDescription: string;
  // 2. /checkout
  receiverName: string;
  email: string;
  phoneNumber: string;
  deliveryAddress: string;
  // 3. /payment
  paymentType: number; // 0: Nhận ; 1: Momo
  // CheckoutSummary
  totalCost: number;
  totalFee: number;
  discount: number;
  returnUrl: string;
}

export type InvoiceDto = {
  id: string;
  userId: string;
  dateOrdered: string;
  paymentStatus: string;
  totalPayment: number; // TotalCost + TotalFee - Discount
}

export type InvoiceDetailDto = {
  id: string;
  userId: string;
  dateOrdered: string;
  dateDelivered?: string;
  paymentType: string;
  paymentStatus: string;
  deliveryStatus: string;
  deliveryAddress: string;
  totalCost: number;
  totalFee: number;
  discount: number;
  totalPayment: number; // TotalCost + TotalFee - Discount
  invoiceProducts: any[];
}

export type InvoiceFullDetailDto = {
  id: string;
  userId: string;
  dateOrdered: string;
  dateDelivered?: string;
  paymentType: string;
  paymentStatus: string;
  deliveryStatus: string;
  deliveryAddress: string;
  deliveryDescription: string;
  totalCost: number;
  totalFee: number;
  discount: number;
  totalPayment: number; // TotalCost + TotalFee - Discount
  receiverName: string;
  email: string;
  phoneNumber;
  invoiceProducts: any[];
}

export type InvoiceProductDto = {
  invoiceId: string;
  productId: string;
  name: string;
  imageUrl: string;
  costPerItem: number;
  amount: number;
  cost: number; // CostPerItem * Amount
}

export type MomoPaymentResponseDto = {
  requestId: string;
  errorCode: number;
  orderId: string;
  message: string;
  localMessage: string;
  requestType: string;
  payUrl: string;
  signature: string;
}