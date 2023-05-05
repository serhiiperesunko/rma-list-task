import React, {useEffect, useMemo} from 'react';
import {useAppSelector} from "./redux/hooks";
import {selectIssueList} from "./redux/slices/selectors";
import {useDispatch} from "react-redux";
import {AppDispatch} from "./redux/store";
import {setList} from "./redux/slices/issuesSlice";
import {IssueList} from "./components";
import styles from './App.module.css'

function App() {
    const issueList = useAppSelector(selectIssueList)
    const dispatch: AppDispatch = useDispatch()

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
    
    const sortedList = useMemo(() => [...issueList].sort((a, b) => {
        if (a.status === "IN_PROGRESS" && b.status !== "IN_PROGRESS") {
            return -1;
        } else if (a.status !== "IN_PROGRESS" && b.status === "IN_PROGRESS") {
            return 1;
        } else if (a.status === "TODO" && b.status !== "TODO") {
            return -1;
        } else if (a.status !== "TODO" && b.status === "TODO") {
            return 1;
        } else {
            return 0;
        }
    }), [issueList])

    return <div className={styles.container}><IssueList issues={sortedList}/></div>
}

export default App;
