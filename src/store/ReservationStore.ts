import { create } from "zustand";

type BookingInfo = {
  roomName: string | null;
  roomTypeId: string | undefined;
  quantity: number;
  arrivalDate: Date;
  departureDate: Date;
};

interface ReservationStoreState {
  userId: null | string;
  bookingInfo: BookingInfo;
  guestCount: number;
  totalPrice: number;
  notes: string;
}

interface ReservationStoreActions {
  setReservationData: (data: ReservationStoreState) => void;
  getReservationData: () => ReservationStoreState;
}

const useReservationStore = create<
  ReservationStoreState & ReservationStoreActions
>((set, get) => ({
  userId: null, // data
  bookingInfo: {
    roomName: '',
    roomTypeId: "",
    quantity: 1,
    arrivalDate: new Date(),
    departureDate: new Date(),
  },
  guestCount: 2,
  totalPrice: 0,
  notes: "",
  setReservationData: (data: ReservationStoreState) =>
    set((state) => ({ ...state, ...data })),
  getReservationData() {
    return get();
  },
}));

export default useReservationStore;
