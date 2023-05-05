import styles from './IssueItem.module.css'
import cn from 'classnames'
import React from "react";

export type TIssueStatus = 'TODO' | 'IN_PROGRESS' | 'DONE';
export type TIssue = {
    id: string;
    summary: string;
    status: TIssueStatus;
};

interface IIssueItem extends TIssue {
    selected?: boolean;
    onClick: (e: React.MouseEvent<HTMLDivElement>, el: TIssue) => void
}

const IssueItem = ({id, summary, status, selected = false, onClick}: IIssueItem) => {
    const getClassByStatus = () => {
        if (status === 'IN_PROGRESS') return 'In Progress'
        if (status === 'TODO') return 'To Do'
        if (status === 'DONE') return 'Done'
    }

    return <div
        onClick={(e) => onClick(e, {
            summary,
            status,
            id
        })}
        className={cn([styles.issueItem, {
            [styles.issueItemSelected]: selected
        }])}>
        <div className={styles.issueItemTitle}>{summary}</div>
        <div className={cn([styles.status, styles[status]])}>{getClassByStatus()}</div>
    </div>
}
IssueItem.displayName = 'IssueItem'
export default IssueItem