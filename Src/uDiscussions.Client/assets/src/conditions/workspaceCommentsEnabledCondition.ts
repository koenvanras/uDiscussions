
import { UmbControllerHost } from "@umbraco-cms/backoffice/controller-api";
import { UmbConditionConfigBase, UmbConditionControllerArguments, UmbExtensionCondition } from "@umbraco-cms/backoffice/extension-api";
import { UmbConditionBase } from "@umbraco-cms/backoffice/extension-registry";
import { DocumentTypeSettingsRespository } from "../repository/documenttypesettings.repository";
import { UMB_DOCUMENT_WORKSPACE_CONTEXT } from "@umbraco-cms/backoffice/document";

export type WorkspaceCommentsEnabledConditionConfig = UmbConditionConfigBase;

export class WorkspaceCommentsEnabledCondition extends UmbConditionBase<WorkspaceCommentsEnabledConditionConfig> implements UmbExtensionCondition {
    #repository: DocumentTypeSettingsRespository = new DocumentTypeSettingsRespository(this);

    constructor(host: UmbControllerHost, args: UmbConditionControllerArguments<WorkspaceCommentsEnabledConditionConfig>) {
        super(host, args);

        this.consumeContext(UMB_DOCUMENT_WORKSPACE_CONTEXT, (_instance) => {
            _instance.contentTypeUnique.subscribe((value: string | undefined) => {
                if (!value) {
                    return;
                }

                this.#repository.getDocumentTypeSettings(value).then((response) => {
                    this.permitted = response.data?.commentsEnabled ?? false;
                });
            });
        });
    }
}

export default WorkspaceCommentsEnabledCondition;
