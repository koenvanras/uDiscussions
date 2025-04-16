using uDiscussions.Core.Models;

namespace uDiscussions.Core.Services
{
    public interface ICommentService
    {
        /// <summary>
        /// Get a comment by id
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        CommentSchema? GetComment(int id);

        /// <summary>
        /// Get a list of all comments
        /// </summary>
        /// <returns>A list of comments</returns>
        IEnumerable<CommentSchema>? GetComments();

        /// <summary>
        /// Get a list of all comments related to a content item
        /// </summary>
        /// <param name="contentKey"></param>
        /// <returns>A list of comments</returns>
        IEnumerable<CommentSchema>? GetComments(Guid contentKey);

        /// <summary>
        /// Get a list of all approved comments related to a content item
        /// </summary>
        /// <param name="contentKey"></param>
        /// <returns>A list of comments</returns>
        IEnumerable<CommentSchema>? GetApprovedComments(Guid contentKey);

        /// <summary>
        /// Get a list of all unapproved comments
        /// </summary>
        /// <returns>A list of comments</returns>
        IEnumerable<CommentSchema>? GetUnapprovedComments();

        /// <summary>
        /// Get a list of all unapproved comments related to a content item
        /// </summary>
        /// <param name="contentKey"></param>
        /// <returns>A list of comments</returns>
        IEnumerable<CommentSchema>? GetUnapprovedComments(Guid contentKey);

        /// <summary>
        /// Get a list of all comments where the IsRemoved property is true
        /// </summary>
        /// <returns></returns>
        IEnumerable<CommentSchema>? GetTrashedComments();

        /// <summary>
        /// Add a new comment to a content item
        /// </summary>
        /// <param name="item"></param>
        /// <returns>True if success, false if failed</returns>
        bool CreateComment(CommentSchema item);

        /// <summary>
        /// Approve a comment
        /// </summary>
        /// <param name="id"></param>
        /// <returns>True if success, false if failed</returns>
        bool ApproveComment(int id);

        /// <summary>
        /// Set the comment IsRemoved property to true
        /// </summary>
        /// <param name="id"></param>
        /// <returns>True if success, false if failed</returns>
        bool TrashComment(int id);

        /// <summary>
        /// Set the comment IsRemoved property to false
        /// </summary>
        /// <param name="id"></param>
        /// <returns>True if success, false if failed</returns>
        bool RestoreComment(int id);

        /// <summary>
        /// Delete a comment by id
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        bool DeleteComment(int id);
    }
}
