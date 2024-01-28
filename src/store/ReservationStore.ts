import { create } from "zustand";

type BookingInfo = {
  roomTypeId: string|undefined;
  quantity: number;
  arrivalDate: string;
  departureDate: string;
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
    roomTypeId: "",
    quantity: 1,
    arrivalDate: "",
    departureDate: "",
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
