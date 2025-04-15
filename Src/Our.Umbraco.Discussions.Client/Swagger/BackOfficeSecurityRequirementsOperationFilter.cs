using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Umbraco.Cms.Api.Management.OpenApi;

namespace Umbraco.Discussions.Client.Swagger
{
    internal class BackOfficeSecurityRequirementsOperationFilter : BackOfficeSecurityRequirementsOperationFilterBase
    {
        protected override string ApiName => "umbraco-discussions";
    }
}
