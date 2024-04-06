import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";
import { IBook } from "../../types";

export interface GlobalState {
    responsiveMenuShow : boolean,
    addEditModalShow : boolean,
    editingBook : IBook | null
    addEditModalType : "add" | "edit"
}

const initialState: GlobalState = {
    responsiveMenuShow : false,
    addEditModalShow : false,
    editingBook : null,
    addEditModalType : "add"
}

export const GlobalSlice = createSlice({
    name: "global",
    initialState: initialState,
    reducers: {
        setResponsiveMenuShow : (state , action : PayloadAction<boolean>) => {
            state.responsiveMenuShow = action.payload;
        },
        showAddModal : (state , action : PayloadAction<undefined>) => {
            state.editingBook = null;
            state.addEditModalType = "add";
            state.addEditModalShow = true;
        },
        showEditModal : (state , action : PayloadAction<IBook>) => {
            state.editingBook = action.payload;
            state.addEditModalType = "edit";
            state.addEditModalShow = true;
        },
        closeAddEditModal : (state, action : PayloadAction<undefined>) => {
            state.addEditModalShow = false
        }
    }
})

export const { setResponsiveMenuShow, showAddModal, showEditModal, closeAddEditModal } = GlobalSlice.actions;
export default GlobalSlice.reducer;

