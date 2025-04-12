import { createSlice } from '@reduxjs/toolkit'

type UserState = {
    name: string;
    age: number;
    email: string;
}
type UserProfile = {
    value: UserState
}

type UserAction = {
    payload: UserState;
    type: string
}

const initialState = {
    name: "",
    age: 0,
    email: ""
}
export const userSlice = createSlice({
    name: "user",
    initialState: {
        value: initialState
    },
    reducers: {
        setUser: (state: UserProfile, action: UserAction) => {
            state.value = action.payload;
        },
        clearUser: (state) => {
            state.value = initialState;
        },
    },
})

export const { setUser, clearUser } = userSlice.actions;



export default userSlice.reducer