import { create } from "zustand";

interface AppleStoreState {
    price: number;
    amount: number;
    count: number;
  }
  
  interface AppleStoreActions {
    increment: () => void;
    decrement: () => void;
    getTotal: () => number;
  }

const useAppleStore = create<AppleStoreState & AppleStoreActions>((set, get) => ({
  price: 20, // data
  amount: 10,
  count: 0,
  increment: () => {
    set((state) => ({
      ...state,
      count: state.count + 1,
    }));
  }, // action
  decrement: () => {
    set((state) => ({
        ...state,
        count: state.count -1,
    }));
  },
  getTotal()  {
    return get().price * get().amount
  },
}));

export default useAppleStore;
