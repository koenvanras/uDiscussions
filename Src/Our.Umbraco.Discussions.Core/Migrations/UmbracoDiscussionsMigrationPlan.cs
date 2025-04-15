using Umbraco.Cms.Core.Packaging;

namespace Umbraco.Discussions.Core.Migrations
{
    internal class UmbracoDiscussionsMigrationPlan : PackageMigrationPlan
    {
        public UmbracoDiscussionsMigrationPlan() : base("Umbraco Discussions", "UmbracoDiscussions_Core_Migration")
        {
        }

        protected override void DefinePlan()
        {
            To<CreateDiscussionsUserGroupMigration>(CreateDiscussionsUserGroupMigration.MigrationStepAlias);
            To<DiscussionsSectionAdminUserGroupMigration>(DiscussionsSectionAdminUserGroupMigration.MigrationStepAlias);
            To<CommentsTableMigration>(CommentsTableMigration.MigrationStepAlias);
            To<LikesTableMigration>(LikesTableMigration.MigrationStepAlias);
        }
    }
}
