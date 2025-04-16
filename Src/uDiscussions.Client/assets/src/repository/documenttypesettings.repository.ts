import { UmbControllerBase } from "@umbraco-cms/backoffice/class-api";
import { UmbControllerHost } from "@umbraco-cms/backoffice/controller-api";
import { DocumentTypeSettingsDataSource } from "./sources/documenttypesettings.datasource";
import { DocumentTypeSettingsSchema } from "../api";

export class DocumentTypeSettingsRespository extends UmbControllerBase {
    #commentsSettingsDataSource: DocumentTypeSettingsDataSource;

    constructor(host: UmbControllerHost) {
        super(host);
        this.#commentsSettingsDataSource = new DocumentTypeSettingsDataSource(this);
    }

    async getDocumentTypeSettings(documentType: string) {
        return this.#commentsSettingsDataSource.getDocumentTypeSettings(documentType);
    }

    async setDocumentTypeSettings(settings: DocumentTypeSettingsSchema) {
        return this.#commentsSettingsDataSource.setDocumentTypeSettings(settings);
    }
}