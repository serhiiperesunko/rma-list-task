import {TIssue} from "./types";

const storageServerDB = window.localStorage.getItem("serverDB");
const initialServerDB = {
    issues: [
        {
            id: "1000",
            summary: "Create simple todo list",
            status: "TODO"
        },
        {
            id: "1001",
            summary: "Fix the bathroom door lock",
            status: "DONE"
        },
        {
            id: "1002",
            summary: "Pick up laundry",
            status: "IN_PROGRESS"
        },
        {
            id: "1003",
            summary: "Buy flowers for the girlfriend",
            status: "TODO"
        }
    ]
};

const serverDB: { issues: TIssue[] } = storageServerDB
    ? JSON.parse(storageServerDB)
    : initialServerDB;

export async function restGetIssues() {
    return new Promise((resolve) => {
        setTimeout(() => resolve(Array.from(serverDB.issues)), 2000);
    });
}

export async function restPutIssue(issueData: TIssue) {
    return new Promise((resolve, reject) => {
        const index = serverDB.issues.findIndex((issue) => issue.id === issueData.id);
        if (index >= 0) {
            const nextIssues: TIssue[] = Array.from(serverDB.issues);
            nextIssues[index] = {
                ...nextIssues[index],
                ...issueData
            };
            serverDB.issues = nextIssues;
            window.localStorage.setItem("serverDB", JSON.stringify(serverDB));

            setTimeout(() => resolve(nextIssues[index]), 2000);
        } else {
            setTimeout(
                () => reject(new Error(`Issue with id=${issueData.id} does not exist`)),
                2000
            );
        }
    });
}
