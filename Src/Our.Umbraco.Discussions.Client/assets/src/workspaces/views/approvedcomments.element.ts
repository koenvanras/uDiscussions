import { UmbElementMixin } from '@umbraco-cms/backoffice/element-api';
import { LitElement, html, css, customElement, property, state } from '@umbraco-cms/backoffice/external/lit';
import { CommentSchema } from '../../api';
import { COMMENTS_CONTEXT, CommentsContext } from '../../contexts/comments.context';
import { UMB_WORKSPACE_CONTEXT } from '@umbraco-cms/backoffice/workspace';
import { UmbDocumentWorkspaceContext } from '@umbraco-cms/backoffice/document';
import { UMB_CONFIRM_MODAL, UMB_MODAL_MANAGER_CONTEXT, UmbModalManagerContext } from '@umbraco-cms/backoffice/modal';
import { UMB_NOTIFICATION_CONTEXT, UmbNotificationContext, UmbNotificationDefaultData } from '@umbraco-cms/backoffice/notification';

@customElement('approvedcomments-workspace-view')
export class ApprovedCommentsWorkspaceElement extends UmbElementMixin(LitElement) {
    #commentsContext?: CommentsContext;
    #umbracoContext?: UmbDocumentWorkspaceContext;
    #modalContext?: UmbModalManagerContext;
    #notificationContext?: UmbNotificationContext;

    @property()
    title = "Approved comments"

    @state()
    comments?: CommentSchema[];

    @property()
    nodeId?: string;

    constructor() {
        super();

        this.consumeContext(COMMENTS_CONTEXT, (_instance) => {
            this.#commentsContext = _instance;

            this.observe(_instance.approvedComments, (_comments: CommentSchema[]) => {
                this.comments = _comments
            });
        });

        this.consumeContext(UMB_WORKSPACE_CONTEXT, (_instance) => {
            this.#umbracoContext = _instance as UmbDocumentWorkspaceContext;

            this.#umbracoContext.unique.subscribe((value: string) => {
                this.nodeId = value;
            })
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
            this.getApprovedComments();
        }
    }

    async getApprovedComments() {
        if (this.nodeId !== undefined)
        {
            await this.#commentsContext?.getApprovedComments(this.nodeId);
        }
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
            await this.getApprovedComments();

            const data: UmbNotificationDefaultData = {
                headline: `Trashed`,
                message: `The comment has been moved to the Discussions Recycle Bin.`
            };
            await this.#notificationContext?.peek("positive", { data });
        });
    }

    render() {
        return html`
            <umb-body-layout>
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
                                </div>
                                <div class="comment">
                                    <p class="comment__message">${comment.message}</p>
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
                gap: 3rem;
                flex-direction: column;
            }

            .comment__message {
                margin: 0;
            }
        `
    ];
}

export default ApprovedCommentsWorkspaceElement;

declare global {
	interface HTMLElementTagNameMap {
		'approvedcomments-workspace-view': ApprovedCommentsWorkspaceElement
	}
}