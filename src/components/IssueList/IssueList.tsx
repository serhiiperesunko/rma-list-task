import styles from './IssueList.module.css'
import {TIssue} from "../IssueItem/IssueItem";
import {IssueItem} from "..";
import React, {useMemo, useState} from "react";

interface IIssueList {
    issues: TIssue[]
}

const IssueList = ({issues}: IIssueList) => {
    const [selectedIssues, setSelectedIssues] = useState<TIssue[]>([])

    const sortedList = useMemo(() => [...issues].sort((a, b) => {
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
    }), [issues])

    const isSelected = (id: string) => !!selectedIssues.find(el => el.id === id)

    const handleSelectedIssues = (e: React.MouseEvent<HTMLDivElement>, issue: TIssue) => {
        if (selectedIssues.length === 0) setSelectedIssues([issue])
        /**
         * If you hold down the CTRL key - multiple selection
         * */
        if (e.metaKey || e.ctrlKey) {
            setSelectedIssues(prev => {
                const index = prev.findIndex(el => el.id === issue.id)
                if (index === -1) {
                    return [...prev, issue]
                }

                const newArr = [...prev]
                newArr.splice(index, 1)

                return newArr
            })
        }
        /**
         * Single selection
         * */
        else {
            setSelectedIssues([issue])
        }
    }

    return <div className={styles.issueList}>
        {sortedList.map((issue) => <IssueItem
            key={`issue-item-${issue.id}`}
            onClick={handleSelectedIssues}
            selected={isSelected(issue.id)}
            {...issue}
        />)}
    </div>
}
IssueList.displayName = 'IssueList'
export default IssueList