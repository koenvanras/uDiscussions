import { UmbElementMixin } from '@umbraco-cms/backoffice/element-api';
import { LitElement, html, css, customElement, property, state } from '@umbraco-cms/backoffice/external/lit';
import { CommentSchema } from '../api';
import { COMMENTS_CONTEXT, CommentsContext } from '../contexts/comments.context';
import { UMB_CONFIRM_MODAL, UMB_MODAL_MANAGER_CONTEXT, UmbModalManagerContext } from '@umbraco-cms/backoffice/modal';
import { UMB_NOTIFICATION_CONTEXT, UmbNotificationContext, UmbNotificationDefaultData } from '@umbraco-cms/backoffice/notification';

@customElement('unapprovedcomments-workspace-root')
export class UnapprovedCommentsWorkspaceElement extends UmbElementMixin(LitElement) {
    #commentsContext? : CommentsContext;
    #modalContext?: UmbModalManagerContext;
    #notificationContext?: UmbNotificationContext;

    @property()
    title = "Unapproved comments";

    @state()
    comments?: CommentSchema[];

    constructor() {
        super();

        this.consumeContext(COMMENTS_CONTEXT, (_instance) => {
            this.#commentsContext = _instance;

            this.observe(_instance.unapprovedComments, (_comments: CommentSchema[]) => {
                this.comments = _comments
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
            this.getUnapprovedComments();
        }
    }

    async getUnapprovedComments() {
        await this.#commentsContext?.getUnapprovedComments();
    }

    #onClickTrash = (comment: CommentSchema) => async (): Promise<void> => {
        const modalHandler = this.#modalContext?.open(this, UMB_CONFIRM_MODAL, {
            data: {
                headline: `Trash`,
                content: 'Are you sure you want to move the comment to the Discussions Recycle Bin?',
                confirmLabel: 'Trash',
                color: 'danger'
            }
        });

        modalHandler?.onSubmit().then(async () => {
            await this.#commentsContext?.trashComment(comment.id);
            await this.getUnapprovedComments();

            const data: UmbNotificationDefaultData = {
                headline: `Trashed`,
                message: `The comment has been moved to the Discussions Recycle Bin.`
            };
            await this.#notificationContext?.peek("positive", { data });
        });
    }

    #onClickApprove = (comment: CommentSchema) => async (): Promise<void> => {
        const modalHandler = this.#modalContext?.open(this, UMB_CONFIRM_MODAL, {
            data: {
                headline: `Approve`,
                content: 'Are you sure you want to approve the comment?',
                confirmLabel: 'Approve',
                color: 'positive'
            }
        });

        modalHandler?.onSubmit().then(async () => {
            await this.#commentsContext?.approveComment(comment.id);
            await this.getUnapprovedComments();

            const data: UmbNotificationDefaultData = {
                headline: `Approved`,
                message: `The comment has been approved.`
            };
            await this.#notificationContext?.peek("positive", { data });
        });
    }

    render() {
        return html`
            <umb-body-layout headline='Unapproved Comments'>
                <div class="comments">
                    ${this.comments?.map((comment) => {
                        return html`
                            <uui-box>
                                <div slot="headline">${comment.author}</div>
                                <div slot="header">${comment.date}</div>
                                <div slot="header-actions">
                                    <uui-button pristine label="Delete" look="primary" color="danger" @click=${this.#onClickTrash(comment)}>
                                        <uui-icon name="delete"></uui-icon>
                                    </uui-button>
                                    <uui-button pristine label="Approve" look="primary" color="positive" @click=${this.#onClickApprove(comment)}>
                                        Approve
                                    </uui-button>
                                </div>
                                <div class="comment">
                                    <p class="comment__message">${comment.message}</p>
                                    <uui-ref-node name=${comment.contentName} detail=${comment.contentKey} readonly standalone></uui-ref-node>
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

export default UnapprovedCommentsWorkspaceElement;

declare global {
	interface HTMLElementTagNameMap {
		'unapprovedcomments-workspace-root': UnapprovedCommentsWorkspaceElement
	}
}