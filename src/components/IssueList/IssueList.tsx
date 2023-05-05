import styles from './IssueList.module.css'
import {TIssue} from "../IssueItem/IssueItem";
import {IssueItem} from "..";

interface IIssueList {
    issues: TIssue[]
}

const IssueList = ({issues}: IIssueList) => {
    return <div className={styles.issueList}>
        {issues.map((issue) => <IssueItem key={`issue-item-${issue.id}`}{...issue}/>)}
    </div>
}
IssueList.displayName = 'IssueList'
export default IssueList