var E = (e) => {
  throw TypeError(e);
};
var p = (e, i, t) => i.has(e) || E("Cannot " + t);
var s = (e, i, t) => (p(e, i, "read from private field"), t ? t.call(e) : i.get(e)), m = (e, i, t) => i.has(e) ? E("Cannot add the same private member more than once") : i instanceof WeakSet ? i.add(e) : i.set(e, t), a = (e, i, t, n) => (p(e, i, "write to private field"), n ? n.call(e, t) : i.set(e, t), t);
import { UmbControllerBase as d } from "@umbraco-cms/backoffice/class-api";
import { UmbContextToken as C } from "@umbraco-cms/backoffice/context-api";
import { UmbObjectState as S } from "@umbraco-cms/backoffice/observable-api";
import { D as y, c as l, d as g } from "./index-CXh1neh-.js";
import { UMB_ACTION_EVENT_CONTEXT as _ } from "@umbraco-cms/backoffice/action";
import { UMB_DOCUMENT_TYPE_WORKSPACE_CONTEXT as N } from "@umbraco-cms/backoffice/document-type";
var r, c, o, T, h;
class f extends d {
  constructor(t) {
    super(t);
    m(this, r);
    m(this, c);
    m(this, o);
    m(this, T);
    m(this, h);
    this.workspaceAlias = y, a(this, o, new S(void 0)), this.documentTypeSettings = s(this, o).asObservable(), a(this, T, ""), a(this, h, () => {
      this.save();
    }), this.provideContext(O, this), a(this, r, new l(this)), this.consumeContext(_, (n) => {
      s(this, c) || a(this, c, n);
    }), this.consumeContext(N, (n) => {
      n.unique.subscribe((u) => {
        a(this, T, u.toString());
      });
    });
  }
  async getDocumentTypeSettings() {
    if (s(this, T)) {
      const { data: t } = await s(this, r).getDocumentTypeSettings(s(this, T));
      t ? s(this, o).setValue(t) : s(this, o).setValue(void 0);
    }
  }
  async setCommentsEnabled(t) {
    var u;
    (u = s(this, c)) == null || u.addEventListener("document.save", s(this, h));
    const n = s(this, o).getValue();
    n ? s(this, o).setValue({
      id: n.id,
      documentType: n.documentType,
      commentsEnabled: t
    }) : s(this, o).setValue({
      id: 0,
      documentType: s(this, T),
      commentsEnabled: t
    });
  }
  save() {
    var n;
    var t = s(this, o).getValue();
    t && ((n = s(this, r)) == null || n.setDocumentTypeSettings(t));
  }
  getEntityType() {
    return g;
  }
}
r = new WeakMap(), c = new WeakMap(), o = new WeakMap(), T = new WeakMap(), h = new WeakMap();
const O = new C(f.name);
export {
  O as DOCUMENTTYPE_SETTINGS_CONTEXT,
  f as DocumentTypeSettingsContext,
  f as default
};
//# sourceMappingURL=documenttypesettings.context-GaBIPoHK.js.map
