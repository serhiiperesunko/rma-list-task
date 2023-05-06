import React, {ChangeEvent, useState} from "react";
import styles from './UpdateStatusModal.module.css'
import {issueStatus, TIssueStatus} from "../../types";

interface IUpdateStatusModal {
    selectedItems?: number
    onUpdate: (status: TIssueStatus) => void
}

const UpdateStatusModal = ({selectedItems = 0, onUpdate}: IUpdateStatusModal) => {
    const [selectedStatus, setSelectedStatus] = useState<TIssueStatus | ''>('')
    const handleUpdate = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.stopPropagation()
        if (selectedStatus !== '') {
            onUpdate(selectedStatus)
        }
    }

    const handleSelect = (e: ChangeEvent<HTMLSelectElement>) => {
        e.stopPropagation();
        setSelectedStatus(e.target.value as TIssueStatus | '');
    };

    return <div className={styles.container}>
        <div className={styles.body}>
            <div className={styles.selected}>{selectedItems}</div>
            <select onChange={handleSelect}>
                <option value={''}>Select status</option>
                {Object.keys(issueStatus).map(key => <option key={key}
                                                             value={key}>{issueStatus[key as TIssueStatus]}</option>)}
            </select>
            <button className={styles.button} onClick={handleUpdate}>Update status</button>
        </div>
    </div>
}
UpdateStatusModal.displayName = 'UpdateStatusModal'
export default UpdateStatusModal