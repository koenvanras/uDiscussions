using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Umbraco.Cms.Api.Common.Attributes;
using Umbraco.Cms.Api.Common.Filters;
using Umbraco.Cms.Core;
using Umbraco.Cms.Web.Common.Authorization;
using uDiscussions.Core.Models;
using uDiscussions.Core.Services;

namespace uDiscussions.Client.Controllers
{
    [ApiController]
    [MapToApi("udiscussions")]
    [Authorize(Policy = AuthorizationPolicies.BackOfficeAccess)]
    [JsonOptionsName(Constants.JsonOptionsNames.BackOffice)]
    [ApiExplorerSettings(GroupName = "DocumentType Settings")]
    public class DocumentTypeSettingsController : Controller
    {
        private readonly IDocumentTypeSettingsService _documentTypeSettingsService;

        public DocumentTypeSettingsController(IDocumentTypeSettingsService documentTypeSettingsService)
        {
            _documentTypeSettingsService = documentTypeSettingsService;
        }

        [HttpGet("/documenttypesettings/{documentType}")]
        [ProducesResponseType(typeof(DocumentTypeSettingsSchema), StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public IActionResult Get(Guid documentType)
        {
            var result = _documentTypeSettingsService.GetSettings(documentType);
            if (result != null)
            {
                return Ok(result);

            }

            return Ok(null);
        }

        [HttpPost("/documenttypesettings")]
        [ProducesResponseType(typeof(DocumentTypeSettingsSchema), StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public IActionResult Create(DocumentTypeSettingsSchema documentTypeSettings)
        {
            var result = _documentTypeSettingsService.SaveSettings(documentTypeSettings);
            if (result != null)
            {
                return Ok(result);

            }

            return BadRequest();
        }
    }
}
