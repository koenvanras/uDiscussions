import { UmbControllerHost } from "@umbraco-cms/backoffice/controller-api";
import { UmbDataSourceResponse  } from "@umbraco-cms/backoffice/repository";
import { tryExecuteAndNotify } from '@umbraco-cms/backoffice/resources';
import { DocumentTypeSettingsSchema, DocumentTypeSettingsService } from "../../api";


export interface IDocumentTypeSettingsDataSource {
    getDocumentTypeSettings(documentType: string): Promise<UmbDataSourceResponse<DocumentTypeSettingsSchema>>
    setDocumentTypeSettings(settings: DocumentTypeSettingsSchema): Promise<UmbDataSourceResponse<DocumentTypeSettingsSchema>>
}

export class DocumentTypeSettingsDataSource implements IDocumentTypeSettingsDataSource {
    #host: UmbControllerHost;

    constructor(host: UmbControllerHost) {
        this.#host = host;
    }

    async getDocumentTypeSettings(documentType: string): Promise<UmbDataSourceResponse<DocumentTypeSettingsSchema>> {
        return await tryExecuteAndNotify(this.#host, DocumentTypeSettingsService.getDocumenttypesettingsByDocumentType({ documentType }));
    }

    async setDocumentTypeSettings(settings: DocumentTypeSettingsSchema): Promise<UmbDataSourceResponse<DocumentTypeSettingsSchema>> {
        return await tryExecuteAndNotify(this.#host, DocumentTypeSettingsService.postDocumenttypesettings({ requestBody: settings }));
    }
}