import { UmbElementMixin as g } from "@umbraco-cms/backoffice/element-api";
import { LitElement as _, html as b, property as E, state as y, customElement as f } from "@umbraco-cms/backoffice/external/lit";
import { DOCUMENTTYPE_SETTINGS_CONTEXT as T } from "./documenttypesettings.context-GaBIPoHK.js";
var D = Object.defineProperty, S = Object.getOwnPropertyDescriptor, d = (t) => {
  throw TypeError(t);
}, i = (t, e, a, r) => {
  for (var s = r > 1 ? void 0 : r ? S(e, a) : e, p = t.length - 1, l; p >= 0; p--)
    (l = t[p]) && (s = (r ? l(e, a, s) : l(s)) || s);
  return r && s && D(e, a, s), s;
}, u = (t, e, a) => e.has(t) || d("Cannot " + a), c = (t, e, a) => (u(t, e, "read from private field"), e.get(t)), h = (t, e, a) => e.has(t) ? d("Cannot add the same private member more than once") : e instanceof WeakSet ? e.add(t) : e.set(t, a), C = (t, e, a, r) => (u(t, e, "write to private field"), e.set(t, a), a), w = (t, e, a) => (u(t, e, "access private method"), a), o, m, v;
let n = class extends g(_) {
  constructor() {
    super(), h(this, m), h(this, o), this.title = "DocumentType Settings", this.propertyValueData = [], this.consumeContext(T, (t) => {
      C(this, o, t), this.observe(t.documentTypeSettings, (e) => {
        this.settings = e;
      });
    });
  }
  connectedCallback() {
    super.connectedCallback(), c(this, o) && this.getDocumentTypeSettings();
  }
  async getDocumentTypeSettings() {
    var t, e;
    await ((t = c(this, o)) == null ? void 0 : t.getDocumentTypeSettings()), this.propertyValueData = [
      {
        alias: "commentsEnabled",
        value: (e = this.settings) == null ? void 0 : e.commentsEnabled
      }
    ];
  }
  async setDocumentTypeSettings(t) {
    var e, a;
    await ((e = c(this, o)) == null ? void 0 : e.setCommentsEnabled(t)), this.propertyValueData = [
      {
        alias: "commentsEnabled",
        value: (a = this.settings) == null ? void 0 : a.commentsEnabled
      }
    ];
  }
  render() {
    return b`
            <umb-body-layout>
                <uui-box>
                    <div slot="headline">Settings</div>
                    <umb-property-dataset .value=${this.propertyValueData} @change=${w(this, m, v)}>
                        <umb-property 
                            alias='commentsEnabled'
                            label='Comments enabled'
                            description='Check this box if you want to enable comments for all pages of this document type'
                            property-editor-ui-alias='Umb.PropertyEditorUi.Toggle'
                            val>
                        </umb-property>
                    </umb-property-dataset>
                </uui-box>
            </umb-body-layout>
        `;
  }
};
o = /* @__PURE__ */ new WeakMap();
m = /* @__PURE__ */ new WeakSet();
v = function(t) {
  t.target.value.forEach((a) => {
    switch (a.alias) {
      case "commentsEnabled":
        this.setDocumentTypeSettings(a.value);
        break;
    }
  });
};
i([
  E()
], n.prototype, "title", 2);
i([
  y()
], n.prototype, "settings", 2);
i([
  y()
], n.prototype, "propertyValueData", 2);
n = i([
  f("documenttype-settings-root")
], n);
const P = n;
export {
  n as DocumentTypeSettingsWorkspaceElement,
  P as default
};
//# sourceMappingURL=documenttypesettings.element-CpUk9MJN.js.map
