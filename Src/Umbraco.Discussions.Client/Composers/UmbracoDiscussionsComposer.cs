using Microsoft.Extensions.DependencyInjection;
using Umbraco.Cms.Core.Composing;
using Umbraco.Cms.Core.DependencyInjection;
using Umbraco.Discussions.Client.Configuration;

namespace Umbraco.Discussions.Client.Composers
{
    internal class UmbracoDiscussionsComposer : IComposer
    {
        public void Compose(IUmbracoBuilder builder)
        {
            builder.Services.ConfigureOptions<ConfigureSwaggerGenOptions>();
        }
    }
}
