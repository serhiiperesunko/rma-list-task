import React from "react";
import cn from 'classnames'
import styles from "./IssueItem.module.css"
import {issueStatus} from "../../types";
import {Loader} from "../index";
import {TIssueData} from "../../redux/slices/issuesSlice";

interface IIssueItem {
    data: TIssueData,
    onSelect?: (e: React.MouseEvent<HTMLDivElement>, item: TIssueData) => void
}

const IssueItem = ({data, onSelect}: IIssueItem) => {
    const {summary, status: dataStatus, loading = false, selected = false} = data
    return <div className={cn([styles.container, {
        [styles.selected]: selected
    }])} onClick={(e) => onSelect && onSelect(e, data)}>
        {loading ? <Loader/> : <>
            <div className={styles.body}>{summary}</div>
            <div className={cn([styles.status, styles[dataStatus]])}>{issueStatus[dataStatus]}</div>
        </>}
    </div>
};

IssueItem.displayName = "IssueItem";

export default IssueItem;
