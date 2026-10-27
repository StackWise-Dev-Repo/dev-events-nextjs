import { create } from "zustand"

type UserSession = {
    session: boolean,
    name: string,
    email: string,
}

type UserStore = {
    userSession: UserSession,
    setUserSession: (data: UserSession) => void
    clearUserSession: () => void,
    isLoading: boolean,
    setIsLoading: (loading: boolean) => void,
}

export const useUserStore = create<UserStore>((set) => ({
    userSession: {
        session: false,
        name: "",
        email: ""
    },
    isLoading: true,
    setUserSession: (data) => set({userSession: data, isLoading: false}),
    clearUserSession: () => set({
        userSession: {session: false, name: "", email: ""},
        isLoading: false
    }),
    setIsLoading: (loading) => set({isLoading: loading})
}));

