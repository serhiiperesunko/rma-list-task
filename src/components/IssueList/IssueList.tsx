import {TIssueStatus} from "../../types";
import React, {lazy, Suspense, useEffect, useRef} from "react";
import {Loader, UpdateStatusModal} from "../index";
import {resetSelect, TIssueData, updateIssue} from "../../redux/slices/issuesSlice";
import {useAppDispatch} from "../../redux/hooks";
import {createPortal} from "react-dom";
import {restPutIssue} from "../../server";

const IssueItem = lazy(() => import('../IssueItem'))

interface IIssueList {
    issues: TIssueData[],
}

const IssueList = ({issues}: IIssueList) => {
    const dispatch = useAppDispatch()

    const refIssueList = useRef() as React.MutableRefObject<HTMLDivElement>
    const refModal = useRef() as React.MutableRefObject<HTMLDivElement>

    useEffect(() => {
        const checkIfClickedOutsideList = (e: Event) => {
            const target = e.target as HTMLDivElement;
            if (refIssueList?.current && refModal?.current && !refIssueList?.current.contains(target) && !refModal?.current.contains(target)) {
                dispatch(resetSelect())
            }
        };
        document.addEventListener('click', checkIfClickedOutsideList);
        return () => {
            document.removeEventListener('click', checkIfClickedOutsideList);
        };
    }, [dispatch, refIssueList, refModal]);
    const handleSelectedIssues = (e: React.MouseEvent<HTMLDivElement>, issue: TIssueData) => {
        const newIssue = {...issue}
        newIssue.selected = !newIssue.selected
        if (e.metaKey || e.ctrlKey) {
            dispatch(updateIssue(newIssue))
        } else {
            dispatch(resetSelect())
            dispatch(updateIssue(newIssue))
        }
    }

    const selectedIssues = issues.filter(el => el.selected)

    const handleUpdateStatus = (status: TIssueStatus) => {
        selectedIssues.forEach(issue => {
            if (issue.status !== status) {
                const newIssueState = {
                    ...issue,
                    loading: true
                }
                dispatch(updateIssue(newIssueState))
                restPutIssue({
                    id: newIssueState.id,
                    summary: newIssueState.summary,
                    status
                }).then(res => {
                    dispatch(updateIssue({
                        ...res as TIssueData,
                        selected: false,
                        loading: false
                    }))
                })
            } else {
                dispatch(updateIssue({
                    ...issue,
                    selected: false,
                }))
            }
        })

    }


    return <div ref={refIssueList}>
        {issues.map((issue: TIssueData) => <Suspense key={`issue-${issue.id}`} fallback={<Loader/>}>
                <IssueItem
                    onSelect={handleSelectedIssues}
                    data={issue}/>
            </Suspense>
        )}
        {selectedIssues.length > 0 && createPortal(<div ref={refModal}>
            <UpdateStatusModal
                onUpdate={handleUpdateStatus}
                selectedItems={selectedIssues.length}/>
        </div>, document.body)}
    </div>
};

IssueList.displayName = 'IssueList';

export default IssueList;
