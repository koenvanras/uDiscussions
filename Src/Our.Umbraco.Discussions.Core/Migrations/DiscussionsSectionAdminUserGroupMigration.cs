using Microsoft.Extensions.Logging;
using Umbraco.Cms.Core.Services;
using Umbraco.Cms.Infrastructure.Migrations;
using static Umbraco.Cms.Core.Constants;

namespace Umbraco.Discussions.Core.Migrations
{
    class DiscussionsSectionAdminUserGroupMigration : MigrationBase
    {
        public static string MigrationStepAlias = "AddDiscussionsUserGroup";

        private readonly string _sectionName = "Umbraco.Discussions.Section";

        private readonly ILogger<DiscussionsSectionAdminUserGroupMigration> _logger;
        private readonly IUserGroupService _userGroupService;
        
        public DiscussionsSectionAdminUserGroupMigration(
            IMigrationContext context,
            ILogger<DiscussionsSectionAdminUserGroupMigration> logger,
            IUserGroupService userGroupService) : base(context)
        {
            _logger = logger;
            _userGroupService = userGroupService;
        }

        protected override void Migrate()
        {
            _logger.LogDebug("Running migration {MigrationStep}", MigrationStepAlias);

            var userGroup = _userGroupService.GetAsync(Security.AdminGroupAlias).Result;

            if (userGroup != null && !userGroup.AllowedSections.Contains(_sectionName))
            {
                userGroup.AddAllowedSection(_sectionName);
                var result = _userGroupService.UpdateAsync(userGroup, Security.SuperUserKey).Result;

                if (!result.Success)
                {
                    _logger.LogError(result.Exception, "Error updating the User Group.");
                }
            }
            else
            {
                _logger.LogDebug("Couldn't assign section {Section} to the Admin user group, skipping.", _sectionName);
            }
        }
    }
}
