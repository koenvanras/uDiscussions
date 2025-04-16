using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Options;
using Microsoft.OpenApi.Models;
using Swashbuckle.AspNetCore.SwaggerGen;

namespace uDiscussions.Client.Swagger
{
    public class ConfigureSwaggerGenOptions : IConfigureOptions<SwaggerGenOptions>
    {
        public void Configure(SwaggerGenOptions options)
        {
            options.SwaggerDoc(
                "udiscussions",
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