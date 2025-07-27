export interface Payment {
    paymentIntentId: string;
    clientSecret: string;
}
export interface CreatePaymentRequest {
    bookingId: string;
    totalPrice: number;
}
