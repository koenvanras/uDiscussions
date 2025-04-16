import { UmbControllerBase } from "@umbraco-cms/backoffice/class-api";
import { UmbContextToken } from "@umbraco-cms/backoffice/context-api";
import { UmbControllerHostElement } from "@umbraco-cms/backoffice/controller-api";
import { UmbWorkspaceContext } from '@umbraco-cms/backoffice/workspace';
import { TRASHEDCOMMENTS_ENTITY, TRASHEDCOMMENTS_WORKSPACE_ALIAS } from "./manifest";

export class TrashedCommentsWorkspaceContext extends UmbControllerBase implements UmbWorkspaceContext {
    public readonly workspaceAlias: string = TRASHEDCOMMENTS_WORKSPACE_ALIAS;

    constructor(host:UmbControllerHostElement) {
        super(host);
        this.provideContext(WORKSPACE_CONTEXT, this);
    }

    getEntityType(): string {
        return TRASHEDCOMMENTS_ENTITY;
    }
}

export default TrashedCommentsWorkspaceContext;

export const WORKSPACE_CONTEXT  = new UmbContextToken<TrashedCommentsWorkspaceContext>(
    TrashedCommentsWorkspaceContext.name,
);