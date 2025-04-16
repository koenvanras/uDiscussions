using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Umbraco.Cms.Core.Models.Membership;
using Umbraco.Cms.Core.Services;
using Umbraco.Cms.Core.Strings;
using Umbraco.Cms.Infrastructure.Migrations;
using static Umbraco.Cms.Core.Constants;

namespace uDiscussions.Core.Migrations
{
    class CreateDiscussionsUserGroupMigration : MigrationBase
    {
        public static string MigrationStepAlias = "AddDiscussionsSectionToAdminUserGroup";

        private readonly string _userGroupAlias = "Discussions";
        private readonly string _sectionName = "uDiscussions.Section";

        private readonly ILogger<CreateDiscussionsUserGroupMigration> _logger;
        private readonly IUserGroupService _userGroupService;
        private readonly IShortStringHelper _shortStringHelper;

        public CreateDiscussionsUserGroupMigration(IMigrationContext context,
            ILogger<CreateDiscussionsUserGroupMigration> logger,
            IUserGroupService userGroupService,
            IShortStringHelper shortStringHelper) : base(context)
        {
            _logger = logger;
            _userGroupService = userGroupService;
            _shortStringHelper = shortStringHelper;
        }

        protected override void Migrate()
        {
            _logger.LogDebug("Running migration {MigrationStep}", MigrationStepAlias);

            var userGroupExists = _userGroupService.GetAsync(_userGroupAlias).Result;
            if (userGroupExists != null)
            {
                _logger.LogDebug("Couldn't create User Group {UserGroup}, skipping.", _userGroupAlias);
                return;
            }

            var userGroup = new UserGroup(_shortStringHelper)
            {
                Alias = _userGroupAlias,
                Name = _userGroupAlias,
                Icon = "icon-chat"
            };

            userGroup.AddAllowedSection(_sectionName);

            var result = _userGroupService.CreateAsync(userGroup, Security.SuperUserKey).Result;

            if (!result.Success)
            {
                _logger.LogError(result.Exception, "Error creating the User Group.");
            }
        }
    }
}
