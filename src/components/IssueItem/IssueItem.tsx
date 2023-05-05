import React from "react";
import classNames from "classnames/bind";
import styles from "./IssueItem.module.css";

export type TIssueStatus = "TODO" | "IN_PROGRESS" | "DONE";
export type TIssue = {
    id: string;
    summary: string;
    status: TIssueStatus;
};

interface IIssueItem extends TIssue {
    selected?: boolean;
    onClick: (e: React.MouseEvent<HTMLDivElement>, el: TIssue) => void;
}

const IssueItem = ({id, summary, status, selected = false, onClick}: IIssueItem) => {
    const getClassByStatus = () => {
        switch (status) {
            case "IN_PROGRESS":
                return "In Progress";
            case "TODO":
                return "To Do";
            case "DONE":
                return "Done";
            default:
                return "";
        }
    };

    const cx = classNames.bind(styles);

    return (
        <div
            onClick={(e) => onClick(e, {summary, status, id})}
            className={cx("issueItem", {"issueItemSelected": selected})}
        >
            <div className={styles.issueItemTitle}>{summary}</div>
            <div className={cx("status", status)}>{getClassByStatus()}</div>
        </div>
    );
};

IssueItem.displayName = "IssueItem";

export default IssueItem;
