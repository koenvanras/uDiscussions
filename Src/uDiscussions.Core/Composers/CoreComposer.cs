using Microsoft.Extensions.DependencyInjection;
using uDiscussions.Core.Services;
using Umbraco.Cms.Core.Composing;
using Umbraco.Cms.Core.DependencyInjection;

namespace uDiscussions.Core.Composers
{
    public class CoreComposer : IComposer
    {
        public void Compose(IUmbracoBuilder builder)
        {
            builder.Services.AddTransient<ICommentService, CommentService>();
            builder.Services.AddTransient<ILikeService, LikeService>();
            builder.Services.AddTransient<IDocumentTypeSettingsService, DocumentTypeSettingsService>();
        }
    }
}
