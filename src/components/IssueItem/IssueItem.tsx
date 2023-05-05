import styles from './IssueItem.module.css'
import cn from 'classnames'

export type TIssueStatus = 'TODO' | 'IN_PROGRESS' | 'DONE';
export type TIssue = {
    id: string;
    summary: string;
    status: TIssueStatus;
};

const IssueItem = ({summary, status}: TIssue) => {
    const getClassByStatus = () => {
        if (status === 'IN_PROGRESS') return 'In Progress'
        if (status === 'TODO') return 'To Do'
        if (status === 'DONE') return 'Done'
    }

    return <div className={styles.issueItem}>
        <div className={styles.issueItemTitle}>{summary}</div>
        <div className={cn([styles.status, styles[status]])}>{getClassByStatus()}</div>
    </div>
}
IssueItem.displayName = 'IssueItem'
export default IssueItem