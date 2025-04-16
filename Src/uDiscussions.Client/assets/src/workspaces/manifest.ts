import { ManifestModal, ManifestWorkspace, ManifestWorkspaceAction, ManifestWorkspaceContext, ManifestWorkspaceView } from "@umbraco-cms/backoffice/extension-registry";
import UnapprovedCommentsWorkspaceElement from "./unapprovedcomments.element";

export const DOCUMENTTYPE_SETTINGS_WORKSPACE_ALIAS = "DocumentType.Settings.Workspace.Alias";
export const DOCUMENTTYPE_SETTINGS_ENTITY = "documenttype-settings";

export const APPROVEDCOMMENTS_WORKSPACE_ALIAS = "ApprovedComments.Workspace.Alias";
export const APPROVEDCOMMENTS_ENTITY = "approved-comments";

export const UNAPPROVEDCOMMENTS_WORKSPACE_ALIAS = "UnapprovedComments.Workspace.Alias";
export const UNAPPROVEDCOMMENTS_ENTITY = "unapproved-comments";

export const TRASHEDCOMMENTS_WORKSPACE_ALIAS = "TrashedComments.Workspace.Alias";
export const TRASHEDCOMMENTS_ENTITY = "trashed-comments";
import TrashedCommentsWorkspaceElement from "./trashedcomments.element";
import { WORKSPACE_COMMENTS_ENABLED_CONDITION_ALIAS } from "../conditions/manifest";

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
            },
            {
                alias: WORKSPACE_COMMENTS_ENABLED_CONDITION_ALIAS
            }
        ]
    },
    {
        type: 'workspaceView',
        alias: DOCUMENTTYPE_SETTINGS_WORKSPACE_ALIAS,
        name: 'DocumentType Settings Workspace',
        js: () => import('./views/documenttypesettings.element.ts'),
        weight: 10,
        meta: {
            icon: 'icon-chat',
            pathname: 'comments',
            label: 'Comments'
        },
        conditions: [
            {
                alias: 'Umb.Condition.WorkspaceAlias',
                match: 'Umb.Workspace.DocumentType'
            }
        ]
    }
];

const workspaceContexts : Array<ManifestWorkspaceContext> = [
    {
        type: 'workspaceContext',
        alias: 'UnapprovedComments.Workspace.Context',
        name: 'Unapproved Comments Workspace Context',
        js: () => import('./unapprovedcomments.context'),
    },
    {
        type: 'workspaceContext',
        alias: 'TrashedComments.Workspace.Context',
        name: 'Trashed Comments Workspace Context',
        js: () => import('./trashedcomments.context'),
    },
    {
        type: 'workspaceContext',
        alias: 'DocumentType.Settings.Workspace.Context',
        name: 'DocumentType Settings Workspace Context',
        js: () => import('./views/documenttypesettings.context.ts')
    }
];

const workspaceActions: Array<ManifestWorkspaceAction> = [
    {
        type: 'workspaceAction',
        kind: 'default',
        alias: 'DocumentType.Settings.Workspace.Action.Save',
        name: 'DocumentType Settings Workspace Action Save',
        js: () => import('../actions/savedocumentaction.ts'),
        overwrites: 'Umb.WorkspaceAction.DocumentType.Save',
        meta: {
            look: 'primary',
            color: 'positive',
            label: '#buttons_save'
        },
        conditions: [
            {
                alias: 'Umb.Condition.WorkspaceAlias',
                match: 'Umb.Workspace.DocumentType'
            }
        ]
    }
];

const workspaceModals : Array<ManifestModal> = [];

export const manifests = [
    ...workspaces,
    ...workspaceViews,
    ...workspaceContexts,
    ...workspaceActions,
    ...workspaceModals
];