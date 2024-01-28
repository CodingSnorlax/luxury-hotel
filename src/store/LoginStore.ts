import { create } from "zustand";

type userData = {
    birthday: string;
    createdAt: string;
    email: string;
    name: string;
    phone: string;
    updatedAt: string;
    _id: string;
}

interface LoginStoreState {
    loginStatus: boolean | null,
    token: string;
    user: userData;
}

interface LoginStoreActions {
    setLoginData: (data: LoginStoreState) => void;
    getLoginData: () => LoginStoreState;
}

const useLoginStore = create<LoginStoreState & LoginStoreActions>((set, get) => ({
    loginStatus: null,
    token: '',
    user: {
        birthday: '',
        createdAt: '',
        email: '',
        name: '',
        phone: '',
        updatedAt: '',
        _id: '',
    },
    setLoginData: (data: LoginStoreState) => set((state) => ({ ...state, ...data })),
    getLoginData() {
        return get()
    }
}))

export default useLoginStore;