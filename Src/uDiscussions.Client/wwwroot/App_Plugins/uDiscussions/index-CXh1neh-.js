var ve = (t) => {
  throw TypeError(t);
};
var _e = (t, e, s) => e.has(t) || ve("Cannot " + s);
var a = (t, e, s) => (_e(t, e, "read from private field"), s ? s.call(t) : e.get(t)), y = (t, e, s) => e.has(t) ? ve("Cannot add the same private member more than once") : e instanceof WeakSet ? e.add(t) : e.set(t, s), g = (t, e, s, o) => (_e(t, e, "write to private field"), o ? o.call(t, s) : e.set(t, s), s);
import { UmbElementMixin as oe } from "@umbraco-cms/backoffice/element-api";
import { LitElement as re, html as B, css as ae, property as ie, state as q, customElement as ce } from "@umbraco-cms/backoffice/external/lit";
import { UmbControllerBase as me } from "@umbraco-cms/backoffice/class-api";
import { tryExecuteAndNotify as l } from "@umbraco-cms/backoffice/resources";
import { UmbContextToken as Me } from "@umbraco-cms/backoffice/context-api";
import { UmbArrayState as X } from "@umbraco-cms/backoffice/observable-api";
import { UMB_MODAL_MANAGER_CONTEXT as be, UMB_CONFIRM_MODAL as V } from "@umbraco-cms/backoffice/modal";
import { UMB_NOTIFICATION_CONTEXT as Se } from "@umbraco-cms/backoffice/notification";
import { UmbConditionBase as Pe } from "@umbraco-cms/backoffice/extension-registry";
import { UMB_DOCUMENT_WORKSPACE_CONTEXT as Be } from "@umbraco-cms/backoffice/document";
import { UMB_AUTH_CONTEXT as qe } from "@umbraco-cms/backoffice/auth";
const de = "uDiscussions.Section", je = [
  {
    type: "section",
    alias: de,
    name: "Discussions Section",
    weight: 10,
    meta: {
      label: "Discussions",
      pathname: "discussions"
    }
  }
], Le = [
  ...je
];
class Te extends Error {
  constructor(e, s, o) {
    super(o), this.name = "ApiError", this.url = s.url, this.status = s.status, this.statusText = s.statusText, this.body = s.body, this.request = e;
  }
}
class Ge extends Error {
  constructor(e) {
    super(e), this.name = "CancelError";
  }
  get isCancelled() {
    return !0;
  }
}
class He {
  constructor(e) {
    this._isResolved = !1, this._isRejected = !1, this._isCancelled = !1, this.cancelHandlers = [], this.promise = new Promise((s, o) => {
      this._resolve = s, this._reject = o;
      const n = (c) => {
        this._isResolved || this._isRejected || this._isCancelled || (this._isResolved = !0, this._resolve && this._resolve(c));
      }, r = (c) => {
        this._isResolved || this._isRejected || this._isCancelled || (this._isRejected = !0, this._reject && this._reject(c));
      }, i = (c) => {
        this._isResolved || this._isRejected || this._isCancelled || this.cancelHandlers.push(c);
      };
      return Object.defineProperty(i, "isResolved", {
        get: () => this._isResolved
      }), Object.defineProperty(i, "isRejected", {
        get: () => this._isRejected
      }), Object.defineProperty(i, "isCancelled", {
        get: () => this._isCancelled
      }), e(n, r, i);
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
      this.cancelHandlers.length = 0, this._reject && this._reject(new Ge("Request aborted"));
    }
  }
  get isCancelled() {
    return this._isCancelled;
  }
}
class ge {
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
    request: new ge(),
    response: new ge()
  }
}, j = (t) => typeof t == "string", Y = (t) => j(t) && t !== "", pe = (t) => t instanceof Blob, we = (t) => t instanceof FormData, Ve = (t) => {
  try {
    return btoa(t);
  } catch {
    return Buffer.from(t).toString("base64");
  }
}, Fe = (t) => {
  const e = [], s = (n, r) => {
    e.push(`${encodeURIComponent(n)}=${encodeURIComponent(String(r))}`);
  }, o = (n, r) => {
    r != null && (r instanceof Date ? s(n, r.toISOString()) : Array.isArray(r) ? r.forEach((i) => o(n, i)) : typeof r == "object" ? Object.entries(r).forEach(([i, c]) => o(`${n}[${i}]`, c)) : s(n, r));
  };
  return Object.entries(t).forEach(([n, r]) => o(n, r)), e.length ? `?${e.join("&")}` : "";
}, Ke = (t, e) => {
  const s = encodeURI, o = e.url.replace("{api-version}", t.VERSION).replace(/{(.*?)}/g, (r, i) => {
    var c;
    return (c = e.path) != null && c.hasOwnProperty(i) ? s(String(e.path[i])) : r;
  }), n = t.BASE + o;
  return e.query ? n + Fe(e.query) : n;
}, ze = (t) => {
  if (t.formData) {
    const e = new FormData(), s = (o, n) => {
      j(n) || pe(n) ? e.append(o, n) : e.append(o, JSON.stringify(n));
    };
    return Object.entries(t.formData).filter(([, o]) => o != null).forEach(([o, n]) => {
      Array.isArray(n) ? n.forEach((r) => s(o, r)) : s(o, n);
    }), e;
  }
}, G = async (t, e) => typeof e == "function" ? e(t) : e, Xe = async (t, e) => {
  const [s, o, n, r] = await Promise.all([
    // @ts-ignore
    G(e, t.TOKEN),
    // @ts-ignore
    G(e, t.USERNAME),
    // @ts-ignore
    G(e, t.PASSWORD),
    // @ts-ignore
    G(e, t.HEADERS)
  ]), i = Object.entries({
    Accept: "application/json",
    ...r,
    ...e.headers
  }).filter(([, c]) => c != null).reduce((c, [f, h]) => ({
    ...c,
    [f]: String(h)
  }), {});
  if (Y(s) && (i.Authorization = `Bearer ${s}`), Y(o) && Y(n)) {
    const c = Ve(`${o}:${n}`);
    i.Authorization = `Basic ${c}`;
  }
  return e.body !== void 0 && (e.mediaType ? i["Content-Type"] = e.mediaType : pe(e.body) ? i["Content-Type"] = e.body.type || "application/octet-stream" : j(e.body) ? i["Content-Type"] = "text/plain" : we(e.body) || (i["Content-Type"] = "application/json")), new Headers(i);
}, Ye = (t) => {
  var e, s;
  if (t.body !== void 0)
    return (e = t.mediaType) != null && e.includes("application/json") || (s = t.mediaType) != null && s.includes("+json") ? JSON.stringify(t.body) : j(t.body) || pe(t.body) || we(t.body) ? t.body : JSON.stringify(t.body);
}, Je = async (t, e, s, o, n, r, i) => {
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
  return i(() => c.abort()), await fetch(s, f);
}, Qe = (t, e) => {
  if (e) {
    const s = t.headers.get(e);
    if (j(s))
      return s;
  }
}, Ze = async (t) => {
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
}, et = (t, e) => {
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
    throw new Te(t, e, o);
  if (!e.ok) {
    const n = e.status ?? "unknown", r = e.statusText ?? "unknown", i = (() => {
      try {
        return JSON.stringify(e.body, null, 2);
      } catch {
        return;
      }
    })();
    throw new Te(
      t,
      e,
      `Generic Error: status: ${n}; status text: ${r}; body: ${i}`
    );
  }
}, d = (t, e) => new He(async (s, o, n) => {
  try {
    const r = Ke(t, e), i = ze(e), c = Ye(e), f = await Xe(t, e);
    if (!n.isCancelled) {
      let h = await Je(t, e, r, c, i, f, n);
      for (const We of t.interceptors.response._fns)
        h = await We(h);
      const le = await Ze(h), $e = Qe(h, e.responseHeader);
      let Ce = le;
      e.responseTransformer && h.ok && (Ce = await e.responseTransformer(le));
      const ye = {
        url: r,
        ok: h.ok,
        status: h.status,
        statusText: h.statusText,
        body: $e ?? Ce
      };
      et(e, ye), s(ye.body);
    }
  } catch (r) {
    o(r);
  }
});
class v {
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
class fe {
  /**
   * @param data The data for the request.
   * @param data.requestBody
   * @returns unknown OK
   * @throws ApiError
   */
  static postDocumenttypesettings(e = {}) {
    return d(m, {
      method: "POST",
      url: "/documenttypesettings",
      body: e.requestBody,
      mediaType: "application/json",
      errors: {
        400: "Bad Request",
        401: "The resource is protected and requires an authentication token"
      }
    });
  }
  /**
   * @param data The data for the request.
   * @param data.documentType
   * @returns unknown OK
   * @throws ApiError
   */
  static getDocumenttypesettingsByDocumentType(e) {
    return d(m, {
      method: "GET",
      url: "/documenttypesettings/{documentType}",
      path: {
        documentType: e.documentType
      },
      errors: {
        401: "The resource is protected and requires an authentication token",
        404: "Not Found"
      }
    });
  }
}
var p;
class tt {
  constructor(e) {
    y(this, p);
    g(this, p, e);
  }
  async getCommentsCount() {
    return await l(a(this, p), v.getCommentsCount());
  }
  async getApprovedComments(e) {
    return await l(a(this, p), v.getCommentsByContentkeyApproved({ contentkey: e }));
  }
  async getUnapprovedComments() {
    return await l(a(this, p), v.getCommentsUnapproved());
  }
  async getUnapprovedCommentsCount() {
    return await l(a(this, p), v.getCommentsUnapprovedCount());
  }
  async getTrashedComments() {
    return await l(a(this, p), v.getCommentsTrashed());
  }
  async getTrashedCommentsCount() {
    return await l(a(this, p), v.getCommentsTrashedCount());
  }
  async approveComment(e) {
    return await l(a(this, p), v.patchCommentsByIdApprove({ id: e }));
  }
  async trashComment(e) {
    return await l(a(this, p), v.patchCommentsByIdTrash({ id: e }));
  }
  async restoreComment(e) {
    return await l(a(this, p), v.patchCommentsByIdRestore({ id: e }));
  }
  async deleteComment(e) {
    return await l(a(this, p), v.deleteCommentsByIdDelete({ id: e }));
  }
}
p = new WeakMap();
var u;
class Ae extends me {
  constructor(s) {
    super(s);
    y(this, u);
    g(this, u, new tt(this));
  }
  async getCommentsCount() {
    return a(this, u).getCommentsCount();
  }
  async getApprovedComments(s) {
    return a(this, u).getApprovedComments(s);
  }
  async getUnapprovedComments() {
    return a(this, u).getUnapprovedComments();
  }
  async getUnapprovedCommentsCount() {
    return a(this, u).getUnapprovedCommentsCount();
  }
  async getTrashedComments() {
    return a(this, u).getTrashedComments();
  }
  async getTrashedCommentsCount() {
    return a(this, u).getTrashedCommentsCount();
  }
  async approveComment(s) {
    return a(this, u).approveComment(s);
  }
  async trashComment(s) {
    return a(this, u).trashComment(s);
  }
  async restoreComment(s) {
    return a(this, u).restoreComment(s);
  }
  async deleteComment(s) {
    return a(this, u).deleteComment(s);
  }
}
u = new WeakMap();
var st = Object.defineProperty, nt = Object.getOwnPropertyDescriptor, Ee = (t) => {
  throw TypeError(t);
}, L = (t, e, s, o) => {
  for (var n = o > 1 ? void 0 : o ? nt(e, s) : e, r = t.length - 1, i; r >= 0; r--)
    (i = t[r]) && (n = (o ? i(e, s, n) : i(n)) || n);
  return o && n && st(e, s, n), n;
}, ke = (t, e, s) => e.has(t) || Ee("Cannot " + s), H = (t, e, s) => (ke(t, e, "read from private field"), e.get(t)), ot = (t, e, s) => e.has(t) ? Ee("Cannot add the same private member more than once") : e instanceof WeakSet ? e.add(t) : e.set(t, s), rt = (t, e, s, o) => (ke(t, e, "write to private field"), e.set(t, s), s), S;
let b = class extends oe(re) {
  constructor() {
    super(), ot(this, S), this.title = "Statistics", rt(this, S, new Ae(this));
  }
  connectedCallback() {
    super.connectedCallback(), H(this, S) && (H(this, S).getCommentsCount().then((t) => {
      this.commentsCount = t.data;
    }), H(this, S).getUnapprovedCommentsCount().then((t) => {
      this.unapprovedCommentsCount = t.data;
    }), H(this, S).getTrashedCommentsCount().then((t) => {
      this.trashedCommentsCount = t.data;
    }));
  }
  render() {
    return B`
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
S = /* @__PURE__ */ new WeakMap();
b.styles = [
  ae`
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
L([
  ie()
], b.prototype, "title", 2);
L([
  q()
], b.prototype, "commentsCount", 2);
L([
  q()
], b.prototype, "unapprovedCommentsCount", 2);
L([
  q()
], b.prototype, "trashedCommentsCount", 2);
b = L([
  ce("statistics-dashboard")
], b);
const at = b, it = "uDiscussions.Dashboard.Statistics", ct = [
  {
    type: "dashboard",
    name: "Statistics Dashboard",
    alias: it,
    element: at,
    weight: -10,
    meta: {
      label: "Statistics",
      pathname: "statistics-dashboard"
    },
    conditions: [
      {
        alias: "Umb.Condition.SectionAlias",
        match: de
      }
    ]
  }
], mt = [
  ...ct
];
var C, E, k, D;
class Z extends me {
  constructor(s) {
    super(s);
    y(this, C);
    y(this, E);
    y(this, k);
    y(this, D);
    g(this, E, new X([], () => {
    })), this.approvedComments = a(this, E).asObservable(), g(this, k, new X([], () => {
    })), this.unapprovedComments = a(this, k).asObservable(), g(this, D, new X([], () => {
    })), this.trashedComments = a(this, D).asObservable(), this.provideContext(z, this), g(this, C, new Ae(this));
  }
  async getApprovedComments(s) {
    const { data: o } = await a(this, C).getApprovedComments(s);
    o ? a(this, E).setValue(o) : a(this, E).setValue([]);
  }
  async getUnapprovedComments() {
    const { data: s } = await a(this, C).getUnapprovedComments();
    s ? a(this, k).setValue(s) : a(this, k).setValue([]);
  }
  async getTrashedComments() {
    const { data: s } = await a(this, C).getTrashedComments();
    s ? a(this, D).setValue(s) : a(this, D).setValue([]);
  }
  async approveComment(s) {
    return await a(this, C).approveComment(s);
  }
  async trashComment(s) {
    return await a(this, C).trashComment(s);
  }
  async restoreComment(s) {
    return await a(this, C).restoreComment(s);
  }
  async deleteComment(s) {
    return await a(this, C).deleteComment(s);
  }
}
C = new WeakMap(), E = new WeakMap(), k = new WeakMap(), D = new WeakMap();
const z = new Me(Z.name), dt = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  COMMENTS_CONTEXT: z,
  CommentsContext: Z,
  default: Z
}, Symbol.toStringTag, { value: "Module" }));
var pt = Object.defineProperty, ut = Object.getOwnPropertyDescriptor, De = (t) => {
  throw TypeError(t);
}, ue = (t, e, s, o) => {
  for (var n = o > 1 ? void 0 : o ? ut(e, s) : e, r = t.length - 1, i; r >= 0; r--)
    (i = t[r]) && (n = (o ? i(e, s, n) : i(n)) || n);
  return o && n && pt(e, s, n), n;
}, Re = (t, e, s) => e.has(t) || De("Cannot " + s), _ = (t, e, s) => (Re(t, e, "read from private field"), e.get(t)), N = (t, e, s) => e.has(t) ? De("Cannot add the same private member more than once") : e instanceof WeakSet ? e.add(t) : e.set(t, s), J = (t, e, s, o) => (Re(t, e, "write to private field"), e.set(t, s), s), w, $, W, ee, te;
let x = class extends oe(re) {
  constructor() {
    super(), N(this, w), N(this, $), N(this, W), this.title = "Unapproved comments", N(this, ee, (t) => async () => {
      var s;
      const e = (s = _(this, $)) == null ? void 0 : s.open(this, V, {
        data: {
          headline: "Trash",
          content: "Are you sure you want to move the comment to the Discussions Recycle Bin?",
          confirmLabel: "Trash",
          color: "danger"
        }
      });
      e == null || e.onSubmit().then(async () => {
        var n, r;
        await ((n = _(this, w)) == null ? void 0 : n.trashComment(t.id)), await this.getUnapprovedComments();
        const o = {
          headline: "Trashed",
          message: "The comment has been moved to the Discussions Recycle Bin."
        };
        await ((r = _(this, W)) == null ? void 0 : r.peek("positive", { data: o }));
      });
    }), N(this, te, (t) => async () => {
      var s;
      const e = (s = _(this, $)) == null ? void 0 : s.open(this, V, {
        data: {
          headline: "Approve",
          content: "Are you sure you want to approve the comment?",
          confirmLabel: "Approve",
          color: "positive"
        }
      });
      e == null || e.onSubmit().then(async () => {
        var n, r;
        await ((n = _(this, w)) == null ? void 0 : n.approveComment(t.id)), await this.getUnapprovedComments();
        const o = {
          headline: "Approved",
          message: "The comment has been approved."
        };
        await ((r = _(this, W)) == null ? void 0 : r.peek("positive", { data: o }));
      });
    }), this.consumeContext(z, (t) => {
      J(this, w, t), this.observe(t.unapprovedComments, (e) => {
        this.comments = e;
      });
    }), this.consumeContext(be, (t) => {
      J(this, $, t);
    }), this.consumeContext(Se, (t) => {
      J(this, W, t);
    });
  }
  connectedCallback() {
    super.connectedCallback(), _(this, w) != null && this.getUnapprovedComments();
  }
  async getUnapprovedComments() {
    var t;
    await ((t = _(this, w)) == null ? void 0 : t.getUnapprovedComments());
  }
  render() {
    var t;
    return B`
            <umb-body-layout headline='Unapproved Comments'>
                <div class="comments">
                    ${(t = this.comments) == null ? void 0 : t.map((e) => B`
                            <uui-box>
                                <div slot="headline">${e.author}</div>
                                <div slot="header">${e.date}</div>
                                <div slot="header-actions">
                                    <uui-button pristine label="Delete" look="primary" color="danger" @click=${_(this, ee).call(this, e)}>
                                        <uui-icon name="delete"></uui-icon>
                                    </uui-button>
                                    <uui-button pristine label="Approve" look="primary" color="positive" @click=${_(this, te).call(this, e)}>
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
w = /* @__PURE__ */ new WeakMap();
$ = /* @__PURE__ */ new WeakMap();
W = /* @__PURE__ */ new WeakMap();
ee = /* @__PURE__ */ new WeakMap();
te = /* @__PURE__ */ new WeakMap();
x.styles = [
  ae`
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
ue([
  ie()
], x.prototype, "title", 2);
ue([
  q()
], x.prototype, "comments", 2);
x = ue([
  ce("unapprovedcomments-workspace-root")
], x);
const ht = x;
var lt = Object.defineProperty, Ct = Object.getOwnPropertyDescriptor, Oe = (t) => {
  throw TypeError(t);
}, he = (t, e, s, o) => {
  for (var n = o > 1 ? void 0 : o ? Ct(e, s) : e, r = t.length - 1, i; r >= 0; r--)
    (i = t[r]) && (n = (o ? i(e, s, n) : i(n)) || n);
  return o && n && lt(e, s, n), n;
}, xe = (t, e, s) => e.has(t) || Oe("Cannot " + s), T = (t, e, s) => (xe(t, e, "read from private field"), e.get(t)), I = (t, e, s) => e.has(t) ? Oe("Cannot add the same private member more than once") : e instanceof WeakSet ? e.add(t) : e.set(t, s), Q = (t, e, s, o) => (xe(t, e, "write to private field"), e.set(t, s), s), A, M, P, se, ne;
let U = class extends oe(re) {
  constructor() {
    super(), I(this, A), I(this, M), I(this, P), this.title = "Recycle Bin", I(this, se, (t) => async () => {
      var s;
      const e = (s = T(this, M)) == null ? void 0 : s.open(this, V, {
        data: {
          headline: "Delete",
          content: "Are you sure you want to delete the comment?",
          confirmLabel: "Delete",
          color: "danger"
        }
      });
      e == null || e.onSubmit().then(async () => {
        var n, r;
        await ((n = T(this, A)) == null ? void 0 : n.deleteComment(t.id)), await this.getTrashedComments();
        const o = {
          headline: "Deleted",
          message: "The comment has been deleted."
        };
        await ((r = T(this, P)) == null ? void 0 : r.peek("positive", { data: o }));
      });
    }), I(this, ne, (t) => async () => {
      var s;
      const e = (s = T(this, M)) == null ? void 0 : s.open(this, V, {
        data: {
          headline: "Restore",
          content: "Are you sure you want to restore the comment to <strong>" + (t.approved ? "Approved Comments" : "Unapproved Comments") + "</strong>?",
          confirmLabel: "Restore",
          color: "positive"
        }
      });
      e == null || e.onSubmit().then(async () => {
        var n, r;
        await ((n = T(this, A)) == null ? void 0 : n.restoreComment(t.id)), await this.getTrashedComments();
        const o = {
          headline: "Restored",
          message: "The comment has been restored."
        };
        await ((r = T(this, P)) == null ? void 0 : r.peek("positive", { data: o }));
      });
    }), this.consumeContext(z, (t) => {
      Q(this, A, t), this.observe(t.trashedComments, (e) => {
        this.comments = e;
      });
    }), this.consumeContext(be, (t) => {
      Q(this, M, t);
    }), this.consumeContext(Se, (t) => {
      Q(this, P, t);
    });
  }
  connectedCallback() {
    super.connectedCallback(), T(this, A) != null && this.getTrashedComments();
  }
  async getTrashedComments() {
    var t;
    await ((t = T(this, A)) == null ? void 0 : t.getTrashedComments());
  }
  render() {
    var t;
    return B`
            <umb-body-layout headline=${this.title}>
                <div class="comments">
                    ${(t = this.comments) == null ? void 0 : t.map((e) => B`
                            <uui-box>
                                <div slot="headline">${e.author}</div>
                                <div slot="header">${e.date}</div>
                                <div slot="header-actions">
                                    <uui-button pristine label="Delete" look="primary" color="danger" @click=${T(this, se).call(this, e)}>
                                        <uui-icon name="delete"></uui-icon>
                                    </uui-button>
                                    <uui-button pristine label="Restore" look="primary" color="default" @click=${T(this, ne).call(this, e)}>
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
A = /* @__PURE__ */ new WeakMap();
M = /* @__PURE__ */ new WeakMap();
P = /* @__PURE__ */ new WeakMap();
se = /* @__PURE__ */ new WeakMap();
ne = /* @__PURE__ */ new WeakMap();
U.styles = [
  ae`
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
he([
  ie()
], U.prototype, "title", 2);
he([
  q()
], U.prototype, "comments", 2);
U = he([
  ce("trashedcomments-workspace-root")
], U);
const yt = U;
var R;
class vt {
  constructor(e) {
    y(this, R);
    g(this, R, e);
  }
  async getDocumentTypeSettings(e) {
    return await l(a(this, R), fe.getDocumenttypesettingsByDocumentType({ documentType: e }));
  }
  async setDocumentTypeSettings(e) {
    return await l(a(this, R), fe.postDocumenttypesettings({ requestBody: e }));
  }
}
R = new WeakMap();
var O;
class _t extends me {
  constructor(s) {
    super(s);
    y(this, O);
    g(this, O, new vt(this));
  }
  async getDocumentTypeSettings(s) {
    return a(this, O).getDocumentTypeSettings(s);
  }
  async setDocumentTypeSettings(s) {
    return a(this, O).setDocumentTypeSettings(s);
  }
}
O = new WeakMap();
var K;
class Tt extends Pe {
  constructor(s, o) {
    super(s, o);
    y(this, K, new _t(this));
    this.consumeContext(Be, (n) => {
      n.contentTypeUnique.subscribe((r) => {
        r && a(this, K).getDocumentTypeSettings(r).then((i) => {
          var c;
          this.permitted = ((c = i.data) == null ? void 0 : c.commentsEnabled) ?? !1;
        });
      });
    });
  }
}
K = new WeakMap();
const Ue = "Workspace.Comments.Enabled.Condition.Alias", gt = [
  {
    type: "condition",
    alias: Ue,
    name: "Workspace Comments Enabled Condition Context",
    api: Tt
  }
], ft = [
  ...gt
], bt = "DocumentType.Settings.Workspace.Alias", Yt = "documenttype-settings", St = "ApprovedComments.Workspace.Alias", wt = "UnapprovedComments.Workspace.Alias", Ne = "unapproved-comments", At = "TrashedComments.Workspace.Alias", Ie = "trashed-comments", Et = [
  {
    type: "workspace",
    alias: wt,
    name: "Unapproved Comments Workspace",
    element: ht,
    meta: {
      entityType: Ne
    }
  },
  {
    type: "workspace",
    alias: At,
    name: "Trashed Comments Workspace",
    element: yt,
    meta: {
      entityType: Ie
    }
  }
];
var kt = [
  {
    type: "workspaceView",
    alias: St,
    name: "Approved Comments Workspace",
    js: () => import("./approvedcomments.element-UODdcqeB.js"),
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
      },
      {
        alias: Ue
      }
    ]
  },
  {
    type: "workspaceView",
    alias: bt,
    name: "DocumentType Settings Workspace",
    js: () => import("./documenttypesettings.element-CpUk9MJN.js"),
    weight: 10,
    meta: {
      icon: "icon-chat",
      pathname: "comments",
      label: "Comments"
    },
    conditions: [
      {
        alias: "Umb.Condition.WorkspaceAlias",
        match: "Umb.Workspace.DocumentType"
      }
    ]
  }
];
const Dt = [
  {
    type: "workspaceContext",
    alias: "UnapprovedComments.Workspace.Context",
    name: "Unapproved Comments Workspace Context",
    js: () => import("./unapprovedcomments.context-CoJvWY_k.js")
  },
  {
    type: "workspaceContext",
    alias: "TrashedComments.Workspace.Context",
    name: "Trashed Comments Workspace Context",
    js: () => import("./trashedcomments.context-CFkBdvgy.js")
  },
  {
    type: "workspaceContext",
    alias: "DocumentType.Settings.Workspace.Context",
    name: "DocumentType Settings Workspace Context",
    js: () => import("./documenttypesettings.context-GaBIPoHK.js")
  }
], Rt = [
  {
    type: "workspaceAction",
    kind: "default",
    alias: "DocumentType.Settings.Workspace.Action.Save",
    name: "DocumentType Settings Workspace Action Save",
    js: () => import("./savedocumentaction-apJsNJzU.js"),
    overwrites: "Umb.WorkspaceAction.DocumentType.Save",
    meta: {
      look: "primary",
      color: "positive",
      label: "#buttons_save"
    },
    conditions: [
      {
        alias: "Umb.Condition.WorkspaceAlias",
        match: "Umb.Workspace.DocumentType"
      }
    ]
  }
], Ot = [], xt = [
  ...Et,
  ...kt,
  ...Dt,
  ...Rt,
  ...Ot
], F = "uDiscussions.Menu.Comments", Ut = [
  {
    type: "sectionSidebarApp",
    kind: "menuWithEntityActions",
    alias: "uDiscussions.Sidebar.Comments",
    name: "Discussions Sidebar Comments",
    meta: {
      label: "Comments",
      menu: F
    },
    conditions: [
      {
        alias: "Umb.Condition.SectionAlias",
        match: de
      }
    ]
  }
], Nt = [
  {
    type: "menu",
    alias: F,
    name: "Menu Comments",
    meta: {
      label: "Comments"
    }
  }
], It = [
  {
    type: "menuItem",
    alias: "uDiscussions.MenuItem.Comments.UnapprovedComments",
    name: "Unapproved Comments",
    meta: {
      label: "Unapproved Comments",
      icon: "icon-chat",
      entityType: Ne,
      menus: [
        F
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
      entityType: Ie,
      menus: [
        F
      ]
    }
  }
], $t = [
  ...Ut,
  ...Nt,
  ...It
], Wt = [
  {
    type: "globalContext",
    alias: "Comments.Context",
    name: "Comments Context",
    js: () => Promise.resolve().then(() => dt)
  }
], Mt = [
  ...Wt
], Jt = (t, e) => {
  e.registerMany([
    ...Mt,
    ...Le,
    ...mt,
    ...$t,
    ...xt,
    ...ft
  ]), t.consumeContext(qe, (s) => {
    const o = s.getOpenApiConfiguration();
    m.TOKEN = o.token, m.BASE = o.base, m.WITH_CREDENTIALS = o.withCredentials;
  });
};
export {
  z as C,
  bt as D,
  At as T,
  wt as U,
  Ne as a,
  Ie as b,
  _t as c,
  Yt as d,
  Jt as o
};
//# sourceMappingURL=index-CXh1neh-.js.map
