using Microsoft.Extensions.Logging;
using uDiscussions.Core.Models;
using Umbraco.Cms.Infrastructure.Migrations;

namespace uDiscussions.Core.Migrations
{
    class LikesTableMigration : MigrationBase
    {
        public static string MigrationStepAlias = "AddLikesTable";

        private static string _tableName = "uDiscussionsLikes";

        private static ILogger<LikesTableMigration> _logger;
        
        public LikesTableMigration(IMigrationContext context, ILogger<LikesTableMigration> logger) : base(context)
        {
            _logger = logger;
        }

        protected override void Migrate()
        {
            _logger.LogDebug("Running migration {MigrationStep}", MigrationStepAlias);

            if (!TableExists(_tableName))
            {
                Create.Table<LikeSchema>().Do();
            }
            else
            {
                _logger.LogDebug("The database table {DbTable} already exists, skipping.", _tableName);
            }
        }
    }
}
