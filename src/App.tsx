import React, {useEffect, useMemo} from 'react';
import {useAppDispatch, useAppSelector} from './redux/hooks';
import {setList} from './redux/slices/issuesSlice';
import {IssueList} from './components';
import styles from './App.module.css';
import {selectIssueList} from "./redux/slices/selectors";

function App() {
    const dispatch = useAppDispatch();
    const issueList = useAppSelector(selectIssueList);

    useEffect(() => {
        dispatch(setList([
            {
                id: '1000',
                summary: 'Create simple todo list',
                status: 'TODO',
            },
            {
                id: '1001',
                summary: 'Fix the bathroom door lock',
                status: 'DONE',
            },
            {
                id: '1002',
                summary: 'Pick up laundry',
                status: 'IN_PROGRESS',
            },
            {
                id: '1003',
                summary: 'Buy flowers for the girlfriend',
                status: 'TODO',
            },
        ]));
    }, [dispatch]);

    const sortedList = useMemo(() => [...issueList].sort((a, b) => {
        const order = {
            TODO: 0,
            IN_PROGRESS: 1,
            DONE: 2,
        };

        if (order[a.status] < order[b.status]) {
            return -1;
        } else if (order[a.status] > order[b.status]) {
            return 1;
        } else {
            return 0;
        }
    }), [issueList]);

    return (
        <div className={styles.container}>
            <IssueList issues={sortedList}/>
        </div>
    );
}

export default App;
