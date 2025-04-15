var he = (t) => {
  throw TypeError(t);
};
var le = (t, e, s) => e.has(t) || he("Cannot " + s);
var i = (t, e, s) => (le(t, e, "read from private field"), s ? s.call(t) : e.get(t)), T = (t, e, s) => e.has(t) ? he("Cannot add the same private member more than once") : e instanceof WeakSet ? e.add(t) : e.set(t, s), b = (t, e, s, o) => (le(t, e, "write to private field"), o ? o.call(t, s) : e.set(t, s), s);
import { UmbElementMixin as te } from "@umbraco-cms/backoffice/element-api";
import { LitElement as se, html as P, css as ne, property as oe, state as B, customElement as re } from "@umbraco-cms/backoffice/external/lit";
import { UmbControllerBase as ve } from "@umbraco-cms/backoffice/class-api";
import { tryExecuteAndNotify as C } from "@umbraco-cms/backoffice/resources";
import { UmbContextToken as Ue } from "@umbraco-cms/backoffice/context-api";
import { UmbArrayState as F } from "@umbraco-cms/backoffice/observable-api";
import { UMB_MODAL_MANAGER_CONTEXT as _e, UMB_CONFIRM_MODAL as H } from "@umbraco-cms/backoffice/modal";
import { UMB_NOTIFICATION_CONTEXT as fe } from "@umbraco-cms/backoffice/notification";
import { UMB_AUTH_CONTEXT as $e } from "@umbraco-cms/backoffice/auth";
const ae = "uDiscussions.Section", Ie = [
  {
    type: "section",
    alias: ae,
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
      }, r = (c) => {
        this._isResolved || this._isRejected || this._isCancelled || (this._isRejected = !0, this._reject && this._reject(c));
      }, a = (c) => {
        this._isResolved || this._isRejected || this._isCancelled || this.cancelHandlers.push(c);
      };
      return Object.defineProperty(a, "isResolved", {
        get: () => this._isResolved
      }), Object.defineProperty(a, "isRejected", {
        get: () => this._isRejected
      }), Object.defineProperty(a, "isCancelled", {
        get: () => this._isCancelled
      }), e(n, r, a);
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
}, q = (t) => typeof t == "string", K = (t) => q(t) && t !== "", ie = (t) => t instanceof Blob, ge = (t) => t instanceof FormData, Be = (t) => {
  try {
    return btoa(t);
  } catch {
    return Buffer.from(t).toString("base64");
  }
}, qe = (t) => {
  const e = [], s = (n, r) => {
    e.push(`${encodeURIComponent(n)}=${encodeURIComponent(String(r))}`);
  }, o = (n, r) => {
    r != null && (r instanceof Date ? s(n, r.toISOString()) : Array.isArray(r) ? r.forEach((a) => o(n, a)) : typeof r == "object" ? Object.entries(r).forEach(([a, c]) => o(`${n}[${a}]`, c)) : s(n, r));
  };
  return Object.entries(t).forEach(([n, r]) => o(n, r)), e.length ? `?${e.join("&")}` : "";
}, We = (t, e) => {
  const s = encodeURI, o = e.url.replace("{api-version}", t.VERSION).replace(/{(.*?)}/g, (r, a) => {
    var c;
    return (c = e.path) != null && c.hasOwnProperty(a) ? s(String(e.path[a])) : r;
  }), n = t.BASE + o;
  return e.query ? n + qe(e.query) : n;
}, je = (t) => {
  if (t.formData) {
    const e = new FormData(), s = (o, n) => {
      q(n) || ie(n) ? e.append(o, n) : e.append(o, JSON.stringify(n));
    };
    return Object.entries(t.formData).filter(([, o]) => o != null).forEach(([o, n]) => {
      Array.isArray(n) ? n.forEach((r) => s(o, r)) : s(o, n);
    }), e;
  }
}, j = async (t, e) => typeof e == "function" ? e(t) : e, Le = async (t, e) => {
  const [s, o, n, r] = await Promise.all([
    // @ts-ignore
    j(e, t.TOKEN),
    // @ts-ignore
    j(e, t.USERNAME),
    // @ts-ignore
    j(e, t.PASSWORD),
    // @ts-ignore
    j(e, t.HEADERS)
  ]), a = Object.entries({
    Accept: "application/json",
    ...r,
    ...e.headers
  }).filter(([, c]) => c != null).reduce((c, [f, h]) => ({
    ...c,
    [f]: String(h)
  }), {});
  if (K(s) && (a.Authorization = `Bearer ${s}`), K(o) && K(n)) {
    const c = Be(`${o}:${n}`);
    a.Authorization = `Basic ${c}`;
  }
  return e.body !== void 0 && (e.mediaType ? a["Content-Type"] = e.mediaType : ie(e.body) ? a["Content-Type"] = e.body.type || "application/octet-stream" : q(e.body) ? a["Content-Type"] = "text/plain" : ge(e.body) || (a["Content-Type"] = "application/json")), new Headers(a);
}, He = (t) => {
  var e, s;
  if (t.body !== void 0)
    return (e = t.mediaType) != null && e.includes("application/json") || (s = t.mediaType) != null && s.includes("+json") ? JSON.stringify(t.body) : q(t.body) || ie(t.body) || ge(t.body) ? t.body : JSON.stringify(t.body);
}, Ge = async (t, e, s, o, n, r, a) => {
  const c = new AbortController();
  let f = {
    headers: r,
    body: o ?? n,
    method: e.method,
    signal: c.signal
  };
  t.WITH_CREDENTIALS && (f.credentials = t.CREDENTIALS);
  for (const h of t.interceptors.request._fns)
    f = await h(f);
  return a(() => c.abort()), await fetch(s, f);
}, Ve = (t, e) => {
  if (e) {
    const s = t.headers.get(e);
    if (q(s))
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
    const n = e.status ?? "unknown", r = e.statusText ?? "unknown", a = (() => {
      try {
        return JSON.stringify(e.body, null, 2);
      } catch {
        return;
      }
    })();
    throw new Ce(
      t,
      e,
      `Generic Error: status: ${n}; status text: ${r}; body: ${a}`
    );
  }
}, d = (t, e) => new Pe(async (s, o, n) => {
  try {
    const r = We(t, e), a = je(e), c = He(e), f = await Le(t, e);
    if (!n.isCancelled) {
      let h = await Ge(t, e, r, c, a, f, n);
      for (const De of t.interceptors.response._fns)
        h = await De(h);
      const de = await Fe(h), Oe = Ve(h, e.responseHeader);
      let ue = de;
      e.responseTransformer && h.ok && (ue = await e.responseTransformer(de));
      const pe = {
        url: r,
        ok: h.ok,
        status: h.status,
        statusText: h.statusText,
        body: Oe ?? ue
      };
      Ke(e, pe), s(pe.body);
    }
  } catch (r) {
    o(r);
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
      },
      errors: {
        401: "The resource is protected and requires an authentication token"
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
      mediaType: "application/json",
      errors: {
        401: "The resource is protected and requires an authentication token"
      }
    });
  }
  /**
   * @returns unknown OK
   * @throws ApiError
   */
  static getComments() {
    return d(m, {
      method: "GET",
      url: "/comments",
      errors: {
        401: "The resource is protected and requires an authentication token"
      }
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
      },
      errors: {
        401: "The resource is protected and requires an authentication token"
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
      },
      errors: {
        401: "The resource is protected and requires an authentication token"
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
      },
      errors: {
        401: "The resource is protected and requires an authentication token"
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
      },
      errors: {
        401: "The resource is protected and requires an authentication token"
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
      },
      errors: {
        401: "The resource is protected and requires an authentication token"
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
      },
      errors: {
        401: "The resource is protected and requires an authentication token"
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
      },
      errors: {
        401: "The resource is protected and requires an authentication token"
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
      },
      errors: {
        401: "The resource is protected and requires an authentication token"
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
      },
      errors: {
        401: "The resource is protected and requires an authentication token"
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
      url: "/comments/count",
      errors: {
        401: "The resource is protected and requires an authentication token"
      }
    });
  }
  /**
   * @returns unknown OK
   * @throws ApiError
   */
  static getCommentsTrashed() {
    return d(m, {
      method: "GET",
      url: "/comments/trashed",
      errors: {
        401: "The resource is protected and requires an authentication token"
      }
    });
  }
  /**
   * @returns number OK
   * @throws ApiError
   */
  static getCommentsTrashedCount() {
    return d(m, {
      method: "GET",
      url: "/comments/trashed/count",
      errors: {
        401: "The resource is protected and requires an authentication token"
      }
    });
  }
  /**
   * @returns unknown OK
   * @throws ApiError
   */
  static getCommentsUnapproved() {
    return d(m, {
      method: "GET",
      url: "/comments/unapproved",
      errors: {
        401: "The resource is protected and requires an authentication token"
      }
    });
  }
  /**
   * @returns number OK
   * @throws ApiError
   */
  static getCommentsUnapprovedCount() {
    return d(m, {
      method: "GET",
      url: "/comments/unapproved/count",
      errors: {
        401: "The resource is protected and requires an authentication token"
      }
    });
  }
}
var u;
class ze {
  constructor(e) {
    T(this, u);
    b(this, u, e);
  }
  async getCommentsCount() {
    return await C(i(this, u), y.getCommentsCount());
  }
  async getApprovedComments(e) {
    return await C(i(this, u), y.getCommentsByContentkeyApproved({ contentkey: e }));
  }
  async getUnapprovedComments() {
    return await C(i(this, u), y.getCommentsUnapproved());
  }
  async getUnapprovedCommentsCount() {
    return await C(i(this, u), y.getCommentsUnapprovedCount());
  }
  async getTrashedComments() {
    return await C(i(this, u), y.getCommentsTrashed());
  }
  async getTrashedCommentsCount() {
    return await C(i(this, u), y.getCommentsTrashedCount());
  }
  async approveComment(e) {
    return await C(i(this, u), y.patchCommentsByIdApprove({ id: e }));
  }
  async trashComment(e) {
    return await C(i(this, u), y.patchCommentsByIdTrash({ id: e }));
  }
  async restoreComment(e) {
    return await C(i(this, u), y.patchCommentsByIdRestore({ id: e }));
  }
  async deleteComment(e) {
    return await C(i(this, u), y.deleteCommentsByIdDelete({ id: e }));
  }
}
u = new WeakMap();
var p;
class Te extends ve {
  constructor(s) {
    super(s);
    T(this, p);
    b(this, p, new ze(this));
  }
  async getCommentsCount() {
    return i(this, p).getCommentsCount();
  }
  async getApprovedComments(s) {
    return i(this, p).getApprovedComments(s);
  }
  async getUnapprovedComments() {
    return i(this, p).getUnapprovedComments();
  }
  async getUnapprovedCommentsCount() {
    return i(this, p).getUnapprovedCommentsCount();
  }
  async getTrashedComments() {
    return i(this, p).getTrashedComments();
  }
  async getTrashedCommentsCount() {
    return i(this, p).getTrashedCommentsCount();
  }
  async approveComment(s) {
    return i(this, p).approveComment(s);
  }
  async trashComment(s) {
    return i(this, p).trashComment(s);
  }
  async restoreComment(s) {
    return i(this, p).restoreComment(s);
  }
  async deleteComment(s) {
    return i(this, p).deleteComment(s);
  }
}
p = new WeakMap();
var Je = Object.defineProperty, Xe = Object.getOwnPropertyDescriptor, be = (t) => {
  throw TypeError(t);
}, W = (t, e, s, o) => {
  for (var n = o > 1 ? void 0 : o ? Xe(e, s) : e, r = t.length - 1, a; r >= 0; r--)
    (a = t[r]) && (n = (o ? a(e, s, n) : a(n)) || n);
  return o && n && Je(e, s, n), n;
}, we = (t, e, s) => e.has(t) || be("Cannot " + s), L = (t, e, s) => (we(t, e, "read from private field"), e.get(t)), Ye = (t, e, s) => e.has(t) ? be("Cannot add the same private member more than once") : e instanceof WeakSet ? e.add(t) : e.set(t, s), Qe = (t, e, s, o) => (we(t, e, "write to private field"), e.set(t, s), s), w;
let g = class extends te(se) {
  constructor() {
    super(), Ye(this, w), this.title = "Statistics", Qe(this, w, new Te(this));
  }
  connectedCallback() {
    super.connectedCallback(), L(this, w) && (L(this, w).getCommentsCount().then((t) => {
      this.commentsCount = t.data;
    }), L(this, w).getUnapprovedCommentsCount().then((t) => {
      this.unapprovedCommentsCount = t.data;
    }), L(this, w).getTrashedCommentsCount().then((t) => {
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
W([
  oe()
], g.prototype, "title", 2);
W([
  B()
], g.prototype, "commentsCount", 2);
W([
  B()
], g.prototype, "unapprovedCommentsCount", 2);
W([
  B()
], g.prototype, "trashedCommentsCount", 2);
g = W([
  re("statistics-dashboard")
], g);
const Ze = g, et = "uDiscussions.Dashboard.Statistics", tt = [
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
        match: ae
      }
    ]
  }
], st = [
  ...tt
];
var l, E, k, R;
class X extends ve {
  constructor(s) {
    super(s);
    T(this, l);
    T(this, E);
    T(this, k);
    T(this, R);
    b(this, E, new F([], () => {
    })), this.approvedComments = i(this, E).asObservable(), b(this, k, new F([], () => {
    })), this.unapprovedComments = i(this, k).asObservable(), b(this, R, new F([], () => {
    })), this.trashedComments = i(this, R).asObservable(), this.provideContext(V, this), b(this, l, new Te(this));
  }
  async getApprovedComments(s) {
    const { data: o } = await i(this, l).getApprovedComments(s);
    o ? i(this, E).setValue(o) : i(this, E).setValue([]);
  }
  async getUnapprovedComments() {
    const { data: s } = await i(this, l).getUnapprovedComments();
    s ? i(this, k).setValue(s) : i(this, k).setValue([]);
  }
  async getTrashedComments() {
    const { data: s } = await i(this, l).getTrashedComments();
    s ? i(this, R).setValue(s) : i(this, R).setValue([]);
  }
  async approveComment(s) {
    return await i(this, l).approveComment(s);
  }
  async trashComment(s) {
    return await i(this, l).trashComment(s);
  }
  async restoreComment(s) {
    return await i(this, l).restoreComment(s);
  }
  async deleteComment(s) {
    return await i(this, l).deleteComment(s);
  }
}
l = new WeakMap(), E = new WeakMap(), k = new WeakMap(), R = new WeakMap();
const V = new Ue(X.name), nt = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  COMMENTS_CONTEXT: V,
  CommentsContext: X,
  default: X
}, Symbol.toStringTag, { value: "Module" }));
var ot = Object.defineProperty, rt = Object.getOwnPropertyDescriptor, Ae = (t) => {
  throw TypeError(t);
}, ce = (t, e, s, o) => {
  for (var n = o > 1 ? void 0 : o ? rt(e, s) : e, r = t.length - 1, a; r >= 0; r--)
    (a = t[r]) && (n = (o ? a(e, s, n) : a(n)) || n);
  return o && n && ot(e, s, n), n;
}, Se = (t, e, s) => e.has(t) || Ae("Cannot " + s), v = (t, e, s) => (Se(t, e, "read from private field"), e.get(t)), D = (t, e, s) => e.has(t) ? Ae("Cannot add the same private member more than once") : e instanceof WeakSet ? e.add(t) : e.set(t, s), z = (t, e, s, o) => (Se(t, e, "write to private field"), e.set(t, s), s), A, $, I, Y, Q;
let x = class extends te(se) {
  constructor() {
    super(), D(this, A), D(this, $), D(this, I), this.title = "Unapproved comments", D(this, Y, (t) => async () => {
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
        var n, r;
        await ((n = v(this, A)) == null ? void 0 : n.trashComment(t.id)), await this.getUnapprovedComments();
        const o = {
          headline: "Trashed",
          message: "The comment has been moved to the Discussions Recycle Bin."
        };
        await ((r = v(this, I)) == null ? void 0 : r.peek("positive", { data: o }));
      });
    }), D(this, Q, (t) => async () => {
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
        var n, r;
        await ((n = v(this, A)) == null ? void 0 : n.approveComment(t.id)), await this.getUnapprovedComments();
        const o = {
          headline: "Approved",
          message: "The comment has been approved."
        };
        await ((r = v(this, I)) == null ? void 0 : r.peek("positive", { data: o }));
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
ce([
  oe()
], x.prototype, "title", 2);
ce([
  B()
], x.prototype, "comments", 2);
x = ce([
  re("unapprovedcomments-workspace-root")
], x);
const at = x;
var it = Object.defineProperty, ct = Object.getOwnPropertyDescriptor, Ee = (t) => {
  throw TypeError(t);
}, me = (t, e, s, o) => {
  for (var n = o > 1 ? void 0 : o ? ct(e, s) : e, r = t.length - 1, a; r >= 0; r--)
    (a = t[r]) && (n = (o ? a(e, s, n) : a(n)) || n);
  return o && n && it(e, s, n), n;
}, ke = (t, e, s) => e.has(t) || Ee("Cannot " + s), _ = (t, e, s) => (ke(t, e, "read from private field"), e.get(t)), U = (t, e, s) => e.has(t) ? Ee("Cannot add the same private member more than once") : e instanceof WeakSet ? e.add(t) : e.set(t, s), J = (t, e, s, o) => (ke(t, e, "write to private field"), e.set(t, s), s), S, N, M, Z, ee;
let O = class extends te(se) {
  constructor() {
    super(), U(this, S), U(this, N), U(this, M), this.title = "Recycle Bin", U(this, Z, (t) => async () => {
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
        var n, r;
        await ((n = _(this, S)) == null ? void 0 : n.deleteComment(t.id)), await this.getTrashedComments();
        const o = {
          headline: "Deleted",
          message: "The comment has been deleted."
        };
        await ((r = _(this, M)) == null ? void 0 : r.peek("positive", { data: o }));
      });
    }), U(this, ee, (t) => async () => {
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
        var n, r;
        await ((n = _(this, S)) == null ? void 0 : n.restoreComment(t.id)), await this.getTrashedComments();
        const o = {
          headline: "Restored",
          message: "The comment has been restored."
        };
        await ((r = _(this, M)) == null ? void 0 : r.peek("positive", { data: o }));
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
O.styles = [
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
], O.prototype, "title", 2);
me([
  B()
], O.prototype, "comments", 2);
O = me([
  re("trashedcomments-workspace-root")
], O);
const mt = O, dt = "ApprovedComments.Workspace.Alias", ut = "UnapprovedComments.Workspace.Alias", Re = "unapproved-comments", pt = "TrashedComments.Workspace.Alias", xe = "trashed-comments", ht = [
  {
    type: "workspace",
    alias: ut,
    name: "Unapproved Comments Workspace",
    element: at,
    meta: {
      entityType: Re
    }
  },
  {
    type: "workspace",
    alias: pt,
    name: "Trashed Comments Workspace",
    element: mt,
    meta: {
      entityType: xe
    }
  }
];
var lt = [
  {
    type: "workspaceView",
    alias: dt,
    name: "Approved Comments Workspace",
    js: () => import("./approvedcomments.element-D-X28bSs.js"),
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
    js: () => import("./unapprovedcomments.context-BFAfbaj2.js")
  },
  {
    type: "workspaceContext",
    alias: "TrashedComments.Workspace.context",
    name: "Trashed Comments Workspace Context",
    js: () => import("./trashedcomments.context-Djokizs8.js")
  }
], yt = [], vt = [], _t = [
  ...ht,
  ...lt,
  ...Ct,
  ...yt,
  ...vt
], G = "uDiscussions.Menu.Comments", ft = [
  {
    type: "sectionSidebarApp",
    kind: "menuWithEntityActions",
    alias: "uDiscussions.Sidebar.Comments",
    name: "Discussions Sidebar Comments",
    meta: {
      label: "Comments",
      menu: G
    },
    conditions: [
      {
        alias: "Umb.Condition.SectionAlias",
        match: ae
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
], Tt = [
  {
    type: "menuItem",
    alias: "uDiscussions.MenuItem.Comments.UnapprovedComments",
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
    alias: "uDiscussions.MenuItem.Comments.RemovedComments",
    name: "Recycle Bin",
    meta: {
      label: "Recycle Bin",
      icon: "icon-remove",
      entityType: xe,
      menus: [
        G
      ]
    }
  }
], bt = [
  ...ft,
  ...gt,
  ...Tt
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
    ...bt,
    ..._t
  ]), t.consumeContext($e, (s) => {
    const o = s.getOpenApiConfiguration();
    m.TOKEN = o.token, m.BASE = o.base, m.WITH_CREDENTIALS = o.withCredentials;
  });
};
export {
  V as C,
  pt as T,
  ut as U,
  Re as a,
  xe as b,
  Nt as o
};
//# sourceMappingURL=index-DDlCX0jV.js.map
