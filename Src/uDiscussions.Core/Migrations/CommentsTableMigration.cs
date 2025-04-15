using Microsoft.Extensions.Logging;
using uDiscussions.Core.Models;
using Umbraco.Cms.Infrastructure.Migrations;

namespace uDiscussions.Core.Migrations
{
    class CommentsTableMigration : MigrationBase
    {
        public static string MigrationStepAlias = "AddCommentsTable";

        private static string _tableName = "uDiscussionsComments";

        private static ILogger<CommentsTableMigration> _logger;
        
        public CommentsTableMigration(IMigrationContext context, ILogger<CommentsTableMigration> logger) : base(context)
        {
            _logger = logger;
        }

        protected override void Migrate()
        {
            _logger.LogDebug("Running migration {MigrationStep}", MigrationStepAlias);

            if (!TableExists(_tableName))
            {
                Create.Table<CommentSchema>().Do();
            }
            else
            {
                _logger.LogDebug("The database table {DbTable} already exists, skipping.", _tableName);
            }
        }
    }
}
