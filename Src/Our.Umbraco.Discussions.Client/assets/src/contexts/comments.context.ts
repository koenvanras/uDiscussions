
﻿import { UmbControllerBase } from "@umbraco-cms/backoffice/class-api";
import { UmbControllerHost } from "@umbraco-cms/backoffice/controller-api";
import { UmbContextToken } from "@umbraco-cms/backoffice/context-api";
import { UmbArrayState } from "@umbraco-cms/backoffice/observable-api";
import { CommentsRespository } from "../repository/comments.repository";
import { CommentSchema } from "../api";

export class CommentsContext extends UmbControllerBase {
    #repository: CommentsRespository;

    #approvedComments = new UmbArrayState<CommentSchema>([], () => undefined);
    public readonly approvedComments = this.#approvedComments.asObservable();

    #unapprovedComments = new UmbArrayState<CommentSchema>([], () => undefined);
    public readonly unapprovedComments = this.#unapprovedComments.asObservable();

    #trashedComments = new UmbArrayState<CommentSchema>([], () => undefined);
    public readonly trashedComments = this.#trashedComments.asObservable();

    constructor(host: UmbControllerHost) {
        super(host);

        this.provideContext(COMMENTS_CONTEXT, this);
        this.#repository = new CommentsRespository(this);
    }

    async getApprovedComments(contentkey: string) {
        const { data } = await this.#repository.getApprovedComments(contentkey);

        if (data) {
            this.#approvedComments.setValue(data);
        } else {
            this.#approvedComments.setValue([]);
        }
    }

    async getUnapprovedComments() {
        const { data } = await this.#repository.getUnapprovedComments();

        if (data) {
            this.#unapprovedComments.setValue(data);
        } else {
            this.#unapprovedComments.setValue([]);
        }
    }

    async getTrashedComments() {
        const { data } = await this.#repository.getTrashedComments();

        if (data) {
            this.#trashedComments.setValue(data);
        } else {
            this.#trashedComments.setValue([]);
        }
    }

    async approveComment(id: number) {
        return await this.#repository.approveComment(id);
    }

    async trashComment(id: number) {
        return await this.#repository.trashComment(id);
    }

    async restoreComment(id: number) {
        return await this.#repository.restoreComment(id);
    }

    async deleteComment(id: number) {
        return await this.#repository.deleteComment(id);
    }
}

export default CommentsContext;

export const COMMENTS_CONTEXT = 
    new UmbContextToken<CommentsContext>(CommentsContext.name);
