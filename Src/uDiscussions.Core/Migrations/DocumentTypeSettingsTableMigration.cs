using Microsoft.Extensions.Logging;
using uDiscussions.Core.Models;
using Umbraco.Cms.Infrastructure.Migrations;

namespace uDiscussions.Core.Migrations
{
    class DocumentTypeSettingsTableMigration : MigrationBase
    {
        public static string MigrationStepAlias = "AddDocumentTypeSettingsTable";

        private static string _tableName = "uDiscussionsDocumentTypeSettings";

        private static ILogger<DocumentTypeSettingsTableMigration> _logger;
        
        public DocumentTypeSettingsTableMigration(IMigrationContext context, ILogger<DocumentTypeSettingsTableMigration> logger) : base(context)
        {
            _logger = logger;
        }

        protected override void Migrate()
        {
            _logger.LogDebug("Running migration {MigrationStep}", MigrationStepAlias);

            if (!TableExists(_tableName))
            {
                Create.Table<DocumentTypeSettingsSchema>().Do();
            }
            else
            {
                _logger.LogDebug("The database table {DbTable} already exists, skipping.", _tableName);
            }
        }
    }
}
