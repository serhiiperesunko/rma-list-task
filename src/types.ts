export type TIssueStatus = 'TODO' | 'IN_PROGRESS' | 'DONE';
export type TIssue = {
    id: string;
    summary: string;
    status: TIssueStatus;
};



