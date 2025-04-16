using Umbraco.Cms.Core.Packaging;

namespace uDiscussions.Core.Migrations
{
    internal class CoreMigrationPlan : PackageMigrationPlan
    {
        public CoreMigrationPlan() : base("Umbraco Discussions", "uDiscussions_Core_Migration")
        {
        }

        protected override void DefinePlan()
        {
            To<CreateDiscussionsUserGroupMigration>(CreateDiscussionsUserGroupMigration.MigrationStepAlias);
            To<DiscussionsSectionAdminUserGroupMigration>(DiscussionsSectionAdminUserGroupMigration.MigrationStepAlias);
            To<CommentsTableMigration>(CommentsTableMigration.MigrationStepAlias);
            To<LikesTableMigration>(LikesTableMigration.MigrationStepAlias);
            To<DocumentTypeSettingsTableMigration>(DocumentTypeSettingsTableMigration.MigrationStepAlias);
        }
    }
}
