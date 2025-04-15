using Microsoft.Extensions.DependencyInjection;
using Umbraco.Cms.Core.Composing;
using Umbraco.Cms.Core.DependencyInjection;
using Umbraco.Discussions.Core.Services;
using Umbraco.Discussions.Core.Services.Implementation;

namespace Umbraco.Discussions.Core.Composers
{
    public class UmbracoDiscussionsComposer : IComposer
    {
        public void Compose(IUmbracoBuilder builder)
        {
            builder.Services.AddTransient<ICommentService, CommentService>();
            builder.Services.AddTransient<ILikeService, LikeService>();
        }
    }
}
