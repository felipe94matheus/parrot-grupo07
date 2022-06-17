import { createSlice } from "@reduxjs/toolkit"
import { Permission, UserState } from "../../components/types"

const initialState: UserState = {
    isLogged: false,
    accessToken: "",
    permission: Permission.Nothing,
    id: undefined
}

const usersSlice = createSlice({
    name: "@user",
    initialState,
    reducers: {
        //SignIn
        signIn(state, action) {
            Object.assign(state, {
                isLogged: true,
                accessToken: action.payload.accessToken,
                permission: Permission[action.payload.permission],
                id: action.payload.user.id,
                nome: action.payload.user.nome,
                email: action.payload.user.email,
                ap: action.payload.user.ap
            })
        },
        //SignOut
        signOut(state) {
            Object.assign(state, initialState)
        }
    }
})

export const { signIn, signOut } = usersSlice.actions

export default usersSlice.reducer;