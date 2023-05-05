import styles from './IssueList.module.css'
import {TIssue} from '../IssueItem/IssueItem';
import {IssueItem} from '..';
import React, {useEffect, useRef, useState} from 'react';

interface IIssueList {
    issues: TIssue[];
}

const Modal = () => {
    return <div>Modal</div>;
};

const IssueList = ({issues}: IIssueList) => {
    const issueRef = useRef<HTMLDivElement>(null);
    const [selectedIssues, setSelectedIssues] = useState<TIssue[]>([]);
    const [showForm, setShowForm] = useState(false);

    // Check if selected issues is not empty and show modal
    useEffect(() => {
        setShowForm(selectedIssues.length > 0);
    }, [selectedIssues]);

    const isSelected = (id: string) => selectedIssues.some((el) => el.id === id);

    const handleSelectedIssues = (
        e: React.MouseEvent<HTMLDivElement>,
        issue: TIssue,
    ) => {
        // If you hold down the CTRL key - multiple selection
        if (e.metaKey || e.ctrlKey) {
            setSelectedIssues((prev) => {
                const index = prev.findIndex((el) => el.id === issue.id);

                if (index === -1) {
                    return [...prev, issue];
                }

                const newArr = [...prev];
                newArr.splice(index, 1);
                return newArr;
            });
        } else {
            // Single selection
            setSelectedIssues([issue]);
        }
    };

    // Reset selected issues if click outside issue list
    useEffect(() => {
        const checkIfClickedOutsideList = (e: Event) => {
            const target = e.target as HTMLDivElement;

            if (issueRef.current && !issueRef.current.contains(target)) {
                setSelectedIssues([]);
            }
        };

        document.addEventListener('click', checkIfClickedOutsideList);

        return () => {
            document.removeEventListener('click', checkIfClickedOutsideList);
        };
    }, [issueRef]);

    return (
        <div ref={issueRef} className={styles.issueList}>
            {issues.map((issue) => (
                <IssueItem
                    key={`issue-item-${issue.id}`}
                    onClick={handleSelectedIssues}
                    selected={isSelected(issue.id)}
                    {...issue}
                />
            ))}
            {showForm && <Modal/>}
        </div>
    );
};

IssueList.displayName = 'IssueList';

export default IssueList;
