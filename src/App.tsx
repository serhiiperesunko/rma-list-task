import React, {useEffect} from 'react';
import {useAppDispatch, useAppSelector} from "./redux/hooks";
import {selectIssueList} from "./redux/slices/selectors";
import styles from './App.module.css'
import {IssueList, Loader} from "./components";
import {setList} from "./redux/slices/issuesSlice";
import {restGetIssues} from "./server";
import {TIssue} from "./types";

function App() {

    const dispatch = useAppDispatch()
    const {list: {status, data}} = useAppSelector(selectIssueList)

    //
    useEffect(() => {
        const fetchIssueData = () => {
            dispatch(setList({
                status: "LOADING",
                data: [],
            }))
            restGetIssues().then((data) => {
                const updatedData = (data as TIssue[]).map(issue => ({
                    ...issue,
                    selected: false,
                    loading: false
                }))
                dispatch(setList({
                    status: "SUCCESS",
                    data: updatedData
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


    }, [])
    return <div className={styles.appContainer}>
        {status === 'LOADING' && <Loader/>}
        {status === "SUCCESS" && <IssueList issues={data}/>}
        {status === "ERROR" && <>Error</>}
    </div>
}

export default App;
