import {createSlice, PayloadAction} from '@reduxjs/toolkit'
import {TIssue} from "../../components/IssueItem/IssueItem";

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
        updateIssue: (state, action: PayloadAction<TIssue>) => {
            const newList = [...state.list]
            const index = state.list.findIndex((issue) => issue.id === action.payload.id);

            newList[index] = action.payload
            state.list = newList
        }
    },
})

// Action creators are generated for each case reducer function
export const {setList, updateIssue} = issuesSlice.actions

export default issuesSlice.reducer