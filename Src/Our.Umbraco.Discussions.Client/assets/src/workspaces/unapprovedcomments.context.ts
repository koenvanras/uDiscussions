import { UmbControllerBase } from "@umbraco-cms/backoffice/class-api";
import { UmbContextToken } from "@umbraco-cms/backoffice/context-api";
import { UmbControllerHostElement } from "@umbraco-cms/backoffice/controller-api";
import { UmbWorkspaceContext } from '@umbraco-cms/backoffice/workspace';
import { UNAPPROVEDCOMMENTS_ENTITY, UNAPPROVEDCOMMENTS_WORKSPACE_ALIAS } from "./manifest";


export class UnapprovedCommentsWorkspaceContext extends UmbControllerBase implements UmbWorkspaceContext {
    public readonly workspaceAlias: string = UNAPPROVEDCOMMENTS_WORKSPACE_ALIAS;

    constructor(host:UmbControllerHostElement) {
        super(host);
        this.provideContext(WORKSPACE_CONTEXT, this);
    }

    getEntityType(): string {
        return UNAPPROVEDCOMMENTS_ENTITY;
    }
}

export default UnapprovedCommentsWorkspaceContext;

export const WORKSPACE_CONTEXT  = new UmbContextToken<UnapprovedCommentsWorkspaceContext>(
    UnapprovedCommentsWorkspaceContext.name,
);