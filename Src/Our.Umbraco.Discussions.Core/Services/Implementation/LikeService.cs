using Microsoft.Extensions.Logging;
using Umbraco.Cms.Infrastructure.Scoping;
using Umbraco.Discussions.Core.Models;
using Umbraco.Discussions.Core.Services;

namespace Umbraco.Discussions.Core.Services.Implementation
{
    public class LikeService : ILikeService
    {
        private readonly ILogger<LikeService> _logger;
        private readonly IScopeProvider _scopeProvider;
        public LikeService(ILogger<LikeService> logger, IScopeProvider scopeProvider)
        {
            _logger = logger;
            _scopeProvider = scopeProvider;
        }

        /// <inheritdoc/>
        public LikeSchema? GetLike(LikeSchema item)
        {
            try
            {
                using (var scope = _scopeProvider.CreateScope())
                {
                    var likes = scope.Database.Query<LikeSchema>()
                        .Where(l => l.CommentId == item.CommentId)
                        .Where(l => l.Fingerprint == item.Fingerprint).ToList();

                    if (likes.Count() > 0)
                    {
                        return likes.First();
                    }
                }
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, ex.Message);
                throw;
            }

            return null;
        }

        /// <inheritdoc/>
        public IEnumerable<LikeSchema> GetLikes(int comment)
        {
            var result = new List<LikeSchema>();

            try
            {
                using (var scope = _scopeProvider.CreateScope())
                {
                    result = scope.Database.Query<LikeSchema>()
                        .Where(l => l.CommentId == comment).ToList();
                }
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, ex.Message);
                throw;
            }

            return result;
        }

        /// <inheritdoc/>
        public int AddLike(LikeSchema item)
        {
            var result = 0;
            try
            {
                using (var scope = _scopeProvider.CreateScope())
                {
                    var likes = scope.Database.Query<LikeSchema>()
                        .Where(l => l.CommentId == item.CommentId).ToList();

                    result = likes.Count();

                    var like = likes
                        .Where(l => l.Fingerprint == item.Fingerprint)?
                        .FirstOrDefault();

                    if (like == null)
                    {
                        scope.Database.Insert(item);
                        if (scope.Complete())
                        {
                            result++;
                        }
                    }
                }
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, ex.Message);
                throw;
            }

            return result;
        }

        /// <inheritdoc/>
        public int RemoveLike(LikeSchema item)
        {
            var result = 0;
            try
            {
                using (var scope = _scopeProvider.CreateScope())
                {
                    var likes = scope.Database.Query<LikeSchema>()
                        .Where(l => l.CommentId == item.CommentId).ToList();

                    result = likes.Count();

                    var like = likes
                        .Where(l => l.Fingerprint == item.Fingerprint)?
                        .FirstOrDefault();

                    if (like != null)
                    {
                        scope.Database.Delete(like);
                        if (scope.Complete())
                        {
                            result--;
                        }
                    }
                }
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, ex.Message);
                throw;
            }

            return result;
        }
    }
}
