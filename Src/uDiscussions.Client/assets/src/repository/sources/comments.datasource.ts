import { UmbControllerHost } from "@umbraco-cms/backoffice/controller-api";
import { UmbDataSourceResponse  } from "@umbraco-cms/backoffice/repository";
import { tryExecuteAndNotify } from '@umbraco-cms/backoffice/resources';
import { CommentSchema, CommmentsService } from "../../api";


export interface ICommentsDataSource {
    getApprovedComments(contentkey: string) : Promise<UmbDataSourceResponse<CommentSchema[]>>;
    getUnapprovedComments(): Promise<UmbDataSourceResponse<CommentSchema[]>>;
    getTrashedComments(): Promise<UmbDataSourceResponse<CommentSchema[]>>;
    approveComment(id: number) : Promise<UmbDataSourceResponse<boolean>>;
    trashComment(id: number) : Promise<UmbDataSourceResponse<boolean>>;
    restoreComment(id: number) : Promise<UmbDataSourceResponse<boolean>>;
    deleteComment(id: number): Promise<UmbDataSourceResponse<boolean>>;
}

export class CommentsDataSource implements ICommentsDataSource {
    #host: UmbControllerHost;

    constructor(host: UmbControllerHost) {
        this.#host = host;
    }

    async getCommentsCount(): Promise<UmbDataSourceResponse<number>> {
        return await tryExecuteAndNotify(this.#host, CommmentsService.getCommentsCount());
    }

    async getApprovedComments(contentkey: string): Promise<UmbDataSourceResponse<CommentSchema[]>> {
        return await tryExecuteAndNotify(this.#host, CommmentsService.getCommentsByContentkeyApproved({contentkey}));
    }

    async getUnapprovedComments(): Promise<UmbDataSourceResponse<CommentSchema[]>> {
        return await tryExecuteAndNotify(this.#host, CommmentsService.getCommentsUnapproved());
    }

    async getUnapprovedCommentsCount(): Promise<UmbDataSourceResponse<number>> {
        return await tryExecuteAndNotify(this.#host, CommmentsService.getCommentsUnapprovedCount());
    }

    async getTrashedComments(): Promise<UmbDataSourceResponse<CommentSchema[]>> {
        return await tryExecuteAndNotify(this.#host, CommmentsService.getCommentsTrashed());
    }

    async getTrashedCommentsCount(): Promise<UmbDataSourceResponse<number>> {
        return await tryExecuteAndNotify(this.#host, CommmentsService.getCommentsTrashedCount());
    }

    async approveComment(id: number) : Promise<UmbDataSourceResponse<boolean>> {
        return await tryExecuteAndNotify(this.#host, CommmentsService.patchCommentsByIdApprove({id}));
    }

    async trashComment(id: number) : Promise<UmbDataSourceResponse<boolean>> {
        return await tryExecuteAndNotify(this.#host, CommmentsService.patchCommentsByIdTrash({id}));
    }

    async restoreComment(id: number) : Promise<UmbDataSourceResponse<boolean>> {
        return await tryExecuteAndNotify(this.#host, CommmentsService.patchCommentsByIdRestore({id}));
    }

    async deleteComment(id: number) : Promise<UmbDataSourceResponse<boolean>> {
        return await tryExecuteAndNotify(this.#host, CommmentsService.deleteCommentsByIdDelete({id}));
    }
}