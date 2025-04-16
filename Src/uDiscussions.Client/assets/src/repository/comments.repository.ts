import { UmbControllerBase } from "@umbraco-cms/backoffice/class-api";
import { UmbControllerHost } from "@umbraco-cms/backoffice/controller-api";
import { CommentsDataSource } from "./sources/comments.datasource";

export class CommentsRespository extends UmbControllerBase {
    #commentsDataSource: CommentsDataSource;

    constructor(host: UmbControllerHost) {
        super(host);
        this.#commentsDataSource = new CommentsDataSource(this);
    }

    async getCommentsCount() {
        return this.#commentsDataSource.getCommentsCount();
    }

    async getApprovedComments(contentkey: string) {
        return this.#commentsDataSource.getApprovedComments(contentkey);
    }

    async getUnapprovedComments() {
        return this.#commentsDataSource.getUnapprovedComments();
    }

    async getUnapprovedCommentsCount() {
        return this.#commentsDataSource.getUnapprovedCommentsCount();
    }

    async getTrashedComments() {
        return this.#commentsDataSource.getTrashedComments();
    }

    async getTrashedCommentsCount() {
        return this.#commentsDataSource.getTrashedCommentsCount();
    }

    async approveComment(id: number) {
        return this.#commentsDataSource.approveComment(id);
    }

    async trashComment(id: number) {
        return this.#commentsDataSource.trashComment(id);
    }

    async restoreComment(id: number) {
        return this.#commentsDataSource.restoreComment(id);
    }

    async deleteComment(id: number) {
        return this.#commentsDataSource.deleteComment(id);
    }
}