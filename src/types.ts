export type TIssue = {
    id: string;
    summary: string;
    status: TIssueStatus;
};
export type TLoadingStatus = 'INITIAL' | 'LOADING' | 'SUCCESS' | 'ERROR'
export type TIssueStatus = 'TODO' | 'IN_PROGRESS' | 'DONE';
export const issueStatus: {
    [key in TIssueStatus]: string
} = {
    "IN_PROGRESS": 'In progress',
    "TODO": 'Todo',
    "DONE": "Done"
}