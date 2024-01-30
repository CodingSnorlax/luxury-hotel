import { Room } from "./Room";

export interface IOrder {
  _id: string;
  userId: string;
  bookingInfo: [
    {
      roomTypeId: Room;
      quantity: number;
      arrivalDate: Date;
      departureDate: Date;
    }
  ];
  guestCount: number;
  isPay: boolean;
  totalPrice: number;
  status: number;
  notes: string;
  merchantOrderNo: number;
  timeStamp: number;
  createdAt: Date;
  updatedAt: Date;
}
