import { ManifestSectionSidebarApp, ManifestMenu, ManifestMenuItem } from '@umbraco-cms/backoffice/extension-registry';
import { UNAPPROVEDCOMMENTS_ENTITY, TRASHEDCOMMENTS_ENTITY } from '../workspaces/manifest';
import { DISCUSSIONS_SECTION_ALIAS } from '../sections/manifest';

export const DISCUSSIONS_MENU_COMMENTS_ALIAS = 'uDiscussions.Menu.Comments';

const sidebarApps : Array<ManifestSectionSidebarApp> = [
    {
        type: 'sectionSidebarApp',
        kind: 'menuWithEntityActions',
        alias: 'uDiscussions.Sidebar.Comments',
        name : 'Discussions Sidebar Comments',
        meta : {
            label : 'Comments',
            menu : DISCUSSIONS_MENU_COMMENTS_ALIAS
        },
        conditions: [
            {
                alias: 'Umb.Condition.SectionAlias',
                match: DISCUSSIONS_SECTION_ALIAS
            }
        ]
    }
];

const menus : Array<ManifestMenu> = [
    {
        type: 'menu',
        alias: DISCUSSIONS_MENU_COMMENTS_ALIAS,
        name: 'Menu Comments',
        meta: {
            label: 'Comments'
        }
    }
];

export const menuItems : Array<ManifestMenuItem> = [
    {
        type: 'menuItem',
        alias: 'uDiscussions.MenuItem.Comments.UnapprovedComments',
        name: 'Unapproved Comments',
        meta: {
            label: 'Unapproved Comments',
            icon: 'icon-chat',
            entityType: UNAPPROVEDCOMMENTS_ENTITY,
            menus: [
                DISCUSSIONS_MENU_COMMENTS_ALIAS
            ]
        }
    },
    {
        type: 'menuItem',
        alias: 'uDiscussions.MenuItem.Comments.RemovedComments',
        name: 'Recycle Bin',
        meta: {
            label: 'Recycle Bin',
            icon: 'icon-remove',
            entityType: TRASHEDCOMMENTS_ENTITY,
            menus: [
                DISCUSSIONS_MENU_COMMENTS_ALIAS
            ]
        }
    }
];

export const manifests = [
    ...sidebarApps,
    ...menus,
    ...menuItems
];