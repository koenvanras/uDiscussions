import { UmbEntryPointOnInit } from '@umbraco-cms/backoffice/extension-api';
import { manifests as dashboardsManifest } from './dashboards/manifest';
import { manifests as sectionsManifest } from './sections/manifest';
import { manifests as sidebarsManifest } from './sidebars/manifest';
import { manifests as workspacesManifest } from './workspaces/manifest';
import { manifests as contextsManifest } from './contexts/manifest';

import { UMB_AUTH_CONTEXT } from '@umbraco-cms/backoffice/auth';
import { OpenAPI } from './api/index.ts';

export const onInit: UmbEntryPointOnInit = (_host, extensionRegistry) => {

    extensionRegistry.registerMany([
        ...contextsManifest,
        ...sectionsManifest,
        ...dashboardsManifest,
        ...sidebarsManifest,
        ...workspacesManifest
    ]);

    _host.consumeContext(UMB_AUTH_CONTEXT, (_auth) => {
        const umbOpenApi = _auth.getOpenApiConfiguration();
        OpenAPI.TOKEN = umbOpenApi.token;
        OpenAPI.BASE = umbOpenApi.base;
        OpenAPI.WITH_CREDENTIALS = umbOpenApi.withCredentials;
    });
}