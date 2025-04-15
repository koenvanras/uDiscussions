using Microsoft.Extensions.Logging;
using uDiscussions.Core.Models;
using uDiscussions.Core.Services;
using Umbraco.Cms.Infrastructure.Scoping;

namespace uDiscussions.Core.Services.Implementation
{
    public class CommentService : ICommentService
    {
        private readonly ILogger<CommentService> _logger;
        private readonly IScopeProvider _scopeProvider;

        public CommentService(ILogger<CommentService> logger, IScopeProvider scopeProvider)
        {
            _logger = logger;
            _scopeProvider = scopeProvider;
        }

        /// <inheritdoc/>
        public CommentSchema? GetComment(int id)
        {
            using (var scope = _scopeProvider.CreateScope())
            {
                var result = scope.Database.Query<CommentSchema>()?
                    .Where(c => c.Id == id)?
                    .FirstOrDefault();

                if (result != null)
                {
                    return result;
                }
            }

            return null;
        }

        /// <inheritdoc/>
        public IEnumerable<CommentSchema>? GetComments()
        {
            using (var scope = _scopeProvider.CreateScope())
            {
                var result = scope.Database.Query<CommentSchema>()?
                    .Where(c => !c.Trashed)?
                    .ToList();

                if (result?.Any() == true)
                {
                    return result;
                }
            }

            return null;
        }

        /// <inheritdoc/>
        public IEnumerable<CommentSchema>? GetComments(Guid contentKey)
        {
            var result = GetComments()?
                        .Where(c => c.ContentKey == contentKey).ToList();

            if (result?.Any() == true)
            {
                return result;
            }

            return null;
        }

        /// <inheritdoc/>
        public IEnumerable<CommentSchema>? GetApprovedComments(Guid contentKey)
        {
            var result = GetComments(contentKey)?
                        .Where(c => c.Approved)?
                        .ToList();

            if (result?.Any() == true)
            {
                return result;
            }

            return null;
        }

        /// <inheritdoc/>
        public IEnumerable<CommentSchema>? GetUnapprovedComments()
        {
            var result = GetComments()?
                        .Where(c => !c.Approved)?
                        .ToList();

            if (result?.Any() == true)
            {
                return result;
            }

            return null;
        }

        /// <inheritdoc/>
        public IEnumerable<CommentSchema>? GetUnapprovedComments(Guid contentKey)
        {
            var result = GetUnapprovedComments()?
                        .Where(c => c.ContentKey == contentKey).ToList();

            if (result?.Any() == true)
            {
                return result;
            }

            return null;
        }

        /// <inheritdoc/>
        public IEnumerable<CommentSchema>? GetTrashedComments()
        {
            using (var scope = _scopeProvider.CreateScope())
            {
                var result = scope.Database.Query<CommentSchema>()?
                    .Where(c => c.Trashed)?
                    .ToList();

                if (result?.Any() == true)
                {
                    return result;
                }
            }

            return null;
        }

        /// <inheritdoc/>
        public bool CreateComment(CommentSchema item)
        {
            try
            {
                using (var scope = _scopeProvider.CreateScope())
                {
                    scope.Database.Insert(item);
                    return scope.Complete();
                }
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, ex.Message);
                return default;
            }
        }

        /// <inheritdoc/>
        public bool ApproveComment(int id)
        {
            var comment = GetComment(id);

            if (comment != null)
            {
                using (var scope = _scopeProvider.CreateScope())
                {
                    comment.Approved = true;
                    scope.Database.Update(comment);
                    return scope.Complete();
                }
            }

            return default;
        }

        /// <inheritdoc/>
        public bool TrashComment(int id)
        {
            var comment = GetComment(id);

            if (comment != null)
            {
                using (var scope = _scopeProvider.CreateScope())
                {
                    comment.Trashed = true;
                    scope.Database.Update(comment, id);
                    var result = scope.Complete();

                    return result;
                }
            }

            return default;
        }

        /// <inheritdoc/>
        public bool RestoreComment(int id)
        {
            var comment = GetComment(id);

            if (comment != null)
            {
                using (var scope = _scopeProvider.CreateScope())
                {
                    comment.Trashed = false;
                    scope.Database.Update(comment, id);
                    var result = scope.Complete();

                    return result;
                }
            }

            return default;
        }

        /// <inheritdoc/>
        public bool DeleteComment(int id)
        {
            var comment = GetComment(id);

            if (comment != null)
            {
                using (var scope = _scopeProvider.CreateScope())
                {
                    scope.Database.Delete(comment);
                    var result = scope.Complete();

                    return result;
                }
            }

            return default;
        }
    }
}
