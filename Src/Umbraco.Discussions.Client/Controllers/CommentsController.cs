using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Umbraco.Cms.Api.Common.Attributes;
using Umbraco.Cms.Api.Common.Filters;
using Umbraco.Cms.Core;
using Umbraco.Cms.Web.Common.Authorization;
using Umbraco.Discussions.Core.Models;
using Umbraco.Discussions.Core.Services;

namespace Umbraco.Discussions.Client.Controllers
{
    [ApiController]
    [MapToApi("umbraco-discussions")]
    [Authorize(Policy = AuthorizationPolicies.BackOfficeAccess)]
    [JsonOptionsName(Constants.JsonOptionsNames.BackOffice)]
    [ApiExplorerSettings(GroupName = "Commments")]
    public class CommentsController : Controller
    {
        private readonly ICommentService _commentService;

        public CommentsController(ICommentService commentService)
        {
            _commentService = commentService;
        }

        [HttpGet("comment/{id}")]
        [ProducesResponseType(typeof(CommentSchema), StatusCodes.Status200OK)]
        public IActionResult GetComment(int id)
        {
            var result = _commentService.GetComment(id);
            return Ok(result);
        }

        [HttpGet("comments")]
        [ProducesResponseType(typeof(IEnumerable<CommentSchema>), StatusCodes.Status200OK)]
        public IActionResult GetComments()
        {
            var result = _commentService.GetComments();
            return Ok(result);
        }

        [HttpGet("comments/{contentkey}")]
        [ProducesResponseType(typeof(IEnumerable<CommentSchema>), StatusCodes.Status200OK)]
        public IActionResult GetComments(Guid contentkey)
        {
            var result = _commentService.GetComments(contentkey);
            return Ok(result);
        }

        [HttpGet("comments/{contentkey}/approved")]
        [ProducesResponseType(typeof(IEnumerable<CommentSchema>), StatusCodes.Status200OK)]
        public IActionResult GetApprovedComments(Guid contentkey)
        {
            var result = _commentService.GetApprovedComments(contentkey)?
                .OrderBy(comment => comment.Date);
            return Ok(result);
        }

        [HttpGet("comments/{contentkey}/unapproved")]
        [ProducesResponseType(typeof(IEnumerable<CommentSchema>), StatusCodes.Status200OK)]
        public IActionResult GetUnapprovedComments(Guid contentkey)
        {
            var result = _commentService.GetUnapprovedComments(contentkey);
            return Ok(result);
        }

        [HttpGet("comments/trashed")]
        [ProducesResponseType(typeof(IEnumerable<CommentSchema>), StatusCodes.Status200OK)]
        public IActionResult GetTrashedComments()
        {
            var result = _commentService.GetTrashedComments();
            return Ok(result);
        }

        [HttpGet("comments/trashed/count")]
        [ProducesResponseType(typeof(int), StatusCodes.Status200OK)]
        public IActionResult GetTrashedCommentsCount()
        {
            var result = _commentService.GetTrashedComments()?.Count();
            return Ok(result);
        }

        [HttpGet("comments/count")]
        [ProducesResponseType(typeof(int), StatusCodes.Status200OK)]
        public IActionResult GetCommentsCount()
        {
            var result = _commentService.GetComments()?.Count();
            return Ok(result);
        }

        [HttpGet("comments/{contentkey}/count")]
        [ProducesResponseType(typeof(int), StatusCodes.Status200OK)]
        public IActionResult GetCommentsCount(Guid contentkey)
        {
            var result = _commentService.GetComments(contentkey)?.Count();
            return Ok(result);
        }

        [HttpGet("comments/{contentkey}/approved/count")]
        [ProducesResponseType(typeof(int), StatusCodes.Status200OK)]
        public IActionResult GetApprovedCommentsCount(Guid contentkey)
        {
            var result = _commentService.GetApprovedComments(contentkey)?.Count();
            return Ok(result);
        }

        [HttpGet("comments/unapproved")]
        [ProducesResponseType(typeof(IEnumerable<CommentSchema>), StatusCodes.Status200OK)]
        public IActionResult GetUnapprovedComments()
        {
            var result = _commentService.GetUnapprovedComments();
            return Ok(result);
        }

        [HttpGet("comments/unapproved/count")]
        [ProducesResponseType(typeof(int), StatusCodes.Status200OK)]
        public IActionResult GetUnapprovedCommentsCount()
        {
            var result = _commentService.GetUnapprovedComments()?.Count();
            return Ok(result);
        }

        [HttpPost("/comments")]
        [ProducesResponseType(typeof(bool), StatusCodes.Status200OK)]
        public IActionResult CreateComment(CommentSchema comment)
        {
            var result = _commentService.CreateComment(comment);
            return Ok(result);
        }

        [HttpPatch("/comments/{id}/approve")]
        [ProducesResponseType(typeof(bool), StatusCodes.Status200OK)]
        public IActionResult ApproveComment(int id)
        {
            var result = _commentService.ApproveComment(id);
            return Ok(result);
        }

        [HttpPatch("/comments/{id}/trash")]
        [ProducesResponseType(typeof(bool), StatusCodes.Status200OK)]
        public IActionResult TrashComment(int id)
        {
            var result = _commentService.TrashComment(id);
            return Ok(result);
        }

        [HttpPatch("/comments/{id}/restore")]
        [ProducesResponseType(typeof(bool), StatusCodes.Status200OK)]
        public IActionResult RestoreComment(int id)
        {
            var result = _commentService.RestoreComment(id);
            return Ok(result);
        }

        [HttpDelete("/comments/{id}/delete")]
        [ProducesResponseType(typeof(bool), StatusCodes.Status200OK)]
        public IActionResult DeleteComment(int id)
        {
            var result = _commentService.DeleteComment(id);
            return Ok(result);
        }
    }
}
