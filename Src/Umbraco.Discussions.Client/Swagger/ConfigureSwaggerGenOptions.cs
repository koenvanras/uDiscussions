using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Options;
using Microsoft.OpenApi.Models;
using Swashbuckle.AspNetCore.SwaggerGen;
using Umbraco.Discussions.Client.Swagger;

namespace Umbraco.Discussions.Client.Configuration
{
    public class ConfigureSwaggerGenOptions : IConfigureOptions<SwaggerGenOptions>
    {
        public void Configure(SwaggerGenOptions options)
        {
            options.SwaggerDoc(
                "umbraco-discussions",
                new OpenApiInfo
                {
                    Title = "Umbraco Discussions API",
                    Version = "Latest"
                }
            );

            options.OperationFilter<BackOfficeSecurityRequirementsOperationFilter>();
        }
    }
}