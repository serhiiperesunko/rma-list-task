import React, {useEffect} from 'react';
import {useAppDispatch, useAppSelector} from "./redux/hooks";
import {selectIssueList} from "./redux/slices/selectors";
import styles from './App.module.css'
import {IssueList, Loader} from "./components";
import {setList, TIssueData} from "./redux/slices/issuesSlice";
import {restGetIssues} from "./server";
import * as _ from "lodash"
import {issueStatus} from "./types";

function App() {

    const dispatch = useAppDispatch()
    const {list: {status, data}} = useAppSelector(selectIssueList)

    const sortedIssues = _.orderBy(data, (item) => {
        const index = Object.keys(issueStatus).indexOf(item.status);
        return index === -1 ? Infinity : index;
    })

    useEffect(() => {
        const fetchIssueData = () => {
            dispatch(setList({
                status: "LOADING",
                data: [],
            }))
            restGetIssues().then((data) => {
                dispatch(setList({
                    status: "SUCCESS",
                    data: data as TIssueData[]
                }))
            }).catch((error) => {
                dispatch(setList({
                    status: "ERROR",
                    data: [],
                    error
                }))
            })
        }
        fetchIssueData()

        return () => {
            dispatch(setList({
                status: "INITIAL",
                data: [],
                error: null
            }))
        }


    }, [dispatch])
    return <div className={styles.appContainer}>
        {status === 'LOADING' && <Loader/>}
        {status === "SUCCESS" && <IssueList issues={sortedIssues}/>}
        {status === "ERROR" && <>Error</>}
    </div>
}

export default App;
