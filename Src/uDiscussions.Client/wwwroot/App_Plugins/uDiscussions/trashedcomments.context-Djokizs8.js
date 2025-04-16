import { UmbControllerBase as e } from "@umbraco-cms/backoffice/class-api";
import { UmbContextToken as o } from "@umbraco-cms/backoffice/context-api";
import { T as r, b as s } from "./index-DDlCX0jV.js";
class n extends e {
  constructor(t) {
    super(t), this.workspaceAlias = r, this.provideContext(T, this);
  }
  getEntityType() {
    return s;
  }
}
const T = new o(
  n.name
);
export {
  n as TrashedCommentsWorkspaceContext,
  T as WORKSPACE_CONTEXT,
  n as default
};
//# sourceMappingURL=trashedcomments.context-Djokizs8.js.map
