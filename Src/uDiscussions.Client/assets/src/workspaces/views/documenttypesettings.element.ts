import { UmbElementMixin } from '@umbraco-cms/backoffice/element-api';
import { LitElement, html, customElement, property, state } from '@umbraco-cms/backoffice/external/lit';
import { DOCUMENTTYPE_SETTINGS_CONTEXT, DocumentTypeSettingsContext } from './documenttypesettings.context';
import { DocumentTypeSettingsSchema } from '../../api';
import { UmbPropertyDatasetElement, UmbPropertyValueData } from '@umbraco-cms/backoffice/property';

@customElement('documenttype-settings-root')
export class DocumentTypeSettingsWorkspaceElement extends UmbElementMixin(LitElement) {
    #documentTypeSettingsContext?: DocumentTypeSettingsContext;

    @property()
    title = "DocumentType Settings";

    @state()
    settings?: DocumentTypeSettingsSchema;

    @state()
    propertyValueData?: UmbPropertyValueData[] = [];

    constructor() {
        super();

        this.consumeContext(DOCUMENTTYPE_SETTINGS_CONTEXT, (_instance) => {
            this.#documentTypeSettingsContext = _instance;

            this.observe(_instance.documentTypeSettings, (_settings: DocumentTypeSettingsSchema) => {
                this.settings = _settings;
            });
        });
    }

    connectedCallback(): void {
        super.connectedCallback();

        if (this.#documentTypeSettingsContext) {
            this.getDocumentTypeSettings();
        }
    }

    async getDocumentTypeSettings() {
        await this.#documentTypeSettingsContext?.getDocumentTypeSettings();

        this.propertyValueData = [
            {
                alias: 'commentsEnabled',
                value: this.settings?.commentsEnabled
            }
        ]
    }

    async setDocumentTypeSettings(enabled: boolean) {
        await this.#documentTypeSettingsContext?.setCommentsEnabled(enabled);

        this.propertyValueData = [
            {
                alias: 'commentsEnabled',
                value: this.settings?.commentsEnabled
            }
        ];
    }

    #onDataChange(e: Event) {
        const value = (e.target as UmbPropertyDatasetElement).value;
        value.forEach((item) => {
            switch(item.alias){
                case 'commentsEnabled':
                    this.setDocumentTypeSettings(item.value as boolean);
                    break;
            }
        });
    }

    render() {
        return html`
            <umb-body-layout>
                <uui-box>
                    <div slot="headline">Settings</div>
                    <umb-property-dataset .value=${this.propertyValueData!} @change=${this.#onDataChange}>
                        <umb-property 
                            alias='commentsEnabled'
                            label='Comments enabled'
                            description='Check this box if you want to enable comments for all pages of this document type'
                            property-editor-ui-alias='Umb.PropertyEditorUi.Toggle'
                            val>
                        </umb-property>
                    </umb-property-dataset>
                </uui-box>
            </umb-body-layout>
        `
    }
}

export default DocumentTypeSettingsWorkspaceElement;

declare global {
    interface HTMLElementTagNameMap {
        'documenttype-settings-root': DocumentTypeSettingsWorkspaceElement
    }
}