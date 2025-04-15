var ue = (t) => {
  throw TypeError(t);
};
var he = (t, e, s) => e.has(t) || ue("Cannot " + s);
var i = (t, e, s) => (he(t, e, "read from private field"), s ? s.call(t) : e.get(t)), b = (t, e, s) => e.has(t) ? ue("Cannot add the same private member more than once") : e instanceof WeakSet ? e.add(t) : e.set(t, s), T = (t, e, s, o) => (he(t, e, "write to private field"), o ? o.call(t, s) : e.set(t, s), s);
import { UmbElementMixin as te } from "@umbraco-cms/backoffice/element-api";
import { LitElement as se, html as P, css as ne, property as oe, state as B, customElement as ae } from "@umbraco-cms/backoffice/external/lit";
import { UmbControllerBase as ve } from "@umbraco-cms/backoffice/class-api";
import { tryExecuteAndNotify as C } from "@umbraco-cms/backoffice/resources";
import { UmbContextToken as De } from "@umbraco-cms/backoffice/context-api";
import { UmbArrayState as F } from "@umbraco-cms/backoffice/observable-api";
import { UMB_MODAL_MANAGER_CONTEXT as _e, UMB_CONFIRM_MODAL as H } from "@umbraco-cms/backoffice/modal";
import { UMB_NOTIFICATION_CONTEXT as fe } from "@umbraco-cms/backoffice/notification";
import { UMB_AUTH_CONTEXT as $e } from "@umbraco-cms/backoffice/auth";
const re = "Umbraco.Discussions.Section", Ie = [
  {
    type: "section",
    alias: re,
    name: "Discussions Section",
    weight: 10,
    meta: {
      label: "Discussions",
      pathname: "discussions"
    }
  }
], Ne = [
  ...Ie
];
class Ce extends Error {
  constructor(e, s, o) {
    super(o), this.name = "ApiError", this.url = s.url, this.status = s.status, this.statusText = s.statusText, this.body = s.body, this.request = e;
  }
}
class Me extends Error {
  constructor(e) {
    super(e), this.name = "CancelError";
  }
  get isCancelled() {
    return !0;
  }
}
class Pe {
  constructor(e) {
    this._isResolved = !1, this._isRejected = !1, this._isCancelled = !1, this.cancelHandlers = [], this.promise = new Promise((s, o) => {
      this._resolve = s, this._reject = o;
      const n = (c) => {
        this._isResolved || this._isRejected || this._isCancelled || (this._isResolved = !0, this._resolve && this._resolve(c));
      }, a = (c) => {
        this._isResolved || this._isRejected || this._isCancelled || (this._isRejected = !0, this._reject && this._reject(c));
      }, r = (c) => {
        this._isResolved || this._isRejected || this._isCancelled || this.cancelHandlers.push(c);
      };
      return Object.defineProperty(r, "isResolved", {
        get: () => this._isResolved
      }), Object.defineProperty(r, "isRejected", {
        get: () => this._isRejected
      }), Object.defineProperty(r, "isCancelled", {
        get: () => this._isCancelled
      }), e(n, a, r);
    });
  }
  get [Symbol.toStringTag]() {
    return "Cancellable Promise";
  }
  then(e, s) {
    return this.promise.then(e, s);
  }
  catch(e) {
    return this.promise.catch(e);
  }
  finally(e) {
    return this.promise.finally(e);
  }
  cancel() {
    if (!(this._isResolved || this._isRejected || this._isCancelled)) {
      if (this._isCancelled = !0, this.cancelHandlers.length)
        try {
          for (const e of this.cancelHandlers)
            e();
        } catch (e) {
          console.warn("Cancellation threw an error", e);
          return;
        }
      this.cancelHandlers.length = 0, this._reject && this._reject(new Me("Request aborted"));
    }
  }
  get isCancelled() {
    return this._isCancelled;
  }
}
class ye {
  constructor() {
    this._fns = [];
  }
  eject(e) {
    const s = this._fns.indexOf(e);
    s !== -1 && (this._fns = [...this._fns.slice(0, s), ...this._fns.slice(s + 1)]);
  }
  use(e) {
    this._fns = [...this._fns, e];
  }
}
const m = {
  BASE: "",
  CREDENTIALS: "include",
  ENCODE_PATH: void 0,
  HEADERS: void 0,
  PASSWORD: void 0,
  TOKEN: void 0,
  USERNAME: void 0,
  VERSION: "Latest",
  WITH_CREDENTIALS: !1,
  interceptors: {
    request: new ye(),
    response: new ye()
  }
}, W = (t) => typeof t == "string", K = (t) => W(t) && t !== "", ie = (t) => t instanceof Blob, ge = (t) => t instanceof FormData, Be = (t) => {
  try {
    return btoa(t);
  } catch {
    return Buffer.from(t).toString("base64");
  }
}, We = (t) => {
  const e = [], s = (n, a) => {
    e.push(`${encodeURIComponent(n)}=${encodeURIComponent(String(a))}`);
  }, o = (n, a) => {
    a != null && (a instanceof Date ? s(n, a.toISOString()) : Array.isArray(a) ? a.forEach((r) => o(n, r)) : typeof a == "object" ? Object.entries(a).forEach(([r, c]) => o(`${n}[${r}]`, c)) : s(n, a));
  };
  return Object.entries(t).forEach(([n, a]) => o(n, a)), e.length ? `?${e.join("&")}` : "";
}, je = (t, e) => {
  const s = encodeURI, o = e.url.replace("{api-version}", t.VERSION).replace(/{(.*?)}/g, (a, r) => {
    var c;
    return (c = e.path) != null && c.hasOwnProperty(r) ? s(String(e.path[r])) : a;
  }), n = t.BASE + o;
  return e.query ? n + We(e.query) : n;
}, Le = (t) => {
  if (t.formData) {
    const e = new FormData(), s = (o, n) => {
      W(n) || ie(n) ? e.append(o, n) : e.append(o, JSON.stringify(n));
    };
    return Object.entries(t.formData).filter(([, o]) => o != null).forEach(([o, n]) => {
      Array.isArray(n) ? n.forEach((a) => s(o, a)) : s(o, n);
    }), e;
  }
}, L = async (t, e) => typeof e == "function" ? e(t) : e, qe = async (t, e) => {
  const [s, o, n, a] = await Promise.all([
    // @ts-ignore
    L(e, t.TOKEN),
    // @ts-ignore
    L(e, t.USERNAME),
    // @ts-ignore
    L(e, t.PASSWORD),
    // @ts-ignore
    L(e, t.HEADERS)
  ]), r = Object.entries({
    Accept: "application/json",
    ...a,
    ...e.headers
  }).filter(([, c]) => c != null).reduce((c, [f, u]) => ({
    ...c,
    [f]: String(u)
  }), {});
  if (K(s) && (r.Authorization = `Bearer ${s}`), K(o) && K(n)) {
    const c = Be(`${o}:${n}`);
    r.Authorization = `Basic ${c}`;
  }
  return e.body !== void 0 && (e.mediaType ? r["Content-Type"] = e.mediaType : ie(e.body) ? r["Content-Type"] = e.body.type || "application/octet-stream" : W(e.body) ? r["Content-Type"] = "text/plain" : ge(e.body) || (r["Content-Type"] = "application/json")), new Headers(r);
}, He = (t) => {
  var e, s;
  if (t.body !== void 0)
    return (e = t.mediaType) != null && e.includes("application/json") || (s = t.mediaType) != null && s.includes("+json") ? JSON.stringify(t.body) : W(t.body) || ie(t.body) || ge(t.body) ? t.body : JSON.stringify(t.body);
}, Ge = async (t, e, s, o, n, a, r) => {
  const c = new AbortController();
  let f = {
    headers: a,
    body: o ?? n,
    method: e.method,
    signal: c.signal
  };
  t.WITH_CREDENTIALS && (f.credentials = t.CREDENTIALS);
  for (const u of t.interceptors.request._fns)
    f = await u(f);
  return r(() => c.abort()), await fetch(s, f);
}, Ve = (t, e) => {
  if (e) {
    const s = t.headers.get(e);
    if (W(s))
      return s;
  }
}, Fe = async (t) => {
  if (t.status !== 204)
    try {
      const e = t.headers.get("Content-Type");
      if (e) {
        const s = ["application/octet-stream", "application/pdf", "application/zip", "audio/", "image/", "video/"];
        if (e.includes("application/json") || e.includes("+json"))
          return await t.json();
        if (s.some((o) => e.includes(o)))
          return await t.blob();
        if (e.includes("multipart/form-data"))
          return await t.formData();
        if (e.includes("text/"))
          return await t.text();
      }
    } catch (e) {
      console.error(e);
    }
}, Ke = (t, e) => {
  const o = {
    400: "Bad Request",
    401: "Unauthorized",
    402: "Payment Required",
    403: "Forbidden",
    404: "Not Found",
    405: "Method Not Allowed",
    406: "Not Acceptable",
    407: "Proxy Authentication Required",
    408: "Request Timeout",
    409: "Conflict",
    410: "Gone",
    411: "Length Required",
    412: "Precondition Failed",
    413: "Payload Too Large",
    414: "URI Too Long",
    415: "Unsupported Media Type",
    416: "Range Not Satisfiable",
    417: "Expectation Failed",
    418: "Im a teapot",
    421: "Misdirected Request",
    422: "Unprocessable Content",
    423: "Locked",
    424: "Failed Dependency",
    425: "Too Early",
    426: "Upgrade Required",
    428: "Precondition Required",
    429: "Too Many Requests",
    431: "Request Header Fields Too Large",
    451: "Unavailable For Legal Reasons",
    500: "Internal Server Error",
    501: "Not Implemented",
    502: "Bad Gateway",
    503: "Service Unavailable",
    504: "Gateway Timeout",
    505: "HTTP Version Not Supported",
    506: "Variant Also Negotiates",
    507: "Insufficient Storage",
    508: "Loop Detected",
    510: "Not Extended",
    511: "Network Authentication Required",
    ...t.errors
  }[e.status];
  if (o)
    throw new Ce(t, e, o);
  if (!e.ok) {
    const n = e.status ?? "unknown", a = e.statusText ?? "unknown", r = (() => {
      try {
        return JSON.stringify(e.body, null, 2);
      } catch {
        return;
      }
    })();
    throw new Ce(
      t,
      e,
      `Generic Error: status: ${n}; status text: ${a}; body: ${r}`
    );
  }
}, d = (t, e) => new Pe(async (s, o, n) => {
  try {
    const a = je(t, e), r = Le(e), c = He(e), f = await qe(t, e);
    if (!n.isCancelled) {
      let u = await Ge(t, e, a, c, r, f, n);
      for (const Oe of t.interceptors.response._fns)
        u = await Oe(u);
      const de = await Fe(u), xe = Ve(u, e.responseHeader);
      let pe = de;
      e.responseTransformer && u.ok && (pe = await e.responseTransformer(de));
      const le = {
        url: a,
        ok: u.ok,
        status: u.status,
        statusText: u.statusText,
        body: xe ?? pe
      };
      Ke(e, le), s(le.body);
    }
  } catch (a) {
    o(a);
  }
});
class y {
  /**
   * @param data The data for the request.
   * @param data.id
   * @returns unknown OK
   * @throws ApiError
   */
  static getCommentById(e) {
    return d(m, {
      method: "GET",
      url: "/comment/{id}",
      path: {
        id: e.id
      }
    });
  }
  /**
   * @param data The data for the request.
   * @param data.requestBody
   * @returns boolean OK
   * @throws ApiError
   */
  static postComments(e = {}) {
    return d(m, {
      method: "POST",
      url: "/comments",
      body: e.requestBody,
      mediaType: "application/json"
    });
  }
  /**
   * @returns unknown OK
   * @throws ApiError
   */
  static getComments() {
    return d(m, {
      method: "GET",
      url: "/comments"
    });
  }
  /**
   * @param data The data for the request.
   * @param data.contentkey
   * @returns unknown OK
   * @throws ApiError
   */
  static getCommentsByContentkey(e) {
    return d(m, {
      method: "GET",
      url: "/comments/{contentkey}",
      path: {
        contentkey: e.contentkey
      }
    });
  }
  /**
   * @param data The data for the request.
   * @param data.contentkey
   * @returns unknown OK
   * @throws ApiError
   */
  static getCommentsByContentkeyApproved(e) {
    return d(m, {
      method: "GET",
      url: "/comments/{contentkey}/approved",
      path: {
        contentkey: e.contentkey
      }
    });
  }
  /**
   * @param data The data for the request.
   * @param data.contentkey
   * @returns number OK
   * @throws ApiError
   */
  static getCommentsByContentkeyApprovedCount(e) {
    return d(m, {
      method: "GET",
      url: "/comments/{contentkey}/approved/count",
      path: {
        contentkey: e.contentkey
      }
    });
  }
  /**
   * @param data The data for the request.
   * @param data.contentkey
   * @returns number OK
   * @throws ApiError
   */
  static getCommentsByContentkeyCount(e) {
    return d(m, {
      method: "GET",
      url: "/comments/{contentkey}/count",
      path: {
        contentkey: e.contentkey
      }
    });
  }
  /**
   * @param data The data for the request.
   * @param data.contentkey
   * @returns unknown OK
   * @throws ApiError
   */
  static getCommentsByContentkeyUnapproved(e) {
    return d(m, {
      method: "GET",
      url: "/comments/{contentkey}/unapproved",
      path: {
        contentkey: e.contentkey
      }
    });
  }
  /**
   * @param data The data for the request.
   * @param data.id
   * @returns boolean OK
   * @throws ApiError
   */
  static patchCommentsByIdApprove(e) {
    return d(m, {
      method: "PATCH",
      url: "/comments/{id}/approve",
      path: {
        id: e.id
      }
    });
  }
  /**
   * @param data The data for the request.
   * @param data.id
   * @returns boolean OK
   * @throws ApiError
   */
  static deleteCommentsByIdDelete(e) {
    return d(m, {
      method: "DELETE",
      url: "/comments/{id}/delete",
      path: {
        id: e.id
      }
    });
  }
  /**
   * @param data The data for the request.
   * @param data.id
   * @returns boolean OK
   * @throws ApiError
   */
  static patchCommentsByIdRestore(e) {
    return d(m, {
      method: "PATCH",
      url: "/comments/{id}/restore",
      path: {
        id: e.id
      }
    });
  }
  /**
   * @param data The data for the request.
   * @param data.id
   * @returns boolean OK
   * @throws ApiError
   */
  static patchCommentsByIdTrash(e) {
    return d(m, {
      method: "PATCH",
      url: "/comments/{id}/trash",
      path: {
        id: e.id
      }
    });
  }
  /**
   * @returns number OK
   * @throws ApiError
   */
  static getCommentsCount() {
    return d(m, {
      method: "GET",
      url: "/comments/count"
    });
  }
  /**
   * @returns unknown OK
   * @throws ApiError
   */
  static getCommentsTrashed() {
    return d(m, {
      method: "GET",
      url: "/comments/trashed"
    });
  }
  /**
   * @returns number OK
   * @throws ApiError
   */
  static getCommentsTrashedCount() {
    return d(m, {
      method: "GET",
      url: "/comments/trashed/count"
    });
  }
  /**
   * @returns unknown OK
   * @throws ApiError
   */
  static getCommentsUnapproved() {
    return d(m, {
      method: "GET",
      url: "/comments/unapproved"
    });
  }
  /**
   * @returns number OK
   * @throws ApiError
   */
  static getCommentsUnapprovedCount() {
    return d(m, {
      method: "GET",
      url: "/comments/unapproved/count"
    });
  }
}
var p;
class ze {
  constructor(e) {
    b(this, p);
    T(this, p, e);
  }
  async getCommentsCount() {
    return await C(i(this, p), y.getCommentsCount());
  }
  async getApprovedComments(e) {
    return await C(i(this, p), y.getCommentsByContentkeyApproved({ contentkey: e }));
  }
  async getUnapprovedComments() {
    return await C(i(this, p), y.getCommentsUnapproved());
  }
  async getUnapprovedCommentsCount() {
    return await C(i(this, p), y.getCommentsUnapprovedCount());
  }
  async getTrashedComments() {
    return await C(i(this, p), y.getCommentsTrashed());
  }
  async getTrashedCommentsCount() {
    return await C(i(this, p), y.getCommentsTrashedCount());
  }
  async approveComment(e) {
    return await C(i(this, p), y.patchCommentsByIdApprove({ id: e }));
  }
  async trashComment(e) {
    return await C(i(this, p), y.patchCommentsByIdTrash({ id: e }));
  }
  async restoreComment(e) {
    return await C(i(this, p), y.patchCommentsByIdRestore({ id: e }));
  }
  async deleteComment(e) {
    return await C(i(this, p), y.deleteCommentsByIdDelete({ id: e }));
  }
}
p = new WeakMap();
var l;
class be extends ve {
  constructor(s) {
    super(s);
    b(this, l);
    T(this, l, new ze(this));
  }
  async getCommentsCount() {
    return i(this, l).getCommentsCount();
  }
  async getApprovedComments(s) {
    return i(this, l).getApprovedComments(s);
  }
  async getUnapprovedComments() {
    return i(this, l).getUnapprovedComments();
  }
  async getUnapprovedCommentsCount() {
    return i(this, l).getUnapprovedCommentsCount();
  }
  async getTrashedComments() {
    return i(this, l).getTrashedComments();
  }
  async getTrashedCommentsCount() {
    return i(this, l).getTrashedCommentsCount();
  }
  async approveComment(s) {
    return i(this, l).approveComment(s);
  }
  async trashComment(s) {
    return i(this, l).trashComment(s);
  }
  async restoreComment(s) {
    return i(this, l).restoreComment(s);
  }
  async deleteComment(s) {
    return i(this, l).deleteComment(s);
  }
}
l = new WeakMap();
var Je = Object.defineProperty, Xe = Object.getOwnPropertyDescriptor, Te = (t) => {
  throw TypeError(t);
}, j = (t, e, s, o) => {
  for (var n = o > 1 ? void 0 : o ? Xe(e, s) : e, a = t.length - 1, r; a >= 0; a--)
    (r = t[a]) && (n = (o ? r(e, s, n) : r(n)) || n);
  return o && n && Je(e, s, n), n;
}, we = (t, e, s) => e.has(t) || Te("Cannot " + s), q = (t, e, s) => (we(t, e, "read from private field"), e.get(t)), Ye = (t, e, s) => e.has(t) ? Te("Cannot add the same private member more than once") : e instanceof WeakSet ? e.add(t) : e.set(t, s), Qe = (t, e, s, o) => (we(t, e, "write to private field"), e.set(t, s), s), w;
let g = class extends te(se) {
  constructor() {
    super(), Ye(this, w), this.title = "Statistics", Qe(this, w, new be(this));
  }
  connectedCallback() {
    super.connectedCallback(), q(this, w) && (q(this, w).getCommentsCount().then((t) => {
      this.commentsCount = t.data;
    }), q(this, w).getUnapprovedCommentsCount().then((t) => {
      this.unapprovedCommentsCount = t.data;
    }), q(this, w).getTrashedCommentsCount().then((t) => {
      this.trashedCommentsCount = t.data;
    }));
  }
  render() {
    return P`
            <umb-body-layout headline=${this.title}>
                <div class="statistics">
                    <uui-box>
                        <div slot="headline" class="statistics__header">Total Comments</div>
                        <div class="statistics__item">
                            <span class="statistics__item__number">${this.commentsCount ?? 0}</span>
                        </div>
                        <span>Trashed comments are ignored in this statistic</span>
                    </uui-box>
                    <uui-box>
                        <div slot="headline" class="statistics__header">Unapproved comments</div>
                        <div class="statistics__item">
                            <span class="statistics__item__number statistics__item__number--warning">${this.unapprovedCommentsCount ?? 0}</span>
                        </div>
                    </uui-box>
                    <uui-box>
                        <div slot="headline" class="statistics__header">Trashed comments</span></div>
                        <div class="statistics__item">
                            <span class="statistics__item__number statistics__item__number--danger">${this.trashedCommentsCount ?? 0}</span>
                        </div>
                    </uui-box>
                </div>
            </umb-body-layout>
        `;
  }
};
w = /* @__PURE__ */ new WeakMap();
g.styles = [
  ne`
			.statistics {
                display: grid;
                grid-gap: 2rem;
                grid-template-columns: repeat(6, 1fr);
            }

            .statistics__item {
                display: flex;
                flex-direction: column;
                align-items: center;
                padding: 2rem;
            }

            .statistics__item__number {
                font-size: 3rem;
                font-weight: 700;
            }

            .statistics__item__number--positive {
                color: var(--uui-color-positive);
            }

            .statistics__item__number--warning {
                color: var(--uui-color-warning);
            }

            .statistics__item__number--danger {
                color: var(--uui-color-danger);
            }
		`
];
j([
  oe()
], g.prototype, "title", 2);
j([
  B()
], g.prototype, "commentsCount", 2);
j([
  B()
], g.prototype, "unapprovedCommentsCount", 2);
j([
  B()
], g.prototype, "trashedCommentsCount", 2);
g = j([
  ae("statistics-dashboard")
], g);
const Ze = g, et = "Umbraco.Discussions.Dashboard.Statistics", tt = [
  {
    type: "dashboard",
    name: "Statistics Dashboard",
    alias: et,
    element: Ze,
    weight: -10,
    meta: {
      label: "Statistics",
      pathname: "statistics-dashboard"
    },
    conditions: [
      {
        alias: "Umb.Condition.SectionAlias",
        match: re
      }
    ]
  }
], st = [
  ...tt
];
var h, E, k, R;
class X extends ve {
  constructor(s) {
    super(s);
    b(this, h);
    b(this, E);
    b(this, k);
    b(this, R);
    T(this, E, new F([], () => {
    })), this.approvedComments = i(this, E).asObservable(), T(this, k, new F([], () => {
    })), this.unapprovedComments = i(this, k).asObservable(), T(this, R, new F([], () => {
    })), this.trashedComments = i(this, R).asObservable(), this.provideContext(V, this), T(this, h, new be(this));
  }
  async getApprovedComments(s) {
    const { data: o } = await i(this, h).getApprovedComments(s);
    o ? i(this, E).setValue(o) : i(this, E).setValue([]);
  }
  async getUnapprovedComments() {
    const { data: s } = await i(this, h).getUnapprovedComments();
    s ? i(this, k).setValue(s) : i(this, k).setValue([]);
  }
  async getTrashedComments() {
    const { data: s } = await i(this, h).getTrashedComments();
    s ? i(this, R).setValue(s) : i(this, R).setValue([]);
  }
  async approveComment(s) {
    return await i(this, h).approveComment(s);
  }
  async trashComment(s) {
    return await i(this, h).trashComment(s);
  }
  async restoreComment(s) {
    return await i(this, h).restoreComment(s);
  }
  async deleteComment(s) {
    return await i(this, h).deleteComment(s);
  }
}
h = new WeakMap(), E = new WeakMap(), k = new WeakMap(), R = new WeakMap();
const V = new De(X.name), nt = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  COMMENTS_CONTEXT: V,
  CommentsContext: X,
  default: X
}, Symbol.toStringTag, { value: "Module" }));
var ot = Object.defineProperty, at = Object.getOwnPropertyDescriptor, Ae = (t) => {
  throw TypeError(t);
}, ce = (t, e, s, o) => {
  for (var n = o > 1 ? void 0 : o ? at(e, s) : e, a = t.length - 1, r; a >= 0; a--)
    (r = t[a]) && (n = (o ? r(e, s, n) : r(n)) || n);
  return o && n && ot(e, s, n), n;
}, Se = (t, e, s) => e.has(t) || Ae("Cannot " + s), v = (t, e, s) => (Se(t, e, "read from private field"), e.get(t)), O = (t, e, s) => e.has(t) ? Ae("Cannot add the same private member more than once") : e instanceof WeakSet ? e.add(t) : e.set(t, s), z = (t, e, s, o) => (Se(t, e, "write to private field"), e.set(t, s), s), A, $, I, Y, Q;
let U = class extends te(se) {
  constructor() {
    super(), O(this, A), O(this, $), O(this, I), this.title = "Unapproved comments", O(this, Y, (t) => async () => {
      var s;
      const e = (s = v(this, $)) == null ? void 0 : s.open(this, H, {
        data: {
          headline: "Trash",
          content: "Are you sure you want to move the comment to the Discussions Recycle Bin?",
          confirmLabel: "Trash",
          color: "danger"
        }
      });
      e == null || e.onSubmit().then(async () => {
        var n, a;
        await ((n = v(this, A)) == null ? void 0 : n.trashComment(t.id)), await this.getUnapprovedComments();
        const o = {
          headline: "Trashed",
          message: "The comment has been moved to the Discussions Recycle Bin."
        };
        await ((a = v(this, I)) == null ? void 0 : a.peek("positive", { data: o }));
      });
    }), O(this, Q, (t) => async () => {
      var s;
      const e = (s = v(this, $)) == null ? void 0 : s.open(this, H, {
        data: {
          headline: "Approve",
          content: "Are you sure you want to approve the comment?",
          confirmLabel: "Approve",
          color: "positive"
        }
      });
      e == null || e.onSubmit().then(async () => {
        var n, a;
        await ((n = v(this, A)) == null ? void 0 : n.approveComment(t.id)), await this.getUnapprovedComments();
        const o = {
          headline: "Approved",
          message: "The comment has been approved."
        };
        await ((a = v(this, I)) == null ? void 0 : a.peek("positive", { data: o }));
      });
    }), this.consumeContext(V, (t) => {
      z(this, A, t), this.observe(t.unapprovedComments, (e) => {
        this.comments = e;
      });
    }), this.consumeContext(_e, (t) => {
      z(this, $, t);
    }), this.consumeContext(fe, (t) => {
      z(this, I, t);
    });
  }
  connectedCallback() {
    super.connectedCallback(), v(this, A) != null && this.getUnapprovedComments();
  }
  async getUnapprovedComments() {
    var t;
    await ((t = v(this, A)) == null ? void 0 : t.getUnapprovedComments());
  }
  render() {
    var t;
    return P`
            <umb-body-layout headline='Unapproved Comments'>
                <div class="comments">
                    ${(t = this.comments) == null ? void 0 : t.map((e) => P`
                            <uui-box>
                                <div slot="headline">${e.author}</div>
                                <div slot="header">${e.date}</div>
                                <div slot="header-actions">
                                    <uui-button pristine label="Delete" look="primary" color="danger" @click=${v(this, Y).call(this, e)}>
                                        <uui-icon name="delete"></uui-icon>
                                    </uui-button>
                                    <uui-button pristine label="Approve" look="primary" color="positive" @click=${v(this, Q).call(this, e)}>
                                        Approve
                                    </uui-button>
                                </div>
                                <div class="comment">
                                    <p class="comment__message">${e.message}</p>
                                    <uui-ref-node name=${e.contentName} detail=${e.contentKey} readonly standalone></uui-ref-node>
                                </div>
                            </uui-box>
                        `)}
                </div>
            </umb-body-layout>
        `;
  }
};
A = /* @__PURE__ */ new WeakMap();
$ = /* @__PURE__ */ new WeakMap();
I = /* @__PURE__ */ new WeakMap();
Y = /* @__PURE__ */ new WeakMap();
Q = /* @__PURE__ */ new WeakMap();
U.styles = [
  ne`
            .comments {
                display: grid;
                grid-gap: 2rem;
                grid-template-columns: repeat(3, 1fr);
            }

            .comment {
                display: flex;
                gap: 2rem;
                flex-direction: column;
            }

            .comment__message {
                margin: 0;
            }

            .comment uui-ref-node {
                padding: 1rem;
            }
        `
];
ce([
  oe()
], U.prototype, "title", 2);
ce([
  B()
], U.prototype, "comments", 2);
U = ce([
  ae("unapprovedcomments-workspace-root")
], U);
const rt = U;
var it = Object.defineProperty, ct = Object.getOwnPropertyDescriptor, Ee = (t) => {
  throw TypeError(t);
}, me = (t, e, s, o) => {
  for (var n = o > 1 ? void 0 : o ? ct(e, s) : e, a = t.length - 1, r; a >= 0; a--)
    (r = t[a]) && (n = (o ? r(e, s, n) : r(n)) || n);
  return o && n && it(e, s, n), n;
}, ke = (t, e, s) => e.has(t) || Ee("Cannot " + s), _ = (t, e, s) => (ke(t, e, "read from private field"), e.get(t)), D = (t, e, s) => e.has(t) ? Ee("Cannot add the same private member more than once") : e instanceof WeakSet ? e.add(t) : e.set(t, s), J = (t, e, s, o) => (ke(t, e, "write to private field"), e.set(t, s), s), S, N, M, Z, ee;
let x = class extends te(se) {
  constructor() {
    super(), D(this, S), D(this, N), D(this, M), this.title = "Recycle Bin", D(this, Z, (t) => async () => {
      var s;
      const e = (s = _(this, N)) == null ? void 0 : s.open(this, H, {
        data: {
          headline: "Delete",
          content: "Are you sure you want to delete the comment?",
          confirmLabel: "Delete",
          color: "danger"
        }
      });
      e == null || e.onSubmit().then(async () => {
        var n, a;
        await ((n = _(this, S)) == null ? void 0 : n.deleteComment(t.id)), await this.getTrashedComments();
        const o = {
          headline: "Deleted",
          message: "The comment has been deleted."
        };
        await ((a = _(this, M)) == null ? void 0 : a.peek("positive", { data: o }));
      });
    }), D(this, ee, (t) => async () => {
      var s;
      const e = (s = _(this, N)) == null ? void 0 : s.open(this, H, {
        data: {
          headline: "Restore",
          content: "Are you sure you want to restore the comment to <strong>" + (t.approved ? "Approved Comments" : "Unapproved Comments") + "</strong>?",
          confirmLabel: "Restore",
          color: "positive"
        }
      });
      e == null || e.onSubmit().then(async () => {
        var n, a;
        await ((n = _(this, S)) == null ? void 0 : n.restoreComment(t.id)), await this.getTrashedComments();
        const o = {
          headline: "Restored",
          message: "The comment has been restored."
        };
        await ((a = _(this, M)) == null ? void 0 : a.peek("positive", { data: o }));
      });
    }), this.consumeContext(V, (t) => {
      J(this, S, t), this.observe(t.trashedComments, (e) => {
        this.comments = e;
      });
    }), this.consumeContext(_e, (t) => {
      J(this, N, t);
    }), this.consumeContext(fe, (t) => {
      J(this, M, t);
    });
  }
  connectedCallback() {
    super.connectedCallback(), _(this, S) != null && this.getTrashedComments();
  }
  async getTrashedComments() {
    var t;
    await ((t = _(this, S)) == null ? void 0 : t.getTrashedComments());
  }
  render() {
    var t;
    return P`
            <umb-body-layout headline=${this.title}>
                <div class="comments">
                    ${(t = this.comments) == null ? void 0 : t.map((e) => P`
                            <uui-box>
                                <div slot="headline">${e.author}</div>
                                <div slot="header">${e.date}</div>
                                <div slot="header-actions">
                                    <uui-button pristine label="Delete" look="primary" color="danger" @click=${_(this, Z).call(this, e)}>
                                        <uui-icon name="delete"></uui-icon>
                                    </uui-button>
                                    <uui-button pristine label="Restore" look="primary" color="default" @click=${_(this, ee).call(this, e)}>
                                        Restore
                                    </uui-button>
                                </div>
                                <div class="comment">
                                    <p class="comment__message">${e.message}</p>
                                    <uui-ref-node name=${e.contentName} detail=${e.contentKey} readonly standalone></uui-ref-node>
                                    <uui-tag color="${e.approved ? "positive" : "danger"}">${e.approved ? "Approved" : "Unapproved"}</uui-tag>
                                </div>
                            </uui-box>
                        `)}
                </div>
            </umb-body-layout>
        `;
  }
};
S = /* @__PURE__ */ new WeakMap();
N = /* @__PURE__ */ new WeakMap();
M = /* @__PURE__ */ new WeakMap();
Z = /* @__PURE__ */ new WeakMap();
ee = /* @__PURE__ */ new WeakMap();
x.styles = [
  ne`
            .comments {
                display: grid;
                grid-gap: 2rem;
                grid-template-columns: repeat(3, 1fr);
            }

            .comment {
                display: flex;
                gap: 2rem;
                flex-direction: column;
            }

            .comment__message {
                margin: 0;
            }

            .comment uui-ref-node {
                padding: 1rem;
            }
        `
];
me([
  oe()
], x.prototype, "title", 2);
me([
  B()
], x.prototype, "comments", 2);
x = me([
  ae("trashedcomments-workspace-root")
], x);
const mt = x, dt = "ApprovedComments.Workspace.Alias", pt = "UnapprovedComments.Workspace.Alias", Re = "unapproved-comments", lt = "TrashedComments.Workspace.Alias", Ue = "trashed-comments", ut = [
  {
    type: "workspace",
    alias: pt,
    name: "Unapproved Comments Workspace",
    element: rt,
    meta: {
      entityType: Re
    }
  },
  {
    type: "workspace",
    alias: lt,
    name: "Trashed Comments Workspace",
    element: mt,
    meta: {
      entityType: Ue
    }
  }
];
var ht = [
  {
    type: "workspaceView",
    alias: dt,
    name: "Approved Comments Workspace",
    js: () => import("./approvedcomments.element-BbJ66Jgr.js"),
    weight: 10,
    meta: {
      icon: "icon-chat",
      pathname: "comments",
      label: "Comments"
    },
    conditions: [
      {
        alias: "Umb.Condition.WorkspaceAlias",
        match: "Umb.Workspace.Document"
      }
    ]
  }
];
const Ct = [
  {
    type: "workspaceContext",
    alias: "UnapprovedComments.Workspace.context",
    name: "Unapproved Comments Workspace Context",
    js: () => import("./unapprovedcomments.context-wclrcG9t.js")
  },
  {
    type: "workspaceContext",
    alias: "TrashedComments.Workspace.context",
    name: "Trashed Comments Workspace Context",
    js: () => import("./trashedcomments.context-D95KaYs_.js")
  }
], yt = [], vt = [], _t = [
  ...ut,
  ...ht,
  ...Ct,
  ...yt,
  ...vt
], G = "Umbraco.Discussions.Menu.Comments", ft = [
  {
    type: "sectionSidebarApp",
    kind: "menuWithEntityActions",
    alias: "Umbraco.Discussions.Sidebar.Comments",
    name: "Discussions Sidebar Comments",
    meta: {
      label: "Comments",
      menu: G
    },
    conditions: [
      {
        alias: "Umb.Condition.SectionAlias",
        match: re
      }
    ]
  }
], gt = [
  {
    type: "menu",
    alias: G,
    name: "Menu Comments",
    meta: {
      label: "Comments"
    }
  }
], bt = [
  {
    type: "menuItem",
    alias: "Umbraco.Discussions.Comments.UnapprovedComments.MenuItem",
    name: "Unapproved Comments",
    meta: {
      label: "Unapproved Comments",
      icon: "icon-chat",
      entityType: Re,
      menus: [
        G
      ]
    }
  },
  {
    type: "menuItem",
    alias: "Umbraco.Discussions.Comments.RemovedComments.MenuItem",
    name: "Recycle Bin",
    meta: {
      label: "Recycle Bin",
      icon: "icon-remove",
      entityType: Ue,
      menus: [
        G
      ]
    }
  }
], Tt = [
  ...ft,
  ...gt,
  ...bt
], wt = [
  {
    type: "globalContext",
    alias: "Comments.Context",
    name: "Comments Context",
    js: () => Promise.resolve().then(() => nt)
  }
], At = [
  ...wt
], Nt = (t, e) => {
  e.registerMany([
    ...At,
    ...Ne,
    ...st,
    ...Tt,
    ..._t
  ]), t.consumeContext($e, (s) => {
    const o = s.getOpenApiConfiguration();
    m.TOKEN = o.token, m.BASE = o.base, m.WITH_CREDENTIALS = o.withCredentials;
  });
};
export {
  V as C,
  lt as T,
  pt as U,
  Re as a,
  Ue as b,
  Nt as o
};
//# sourceMappingURL=index-puKtXfK7.js.map
