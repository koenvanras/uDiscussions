using uDiscussions.Core.Models;

namespace uDiscussions.Core.Services
{
    public interface IDocumentTypeSettingsService
    {
        /// <summary>
        /// Get uDiscussions settings from the provided document
        /// </summary>
        /// <param name="documentType"></param>
        /// <returns>The setting</returns>
        DocumentTypeSettingsSchema? GetSettings(Guid documentType);

        /// <summary>
        /// Create or update a doctype setting
        /// </summary>
        /// <param name="documentTypeSettings"></param>
        /// <returns>The saved setting</returns>
        DocumentTypeSettingsSchema SaveSettings(DocumentTypeSettingsSchema documentTypeSettings);
    }
}
