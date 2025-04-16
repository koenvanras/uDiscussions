using Microsoft.Extensions.DependencyInjection;
using uDiscussions.Client.Swagger;
using Umbraco.Cms.Core.Composing;
using Umbraco.Cms.Core.DependencyInjection;

namespace uDiscussions.Client.Composers
{
    internal class ClientComposer : IComposer
    {
        public void Compose(IUmbracoBuilder builder)
        {
            builder.Services.ConfigureOptions<ConfigureSwaggerGenOptions>();
        }
    }
}
