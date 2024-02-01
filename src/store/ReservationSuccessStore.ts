import { create } from "zustand";

type CustomerInfo = {
  customerName: string;
  cellPhoneNumber: string;
  email: string;
}

type BookingInfo = {
  imgUrl: string;
  roomName: string;
  bookingDays: number;
  guestCount: number;
  arrivalDate: Date;
  departureDate: Date;
  totalPrice: number;
};

type RoomInfo = {
  facility: string[];
  amenity: string[];
}

interface ReservationSuccessStoreState {
  orderId: string;
  customerInfo: CustomerInfo;
  bookingInfo: BookingInfo;
  roomInfo: RoomInfo;
}

interface ReservationSuccessStoreActions {
  setReservationSuccessData: (data: ReservationSuccessStoreState) => void;
  getReservationSuccessData: () => ReservationSuccessStoreState;
}

const useReservationSuccessStore = create<
  ReservationSuccessStoreState & ReservationSuccessStoreActions
>((set, get) => ({
  orderId: '', //訂單編號
  customerInfo: {
    customerName: '',
    cellPhoneNumber: '',
    email: '',
  },
  bookingInfo: {
    imgUrl: '',
    roomName: '',
    bookingDays: 0,
    guestCount: 0,
    arrivalDate: new Date(),
    departureDate: new Date(),
    totalPrice: 0,
  },
  roomInfo: {
    facility: [''],
    amenity: ['']
  },
  setReservationSuccessData: (data: ReservationSuccessStoreState) =>
    set((state) => ({ ...state, ...data })),
  getReservationSuccessData() {
    return get();
  },
}));

export default useReservationSuccessStore;
