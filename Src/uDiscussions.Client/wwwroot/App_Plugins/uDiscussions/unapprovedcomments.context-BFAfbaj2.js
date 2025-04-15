import { UmbControllerBase as e } from "@umbraco-cms/backoffice/class-api";
import { UmbContextToken as o } from "@umbraco-cms/backoffice/context-api";
import { U as r, a as s } from "./index-DDlCX0jV.js";
class n extends e {
  constructor(t) {
    super(t), this.workspaceAlias = r, this.provideContext(a, this);
  }
  getEntityType() {
    return s;
  }
}
const a = new o(
  n.name
);
export {
  n as UnapprovedCommentsWorkspaceContext,
  a as WORKSPACE_CONTEXT,
  n as default
};
//# sourceMappingURL=unapprovedcomments.context-BFAfbaj2.js.map
