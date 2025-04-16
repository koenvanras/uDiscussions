import { ManifestCondition } from "@umbraco-cms/backoffice/extension-api";
import WorkspaceCommentsEnabledCondition from "./workspaceCommentsEnabledCondition";

export const WORKSPACE_COMMENTS_ENABLED_CONDITION_ALIAS = "Workspace.Comments.Enabled.Condition.Alias";

const conditions: Array<ManifestCondition> = [
    {
        type: 'condition',
        alias: WORKSPACE_COMMENTS_ENABLED_CONDITION_ALIAS,
        name: 'Workspace Comments Enabled Condition Context',
        api: WorkspaceCommentsEnabledCondition
    }
]

export const manifests = [
    ...conditions
];