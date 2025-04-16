import { ManifestSection } from '@umbraco-cms/backoffice/extension-registry';

export const DISCUSSIONS_SECTION_ALIAS = 'uDiscussions.Section';

const sections : Array<ManifestSection> = [
    {
        type: 'section',
        alias: DISCUSSIONS_SECTION_ALIAS,
        name : 'Discussions Section',
        weight: 10,
        meta : {
            label : 'Discussions',
            pathname : 'discussions'
        }
    },
];

export const manifests = [
    ...sections
];