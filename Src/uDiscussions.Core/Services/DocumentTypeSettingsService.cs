using Microsoft.Extensions.Logging;
using uDiscussions.Core.Models;
using Umbraco.Cms.Infrastructure.Scoping;

namespace uDiscussions.Core.Services
{
    public class DocumentTypeSettingsService : IDocumentTypeSettingsService
    {
        private readonly ILogger<DocumentTypeSettingsService> _logger;
        private readonly IScopeProvider _scopeProvider;

        public DocumentTypeSettingsService(ILogger<DocumentTypeSettingsService> logger, IScopeProvider scopeProvider)
        {
            _logger = logger;
            _scopeProvider = scopeProvider;
        }

        /// <inheritdoc/>
        public DocumentTypeSettingsSchema? GetSettings(Guid documentType)
        {
            using (var scope = _scopeProvider.CreateScope())
            {
                var result = scope.Database.Query<DocumentTypeSettingsSchema>()?
                    .Where(c => c.DocumentType == documentType)?
                    .FirstOrDefault();

                if (result != null)
                {
                    return result;
                }
            }

            return null;
        }

        /// <inheritdoc/>
        public DocumentTypeSettingsSchema? SaveSettings(DocumentTypeSettingsSchema documentTypeSettings)
        {
            var existingSettings = GetSettings(documentTypeSettings.DocumentType);
            var success = false;
            if (existingSettings == null)
            {
                using (var scope = _scopeProvider.CreateScope())
                {
                    scope.Database.Insert(documentTypeSettings);
                    success = scope.Complete();
                }
            }
            else
            {
                using (var scope = _scopeProvider.CreateScope())
                {
                    scope.Database.Update(documentTypeSettings, existingSettings!.Id);
                    success = scope.Complete();
                }
            }
                
            if (success)
            {
                return documentTypeSettings;
            }

            return null;
        }
    }
}
