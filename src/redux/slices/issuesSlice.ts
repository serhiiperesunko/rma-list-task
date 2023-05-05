import {createSlice, PayloadAction} from '@reduxjs/toolkit'
import {TIssue} from "../../types";

interface IIssuesSlice {
    list: TIssue[]
}

const initialState: IIssuesSlice = {
    list: [],
}
export const issuesSlice = createSlice({
    name: 'issues',
    initialState,
    reducers: {
        setList: (state, action: PayloadAction<TIssue[]>) => {
            state.list = action.payload
        },
    },
})

// Action creators are generated for each case reducer function
export const {setList} = issuesSlice.actions

export default issuesSlice.reducer