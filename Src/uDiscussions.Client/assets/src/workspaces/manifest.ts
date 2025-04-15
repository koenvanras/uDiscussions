import { ManifestModal, ManifestWorkspace, ManifestWorkspaceAction, ManifestWorkspaceContext, ManifestWorkspaceView } from "@umbraco-cms/backoffice/extension-registry";
import UnapprovedCommentsWorkspaceElement from "./unapprovedcomments.element";



export const APPROVEDCOMMENTS_WORKSPACE_ALIAS = "ApprovedComments.Workspace.Alias";
export const APPROVEDCOMMENTS_ENTITY = "approved-comments";

export const UNAPPROVEDCOMMENTS_WORKSPACE_ALIAS = "UnapprovedComments.Workspace.Alias";
export const UNAPPROVEDCOMMENTS_ENTITY = "unapproved-comments";

export const TRASHEDCOMMENTS_WORKSPACE_ALIAS = "TrashedComments.Workspace.Alias";
export const TRASHEDCOMMENTS_ENTITY = "trashed-comments";
import TrashedCommentsWorkspaceElement from "./trashedcomments.element";

export const workspaces : Array<ManifestWorkspace> = [
    {
        type: 'workspace',
        alias: UNAPPROVEDCOMMENTS_WORKSPACE_ALIAS,
        name: 'Unapproved Comments Workspace',
        element: UnapprovedCommentsWorkspaceElement,
        meta: {
            entityType: UNAPPROVEDCOMMENTS_ENTITY
        }
    },
    {
        type: 'workspace',
        alias: TRASHEDCOMMENTS_WORKSPACE_ALIAS,
        name: 'Trashed Comments Workspace',
        element: TrashedCommentsWorkspaceElement,
        meta: {
            entityType: TRASHEDCOMMENTS_ENTITY
        }
    }
];

var workspaceViews: Array<ManifestWorkspaceView> = [
    {
        type: 'workspaceView',
        alias: APPROVEDCOMMENTS_WORKSPACE_ALIAS,
        name: 'Approved Comments Workspace',
        js: () => import('./views/approvedcomments.element'),
        weight: 10,
        meta: {
            icon: 'icon-chat',
            pathname: 'comments',
            label: 'Comments'
        },
        conditions: [
            {
                alias: 'Umb.Condition.WorkspaceAlias',
                match: 'Umb.Workspace.Document'
            }
        ]
    }
];

const workspaceContexts : Array<ManifestWorkspaceContext> = [
    {
        type: 'workspaceContext',
        alias: 'UnapprovedComments.Workspace.context',
        name: 'Unapproved Comments Workspace Context',
        js: () => import('./unapprovedcomments.context'),
    },
    {
        type: 'workspaceContext',
        alias: 'TrashedComments.Workspace.context',
        name: 'Trashed Comments Workspace Context',
        js: () => import('./trashedcomments.context'),
    }
];

const workspaceActions: Array<ManifestWorkspaceAction> = [];

const workspaceModals : Array<ManifestModal> = [];

export const manifests = [
    ...workspaces,
    ...workspaceViews,
    ...workspaceContexts,
    ...workspaceActions,
    ...workspaceModals
];