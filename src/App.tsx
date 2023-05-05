import React, {useEffect} from 'react';
import {useAppSelector} from "./redux/hooks";
import {selectIssueList} from "./redux/slices/selectors";
import {useDispatch} from "react-redux";
import {AppDispatch} from "./redux/store";
import {setList, updateIssue} from "./redux/slices/issuesSlice";

function App() {
    const issuesList = useAppSelector(selectIssueList)
    const dispatch: AppDispatch = useDispatch()
    console.log(issuesList)

    useEffect(() => {
        dispatch(setList([
            {
                id: "1000",
                summary: "Create simple todo list",
                status: "TODO"
            },
            {
                id: "1001",
                summary: "Fix the bathroom door lock",
                status: "DONE"
            },
            {
                id: "1002",
                summary: "Pick up laundry",
                status: "IN_PROGRESS"
            },
            {
                id: "1003",
                summary: "Buy flowers for the girlfriend",
                status: "TODO"
            }
        ]))
    }, [])

    const update = () => {
        dispatch(updateIssue({
            id: "1002",
            summary: "I am updated",
            status: "IN_PROGRESS"
        },))
    }
    return <div>
        <button onClick={update}>update</button>
    </div>
}

export default App;
