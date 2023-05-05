import React from 'react';
import {useAppSelector} from "./redux/hooks";
import {selectIssueList} from "./redux/slices/selectors";

function App() {
    const issuesList = useAppSelector(selectIssueList)
    console.log(issuesList)
    return <div>list</div>
}

export default App;
