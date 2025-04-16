import { ManifestGlobalContext } from "@umbraco-cms/backoffice/extension-registry";

const contexts : Array<ManifestGlobalContext> = [
    {
        type: 'globalContext',
        alias: 'Comments.Context',
        name: 'Comments Context',
        js: () => import('./comments.context.ts')
    }
]

export const manifests = [
    ...contexts
];