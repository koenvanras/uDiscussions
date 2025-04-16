import { UmbElementMixin as g } from "@umbraco-cms/backoffice/element-api";
import { LitElement as w, html as C, css as M, property as f, state as x, customElement as A } from "@umbraco-cms/backoffice/external/lit";
import { C as O } from "./index-DDlCX0jV.js";
import { UMB_WORKSPACE_CONTEXT as E } from "@umbraco-cms/backoffice/workspace";
import { UMB_MODAL_MANAGER_CONTEXT as b, UMB_CONFIRM_MODAL as k } from "@umbraco-cms/backoffice/modal";
import { UMB_NOTIFICATION_CONTEXT as N } from "@umbraco-cms/backoffice/notification";
var W = Object.defineProperty, I = Object.getOwnPropertyDescriptor, y = (e) => {
  throw TypeError(e);
}, u = (e, t, o, i) => {
  for (var s = i > 1 ? void 0 : i ? I(t, o) : t, r = e.length - 1, v; r >= 0; r--)
    (v = e[r]) && (s = (i ? v(t, o, s) : v(s)) || s);
  return i && s && W(t, o, s), s;
}, T = (e, t, o) => t.has(e) || y("Cannot " + o), a = (e, t, o) => (T(e, t, "read from private field"), o ? o.call(e) : t.get(e)), p = (e, t, o) => t.has(e) ? y("Cannot add the same private member more than once") : t instanceof WeakSet ? t.add(e) : t.set(e, o), c = (e, t, o, i) => (T(e, t, "write to private field"), t.set(e, o), o), m, d, h, l, _;
let n = class extends g(w) {
  constructor() {
    super(), p(this, m), p(this, d), p(this, h), p(this, l), this.title = "Approved comments", p(this, _, (e) => async () => {
      var o;
      const t = (o = a(this, h)) == null ? void 0 : o.open(this, k, {
        data: {
          headline: "Trash",
          content: "Are you sure you want to move the comment to the Discussions Recycle Bin?",
          confirmLabel: "Trash",
          color: "danger"
        }
      });
      t == null || t.onSubmit().then(async () => {
        var s, r;
        await ((s = a(this, m)) == null ? void 0 : s.trashComment(e.id)), await this.getApprovedComments();
        const i = {
          headline: "Trashed",
          message: "The comment has been moved to the Discussions Recycle Bin."
        };
        await ((r = a(this, l)) == null ? void 0 : r.peek("positive", { data: i }));
      });
    }), this.consumeContext(O, (e) => {
      c(this, m, e), this.observe(e.approvedComments, (t) => {
        this.comments = t;
      });
    }), this.consumeContext(E, (e) => {
      c(this, d, e), a(this, d).unique.subscribe((t) => {
        this.nodeId = t;
      });
    }), this.consumeContext(b, (e) => {
      c(this, h, e);
    }), this.consumeContext(N, (e) => {
      c(this, l, e);
    });
  }
  connectedCallback() {
    super.connectedCallback(), a(this, m) != null && this.getApprovedComments();
  }
  async getApprovedComments() {
    var e;
    this.nodeId !== void 0 && await ((e = a(this, m)) == null ? void 0 : e.getApprovedComments(this.nodeId));
  }
  render() {
    var e;
    return C`
            <umb-body-layout>
                <div class="comments">
                    ${(e = this.comments) == null ? void 0 : e.map((t) => C`
                            <uui-box>
                                <div slot="headline">${t.author}</div>
                                <div slot="header">${t.date}</div>
                                <div slot="header-actions">
                                    <uui-button pristine label="Delete" look="primary" color="danger" @click=${a(this, _).call(this, t)}>
                                        <uui-icon name="delete"></uui-icon>
                                    </uui-button>
                                </div>
                                <div class="comment">
                                    <p class="comment__message">${t.message}</p>
                                </div>
                            </uui-box>
                        `)}
                </div>
            </umb-body-layout>
        `;
  }
};
m = /* @__PURE__ */ new WeakMap();
d = /* @__PURE__ */ new WeakMap();
h = /* @__PURE__ */ new WeakMap();
l = /* @__PURE__ */ new WeakMap();
_ = /* @__PURE__ */ new WeakMap();
n.styles = [
  M`
            .comments {
                display: grid;
                grid-gap: 2rem;
                grid-template-columns: repeat(3, 1fr);
            }

            .comment {
                display: flex;
                gap: 3rem;
                flex-direction: column;
            }

            .comment__message {
                margin: 0;
            }
        `
];
u([
  f()
], n.prototype, "title", 2);
u([
  x()
], n.prototype, "comments", 2);
u([
  f()
], n.prototype, "nodeId", 2);
n = u([
  A("approvedcomments-workspace-view")
], n);
const U = n;
export {
  n as ApprovedCommentsWorkspaceElement,
  U as default
};
//# sourceMappingURL=approvedcomments.element-D-X28bSs.js.map
