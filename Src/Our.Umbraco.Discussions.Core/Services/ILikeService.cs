using Umbraco.Discussions.Core.Models;

namespace Umbraco.Discussions.Core.Services
{
    public interface ILikeService
    {
        /// <summary>
        /// Get the data of a single like
        /// </summary>
        /// <param name="item"></param>
        /// <returns>The like entity</returns>
        LikeSchema? GetLike(LikeSchema item);

        /// <summary>
        /// Get a list of likes related to a comment
        /// </summary>
        /// <param name="comment"></param>
        /// <returns>A list of likes</returns>
        IEnumerable<LikeSchema> GetLikes(int comment);

        /// <summary>
        /// Add a like (based on user fingerprint) to a comment
        /// </summary>
        /// <param name="item"></param>
        /// <returns>The amount of likes remaining on a comment</returns>
        int AddLike(LikeSchema item);

        /// <summary>
        /// Remove a like (based on user fingerprint) from a comment
        /// </summary>
        /// <param name="item"></param>
        /// <returns>The amount of likes remaining on a comment</returns>
        int RemoveLike(LikeSchema item);
    }
}
