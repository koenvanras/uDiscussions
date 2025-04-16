var s = (t) => {
  throw TypeError(t);
};
var i = (t, n, e) => n.has(t) || s("Cannot " + e);
var a = (t, n, e) => (i(t, n, "read from private field"), e ? e.call(t) : n.get(t)), m = (t, n, e) => n.has(t) ? s("Cannot add the same private member more than once") : n instanceof WeakSet ? n.add(t) : n.set(t, e), r = (t, n, e, o) => (i(t, n, "write to private field"), o ? o.call(t, e) : n.set(t, e), e);
import { UmbWorkspaceActionBase as u, UmbSubmitWorkspaceAction as p } from "@umbraco-cms/backoffice/workspace";
import { UMB_ACTION_EVENT_CONTEXT as x } from "@umbraco-cms/backoffice/action";
var c;
class E extends u {
  constructor(e, o) {
    super(e, o);
    m(this, c);
    r(this, c, new p(e, o));
  }
  async execute() {
    await a(this, c).execute(), (await this.getContext(x)).dispatchEvent(new Event("document.save"));
  }
}
c = new WeakMap();
export {
  E as default
};
//# sourceMappingURL=savedocumentaction-apJsNJzU.js.map
