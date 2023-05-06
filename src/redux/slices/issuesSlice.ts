import {createSlice, PayloadAction} from '@reduxjs/toolkit'
import {TIssue, TLoadingStatus,} from "../../types";


export type TIssueData = TIssue & {
    loading: boolean,
    selected: boolean
}

type TIssueList = {
    status: TLoadingStatus
    data: TIssueData[],
    error?: any
}

interface IIssuesSlice {
    list: TIssueList
}

const initialState: IIssuesSlice = {
    list: {
        status: "INITIAL",
        data: []
    },
}
export const issuesSlice = createSlice({
    name: 'issues',
    initialState,
    reducers: {
        setList: (state, action: PayloadAction<TIssueList>) => {
            state.list = action.payload
        },
        updateIssue: (state, action: PayloadAction<TIssueData>) => {
            const index = state.list.data.findIndex(el => el.id === action.payload.id)
            state.list.data[index] = action.payload
        },
        resetSelect: (state) => {
            state.list.data = state.list.data.map(el => ({
                ...el,
                selected: false
            }))
        }
    },
})

// Action creators are generated for each case reducer function
export const {setList, updateIssue, resetSelect} = issuesSlice.actions

export default issuesSlice.reducer