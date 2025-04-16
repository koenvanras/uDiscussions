
﻿import { UmbControllerBase } from "@umbraco-cms/backoffice/class-api";
import { UmbControllerHostElement } from "@umbraco-cms/backoffice/controller-api";
import { UmbContextToken } from "@umbraco-cms/backoffice/context-api";
import { UmbObjectState } from "@umbraco-cms/backoffice/observable-api";
import { DocumentTypeSettingsSchema } from "../../api";
import { DocumentTypeSettingsRespository } from "../../repository/documenttypesettings.repository";
import { UMB_ACTION_EVENT_CONTEXT, UmbActionEventContext } from "@umbraco-cms/backoffice/action";
import { UmbWorkspaceContext } from "@umbraco-cms/backoffice/workspace";
import { DOCUMENTTYPE_SETTINGS_ENTITY, DOCUMENTTYPE_SETTINGS_WORKSPACE_ALIAS } from "../manifest";
import { UMB_DOCUMENT_TYPE_WORKSPACE_CONTEXT } from "@umbraco-cms/backoffice/document-type";

export class DocumentTypeSettingsContext extends UmbControllerBase implements UmbWorkspaceContext {
    public readonly workspaceAlias: string = DOCUMENTTYPE_SETTINGS_WORKSPACE_ALIAS;
    
    #repository: DocumentTypeSettingsRespository;
    #actionEventContext?: UmbActionEventContext;

    #documentTypeSettings = new UmbObjectState<DocumentTypeSettingsSchema | undefined>(undefined);
    public readonly documentTypeSettings = this.#documentTypeSettings.asObservable();

    #documentType: string = "";

    constructor(host:UmbControllerHostElement) {
        super(host);

        this.provideContext(DOCUMENTTYPE_SETTINGS_CONTEXT, this);
        this.#repository = new DocumentTypeSettingsRespository(this);

        this.consumeContext(UMB_ACTION_EVENT_CONTEXT, (_instance) => {
            if (this.#actionEventContext) {
                return;
            }
            this.#actionEventContext = _instance;
        });

        this.consumeContext(UMB_DOCUMENT_TYPE_WORKSPACE_CONTEXT, (_instance) => {
            _instance.unique.subscribe((value: string) => {
                this.#documentType = value.toString();
            });
        });
    }
    
    async getDocumentTypeSettings() {
        if (this.#documentType) {
            const { data } = await this.#repository.getDocumentTypeSettings(this.#documentType);

            if (data) {
                this.#documentTypeSettings.setValue(data);
            } else {
                this.#documentTypeSettings.setValue(undefined);
            }
        }
    }

    async setCommentsEnabled(enabled: boolean) {
        this.#actionEventContext?.addEventListener("document.save", this.#save);
        const data = this.#documentTypeSettings.getValue();

        if (data) {
            this.#documentTypeSettings.setValue({
                id: data.id,
                documentType: data.documentType,
                commentsEnabled: enabled
            });
        } else {
            this.#documentTypeSettings.setValue({
                id: 0,
                documentType: this.#documentType,
                commentsEnabled: enabled
            });
        }
    }

    #save = () => {
        this.save();
    }

    public save() {
        var settings = this.#documentTypeSettings.getValue();

        if (settings) {
            this.#repository?.setDocumentTypeSettings(settings);
        }
    }

    getEntityType(): string {
        return DOCUMENTTYPE_SETTINGS_ENTITY;
    }
}

export default DocumentTypeSettingsContext;

export const DOCUMENTTYPE_SETTINGS_CONTEXT = 
    new UmbContextToken<DocumentTypeSettingsContext>(DocumentTypeSettingsContext.name);
