export type BookingInfoData = {
    roomTypeId: string;
    quantity: number;
    arrivalDate: Date;
    departureDate: Date;
}

export type ReservationPostData = {
    userId: string;
    bookingInfo: BookingInfoData[],
    guestCount: number,
    totalPrice: number,
    notes: string
}