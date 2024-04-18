import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface GlobalState {
    showProducts : boolean
    addProduct : boolean
}

const initialState: GlobalState = {
    showProducts : true,
    addProduct : false
}

export const ProviderSlice = createSlice({
    name: "global",
    initialState: initialState,
    reducers: {
        setShowProducts : (state , action : PayloadAction<boolean>) => {
            state.showProducts = action.payload;
        },
        setAddProducts : (state , action : PayloadAction<boolean>) => {
            state.addProduct = action.payload;
        }
    }
})

export const { setShowProducts, setAddProducts } = ProviderSlice.actions;
export default ProviderSlice.reducer;

