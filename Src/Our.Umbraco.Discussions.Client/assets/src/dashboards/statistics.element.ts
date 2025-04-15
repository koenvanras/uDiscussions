import { UmbElementMixin } from "@umbraco-cms/backoffice/element-api";
import { LitElement, html, css, customElement, property, state } from '@umbraco-cms/backoffice/external/lit';
import { CommentsRespository } from "../repository/comments.repository";

@customElement('statistics-dashboard')
export class StatisticsDashboard extends UmbElementMixin(LitElement) {
    #commentsRepository? : CommentsRespository;

    @property()
    title = "Statistics"

    @state()
    commentsCount?: number;

    @state()
    unapprovedCommentsCount?: number;

    @state()
    trashedCommentsCount?: number;

    constructor() {
        super();

        this.#commentsRepository = new CommentsRespository(this);
    }

    connectedCallback(): void {
        super.connectedCallback();

        if (this.#commentsRepository)
        {
            this.#commentsRepository.getCommentsCount().then((response) => {
                this.commentsCount = response.data;
            });

            this.#commentsRepository.getUnapprovedCommentsCount().then((response) => {
                this.unapprovedCommentsCount = response.data;
            });

            this.#commentsRepository.getTrashedCommentsCount().then((response) => {
                this.trashedCommentsCount = response.data;
            });
        }
    }

    render() {
        return html`
            <umb-body-layout headline=${this.title}>
                <div class="statistics">
                    <uui-box>
                        <div slot="headline" class="statistics__header">Total Comments</div>
                        <div class="statistics__item">
                            <span class="statistics__item__number">${this.commentsCount ?? 0}</span>
                        </div>
                        <span>Trashed comments are ignored in this statistic</span>
                    </uui-box>
                    <uui-box>
                        <div slot="headline" class="statistics__header">Unapproved comments</div>
                        <div class="statistics__item">
                            <span class="statistics__item__number statistics__item__number--warning">${this.unapprovedCommentsCount ?? 0}</span>
                        </div>
                    </uui-box>
                    <uui-box>
                        <div slot="headline" class="statistics__header">Trashed comments</span></div>
                        <div class="statistics__item">
                            <span class="statistics__item__number statistics__item__number--danger">${this.trashedCommentsCount ?? 0}</span>
                        </div>
                    </uui-box>
                </div>
            </umb-body-layout>
        `
    }

    static override styles = [
        css`
			.statistics {
                display: grid;
                grid-gap: 2rem;
                grid-template-columns: repeat(6, 1fr);
            }

            .statistics__item {
                display: flex;
                flex-direction: column;
                align-items: center;
                padding: 2rem;
            }

            .statistics__item__number {
                font-size: 3rem;
                font-weight: 700;
            }

            .statistics__item__number--positive {
                color: var(--uui-color-positive);
            }

            .statistics__item__number--warning {
                color: var(--uui-color-warning);
            }

            .statistics__item__number--danger {
                color: var(--uui-color-danger);
            }
		`,
    ];

}

export default StatisticsDashboard;

declare global {
    interface HTMLElementTagNameMap {
        'statistics-dashboard': StatisticsDashboard;
    }
}