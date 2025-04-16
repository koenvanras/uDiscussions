import type { ManifestDashboard } from '@umbraco-cms/backoffice/extension-registry';
import { DISCUSSIONS_SECTION_ALIAS } from '../sections/manifest';

import StatisticsDashboard from './statistics.element';

export const STATISTICS_DASHBOARD_ALIAS = "uDiscussions.Dashboard.Statistics";

const dashboards: Array<ManifestDashboard> = [
    {
        type: 'dashboard',
        name: 'Statistics Dashboard',
        alias: STATISTICS_DASHBOARD_ALIAS,
        element: StatisticsDashboard,
        weight: -10,
        meta: {
            label: 'Statistics',
            pathname: 'statistics-dashboard'
        },
        conditions: [
            {
                alias: 'Umb.Condition.SectionAlias',
                match: DISCUSSIONS_SECTION_ALIAS
            }
        ]
    }
];

export const manifests = [
    ...dashboards
];