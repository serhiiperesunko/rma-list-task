import styles from './IssueList.module.css'
import {TIssue} from "../IssueItem/IssueItem";
import {IssueItem} from "..";
import React, {useEffect, useMemo, useRef, useState} from "react";

interface IIssueList {
    issues: TIssue[]
}

const IssueList = ({issues}: IIssueList) => {
    const issueRef = useRef() as React.MutableRefObject<HTMLDivElement>
    const [selectedIssues, setSelectedIssues] = useState<TIssue[]>([])

    /**
     * Sort by:
     * 1. In progress
     * 2. To do
     * 3. Done
     * */
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

    useEffect(() => {
        const checkIfClickedOutsideList = (e: Event) => {
            const target = e.target as HTMLDivElement;
            if (issueRef.current && !issueRef.current.contains(target)) {
                setSelectedIssues([])
            }
        }

        document.addEventListener("click", checkIfClickedOutsideList)

        return () => {
            document.removeEventListener("click", checkIfClickedOutsideList)
        }
    }, [])

    return <div ref={issueRef} className={styles.issueList}>
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