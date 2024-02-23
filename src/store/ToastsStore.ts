import { create } from "zustand";

interface ToastStoreState {
    show: boolean
    toastMessage: string
}

interface ToastStoreActions {
    setToastData: (data: ToastStoreState) => void;
    getToastData: () => ToastStoreState;
}

const useToastStore = create<ToastStoreState & ToastStoreActions>((set, get) => ({
    show: false,
    toastMessage: '',
    setToastData: (data: ToastStoreState) => set((state) => ({ ...state, ...data })),
    getToastData() {
        return get()
    }
}))

export default useToastStore;