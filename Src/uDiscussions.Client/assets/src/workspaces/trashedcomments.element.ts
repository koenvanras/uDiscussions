import { UmbElementMixin } from '@umbraco-cms/backoffice/element-api';
import { LitElement, html, css, customElement, property, state } from '@umbraco-cms/backoffice/external/lit';
import { CommentSchema } from '../api';
import { COMMENTS_CONTEXT, CommentsContext } from '../contexts/comments.context';
import { UMB_CONFIRM_MODAL, UMB_MODAL_MANAGER_CONTEXT, UmbModalManagerContext } from '@umbraco-cms/backoffice/modal';
import { UMB_NOTIFICATION_CONTEXT, UmbNotificationContext, UmbNotificationDefaultData } from '@umbraco-cms/backoffice/notification';

@customElement('trashedcomments-workspace-root')
export class TrashedCommentsWorkspaceElement extends UmbElementMixin(LitElement) {
    #commentsContext? : CommentsContext;
    #modalContext?: UmbModalManagerContext;
    #notificationContext?: UmbNotificationContext;

    @property()
    title = "Recycle Bin";

    @state()
    comments?: CommentSchema[];

    constructor() {
        super();

        this.consumeContext(COMMENTS_CONTEXT, (_instance) => {
            this.#commentsContext = _instance;

            this.observe(_instance.trashedComments, (_comments: CommentSchema[]) => {
                this.comments = _comments;
            });
        });

        this.consumeContext(UMB_MODAL_MANAGER_CONTEXT, (_instance) => {
            this.#modalContext = _instance;
        });

        this.consumeContext(UMB_NOTIFICATION_CONTEXT, (_instance) => {
            this.#notificationContext = _instance;
        });
    }

    connectedCallback(): void {
        super.connectedCallback();

        if (this.#commentsContext != null) {
            this.getTrashedComments();
        }
    }

    async getTrashedComments() {
        await this.#commentsContext?.getTrashedComments();
    }

    #onClickDelete = (comment: CommentSchema) => async (): Promise<void> => {
        const modalHandler = this.#modalContext?.open(this, UMB_CONFIRM_MODAL, {
            data: {
                headline: `Delete`,
                content: 'Are you sure you want to delete the comment?',
                confirmLabel: 'Delete',
                color: 'danger'
            }
        });

        modalHandler?.onSubmit().then(async () => {
            await this.#commentsContext?.deleteComment(comment.id);
            await this.getTrashedComments();

            const data: UmbNotificationDefaultData = {
                headline: `Deleted`,
                message: `The comment has been deleted.`
            };
            await this.#notificationContext?.peek("positive", { data });
        });
    }

    #onClickRestore = (comment: CommentSchema) => async (): Promise<void> => {
        const modalHandler = this.#modalContext?.open(this, UMB_CONFIRM_MODAL, {
            data: {
                headline: `Restore`,
                content: "Are you sure you want to restore the comment to <strong>" + (comment.approved ? "Approved Comments" : "Unapproved Comments") + "</strong>?",
                confirmLabel: 'Restore',
                color: 'positive'
            }
        });

        modalHandler?.onSubmit().then(async () => {
            await this.#commentsContext?.restoreComment(comment.id);
            await this.getTrashedComments();

            const data: UmbNotificationDefaultData = {
                headline: `Restored`,
                message: `The comment has been restored.`
            };
            await this.#notificationContext?.peek("positive", { data });
        });
    }

    render() {
        return html`
            <umb-body-layout headline=${this.title}>
                <div class="comments">
                    ${this.comments?.map((comment) => {
                        return html`
                            <uui-box>
                                <div slot="headline">${comment.author}</div>
                                <div slot="header">${comment.date}</div>
                                <div slot="header-actions">
                                    <uui-button pristine label="Delete" look="primary" color="danger" @click=${this.#onClickDelete(comment)}>
                                        <uui-icon name="delete"></uui-icon>
                                    </uui-button>
                                    <uui-button pristine label="Restore" look="primary" color="default" @click=${this.#onClickRestore(comment)}>
                                        Restore
                                    </uui-button>
                                </div>
                                <div class="comment">
                                    <p class="comment__message">${comment.message}</p>
                                    <uui-ref-node name=${comment.contentName} detail=${comment.contentKey} readonly standalone></uui-ref-node>
                                    <uui-tag color="${comment.approved ? "positive" : "danger"}">${comment.approved ? "Approved" : "Unapproved"}</uui-tag>
                                </div>
                            </uui-box>
                        `
                    })}
                </div>
            </umb-body-layout>
        `
    }

    static override styles = [
        css`
            .comments {
                display: grid;
                grid-gap: 2rem;
                grid-template-columns: repeat(3, 1fr);
            }

            .comment {
                display: flex;
                gap: 2rem;
                flex-direction: column;
            }

            .comment__message {
                margin: 0;
            }

            .comment uui-ref-node {
                padding: 1rem;
            }
        `
    ];
}

export default TrashedCommentsWorkspaceElement;

declare global {
	interface HTMLElementTagNameMap {
		'trashedcomments-workspace-root': TrashedCommentsWorkspaceElement
	}
}