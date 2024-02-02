! function() {
    "use strict";
    var e = function(e) {
            if (null === e) return "null";
            if (void 0 === e) return "undefined";
            var t = typeof e;
            return "object" === t && (Array.prototype.isPrototypeOf(e) || e.constructor && "Array" === e.constructor.name) ? "array" : "object" === t && (String.prototype.isPrototypeOf(e) || e.constructor && "String" === e.constructor.name) ? "string" : t
        },
        t = function(e) {
            return {
                eq: e
            }
        },
        n = t((function(e, t) {
            return e === t
        })),
        o = function(e) {
            return t((function(t, n) {
                if (t.length !== n.length) return !1;
                for (var o = t.length, r = 0; r < o; r++)
                    if (!e.eq(t[r], n[r])) return !1;
                return !0
            }))
        },
        r = function(e) {
            return t((function(r, s) {
                var a = Object.keys(r),
                    i = Object.keys(s);
                if (! function(e, n) {
                        return function(e, n) {
                            return t((function(t, o) {
                                return e.eq(n(t), n(o))
                            }))
                        }(o(e), (function(e) {
                            return function(e, t) {
                                return Array.prototype.slice.call(e).sort(t)
                            }(e, n)
                        }))
                    }(n).eq(a, i)) return !1;
                for (var l = a.length, d = 0; d < l; d++) {
                    var c = a[d];
                    if (!e.eq(r[c], s[c])) return !1
                }
                return !0
            }))
        },
        s = t((function(t, n) {
            if (t === n) return !0;
            var a = e(t);
            return a === e(n) && (function(e) {
                return -1 !== ["undefined", "boolean", "number", "string", "function", "xml", "null"].indexOf(e)
            }(a) ? t === n : "array" === a ? o(s).eq(t, n) : "object" === a && r(s).eq(t, n))
        }));
    const a = Object.getPrototypeOf,
        i = (e, t, n) => {
            var o;
            return !!n(e, t.prototype) || (null === (o = e.constructor) || void 0 === o ? void 0 : o.name) === t.name
        },
        l = e => t => (e => {
            const t = typeof e;
            return null === e ? "null" : "object" === t && Array.isArray(e) ? "array" : "object" === t && i(e, String, ((e, t) => t.isPrototypeOf(e))) ? "string" : t
        })(t) === e,
        d = e => t => typeof t === e,
        c = e => t => e === t,
        u = (e, t) => f(e) && i(e, t, ((e, t) => a(e) === t)),
        m = l("string"),
        f = l("object"),
        g = e => u(e, Object),
        p = l("array"),
        h = c(null),
        b = d("boolean"),
        v = c(void 0),
        y = e => null == e,
        C = e => !y(e),
        w = d("function"),
        x = d("number"),
        k = (e, t) => {
            if (p(e)) {
                for (let n = 0, o = e.length; n < o; ++n)
                    if (!t(e[n])) return !1;
                return !0
            }
            return !1
        },
        E = () => {},
        S = (e, t) => (...n) => e(t.apply(null, n)),
        _ = (e, t) => n => e(t(n)),
        N = e => () => e,
        R = e => e,
        A = (e, t) => e === t;

    function O(e, ...t) {
        return (...n) => {
            const o = t.concat(n);
            return e.apply(null, o)
        }
    }
    const T = e => t => !e(t),
        B = e => () => {
            throw new Error(e)
        },
        D = e => e(),
        P = e => {
            e()
        },
        L = N(!1),
        M = N(!0);
    class I {
        constructor(e, t) {
            this.tag = e, this.value = t
        }
        static some(e) {
            return new I(!0, e)
        }
        static none() {
            return I.singletonNone
        }
        fold(e, t) {
            return this.tag ? t(this.value) : e()
        }
        isSome() {
            return this.tag
        }
        isNone() {
            return !this.tag
        }
        map(e) {
            return this.tag ? I.some(e(this.value)) : I.none()
        }
        bind(e) {
            return this.tag ? e(this.value) : I.none()
        }
        exists(e) {
            return this.tag && e(this.value)
        }
        forall(e) {
            return !this.tag || e(this.value)
        }
        filter(e) {
            return !this.tag || e(this.value) ? this : I.none()
        }
        getOr(e) {
            return this.tag ? this.value : e
        }
        or(e) {
            return this.tag ? this : e
        }
        getOrThunk(e) {
            return this.tag ? this.value : e()
        }
        orThunk(e) {
            return this.tag ? this : e()
        }
        getOrDie(e) {
            if (this.tag) return this.value;
            throw new Error(null != e ? e : "Called getOrDie on None")
        }
        static from(e) {
            return C(e) ? I.some(e) : I.none()
        }
        getOrNull() {
            return this.tag ? this.value : null
        }
        getOrUndefined() {
            return this.value
        }
        each(e) {
            this.tag && e(this.value)
        }
        toArray() {
            return this.tag ? [this.value] : []
        }
        toString() {
            return this.tag ? `some(${this.value})` : "none()"
        }
    }
    I.singletonNone = new I(!1);
    const F = Array.prototype.slice,
        U = Array.prototype.indexOf,
        z = Array.prototype.push,
        j = (e, t) => U.call(e, t),
        H = (e, t) => j(e, t) > -1,
        $ = (e, t) => {
            for (let n = 0, o = e.length; n < o; n++)
                if (t(e[n], n)) return !0;
            return !1
        },
        V = (e, t) => {
            const n = e.length,
                o = new Array(n);
            for (let r = 0; r < n; r++) {
                const n = e[r];
                o[r] = t(n, r)
            }
            return o
        },
        q = (e, t) => {
            for (let n = 0, o = e.length; n < o; n++) t(e[n], n)
        },
        W = (e, t) => {
            for (let n = e.length - 1; n >= 0; n--) t(e[n], n)
        },
        K = (e, t) => {
            const n = [],
                o = [];
            for (let r = 0, s = e.length; r < s; r++) {
                const s = e[r];
                (t(s, r) ? n : o).push(s)
            }
            return {
                pass: n,
                fail: o
            }
        },
        G = (e, t) => {
            const n = [];
            for (let o = 0, r = e.length; o < r; o++) {
                const r = e[o];
                t(r, o) && n.push(r)
            }
            return n
        },
        Y = (e, t, n) => (W(e, ((e, o) => {
            n = t(n, e, o)
        })), n),
        X = (e, t, n) => (q(e, ((e, o) => {
            n = t(n, e, o)
        })), n),
        Q = (e, t, n) => {
            for (let o = 0, r = e.length; o < r; o++) {
                const r = e[o];
                if (t(r, o)) return I.some(r);
                if (n(r, o)) break
            }
            return I.none()
        },
        J = (e, t) => Q(e, t, L),
        Z = (e, t) => {
            for (let n = 0, o = e.length; n < o; n++)
                if (t(e[n], n)) return I.some(n);
            return I.none()
        },
        ee = e => {
            const t = [];
            for (let n = 0, o = e.length; n < o; ++n) {
                if (!p(e[n])) throw new Error("Arr.flatten item " + n + " was not an array, input: " + e);
                z.apply(t, e[n])
            }
            return t
        },
        te = (e, t) => ee(V(e, t)),
        ne = (e, t) => {
            for (let n = 0, o = e.length; n < o; ++n)
                if (!0 !== t(e[n], n)) return !1;
            return !0
        },
        oe = e => {
            const t = F.call(e, 0);
            return t.reverse(), t
        },
        re = (e, t) => G(e, (e => !H(t, e))),
        se = (e, t) => {
            const n = {};
            for (let o = 0, r = e.length; o < r; o++) {
                const r = e[o];
                n[String(r)] = t(r, o)
            }
            return n
        },
        ae = (e, t) => {
            const n = F.call(e, 0);
            return n.sort(t), n
        },
        ie = (e, t) => t >= 0 && t < e.length ? I.some(e[t]) : I.none(),
        le = e => ie(e, 0),
        de = e => ie(e, e.length - 1),
        ce = w(Array.from) ? Array.from : e => F.call(e),
        ue = (e, t) => {
            for (let n = 0; n < e.length; n++) {
                const o = t(e[n], n);
                if (o.isSome()) return o
            }
            return I.none()
        },
        me = Object.keys,
        fe = Object.hasOwnProperty,
        ge = (e, t) => {
            const n = me(e);
            for (let o = 0, r = n.length; o < r; o++) {
                const r = n[o];
                t(e[r], r)
            }
        },
        pe = (e, t) => he(e, ((e, n) => ({
            k: n,
            v: t(e, n)
        }))),
        he = (e, t) => {
            const n = {};
            return ge(e, ((e, o) => {
                const r = t(e, o);
                n[r.k] = r.v
            })), n
        },
        be = e => (t, n) => {
            e[n] = t
        },
        ve = (e, t, n, o) => {
            ge(e, ((e, r) => {
                (t(e, r) ? n : o)(e, r)
            }))
        },
        ye = (e, t) => {
            const n = {};
            return ve(e, t, be(n), E), n
        },
        Ce = (e, t) => {
            const n = [];
            return ge(e, ((e, o) => {
                n.push(t(e, o))
            })), n
        },
        we = e => Ce(e, R),
        xe = (e, t) => ke(e, t) ? I.from(e[t]) : I.none(),
        ke = (e, t) => fe.call(e, t),
        Ee = (e, t) => ke(e, t) && void 0 !== e[t] && null !== e[t],
        Se = e => {
            const t = {};
            return q(e, (e => {
                t[e] = {}
            })), me(t)
        },
        _e = e => void 0 !== e.length,
        Ne = Array.isArray,
        Re = (e, t, n) => {
            if (!e) return !1;
            if (n = n || e, _e(e)) {
                for (let o = 0, r = e.length; o < r; o++)
                    if (!1 === t.call(n, e[o], o, e)) return !1
            } else
                for (const o in e)
                    if (ke(e, o) && !1 === t.call(n, e[o], o, e)) return !1;
            return !0
        },
        Ae = (e, t) => {
            const n = [];
            return Re(e, ((o, r) => {
                n.push(t(o, r, e))
            })), n
        },
        Oe = (e, t) => {
            const n = [];
            return Re(e, ((o, r) => {
                t && !t(o, r, e) || n.push(o)
            })), n
        },
        Te = (e, t, n, o) => {
            let r = v(n) ? e[0] : n;
            for (let n = 0; n < e.length; n++) r = t.call(o, r, e[n], n);
            return r
        },
        Be = (e, t, n) => {
            for (let o = 0, r = e.length; o < r; o++)
                if (t.call(n, e[o], o, e)) return o;
            return -1
        },
        De = e => e[e.length - 1],
        Pe = e => {
            let t, n = !1;
            return (...o) => (n || (n = !0, t = e.apply(null, o)), t)
        },
        Le = () => Me(0, 0),
        Me = (e, t) => ({
            major: e,
            minor: t
        }),
        Ie = {
            nu: Me,
            detect: (e, t) => {
                const n = String(t).toLowerCase();
                return 0 === e.length ? Le() : ((e, t) => {
                    const n = ((e, t) => {
                        for (let n = 0; n < e.length; n++) {
                            const o = e[n];
                            if (o.test(t)) return o
                        }
                    })(e, t);
                    if (!n) return {
                        major: 0,
                        minor: 0
                    };
                    const o = e => Number(t.replace(n, "$" + e));
                    return Me(o(1), o(2))
                })(e, n)
            },
            unknown: Le
        },
        Fe = (e, t) => {
            const n = String(t).toLowerCase();
            return J(e, (e => e.search(n)))
        },
        Ue = (e, t, n) => "" === t || e.length >= t.length && e.substr(n, n + t.length) === t,
        ze = (e, t) => He(e, t) ? ((e, t) => e.substring(t))(e, t.length) : e,
        je = (e, t, n = 0, o) => {
            const r = e.indexOf(t, n);
            return -1 !== r && (!!v(o) || r + t.length <= o)
        },
        He = (e, t) => Ue(e, t, 0),
        $e = (e, t) => Ue(e, t, e.length - t.length),
        Ve = e => t => t.replace(e, ""),
        qe = Ve(/^\s+|\s+$/g),
        We = Ve(/^\s+/g),
        Ke = Ve(/\s+$/g),
        Ge = e => e.length > 0,
        Ye = e => !Ge(e),
        Xe = (e, t = 10) => {
            const n = parseInt(e, t);
            return isNaN(n) ? I.none() : I.some(n)
        },
        Qe = /.*?version\/\ ?([0-9]+)\.([0-9]+).*/,
        Je = e => t => je(t, e),
        Ze = [{
            name: "Edge",
            versionRegexes: [/.*?edge\/ ?([0-9]+)\.([0-9]+)$/],
            search: e => je(e, "edge/") && je(e, "chrome") && je(e, "safari") && je(e, "applewebkit")
        }, {
            name: "Chromium",
            brand: "Chromium",
            versionRegexes: [/.*?chrome\/([0-9]+)\.([0-9]+).*/, Qe],
            search: e => je(e, "chrome") && !je(e, "chromeframe")
        }, {
            name: "IE",
            versionRegexes: [/.*?msie\ ?([0-9]+)\.([0-9]+).*/, /.*?rv:([0-9]+)\.([0-9]+).*/],
            search: e => je(e, "msie") || je(e, "trident")
        }, {
            name: "Opera",
            versionRegexes: [Qe, /.*?opera\/([0-9]+)\.([0-9]+).*/],
            search: Je("opera")
        }, {
            name: "Firefox",
            versionRegexes: [/.*?firefox\/\ ?([0-9]+)\.([0-9]+).*/],
            search: Je("firefox")
        }, {
            name: "Safari",
            versionRegexes: [Qe, /.*?cpu os ([0-9]+)_([0-9]+).*/],
            search: e => (je(e, "safari") || je(e, "mobile/")) && je(e, "applewebkit")
        }],
        et = [{
            name: "Windows",
            search: Je("win"),
            versionRegexes: [/.*?windows\ nt\ ?([0-9]+)\.([0-9]+).*/]
        }, {
            name: "iOS",
            search: e => je(e, "iphone") || je(e, "ipad"),
            versionRegexes: [/.*?version\/\ ?([0-9]+)\.([0-9]+).*/, /.*cpu os ([0-9]+)_([0-9]+).*/, /.*cpu iphone os ([0-9]+)_([0-9]+).*/]
        }, {
            name: "Android",
            search: Je("android"),
            versionRegexes: [/.*?android\ ?([0-9]+)\.([0-9]+).*/]
        }, {
            name: "macOS",
            search: Je("mac os x"),
            versionRegexes: [/.*?mac\ os\ x\ ?([0-9]+)_([0-9]+).*/]
        }, {
            name: "Linux",
            search: Je("linux"),
            versionRegexes: []
        }, {
            name: "Solaris",
            search: Je("sunos"),
            versionRegexes: []
        }, {
            name: "FreeBSD",
            search: Je("freebsd"),
            versionRegexes: []
        }, {
            name: "ChromeOS",
            search: Je("cros"),
            versionRegexes: [/.*?chrome\/([0-9]+)\.([0-9]+).*/]
        }],
        tt = {
            browsers: N(Ze),
            oses: N(et)
        },
        nt = "Edge",
        ot = "Chromium",
        rt = "Opera",
        st = "Firefox",
        at = "Safari",
        it = e => {
            const t = e.current,
                n = e.version,
                o = e => () => t === e;
            return {
                current: t,
                version: n,
                isEdge: o(nt),
                isChromium: o(ot),
                isIE: o("IE"),
                isOpera: o(rt),
                isFirefox: o(st),
                isSafari: o(at)
            }
        },
        lt = () => it({
            current: void 0,
            version: Ie.unknown()
        }),
        dt = it,
        ct = (N(nt), N(ot), N("IE"), N(rt), N(st), N(at), "Windows"),
        ut = "Android",
        mt = "Linux",
        ft = "macOS",
        gt = "Solaris",
        pt = "FreeBSD",
        ht = "ChromeOS",
        bt = e => {
            const t = e.current,
                n = e.version,
                o = e => () => t === e;
            return {
                current: t,
                version: n,
                isWindows: o(ct),
                isiOS: o("iOS"),
                isAndroid: o(ut),
                isMacOS: o(ft),
                isLinux: o(mt),
                isSolaris: o(gt),
                isFreeBSD: o(pt),
                isChromeOS: o(ht)
            }
        },
        vt = () => bt({
            current: void 0,
            version: Ie.unknown()
        }),
        yt = bt,
        Ct = (N(ct), N("iOS"), N(ut), N(mt), N(ft), N(gt), N(pt), N(ht), e => window.matchMedia(e).matches);
    let wt = Pe((() => ((e, t, n) => {
        const o = tt.browsers(),
            r = tt.oses(),
            s = t.bind((e => ((e, t) => ue(t.brands, (t => {
                const n = t.brand.toLowerCase();
                return J(e, (e => {
                    var t;
                    return n === (null === (t = e.brand) || void 0 === t ? void 0 : t.toLowerCase())
                })).map((e => ({
                    current: e.name,
                    version: Ie.nu(parseInt(t.version, 10), 0)
                })))
            })))(o, e))).orThunk((() => ((e, t) => Fe(e, t).map((e => {
                const n = Ie.detect(e.versionRegexes, t);
                return {
                    current: e.name,
                    version: n
                }
            })))(o, e))).fold(lt, dt),
            a = ((e, t) => Fe(e, t).map((e => {
                const n = Ie.detect(e.versionRegexes, t);
                return {
                    current: e.name,
                    version: n
                }
            })))(r, e).fold(vt, yt),
            i = ((e, t, n, o) => {
                const r = e.isiOS() && !0 === /ipad/i.test(n),
                    s = e.isiOS() && !r,
                    a = e.isiOS() || e.isAndroid(),
                    i = a || o("(pointer:coarse)"),
                    l = r || !s && a && o("(min-device-width:768px)"),
                    d = s || a && !l,
                    c = t.isSafari() && e.isiOS() && !1 === /safari/i.test(n),
                    u = !d && !l && !c;
                return {
                    isiPad: N(r),
                    isiPhone: N(s),
                    isTablet: N(l),
                    isPhone: N(d),
                    isTouch: N(i),
                    isAndroid: e.isAndroid,
                    isiOS: e.isiOS,
                    isWebView: N(c),
                    isDesktop: N(u)
                }
            })(a, s, e, n);
        return {
            browser: s,
            os: a,
            deviceType: i
        }
    })(navigator.userAgent, I.from(navigator.userAgentData), Ct)));
    const xt = () => wt(),
        kt = navigator.userAgent,
        Et = xt(),
        St = Et.browser,
        _t = Et.os,
        Nt = Et.deviceType,
        Rt = -1 !== kt.indexOf("Windows Phone"),
        At = {
            transparentSrc: "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7",
            documentMode: St.isIE() ? document.documentMode || 7 : 10,
            cacheSuffix: null,
            container: null,
            canHaveCSP: !St.isIE(),
            windowsPhone: Rt,
            browser: {
                current: St.current,
                version: St.version,
                isChromium: St.isChromium,
                isEdge: St.isEdge,
                isFirefox: St.isFirefox,
                isIE: St.isIE,
                isOpera: St.isOpera,
                isSafari: St.isSafari
            },
            os: {
                current: _t.current,
                version: _t.version,
                isAndroid: _t.isAndroid,
                isChromeOS: _t.isChromeOS,
                isFreeBSD: _t.isFreeBSD,
                isiOS: _t.isiOS,
                isLinux: _t.isLinux,
                isMacOS: _t.isMacOS,
                isSolaris: _t.isSolaris,
                isWindows: _t.isWindows
            },
            deviceType: {
                isDesktop: Nt.isDesktop,
                isiPad: Nt.isiPad,
                isiPhone: Nt.isiPhone,
                isPhone: Nt.isPhone,
                isTablet: Nt.isTablet,
                isTouch: Nt.isTouch,
                isWebView: Nt.isWebView
            }
        },
        Ot = /^\s*|\s*$/g,
        Tt = e => y(e) ? "" : ("" + e).replace(Ot, ""),
        Bt = function(e, t, n, o) {
            o = o || this, e && (n && (e = e[n]), Re(e, ((e, r) => !1 !== t.call(o, e, r, n) && (Bt(e, t, n, o), !0))))
        },
        Dt = {
            trim: Tt,
            isArray: Ne,
            is: (e, t) => t ? !("array" !== t || !Ne(e)) || typeof e === t : void 0 !== e,
            toArray: e => {
                if (Ne(e)) return e;
                {
                    const t = [];
                    for (let n = 0, o = e.length; n < o; n++) t[n] = e[n];
                    return t
                }
            },
            makeMap: (e, t, n = {}) => {
                const o = m(e) ? e.split(t || ",") : e || [];
                let r = o.length;
                for (; r--;) n[o[r]] = {};
                return n
            },
            each: Re,
            map: Ae,
            grep: Oe,
            inArray: (e, t) => {
                if (e)
                    for (let n = 0, o = e.length; n < o; n++)
                        if (e[n] === t) return n;
                return -1
            },
            hasOwn: ke,
            extend: (e, ...t) => {
                for (let n = 0; n < t.length; n++) {
                    const o = t[n];
                    for (const t in o)
                        if (ke(o, t)) {
                            const n = o[t];
                            void 0 !== n && (e[t] = n)
                        }
                }
                return e
            },
            walk: Bt,
            resolve: (e, t = window) => {
                const n = e.split(".");
                for (let e = 0, o = n.length; e < o && (t = t[n[e]]); e++);
                return t
            },
            explode: (e, t) => p(e) ? e : "" === e ? [] : Ae(e.split(t || ","), Tt),
            _addCacheSuffix: e => {
                const t = At.cacheSuffix;
                return t && (e += (-1 === e.indexOf("?") ? "?" : "&") + t), e
            }
        },
        Pt = (e, t, n = A) => e.exists((e => n(e, t))),
        Lt = (e, t, n) => e.isSome() && t.isSome() ? I.some(n(e.getOrDie(), t.getOrDie())) : I.none(),
        Mt = (e, t) => e ? I.some(t) : I.none(),
        It = "undefined" != typeof window ? window : Function("return this;")(),
        Ft = (e, t) => ((e, t) => {
            let n = null != t ? t : It;
            for (let t = 0; t < e.length && null != n; ++t) n = n[e[t]];
            return n
        })(e.split("."), t),
        Ut = Object.getPrototypeOf,
        zt = e => {
            const t = Ft("ownerDocument.defaultView", e);
            return f(e) && ((e => ((e, t) => {
                const n = ((e, t) => Ft(e, t))(e, t);
                if (null == n) throw new Error(e + " not available on this browser");
                return n
            })("HTMLElement", e))(t).prototype.isPrototypeOf(e) || /^HTML\w*Element$/.test(Ut(e).constructor.name))
        },
        jt = e => e.dom.nodeName.toLowerCase(),
        Ht = e => e.dom.nodeType,
        $t = e => t => Ht(t) === e,
        Vt = e => qt(e) && zt(e.dom),
        qt = $t(1),
        Wt = $t(3),
        Kt = $t(9),
        Gt = $t(11),
        Yt = e => t => qt(t) && jt(t) === e,
        Xt = (e, t, n) => {
            if (!(m(n) || b(n) || x(n))) throw console.error("Invalid call to Attribute.set. Key ", t, ":: Value ", n, ":: Element ", e), new Error("Attribute value was not simple");
            e.setAttribute(t, n + "")
        },
        Qt = (e, t, n) => {
            Xt(e.dom, t, n)
        },
        Jt = (e, t) => {
            const n = e.dom;
            ge(t, ((e, t) => {
                Xt(n, t, e)
            }))
        },
        Zt = (e, t) => {
            const n = e.dom.getAttribute(t);
            return null === n ? void 0 : n
        },
        en = (e, t) => I.from(Zt(e, t)),
        tn = (e, t) => {
            const n = e.dom;
            return !(!n || !n.hasAttribute) && n.hasAttribute(t)
        },
        nn = (e, t) => {
            e.dom.removeAttribute(t)
        },
        on = e => X(e.dom.attributes, ((e, t) => (e[t.name] = t.value, e)), {}),
        rn = (e, t) => {
            const n = Zt(e, t);
            return void 0 === n || "" === n ? [] : n.split(" ")
        },
        sn = e => void 0 !== e.dom.classList,
        an = e => rn(e, "class"),
        ln = (e, t) => ((e, t, n) => {
            const o = rn(e, t).concat([n]);
            return Qt(e, t, o.join(" ")), !0
        })(e, "class", t),
        dn = (e, t) => ((e, t, n) => {
            const o = G(rn(e, t), (e => e !== n));
            return o.length > 0 ? Qt(e, t, o.join(" ")) : nn(e, t), !1
        })(e, "class", t),
        cn = (e, t) => {
            sn(e) ? e.dom.classList.add(t) : ln(e, t)
        },
        un = e => {
            0 === (sn(e) ? e.dom.classList : an(e)).length && nn(e, "class")
        },
        mn = (e, t) => {
            sn(e) ? e.dom.classList.remove(t) : dn(e, t), un(e)
        },
        fn = (e, t) => sn(e) && e.dom.classList.contains(t),
        gn = e => {
            if (null == e) throw new Error("Node cannot be null or undefined");
            return {
                dom: e
            }
        },
        pn = (e, t) => {
            const n = (t || document).createElement("div");
            if (n.innerHTML = e, !n.hasChildNodes() || n.childNodes.length > 1) {
                const t = "HTML does not have a single root node";
                throw console.error(t, e), new Error(t)
            }
            return gn(n.childNodes[0])
        },
        hn = (e, t) => {
            const n = (t || document).createElement(e);
            return gn(n)
        },
        bn = (e, t) => {
            const n = (t || document).createTextNode(e);
            return gn(n)
        },
        vn = gn,
        yn = (e, t, n) => I.from(e.dom.elementFromPoint(t, n)).map(gn),
        Cn = (e, t) => {
            const n = [],
                o = e => (n.push(e), t(e));
            let r = t(e);
            do {
                r = r.bind(o)
            } while (r.isSome());
            return n
        },
        wn = (e, t) => {
            const n = e.dom;
            if (1 !== n.nodeType) return !1;
            {
                const e = n;
                if (void 0 !== e.matches) return e.matches(t);
                if (void 0 !== e.msMatchesSelector) return e.msMatchesSelector(t);
                if (void 0 !== e.webkitMatchesSelector) return e.webkitMatchesSelector(t);
                if (void 0 !== e.mozMatchesSelector) return e.mozMatchesSelector(t);
                throw new Error("Browser lacks native selectors")
            }
        },
        xn = e => 1 !== e.nodeType && 9 !== e.nodeType && 11 !== e.nodeType || 0 === e.childElementCount,
        kn = (e, t) => e.dom === t.dom,
        En = (e, t) => {
            const n = e.dom,
                o = t.dom;
            return n !== o && n.contains(o)
        },
        Sn = e => vn(e.dom.ownerDocument),
        _n = e => Kt(e) ? e : Sn(e),
        Nn = e => vn(_n(e).dom.defaultView),
        Rn = e => I.from(e.dom.parentNode).map(vn),
        An = e => I.from(e.dom.parentElement).map(vn),
        On = (e, t) => {
            const n = w(t) ? t : L;
            let o = e.dom;
            const r = [];
            for (; null !== o.parentNode && void 0 !== o.parentNode;) {
                const e = o.parentNode,
                    t = vn(e);
                if (r.push(t), !0 === n(t)) break;
                o = e
            }
            return r
        },
        Tn = e => I.from(e.dom.previousSibling).map(vn),
        Bn = e => I.from(e.dom.nextSibling).map(vn),
        Dn = e => oe(Cn(e, Tn)),
        Pn = e => Cn(e, Bn),
        Ln = e => V(e.dom.childNodes, vn),
        Mn = (e, t) => {
            const n = e.dom.childNodes;
            return I.from(n[t]).map(vn)
        },
        In = e => Mn(e, 0),
        Fn = e => Mn(e, e.dom.childNodes.length - 1),
        Un = e => e.dom.childNodes.length,
        zn = e => Gt(e) && C(e.dom.host),
        jn = w(Element.prototype.attachShadow) && w(Node.prototype.getRootNode),
        Hn = N(jn),
        $n = jn ? e => vn(e.dom.getRootNode()) : _n,
        Vn = e => zn(e) ? e : (e => {
            const t = e.dom.head;
            if (null == t) throw new Error("Head is not available yet");
            return vn(t)
        })(_n(e)),
        qn = e => vn(e.dom.host),
        Wn = e => {
            if (Hn() && C(e.target)) {
                const t = vn(e.target);
                if (qt(t) && Kn(t) && e.composed && e.composedPath) {
                    const t = e.composedPath();
                    if (t) return le(t)
                }
            }
            return I.from(e.target)
        },
        Kn = e => C(e.dom.shadowRoot),
        Gn = e => {
            const t = Wt(e) ? e.dom.parentNode : e.dom;
            if (null == t || null === t.ownerDocument) return !1;
            const n = t.ownerDocument;
            return (e => {
                const t = $n(e);
                return zn(t) ? I.some(t) : I.none()
            })(vn(t)).fold((() => n.body.contains(t)), _(Gn, qn))
        };
    var Yn = (e, t, n, o, r) => e(n, o) ? I.some(n) : w(r) && r(n) ? I.none() : t(n, o, r);
    const Xn = (e, t, n) => {
            let o = e.dom;
            const r = w(n) ? n : L;
            for (; o.parentNode;) {
                o = o.parentNode;
                const e = vn(o);
                if (t(e)) return I.some(e);
                if (r(e)) break
            }
            return I.none()
        },
        Qn = (e, t, n) => Yn(((e, t) => t(e)), Xn, e, t, n),
        Jn = (e, t, n) => Xn(e, (e => wn(e, t)), n),
        Zn = (e, t) => ((e, t) => {
            const n = void 0 === t ? document : t.dom;
            return xn(n) ? I.none() : I.from(n.querySelector(e)).map(vn)
        })(t, e),
        eo = (e, t, n) => Yn(((e, t) => wn(e, t)), Jn, e, t, n),
        to = (e, t = !1) => {
            return Gn(e) ? e.dom.isContentEditable : (n = e, eo(n, "[contenteditable]")).fold(N(t), (e => "true" === no(e)));
            var n
        },
        no = e => e.dom.contentEditable,
        oo = e => void 0 !== e.style && w(e.style.getPropertyValue),
        ro = (e, t, n) => {
            if (!m(n)) throw console.error("Invalid call to CSS.set. Property ", t, ":: Value ", n, ":: Element ", e), new Error("CSS value must be a string: " + n);
            oo(e) && e.style.setProperty(t, n)
        },
        so = (e, t, n) => {
            const o = e.dom;
            ro(o, t, n)
        },
        ao = (e, t) => {
            const n = e.dom;
            ge(t, ((e, t) => {
                ro(n, t, e)
            }))
        },
        io = (e, t) => {
            const n = e.dom,
                o = window.getComputedStyle(n).getPropertyValue(t);
            return "" !== o || Gn(e) ? o : lo(n, t)
        },
        lo = (e, t) => oo(e) ? e.style.getPropertyValue(t) : "",
        co = (e, t) => {
            const n = e.dom,
                o = lo(n, t);
            return I.from(o).filter((e => e.length > 0))
        },
        uo = e => {
            const t = {},
                n = e.dom;
            if (oo(n))
                for (let e = 0; e < n.style.length; e++) {
                    const o = n.style.item(e);
                    t[o] = n.style[o]
                }
            return t
        },
        mo = (e, t) => {
            ((e, t) => {
                oo(e) && e.style.removeProperty(t)
            })(e.dom, t), Pt(en(e, "style").map(qe), "") && nn(e, "style")
        },
        fo = (e, t) => {
            Rn(e).each((n => {
                n.dom.insertBefore(t.dom, e.dom)
            }))
        },
        go = (e, t) => {
            Bn(e).fold((() => {
                Rn(e).each((e => {
                    ho(e, t)
                }))
            }), (e => {
                fo(e, t)
            }))
        },
        po = (e, t) => {
            In(e).fold((() => {
                ho(e, t)
            }), (n => {
                e.dom.insertBefore(t.dom, n.dom)
            }))
        },
        ho = (e, t) => {
            e.dom.appendChild(t.dom)
        },
        bo = (e, t) => {
            fo(e, t), ho(t, e)
        },
        vo = (e, t) => {
            q(t, (t => {
                ho(e, t)
            }))
        },
        yo = e => {
            e.dom.textContent = "", q(Ln(e), (e => {
                Co(e)
            }))
        },
        Co = e => {
            const t = e.dom;
            null !== t.parentNode && t.parentNode.removeChild(t)
        },
        wo = e => {
            const t = Ln(e);
            var n, o;
            t.length > 0 && (n = e, q(o = t, ((e, t) => {
                const r = 0 === t ? n : o[t - 1];
                go(r, e)
            }))), Co(e)
        },
        xo = e => V(e, vn),
        ko = e => e.dom.innerHTML,
        Eo = (e, t) => {
            const n = Sn(e).dom,
                o = vn(n.createDocumentFragment()),
                r = ((e, t) => {
                    const n = (t || document).createElement("div");
                    return n.innerHTML = e, Ln(vn(n))
                })(t, n);
            vo(o, r), yo(e), ho(e, o)
        },
        So = (e, t, n, o) => ((e, t, n, o, r) => {
            const s = ((e, t) => n => {
                e(n) && t((e => {
                    const t = vn(Wn(e).getOr(e.target)),
                        n = () => e.stopPropagation(),
                        o = () => e.preventDefault(),
                        r = S(o, n);
                    return ((e, t, n, o, r, s, a) => ({
                        target: e,
                        x: t,
                        y: n,
                        stop: o,
                        prevent: r,
                        kill: s,
                        raw: a
                    }))(t, e.clientX, e.clientY, n, o, r, e)
                })(n))
            })(n, o);
            return e.dom.addEventListener(t, s, false), {
                unbind: O(_o, e, t, s, false)
            }
        })(e, t, n, o),
        _o = (e, t, n, o) => {
            e.dom.removeEventListener(t, n, o)
        },
        No = (e, t) => ({
            left: e,
            top: t,
            translate: (n, o) => No(e + n, t + o)
        }),
        Ro = No,
        Ao = (e, t) => void 0 !== e ? e : void 0 !== t ? t : 0,
        Oo = e => {
            const t = e.dom,
                n = t.ownerDocument.body;
            return n === t ? Ro(n.offsetLeft, n.offsetTop) : Gn(e) ? (e => {
                const t = e.getBoundingClientRect();
                return Ro(t.left, t.top)
            })(t) : Ro(0, 0)
        },
        To = e => {
            const t = void 0 !== e ? e.dom : document,
                n = t.body.scrollLeft || t.documentElement.scrollLeft,
                o = t.body.scrollTop || t.documentElement.scrollTop;
            return Ro(n, o)
        },
        Bo = (e, t) => {
            xt().browser.isSafari() && w(e.dom.scrollIntoViewIfNeeded) ? e.dom.scrollIntoViewIfNeeded(!1) : e.dom.scrollIntoView(t)
        },
        Do = (e, t, n, o) => ({
            x: e,
            y: t,
            width: n,
            height: o,
            right: e + n,
            bottom: t + o
        }),
        Po = e => {
            const t = void 0 === e ? window : e,
                n = t.document,
                o = To(vn(n));
            return (e => {
                const t = void 0 === e ? window : e;
                return xt().browser.isFirefox() ? I.none() : I.from(t.visualViewport)
            })(t).fold((() => {
                const e = t.document.documentElement,
                    n = e.clientWidth,
                    r = e.clientHeight;
                return Do(o.left, o.top, n, r)
            }), (e => Do(Math.max(e.pageLeft, o.left), Math.max(e.pageTop, o.top), e.width, e.height)))
        },
        Lo = (e, t) => {
            let n = [];
            return q(Ln(e), (e => {
                t(e) && (n = n.concat([e])), n = n.concat(Lo(e, t))
            })), n
        },
        Mo = (e, t) => ((e, t) => {
            const n = void 0 === t ? document : t.dom;
            return xn(n) ? [] : V(n.querySelectorAll(e), vn)
        })(t, e),
        Io = (e, t, n) => Jn(e, t, n).isSome();
    class Fo {
        constructor(e, t) {
            this.node = e, this.rootNode = t, this.current = this.current.bind(this), this.next = this.next.bind(this), this.prev = this.prev.bind(this), this.prev2 = this.prev2.bind(this)
        }
        current() {
            return this.node
        }
        next(e) {
            return this.node = this.findSibling(this.node, "firstChild", "nextSibling", e), this.node
        }
        prev(e) {
            return this.node = this.findSibling(this.node, "lastChild", "previousSibling", e), this.node
        }
        prev2(e) {
            return this.node = this.findPreviousNode(this.node, e), this.node
        }
        findSibling(e, t, n, o) {
            if (e) {
                if (!o && e[t]) return e[t];
                if (e !== this.rootNode) {
                    let t = e[n];
                    if (t) return t;
                    for (let o = e.parentNode; o && o !== this.rootNode; o = o.parentNode)
                        if (t = o[n], t) return t
                }
            }
        }
        findPreviousNode(e, t) {
            if (e) {
                const n = e.previousSibling;
                if (this.rootNode && n === this.rootNode) return;
                if (n) {
                    if (!t)
                        for (let e = n.lastChild; e; e = e.lastChild)
                            if (!e.lastChild) return e;
                    return n
                }
                const o = e.parentNode;
                if (o && o !== this.rootNode) return o
            }
        }
    }
    const Uo = e => t => !!t && t.nodeType === e,
        zo = e => !!e && !Object.getPrototypeOf(e),
        jo = Uo(1),
        Ho = e => {
            const t = e.toLowerCase();
            return e => C(e) && e.nodeName.toLowerCase() === t
        },
        $o = e => {
            const t = e.map((e => e.toLowerCase()));
            return e => {
                if (e && e.nodeName) {
                    const n = e.nodeName.toLowerCase();
                    return H(t, n)
                }
                return !1
            }
        },
        Vo = (e, t) => {
            const n = t.toLowerCase().split(" ");
            return t => {
                if (jo(t)) {
                    const o = t.ownerDocument.defaultView;
                    if (o)
                        for (let r = 0; r < n.length; r++) {
                            const s = o.getComputedStyle(t, null);
                            if ((s ? s.getPropertyValue(e) : null) === n[r]) return !0
                        }
                }
                return !1
            }
        },
        qo = e => t => jo(t) && t.hasAttribute(e),
        Wo = e => jo(e) && e.hasAttribute("data-mce-bogus"),
        Ko = e => jo(e) && "TABLE" === e.tagName,
        Go = e => t => {
            if (jo(t)) {
                if (t.contentEditable === e) return !0;
                if (t.getAttribute("data-mce-contenteditable") === e) return !0
            }
            return !1
        },
        Yo = $o(["textarea", "input"]),
        Xo = Uo(3),
        Qo = Uo(4),
        Jo = Uo(7),
        Zo = Uo(8),
        er = Uo(9),
        tr = Uo(11),
        nr = Ho("br"),
        or = Ho("img"),
        rr = Go("true"),
        sr = Go("false"),
        ar = $o(["td", "th"]),
        ir = $o(["td", "th", "caption"]),
        lr = $o(["video", "audio", "object", "embed"]),
        dr = Ho("li"),
        cr = Ho("details"),
        ur = Ho("summary"),
        mr = "\ufeff",
        fr = "\xa0",
        gr = e => e === mr,
        pr = ((e, t) => {
            const n = t => e(t) ? I.from(t.dom.nodeValue) : I.none();
            return {
                get: t => {
                    if (!e(t)) throw new Error("Can only get text value of a text node");
                    return n(t).getOr("")
                },
                getOption: n,
                set: (t, n) => {
                    if (!e(t)) throw new Error("Can only set raw text value of a text node");
                    t.dom.nodeValue = n
                }
            }
        })(Wt),
        hr = e => pr.get(e),
        br = e => pr.getOption(e),
        vr = ["pre"].concat(["h1", "h2", "h3", "h4", "h5", "h6"]),
        yr = e => {
            let t;
            return n => (t = t || se(e, M), ke(t, jt(n)))
        },
        Cr = yr(["article", "aside", "details", "div", "dt", "figcaption", "footer", "form", "fieldset", "header", "hgroup", "html", "main", "nav", "section", "summary", "body", "p", "dl", "multicol", "dd", "figure", "address", "center", "blockquote", "h1", "h2", "h3", "h4", "h5", "h6", "listing", "xmp", "pre", "plaintext", "menu", "dir", "ul", "ol", "li", "hr", "table", "tbody", "thead", "tfoot", "th", "tr", "td", "caption"]),
        wr = e => qt(e) && !Cr(e),
        xr = e => qt(e) && "br" === jt(e),
        kr = yr(["h1", "h2", "h3", "h4", "h5", "h6", "p", "div", "address", "pre", "form", "blockquote", "center", "dir", "fieldset", "header", "footer", "article", "section", "hgroup", "aside", "nav", "figure"]),
        Er = yr(["ul", "ol", "dl"]),
        Sr = yr(["li", "dd", "dt"]),
        _r = yr(["thead", "tbody", "tfoot"]),
        Nr = yr(["td", "th"]),
        Rr = yr(["pre", "script", "textarea", "style"]),
        Ar = yr(vr),
        Or = e => Ar(e) || wr(e),
        Tr = () => {
            const e = hn("br");
            return Qt(e, "data-mce-bogus", "1"), e
        },
        Br = e => {
            yo(e), ho(e, Tr())
        },
        Dr = e => {
            Fn(e).each((t => {
                Tn(t).each((n => {
                    Cr(e) && xr(t) && Cr(n) && Co(t)
                }))
            }))
        },
        Pr = mr,
        Lr = gr,
        Mr = e => e.replace(/\uFEFF/g, ""),
        Ir = jo,
        Fr = Xo,
        Ur = e => (Fr(e) && (e = e.parentNode), Ir(e) && e.hasAttribute("data-mce-caret")),
        zr = e => Fr(e) && Lr(e.data),
        jr = e => Ur(e) || zr(e),
        Hr = e => e.firstChild !== e.lastChild || !nr(e.firstChild),
        $r = e => {
            const t = e.container();
            return !!Xo(t) && (t.data.charAt(e.offset()) === Pr || e.isAtStart() && zr(t.previousSibling))
        },
        Vr = e => {
            const t = e.container();
            return !!Xo(t) && (t.data.charAt(e.offset() - 1) === Pr || e.isAtEnd() && zr(t.nextSibling))
        },
        qr = e => Fr(e) && e.data[0] === Pr,
        Wr = e => Fr(e) && e.data[e.data.length - 1] === Pr,
        Kr = e => e && e.hasAttribute("data-mce-caret") ? ((e => {
            var t;
            const n = e.getElementsByTagName("br"),
                o = n[n.length - 1];
            Wo(o) && (null === (t = o.parentNode) || void 0 === t || t.removeChild(o))
        })(e), e.removeAttribute("data-mce-caret"), e.removeAttribute("data-mce-bogus"), e.removeAttribute("style"), e.removeAttribute("data-mce-style"), e.removeAttribute("_moz_abspos"), e) : null,
        Gr = e => Ur(e.startContainer),
        Yr = rr,
        Xr = sr,
        Qr = nr,
        Jr = Xo,
        Zr = $o(["script", "style", "textarea"]),
        es = $o(["img", "input", "textarea", "hr", "iframe", "video", "audio", "object", "embed"]),
        ts = $o(["table"]),
        ns = jr,
        os = e => !ns(e) && (Jr(e) ? !Zr(e.parentNode) : es(e) || Qr(e) || ts(e) || rs(e)),
        rs = e => !(e => jo(e) && "true" === e.getAttribute("unselectable"))(e) && Xr(e),
        ss = (e, t) => os(e) && ((e, t) => {
            for (let n = e.parentNode; n && n !== t; n = n.parentNode) {
                if (rs(n)) return !1;
                if (Yr(n)) return !0
            }
            return !0
        })(e, t),
        as = /^[ \t\r\n]*$/,
        is = e => as.test(e),
        ls = e => {
            for (const t of e)
                if (!gr(t)) return !1;
            return !0
        },
        ds = e => "\n" === e || "\r" === e,
        cs = (e, t = 4, n = !0, o = !0) => {
            const r = ((e, t) => t <= 0 ? "" : new Array(t + 1).join(" "))(0, t),
                s = e.replace(/\t/g, r),
                a = X(s, ((e, t) => (e => -1 !== " \f\t\v".indexOf(e))(t) || t === fr ? e.pcIsSpace || "" === e.str && n || e.str.length === s.length - 1 && o || ((e, t) => t < e.length && t >= 0 && ds(e[t]))(s, e.str.length + 1) ? {
                    pcIsSpace: !1,
                    str: e.str + fr
                } : {
                    pcIsSpace: !0,
                    str: e.str + " "
                } : {
                    pcIsSpace: ds(t),
                    str: e.str + t
                }), {
                    pcIsSpace: !1,
                    str: ""
                });
            return a.str
        },
        us = (e, t) => os(e) && !((e, t) => Xo(e) && is(e.data) && !((e, t) => {
            const n = vn(t),
                o = vn(e);
            return Io(o, "pre,code", O(kn, n))
        })(e, t))(e, t) || (e => jo(e) && "A" === e.nodeName && !e.hasAttribute("href") && (e.hasAttribute("name") || e.hasAttribute("id")))(e) || ms(e),
        ms = qo("data-mce-bookmark"),
        fs = qo("data-mce-bogus"),
        gs = ("data-mce-bogus", "all", e => jo(e) && "all" === e.getAttribute("data-mce-bogus"));
    const ps = (e, t = !0) => ((e, t) => {
            let n = 0;
            if (us(e, e)) return !1;
            {
                let o = e.firstChild;
                if (!o) return !0;
                const r = new Fo(o, e);
                do {
                    if (t) {
                        if (gs(o)) {
                            o = r.next(!0);
                            continue
                        }
                        if (fs(o)) {
                            o = r.next();
                            continue
                        }
                    }
                    if (nr(o)) n++, o = r.next();
                    else {
                        if (us(o, e)) return !1;
                        o = r.next()
                    }
                } while (o);
                return n <= 1
            }
        })(e.dom, t),
        hs = "data-mce-block",
        bs = e => (e => G(me(e), (e => !/[A-Z]/.test(e))))(e).join(","),
        vs = (e, t) => C(t.querySelector(e)) ? (t.setAttribute(hs, "true"), "inline-boundary" === t.getAttribute("data-mce-selected") && t.removeAttribute("data-mce-selected"), !0) : (t.removeAttribute(hs), !1),
        ys = (e, t) => {
            const n = bs(e.getTransparentElements()),
                o = bs(e.getBlockElements());
            return G(t.querySelectorAll(n), (e => vs(o, e)))
        },
        Cs = (e, t) => {
            var n;
            const o = t ? "lastChild" : "firstChild";
            for (let t = e[o]; t; t = t[o])
                if (ps(vn(t))) return void(null === (n = t.parentNode) || void 0 === n || n.removeChild(t))
        },
        ws = (e, t, n) => {
            const o = e.getBlockElements(),
                r = vn(t),
                s = e => jt(e) in o,
                a = e => kn(e, r);
            q(xo(n), (t => {
                Xn(t, s, a).each((n => {
                    const o = ((t, o) => G(Ln(t), (t => s(t) && !e.isValidChild(jt(n), jt(t)))))(t);
                    if (o.length > 0) {
                        const t = An(n);
                        q(o, (e => {
                            Xn(e, s, a).each((t => {
                                ((e, t) => {
                                    const n = document.createRange(),
                                        o = e.parentNode;
                                    if (o) {
                                        n.setStartBefore(e), n.setEndBefore(t);
                                        const r = n.extractContents();
                                        Cs(r, !0), n.setStartAfter(t), n.setEndAfter(e);
                                        const s = n.extractContents();
                                        Cs(s, !1), ps(vn(r)) || o.insertBefore(r, e), ps(vn(t)) || o.insertBefore(t, e), ps(vn(s)) || o.insertBefore(s, e), o.removeChild(e)
                                    }
                                })(t.dom, e.dom)
                            }))
                        })), t.each((t => ys(e, t.dom)))
                    }
                }))
            }))
        },
        xs = (e, t) => {
            const n = ys(e, t);
            ws(e, t, n), ((e, t, n) => {
                q([...n, ...Ns(e, t) ? [t] : []], (t => q(Mo(vn(t), t.nodeName.toLowerCase()), (t => {
                    Rs(e, t.dom) && wo(t)
                }))))
            })(e, t, n)
        },
        ks = (e, t) => {
            if (_s(e, t)) {
                const n = bs(e.getBlockElements());
                vs(n, t)
            }
        },
        Es = e => e.hasAttribute(hs),
        Ss = (e, t) => ke(e.getTransparentElements(), t),
        _s = (e, t) => jo(t) && Ss(e, t.nodeName),
        Ns = (e, t) => _s(e, t) && Es(t),
        Rs = (e, t) => _s(e, t) && !Es(t),
        As = (e, t) => 1 === t.type && Ss(e, t.name) && m(t.attr(hs)),
        Os = xt().browser,
        Ts = e => J(e, qt),
        Bs = (e, t) => e.children && H(e.children, t),
        Ds = (e, t = {}) => {
            let n = 0;
            const o = {},
                r = vn(e),
                s = _n(r),
                a = e => new Promise(((a, i) => {
                    let l;
                    const d = Dt._addCacheSuffix(e),
                        c = (e => xe(o, e).getOrThunk((() => ({
                            id: "mce-u" + n++,
                            passed: [],
                            failed: [],
                            count: 0
                        }))))(d);
                    o[d] = c, c.count++;
                    const u = (e, t) => {
                            q(e, P), c.status = t, c.passed = [], c.failed = [], l && (l.onload = null, l.onerror = null, l = null)
                        },
                        m = () => u(c.passed, 2),
                        f = () => u(c.failed, 3);
                    if (a && c.passed.push(a), i && c.failed.push(i), 1 === c.status) return;
                    if (2 === c.status) return void m();
                    if (3 === c.status) return void f();
                    c.status = 1;
                    const g = hn("link", s.dom);
                    var p;
                    Jt(g, {
                        rel: "stylesheet",
                        type: "text/css",
                        id: c.id
                    }), t.contentCssCors && Qt(g, "crossOrigin", "anonymous"), t.referrerPolicy && Qt(g, "referrerpolicy", t.referrerPolicy), l = g.dom, l.onload = m, l.onerror = f, p = g, ho(Vn(r), p), Qt(g, "href", d)
                })),
                i = e => {
                    const t = Dt._addCacheSuffix(e);
                    xe(o, t).each((e => {
                        0 == --e.count && (delete o[t], (e => {
                            const t = Vn(r);
                            Zn(t, "#" + e).each(Co)
                        })(e.id))
                    }))
                };
            return {
                load: a,
                loadAll: e => Promise.allSettled(V(e, (e => a(e).then(N(e))))).then((e => {
                    const t = K(e, (e => "fulfilled" === e.status));
                    return t.fail.length > 0 ? Promise.reject(V(t.fail, (e => e.reason))) : V(t.pass, (e => e.value))
                })),
                unload: i,
                unloadAll: e => {
                    q(e, (e => {
                        i(e)
                    }))
                },
                _setReferrerPolicy: e => {
                    t.referrerPolicy = e
                },
                _setContentCssCors: e => {
                    t.contentCssCors = e
                }
            }
        },
        Ps = (() => {
            const e = new WeakMap;
            return {
                forElement: (t, n) => {
                    const o = $n(t).dom;
                    return I.from(e.get(o)).getOrThunk((() => {
                        const t = Ds(o, n);
                        return e.set(o, t), t
                    }))
                }
            }
        })(),
        Ls = (e, t) => C(e) && (us(e, t) || wr(vn(e))),
        Ms = e => (e => "span" === e.nodeName.toLowerCase())(e) && "bookmark" === e.getAttribute("data-mce-type"),
        Is = (e, t, n) => {
            var o;
            const r = n || t;
            if (jo(t) && Ms(t)) return t;
            const s = t.childNodes;
            for (let t = s.length - 1; t >= 0; t--) Is(e, s[t], r);
            if (jo(t)) {
                const e = t.childNodes;
                1 === e.length && Ms(e[0]) && (null === (o = t.parentNode) || void 0 === o || o.insertBefore(e[0], t))
            }
            return (e => tr(e) || er(e))(t) || us(t, r) || (e => !!jo(e) && e.childNodes.length > 0)(t) || ((e, t) => Xo(e) && e.data.length > 0 && ((e, t) => {
                const n = new Fo(e, t).prev(!1),
                    o = new Fo(e, t).next(!1),
                    r = v(n) || Ls(n, t),
                    s = v(o) || Ls(o, t);
                return r && s
            })(e, t))(t, r) || e.remove(t), t
        },
        Fs = Dt.makeMap,
        Us = /[&<>\"\u0060\u007E-\uD7FF\uE000-\uFFEF]|[\uD800-\uDBFF][\uDC00-\uDFFF]/g,
        zs = /[<>&\u007E-\uD7FF\uE000-\uFFEF]|[\uD800-\uDBFF][\uDC00-\uDFFF]/g,
        js = /[<>&\"\']/g,
        Hs = /&#([a-z0-9]+);?|&([a-z0-9]+);/gi,
        $s = {
            128: "\u20ac",
            130: "\u201a",
            131: "\u0192",
            132: "\u201e",
            133: "\u2026",
            134: "\u2020",
            135: "\u2021",
            136: "\u02c6",
            137: "\u2030",
            138: "\u0160",
            139: "\u2039",
            140: "\u0152",
            142: "\u017d",
            145: "\u2018",
            146: "\u2019",
            147: "\u201c",
            148: "\u201d",
            149: "\u2022",
            150: "\u2013",
            151: "\u2014",
            152: "\u02dc",
            153: "\u2122",
            154: "\u0161",
            155: "\u203a",
            156: "\u0153",
            158: "\u017e",
            159: "\u0178"
        },
        Vs = {
            '"': "&quot;",
            "'": "&#39;",
            "<": "&lt;",
            ">": "&gt;",
            "&": "&amp;",
            "`": "&#96;"
        },
        qs = {
            "&lt;": "<",
            "&gt;": ">",
            "&amp;": "&",
            "&quot;": '"',
            "&apos;": "'"
        },
        Ws = (e, t) => {
            const n = {};
            if (e) {
                const o = e.split(",");
                t = t || 10;
                for (let e = 0; e < o.length; e += 2) {
                    const r = String.fromCharCode(parseInt(o[e], t));
                    if (!Vs[r]) {
                        const t = "&" + o[e + 1] + ";";
                        n[r] = t, n[t] = r
                    }
                }
                return n
            }
        },
        Ks = Ws("50,nbsp,51,iexcl,52,cent,53,pound,54,curren,55,yen,56,brvbar,57,sect,58,uml,59,copy,5a,ordf,5b,laquo,5c,not,5d,shy,5e,reg,5f,macr,5g,deg,5h,plusmn,5i,sup2,5j,sup3,5k,acute,5l,micro,5m,para,5n,middot,5o,cedil,5p,sup1,5q,ordm,5r,raquo,5s,frac14,5t,frac12,5u,frac34,5v,iquest,60,Agrave,61,Aacute,62,Acirc,63,Atilde,64,Auml,65,Aring,66,AElig,67,Ccedil,68,Egrave,69,Eacute,6a,Ecirc,6b,Euml,6c,Igrave,6d,Iacute,6e,Icirc,6f,Iuml,6g,ETH,6h,Ntilde,6i,Ograve,6j,Oacute,6k,Ocirc,6l,Otilde,6m,Ouml,6n,times,6o,Oslash,6p,Ugrave,6q,Uacute,6r,Ucirc,6s,Uuml,6t,Yacute,6u,THORN,6v,szlig,70,agrave,71,aacute,72,acirc,73,atilde,74,auml,75,aring,76,aelig,77,ccedil,78,egrave,79,eacute,7a,ecirc,7b,euml,7c,igrave,7d,iacute,7e,icirc,7f,iuml,7g,eth,7h,ntilde,7i,ograve,7j,oacute,7k,ocirc,7l,otilde,7m,ouml,7n,divide,7o,oslash,7p,ugrave,7q,uacute,7r,ucirc,7s,uuml,7t,yacute,7u,thorn,7v,yuml,ci,fnof,sh,Alpha,si,Beta,sj,Gamma,sk,Delta,sl,Epsilon,sm,Zeta,sn,Eta,so,Theta,sp,Iota,sq,Kappa,sr,Lambda,ss,Mu,st,Nu,su,Xi,sv,Omicron,t0,Pi,t1,Rho,t3,Sigma,t4,Tau,t5,Upsilon,t6,Phi,t7,Chi,t8,Psi,t9,Omega,th,alpha,ti,beta,tj,gamma,tk,delta,tl,epsilon,tm,zeta,tn,eta,to,theta,tp,iota,tq,kappa,tr,lambda,ts,mu,tt,nu,tu,xi,tv,omicron,u0,pi,u1,rho,u2,sigmaf,u3,sigma,u4,tau,u5,upsilon,u6,phi,u7,chi,u8,psi,u9,omega,uh,thetasym,ui,upsih,um,piv,812,bull,816,hellip,81i,prime,81j,Prime,81u,oline,824,frasl,88o,weierp,88h,image,88s,real,892,trade,89l,alefsym,8cg,larr,8ch,uarr,8ci,rarr,8cj,darr,8ck,harr,8dl,crarr,8eg,lArr,8eh,uArr,8ei,rArr,8ej,dArr,8ek,hArr,8g0,forall,8g2,part,8g3,exist,8g5,empty,8g7,nabla,8g8,isin,8g9,notin,8gb,ni,8gf,prod,8gh,sum,8gi,minus,8gn,lowast,8gq,radic,8gt,prop,8gu,infin,8h0,ang,8h7,and,8h8,or,8h9,cap,8ha,cup,8hb,int,8hk,there4,8hs,sim,8i5,cong,8i8,asymp,8j0,ne,8j1,equiv,8j4,le,8j5,ge,8k2,sub,8k3,sup,8k4,nsub,8k6,sube,8k7,supe,8kl,oplus,8kn,otimes,8l5,perp,8m5,sdot,8o8,lceil,8o9,rceil,8oa,lfloor,8ob,rfloor,8p9,lang,8pa,rang,9ea,loz,9j0,spades,9j3,clubs,9j5,hearts,9j6,diams,ai,OElig,aj,oelig,b0,Scaron,b1,scaron,bo,Yuml,m6,circ,ms,tilde,802,ensp,803,emsp,809,thinsp,80c,zwnj,80d,zwj,80e,lrm,80f,rlm,80j,ndash,80k,mdash,80o,lsquo,80p,rsquo,80q,sbquo,80s,ldquo,80t,rdquo,80u,bdquo,810,dagger,811,Dagger,81g,permil,81p,lsaquo,81q,rsaquo,85c,euro", 32),
        Gs = (e, t) => e.replace(t ? Us : zs, (e => Vs[e] || e)),
        Ys = (e, t) => e.replace(t ? Us : zs, (e => e.length > 1 ? "&#" + (1024 * (e.charCodeAt(0) - 55296) + (e.charCodeAt(1) - 56320) + 65536) + ";" : Vs[e] || "&#" + e.charCodeAt(0) + ";")),
        Xs = (e, t, n) => {
            const o = n || Ks;
            return e.replace(t ? Us : zs, (e => Vs[e] || o[e] || e))
        },
        Qs = {
            encodeRaw: Gs,
            encodeAllRaw: e => ("" + e).replace(js, (e => Vs[e] || e)),
            encodeNumeric: Ys,
            encodeNamed: Xs,
            getEncodeFunc: (e, t) => {
                const n = Ws(t) || Ks,
                    o = Fs(e.replace(/\+/g, ","));
                return o.named && o.numeric ? (e, t) => e.replace(t ? Us : zs, (e => void 0 !== Vs[e] ? Vs[e] : void 0 !== n[e] ? n[e] : e.length > 1 ? "&#" + (1024 * (e.charCodeAt(0) - 55296) + (e.charCodeAt(1) - 56320) + 65536) + ";" : "&#" + e.charCodeAt(0) + ";")) : o.named ? t ? (e, t) => Xs(e, t, n) : Xs : o.numeric ? Ys : Gs
            },
            decode: e => e.replace(Hs, ((e, t) => t ? (t = "x" === t.charAt(0).toLowerCase() ? parseInt(t.substr(1), 16) : parseInt(t, 10)) > 65535 ? (t -= 65536, String.fromCharCode(55296 + (t >> 10), 56320 + (1023 & t))) : $s[t] || String.fromCharCode(t) : qs[e] || Ks[e] || (e => {
                const t = hn("div").dom;
                return t.innerHTML = e, t.textContent || t.innerText || e
            })(e)))
        },
        Js = {},
        Zs = {},
        ea = {},
        ta = Dt.makeMap,
        na = Dt.each,
        oa = Dt.extend,
        ra = Dt.explode,
        sa = Dt.inArray,
        aa = (e, t) => (e = Dt.trim(e)) ? e.split(t || " ") : [],
        ia = (e, t = {}) => {
            const n = ta(e, " ", ta(e.toUpperCase(), " "));
            return oa(n, t)
        },
        la = e => ia("td th li dt dd figcaption caption details summary", e.getTextBlockElements()),
        da = (e, t) => {
            if (e) {
                const n = {};
                return m(e) && (e = {
                    "*": e
                }), na(e, ((e, o) => {
                    n[o] = n[o.toUpperCase()] = "map" === t ? ta(e, /[, ]/) : ra(e, /[, ]/)
                })), n
            }
        },
        ca = (e = {}) => {
            var t;
            const n = {},
                o = {};
            let r = [];
            const s = {},
                a = {},
                i = (t, n, o) => {
                    const r = e[t];
                    if (r) return ta(r, /[, ]/, ta(r.toUpperCase(), /[, ]/));
                    {
                        let e = Zs[t];
                        return e || (e = ia(n, o), Zs[t] = e), e
                    }
                },
                l = null !== (t = e.schema) && void 0 !== t ? t : "html5",
                d = (e => {
                    const t = {};
                    let n, o, r, s;
                    const a = (e, o = "", r = "") => {
                            const s = aa(r),
                                a = aa(e);
                            let i = a.length;
                            for (; i--;) {
                                const e = aa([n, o].join(" "));
                                t[a[i]] = {
                                    attributes: se(e, (() => ({}))),
                                    attributesOrder: e,
                                    children: se(s, N(ea))
                                }
                            }
                        },
                        i = (e, n) => {
                            const o = aa(e),
                                r = aa(n);
                            let s = o.length;
                            for (; s--;) {
                                const e = t[o[s]];
                                for (let t = 0, n = r.length; t < n; t++) e.attributes[r[t]] = {}, e.attributesOrder.push(r[t])
                            }
                        };
                    if (Js[e]) return Js[e];
                    if (n = "id accesskey class dir lang style tabindex title role", o = "address blockquote div dl fieldset form h1 h2 h3 h4 h5 h6 hr menu ol p pre table ul", r = "a abbr b bdo br button cite code del dfn em embed i iframe img input ins kbd label map noscript object q s samp script select small span strong sub sup textarea u var #text #comment", "html4" !== e && (n += " contenteditable contextmenu draggable dropzone hidden spellcheck translate", o += " article aside details dialog figure main header footer hgroup section nav a ins del canvas map", r += " audio canvas command datalist mark meter output picture progress time wbr video ruby bdi keygen"), "html5-strict" !== e) {
                        n += " xml:lang";
                        const e = "acronym applet basefont big font strike tt";
                        r = [r, e].join(" "), na(aa(e), (e => {
                            a(e, "", r)
                        }));
                        const t = "center dir isindex noframes";
                        o = [o, t].join(" "), s = [o, r].join(" "), na(aa(t), (e => {
                            a(e, "", s)
                        }))
                    }
                    return s = s || [o, r].join(" "), a("html", "manifest", "head body"), a("head", "", "base command link meta noscript script style title"), a("title hr noscript br"), a("base", "href target"), a("link", "href rel media hreflang type sizes hreflang"), a("meta", "name http-equiv content charset"), a("style", "media type scoped"), a("script", "src async defer type charset"), a("body", "onafterprint onbeforeprint onbeforeunload onblur onerror onfocus onhashchange onload onmessage onoffline ononline onpagehide onpageshow onpopstate onresize onscroll onstorage onunload", s), a("dd div", "", s), a("address dt caption", "", "html4" === e ? r : s), a("h1 h2 h3 h4 h5 h6 pre p abbr code var samp kbd sub sup i b u bdo span legend em strong small s cite dfn", "", r), a("blockquote", "cite", s), a("ol", "reversed start type", "li"), a("ul", "", "li"), a("li", "value", s), a("dl", "", "dt dd"), a("a", "href target rel media hreflang type", "html4" === e ? r : s), a("q", "cite", r), a("ins del", "cite datetime", s), a("img", "src sizes srcset alt usemap ismap width height"), a("iframe", "src name width height", s), a("embed", "src type width height"), a("object", "data type typemustmatch name usemap form width height", [s, "param"].join(" ")), a("param", "name value"), a("map", "name", [s, "area"].join(" ")), a("area", "alt coords shape href target rel media hreflang type"), a("table", "border", "caption colgroup thead tfoot tbody tr" + ("html4" === e ? " col" : "")), a("colgroup", "span", "col"), a("col", "span"), a("tbody thead tfoot", "", "tr"), a("tr", "", "td th"), a("td", "colspan rowspan headers", s), a("th", "colspan rowspan headers scope abbr", s), a("form", "accept-charset action autocomplete enctype method name novalidate target", s), a("fieldset", "disabled form name", [s, "legend"].join(" ")), a("label", "form for", r), a("input", "accept alt autocomplete checked dirname disabled form formaction formenctype formmethod formnovalidate formtarget height list max maxlength min multiple name pattern readonly required size src step type value width"), a("button", "disabled form formaction formenctype formmethod formnovalidate formtarget name type value", "html4" === e ? s : r), a("select", "disabled form multiple name required size", "option optgroup"), a("optgroup", "disabled label", "option"), a("option", "disabled label selected value"), a("textarea", "cols dirname disabled form maxlength name readonly required rows wrap"), a("menu", "type label", [s, "li"].join(" ")), a("noscript", "", s), "html4" !== e && (a("wbr"), a("ruby", "", [r, "rt rp"].join(" ")), a("figcaption", "", s), a("mark rt rp summary bdi", "", r), a("canvas", "width height", s), a("video", "src crossorigin poster preload autoplay mediagroup loop muted controls width height buffered", [s, "track source"].join(" ")), a("audio", "src crossorigin preload autoplay mediagroup loop muted controls buffered volume", [s, "track source"].join(" ")), a("picture", "", "img source"), a("source", "src srcset type media sizes"), a("track", "kind src srclang label default"), a("datalist", "", [r, "option"].join(" ")), a("article section nav aside main header footer", "", s), a("hgroup", "", "h1 h2 h3 h4 h5 h6"), a("figure", "", [s, "figcaption"].join(" ")), a("time", "datetime", r), a("dialog", "open", s), a("command", "type label icon disabled checked radiogroup command"), a("output", "for form name", r), a("progress", "value max", r), a("meter", "value min max low high optimum", r), a("details", "open", [s, "summary"].join(" ")), a("keygen", "autofocus challenge disabled form keytype name")), "html5-strict" !== e && (i("script", "language xml:space"), i("style", "xml:space"), i("object", "declare classid code codebase codetype archive standby align border hspace vspace"), i("embed", "align name hspace vspace"), i("param", "valuetype type"), i("a", "charset name rev shape coords"), i("br", "clear"), i("applet", "codebase archive code object alt name width height align hspace vspace"), i("img", "name longdesc align border hspace vspace"), i("iframe", "longdesc frameborder marginwidth marginheight scrolling align"), i("font basefont", "size color face"), i("input", "usemap align"), i("select"), i("textarea"), i("h1 h2 h3 h4 h5 h6 div p legend caption", "align"), i("ul", "type compact"), i("li", "type"), i("ol dl menu dir", "compact"), i("pre", "width xml:space"), i("hr", "align noshade size width"), i("isindex", "prompt"), i("table", "summary width frame rules cellspacing cellpadding align bgcolor"), i("col", "width align char charoff valign"), i("colgroup", "width align char charoff valign"), i("thead", "align char charoff valign"), i("tr", "align char charoff valign bgcolor"), i("th", "axis align char charoff valign nowrap bgcolor width height"), i("form", "accept"), i("td", "abbr axis scope align char charoff valign nowrap bgcolor width height"), i("tfoot", "align char charoff valign"), i("tbody", "align char charoff valign"), i("area", "nohref"), i("body", "background bgcolor text link vlink alink")), "html4" !== e && (i("input button select textarea", "autofocus"), i("input textarea", "placeholder"), i("a", "download"), i("link script img", "crossorigin"), i("img", "loading"), i("iframe", "sandbox seamless allow allowfullscreen loading")), "html4" !== e && q([t.video, t.audio], (e => {
                        delete e.children.audio, delete e.children.video
                    })), na(aa("a form meter progress dfn"), (e => {
                        t[e] && delete t[e].children[e]
                    })), delete t.caption.children.table, delete t.script, Js[e] = t, t
                })(l);
            !1 === e.verify_html && (e.valid_elements = "*[*]");
            const c = da(e.valid_styles),
                u = da(e.invalid_styles, "map"),
                m = da(e.valid_classes, "map"),
                f = i("whitespace_elements", "pre script noscript style textarea video audio iframe object code"),
                g = i("self_closing_elements", "colgroup dd dt li option p td tfoot th thead tr"),
                p = i("void_elements", "area base basefont br col frame hr img input isindex link meta param embed source wbr track"),
                h = i("boolean_attributes", "checked compact declare defer disabled ismap multiple nohref noresize noshade nowrap readonly selected autoplay loop controls allowfullscreen"),
                b = "td th iframe video audio object script code",
                v = i("non_empty_elements", b + " pre", p),
                y = i("move_caret_before_on_enter_elements", b + " table", p),
                C = i("text_block_elements", "h1 h2 h3 h4 h5 h6 p div address pre form blockquote center dir fieldset header footer article section hgroup aside main nav figure"),
                w = i("block_elements", "hr table tbody thead tfoot th tr td li ol ul caption dl dt dd noscript menu isindex option datalist select optgroup figcaption details summary", C),
                x = i("text_inline_elements", "span strong b em i font s strike u var cite dfn code mark q sup sub samp"),
                k = i("transparent_elements", "a ins del canvas map");
            na("script noscript iframe noframes noembed title style textarea xmp plaintext".split(" "), (e => {
                a[e] = new RegExp("</" + e + "[^>]*>", "gi")
            }));
            const E = e => new RegExp("^" + e.replace(/([?+*])/g, ".$1") + "$"),
                S = e => {
                    const t = /^([#+\-])?([^\[!\/]+)(?:\/([^\[!]+))?(?:(!?)\[([^\]]+)])?$/,
                        o = /^([!\-])?(\w+[\\:]:\w+|[^=~<]+)?(?:([=~<])(.*))?$/,
                        s = /[*?+]/;
                    if (e) {
                        const a = aa(e, ",");
                        let i, l;
                        n["@"] && (i = n["@"].attributes, l = n["@"].attributesOrder);
                        for (let e = 0, d = a.length; e < d; e++) {
                            let d = t.exec(a[e]);
                            if (d) {
                                const e = d[1],
                                    t = d[2],
                                    a = d[3],
                                    c = d[5],
                                    u = {},
                                    m = [],
                                    f = {
                                        attributes: u,
                                        attributesOrder: m
                                    };
                                if ("#" === e && (f.paddEmpty = !0), "-" === e && (f.removeEmpty = !0), "!" === d[4] && (f.removeEmptyAttrs = !0), i && (ge(i, ((e, t) => {
                                        u[t] = e
                                    })), l && m.push(...l)), c) {
                                    const e = aa(c, "|");
                                    for (let t = 0, n = e.length; t < n; t++)
                                        if (d = o.exec(e[t]), d) {
                                            const e = {},
                                                t = d[1],
                                                n = d[2].replace(/[\\:]:/g, ":"),
                                                o = d[3],
                                                r = d[4];
                                            if ("!" === t && (f.attributesRequired = f.attributesRequired || [], f.attributesRequired.push(n), e.required = !0), "-" === t) {
                                                delete u[n], m.splice(sa(m, n), 1);
                                                continue
                                            }
                                            if (o && ("=" === o && (f.attributesDefault = f.attributesDefault || [], f.attributesDefault.push({
                                                    name: n,
                                                    value: r
                                                }), e.defaultValue = r), "~" === o && (f.attributesForced = f.attributesForced || [], f.attributesForced.push({
                                                    name: n,
                                                    value: r
                                                }), e.forcedValue = r), "<" === o && (e.validValues = ta(r, "?"))), s.test(n)) {
                                                const t = e;
                                                f.attributePatterns = f.attributePatterns || [], t.pattern = E(n), f.attributePatterns.push(t)
                                            } else u[n] || m.push(n), u[n] = e
                                        }
                                }
                                if (i || "@" !== t || (i = u, l = m), a && (f.outputName = t, n[a] = f), s.test(t)) {
                                    const e = f;
                                    e.pattern = E(t), r.push(e)
                                } else n[t] = f
                            }
                        }
                    }
                },
                _ = e => {
                    r = [], q(me(n), (e => {
                        delete n[e]
                    })), S(e), na(d, ((e, t) => {
                        o[t] = e.children
                    }))
                },
                R = e => {
                    const t = /^(~)?(.+)$/;
                    e && (delete Zs.text_block_elements, delete Zs.block_elements, na(aa(e, ","), (e => {
                        const r = t.exec(e);
                        if (r) {
                            const e = "~" === r[1],
                                t = e ? "span" : "div",
                                a = r[2];
                            if (o[a] = o[t], s[a] = t, v[a.toUpperCase()] = {}, v[a] = {}, e || (w[a.toUpperCase()] = {}, w[a] = {}), !n[a]) {
                                let e = n[t];
                                e = oa({}, e), delete e.removeEmptyAttrs, delete e.removeEmpty, n[a] = e
                            }
                            na(o, ((e, n) => {
                                e[t] && (o[n] = e = oa({}, o[n]), e[a] = e[t])
                            }))
                        }
                    })))
                },
                A = e => {
                    const t = /^([+\-]?)([A-Za-z0-9_\-.\u00b7\u00c0-\u00d6\u00d8-\u00f6\u00f8-\u037d\u037f-\u1fff\u200c-\u200d\u203f-\u2040\u2070-\u218f\u2c00-\u2fef\u3001-\ud7ff\uf900-\ufdcf\ufdf0-\ufffd]+)\[([^\]]+)]$/;
                    delete Js[l], e && na(aa(e, ","), (e => {
                        const n = t.exec(e);
                        if (n) {
                            const e = n[1];
                            let t;
                            t = e ? o[n[2]] : o[n[2]] = {
                                "#comment": {}
                            }, t = o[n[2]], na(aa(n[3], "|"), (n => {
                                "-" === e ? delete t[n] : t[n] = {}
                            }))
                        }
                    }))
                },
                O = e => {
                    const t = n[e];
                    if (t) return t;
                    let o = r.length;
                    for (; o--;) {
                        const t = r[o];
                        if (t.pattern.test(e)) return t
                    }
                };
            e.valid_elements ? _(e.valid_elements) : (na(d, ((e, t) => {
                n[t] = {
                    attributes: e.attributes,
                    attributesOrder: e.attributesOrder
                }, o[t] = e.children
            })), na(aa("strong/b em/i"), (e => {
                const t = aa(e, "/");
                n[t[1]].outputName = t[0]
            })), na(x, ((t, o) => {
                n[o] && (e.padd_empty_block_inline_children && (n[o].paddInEmptyBlock = !0), n[o].removeEmpty = !0)
            })), na(aa("ol ul blockquote a table tbody"), (e => {
                n[e] && (n[e].removeEmpty = !0)
            })), na(aa("p h1 h2 h3 h4 h5 h6 th td pre div address caption li summary"), (e => {
                n[e] && (n[e].paddEmpty = !0)
            })), na(aa("span"), (e => {
                n[e].removeEmptyAttrs = !0
            }))), R(e.custom_elements), A(e.valid_children), S(e.extended_valid_elements), A("+ol[ul|ol],+ul[ul|ol]"), na({
                dd: "dl",
                dt: "dl",
                li: "ul ol",
                td: "tr",
                th: "tr",
                tr: "tbody thead tfoot",
                tbody: "table",
                thead: "table",
                tfoot: "table",
                legend: "fieldset",
                area: "map",
                param: "video audio object"
            }, ((e, t) => {
                n[t] && (n[t].parentsRequired = aa(e))
            })), e.invalid_elements && na(ra(e.invalid_elements), (e => {
                n[e] && delete n[e]
            })), O("span") || S("span[!data-mce-type|*]");
            const T = N(c),
                B = N(u),
                D = N(m),
                P = N(h),
                L = N(w),
                M = N(C),
                I = N(x),
                F = N(Object.seal(p)),
                U = N(g),
                z = N(v),
                j = N(y),
                H = N(f),
                $ = N(k),
                V = N(Object.seal(a)),
                W = N(s);
            return {
                type: l,
                children: o,
                elements: n,
                getValidStyles: T,
                getValidClasses: D,
                getBlockElements: L,
                getInvalidStyles: B,
                getVoidElements: F,
                getTextBlockElements: M,
                getTextInlineElements: I,
                getBoolAttrs: P,
                getElementRule: O,
                getSelfClosingElements: U,
                getNonEmptyElements: z,
                getMoveCaretBeforeOnEnterElements: j,
                getWhitespaceElements: H,
                getTransparentElements: $,
                getSpecialElements: V,
                isValidChild: (e, t) => {
                    const n = o[e.toLowerCase()];
                    return !(!n || !n[t.toLowerCase()])
                },
                isValid: (e, t) => {
                    const n = O(e);
                    if (n) {
                        if (!t) return !0;
                        {
                            if (n.attributes[t]) return !0;
                            const e = n.attributePatterns;
                            if (e) {
                                let n = e.length;
                                for (; n--;)
                                    if (e[n].pattern.test(t)) return !0
                            }
                        }
                    }
                    return !1
                },
                getCustomElements: W,
                addValidElements: S,
                setValidElements: _,
                addCustomElements: R,
                addValidChildren: A
            }
        },
        ua = (e = {}, t) => {
            const n = /(?:url(?:(?:\(\s*\"([^\"]+)\"\s*\))|(?:\(\s*\'([^\']+)\'\s*\))|(?:\(\s*([^)\s]+)\s*\))))|(?:\'([^\']+)\')|(?:\"([^\"]+)\")/gi,
                o = /\s*([^:]+):\s*([^;]+);?/g,
                r = /\s+$/,
                s = {};
            let a, i;
            const l = mr;
            t && (a = t.getValidStyles(), i = t.getInvalidStyles());
            const d = "\\\" \\' \\; \\: ; : \ufeff".split(" ");
            for (let e = 0; e < d.length; e++) s[d[e]] = l + e, s[l + e] = d[e];
            const c = {
                parse: t => {
                    const a = {};
                    let i = !1;
                    const d = e.url_converter,
                        u = e.url_converter_scope || c,
                        m = (e, t, n) => {
                            const o = a[e + "-top" + t];
                            if (!o) return;
                            const r = a[e + "-right" + t];
                            if (!r) return;
                            const s = a[e + "-bottom" + t];
                            if (!s) return;
                            const i = a[e + "-left" + t];
                            if (!i) return;
                            const l = [o, r, s, i];
                            let d = l.length - 1;
                            for (; d-- && l[d] === l[d + 1];);
                            d > -1 && n || (a[e + t] = -1 === d ? l[0] : l.join(" "), delete a[e + "-top" + t], delete a[e + "-right" + t], delete a[e + "-bottom" + t], delete a[e + "-left" + t])
                        },
                        f = e => {
                            const t = a[e];
                            if (!t) return;
                            const n = t.split(" ");
                            let o = n.length;
                            for (; o--;)
                                if (n[o] !== n[0]) return !1;
                            return a[e] = n[0], !0
                        },
                        g = e => (i = !0, s[e]),
                        p = (e, t) => (i && (e = e.replace(/\uFEFF[0-9]/g, (e => s[e]))), t || (e = e.replace(/\\([\'\";:])/g, "$1")), e),
                        h = e => String.fromCharCode(parseInt(e.slice(1), 16)),
                        b = e => e.replace(/\\[0-9a-f]+/gi, h),
                        v = (t, n, o, r, s, a) => {
                            if (s = s || a) return "'" + (s = p(s)).replace(/\'/g, "\\'") + "'";
                            if (n = p(n || o || r || ""), !e.allow_script_urls) {
                                const t = n.replace(/[\s\r\n]+/g, "");
                                if (/(java|vb)script:/i.test(t)) return "";
                                if (!e.allow_svg_data_urls && /^data:image\/svg/i.test(t)) return ""
                            }
                            return d && (n = d.call(u, n, "style")), "url('" + n.replace(/\'/g, "\\'") + "')"
                        };
                    if (t) {
                        let s;
                        for (t = (t = t.replace(/[\u0000-\u001F]/g, "")).replace(/\\[\"\';:\uFEFF]/g, g).replace(/\"[^\"]+\"|\'[^\']+\'/g, (e => e.replace(/[;:]/g, g))); s = o.exec(t);) {
                            o.lastIndex = s.index + s[0].length;
                            let t = s[1].replace(r, "").toLowerCase(),
                                d = s[2].replace(r, "");
                            if (t && d) {
                                if (t = b(t), d = b(d), -1 !== t.indexOf(l) || -1 !== t.indexOf('"')) continue;
                                if (!e.allow_script_urls && ("behavior" === t || /expression\s*\(|\/\*|\*\//.test(d))) continue;
                                "font-weight" === t && "700" === d ? d = "bold" : "color" !== t && "background-color" !== t || (d = d.toLowerCase()), d = d.replace(n, v), a[t] = i ? p(d, !0) : d
                            }
                        }
                        m("border", "", !0), m("border", "-width"), m("border", "-color"), m("border", "-style"), m("padding", ""), m("margin", ""), "border", C = "border-style", w = "border-color", f(y = "border-width") && f(C) && f(w) && (a.border = a[y] + " " + a[C] + " " + a[w], delete a[y], delete a[C], delete a[w]), "medium none" === a.border && delete a.border, "none" === a["border-image"] && delete a["border-image"]
                    }
                    var y, C, w;
                    return a
                },
                serialize: (e, t) => {
                    let n = "";
                    const o = (t, o) => {
                        const r = o[t];
                        if (r)
                            for (let t = 0, o = r.length; t < o; t++) {
                                const o = r[t],
                                    s = e[o];
                                s && (n += (n.length > 0 ? " " : "") + o + ": " + s + ";")
                            }
                    };
                    return t && a ? (o("*", a), o(t, a)) : ge(e, ((e, o) => {
                        e && ((e, t) => {
                            if (!i || !t) return !0;
                            let n = i["*"];
                            return !(n && n[e] || (n = i[t], n && n[e]))
                        })(o, t) && (n += (n.length > 0 ? " " : "") + o + ": " + e + ";")
                    })), n
                }
            };
            return c
        },
        ma = {
            keyLocation: !0,
            layerX: !0,
            layerY: !0,
            returnValue: !0,
            webkitMovementX: !0,
            webkitMovementY: !0,
            keyIdentifier: !0,
            mozPressure: !0
        },
        fa = (e, t) => {
            const n = null != t ? t : {};
            for (const t in e) ke(ma, t) || (n[t] = e[t]);
            return C(e.composedPath) && (n.composedPath = () => e.composedPath()), n
        },
        ga = (e, t, n, o) => {
            var r;
            const s = fa(t, o);
            return s.type = e, y(s.target) && (s.target = null !== (r = s.srcElement) && void 0 !== r ? r : n), (e => y(e.preventDefault) || (e => e instanceof Event || w(e.initEvent))(e))(t) && (s.preventDefault = () => {
                s.defaultPrevented = !0, s.isDefaultPrevented = M, w(t.preventDefault) && t.preventDefault()
            }, s.stopPropagation = () => {
                s.cancelBubble = !0, s.isPropagationStopped = M, w(t.stopPropagation) && t.stopPropagation()
            }, s.stopImmediatePropagation = () => {
                s.isImmediatePropagationStopped = M, s.stopPropagation()
            }, (e => e.isDefaultPrevented === M || e.isDefaultPrevented === L)(s) || (s.isDefaultPrevented = !0 === s.defaultPrevented ? M : L, s.isPropagationStopped = !0 === s.cancelBubble ? M : L, s.isImmediatePropagationStopped = L)), s
        },
        pa = /^(?:mouse|contextmenu)|click/,
        ha = (e, t, n, o) => {
            e.addEventListener(t, n, o || !1)
        },
        ba = (e, t, n, o) => {
            e.removeEventListener(t, n, o || !1)
        },
        va = (e, t) => {
            const n = ga(e.type, e, document, t);
            if ((e => C(e) && pa.test(e.type))(e) && v(e.pageX) && !v(e.clientX)) {
                const t = n.target.ownerDocument || document,
                    o = t.documentElement,
                    r = t.body,
                    s = n;
                s.pageX = e.clientX + (o && o.scrollLeft || r && r.scrollLeft || 0) - (o && o.clientLeft || r && r.clientLeft || 0), s.pageY = e.clientY + (o && o.scrollTop || r && r.scrollTop || 0) - (o && o.clientTop || r && r.clientTop || 0)
            }
            return n
        },
        ya = (e, t, n) => {
            const o = e.document,
                r = {
                    type: "ready"
                };
            if (n.domLoaded) return void t(r);
            const s = () => {
                ba(e, "DOMContentLoaded", s), ba(e, "load", s), n.domLoaded || (n.domLoaded = !0, t(r)), e = null
            };
            "complete" === o.readyState || "interactive" === o.readyState && o.body ? s() : ha(e, "DOMContentLoaded", s), n.domLoaded || ha(e, "load", s)
        };
    class Ca {
        constructor() {
            this.domLoaded = !1, this.events = {}, this.count = 1, this.expando = "mce-data-" + (+new Date).toString(32), this.hasFocusIn = "onfocusin" in document.documentElement, this.count = 1
        }
        bind(e, t, n, o) {
            const r = this;
            let s;
            const a = window,
                i = e => {
                    r.executeHandlers(va(e || a.event), l)
                };
            if (!e || Xo(e) || Zo(e)) return n;
            let l;
            e[r.expando] ? l = e[r.expando] : (l = r.count++, e[r.expando] = l, r.events[l] = {}), o = o || e;
            const d = t.split(" ");
            let c = d.length;
            for (; c--;) {
                let t = d[c],
                    u = i,
                    m = !1,
                    f = !1;
                "DOMContentLoaded" === t && (t = "ready"), r.domLoaded && "ready" === t && "complete" === e.readyState ? n.call(o, va({
                    type: t
                })) : (r.hasFocusIn || "focusin" !== t && "focusout" !== t || (m = !0, f = "focusin" === t ? "focus" : "blur", u = e => {
                    const t = va(e || a.event);
                    t.type = "focus" === t.type ? "focusin" : "focusout", r.executeHandlers(t, l)
                }), s = r.events[l][t], s ? "ready" === t && r.domLoaded ? n(va({
                    type: t
                })) : s.push({
                    func: n,
                    scope: o
                }) : (r.events[l][t] = s = [{
                    func: n,
                    scope: o
                }], s.fakeName = f, s.capture = m, s.nativeHandler = u, "ready" === t ? ya(e, u, r) : ha(e, f || t, u, m)))
            }
            return e = s = null, n
        }
        unbind(e, t, n) {
            if (!e || Xo(e) || Zo(e)) return this;
            const o = e[this.expando];
            if (o) {
                let r = this.events[o];
                if (t) {
                    const o = t.split(" ");
                    let s = o.length;
                    for (; s--;) {
                        const t = o[s],
                            a = r[t];
                        if (a) {
                            if (n) {
                                let e = a.length;
                                for (; e--;)
                                    if (a[e].func === n) {
                                        const n = a.nativeHandler,
                                            o = a.fakeName,
                                            s = a.capture,
                                            i = a.slice(0, e).concat(a.slice(e + 1));
                                        i.nativeHandler = n, i.fakeName = o, i.capture = s, r[t] = i
                                    }
                            }
                            n && 0 !== a.length || (delete r[t], ba(e, a.fakeName || t, a.nativeHandler, a.capture))
                        }
                    }
                } else ge(r, ((t, n) => {
                    ba(e, t.fakeName || n, t.nativeHandler, t.capture)
                })), r = {};
                for (const e in r)
                    if (ke(r, e)) return this;
                delete this.events[o];
                try {
                    delete e[this.expando]
                } catch (t) {
                    e[this.expando] = null
                }
            }
            return this
        }
        fire(e, t, n) {
            return this.dispatch(e, t, n)
        }
        dispatch(e, t, n) {
            if (!e || Xo(e) || Zo(e)) return this;
            const o = va({
                type: t,
                target: e
            }, n);
            do {
                const t = e[this.expando];
                t && this.executeHandlers(o, t), e = e.parentNode || e.ownerDocument || e.defaultView || e.parentWindow
            } while (e && !o.isPropagationStopped());
            return this
        }
        clean(e) {
            if (!e || Xo(e) || Zo(e)) return this;
            if (e[this.expando] && this.unbind(e), e.getElementsByTagName || (e = e.document), e && e.getElementsByTagName) {
                this.unbind(e);
                const t = e.getElementsByTagName("*");
                let n = t.length;
                for (; n--;)(e = t[n])[this.expando] && this.unbind(e)
            }
            return this
        }
        destroy() {
            this.events = {}
        }
        cancel(e) {
            return e && (e.preventDefault(), e.stopImmediatePropagation()), !1
        }
        executeHandlers(e, t) {
            const n = this.events[t],
                o = n && n[e.type];
            if (o)
                for (let t = 0, n = o.length; t < n; t++) {
                    const n = o[t];
                    if (n && !1 === n.func.call(n.scope, e) && e.preventDefault(), e.isImmediatePropagationStopped()) return
                }
        }
    }
    Ca.Event = new Ca;
    const wa = Dt.each,
        xa = Dt.grep,
        ka = "data-mce-style",
        Ea = Dt.makeMap("fill-opacity font-weight line-height opacity orphans widows z-index zoom", " "),
        Sa = (e, t, n) => {
            y(n) || "" === n ? nn(e, t) : Qt(e, t, n)
        },
        _a = e => e.replace(/[A-Z]/g, (e => "-" + e.toLowerCase())),
        Na = (e, t) => {
            let n = 0;
            if (e)
                for (let o = e.nodeType, r = e.previousSibling; r; r = r.previousSibling) {
                    const e = r.nodeType;
                    (!t || !Xo(r) || e !== o && r.data.length) && (n++, o = e)
                }
            return n
        },
        Ra = (e, t) => {
            const n = Zt(t, "style"),
                o = e.serialize(e.parse(n), jt(t));
            Sa(t, ka, o)
        },
        Aa = (e, t, n) => {
            const o = _a(t);
            y(n) || "" === n ? mo(e, o) : so(e, o, ((e, t) => x(e) ? ke(Ea, t) ? e + "" : e + "px" : e)(n, o))
        },
        Oa = (e, t = {}) => {
            const n = {},
                o = window,
                r = {};
            let s = 0;
            const a = Ps.forElement(vn(e), {
                    contentCssCors: t.contentCssCors,
                    referrerPolicy: t.referrerPolicy
                }),
                i = [],
                l = t.schema ? t.schema : ca({}),
                d = ua({
                    url_converter: t.url_converter,
                    url_converter_scope: t.url_converter_scope
                }, t.schema),
                c = t.ownEvents ? new Ca : Ca.Event,
                u = l.getBlockElements(),
                f = t => t && e && m(t) ? e.getElementById(t) : t,
                g = e => {
                    const t = f(e);
                    return C(t) ? vn(t) : null
                },
                h = (e, t, n = "") => {
                    let o;
                    const r = g(e);
                    if (C(r) && qt(r)) {
                        const e = Y[t];
                        o = e && e.get ? e.get(r.dom, t) : Zt(r, t)
                    }
                    return C(o) ? o : n
                },
                b = e => {
                    const t = f(e);
                    return y(t) ? [] : t.attributes
                },
                v = (e, n, o) => {
                    T(e, (e => {
                        if (jo(e)) {
                            const r = vn(e),
                                s = "" === o ? null : o,
                                a = Zt(r, n),
                                i = Y[n];
                            i && i.set ? i.set(r.dom, s, n) : Sa(r, n, s), a !== s && t.onSetAttrib && t.onSetAttrib({
                                attrElm: r.dom,
                                attrName: n,
                                attrValue: s
                            })
                        }
                    }))
                },
                x = () => t.root_element || e.body,
                k = (t, n) => ((e, t, n) => {
                    let o = 0,
                        r = 0;
                    const s = e.ownerDocument;
                    if (n = n || e, t) {
                        if (n === e && t.getBoundingClientRect && "static" === io(vn(e), "position")) {
                            const n = t.getBoundingClientRect();
                            return o = n.left + (s.documentElement.scrollLeft || e.scrollLeft) - s.documentElement.clientLeft, r = n.top + (s.documentElement.scrollTop || e.scrollTop) - s.documentElement.clientTop, {
                                x: o,
                                y: r
                            }
                        }
                        let a = t;
                        for (; a && a !== n && a.nodeType && !Bs(a, n);) {
                            const e = a;
                            o += e.offsetLeft || 0, r += e.offsetTop || 0, a = e.offsetParent
                        }
                        for (a = t.parentNode; a && a !== n && a.nodeType && !Bs(a, n);) o -= a.scrollLeft || 0, r -= a.scrollTop || 0, a = a.parentNode;
                        r += (e => Os.isFirefox() && "table" === jt(e) ? Ts(Ln(e)).filter((e => "caption" === jt(e))).bind((e => Ts(Pn(e)).map((t => {
                            const n = t.dom.offsetTop,
                                o = e.dom.offsetTop,
                                r = e.dom.offsetHeight;
                            return n <= o ? -r : 0
                        })))).getOr(0) : 0)(vn(t))
                    }
                    return {
                        x: o,
                        y: r
                    }
                })(e.body, f(t), n),
                S = (e, t, n) => {
                    const o = f(e);
                    if (!y(o) && jo(o)) return n ? io(vn(o), _a(t)) : ("float" === (t = t.replace(/-(\D)/g, ((e, t) => t.toUpperCase()))) && (t = "cssFloat"), o.style ? o.style[t] : void 0)
                },
                _ = e => {
                    const t = f(e);
                    if (!t) return {
                        w: 0,
                        h: 0
                    };
                    let n = S(t, "width"),
                        o = S(t, "height");
                    return n && -1 !== n.indexOf("px") || (n = "0"), o && -1 !== o.indexOf("px") || (o = "0"), {
                        w: parseInt(n, 10) || t.offsetWidth || t.clientWidth,
                        h: parseInt(o, 10) || t.offsetHeight || t.clientHeight
                    }
                },
                R = (e, t) => {
                    if (!e) return !1;
                    const n = p(e) ? e : [e];
                    return $(n, (e => wn(vn(e), t)))
                },
                A = (e, t, n, o) => {
                    const r = [];
                    let s = f(e);
                    o = void 0 === o;
                    const a = n || ("BODY" !== x().nodeName ? x().parentNode : null);
                    if (m(t))
                        if ("*" === t) t = jo;
                        else {
                            const e = t;
                            t = t => R(t, e)
                        } for (; s && !(s === a || y(s.nodeType) || er(s) || tr(s));) {
                        if (!t || t(s)) {
                            if (!o) return [s];
                            r.push(s)
                        }
                        s = s.parentNode
                    }
                    return o ? r : null
                },
                O = (e, t, n) => {
                    let o = t;
                    if (e) {
                        m(t) && (o = e => R(e, t));
                        for (let t = e[n]; t; t = t[n])
                            if (w(o) && o(t)) return t
                    }
                    return null
                },
                T = function(e, t, n) {
                    const o = null != n ? n : this;
                    if (p(e)) {
                        const n = [];
                        return wa(e, ((e, r) => {
                            const s = f(e);
                            s && n.push(t.call(o, s, r))
                        })), n
                    } {
                        const n = f(e);
                        return !!n && t.call(o, n)
                    }
                },
                B = (e, t) => {
                    T(e, (e => {
                        ge(t, ((t, n) => {
                            v(e, n, t)
                        }))
                    }))
                },
                D = (e, t) => {
                    T(e, (e => {
                        const n = vn(e);
                        Eo(n, t)
                    }))
                },
                P = (t, n, o, r, s) => T(t, (t => {
                    const a = m(n) ? e.createElement(n) : n;
                    return C(o) && B(a, o), r && (!m(r) && r.nodeType ? a.appendChild(r) : m(r) && D(a, r)), s ? a : t.appendChild(a)
                })),
                L = (t, n, o) => P(e.createElement(t), t, n, o, !0),
                M = Qs.encodeAllRaw,
                I = (e, t) => T(e, (e => {
                    const n = vn(e);
                    return t && q(Ln(n), (e => {
                        Wt(e) && 0 === e.dom.length ? Co(e) : fo(n, e)
                    })), Co(n), n.dom
                })),
                F = (e, t, n) => {
                    T(e, (e => {
                        if (jo(e)) {
                            const o = vn(e),
                                r = t.split(" ");
                            q(r, (e => {
                                C(n) ? (n ? cn : mn)(o, e) : ((e, t) => {
                                    const n = sn(e) ? e.dom.classList.toggle(t) : ((e, t) => H(an(e), t) ? dn(e, t) : ln(e, t))(e, t);
                                    un(e)
                                })(o, e)
                            }))
                        }
                    }))
                },
                U = (e, t, n) => T(t, (o => {
                    var r;
                    const s = p(t) ? e.cloneNode(!0) : e;
                    return n && wa(xa(o.childNodes), (e => {
                        s.appendChild(e)
                    })), null === (r = o.parentNode) || void 0 === r || r.replaceChild(s, o), o
                })),
                z = e => {
                    if (jo(e)) {
                        const t = "a" === e.nodeName.toLowerCase() && !h(e, "href") && h(e, "id");
                        if (h(e, "name") || h(e, "data-mce-bookmark") || t) return !0
                    }
                    return !1
                },
                j = () => e.createRange(),
                V = (n, r, s, a) => {
                    if (p(n)) {
                        let e = n.length;
                        const t = [];
                        for (; e--;) t[e] = V(n[e], r, s, a);
                        return t
                    }
                    return !t.collect || n !== e && n !== o || i.push([n, r, s, a]), c.bind(n, r, s, a || G)
                },
                W = (t, n, r) => {
                    if (p(t)) {
                        let e = t.length;
                        const o = [];
                        for (; e--;) o[e] = W(t[e], n, r);
                        return o
                    }
                    if (i.length > 0 && (t === e || t === o)) {
                        let e = i.length;
                        for (; e--;) {
                            const [o, s, a] = i[e];
                            t !== o || n && n !== s || r && r !== a || c.unbind(o, s, a)
                        }
                    }
                    return c.unbind(t, n, r)
                },
                K = e => {
                    if (e && jo(e)) {
                        const t = e.getAttribute("data-mce-contenteditable");
                        return t && "inherit" !== t ? t : "inherit" !== e.contentEditable ? e.contentEditable : null
                    }
                    return null
                },
                G = {
                    doc: e,
                    settings: t,
                    win: o,
                    files: r,
                    stdMode: !0,
                    boxModel: !0,
                    styleSheetLoader: a,
                    boundEvents: i,
                    styles: d,
                    schema: l,
                    events: c,
                    isBlock: e => m(e) ? ke(u, e) : jo(e) && (ke(u, e.nodeName) || Ns(l, e)),
                    root: null,
                    clone: (e, t) => e.cloneNode(t),
                    getRoot: x,
                    getViewPort: e => {
                        const t = Po(e);
                        return {
                            x: t.x,
                            y: t.y,
                            w: t.width,
                            h: t.height
                        }
                    },
                    getRect: e => {
                        const t = f(e),
                            n = k(t),
                            o = _(t);
                        return {
                            x: n.x,
                            y: n.y,
                            w: o.w,
                            h: o.h
                        }
                    },
                    getSize: _,
                    getParent: (e, t, n) => {
                        const o = A(e, t, n, !1);
                        return o && o.length > 0 ? o[0] : null
                    },
                    getParents: A,
                    get: f,
                    getNext: (e, t) => O(e, t, "nextSibling"),
                    getPrev: (e, t) => O(e, t, "previousSibling"),
                    select: (n, o) => {
                        var r, s;
                        const a = null !== (s = null !== (r = f(o)) && void 0 !== r ? r : t.root_element) && void 0 !== s ? s : e;
                        return w(a.querySelectorAll) ? ce(a.querySelectorAll(n)) : []
                    },
                    is: R,
                    add: P,
                    create: L,
                    createHTML: (e, t, n = "") => {
                        let o = "<" + e;
                        for (const e in t) Ee(t, e) && (o += " " + e + '="' + M(t[e]) + '"');
                        return Ye(n) && ke(l.getVoidElements(), e) ? o + " />" : o + ">" + n + "</" + e + ">"
                    },
                    createFragment: t => {
                        const n = e.createElement("div"),
                            o = e.createDocumentFragment();
                        let r;
                        for (o.appendChild(n), t && (n.innerHTML = t); r = n.firstChild;) o.appendChild(r);
                        return o.removeChild(n), o
                    },
                    remove: I,
                    setStyle: (e, n, o) => {
                        T(e, (e => {
                            const r = vn(e);
                            Aa(r, n, o), t.update_styles && Ra(d, r)
                        }))
                    },
                    getStyle: S,
                    setStyles: (e, n) => {
                        T(e, (e => {
                            const o = vn(e);
                            ge(n, ((e, t) => {
                                Aa(o, t, e)
                            })), t.update_styles && Ra(d, o)
                        }))
                    },
                    removeAllAttribs: e => T(e, (e => {
                        const t = e.attributes;
                        for (let n = t.length - 1; n >= 0; n--) e.removeAttributeNode(t.item(n))
                    })),
                    setAttrib: v,
                    setAttribs: B,
                    getAttrib: h,
                    getPos: k,
                    parseStyle: e => d.parse(e),
                    serializeStyle: (e, t) => d.serialize(e, t),
                    addStyle: t => {
                        if (G !== Oa.DOM && e === document) {
                            if (n[t]) return;
                            n[t] = !0
                        }
                        let o = e.getElementById("mceDefaultStyles");
                        if (!o) {
                            o = e.createElement("style"), o.id = "mceDefaultStyles", o.type = "text/css";
                            const t = e.head;
                            t.firstChild ? t.insertBefore(o, t.firstChild) : t.appendChild(o)
                        }
                        o.styleSheet ? o.styleSheet.cssText += t : o.appendChild(e.createTextNode(t))
                    },
                    loadCSS: e => {
                        e || (e = ""), q(e.split(","), (e => {
                            r[e] = !0, a.load(e).catch(E)
                        }))
                    },
                    addClass: (e, t) => {
                        F(e, t, !0)
                    },
                    removeClass: (e, t) => {
                        F(e, t, !1)
                    },
                    hasClass: (e, t) => {
                        const n = g(e),
                            o = t.split(" ");
                        return C(n) && ne(o, (e => fn(n, e)))
                    },
                    toggleClass: F,
                    show: e => {
                        T(e, (e => mo(vn(e), "display")))
                    },
                    hide: e => {
                        T(e, (e => so(vn(e), "display", "none")))
                    },
                    isHidden: e => {
                        const t = g(e);
                        return C(t) && Pt(co(t, "display"), "none")
                    },
                    uniqueId: e => (e || "mce_") + s++,
                    setHTML: D,
                    getOuterHTML: e => {
                        const t = g(e);
                        return C(t) ? jo(t.dom) ? t.dom.outerHTML : (e => {
                            const t = hn("div"),
                                n = vn(e.dom.cloneNode(!0));
                            return ho(t, n), ko(t)
                        })(t) : ""
                    },
                    setOuterHTML: (e, t) => {
                        T(e, (e => {
                            jo(e) && (e.outerHTML = t)
                        }))
                    },
                    decode: Qs.decode,
                    encode: M,
                    insertAfter: (e, t) => {
                        const n = f(t);
                        return T(e, (e => {
                            const t = null == n ? void 0 : n.parentNode,
                                o = null == n ? void 0 : n.nextSibling;
                            return t && (o ? t.insertBefore(e, o) : t.appendChild(e)), e
                        }))
                    },
                    replace: U,
                    rename: (e, t) => {
                        if (e.nodeName !== t.toUpperCase()) {
                            const n = L(t);
                            return wa(b(e), (t => {
                                v(n, t.nodeName, h(e, t.nodeName))
                            })), U(n, e, !0), n
                        }
                        return e
                    },
                    findCommonAncestor: (e, t) => {
                        let n = e;
                        for (; n;) {
                            let e = t;
                            for (; e && n !== e;) e = e.parentNode;
                            if (n === e) break;
                            n = n.parentNode
                        }
                        return !n && e.ownerDocument ? e.ownerDocument.documentElement : n
                    },
                    run: T,
                    getAttribs: b,
                    isEmpty: (e, t, n) => {
                        let o = 0;
                        if (z(e)) return !1;
                        const r = e.firstChild;
                        if (r) {
                            const s = new Fo(r, e),
                                a = l ? l.getWhitespaceElements() : {},
                                i = t || (l ? l.getNonEmptyElements() : null);
                            let d = r;
                            do {
                                if (jo(d)) {
                                    const e = d.getAttribute("data-mce-bogus");
                                    if (e) {
                                        d = s.next("all" === e);
                                        continue
                                    }
                                    const t = d.nodeName.toLowerCase();
                                    if (i && i[t]) {
                                        if ("br" === t) {
                                            o++, d = s.next();
                                            continue
                                        }
                                        return !1
                                    }
                                    if (z(d)) return !1
                                }
                                if (Zo(d)) return !1;
                                if (Xo(d) && !is(d.data) && (!(null == n ? void 0 : n.includeZwsp) || !ls(d.data))) return !1;
                                if (Xo(d) && d.parentNode && a[d.parentNode.nodeName] && is(d.data)) return !1;
                                d = s.next()
                            } while (d)
                        }
                        return o <= 1
                    },
                    createRng: j,
                    nodeIndex: Na,
                    split: (e, t, n) => {
                        let o, r, s = j();
                        if (e && t && e.parentNode && t.parentNode) {
                            const a = e.parentNode;
                            return s.setStart(a, Na(e)), s.setEnd(t.parentNode, Na(t)), o = s.extractContents(), s = j(), s.setStart(t.parentNode, Na(t) + 1), s.setEnd(a, Na(e) + 1), r = s.extractContents(), a.insertBefore(Is(G, o), e), n ? a.insertBefore(n, e) : a.insertBefore(t, e), a.insertBefore(Is(G, r), e), I(e), n || t
                        }
                    },
                    bind: V,
                    unbind: W,
                    fire: (e, t, n) => c.dispatch(e, t, n),
                    dispatch: (e, t, n) => c.dispatch(e, t, n),
                    getContentEditable: K,
                    getContentEditableParent: e => {
                        const t = x();
                        let n = null;
                        for (let o = e; o && o !== t && (n = K(o), null === n); o = o.parentNode);
                        return n
                    },
                    isEditable: e => {
                        if (C(e)) {
                            const t = jo(e) ? e : e.parentElement;
                            return C(t) && to(vn(t))
                        }
                        return !1
                    },
                    destroy: () => {
                        if (i.length > 0) {
                            let e = i.length;
                            for (; e--;) {
                                const [t, n, o] = i[e];
                                c.unbind(t, n, o)
                            }
                        }
                        ge(r, ((e, t) => {
                            a.unload(t), delete r[t]
                        }))
                    },
                    isChildOf: (e, t) => e === t || t.contains(e),
                    dumpRng: e => "startContainer: " + e.startContainer.nodeName + ", startOffset: " + e.startOffset + ", endContainer: " + e.endContainer.nodeName + ", endOffset: " + e.endOffset
                },
                Y = ((e, t, n) => {
                    const o = t.keep_values,
                        r = {
                            set: (e, o, r) => {
                                const s = vn(e);
                                w(t.url_converter) && C(o) && (o = t.url_converter.call(t.url_converter_scope || n(), String(o), r, e)), Sa(s, "data-mce-" + r, o), Sa(s, r, o)
                            },
                            get: (e, t) => {
                                const n = vn(e);
                                return Zt(n, "data-mce-" + t) || Zt(n, t)
                            }
                        },
                        s = {
                            style: {
                                set: (t, n) => {
                                    const r = vn(t);
                                    o && Sa(r, ka, n), nn(r, "style"), m(n) && ao(r, e.parse(n))
                                },
                                get: t => {
                                    const n = vn(t),
                                        o = Zt(n, ka) || Zt(n, "style");
                                    return e.serialize(e.parse(o), jt(n))
                                }
                            }
                        };
                    return o && (s.href = s.src = r), s
                })(d, t, N(G));
            return G
        };
    Oa.DOM = Oa(document), Oa.nodeIndex = Na;
    const Ta = Oa.DOM;
    class Ba {
        constructor(e = {}) {
            this.states = {}, this.queue = [], this.scriptLoadedCallbacks = {}, this.queueLoadedCallbacks = [], this.loading = !1, this.settings = e
        }
        _setReferrerPolicy(e) {
            this.settings.referrerPolicy = e
        }
        loadScript(e) {
            return new Promise(((t, n) => {
                const o = Ta;
                let r;
                const s = () => {
                        o.remove(a), r && (r.onerror = r.onload = r = null)
                    },
                    a = o.uniqueId();
                r = document.createElement("script"), r.id = a, r.type = "text/javascript", r.src = Dt._addCacheSuffix(e), this.settings.referrerPolicy && o.setAttrib(r, "referrerpolicy", this.settings.referrerPolicy), r.onload = () => {
                    s(), t()
                }, r.onerror = () => {
                    s(), n("Failed to load script: " + e)
                }, (document.getElementsByTagName("head")[0] || document.body).appendChild(r)
            }))
        }
        isDone(e) {
            return 2 === this.states[e]
        }
        markDone(e) {
            this.states[e] = 2
        }
        add(e) {
            const t = this;
            return t.queue.push(e), void 0 === t.states[e] && (t.states[e] = 0), new Promise(((n, o) => {
                t.scriptLoadedCallbacks[e] || (t.scriptLoadedCallbacks[e] = []), t.scriptLoadedCallbacks[e].push({
                    resolve: n,
                    reject: o
                })
            }))
        }
        load(e) {
            return this.add(e)
        }
        remove(e) {
            delete this.states[e], delete this.scriptLoadedCallbacks[e]
        }
        loadQueue() {
            const e = this.queue;
            return this.queue = [], this.loadScripts(e)
        }
        loadScripts(e) {
            const t = this,
                n = (e, n) => {
                    xe(t.scriptLoadedCallbacks, n).each((t => {
                        q(t, (t => t[e](n)))
                    })), delete t.scriptLoadedCallbacks[n]
                },
                o = e => {
                    const t = G(e, (e => "rejected" === e.status));
                    return t.length > 0 ? Promise.reject(te(t, (({
                        reason: e
                    }) => p(e) ? e : [e]))) : Promise.resolve()
                },
                r = e => Promise.allSettled(V(e, (e => 2 === t.states[e] ? (n("resolve", e), Promise.resolve()) : 3 === t.states[e] ? (n("reject", e), Promise.reject(e)) : (t.states[e] = 1, t.loadScript(e).then((() => {
                    t.states[e] = 2, n("resolve", e);
                    const s = t.queue;
                    return s.length > 0 ? (t.queue = [], r(s).then(o)) : Promise.resolve()
                }), (() => (t.states[e] = 3, n("reject", e), Promise.reject(e)))))))),
                s = e => (t.loading = !0, r(e).then((e => {
                    t.loading = !1;
                    const n = t.queueLoadedCallbacks.shift();
                    return I.from(n).each(P), o(e)
                }))),
                a = Se(e);
            return t.loading ? new Promise(((e, n) => {
                t.queueLoadedCallbacks.push((() => {
                    s(a).then(e, n)
                }))
            })) : s(a)
        }
    }
    Ba.ScriptLoader = new Ba;
    const Da = e => {
            let t = e;
            return {
                get: () => t,
                set: e => {
                    t = e
                }
            }
        },
        Pa = {},
        La = Da("en"),
        Ma = () => xe(Pa, La.get()),
        Ia = {
            getData: () => pe(Pa, (e => ({
                ...e
            }))),
            setCode: e => {
                e && La.set(e)
            },
            getCode: () => La.get(),
            add: (e, t) => {
                let n = Pa[e];
                n || (Pa[e] = n = {}), ge(t, ((e, t) => {
                    n[t.toLowerCase()] = e
                }))
            },
            translate: e => {
                const t = Ma().getOr({}),
                    n = e => w(e) ? Object.prototype.toString.call(e) : o(e) ? "" : "" + e,
                    o = e => "" === e || null == e,
                    r = e => {
                        const o = n(e);
                        return xe(t, o.toLowerCase()).map(n).getOr(o)
                    },
                    s = e => e.replace(/{context:\w+}$/, "");
                if (o(e)) return "";
                if (f(a = e) && ke(a, "raw")) return n(e.raw);
                var a;
                if ((e => p(e) && e.length > 1)(e)) {
                    const t = e.slice(1);
                    return s(r(e[0]).replace(/\{([0-9]+)\}/g, ((e, o) => ke(t, o) ? n(t[o]) : e)))
                }
                return s(r(e))
            },
            isRtl: () => Ma().bind((e => xe(e, "_dir"))).exists((e => "rtl" === e)),
            hasCode: e => ke(Pa, e)
        },
        Fa = () => {
            const e = [],
                t = {},
                n = {},
                o = [],
                r = (e, t) => {
                    const n = G(o, (n => n.name === e && n.state === t));
                    q(n, (e => e.resolve()))
                },
                s = e => ke(t, e),
                a = (e, n) => {
                    const o = Ia.getCode();
                    !o || n && -1 === ("," + (n || "") + ",").indexOf("," + o + ",") || Ba.ScriptLoader.add(t[e] + "/langs/" + o + ".js")
                },
                i = (e, t = "added") => "added" === t && (e => ke(n, e))(e) || "loaded" === t && s(e) ? Promise.resolve() : new Promise((n => {
                    o.push({
                        name: e,
                        state: t,
                        resolve: n
                    })
                }));
            return {
                items: e,
                urls: t,
                lookup: n,
                get: e => {
                    if (n[e]) return n[e].instance
                },
                requireLangPack: (e, t) => {
                    !1 !== Fa.languageLoad && (s(e) ? a(e, t) : i(e, "loaded").then((() => a(e, t))))
                },
                add: (t, o) => (e.push(o), n[t] = {
                    instance: o
                }, r(t, "added"), o),
                remove: e => {
                    delete t[e], delete n[e]
                },
                createUrl: (e, t) => m(t) ? m(e) ? {
                    prefix: "",
                    resource: t,
                    suffix: ""
                } : {
                    prefix: e.prefix,
                    resource: t,
                    suffix: e.suffix
                } : t,
                load: (e, o) => {
                    if (t[e]) return Promise.resolve();
                    let s = m(o) ? o : o.prefix + o.resource + o.suffix;
                    0 !== s.indexOf("/") && -1 === s.indexOf("://") && (s = Fa.baseURL + "/" + s), t[e] = s.substring(0, s.lastIndexOf("/"));
                    const a = () => (r(e, "loaded"), Promise.resolve());
                    return n[e] ? a() : Ba.ScriptLoader.add(s).then(a)
                },
                waitFor: i
            }
        };
    Fa.languageLoad = !0, Fa.baseURL = "", Fa.PluginManager = Fa(), Fa.ThemeManager = Fa(), Fa.ModelManager = Fa();
    const Ua = e => {
            const t = Da(I.none()),
                n = () => t.get().each((e => clearInterval(e)));
            return {
                clear: () => {
                    n(), t.set(I.none())
                },
                isSet: () => t.get().isSome(),
                get: () => t.get(),
                set: o => {
                    n(), t.set(I.some(setInterval(o, e)))
                }
            }
        },
        za = () => {
            const e = (e => {
                const t = Da(I.none()),
                    n = () => t.get().each(e);
                return {
                    clear: () => {
                        n(), t.set(I.none())
                    },
                    isSet: () => t.get().isSome(),
                    get: () => t.get(),
                    set: e => {
                        n(), t.set(I.some(e))
                    }
                }
            })(E);
            return {
                ...e,
                on: t => e.get().each(t)
            }
        },
        ja = (e, t) => {
            let n = null;
            return {
                cancel: () => {
                    h(n) || (clearTimeout(n), n = null)
                },
                throttle: (...o) => {
                    h(n) && (n = setTimeout((() => {
                        n = null, e.apply(null, o)
                    }), t))
                }
            }
        },
        Ha = (e, t) => {
            let n = null;
            const o = () => {
                h(n) || (clearTimeout(n), n = null)
            };
            return {
                cancel: o,
                throttle: (...r) => {
                    o(), n = setTimeout((() => {
                        n = null, e.apply(null, r)
                    }), t)
                }
            }
        },
        $a = N("mce-annotation"),
        Va = N("data-mce-annotation"),
        qa = N("data-mce-annotation-uid"),
        Wa = N("data-mce-annotation-active"),
        Ka = N("data-mce-annotation-classes"),
        Ga = N("data-mce-annotation-attrs"),
        Ya = e => t => kn(t, e),
        Xa = (e, t) => {
            const n = e.selection.getRng(),
                o = vn(n.startContainer),
                r = vn(e.getBody()),
                s = t.fold((() => "." + $a()), (e => `[${Va()}="${e}"]`)),
                a = Mn(o, n.startOffset).getOr(o);
            return eo(a, s, Ya(r)).bind((t => en(t, `${qa()}`).bind((n => en(t, `${Va()}`).map((t => {
                const o = Ja(e, n);
                return {
                    uid: n,
                    name: t,
                    elements: o
                }
            }))))))
        },
        Qa = (e, t) => tn(e, "data-mce-bogus") || Io(e, '[data-mce-bogus="all"]', Ya(t)),
        Ja = (e, t) => {
            const n = vn(e.getBody()),
                o = Mo(n, `[${qa()}="${t}"]`);
            return G(o, (e => !Qa(e, n)))
        },
        Za = (e, t) => {
            const n = vn(e.getBody()),
                o = Mo(n, `[${Va()}="${t}"]`),
                r = {};
            return q(o, (e => {
                if (!Qa(e, n)) {
                    const t = Zt(e, qa()),
                        n = xe(r, t).getOr([]);
                    r[t] = n.concat([e])
                }
            })), r
        };
    let ei = 0;
    const ti = e => {
            const t = (new Date).getTime(),
                n = Math.floor(1e9 * Math.random());
            return ei++, e + "_" + n + ei + String(t)
        },
        ni = (e, t) => vn(e.dom.cloneNode(t)),
        oi = e => ni(e, !1),
        ri = e => ni(e, !0),
        si = (e, t) => {
            const n = ((e, t) => {
                const n = hn(t),
                    o = on(e);
                return Jt(n, o), n
            })(e, t);
            go(e, n);
            const o = Ln(e);
            return vo(n, o), Co(e), n
        },
        ai = (e, t, n = L) => {
            const o = new Fo(e, t),
                r = e => {
                    let t;
                    do {
                        t = o[e]()
                    } while (t && !Xo(t) && !n(t));
                    return I.from(t).filter(Xo)
                };
            return {
                current: () => I.from(o.current()).filter(Xo),
                next: () => r("next"),
                prev: () => r("prev"),
                prev2: () => r("prev2")
            }
        },
        ii = (e, t) => {
            const n = t || (t => e.isBlock(t) || nr(t) || sr(t)),
                o = (e, t, n, r) => {
                    if (Xo(e)) {
                        const n = r(e, t, e.data);
                        if (-1 !== n) return I.some({
                            container: e,
                            offset: n
                        })
                    }
                    return n().bind((e => o(e.container, e.offset, n, r)))
                };
            return {
                backwards: (t, r, s, a) => {
                    const i = ai(t, null != a ? a : e.getRoot(), n);
                    return o(t, r, (() => i.prev().map((e => ({
                        container: e,
                        offset: e.length
                    })))), s).getOrNull()
                },
                forwards: (t, r, s, a) => {
                    const i = ai(t, null != a ? a : e.getRoot(), n);
                    return o(t, r, (() => i.next().map((e => ({
                        container: e,
                        offset: 0
                    })))), s).getOrNull()
                }
            }
        },
        li = Math.round,
        di = e => e ? {
            left: li(e.left),
            top: li(e.top),
            bottom: li(e.bottom),
            right: li(e.right),
            width: li(e.width),
            height: li(e.height)
        } : {
            left: 0,
            top: 0,
            bottom: 0,
            right: 0,
            width: 0,
            height: 0
        },
        ci = (e, t) => (e = di(e), t || (e.left = e.left + e.width), e.right = e.left, e.width = 0, e),
        ui = (e, t, n) => e >= 0 && e <= Math.min(t.height, n.height) / 2,
        mi = (e, t) => {
            const n = Math.min(t.height / 2, e.height / 2);
            return e.bottom - n < t.top || !(e.top > t.bottom) && ui(t.top - e.bottom, e, t)
        },
        fi = (e, t) => e.top > t.bottom || !(e.bottom < t.top) && ui(t.bottom - e.top, e, t),
        gi = (e, t, n) => {
            const o = Math.max(Math.min(t, e.left + e.width), e.left),
                r = Math.max(Math.min(n, e.top + e.height), e.top);
            return Math.sqrt((t - o) * (t - o) + (n - r) * (n - r))
        },
        pi = e => {
            const t = e.startContainer,
                n = e.startOffset;
            return t === e.endContainer && t.hasChildNodes() && e.endOffset === n + 1 ? t.childNodes[n] : null
        },
        hi = (e, t) => {
            if (jo(e) && e.hasChildNodes()) {
                const n = e.childNodes,
                    o = ((e, t, n) => Math.min(Math.max(e, 0), n))(t, 0, n.length - 1);
                return n[o]
            }
            return e
        },
        bi = new RegExp("[\u0300-\u036f\u0483-\u0487\u0488-\u0489\u0591-\u05bd\u05bf\u05c1-\u05c2\u05c4-\u05c5\u05c7\u0610-\u061a\u064b-\u065f\u0670\u06d6-\u06dc\u06df-\u06e4\u06e7-\u06e8\u06ea-\u06ed\u0711\u0730-\u074a\u07a6-\u07b0\u07eb-\u07f3\u0816-\u0819\u081b-\u0823\u0825-\u0827\u0829-\u082d\u0859-\u085b\u08e3-\u0902\u093a\u093c\u0941-\u0948\u094d\u0951-\u0957\u0962-\u0963\u0981\u09bc\u09be\u09c1-\u09c4\u09cd\u09d7\u09e2-\u09e3\u0a01-\u0a02\u0a3c\u0a41-\u0a42\u0a47-\u0a48\u0a4b-\u0a4d\u0a51\u0a70-\u0a71\u0a75\u0a81-\u0a82\u0abc\u0ac1-\u0ac5\u0ac7-\u0ac8\u0acd\u0ae2-\u0ae3\u0b01\u0b3c\u0b3e\u0b3f\u0b41-\u0b44\u0b4d\u0b56\u0b57\u0b62-\u0b63\u0b82\u0bbe\u0bc0\u0bcd\u0bd7\u0c00\u0c3e-\u0c40\u0c46-\u0c48\u0c4a-\u0c4d\u0c55-\u0c56\u0c62-\u0c63\u0c81\u0cbc\u0cbf\u0cc2\u0cc6\u0ccc-\u0ccd\u0cd5-\u0cd6\u0ce2-\u0ce3\u0d01\u0d3e\u0d41-\u0d44\u0d4d\u0d57\u0d62-\u0d63\u0dca\u0dcf\u0dd2-\u0dd4\u0dd6\u0ddf\u0e31\u0e34-\u0e3a\u0e47-\u0e4e\u0eb1\u0eb4-\u0eb9\u0ebb-\u0ebc\u0ec8-\u0ecd\u0f18-\u0f19\u0f35\u0f37\u0f39\u0f71-\u0f7e\u0f80-\u0f84\u0f86-\u0f87\u0f8d-\u0f97\u0f99-\u0fbc\u0fc6\u102d-\u1030\u1032-\u1037\u1039-\u103a\u103d-\u103e\u1058-\u1059\u105e-\u1060\u1071-\u1074\u1082\u1085-\u1086\u108d\u109d\u135d-\u135f\u1712-\u1714\u1732-\u1734\u1752-\u1753\u1772-\u1773\u17b4-\u17b5\u17b7-\u17bd\u17c6\u17c9-\u17d3\u17dd\u180b-\u180d\u18a9\u1920-\u1922\u1927-\u1928\u1932\u1939-\u193b\u1a17-\u1a18\u1a1b\u1a56\u1a58-\u1a5e\u1a60\u1a62\u1a65-\u1a6c\u1a73-\u1a7c\u1a7f\u1ab0-\u1abd\u1abe\u1b00-\u1b03\u1b34\u1b36-\u1b3a\u1b3c\u1b42\u1b6b-\u1b73\u1b80-\u1b81\u1ba2-\u1ba5\u1ba8-\u1ba9\u1bab-\u1bad\u1be6\u1be8-\u1be9\u1bed\u1bef-\u1bf1\u1c2c-\u1c33\u1c36-\u1c37\u1cd0-\u1cd2\u1cd4-\u1ce0\u1ce2-\u1ce8\u1ced\u1cf4\u1cf8-\u1cf9\u1dc0-\u1df5\u1dfc-\u1dff\u200c-\u200d\u20d0-\u20dc\u20dd-\u20e0\u20e1\u20e2-\u20e4\u20e5-\u20f0\u2cef-\u2cf1\u2d7f\u2de0-\u2dff\u302a-\u302d\u302e-\u302f\u3099-\u309a\ua66f\ua670-\ua672\ua674-\ua67d\ua69e-\ua69f\ua6f0-\ua6f1\ua802\ua806\ua80b\ua825-\ua826\ua8c4\ua8e0-\ua8f1\ua926-\ua92d\ua947-\ua951\ua980-\ua982\ua9b3\ua9b6-\ua9b9\ua9bc\ua9e5\uaa29-\uaa2e\uaa31-\uaa32\uaa35-\uaa36\uaa43\uaa4c\uaa7c\uaab0\uaab2-\uaab4\uaab7-\uaab8\uaabe-\uaabf\uaac1\uaaec-\uaaed\uaaf6\uabe5\uabe8\uabed\ufb1e\ufe00-\ufe0f\ufe20-\ufe2f\uff9e-\uff9f]"),
        vi = e => m(e) && e.charCodeAt(0) >= 768 && bi.test(e),
        yi = jo,
        Ci = os,
        wi = Vo("display", "block table"),
        xi = Vo("float", "left right"),
        ki = ((...e) => t => {
            for (let n = 0; n < e.length; n++)
                if (!e[n](t)) return !1;
            return !0
        })(yi, Ci, T(xi)),
        Ei = T(Vo("white-space", "pre pre-line pre-wrap")),
        Si = Xo,
        _i = nr,
        Ni = Oa.nodeIndex,
        Ri = (e, t) => t < 0 && jo(e) && e.hasChildNodes() ? void 0 : hi(e, t),
        Ai = e => e ? e.createRange() : Oa.DOM.createRng(),
        Oi = e => m(e) && /[\r\n\t ]/.test(e),
        Ti = e => !!e.setStart && !!e.setEnd,
        Bi = e => {
            const t = e.startContainer,
                n = e.startOffset;
            if (Oi(e.toString()) && Ei(t.parentNode) && Xo(t)) {
                const e = t.data;
                if (Oi(e[n - 1]) || Oi(e[n + 1])) return !0
            }
            return !1
        },
        Di = e => 0 === e.left && 0 === e.right && 0 === e.top && 0 === e.bottom,
        Pi = e => {
            var t;
            let n;
            const o = e.getClientRects();
            return n = o.length > 0 ? di(o[0]) : di(e.getBoundingClientRect()), !Ti(e) && _i(e) && Di(n) ? (e => {
                const t = e.ownerDocument,
                    n = Ai(t),
                    o = t.createTextNode(fr),
                    r = e.parentNode;
                r.insertBefore(o, e), n.setStart(o, 0), n.setEnd(o, 1);
                const s = di(n.getBoundingClientRect());
                return r.removeChild(o), s
            })(e) : Di(n) && Ti(e) && null !== (t = (e => {
                const t = e.startContainer,
                    n = e.endContainer,
                    o = e.startOffset,
                    r = e.endOffset;
                if (t === n && Xo(n) && 0 === o && 1 === r) {
                    const t = e.cloneRange();
                    return t.setEndAfter(n), Pi(t)
                }
                return null
            })(e)) && void 0 !== t ? t : n
        },
        Li = (e, t) => {
            const n = ci(e, t);
            return n.width = 1, n.right = n.left + 1, n
        },
        Mi = (e, t, n) => {
            const o = () => (n || (n = (e => {
                const t = [],
                    n = e => {
                        var n, o;
                        0 !== e.height && (t.length > 0 && (n = e, o = t[t.length - 1], n.left === o.left && n.top === o.top && n.bottom === o.bottom && n.right === o.right) || t.push(e))
                    },
                    o = (e, t) => {
                        const o = Ai(e.ownerDocument);
                        if (t < e.data.length) {
                            if (vi(e.data[t])) return;
                            if (vi(e.data[t - 1]) && (o.setStart(e, t), o.setEnd(e, t + 1), !Bi(o))) return void n(Li(Pi(o), !1))
                        }
                        t > 0 && (o.setStart(e, t - 1), o.setEnd(e, t), Bi(o) || n(Li(Pi(o), !1))), t < e.data.length && (o.setStart(e, t), o.setEnd(e, t + 1), Bi(o) || n(Li(Pi(o), !0)))
                    },
                    r = e.container(),
                    s = e.offset();
                if (Si(r)) return o(r, s), t;
                if (yi(r))
                    if (e.isAtEnd()) {
                        const e = Ri(r, s);
                        Si(e) && o(e, e.data.length), ki(e) && !_i(e) && n(Li(Pi(e), !1))
                    } else {
                        const a = Ri(r, s);
                        if (Si(a) && o(a, 0), ki(a) && e.isAtEnd()) return n(Li(Pi(a), !1)), t;
                        const i = Ri(e.container(), e.offset() - 1);
                        ki(i) && !_i(i) && (wi(i) || wi(a) || !ki(a)) && n(Li(Pi(i), !1)), ki(a) && n(Li(Pi(a), !0))
                    } return t
            })(Mi(e, t))), n);
            return {
                container: N(e),
                offset: N(t),
                toRange: () => {
                    const n = Ai(e.ownerDocument);
                    return n.setStart(e, t), n.setEnd(e, t), n
                },
                getClientRects: o,
                isVisible: () => o().length > 0,
                isAtStart: () => (Si(e), 0 === t),
                isAtEnd: () => Si(e) ? t >= e.data.length : t >= e.childNodes.length,
                isEqual: n => n && e === n.container() && t === n.offset(),
                getNode: n => Ri(e, n ? t - 1 : t)
            }
        };
    Mi.fromRangeStart = e => Mi(e.startContainer, e.startOffset), Mi.fromRangeEnd = e => Mi(e.endContainer, e.endOffset), Mi.after = e => Mi(e.parentNode, Ni(e) + 1), Mi.before = e => Mi(e.parentNode, Ni(e)), Mi.isAbove = (e, t) => Lt(le(t.getClientRects()), de(e.getClientRects()), mi).getOr(!1), Mi.isBelow = (e, t) => Lt(de(t.getClientRects()), le(e.getClientRects()), fi).getOr(!1), Mi.isAtStart = e => !!e && e.isAtStart(), Mi.isAtEnd = e => !!e && e.isAtEnd(), Mi.isTextPosition = e => !!e && Xo(e.container()), Mi.isElementPosition = e => !Mi.isTextPosition(e);
    const Ii = (e, t) => {
            Xo(t) && 0 === t.data.length && e.remove(t)
        },
        Fi = (e, t, n) => {
            tr(n) ? ((e, t, n) => {
                const o = I.from(n.firstChild),
                    r = I.from(n.lastChild);
                t.insertNode(n), o.each((t => Ii(e, t.previousSibling))), r.each((t => Ii(e, t.nextSibling)))
            })(e, t, n) : ((e, t, n) => {
                t.insertNode(n), Ii(e, n.previousSibling), Ii(e, n.nextSibling)
            })(e, t, n)
        },
        Ui = Xo,
        zi = Wo,
        ji = Oa.nodeIndex,
        Hi = e => {
            const t = e.parentNode;
            return zi(t) ? Hi(t) : t
        },
        $i = e => e ? Te(e.childNodes, ((e, t) => (zi(t) && "BR" !== t.nodeName ? e = e.concat($i(t)) : e.push(t), e)), []) : [],
        Vi = e => t => e === t,
        qi = e => (Ui(e) ? "text()" : e.nodeName.toLowerCase()) + "[" + (e => {
            let t, n;
            t = $i(Hi(e)), n = Be(t, Vi(e), e), t = t.slice(0, n + 1);
            const o = Te(t, ((e, n, o) => (Ui(n) && Ui(t[o - 1]) && e++, e)), 0);
            return t = Oe(t, $o([e.nodeName])), n = Be(t, Vi(e), e), n - o
        })(e) + "]",
        Wi = (e, t) => {
            let n, o = [],
                r = t.container(),
                s = t.offset();
            if (Ui(r)) n = ((e, t) => {
                let n = e;
                for (;
                    (n = n.previousSibling) && Ui(n);) t += n.data.length;
                return t
            })(r, s);
            else {
                const e = r.childNodes;
                s >= e.length ? (n = "after", s = e.length - 1) : n = "before", r = e[s]
            }
            o.push(qi(r));
            let a = ((e, t, n) => {
                const o = [];
                for (let n = t.parentNode; n && n !== e; n = n.parentNode) o.push(n);
                return o
            })(e, r);
            return a = Oe(a, T(Wo)), o = o.concat(Ae(a, (e => qi(e)))), o.reverse().join("/") + "," + n
        },
        Ki = (e, t) => {
            if (!t) return null;
            const n = t.split(","),
                o = n[0].split("/"),
                r = n.length > 1 ? n[1] : "before",
                s = Te(o, ((e, t) => {
                    const n = /([\w\-\(\)]+)\[([0-9]+)\]/.exec(t);
                    return n ? ("text()" === n[1] && (n[1] = "#text"), ((e, t, n) => {
                        let o = $i(e);
                        return o = Oe(o, ((e, t) => !Ui(e) || !Ui(o[t - 1]))), o = Oe(o, $o([t])), o[n]
                    })(e, n[1], parseInt(n[2], 10))) : null
                }), e);
            if (!s) return null;
            if (!Ui(s) && s.parentNode) {
                let e;
                return e = "after" === r ? ji(s) + 1 : ji(s), Mi(s.parentNode, e)
            }
            return ((e, t) => {
                let n = e,
                    o = 0;
                for (; Ui(n);) {
                    const r = n.data.length;
                    if (t >= o && t <= o + r) {
                        e = n, t -= o;
                        break
                    }
                    if (!Ui(n.nextSibling)) {
                        e = n, t = r;
                        break
                    }
                    o += r, n = n.nextSibling
                }
                return Ui(e) && t > e.data.length && (t = e.data.length), Mi(e, t)
            })(s, parseInt(r, 10))
        },
        Gi = sr,
        Yi = (e, t, n, o, r) => {
            const s = r ? o.startContainer : o.endContainer;
            let a = r ? o.startOffset : o.endOffset;
            const i = [],
                l = e.getRoot();
            if (Xo(s)) i.push(n ? ((e, t, n) => {
                let o = e(t.data.slice(0, n)).length;
                for (let n = t.previousSibling; n && Xo(n); n = n.previousSibling) o += e(n.data).length;
                return o
            })(t, s, a) : a);
            else {
                let t = 0;
                const o = s.childNodes;
                a >= o.length && o.length && (t = 1, a = Math.max(0, o.length - 1)), i.push(e.nodeIndex(o[a], n) + t)
            }
            for (let t = s; t && t !== l; t = t.parentNode) i.push(e.nodeIndex(t, n));
            return i
        },
        Xi = (e, t, n) => {
            let o = 0;
            return Dt.each(e.select(t), (e => "all" === e.getAttribute("data-mce-bogus") ? void 0 : e !== n && void o++)), o
        },
        Qi = (e, t) => {
            let n = t ? e.startContainer : e.endContainer,
                o = t ? e.startOffset : e.endOffset;
            if (jo(n) && "TR" === n.nodeName) {
                const r = n.childNodes;
                n = r[Math.min(t ? o : o - 1, r.length - 1)], n && (o = t ? 0 : n.childNodes.length, t ? e.setStart(n, o) : e.setEnd(n, o))
            }
        },
        Ji = e => (Qi(e, !0), Qi(e, !1), e),
        Zi = (e, t) => {
            if (jo(e) && (e = hi(e, t), Gi(e))) return e;
            if (jr(e)) {
                Xo(e) && Ur(e) && (e = e.parentNode);
                let t = e.previousSibling;
                if (Gi(t)) return t;
                if (t = e.nextSibling, Gi(t)) return t
            }
        },
        el = (e, t, n) => {
            const o = n.getNode(),
                r = n.getRng();
            if ("IMG" === o.nodeName || Gi(o)) {
                const e = o.nodeName;
                return {
                    name: e,
                    index: Xi(n.dom, e, o)
                }
            }
            const s = (e => Zi(e.startContainer, e.startOffset) || Zi(e.endContainer, e.endOffset))(r);
            if (s) {
                const e = s.tagName;
                return {
                    name: e,
                    index: Xi(n.dom, e, s)
                }
            }
            return ((e, t, n, o) => {
                const r = t.dom,
                    s = Yi(r, e, n, o, !0),
                    a = t.isForward(),
                    i = Gr(o) ? {
                        isFakeCaret: !0
                    } : {};
                return t.isCollapsed() ? {
                    start: s,
                    forward: a,
                    ...i
                } : {
                    start: s,
                    end: Yi(r, e, n, o, !1),
                    forward: a,
                    ...i
                }
            })(e, n, t, r)
        },
        tl = (e, t, n) => {
            const o = {
                "data-mce-type": "bookmark",
                id: t,
                style: "overflow:hidden;line-height:0px"
            };
            return n ? e.create("span", o, "&#xFEFF;") : e.create("span", o)
        },
        nl = (e, t) => {
            const n = e.dom;
            let o = e.getRng();
            const r = n.uniqueId(),
                s = e.isCollapsed(),
                a = e.getNode(),
                i = a.nodeName,
                l = e.isForward();
            if ("IMG" === i) return {
                name: i,
                index: Xi(n, i, a)
            };
            const d = Ji(o.cloneRange());
            if (!s) {
                d.collapse(!1);
                const e = tl(n, r + "_end", t);
                Fi(n, d, e)
            }
            o = Ji(o), o.collapse(!0);
            const c = tl(n, r + "_start", t);
            return Fi(n, o, c), e.moveToBookmark({
                id: r,
                keep: !0,
                forward: l
            }), {
                id: r,
                forward: l
            }
        },
        ol = O(el, R, !0),
        rl = e => {
            const t = t => t(e),
                n = N(e),
                o = () => r,
                r = {
                    tag: !0,
                    inner: e,
                    fold: (t, n) => n(e),
                    isValue: M,
                    isError: L,
                    map: t => al.value(t(e)),
                    mapError: o,
                    bind: t,
                    exists: t,
                    forall: t,
                    getOr: n,
                    or: o,
                    getOrThunk: n,
                    orThunk: o,
                    getOrDie: n,
                    each: t => {
                        t(e)
                    },
                    toOptional: () => I.some(e)
                };
            return r
        },
        sl = e => {
            const t = () => n,
                n = {
                    tag: !1,
                    inner: e,
                    fold: (t, n) => t(e),
                    isValue: L,
                    isError: M,
                    map: t,
                    mapError: t => al.error(t(e)),
                    bind: t,
                    exists: L,
                    forall: M,
                    getOr: R,
                    or: R,
                    getOrThunk: D,
                    orThunk: D,
                    getOrDie: B(String(e)),
                    each: E,
                    toOptional: I.none
                };
            return n
        },
        al = {
            value: rl,
            error: sl,
            fromOption: (e, t) => e.fold((() => sl(t)), rl)
        },
        il = e => {
            if (!p(e)) throw new Error("cases must be an array");
            if (0 === e.length) throw new Error("there must be at least one case");
            const t = [],
                n = {};
            return q(e, ((o, r) => {
                const s = me(o);
                if (1 !== s.length) throw new Error("one and only one name per case");
                const a = s[0],
                    i = o[a];
                if (void 0 !== n[a]) throw new Error("duplicate key detected:" + a);
                if ("cata" === a) throw new Error("cannot have a case named cata (sorry)");
                if (!p(i)) throw new Error("case arguments must be an array");
                t.push(a), n[a] = (...n) => {
                    const o = n.length;
                    if (o !== i.length) throw new Error("Wrong number of arguments to case " + a + ". Expected " + i.length + " (" + i + "), got " + o);
                    return {
                        fold: (...t) => {
                            if (t.length !== e.length) throw new Error("Wrong number of arguments to fold. Expected " + e.length + ", got " + t.length);
                            return t[r].apply(null, n)
                        },
                        match: e => {
                            const o = me(e);
                            if (t.length !== o.length) throw new Error("Wrong number of arguments to match. Expected: " + t.join(",") + "\nActual: " + o.join(","));
                            if (!ne(t, (e => H(o, e)))) throw new Error("Not all branches were specified when using match. Specified: " + o.join(", ") + "\nRequired: " + t.join(", "));
                            return e[a].apply(null, n)
                        },
                        log: e => {
                            console.log(e, {
                                constructors: t,
                                constructor: a,
                                params: n
                            })
                        }
                    }
                }
            })), n
        };
    il([{
        bothErrors: ["error1", "error2"]
    }, {
        firstError: ["error1", "value2"]
    }, {
        secondError: ["value1", "error2"]
    }, {
        bothValues: ["value1", "value2"]
    }]);
    const ll = e => "inline-command" === e.type || "inline-format" === e.type,
        dl = e => "block-command" === e.type || "block-format" === e.type,
        cl = e => {
            const t = t => al.error({
                    message: t,
                    pattern: e
                }),
                n = (n, o, r) => {
                    if (void 0 !== e.format) {
                        let r;
                        if (p(e.format)) {
                            if (!ne(e.format, m)) return t(n + " pattern has non-string items in the `format` array");
                            r = e.format
                        } else {
                            if (!m(e.format)) return t(n + " pattern has non-string `format` parameter");
                            r = [e.format]
                        }
                        return al.value(o(r))
                    }
                    return void 0 !== e.cmd ? m(e.cmd) ? al.value(r(e.cmd, e.value)) : t(n + " pattern has non-string `cmd` parameter") : t(n + " pattern is missing both `format` and `cmd` parameters")
                };
            if (!f(e)) return t("Raw pattern is not an object");
            if (!m(e.start)) return t("Raw pattern is missing `start` parameter");
            if (void 0 !== e.end) {
                if (!m(e.end)) return t("Inline pattern has non-string `end` parameter");
                if (0 === e.start.length && 0 === e.end.length) return t("Inline pattern has empty `start` and `end` parameters");
                let o = e.start,
                    r = e.end;
                return 0 === r.length && (r = o, o = ""), n("Inline", (e => ({
                    type: "inline-format",
                    start: o,
                    end: r,
                    format: e
                })), ((e, t) => ({
                    type: "inline-command",
                    start: o,
                    end: r,
                    cmd: e,
                    value: t
                })))
            }
            return void 0 !== e.replacement ? m(e.replacement) ? 0 === e.start.length ? t("Replacement pattern has empty `start` parameter") : al.value({
                type: "inline-command",
                start: "",
                end: e.start,
                cmd: "mceInsertContent",
                value: e.replacement
            }) : t("Replacement pattern has non-string `replacement` parameter") : 0 === e.start.length ? t("Block pattern has empty `start` parameter") : n("Block", (t => ({
                type: "block-format",
                start: e.start,
                format: t[0]
            })), ((t, n) => ({
                type: "block-command",
                start: e.start,
                cmd: t,
                value: n
            })))
        },
        ul = e => G(e, dl),
        ml = e => G(e, ll),
        fl = e => {
            const t = (e => {
                const t = [],
                    n = [];
                return q(e, (e => {
                    e.fold((e => {
                        t.push(e)
                    }), (e => {
                        n.push(e)
                    }))
                })), {
                    errors: t,
                    values: n
                }
            })(V(e, cl));
            return q(t.errors, (e => console.error(e.message, e.pattern))), t.values
        },
        gl = xt().deviceType,
        pl = gl.isTouch(),
        hl = Oa.DOM,
        bl = e => u(e, RegExp),
        vl = e => t => t.options.get(e),
        yl = e => m(e) || f(e),
        Cl = (e, t = "") => n => {
            const o = m(n);
            if (o) {
                if (-1 !== n.indexOf("=")) {
                    const r = (e => {
                        const t = e.indexOf("=") > 0 ? e.split(/[;,](?![^=;,]*(?:[;,]|$))/) : e.split(",");
                        return X(t, ((e, t) => {
                            const n = t.split("="),
                                o = n[0],
                                r = n.length > 1 ? n[1] : o;
                            return e[qe(o)] = qe(r), e
                        }), {})
                    })(n);
                    return {
                        value: xe(r, e.id).getOr(t),
                        valid: o
                    }
                }
                return {
                    value: n,
                    valid: o
                }
            }
            return {
                valid: !1,
                message: "Must be a string."
            }
        },
        wl = vl("iframe_attrs"),
        xl = vl("doctype"),
        kl = vl("document_base_url"),
        El = vl("body_id"),
        Sl = vl("body_class"),
        _l = vl("content_security_policy"),
        Nl = vl("br_in_pre"),
        Rl = vl("forced_root_block"),
        Al = vl("forced_root_block_attrs"),
        Ol = vl("newline_behavior"),
        Tl = vl("br_newline_selector"),
        Bl = vl("no_newline_selector"),
        Dl = vl("keep_styles"),
        Pl = vl("end_container_on_empty_block"),
        Ll = vl("automatic_uploads"),
        Ml = vl("images_reuse_filename"),
        Il = vl("images_replace_blob_uris"),
        Fl = vl("icons"),
        Ul = vl("icons_url"),
        zl = vl("images_upload_url"),
        jl = vl("images_upload_base_path"),
        Hl = vl("images_upload_credentials"),
        $l = vl("images_upload_handler"),
        Vl = vl("content_css_cors"),
        ql = vl("referrer_policy"),
        Wl = vl("language"),
        Kl = vl("language_url"),
        Gl = vl("indent_use_margin"),
        Yl = vl("indentation"),
        Xl = vl("content_css"),
        Ql = vl("content_style"),
        Jl = vl("font_css"),
        Zl = vl("directionality"),
        ed = vl("inline_boundaries_selector"),
        td = vl("object_resizing"),
        nd = vl("resize_img_proportional"),
        od = vl("placeholder"),
        rd = vl("event_root"),
        sd = vl("service_message"),
        ad = vl("theme"),
        id = vl("theme_url"),
        ld = vl("model"),
        dd = vl("model_url"),
        cd = vl("inline_boundaries"),
        ud = vl("formats"),
        md = vl("preview_styles"),
        fd = vl("format_empty_lines"),
        gd = vl("format_noneditable_selector"),
        pd = vl("custom_ui_selector"),
        hd = vl("inline"),
        bd = vl("hidden_input"),
        vd = vl("submit_patch"),
        yd = vl("add_form_submit_trigger"),
        Cd = vl("add_unload_trigger"),
        wd = vl("custom_undo_redo_levels"),
        xd = vl("disable_nodechange"),
        kd = vl("readonly"),
        Ed = vl("editable_root"),
        Sd = vl("content_css_cors"),
        _d = vl("plugins"),
        Nd = vl("external_plugins"),
        Rd = vl("block_unsupported_drop"),
        Ad = vl("visual"),
        Od = vl("visual_table_class"),
        Td = vl("visual_anchor_class"),
        Bd = vl("iframe_aria_text"),
        Dd = vl("setup"),
        Pd = vl("init_instance_callback"),
        Ld = vl("urlconverter_callback"),
        Md = vl("auto_focus"),
        Id = vl("browser_spellcheck"),
        Fd = vl("protect"),
        Ud = vl("paste_block_drop"),
        zd = vl("paste_data_images"),
        jd = vl("paste_preprocess"),
        Hd = vl("paste_postprocess"),
        $d = vl("newdocument_content"),
        Vd = vl("paste_webkit_styles"),
        qd = vl("paste_remove_styles_if_webkit"),
        Wd = vl("paste_merge_formats"),
        Kd = vl("smart_paste"),
        Gd = vl("paste_as_text"),
        Yd = vl("paste_tab_spaces"),
        Xd = vl("allow_html_data_urls"),
        Qd = vl("text_patterns"),
        Jd = vl("text_patterns_lookup"),
        Zd = vl("noneditable_class"),
        ec = vl("editable_class"),
        tc = vl("noneditable_regexp"),
        nc = vl("preserve_cdata"),
        oc = vl("highlight_on_focus"),
        rc = vl("xss_sanitization"),
        sc = vl("init_content_sync"),
        ac = e => Dt.explode(e.options.get("images_file_types")),
        ic = vl("table_tab_navigation"),
        lc = vl("details_initial_state"),
        dc = vl("details_serialized_state"),
        cc = jo,
        uc = Xo,
        mc = e => {
            const t = e.parentNode;
            t && t.removeChild(e)
        },
        fc = e => {
            const t = Mr(e);
            return {
                count: e.length - t.length,
                text: t
            }
        },
        gc = e => {
            let t;
            for (; - 1 !== (t = e.data.lastIndexOf(Pr));) e.deleteData(t, 1)
        },
        pc = (e, t) => (bc(e), t),
        hc = (e, t) => Mi.isTextPosition(t) ? ((e, t) => uc(e) && t.container() === e ? ((e, t) => {
            const n = fc(e.data.substr(0, t.offset())),
                o = fc(e.data.substr(t.offset()));
            return (n.text + o.text).length > 0 ? (gc(e), Mi(e, t.offset() - n.count)) : t
        })(e, t) : pc(e, t))(e, t) : ((e, t) => t.container() === e.parentNode ? ((e, t) => {
            const n = t.container(),
                o = ((e, t) => {
                    const n = j(e, t);
                    return -1 === n ? I.none() : I.some(n)
                })(ce(n.childNodes), e).map((e => e < t.offset() ? Mi(n, t.offset() - 1) : t)).getOr(t);
            return bc(e), o
        })(e, t) : pc(e, t))(e, t),
        bc = e => {
            cc(e) && jr(e) && (Hr(e) ? e.removeAttribute("data-mce-caret") : mc(e)), uc(e) && (gc(e), 0 === e.data.length && mc(e))
        },
        vc = sr,
        yc = lr,
        Cc = ar,
        wc = (e, t, n) => {
            const o = ci(t.getBoundingClientRect(), n);
            let r, s;
            if ("BODY" === e.tagName) {
                const t = e.ownerDocument.documentElement;
                r = e.scrollLeft || t.scrollLeft, s = e.scrollTop || t.scrollTop
            } else {
                const t = e.getBoundingClientRect();
                r = e.scrollLeft - t.left, s = e.scrollTop - t.top
            }
            o.left += r, o.right += r, o.top += s, o.bottom += s, o.width = 1;
            let a = t.offsetWidth - t.clientWidth;
            return a > 0 && (n && (a *= -1), o.left += a, o.right += a), o
        },
        xc = (e, t, n, o) => {
            const r = za();
            let s, a;
            const i = Rl(e),
                l = e.dom,
                d = () => {
                    (e => {
                        var t, n;
                        const o = Mo(vn(e), "*[contentEditable=false],video,audio,embed,object");
                        for (let e = 0; e < o.length; e++) {
                            const r = o[e].dom;
                            let s = r.previousSibling;
                            if (Wr(s)) {
                                const e = s.data;
                                1 === e.length ? null === (t = s.parentNode) || void 0 === t || t.removeChild(s) : s.deleteData(e.length - 1, 1)
                            }
                            s = r.nextSibling, qr(s) && (1 === s.data.length ? null === (n = s.parentNode) || void 0 === n || n.removeChild(s) : s.deleteData(0, 1))
                        }
                    })(t), a && (bc(a), a = null), r.on((e => {
                        l.remove(e.caret), r.clear()
                    })), s && (clearInterval(s), s = void 0)
                };
            return {
                show: (e, c) => {
                    let u;
                    if (d(), Cc(c)) return null;
                    if (!n(c)) return a = ((e, t) => {
                        var n;
                        const o = (null !== (n = e.ownerDocument) && void 0 !== n ? n : document).createTextNode(Pr),
                            r = e.parentNode;
                        if (t) {
                            const t = e.previousSibling;
                            if (Fr(t)) {
                                if (jr(t)) return t;
                                if (Wr(t)) return t.splitText(t.data.length - 1)
                            }
                            null == r || r.insertBefore(o, e)
                        } else {
                            const t = e.nextSibling;
                            if (Fr(t)) {
                                if (jr(t)) return t;
                                if (qr(t)) return t.splitText(1), t
                            }
                            e.nextSibling ? null == r || r.insertBefore(o, e.nextSibling) : null == r || r.appendChild(o)
                        }
                        return o
                    })(c, e), u = c.ownerDocument.createRange(), Ec(a.nextSibling) ? (u.setStart(a, 0), u.setEnd(a, 0)) : (u.setStart(a, 1), u.setEnd(a, 1)), u;
                    {
                        const n = ((e, t, n) => {
                                var o;
                                const r = (null !== (o = t.ownerDocument) && void 0 !== o ? o : document).createElement(e);
                                r.setAttribute("data-mce-caret", n ? "before" : "after"), r.setAttribute("data-mce-bogus", "all"), r.appendChild(Tr().dom);
                                const s = t.parentNode;
                                return n ? null == s || s.insertBefore(r, t) : t.nextSibling ? null == s || s.insertBefore(r, t.nextSibling) : null == s || s.appendChild(r), r
                            })(i, c, e),
                            d = wc(t, c, e);
                        l.setStyle(n, "top", d.top), a = n;
                        const m = l.create("div", {
                            class: "mce-visual-caret",
                            "data-mce-bogus": "all"
                        });
                        l.setStyles(m, {
                            ...d
                        }), l.add(t, m), r.set({
                            caret: m,
                            element: c,
                            before: e
                        }), e && l.addClass(m, "mce-visual-caret-before"), s = setInterval((() => {
                            r.on((e => {
                                o() ? l.toggleClass(e.caret, "mce-visual-caret-hidden") : l.addClass(e.caret, "mce-visual-caret-hidden")
                            }))
                        }), 500), u = c.ownerDocument.createRange(), u.setStart(n, 0), u.setEnd(n, 0)
                    }
                    return u
                },
                hide: d,
                getCss: () => ".mce-visual-caret {position: absolute;background-color: black;background-color: currentcolor;}.mce-visual-caret-hidden {display: none;}*[data-mce-caret] {position: absolute;left: -1000px;right: auto;top: 0;margin: 0;padding: 0;}",
                reposition: () => {
                    r.on((e => {
                        const n = wc(t, e.element, e.before);
                        l.setStyles(e.caret, {
                            ...n
                        })
                    }))
                },
                destroy: () => clearInterval(s)
            }
        },
        kc = () => At.browser.isFirefox(),
        Ec = e => vc(e) || yc(e),
        Sc = e => (Ec(e) || Ko(e) && kc()) && An(vn(e)).exists(to),
        _c = rr,
        Nc = sr,
        Rc = lr,
        Ac = Vo("display", "block table table-cell table-caption list-item"),
        Oc = jr,
        Tc = Ur,
        Bc = jo,
        Dc = Xo,
        Pc = os,
        Lc = e => e > 0,
        Mc = e => e < 0,
        Ic = (e, t) => {
            let n;
            for (; n = e(t);)
                if (!Tc(n)) return n;
            return null
        },
        Fc = (e, t, n, o, r) => {
            const s = new Fo(e, o),
                a = Nc(e) || Tc(e);
            let i;
            if (Mc(t)) {
                if (a && (i = Ic(s.prev.bind(s), !0), n(i))) return i;
                for (; i = Ic(s.prev.bind(s), r);)
                    if (n(i)) return i
            }
            if (Lc(t)) {
                if (a && (i = Ic(s.next.bind(s), !0), n(i))) return i;
                for (; i = Ic(s.next.bind(s), r);)
                    if (n(i)) return i
            }
            return null
        },
        Uc = (e, t) => {
            for (; e && e !== t;) {
                if (Ac(e)) return e;
                e = e.parentNode
            }
            return null
        },
        zc = (e, t, n) => Uc(e.container(), n) === Uc(t.container(), n),
        jc = (e, t) => {
            if (!t) return I.none();
            const n = t.container(),
                o = t.offset();
            return Bc(n) ? I.from(n.childNodes[o + e]) : I.none()
        },
        Hc = (e, t) => {
            var n;
            const o = (null !== (n = t.ownerDocument) && void 0 !== n ? n : document).createRange();
            return e ? (o.setStartBefore(t), o.setEndBefore(t)) : (o.setStartAfter(t), o.setEndAfter(t)), o
        },
        $c = (e, t, n) => Uc(t, e) === Uc(n, e),
        Vc = (e, t, n) => {
            const o = e ? "previousSibling" : "nextSibling";
            let r = n;
            for (; r && r !== t;) {
                let e = r[o];
                if (e && Oc(e) && (e = e[o]), Nc(e) || Rc(e)) {
                    if ($c(t, e, r)) return e;
                    break
                }
                if (Pc(e)) break;
                r = r.parentNode
            }
            return null
        },
        qc = O(Hc, !0),
        Wc = O(Hc, !1),
        Kc = (e, t, n) => {
            let o;
            const r = O(Vc, !0, t),
                s = O(Vc, !1, t),
                a = n.startContainer,
                i = n.startOffset;
            if (Ur(a)) {
                const e = Dc(a) ? a.parentNode : a,
                    t = e.getAttribute("data-mce-caret");
                if ("before" === t && (o = e.nextSibling, Sc(o))) return qc(o);
                if ("after" === t && (o = e.previousSibling, Sc(o))) return Wc(o)
            }
            if (!n.collapsed) return n;
            if (Xo(a)) {
                if (Oc(a)) {
                    if (1 === e) {
                        if (o = s(a), o) return qc(o);
                        if (o = r(a), o) return Wc(o)
                    }
                    if (-1 === e) {
                        if (o = r(a), o) return Wc(o);
                        if (o = s(a), o) return qc(o)
                    }
                    return n
                }
                if (Wr(a) && i >= a.data.length - 1) return 1 === e && (o = s(a), o) ? qc(o) : n;
                if (qr(a) && i <= 1) return -1 === e && (o = r(a), o) ? Wc(o) : n;
                if (i === a.data.length) return o = s(a), o ? qc(o) : n;
                if (0 === i) return o = r(a), o ? Wc(o) : n
            }
            return n
        },
        Gc = (e, t) => jc(e ? 0 : -1, t).filter(Nc),
        Yc = (e, t, n) => {
            const o = Kc(e, t, n);
            return -1 === e ? Mi.fromRangeStart(o) : Mi.fromRangeEnd(o)
        },
        Xc = e => I.from(e.getNode()).map(vn),
        Qc = (e, t) => {
            let n = t;
            for (; n = e(n);)
                if (n.isVisible()) return n;
            return n
        },
        Jc = (e, t) => {
            const n = zc(e, t);
            return !(n || !nr(e.getNode())) || n
        };
    var Zc;
    ! function(e) {
        e[e.Backwards = -1] = "Backwards", e[e.Forwards = 1] = "Forwards"
    }(Zc || (Zc = {}));
    const eu = sr,
        tu = Xo,
        nu = jo,
        ou = nr,
        ru = os,
        su = e => es(e) || (e => !!rs(e) && !X(ce(e.getElementsByTagName("*")), ((e, t) => e || Yr(t)), !1))(e),
        au = ss,
        iu = (e, t) => e.hasChildNodes() && t < e.childNodes.length ? e.childNodes[t] : null,
        lu = (e, t) => {
            if (Lc(e)) {
                if (ru(t.previousSibling) && !tu(t.previousSibling)) return Mi.before(t);
                if (tu(t)) return Mi(t, 0)
            }
            if (Mc(e)) {
                if (ru(t.nextSibling) && !tu(t.nextSibling)) return Mi.after(t);
                if (tu(t)) return Mi(t, t.data.length)
            }
            return Mc(e) ? ou(t) ? Mi.before(t) : Mi.after(t) : Mi.before(t)
        },
        du = (e, t, n) => {
            let o, r, s, a;
            if (!nu(n) || !t) return null;
            if (t.isEqual(Mi.after(n)) && n.lastChild) {
                if (a = Mi.after(n.lastChild), Mc(e) && ru(n.lastChild) && nu(n.lastChild)) return ou(n.lastChild) ? Mi.before(n.lastChild) : a
            } else a = t;
            const i = a.container();
            let l = a.offset();
            if (tu(i)) {
                if (Mc(e) && l > 0) return Mi(i, --l);
                if (Lc(e) && l < i.length) return Mi(i, ++l);
                o = i
            } else {
                if (Mc(e) && l > 0 && (r = iu(i, l - 1), ru(r))) return !su(r) && (s = Fc(r, e, au, r), s) ? tu(s) ? Mi(s, s.data.length) : Mi.after(s) : tu(r) ? Mi(r, r.data.length) : Mi.before(r);
                if (Lc(e) && l < i.childNodes.length && (r = iu(i, l), ru(r))) return ou(r) ? ((e, t) => {
                    const n = t.nextSibling;
                    return n && ru(n) ? tu(n) ? Mi(n, 0) : Mi.before(n) : du(Zc.Forwards, Mi.after(t), e)
                })(n, r) : !su(r) && (s = Fc(r, e, au, r), s) ? tu(s) ? Mi(s, 0) : Mi.before(s) : tu(r) ? Mi(r, 0) : Mi.after(r);
                o = r || a.getNode()
            }
            if (o && (Lc(e) && a.isAtEnd() || Mc(e) && a.isAtStart()) && (o = Fc(o, e, M, n, !0), au(o, n))) return lu(e, o);
            r = o ? Fc(o, e, au, n) : o;
            const d = De(G(((e, t) => {
                const n = [];
                let o = e;
                for (; o && o !== t;) n.push(o), o = o.parentNode;
                return n
            })(i, n), eu));
            return !d || r && d.contains(r) ? r ? lu(e, r) : null : (a = Lc(e) ? Mi.after(d) : Mi.before(d), a)
        },
        cu = e => ({
            next: t => du(Zc.Forwards, t, e),
            prev: t => du(Zc.Backwards, t, e)
        }),
        uu = e => Mi.isTextPosition(e) ? 0 === e.offset() : os(e.getNode()),
        mu = e => {
            if (Mi.isTextPosition(e)) {
                const t = e.container();
                return e.offset() === t.data.length
            }
            return os(e.getNode(!0))
        },
        fu = (e, t) => !Mi.isTextPosition(e) && !Mi.isTextPosition(t) && e.getNode() === t.getNode(!0),
        gu = (e, t, n) => {
            const o = cu(t);
            return I.from(e ? o.next(n) : o.prev(n))
        },
        pu = (e, t, n) => gu(e, t, n).bind((o => zc(n, o, t) && ((e, t, n) => {
            return e ? !fu(t, n) && (o = t, !(!Mi.isTextPosition(o) && nr(o.getNode()))) && mu(t) && uu(n) : !fu(n, t) && uu(t) && mu(n);
            var o
        })(e, n, o) ? gu(e, t, o) : I.some(o))),
        hu = (e, t, n, o) => pu(e, t, n).bind((n => o(n) ? hu(e, t, n, o) : I.some(n))),
        bu = (e, t) => {
            const n = e ? t.firstChild : t.lastChild;
            return Xo(n) ? I.some(Mi(n, e ? 0 : n.data.length)) : n ? os(n) ? I.some(e ? Mi.before(n) : nr(o = n) ? Mi.before(o) : Mi.after(o)) : ((e, t, n) => {
                const o = e ? Mi.before(n) : Mi.after(n);
                return gu(e, t, o)
            })(e, t, n) : I.none();
            var o
        },
        vu = O(gu, !0),
        yu = O(gu, !1),
        Cu = O(bu, !0),
        wu = O(bu, !1),
        xu = "_mce_caret",
        ku = e => jo(e) && e.id === xu,
        Eu = (e, t) => {
            let n = t;
            for (; n && n !== e;) {
                if (ku(n)) return n;
                n = n.parentNode
            }
            return null
        },
        Su = e => ke(e, "name"),
        _u = e => Dt.isArray(e.start),
        Nu = e => !(!Su(e) && b(e.forward)) || e.forward,
        Ru = (e, t) => (jo(t) && e.isBlock(t) && !t.innerHTML && (t.innerHTML = '<br data-mce-bogus="1" />'), t),
        Au = (e, t) => wu(e).fold(L, (e => (t.setStart(e.container(), e.offset()), t.setEnd(e.container(), e.offset()), !0))),
        Ou = (e, t, n) => !(!(e => !e.hasChildNodes())(t) || !Eu(e, t) || (((e, t) => {
            var n;
            const o = (null !== (n = e.ownerDocument) && void 0 !== n ? n : document).createTextNode(Pr);
            e.appendChild(o), t.setStart(o, 0), t.setEnd(o, 0)
        })(t, n), 0)),
        Tu = (e, t, n, o) => {
            const r = n[t ? "start" : "end"],
                s = e.getRoot();
            if (r) {
                let e = s,
                    n = r[0];
                for (let t = r.length - 1; e && t >= 1; t--) {
                    const n = e.childNodes;
                    if (Ou(s, e, o)) return !0;
                    if (r[t] > n.length - 1) return !!Ou(s, e, o) || Au(e, o);
                    e = n[r[t]]
                }
                Xo(e) && (n = Math.min(r[0], e.data.length)), jo(e) && (n = Math.min(r[0], e.childNodes.length)), t ? o.setStart(e, n) : o.setEnd(e, n)
            }
            return !0
        },
        Bu = e => Xo(e) && e.data.length > 0,
        Du = (e, t, n) => {
            const o = e.get(n.id + "_" + t),
                r = null == o ? void 0 : o.parentNode,
                s = n.keep;
            if (o && r) {
                let a, i;
                if ("start" === t ? s ? o.hasChildNodes() ? (a = o.firstChild, i = 1) : Bu(o.nextSibling) ? (a = o.nextSibling, i = 0) : Bu(o.previousSibling) ? (a = o.previousSibling, i = o.previousSibling.data.length) : (a = r, i = e.nodeIndex(o) + 1) : (a = r, i = e.nodeIndex(o)) : s ? o.hasChildNodes() ? (a = o.firstChild, i = 1) : Bu(o.previousSibling) ? (a = o.previousSibling, i = o.previousSibling.data.length) : (a = r, i = e.nodeIndex(o)) : (a = r, i = e.nodeIndex(o)), !s) {
                    const r = o.previousSibling,
                        s = o.nextSibling;
                    let l;
                    for (Dt.each(Dt.grep(o.childNodes), (e => {
                            Xo(e) && (e.data = e.data.replace(/\uFEFF/g, ""))
                        })); l = e.get(n.id + "_" + t);) e.remove(l, !0);
                    if (Xo(s) && Xo(r) && !At.browser.isOpera()) {
                        const t = r.data.length;
                        r.appendData(s.data), e.remove(s), a = r, i = t
                    }
                }
                return I.some(Mi(a, i))
            }
            return I.none()
        },
        Pu = (e, t, n) => ((e, t, n = !1) => 2 === t ? el(Mr, n, e) : 3 === t ? (e => {
            const t = e.getRng();
            return {
                start: Wi(e.dom.getRoot(), Mi.fromRangeStart(t)),
                end: Wi(e.dom.getRoot(), Mi.fromRangeEnd(t)),
                forward: e.isForward()
            }
        })(e) : t ? (e => ({
            rng: e.getRng(),
            forward: e.isForward()
        }))(e) : nl(e, !1))(e, t, n),
        Lu = (e, t) => {
            ((e, t) => {
                const n = e.dom;
                if (t) {
                    if (_u(t)) return ((e, t) => {
                        const n = e.createRng();
                        return Tu(e, !0, t, n) && Tu(e, !1, t, n) ? I.some({
                            range: n,
                            forward: Nu(t)
                        }) : I.none()
                    })(n, t);
                    if ((e => m(e.start))(t)) return ((e, t) => {
                        const n = I.from(Ki(e.getRoot(), t.start)),
                            o = I.from(Ki(e.getRoot(), t.end));
                        return Lt(n, o, ((n, o) => {
                            const r = e.createRng();
                            return r.setStart(n.container(), n.offset()), r.setEnd(o.container(), o.offset()), {
                                range: r,
                                forward: Nu(t)
                            }
                        }))
                    })(n, t);
                    if ((e => ke(e, "id"))(t)) return ((e, t) => {
                        const n = Du(e, "start", t),
                            o = Du(e, "end", t);
                        return Lt(n, o.or(n), ((n, o) => {
                            const r = e.createRng();
                            return r.setStart(Ru(e, n.container()), n.offset()), r.setEnd(Ru(e, o.container()), o.offset()), {
                                range: r,
                                forward: Nu(t)
                            }
                        }))
                    })(n, t);
                    if (Su(t)) return ((e, t) => I.from(e.select(t.name)[t.index]).map((t => {
                        const n = e.createRng();
                        return n.selectNode(t), {
                            range: n,
                            forward: !0
                        }
                    })))(n, t);
                    if ((e => ke(e, "rng"))(t)) return I.some({
                        range: t.rng,
                        forward: Nu(t)
                    })
                }
                return I.none()
            })(e, t).each((({
                range: t,
                forward: n
            }) => {
                e.setRng(t, n)
            }))
        },
        Mu = e => jo(e) && "SPAN" === e.tagName && "bookmark" === e.getAttribute("data-mce-type"),
        Iu = (Fu = fr, e => Fu === e);
    var Fu;
    const Uu = e => "" !== e && -1 !== " \f\n\r\t\v".indexOf(e),
        zu = e => !Uu(e) && !Iu(e) && !gr(e),
        ju = e => {
            const t = e.toString(16);
            return (1 === t.length ? "0" + t : t).toUpperCase()
        },
        Hu = e => (e => {
            return {
                value: (t = e, ze(t, "#").toUpperCase())
            };
            var t
        })(ju(e.red) + ju(e.green) + ju(e.blue)),
        $u = /^\s*rgb\s*\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*\)\s*$/i,
        Vu = /^\s*rgba\s*\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d?(?:\.\d+)?)\s*\)\s*$/i,
        qu = (e, t, n, o) => ({
            red: e,
            green: t,
            blue: n,
            alpha: o
        }),
        Wu = (e, t, n, o) => {
            const r = parseInt(e, 10),
                s = parseInt(t, 10),
                a = parseInt(n, 10),
                i = parseFloat(o);
            return qu(r, s, a, i)
        },
        Ku = e => (e => {
            if ("transparent" === e) return I.some(qu(0, 0, 0, 0));
            const t = $u.exec(e);
            if (null !== t) return I.some(Wu(t[1], t[2], t[3], "1"));
            const n = Vu.exec(e);
            return null !== n ? I.some(Wu(n[1], n[2], n[3], n[4])) : I.none()
        })(e).map(Hu).map((e => "#" + e.value)).getOr(e),
        Gu = e => {
            const t = [];
            if (e)
                for (let n = 0; n < e.rangeCount; n++) t.push(e.getRangeAt(n));
            return t
        },
        Yu = (e, t) => {
            const n = Mo(t, "td[data-mce-selected],th[data-mce-selected]");
            return n.length > 0 ? n : (e => G((e => te(e, (e => {
                const t = pi(e);
                return t ? [vn(t)] : []
            })))(e), Nr))(e)
        },
        Xu = e => Yu(Gu(e.selection.getSel()), vn(e.getBody())),
        Qu = (e, t) => Jn(e, "table", t),
        Ju = e => In(e).fold(N([e]), (t => [e].concat(Ju(t)))),
        Zu = e => Fn(e).fold(N([e]), (t => "br" === jt(t) ? Tn(t).map((t => [e].concat(Zu(t)))).getOr([]) : [e].concat(Zu(t)))),
        em = (e, t) => Lt((e => {
            const t = e.startContainer,
                n = e.startOffset;
            return Xo(t) ? 0 === n ? I.some(vn(t)) : I.none() : I.from(t.childNodes[n]).map(vn)
        })(t), (e => {
            const t = e.endContainer,
                n = e.endOffset;
            return Xo(t) ? n === t.data.length ? I.some(vn(t)) : I.none() : I.from(t.childNodes[n - 1]).map(vn)
        })(t), ((t, n) => {
            const o = J(Ju(e), O(kn, t)),
                r = J(Zu(e), O(kn, n));
            return o.isSome() && r.isSome()
        })).getOr(!1),
        tm = (e, t, n, o) => {
            const r = n,
                s = new Fo(n, r),
                a = ye(e.schema.getMoveCaretBeforeOnEnterElements(), ((e, t) => !H(["td", "th", "table"], t.toLowerCase())));
            let i = n;
            do {
                if (Xo(i) && 0 !== Dt.trim(i.data).length) return void(o ? t.setStart(i, 0) : t.setEnd(i, i.data.length));
                if (a[i.nodeName]) return void(o ? t.setStartBefore(i) : "BR" === i.nodeName ? t.setEndBefore(i) : t.setEndAfter(i))
            } while (i = o ? s.next() : s.prev());
            "BODY" === r.nodeName && (o ? t.setStart(r, 0) : t.setEnd(r, r.childNodes.length))
        },
        nm = e => {
            const t = e.selection.getSel();
            return C(t) && t.rangeCount > 0
        },
        om = (e, t) => {
            const n = Xu(e);
            n.length > 0 ? q(n, (n => {
                const o = n.dom,
                    r = e.dom.createRng();
                r.setStartBefore(o), r.setEndAfter(o), t(r, !0)
            })) : t(e.selection.getRng(), !1)
        },
        rm = (e, t, n) => {
            const o = nl(e, t);
            n(o), e.moveToBookmark(o)
        },
        sm = e => x(null == e ? void 0 : e.nodeType),
        am = e => jo(e) && !Mu(e) && !ku(e) && !Wo(e),
        im = e => !0 === e.isContentEditable,
        lm = (e, t, n) => {
            const {
                selection: o,
                dom: r
            } = e, s = o.getNode(), a = sr(s);
            rm(o, !0, (() => {
                t()
            })), a && sr(s) && r.isChildOf(s, e.getBody()) ? e.selection.select(s) : n(o.getStart()) && dm(r, o)
        },
        dm = (e, t) => {
            var n, o;
            const r = t.getRng(),
                {
                    startContainer: s,
                    startOffset: a
                } = r;
            if (!((e, t) => {
                    if (am(t) && !/^(TD|TH)$/.test(t.nodeName)) {
                        const n = e.getAttrib(t, "data-mce-selected"),
                            o = parseInt(n, 10);
                        return !isNaN(o) && o > 0
                    }
                    return !1
                })(e, t.getNode()) && jo(s)) {
                const i = s.childNodes,
                    l = e.getRoot();
                let d;
                if (a < i.length) {
                    const t = i[a];
                    d = new Fo(t, null !== (n = e.getParent(t, e.isBlock)) && void 0 !== n ? n : l)
                } else {
                    const t = i[i.length - 1];
                    d = new Fo(t, null !== (o = e.getParent(t, e.isBlock)) && void 0 !== o ? o : l), d.next(!0)
                }
                for (let n = d.current(); n; n = d.next()) {
                    if ("false" === e.getContentEditable(n)) return;
                    if (Xo(n) && !fm(n)) return r.setStart(n, 0), void t.setRng(r)
                }
            }
        },
        cm = (e, t, n) => {
            if (e) {
                const o = t ? "nextSibling" : "previousSibling";
                for (e = n ? e : e[o]; e; e = e[o])
                    if (jo(e) || !fm(e)) return e
            }
        },
        um = (e, t) => !!e.getTextBlockElements()[t.nodeName.toLowerCase()] || Ns(e, t),
        mm = (e, t, n) => e.schema.isValidChild(t, n),
        fm = (e, t = !1) => {
            if (C(e) && Xo(e)) {
                const n = t ? e.data.replace(/ /g, "\xa0") : e.data;
                return is(n)
            }
            return !1
        },
        gm = (e, t) => {
            const n = e.dom;
            return am(t) && "false" === n.getContentEditable(t) && ((e, t) => {
                const n = "[data-mce-cef-wrappable]",
                    o = gd(e),
                    r = Ye(o) ? n : `${n},${o}`;
                return wn(vn(t), r)
            })(e, t) && 0 === n.select('[contenteditable="true"]', t).length
        },
        pm = (e, t) => w(e) ? e(t) : (C(t) && (e = e.replace(/%(\w+)/g, ((e, n) => t[n] || e))), e),
        hm = (e, t) => (t = t || "", e = "" + ((e = e || "").nodeName || e), t = "" + (t.nodeName || t), e.toLowerCase() === t.toLowerCase()),
        bm = (e, t) => {
            if (y(e)) return null;
            {
                let n = String(e);
                return "color" !== t && "backgroundColor" !== t || (n = Ku(n)), "fontWeight" === t && 700 === e && (n = "bold"), "fontFamily" === t && (n = n.replace(/[\'\"]/g, "").replace(/,\s+/g, ",")), n
            }
        },
        vm = (e, t, n) => {
            const o = e.getStyle(t, n);
            return bm(o, n)
        },
        ym = (e, t) => {
            let n;
            return e.getParent(t, (t => !!jo(t) && (n = e.getStyle(t, "text-decoration"), !!n && "none" !== n))), n
        },
        Cm = (e, t, n) => e.getParents(t, n, e.getRoot()),
        wm = (e, t, n) => {
            const o = e.formatter.get(t);
            return C(o) && $(o, n)
        },
        xm = e => Ee(e, "block"),
        km = e => Ee(e, "selector"),
        Em = e => Ee(e, "inline"),
        Sm = e => km(e) && !1 !== e.expand && !Em(e),
        _m = Mu,
        Nm = Cm,
        Rm = fm,
        Am = um,
        Om = (e, t) => {
            let n = t;
            for (; n;) {
                if (jo(n) && e.getContentEditable(n)) return "false" === e.getContentEditable(n) ? n : t;
                n = n.parentNode
            }
            return t
        },
        Tm = (e, t, n, o) => {
            const r = t.data;
            if (e) {
                for (let e = n; e > 0; e--)
                    if (o(r.charAt(e - 1))) return e
            } else
                for (let e = n; e < r.length; e++)
                    if (o(r.charAt(e))) return e;
            return -1
        },
        Bm = (e, t, n) => Tm(e, t, n, (e => Iu(e) || Uu(e))),
        Dm = (e, t, n) => Tm(e, t, n, zu),
        Pm = (e, t, n, o, r, s) => {
            let a;
            const i = e.getParent(n, e.isBlock) || t,
                l = (t, n, o) => {
                    const s = ii(e),
                        l = r ? s.backwards : s.forwards;
                    return I.from(l(t, n, ((e, t) => _m(e.parentNode) ? -1 : (a = e, o(r, e, t))), i))
                };
            return l(n, o, Bm).bind((e => s ? l(e.container, e.offset + (r ? -1 : 0), Dm) : I.some(e))).orThunk((() => a ? I.some({
                container: a,
                offset: r ? 0 : a.length
            }) : I.none()))
        },
        Lm = (e, t, n, o, r) => {
            const s = o[r];
            Xo(o) && Ye(o.data) && s && (o = s);
            const a = Nm(e, o);
            for (let o = 0; o < a.length; o++)
                for (let r = 0; r < t.length; r++) {
                    const s = t[r];
                    if ((!C(s.collapsed) || s.collapsed === n.collapsed) && km(s) && e.is(a[o], s.selector)) return a[o]
                }
            return o
        },
        Mm = (e, t, n, o) => {
            var r;
            let s = n;
            const a = e.getRoot(),
                i = t[0];
            if (xm(i) && (s = i.wrapper ? null : e.getParent(n, i.block, a)), !s) {
                const t = null !== (r = e.getParent(n, "LI,TD,TH")) && void 0 !== r ? r : a;
                s = e.getParent(Xo(n) ? n.parentNode : n, (t => t !== a && Am(e.schema, t)), t)
            }
            if (s && xm(i) && i.wrapper && (s = Nm(e, s, "ul,ol").reverse()[0] || s), !s)
                for (s = n; s && s[o] && !e.isBlock(s[o]) && (s = s[o], !hm(s, "br")););
            return s || n
        },
        Im = (e, t, n, o) => {
            const r = n.parentNode;
            return !C(n[o]) && (!(r !== t && !y(r) && !e.isBlock(r)) || Im(e, t, r, o))
        },
        Fm = (e, t, n, o, r) => {
            let s = n;
            const a = r ? "previousSibling" : "nextSibling",
                i = e.getRoot();
            if (Xo(n) && !Rm(n) && (r ? o > 0 : o < n.data.length)) return n;
            for (; s;) {
                if (!t[0].block_expand && e.isBlock(s)) return s;
                for (let t = s[a]; t; t = t[a]) {
                    const n = Xo(t) && !Im(e, i, t, a);
                    if (!_m(t) && (!nr(l = t) || !l.getAttribute("data-mce-bogus") || l.nextSibling) && !Rm(t, n)) return s
                }
                if (s === i || s.parentNode === i) {
                    n = s;
                    break
                }
                s = s.parentNode
            }
            var l;
            return n
        },
        Um = e => _m(e.parentNode) || _m(e),
        zm = (e, t, n, o = !1) => {
            let {
                startContainer: r,
                startOffset: s,
                endContainer: a,
                endOffset: i
            } = t;
            const l = n[0];
            return jo(r) && r.hasChildNodes() && (r = hi(r, s), Xo(r) && (s = 0)), jo(a) && a.hasChildNodes() && (a = hi(a, t.collapsed ? i : i - 1), Xo(a) && (i = a.data.length)), r = Om(e, r), a = Om(e, a), Um(r) && (r = _m(r) ? r : r.parentNode, r = t.collapsed ? r.previousSibling || r : r.nextSibling || r, Xo(r) && (s = t.collapsed ? r.length : 0)), Um(a) && (a = _m(a) ? a : a.parentNode, a = t.collapsed ? a.nextSibling || a : a.previousSibling || a, Xo(a) && (i = t.collapsed ? 0 : a.length)), t.collapsed && (Pm(e, e.getRoot(), r, s, !0, o).each((({
                container: e,
                offset: t
            }) => {
                r = e, s = t
            })), Pm(e, e.getRoot(), a, i, !1, o).each((({
                container: e,
                offset: t
            }) => {
                a = e, i = t
            }))), (Em(l) || l.block_expand) && (Em(l) && Xo(r) && 0 !== s || (r = Fm(e, n, r, s, !0)), Em(l) && Xo(a) && i !== a.data.length || (a = Fm(e, n, a, i, !1))), Sm(l) && (r = Lm(e, n, t, r, "previousSibling"), a = Lm(e, n, t, a, "nextSibling")), (xm(l) || km(l)) && (r = Mm(e, n, r, "previousSibling"), a = Mm(e, n, a, "nextSibling"), xm(l) && (e.isBlock(r) || (r = Fm(e, n, r, s, !0)), e.isBlock(a) || (a = Fm(e, n, a, i, !1)))), jo(r) && r.parentNode && (s = e.nodeIndex(r), r = r.parentNode), jo(a) && a.parentNode && (i = e.nodeIndex(a) + 1, a = a.parentNode), {
                startContainer: r,
                startOffset: s,
                endContainer: a,
                endOffset: i
            }
        },
        jm = (e, t, n) => {
            var o;
            const r = t.startOffset,
                s = hi(t.startContainer, r),
                a = t.endOffset,
                i = hi(t.endContainer, a - 1),
                l = e => {
                    const t = e[0];
                    Xo(t) && t === s && r >= t.data.length && e.splice(0, 1);
                    const n = e[e.length - 1];
                    return 0 === a && e.length > 0 && n === i && Xo(n) && e.splice(e.length - 1, 1), e
                },
                d = (e, t, n) => {
                    const o = [];
                    for (; e && e !== n; e = e[t]) o.push(e);
                    return o
                },
                c = (t, n) => e.getParent(t, (e => e.parentNode === n), n),
                u = (e, t, o) => {
                    const r = o ? "nextSibling" : "previousSibling";
                    for (let s = e, a = s.parentNode; s && s !== t; s = a) {
                        a = s.parentNode;
                        const t = d(s === e ? s : s[r], r);
                        t.length && (o || t.reverse(), n(l(t)))
                    }
                };
            if (s === i) return n(l([s]));
            const m = null !== (o = e.findCommonAncestor(s, i)) && void 0 !== o ? o : e.getRoot();
            if (e.isChildOf(s, i)) return u(s, m, !0);
            if (e.isChildOf(i, s)) return u(i, m);
            const f = c(s, m) || s,
                g = c(i, m) || i;
            u(s, f, !0);
            const p = d(f === s ? f : f.nextSibling, "nextSibling", g === i ? g.nextSibling : g);
            p.length && n(l(p)), u(i, g)
        },
        Hm = ['pre[class*=language-][contenteditable="false"]', "figure.image", "div[data-ephox-embed-iri]", "div.tiny-pageembed", "div.mce-toc", "div[data-mce-toc]"],
        $m = (e, t, n, o, r, s) => {
            const {
                uid: a = t,
                ...i
            } = n;
            cn(e, $a()), Qt(e, `${qa()}`, a), Qt(e, `${Va()}`, o);
            const {
                attributes: l = {},
                classes: d = []
            } = r(a, i);
            if (Jt(e, l), ((e, t) => {
                    q(t, (t => {
                        cn(e, t)
                    }))
                })(e, d), s) {
                d.length > 0 && Qt(e, `${Ka()}`, d.join(","));
                const t = me(l);
                t.length > 0 && Qt(e, `${Ga()}`, t.join(","))
            }
        },
        Vm = (e, t, n, o, r) => {
            const s = hn("span", e);
            return $m(s, t, n, o, r, !1), s
        },
        qm = (e, t, n, o, r, s) => {
            const a = [],
                i = Vm(e.getDoc(), n, s, o, r),
                l = za(),
                d = () => {
                    l.clear()
                },
                c = e => {
                    q(e, u)
                },
                u = t => {
                    switch (((e, t, n, o) => Rn(t).fold((() => "skipping"), (r => "br" === o || (e => Wt(e) && hr(e) === Pr)(t) ? "valid" : (e => qt(e) && fn(e, $a()))(t) ? "existing" : ku(t.dom) ? "caret" : $(Hm, (e => wn(t, e))) ? "valid-block" : mm(e, n, o) && mm(e, jt(r), n) ? "valid" : "invalid-child")))(e, t, "span", jt(t))) {
                        case "invalid-child": {
                            d();
                            const e = Ln(t);
                            c(e), d();
                            break
                        }
                        case "valid-block":
                            d(), $m(t, n, s, o, r, !0);
                            break;
                        case "valid": {
                            const e = l.get().getOrThunk((() => {
                                const e = oi(i);
                                return a.push(e), l.set(e), e
                            }));
                            bo(t, e);
                            break
                        }
                    }
                };
            return jm(e.dom, t, (e => {
                d(), (e => {
                    const t = V(e, vn);
                    c(t)
                })(e)
            })), a
        },
        Wm = e => {
            const t = (() => {
                const e = {};
                return {
                    register: (t, n) => {
                        e[t] = {
                            name: t,
                            settings: n
                        }
                    },
                    lookup: t => xe(e, t).map((e => e.settings)),
                    getNames: () => me(e)
                }
            })();
            ((e, t) => {
                const n = Va(),
                    o = e => I.from(e.attr(n)).bind(t.lookup),
                    r = e => {
                        var t, n;
                        e.attr(qa(), null), e.attr(Va(), null), e.attr(Wa(), null);
                        const o = I.from(e.attr(Ga())).map((e => e.split(","))).getOr([]),
                            r = I.from(e.attr(Ka())).map((e => e.split(","))).getOr([]);
                        q(o, (t => e.attr(t, null)));
                        const s = null !== (n = null === (t = e.attr("class")) || void 0 === t ? void 0 : t.split(" ")) && void 0 !== n ? n : [],
                            a = re(s, [$a()].concat(r));
                        e.attr("class", a.length > 0 ? a.join(" ") : null), e.attr(Ka(), null), e.attr(Ga(), null)
                    };
                e.serializer.addTempAttr(Wa()), e.serializer.addAttributeFilter(n, (e => {
                    for (const t of e) o(t).each((e => {
                        !1 === e.persistent && ("span" === t.name ? t.unwrap() : r(t))
                    }))
                }))
            })(e, t);
            const n = ((e, t) => {
                    const n = Da({}),
                        o = () => ({
                            listeners: [],
                            previous: za()
                        }),
                        r = (e, t) => {
                            s(e, (e => (t(e), e)))
                        },
                        s = (e, t) => {
                            const r = n.get(),
                                s = t(xe(r, e).getOrThunk(o));
                            r[e] = s, n.set(r)
                        },
                        a = (t, n) => {
                            q(Ja(e, t), (e => {
                                n ? Qt(e, Wa(), "true") : nn(e, Wa())
                            }))
                        },
                        i = Ha((() => {
                            const n = ae(t.getNames());
                            q(n, (t => {
                                s(t, (n => {
                                    const o = n.previous.get();
                                    return Xa(e, I.some(t)).fold((() => {
                                        o.each((e => {
                                            (e => {
                                                r(e, (t => {
                                                    q(t.listeners, (t => t(!1, e)))
                                                }))
                                            })(t), n.previous.clear(), a(e, !1)
                                        }))
                                    }), (({
                                        uid: e,
                                        name: t,
                                        elements: s
                                    }) => {
                                        Pt(o, e) || (o.each((e => a(e, !1))), ((e, t, n) => {
                                            r(e, (o => {
                                                q(o.listeners, (o => o(!0, e, {
                                                    uid: t,
                                                    nodes: V(n, (e => e.dom))
                                                })))
                                            }))
                                        })(t, e, s), n.previous.set(e), a(e, !0))
                                    })), {
                                        previous: n.previous,
                                        listeners: n.listeners
                                    }
                                }))
                            }))
                        }), 30);
                    return e.on("remove", (() => {
                        i.cancel()
                    })), e.on("NodeChange", (() => {
                        i.throttle()
                    })), {
                        addListener: (e, t) => {
                            s(e, (e => ({
                                previous: e.previous,
                                listeners: e.listeners.concat([t])
                            })))
                        }
                    }
                })(e, t),
                o = Yt("span"),
                r = e => {
                    q(e, (e => {
                        o(e) ? wo(e) : (e => {
                            mn(e, $a()), nn(e, `${qa()}`), nn(e, `${Va()}`), nn(e, `${Wa()}`);
                            const t = en(e, `${Ga()}`).map((e => e.split(","))).getOr([]),
                                n = en(e, `${Ka()}`).map((e => e.split(","))).getOr([]);
                            var o;
                            q(t, (t => nn(e, t))), o = e, q(n, (e => {
                                mn(o, e)
                            })), nn(e, `${Ka()}`), nn(e, `${Ga()}`)
                        })(e)
                    }))
                };
            return {
                register: (e, n) => {
                    t.register(e, n)
                },
                annotate: (n, o) => {
                    t.lookup(n).each((t => {
                        ((e, t, n, o) => {
                            e.undoManager.transact((() => {
                                const r = e.selection,
                                    s = r.getRng(),
                                    a = Xu(e).length > 0,
                                    i = ti("mce-annotation");
                                if (s.collapsed && !a && ((e, t) => {
                                        const n = zm(e.dom, t, [{
                                            inline: "span"
                                        }]);
                                        t.setStart(n.startContainer, n.startOffset), t.setEnd(n.endContainer, n.endOffset), e.selection.setRng(t)
                                    })(e, s), r.getRng().collapsed && !a) {
                                    const s = Vm(e.getDoc(), i, o, t, n.decorate);
                                    Eo(s, fr), r.getRng().insertNode(s.dom), r.select(s.dom)
                                } else rm(r, !1, (() => {
                                    om(e, (r => {
                                        qm(e, r, i, t, n.decorate, o)
                                    }))
                                }))
                            }))
                        })(e, n, t, o)
                    }))
                },
                annotationChanged: (e, t) => {
                    n.addListener(e, t)
                },
                remove: t => {
                    Xa(e, I.some(t)).each((({
                        elements: t
                    }) => {
                        const n = e.selection.getBookmark();
                        r(t), e.selection.moveToBookmark(n)
                    }))
                },
                removeAll: t => {
                    const n = e.selection.getBookmark();
                    ge(Za(e, t), ((e, t) => {
                        r(e)
                    })), e.selection.moveToBookmark(n)
                },
                getAll: t => {
                    const n = Za(e, t);
                    return pe(n, (e => V(e, (e => e.dom))))
                }
            }
        },
        Km = e => ({
            getBookmark: O(Pu, e),
            moveToBookmark: O(Lu, e)
        });
    Km.isBookmarkNode = Mu;
    const Gm = (e, t, n) => !n.collapsed && $(n.getClientRects(), (n => ((e, t, n) => t >= e.left && t <= e.right && n >= e.top && n <= e.bottom)(n, e, t))),
        Ym = (e, t, n) => {
            e.dispatch(t, n)
        },
        Xm = (e, t, n, o) => {
            e.dispatch("FormatApply", {
                format: t,
                node: n,
                vars: o
            })
        },
        Qm = (e, t, n, o) => {
            e.dispatch("FormatRemove", {
                format: t,
                node: n,
                vars: o
            })
        },
        Jm = (e, t) => e.dispatch("SetContent", t),
        Zm = (e, t) => e.dispatch("GetContent", t),
        ef = (e, t) => e.dispatch("PastePlainTextToggle", {
            state: t
        }),
        tf = {
            BACKSPACE: 8,
            DELETE: 46,
            DOWN: 40,
            ENTER: 13,
            ESC: 27,
            LEFT: 37,
            RIGHT: 39,
            SPACEBAR: 32,
            TAB: 9,
            UP: 38,
            PAGE_UP: 33,
            PAGE_DOWN: 34,
            END: 35,
            HOME: 36,
            modifierPressed: e => e.shiftKey || e.ctrlKey || e.altKey || tf.metaKeyPressed(e),
            metaKeyPressed: e => At.os.isMacOS() || At.os.isiOS() ? e.metaKey : e.ctrlKey && !e.altKey
        },
        nf = "data-mce-selected",
        of = Math.abs,
        rf = Math.round,
        sf = {
            nw: [0, 0, -1, -1],
            ne: [1, 0, 1, -1],
            se: [1, 1, 1, 1],
            sw: [0, 1, -1, 1]
        },
        af = (e, t) => {
            const n = t.dom,
                o = t.getDoc(),
                r = document,
                s = t.getBody();
            let a, i, l, d, c, u, m, f, g, p, h, b, v, y, w;
            const x = e => C(e) && (or(e) || n.is(e, "figure.image")),
                k = e => lr(e) || n.hasClass(e, "mce-preview-object"),
                E = e => {
                    const n = e.target;
                    ((e, t) => {
                        if ((e => "longpress" === e.type || 0 === e.type.indexOf("touch"))(e)) {
                            const n = e.touches[0];
                            return x(e.target) && !Gm(n.clientX, n.clientY, t)
                        }
                        return x(e.target) && !Gm(e.clientX, e.clientY, t)
                    })(e, t.selection.getRng()) && !e.isDefaultPrevented() && t.selection.select(n)
                },
                S = e => n.hasClass(e, "mce-preview-object") && C(e.firstElementChild) ? [e, e.firstElementChild] : n.is(e, "figure.image") ? [e.querySelector("img")] : [e],
                _ = e => {
                    const o = td(t);
                    return !!o && "false" !== e.getAttribute("data-mce-resize") && e !== t.getBody() && (n.hasClass(e, "mce-preview-object") && C(e.firstElementChild) ? wn(vn(e.firstElementChild), o) : wn(vn(e), o))
                },
                N = (e, o, r) => {
                    if (C(r)) {
                        const s = S(e);
                        q(s, (e => {
                            e.style[o] || !t.schema.isValid(e.nodeName.toLowerCase(), o) ? n.setStyle(e, o, r) : n.setAttrib(e, o, "" + r)
                        }))
                    }
                },
                R = (e, t, n) => {
                    N(e, "width", t), N(e, "height", n)
                },
                A = e => {
                    let o, r, c, C, E;
                    o = e.screenX - u, r = e.screenY - m, b = o * d[2] + f, v = r * d[3] + g, b = b < 5 ? 5 : b, v = v < 5 ? 5 : v, c = (x(a) || k(a)) && !1 !== nd(t) ? !tf.modifierPressed(e) : tf.modifierPressed(e), c && (of(o) > of(r) ? (v = rf(b * p), b = rf(v / p)) : (b = rf(v / p), v = rf(b * p))), R(i, b, v), C = d.startPos.x + o, E = d.startPos.y + r, C = C > 0 ? C : 0, E = E > 0 ? E : 0, n.setStyles(l, {
                        left: C,
                        top: E,
                        display: "block"
                    }), l.innerHTML = b + " &times; " + v, d[2] < 0 && i.clientWidth <= b && n.setStyle(i, "left", void 0 + (f - b)), d[3] < 0 && i.clientHeight <= v && n.setStyle(i, "top", void 0 + (g - v)), o = s.scrollWidth - y, r = s.scrollHeight - w, o + r !== 0 && n.setStyles(l, {
                        left: C - o,
                        top: E - r
                    }), h || (((e, t, n, o, r) => {
                        e.dispatch("ObjectResizeStart", {
                            target: t,
                            width: n,
                            height: o,
                            origin: r
                        })
                    })(t, a, f, g, "corner-" + d.name), h = !0)
                },
                O = () => {
                    const e = h;
                    h = !1, e && (N(a, "width", b), N(a, "height", v)), n.unbind(o, "mousemove", A), n.unbind(o, "mouseup", O), r !== o && (n.unbind(r, "mousemove", A), n.unbind(r, "mouseup", O)), n.remove(i), n.remove(l), n.remove(c), T(a), e && (((e, t, n, o, r) => {
                        e.dispatch("ObjectResized", {
                            target: t,
                            width: n,
                            height: o,
                            origin: r
                        })
                    })(t, a, b, v, "corner-" + d.name), n.setAttrib(a, "style", n.getAttrib(a, "style"))), t.nodeChanged()
                },
                T = e => {
                    M();
                    const h = n.getPos(e, s),
                        C = h.x,
                        x = h.y,
                        E = e.getBoundingClientRect(),
                        N = E.width || E.right - E.left,
                        T = E.height || E.bottom - E.top;
                    a !== e && (D(), a = e, b = v = 0);
                    const B = t.dispatch("ObjectSelected", {
                        target: e
                    });
                    _(e) && !B.isDefaultPrevented() ? ge(sf, ((e, t) => {
                        let h = n.get("mceResizeHandle" + t);
                        h && n.remove(h), h = n.add(s, "div", {
                            id: "mceResizeHandle" + t,
                            "data-mce-bogus": "all",
                            class: "mce-resizehandle",
                            unselectable: !0,
                            style: "cursor:" + t + "-resize; margin:0; padding:0"
                        }), n.bind(h, "mousedown", (h => {
                            h.stopImmediatePropagation(), h.preventDefault(), (h => {
                                const b = S(a)[0];
                                var v;
                                u = h.screenX, m = h.screenY, f = b.clientWidth, g = b.clientHeight, p = g / f, d = e, d.name = t, d.startPos = {
                                    x: N * e[0] + C,
                                    y: T * e[1] + x
                                }, y = s.scrollWidth, w = s.scrollHeight, c = n.add(s, "div", {
                                    class: "mce-resize-backdrop",
                                    "data-mce-bogus": "all"
                                }), n.setStyles(c, {
                                    position: "fixed",
                                    left: "0",
                                    top: "0",
                                    width: "100%",
                                    height: "100%"
                                }), i = k(v = a) ? n.create("img", {
                                    src: At.transparentSrc
                                }) : v.cloneNode(!0), n.addClass(i, "mce-clonedresizable"), n.setAttrib(i, "data-mce-bogus", "all"), i.contentEditable = "false", n.setStyles(i, {
                                    left: C,
                                    top: x,
                                    margin: 0
                                }), R(i, N, T), i.removeAttribute(nf), s.appendChild(i), n.bind(o, "mousemove", A), n.bind(o, "mouseup", O), r !== o && (n.bind(r, "mousemove", A), n.bind(r, "mouseup", O)), l = n.add(s, "div", {
                                    class: "mce-resize-helper",
                                    "data-mce-bogus": "all"
                                }, f + " &times; " + g)
                            })(h)
                        })), e.elm = h, n.setStyles(h, {
                            left: N * e[0] + C - h.offsetWidth / 2,
                            top: T * e[1] + x - h.offsetHeight / 2
                        })
                    })) : D(!1)
                },
                B = ja(T, 0),
                D = (e = !0) => {
                    B.cancel(), M(), a && e && a.removeAttribute(nf), ge(sf, ((e, t) => {
                        const o = n.get("mceResizeHandle" + t);
                        o && (n.unbind(o), n.remove(o))
                    }))
                },
                P = (e, t) => n.isChildOf(e, t),
                L = o => {
                    if (h || t.removed || t.composing) return;
                    const r = "mousedown" === o.type ? o.target : e.getNode(),
                        a = eo(vn(r), "table,img,figure.image,hr,video,span.mce-preview-object,details").map((e => e.dom)).filter((e => n.isEditable(e.parentElement))).getOrUndefined(),
                        i = C(a) ? n.getAttrib(a, nf, "1") : "1";
                    if (q(n.select(`img[${nf}],hr[${nf}]`), (e => {
                            e.removeAttribute(nf)
                        })), C(a) && P(a, s) && t.hasFocus()) {
                        I();
                        const t = e.getStart(!0);
                        if (P(t, a) && P(e.getEnd(!0), a)) return n.setAttrib(a, nf, i), void B.throttle(a)
                    }
                    D()
                },
                M = () => {
                    ge(sf, (e => {
                        e.elm && (n.unbind(e.elm), delete e.elm)
                    }))
                },
                I = () => {
                    try {
                        t.getDoc().execCommand("enableObjectResizing", !1, "false")
                    } catch (e) {}
                };
            return t.on("init", (() => {
                I(), t.on("NodeChange ResizeEditor ResizeWindow ResizeContent drop", L), t.on("keyup compositionend", (e => {
                    a && "TABLE" === a.nodeName && L(e)
                })), t.on("hide blur", D), t.on("contextmenu longpress", E, !0)
            })), t.on("remove", M), {
                isResizable: _,
                showResizeRect: T,
                hideResizeRect: D,
                updateResizeRect: L,
                destroy: () => {
                    B.cancel(), a = i = c = null
                }
            }
        },
        lf = (e, t, n) => {
            const o = e.document.createRange();
            var r;
            return r = o, t.fold((e => {
                r.setStartBefore(e.dom)
            }), ((e, t) => {
                r.setStart(e.dom, t)
            }), (e => {
                r.setStartAfter(e.dom)
            })), ((e, t) => {
                t.fold((t => {
                    e.setEndBefore(t.dom)
                }), ((t, n) => {
                    e.setEnd(t.dom, n)
                }), (t => {
                    e.setEndAfter(t.dom)
                }))
            })(o, n), o
        },
        df = (e, t, n, o, r) => {
            const s = e.document.createRange();
            return s.setStart(t.dom, n), s.setEnd(o.dom, r), s
        },
        cf = il([{
            ltr: ["start", "soffset", "finish", "foffset"]
        }, {
            rtl: ["start", "soffset", "finish", "foffset"]
        }]),
        uf = (e, t, n) => t(vn(n.startContainer), n.startOffset, vn(n.endContainer), n.endOffset);
    cf.ltr, cf.rtl;
    const mf = (e, t, n, o) => ({
            start: e,
            soffset: t,
            finish: n,
            foffset: o
        }),
        ff = document.caretPositionFromPoint ? (e, t, n) => {
            var o, r;
            return I.from(null === (r = (o = e.dom).caretPositionFromPoint) || void 0 === r ? void 0 : r.call(o, t, n)).bind((t => {
                if (null === t.offsetNode) return I.none();
                const n = e.dom.createRange();
                return n.setStart(t.offsetNode, t.offset), n.collapse(), I.some(n)
            }))
        } : document.caretRangeFromPoint ? (e, t, n) => {
            var o, r;
            return I.from(null === (r = (o = e.dom).caretRangeFromPoint) || void 0 === r ? void 0 : r.call(o, t, n))
        } : I.none,
        gf = il([{
            before: ["element"]
        }, {
            on: ["element", "offset"]
        }, {
            after: ["element"]
        }]),
        pf = {
            before: gf.before,
            on: gf.on,
            after: gf.after,
            cata: (e, t, n, o) => e.fold(t, n, o),
            getStart: e => e.fold(R, R, R)
        },
        hf = il([{
            domRange: ["rng"]
        }, {
            relative: ["startSitu", "finishSitu"]
        }, {
            exact: ["start", "soffset", "finish", "foffset"]
        }]),
        bf = {
            domRange: hf.domRange,
            relative: hf.relative,
            exact: hf.exact,
            exactFromRange: e => hf.exact(e.start, e.soffset, e.finish, e.foffset),
            getWin: e => {
                const t = (e => e.match({
                    domRange: e => vn(e.startContainer),
                    relative: (e, t) => pf.getStart(e),
                    exact: (e, t, n, o) => e
                }))(e);
                return Nn(t)
            },
            range: mf
        },
        vf = (e, t) => {
            const n = jt(e);
            return "input" === n ? pf.after(e) : H(["br", "img"], n) ? 0 === t ? pf.before(e) : pf.after(e) : pf.on(e, t)
        },
        yf = (e, t) => {
            const n = e.fold(pf.before, vf, pf.after),
                o = t.fold(pf.before, vf, pf.after);
            return bf.relative(n, o)
        },
        Cf = (e, t, n, o) => {
            const r = vf(e, t),
                s = vf(n, o);
            return bf.relative(r, s)
        },
        wf = (e, t) => {
            const n = (t || document).createDocumentFragment();
            return q(e, (e => {
                n.appendChild(e.dom)
            })), vn(n)
        },
        xf = e => {
            const t = bf.getWin(e).dom,
                n = (e, n, o, r) => df(t, e, n, o, r),
                o = (e => e.match({
                    domRange: e => {
                        const t = vn(e.startContainer),
                            n = vn(e.endContainer);
                        return Cf(t, e.startOffset, n, e.endOffset)
                    },
                    relative: yf,
                    exact: Cf
                }))(e);
            return ((e, t) => {
                const n = ((e, t) => t.match({
                    domRange: e => ({
                        ltr: N(e),
                        rtl: I.none
                    }),
                    relative: (t, n) => ({
                        ltr: Pe((() => lf(e, t, n))),
                        rtl: Pe((() => I.some(lf(e, n, t))))
                    }),
                    exact: (t, n, o, r) => ({
                        ltr: Pe((() => df(e, t, n, o, r))),
                        rtl: Pe((() => I.some(df(e, o, r, t, n))))
                    })
                }))(e, t);
                return ((e, t) => {
                    const n = t.ltr();
                    return n.collapsed ? t.rtl().filter((e => !1 === e.collapsed)).map((e => cf.rtl(vn(e.endContainer), e.endOffset, vn(e.startContainer), e.startOffset))).getOrThunk((() => uf(0, cf.ltr, n))) : uf(0, cf.ltr, n)
                })(0, n)
            })(t, o).match({
                ltr: n,
                rtl: n
            })
        },
        kf = (e, t, n) => ((e, t, n) => ((e, t, n) => {
            const o = vn(e.document);
            return ff(o, t, n).map((e => mf(vn(e.startContainer), e.startOffset, vn(e.endContainer), e.endOffset)))
        })(e, t, n))(Nn(vn(n)).dom, e, t).map((e => {
            const t = n.createRange();
            return t.setStart(e.start.dom, e.soffset), t.setEnd(e.finish.dom, e.foffset), t
        })).getOrUndefined(),
        Ef = (e, t) => C(e) && C(t) && e.startContainer === t.startContainer && e.startOffset === t.startOffset && e.endContainer === t.endContainer && e.endOffset === t.endOffset,
        Sf = (e, t, n) => null !== ((e, t, n) => {
            let o = e;
            for (; o && o !== t;) {
                if (n(o)) return o;
                o = o.parentNode
            }
            return null
        })(e, t, n),
        _f = (e, t, n) => Sf(e, t, (e => e.nodeName === n)),
        Nf = (e, t) => jr(e) && !Sf(e, t, ku),
        Rf = (e, t, n) => {
            const o = t.parentNode;
            if (o) {
                const r = new Fo(t, e.getParent(o, e.isBlock) || e.getRoot());
                let s;
                for (; s = r[n ? "prev" : "next"]();)
                    if (nr(s)) return !0
            }
            return !1
        },
        Af = (e, t, n, o, r) => {
            const s = e.getRoot(),
                a = e.schema.getNonEmptyElements(),
                i = r.parentNode;
            let l, d;
            if (!i) return I.none();
            const c = e.getParent(i, e.isBlock) || s;
            if (o && nr(r) && t && e.isEmpty(c)) return I.some(Mi(i, e.nodeIndex(r)));
            const u = new Fo(r, c);
            for (; d = u[o ? "prev" : "next"]();) {
                if ("false" === e.getContentEditableParent(d) || Nf(d, s)) return I.none();
                if (Xo(d) && d.data.length > 0) return _f(d, s, "A") ? I.none() : I.some(Mi(d, o ? d.data.length : 0));
                if (e.isBlock(d) || a[d.nodeName.toLowerCase()]) return I.none();
                l = d
            }
            return Zo(l) ? I.none() : n && l ? I.some(Mi(l, 0)) : I.none()
        },
        Of = (e, t, n, o) => {
            const r = e.getRoot();
            let s, a = !1,
                i = n ? o.startContainer : o.endContainer,
                l = n ? o.startOffset : o.endOffset;
            const d = jo(i) && l === i.childNodes.length,
                c = e.schema.getNonEmptyElements();
            let u = n;
            if (jr(i)) return I.none();
            if (jo(i) && l > i.childNodes.length - 1 && (u = !1), er(i) && (i = r, l = 0), i === r) {
                if (u && (s = i.childNodes[l > 0 ? l - 1 : 0], s)) {
                    if (jr(s)) return I.none();
                    if (c[s.nodeName] || Ko(s)) return I.none()
                }
                if (i.hasChildNodes()) {
                    if (l = Math.min(!u && l > 0 ? l - 1 : l, i.childNodes.length - 1), i = i.childNodes[l], l = Xo(i) && d ? i.data.length : 0, !t && i === r.lastChild && Ko(i)) return I.none();
                    if (((e, t) => {
                            let n = t;
                            for (; n && n !== e;) {
                                if (sr(n)) return !0;
                                n = n.parentNode
                            }
                            return !1
                        })(r, i) || jr(i)) return I.none();
                    if (i.hasChildNodes() && !Ko(i)) {
                        s = i;
                        const t = new Fo(i, r);
                        do {
                            if (sr(s) || jr(s)) {
                                a = !1;
                                break
                            }
                            if (Xo(s) && s.data.length > 0) {
                                l = u ? 0 : s.data.length, i = s, a = !0;
                                break
                            }
                            if (c[s.nodeName.toLowerCase()] && !ir(s)) {
                                l = e.nodeIndex(s), i = s.parentNode, u || l++, a = !0;
                                break
                            }
                        } while (s = u ? t.next() : t.prev())
                    }
                }
            }
            return t && (Xo(i) && 0 === l && Af(e, d, t, !0, i).each((e => {
                i = e.container(), l = e.offset(), a = !0
            })), jo(i) && (s = i.childNodes[l], s || (s = i.childNodes[l - 1]), !s || !nr(s) || ((e, t) => {
                var n;
                return "A" === (null === (n = e.previousSibling) || void 0 === n ? void 0 : n.nodeName)
            })(s) || Rf(e, s, !1) || Rf(e, s, !0) || Af(e, d, t, !0, s).each((e => {
                i = e.container(), l = e.offset(), a = !0
            })))), u && !t && Xo(i) && l === i.data.length && Af(e, d, t, !1, i).each((e => {
                i = e.container(), l = e.offset(), a = !0
            })), a && i ? I.some(Mi(i, l)) : I.none()
        },
        Tf = (e, t) => {
            const n = t.collapsed,
                o = t.cloneRange(),
                r = Mi.fromRangeStart(t);
            return Of(e, n, !0, o).each((e => {
                n && Mi.isAbove(r, e) || o.setStart(e.container(), e.offset())
            })), n || Of(e, n, !1, o).each((e => {
                o.setEnd(e.container(), e.offset())
            })), n && o.collapse(!0), Ef(t, o) ? I.none() : I.some(o)
        },
        Bf = (e, t) => e.splitText(t),
        Df = e => {
            let t = e.startContainer,
                n = e.startOffset,
                o = e.endContainer,
                r = e.endOffset;
            if (t === o && Xo(t)) {
                if (n > 0 && n < t.data.length)
                    if (o = Bf(t, n), t = o.previousSibling, r > n) {
                        r -= n;
                        const e = Bf(o, r).previousSibling;
                        t = o = e, r = e.data.length, n = 0
                    } else r = 0
            } else if (Xo(t) && n > 0 && n < t.data.length && (t = Bf(t, n), n = 0), Xo(o) && r > 0 && r < o.data.length) {
                const e = Bf(o, r).previousSibling;
                o = e, r = e.data.length
            }
            return {
                startContainer: t,
                startOffset: n,
                endContainer: o,
                endOffset: r
            }
        },
        Pf = e => ({
            walk: (t, n) => jm(e, t, n),
            split: Df,
            expand: (t, n = {
                type: "word"
            }) => {
                if ("word" === n.type) {
                    const n = zm(e, t, [{
                            inline: "span"
                        }]),
                        o = e.createRng();
                    return o.setStart(n.startContainer, n.startOffset), o.setEnd(n.endContainer, n.endOffset), o
                }
                return t
            },
            normalize: t => Tf(e, t).fold(L, (e => (t.setStart(e.startContainer, e.startOffset), t.setEnd(e.endContainer, e.endOffset), !0)))
        });
    Pf.compareRanges = Ef, Pf.getCaretRangeFromPoint = kf, Pf.getSelectedNode = pi, Pf.getNode = hi;
    const Lf = ((e, t) => {
            const n = t => {
                    const n = (e => {
                        const t = e.dom;
                        return Gn(e) ? t.getBoundingClientRect().height : t.offsetHeight
                    })(t);
                    if (n <= 0 || null === n) {
                        const n = io(t, e);
                        return parseFloat(n) || 0
                    }
                    return n
                },
                o = (e, t) => X(t, ((t, n) => {
                    const o = io(e, n),
                        r = void 0 === o ? 0 : parseInt(o, 10);
                    return isNaN(r) ? t : t + r
                }), 0);
            return {
                set: (t, n) => {
                    if (!x(n) && !n.match(/^[0-9]+$/)) throw new Error(e + ".set accepts only positive integer values. Value was " + n);
                    const o = t.dom;
                    oo(o) && (o.style[e] = n + "px")
                },
                get: n,
                getOuter: n,
                aggregate: o,
                max: (e, t, n) => {
                    const r = o(e, n);
                    return t > r ? t - r : 0
                }
            }
        })("height"),
        Mf = () => vn(document),
        If = (e, t) => e.view(t).fold(N([]), (t => {
            const n = e.owner(t),
                o = If(e, n);
            return [t].concat(o)
        }));
    var Ff = Object.freeze({
        __proto__: null,
        view: e => {
            var t;
            return (e.dom === document ? I.none() : I.from(null === (t = e.dom.defaultView) || void 0 === t ? void 0 : t.frameElement)).map(vn)
        },
        owner: e => _n(e)
    });
    const Uf = e => "textarea" === jt(e),
        zf = (e, t) => {
            const n = (e => {
                    const t = e.dom.ownerDocument,
                        n = t.body,
                        o = t.defaultView,
                        r = t.documentElement;
                    if (n === e.dom) return Ro(n.offsetLeft, n.offsetTop);
                    const s = Ao(null == o ? void 0 : o.pageYOffset, r.scrollTop),
                        a = Ao(null == o ? void 0 : o.pageXOffset, r.scrollLeft),
                        i = Ao(r.clientTop, n.clientTop),
                        l = Ao(r.clientLeft, n.clientLeft);
                    return Oo(e).translate(a - l, s - i)
                })(e),
                o = (e => Lf.get(e))(e);
            return {
                element: e,
                bottom: n.top + o,
                height: o,
                pos: n,
                cleanup: t
            }
        },
        jf = (e, t, n, o) => {
            qf(e, ((r, s) => $f(e, t, n, o)), n)
        },
        Hf = (e, t, n, o, r) => {
            const s = {
                elm: o.element.dom,
                alignToTop: r
            };
            ((e, t) => e.dispatch("ScrollIntoView", t).isDefaultPrevented())(e, s) || (n(t, To(t).top, o, r), ((e, t) => {
                e.dispatch("AfterScrollIntoView", t)
            })(e, s))
        },
        $f = (e, t, n, o) => {
            const r = vn(e.getBody()),
                s = vn(e.getDoc());
            r.dom.offsetWidth;
            const a = ((e, t) => {
                const n = ((e, t) => {
                        const n = Ln(e);
                        if (0 === n.length || Uf(e)) return {
                            element: e,
                            offset: t
                        };
                        if (t < n.length && !Uf(n[t])) return {
                            element: n[t],
                            offset: 0
                        };
                        {
                            const o = n[n.length - 1];
                            return Uf(o) ? {
                                element: e,
                                offset: t
                            } : "img" === jt(o) ? {
                                element: o,
                                offset: 1
                            } : Wt(o) ? {
                                element: o,
                                offset: hr(o).length
                            } : {
                                element: o,
                                offset: Ln(o).length
                            }
                        }
                    })(e, t),
                    o = pn('<span data-mce-bogus="all" style="display: inline-block;">\ufeff</span>');
                return fo(n.element, o), zf(o, (() => Co(o)))
            })(vn(n.startContainer), n.startOffset);
            Hf(e, s, t, a, o), a.cleanup()
        },
        Vf = (e, t, n, o) => {
            const r = vn(e.getDoc());
            Hf(e, r, n, (e => zf(vn(e), E))(t), o)
        },
        qf = (e, t, n) => {
            const o = n.startContainer,
                r = n.startOffset,
                s = n.endContainer,
                a = n.endOffset;
            t(vn(o), vn(s));
            const i = e.dom.createRng();
            i.setStart(o, r), i.setEnd(s, a), e.selection.setRng(n)
        },
        Wf = (e, t) => e.element.dom.scrollIntoView({
            block: t ? "start" : "end"
        }),
        Kf = (e, t, n, o) => {
            const r = t + e,
                s = n.pos.top,
                a = n.bottom,
                i = a - s >= t;
            s < e ? Wf(n, !1 !== o) : s > r ? Wf(n, i ? !1 !== o : !0 === o) : a > r && !i && Wf(n, !0 === o)
        },
        Gf = (e, t, n, o) => {
            const r = Nn(e).dom.innerHeight;
            Kf(t, r, n, o)
        },
        Yf = (e, t, n, o) => {
            const r = Nn(e).dom.innerHeight;
            Kf(t, r, n, o);
            const s = (e => {
                    const t = Mf(),
                        n = To(t),
                        o = ((e, t) => {
                            const n = t.owner(e);
                            return If(t, n)
                        })(e, Ff),
                        r = Oo(e),
                        s = Y(o, ((e, t) => {
                            const n = Oo(t);
                            return {
                                left: e.left + n.left,
                                top: e.top + n.top
                            }
                        }), {
                            left: 0,
                            top: 0
                        });
                    return Ro(s.left + r.left + n.left, s.top + r.top + n.top)
                })(n.element),
                a = Po(window);
            s.top < a.y ? Bo(n.element, !1 !== o) : s.top > a.bottom && Bo(n.element, !0 === o)
        },
        Xf = (e, t, n) => jf(e, Gf, t, n),
        Qf = (e, t, n) => Vf(e, t, Gf, n),
        Jf = (e, t, n) => jf(e, Yf, t, n),
        Zf = (e, t, n) => Vf(e, t, Yf, n),
        eg = (e, t, n) => {
            (e.inline ? Xf : Jf)(e, t, n)
        },
        tg = e => e.dom.focus(),
        ng = e => {
            const t = $n(e).dom;
            return e.dom === t.activeElement
        },
        og = (e = Mf()) => I.from(e.dom.activeElement).map(vn),
        rg = (e, t) => {
            const n = Wt(t) ? hr(t).length : Ln(t).length + 1;
            return e > n ? n : e < 0 ? 0 : e
        },
        sg = e => bf.range(e.start, rg(e.soffset, e.start), e.finish, rg(e.foffset, e.finish)),
        ag = (e, t) => !zo(t.dom) && (En(e, t) || kn(e, t)),
        ig = e => t => ag(e, t.start) && ag(e, t.finish),
        lg = e => bf.range(vn(e.startContainer), e.startOffset, vn(e.endContainer), e.endOffset),
        dg = e => {
            const t = document.createRange();
            try {
                return t.setStart(e.start.dom, e.soffset), t.setEnd(e.finish.dom, e.foffset), I.some(t)
            } catch (e) {
                return I.none()
            }
        },
        cg = e => {
            const t = (e => e.inline || At.browser.isFirefox())(e) ? (n = vn(e.getBody()), (e => {
                const t = e.getSelection();
                return (t && 0 !== t.rangeCount ? I.from(t.getRangeAt(0)) : I.none()).map(lg)
            })(Nn(n).dom).filter(ig(n))) : I.none();
            var n;
            e.bookmark = t.isSome() ? t : e.bookmark
        },
        ug = e => (e.bookmark ? e.bookmark : I.none()).bind((t => {
            return n = vn(e.getBody()), o = t, I.from(o).filter(ig(n)).map(sg);
            var n, o
        })).bind(dg),
        mg = {
            isEditorUIElement: e => {
                const t = e.className.toString();
                return -1 !== t.indexOf("tox-") || -1 !== t.indexOf("mce-")
            }
        },
        fg = {
            setEditorTimeout: (e, t, n) => ((e, t) => (x(t) || (t = 0), setTimeout(e, t)))((() => {
                e.removed || t()
            }), n),
            setEditorInterval: (e, t, n) => {
                const o = ((e, t) => (x(t) || (t = 0), setInterval(e, t)))((() => {
                    e.removed ? clearInterval(o) : t()
                }), n);
                return o
            }
        };
    let gg;
    const pg = Oa.DOM,
        hg = e => {
            const t = e.classList;
            return void 0 !== t && (t.contains("tox-edit-area") || t.contains("tox-edit-area__iframe") || t.contains("mce-content-body"))
        },
        bg = (e, t) => {
            const n = pd(e),
                o = pg.getParent(t, (t => (e => jo(e) && mg.isEditorUIElement(e))(t) || !!n && e.dom.is(t, n)));
            return null !== o
        },
        vg = e => {
            try {
                const t = $n(vn(e.getElement()));
                return og(t).fold((() => document.body), (e => e.dom))
            } catch (e) {
                return document.body
            }
        },
        yg = (e, t) => {
            const n = t.editor;
            (e => {
                const t = ja((() => {
                    cg(e)
                }), 0);
                e.on("init", (() => {
                    e.inline && ((e, t) => {
                        const n = () => {
                            t.throttle()
                        };
                        Oa.DOM.bind(document, "mouseup", n), e.on("remove", (() => {
                            Oa.DOM.unbind(document, "mouseup", n)
                        }))
                    })(e, t), ((e, t) => {
                        ((e, t) => {
                            e.on("mouseup touchend", (e => {
                                t.throttle()
                            }))
                        })(e, t), e.on("keyup NodeChange AfterSetSelectionRange", (t => {
                            (e => "nodechange" === e.type && e.selectionChange)(t) || cg(e)
                        }))
                    })(e, t)
                })), e.on("remove", (() => {
                    t.cancel()
                }))
            })(n);
            const o = (e, t) => {
                oc(e) && !0 !== e.inline && t(vn(e.getContainer()), "tox-edit-focus")
            };
            n.on("focusin", (() => {
                const t = e.focusedEditor;
                hg(vg(n)) && o(n, cn), t !== n && (t && t.dispatch("blur", {
                    focusedEditor: n
                }), e.setActive(n), e.focusedEditor = n, n.dispatch("focus", {
                    blurredEditor: t
                }), n.focus(!0))
            })), n.on("focusout", (() => {
                fg.setEditorTimeout(n, (() => {
                    const t = e.focusedEditor;
                    hg(vg(n)) && t === n || o(n, mn), bg(n, vg(n)) || t !== n || (n.dispatch("blur", {
                        focusedEditor: null
                    }), e.focusedEditor = null)
                }))
            })), gg || (gg = t => {
                const n = e.activeEditor;
                n && Wn(t).each((t => {
                    const o = t;
                    o.ownerDocument === document && (o === document.body || bg(n, o) || e.focusedEditor !== n || (n.dispatch("blur", {
                        focusedEditor: null
                    }), e.focusedEditor = null))
                }))
            }, pg.bind(document, "focusin", gg))
        },
        Cg = (e, t) => {
            e.focusedEditor === t.editor && (e.focusedEditor = null), !e.activeEditor && gg && (pg.unbind(document, "focusin", gg), gg = null)
        },
        wg = (e, t) => {
            ((e, t) => (e => e.collapsed ? I.from(hi(e.startContainer, e.startOffset)).map(vn) : I.none())(t).bind((t => _r(t) ? I.some(t) : En(e, t) ? I.none() : I.some(e))))(vn(e.getBody()), t).bind((e => Cu(e.dom))).fold((() => {
                e.selection.normalize()
            }), (t => e.selection.setRng(t.toRange())))
        },
        xg = e => {
            if (e.setActive) try {
                e.setActive()
            } catch (t) {
                e.focus()
            } else e.focus()
        },
        kg = e => e.inline ? (e => {
            const t = e.getBody();
            return t && (n = vn(t), ng(n) || (o = n, og($n(o)).filter((e => o.dom.contains(e.dom)))).isSome());
            var n, o
        })(e) : (e => C(e.iframeElement) && ng(vn(e.iframeElement)))(e),
        Eg = e => e.editorManager.setActive(e),
        Sg = (e, t, n, o, r) => {
            const s = n ? t.startContainer : t.endContainer,
                a = n ? t.startOffset : t.endOffset;
            return I.from(s).map(vn).map((e => o && t.collapsed ? e : Mn(e, r(e, a)).getOr(e))).bind((e => qt(e) ? I.some(e) : Rn(e).filter(qt))).map((e => e.dom)).getOr(e)
        },
        _g = (e, t, n = !1) => Sg(e, t, !0, n, ((e, t) => Math.min(Un(e), t))),
        Ng = (e, t, n = !1) => Sg(e, t, !1, n, ((e, t) => t > 0 ? t - 1 : t)),
        Rg = (e, t) => {
            const n = e;
            for (; e && Xo(e) && 0 === e.length;) e = t ? e.nextSibling : e.previousSibling;
            return e || n
        },
        Ag = (e, t) => V(t, (t => {
            const n = e.dispatch("GetSelectionRange", {
                range: t
            });
            return n.range !== t ? n.range : t
        })),
        Og = ["img", "br"],
        Tg = e => {
            const t = br(e).filter((e => 0 !== e.trim().length || e.indexOf(fr) > -1)).isSome();
            return t || H(Og, jt(e)) || (e => Vt(e) && "false" === Zt(e, "contenteditable"))(e)
        },
        Bg = "[data-mce-autocompleter]",
        Dg = (e, t) => {
            if (Pg(vn(e.getBody())).isNone()) {
                const o = pn('<span data-mce-autocompleter="1" data-mce-bogus="1"></span>', e.getDoc());
                ho(o, vn(t.extractContents())), t.insertNode(o.dom), Rn(o).each((e => e.dom.normalize())), (n = o, ((e, t) => {
                    const n = e => {
                        const o = Ln(e);
                        for (let e = o.length - 1; e >= 0; e--) {
                            const r = o[e];
                            if (t(r)) return I.some(r);
                            const s = n(r);
                            if (s.isSome()) return s
                        }
                        return I.none()
                    };
                    return n(e)
                })(n, Tg)).map((t => {
                    e.selection.setCursorLocation(t.dom, (e => "img" === jt(e) ? 1 : br(e).fold((() => Ln(e).length), (e => e.length)))(t))
                }))
            }
            var n
        },
        Pg = e => Zn(e, Bg),
        Lg = {
            "#text": 3,
            "#comment": 8,
            "#cdata": 4,
            "#pi": 7,
            "#doctype": 10,
            "#document-fragment": 11
        },
        Mg = (e, t, n) => {
            const o = n ? "lastChild" : "firstChild",
                r = n ? "prev" : "next";
            if (e[o]) return e[o];
            if (e !== t) {
                let n = e[r];
                if (n) return n;
                for (let o = e.parent; o && o !== t; o = o.parent)
                    if (n = o[r], n) return n
            }
        },
        Ig = e => {
            var t;
            const n = null !== (t = e.value) && void 0 !== t ? t : "";
            if (!is(n)) return !1;
            const o = e.parent;
            return !o || "span" === o.name && !o.attr("style") || !/^[ ]+$/.test(n)
        },
        Fg = e => {
            const t = "a" === e.name && !e.attr("href") && e.attr("id");
            return e.attr("name") || e.attr("id") && !e.firstChild || e.attr("data-mce-bookmark") || t
        };
    class Ug {
        static create(e, t) {
            const n = new Ug(e, Lg[e] || 1);
            return t && ge(t, ((e, t) => {
                n.attr(t, e)
            })), n
        }
        constructor(e, t) {
            this.name = e, this.type = t, 1 === t && (this.attributes = [], this.attributes.map = {})
        }
        replace(e) {
            const t = this;
            return e.parent && e.remove(), t.insert(e, t), t.remove(), t
        }
        attr(e, t) {
            const n = this;
            if (!m(e)) return C(e) && ge(e, ((e, t) => {
                n.attr(t, e)
            })), n;
            const o = n.attributes;
            if (o) {
                if (void 0 !== t) {
                    if (null === t) {
                        if (e in o.map) {
                            delete o.map[e];
                            let t = o.length;
                            for (; t--;)
                                if (o[t].name === e) return o.splice(t, 1), n
                        }
                        return n
                    }
                    if (e in o.map) {
                        let n = o.length;
                        for (; n--;)
                            if (o[n].name === e) {
                                o[n].value = t;
                                break
                            }
                    } else o.push({
                        name: e,
                        value: t
                    });
                    return o.map[e] = t, n
                }
                return o.map[e]
            }
        }
        clone() {
            const e = this,
                t = new Ug(e.name, e.type),
                n = e.attributes;
            if (n) {
                const e = [];
                e.map = {};
                for (let t = 0, o = n.length; t < o; t++) {
                    const o = n[t];
                    "id" !== o.name && (e[e.length] = {
                        name: o.name,
                        value: o.value
                    }, e.map[o.name] = o.value)
                }
                t.attributes = e
            }
            return t.value = e.value, t
        }
        wrap(e) {
            const t = this;
            return t.parent && (t.parent.insert(e, t), e.append(t)), t
        }
        unwrap() {
            const e = this;
            for (let t = e.firstChild; t;) {
                const n = t.next;
                e.insert(t, e, !0), t = n
            }
            e.remove()
        }
        remove() {
            const e = this,
                t = e.parent,
                n = e.next,
                o = e.prev;
            return t && (t.firstChild === e ? (t.firstChild = n, n && (n.prev = null)) : o && (o.next = n), t.lastChild === e ? (t.lastChild = o, o && (o.next = null)) : n && (n.prev = o), e.parent = e.next = e.prev = null), e
        }
        append(e) {
            const t = this;
            e.parent && e.remove();
            const n = t.lastChild;
            return n ? (n.next = e, e.prev = n, t.lastChild = e) : t.lastChild = t.firstChild = e, e.parent = t, e
        }
        insert(e, t, n) {
            e.parent && e.remove();
            const o = t.parent || this;
            return n ? (t === o.firstChild ? o.firstChild = e : t.prev && (t.prev.next = e), e.prev = t.prev, e.next = t, t.prev = e) : (t === o.lastChild ? o.lastChild = e : t.next && (t.next.prev = e), e.next = t.next, e.prev = t, t.next = e), e.parent = o, e
        }
        getAll(e) {
            const t = this,
                n = [];
            for (let o = t.firstChild; o; o = Mg(o, t)) o.name === e && n.push(o);
            return n
        }
        children() {
            const e = [];
            for (let t = this.firstChild; t; t = t.next) e.push(t);
            return e
        }
        empty() {
            const e = this;
            if (e.firstChild) {
                const t = [];
                for (let n = e.firstChild; n; n = Mg(n, e)) t.push(n);
                let n = t.length;
                for (; n--;) {
                    const e = t[n];
                    e.parent = e.firstChild = e.lastChild = e.next = e.prev = null
                }
            }
            return e.firstChild = e.lastChild = null, e
        }
        isEmpty(e, t = {}, n) {
            var o;
            const r = this;
            let s = r.firstChild;
            if (Fg(r)) return !1;
            if (s)
                do {
                    if (1 === s.type) {
                        if (s.attr("data-mce-bogus")) continue;
                        if (e[s.name]) return !1;
                        if (Fg(s)) return !1
                    }
                    if (8 === s.type) return !1;
                    if (3 === s.type && !Ig(s)) return !1;
                    if (3 === s.type && s.parent && t[s.parent.name] && is(null !== (o = s.value) && void 0 !== o ? o : "")) return !1;
                    if (n && n(s)) return !1
                } while (s = Mg(s, r));
            return !0
        }
        walk(e) {
            return Mg(this, null, e)
        }
    }
    const zg = (e, t, n = 0) => {
            const o = e.toLowerCase();
            if (-1 !== o.indexOf("[if ", n) && ((e, t) => /^\s*\[if [\w\W]+\]>.*<!\[endif\](--!?)?>/.test(e.substr(t)))(o, n)) {
                const e = o.indexOf("[endif]", n);
                return o.indexOf(">", e)
            }
            if (t) {
                const e = o.indexOf(">", n);
                return -1 !== e ? e : o.length
            } {
                const t = /--!?>/g;
                t.lastIndex = n;
                const r = t.exec(e);
                return r ? r.index + r[0].length : o.length
            }
        },
        jg = (e, t, n) => {
            const o = /<([!?\/])?([A-Za-z0-9\-_:.]+)/g,
                r = /(?:\s(?:[^'">]+(?:"[^"]*"|'[^']*'))*[^"'>]*(?:"[^">]*|'[^'>]*)?|\s*|\/)>/g,
                s = e.getVoidElements();
            let a = 1,
                i = n;
            for (; 0 !== a;)
                for (o.lastIndex = i;;) {
                    const e = o.exec(t);
                    if (null === e) return i;
                    if ("!" === e[1]) {
                        i = He(e[2], "--") ? zg(t, !1, e.index + 3) : zg(t, !0, e.index + 1);
                        break
                    } {
                        r.lastIndex = o.lastIndex;
                        const n = r.exec(t);
                        if (h(n) || n.index !== o.lastIndex) continue;
                        "/" === e[1] ? a -= 1 : ke(s, e[2]) || (a += 1), i = o.lastIndex + n[0].length;
                        break
                    }
                }
            return i
        },
        Hg = (e, t) => {
            const n = /<(\w+) [^>]*data-mce-bogus="all"[^>]*>/g,
                o = e.schema;
            let r = ((e, t) => {
                const n = new RegExp(["\\s?(" + e.join("|") + ')="[^"]+"'].join("|"), "gi");
                return t.replace(n, "")
            })(e.getTempAttrs(), t);
            const s = o.getVoidElements();
            let a;
            for (; a = n.exec(r);) {
                const e = n.lastIndex,
                    t = a[0].length;
                let i;
                i = s[a[1]] ? e : jg(o, r, e), r = r.substring(0, e - t) + r.substring(i), n.lastIndex = e - t
            }
            return Mr(r)
        },
        $g = Hg,
        Vg = e => {
            const t = Mo(e, "[data-mce-bogus]");
            q(t, (e => {
                "all" === Zt(e, "data-mce-bogus") ? Co(e) : xr(e) ? (fo(e, bn(mr)), Co(e)) : wo(e)
            }))
        },
        qg = e => {
            const t = Mo(e, "input");
            q(t, (e => {
                nn(e, "name")
            }))
        },
        Wg = (e, t, n) => {
            let o;
            return o = "raw" === t.format ? Dt.trim($g(e.serializer, n.innerHTML)) : "text" === t.format ? ((e, t) => {
                const n = e.getDoc(),
                    o = $n(vn(e.getBody())),
                    r = hn("div", n);
                Qt(r, "data-mce-bogus", "all"), ao(r, {
                    position: "fixed",
                    left: "-9999999px",
                    top: "0"
                }), Eo(r, t.innerHTML), Vg(r), qg(r);
                const s = (e => zn(e) ? e : vn(_n(e).dom.body))(o);
                ho(s, r);
                const a = Mr(r.dom.innerText);
                return Co(r), a
            })(e, n) : "tree" === t.format ? e.serializer.serialize(n, t) : ((e, t) => {
                const n = Rl(e),
                    o = new RegExp(`^(<${n}[^>]*>(&nbsp;|&#160;|\\s|\xa0|<br \\/>|)<\\/${n}>[\r\n]*|<br \\/>[\r\n]*)$`);
                return t.replace(o, "")
            })(e, e.serializer.serialize(n, t)), "text" !== t.format && !Rr(vn(n)) && m(o) ? Dt.trim(o) : o
        },
        Kg = Dt.makeMap,
        Gg = e => {
            const t = [],
                n = (e = e || {}).indent,
                o = Kg(e.indent_before || ""),
                r = Kg(e.indent_after || ""),
                s = Qs.getEncodeFunc(e.entity_encoding || "raw", e.entities),
                a = "xhtml" !== e.element_format;
            return {
                start: (e, i, l) => {
                    if (n && o[e] && t.length > 0) {
                        const e = t[t.length - 1];
                        e.length > 0 && "\n" !== e && t.push("\n")
                    }
                    if (t.push("<", e), i)
                        for (let e = 0, n = i.length; e < n; e++) {
                            const n = i[e];
                            t.push(" ", n.name, '="', s(n.value, !0), '"')
                        }
                    if (t[t.length] = !l || a ? ">" : " />", l && n && r[e] && t.length > 0) {
                        const e = t[t.length - 1];
                        e.length > 0 && "\n" !== e && t.push("\n")
                    }
                },
                end: e => {
                    let o;
                    t.push("</", e, ">"), n && r[e] && t.length > 0 && (o = t[t.length - 1], o.length > 0 && "\n" !== o && t.push("\n"))
                },
                text: (e, n) => {
                    e.length > 0 && (t[t.length] = n ? e : s(e))
                },
                cdata: e => {
                    t.push("<![CDATA[", e, "]]>")
                },
                comment: e => {
                    t.push("\x3c!--", e, "--\x3e")
                },
                pi: (e, o) => {
                    o ? t.push("<?", e, " ", s(o), "?>") : t.push("<?", e, "?>"), n && t.push("\n")
                },
                doctype: e => {
                    t.push("<!DOCTYPE", e, ">", n ? "\n" : "")
                },
                reset: () => {
                    t.length = 0
                },
                getContent: () => t.join("").replace(/\n$/, "")
            }
        },
        Yg = (e = {}, t = ca()) => {
            const n = Gg(e);
            return e.validate = !("validate" in e) || e.validate, {
                serialize: o => {
                    const r = e.validate,
                        s = {
                            3: e => {
                                var t;
                                n.text(null !== (t = e.value) && void 0 !== t ? t : "", e.raw)
                            },
                            8: e => {
                                var t;
                                n.comment(null !== (t = e.value) && void 0 !== t ? t : "")
                            },
                            7: e => {
                                n.pi(e.name, e.value)
                            },
                            10: e => {
                                var t;
                                n.doctype(null !== (t = e.value) && void 0 !== t ? t : "")
                            },
                            4: e => {
                                var t;
                                n.cdata(null !== (t = e.value) && void 0 !== t ? t : "")
                            },
                            11: e => {
                                let t = e;
                                if (t = t.firstChild)
                                    do {
                                        a(t)
                                    } while (t = t.next)
                            }
                        };
                    n.reset();
                    const a = e => {
                        var o;
                        const i = s[e.type];
                        if (i) i(e);
                        else {
                            const s = e.name,
                                i = s in t.getVoidElements();
                            let l = e.attributes;
                            if (r && l && l.length > 1) {
                                const n = [];
                                n.map = {};
                                const o = t.getElementRule(e.name);
                                if (o) {
                                    for (let e = 0, t = o.attributesOrder.length; e < t; e++) {
                                        const t = o.attributesOrder[e];
                                        if (t in l.map) {
                                            const e = l.map[t];
                                            n.map[t] = e, n.push({
                                                name: t,
                                                value: e
                                            })
                                        }
                                    }
                                    for (let e = 0, t = l.length; e < t; e++) {
                                        const t = l[e].name;
                                        if (!(t in n.map)) {
                                            const e = l.map[t];
                                            n.map[t] = e, n.push({
                                                name: t,
                                                value: e
                                            })
                                        }
                                    }
                                    l = n
                                }
                            }
                            if (n.start(s, l, i), !i) {
                                let t = e.firstChild;
                                if (t) {
                                    "pre" !== s && "textarea" !== s || 3 !== t.type || "\n" !== (null === (o = t.value) || void 0 === o ? void 0 : o[0]) || n.text("\n", !0);
                                    do {
                                        a(t)
                                    } while (t = t.next)
                                }
                                n.end(s)
                            }
                        }
                    };
                    return 1 !== o.type || e.inner ? 3 === o.type ? s[3](o) : s[11](o) : a(o), n.getContent()
                }
            }
        },
        Xg = new Set;
    q(["margin", "margin-left", "margin-right", "margin-top", "margin-bottom", "padding", "padding-left", "padding-right", "padding-top", "padding-bottom", "border", "border-width", "border-style", "border-color", "background", "background-attachment", "background-clip", "background-color", "background-image", "background-origin", "background-position", "background-repeat", "background-size", "float", "position", "left", "right", "top", "bottom", "z-index", "display", "transform", "width", "max-width", "min-width", "height", "max-height", "min-height", "overflow", "overflow-x", "overflow-y", "text-overflow", "vertical-align", "transition", "transition-delay", "transition-duration", "transition-property", "transition-timing-function"], (e => {
        Xg.add(e)
    }));
    const Qg = ["font", "text-decoration", "text-emphasis"],
        Jg = (e, t) => me(e.parseStyle(e.getAttrib(t, "style"))),
        Zg = (e, t, n) => {
            const o = Jg(e, t),
                r = Jg(e, n),
                s = o => {
                    var r, s;
                    const a = null !== (r = e.getStyle(t, o)) && void 0 !== r ? r : "",
                        i = null !== (s = e.getStyle(n, o)) && void 0 !== s ? s : "";
                    return Ge(a) && Ge(i) && a !== i
                };
            return $(o, (e => {
                const t = t => $(t, (t => t === e));
                if (!t(r) && t(Qg)) {
                    const e = G(r, (e => $(Qg, (t => He(e, t)))));
                    return $(e, s)
                }
                return s(e)
            }))
        },
        ep = (e, t, n) => I.from(n.container()).filter(Xo).exists((o => {
            const r = e ? 0 : -1;
            return t(o.data.charAt(n.offset() + r))
        })),
        tp = O(ep, !0, Uu),
        np = O(ep, !1, Uu),
        op = e => {
            const t = e.container();
            return Xo(t) && (0 === t.data.length || Lr(t.data) && Km.isBookmarkNode(t.parentNode))
        },
        rp = (e, t) => n => jc(e ? 0 : -1, n).filter(t).isSome(),
        sp = e => or(e) && "block" === io(vn(e), "display"),
        ap = e => sr(e) && !(e => jo(e) && "all" === e.getAttribute("data-mce-bogus"))(e),
        ip = rp(!0, sp),
        lp = rp(!1, sp),
        dp = rp(!0, lr),
        cp = rp(!1, lr),
        up = rp(!0, Ko),
        mp = rp(!1, Ko),
        fp = rp(!0, ap),
        gp = rp(!1, ap),
        pp = (e, t) => ((e, t, n) => En(t, e) ? On(e, (e => n(e) || kn(e, t))).slice(0, -1) : [])(e, t, L),
        hp = (e, t) => [e].concat(pp(e, t)),
        bp = (e, t, n) => hu(e, t, n, op),
        vp = (e, t) => J(hp(vn(t.container()), e), Cr),
        yp = (e, t, n) => bp(e, t.dom, n).forall((e => vp(t, n).fold((() => !zc(e, n, t.dom)), (o => !zc(e, n, t.dom) && En(o, vn(e.container())))))),
        Cp = (e, t, n) => vp(t, n).fold((() => bp(e, t.dom, n).forall((e => !zc(e, n, t.dom)))), (t => bp(e, t.dom, n).isNone())),
        wp = O(Cp, !1),
        xp = O(Cp, !0),
        kp = O(yp, !1),
        Ep = O(yp, !0),
        Sp = e => Xc(e).exists(xr),
        _p = (e, t, n) => {
            const o = G(hp(vn(n.container()), t), Cr),
                r = le(o).getOr(t);
            return gu(e, r.dom, n).filter(Sp)
        },
        Np = (e, t) => Xc(t).exists(xr) || _p(!0, e, t).isSome(),
        Rp = (e, t) => (e => I.from(e.getNode(!0)).map(vn))(t).exists(xr) || _p(!1, e, t).isSome(),
        Ap = O(_p, !1),
        Op = O(_p, !0),
        Tp = e => Mi.isTextPosition(e) && !e.isAtStart() && !e.isAtEnd(),
        Bp = (e, t) => {
            const n = G(hp(vn(t.container()), e), Cr);
            return le(n).getOr(e)
        },
        Dp = (e, t) => Tp(t) ? np(t) : np(t) || yu(Bp(e, t).dom, t).exists(np),
        Pp = (e, t) => Tp(t) ? tp(t) : tp(t) || vu(Bp(e, t).dom, t).exists(tp),
        Lp = e => Xc(e).bind((e => Qn(e, qt))).exists((e => (e => H(["pre", "pre-wrap"], e))(io(e, "white-space")))),
        Mp = (e, t) => n => {
            return o = new Fo(n, e)[t](), C(o) && sr(o) && Ac(o);
            var o
        },
        Ip = (e, t) => !Lp(t) && (((e, t) => ((e, t) => yu(e.dom, t).isNone())(e, t) || ((e, t) => vu(e.dom, t).isNone())(e, t) || wp(e, t) || xp(e, t) || Rp(e, t) || Np(e, t))(e, t) || Dp(e, t) || Pp(e, t)),
        Fp = (e, t) => !Lp(t) && (wp(e, t) || kp(e, t) || Rp(e, t) || Dp(e, t) || ((e, t) => {
            const n = yu(e.dom, t).getOr(t),
                o = Mp(e.dom, "prev");
            return t.isAtStart() && (o(t.container()) || o(n.container()))
        })(e, t)),
        Up = (e, t) => !Lp(t) && (xp(e, t) || Ep(e, t) || Np(e, t) || Pp(e, t) || ((e, t) => {
            const n = vu(e.dom, t).getOr(t),
                o = Mp(e.dom, "next");
            return t.isAtEnd() && (o(t.container()) || o(n.container()))
        })(e, t)),
        zp = (e, t) => Fp(e, t) || Up(e, (e => {
            const t = e.container(),
                n = e.offset();
            return Xo(t) && n < t.data.length ? Mi(t, n + 1) : e
        })(t)),
        jp = (e, t) => Iu(e.charAt(t)),
        Hp = (e, t) => Uu(e.charAt(t)),
        $p = (e, t, n) => {
            const o = t.data,
                r = Mi(t, 0);
            return n || !jp(o, 0) || zp(e, r) ? !!(n && Hp(o, 0) && Fp(e, r)) && (t.data = fr + o.slice(1), !0) : (t.data = " " + o.slice(1), !0)
        },
        Vp = (e, t, n) => {
            const o = t.data,
                r = Mi(t, o.length - 1);
            return n || !jp(o, o.length - 1) || zp(e, r) ? !!(n && Hp(o, o.length - 1) && Up(e, r)) && (t.data = o.slice(0, -1) + fr, !0) : (t.data = o.slice(0, -1) + " ", !0)
        },
        qp = (e, t) => {
            const n = t.container();
            if (!Xo(n)) return I.none();
            if ((e => {
                    const t = e.container();
                    return Xo(t) && je(t.data, fr)
                })(t)) {
                const o = $p(e, n, !1) || (e => {
                    const t = e.data,
                        n = (e => {
                            const t = e.split("");
                            return V(t, ((e, n) => Iu(e) && n > 0 && n < t.length - 1 && zu(t[n - 1]) && zu(t[n + 1]) ? " " : e)).join("")
                        })(t);
                    return n !== t && (e.data = n, !0)
                })(n) || Vp(e, n, !1);
                return Mt(o, t)
            }
            if (zp(e, t)) {
                const o = $p(e, n, !0) || Vp(e, n, !0);
                return Mt(o, t)
            }
            return I.none()
        },
        Wp = (e, t, n) => {
            if (0 === n) return;
            const o = vn(e),
                r = Xn(o, Cr).getOr(o),
                s = e.data.slice(t, t + n),
                a = t + n >= e.data.length && Up(r, Mi(e, e.data.length)),
                i = 0 === t && Fp(r, Mi(e, 0));
            e.replaceData(t, n, cs(s, 4, i, a))
        },
        Kp = (e, t) => {
            const n = e.data.slice(t),
                o = n.length - We(n).length;
            Wp(e, t, o)
        },
        Gp = (e, t) => {
            const n = e.data.slice(0, t),
                o = n.length - Ke(n).length;
            Wp(e, t - o, o)
        },
        Yp = (e, t, n, o = !0) => {
            const r = Ke(e.data).length,
                s = o ? e : t,
                a = o ? t : e;
            return o ? s.appendData(a.data) : s.insertData(0, a.data), Co(vn(a)), n && Kp(s, r), s
        },
        Xp = (e, t) => ((e, t) => {
            const n = e.container(),
                o = e.offset();
            return !Mi.isTextPosition(e) && n === t.parentNode && o > Mi.before(t).offset()
        })(t, e) ? Mi(t.container(), t.offset() - 1) : t,
        Qp = e => {
            return os(e.previousSibling) ? I.some((t = e.previousSibling, Xo(t) ? Mi(t, t.data.length) : Mi.after(t))) : e.previousSibling ? wu(e.previousSibling) : I.none();
            var t
        },
        Jp = e => {
            return os(e.nextSibling) ? I.some((t = e.nextSibling, Xo(t) ? Mi(t, 0) : Mi.before(t))) : e.nextSibling ? Cu(e.nextSibling) : I.none();
            var t
        },
        Zp = (e, t, n) => ((e, t, n) => e ? ((e, t) => Jp(t).orThunk((() => Qp(t))).orThunk((() => ((e, t) => vu(e, Mi.after(t)).orThunk((() => yu(e, Mi.before(t)))))(e, t))))(t, n) : ((e, t) => Qp(t).orThunk((() => Jp(t))).orThunk((() => ((e, t) => I.from(t.previousSibling ? t.previousSibling : t.parentNode).bind((t => yu(e, Mi.before(t)))).orThunk((() => vu(e, Mi.after(t)))))(e, t))))(t, n))(e, t, n).map(O(Xp, n)),
        eh = (e, t, n) => {
            n.fold((() => {
                e.focus()
            }), (n => {
                e.selection.setRng(n.toRange(), t)
            }))
        },
        th = (e, t) => t && ke(e.schema.getBlockElements(), jt(t)),
        nh = e => {
            if (ps(e)) {
                const t = pn('<br data-mce-bogus="1">');
                return yo(e), ho(e, t), I.some(Mi.before(t.dom))
            }
            return I.none()
        },
        oh = (e, t, n, o = !0) => {
            const r = Zp(t, e.getBody(), n.dom),
                s = Xn(n, O(th, e), (a = e.getBody(), e => e.dom === a));
            var a;
            const i = ((e, t, n) => {
                const o = Tn(e).filter(Wt),
                    r = Bn(e).filter(Wt);
                return Co(e), (s = o, a = r, i = t, l = (e, t, o) => {
                    const r = e.dom,
                        s = t.dom,
                        a = r.data.length;
                    return Yp(r, s, n), o.container() === s ? Mi(r, a) : o
                }, s.isSome() && a.isSome() && i.isSome() ? I.some(l(s.getOrDie(), a.getOrDie(), i.getOrDie())) : I.none()).orThunk((() => (n && (o.each((e => Gp(e.dom, e.dom.length))), r.each((e => Kp(e.dom, 0)))), t)));
                var s, a, i, l
            })(n, r, ((e, t) => ke(e.schema.getTextInlineElements(), jt(t)))(e, n));
            e.dom.isEmpty(e.getBody()) ? (e.setContent(""), e.selection.setCursorLocation()) : s.bind(nh).fold((() => {
                o && eh(e, t, i)
            }), (n => {
                o && eh(e, t, I.some(n))
            }))
        },
        rh = /[\u0591-\u07FF\uFB1D-\uFDFF\uFE70-\uFEFC]/,
        sh = (e, t) => wn(vn(t), ed(e)) && !Ns(e.schema, t) && e.dom.isEditable(t),
        ah = e => {
            var t;
            return "rtl" === Oa.DOM.getStyle(e, "direction", !0) || (e => rh.test(e))(null !== (t = e.textContent) && void 0 !== t ? t : "")
        },
        ih = (e, t, n) => {
            const o = ((e, t, n) => G(Oa.DOM.getParents(n.container(), "*", t), e))(e, t, n);
            return I.from(o[o.length - 1])
        },
        lh = (e, t) => {
            const n = t.container(),
                o = t.offset();
            return e ? zr(n) ? Xo(n.nextSibling) ? Mi(n.nextSibling, 0) : Mi.after(n) : $r(t) ? Mi(n, o + 1) : t : zr(n) ? Xo(n.previousSibling) ? Mi(n.previousSibling, n.previousSibling.data.length) : Mi.before(n) : Vr(t) ? Mi(n, o - 1) : t
        },
        dh = O(lh, !0),
        ch = O(lh, !1),
        uh = (e, t) => {
            const n = e => e.stopImmediatePropagation();
            e.on("beforeinput input", n, !0), e.getDoc().execCommand(t), e.off("beforeinput input", n)
        },
        mh = e => uh(e, "Delete"),
        fh = e => kr(e) || Sr(e),
        gh = (e, t) => En(e, t) ? Qn(t, fh, (e => t => Pt(Rn(t), e, kn))(e)) : I.none(),
        ph = (e, t = !0) => {
            e.dom.isEmpty(e.getBody()) && e.setContent("", {
                no_selection: !t
            })
        },
        hh = (e, t, n) => Lt(Cu(n), wu(n), ((o, r) => {
            const s = lh(!0, o),
                a = lh(!1, r),
                i = lh(!1, t);
            return e ? vu(n, i).exists((e => e.isEqual(a) && t.isEqual(s))) : yu(n, i).exists((e => e.isEqual(s) && t.isEqual(a)))
        })).getOr(!0),
        bh = e => {
            var t;
            return (8 === Ht(t = e) || "#comment" === jt(t) ? Tn(e) : Fn(e)).bind(bh).orThunk((() => I.some(e)))
        },
        vh = (e, t, n, o = !0) => {
            var r;
            t.deleteContents();
            const s = bh(n).getOr(n),
                a = vn(null !== (r = e.dom.getParent(s.dom, e.dom.isBlock)) && void 0 !== r ? r : n.dom);
            if (a.dom === e.getBody() ? ph(e, o) : ps(a) && (Br(a), o && e.selection.setCursorLocation(a.dom, 0)), !kn(n, a)) {
                const e = Pt(Rn(a), n) ? [] : Rn(i = a).map(Ln).map((e => G(e, (e => !kn(i, e))))).getOr([]);
                q(e.concat(Ln(n)), (e => {
                    kn(e, a) || En(e, a) || !ps(e) || Co(e)
                }))
            }
            var i
        },
        yh = e => Mo(e, "td,th"),
        Ch = (e, t) => ({
            start: e,
            end: t
        }),
        wh = il([{
            singleCellTable: ["rng", "cell"]
        }, {
            fullTable: ["table"]
        }, {
            partialTable: ["cells", "outsideDetails"]
        }, {
            multiTable: ["startTableCells", "endTableCells", "betweenRng"]
        }]),
        xh = (e, t) => eo(vn(e), "td,th", t),
        kh = e => !kn(e.start, e.end),
        Eh = (e, t) => Qu(e.start, t).bind((n => Qu(e.end, t).bind((e => Mt(kn(n, e), n))))),
        Sh = e => t => Eh(t, e).map((e => ((e, t, n) => ({
            rng: e,
            table: t,
            cells: n
        }))(t, e, yh(e)))),
        _h = (e, t, n, o) => {
            if (n.collapsed || !e.forall(kh)) return I.none();
            if (t.isSameTable) {
                const t = e.bind(Sh(o));
                return I.some({
                    start: t,
                    end: t
                })
            } {
                const e = xh(n.startContainer, o),
                    t = xh(n.endContainer, o),
                    r = e.bind((e => t => Qu(t, e).bind((e => de(yh(e)).map((e => Ch(t, e))))))(o)).bind(Sh(o)),
                    s = t.bind((e => t => Qu(t, e).bind((e => le(yh(e)).map((e => Ch(e, t))))))(o)).bind(Sh(o));
                return I.some({
                    start: r,
                    end: s
                })
            }
        },
        Nh = (e, t) => Z(e, (e => kn(e, t))),
        Rh = e => Lt(Nh(e.cells, e.rng.start), Nh(e.cells, e.rng.end), ((t, n) => e.cells.slice(t, n + 1))),
        Ah = (e, t) => {
            const {
                startTable: n,
                endTable: o
            } = t, r = e.cloneRange();
            return n.each((e => r.setStartAfter(e.dom))), o.each((e => r.setEndBefore(e.dom))), r
        },
        Oh = (e, t) => {
            const n = (e => t => kn(e, t))(e),
                o = ((e, t) => {
                    const n = xh(e.startContainer, t),
                        o = xh(e.endContainer, t);
                    return Lt(n, o, Ch)
                })(t, n),
                r = ((e, t) => {
                    const n = e => Qu(vn(e), t),
                        o = n(e.startContainer),
                        r = n(e.endContainer),
                        s = o.isSome(),
                        a = r.isSome(),
                        i = Lt(o, r, kn).getOr(!1);
                    return {
                        startTable: o,
                        endTable: r,
                        isStartInTable: s,
                        isEndInTable: a,
                        isSameTable: i,
                        isMultiTable: !i && s && a
                    }
                })(t, n);
            return ((e, t, n) => e.exists((e => ((e, t) => !kh(e) && Eh(e, t).exists((e => {
                const t = e.dom.rows;
                return 1 === t.length && 1 === t[0].cells.length
            })))(e, n) && em(e.start, t))))(o, t, n) ? o.map((e => wh.singleCellTable(t, e.start))) : r.isMultiTable ? ((e, t, n, o) => _h(e, t, n, o).bind((({
                start: e,
                end: o
            }) => {
                const r = e.bind(Rh).getOr([]),
                    s = o.bind(Rh).getOr([]);
                if (r.length > 0 && s.length > 0) {
                    const e = Ah(n, t);
                    return I.some(wh.multiTable(r, s, e))
                }
                return I.none()
            })))(o, r, t, n) : ((e, t, n, o) => _h(e, t, n, o).bind((({
                start: e,
                end: t
            }) => e.or(t))).bind((e => {
                const {
                    isSameTable: o
                } = t, r = Rh(e).getOr([]);
                if (o && e.cells.length === r.length) return I.some(wh.fullTable(e.table));
                if (r.length > 0) {
                    if (o) return I.some(wh.partialTable(r, I.none()));
                    {
                        const e = Ah(n, t);
                        return I.some(wh.partialTable(r, I.some({
                            ...t,
                            rng: e
                        })))
                    }
                }
                return I.none()
            })))(o, r, t, n)
        },
        Th = e => q(e, (e => {
            nn(e, "contenteditable"), Br(e)
        })),
        Bh = (e, t, n, o) => {
            const r = n.cloneRange();
            o ? (r.setStart(n.startContainer, n.startOffset), r.setEndAfter(t.dom.lastChild)) : (r.setStartBefore(t.dom.firstChild), r.setEnd(n.endContainer, n.endOffset)), Mh(e, r, t, !1).each((e => e()))
        },
        Dh = e => {
            const t = Xu(e),
                n = vn(e.selection.getNode());
            ar(n.dom) && ps(n) ? e.selection.setCursorLocation(n.dom, 0) : e.selection.collapse(!0), t.length > 1 && $(t, (e => kn(e, n))) && Qt(n, "data-mce-selected", "1")
        },
        Ph = (e, t, n) => I.some((() => {
            const o = e.selection.getRng(),
                r = n.bind((({
                    rng: n,
                    isStartInTable: r
                }) => {
                    const s = ((e, t) => I.from(e.dom.getParent(t, e.dom.isBlock)).map(vn))(e, r ? n.endContainer : n.startContainer);
                    n.deleteContents(), ((e, t, n) => {
                        n.each((n => {
                            t ? Co(n) : (Br(n), e.selection.setCursorLocation(n.dom, 0))
                        }))
                    })(e, r, s.filter(ps));
                    const a = r ? t[0] : t[t.length - 1];
                    return Bh(e, a, o, r), ps(a) ? I.none() : I.some(r ? t.slice(1) : t.slice(0, -1))
                })).getOr(t);
            Th(r), Dh(e)
        })),
        Lh = (e, t, n, o) => I.some((() => {
            const r = e.selection.getRng(),
                s = t[0],
                a = n[n.length - 1];
            Bh(e, s, r, !0), Bh(e, a, r, !1);
            const i = ps(s) ? t : t.slice(1),
                l = ps(a) ? n : n.slice(0, -1);
            Th(i.concat(l)), o.deleteContents(), Dh(e)
        })),
        Mh = (e, t, n, o = !0) => I.some((() => {
            vh(e, t, n, o)
        })),
        Ih = (e, t) => I.some((() => oh(e, !1, t))),
        Fh = (e, t) => J(hp(t, e), Nr),
        Uh = (e, t) => J(hp(t, e), Yt("caption")),
        zh = (e, t) => I.some((() => {
            Br(t), e.selection.setCursorLocation(t.dom, 0)
        })),
        jh = (e, t) => e ? up(t) : mp(t),
        Hh = (e, t, n) => {
            const o = vn(e.getBody());
            return Uh(o, n).fold((() => ((e, t, n, o) => {
                const r = Mi.fromRangeStart(e.selection.getRng());
                return Fh(n, o).bind((o => ps(o) ? zh(e, o) : ((e, t, n, o, r) => pu(n, e.getBody(), r).bind((e => Fh(t, vn(e.getNode())).bind((e => kn(e, o) ? I.none() : I.some(E))))))(e, n, t, o, r)))
            })(e, t, o, n).orThunk((() => Mt(((e, t) => {
                const n = Mi.fromRangeStart(e.selection.getRng());
                return jh(t, n) || gu(t, e.getBody(), n).exists((e => jh(t, e)))
            })(e, t), E)))), (n => ((e, t, n, o) => {
                const r = Mi.fromRangeStart(e.selection.getRng());
                return ps(o) ? zh(e, o) : ((e, t, n, o, r) => pu(n, e.getBody(), r).fold((() => I.some(E)), (s => ((e, t, n, o) => Cu(e.dom).bind((r => wu(e.dom).map((e => t ? n.isEqual(r) && o.isEqual(e) : n.isEqual(e) && o.isEqual(r))))).getOr(!0))(o, n, r, s) ? ((e, t) => zh(e, t))(e, o) : ((e, t, n) => Uh(e, vn(n.getNode())).fold((() => I.some(E)), (e => Mt(!kn(e, t), E))))(t, o, s))))(e, n, t, o, r)
            })(e, t, o, n)))
        },
        $h = (e, t) => {
            const n = vn(e.selection.getStart(!0)),
                o = Xu(e);
            return e.selection.isCollapsed() && 0 === o.length ? Hh(e, t, n) : ((e, t, n) => {
                const o = vn(e.getBody()),
                    r = e.selection.getRng();
                return 0 !== n.length ? Ph(e, n, I.none()) : ((e, t, n, o) => Uh(t, o).fold((() => ((e, t, n) => Oh(t, n).bind((t => t.fold(O(Mh, e), O(Ih, e), O(Ph, e), O(Lh, e)))))(e, t, n)), (t => ((e, t) => zh(e, t))(e, t))))(e, o, r, t)
            })(e, n, o)
        },
        Vh = (e, t) => {
            let n = t;
            for (; n && n !== e;) {
                if (rr(n) || sr(n)) return n;
                n = n.parentNode
            }
            return null
        },
        qh = ["data-ephox-", "data-mce-", "data-alloy-", "data-snooker-", "_"],
        Wh = Dt.each,
        Kh = e => {
            const t = e.dom,
                n = new Set(e.serializer.getTempAttrs()),
                o = e => $(qh, (t => He(e, t))) || n.has(e);
            return {
                compare: (e, n) => {
                    if (e.nodeName !== n.nodeName || e.nodeType !== n.nodeType) return !1;
                    const r = e => {
                            const n = {};
                            return Wh(t.getAttribs(e), (r => {
                                const s = r.nodeName.toLowerCase();
                                "style" === s || o(s) || (n[s] = t.getAttrib(e, s))
                            })), n
                        },
                        s = (e, t) => {
                            for (const n in e)
                                if (ke(e, n)) {
                                    const o = t[n];
                                    if (v(o)) return !1;
                                    if (e[n] !== o) return !1;
                                    delete t[n]
                                } for (const e in t)
                                if (ke(t, e)) return !1;
                            return !0
                        };
                    if (jo(e) && jo(n)) {
                        if (!s(r(e), r(n))) return !1;
                        if (!s(t.parseStyle(t.getAttrib(e, "style")), t.parseStyle(t.getAttrib(n, "style")))) return !1
                    }
                    return !Mu(e) && !Mu(n)
                },
                isAttributeInternal: o
            }
        },
        Gh = (e, t, n, o) => {
            const r = n.name;
            for (let t = 0, s = e.length; t < s; t++) {
                const s = e[t];
                if (s.name === r) {
                    const e = o.nodes[r];
                    e ? e.nodes.push(n) : o.nodes[r] = {
                        filter: s,
                        nodes: [n]
                    }
                }
            }
            if (n.attributes)
                for (let e = 0, r = t.length; e < r; e++) {
                    const r = t[e],
                        s = r.name;
                    if (s in n.attributes.map) {
                        const e = o.attributes[s];
                        e ? e.nodes.push(n) : o.attributes[s] = {
                            filter: r,
                            nodes: [n]
                        }
                    }
                }
        },
        Yh = (e, t) => {
            const n = (e, n) => {
                ge(e, (e => {
                    const o = ce(e.nodes);
                    q(e.filter.callbacks, (r => {
                        for (let t = o.length - 1; t >= 0; t--) {
                            const r = o[t];
                            (n ? void 0 !== r.attr(e.filter.name) : r.name === e.filter.name) && !y(r.parent) || o.splice(t, 1)
                        }
                        o.length > 0 && r(o, e.filter.name, t)
                    }))
                }))
            };
            n(e.nodes, !1), n(e.attributes, !0)
        },
        Xh = (e, t, n, o = {}) => {
            const r = ((e, t, n) => {
                const o = {
                    nodes: {},
                    attributes: {}
                };
                return n.firstChild && ((n, r) => {
                    let s = n;
                    for (; s = s.walk();) Gh(e, t, s, o)
                })(n), o
            })(e, t, n);
            Yh(r, o)
        },
        Qh = (e, t, n) => {
            if (e.insert && t(n)) {
                const e = new Ug("br", 1);
                e.attr("data-mce-bogus", "1"), n.empty().append(e)
            } else n.empty().append(new Ug("#text", 3)).value = fr
        },
        Jh = (e, t) => {
            const n = null == e ? void 0 : e.firstChild;
            return C(n) && n === e.lastChild && n.name === t
        },
        Zh = (e, t, n, o) => o.isEmpty(t, n, (t => ((e, t) => {
            const n = e.getElementRule(t.name);
            return !0 === (null == n ? void 0 : n.paddEmpty)
        })(e, t))),
        eb = e => {
            let t;
            for (let n = e; n; n = n.parent) {
                const e = n.attr("contenteditable");
                if ("false" === e) break;
                "true" === e && (t = n)
            }
            return I.from(t)
        },
        tb = (e, t, n = e.parent) => {
            if (t.getSpecialElements()[e.name]) e.empty().remove();
            else {
                const o = e.children();
                for (const e of o) n && !t.isValidChild(n.name, e.name) && tb(e, t, n);
                e.unwrap()
            }
        },
        nb = (e, t, n, o = E) => {
            const r = t.getTextBlockElements(),
                s = t.getNonEmptyElements(),
                a = t.getWhitespaceElements(),
                i = Dt.makeMap("tr,td,th,tbody,thead,tfoot,table"),
                l = new Set,
                d = e => e !== n && !i[e.name];
            for (let n = 0; n < e.length; n++) {
                const i = e[n];
                let c, u, m;
                if (!i.parent || l.has(i)) continue;
                if (r[i.name] && "li" === i.parent.name) {
                    let e = i.next;
                    for (; e && r[e.name];) e.name = "li", l.add(e), i.parent.insert(e, i.parent), e = e.next;
                    i.unwrap();
                    continue
                }
                const f = [i];
                for (c = i.parent; c && !t.isValidChild(c.name, i.name) && d(c); c = c.parent) f.push(c);
                if (c && f.length > 1)
                    if (t.isValidChild(c.name, i.name)) {
                        f.reverse(), u = f[0].clone(), o(u);
                        let e = u;
                        for (let n = 0; n < f.length - 1; n++) {
                            t.isValidChild(e.name, f[n].name) && n > 0 ? (m = f[n].clone(), o(m), e.append(m)) : m = e;
                            for (let e = f[n].firstChild; e && e !== f[n + 1];) {
                                const t = e.next;
                                m.append(e), e = t
                            }
                            e = m
                        }
                        Zh(t, s, a, u) ? c.insert(i, f[0], !0) : (c.insert(u, f[0], !0), c.insert(i, u)), c = f[0], (Zh(t, s, a, c) || Jh(c, "br")) && c.empty().remove()
                    } else tb(i, t);
                else if (i.parent) {
                    if ("li" === i.name) {
                        let e = i.prev;
                        if (e && ("ul" === e.name || "ol" === e.name)) {
                            e.append(i);
                            continue
                        }
                        if (e = i.next, e && ("ul" === e.name || "ol" === e.name) && e.firstChild) {
                            e.insert(i, e.firstChild, !0);
                            continue
                        }
                        const t = new Ug("ul", 1);
                        o(t), i.wrap(t);
                        continue
                    }
                    if (t.isValidChild(i.parent.name, "div") && t.isValidChild("div", i.name)) {
                        const e = new Ug("div", 1);
                        o(e), i.wrap(e)
                    } else tb(i, t)
                }
            }
        },
        ob = (e, t, n = t.parent) => !(!n || !e.children[t.name] || e.isValidChild(n.name, t.name)) || !(!n || "a" !== t.name || !((e, t) => {
            let n = e;
            for (; n;) {
                if ("a" === n.name) return !0;
                n = n.parent
            }
            return !1
        })(n)),
        rb = e => e.collapsed ? e : (e => {
            const t = Mi.fromRangeStart(e),
                n = Mi.fromRangeEnd(e),
                o = e.commonAncestorContainer;
            return gu(!1, o, n).map((r => !zc(t, n, o) && zc(t, r, o) ? ((e, t, n, o) => {
                const r = document.createRange();
                return r.setStart(e, t), r.setEnd(n, o), r
            })(t.container(), t.offset(), r.container(), r.offset()) : e)).getOr(e)
        })(e),
        sb = (e, t) => {
            let n = t.firstChild,
                o = t.lastChild;
            return n && "meta" === n.name && (n = n.next), o && "mce_marker" === o.attr("id") && (o = o.prev), ((e, t) => {
                const n = e.getNonEmptyElements();
                return C(t) && (t.isEmpty(n) || ((e, t) => e.getBlockElements()[t.name] && (e => C(e.firstChild) && e.firstChild === e.lastChild)(t) && (e => "br" === e.name || e.value === fr)(t.firstChild))(e, t))
            })(e, o) && (o = null == o ? void 0 : o.prev), !(!n || n !== o || "ul" !== n.name && "ol" !== n.name)
        },
        ab = e => {
            return e.length > 0 && (!(n = e[e.length - 1]).firstChild || C(null == (t = n) ? void 0 : t.firstChild) && t.firstChild === t.lastChild && (e => e.data === fr || nr(e))(t.firstChild)) ? e.slice(0, -1) : e;
            var t, n
        },
        ib = (e, t) => {
            const n = e.getParent(t, e.isBlock);
            return n && "LI" === n.nodeName ? n : null
        },
        lb = (e, t) => {
            const n = Mi.after(e),
                o = cu(t).prev(n);
            return o ? o.toRange() : null
        },
        db = (e, t, n, o) => {
            const r = ((e, t, n) => {
                    const o = t.serialize(n);
                    return (e => {
                        var t, n;
                        const o = e.firstChild,
                            r = e.lastChild;
                        return o && "META" === o.nodeName && (null === (t = o.parentNode) || void 0 === t || t.removeChild(o)), r && "mce_marker" === r.id && (null === (n = r.parentNode) || void 0 === n || n.removeChild(r)), e
                    })(e.createFragment(o))
                })(t, e, o),
                s = ib(t, n.startContainer),
                a = ab((i = r.firstChild, G(null !== (l = null == i ? void 0 : i.childNodes) && void 0 !== l ? l : [], (e => "LI" === e.nodeName))));
            var i, l;
            const d = t.getRoot(),
                c = e => {
                    const o = Mi.fromRangeStart(n),
                        r = cu(t.getRoot()),
                        a = 1 === e ? r.prev(o) : r.next(o),
                        i = null == a ? void 0 : a.getNode();
                    return !i || ib(t, i) !== s
                };
            return s ? c(1) ? ((e, t, n) => {
                const o = e.parentNode;
                return o && Dt.each(t, (t => {
                    o.insertBefore(t, e)
                })), ((e, t) => {
                    const n = Mi.before(e),
                        o = cu(t).next(n);
                    return o ? o.toRange() : null
                })(e, n)
            })(s, a, d) : c(2) ? ((e, t, n, o) => (o.insertAfter(t.reverse(), e), lb(t[0], n)))(s, a, d, t) : ((e, t, n, o) => {
                const r = ((e, t) => {
                        const n = t.cloneRange(),
                            o = t.cloneRange();
                        return n.setStartBefore(e), o.setEndAfter(e), [n.cloneContents(), o.cloneContents()]
                    })(e, o),
                    s = e.parentNode;
                return s && (s.insertBefore(r[0], e), Dt.each(t, (t => {
                    s.insertBefore(t, e)
                })), s.insertBefore(r[1], e), s.removeChild(e)), lb(t[t.length - 1], n)
            })(s, a, d, n) : null
        },
        cb = ["pre"],
        ub = ar,
        mb = (e, t, n) => {
            var o, r;
            const s = e.selection,
                a = e.dom,
                i = e.parser,
                l = n.merge,
                d = Yg({
                    validate: !0
                }, e.schema),
                c = '<span id="mce_marker" data-mce-type="bookmark">&#xFEFF;</span>'; - 1 === t.indexOf("{$caret}") && (t += "{$caret}"), t = t.replace(/\{\$caret\}/, c);
            let u = s.getRng();
            const m = u.startContainer,
                f = e.getBody();
            m === f && s.isCollapsed() && a.isBlock(f.firstChild) && ((e, t) => C(t) && !e.schema.getVoidElements()[t.nodeName])(e, f.firstChild) && a.isEmpty(f.firstChild) && (u = a.createRng(), u.setStart(f.firstChild, 0), u.setEnd(f.firstChild, 0), s.setRng(u)), s.isCollapsed() || (e => {
                const t = e.dom,
                    n = rb(e.selection.getRng());
                e.selection.setRng(n);
                const o = t.getParent(n.startContainer, ub);
                ((e, t, n) => !!C(n) && n === e.getParent(t.endContainer, ub) && em(vn(n), t))(t, n, o) ? Mh(e, n, vn(o)): n.startContainer === n.endContainer && n.endOffset - n.startOffset == 1 && Xo(n.startContainer.childNodes[n.startOffset]) ? n.deleteContents() : e.getDoc().execCommand("Delete", !1)
            })(e);
            const g = s.getNode(),
                p = {
                    context: g.nodeName.toLowerCase(),
                    data: n.data,
                    insert: !0
                },
                h = i.parse(t, p);
            if (!0 === n.paste && sb(e.schema, h) && ((e, t) => !!ib(e, t))(a, g)) return u = db(d, a, s.getRng(), h), u && s.setRng(u), t;
            !0 === n.paste && ((e, t, n, o) => {
                var r;
                const s = t.firstChild,
                    a = t.lastChild,
                    i = s === ("bookmark" === a.attr("data-mce-type") ? a.prev : a),
                    l = H(cb, s.name);
                if (i && l) {
                    const t = "false" !== s.attr("contenteditable"),
                        a = (null === (r = e.getParent(n, e.isBlock)) || void 0 === r ? void 0 : r.nodeName.toLowerCase()) === s.name,
                        i = I.from(Vh(o, n)).forall(rr);
                    return t && a && i
                }
                return !1
            })(a, h, g, e.getBody()) && (null === (o = h.firstChild) || void 0 === o || o.unwrap()), (e => {
                let t = e;
                for (; t = t.walk();) 1 === t.type && t.attr("data-mce-fragment", "1")
            })(h);
            let b = h.lastChild;
            if (b && "mce_marker" === b.attr("id")) {
                const t = b;
                for (b = b.prev; b; b = b.walk(!0))
                    if (3 === b.type || !a.isBlock(b.name)) {
                        b.parent && e.schema.isValidChild(b.parent.name, "span") && b.parent.insert(t, b, "br" === b.name);
                        break
                    }
            }
            if (e._selectionOverrides.showBlockCaretContainer(g), p.invalid) {
                e.selection.setContent(c);
                let n, o = s.getNode();
                const l = e.getBody();
                for (er(o) ? o = n = l : n = o; n && n !== l;) o = n, n = n.parentNode;
                t = o === l ? l.innerHTML : a.getOuterHTML(o);
                const u = i.parse(t),
                    m = (e => {
                        for (let t = e; t; t = t.walk())
                            if ("mce_marker" === t.attr("id")) return I.some(t);
                        return I.none()
                    })(u),
                    f = m.bind(eb).getOr(u);
                m.each((e => e.replace(h)));
                const g = h.children(),
                    p = null !== (r = h.parent) && void 0 !== r ? r : u;
                h.unwrap();
                const b = G(g, (t => ob(e.schema, t, p)));
                nb(b, e.schema, f), Xh(i.getNodeFilters(), i.getAttributeFilters(), u), t = d.serialize(u), o === l ? a.setHTML(l, t) : a.setOuterHTML(o, t)
            } else t = d.serialize(h), ((e, t, n) => {
                var o;
                if ("all" === n.getAttribute("data-mce-bogus")) null === (o = n.parentNode) || void 0 === o || o.insertBefore(e.dom.createFragment(t), n);
                else {
                    const o = n.firstChild,
                        r = n.lastChild;
                    !o || o === r && "BR" === o.nodeName ? e.dom.setHTML(n, t) : e.selection.setContent(t, {
                        no_events: !0
                    })
                }
            })(e, t, g);
            var v;
            return ((e, t) => {
                const n = e.schema.getTextInlineElements(),
                    o = e.dom;
                if (t) {
                    const t = e.getBody(),
                        r = Kh(e);
                    Dt.each(o.select("*[data-mce-fragment]"), (e => {
                        if (C(n[e.nodeName.toLowerCase()]) && ((e, t) => ne(Jg(e, t), (e => !(e => Xg.has(e))(e))))(o, e))
                            for (let n = e.parentElement; C(n) && n !== t && !Zg(o, e, n); n = n.parentElement)
                                if (r.compare(n, e)) {
                                    o.remove(e, !0);
                                    break
                                }
                    }))
                }
            })(e, l), ((e, t) => {
                var n, o, r;
                let s;
                const a = e.dom,
                    i = e.selection;
                if (!t) return;
                i.scrollIntoView(t);
                const l = Vh(e.getBody(), t);
                if (l && "false" === a.getContentEditable(l)) return a.remove(t), void i.select(l);
                let d = a.createRng();
                const c = t.previousSibling;
                if (Xo(c)) {
                    d.setStart(c, null !== (o = null === (n = c.nodeValue) || void 0 === n ? void 0 : n.length) && void 0 !== o ? o : 0);
                    const e = t.nextSibling;
                    Xo(e) && (c.appendData(e.data), null === (r = e.parentNode) || void 0 === r || r.removeChild(e))
                } else d.setStartBefore(t), d.setEndBefore(t);
                const u = a.getParent(t, a.isBlock);
                a.remove(t), u && a.isEmpty(u) && (yo(vn(u)), d.setStart(u, 0), d.setEnd(u, 0), ub(u) || (e => !!e.getAttribute("data-mce-fragment"))(u) || !(s = (t => {
                    let n = Mi.fromRangeStart(t);
                    return n = cu(e.getBody()).next(n), null == n ? void 0 : n.toRange()
                })(d)) ? a.add(u, a.create("br", {
                    "data-mce-bogus": "1"
                })) : (d = s, a.remove(u))), i.setRng(d)
            })(e, a.get("mce_marker")), v = e.getBody(), Dt.each(v.getElementsByTagName("*"), (e => {
                e.removeAttribute("data-mce-fragment")
            })), ((e, t) => {
                I.from(e.getParent(t, "td,th")).map(vn).each(Dr)
            })(a, s.getStart()), (e => {
                q(ce(e.getBody().querySelectorAll("details")), (e => {
                    const t = G(ce(e.children), (e => "SUMMARY" === e.nodeName));
                    t.length > 1 && q(t.slice(1), (e => {
                        const t = vn(e);
                        mn(t, "mce-accordion-summary"), si(t, "p")
                    }))
                }))
            })(e), ((e, t, n) => {
                const o = On(vn(n), (e => kn(e, vn(t))));
                ie(o, o.length - 2).filter(qt).fold((() => xs(e, t)), (t => xs(e, t.dom)))
            })(e.schema, e.getBody(), s.getStart()), t
        },
        fb = e => e instanceof Ug,
        gb = (e, t, n) => {
            e.dom.setHTML(e.getBody(), t), !0 !== n && (e => {
                kg(e) && Cu(e.getBody()).each((t => {
                    const n = t.getNode(),
                        o = Ko(n) ? Cu(n).getOr(t) : t;
                    e.selection.setRng(o.toRange())
                }))
            })(e)
        },
        pb = (e, t) => ((e, t) => {
            const n = e.dom;
            return n.parentNode ? ((e, t) => J(e.dom.childNodes, (e => t(vn(e)))).map(vn))(vn(n.parentNode), (n => !kn(e, n) && t(n))) : I.none()
        })(e, t).isSome(),
        hb = e => w(e) ? e : L,
        bb = (e, t, n) => {
            const o = t(e),
                r = hb(n);
            return o.orThunk((() => r(e) ? I.none() : ((e, t, n) => {
                let o = e.dom;
                const r = hb(n);
                for (; o.parentNode;) {
                    o = o.parentNode;
                    const e = vn(o),
                        n = t(e);
                    if (n.isSome()) return n;
                    if (r(e)) break
                }
                return I.none()
            })(e, t, r)))
        },
        vb = hm,
        yb = (e, t, n) => {
            const o = e.formatter.get(n);
            if (o)
                for (let n = 0; n < o.length; n++) {
                    const r = o[n];
                    if (km(r) && !1 === r.inherit && e.dom.is(t, r.selector)) return !0
                }
            return !1
        },
        Cb = (e, t, n, o, r) => {
            const s = e.dom.getRoot();
            if (t === s) return !1;
            const a = e.dom.getParent(t, (t => !!yb(e, t, n) || t.parentNode === s || !!kb(e, t, n, o, !0)));
            return !!kb(e, a, n, o, r)
        },
        wb = (e, t, n) => !(!Em(n) || !vb(t, n.inline)) || !(!xm(n) || !vb(t, n.block)) || !!km(n) && jo(t) && e.is(t, n.selector),
        xb = (e, t, n, o, r, s) => {
            const a = n[o],
                i = "attributes" === o;
            if (w(n.onmatch)) return n.onmatch(t, n, o);
            if (a)
                if (_e(a)) {
                    for (let n = 0; n < a.length; n++)
                        if (i ? e.getAttrib(t, a[n]) : vm(e, t, a[n])) return !0
                } else
                    for (const o in a)
                        if (ke(a, o)) {
                            const l = i ? e.getAttrib(t, o) : vm(e, t, o),
                                d = pm(a[o], s),
                                c = y(l) || Ye(l);
                            if (c && y(d)) continue;
                            if (r && c && !n.exact) return !1;
                            if ((!r || n.exact) && !vb(l, bm(d, o))) return !1
                        } return !0
        },
        kb = (e, t, n, o, r) => {
            const s = e.formatter.get(n),
                a = e.dom;
            if (s && jo(t))
                for (let n = 0; n < s.length; n++) {
                    const i = s[n];
                    if (wb(e.dom, t, i) && xb(a, t, i, "attributes", r, o) && xb(a, t, i, "styles", r, o)) {
                        const n = i.classes;
                        if (n)
                            for (let r = 0; r < n.length; r++)
                                if (!e.dom.hasClass(t, pm(n[r], o))) return;
                        return i
                    }
                }
        },
        Eb = (e, t, n, o, r) => {
            if (o) return Cb(e, o, t, n, r);
            if (o = e.selection.getNode(), Cb(e, o, t, n, r)) return !0;
            const s = e.selection.getStart();
            return !(s === o || !Cb(e, s, t, n, r))
        },
        Sb = Pr,
        _b = e => (e => {
            const t = [];
            let n = e;
            for (; n;) {
                if (Xo(n) && n.data !== Sb || n.childNodes.length > 1) return [];
                jo(n) && t.push(n), n = n.firstChild
            }
            return t
        })(e).length > 0,
        Nb = e => {
            if (e) {
                const t = new Fo(e, e);
                for (let e = t.current(); e; e = t.next())
                    if (Xo(e)) return e
            }
            return null
        },
        Rb = e => {
            const t = hn("span");
            return Jt(t, {
                id: xu,
                "data-mce-bogus": "1",
                "data-mce-type": "format-caret"
            }), e && ho(t, bn(Sb)), t
        },
        Ab = (e, t, n = !0) => {
            const o = e.dom,
                r = e.selection;
            if (_b(t)) oh(e, !1, vn(t), n);
            else {
                const e = r.getRng(),
                    n = o.getParent(t, o.isBlock),
                    s = e.startContainer,
                    a = e.startOffset,
                    i = e.endContainer,
                    l = e.endOffset,
                    d = (e => {
                        const t = Nb(e);
                        return t && t.data.charAt(0) === Sb && t.deleteData(0, 1), t
                    })(t);
                o.remove(t, !0), s === d && a > 0 && e.setStart(d, a - 1), i === d && l > 0 && e.setEnd(d, l - 1), n && o.isEmpty(n) && Br(vn(n)), r.setRng(e)
            }
        },
        Ob = (e, t, n = !0) => {
            const o = e.dom,
                r = e.selection;
            if (t) Ab(e, t, n);
            else if (!(t = Eu(e.getBody(), r.getStart())))
                for (; t = o.get(xu);) Ab(e, t, n)
        },
        Tb = (e, t) => (e.appendChild(t), t),
        Bb = (e, t) => {
            var n;
            const o = Y(e, ((e, t) => Tb(e, t.cloneNode(!1))), t),
                r = null !== (n = o.ownerDocument) && void 0 !== n ? n : document;
            return Tb(o, r.createTextNode(Sb))
        },
        Db = (e, t, n, o) => {
            const a = e.dom,
                i = e.selection;
            let l = !1;
            const d = e.formatter.get(t);
            if (!d) return;
            const c = i.getRng(),
                u = c.startContainer,
                m = c.startOffset;
            let f = u;
            Xo(u) && (m !== u.data.length && (l = !0), f = f.parentNode);
            const g = [];
            let h;
            for (; f;) {
                if (kb(e, f, t, n, o)) {
                    h = f;
                    break
                }
                f.nextSibling && (l = !0), g.push(f), f = f.parentNode
            }
            if (h)
                if (l) {
                    const r = i.getBookmark();
                    c.collapse(!0);
                    let s = zm(a, c, d, !0);
                    s = Df(s), e.formatter.remove(t, n, s, o), i.moveToBookmark(r)
                } else {
                    const l = Eu(e.getBody(), h),
                        d = Rb(!1).dom;
                    ((e, t, n) => {
                        var o, r;
                        const s = e.dom,
                            a = s.getParent(n, O(um, e.schema));
                        a && s.isEmpty(a) ? null === (o = n.parentNode) || void 0 === o || o.replaceChild(t, n) : ((e => {
                            const t = Mo(e, "br"),
                                n = G((e => {
                                    const t = [];
                                    let n = e.dom;
                                    for (; n;) t.push(vn(n)), n = n.lastChild;
                                    return t
                                })(e).slice(-1), xr);
                            t.length === n.length && q(n, Co)
                        })(vn(n)), s.isEmpty(n) ? null === (r = n.parentNode) || void 0 === r || r.replaceChild(t, n) : s.insertAfter(t, n))
                    })(e, d, null != l ? l : h);
                    const c = ((e, t, n, o, a, i) => {
                            const l = e.formatter,
                                d = e.dom,
                                c = G(me(l.get()), (e => e !== o && !je(e, "removeformat"))),
                                u = ((e, t, n) => X(n, ((n, o) => {
                                    const r = ((e, t) => wm(e, t, (e => {
                                        const t = e => w(e) || e.length > 1 && "%" === e.charAt(0);
                                        return $(["styles", "attributes"], (n => xe(e, n).exists((e => {
                                            const n = p(e) ? e : we(e);
                                            return $(n, t)
                                        }))))
                                    })))(e, o);
                                    return e.formatter.matchNode(t, o, {}, r) ? n.concat([o]) : n
                                }), []))(e, n, c);
                            if (G(u, (t => !((e, t, n) => {
                                    const o = ["inline", "block", "selector", "attributes", "styles", "classes"],
                                        a = e => ye(e, ((e, t) => $(o, (e => e === t))));
                                    return wm(e, t, (t => {
                                        const o = a(t);
                                        return wm(e, n, (e => {
                                            const t = a(e);
                                            return ((e, t, n = s) => r(n).eq(e, t))(o, t)
                                        }))
                                    }))
                                })(e, t, o))).length > 0) {
                                const e = n.cloneNode(!1);
                                return d.add(t, e), l.remove(o, a, e, i), d.remove(e), I.some(e)
                            }
                            return I.none()
                        })(e, d, h, t, n, o),
                        u = Bb(g.concat(c.toArray()), d);
                    l && Ab(e, l, !1), i.setCursorLocation(u, 1), a.isEmpty(h) && a.remove(h)
                }
        },
        Pb = e => {
            const t = Rb(!1),
                n = Bb(e, t.dom);
            return {
                caretContainer: t,
                caretPosition: Mi(n, 0)
            }
        },
        Lb = (e, t) => {
            const {
                caretContainer: n,
                caretPosition: o
            } = Pb(t);
            return fo(vn(e), n), Co(vn(e)), o
        },
        Mb = (e, t) => {
            const n = e.schema.getTextInlineElements();
            return ke(n, jt(t)) && !ku(t.dom) && !Wo(t.dom)
        },
        Ib = e => ku(e.dom) && _b(e.dom),
        Fb = {},
        Ub = $o(["pre"]);
    ((e, t) => {
        Fb[e] || (Fb[e] = []), Fb[e].push((e => {
            if (!e.selection.getRng().collapsed) {
                const t = e.selection.getSelectedBlocks(),
                    n = G(G(t, Ub), (e => t => {
                        const n = t.previousSibling;
                        return Ub(n) && H(e, n)
                    })(t));
                q(n, (e => {
                    ((e, t) => {
                        const n = vn(t),
                            o = _n(n).dom;
                        Co(n), vo(vn(e), [hn("br", o), hn("br", o), ...Ln(n)])
                    })(e.previousSibling, e)
                }))
            }
        }))
    })("pre");
    const zb = ["fontWeight", "fontStyle", "color", "fontSize", "fontFamily"],
        jb = (e, t) => {
            const n = e.get(t);
            return p(n) ? J(n, (e => Em(e) && "span" === e.inline && (e => f(e.styles) && $(me(e.styles), (e => H(zb, e))))(e))) : I.none()
        },
        Hb = (e, t) => yu(t, Mi.fromRangeStart(e)).isNone(),
        $b = (e, t) => !1 === vu(t, Mi.fromRangeEnd(e)).exists((e => !nr(e.getNode()) || vu(t, e).isSome())),
        Vb = e => t => dr(t) && e.isEditable(t),
        qb = e => G(e.getSelectedBlocks(), Vb(e.dom)),
        Wb = Dt.each,
        Kb = e => jo(e) && !Mu(e) && !ku(e) && !Wo(e),
        Gb = (e, t) => {
            for (let n = e; n; n = n[t]) {
                if (Xo(n) && Ge(n.data)) return e;
                if (jo(n) && !Mu(n)) return n
            }
            return e
        },
        Yb = (e, t, n) => {
            const o = Kh(e),
                r = jo(t) && im(t),
                s = jo(n) && im(n);
            if (r && s) {
                const r = Gb(t, "previousSibling"),
                    s = Gb(n, "nextSibling");
                if (o.compare(r, s)) {
                    for (let e = r.nextSibling; e && e !== s;) {
                        const t = e;
                        e = e.nextSibling, r.appendChild(t)
                    }
                    return e.dom.remove(s), Dt.each(Dt.grep(s.childNodes), (e => {
                        r.appendChild(e)
                    })), r
                }
            }
            return n
        },
        Xb = (e, t, n, o) => {
            var r;
            if (o && !1 !== t.merge_siblings) {
                const t = null !== (r = Yb(e, cm(o), o)) && void 0 !== r ? r : o;
                Yb(e, t, cm(t, !0))
            }
        },
        Qb = (e, t, n) => {
            Wb(e.childNodes, (e => {
                Kb(e) && (t(e) && n(e), e.hasChildNodes() && Qb(e, t, n))
            }))
        },
        Jb = (e, t) => n => !(!n || !vm(e, n, t)),
        Zb = (e, t, n) => o => {
            e.setStyle(o, t, n), "" === o.getAttribute("style") && o.removeAttribute("style"), ((e, t) => {
                "SPAN" === t.nodeName && 0 === e.getAttribs(t).length && e.remove(t, !0)
            })(e, o)
        },
        ev = il([{
            keep: []
        }, {
            rename: ["name"]
        }, {
            removed: []
        }]),
        tv = /^(src|href|style)$/,
        nv = Dt.each,
        ov = hm,
        rv = (e, t, n) => e.isChildOf(t, n) && t !== n && !e.isBlock(n),
        sv = (e, t, n) => {
            let o = t[n ? "startContainer" : "endContainer"],
                r = t[n ? "startOffset" : "endOffset"];
            if (jo(o)) {
                const e = o.childNodes.length - 1;
                !n && r && r--, o = o.childNodes[r > e ? e : r]
            }
            return Xo(o) && n && r >= o.data.length && (o = new Fo(o, e.getBody()).next() || o), Xo(o) && !n && 0 === r && (o = new Fo(o, e.getBody()).prev() || o), o
        },
        av = (e, t) => {
            const n = t ? "firstChild" : "lastChild",
                o = e[n];
            return (e => /^(TR|TH|TD)$/.test(e.nodeName))(e) && o ? "TR" === e.nodeName && o[n] || o : e
        },
        iv = (e, t, n, o) => {
            var r;
            const s = e.create(n, o);
            return null === (r = t.parentNode) || void 0 === r || r.insertBefore(s, t), s.appendChild(t), s
        },
        lv = (e, t, n, o, r) => {
            const s = vn(t),
                a = vn(e.create(o, r)),
                i = n ? Pn(s) : Dn(s);
            return vo(a, i), n ? (fo(s, a), po(a, s)) : (go(s, a), ho(a, s)), a.dom
        },
        dv = (e, t, n) => {
            const o = t.parentNode;
            let r;
            const s = e.dom,
                a = Rl(e);
            xm(n) && o === s.getRoot() && (n.list_block && ov(t, n.list_block) || q(ce(t.childNodes), (t => {
                mm(e, a, t.nodeName.toLowerCase()) ? r ? r.appendChild(t) : (r = iv(s, t, a), s.setAttribs(r, Al(e))) : r = null
            }))), (e => km(e) && Em(e) && Pt(xe(e, "mixed"), !0))(n) && !ov(n.inline, t) || s.remove(t, !0)
        },
        cv = (e, t, n) => x(e) ? {
            name: t,
            value: null
        } : {
            name: e,
            value: pm(t, n)
        },
        uv = (e, t) => {
            "" === e.getAttrib(t, "style") && (t.removeAttribute("style"), t.removeAttribute("data-mce-style"))
        },
        mv = (e, t, n, o, r) => {
            let s = !1;
            nv(n.styles, ((a, i) => {
                const {
                    name: l,
                    value: d
                } = cv(i, a, o), c = bm(d, l);
                (n.remove_similar || h(d) || !jo(r) || ov(vm(e, r, l), c)) && e.setStyle(t, l, ""), s = !0
            })), s && uv(e, t)
        },
        fv = (e, t, n, o, r) => {
            const s = e.dom,
                a = Kh(e),
                i = e.schema;
            if (Em(t) && Ss(i, t.inline) && Ns(i, o) && o.parentElement === e.getBody()) return dv(e, o, t), ev.removed();
            if (!t.ceFalseOverride && o && "false" === s.getContentEditableParent(o)) return ev.keep();
            if (o && !wb(s, o, t) && !((e, t) => t.links && "A" === e.nodeName)(o, t)) return ev.keep();
            const l = o,
                d = t.preserve_attributes;
            if (Em(t) && "all" === t.remove && p(d)) {
                const e = G(s.getAttribs(l), (e => H(d, e.name.toLowerCase())));
                if (s.removeAllAttribs(l), q(e, (e => s.setAttrib(l, e.name, e.value))), e.length > 0) return ev.rename("span")
            }
            if ("all" !== t.remove) {
                mv(s, l, t, n, r), nv(t.attributes, ((e, o) => {
                    const {
                        name: a,
                        value: i
                    } = cv(o, e, n);
                    if (t.remove_similar || h(i) || !jo(r) || ov(s.getAttrib(r, a), i)) {
                        if ("class" === a) {
                            const e = s.getAttrib(l, a);
                            if (e) {
                                let t = "";
                                if (q(e.split(/\s+/), (e => {
                                        /mce\-\w+/.test(e) && (t += (t ? " " : "") + e)
                                    })), t) return void s.setAttrib(l, a, t)
                            }
                        }
                        if (tv.test(a) && l.removeAttribute("data-mce-" + a), "style" === a && $o(["li"])(l) && "none" === s.getStyle(l, "list-style-type")) return l.removeAttribute(a), void s.setStyle(l, "list-style-type", "none");
                        "class" === a && l.removeAttribute("className"), l.removeAttribute(a)
                    }
                })), nv(t.classes, (e => {
                    e = pm(e, n), jo(r) && !s.hasClass(r, e) || s.removeClass(l, e)
                }));
                const e = s.getAttribs(l);
                for (let t = 0; t < e.length; t++) {
                    const n = e[t].nodeName;
                    if (!a.isAttributeInternal(n)) return ev.keep()
                }
            }
            return "none" !== t.remove ? (dv(e, l, t), ev.removed()) : ev.keep()
        },
        gv = (e, t, n, o) => fv(e, t, n, o, o).fold(N(o), (t => (e.dom.createFragment().appendChild(o), e.dom.rename(o, t))), N(null)),
        pv = (e, t, n, o, r) => {
            (o || e.selection.isEditable()) && ((e, t, n, o, r) => {
                const s = e.formatter.get(t),
                    a = s[0],
                    i = e.dom,
                    l = e.selection,
                    d = o => {
                        const i = ((e, t, n, o, r) => {
                            let s;
                            return t.parentNode && q(Cm(e.dom, t.parentNode).reverse(), (t => {
                                if (!s && jo(t) && "_start" !== t.id && "_end" !== t.id) {
                                    const a = kb(e, t, n, o, r);
                                    a && !1 !== a.split && (s = t)
                                }
                            })), s
                        })(e, o, t, n, r);
                        return ((e, t, n, o, r, s, a, i) => {
                            var l, d;
                            let c, u;
                            const m = e.dom;
                            if (n) {
                                const s = n.parentNode;
                                for (let n = o.parentNode; n && n !== s; n = n.parentNode) {
                                    let o = m.clone(n, !1);
                                    for (let n = 0; n < t.length && (o = gv(e, t[n], i, o), null !== o); n++);
                                    o && (c && o.appendChild(c), u || (u = o), c = o)
                                }
                                a.mixed && m.isBlock(n) || (o = null !== (l = m.split(n, o)) && void 0 !== l ? l : o), c && u && (null === (d = r.parentNode) || void 0 === d || d.insertBefore(c, r), u.appendChild(r), Em(a) && Xb(e, a, 0, c))
                            }
                            return o
                        })(e, s, i, o, o, 0, a, n)
                    },
                    c = t => $(s, (o => hv(e, o, n, t, t))),
                    u = t => {
                        const n = ce(t.childNodes),
                            o = c(t) || $(s, (e => wb(i, t, e))),
                            r = t.parentNode;
                        if (!o && C(r) && Sm(a) && c(r), a.deep && n.length)
                            for (let e = 0; e < n.length; e++) u(n[e]);
                        q(["underline", "line-through", "overline"], (n => {
                            jo(t) && e.dom.getStyle(t, "text-decoration") === n && t.parentNode && ym(i, t.parentNode) === n && hv(e, {
                                deep: !1,
                                exact: !0,
                                inline: "span",
                                styles: {
                                    textDecoration: n
                                }
                            }, void 0, t)
                        }))
                    },
                    m = e => {
                        const t = i.get(e ? "_start" : "_end");
                        if (t) {
                            let n = t[e ? "firstChild" : "lastChild"];
                            return (e => Mu(e) && jo(e) && ("_start" === e.id || "_end" === e.id))(n) && (n = n[e ? "firstChild" : "lastChild"]), Xo(n) && 0 === n.data.length && (n = e ? t.previousSibling || t.nextSibling : t.nextSibling || t.previousSibling), i.remove(t, !0), n
                        }
                        return null
                    },
                    f = t => {
                        let n, o, r = zm(i, t, s, t.collapsed);
                        if (a.split) {
                            if (r = Df(r), n = sv(e, r, !0), o = sv(e, r), n !== o) {
                                if (n = av(n, !0), o = av(o, !1), rv(i, n, o)) {
                                    const e = I.from(n.firstChild).getOr(n);
                                    return d(lv(i, e, !0, "span", {
                                        id: "_start",
                                        "data-mce-type": "bookmark"
                                    })), void m(!0)
                                }
                                if (rv(i, o, n)) {
                                    const e = I.from(o.lastChild).getOr(o);
                                    return d(lv(i, e, !1, "span", {
                                        id: "_end",
                                        "data-mce-type": "bookmark"
                                    })), void m(!1)
                                }
                                n = iv(i, n, "span", {
                                    id: "_start",
                                    "data-mce-type": "bookmark"
                                }), o = iv(i, o, "span", {
                                    id: "_end",
                                    "data-mce-type": "bookmark"
                                });
                                const e = i.createRng();
                                e.setStartAfter(n), e.setEndBefore(o), jm(i, e, (e => {
                                    q(e, (e => {
                                        Mu(e) || Mu(e.parentNode) || d(e)
                                    }))
                                })), d(n), d(o), n = m(!0), o = m()
                            } else n = o = d(n);
                            r.startContainer = n.parentNode ? n.parentNode : n, r.startOffset = i.nodeIndex(n), r.endContainer = o.parentNode ? o.parentNode : o, r.endOffset = i.nodeIndex(o) + 1
                        }
                        jm(i, r, (e => {
                            q(e, u)
                        }))
                    };
                if (o) {
                    if (sm(o)) {
                        const e = i.createRng();
                        e.setStartBefore(o), e.setEndAfter(o), f(e)
                    } else f(o);
                    Qm(e, t, o, n)
                } else l.isCollapsed() && Em(a) && !Xu(e).length ? Db(e, t, n, r) : (lm(e, (() => om(e, f)), (o => Em(a) && Eb(e, t, n, o))), e.nodeChanged()), ((e, t, n) => {
                    "removeformat" === t ? q(qb(e.selection), (t => {
                        q(zb, (n => e.dom.setStyle(t, n, ""))), uv(e.dom, t)
                    })) : jb(e.formatter, t).each((t => {
                        q(qb(e.selection), (o => mv(e.dom, o, t, n, null)))
                    }))
                })(e, t, n), Qm(e, t, o, n)
            })(e, t, n, o, r)
        },
        hv = (e, t, n, o, r) => fv(e, t, n, o, r).fold(L, (t => (e.dom.rename(o, t), !0)), M),
        bv = Dt.each,
        vv = Dt.each,
        yv = (e, t, n, o) => {
            if (vv(n.styles, ((n, r) => {
                    e.setStyle(t, r, pm(n, o))
                })), n.styles) {
                const n = e.getAttrib(t, "style");
                n && e.setAttrib(t, "data-mce-style", n)
            }
        },
        Cv = (e, t, n, o) => {
            const r = e.formatter.get(t),
                s = r[0],
                a = !o && e.selection.isCollapsed(),
                i = e.dom,
                l = e.selection,
                d = (e, t = s) => {
                    w(t.onformat) && t.onformat(e, t, n, o), yv(i, e, t, n), vv(t.attributes, ((t, o) => {
                        i.setAttrib(e, o, pm(t, n))
                    })), vv(t.classes, (t => {
                        const o = pm(t, n);
                        i.hasClass(e, o) || i.addClass(e, o)
                    }))
                },
                c = (e, t) => {
                    let n = !1;
                    return vv(e, (e => !(!km(e) || ("false" !== i.getContentEditable(t) || e.ceFalseOverride) && (!C(e.collapsed) || e.collapsed === a) && i.is(t, e.selector) && !ku(t) && (d(t, e), n = !0, 1)))), n
                },
                u = e => {
                    if (m(e)) {
                        const t = i.create(e);
                        return d(t), t
                    }
                    return null
                },
                f = (o, a, i) => {
                    const l = [];
                    let m = !0;
                    const f = s.inline || s.block,
                        g = u(f);
                    jm(o, a, (a => {
                        let u;
                        const p = a => {
                            let h = !1,
                                b = m,
                                v = !1;
                            const y = a.parentNode,
                                w = y.nodeName.toLowerCase(),
                                x = o.getContentEditable(a);
                            C(x) && (b = m, m = "true" === x, h = !0, v = gm(e, a));
                            const k = m && !h;
                            if (nr(a) && !((e, t, n, o) => {
                                    if (fd(e) && Em(t) && n.parentNode) {
                                        const t = la(e.schema),
                                            r = pb(vn(n), (e => ku(e.dom)));
                                        return Ee(t, o) && ps(vn(n.parentNode), !1) && !r
                                    }
                                    return !1
                                })(e, s, a, w)) return u = null, void(xm(s) && o.remove(a));
                            if ((o => (e => xm(e) && !0 === e.wrapper)(s) && kb(e, o, t, n))(a)) u = null;
                            else {
                                if (((t, n, o) => {
                                        const r = (e => xm(e) && !0 !== e.wrapper)(s) && um(e.schema, t) && mm(e, n, f);
                                        return o && r
                                    })(a, w, k)) {
                                    const e = o.rename(a, f);
                                    return d(e), l.push(e), void(u = null)
                                }
                                if (km(s)) {
                                    let e = c(r, a);
                                    if (!e && C(y) && Sm(s) && (e = c(r, y)), !Em(s) || e) return void(u = null)
                                }
                                C(g) && ((t, n, r, a) => {
                                    const l = t.nodeName.toLowerCase(),
                                        d = mm(e, f, l) && mm(e, n, f),
                                        c = !i && Xo(t) && Lr(t.data),
                                        u = ku(t),
                                        m = !Em(s) || !o.isBlock(t);
                                    return (r || a) && d && !c && !u && m
                                })(a, w, k, v) ? (u || (u = o.clone(g, !1), y.insertBefore(u, a), l.push(u)), v && h && (m = b), u.appendChild(a)) : (u = null, q(ce(a.childNodes), p), h && (m = b), u = null)
                            }
                        };
                        q(a, p)
                    })), !0 === s.links && q(l, (e => {
                        const t = e => {
                            "A" === e.nodeName && d(e, s), q(ce(e.childNodes), t)
                        };
                        t(e)
                    })), q(l, (a => {
                        const i = (e => {
                            let t = 0;
                            return q(e.childNodes, (e => {
                                (e => C(e) && Xo(e) && 0 === e.length)(e) || Mu(e) || t++
                            })), t
                        })(a);
                        !(l.length > 1) && o.isBlock(a) || 0 !== i ? (Em(s) || xm(s) && s.wrapper) && (s.exact || 1 !== i || (a = (e => {
                            const t = J(e.childNodes, am).filter((e => "false" !== o.getContentEditable(e) && wb(o, e, s)));
                            return t.map((t => {
                                const n = o.clone(t, !1);
                                return d(n), o.replace(n, e, !0), o.remove(t, !0), n
                            })).getOr(e)
                        })(a)), ((e, t, n, o) => {
                            bv(t, (t => {
                                Em(t) && bv(e.dom.select(t.inline, o), (o => {
                                    Kb(o) && hv(e, t, n, o, t.exact ? o : null)
                                })), ((e, t, n) => {
                                    if (t.clear_child_styles) {
                                        const o = t.links ? "*:not(a)" : "*";
                                        Wb(e.select(o, n), (n => {
                                            Kb(n) && im(n) && Wb(t.styles, ((t, o) => {
                                                e.setStyle(n, o, "")
                                            }))
                                        }))
                                    }
                                })(e.dom, t, o)
                            }))
                        })(e, r, n, a), ((e, t, n, o, r) => {
                            const s = r.parentNode;
                            kb(e, s, n, o) && hv(e, t, o, r) || t.merge_with_parents && s && e.dom.getParent(s, (s => !!kb(e, s, n, o) && (hv(e, t, o, r), !0)))
                        })(e, s, t, n, a), ((e, t, n, o) => {
                            if (t.styles && t.styles.backgroundColor) {
                                const r = Jb(e, "fontSize");
                                Qb(o, (e => r(e) && im(e)), Zb(e, "backgroundColor", pm(t.styles.backgroundColor, n)))
                            }
                        })(o, s, n, a), ((e, t, n, o) => {
                            const r = t => {
                                if (jo(t) && jo(t.parentNode) && im(t)) {
                                    const n = ym(e, t.parentNode);
                                    e.getStyle(t, "color") && n ? e.setStyle(t, "text-decoration", n) : e.getStyle(t, "text-decoration") === n && e.setStyle(t, "text-decoration", null)
                                }
                            };
                            t.styles && (t.styles.color || t.styles.textDecoration) && (Dt.walk(o, r, "childNodes"), r(o))
                        })(o, s, 0, a), ((e, t, n, o) => {
                            if (Em(t) && ("sub" === t.inline || "sup" === t.inline)) {
                                const n = Jb(e, "fontSize");
                                Qb(o, (e => n(e) && im(e)), Zb(e, "fontSize", ""));
                                const r = G(e.select("sup" === t.inline ? "sub" : "sup", o), im);
                                e.remove(r, !0)
                            }
                        })(o, s, 0, a), Xb(e, s, 0, a)) : o.remove(a, !0)
                    }))
                },
                g = sm(o) ? o : l.getNode();
            if ("false" === i.getContentEditable(g) && !gm(e, g)) return c(r, o = g), void Xm(e, t, o, n);
            if (s) {
                if (o)
                    if (sm(o)) {
                        if (!c(r, o)) {
                            const e = i.createRng();
                            e.setStartBefore(o), e.setEndAfter(o), f(i, zm(i, e, r), !0)
                        }
                    } else f(i, o, !0);
                else a && Em(s) && !Xu(e).length ? ((e, t, n) => {
                    let o;
                    const r = e.selection,
                        s = e.formatter.get(t);
                    if (!s) return;
                    const a = r.getRng();
                    let i = a.startOffset;
                    const l = a.startContainer.nodeValue;
                    o = Eu(e.getBody(), r.getStart());
                    const d = /[^\s\u00a0\u00ad\u200b\ufeff]/;
                    if (l && i > 0 && i < l.length && d.test(l.charAt(i)) && d.test(l.charAt(i - 1))) {
                        const o = r.getBookmark();
                        a.collapse(!0);
                        let i = zm(e.dom, a, s);
                        i = Df(i), e.formatter.apply(t, n, i), r.moveToBookmark(o)
                    } else {
                        let s = o ? Nb(o) : null;
                        o && (null == s ? void 0 : s.data) === Sb || (c = e.getDoc(), u = Rb(!0).dom, o = c.importNode(u, !0), s = o.firstChild, a.insertNode(o), i = 1), e.formatter.apply(t, n, o), r.setCursorLocation(s, i)
                    }
                    var c, u
                })(e, t, n) : (l.setRng(rb(l.getRng())), lm(e, (() => {
                    om(e, ((e, t) => {
                        const n = t ? e : zm(i, e, r);
                        f(i, n, !1)
                    }))
                }), M), e.nodeChanged()), jb(e.formatter, t).each((t => {
                    q((e => G((e => {
                        const t = e.getSelectedBlocks(),
                            n = e.getRng();
                        if (e.isCollapsed()) return [];
                        if (1 === t.length) return Hb(n, t[0]) && $b(n, t[0]) ? t : [];
                        {
                            const e = le(t).filter((e => Hb(n, e))).toArray(),
                                o = de(t).filter((e => $b(n, e))).toArray(),
                                r = t.slice(1, -1);
                            return e.concat(r).concat(o)
                        }
                    })(e), Vb(e.dom)))(e.selection), (e => yv(i, e, t, n)))
                }));
                ((e, t) => {
                    ke(Fb, e) && q(Fb[e], (e => {
                        e(t)
                    }))
                })(t, e)
            }
            Xm(e, t, o, n)
        },
        wv = (e, t, n, o) => {
            (o || e.selection.isEditable()) && Cv(e, t, n, o)
        },
        xv = e => ke(e, "vars"),
        kv = e => e.selection.getStart(),
        Ev = (e, t, n, o, r) => Q(t, (t => {
            const s = e.formatter.matchNode(t, n, null != r ? r : {}, o);
            return !v(s)
        }), (t => !!yb(e, t, n) || !o && C(e.formatter.matchNode(t, n, r, !0)))),
        Sv = (e, t) => {
            const n = null != t ? t : kv(e);
            return G(Cm(e.dom, n), (e => jo(e) && !Wo(e)))
        },
        _v = (e, t, n) => {
            const o = Sv(e, t);
            ge(n, ((n, r) => {
                const s = n => {
                    const s = Ev(e, o, r, n.similar, xv(n) ? n.vars : void 0),
                        a = s.isSome();
                    if (n.state.get() !== a) {
                        n.state.set(a);
                        const e = s.getOr(t);
                        xv(n) ? n.callback(a, {
                            node: e,
                            format: r,
                            parents: o
                        }) : q(n.callbacks, (t => t(a, {
                            node: e,
                            format: r,
                            parents: o
                        })))
                    }
                };
                q([n.withSimilar, n.withoutSimilar], s), q(n.withVars, s)
            }))
        },
        Nv = Dt.explode,
        Rv = () => {
            const e = {};
            return {
                addFilter: (t, n) => {
                    q(Nv(t), (t => {
                        ke(e, t) || (e[t] = {
                            name: t,
                            callbacks: []
                        }), e[t].callbacks.push(n)
                    }))
                },
                getFilters: () => we(e),
                removeFilter: (t, n) => {
                    q(Nv(t), (t => {
                        if (ke(e, t))
                            if (C(n)) {
                                const o = e[t],
                                    r = G(o.callbacks, (e => e !== n));
                                r.length > 0 ? o.callbacks = r : delete e[t]
                            } else delete e[t]
                    }))
                }
            }
        },
        Av = (e, t, n) => {
            var o;
            const r = ua();
            t.convert_fonts_to_spans && ((e, t, n) => {
                e.addNodeFilter("font", (e => {
                    q(e, (e => {
                        const o = t.parse(e.attr("style")),
                            r = e.attr("color"),
                            s = e.attr("face"),
                            a = e.attr("size");
                        r && (o.color = r), s && (o["font-family"] = s), a && Xe(a).each((e => {
                            o["font-size"] = n[e - 1]
                        })), e.name = "span", e.attr("style", t.serialize(o)), ((e, t) => {
                            q(["color", "face", "size"], (t => {
                                e.attr(t, null)
                            }))
                        })(e)
                    }))
                }))
            })(e, r, Dt.explode(null !== (o = t.font_size_legacy_values) && void 0 !== o ? o : "")), ((e, t, n) => {
                e.addNodeFilter("strike", (e => {
                    const o = "html4" !== t.type;
                    q(e, (e => {
                        if (o) e.name = "s";
                        else {
                            const t = n.parse(e.attr("style"));
                            t["text-decoration"] = "line-through", e.name = "span", e.attr("style", n.serialize(t))
                        }
                    }))
                }))
            })(e, n, r)
        },
        Ov = (e, t) => {
            e.addNodeFilter("br", ((e, n, o) => {
                const r = Dt.extend({}, t.getBlockElements()),
                    s = t.getNonEmptyElements(),
                    a = t.getWhitespaceElements();
                r.body = 1;
                const i = e => e.name in r && ((e, t) => 1 === t.type && Ss(e, t.name) && v(t.attr(hs)))(t, e);
                for (let n = 0, l = e.length; n < l; n++) {
                    let l = e[n],
                        d = l.parent;
                    if (d && r[d.name] && l === d.lastChild) {
                        let e = l.prev;
                        for (; e;) {
                            const t = e.name;
                            if ("span" !== t || "bookmark" !== e.attr("data-mce-type")) {
                                "br" === t && (l = null);
                                break
                            }
                            e = e.prev
                        }
                        if (l && (l.remove(), Zh(t, s, a, d))) {
                            const e = t.getElementRule(d.name);
                            e && (e.removeEmpty ? d.remove() : e.paddEmpty && Qh(o, i, d))
                        }
                    } else {
                        let e = l;
                        for (; d && d.firstChild === e && d.lastChild === e && (e = d, !r[d.name]);) d = d.parent;
                        if (e === d) {
                            const e = new Ug("#text", 3);
                            e.value = fr, l.replace(e)
                        }
                    }
                }
            }))
        },
        Tv = e => {
            const [t, ...n] = e.split(","), o = n.join(","), r = /data:([^/]+\/[^;]+)(;.+)?/.exec(t);
            if (r) {
                const e = ";base64" === r[2],
                    t = e ? (e => {
                        const t = /([a-z0-9+\/=\s]+)/i.exec(e);
                        return t ? t[1] : ""
                    })(o) : decodeURIComponent(o);
                return I.some({
                    type: r[1],
                    data: t,
                    base64Encoded: e
                })
            }
            return I.none()
        },
        Bv = (e, t, n = !0) => {
            let o = t;
            if (n) try {
                o = atob(t)
            } catch (e) {
                return I.none()
            }
            const r = new Uint8Array(o.length);
            for (let e = 0; e < r.length; e++) r[e] = o.charCodeAt(e);
            return I.some(new Blob([r], {
                type: e
            }))
        },
        Dv = e => new Promise(((t, n) => {
            const o = new FileReader;
            o.onloadend = () => {
                t(o.result)
            }, o.onerror = () => {
                var e;
                n(null === (e = o.error) || void 0 === e ? void 0 : e.message)
            }, o.readAsDataURL(e)
        }));
    let Pv = 0;
    const Lv = (e, t, n) => Tv(e).bind((({
            data: e,
            type: o,
            base64Encoded: r
        }) => {
            if (t && !r) return I.none();
            {
                const t = r ? e : btoa(e);
                return n(t, o)
            }
        })),
        Mv = (e, t, n) => {
            const o = e.create("blobid" + Pv++, t, n);
            return e.add(o), o
        },
        Iv = (e, t, n = !1) => Lv(t, n, ((t, n) => I.from(e.getByData(t, n)).orThunk((() => Bv(n, t).map((n => Mv(e, n, t))))))),
        Fv = (e, t) => {
            const n = e.schema;
            t.remove_trailing_brs && Ov(e, n), e.addAttributeFilter("href", (e => {
                let n = e.length;
                const o = e => {
                    const t = e ? Dt.trim(e) : "";
                    return /\b(noopener)\b/g.test(t) ? t : (e => e.split(" ").filter((e => e.length > 0)).concat(["noopener"]).sort().join(" "))(t)
                };
                if (!t.allow_unsafe_link_target)
                    for (; n--;) {
                        const t = e[n];
                        "a" === t.name && "_blank" === t.attr("target") && t.attr("rel", o(t.attr("rel")))
                    }
            })), t.allow_html_in_named_anchor || e.addAttributeFilter("id,name", (e => {
                let t, n, o, r, s = e.length;
                for (; s--;)
                    if (r = e[s], "a" === r.name && r.firstChild && !r.attr("href"))
                        for (o = r.parent, t = r.lastChild; t && o;) n = t.prev, o.insert(t, r), t = n
            })), t.fix_list_elements && e.addNodeFilter("ul,ol", (e => {
                let t, n, o = e.length;
                for (; o--;)
                    if (t = e[o], n = t.parent, n && ("ul" === n.name || "ol" === n.name))
                        if (t.prev && "li" === t.prev.name) t.prev.append(t);
                        else {
                            const e = new Ug("li", 1);
                            e.attr("style", "list-style-type: none"), t.wrap(e)
                        }
            }));
            const o = n.getValidClasses();
            t.validate && o && e.addAttributeFilter("class", (e => {
                var t;
                let n = e.length;
                for (; n--;) {
                    const r = e[n],
                        s = null !== (t = r.attr("class")) && void 0 !== t ? t : "",
                        a = Dt.explode(s, " ");
                    let i = "";
                    for (let e = 0; e < a.length; e++) {
                        const t = a[e];
                        let n = !1,
                            s = o["*"];
                        s && s[t] && (n = !0), s = o[r.name], !n && s && s[t] && (n = !0), n && (i && (i += " "), i += t)
                    }
                    i.length || (i = null), r.attr("class", i)
                }
            })), ((e, t) => {
                const {
                    blob_cache: n
                } = t;
                if (n) {
                    const t = e => {
                        const t = e.attr("src");
                        (e => e.attr("src") === At.transparentSrc || C(e.attr("data-mce-placeholder")))(e) || (e => C(e.attr("data-mce-bogus")))(e) || y(t) || Iv(n, t, !0).each((t => {
                            e.attr("src", t.blobUri())
                        }))
                    };
                    e.addAttributeFilter("src", (e => q(e, t)))
                }
            })(e, t)
        };

    function Uv(e) {
        return Uv = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(e) {
            return typeof e
        } : function(e) {
            return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e
        }, Uv(e)
    }

    function zv(e, t) {
        return zv = Object.setPrototypeOf || function(e, t) {
            return e.__proto__ = t, e
        }, zv(e, t)
    }

    function jv(e, t, n) {
        return jv = function() {
            if ("undefined" == typeof Reflect || !Reflect.construct) return !1;
            if (Reflect.construct.sham) return !1;
            if ("function" == typeof Proxy) return !0;
            try {
                return Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], (function() {}))), !0
            } catch (e) {
                return !1
            }
        }() ? Reflect.construct : function(e, t, n) {
            var o = [null];
            o.push.apply(o, t);
            var r = new(Function.bind.apply(e, o));
            return n && zv(r, n.prototype), r
        }, jv.apply(null, arguments)
    }

    function Hv(e) {
        return function(e) {
            if (Array.isArray(e)) return $v(e)
        }(e) || function(e) {
            if ("undefined" != typeof Symbol && null != e[Symbol.iterator] || null != e["@@iterator"]) return Array.from(e)
        }(e) || function(e, t) {
            if (e) {
                if ("string" == typeof e) return $v(e, t);
                var n = Object.prototype.toString.call(e).slice(8, -1);
                return "Object" === n && e.constructor && (n = e.constructor.name), "Map" === n || "Set" === n ? Array.from(e) : "Arguments" === n || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n) ? $v(e, t) : void 0
            }
        }(e) || function() {
            throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")
        }()
    }

    function $v(e, t) {
        (null == t || t > e.length) && (t = e.length);
        for (var n = 0, o = new Array(t); n < t; n++) o[n] = e[n];
        return o
    }
    var Vv = Object.hasOwnProperty,
        qv = Object.setPrototypeOf,
        Wv = Object.isFrozen,
        Kv = Object.getPrototypeOf,
        Gv = Object.getOwnPropertyDescriptor,
        Yv = Object.freeze,
        Xv = Object.seal,
        Qv = Object.create,
        Jv = "undefined" != typeof Reflect && Reflect,
        Zv = Jv.apply,
        ey = Jv.construct;
    Zv || (Zv = function(e, t, n) {
        return e.apply(t, n)
    }), Yv || (Yv = function(e) {
        return e
    }), Xv || (Xv = function(e) {
        return e
    }), ey || (ey = function(e, t) {
        return jv(e, Hv(t))
    });
    var ty, ny = my(Array.prototype.forEach),
        oy = my(Array.prototype.pop),
        ry = my(Array.prototype.push),
        sy = my(String.prototype.toLowerCase),
        ay = my(String.prototype.match),
        iy = my(String.prototype.replace),
        ly = my(String.prototype.indexOf),
        dy = my(String.prototype.trim),
        cy = my(RegExp.prototype.test),
        uy = (ty = TypeError, function() {
            for (var e = arguments.length, t = new Array(e), n = 0; n < e; n++) t[n] = arguments[n];
            return ey(ty, t)
        });

    function my(e) {
        return function(t) {
            for (var n = arguments.length, o = new Array(n > 1 ? n - 1 : 0), r = 1; r < n; r++) o[r - 1] = arguments[r];
            return Zv(e, t, o)
        }
    }

    function fy(e, t) {
        qv && qv(e, null);
        for (var n = t.length; n--;) {
            var o = t[n];
            if ("string" == typeof o) {
                var r = sy(o);
                r !== o && (Wv(t) || (t[n] = r), o = r)
            }
            e[o] = !0
        }
        return e
    }

    function gy(e) {
        var t, n = Qv(null);
        for (t in e) Zv(Vv, e, [t]) && (n[t] = e[t]);
        return n
    }

    function py(e, t) {
        for (; null !== e;) {
            var n = Gv(e, t);
            if (n) {
                if (n.get) return my(n.get);
                if ("function" == typeof n.value) return my(n.value)
            }
            e = Kv(e)
        }
        return function(e) {
            return console.warn("fallback value for", e), null
        }
    }
    var hy = Yv(["a", "abbr", "acronym", "address", "area", "article", "aside", "audio", "b", "bdi", "bdo", "big", "blink", "blockquote", "body", "br", "button", "canvas", "caption", "center", "cite", "code", "col", "colgroup", "content", "data", "datalist", "dd", "decorator", "del", "details", "dfn", "dialog", "dir", "div", "dl", "dt", "element", "em", "fieldset", "figcaption", "figure", "font", "footer", "form", "h1", "h2", "h3", "h4", "h5", "h6", "head", "header", "hgroup", "hr", "html", "i", "img", "input", "ins", "kbd", "label", "legend", "li", "main", "map", "mark", "marquee", "menu", "menuitem", "meter", "nav", "nobr", "ol", "optgroup", "option", "output", "p", "picture", "pre", "progress", "q", "rp", "rt", "ruby", "s", "samp", "section", "select", "shadow", "small", "source", "spacer", "span", "strike", "strong", "style", "sub", "summary", "sup", "table", "tbody", "td", "template", "textarea", "tfoot", "th", "thead", "time", "tr", "track", "tt", "u", "ul", "var", "video", "wbr"]),
        by = Yv(["svg", "a", "altglyph", "altglyphdef", "altglyphitem", "animatecolor", "animatemotion", "animatetransform", "circle", "clippath", "defs", "desc", "ellipse", "filter", "font", "g", "glyph", "glyphref", "hkern", "image", "line", "lineargradient", "marker", "mask", "metadata", "mpath", "path", "pattern", "polygon", "polyline", "radialgradient", "rect", "stop", "style", "switch", "symbol", "text", "textpath", "title", "tref", "tspan", "view", "vkern"]),
        vy = Yv(["feBlend", "feColorMatrix", "feComponentTransfer", "feComposite", "feConvolveMatrix", "feDiffuseLighting", "feDisplacementMap", "feDistantLight", "feFlood", "feFuncA", "feFuncB", "feFuncG", "feFuncR", "feGaussianBlur", "feImage", "feMerge", "feMergeNode", "feMorphology", "feOffset", "fePointLight", "feSpecularLighting", "feSpotLight", "feTile", "feTurbulence"]),
        yy = Yv(["animate", "color-profile", "cursor", "discard", "fedropshadow", "font-face", "font-face-format", "font-face-name", "font-face-src", "font-face-uri", "foreignobject", "hatch", "hatchpath", "mesh", "meshgradient", "meshpatch", "meshrow", "missing-glyph", "script", "set", "solidcolor", "unknown", "use"]),
        Cy = Yv(["math", "menclose", "merror", "mfenced", "mfrac", "mglyph", "mi", "mlabeledtr", "mmultiscripts", "mn", "mo", "mover", "mpadded", "mphantom", "mroot", "mrow", "ms", "mspace", "msqrt", "mstyle", "msub", "msup", "msubsup", "mtable", "mtd", "mtext", "mtr", "munder", "munderover"]),
        wy = Yv(["maction", "maligngroup", "malignmark", "mlongdiv", "mscarries", "mscarry", "msgroup", "mstack", "msline", "msrow", "semantics", "annotation", "annotation-xml", "mprescripts", "none"]),
        xy = Yv(["#text"]),
        ky = Yv(["accept", "action", "align", "alt", "autocapitalize", "autocomplete", "autopictureinpicture", "autoplay", "background", "bgcolor", "border", "capture", "cellpadding", "cellspacing", "checked", "cite", "class", "clear", "color", "cols", "colspan", "controls", "controlslist", "coords", "crossorigin", "datetime", "decoding", "default", "dir", "disabled", "disablepictureinpicture", "disableremoteplayback", "download", "draggable", "enctype", "enterkeyhint", "face", "for", "headers", "height", "hidden", "high", "href", "hreflang", "id", "inputmode", "integrity", "ismap", "kind", "label", "lang", "list", "loading", "loop", "low", "max", "maxlength", "media", "method", "min", "minlength", "multiple", "muted", "name", "nonce", "noshade", "novalidate", "nowrap", "open", "optimum", "pattern", "placeholder", "playsinline", "poster", "preload", "pubdate", "radiogroup", "readonly", "rel", "required", "rev", "reversed", "role", "rows", "rowspan", "spellcheck", "scope", "selected", "shape", "size", "sizes", "span", "srclang", "start", "src", "srcset", "step", "style", "summary", "tabindex", "title", "translate", "type", "usemap", "valign", "value", "width", "xmlns", "slot"]),
        Ey = Yv(["accent-height", "accumulate", "additive", "alignment-baseline", "ascent", "attributename", "attributetype", "azimuth", "basefrequency", "baseline-shift", "begin", "bias", "by", "class", "clip", "clippathunits", "clip-path", "clip-rule", "color", "color-interpolation", "color-interpolation-filters", "color-profile", "color-rendering", "cx", "cy", "d", "dx", "dy", "diffuseconstant", "direction", "display", "divisor", "dur", "edgemode", "elevation", "end", "fill", "fill-opacity", "fill-rule", "filter", "filterunits", "flood-color", "flood-opacity", "font-family", "font-size", "font-size-adjust", "font-stretch", "font-style", "font-variant", "font-weight", "fx", "fy", "g1", "g2", "glyph-name", "glyphref", "gradientunits", "gradienttransform", "height", "href", "id", "image-rendering", "in", "in2", "k", "k1", "k2", "k3", "k4", "kerning", "keypoints", "keysplines", "keytimes", "lang", "lengthadjust", "letter-spacing", "kernelmatrix", "kernelunitlength", "lighting-color", "local", "marker-end", "marker-mid", "marker-start", "markerheight", "markerunits", "markerwidth", "maskcontentunits", "maskunits", "max", "mask", "media", "method", "mode", "min", "name", "numoctaves", "offset", "operator", "opacity", "order", "orient", "orientation", "origin", "overflow", "paint-order", "path", "pathlength", "patterncontentunits", "patterntransform", "patternunits", "points", "preservealpha", "preserveaspectratio", "primitiveunits", "r", "rx", "ry", "radius", "refx", "refy", "repeatcount", "repeatdur", "restart", "result", "rotate", "scale", "seed", "shape-rendering", "specularconstant", "specularexponent", "spreadmethod", "startoffset", "stddeviation", "stitchtiles", "stop-color", "stop-opacity", "stroke-dasharray", "stroke-dashoffset", "stroke-linecap", "stroke-linejoin", "stroke-miterlimit", "stroke-opacity", "stroke", "stroke-width", "style", "surfacescale", "systemlanguage", "tabindex", "targetx", "targety", "transform", "transform-origin", "text-anchor", "text-decoration", "text-rendering", "textlength", "type", "u1", "u2", "unicode", "values", "viewbox", "visibility", "version", "vert-adv-y", "vert-origin-x", "vert-origin-y", "width", "word-spacing", "wrap", "writing-mode", "xchannelselector", "ychannelselector", "x", "x1", "x2", "xmlns", "y", "y1", "y2", "z", "zoomandpan"]),
        Sy = Yv(["accent", "accentunder", "align", "bevelled", "close", "columnsalign", "columnlines", "columnspan", "denomalign", "depth", "dir", "display", "displaystyle", "encoding", "fence", "frame", "height", "href", "id", "largeop", "length", "linethickness", "lspace", "lquote", "mathbackground", "mathcolor", "mathsize", "mathvariant", "maxsize", "minsize", "movablelimits", "notation", "numalign", "open", "rowalign", "rowlines", "rowspacing", "rowspan", "rspace", "rquote", "scriptlevel", "scriptminsize", "scriptsizemultiplier", "selection", "separator", "separators", "stretchy", "subscriptshift", "supscriptshift", "symmetric", "voffset", "width", "xmlns"]),
        _y = Yv(["xlink:href", "xml:id", "xlink:title", "xml:space", "xmlns:xlink"]),
        Ny = Xv(/\{\{[\w\W]*|[\w\W]*\}\}/gm),
        Ry = Xv(/<%[\w\W]*|[\w\W]*%>/gm),
        Ay = Xv(/^data-[\-\w.\u00B7-\uFFFF]/),
        Oy = Xv(/^aria-[\-\w]+$/),
        Ty = Xv(/^(?:(?:(?:f|ht)tps?|mailto|tel|callto|cid|xmpp):|[^a-z]|[a-z+.\-]+(?:[^a-z+.\-:]|$))/i),
        By = Xv(/^(?:\w+script|data):/i),
        Dy = Xv(/[\u0000-\u0020\u00A0\u1680\u180E\u2000-\u2029\u205F\u3000]/g),
        Py = Xv(/^html$/i),
        Ly = function() {
            return "undefined" == typeof window ? null : window
        },
        My = function e() {
            var t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : Ly(),
                n = function(t) {
                    return e(t)
                };
            if (n.version = "2.3.8", n.removed = [], !t || !t.document || 9 !== t.document.nodeType) return n.isSupported = !1, n;
            var o = t.document,
                r = t.document,
                s = t.DocumentFragment,
                a = t.HTMLTemplateElement,
                i = t.Node,
                l = t.Element,
                d = t.NodeFilter,
                c = t.NamedNodeMap,
                u = void 0 === c ? t.NamedNodeMap || t.MozNamedAttrMap : c,
                m = t.HTMLFormElement,
                f = t.DOMParser,
                g = t.trustedTypes,
                p = l.prototype,
                h = py(p, "cloneNode"),
                b = py(p, "nextSibling"),
                v = py(p, "childNodes"),
                y = py(p, "parentNode");
            if ("function" == typeof a) {
                var C = r.createElement("template");
                C.content && C.content.ownerDocument && (r = C.content.ownerDocument)
            }
            var w = function(e, t) {
                    if ("object" !== Uv(e) || "function" != typeof e.createPolicy) return null;
                    var n = null,
                        o = "data-tt-policy-suffix";
                    t.currentScript && t.currentScript.hasAttribute(o) && (n = t.currentScript.getAttribute(o));
                    var r = "dompurify" + (n ? "#" + n : "");
                    try {
                        return e.createPolicy(r, {
                            createHTML: function(e) {
                                return e
                            }
                        })
                    } catch (e) {
                        return console.warn("TrustedTypes policy " + r + " could not be created."), null
                    }
                }(g, o),
                x = w ? w.createHTML("") : "",
                k = r,
                E = k.implementation,
                S = k.createNodeIterator,
                _ = k.createDocumentFragment,
                N = k.getElementsByTagName,
                R = o.importNode,
                A = {};
            try {
                A = gy(r).documentMode ? r.documentMode : {}
            } catch (e) {}
            var O = {};
            n.isSupported = "function" == typeof y && E && void 0 !== E.createHTMLDocument && 9 !== A;
            var T, B, D = Ny,
                P = Ry,
                L = Ay,
                M = Oy,
                I = By,
                F = Dy,
                U = Ty,
                z = null,
                j = fy({}, [].concat(Hv(hy), Hv(by), Hv(vy), Hv(Cy), Hv(xy))),
                H = null,
                $ = fy({}, [].concat(Hv(ky), Hv(Ey), Hv(Sy), Hv(_y))),
                V = Object.seal(Object.create(null, {
                    tagNameCheck: {
                        writable: !0,
                        configurable: !1,
                        enumerable: !0,
                        value: null
                    },
                    attributeNameCheck: {
                        writable: !0,
                        configurable: !1,
                        enumerable: !0,
                        value: null
                    },
                    allowCustomizedBuiltInElements: {
                        writable: !0,
                        configurable: !1,
                        enumerable: !0,
                        value: !1
                    }
                })),
                q = null,
                W = null,
                K = !0,
                G = !0,
                Y = !1,
                X = !1,
                Q = !1,
                J = !1,
                Z = !1,
                ee = !1,
                te = !1,
                ne = !1,
                oe = !0,
                re = !0,
                se = !1,
                ae = {},
                ie = null,
                le = fy({}, ["annotation-xml", "audio", "colgroup", "desc", "foreignobject", "head", "iframe", "math", "mi", "mn", "mo", "ms", "mtext", "noembed", "noframes", "noscript", "plaintext", "script", "style", "svg", "template", "thead", "title", "video", "xmp"]),
                de = null,
                ce = fy({}, ["audio", "video", "img", "source", "image", "track"]),
                ue = null,
                me = fy({}, ["alt", "class", "for", "id", "label", "name", "pattern", "placeholder", "role", "summary", "title", "value", "style", "xmlns"]),
                fe = "http://www.w3.org/1998/Math/MathML",
                ge = "http://www.w3.org/2000/svg",
                pe = "http://www.w3.org/1999/xhtml",
                he = pe,
                be = !1,
                ve = ["application/xhtml+xml", "text/html"],
                ye = null,
                Ce = r.createElement("form"),
                we = function(e) {
                    return e instanceof RegExp || e instanceof Function
                },
                xe = function(e) {
                    ye && ye === e || (e && "object" === Uv(e) || (e = {}), e = gy(e), z = "ALLOWED_TAGS" in e ? fy({}, e.ALLOWED_TAGS) : j, H = "ALLOWED_ATTR" in e ? fy({}, e.ALLOWED_ATTR) : $, ue = "ADD_URI_SAFE_ATTR" in e ? fy(gy(me), e.ADD_URI_SAFE_ATTR) : me, de = "ADD_DATA_URI_TAGS" in e ? fy(gy(ce), e.ADD_DATA_URI_TAGS) : ce, ie = "FORBID_CONTENTS" in e ? fy({}, e.FORBID_CONTENTS) : le, q = "FORBID_TAGS" in e ? fy({}, e.FORBID_TAGS) : {}, W = "FORBID_ATTR" in e ? fy({}, e.FORBID_ATTR) : {}, ae = "USE_PROFILES" in e && e.USE_PROFILES, K = !1 !== e.ALLOW_ARIA_ATTR, G = !1 !== e.ALLOW_DATA_ATTR, Y = e.ALLOW_UNKNOWN_PROTOCOLS || !1, X = e.SAFE_FOR_TEMPLATES || !1, Q = e.WHOLE_DOCUMENT || !1, ee = e.RETURN_DOM || !1, te = e.RETURN_DOM_FRAGMENT || !1, ne = e.RETURN_TRUSTED_TYPE || !1, Z = e.FORCE_BODY || !1, oe = !1 !== e.SANITIZE_DOM, re = !1 !== e.KEEP_CONTENT, se = e.IN_PLACE || !1, U = e.ALLOWED_URI_REGEXP || U, he = e.NAMESPACE || pe, e.CUSTOM_ELEMENT_HANDLING && we(e.CUSTOM_ELEMENT_HANDLING.tagNameCheck) && (V.tagNameCheck = e.CUSTOM_ELEMENT_HANDLING.tagNameCheck), e.CUSTOM_ELEMENT_HANDLING && we(e.CUSTOM_ELEMENT_HANDLING.attributeNameCheck) && (V.attributeNameCheck = e.CUSTOM_ELEMENT_HANDLING.attributeNameCheck), e.CUSTOM_ELEMENT_HANDLING && "boolean" == typeof e.CUSTOM_ELEMENT_HANDLING.allowCustomizedBuiltInElements && (V.allowCustomizedBuiltInElements = e.CUSTOM_ELEMENT_HANDLING.allowCustomizedBuiltInElements), T = T = -1 === ve.indexOf(e.PARSER_MEDIA_TYPE) ? "text/html" : e.PARSER_MEDIA_TYPE, B = "application/xhtml+xml" === T ? function(e) {
                        return e
                    } : sy, X && (G = !1), te && (ee = !0), ae && (z = fy({}, Hv(xy)), H = [], !0 === ae.html && (fy(z, hy), fy(H, ky)), !0 === ae.svg && (fy(z, by), fy(H, Ey), fy(H, _y)), !0 === ae.svgFilters && (fy(z, vy), fy(H, Ey), fy(H, _y)), !0 === ae.mathMl && (fy(z, Cy), fy(H, Sy), fy(H, _y))), e.ADD_TAGS && (z === j && (z = gy(z)), fy(z, e.ADD_TAGS)), e.ADD_ATTR && (H === $ && (H = gy(H)), fy(H, e.ADD_ATTR)), e.ADD_URI_SAFE_ATTR && fy(ue, e.ADD_URI_SAFE_ATTR), e.FORBID_CONTENTS && (ie === le && (ie = gy(ie)), fy(ie, e.FORBID_CONTENTS)), re && (z["#text"] = !0), Q && fy(z, ["html", "head", "body"]), z.table && (fy(z, ["tbody"]), delete q.tbody), Yv && Yv(e), ye = e)
                },
                ke = fy({}, ["mi", "mo", "mn", "ms", "mtext"]),
                Ee = fy({}, ["foreignobject", "desc", "title", "annotation-xml"]),
                Se = fy({}, ["title", "style", "font", "a", "script"]),
                _e = fy({}, by);
            fy(_e, vy), fy(_e, yy);
            var Ne = fy({}, Cy);
            fy(Ne, wy);
            var Re = function(e) {
                    ry(n.removed, {
                        element: e
                    });
                    try {
                        e.parentNode.removeChild(e)
                    } catch (t) {
                        try {
                            e.outerHTML = x
                        } catch (t) {
                            e.remove()
                        }
                    }
                },
                Ae = function(e, t) {
                    try {
                        ry(n.removed, {
                            attribute: t.getAttributeNode(e),
                            from: t
                        })
                    } catch (e) {
                        ry(n.removed, {
                            attribute: null,
                            from: t
                        })
                    }
                    if (t.removeAttribute(e), "is" === e && !H[e])
                        if (ee || te) try {
                            Re(t)
                        } catch (e) {} else try {
                            t.setAttribute(e, "")
                        } catch (e) {}
                },
                Oe = function(e) {
                    var t, n;
                    if (Z) e = "<remove></remove>" + e;
                    else {
                        var o = ay(e, /^[\r\n\t ]+/);
                        n = o && o[0]
                    }
                    "application/xhtml+xml" === T && (e = '<html xmlns="http://www.w3.org/1999/xhtml"><head></head><body>' + e + "</body></html>");
                    var s = w ? w.createHTML(e) : e;
                    if (he === pe) try {
                        t = (new f).parseFromString(s, T)
                    } catch (e) {}
                    if (!t || !t.documentElement) {
                        t = E.createDocument(he, "template", null);
                        try {
                            t.documentElement.innerHTML = be ? "" : s
                        } catch (e) {}
                    }
                    var a = t.body || t.documentElement;
                    return e && n && a.insertBefore(r.createTextNode(n), a.childNodes[0] || null), he === pe ? N.call(t, Q ? "html" : "body")[0] : Q ? t.documentElement : a
                },
                Te = function(e) {
                    return S.call(e.ownerDocument || e, e, d.SHOW_ELEMENT | d.SHOW_COMMENT | d.SHOW_TEXT, null, !1)
                },
                Be = function(e) {
                    return "object" === Uv(i) ? e instanceof i : e && "object" === Uv(e) && "number" == typeof e.nodeType && "string" == typeof e.nodeName
                },
                De = function(e, t, o) {
                    O[e] && ny(O[e], (function(e) {
                        e.call(n, t, o, ye)
                    }))
                },
                Pe = function(e) {
                    var t, o;
                    if (De("beforeSanitizeElements", e, null), (o = e) instanceof m && ("string" != typeof o.nodeName || "string" != typeof o.textContent || "function" != typeof o.removeChild || !(o.attributes instanceof u) || "function" != typeof o.removeAttribute || "function" != typeof o.setAttribute || "string" != typeof o.namespaceURI || "function" != typeof o.insertBefore)) return Re(e), !0;
                    if (cy(/[\u0080-\uFFFF]/, e.nodeName)) return Re(e), !0;
                    var r = B(e.nodeName);
                    if (De("uponSanitizeElement", e, {
                            tagName: r,
                            allowedTags: z
                        }), e.hasChildNodes() && !Be(e.firstElementChild) && (!Be(e.content) || !Be(e.content.firstElementChild)) && cy(/<[/\w]/g, e.innerHTML) && cy(/<[/\w]/g, e.textContent)) return Re(e), !0;
                    if ("select" === r && cy(/<template/i, e.innerHTML)) return Re(e), !0;
                    if (!z[r] || q[r]) {
                        if (!q[r] && Me(r)) {
                            if (V.tagNameCheck instanceof RegExp && cy(V.tagNameCheck, r)) return !1;
                            if (V.tagNameCheck instanceof Function && V.tagNameCheck(r)) return !1
                        }
                        if (re && !ie[r]) {
                            var s = y(e) || e.parentNode,
                                a = v(e) || e.childNodes;
                            if (a && s)
                                for (var i = a.length - 1; i >= 0; --i) s.insertBefore(h(a[i], !0), b(e))
                        }
                        return Re(e), !0
                    }
                    return e instanceof l && ! function(e) {
                        var t = y(e);
                        t && t.tagName || (t = {
                            namespaceURI: pe,
                            tagName: "template"
                        });
                        var n = sy(e.tagName),
                            o = sy(t.tagName);
                        return e.namespaceURI === ge ? t.namespaceURI === pe ? "svg" === n : t.namespaceURI === fe ? "svg" === n && ("annotation-xml" === o || ke[o]) : Boolean(_e[n]) : e.namespaceURI === fe ? t.namespaceURI === pe ? "math" === n : t.namespaceURI === ge ? "math" === n && Ee[o] : Boolean(Ne[n]) : e.namespaceURI === pe && !(t.namespaceURI === ge && !Ee[o]) && !(t.namespaceURI === fe && !ke[o]) && !Ne[n] && (Se[n] || !_e[n])
                    }(e) ? (Re(e), !0) : "noscript" !== r && "noembed" !== r || !cy(/<\/no(script|embed)/i, e.innerHTML) ? (X && 3 === e.nodeType && (t = e.textContent, t = iy(t, D, " "), t = iy(t, P, " "), e.textContent !== t && (ry(n.removed, {
                        element: e.cloneNode()
                    }), e.textContent = t)), De("afterSanitizeElements", e, null), !1) : (Re(e), !0)
                },
                Le = function(e, t, n) {
                    if (oe && ("id" === t || "name" === t) && (n in r || n in Ce)) return !1;
                    if (G && !W[t] && cy(L, t));
                    else if (K && cy(M, t));
                    else if (!H[t] || W[t]) {
                        if (!(Me(e) && (V.tagNameCheck instanceof RegExp && cy(V.tagNameCheck, e) || V.tagNameCheck instanceof Function && V.tagNameCheck(e)) && (V.attributeNameCheck instanceof RegExp && cy(V.attributeNameCheck, t) || V.attributeNameCheck instanceof Function && V.attributeNameCheck(t)) || "is" === t && V.allowCustomizedBuiltInElements && (V.tagNameCheck instanceof RegExp && cy(V.tagNameCheck, n) || V.tagNameCheck instanceof Function && V.tagNameCheck(n)))) return !1
                    } else if (ue[t]);
                    else if (cy(U, iy(n, F, "")));
                    else if ("src" !== t && "xlink:href" !== t && "href" !== t || "script" === e || 0 !== ly(n, "data:") || !de[e])
                        if (Y && !cy(I, iy(n, F, "")));
                        else if (n) return !1;
                    return !0
                },
                Me = function(e) {
                    return e.indexOf("-") > 0
                },
                Ie = function(e) {
                    var t, n, o, r;
                    De("beforeSanitizeAttributes", e, null);
                    var s = e.attributes;
                    if (s) {
                        var a = {
                            attrName: "",
                            attrValue: "",
                            keepAttr: !0,
                            allowedAttributes: H
                        };
                        for (r = s.length; r--;) {
                            var i = t = s[r],
                                l = i.name,
                                d = i.namespaceURI;
                            n = "value" === l ? t.value : dy(t.value), o = B(l);
                            var c = n;
                            if (a.attrName = o, a.attrValue = n, a.keepAttr = !0, a.forceKeepAttr = void 0, De("uponSanitizeAttribute", e, a), n = a.attrValue, !a.forceKeepAttr)
                                if (a.keepAttr)
                                    if (cy(/\/>/i, n)) Ae(l, e);
                                    else {
                                        X && (n = iy(n, D, " "), n = iy(n, P, " "));
                                        var u = B(e.nodeName);
                                        if (Le(u, o, n)) {
                                            if (n !== c) try {
                                                d ? e.setAttributeNS(d, l, n) : e.setAttribute(l, n)
                                            } catch (t) {
                                                Ae(l, e)
                                            }
                                        } else Ae(l, e)
                                    }
                            else Ae(l, e)
                        }
                        De("afterSanitizeAttributes", e, null)
                    }
                },
                Fe = function e(t) {
                    var n, o = Te(t);
                    for (De("beforeSanitizeShadowDOM", t, null); n = o.nextNode();) De("uponSanitizeShadowNode", n, null), Pe(n) || (n.content instanceof s && e(n.content), Ie(n));
                    De("afterSanitizeShadowDOM", t, null)
                };
            return n.sanitize = function(e, r) {
                var a, l, d, c, u;
                if ((be = !e) && (e = "\x3c!--\x3e"), "string" != typeof e && !Be(e)) {
                    if ("function" != typeof e.toString) throw uy("toString is not a function");
                    if ("string" != typeof(e = e.toString())) throw uy("dirty is not a string, aborting")
                }
                if (!n.isSupported) {
                    if ("object" === Uv(t.toStaticHTML) || "function" == typeof t.toStaticHTML) {
                        if ("string" == typeof e) return t.toStaticHTML(e);
                        if (Be(e)) return t.toStaticHTML(e.outerHTML)
                    }
                    return e
                }
                if (J || xe(r), n.removed = [], "string" == typeof e && (se = !1), se) {
                    if (e.nodeName) {
                        var m = B(e.nodeName);
                        if (!z[m] || q[m]) throw uy("root node is forbidden and cannot be sanitized in-place")
                    }
                } else if (e instanceof i) 1 === (l = (a = Oe("\x3c!----\x3e")).ownerDocument.importNode(e, !0)).nodeType && "BODY" === l.nodeName || "HTML" === l.nodeName ? a = l : a.appendChild(l);
                else {
                    if (!ee && !X && !Q && -1 === e.indexOf("<")) return w && ne ? w.createHTML(e) : e;
                    if (!(a = Oe(e))) return ee ? null : ne ? x : ""
                }
                a && Z && Re(a.firstChild);
                for (var f = Te(se ? e : a); d = f.nextNode();) 3 === d.nodeType && d === c || Pe(d) || (d.content instanceof s && Fe(d.content), Ie(d), c = d);
                if (c = null, se) return e;
                if (ee) {
                    if (te)
                        for (u = _.call(a.ownerDocument); a.firstChild;) u.appendChild(a.firstChild);
                    else u = a;
                    return H.shadowroot && (u = R.call(o, u, !0)), u
                }
                var g = Q ? a.outerHTML : a.innerHTML;
                return Q && z["!doctype"] && a.ownerDocument && a.ownerDocument.doctype && a.ownerDocument.doctype.name && cy(Py, a.ownerDocument.doctype.name) && (g = "<!DOCTYPE " + a.ownerDocument.doctype.name + ">\n" + g), X && (g = iy(g, D, " "), g = iy(g, P, " ")), w && ne ? w.createHTML(g) : g
            }, n.setConfig = function(e) {
                xe(e), J = !0
            }, n.clearConfig = function() {
                ye = null, J = !1
            }, n.isValidAttribute = function(e, t, n) {
                ye || xe({});
                var o = B(e),
                    r = B(t);
                return Le(o, r, n)
            }, n.addHook = function(e, t) {
                "function" == typeof t && (O[e] = O[e] || [], ry(O[e], t))
            }, n.removeHook = function(e) {
                if (O[e]) return oy(O[e])
            }, n.removeHooks = function(e) {
                O[e] && (O[e] = [])
            }, n.removeAllHooks = function() {
                O = {}
            }, n
        }();
    const Iy = Dt.each,
        Fy = Dt.trim,
        Uy = ["source", "protocol", "authority", "userInfo", "user", "password", "host", "port", "relative", "path", "directory", "file", "query", "anchor"],
        zy = {
            ftp: 21,
            http: 80,
            https: 443,
            mailto: 25
        },
        jy = ["img", "video"],
        Hy = (e, t, n) => {
            const o = (e => {
                try {
                    return decodeURIComponent(e)
                } catch (t) {
                    return unescape(e)
                }
            })(t).replace(/\s/g, "");
            return !e.allow_script_urls && (!!/((java|vb)script|mhtml):/i.test(o) || !e.allow_html_data_urls && (/^data:image\//i.test(o) ? ((e, t) => C(e) ? !e : !C(t) || !H(jy, t))(e.allow_svg_data_urls, n) && /^data:image\/svg\+xml/i.test(o) : /^data:/i.test(o)))
        };
    class $y {
        static parseDataUri(e) {
            let t;
            const n = decodeURIComponent(e).split(","),
                o = /data:([^;]+)/.exec(n[0]);
            return o && (t = o[1]), {
                type: t,
                data: n[1]
            }
        }
        static isDomSafe(e, t, n = {}) {
            if (n.allow_script_urls) return !0;
            {
                const o = Qs.decode(e).replace(/[\s\u0000-\u001F]+/g, "");
                return !Hy(n, o, t)
            }
        }
        static getDocumentBaseUrl(e) {
            var t;
            let n;
            return n = 0 !== e.protocol.indexOf("http") && "file:" !== e.protocol ? null !== (t = e.href) && void 0 !== t ? t : "" : e.protocol + "//" + e.host + e.pathname, /^[^:]+:\/\/\/?[^\/]+\//.test(n) && (n = n.replace(/[\?#].*$/, "").replace(/[\/\\][^\/]+$/, ""), /[\/\\]$/.test(n) || (n += "/")), n
        }
        constructor(e, t = {}) {
            this.path = "", this.directory = "", e = Fy(e), this.settings = t;
            const n = t.base_uri,
                o = this;
            if (/^([\w\-]+):([^\/]{2})/i.test(e) || /^\s*#/.test(e)) return void(o.source = e);
            const r = 0 === e.indexOf("//");
            if (0 !== e.indexOf("/") || r || (e = (n && n.protocol || "http") + "://mce_host" + e), !/^[\w\-]*:?\/\//.test(e)) {
                const t = n ? n.path : new $y(document.location.href).directory;
                if ("" === (null == n ? void 0 : n.protocol)) e = "//mce_host" + o.toAbsPath(t, e);
                else {
                    const r = /([^#?]*)([#?]?.*)/.exec(e);
                    r && (e = (n && n.protocol || "http") + "://mce_host" + o.toAbsPath(t, r[1]) + r[2])
                }
            }
            e = e.replace(/@@/g, "(mce_at)");
            const s = /^(?:(?![^:@]+:[^:@\/]*@)([^:\/?#.]+):)?(?:\/\/)?((?:(([^:@\/]*):?([^:@\/]*))?@)?(\[[a-zA-Z0-9:.%]+\]|[^:\/?#]*)(?::(\d*))?)(((\/(?:[^?#](?![^?#\/]*\.[^?#\/.]+(?:[?#]|$)))*\/?)?([^?#\/]*))(?:\?([^#]*))?(?:#(.*))?)/.exec(e);
            s && Iy(Uy, ((e, t) => {
                let n = s[t];
                n && (n = n.replace(/\(mce_at\)/g, "@@")), o[e] = n
            })), n && (o.protocol || (o.protocol = n.protocol), o.userInfo || (o.userInfo = n.userInfo), o.port || "mce_host" !== o.host || (o.port = n.port), o.host && "mce_host" !== o.host || (o.host = n.host), o.source = ""), r && (o.protocol = "")
        }
        setPath(e) {
            const t = /^(.*?)\/?(\w+)?$/.exec(e);
            t && (this.path = t[0], this.directory = t[1], this.file = t[2]), this.source = "", this.getURI()
        }
        toRelative(e) {
            if ("./" === e) return e;
            const t = new $y(e, {
                base_uri: this
            });
            if ("mce_host" !== t.host && this.host !== t.host && t.host || this.port !== t.port || this.protocol !== t.protocol && "" !== t.protocol) return t.getURI();
            const n = this.getURI(),
                o = t.getURI();
            if (n === o || "/" === n.charAt(n.length - 1) && n.substr(0, n.length - 1) === o) return n;
            let r = this.toRelPath(this.path, t.path);
            return t.query && (r += "?" + t.query), t.anchor && (r += "#" + t.anchor), r
        }
        toAbsolute(e, t) {
            const n = new $y(e, {
                base_uri: this
            });
            return n.getURI(t && this.isSameOrigin(n))
        }
        isSameOrigin(e) {
            if (this.host == e.host && this.protocol == e.protocol) {
                if (this.port == e.port) return !0;
                const t = this.protocol ? zy[this.protocol] : null;
                if (t && (this.port || t) == (e.port || t)) return !0
            }
            return !1
        }
        toRelPath(e, t) {
            let n, o, r = 0,
                s = "";
            const a = e.substring(0, e.lastIndexOf("/")).split("/"),
                i = t.split("/");
            if (a.length >= i.length)
                for (n = 0, o = a.length; n < o; n++)
                    if (n >= i.length || a[n] !== i[n]) {
                        r = n + 1;
                        break
                    } if (a.length < i.length)
                for (n = 0, o = i.length; n < o; n++)
                    if (n >= a.length || a[n] !== i[n]) {
                        r = n + 1;
                        break
                    } if (1 === r) return t;
            for (n = 0, o = a.length - (r - 1); n < o; n++) s += "../";
            for (n = r - 1, o = i.length; n < o; n++) s += n !== r - 1 ? "/" + i[n] : i[n];
            return s
        }
        toAbsPath(e, t) {
            let n = 0;
            const o = /\/$/.test(t) ? "/" : "",
                r = e.split("/"),
                s = t.split("/"),
                a = [];
            Iy(r, (e => {
                e && a.push(e)
            }));
            const i = [];
            for (let e = s.length - 1; e >= 0; e--) 0 !== s[e].length && "." !== s[e] && (".." !== s[e] ? n > 0 ? n-- : i.push(s[e]) : n++);
            const l = a.length - n;
            let d;
            return d = l <= 0 ? oe(i).join("/") : a.slice(0, l).join("/") + "/" + oe(i).join("/"), 0 !== d.indexOf("/") && (d = "/" + d), o && d.lastIndexOf("/") !== d.length - 1 && (d += o), d
        }
        getURI(e = !1) {
            let t;
            return this.source && !e || (t = "", e || (this.protocol ? t += this.protocol + "://" : t += "//", this.userInfo && (t += this.userInfo + "@"), this.host && (t += this.host), this.port && (t += ":" + this.port)), this.path && (t += this.path), this.query && (t += "?" + this.query), this.anchor && (t += "#" + this.anchor), this.source = t), this.source
        }
    }
    const Vy = Dt.makeMap("src,href,data,background,action,formaction,poster,xlink:href"),
        qy = "data-mce-type";
    let Wy = 0;
    const Ky = (e, t, n, o) => {
            var r, s, a, i;
            const l = t.validate,
                d = n.getSpecialElements();
            8 === e.nodeType && !t.allow_conditional_comments && /^\[if/i.test(null !== (r = e.nodeValue) && void 0 !== r ? r : "") && (e.nodeValue = " " + e.nodeValue);
            const c = null !== (s = null == o ? void 0 : o.tagName) && void 0 !== s ? s : e.nodeName.toLowerCase();
            if (1 !== e.nodeType || "body" === c) return;
            const u = vn(e),
                f = tn(u, qy),
                g = Zt(u, "data-mce-bogus");
            if (!f && m(g)) return void("all" === g ? Co(u) : wo(u));
            const p = n.getElementRule(c);
            if (!l || p) {
                if (C(o) && (o.allowedTags[c] = !0), l && p && !f) {
                    if (q(null !== (a = p.attributesForced) && void 0 !== a ? a : [], (e => {
                            Qt(u, e.name, "{$uid}" === e.value ? "mce_" + Wy++ : e.value)
                        })), q(null !== (i = p.attributesDefault) && void 0 !== i ? i : [], (e => {
                            tn(u, e.name) || Qt(u, e.name, "{$uid}" === e.value ? "mce_" + Wy++ : e.value)
                        })), p.attributesRequired && !$(p.attributesRequired, (e => tn(u, e)))) return void wo(u);
                    if (p.removeEmptyAttrs && (e => {
                            const t = e.dom.attributes;
                            return null == t || 0 === t.length
                        })(u)) return void wo(u);
                    p.outputName && p.outputName !== c && si(u, p.outputName)
                }
            } else ke(d, c) ? Co(u) : wo(u)
        },
        Gy = (e, t, n, o, r) => !(o in Vy && Hy(e, r, n)) && (!e.validate || t.isValid(n, o) || He(o, "data-") || He(o, "aria-")),
        Yy = (e, t) => e.hasAttribute(qy) && ("id" === t || "class" === t || "style" === t),
        Xy = (e, t) => e in t.getBoolAttrs(),
        Qy = (e, t, n) => {
            const {
                attributes: o
            } = e;
            for (let r = o.length - 1; r >= 0; r--) {
                const s = o[r],
                    a = s.name,
                    i = s.value;
                Gy(t, n, e.tagName.toLowerCase(), a, i) || Yy(e, a) ? Xy(a, n) && e.setAttribute(a, a) : e.removeAttribute(a)
            }
        },
        Jy = (e, t) => {
            const n = My();
            return n.addHook("uponSanitizeElement", ((n, o) => {
                Ky(n, e, t, o)
            })), n.addHook("uponSanitizeAttribute", ((n, o) => {
                const r = n.tagName.toLowerCase(),
                    {
                        attrName: s,
                        attrValue: a
                    } = o;
                o.keepAttr = Gy(e, t, r, s, a), o.keepAttr ? (o.allowedAttributes[s] = !0, Xy(s, t) && (o.attrValue = s), e.allow_svg_data_urls && He(a, "data:image/svg+xml") && (o.forceKeepAttr = !0)) : Yy(n, s) && (o.forceKeepAttr = !0)
            })), n
        },
        Zy = Dt.makeMap,
        eC = Dt.extend,
        tC = (e, t, n) => {
            const o = e.name,
                r = o in n && "title" !== o && "textarea" !== o,
                s = t.childNodes;
            for (let t = 0, o = s.length; t < o; t++) {
                const o = s[t],
                    a = new Ug(o.nodeName.toLowerCase(), o.nodeType);
                if (jo(o)) {
                    const e = o.attributes;
                    for (let t = 0, n = e.length; t < n; t++) {
                        const n = e[t];
                        a.attr(n.name, n.value)
                    }
                } else Xo(o) ? (a.value = o.data, r && (a.raw = !0)) : (Zo(o) || Qo(o) || Jo(o)) && (a.value = o.data);
                tC(a, o, n), e.append(a)
            }
        },
        nC = (e = {}, t = ca()) => {
            const n = Rv(),
                o = Rv(),
                r = {
                    validate: !0,
                    root_name: "body",
                    sanitize: !0,
                    ...e
                },
                s = new DOMParser,
                a = ((e, t) => {
                    if (e.sanitize) {
                        const n = Jy(e, t);
                        return (t, o) => {
                            n.sanitize(t, ((e, t) => {
                                const n = {
                                    IN_PLACE: !0,
                                    ALLOW_UNKNOWN_PROTOCOLS: !0,
                                    ALLOWED_TAGS: ["#comment", "#cdata-section", "body"],
                                    ALLOWED_ATTR: []
                                };
                                return n.PARSER_MEDIA_TYPE = t, e.allow_script_urls ? n.ALLOWED_URI_REGEXP = /.*/ : e.allow_html_data_urls && (n.ALLOWED_URI_REGEXP = /^(?!(\w+script|mhtml):)/i), n
                            })(e, o)), n.removed = []
                        }
                    }
                    return (n, o) => {
                        const r = document.createNodeIterator(n, NodeFilter.SHOW_ELEMENT | NodeFilter.SHOW_COMMENT | NodeFilter.SHOW_TEXT);
                        let s;
                        for (; s = r.nextNode();) Ky(s, e, t), jo(s) && Qy(s, e, t)
                    }
                })(r, t),
                i = n.addFilter,
                l = n.getFilters,
                d = n.removeFilter,
                c = o.addFilter,
                u = o.getFilters,
                f = o.removeFilter,
                g = (e, n) => {
                    const o = m(n.attr(qy)),
                        r = 1 === n.type && !ke(e, n.name) && !As(t, n);
                    return 3 === n.type || r && !o
                },
                p = {
                    schema: t,
                    addAttributeFilter: c,
                    getAttributeFilters: u,
                    removeAttributeFilter: f,
                    addNodeFilter: i,
                    getNodeFilters: l,
                    removeNodeFilter: d,
                    parse: (e, n = {}) => {
                        var o;
                        const i = r.validate,
                            d = null !== (o = n.context) && void 0 !== o ? o : r.root_name,
                            c = ((e, n, o = "html") => {
                                const r = "xhtml" === o ? "application/xhtml+xml" : "text/html",
                                    i = ke(t.getSpecialElements(), n.toLowerCase()),
                                    l = i ? `<${n}>${e}</${n}>` : e,
                                    d = "xhtml" === o ? `<html xmlns="http://www.w3.org/1999/xhtml"><head></head><body>${l}</body></html>` : `<body>${l}</body>`,
                                    c = s.parseFromString(d, r).body;
                                return a(c, r), i ? c.firstChild : c
                            })(e, d, n.format);
                        xs(t, c);
                        const m = new Ug(d, 11);
                        tC(m, c, t.getSpecialElements()), c.innerHTML = "";
                        const [f, p] = ((e, t, n, o) => {
                            const r = n.validate,
                                s = t.getNonEmptyElements(),
                                a = t.getWhitespaceElements(),
                                i = eC(Zy("script,style,head,html,body,title,meta,param"), t.getBlockElements()),
                                l = la(t),
                                d = /[ \t\r\n]+/g,
                                c = /^[ \t\r\n]+/,
                                u = /[ \t\r\n]+$/,
                                m = e => {
                                    let t = e.parent;
                                    for (; C(t);) {
                                        if (t.name in a) return !0;
                                        t = t.parent
                                    }
                                    return !1
                                },
                                f = e => e.name in i || As(t, e),
                                g = (t, n) => {
                                    const r = n ? t.prev : t.next;
                                    return !C(r) && !y(t.parent) && f(t.parent) && (t.parent !== e || !0 === o.isRootContent)
                                };
                            return [e => {
                                var t;
                                if (3 === e.type && !m(e)) {
                                    let n = null !== (t = e.value) && void 0 !== t ? t : "";
                                    n = n.replace(d, " "), (((e, t) => C(e) && (t(e) || "br" === e.name))(e.prev, f) || g(e, !0)) && (n = n.replace(c, "")), 0 === n.length ? e.remove() : e.value = n
                                }
                            }, e => {
                                var n;
                                if (1 === e.type) {
                                    const n = t.getElementRule(e.name);
                                    if (r && n) {
                                        const r = Zh(t, s, a, e);
                                        n.paddInEmptyBlock && r && (e => {
                                            let n = e;
                                            for (; C(n);) {
                                                if (n.name in l) return Zh(t, s, a, n);
                                                n = n.parent
                                            }
                                            return !1
                                        })(e) ? Qh(o, f, e) : n.removeEmpty && r ? f(e) ? e.remove() : e.unwrap() : n.paddEmpty && (r || (e => {
                                            var t;
                                            return Jh(e, "#text") && (null === (t = null == e ? void 0 : e.firstChild) || void 0 === t ? void 0 : t.value) === fr
                                        })(e)) && Qh(o, f, e)
                                    }
                                } else if (3 === e.type && !m(e)) {
                                    let t = null !== (n = e.value) && void 0 !== n ? n : "";
                                    (e.next && f(e.next) || g(e, !1)) && (t = t.replace(u, "")), 0 === t.length ? e.remove() : e.value = t
                                }
                            }]
                        })(m, t, r, n), h = [], b = i ? e => ((e, n) => {
                            ob(t, e) && n.push(e)
                        })(e, h) : E, v = {
                            nodes: {},
                            attributes: {}
                        }, w = e => Gh(l(), u(), e, v);
                        if (((e, t, n) => {
                                const o = [];
                                for (let n = e, r = n; n; r = n, n = n.walk()) {
                                    const s = n;
                                    q(t, (e => e(s))), y(s.parent) && s !== e ? n = r : o.push(s)
                                }
                                for (let e = o.length - 1; e >= 0; e--) {
                                    const t = o[e];
                                    q(n, (e => e(t)))
                                }
                            })(m, [f, w], [p, b]), h.reverse(), i && h.length > 0)
                            if (n.context) {
                                const {
                                    pass: e,
                                    fail: o
                                } = K(h, (e => e.parent === m));
                                nb(o, t, m, w), n.invalid = e.length > 0
                            } else nb(h, t, m, w);
                        const x = ((e, t) => {
                            var n;
                            const o = null !== (n = t.forced_root_block) && void 0 !== n ? n : e.forced_root_block;
                            return !1 === o ? "" : !0 === o ? "p" : o
                        })(r, n);
                        return x && ("body" === m.name || n.isRootContent) && ((e, n) => {
                            const o = eC(Zy("script,style,head,html,body,title,meta,param"), t.getBlockElements()),
                                s = /^[ \t\r\n]+/,
                                a = /[ \t\r\n]+$/;
                            let i = e.firstChild,
                                l = null;
                            const d = e => {
                                var t, n;
                                e && (i = e.firstChild, i && 3 === i.type && (i.value = null === (t = i.value) || void 0 === t ? void 0 : t.replace(s, "")), i = e.lastChild, i && 3 === i.type && (i.value = null === (n = i.value) || void 0 === n ? void 0 : n.replace(a, "")))
                            };
                            if (t.isValidChild(e.name, n.toLowerCase())) {
                                for (; i;) {
                                    const t = i.next;
                                    g(o, i) ? (l || (l = new Ug(n, 1), l.attr(r.forced_root_block_attrs), e.insert(l, i)), l.append(i)) : (d(l), l = null), i = t
                                }
                                d(l)
                            }
                        })(m, x), n.invalid || Yh(v, n), m
                    }
                };
            return Fv(p, r), ((e, t, n) => {
                t.inline_styles && Av(e, t, n)
            })(p, r, t), p
        },
        oC = (e, t, n) => {
            const o = (e => fb(e) ? Yg({
                    validate: !1
                }).serialize(e) : e)(e),
                r = t(o);
            if (r.isDefaultPrevented()) return r;
            if (fb(e)) {
                if (r.content !== o) {
                    const t = nC({
                        validate: !1,
                        forced_root_block: !1,
                        sanitize: n
                    }).parse(r.content, {
                        context: e.name
                    });
                    return {
                        ...r,
                        content: t
                    }
                }
                return {
                    ...r,
                    content: e
                }
            }
            return r
        },
        rC = (e, t) => {
            if (t.no_events) return al.value(t);
            {
                const n = ((e, t) => e.dispatch("BeforeGetContent", t))(e, t);
                return n.isDefaultPrevented() ? al.error(Zm(e, {
                    content: "",
                    ...n
                }).content) : al.value(n)
            }
        },
        sC = (e, t, n) => {
            if (n.no_events) return t;
            {
                const o = oC(t, (t => Zm(e, {
                    ...n,
                    content: t
                })), rc(e));
                return o.content
            }
        },
        aC = (e, t) => {
            if (t.no_events) return al.value(t);
            {
                const n = oC(t.content, (n => ((e, t) => e.dispatch("BeforeSetContent", t))(e, {
                    ...t,
                    content: n
                })), rc(e));
                return n.isDefaultPrevented() ? (Jm(e, n), al.error(void 0)) : al.value(n)
            }
        },
        iC = (e, t, n) => {
            n.no_events || Jm(e, {
                ...n,
                content: t
            })
        },
        lC = (e, t, n) => ({
            element: e,
            width: t,
            rows: n
        }),
        dC = (e, t) => ({
            element: e,
            cells: t
        }),
        cC = (e, t) => ({
            x: e,
            y: t
        }),
        uC = (e, t) => en(e, t).bind(Xe).getOr(1),
        mC = (e, t, n) => {
            const o = e.rows;
            return !!(o[n] ? o[n].cells : [])[t]
        },
        fC = e => X(e, ((e, t) => t.cells.length > e ? t.cells.length : e), 0),
        gC = (e, t) => {
            const n = e.rows;
            for (let e = 0; e < n.length; e++) {
                const o = n[e].cells;
                for (let n = 0; n < o.length; n++)
                    if (kn(o[n], t)) return I.some(cC(n, e))
            }
            return I.none()
        },
        pC = (e, t, n, o, r) => {
            const s = [],
                a = e.rows;
            for (let e = n; e <= r; e++) {
                const n = a[e].cells,
                    r = t < o ? n.slice(t, o + 1) : n.slice(o, t + 1);
                s.push(dC(a[e].element, r))
            }
            return s
        },
        hC = e => ((e, t) => {
            const n = oi(e.element),
                o = hn("tbody");
            return vo(o, t), ho(n, o), n
        })(e, (e => V(e.rows, (e => {
            const t = V(e.cells, (e => {
                    const t = ri(e);
                    return nn(t, "colspan"), nn(t, "rowspan"), t
                })),
                n = oi(e.element);
            return vo(n, t), n
        })))(e)),
        bC = (e, t) => {
            const n = vn(t.commonAncestorContainer),
                o = hp(n, e),
                r = G(o, Or),
                s = ((e, t) => J(e, (e => "li" === jt(e) && em(e, t))).fold(N([]), (t => (e => J(e, (e => "ul" === jt(e) || "ol" === jt(e))))(e).map((e => {
                    const t = hn(jt(e)),
                        n = ye(uo(e), ((e, t) => He(t, "list-style")));
                    return ao(t, n), [hn("li"), t]
                })).getOr([]))))(o, t),
                a = r.concat(s.length ? s : (e => Sr(e) ? Rn(e).filter(Er).fold(N([]), (t => [e, t])) : Er(e) ? [e] : [])(n));
            return V(a, oi)
        },
        vC = () => wf([]),
        yC = (e, t) => ((e, t) => Jn(t, "table", O(kn, e)))(e, t[0]).bind((e => {
            const n = t[0],
                o = t[t.length - 1],
                r = (e => {
                    const t = lC(oi(e), 0, []);
                    return q(Mo(e, "tr"), ((e, n) => {
                        q(Mo(e, "td,th"), ((o, r) => {
                            ((e, t, n, o, r) => {
                                const s = uC(r, "rowspan"),
                                    a = uC(r, "colspan"),
                                    i = e.rows;
                                for (let e = n; e < n + s; e++) {
                                    i[e] || (i[e] = dC(ri(o), []));
                                    for (let o = t; o < t + a; o++) i[e].cells[o] = e === n && o === t ? r : oi(r)
                                }
                            })(t, ((e, t, n) => {
                                for (; mC(e, t, n);) t++;
                                return t
                            })(t, r, n), n, e, o)
                        }))
                    })), lC(t.element, fC(t.rows), t.rows)
                })(e);
            return ((e, t, n) => gC(e, t).bind((t => gC(e, n).map((n => ((e, t, n) => {
                const o = t.x,
                    r = t.y,
                    s = n.x,
                    a = n.y,
                    i = r < a ? pC(e, o, r, s, a) : pC(e, o, a, s, r);
                return lC(e.element, fC(i), i)
            })(e, t, n))))))(r, n, o).map((e => wf([hC(e)])))
        })).getOrThunk(vC),
        CC = (e, t) => {
            const n = Yu(t, e);
            return n.length > 0 ? yC(e, n) : ((e, t) => t.length > 0 && t[0].collapsed ? vC() : ((e, t) => ((e, t) => {
                const n = X(t, ((e, t) => (ho(t, e), t)), e);
                return t.length > 0 ? wf([n]) : n
            })(vn(t.cloneContents()), bC(e, t)))(e, t[0]))(e, t)
        },
        wC = (e, t) => t >= 0 && t < e.length && Uu(e.charAt(t)),
        xC = e => Mr(e.innerText),
        kC = e => jo(e) ? e.outerHTML : Xo(e) ? Qs.encodeRaw(e.data, !1) : Zo(e) ? "\x3c!--" + e.data + "--\x3e" : "",
        EC = (e, t) => (((e, t) => {
            let n = 0;
            q(e, (e => {
                0 === e[0] ? n++ : 1 === e[0] ? (((e, t, n) => {
                    const o = (e => {
                        let t;
                        const n = document.createElement("div"),
                            o = document.createDocumentFragment();
                        for (e && (n.innerHTML = e); t = n.firstChild;) o.appendChild(t);
                        return o
                    })(t);
                    if (e.hasChildNodes() && n < e.childNodes.length) {
                        const t = e.childNodes[n];
                        e.insertBefore(o, t)
                    } else e.appendChild(o)
                })(t, e[1], n), n++) : 2 === e[0] && ((e, t) => {
                    if (e.hasChildNodes() && t < e.childNodes.length) {
                        const n = e.childNodes[t];
                        e.removeChild(n)
                    }
                })(t, n)
            }))
        })(((e, t) => {
            const n = e.length + t.length + 2,
                o = new Array(n),
                r = new Array(n),
                s = (n, o, r, a, l) => {
                    const d = i(n, o, r, a);
                    if (null === d || d.start === o && d.diag === o - a || d.end === n && d.diag === n - r) {
                        let s = n,
                            i = r;
                        for (; s < o || i < a;) s < o && i < a && e[s] === t[i] ? (l.push([0, e[s]]), ++s, ++i) : o - n > a - r ? (l.push([2, e[s]]), ++s) : (l.push([1, t[i]]), ++i)
                    } else {
                        s(n, d.start, r, d.start - d.diag, l);
                        for (let t = d.start; t < d.end; ++t) l.push([0, e[t]]);
                        s(d.end, o, d.end - d.diag, a, l)
                    }
                },
                a = (n, o, r, s) => {
                    let a = n;
                    for (; a - o < s && a < r && e[a] === t[a - o];) ++a;
                    return ((e, t, n) => ({
                        start: e,
                        end: t,
                        diag: n
                    }))(n, a, o)
                },
                i = (n, s, i, l) => {
                    const d = s - n,
                        c = l - i;
                    if (0 === d || 0 === c) return null;
                    const u = d - c,
                        m = c + d,
                        f = (m % 2 == 0 ? m : m + 1) / 2;
                    let g, p, h, b, v;
                    for (o[1 + f] = n, r[1 + f] = s + 1, g = 0; g <= f; ++g) {
                        for (p = -g; p <= g; p += 2) {
                            for (h = p + f, p === -g || p !== g && o[h - 1] < o[h + 1] ? o[h] = o[h + 1] : o[h] = o[h - 1] + 1, b = o[h], v = b - n + i - p; b < s && v < l && e[b] === t[v];) o[h] = ++b, ++v;
                            if (u % 2 != 0 && u - g <= p && p <= u + g && r[h - u] <= o[h]) return a(r[h - u], p + n - i, s, l)
                        }
                        for (p = u - g; p <= u + g; p += 2) {
                            for (h = p + f - u, p === u - g || p !== u + g && r[h + 1] <= r[h - 1] ? r[h] = r[h + 1] - 1 : r[h] = r[h - 1], b = r[h] - 1, v = b - n + i - p; b >= n && v >= i && e[b] === t[v];) r[h] = b--, v--;
                            if (u % 2 == 0 && -g <= p && p <= g && r[h] <= o[h + u]) return a(r[h], p + n - i, s, l)
                        }
                    }
                    return null
                },
                l = [];
            return s(0, e.length, 0, t.length, l), l
        })(V(ce(t.childNodes), kC), e), t), t),
        SC = Pe((() => document.implementation.createHTMLDocument("undo"))),
        _C = e => {
            const t = (n = e.getBody(), G(V(ce(n.childNodes), kC), (e => e.length > 0)));
            var n;
            const o = te(t, (t => {
                    const n = Hg(e.serializer, t);
                    return n.length > 0 ? [n] : []
                })),
                r = o.join("");
            return (e => -1 !== e.indexOf("</iframe>"))(r) ? (e => ({
                type: "fragmented",
                fragments: e,
                content: "",
                bookmark: null,
                beforeBookmark: null
            }))(o) : (e => ({
                type: "complete",
                fragments: null,
                content: e,
                bookmark: null,
                beforeBookmark: null
            }))(r)
        },
        NC = (e, t, n) => {
            const o = n ? t.beforeBookmark : t.bookmark;
            "fragmented" === t.type ? EC(t.fragments, e.getBody()) : e.setContent(t.content, {
                format: "raw",
                no_selection: !C(o) || !_u(o) || !o.isFakeCaret
            }), o && (e.selection.moveToBookmark(o), e.selection.scrollIntoView())
        },
        RC = e => "fragmented" === e.type ? e.fragments.join("") : e.content,
        AC = e => {
            const t = hn("body", SC());
            return Eo(t, RC(e)), q(Mo(t, "*[data-mce-bogus]"), wo), ko(t)
        },
        OC = (e, t) => !(!e || !t) && (!!((e, t) => RC(e) === RC(t))(e, t) || ((e, t) => AC(e) === AC(t))(e, t)),
        TC = e => 0 === e.get(),
        BC = (e, t, n) => {
            TC(n) && (e.typing = t)
        },
        DC = (e, t) => {
            e.typing && (BC(e, !1, t), e.add())
        },
        PC = e => ({
            init: {
                bindEvents: E
            },
            undoManager: {
                beforeChange: (t, n) => ((e, t, n) => {
                    TC(t) && n.set(ol(e.selection))
                })(e, t, n),
                add: (t, n, o, r, s, a) => ((e, t, n, o, r, s, a) => {
                    const i = _C(e),
                        l = Dt.extend(s || {}, i);
                    if (!TC(o) || e.removed) return null;
                    const d = t.data[n.get()];
                    if (e.dispatch("BeforeAddUndo", {
                            level: l,
                            lastLevel: d,
                            originalEvent: a
                        }).isDefaultPrevented()) return null;
                    if (d && OC(d, l)) return null;
                    t.data[n.get()] && r.get().each((e => {
                        t.data[n.get()].beforeBookmark = e
                    }));
                    const c = wd(e);
                    if (c && t.data.length > c) {
                        for (let e = 0; e < t.data.length - 1; e++) t.data[e] = t.data[e + 1];
                        t.data.length--, n.set(t.data.length)
                    }
                    l.bookmark = ol(e.selection), n.get() < t.data.length - 1 && (t.data.length = n.get() + 1), t.data.push(l), n.set(t.data.length - 1);
                    const u = {
                        level: l,
                        lastLevel: d,
                        originalEvent: a
                    };
                    return n.get() > 0 ? (e.setDirty(!0), e.dispatch("AddUndo", u), e.dispatch("change", u)) : e.dispatch("AddUndo", u), l
                })(e, t, n, o, r, s, a),
                undo: (t, n, o) => ((e, t, n, o) => {
                    let r;
                    return t.typing && (t.add(), t.typing = !1, BC(t, !1, n)), o.get() > 0 && (o.set(o.get() - 1), r = t.data[o.get()], NC(e, r, !0), e.setDirty(!0), e.dispatch("Undo", {
                        level: r
                    })), r
                })(e, t, n, o),
                redo: (t, n) => ((e, t, n) => {
                    let o;
                    return t.get() < n.length - 1 && (t.set(t.get() + 1), o = n[t.get()], NC(e, o, !1), e.setDirty(!0), e.dispatch("Redo", {
                        level: o
                    })), o
                })(e, t, n),
                clear: (t, n) => ((e, t, n) => {
                    t.data = [], n.set(0), t.typing = !1, e.dispatch("ClearUndos")
                })(e, t, n),
                reset: e => (e => {
                    e.clear(), e.add()
                })(e),
                hasUndo: (t, n) => ((e, t, n) => n.get() > 0 || t.typing && t.data[0] && !OC(_C(e), t.data[0]))(e, t, n),
                hasRedo: (e, t) => ((e, t) => t.get() < e.data.length - 1 && !e.typing)(e, t),
                transact: (e, t, n) => ((e, t, n) => (DC(e, t), e.beforeChange(), e.ignore(n), e.add()))(e, t, n),
                ignore: (e, t) => ((e, t) => {
                    try {
                        e.set(e.get() + 1), t()
                    } finally {
                        e.set(e.get() - 1)
                    }
                })(e, t),
                extra: (t, n, o, r) => ((e, t, n, o, r) => {
                    if (t.transact(o)) {
                        const o = t.data[n.get()].bookmark,
                            s = t.data[n.get() - 1];
                        NC(e, s, !0), t.transact(r) && (t.data[n.get() - 1].beforeBookmark = o)
                    }
                })(e, t, n, o, r)
            },
            formatter: {
                match: (t, n, o, r) => Eb(e, t, n, o, r),
                matchAll: (t, n) => ((e, t, n) => {
                    const o = [],
                        r = {},
                        s = e.selection.getStart();
                    return e.dom.getParent(s, (s => {
                        for (let a = 0; a < t.length; a++) {
                            const i = t[a];
                            !r[i] && kb(e, s, i, n) && (r[i] = !0, o.push(i))
                        }
                    }), e.dom.getRoot()), o
                })(e, t, n),
                matchNode: (t, n, o, r) => kb(e, t, n, o, r),
                canApply: t => ((e, t) => {
                    const n = e.formatter.get(t),
                        o = e.dom;
                    if (n && e.selection.isEditable()) {
                        const t = e.selection.getStart(),
                            r = Cm(o, t);
                        for (let e = n.length - 1; e >= 0; e--) {
                            const t = n[e];
                            if (!km(t)) return !0;
                            for (let e = r.length - 1; e >= 0; e--)
                                if (o.is(r[e], t.selector)) return !0
                        }
                    }
                    return !1
                })(e, t),
                closest: t => ((e, t) => {
                    const n = t => kn(t, vn(e.getBody()));
                    return I.from(e.selection.getStart(!0)).bind((o => bb(vn(o), (n => ue(t, (t => ((t, n) => kb(e, t.dom, n) ? I.some(n) : I.none())(n, t)))), n))).getOrNull()
                })(e, t),
                apply: (t, n, o) => wv(e, t, n, o),
                remove: (t, n, o, r) => pv(e, t, n, o, r),
                toggle: (t, n, o) => ((e, t, n, o) => {
                    const r = e.formatter.get(t);
                    r && (!Eb(e, t, n, o) || "toggle" in r[0] && !r[0].toggle ? wv(e, t, n, o) : pv(e, t, n, o))
                })(e, t, n, o),
                formatChanged: (t, n, o, r, s) => ((e, t, n, o, r, s) => (((e, t, n, o, r, s) => {
                    const a = t.get();
                    q(n.split(","), (t => {
                        const n = xe(a, t).getOrThunk((() => {
                                const e = {
                                    withSimilar: {
                                        state: Da(!1),
                                        similar: !0,
                                        callbacks: []
                                    },
                                    withoutSimilar: {
                                        state: Da(!1),
                                        similar: !1,
                                        callbacks: []
                                    },
                                    withVars: []
                                };
                                return a[t] = e, e
                            })),
                            i = () => {
                                const n = Sv(e);
                                return Ev(e, n, t, r, s).isSome()
                            };
                        if (v(s)) {
                            const e = r ? n.withSimilar : n.withoutSimilar;
                            e.callbacks.push(o), 1 === e.callbacks.length && e.state.set(i())
                        } else n.withVars.push({
                            state: Da(i()),
                            similar: r,
                            vars: s,
                            callback: o
                        })
                    })), t.set(a)
                })(e, t, n, o, r, s), {
                    unbind: () => ((e, t, n) => {
                        const o = e.get();
                        q(t.split(","), (e => xe(o, e).each((t => {
                            o[e] = {
                                withSimilar: {
                                    ...t.withSimilar,
                                    callbacks: G(t.withSimilar.callbacks, (e => e !== n))
                                },
                                withoutSimilar: {
                                    ...t.withoutSimilar,
                                    callbacks: G(t.withoutSimilar.callbacks, (e => e !== n))
                                },
                                withVars: G(t.withVars, (e => e.callback !== n))
                            }
                        })))), e.set(o)
                    })(t, n, o)
                }))(e, t, n, o, r, s)
            },
            editor: {
                getContent: t => ((e, t) => I.from(e.getBody()).fold(N("tree" === t.format ? new Ug("body", 11) : ""), (n => Wg(e, t, n))))(e, t),
                setContent: (t, n) => ((e, t, n) => I.from(e.getBody()).map((o => fb(t) ? ((e, t, n, o) => {
                    Xh(e.parser.getNodeFilters(), e.parser.getAttributeFilters(), n);
                    const r = Yg({
                            validate: !1
                        }, e.schema).serialize(n),
                        s = Rr(vn(t)) ? r : Dt.trim(r);
                    return gb(e, s, o.no_selection), {
                        content: n,
                        html: s
                    }
                })(e, o, t, n) : ((e, t, n, o) => {
                    if (0 === n.length || /^\s+$/.test(n)) {
                        const r = '<br data-mce-bogus="1">';
                        "TABLE" === t.nodeName ? n = "<tr><td>" + r + "</td></tr>" : /^(UL|OL)$/.test(t.nodeName) && (n = "<li>" + r + "</li>");
                        const s = Rl(e);
                        return e.schema.isValidChild(t.nodeName.toLowerCase(), s.toLowerCase()) ? (n = r, n = e.dom.createHTML(s, Al(e), n)) : n || (n = r), gb(e, n, o.no_selection), {
                            content: n,
                            html: n
                        }
                    } {
                        "raw" !== o.format && (n = Yg({
                            validate: !1
                        }, e.schema).serialize(e.parser.parse(n, {
                            isRootContent: !0,
                            insert: !0
                        })));
                        const r = Rr(vn(t)) ? n : Dt.trim(n);
                        return gb(e, r, o.no_selection), {
                            content: r,
                            html: r
                        }
                    }
                })(e, o, t, n))).getOr({
                    content: t,
                    html: fb(n.content) ? "" : n.content
                }))(e, t, n),
                insertContent: (t, n) => mb(e, t, n),
                addVisual: t => ((e, t) => {
                    const n = e.dom,
                        o = C(t) ? t : e.getBody();
                    q(n.select("table,a", o), (t => {
                        switch (t.nodeName) {
                            case "TABLE":
                                const o = Od(e),
                                    r = n.getAttrib(t, "border");
                                r && "0" !== r || !e.hasVisual ? n.removeClass(t, o) : n.addClass(t, o);
                                break;
                            case "A":
                                if (!n.getAttrib(t, "href")) {
                                    const o = n.getAttrib(t, "name") || t.id,
                                        r = Td(e);
                                    o && e.hasVisual ? n.addClass(t, r) : n.removeClass(t, r)
                                }
                        }
                    })), e.dispatch("VisualAid", {
                        element: t,
                        hasVisual: e.hasVisual
                    })
                })(e, t)
            },
            selection: {
                getContent: (t, n) => ((e, t, n = {}) => {
                    const o = ((e, t) => ({
                        ...e,
                        format: t,
                        get: !0,
                        selection: !0,
                        getInner: !0
                    }))(n, t);
                    return rC(e, o).fold(R, (t => {
                        const n = ((e, t) => {
                            if ("text" === t.format) return (e => I.from(e.selection.getRng()).map((t => {
                                var n;
                                const o = I.from(e.dom.getParent(t.commonAncestorContainer, e.dom.isBlock)),
                                    r = e.getBody(),
                                    s = (e => e.map((e => e.nodeName)).getOr("div").toLowerCase())(o),
                                    a = vn(t.cloneContents());
                                Vg(a), qg(a);
                                const i = e.dom.add(r, s, {
                                        "data-mce-bogus": "all",
                                        style: "overflow: hidden; opacity: 0;"
                                    }, a.dom),
                                    l = xC(i),
                                    d = Mr(null !== (n = i.textContent) && void 0 !== n ? n : "");
                                if (e.dom.remove(i), wC(d, 0) || wC(d, d.length - 1)) {
                                    const e = o.getOr(r),
                                        t = xC(e),
                                        n = t.indexOf(l);
                                    return -1 === n ? l : (wC(t, n - 1) ? " " : "") + l + (wC(t, n + l.length) ? " " : "")
                                }
                                return l
                            })).getOr(""))(e);
                            {
                                const n = ((e, t) => {
                                    const n = e.selection.getRng(),
                                        o = e.dom.create("body"),
                                        r = e.selection.getSel(),
                                        s = Ag(e, Gu(r)),
                                        a = t.contextual ? CC(vn(e.getBody()), s).dom : n.cloneContents();
                                    return a && o.appendChild(a), e.selection.serializer.serialize(o, t)
                                })(e, t);
                                return "tree" === t.format ? n : e.selection.isCollapsed() ? "" : n
                            }
                        })(e, t);
                        return sC(e, n, t)
                    }))
                })(e, t, n)
            },
            autocompleter: {
                addDecoration: t => Dg(e, t),
                removeDecoration: () => ((e, t) => Pg(t).each((t => {
                    const n = e.selection.getBookmark();
                    wo(t), e.selection.moveToBookmark(n)
                })))(e, vn(e.getBody()))
            },
            raw: {
                getModel: () => I.none()
            }
        }),
        LC = e => ke(e.plugins, "rtc"),
        MC = e => e.rtcInstance ? e.rtcInstance : PC(e),
        IC = e => {
            const t = e.rtcInstance;
            if (t) return t;
            throw new Error("Failed to get RTC instance not yet initialized.")
        },
        FC = e => IC(e).init.bindEvents(),
        UC = e => 0 === e.dom.length ? (Co(e), I.none()) : I.some(e),
        zC = (e, t, n, o) => {
            e.bind((e => ((o ? Gp : Kp)(e.dom, o ? e.dom.length : 0), t.filter(Wt).map((t => ((e, t, n, o) => {
                const r = e.dom,
                    s = t.dom,
                    a = o ? r.length : s.length;
                o ? (Yp(r, s, !1, !o), n.setStart(s, a)) : (Yp(s, r, !1, !o), n.setEnd(s, a))
            })(e, t, n, o)))))).orThunk((() => {
                const e = ((e, t) => e.filter((e => Km.isBookmarkNode(e.dom))).bind(t ? Bn : Tn))(t, o).or(t).filter(Wt);
                return e.map((e => ((e, t) => {
                    Rn(e).each((n => {
                        const o = e.dom;
                        t && Fp(n, Mi(o, 0)) ? Kp(o, 0) : !t && Up(n, Mi(o, o.length)) && Gp(o, o.length)
                    }))
                })(e, o)))
            }))
        },
        jC = (e, t, n) => {
            if (ke(e, t)) {
                const o = G(e[t], (e => e !== n));
                0 === o.length ? delete e[t] : e[t] = o
            }
        };
    const HC = e => !(!e || !e.ownerDocument) && En(vn(e.ownerDocument), vn(e)),
        $C = (e, t, n, o) => {
            let r, s;
            const {
                selectorChangedWithUnbind: a
            } = ((e, t) => {
                let n, o;
                const r = (t, n) => J(n, (n => e.is(n, t))),
                    s = t => e.getParents(t, void 0, e.getRoot());
                return {
                    selectorChangedWithUnbind: (e, a) => (n || (n = {}, o = {}, t.on("NodeChange", (e => {
                        const t = e.element,
                            a = s(t),
                            i = {};
                        ge(n, ((e, t) => {
                            r(t, a).each((n => {
                                o[t] || (q(e, (e => {
                                    e(!0, {
                                        node: n,
                                        selector: t,
                                        parents: a
                                    })
                                })), o[t] = e), i[t] = e
                            }))
                        })), ge(o, ((e, n) => {
                            i[n] || (delete o[n], q(e, (e => {
                                e(!1, {
                                    node: t,
                                    selector: n,
                                    parents: a
                                })
                            })))
                        }))
                    }))), n[e] || (n[e] = []), n[e].push(a), r(e, s(t.selection.getStart())).each((() => {
                        o[e] = n[e]
                    })), {
                        unbind: () => {
                            jC(n, e, a), jC(o, e, a)
                        }
                    })
                }
            })(e, o), i = (e, t) => ((e, t, n = {}) => {
                const o = ((e, t) => ({
                    format: "html",
                    ...e,
                    set: !0,
                    selection: !0,
                    content: t
                }))(n, t);
                aC(e, o).each((t => {
                    const n = ((e, t) => {
                            if ("raw" !== t.format) {
                                const n = e.selection.getRng(),
                                    o = e.dom.getParent(n.commonAncestorContainer, e.dom.isBlock),
                                    r = o ? {
                                        context: o.nodeName.toLowerCase()
                                    } : {},
                                    s = e.parser.parse(t.content, {
                                        forced_root_block: !1,
                                        ...r,
                                        ...t
                                    });
                                return Yg({
                                    validate: !1
                                }, e.schema).serialize(s)
                            }
                            return t.content
                        })(e, t),
                        o = e.selection.getRng();
                    ((e, t) => {
                        const n = I.from(t.firstChild).map(vn),
                            o = I.from(t.lastChild).map(vn);
                        e.deleteContents(), e.insertNode(t);
                        const r = n.bind(Tn).filter(Wt).bind(UC),
                            s = o.bind(Bn).filter(Wt).bind(UC);
                        zC(r, n, e, !0), zC(s, o, e, !1), e.collapse(!1)
                    })(o, o.createContextualFragment(n)), e.selection.setRng(o), eg(e, o), iC(e, n, t)
                }))
            })(o, e, t), l = e => {
                const t = c();
                t.collapse(!!e), u(t)
            }, d = () => t.getSelection ? t.getSelection() : t.document.selection, c = () => {
                let n;
                const a = (e, t, n) => {
                        try {
                            return t.compareBoundaryPoints(e, n)
                        } catch (e) {
                            return -1
                        }
                    },
                    i = t.document;
                if (C(o.bookmark) && !kg(o)) {
                    const e = ug(o);
                    if (e.isSome()) return e.map((e => Ag(o, [e])[0])).getOr(i.createRange())
                }
                try {
                    const e = d();
                    e && !zo(e.anchorNode) && (n = e.rangeCount > 0 ? e.getRangeAt(0) : i.createRange(), n = Ag(o, [n])[0])
                } catch (e) {}
                if (n || (n = i.createRange()), er(n.startContainer) && n.collapsed) {
                    const t = e.getRoot();
                    n.setStart(t, 0), n.setEnd(t, 0)
                }
                return r && s && (0 === a(n.START_TO_START, n, r) && 0 === a(n.END_TO_END, n, r) ? n = s : (r = null, s = null)), n
            }, u = (e, t) => {
                if (!(e => !!e && HC(e.startContainer) && HC(e.endContainer))(e)) return;
                const n = d();
                if (e = o.dispatch("SetSelectionRange", {
                        range: e,
                        forward: t
                    }).range, n) {
                    s = e;
                    try {
                        n.removeAllRanges(), n.addRange(e)
                    } catch (e) {}!1 === t && n.extend && (n.collapse(e.endContainer, e.endOffset), n.extend(e.startContainer, e.startOffset)), r = n.rangeCount > 0 ? n.getRangeAt(0) : null
                }
                if (!e.collapsed && e.startContainer === e.endContainer && (null == n ? void 0 : n.setBaseAndExtent) && e.endOffset - e.startOffset < 2 && e.startContainer.hasChildNodes()) {
                    const t = e.startContainer.childNodes[e.startOffset];
                    t && "IMG" === t.nodeName && (n.setBaseAndExtent(e.startContainer, e.startOffset, e.endContainer, e.endOffset), n.anchorNode === e.startContainer && n.focusNode === e.endContainer || n.setBaseAndExtent(t, 0, t, 1))
                }
                o.dispatch("AfterSetSelectionRange", {
                    range: e,
                    forward: t
                })
            }, m = () => {
                const t = d(),
                    n = null == t ? void 0 : t.anchorNode,
                    o = null == t ? void 0 : t.focusNode;
                if (!t || !n || !o || zo(n) || zo(o)) return !0;
                const r = e.createRng(),
                    s = e.createRng();
                try {
                    r.setStart(n, t.anchorOffset), r.collapse(!0), s.setStart(o, t.focusOffset), s.collapse(!0)
                } catch (e) {
                    return !0
                }
                return r.compareBoundaryPoints(r.START_TO_START, s) <= 0
            }, f = {
                dom: e,
                win: t,
                serializer: n,
                editor: o,
                expand: (t = {
                    type: "word"
                }) => u(Pf(e).expand(c(), t)),
                collapse: l,
                setCursorLocation: (t, n) => {
                    const r = e.createRng();
                    C(t) && C(n) ? (r.setStart(t, n), r.setEnd(t, n), u(r), l(!1)) : (tm(e, r, o.getBody(), !0), u(r))
                },
                getContent: e => ((e, t = {}) => ((e, t, n) => IC(e).selection.getContent(t, n))(e, t.format ? t.format : "html", t))(o, e),
                setContent: i,
                getBookmark: (e, t) => g.getBookmark(e, t),
                moveToBookmark: e => g.moveToBookmark(e),
                select: (t, n) => (((e, t, n) => I.from(t).bind((t => I.from(t.parentNode).map((o => {
                    const r = e.nodeIndex(t),
                        s = e.createRng();
                    return s.setStart(o, r), s.setEnd(o, r + 1), n && (tm(e, s, t, !0), tm(e, s, t, !1)), s
                })))))(e, t, n).each(u), t),
                isCollapsed: () => {
                    const e = c(),
                        t = d();
                    return !(!e || e.item) && (e.compareEndPoints ? 0 === e.compareEndPoints("StartToEnd", e) : !t || e.collapsed)
                },
                isEditable: () => {
                    const t = c(),
                        n = o.getBody().querySelectorAll('[data-mce-selected="1"]');
                    return n.length > 0 ? ne(n, (t => e.isEditable(t.parentElement))) : t.startContainer === t.endContainer ? e.isEditable(t.startContainer) : e.isEditable(t.startContainer) && e.isEditable(t.endContainer)
                },
                isForward: m,
                setNode: t => (i(e.getOuterHTML(t)), t),
                getNode: () => ((e, t) => {
                    if (!t) return e;
                    let n = t.startContainer,
                        o = t.endContainer;
                    const r = t.startOffset,
                        s = t.endOffset;
                    let a = t.commonAncestorContainer;
                    t.collapsed || (n === o && s - r < 2 && n.hasChildNodes() && (a = n.childNodes[r]), Xo(n) && Xo(o) && (n = n.length === r ? Rg(n.nextSibling, !0) : n.parentNode, o = 0 === s ? Rg(o.previousSibling, !1) : o.parentNode, n && n === o && (a = n)));
                    const i = Xo(a) ? a.parentNode : a;
                    return jo(i) ? i : e
                })(o.getBody(), c()),
                getSel: d,
                setRng: u,
                getRng: c,
                getStart: e => _g(o.getBody(), c(), e),
                getEnd: e => Ng(o.getBody(), c(), e),
                getSelectedBlocks: (t, n) => ((e, t, n, o) => {
                    const r = [],
                        s = e.getRoot(),
                        a = e.getParent(n || _g(s, t, t.collapsed), e.isBlock),
                        i = e.getParent(o || Ng(s, t, t.collapsed), e.isBlock);
                    if (a && a !== s && r.push(a), a && i && a !== i) {
                        let t;
                        const n = new Fo(a, s);
                        for (;
                            (t = n.next()) && t !== i;) e.isBlock(t) && r.push(t)
                    }
                    return i && a !== i && i !== s && r.push(i), r
                })(e, c(), t, n),
                normalize: () => {
                    const t = c(),
                        n = d();
                    if (!(Gu(n).length > 1) && nm(o)) {
                        const n = Tf(e, t);
                        return n.each((e => {
                            u(e, m())
                        })), n.getOr(t)
                    }
                    return t
                },
                selectorChanged: (e, t) => (a(e, t), f),
                selectorChangedWithUnbind: a,
                getScrollContainer: () => {
                    let t, n = e.getRoot();
                    for (; n && "BODY" !== n.nodeName;) {
                        if (n.scrollHeight > n.clientHeight) {
                            t = n;
                            break
                        }
                        n = n.parentNode
                    }
                    return t
                },
                scrollIntoView: (e, t) => {
                    C(e) ? ((e, t, n) => {
                        (e.inline ? Qf : Zf)(e, t, n)
                    })(o, e, t) : eg(o, c(), t)
                },
                placeCaretAt: (e, t) => u(kf(e, t, o.getDoc())),
                getBoundingClientRect: () => {
                    const e = c();
                    return e.collapsed ? Mi.fromRangeStart(e).getClientRects()[0] : e.getBoundingClientRect()
                },
                destroy: () => {
                    t = r = s = null, p.destroy()
                }
            }, g = Km(f), p = af(f, o);
            return f.bookmarkManager = g, f.controlSelection = p, f
        },
        VC = (e, t, n) => {
            -1 === Dt.inArray(t, n) && (e.addAttributeFilter(n, ((e, t) => {
                let n = e.length;
                for (; n--;) e[n].attr(t, null)
            })), t.push(n))
        },
        qC = (e, t) => {
            const n = ["data-mce-selected"],
                o = {
                    entity_encoding: "named",
                    remove_trailing_brs: !0,
                    ...e
                },
                r = t && t.dom ? t.dom : Oa.DOM,
                s = t && t.schema ? t.schema : ca(o),
                a = nC(o, s);
            return ((e, t, n) => {
                e.addAttributeFilter("data-mce-tabindex", ((e, t) => {
                    let n = e.length;
                    for (; n--;) {
                        const o = e[n];
                        o.attr("tabindex", o.attr("data-mce-tabindex")), o.attr(t, null)
                    }
                })), e.addAttributeFilter("src,href,style", ((e, o) => {
                    const r = "data-mce-" + o,
                        s = t.url_converter,
                        a = t.url_converter_scope;
                    let i = e.length;
                    for (; i--;) {
                        const t = e[i];
                        let l = t.attr(r);
                        void 0 !== l ? (t.attr(o, l.length > 0 ? l : null), t.attr(r, null)) : (l = t.attr(o), "style" === o ? l = n.serializeStyle(n.parseStyle(l), t.name) : s && (l = s.call(a, l, o, t.name)), t.attr(o, l.length > 0 ? l : null))
                    }
                })), e.addAttributeFilter("class", (e => {
                    let t = e.length;
                    for (; t--;) {
                        const n = e[t];
                        let o = n.attr("class");
                        o && (o = o.replace(/(?:^|\s)mce-item-\w+(?!\S)/g, ""), n.attr("class", o.length > 0 ? o : null))
                    }
                })), e.addAttributeFilter("data-mce-type", ((e, t, n) => {
                    let o = e.length;
                    for (; o--;) {
                        const t = e[o];
                        if ("bookmark" === t.attr("data-mce-type") && !n.cleanup) {
                            const e = I.from(t.firstChild).exists((e => {
                                var t;
                                return !Lr(null !== (t = e.value) && void 0 !== t ? t : "")
                            }));
                            e ? t.unwrap() : t.remove()
                        }
                    }
                })), e.addNodeFilter("noscript", (e => {
                    var t;
                    let n = e.length;
                    for (; n--;) {
                        const o = e[n].firstChild;
                        o && (o.value = Qs.decode(null !== (t = o.value) && void 0 !== t ? t : ""))
                    }
                })), e.addNodeFilter("script,style", ((e, n) => {
                    var o;
                    const r = e => e.replace(/(<!--\[CDATA\[|\]\]-->)/g, "\n").replace(/^[\r\n]*|[\r\n]*$/g, "").replace(/^\s*((<!--)?(\s*\/\/)?\s*<!\[CDATA\[|(<!--\s*)?\/\*\s*<!\[CDATA\[\s*\*\/|(\/\/)?\s*<!--|\/\*\s*<!--\s*\*\/)\s*[\r\n]*/gi, "").replace(/\s*(\/\*\s*\]\]>\s*\*\/(-->)?|\s*\/\/\s*\]\]>(-->)?|\/\/\s*(-->)?|\]\]>|\/\*\s*-->\s*\*\/|\s*-->\s*)\s*$/g, "");
                    let s = e.length;
                    for (; s--;) {
                        const a = e[s],
                            i = a.firstChild,
                            l = null !== (o = null == i ? void 0 : i.value) && void 0 !== o ? o : "";
                        if ("script" === n) {
                            const e = a.attr("type");
                            e && a.attr("type", "mce-no/type" === e ? null : e.replace(/^mce\-/, "")), "xhtml" === t.element_format && i && l.length > 0 && (i.value = "// <![CDATA[\n" + r(l) + "\n// ]]>")
                        } else "xhtml" === t.element_format && i && l.length > 0 && (i.value = "\x3c!--\n" + r(l) + "\n--\x3e")
                    }
                })), e.addNodeFilter("#comment", (e => {
                    let o = e.length;
                    for (; o--;) {
                        const r = e[o],
                            s = r.value;
                        t.preserve_cdata && 0 === (null == s ? void 0 : s.indexOf("[CDATA[")) ? (r.name = "#cdata", r.type = 4, r.value = n.decode(s.replace(/^\[CDATA\[|\]\]$/g, ""))) : 0 === (null == s ? void 0 : s.indexOf("mce:protected ")) && (r.name = "#text", r.type = 3, r.raw = !0, r.value = unescape(s).substr(14))
                    }
                })), e.addNodeFilter("xml:namespace,input", ((e, t) => {
                    let n = e.length;
                    for (; n--;) {
                        const o = e[n];
                        7 === o.type ? o.remove() : 1 === o.type && ("input" !== t || o.attr("type") || o.attr("type", "text"))
                    }
                })), e.addAttributeFilter("data-mce-type", (t => {
                    q(t, (t => {
                        "format-caret" === t.attr("data-mce-type") && (t.isEmpty(e.schema.getNonEmptyElements()) ? t.remove() : t.unwrap())
                    }))
                })), e.addAttributeFilter("data-mce-src,data-mce-href,data-mce-style,data-mce-selected,data-mce-expando,data-mce-block,data-mce-type,data-mce-resize,data-mce-placeholder", ((e, t) => {
                    let n = e.length;
                    for (; n--;) e[n].attr(t, null)
                })), t.remove_trailing_brs && Ov(e, e.schema)
            })(a, o, r), {
                schema: s,
                addNodeFilter: a.addNodeFilter,
                addAttributeFilter: a.addAttributeFilter,
                serialize: (e, n = {}) => {
                    const i = {
                            format: "html",
                            ...n
                        },
                        l = ((e, t, n) => ((e, t) => C(e) && e.hasEventListeners("PreProcess") && !t.no_events)(e, n) ? ((e, t, n) => {
                            let o;
                            const r = e.dom;
                            let s = t.cloneNode(!0);
                            const a = document.implementation;
                            if (a.createHTMLDocument) {
                                const e = a.createHTMLDocument("");
                                Dt.each("BODY" === s.nodeName ? s.childNodes : [s], (t => {
                                    e.body.appendChild(e.importNode(t, !0))
                                })), s = "BODY" !== s.nodeName ? e.body.firstChild : e.body, o = r.doc, r.doc = e
                            }
                            return ((e, t) => {
                                e.dispatch("PreProcess", t)
                            })(e, {
                                ...n,
                                node: s
                            }), o && (r.doc = o), s
                        })(e, t, n) : t)(t, e, i),
                        d = ((e, t, n) => {
                            const o = Mr(n.getInner ? t.innerHTML : e.getOuterHTML(t));
                            return n.selection || Rr(vn(t)) ? o : Dt.trim(o)
                        })(r, l, i),
                        c = ((e, t, n) => {
                            const o = n.selection ? {
                                    forced_root_block: !1,
                                    ...n
                                } : n,
                                r = e.parse(t, o);
                            return (e => {
                                const t = e => "br" === (null == e ? void 0 : e.name),
                                    n = e.lastChild;
                                if (t(n)) {
                                    const e = n.prev;
                                    t(e) && (n.remove(), e.remove())
                                }
                            })(r), r
                        })(a, d, i);
                    return "tree" === i.format ? c : ((e, t, n, o, r) => {
                        const s = ((e, t, n) => Yg(e, t).serialize(n))(t, n, o);
                        return ((e, t, n) => {
                            if (!t.no_events && e) {
                                const o = ((e, t) => e.dispatch("PostProcess", t))(e, {
                                    ...t,
                                    content: n
                                });
                                return o.content
                            }
                            return n
                        })(e, r, s)
                    })(t, o, s, c, i)
                },
                addRules: s.addValidElements,
                setRules: s.setValidElements,
                addTempAttr: O(VC, a, n),
                getTempAttrs: N(n),
                getNodeFilters: a.getNodeFilters,
                getAttributeFilters: a.getAttributeFilters,
                removeNodeFilter: a.removeNodeFilter,
                removeAttributeFilter: a.removeAttributeFilter
            }
        },
        WC = (e, t) => {
            const n = qC(e, t);
            return {
                schema: n.schema,
                addNodeFilter: n.addNodeFilter,
                addAttributeFilter: n.addAttributeFilter,
                serialize: n.serialize,
                addRules: n.addRules,
                setRules: n.setRules,
                addTempAttr: n.addTempAttr,
                getTempAttrs: n.getTempAttrs,
                getNodeFilters: n.getNodeFilters,
                getAttributeFilters: n.getAttributeFilters,
                removeNodeFilter: n.removeNodeFilter,
                removeAttributeFilter: n.removeAttributeFilter
            }
        },
        KC = (e, t, n = {}) => {
            const o = ((e, t) => ({
                format: "html",
                ...e,
                set: !0,
                content: t
            }))(n, t);
            return aC(e, o).map((t => {
                const n = ((e, t, n) => MC(e).editor.setContent(t, n))(e, t.content, t);
                return iC(e, n.html, t), n.content
            })).getOr(t)
        },
        GC = "autoresize_on_init,content_editable_state,padd_empty_with_br,block_elements,boolean_attributes,editor_deselector,editor_selector,elements,file_browser_callback_types,filepicker_validator_handler,force_hex_style_colors,force_p_newlines,gecko_spellcheck,images_dataimg_filter,media_scripts,mode,move_caret_before_on_enter_elements,non_empty_elements,self_closing_elements,short_ended_elements,special,spellchecker_select_languages,spellchecker_whitelist,tab_focus,tabfocus_elements,table_responsive_width,text_block_elements,text_inline_elements,toolbar_drawer,types,validate,whitespace_elements,paste_enable_default_filters,paste_filter_drop,paste_word_valid_elements,paste_retain_style_properties,paste_convert_word_fake_lists".split(","),
        YC = "template_cdate_classes,template_mdate_classes,template_selected_content_classes,template_preview_replace_values,template_replace_values,templates,template_cdate_format,template_mdate_format".split(","),
        XC = "bbcode,colorpicker,contextmenu,fullpage,legacyoutput,spellchecker,textcolor".split(","),
        QC = [{
            name: "template",
            replacedWith: "Advanced Template"
        }, {
            name: "rtc"
        }],
        JC = (e, t) => {
            const n = G(t, (t => ke(e, t)));
            return ae(n)
        },
        ZC = e => {
            const t = JC(e, GC),
                n = e.forced_root_block;
            return !1 !== n && "" !== n || t.push("forced_root_block (false only)"), ae(t)
        },
        ew = e => JC(e, YC),
        tw = (e, t) => {
            const n = Dt.makeMap(e.plugins, " "),
                o = G(t, (e => ke(n, e)));
            return ae(o)
        },
        nw = e => tw(e, XC),
        ow = e => tw(e, QC.map((e => e.name))),
        rw = e => J(QC, (t => t.name === e)).fold((() => e), (t => t.replacedWith ? `${e}, replaced by ${t.replacedWith}` : e)),
        sw = Oa.DOM,
        aw = e => I.from(e).each((e => e.destroy())),
        iw = (() => {
            const e = {};
            return {
                add: (t, n) => {
                    e[t] = n
                },
                get: t => e[t] ? e[t] : {
                    icons: {}
                },
                has: t => ke(e, t)
            }
        })(),
        lw = Fa.ModelManager,
        dw = (e, t) => t.dom[e],
        cw = (e, t) => parseInt(io(t, e), 10),
        uw = O(dw, "clientWidth"),
        mw = O(dw, "clientHeight"),
        fw = O(cw, "margin-top"),
        gw = O(cw, "margin-left"),
        pw = e => {
            const t = [],
                n = () => {
                    const t = e.theme;
                    return t && t.getNotificationManagerImpl ? t.getNotificationManagerImpl() : (() => {
                        const e = () => {
                            throw new Error("Theme did not provide a NotificationManager implementation.")
                        };
                        return {
                            open: e,
                            close: e,
                            getArgs: e
                        }
                    })()
                },
                o = () => I.from(t[0]),
                r = () => {
                    q(t, (e => {
                        e.reposition()
                    }))
                },
                s = e => {
                    Z(t, (t => t === e)).each((e => {
                        t.splice(e, 1)
                    }))
                },
                a = (a, i = !0) => e.removed || !(e => {
                    return (t = e.inline ? e.getBody() : e.getContentAreaContainer(), I.from(t).map(vn)).map(Gn).getOr(!1);
                    var t
                })(e) ? {} : (i && e.dispatch("BeforeOpenNotification", {
                    notification: a
                }), J(t, (e => {
                    return t = n().getArgs(e), o = a, !(t.type !== o.type || t.text !== o.text || t.progressBar || t.timeout || o.progressBar || o.timeout);
                    var t, o
                })).getOrThunk((() => {
                    e.editorManager.setActive(e);
                    const i = n().open(a, (() => {
                        s(i), r(), o().fold((() => e.focus()), (e => tg(vn(e.getEl()))))
                    }));
                    return (e => {
                        t.push(e)
                    })(i), r(), e.dispatch("OpenNotification", {
                        notification: {
                            ...i
                        }
                    }), i
                }))),
                i = N(t);
            return (e => {
                e.on("SkinLoaded", (() => {
                    const t = sd(e);
                    t && a({
                        text: t,
                        type: "warning",
                        timeout: 0
                    }, !1), r()
                })), e.on("show ResizeEditor ResizeWindow NodeChange", (() => {
                    requestAnimationFrame(r)
                })), e.on("remove", (() => {
                    q(t.slice(), (e => {
                        n().close(e)
                    }))
                }))
            })(e), {
                open: a,
                close: () => {
                    o().each((e => {
                        n().close(e), s(e), r()
                    }))
                },
                getNotifications: i
            }
        },
        hw = Fa.PluginManager,
        bw = Fa.ThemeManager,
        vw = e => {
            let t = [];
            const n = () => {
                    const t = e.theme;
                    return t && t.getWindowManagerImpl ? t.getWindowManagerImpl() : (() => {
                        const e = () => {
                            throw new Error("Theme did not provide a WindowManager implementation.")
                        };
                        return {
                            open: e,
                            openUrl: e,
                            alert: e,
                            confirm: e,
                            close: e
                        }
                    })()
                },
                o = (e, t) => (...n) => t ? t.apply(e, n) : void 0,
                r = n => {
                    (t => {
                        e.dispatch("CloseWindow", {
                            dialog: t
                        })
                    })(n), t = G(t, (e => e !== n)), 0 === t.length && e.focus()
                },
                s = n => {
                    e.editorManager.setActive(e), cg(e), e.ui.show();
                    const o = n();
                    return (n => {
                        t.push(n), (t => {
                            e.dispatch("OpenWindow", {
                                dialog: t
                            })
                        })(n)
                    })(o), o
                };
            return e.on("remove", (() => {
                q(t, (e => {
                    n().close(e)
                }))
            })), {
                open: (e, t) => s((() => n().open(e, t, r))),
                openUrl: e => s((() => n().openUrl(e, r))),
                alert: (e, t, r) => {
                    const s = n();
                    s.alert(e, o(r || s, t))
                },
                confirm: (e, t, r) => {
                    const s = n();
                    s.confirm(e, o(r || s, t))
                },
                close: () => {
                    I.from(t[t.length - 1]).each((e => {
                        n().close(e), r(e)
                    }))
                }
            }
        },
        yw = (e, t) => {
            e.notificationManager.open({
                type: "error",
                text: t
            })
        },
        Cw = (e, t) => {
            e._skinLoaded ? yw(e, t) : e.on("SkinLoaded", (() => {
                yw(e, t)
            }))
        },
        ww = (e, t, n) => {
            Ym(e, t, {
                message: n
            }), console.error(n)
        },
        xw = (e, t, n) => n ? `Failed to load ${e}: ${n} from url ${t}` : `Failed to load ${e} url: ${t}`,
        kw = (e, ...t) => {
            const n = window.console;
            n && (n.error ? n.error(e, ...t) : n.log(e, ...t))
        },
        Ew = (e, t) => {
            const n = e.editorManager.baseURL + "/skins/content",
                o = `content${e.editorManager.suffix}.css`;
            return V(t, (t => (e => /^[a-z0-9\-]+$/i.test(e))(t) && !e.inline ? `${n}/${t}/${o}` : e.documentBaseURI.toAbsolute(t)))
        },
        Sw = (e, t) => {
            const n = {};
            return {
                findAll: (o, r = M) => {
                    const s = G((e => e ? ce(e.getElementsByTagName("img")) : [])(o), (t => {
                            const n = t.src;
                            return !t.hasAttribute("data-mce-bogus") && !t.hasAttribute("data-mce-placeholder") && !(!n || n === At.transparentSrc) && (He(n, "blob:") ? !e.isUploaded(n) && r(t) : !!He(n, "data:") && r(t))
                        })),
                        a = V(s, (e => {
                            const o = e.src;
                            if (ke(n, o)) return n[o].then((t => m(t) ? t : {
                                image: e,
                                blobInfo: t.blobInfo
                            }));
                            {
                                const r = ((e, t) => {
                                    const n = () => Promise.reject("Invalid data URI");
                                    if (He(t, "blob:")) {
                                        const s = e.getByUri(t);
                                        return C(s) ? Promise.resolve(s) : (o = t, He(o, "blob:") ? (e => fetch(e).then((e => e.ok ? e.blob() : Promise.reject())).catch((() => Promise.reject({
                                            message: `Cannot convert ${e} to Blob. Resource might not exist or is inaccessible.`,
                                            uriType: "blob"
                                        }))))(o) : He(o, "data:") ? (r = o, new Promise(((e, t) => {
                                            Tv(r).bind((({
                                                type: e,
                                                data: t,
                                                base64Encoded: n
                                            }) => Bv(e, t, n))).fold((() => t("Invalid data URI")), e)
                                        }))) : Promise.reject("Unknown URI format")).then((t => Dv(t).then((o => Lv(o, !1, (n => I.some(Mv(e, t, n)))).getOrThunk(n)))))
                                    }
                                    var o, r;
                                    return He(t, "data:") ? Iv(e, t).fold(n, (e => Promise.resolve(e))) : Promise.reject("Unknown image data format")
                                })(t, o).then((t => (delete n[o], {
                                    image: e,
                                    blobInfo: t
                                }))).catch((e => (delete n[o], e)));
                                return n[o] = r, r
                            }
                        }));
                    return Promise.all(a)
                }
            }
        },
        _w = () => {
            let e = {};
            const t = (e, t) => ({
                    status: e,
                    resultUri: t
                }),
                n = t => t in e;
            return {
                hasBlobUri: n,
                getResultUri: t => {
                    const n = e[t];
                    return n ? n.resultUri : null
                },
                isPending: t => !!n(t) && 1 === e[t].status,
                isUploaded: t => !!n(t) && 2 === e[t].status,
                markPending: n => {
                    e[n] = t(1, null)
                },
                markUploaded: (n, o) => {
                    e[n] = t(2, o)
                },
                removeFailed: t => {
                    delete e[t]
                },
                destroy: () => {
                    e = {}
                }
            }
        };
    let Nw = 0;
    const Rw = (e, t) => {
            const n = {},
                o = (e, n) => new Promise(((o, r) => {
                    const s = new XMLHttpRequest;
                    s.open("POST", t.url), s.withCredentials = t.credentials, s.upload.onprogress = e => {
                        n(e.loaded / e.total * 100)
                    }, s.onerror = () => {
                        r("Image upload failed due to a XHR Transport error. Code: " + s.status)
                    }, s.onload = () => {
                        if (s.status < 200 || s.status >= 300) return void r("HTTP Error: " + s.status);
                        const e = JSON.parse(s.responseText);
                        var n, a;
                        e && m(e.location) ? o((n = t.basePath, a = e.location, n ? n.replace(/\/$/, "") + "/" + a.replace(/^\//, "") : a)) : r("Invalid JSON: " + s.responseText)
                    };
                    const a = new FormData;
                    a.append("file", e.blob(), e.filename()), s.send(a)
                })),
                r = w(t.handler) ? t.handler : o,
                s = (e, t) => ({
                    url: t,
                    blobInfo: e,
                    status: !0
                }),
                a = (e, t) => ({
                    url: "",
                    blobInfo: e,
                    status: !1,
                    error: t
                }),
                i = (e, t) => {
                    Dt.each(n[e], (e => {
                        e(t)
                    })), delete n[e]
                };
            return {
                upload: (l, d) => t.url || r !== o ? ((t, o) => (t = Dt.grep(t, (t => !e.isUploaded(t.blobUri()))), Promise.all(Dt.map(t, (t => e.isPending(t.blobUri()) ? (e => {
                    const t = e.blobUri();
                    return new Promise((e => {
                        n[t] = n[t] || [], n[t].push(e)
                    }))
                })(t) : ((t, n, o) => (e.markPending(t.blobUri()), new Promise((r => {
                    let l, d;
                    try {
                        const c = () => {
                                l && (l.close(), d = E)
                            },
                            u = n => {
                                c(), e.markUploaded(t.blobUri(), n), i(t.blobUri(), s(t, n)), r(s(t, n))
                            },
                            f = n => {
                                c(), e.removeFailed(t.blobUri()), i(t.blobUri(), a(t, n)), r(a(t, n))
                            };
                        d = e => {
                            e < 0 || e > 100 || I.from(l).orThunk((() => I.from(o).map(D))).each((t => {
                                l = t, t.progressBar.value(e)
                            }))
                        }, n(t, d).then(u, (e => {
                            f(m(e) ? {
                                message: e
                            } : e)
                        }))
                    } catch (e) {
                        r(a(t, e))
                    }
                }))))(t, r, o))))))(l, d) : new Promise((e => {
                    e([])
                }))
            }
        },
        Aw = e => () => e.notificationManager.open({
            text: e.translate("Image uploading..."),
            type: "info",
            timeout: -1,
            progressBar: !0
        }),
        Ow = (e, t) => Rw(t, {
            url: zl(e),
            basePath: jl(e),
            credentials: Hl(e),
            handler: $l(e)
        }),
        Tw = e => {
            const t = (() => {
                let e = [];
                const t = e => {
                        if (!e.blob || !e.base64) throw new Error("blob and base64 representations of the image are required for BlobInfo to be created");
                        const t = e.id || "blobid" + Nw++ + (() => {
                                const e = () => Math.round(4294967295 * Math.random()).toString(36);
                                return "s" + (new Date).getTime().toString(36) + e() + e() + e()
                            })(),
                            n = e.name || t,
                            o = e.blob;
                        var r;
                        return {
                            id: N(t),
                            name: N(n),
                            filename: N(e.filename || n + "." + (r = o.type, {
                                "image/jpeg": "jpg",
                                "image/jpg": "jpg",
                                "image/gif": "gif",
                                "image/png": "png",
                                "image/apng": "apng",
                                "image/avif": "avif",
                                "image/svg+xml": "svg",
                                "image/webp": "webp",
                                "image/bmp": "bmp",
                                "image/tiff": "tiff"
                            } [r.toLowerCase()] || "dat")),
                            blob: N(o),
                            base64: N(e.base64),
                            blobUri: N(e.blobUri || URL.createObjectURL(o)),
                            uri: N(e.uri)
                        }
                    },
                    n = t => J(e, t).getOrUndefined(),
                    o = e => n((t => t.id() === e));
                return {
                    create: (e, n, o, r, s) => {
                        if (m(e)) return t({
                            id: e,
                            name: r,
                            filename: s,
                            blob: n,
                            base64: o
                        });
                        if (f(e)) return t(e);
                        throw new Error("Unknown input type")
                    },
                    add: t => {
                        o(t.id()) || e.push(t)
                    },
                    get: o,
                    getByUri: e => n((t => t.blobUri() === e)),
                    getByData: (e, t) => n((n => n.base64() === e && n.blob().type === t)),
                    findFirst: n,
                    removeByUri: t => {
                        e = G(e, (e => e.blobUri() !== t || (URL.revokeObjectURL(e.blobUri()), !1)))
                    },
                    destroy: () => {
                        q(e, (e => {
                            URL.revokeObjectURL(e.blobUri())
                        })), e = []
                    }
                }
            })();
            let n, o;
            const r = _w(),
                s = [],
                a = t => n => e.selection ? t(n) : [],
                i = (e, t, n) => {
                    let o = 0;
                    do {
                        o = e.indexOf(t, o), -1 !== o && (e = e.substring(0, o) + n + e.substr(o + t.length), o += n.length - t.length + 1)
                    } while (-1 !== o);
                    return e
                },
                l = (e, t, n) => {
                    const o = `src="${n}"${n===At.transparentSrc?' data-mce-placeholder="1"':""}`;
                    return e = i(e, `src="${t}"`, o), i(e, 'data-mce-src="' + t + '"', 'data-mce-src="' + n + '"')
                },
                d = (t, n) => {
                    q(e.undoManager.data, (e => {
                        "fragmented" === e.type ? e.fragments = V(e.fragments, (e => l(e, t, n))) : e.content = l(e.content, t, n)
                    }))
                },
                c = () => (n || (n = Ow(e, r)), p().then(a((o => {
                    const r = V(o, (e => e.blobInfo));
                    return n.upload(r, Aw(e)).then(a((n => {
                        const r = [];
                        let s = !1;
                        const a = V(n, ((n, a) => {
                            const {
                                blobInfo: i,
                                image: l
                            } = o[a];
                            let c = !1;
                            return n.status && Il(e) ? (n.url && !je(l.src, n.url) && (s = !0), t.removeByUri(l.src), LC(e) || ((t, n) => {
                                const o = e.convertURL(n, "src");
                                var r;
                                d(t.src, n), Jt(vn(t), {
                                    src: Ml(e) ? (r = n, r + (-1 === r.indexOf("?") ? "?" : "&") + (new Date).getTime()) : n,
                                    "data-mce-src": o
                                })
                            })(l, n.url)) : n.error && (n.error.remove && (d(l.src, At.transparentSrc), r.push(l), c = !0), ((e, t) => {
                                Cw(e, Ia.translate(["Failed to upload image: {0}", t]))
                            })(e, n.error.message)), {
                                element: l,
                                status: n.status,
                                uploadUri: n.url,
                                blobInfo: i,
                                removed: c
                            }
                        }));
                        return r.length > 0 && !LC(e) ? e.undoManager.transact((() => {
                            q(xo(r), (n => {
                                const o = Rn(n);
                                Co(n), o.each((e => t => {
                                    ((e, t) => e.dom.isEmpty(t.dom) && C(e.schema.getTextBlockElements()[jt(t)]))(e, t) && ho(t, pn('<br data-mce-bogus="1" />'))
                                })(e)), t.removeByUri(n.dom.src)
                            }))
                        })) : s && e.undoManager.dispatchChange(), a
                    })))
                })))),
                u = () => Ll(e) ? c() : Promise.resolve([]),
                g = e => ne(s, (t => t(e))),
                p = () => (o || (o = Sw(r, t)), o.findAll(e.getBody(), g).then(a((t => {
                    const n = G(t, (t => m(t) ? (Cw(e, t), !1) : "blob" !== t.uriType));
                    return LC(e) || q(n, (e => {
                        d(e.image.src, e.blobInfo.blobUri()), e.image.src = e.blobInfo.blobUri(), e.image.removeAttribute("data-mce-src")
                    })), n
                })))),
                h = n => n.replace(/src="(blob:[^"]+)"/g, ((n, o) => {
                    const s = r.getResultUri(o);
                    if (s) return 'src="' + s + '"';
                    let a = t.getByUri(o);
                    return a || (a = X(e.editorManager.get(), ((e, t) => e || t.editorUpload && t.editorUpload.blobCache.getByUri(o)), void 0)), a ? 'src="data:' + a.blob().type + ";base64," + a.base64() + '"' : n
                }));
            return e.on("SetContent", (() => {
                Ll(e) ? u() : p()
            })), e.on("RawSaveContent", (e => {
                e.content = h(e.content)
            })), e.on("GetContent", (e => {
                e.source_view || "raw" === e.format || "tree" === e.format || (e.content = h(e.content))
            })), e.on("PostRender", (() => {
                e.parser.addNodeFilter("img", (e => {
                    q(e, (e => {
                        const n = e.attr("src");
                        if (!n || t.getByUri(n)) return;
                        const o = r.getResultUri(n);
                        o && e.attr("src", o)
                    }))
                }))
            })), {
                blobCache: t,
                addFilter: e => {
                    s.push(e)
                },
                uploadImages: c,
                uploadImagesAuto: u,
                scanForImages: p,
                destroy: () => {
                    t.destroy(), r.destroy(), o = n = null
                }
            }
        },
        Bw = {
            remove_similar: !0,
            inherit: !1
        },
        Dw = {
            selector: "td,th",
            ...Bw
        },
        Pw = {
            tablecellbackgroundcolor: {
                styles: {
                    backgroundColor: "%value"
                },
                ...Dw
            },
            tablecellverticalalign: {
                styles: {
                    "vertical-align": "%value"
                },
                ...Dw
            },
            tablecellbordercolor: {
                styles: {
                    borderColor: "%value"
                },
                ...Dw
            },
            tablecellclass: {
                classes: ["%value"],
                ...Dw
            },
            tableclass: {
                selector: "table",
                classes: ["%value"],
                ...Bw
            },
            tablecellborderstyle: {
                styles: {
                    borderStyle: "%value"
                },
                ...Dw
            },
            tablecellborderwidth: {
                styles: {
                    borderWidth: "%value"
                },
                ...Dw
            }
        },
        Lw = N(Pw),
        Mw = Dt.each,
        Iw = Oa.DOM,
        Fw = e => C(e) && f(e),
        Uw = (e, t) => {
            const n = t && t.schema || ca({}),
                o = e => {
                    const t = m(e) ? {
                            name: e,
                            classes: [],
                            attrs: {}
                        } : e,
                        n = Iw.create(t.name);
                    return ((e, t) => {
                        t.classes.length > 0 && Iw.addClass(e, t.classes.join(" ")), Iw.setAttribs(e, t.attrs)
                    })(n, t), n
                },
                r = (e, t, s) => {
                    let a;
                    const i = t[0],
                        l = Fw(i) ? i.name : void 0,
                        d = ((e, t) => {
                            const o = n.getElementRule(e.nodeName.toLowerCase()),
                                r = null == o ? void 0 : o.parentsRequired;
                            return !(!r || !r.length) && (t && H(r, t) ? t : r[0])
                        })(e, l);
                    if (d) l === d ? (a = i, t = t.slice(1)) : a = d;
                    else if (i) a = i, t = t.slice(1);
                    else if (!s) return e;
                    const c = a ? o(a) : Iw.create("div");
                    c.appendChild(e), s && Dt.each(s, (t => {
                        const n = o(t);
                        c.insertBefore(n, e)
                    }));
                    const u = Fw(a) ? a.siblings : void 0;
                    return r(c, t, u)
                },
                s = Iw.create("div");
            if (e.length > 0) {
                const t = e[0],
                    n = o(t),
                    a = Fw(t) ? t.siblings : void 0;
                s.appendChild(r(n, e.slice(1), a))
            }
            return s
        },
        zw = e => {
            let t = "div";
            const n = {
                name: t,
                classes: [],
                attrs: {},
                selector: e = Dt.trim(e)
            };
            return "*" !== e && (t = e.replace(/(?:([#\.]|::?)([\w\-]+)|(\[)([^\]]+)\]?)/g, ((e, t, o, r, s) => {
                switch (t) {
                    case "#":
                        n.attrs.id = o;
                        break;
                    case ".":
                        n.classes.push(o);
                        break;
                    case ":":
                        -1 !== Dt.inArray("checked disabled enabled read-only required".split(" "), o) && (n.attrs[o] = o)
                }
                if ("[" === r) {
                    const e = s.match(/([\w\-]+)(?:\=\"([^\"]+))?/);
                    e && (n.attrs[e[1]] = e[2])
                }
                return ""
            }))), n.name = t || "div", n
        },
        jw = (e, t) => {
            let n = "",
                o = md(e);
            if ("" === o) return "";
            const r = e => m(e) ? e.replace(/%(\w+)/g, "") : "",
                s = (t, n) => Iw.getStyle(null != n ? n : e.getBody(), t, !0);
            if (m(t)) {
                const n = e.formatter.get(t);
                if (!n) return "";
                t = n[0]
            }
            if ("preview" in t) {
                const e = t.preview;
                if (!1 === e) return "";
                o = e || o
            }
            let a, i = t.block || t.inline || "span";
            const l = (d = t.selector, m(d) ? (d = (d = d.split(/\s*,\s*/)[0]).replace(/\s*(~\+|~|\+|>)\s*/g, "$1"), Dt.map(d.split(/(?:>|\s+(?![^\[\]]+\]))/), (e => {
                const t = Dt.map(e.split(/(?:~\+|~|\+)/), zw),
                    n = t.pop();
                return t.length && (n.siblings = t), n
            })).reverse()) : []);
            var d;
            l.length > 0 ? (l[0].name || (l[0].name = i), i = t.selector, a = Uw(l, e)) : a = Uw([i], e);
            const c = Iw.select(i, a)[0] || a.firstChild;
            Mw(t.styles, ((e, t) => {
                const n = r(e);
                n && Iw.setStyle(c, t, n)
            })), Mw(t.attributes, ((e, t) => {
                const n = r(e);
                n && Iw.setAttrib(c, t, n)
            })), Mw(t.classes, (e => {
                const t = r(e);
                Iw.hasClass(c, t) || Iw.addClass(c, t)
            })), e.dispatch("PreviewFormats"), Iw.setStyles(a, {
                position: "absolute",
                left: -65535
            }), e.getBody().appendChild(a);
            const u = s("fontSize"),
                f = /px$/.test(u) ? parseInt(u, 10) : 0;
            return Mw(o.split(" "), (e => {
                let t = s(e, c);
                if (!("background-color" === e && /transparent|rgba\s*\([^)]+,\s*0\)/.test(t) && (t = s(e), "#ffffff" === Ku(t).toLowerCase()) || "color" === e && "#000000" === Ku(t).toLowerCase())) {
                    if ("font-size" === e && /em|%$/.test(t)) {
                        if (0 === f) return;
                        t = parseFloat(t) / (/%$/.test(t) ? 100 : 1) * f + "px"
                    }
                    "border" === e && t && (n += "padding:0 2px;"), n += e + ":" + t + ";"
                }
            })), e.dispatch("AfterPreviewFormats"), Iw.remove(a), n
        },
        Hw = e => {
            const t = (e => {
                    const t = {},
                        n = (e, o) => {
                            e && (m(e) ? (p(o) || (o = [o]), q(o, (e => {
                                v(e.deep) && (e.deep = !km(e)), v(e.split) && (e.split = !km(e) || Em(e)), v(e.remove) && km(e) && !Em(e) && (e.remove = "none"), km(e) && Em(e) && (e.mixed = !0, e.block_expand = !0), m(e.classes) && (e.classes = e.classes.split(/\s+/))
                            })), t[e] = o) : ge(e, ((e, t) => {
                                n(t, e)
                            })))
                        };
                    return n((e => {
                        const t = e.dom,
                            n = e.schema.type,
                            o = {
                                valigntop: [{
                                    selector: "td,th",
                                    styles: {
                                        verticalAlign: "top"
                                    }
                                }],
                                valignmiddle: [{
                                    selector: "td,th",
                                    styles: {
                                        verticalAlign: "middle"
                                    }
                                }],
                                valignbottom: [{
                                    selector: "td,th",
                                    styles: {
                                        verticalAlign: "bottom"
                                    }
                                }],
                                alignleft: [{
                                    selector: "figure.image",
                                    collapsed: !1,
                                    classes: "align-left",
                                    ceFalseOverride: !0,
                                    preview: "font-family font-size"
                                }, {
                                    selector: "figure,p,h1,h2,h3,h4,h5,h6,td,th,tr,div,ul,ol,li,pre",
                                    styles: {
                                        textAlign: "left"
                                    },
                                    inherit: !1,
                                    preview: !1
                                }, {
                                    selector: "img,audio,video",
                                    collapsed: !1,
                                    styles: {
                                        float: "left"
                                    },
                                    preview: "font-family font-size"
                                }, {
                                    selector: "table",
                                    collapsed: !1,
                                    styles: {
                                        marginLeft: "0px",
                                        marginRight: "auto"
                                    },
                                    onformat: e => {
                                        t.setStyle(e, "float", null)
                                    },
                                    preview: "font-family font-size"
                                }, {
                                    selector: ".mce-preview-object,[data-ephox-embed-iri]",
                                    ceFalseOverride: !0,
                                    styles: {
                                        float: "left"
                                    }
                                }],
                                aligncenter: [{
                                    selector: "figure,p,h1,h2,h3,h4,h5,h6,td,th,tr,div,ul,ol,li,pre",
                                    styles: {
                                        textAlign: "center"
                                    },
                                    inherit: !1,
                                    preview: "font-family font-size"
                                }, {
                                    selector: "figure.image",
                                    collapsed: !1,
                                    classes: "align-center",
                                    ceFalseOverride: !0,
                                    preview: "font-family font-size"
                                }, {
                                    selector: "img,audio,video",
                                    collapsed: !1,
                                    styles: {
                                        display: "block",
                                        marginLeft: "auto",
                                        marginRight: "auto"
                                    },
                                    preview: !1
                                }, {
                                    selector: "table",
                                    collapsed: !1,
                                    styles: {
                                        marginLeft: "auto",
                                        marginRight: "auto"
                                    },
                                    preview: "font-family font-size"
                                }, {
                                    selector: ".mce-preview-object",
                                    ceFalseOverride: !0,
                                    styles: {
                                        display: "table",
                                        marginLeft: "auto",
                                        marginRight: "auto"
                                    },
                                    preview: !1
                                }, {
                                    selector: "[data-ephox-embed-iri]",
                                    ceFalseOverride: !0,
                                    styles: {
                                        marginLeft: "auto",
                                        marginRight: "auto"
                                    },
                                    preview: !1
                                }],
                                alignright: [{
                                    selector: "figure.image",
                                    collapsed: !1,
                                    classes: "align-right",
                                    ceFalseOverride: !0,
                                    preview: "font-family font-size"
                                }, {
                                    selector: "figure,p,h1,h2,h3,h4,h5,h6,td,th,tr,div,ul,ol,li,pre",
                                    styles: {
                                        textAlign: "right"
                                    },
                                    inherit: !1,
                                    preview: "font-family font-size"
                                }, {
                                    selector: "img,audio,video",
                                    collapsed: !1,
                                    styles: {
                                        float: "right"
                                    },
                                    preview: "font-family font-size"
                                }, {
                                    selector: "table",
                                    collapsed: !1,
                                    styles: {
                                        marginRight: "0px",
                                        marginLeft: "auto"
                                    },
                                    onformat: e => {
                                        t.setStyle(e, "float", null)
                                    },
                                    preview: "font-family font-size"
                                }, {
                                    selector: ".mce-preview-object,[data-ephox-embed-iri]",
                                    ceFalseOverride: !0,
                                    styles: {
                                        float: "right"
                                    },
                                    preview: !1
                                }],
                                alignjustify: [{
                                    selector: "figure,p,h1,h2,h3,h4,h5,h6,td,th,tr,div,ul,ol,li,pre",
                                    styles: {
                                        textAlign: "justify"
                                    },
                                    inherit: !1,
                                    preview: "font-family font-size"
                                }],
                                bold: [{
                                    inline: "strong",
                                    remove: "all",
                                    preserve_attributes: ["class", "style"]
                                }, {
                                    inline: "span",
                                    styles: {
                                        fontWeight: "bold"
                                    }
                                }, {
                                    inline: "b",
                                    remove: "all",
                                    preserve_attributes: ["class", "style"]
                                }],
                                italic: [{
                                    inline: "em",
                                    remove: "all",
                                    preserve_attributes: ["class", "style"]
                                }, {
                                    inline: "span",
                                    styles: {
                                        fontStyle: "italic"
                                    }
                                }, {
                                    inline: "i",
                                    remove: "all",
                                    preserve_attributes: ["class", "style"]
                                }],
                                underline: [{
                                    inline: "span",
                                    styles: {
                                        textDecoration: "underline"
                                    },
                                    exact: !0
                                }, {
                                    inline: "u",
                                    remove: "all",
                                    preserve_attributes: ["class", "style"]
                                }],
                                strikethrough: (() => {
                                    const e = {
                                            inline: "span",
                                            styles: {
                                                textDecoration: "line-through"
                                            },
                                            exact: !0
                                        },
                                        t = {
                                            inline: "strike",
                                            remove: "all",
                                            preserve_attributes: ["class", "style"]
                                        },
                                        o = {
                                            inline: "s",
                                            remove: "all",
                                            preserve_attributes: ["class", "style"]
                                        };
                                    return "html4" !== n ? [o, e, t] : [e, o, t]
                                })(),
                                forecolor: {
                                    inline: "span",
                                    styles: {
                                        color: "%value"
                                    },
                                    links: !0,
                                    remove_similar: !0,
                                    clear_child_styles: !0
                                },
                                hilitecolor: {
                                    inline: "span",
                                    styles: {
                                        backgroundColor: "%value"
                                    },
                                    links: !0,
                                    remove_similar: !0,
                                    clear_child_styles: !0
                                },
                                fontname: {
                                    inline: "span",
                                    toggle: !1,
                                    styles: {
                                        fontFamily: "%value"
                                    },
                                    clear_child_styles: !0
                                },
                                fontsize: {
                                    inline: "span",
                                    toggle: !1,
                                    styles: {
                                        fontSize: "%value"
                                    },
                                    clear_child_styles: !0
                                },
                                lineheight: {
                                    selector: "h1,h2,h3,h4,h5,h6,p,li,td,th,div",
                                    styles: {
                                        lineHeight: "%value"
                                    }
                                },
                                fontsize_class: {
                                    inline: "span",
                                    attributes: {
                                        class: "%value"
                                    }
                                },
                                blockquote: {
                                    block: "blockquote",
                                    wrapper: !0,
                                    remove: "all"
                                },
                                subscript: {
                                    inline: "sub"
                                },
                                superscript: {
                                    inline: "sup"
                                },
                                code: {
                                    inline: "code"
                                },
                                link: {
                                    inline: "a",
                                    selector: "a",
                                    remove: "all",
                                    split: !0,
                                    deep: !0,
                                    onmatch: (e, t, n) => jo(e) && e.hasAttribute("href"),
                                    onformat: (e, n, o) => {
                                        Dt.each(o, ((n, o) => {
                                            t.setAttrib(e, o, n)
                                        }))
                                    }
                                },
                                lang: {
                                    inline: "span",
                                    clear_child_styles: !0,
                                    remove_similar: !0,
                                    attributes: {
                                        lang: "%value",
                                        "data-mce-lang": e => {
                                            var t;
                                            return null !== (t = null == e ? void 0 : e.customValue) && void 0 !== t ? t : null
                                        }
                                    }
                                },
                                removeformat: [{
                                    selector: "b,strong,em,i,font,u,strike,s,sub,sup,dfn,code,samp,kbd,var,cite,mark,q,del,ins,small",
                                    remove: "all",
                                    split: !0,
                                    expand: !1,
                                    block_expand: !0,
                                    deep: !0
                                }, {
                                    selector: "span",
                                    attributes: ["style", "class"],
                                    remove: "empty",
                                    split: !0,
                                    expand: !1,
                                    deep: !0
                                }, {
                                    selector: "*",
                                    attributes: ["style", "class"],
                                    split: !1,
                                    expand: !1,
                                    deep: !0
                                }]
                            };
                        return Dt.each("p h1 h2 h3 h4 h5 h6 div address pre dt dd samp".split(/\s/), (e => {
                            o[e] = {
                                block: e,
                                remove: "all"
                            }
                        })), o
                    })(e)), n(Lw()), n(ud(e)), {
                        get: e => C(e) ? t[e] : t,
                        has: e => ke(t, e),
                        register: n,
                        unregister: e => (e && t[e] && delete t[e], t)
                    }
                })(e),
                n = Da({});
            return (e => {
                e.addShortcut("meta+b", "", "Bold"), e.addShortcut("meta+i", "", "Italic"), e.addShortcut("meta+u", "", "Underline");
                for (let t = 1; t <= 6; t++) e.addShortcut("access+" + t, "", ["FormatBlock", !1, "h" + t]);
                e.addShortcut("access+7", "", ["FormatBlock", !1, "p"]), e.addShortcut("access+8", "", ["FormatBlock", !1, "div"]), e.addShortcut("access+9", "", ["FormatBlock", !1, "address"])
            })(e), (e => {
                e.on("mouseup keydown", (t => {
                    var n;
                    ((e, t, n) => {
                        const o = e.selection,
                            r = e.getBody();
                        Ob(e, null, n), 8 !== t && 46 !== t || !o.isCollapsed() || o.getStart().innerHTML !== Sb || Ob(e, Eu(r, o.getStart())), 37 !== t && 39 !== t || Ob(e, Eu(r, o.getStart()))
                    })(e, t.keyCode, (n = e.selection.getRng().endContainer, Xo(n) && $e(n.data, fr)))
                }))
            })(e), LC(e) || ((e, t) => {
                e.set({}), t.on("NodeChange", (n => {
                    _v(t, n.element, e.get())
                })), t.on("FormatApply FormatRemove", (n => {
                    const o = I.from(n.node).map((e => sm(e) ? e : e.startContainer)).bind((e => jo(e) ? I.some(e) : I.from(e.parentElement))).getOrThunk((() => kv(t)));
                    _v(t, o, e.get())
                }))
            })(n, e), {
                get: t.get,
                has: t.has,
                register: t.register,
                unregister: t.unregister,
                apply: (t, n, o) => {
                    ((e, t, n, o) => {
                        IC(e).formatter.apply(t, n, o)
                    })(e, t, n, o)
                },
                remove: (t, n, o, r) => {
                    ((e, t, n, o, r) => {
                        IC(e).formatter.remove(t, n, o, r)
                    })(e, t, n, o, r)
                },
                toggle: (t, n, o) => {
                    ((e, t, n, o) => {
                        IC(e).formatter.toggle(t, n, o)
                    })(e, t, n, o)
                },
                match: (t, n, o, r) => ((e, t, n, o, r) => IC(e).formatter.match(t, n, o, r))(e, t, n, o, r),
                closest: t => ((e, t) => IC(e).formatter.closest(t))(e, t),
                matchAll: (t, n) => ((e, t, n) => IC(e).formatter.matchAll(t, n))(e, t, n),
                matchNode: (t, n, o, r) => ((e, t, n, o, r) => IC(e).formatter.matchNode(t, n, o, r))(e, t, n, o, r),
                canApply: t => ((e, t) => IC(e).formatter.canApply(t))(e, t),
                formatChanged: (t, o, r, s) => ((e, t, n, o, r, s) => IC(e).formatter.formatChanged(t, n, o, r, s))(e, n, t, o, r, s),
                getCssText: O(jw, e)
            }
        },
        $w = e => {
            switch (e.toLowerCase()) {
                case "undo":
                case "redo":
                case "mcefocus":
                    return !0;
                default:
                    return !1
            }
        },
        Vw = e => {
            const t = za(),
                n = Da(0),
                o = Da(0),
                r = {
                    data: [],
                    typing: !1,
                    beforeChange: () => {
                        ((e, t, n) => {
                            IC(e).undoManager.beforeChange(t, n)
                        })(e, n, t)
                    },
                    add: (s, a) => ((e, t, n, o, r, s, a) => IC(e).undoManager.add(t, n, o, r, s, a))(e, r, o, n, t, s, a),
                    dispatchChange: () => {
                        e.setDirty(!0);
                        const t = _C(e);
                        t.bookmark = ol(e.selection), e.dispatch("change", {
                            level: t,
                            lastLevel: ie(r.data, o.get()).getOrUndefined()
                        })
                    },
                    undo: () => ((e, t, n, o) => IC(e).undoManager.undo(t, n, o))(e, r, n, o),
                    redo: () => ((e, t, n) => IC(e).undoManager.redo(t, n))(e, o, r.data),
                    clear: () => {
                        ((e, t, n) => {
                            IC(e).undoManager.clear(t, n)
                        })(e, r, o)
                    },
                    reset: () => {
                        ((e, t) => {
                            IC(e).undoManager.reset(t)
                        })(e, r)
                    },
                    hasUndo: () => ((e, t, n) => IC(e).undoManager.hasUndo(t, n))(e, r, o),
                    hasRedo: () => ((e, t, n) => IC(e).undoManager.hasRedo(t, n))(e, r, o),
                    transact: t => ((e, t, n, o) => IC(e).undoManager.transact(t, n, o))(e, r, n, t),
                    ignore: t => {
                        ((e, t, n) => {
                            IC(e).undoManager.ignore(t, n)
                        })(e, n, t)
                    },
                    extra: (t, n) => {
                        ((e, t, n, o, r) => {
                            IC(e).undoManager.extra(t, n, o, r)
                        })(e, r, o, t, n)
                    }
                };
            return LC(e) || ((e, t, n) => {
                const o = Da(!1),
                    r = e => {
                        BC(t, !1, n), t.add({}, e)
                    };
                e.on("init", (() => {
                    t.add()
                })), e.on("BeforeExecCommand", (e => {
                    const o = e.command;
                    $w(o) || (DC(t, n), t.beforeChange())
                })), e.on("ExecCommand", (e => {
                    const t = e.command;
                    $w(t) || r(e)
                })), e.on("ObjectResizeStart cut", (() => {
                    t.beforeChange()
                })), e.on("SaveContent ObjectResized blur", r), e.on("dragend", r), e.on("keyup", (n => {
                    const s = n.keyCode;
                    if (n.isDefaultPrevented()) return;
                    const a = At.os.isMacOS() && "Meta" === n.key;
                    (s >= 33 && s <= 36 || s >= 37 && s <= 40 || 45 === s || n.ctrlKey || a) && (r(), e.nodeChanged()), 46 !== s && 8 !== s || e.nodeChanged(), o.get() && t.typing && !OC(_C(e), t.data[0]) && (e.isDirty() || e.setDirty(!0), e.dispatch("TypingUndo"), o.set(!1), e.nodeChanged())
                })), e.on("keydown", (e => {
                    const s = e.keyCode;
                    if (e.isDefaultPrevented()) return;
                    if (s >= 33 && s <= 36 || s >= 37 && s <= 40 || 45 === s) return void(t.typing && r(e));
                    const a = e.ctrlKey && !e.altKey || e.metaKey;
                    if ((s < 16 || s > 20) && 224 !== s && 91 !== s && !t.typing && !a) return t.beforeChange(), BC(t, !0, n), t.add({}, e), void o.set(!0);
                    (At.os.isMacOS() ? e.metaKey : e.ctrlKey && !e.altKey) && t.beforeChange()
                })), e.on("mousedown", (e => {
                    t.typing && r(e)
                })), e.on("input", (e => {
                    var t;
                    e.inputType && ("insertReplacementText" === e.inputType || "insertText" === (t = e).inputType && null === t.data || (e => "insertFromPaste" === e.inputType || "insertFromDrop" === e.inputType)(e)) && r(e)
                })), e.on("AddUndo Undo Redo ClearUndos", (t => {
                    t.isDefaultPrevented() || e.nodeChanged()
                }))
            })(e, r, n), (e => {
                e.addShortcut("meta+z", "", "Undo"), e.addShortcut("meta+y,meta+shift+z", "", "Redo")
            })(e), r
        },
        qw = [9, 27, tf.HOME, tf.END, 19, 20, 44, 144, 145, 33, 34, 45, 16, 17, 18, 91, 92, 93, tf.DOWN, tf.UP, tf.LEFT, tf.RIGHT].concat(At.browser.isFirefox() ? [224] : []),
        Ww = "data-mce-placeholder",
        Kw = e => "keydown" === e.type || "keyup" === e.type,
        Gw = e => {
            const t = e.keyCode;
            return t === tf.BACKSPACE || t === tf.DELETE
        },
        Yw = (e, t) => ({
            from: e,
            to: t
        }),
        Xw = (e, t) => {
            const n = vn(e),
                o = vn(t.container());
            return gh(n, o).map((e => ((e, t) => ({
                block: e,
                position: t
            }))(e, t)))
        },
        Qw = (e, t) => Qn(t, (e => Nr(e) || rr(e.dom)), (t => kn(t, e))).filter(qt).getOr(e),
        Jw = e => {
            const t = (e => {
                const t = Ln(e);
                return Z(t, Cr).fold(N(t), (e => t.slice(0, e)))
            })(e);
            return q(t, Co), t
        },
        Zw = (e, t) => {
            const n = hp(t, e);
            return J(n.reverse(), (e => ps(e))).each(Co)
        },
        ex = (e, t, n, o) => {
            if (ps(n)) return Br(n), Cu(n.dom);
            0 === G(Dn(o), (e => !ps(e))).length && ps(t) && fo(o, hn("br"));
            const r = yu(n.dom, Mi.before(o.dom));
            return q(Jw(t), (e => {
                fo(o, e)
            })), Zw(e, t), r
        },
        tx = (e, t, n) => {
            if (ps(n)) {
                if (ps(t)) {
                    const e = e => {
                            const t = (e, n) => In(e).fold((() => n), (e => wr(e) ? t(e, n.concat(oi(e))) : n));
                            return t(e, [])
                        },
                        o = Y(e(n), ((e, t) => (bo(e, t), t)), Tr());
                    yo(t), ho(t, o)
                }
                return Co(n), Cu(t.dom)
            }
            const o = wu(n.dom);
            return q(Jw(t), (e => {
                ho(n, e)
            })), Zw(e, t), o
        },
        nx = (e, t) => {
            bu(e, t.dom).bind((e => I.from(e.getNode()))).map(vn).filter(xr).each(Co)
        },
        ox = (e, t, n) => (nx(!0, t), nx(!1, n), ((e, t) => En(t, e) ? ((e, t) => {
            const n = hp(t, e);
            return I.from(n[n.length - 1])
        })(t, e) : I.none())(t, n).fold(O(tx, e, t, n), O(ex, e, t, n))),
        rx = (e, t, n, o) => t ? ox(e, o, n) : ox(e, n, o),
        sx = (e, t) => {
            const n = vn(e.getBody()),
                o = ((e, t, n) => n.collapsed ? ((e, t, n) => {
                    const o = Xw(e, Mi.fromRangeStart(n)),
                        r = o.bind((n => gu(t, e, n.position).bind((n => Xw(e, n).map((n => ((e, t, n) => nr(n.position.getNode()) && !ps(n.block) ? bu(!1, n.block.dom).bind((o => o.isEqual(n.position) ? gu(t, e, o).bind((t => Xw(e, t))) : I.some(n))).getOr(n) : n)(e, t, n)))))));
                    return Lt(o, r, Yw).filter((t => (e => !kn(e.from.block, e.to.block))(t) && ((e, t) => {
                        const n = vn(e);
                        return kn(Qw(n, t.from.block), Qw(n, t.to.block))
                    })(e, t) && (e => !1 === sr(e.from.block.dom) && !1 === sr(e.to.block.dom))(t) && (e => {
                        const t = e => kr(e) || Es(e.dom);
                        return t(e.from.block) && t(e.to.block)
                    })(t)))
                })(e, t, n) : I.none())(n.dom, t, e.selection.getRng()).map((o => () => {
                    rx(n, t, o.from.block, o.to.block).each((t => {
                        e.selection.setRng(t.toRange())
                    }))
                }));
            return o
        },
        ax = (e, t) => {
            const n = vn(t),
                o = O(kn, e);
            return Xn(n, Nr, o).isSome()
        },
        ix = e => {
            const t = vn(e.getBody());
            return ((e, t) => {
                const n = yu(e.dom, Mi.fromRangeStart(t)).isNone(),
                    o = vu(e.dom, Mi.fromRangeEnd(t)).isNone();
                return !((e, t) => ax(e, t.startContainer) || ax(e, t.endContainer))(e, t) && n && o
            })(t, e.selection.getRng()) ? (e => I.some((() => {
                e.setContent(""), e.selection.setCursorLocation()
            })))(e) : ((e, t) => {
                const n = t.getRng();
                return Lt(gh(e, vn(n.startContainer)), gh(e, vn(n.endContainer)), ((o, r) => kn(o, r) ? I.none() : I.some((() => {
                    n.deleteContents(), rx(e, !0, o, r).each((e => {
                        t.setRng(e.toRange())
                    }))
                })))).getOr(I.none())
            })(t, e.selection)
        },
        lx = (e, t) => e.selection.isCollapsed() ? I.none() : ix(e),
        dx = (e, t, n, o, r) => I.from(t._selectionOverrides.showCaret(e, n, o, r)),
        cx = (e, t) => e.dispatch("BeforeObjectSelected", {
            target: t
        }).isDefaultPrevented() ? I.none() : I.some((e => {
            const t = e.ownerDocument.createRange();
            return t.selectNode(e), t
        })(t)),
        ux = (e, t, n) => t.collapsed ? ((e, t, n) => {
            const o = Kc(1, e.getBody(), t),
                r = Mi.fromRangeStart(o),
                s = r.getNode();
            if (Ec(s)) return dx(1, e, s, !r.isAtEnd(), !1);
            const a = r.getNode(!0);
            if (Ec(a)) return dx(1, e, a, !1, !1);
            const i = Vh(e.dom.getRoot(), r.getNode());
            return Ec(i) ? dx(1, e, i, !1, n) : I.none()
        })(e, t, n).getOr(t) : t,
        mx = e => fp(e) || dp(e),
        fx = e => gp(e) || cp(e),
        gx = (e, t, n, o, r, s) => {
            dx(o, e, s.getNode(!r), r, !0).each((n => {
                if (t.collapsed) {
                    const e = t.cloneRange();
                    r ? e.setEnd(n.startContainer, n.startOffset) : e.setStart(n.endContainer, n.endOffset), e.deleteContents()
                } else t.deleteContents();
                e.selection.setRng(n)
            })), ((e, t) => {
                Xo(t) && 0 === t.data.length && e.remove(t)
            })(e.dom, n)
        },
        px = (e, t) => ((e, t) => {
            const n = e.selection.getRng();
            if (!Xo(n.commonAncestorContainer)) return I.none();
            const o = t ? Zc.Forwards : Zc.Backwards,
                r = cu(e.getBody()),
                s = O(Qc, t ? r.next : r.prev),
                a = t ? mx : fx,
                i = Yc(o, e.getBody(), n),
                l = s(i),
                d = l ? lh(t, l) : l;
            if (!d || !Jc(i, d)) return I.none();
            if (a(d)) return I.some((() => gx(e, n, i.getNode(), o, t, d)));
            const c = s(d);
            return c && a(c) && Jc(d, c) ? I.some((() => gx(e, n, i.getNode(), o, t, c))) : I.none()
        })(e, t),
        hx = (e, t) => {
            const n = e.getBody();
            return t ? Cu(n).filter(fp) : wu(n).filter(gp)
        },
        bx = e => {
            const t = e.selection.getRng();
            return !t.collapsed && (hx(e, !0).exists((e => e.isEqual(Mi.fromRangeStart(t)))) || hx(e, !1).exists((e => e.isEqual(Mi.fromRangeEnd(t)))))
        },
        vx = il([{
            remove: ["element"]
        }, {
            moveToElement: ["element"]
        }, {
            moveToPosition: ["position"]
        }]),
        yx = (e, t, n) => gu(t, e, n).bind((o => {
            return r = o.getNode(), C(r) && (Nr(vn(r)) || Sr(vn(r))) || ((e, t, n, o) => {
                const r = t => wr(vn(t)) && !zc(n, o, e);
                return Gc(!t, n).fold((() => Gc(t, o).fold(L, r)), r)
            })(e, t, n, o) ? I.none() : t && sr(o.getNode()) || !t && sr(o.getNode(!0)) ? ((e, t, n, o) => {
                const r = o.getNode(!t);
                return gh(vn(e), vn(n.getNode())).map((e => ps(e) ? vx.remove(e.dom) : vx.moveToElement(r))).orThunk((() => I.some(vx.moveToElement(r))))
            })(e, t, n, o) : t && gp(n) || !t && fp(n) ? I.some(vx.moveToPosition(o)) : I.none();
            var r
        })),
        Cx = (e, t) => I.from(Vh(e.getBody(), t)),
        wx = (e, t) => {
            const n = e.selection.getNode();
            return Cx(e, n).filter(sr).fold((() => ((e, t, n) => {
                const o = Kc(t ? 1 : -1, e, n),
                    r = Mi.fromRangeStart(o),
                    s = vn(e);
                return !t && gp(r) ? I.some(vx.remove(r.getNode(!0))) : t && fp(r) ? I.some(vx.remove(r.getNode())) : !t && fp(r) && Rp(s, r) ? Ap(s, r).map((e => vx.remove(e.getNode()))) : t && gp(r) && Np(s, r) ? Op(s, r).map((e => vx.remove(e.getNode()))) : ((e, t, n) => ((e, t) => {
                    const n = t.getNode(!e),
                        o = e ? "after" : "before";
                    return jo(n) && n.getAttribute("data-mce-caret") === o
                })(t, n) ? ((e, t) => y(t) ? I.none() : e && sr(t.nextSibling) ? I.some(vx.moveToElement(t.nextSibling)) : !e && sr(t.previousSibling) ? I.some(vx.moveToElement(t.previousSibling)) : I.none())(t, n.getNode(!t)).orThunk((() => yx(e, t, n))) : yx(e, t, n).bind((t => ((e, t, n) => n.fold((e => I.some(vx.remove(e))), (e => I.some(vx.moveToElement(e))), (n => zc(t, n, e) ? I.none() : I.some(vx.moveToPosition(n)))))(e, n, t))))(e, t, r)
            })(e.getBody(), t, e.selection.getRng()).map((n => () => n.fold(((e, t) => n => (e._selectionOverrides.hideFakeCaret(), oh(e, t, vn(n)), !0))(e, t), ((e, t) => n => {
                const o = t ? Mi.before(n) : Mi.after(n);
                return e.selection.setRng(o.toRange()), !0
            })(e, t), (e => t => (e.selection.setRng(t.toRange()), !0))(e))))), (() => I.some(E)))
        },
        xx = e => {
            const t = e.dom,
                n = e.selection,
                o = Vh(e.getBody(), n.getNode());
            if (rr(o) && t.isBlock(o) && t.isEmpty(o)) {
                const e = t.create("br", {
                    "data-mce-bogus": "1"
                });
                t.setHTML(o, ""), o.appendChild(e), n.setRng(Mi.before(e).toRange())
            }
            return !0
        },
        kx = (e, t) => e.selection.isCollapsed() ? wx(e, t) : ((e, t) => {
            const n = e.selection.getNode();
            return sr(n) && !ar(n) ? Cx(e, n.parentNode).filter(sr).fold((() => I.some((() => {
                var n;
                n = vn(e.getBody()), q(Mo(n, ".mce-offscreen-selection"), Co), oh(e, t, vn(e.selection.getNode())), ph(e)
            }))), (() => I.some(E))) : bx(e) ? I.some((() => {
                vh(e, e.selection.getRng(), vn(e.getBody()))
            })) : I.none()
        })(e, t),
        Ex = (e, t) => e.selection.isCollapsed() ? ((e, t) => {
            const n = Mi.fromRangeStart(e.selection.getRng());
            return gu(t, e.getBody(), n).filter((e => t ? ip(e) : lp(e))).bind((e => jc(t ? 0 : -1, e))).map((t => () => e.selection.select(t)))
        })(e, t) : I.none(),
        Sx = Xo,
        _x = e => Sx(e) && e.data[0] === Pr,
        Nx = e => Sx(e) && e.data[e.data.length - 1] === Pr,
        Rx = e => {
            var t;
            return (null !== (t = e.ownerDocument) && void 0 !== t ? t : document).createTextNode(Pr)
        },
        Ax = (e, t) => e ? (e => {
            var t;
            if (Sx(e.previousSibling)) return Nx(e.previousSibling) || e.previousSibling.appendData(Pr), e.previousSibling;
            if (Sx(e)) return _x(e) || e.insertData(0, Pr), e;
            {
                const n = Rx(e);
                return null === (t = e.parentNode) || void 0 === t || t.insertBefore(n, e), n
            }
        })(t) : (e => {
            var t, n;
            if (Sx(e.nextSibling)) return _x(e.nextSibling) || e.nextSibling.insertData(0, Pr), e.nextSibling;
            if (Sx(e)) return Nx(e) || e.appendData(Pr), e;
            {
                const o = Rx(e);
                return e.nextSibling ? null === (t = e.parentNode) || void 0 === t || t.insertBefore(o, e.nextSibling) : null === (n = e.parentNode) || void 0 === n || n.appendChild(o), o
            }
        })(t),
        Ox = O(Ax, !0),
        Tx = O(Ax, !1),
        Bx = (e, t) => Xo(e.container()) ? Ax(t, e.container()) : Ax(t, e.getNode()),
        Dx = (e, t) => {
            const n = t.get();
            return n && e.container() === n && zr(n)
        },
        Px = (e, t) => t.fold((t => {
            bc(e.get());
            const n = Ox(t);
            return e.set(n), I.some(Mi(n, n.length - 1))
        }), (t => Cu(t).map((t => {
            if (Dx(t, e)) {
                const t = e.get();
                return Mi(t, 1)
            } {
                bc(e.get());
                const n = Bx(t, !0);
                return e.set(n), Mi(n, 1)
            }
        }))), (t => wu(t).map((t => {
            if (Dx(t, e)) {
                const t = e.get();
                return Mi(t, t.length - 1)
            } {
                bc(e.get());
                const n = Bx(t, !1);
                return e.set(n), Mi(n, n.length - 1)
            }
        }))), (t => {
            bc(e.get());
            const n = Tx(t);
            return e.set(n), I.some(Mi(n, 1))
        })),
        Lx = (e, t) => {
            for (let n = 0; n < e.length; n++) {
                const o = e[n].apply(null, t);
                if (o.isSome()) return o
            }
            return I.none()
        },
        Mx = il([{
            before: ["element"]
        }, {
            start: ["element"]
        }, {
            end: ["element"]
        }, {
            after: ["element"]
        }]),
        Ix = (e, t) => Uc(t, e) || e,
        Fx = (e, t, n) => {
            const o = dh(n),
                r = Ix(t, o.container());
            return ih(e, r, o).fold((() => vu(r, o).bind(O(ih, e, r)).map((e => Mx.before(e)))), I.none)
        },
        Ux = (e, t) => null === Eu(e, t),
        zx = (e, t, n) => ih(e, t, n).filter(O(Ux, t)),
        jx = (e, t, n) => {
            const o = ch(n);
            return zx(e, t, o).bind((e => yu(e, o).isNone() ? I.some(Mx.start(e)) : I.none()))
        },
        Hx = (e, t, n) => {
            const o = dh(n);
            return zx(e, t, o).bind((e => vu(e, o).isNone() ? I.some(Mx.end(e)) : I.none()))
        },
        $x = (e, t, n) => {
            const o = ch(n),
                r = Ix(t, o.container());
            return ih(e, r, o).fold((() => yu(r, o).bind(O(ih, e, r)).map((e => Mx.after(e)))), I.none)
        },
        Vx = e => !ah(Wx(e)),
        qx = (e, t, n) => Lx([Fx, jx, Hx, $x], [e, t, n]).filter(Vx),
        Wx = e => e.fold(R, R, R, R),
        Kx = e => e.fold(N("before"), N("start"), N("end"), N("after")),
        Gx = e => e.fold(Mx.before, Mx.before, Mx.after, Mx.after),
        Yx = e => e.fold(Mx.start, Mx.start, Mx.end, Mx.end),
        Xx = (e, t, n, o, r, s) => Lt(ih(t, n, o), ih(t, n, r), ((t, o) => t !== o && ((e, t, n) => {
            const o = Uc(t, e),
                r = Uc(n, e);
            return C(o) && o === r
        })(n, t, o) ? Mx.after(e ? t : o) : s)).getOr(s),
        Qx = (e, t) => e.fold(M, (e => {
            return o = t, !(Kx(n = e) === Kx(o) && Wx(n) === Wx(o));
            var n, o
        })),
        Jx = (e, t) => e ? t.fold(S(I.some, Mx.start), I.none, S(I.some, Mx.after), I.none) : t.fold(I.none, S(I.some, Mx.before), I.none, S(I.some, Mx.end)),
        Zx = (e, t, n) => {
            const o = e ? 1 : -1;
            return t.setRng(Mi(n.container(), n.offset() + o).toRange()), t.getSel().modify("move", e ? "forward" : "backward", "word"), !0
        };
    var ek;
    ! function(e) {
        e[e.Br = 0] = "Br", e[e.Block = 1] = "Block", e[e.Wrap = 2] = "Wrap", e[e.Eol = 3] = "Eol"
    }(ek || (ek = {}));
    const tk = (e, t) => e === Zc.Backwards ? oe(t) : t,
        nk = (e, t, n) => e === Zc.Forwards ? t.next(n) : t.prev(n),
        ok = (e, t, n, o) => nr(o.getNode(t === Zc.Forwards)) ? ek.Br : !1 === zc(n, o) ? ek.Block : ek.Wrap,
        rk = (e, t, n, o) => {
            const r = cu(n);
            let s = o;
            const a = [];
            for (; s;) {
                const n = nk(t, r, s);
                if (!n) break;
                if (nr(n.getNode(!1))) return t === Zc.Forwards ? {
                    positions: tk(t, a).concat([n]),
                    breakType: ek.Br,
                    breakAt: I.some(n)
                } : {
                    positions: tk(t, a),
                    breakType: ek.Br,
                    breakAt: I.some(n)
                };
                if (n.isVisible()) {
                    if (e(s, n)) {
                        const e = ok(0, t, s, n);
                        return {
                            positions: tk(t, a),
                            breakType: e,
                            breakAt: I.some(n)
                        }
                    }
                    a.push(n), s = n
                } else s = n
            }
            return {
                positions: tk(t, a),
                breakType: ek.Eol,
                breakAt: I.none()
            }
        },
        sk = (e, t, n, o) => t(n, o).breakAt.map((o => {
            const r = t(n, o).positions;
            return e === Zc.Backwards ? r.concat(o) : [o].concat(r)
        })).getOr([]),
        ak = (e, t) => X(e, ((e, n) => e.fold((() => I.some(n)), (o => Lt(le(o.getClientRects()), le(n.getClientRects()), ((e, r) => {
            const s = Math.abs(t - e.left);
            return Math.abs(t - r.left) <= s ? n : o
        })).or(e)))), I.none()),
        ik = (e, t) => le(t.getClientRects()).bind((t => ak(e, t.left))),
        lk = O(rk, Mi.isAbove, -1),
        dk = O(rk, Mi.isBelow, 1),
        ck = O(sk, -1, lk),
        uk = O(sk, 1, dk),
        mk = (e, t) => ik(ck(e, t), t),
        fk = (e, t) => ik(uk(e, t), t),
        gk = sr,
        pk = (e, t) => Math.abs(e.left - t),
        hk = (e, t) => Math.abs(e.right - t),
        bk = (e, t) => Te(e, ((e, n) => {
            const o = Math.min(pk(e, t), hk(e, t)),
                r = Math.min(pk(n, t), hk(n, t));
            return r === o && Ee(n, "node") && gk(n.node) || r < o ? n : e
        })),
        vk = e => {
            const t = t => V(t, (t => {
                const n = di(t);
                return n.node = e, n
            }));
            if (jo(e)) return t(e.getClientRects());
            if (Xo(e)) {
                const n = e.ownerDocument.createRange();
                return n.setStart(e, 0), n.setEnd(e, e.data.length), t(n.getClientRects())
            }
            return []
        },
        yk = e => te(e, vk);
    var Ck;
    ! function(e) {
        e[e.Up = -1] = "Up", e[e.Down = 1] = "Down"
    }(Ck || (Ck = {}));
    const wk = (e, t, n, o, r, s) => {
            let a = 0;
            const i = [],
                l = o => {
                    let s = yk([o]); - 1 === e && (s = s.reverse());
                    for (let e = 0; e < s.length; e++) {
                        const o = s[e];
                        if (!n(o, d)) {
                            if (i.length > 0 && t(o, De(i)) && a++, o.line = a, r(o)) return !0;
                            i.push(o)
                        }
                    }
                    return !1
                },
                d = De(s.getClientRects());
            if (!d) return i;
            const c = s.getNode();
            return c && (l(c), ((e, t, n, o) => {
                let r = o;
                for (; r = Fc(r, e, ss, t);)
                    if (n(r)) return
            })(e, o, l, c)), i
        },
        xk = O(wk, Ck.Up, mi, fi),
        kk = O(wk, Ck.Down, fi, mi),
        Ek = e => De(e.getClientRects()),
        Sk = e => t => ((e, t) => t.line > e)(e, t),
        _k = e => t => ((e, t) => t.line === e)(e, t),
        Nk = (e, t) => {
            e.selection.setRng(t), eg(e, e.selection.getRng())
        },
        Rk = (e, t, n) => I.some(ux(e, t, n)),
        Ak = (e, t, n, o, r, s) => {
            const a = t === Zc.Forwards,
                i = cu(e.getBody()),
                l = O(Qc, a ? i.next : i.prev),
                d = a ? o : r;
            if (!n.collapsed) {
                const o = pi(n);
                if (s(o)) return dx(t, e, o, t === Zc.Backwards, !1);
                if (bx(e)) {
                    const e = n.cloneRange();
                    return e.collapse(t === Zc.Backwards), I.from(e)
                }
            }
            const c = Yc(t, e.getBody(), n);
            if (d(c)) return cx(e, c.getNode(!a));
            let u = l(c);
            const m = Gr(n);
            if (!u) return m ? I.some(n) : I.none();
            if (u = lh(a, u), d(u)) return dx(t, e, u.getNode(!a), a, !1);
            const f = l(u);
            return f && d(f) && Jc(u, f) ? dx(t, e, f.getNode(!a), a, !1) : m ? Rk(e, u.toRange(), !1) : I.none()
        },
        Ok = (e, t, n, o, r, s) => {
            const a = Yc(t, e.getBody(), n),
                i = De(a.getClientRects()),
                l = t === Ck.Down,
                d = e.getBody();
            if (!i) return I.none();
            if (bx(e)) {
                const e = l ? Mi.fromRangeEnd(n) : Mi.fromRangeStart(n);
                return (l ? fk : mk)(d, e).orThunk((() => I.from(e))).map((e => e.toRange()))
            }
            const c = (l ? kk : xk)(d, Sk(1), a),
                u = G(c, _k(1)),
                m = i.left,
                f = bk(u, m);
            if (f && s(f.node)) {
                const n = Math.abs(m - f.left),
                    o = Math.abs(m - f.right);
                return dx(t, e, f.node, n < o, !1)
            }
            let g;
            if (g = o(a) ? a.getNode() : r(a) ? a.getNode(!0) : pi(n), g) {
                const n = ((e, t, n, o) => {
                    const r = cu(t);
                    let s, a, i, l;
                    const d = [];
                    let c = 0;
                    1 === e ? (s = r.next, a = fi, i = mi, l = Mi.after(o)) : (s = r.prev, a = mi, i = fi, l = Mi.before(o));
                    const u = Ek(l);
                    do {
                        if (!l.isVisible()) continue;
                        const e = Ek(l);
                        if (i(e, u)) continue;
                        d.length > 0 && a(e, De(d)) && c++;
                        const t = di(e);
                        if (t.position = l, t.line = c, n(t)) return d;
                        d.push(t)
                    } while (l = s(l));
                    return d
                })(t, d, Sk(1), g);
                let o = bk(G(n, _k(1)), m);
                if (o) return Rk(e, o.position.toRange(), !1);
                if (o = De(G(n, _k(0))), o) return Rk(e, o.position.toRange(), !1)
            }
            return 0 === u.length ? Tk(e, l).filter(l ? r : o).map((t => ux(e, t.toRange(), !1))) : I.none()
        },
        Tk = (e, t) => {
            const n = e.selection.getRng(),
                o = t ? Mi.fromRangeEnd(n) : Mi.fromRangeStart(n),
                r = (s = o.container(), a = e.getBody(), Xn(vn(s), (e => _c(e.dom)), (e => e.dom === a)).map((e => e.dom)).getOr(a));
            var s, a;
            if (t) {
                const e = dk(r, o);
                return de(e.positions)
            } {
                const e = lk(r, o);
                return le(e.positions)
            }
        },
        Bk = (e, t, n) => Tk(e, t).filter(n).exists((t => (e.selection.setRng(t.toRange()), !0))),
        Dk = (e, t) => {
            const n = e.dom.createRng();
            n.setStart(t.container(), t.offset()), n.setEnd(t.container(), t.offset()), e.selection.setRng(n)
        },
        Pk = (e, t) => {
            e ? t.setAttribute("data-mce-selected", "inline-boundary") : t.removeAttribute("data-mce-selected")
        },
        Lk = (e, t, n) => Px(t, n).map((t => (Dk(e, t), n))),
        Mk = (e, t, n) => {
            const o = e.getBody(),
                r = ((e, t, n) => {
                    const o = Mi.fromRangeStart(e);
                    if (e.collapsed) return o;
                    {
                        const r = Mi.fromRangeEnd(e);
                        return n ? yu(t, r).getOr(r) : vu(t, o).getOr(o)
                    }
                })(e.selection.getRng(), o, n);
            return ((e, t, n, o) => {
                const r = lh(e, o),
                    s = qx(t, n, r);
                return qx(t, n, r).bind(O(Jx, e)).orThunk((() => ((e, t, n, o, r) => {
                    const s = lh(e, r);
                    return gu(e, n, s).map(O(lh, e)).fold((() => o.map(Gx)), (r => qx(t, n, r).map(O(Xx, e, t, n, s, r)).filter(O(Qx, o)))).filter(Vx)
                })(e, t, n, s, o)))
            })(n, O(sh, e), o, r).bind((n => Lk(e, t, n)))
        },
        Ik = (e, t, n) => !!cd(e) && Mk(e, t, n).isSome(),
        Fk = (e, t, n) => !!cd(t) && ((e, t) => {
            const n = t.selection.getRng(),
                o = e ? Mi.fromRangeEnd(n) : Mi.fromRangeStart(n);
            return !!(e => w(e.selection.getSel().modify))(t) && (e && $r(o) ? Zx(!0, t.selection, o) : !(e || !Vr(o)) && Zx(!1, t.selection, o))
        })(e, t),
        Uk = e => {
            const t = Da(null),
                n = O(sh, e);
            return e.on("NodeChange", (o => {
                cd(e) && (((e, t, n) => {
                    const o = V(Mo(vn(t.getRoot()), '*[data-mce-selected="inline-boundary"]'), (e => e.dom)),
                        r = G(o, e),
                        s = G(n, e);
                    q(re(r, s), O(Pk, !1)), q(re(s, r), O(Pk, !0))
                })(n, e.dom, o.parents), ((e, t) => {
                    const n = t.get();
                    if (e.selection.isCollapsed() && !e.composing && n) {
                        const o = Mi.fromRangeStart(e.selection.getRng());
                        Mi.isTextPosition(o) && !(e => $r(e) || Vr(e))(o) && (Dk(e, hc(n, o)), t.set(null))
                    }
                })(e, t), ((e, t, n, o) => {
                    if (t.selection.isCollapsed()) {
                        const r = G(o, e);
                        q(r, (o => {
                            const r = Mi.fromRangeStart(t.selection.getRng());
                            qx(e, t.getBody(), r).bind((e => Lk(t, n, e)))
                        }))
                    }
                })(n, e, t, o.parents))
            })), t
        },
        zk = O(Fk, !0),
        jk = O(Fk, !1),
        Hk = (e, t, n) => {
            if (cd(e)) {
                const o = Tk(e, t).getOrThunk((() => {
                    const n = e.selection.getRng();
                    return t ? Mi.fromRangeEnd(n) : Mi.fromRangeStart(n)
                }));
                return qx(O(sh, e), e.getBody(), o).exists((t => {
                    const o = Gx(t);
                    return Px(n, o).exists((t => (Dk(e, t), !0)))
                }))
            }
            return !1
        },
        $k = (e, t) => n => Px(t, n).map((t => () => Dk(e, t))),
        Vk = (e, t, n, o) => {
            const r = e.getBody(),
                s = O(sh, e);
            e.undoManager.ignore((() => {
                e.selection.setRng(((e, t) => {
                    const n = document.createRange();
                    return n.setStart(e.container(), e.offset()), n.setEnd(t.container(), t.offset()), n
                })(n, o)), mh(e), qx(s, r, Mi.fromRangeStart(e.selection.getRng())).map(Yx).bind($k(e, t)).each(P)
            })), e.nodeChanged()
        },
        qk = (e, t, n) => {
            if (e.selection.isCollapsed() && cd(e)) {
                const o = Mi.fromRangeStart(e.selection.getRng());
                return ((e, t, n, o) => {
                    const r = ((e, t) => Uc(t, e) || e)(e.getBody(), o.container()),
                        s = O(sh, e),
                        a = qx(s, r, o);
                    return a.bind((e => n ? e.fold(N(I.some(Yx(e))), I.none, N(I.some(Gx(e))), I.none) : e.fold(I.none, N(I.some(Gx(e))), I.none, N(I.some(Yx(e)))))).map($k(e, t)).getOrThunk((() => {
                        const i = pu(n, r, o),
                            l = i.bind((e => qx(s, r, e)));
                        return Lt(a, l, (() => ih(s, r, o).bind((t => (e => Lt(Cu(e), wu(e), ((t, n) => {
                            const o = lh(!0, t),
                                r = lh(!1, n);
                            return vu(e, o).forall((e => e.isEqual(r)))
                        })).getOr(!0))(t) ? I.some((() => {
                            oh(e, n, vn(t))
                        })) : I.none())))).getOrThunk((() => l.bind((() => i.map((r => () => {
                            n ? Vk(e, t, o, r) : Vk(e, t, r, o)
                        }))))))
                    }))
                })(e, t, n, o)
            }
            return I.none()
        },
        Wk = (e, t) => {
            const n = vn(e.getBody()),
                o = vn(e.selection.getStart()),
                r = hp(o, n);
            return Z(r, t).fold(N(r), (e => r.slice(0, e)))
        },
        Kk = e => 1 === Un(e),
        Gk = (e, t) => {
            const n = O(Mb, e);
            return te(t, (e => n(e) ? [e.dom] : []))
        },
        Yk = e => {
            const t = (e => Wk(e, Cr))(e);
            return Gk(e, t)
        },
        Xk = (e, t) => {
            const n = G((e => Wk(e, (e => Cr(e) || (e => Un(e) > 1)(e))))(e), Kk);
            return de(n).bind((o => {
                const r = Mi.fromRangeStart(e.selection.getRng());
                return hh(t, r, o.dom) && !Ib(o) ? I.some((() => ((e, t, n, o) => {
                    const r = Gk(t, o);
                    if (0 === r.length) oh(t, e, n);
                    else {
                        const e = Lb(n.dom, r);
                        t.selection.setRng(e.toRange())
                    }
                })(t, e, o, n))) : I.none()
            }))
        },
        Qk = (e, t) => {
            const n = e.selection.getStart(),
                o = ((e, t) => {
                    const n = t.parentElement;
                    return nr(t) && !h(n) && e.dom.isEmpty(n)
                })(e, n) || Ib(vn(n)) ? Lb(n, t) : ((e, t) => {
                    const {
                        caretContainer: n,
                        caretPosition: o
                    } = Pb(t);
                    return e.insertNode(n.dom), o
                })(e.selection.getRng(), t);
            e.selection.setRng(o.toRange())
        },
        Jk = e => Xo(e.startContainer),
        Zk = e => {
            const t = e.selection.getRng();
            return (e => 0 === e.startOffset && Jk(e))(t) && ((e, t) => {
                const n = t.startContainer.parentElement;
                return !h(n) && Mb(e, vn(n))
            })(e, t) && (e => (e => (e => {
                const t = e.startContainer.parentNode,
                    n = e.endContainer.parentNode;
                return !h(t) && !h(n) && t.isEqualNode(n)
            })(e) && (e => {
                const t = e.endContainer;
                return e.endOffset === (Xo(t) ? t.length : t.childNodes.length)
            })(e))(e) || (e => !e.endContainer.isEqualNode(e.commonAncestorContainer))(e))(t)
        },
        eE = (e, t) => e.selection.isCollapsed() ? Xk(e, t) : (e => {
            if (Zk(e)) {
                const t = Yk(e);
                return I.some((() => {
                    mh(e), ((e, t) => {
                        const n = re(t, Yk(e));
                        n.length > 0 && Qk(e, n)
                    })(e, t)
                }))
            }
            return I.none()
        })(e),
        tE = e => ((e, t, n) => Xn(e, (e => ku(e.dom)), n).isSome())(e, 0, Cr),
        nE = e => ((e => {
            const t = e.selection.getRng();
            return t.collapsed && (Jk(t) || e.dom.isEmpty(t.startContainer)) && !(e => tE(vn(e.selection.getStart())))(e)
        })(e) && Qk(e, []), !0),
        oE = (e, t, n) => C(n) ? I.some((() => {
            e._selectionOverrides.hideFakeCaret(), oh(e, t, vn(n))
        })) : I.none(),
        rE = (e, t) => e.selection.isCollapsed() ? ((e, t) => {
            const n = t ? dp : cp,
                o = t ? Zc.Forwards : Zc.Backwards,
                r = Yc(o, e.getBody(), e.selection.getRng());
            return n(r) ? oE(e, t, r.getNode(!t)) : I.from(lh(t, r)).filter((e => n(e) && Jc(r, e))).bind((n => oE(e, t, n.getNode(!t))))
        })(e, t) : ((e, t) => {
            const n = e.selection.getNode();
            return lr(n) ? oE(e, t, n) : I.none()
        })(e, t),
        sE = e => Xe(null != e ? e : "").getOr(0),
        aE = (e, t) => (e || "table" === jt(t) ? "margin" : "padding") + ("rtl" === io(t, "direction") ? "-right" : "-left"),
        iE = e => {
            const t = dE(e);
            return !e.mode.isReadOnly() && (t.length > 1 || ((e, t) => ne(t, (t => {
                const n = aE(Gl(e), t),
                    o = co(t, n).map(sE).getOr(0);
                return "false" !== e.dom.getContentEditable(t.dom) && o > 0
            })))(e, t))
        },
        lE = e => Er(e) || Sr(e),
        dE = e => G(xo(e.selection.getSelectedBlocks()), (e => !lE(e) && !(e => Rn(e).exists(lE))(e) && Qn(e, (e => rr(e.dom) || sr(e.dom))).exists((e => rr(e.dom))))),
        cE = (e, t) => {
            var n, o;
            const {
                dom: r
            } = e, s = Yl(e), a = null !== (o = null === (n = /[a-z%]+$/i.exec(s)) || void 0 === n ? void 0 : n[0]) && void 0 !== o ? o : "px", i = sE(s), l = Gl(e);
            q(dE(e), (e => {
                ((e, t, n, o, r, s) => {
                    const a = aE(n, vn(s)),
                        i = sE(e.getStyle(s, a));
                    if ("outdent" === t) {
                        const t = Math.max(0, i - o);
                        e.setStyle(s, a, t ? t + r : "")
                    } else {
                        const t = i + o + r;
                        e.setStyle(s, a, t)
                    }
                })(r, t, l, i, a, e.dom)
            }))
        },
        uE = e => cE(e, "outdent"),
        mE = e => {
            if (e.selection.isCollapsed() && iE(e)) {
                const t = e.dom,
                    n = e.selection.getRng(),
                    o = Mi.fromRangeStart(n),
                    r = t.getParent(n.startContainer, t.isBlock);
                if (null !== r && wp(vn(r), o)) return I.some((() => uE(e)))
            }
            return I.none()
        },
        fE = (e, t, n) => ue([mE, kx, px, (e, n) => qk(e, t, n), sx, $h, Ex, rE, lx, eE], (t => t(e, n))).filter((t => e.selection.isEditable())),
        gE = (e, t) => {
            e.addCommand("delete", (() => {
                ((e, t) => {
                    fE(e, t, !1).fold((() => {
                        mh(e), ph(e)
                    }), P)
                })(e, t)
            })), e.addCommand("forwardDelete", (() => {
                ((e, t) => {
                    fE(e, t, !0).fold((() => (e => uh(e, "ForwardDelete"))(e)), P)
                })(e, t)
            }))
        },
        pE = e => void 0 === e.touches || 1 !== e.touches.length ? I.none() : I.some(e.touches[0]),
        hE = (e, t) => ke(e, t.nodeName),
        bE = (e, t) => !!Xo(t) || !!jo(t) && !hE(e.getBlockElements(), t) && !Mu(t) && !Ns(e, t),
        vE = (e, t) => {
            if (Xo(t)) {
                if (0 === t.data.length) return !0;
                if (/^\s+$/.test(t.data) && (!t.nextSibling || hE(e, t.nextSibling))) return !0
            }
            return !1
        },
        yE = e => e.dom.create(Rl(e), Al(e)),
        CE = e => {
            const t = e.dom,
                n = e.selection,
                o = e.schema,
                r = o.getBlockElements(),
                s = n.getStart(),
                a = e.getBody();
            let i, l, d = !1;
            const c = Rl(e);
            if (!s || !jo(s)) return;
            const u = a.nodeName.toLowerCase();
            if (!o.isValidChild(u, c.toLowerCase()) || ((e, t, n) => $(pp(vn(n), vn(t)), (t => hE(e, t.dom))))(r, a, s)) return;
            const m = n.getRng(),
                {
                    startContainer: f,
                    startOffset: g,
                    endContainer: p,
                    endOffset: h
                } = m,
                b = kg(e);
            let v = a.firstChild;
            for (; v;)
                if (jo(v) && ks(o, v), bE(o, v)) {
                    if (vE(r, v)) {
                        l = v, v = v.nextSibling, t.remove(l);
                        continue
                    }
                    i || (i = yE(e), a.insertBefore(i, v), d = !0), l = v, v = v.nextSibling, i.appendChild(l)
                } else i = null, v = v.nextSibling;
            d && b && (m.setStart(f, g), m.setEnd(p, h), n.setRng(m), e.nodeChanged())
        },
        wE = (e, t, n) => {
            const o = vn(yE(e)),
                r = Tr();
            ho(o, r), n(t, o);
            const s = document.createRange();
            return s.setStartBefore(r.dom), s.setEndBefore(r.dom), s
        },
        xE = e => t => -1 !== (" " + t.attr("class") + " ").indexOf(e),
        kE = (e, t, n) => function(o) {
            const r = arguments,
                s = r[r.length - 2],
                a = s > 0 ? t.charAt(s - 1) : "";
            if ('"' === a) return o;
            if (">" === a) {
                const e = t.lastIndexOf("<", s);
                if (-1 !== e && -1 !== t.substring(e, s).indexOf('contenteditable="false"')) return o
            }
            return '<span class="' + n + '" data-mce-content="' + e.dom.encode(r[0]) + '">' + e.dom.encode("string" == typeof r[1] ? r[1] : r[0]) + "</span>"
        },
        EE = (e, t) => {
            t.hasAttribute("data-mce-caret") && (Kr(t), e.selection.setRng(e.selection.getRng()), e.selection.scrollIntoView(t))
        },
        SE = (e, t) => {
            const n = (e => Zn(vn(e.getBody()), "*[data-mce-caret]").map((e => e.dom)).getOrNull())(e);
            if (n) return "compositionstart" === t.type ? (t.preventDefault(), t.stopPropagation(), void EE(e, n)) : void(Hr(n) && (EE(e, n), e.undoManager.add()))
        },
        _E = sr,
        NE = (e, t, n) => {
            const o = cu(e.getBody()),
                r = O(Qc, 1 === t ? o.next : o.prev);
            if (n.collapsed) {
                const o = e.dom.getParent(n.startContainer, "PRE");
                if (!o) return;
                if (!r(Mi.fromRangeStart(n))) {
                    const n = vn((e => {
                        const t = e.dom.create(Rl(e));
                        return t.innerHTML = '<br data-mce-bogus="1">', t
                    })(e));
                    1 === t ? go(vn(o), n) : fo(vn(o), n), e.selection.select(n.dom, !0), e.selection.collapse()
                }
            }
        },
        RE = (e, t) => ((e, t) => {
            const n = t ? Zc.Forwards : Zc.Backwards,
                o = e.selection.getRng();
            return ((e, t, n) => Ak(t, e, n, fp, gp, _E))(n, e, o).orThunk((() => (NE(e, n, o), I.none())))
        })(e, ((e, t) => {
            const n = t ? e.getEnd(!0) : e.getStart(!0);
            return ah(n) ? !t : t
        })(e.selection, t)).exists((t => (Nk(e, t), !0))),
        AE = (e, t) => ((e, t) => {
            const n = t ? 1 : -1,
                o = e.selection.getRng();
            return ((e, t, n) => Ok(t, e, n, (e => fp(e) || up(e)), (e => gp(e) || mp(e)), _E))(n, e, o).orThunk((() => (NE(e, n, o), I.none())))
        })(e, t).exists((t => (Nk(e, t), !0))),
        OE = (e, t) => Bk(e, t, t ? gp : fp),
        TE = (e, t) => hx(e, !t).map((n => {
            const o = n.toRange(),
                r = e.selection.getRng();
            return t ? o.setStart(r.startContainer, r.startOffset) : o.setEnd(r.endContainer, r.endOffset), o
        })).exists((t => (Nk(e, t), !0))),
        BE = e => H(["figcaption"], jt(e)),
        DE = (e, t) => {
            const n = vn(e.getBody()),
                o = Mi.fromRangeStart(e.selection.getRng());
            return ((e, t) => {
                const n = O(kn, t);
                return Qn(vn(e.container()), Cr, n).filter(BE)
            })(o, n).exists((() => {
                if (((e, t, n) => t ? ((e, t) => dk(e, t).breakAt.isNone())(e.dom, n) : ((e, t) => lk(e, t).breakAt.isNone())(e.dom, n))(n, t, o)) {
                    const o = wE(e, n, t ? ho : po);
                    return e.selection.setRng(o), !0
                }
                return !1
            }))
        },
        PE = (e, t) => !!e.selection.isCollapsed() && DE(e, t),
        LE = {
            shiftKey: !1,
            altKey: !1,
            ctrlKey: !1,
            metaKey: !1,
            keyCode: 0
        },
        ME = (e, t) => t.keyCode === e.keyCode && t.shiftKey === e.shiftKey && t.altKey === e.altKey && t.ctrlKey === e.ctrlKey && t.metaKey === e.metaKey,
        IE = (e, ...t) => () => e.apply(null, t),
        FE = (e, t) => J(((e, t) => te((e => V(e, (e => ({
            ...LE,
            ...e
        }))))(e), (e => ME(e, t) ? [e] : [])))(e, t), (e => e.action())),
        UE = (e, t) => ue(((e, t) => te((e => V(e, (e => ({
            ...LE,
            ...e
        }))))(e), (e => ME(e, t) ? [e] : [])))(e, t), (e => e.action())),
        zE = (e, t) => {
            const n = t ? Zc.Forwards : Zc.Backwards,
                o = e.selection.getRng();
            return Ak(e, n, o, dp, cp, lr).exists((t => (Nk(e, t), !0)))
        },
        jE = (e, t) => {
            const n = t ? 1 : -1,
                o = e.selection.getRng();
            return Ok(e, n, o, dp, cp, lr).exists((t => (Nk(e, t), !0)))
        },
        HE = (e, t) => Bk(e, t, t ? cp : dp),
        $E = il([{
            none: ["current"]
        }, {
            first: ["current"]
        }, {
            middle: ["current", "target"]
        }, {
            last: ["current"]
        }]),
        VE = {
            ...$E,
            none: e => $E.none(e)
        },
        qE = (e, t, n) => te(Ln(e), (e => wn(e, t) ? n(e) ? [e] : [] : qE(e, t, n))),
        WE = (e, t) => eo(e, "table", t),
        KE = (e, t, n, o, r = M) => {
            const s = 1 === o;
            if (!s && n <= 0) return VE.first(e[0]);
            if (s && n >= e.length - 1) return VE.last(e[e.length - 1]);
            {
                const s = n + o,
                    a = e[s];
                return r(a) ? VE.middle(t, a) : KE(e, t, s, o, r)
            }
        },
        GE = (e, t) => WE(e, t).bind((t => {
            const n = qE(t, "th,td", M);
            return Z(n, (t => kn(e, t))).map((e => ({
                index: e,
                all: n
            })))
        })),
        YE = (e, t, n, o, r) => {
            const s = Mo(vn(n), "td,th,caption").map((e => e.dom)),
                a = G(((e, t) => te(t, (t => {
                    const n = ((e, t) => ({
                        left: e.left - t,
                        top: e.top - t,
                        right: e.right + -2,
                        bottom: e.bottom + -2,
                        width: e.width + t,
                        height: e.height + t
                    }))(di(t.getBoundingClientRect()), -1);
                    return [{
                        x: n.left,
                        y: e(n),
                        cell: t
                    }, {
                        x: n.right,
                        y: e(n),
                        cell: t
                    }]
                })))(e, s), (e => t(e, r)));
            return ((e, t, n) => X(e, ((e, o) => e.fold((() => I.some(o)), (e => {
                const r = Math.sqrt(Math.abs(e.x - t) + Math.abs(e.y - n)),
                    s = Math.sqrt(Math.abs(o.x - t) + Math.abs(o.y - n));
                return I.some(s < r ? o : e)
            }))), I.none()))(a, o, r).map((e => e.cell))
        },
        XE = O(YE, (e => e.bottom), ((e, t) => e.y < t)),
        QE = O(YE, (e => e.top), ((e, t) => e.y > t)),
        JE = (e, t, n) => {
            const o = e(t, n);
            return (e => e.breakType === ek.Wrap && 0 === e.positions.length)(o) || !nr(n.getNode()) && (e => e.breakType === ek.Br && 1 === e.positions.length)(o) ? !((e, t, n) => n.breakAt.exists((n => e(t, n).breakAt.isSome())))(e, t, o) : o.breakAt.isNone()
        },
        ZE = O(JE, lk),
        eS = O(JE, dk),
        tS = (e, t, n, o) => {
            const r = e.selection.getRng(),
                s = t ? 1 : -1;
            return !(!kc() || !((e, t, n) => {
                const o = Mi.fromRangeStart(t);
                return bu(!e, n).exists((e => e.isEqual(o)))
            })(t, r, n) || (dx(s, e, n, !t, !1).each((t => {
                Nk(e, t)
            })), 0))
        },
        nS = (e, t, n) => {
            const o = ((e, t) => {
                    const n = t.getNode(e);
                    return Ko(n) ? I.some(n) : I.none()
                })(!!t, n),
                r = !1 === t;
            o.fold((() => Nk(e, n.toRange())), (o => bu(r, e.getBody()).filter((e => e.isEqual(n))).fold((() => Nk(e, n.toRange())), (n => ((e, t, n) => {
                t.undoManager.transact((() => {
                    const o = e ? go : fo,
                        r = wE(t, vn(n), o);
                    Nk(t, r)
                }))
            })(t, e, o)))))
        },
        oS = (e, t, n, o) => {
            const r = e.selection.getRng(),
                s = Mi.fromRangeStart(r),
                a = e.getBody();
            if (!t && ZE(o, s)) {
                const o = ((e, t, n) => ((e, t) => le(t.getClientRects()).bind((t => XE(e, t.left, t.top))).bind((e => {
                    return ik(wu(n = e).map((e => lk(n, e).positions.concat(e))).getOr([]), t);
                    var n
                })))(t, n).orThunk((() => le(n.getClientRects()).bind((n => ak(ck(e, Mi.before(t)), n.left))))).getOr(Mi.before(t)))(a, n, s);
                return nS(e, t, o), !0
            }
            if (t && eS(o, s)) {
                const o = ((e, t, n) => ((e, t) => de(t.getClientRects()).bind((t => QE(e, t.left, t.top))).bind((e => {
                    return ik(Cu(n = e).map((e => [e].concat(dk(n, e).positions))).getOr([]), t);
                    var n
                })))(t, n).orThunk((() => le(n.getClientRects()).bind((n => ak(uk(e, Mi.after(t)), n.left))))).getOr(Mi.after(t)))(a, n, s);
                return nS(e, t, o), !0
            }
            return !1
        },
        rS = (e, t, n) => I.from(e.dom.getParent(e.selection.getNode(), "td,th")).bind((o => I.from(e.dom.getParent(o, "table")).map((r => n(e, t, r, o))))).getOr(!1),
        sS = (e, t) => rS(e, t, tS),
        aS = (e, t) => rS(e, t, oS),
        iS = (e, t, n) => n.fold(I.none, I.none, ((e, t) => {
            return (n = t, ((e, t) => {
                const n = e => {
                    for (let o = 0; o < e.childNodes.length; o++) {
                        const r = vn(e.childNodes[o]);
                        if (t(r)) return I.some(r);
                        const s = n(e.childNodes[o]);
                        if (s.isSome()) return s
                    }
                    return I.none()
                };
                return n(e.dom)
            })(n, Tg)).map((e => (e => {
                const t = bf.exact(e, 0, e, 0);
                return xf(t)
            })(e)));
            var n
        }), (n => (e.execCommand("mceTableInsertRowAfter"), lS(e, t, n)))),
        lS = (e, t, n) => {
            return iS(e, t, (r = to, GE(o = n, void 0).fold((() => VE.none(o)), (e => KE(e.all, o, e.index, 1, r)))));
            var o, r
        },
        dS = (e, t, n) => {
            return iS(e, t, (r = to, GE(o = n, void 0).fold((() => VE.none()), (e => KE(e.all, o, e.index, -1, r)))));
            var o, r
        },
        cS = (e, t) => {
            const n = ["table", "li", "dl"],
                o = vn(e.getBody()),
                r = e => {
                    const t = jt(e);
                    return kn(e, o) || H(n, t)
                },
                s = e.selection.getRng();
            return ((e, t) => ((e, t, n = L) => n(t) ? I.none() : H(e, jt(t)) ? I.some(t) : Jn(t, e.join(","), (e => wn(e, "table") || n(e))))(["td", "th"], e, t))(vn(t ? s.endContainer : s.startContainer), r).map((n => (WE(n, r).each((t => {
                e.model.table.clearSelectedCells(t.dom)
            })), e.selection.collapse(!t), (t ? lS : dS)(e, r, n).each((t => {
                e.selection.setRng(t)
            })), !0))).getOr(!1)
        },
        uS = (e, t) => ({
            container: e,
            offset: t
        }),
        mS = Oa.DOM,
        fS = e => t => e === t ? -1 : 0,
        gS = (e, t, n) => {
            if (Xo(e) && t >= 0) return I.some(uS(e, t));
            {
                const o = ii(mS);
                return I.from(o.backwards(e, t, fS(e), n)).map((e => uS(e.container, e.container.data.length)))
            }
        },
        pS = (e, t, n) => {
            if (!Xo(e)) return I.none();
            const o = e.data;
            if (t >= 0 && t <= o.length) return I.some(uS(e, t));
            {
                const o = ii(mS);
                return I.from(o.backwards(e, t, fS(e), n)).bind((e => {
                    const o = e.container.data;
                    return pS(e.container, t + o.length, n)
                }))
            }
        },
        hS = (e, t, n) => {
            if (!Xo(e)) return I.none();
            const o = e.data;
            if (t <= o.length) return I.some(uS(e, t));
            {
                const r = ii(mS);
                return I.from(r.forwards(e, t, fS(e), n)).bind((e => hS(e.container, t - o.length, n)))
            }
        },
        bS = (e, t, n, o, r) => {
            const s = ii(e, (e => t => e.isBlock(t) || H(["BR", "IMG", "HR", "INPUT"], t.nodeName) || "false" === e.getContentEditable(t))(e));
            return I.from(s.backwards(t, n, o, r))
        },
        vS = e => Mr(e.toString().replace(/\u00A0/g, " ")),
        yS = e => "" !== e && -1 !== " \xa0\f\n\r\t\v".indexOf(e),
        CS = (e, t) => e.substring(t.length),
        wS = (e, t, n, o = 0) => {
            return (r = vn(t.startContainer), eo(r, Bg)).fold((() => ((e, t, n, o = 0) => {
                if (!(r = t).collapsed || !Xo(r.startContainer)) return I.none();
                var r;
                const s = {
                        text: "",
                        offset: 0
                    },
                    a = e.getParent(t.startContainer, e.isBlock) || e.getRoot();
                return bS(e, t.startContainer, t.startOffset, ((e, t, o) => (s.text = o + s.text, s.offset += t, ((e, t, n) => {
                    let o;
                    const r = n.charAt(0);
                    for (o = t - 1; o >= 0; o--) {
                        const s = e.charAt(o);
                        if (yS(s)) return I.none();
                        if (r === s && je(e, n, o, t)) break
                    }
                    return I.some(o)
                })(s.text, s.offset, n).getOr(t))), a).bind((e => {
                    const r = t.cloneRange();
                    if (r.setStart(e.container, e.offset), r.setEnd(t.endContainer, t.endOffset), r.collapsed) return I.none();
                    const s = vS(r);
                    return 0 !== s.lastIndexOf(n) || CS(s, n).length < o ? I.none() : I.some({
                        text: CS(s, n),
                        range: r,
                        trigger: n
                    })
                }))
            })(e, t, n, o)), (t => {
                const o = e.createRng();
                o.selectNode(t.dom);
                const r = vS(o);
                return I.some({
                    range: o,
                    text: CS(r, n),
                    trigger: n
                })
            }));
            var r
        },
        xS = e => {
            if ((e => 3 === e.nodeType)(e)) return uS(e, e.data.length);
            {
                const t = e.childNodes;
                return t.length > 0 ? xS(t[t.length - 1]) : uS(e, t.length)
            }
        },
        kS = (e, t) => {
            const n = e.childNodes;
            return n.length > 0 && t < n.length ? kS(n[t], 0) : n.length > 0 && (e => 1 === e.nodeType)(e) && n.length === t ? xS(n[n.length - 1]) : uS(e, t)
        },
        ES = (e, t, n, o = {}) => {
            var r;
            const s = t(),
                a = null !== (r = e.selection.getRng().startContainer.nodeValue) && void 0 !== r ? r : "",
                i = G(s.lookupByTrigger(n.trigger), (t => n.text.length >= t.minChars && t.matches.getOrThunk((() => (e => t => {
                    const n = kS(t.startContainer, t.startOffset);
                    return !((e, t) => {
                        var n;
                        const o = null !== (n = e.getParent(t.container, e.isBlock)) && void 0 !== n ? n : e.getRoot();
                        return bS(e, t.container, t.offset, ((e, t) => 0 === t ? -1 : t), o).filter((e => {
                            const t = e.container.data.charAt(e.offset - 1);
                            return !yS(t)
                        })).isSome()
                    })(e, n)
                })(e.dom)))(n.range, a, n.text)));
            if (0 === i.length) return I.none();
            const l = Promise.all(V(i, (e => e.fetch(n.text, e.maxResults, o).then((t => ({
                matchText: n.text,
                items: t,
                columns: e.columns,
                onAction: e.onAction,
                highlightOn: e.highlightOn
            }))))));
            return I.some({
                lookupData: l,
                context: n
            })
        };
    var SS;
    ! function(e) {
        e[e.Error = 0] = "Error", e[e.Value = 1] = "Value"
    }(SS || (SS = {}));
    const _S = (e, t, n) => e.stype === SS.Error ? t(e.serror) : n(e.svalue),
        NS = e => ({
            stype: SS.Value,
            svalue: e
        }),
        RS = e => ({
            stype: SS.Error,
            serror: e
        }),
        AS = _S,
        OS = e => f(e) && me(e).length > 100 ? " removed due to size" : JSON.stringify(e, null, 2),
        TS = (e, t) => RS([{
            path: e,
            getErrorInfo: t
        }]),
        BS = (e, t) => ({
            extract: (n, o) => xe(o, e).fold((() => ((e, t) => TS(e, (() => 'Choice schema did not contain choice key: "' + t + '"')))(n, e)), (e => ((e, t, n, o) => xe(n, o).fold((() => ((e, t, n) => TS(e, (() => 'The chosen schema: "' + n + '" did not exist in branches: ' + OS(t))))(e, n, o)), (n => n.extract(e.concat(["branch: " + o]), t))))(n, o, t, e))),
            toString: () => "chooseOn(" + e + "). Possible values: " + me(t)
        }),
        DS = e => (...t) => {
            if (0 === t.length) throw new Error("Can't merge zero objects");
            const n = {};
            for (let o = 0; o < t.length; o++) {
                const r = t[o];
                for (const t in r) ke(r, t) && (n[t] = e(n[t], r[t]))
            }
            return n
        },
        PS = DS(((e, t) => g(e) && g(t) ? PS(e, t) : t)),
        LS = (DS(((e, t) => t)), e => ({
            tag: "defaultedThunk",
            process: N(e)
        })),
        MS = e => {
            const t = (e => {
                const t = [],
                    n = [];
                return q(e, (e => {
                    _S(e, (e => n.push(e)), (e => t.push(e)))
                })), {
                    values: t,
                    errors: n
                }
            })(e);
            return t.errors.length > 0 ? (n = t.errors, S(RS, ee)(n)) : NS(t.values);
            var n
        },
        IS = (e, t, n) => {
            switch (e.tag) {
                case "field":
                    return t(e.key, e.newKey, e.presence, e.prop);
                case "custom":
                    return n(e.newKey, e.instantiator)
            }
        },
        FS = e => ({
            extract: (t, n) => {
                return o = e(n), r = e => ((e, t) => TS(e, N(t)))(t, e), o.stype === SS.Error ? r(o.serror) : o;
                var o, r
            },
            toString: N("val")
        }),
        US = FS(NS),
        zS = (e, t, n, o) => o(xe(e, t).getOrThunk((() => n(e)))),
        jS = (e, t, n, o, r) => {
            const s = e => r.extract(t.concat([o]), e),
                a = e => e.fold((() => NS(I.none())), (e => {
                    const n = r.extract(t.concat([o]), e);
                    return s = n, a = I.some, s.stype === SS.Value ? {
                        stype: SS.Value,
                        svalue: a(s.svalue)
                    } : s;
                    var s, a
                }));
            switch (e.tag) {
                case "required":
                    return ((e, t, n, o) => xe(t, n).fold((() => ((e, t, n) => TS(e, (() => 'Could not find valid *required* value for "' + t + '" in ' + OS(n))))(e, n, t)), o))(t, n, o, s);
                case "defaultedThunk":
                    return zS(n, o, e.process, s);
                case "option":
                    return ((e, t, n) => n(xe(e, t)))(n, o, a);
                case "defaultedOptionThunk":
                    return ((e, t, n, o) => o(xe(e, t).map((t => !0 === t ? n(e) : t))))(n, o, e.process, a);
                case "mergeWithThunk":
                    return zS(n, o, N({}), (t => {
                        const o = PS(e.process(n), t);
                        return s(o)
                    }))
            }
        },
        HS = e => ({
            extract: (t, n) => ((e, t, n) => {
                const o = {},
                    r = [];
                for (const s of n) IS(s, ((n, s, a, i) => {
                    const l = jS(a, e, t, n, i);
                    AS(l, (e => {
                        r.push(...e)
                    }), (e => {
                        o[s] = e
                    }))
                }), ((e, n) => {
                    o[e] = n(t)
                }));
                return r.length > 0 ? RS(r) : NS(o)
            })(t, n, e),
            toString: () => {
                const t = V(e, (e => IS(e, ((e, t, n, o) => e + " -> " + o.toString()), ((e, t) => "state(" + e + ")"))));
                return "obj{\n" + t.join("\n") + "}"
            }
        }),
        $S = e => ({
            extract: (t, n) => {
                const o = V(n, ((n, o) => e.extract(t.concat(["[" + o + "]"]), n)));
                return MS(o)
            },
            toString: () => "array(" + e.toString() + ")"
        }),
        VS = (e, t, n) => {
            return o = ((e, t, n) => ((e, t) => e.stype === SS.Error ? {
                stype: SS.Error,
                serror: t(e.serror)
            } : e)(t.extract([e], n), (e => ({
                input: n,
                errors: e
            }))))(e, t, n), _S(o, al.error, al.value);
            var o
        },
        qS = (e, t) => BS(e, pe(t, HS)),
        WS = N(US),
        KS = (e, t) => FS((n => {
            const o = typeof n;
            return e(n) ? NS(n) : RS(`Expected type: ${t} but got: ${o}`)
        })),
        GS = KS(x, "number"),
        YS = KS(m, "string"),
        XS = KS(b, "boolean"),
        QS = KS(w, "function"),
        JS = (e, t, n, o) => ({
            tag: "field",
            key: e,
            newKey: t,
            presence: n,
            prop: o
        }),
        ZS = (e, t) => ({
            tag: "custom",
            newKey: e,
            instantiator: t
        }),
        e_ = (e, t) => JS(e, e, {
            tag: "required",
            process: {}
        }, t),
        t_ = e => e_(e, YS),
        n_ = e => e_(e, QS),
        o_ = (e, t) => JS(e, e, {
            tag: "option",
            process: {}
        }, t),
        r_ = e => o_(e, YS),
        s_ = (e, t, n) => JS(e, e, LS(t), n),
        a_ = (e, t) => s_(e, t, GS),
        i_ = (e, t, n) => s_(e, t, (e => {
            return t = t => H(e, t) ? al.value(t) : al.error(`Unsupported value: "${t}", choose one of "${e.join(", ")}".`), FS((e => t(e).fold(RS, NS)));
            var t
        })(n)),
        l_ = (e, t) => s_(e, t, XS),
        d_ = (e, t) => s_(e, t, QS),
        c_ = t_("type"),
        u_ = n_("fetch"),
        m_ = n_("onAction"),
        f_ = d_("onSetup", (() => E)),
        g_ = r_("text"),
        p_ = r_("icon"),
        h_ = r_("tooltip"),
        b_ = r_("label"),
        v_ = l_("active", !1),
        y_ = l_("enabled", !0),
        C_ = l_("primary", !1),
        w_ = e => ((e, t) => s_("type", t, YS))(0, e),
        x_ = HS([c_, t_("trigger"), a_("minChars", 1), (1, ((e, t) => JS(e, e, LS(1), WS()))("columns")), a_("maxResults", 10), ("matches", o_("matches", QS)), u_, m_, (k_ = YS, s_("highlightOn", [], $S(k_)))]);
    var k_;
    const E_ = [y_, h_, p_, g_, f_],
        S_ = [v_].concat(E_),
        __ = [d_("predicate", L), i_("scope", "node", ["node", "editor"]), i_("position", "selection", ["node", "selection", "line"])],
        N_ = E_.concat([w_("contextformbutton"), C_, m_, ZS("original", R)]),
        R_ = S_.concat([w_("contextformbutton"), C_, m_, ZS("original", R)]),
        A_ = E_.concat([w_("contextformbutton")]),
        O_ = S_.concat([w_("contextformtogglebutton")]),
        T_ = qS("type", {
            contextformbutton: N_,
            contextformtogglebutton: R_
        });
    HS([w_("contextform"), d_("initValue", N("")), b_, ((e, t) => JS(e, e, {
        tag: "required",
        process: {}
    }, $S(t)))("commands", T_), o_("launch", qS("type", {
        contextformbutton: A_,
        contextformtogglebutton: O_
    }))].concat(__));
    const B_ = e => {
            const t = e.ui.registry.getAll().popups,
                n = pe(t, (e => {
                    return (t = e, VS("Autocompleter", x_, {
                        trigger: t.ch,
                        ...t
                    })).fold((e => {
                        throw new Error("Errors: \n" + (e => {
                            const t = e.length > 10 ? e.slice(0, 10).concat([{
                                path: [],
                                getErrorInfo: N("... (only showing first ten failures)")
                            }]) : e;
                            return V(t, (e => "Failed path: (" + e.path.join(" > ") + ")\n" + e.getErrorInfo()))
                        })((t = e).errors).join("\n") + "\n\nInput object: " + OS(t.input));
                        var t
                    }), R);
                    var t
                })),
                o = Se(Ce(n, (e => e.trigger))),
                r = we(n);
            return {
                dataset: n,
                triggers: o,
                lookupByTrigger: e => G(r, (t => t.trigger === e))
            }
        },
        D_ = e => {
            const t = za(),
                n = Da(!1),
                o = t.isSet,
                r = () => {
                    o() && ((e => {
                        IC(e).autocompleter.removeDecoration()
                    })(e), (e => {
                        e.dispatch("AutocompleterEnd")
                    })(e), n.set(!1), t.clear())
                },
                s = Pe((() => B_(e))),
                a = a => {
                    (n => t.get().map((t => wS(e.dom, e.selection.getRng(), t.trigger).bind((t => ES(e, s, t, n))))).getOrThunk((() => ((e, t) => {
                        const n = t(),
                            o = e.selection.getRng();
                        return ((e, t, n) => ue(n.triggers, (n => wS(e, t, n))))(e.dom, o, n).bind((n => ES(e, t, n)))
                    })(e, s))))(a).fold(r, (s => {
                        (n => {
                            o() || (((e, t) => {
                                IC(e).autocompleter.addDecoration(t)
                            })(e, n.range), t.set({
                                trigger: n.trigger,
                                matchLength: n.text.length
                            }))
                        })(s.context), s.lookupData.then((o => {
                            t.get().map((a => {
                                const i = s.context;
                                a.trigger === i.trigger && (i.text.length - a.matchLength >= 10 ? r() : (t.set({
                                    ...a,
                                    matchLength: i.text.length
                                }), n.get() ? ((e, t) => {
                                    e.dispatch("AutocompleterUpdate", t)
                                })(e, {
                                    lookupData: o
                                }) : (n.set(!0), ((e, t) => {
                                    e.dispatch("AutocompleterStart", t)
                                })(e, {
                                    lookupData: o
                                }))))
                            }))
                        }))
                    }))
                };
            e.addCommand("mceAutocompleterReload", ((e, t) => {
                const n = f(t) ? t.fetchOptions : {};
                a(n)
            })), e.addCommand("mceAutocompleterClose", r), ((e, t) => {
                const n = Ha(t.load, 50);
                e.on("keypress compositionend", (e => {
                    27 !== e.which && n.throttle()
                })), e.on("keydown", (e => {
                    const o = e.which;
                    8 === o ? n.throttle() : 27 === o && t.cancelIfNecessary()
                })), e.on("remove", n.cancel)
            })(e, {
                cancelIfNecessary: r,
                load: a
            })
        },
        P_ = e => (t, n, o = {}) => {
            const r = t.getBody(),
                s = {
                    bubbles: !0,
                    composed: !0,
                    data: null,
                    isComposing: !1,
                    detail: 0,
                    view: null,
                    target: r,
                    currentTarget: r,
                    eventPhase: Event.AT_TARGET,
                    originalTarget: r,
                    explicitOriginalTarget: r,
                    isTrusted: !1,
                    srcElement: r,
                    cancelable: !1,
                    preventDefault: E,
                    inputType: n
                },
                a = fa(new InputEvent(e));
            return t.dispatch(e, {
                ...a,
                ...s,
                ...o
            })
        },
        L_ = P_("input"),
        M_ = P_("beforeinput"),
        I_ = (e, t) => {
            const n = e.dom,
                o = e.schema.getMoveCaretBeforeOnEnterElements();
            if (!t) return;
            if (/^(LI|DT|DD)$/.test(t.nodeName)) {
                const e = (e => {
                    for (; e;) {
                        if (jo(e) || Xo(e) && e.data && /[\r\n\s]/.test(e.data)) return e;
                        e = e.nextSibling
                    }
                    return null
                })(t.firstChild);
                e && /^(UL|OL|DL)$/.test(e.nodeName) && t.insertBefore(n.doc.createTextNode(fr), t.firstChild)
            }
            const r = n.createRng();
            if (t.normalize(), t.hasChildNodes()) {
                const e = new Fo(t, t);
                let n, s = t;
                for (; n = e.current();) {
                    if (Xo(n)) {
                        r.setStart(n, 0), r.setEnd(n, 0);
                        break
                    }
                    if (o[n.nodeName.toLowerCase()]) {
                        r.setStartBefore(n), r.setEndBefore(n);
                        break
                    }
                    s = n, n = e.next()
                }
                n || (r.setStart(s, 0), r.setEnd(s, 0))
            } else nr(t) ? t.nextSibling && n.isBlock(t.nextSibling) ? (r.setStartBefore(t), r.setEndBefore(t)) : (r.setStartAfter(t), r.setEndAfter(t)) : (r.setStart(t, 0), r.setEnd(t, 0));
            e.selection.setRng(r), eg(e, r)
        },
        F_ = (e, t) => {
            const n = e.getRoot();
            let o, r = t;
            for (; r !== n && r && "false" !== e.getContentEditable(r);) "true" === e.getContentEditable(r) && (o = r), r = r.parentNode;
            return r !== n ? o : n
        },
        U_ = e => I.from(e.dom.getParent(e.selection.getStart(!0), e.dom.isBlock)),
        z_ = (e, t) => {
            const n = null == e ? void 0 : e.parentNode;
            return C(n) && n.nodeName === t
        },
        j_ = e => C(e) && /^(OL|UL|LI)$/.test(e.nodeName),
        H_ = e => {
            const t = e.parentNode;
            return C(n = t) && /^(LI|DT|DD)$/.test(n.nodeName) ? t : e;
            var n
        },
        $_ = (e, t, n) => {
            let o = e[n ? "firstChild" : "lastChild"];
            for (; o && !jo(o);) o = o[n ? "nextSibling" : "previousSibling"];
            return o === t
        },
        V_ = (e, t) => t && "A" === t.nodeName && e.isEmpty(t),
        q_ = e => {
            e.innerHTML = '<br data-mce-bogus="1">'
        },
        W_ = (e, t) => e.nodeName === t || e.previousSibling && e.previousSibling.nodeName === t,
        K_ = (e, t) => C(t) && e.isBlock(t) && !/^(TD|TH|CAPTION|FORM)$/.test(t.nodeName) && !/^(fixed|absolute)/i.test(t.style.position) && e.isEditable(t.parentNode) && "false" !== e.getContentEditable(t),
        G_ = (e, t, n) => Xo(t) ? e ? 1 === n && t.data.charAt(n - 1) === Pr ? 0 : n : n === t.data.length - 1 && t.data.charAt(n) === Pr ? t.data.length : n : n,
        Y_ = (e, t) => {
            Rl(e).toLowerCase() === t.tagName.toLowerCase() && ((e, t, n) => {
                const o = e.dom;
                I.from(n.style).map(o.parseStyle).each((e => {
                    const n = {
                        ...uo(vn(t)),
                        ...e
                    };
                    o.setStyles(t, n)
                }));
                const r = I.from(n.class).map((e => e.split(/\s+/))),
                    s = I.from(t.className).map((e => G(e.split(/\s+/), (e => "" !== e))));
                Lt(r, s, ((e, n) => {
                    const r = G(n, (t => !H(e, t))),
                        s = [...e, ...r];
                    o.setAttrib(t, "class", s.join(" "))
                }));
                const a = ["style", "class"],
                    i = ye(n, ((e, t) => !H(a, t)));
                o.setAttribs(t, i)
            })(e, t, Al(e))
        },
        X_ = {
            insert: (e, t) => {
                let n, o, r, s, a = !1;
                const i = e.dom,
                    l = e.schema,
                    d = l.getNonEmptyElements(),
                    c = e.selection.getRng(),
                    u = Rl(e),
                    f = c.collapsed && c.startContainer === e.dom.getRoot(),
                    g = vn(c.startContainer),
                    p = Mn(g, c.startOffset),
                    b = p.exists((e => Vt(e) && !to(e))),
                    v = f && b,
                    w = t => {
                        let o = n;
                        const s = l.getTextInlineElements();
                        let a;
                        a = t || "TABLE" === r || "HR" === r ? i.create(t || u) : N.cloneNode(!1);
                        let d = a;
                        if (!1 === Dl(e)) i.setAttrib(a, "style", null), i.setAttrib(a, "class", null);
                        else
                            do {
                                if (s[o.nodeName]) {
                                    if (ku(o) || Mu(o)) continue;
                                    const e = o.cloneNode(!1);
                                    i.setAttrib(e, "id", ""), a.hasChildNodes() ? (e.appendChild(a.firstChild), a.appendChild(e)) : (d = e, a.appendChild(e))
                                }
                            } while ((o = o.parentNode) && o !== _);
                        return Y_(e, a), q_(d), a
                    },
                    x = e => {
                        const t = G_(e, n, o);
                        if (Xo(n) && (e ? t > 0 : t < n.data.length)) return !1;
                        if (n.parentNode === N && a && !e) return !0;
                        if (e && jo(n) && n === N.firstChild) return !0;
                        if (W_(n, "TABLE") || W_(n, "HR")) return a && !e || !a && e;
                        const r = new Fo(n, N);
                        let s;
                        for (Xo(n) && (e && 0 === t ? r.prev() : e || t !== n.data.length || r.next()); s = r.current();) {
                            if (jo(s)) {
                                if (!s.getAttribute("data-mce-bogus")) {
                                    const e = s.nodeName.toLowerCase();
                                    if (d[e] && "br" !== e) return !1
                                }
                            } else if (Xo(s) && !is(s.data)) return !1;
                            e ? r.prev() : r.next()
                        }
                        return !0
                    },
                    k = () => {
                        let t;
                        return t = /^(H[1-6]|PRE|FIGURE)$/.test(r) && "HGROUP" !== R ? w(u) : w(), ((e, t) => {
                            const n = Pl(e);
                            return !y(t) && (m(n) ? H(Dt.explode(n), t.nodeName.toLowerCase()) : n)
                        })(e, s) && K_(i, s) && i.isEmpty(N, void 0, {
                            includeZwsp: !0
                        }) ? t = i.split(s, N) : i.insertAfter(t, N), I_(e, t), t
                    };
                Tf(i, c).each((e => {
                    c.setStart(e.startContainer, e.startOffset), c.setEnd(e.endContainer, e.endOffset)
                })), n = c.startContainer, o = c.startOffset;
                const E = !(!t || !t.shiftKey),
                    S = !(!t || !t.ctrlKey);
                jo(n) && n.hasChildNodes() && !v && (a = o > n.childNodes.length - 1, n = n.childNodes[Math.min(o, n.childNodes.length - 1)] || n, o = a && Xo(n) ? n.data.length : 0);
                const _ = F_(i, n);
                if (!_ || ((e, t) => {
                        const n = e.dom.getParent(t, "ol,ul,dl");
                        return null !== n && "false" === e.dom.getContentEditableParent(n)
                    })(e, n)) return;
                E || (n = ((e, t, n, o, r) => {
                    var s, a;
                    const i = e.dom,
                        l = null !== (s = F_(i, o)) && void 0 !== s ? s : i.getRoot();
                    let d = i.getParent(o, i.isBlock);
                    if (!d || !K_(i, d)) {
                        if (d = d || l, !d.hasChildNodes()) {
                            const o = i.create(t);
                            return Y_(e, o), d.appendChild(o), n.setStart(o, 0), n.setEnd(o, 0), o
                        }
                        let s, c = o;
                        for (; c && c.parentNode !== d;) c = c.parentNode;
                        for (; c && !i.isBlock(c);) s = c, c = c.previousSibling;
                        const u = null === (a = null == s ? void 0 : s.parentElement) || void 0 === a ? void 0 : a.nodeName;
                        if (s && u && e.schema.isValidChild(u, t.toLowerCase())) {
                            const a = s.parentNode,
                                l = i.create(t);
                            for (Y_(e, l), a.insertBefore(l, s), c = s; c && !i.isBlock(c);) {
                                const e = c.nextSibling;
                                l.appendChild(c), c = e
                            }
                            n.setStart(o, r), n.setEnd(o, r)
                        }
                    }
                    return o
                })(e, u, c, n, o));
                let N = i.getParent(n, i.isBlock) || i.getRoot();
                s = C(null == N ? void 0 : N.parentNode) ? i.getParent(N.parentNode, i.isBlock) : null, r = N ? N.nodeName.toUpperCase() : "";
                const R = s ? s.nodeName.toUpperCase() : "";
                if ("LI" !== R || S || (N = s, s = s.parentNode, r = R), jo(s) && ((e, t, n) => !t && n.nodeName.toLowerCase() === Rl(e) && e.dom.isEmpty(n) && ((t, n, o) => {
                        let r = n;
                        for (; r && r !== t && h(r.nextSibling);) {
                            const t = r.parentElement;
                            if (!t || (s = t, !ke(e.schema.getTextBlockElements(), s.nodeName.toLowerCase()))) return cr(t);
                            r = t
                        }
                        var s;
                        return !1
                    })(e.getBody(), n))(e, E, N)) return ((e, t, n) => {
                    var o, r, s;
                    const a = t(Rl(e)),
                        i = ((e, t) => e.dom.getParent(t, cr))(e, n);
                    i && (e.dom.insertAfter(a, i), I_(e, a), (null !== (s = null === (r = null === (o = n.parentElement) || void 0 === o ? void 0 : o.childNodes) || void 0 === r ? void 0 : r.length) && void 0 !== s ? s : 0) > 1 && e.dom.remove(n))
                })(e, w, N);
                if (/^(LI|DT|DD)$/.test(r) && jo(s) && i.isEmpty(N)) return void((e, t, n, o, r) => {
                    const s = e.dom,
                        a = e.selection.getRng(),
                        i = n.parentNode;
                    if (n === e.getBody() || !i) return;
                    var l;
                    j_(l = n) && j_(l.parentNode) && (r = "LI");
                    let d = t(r);
                    if ($_(n, o, !0) && $_(n, o, !1))
                        if (z_(n, "LI")) {
                            const e = H_(n);
                            s.insertAfter(d, e), (e => {
                                var t;
                                return (null === (t = e.parentNode) || void 0 === t ? void 0 : t.firstChild) === e
                            })(n) ? s.remove(e) : s.remove(n)
                        } else s.replace(d, n);
                    else if ($_(n, o, !0)) z_(n, "LI") ? (s.insertAfter(d, H_(n)), d.appendChild(s.doc.createTextNode(" ")), d.appendChild(n)) : i.insertBefore(d, n), s.remove(o);
                    else if ($_(n, o, !1)) s.insertAfter(d, H_(n)), s.remove(o);
                    else {
                        n = H_(n);
                        const e = a.cloneRange();
                        e.setStartAfter(o), e.setEndAfter(n);
                        const t = e.extractContents();
                        "LI" === r && ((e, t) => e.firstChild && "LI" === e.firstChild.nodeName)(t) ? (d = t.firstChild, s.insertAfter(t, n)) : (s.insertAfter(t, n), s.insertAfter(d, n)), s.remove(o)
                    }
                    I_(e, d)
                })(e, w, s, N, u);
                if (!(v || N !== e.getBody() && K_(i, N))) return;
                const A = N.parentNode;
                let O;
                if (v) O = w(u), p.fold((() => {
                    ho(g, vn(O))
                }), (e => {
                    fo(e, vn(O))
                })), e.selection.setCursorLocation(O, 0);
                else if (Ur(N)) O = Kr(N), i.isEmpty(N) && q_(N), Y_(e, O), I_(e, O);
                else if (x(!1)) O = k();
                else if (x(!0) && A) {
                    O = A.insertBefore(w(), N);
                    const t = vn(c.startContainer).dom.hasChildNodes() && c.collapsed;
                    I_(e, W_(N, "HR") || t ? O : N)
                } else {
                    const t = (e => {
                        const t = e.cloneRange();
                        return t.setStart(e.startContainer, G_(!0, e.startContainer, e.startOffset)), t.setEnd(e.endContainer, G_(!1, e.endContainer, e.endOffset)), t
                    })(c).cloneRange();
                    t.setEndAfter(N);
                    const n = t.extractContents();
                    (e => {
                        q(Lo(vn(e), Wt), (e => {
                            const t = e.dom;
                            t.nodeValue = Mr(t.data)
                        }))
                    })(n), (e => {
                        let t = e;
                        do {
                            Xo(t) && (t.data = t.data.replace(/^[\r\n]+/, "")), t = t.firstChild
                        } while (t)
                    })(n), O = n.firstChild, i.insertAfter(n, N), ((e, t, n) => {
                        var o;
                        const r = [];
                        if (!n) return;
                        let s = n;
                        for (; s = s.firstChild;) {
                            if (e.isBlock(s)) return;
                            jo(s) && !t[s.nodeName.toLowerCase()] && r.push(s)
                        }
                        let a = r.length;
                        for (; a--;) s = r[a], (!s.hasChildNodes() || s.firstChild === s.lastChild && "" === (null === (o = s.firstChild) || void 0 === o ? void 0 : o.nodeValue) || V_(e, s)) && e.remove(s)
                    })(i, d, O), ((e, t) => {
                        t.normalize();
                        const n = t.lastChild;
                        (!n || jo(n) && /^(left|right)$/gi.test(e.getStyle(n, "float", !0))) && e.add(t, "br")
                    })(i, N), i.isEmpty(N) && q_(N), O.normalize(), i.isEmpty(O) ? (i.remove(O), k()) : (Y_(e, O), I_(e, O))
                }
                i.setAttrib(O, "id", ""), e.dispatch("NewBlock", {
                    newBlock: O
                })
            },
            fakeEventName: "insertParagraph"
        },
        Q_ = (e, t, n) => {
            const o = e.dom.createRng();
            n ? (o.setStartBefore(t), o.setEndBefore(t)) : (o.setStartAfter(t), o.setEndAfter(t)), e.selection.setRng(o), eg(e, o)
        },
        J_ = (e, t) => {
            const n = hn("br");
            fo(vn(t), n), e.undoManager.add()
        },
        Z_ = (e, t) => {
            eN(e.getBody(), t) || go(vn(t), hn("br"));
            const n = hn("br");
            go(vn(t), n), Q_(e, n.dom, !1), e.undoManager.add()
        },
        eN = (e, t) => {
            return n = Mi.after(t), !!nr(n.getNode()) || vu(e, Mi.after(t)).map((e => nr(e.getNode()))).getOr(!1);
            var n
        },
        tN = e => e && "A" === e.nodeName && "href" in e,
        nN = e => e.fold(L, tN, tN, L),
        oN = (e, t) => {
            t.fold(E, O(J_, e), O(Z_, e), E)
        },
        rN = {
            insert: (e, t) => {
                const n = (e => {
                    const t = O(sh, e),
                        n = Mi.fromRangeStart(e.selection.getRng());
                    return qx(t, e.getBody(), n).filter(nN)
                })(e);
                n.isSome() ? n.each(O(oN, e)) : ((e, t) => {
                    const n = e.selection,
                        o = e.dom,
                        r = n.getRng();
                    let s, a = !1;
                    Tf(o, r).each((e => {
                        r.setStart(e.startContainer, e.startOffset), r.setEnd(e.endContainer, e.endOffset)
                    }));
                    let i = r.startOffset,
                        l = r.startContainer;
                    if (jo(l) && l.hasChildNodes()) {
                        const e = i > l.childNodes.length - 1;
                        l = l.childNodes[Math.min(i, l.childNodes.length - 1)] || l, i = e && Xo(l) ? l.data.length : 0
                    }
                    let d = o.getParent(l, o.isBlock);
                    const c = d && d.parentNode ? o.getParent(d.parentNode, o.isBlock) : null,
                        u = c ? c.nodeName.toUpperCase() : "",
                        m = !(!t || !t.ctrlKey);
                    "LI" !== u || m || (d = c), Xo(l) && i >= l.data.length && (((e, t, n) => {
                        const o = new Fo(t, n);
                        let r;
                        const s = e.getNonEmptyElements();
                        for (; r = o.next();)
                            if (s[r.nodeName.toLowerCase()] || Xo(r) && r.length > 0) return !0;
                        return !1
                    })(e.schema, l, d || o.getRoot()) || (s = o.create("br"), r.insertNode(s), r.setStartAfter(s), r.setEndAfter(s), a = !0)), s = o.create("br"), Fi(o, r, s), Q_(e, s, a), e.undoManager.add()
                })(e, t)
            },
            fakeEventName: "insertLineBreak"
        },
        sN = (e, t) => U_(e).filter((e => t.length > 0 && wn(vn(e), t))).isSome(),
        aN = il([{
            br: []
        }, {
            block: []
        }, {
            none: []
        }]),
        iN = (e, t) => (e => sN(e, Bl(e)))(e),
        lN = e => (t, n) => (e => U_(e).filter((e => Sr(vn(e)))).isSome())(t) === e,
        dN = (e, t) => (n, o) => {
            const r = (e => U_(e).fold(N(""), (e => e.nodeName.toUpperCase())))(n) === e.toUpperCase();
            return r === t
        },
        cN = e => {
            const t = F_(e.dom, e.selection.getStart());
            return y(t)
        },
        uN = e => dN("pre", e),
        mN = e => (t, n) => Nl(t) === e,
        fN = (e, t) => (e => sN(e, Tl(e)))(e),
        gN = (e, t) => t,
        pN = e => {
            const t = Rl(e),
                n = F_(e.dom, e.selection.getStart());
            return C(n) && e.schema.isValidChild(n.nodeName, t)
        },
        hN = e => {
            const t = e.selection.getRng(),
                n = t.collapsed && t.startContainer === e.dom.getRoot(),
                o = vn(t.startContainer),
                r = Mn(o, t.startOffset).map((e => Vt(e) && !to(e)));
            return n && r.getOr(!0)
        },
        bN = (e, t) => (n, o) => X(e, ((e, t) => e && t(n, o)), !0) ? I.some(t) : I.none(),
        vN = (e, t, n) => {
            t.selection.isCollapsed() || (e => {
                e.execCommand("delete")
            })(t), C(n) && M_(t, e.fakeEventName).isDefaultPrevented() || (e.insert(t, n), C(n) && L_(t, e.fakeEventName))
        },
        yN = (e, t) => {
            const n = () => vN(rN, e, t),
                o = () => vN(X_, e, t),
                r = ((e, t) => Lx([bN([iN], aN.none()), bN([uN(!0), cN], aN.none()), bN([dN("summary", !0)], aN.br()), bN([uN(!0), mN(!1), gN], aN.br()), bN([uN(!0), mN(!1)], aN.block()), bN([uN(!0), mN(!0), gN], aN.block()), bN([uN(!0), mN(!0)], aN.br()), bN([lN(!0), gN], aN.br()), bN([lN(!0)], aN.block()), bN([fN], aN.br()), bN([gN], aN.br()), bN([pN], aN.block()), bN([hN], aN.block())], [e, !(!t || !t.shiftKey)]).getOr(aN.none()))(e, t);
            switch (Ol(e)) {
                case "linebreak":
                    r.fold(n, n, E);
                    break;
                case "block":
                    r.fold(o, o, E);
                    break;
                case "invert":
                    r.fold(o, n, E);
                    break;
                default:
                    r.fold(n, o, E)
            }
        },
        CN = xt(),
        wN = CN.os.isiOS() && CN.browser.isSafari(),
        xN = (e, t) => {
            var n;
            t.isDefaultPrevented() || (t.preventDefault(), (n = e.undoManager).typing && (n.typing = !1, n.add()), e.undoManager.transact((() => {
                yN(e, t)
            })))
        },
        kN = xt(),
        EN = e => e.stopImmediatePropagation(),
        SN = e => e.keyCode === tf.PAGE_UP || e.keyCode === tf.PAGE_DOWN,
        _N = (e, t, n) => {
            n && !e.get() ? t.on("NodeChange", EN, !0) : !n && e.get() && t.off("NodeChange", EN), e.set(n)
        },
        NN = (e, t) => {
            const n = t.container(),
                o = t.offset();
            return Xo(n) ? (n.insertData(o, e), I.some(Mi(n, o + e.length))) : Xc(t).map((n => {
                const o = bn(e);
                return t.isAtEnd() ? go(n, o) : fo(n, o), Mi(o.dom, e.length)
            }))
        },
        RN = O(NN, fr),
        AN = O(NN, " "),
        ON = e => t => {
            e.selection.setRng(t.toRange()), e.nodeChanged()
        },
        TN = e => {
            const t = Mi.fromRangeStart(e.selection.getRng()),
                n = vn(e.getBody());
            if (e.selection.isCollapsed()) {
                const o = O(sh, e),
                    r = Mi.fromRangeStart(e.selection.getRng());
                return qx(o, e.getBody(), r).bind((e => t => t.fold((t => yu(e.dom, Mi.before(t))), (e => Cu(e)), (e => wu(e)), (t => vu(e.dom, Mi.after(t)))))(n)).map((o => () => ((e, t) => n => Ip(e, n) ? RN(t) : AN(t))(n, t)(o).each(ON(e))))
            }
            return I.none()
        },
        BN = e => {
            return Mt(At.browser.isFirefox() && e.selection.isEditable() && (t = e.dom, n = e.selection.getRng().startContainer, t.isEditable(t.getParent(n, "summary"))), (() => {
                const t = vn(e.getBody());
                e.selection.isCollapsed() || e.getDoc().execCommand("Delete"), ((e, t) => Ip(e, t) ? RN(t) : AN(t))(t, Mi.fromRangeStart(e.selection.getRng())).each(ON(e))
            }));
            var t, n
        },
        DN = e => ic(e) ? [{
            keyCode: tf.TAB,
            action: IE(cS, e, !0)
        }, {
            keyCode: tf.TAB,
            shiftKey: !0,
            action: IE(cS, e, !1)
        }] : [],
        PN = e => {
            if (e.addShortcut("Meta+P", "", "mcePrint"), D_(e), LC(e)) return Da(null);
            {
                const t = Uk(e);
                return (e => {
                    e.on("keyup compositionstart", O(SE, e))
                })(e), ((e, t) => {
                    e.on("keydown", (n => {
                        n.isDefaultPrevented() || ((e, t, n) => {
                            const o = At.os.isMacOS() || At.os.isiOS();
                            FE([{
                                keyCode: tf.RIGHT,
                                action: IE(RE, e, !0)
                            }, {
                                keyCode: tf.LEFT,
                                action: IE(RE, e, !1)
                            }, {
                                keyCode: tf.UP,
                                action: IE(AE, e, !1)
                            }, {
                                keyCode: tf.DOWN,
                                action: IE(AE, e, !0)
                            }, ...o ? [{
                                keyCode: tf.UP,
                                action: IE(TE, e, !1),
                                metaKey: !0,
                                shiftKey: !0
                            }, {
                                keyCode: tf.DOWN,
                                action: IE(TE, e, !0),
                                metaKey: !0,
                                shiftKey: !0
                            }] : [], {
                                keyCode: tf.RIGHT,
                                action: IE(sS, e, !0)
                            }, {
                                keyCode: tf.LEFT,
                                action: IE(sS, e, !1)
                            }, {
                                keyCode: tf.UP,
                                action: IE(aS, e, !1)
                            }, {
                                keyCode: tf.DOWN,
                                action: IE(aS, e, !0)
                            }, {
                                keyCode: tf.RIGHT,
                                action: IE(zE, e, !0)
                            }, {
                                keyCode: tf.LEFT,
                                action: IE(zE, e, !1)
                            }, {
                                keyCode: tf.UP,
                                action: IE(jE, e, !1)
                            }, {
                                keyCode: tf.DOWN,
                                action: IE(jE, e, !0)
                            }, {
                                keyCode: tf.RIGHT,
                                action: IE(Ik, e, t, !0)
                            }, {
                                keyCode: tf.LEFT,
                                action: IE(Ik, e, t, !1)
                            }, {
                                keyCode: tf.RIGHT,
                                ctrlKey: !o,
                                altKey: o,
                                action: IE(zk, e, t)
                            }, {
                                keyCode: tf.LEFT,
                                ctrlKey: !o,
                                altKey: o,
                                action: IE(jk, e, t)
                            }, {
                                keyCode: tf.UP,
                                action: IE(PE, e, !1)
                            }, {
                                keyCode: tf.DOWN,
                                action: IE(PE, e, !0)
                            }], n).each((e => {
                                n.preventDefault()
                            }))
                        })(e, t, n)
                    }))
                })(e, t), ((e, t) => {
                    let n = !1;
                    e.on("keydown", (o => {
                        n = o.keyCode === tf.BACKSPACE, o.isDefaultPrevented() || ((e, t, n) => {
                            const o = n.keyCode === tf.BACKSPACE ? "deleteContentBackward" : "deleteContentForward";
                            UE([{
                                keyCode: tf.BACKSPACE,
                                action: IE(mE, e)
                            }, {
                                keyCode: tf.BACKSPACE,
                                action: IE(kx, e, !1)
                            }, {
                                keyCode: tf.DELETE,
                                action: IE(kx, e, !0)
                            }, {
                                keyCode: tf.BACKSPACE,
                                action: IE(px, e, !1)
                            }, {
                                keyCode: tf.DELETE,
                                action: IE(px, e, !0)
                            }, {
                                keyCode: tf.BACKSPACE,
                                action: IE(qk, e, t, !1)
                            }, {
                                keyCode: tf.DELETE,
                                action: IE(qk, e, t, !0)
                            }, {
                                keyCode: tf.BACKSPACE,
                                action: IE($h, e, !1)
                            }, {
                                keyCode: tf.DELETE,
                                action: IE($h, e, !0)
                            }, {
                                keyCode: tf.BACKSPACE,
                                action: IE(Ex, e, !1)
                            }, {
                                keyCode: tf.DELETE,
                                action: IE(Ex, e, !0)
                            }, {
                                keyCode: tf.BACKSPACE,
                                action: IE(rE, e, !1)
                            }, {
                                keyCode: tf.DELETE,
                                action: IE(rE, e, !0)
                            }, {
                                keyCode: tf.BACKSPACE,
                                action: IE(lx, e, !1)
                            }, {
                                keyCode: tf.DELETE,
                                action: IE(lx, e, !0)
                            }, {
                                keyCode: tf.BACKSPACE,
                                action: IE(sx, e, !1)
                            }, {
                                keyCode: tf.DELETE,
                                action: IE(sx, e, !0)
                            }, {
                                keyCode: tf.BACKSPACE,
                                action: IE(eE, e, !1)
                            }, {
                                keyCode: tf.DELETE,
                                action: IE(eE, e, !0)
                            }], n).filter((t => e.selection.isEditable())).each((t => {
                                n.preventDefault(), M_(e, o).isDefaultPrevented() || (t(), L_(e, o))
                            }))
                        })(e, t, o)
                    })), e.on("keyup", (t => {
                        t.isDefaultPrevented() || ((e, t, n) => {
                            const o = xt(),
                                r = o.os,
                                s = o.browser,
                                a = r.isMacOS() ? [{
                                    keyCode: tf.BACKSPACE,
                                    altKey: !0,
                                    action: IE(nE, e)
                                }, {
                                    keyCode: tf.DELETE,
                                    altKey: !0,
                                    action: IE(nE, e)
                                }] : [{
                                    keyCode: tf.BACKSPACE,
                                    ctrlKey: !0,
                                    action: IE(nE, e)
                                }, {
                                    keyCode: tf.DELETE,
                                    ctrlKey: !0,
                                    action: IE(nE, e)
                                }];
                            r.isMacOS() && n && a.push({
                                keyCode: s.isFirefox() ? 224 : 91,
                                action: IE(nE, e)
                            }), FE([{
                                keyCode: tf.BACKSPACE,
                                action: IE(xx, e)
                            }, {
                                keyCode: tf.DELETE,
                                action: IE(xx, e)
                            }, ...a], t)
                        })(e, t, n), n = !1
                    }))
                })(e, t), (e => {
                    let t = I.none();
                    e.on("keydown", (n => {
                        n.keyCode === tf.ENTER && (wN && (e => {
                            if (!e.collapsed) return !1;
                            const t = e.startContainer;
                            if (Xo(t)) {
                                const n = /^[\uAC00-\uD7AF\u1100-\u11FF\u3130-\u318F\uA960-\uA97F\uD7B0-\uD7FF]$/,
                                    o = t.data.charAt(e.startOffset - 1);
                                return n.test(o)
                            }
                            return !1
                        })(e.selection.getRng()) ? (e => {
                            t = I.some(e.selection.getBookmark()), e.undoManager.add()
                        })(e) : xN(e, n))
                    })), e.on("keyup", (n => {
                        n.keyCode === tf.ENTER && t.each((() => ((e, n) => {
                            e.undoManager.undo(), t.fold(E, (t => e.selection.moveToBookmark(t))), xN(e, n), t = I.none()
                        })(e, n)))
                    }))
                })(e), (e => {
                    e.on("keydown", (t => {
                        t.isDefaultPrevented() || ((e, t) => {
                            UE([{
                                keyCode: tf.SPACEBAR,
                                action: IE(TN, e)
                            }, {
                                keyCode: tf.SPACEBAR,
                                action: IE(BN, e)
                            }], t).each((n => {
                                t.preventDefault(), M_(e, "insertText", {
                                    data: " "
                                }).isDefaultPrevented() || (n(), L_(e, "insertText", {
                                    data: " "
                                }))
                            }))
                        })(e, t)
                    }))
                })(e), (e => {
                    e.on("input", (t => {
                        t.isComposing || (e => {
                            const t = vn(e.getBody());
                            e.selection.isCollapsed() && qp(t, Mi.fromRangeStart(e.selection.getRng())).each((t => {
                                e.selection.setRng(t.toRange())
                            }))
                        })(e)
                    }))
                })(e), (e => {
                    e.on("keydown", (t => {
                        t.isDefaultPrevented() || ((e, t) => {
                            FE([...DN(e)], t).each((e => {
                                t.preventDefault()
                            }))
                        })(e, t)
                    }))
                })(e), ((e, t) => {
                    e.on("keydown", (n => {
                        n.isDefaultPrevented() || ((e, t, n) => {
                            const o = At.os.isMacOS() || At.os.isiOS();
                            FE([{
                                keyCode: tf.END,
                                action: IE(OE, e, !0)
                            }, {
                                keyCode: tf.HOME,
                                action: IE(OE, e, !1)
                            }, ...o ? [] : [{
                                keyCode: tf.HOME,
                                action: IE(TE, e, !1),
                                ctrlKey: !0,
                                shiftKey: !0
                            }, {
                                keyCode: tf.END,
                                action: IE(TE, e, !0),
                                ctrlKey: !0,
                                shiftKey: !0
                            }], {
                                keyCode: tf.END,
                                action: IE(HE, e, !0)
                            }, {
                                keyCode: tf.HOME,
                                action: IE(HE, e, !1)
                            }, {
                                keyCode: tf.END,
                                action: IE(Hk, e, !0, t)
                            }, {
                                keyCode: tf.HOME,
                                action: IE(Hk, e, !1, t)
                            }], n).each((e => {
                                n.preventDefault()
                            }))
                        })(e, t, n)
                    }))
                })(e, t), ((e, t) => {
                    if (kN.os.isMacOS()) return;
                    const n = Da(!1);
                    e.on("keydown", (t => {
                        SN(t) && _N(n, e, !0)
                    })), e.on("keyup", (o => {
                        o.isDefaultPrevented() || ((e, t, n) => {
                            FE([{
                                keyCode: tf.PAGE_UP,
                                action: IE(Hk, e, !1, t)
                            }, {
                                keyCode: tf.PAGE_DOWN,
                                action: IE(Hk, e, !0, t)
                            }], n)
                        })(e, t, o), SN(o) && n.get() && (_N(n, e, !1), e.nodeChanged())
                    }))
                })(e, t), t
            }
        };
    class LN {
        constructor(e) {
            let t;
            this.lastPath = [], this.editor = e;
            const n = this;
            "onselectionchange" in e.getDoc() || e.on("NodeChange click mouseup keyup focus", (n => {
                const o = e.selection.getRng(),
                    r = {
                        startContainer: o.startContainer,
                        startOffset: o.startOffset,
                        endContainer: o.endContainer,
                        endOffset: o.endOffset
                    };
                "nodechange" !== n.type && Ef(r, t) || e.dispatch("SelectionChange"), t = r
            })), e.on("contextmenu", (() => {
                e.dispatch("SelectionChange")
            })), e.on("SelectionChange", (() => {
                const t = e.selection.getStart(!0);
                t && nm(e) && !n.isSameElementPath(t) && e.dom.isChildOf(t, e.getBody()) && e.nodeChanged({
                    selectionChange: !0
                })
            })), e.on("mouseup", (t => {
                !t.isDefaultPrevented() && nm(e) && ("IMG" === e.selection.getNode().nodeName ? fg.setEditorTimeout(e, (() => {
                    e.nodeChanged()
                })) : e.nodeChanged())
            }))
        }
        nodeChanged(e = {}) {
            const t = this.editor.selection;
            let n;
            if (this.editor.initialized && t && !xd(this.editor) && !this.editor.mode.isReadOnly()) {
                const o = this.editor.getBody();
                n = t.getStart(!0) || o, n.ownerDocument === this.editor.getDoc() && this.editor.dom.isChildOf(n, o) || (n = o);
                const r = [];
                this.editor.dom.getParent(n, (e => e === o || (r.push(e), !1))), this.editor.dispatch("NodeChange", {
                    ...e,
                    element: n,
                    parents: r
                })
            }
        }
        isSameElementPath(e) {
            let t;
            const n = this.editor,
                o = oe(n.dom.getParents(e, M, n.getBody()));
            if (o.length === this.lastPath.length) {
                for (t = o.length; t >= 0 && o[t] === this.lastPath[t]; t--);
                if (-1 === t) return this.lastPath = o, !0
            }
            return this.lastPath = o, !1
        }
    }
    const MN = ti("image"),
        IN = ti("event"),
        FN = e => t => {
            t[IN] = e
        },
        UN = FN(0),
        zN = FN(2),
        jN = FN(1),
        HN = (0, e => {
            const t = e;
            return I.from(t[IN]).exists((e => 0 === e))
        });
    const $N = ti("mode"),
        VN = e => t => {
            t[$N] = e
        },
        qN = (e, t) => VN(t)(e),
        WN = VN(0),
        KN = VN(2),
        GN = VN(1),
        YN = e => t => {
            const n = t;
            return I.from(n[$N]).exists((t => t === e))
        },
        XN = YN(0),
        QN = YN(1),
        JN = ["none", "copy", "link", "move"],
        ZN = ["none", "copy", "copyLink", "copyMove", "link", "linkMove", "move", "all", "uninitialized"],
        eR = () => {
            const e = new window.DataTransfer;
            let t = "move",
                n = "all";
            const o = {
                get dropEffect() {
                    return t
                },
                set dropEffect(e) {
                    H(JN, e) && (t = e)
                },
                get effectAllowed() {
                    return n
                },
                set effectAllowed(e) {
                    HN(o) && H(ZN, e) && (n = e)
                },
                get items() {
                    return ((e, t) => ({
                        ...t,
                        get length() {
                            return t.length
                        },
                        add: (n, o) => {
                            if (XN(e)) {
                                if (!m(n)) return t.add(n);
                                if (!v(o)) return t.add(n, o)
                            }
                            return null
                        },
                        remove: n => {
                            XN(e) && t.remove(n)
                        },
                        clear: () => {
                            XN(e) && t.clear()
                        }
                    }))(o, e.items)
                },
                get files() {
                    return QN(o) ? Object.freeze({
                        length: 0,
                        item: e => null
                    }) : e.files
                },
                get types() {
                    return e.types
                },
                setDragImage: (t, n, r) => {
                    var s;
                    XN(o) && (s = {
                        image: t,
                        x: n,
                        y: r
                    }, o[MN] = s, e.setDragImage(t, n, r))
                },
                getData: t => QN(o) ? "" : e.getData(t),
                setData: (t, n) => {
                    XN(o) && e.setData(t, n)
                },
                clearData: t => {
                    XN(o) && e.clearData(t)
                }
            };
            return WN(o), o
        },
        tR = (e, t) => e.setData("text/html", t),
        nR = "x-tinymce/html",
        oR = N(nR),
        rR = "\x3c!-- " + nR + " --\x3e",
        sR = e => rR + e,
        aR = e => -1 !== e.indexOf(rR),
        iR = "%MCEPASTEBIN%",
        lR = e => e.dom.get("mcepastebin"),
        dR = e => C(e) && "mcepastebin" === e.id,
        cR = e => e === iR,
        uR = (e, t) => (Dt.each(t, (t => {
            e = u(t, RegExp) ? e.replace(t, "") : e.replace(t[0], t[1])
        })), e),
        mR = e => uR(e, [/^[\s\S]*<body[^>]*>\s*|\s*<\/body[^>]*>[\s\S]*$/gi, /<!--StartFragment-->|<!--EndFragment-->/g, [/( ?)<span class="Apple-converted-space">\u00a0<\/span>( ?)/g, (e, t, n) => t || n ? fr : " "], /<br class="Apple-interchange-newline">/g, /<br>$/i]),
        fR = (e, t) => ({
            content: e,
            cancelled: t
        }),
        gR = (e, t) => (e.insertContent(t, {
            merge: Wd(e),
            paste: !0
        }), !0),
        pR = e => /^https?:\/\/[\w\-\/+=.,!;:&%@^~(){}?#]+$/i.test(e),
        hR = (e, t, n) => !(e.selection.isCollapsed() || !pR(t)) && ((e, t, n) => (e.undoManager.extra((() => {
            n(e, t)
        }), (() => {
            e.execCommand("mceInsertLink", !1, t)
        })), !0))(e, t, n),
        bR = (e, t, n) => !!((e, t) => pR(t) && $(ac(e), (e => $e(t.toLowerCase(), `.${e.toLowerCase()}`))))(e, t) && ((e, t, n) => (e.undoManager.extra((() => {
            n(e, t)
        }), (() => {
            e.insertContent('<img src="' + t + '">')
        })), !0))(e, t, n),
        vR = (e => {
            let t = 0;
            return () => "mceclip" + t++
        })(),
        yR = e => {
            const t = eR();
            return tR(t, e), KN(t), t
        },
        CR = (e, t, n, o, r) => {
            const s = ((e, t, n) => ((e, t, n) => {
                const o = ((e, t, n) => e.dispatch("PastePreProcess", {
                        content: t,
                        internal: n
                    }))(e, t, n),
                    r = ((e, t) => {
                        const n = nC({
                            sanitize: rc(e)
                        }, e.schema);
                        n.addNodeFilter("meta", (e => {
                            Dt.each(e, (e => {
                                e.remove()
                            }))
                        }));
                        const o = n.parse(t, {
                            forced_root_block: !1,
                            isRootContent: !0
                        });
                        return Yg({
                            validate: !0
                        }, e.schema).serialize(o)
                    })(e, o.content);
                return e.hasEventListeners("PastePostProcess") && !o.isDefaultPrevented() ? ((e, t, n) => {
                    const o = e.dom.create("div", {
                            style: "display:none"
                        }, t),
                        r = ((e, t, n) => e.dispatch("PastePostProcess", {
                            node: t,
                            internal: n
                        }))(e, o, n);
                    return fR(r.node.innerHTML, r.isDefaultPrevented())
                })(e, r, n) : fR(r, o.isDefaultPrevented())
            })(e, t, n))(e, t, n);
            if (!s.cancelled) {
                const t = s.content,
                    n = () => ((e, t, n) => {
                        n || !Kd(e) ? gR(e, t) : ((e, t) => {
                            Dt.each([hR, bR, gR], (n => !n(e, t, gR)))
                        })(e, t)
                    })(e, t, o);
                r ? M_(e, "insertFromPaste", {
                    dataTransfer: yR(t)
                }).isDefaultPrevented() || (n(), L_(e, "insertFromPaste")) : n()
            }
        },
        wR = (e, t, n, o) => {
            const r = n || aR(t);
            CR(e, (e => e.replace(rR, ""))(t), r, !1, o)
        },
        xR = (e, t, n) => {
            const o = e.dom.encode(t).replace(/\r\n/g, "\n"),
                r = ((e, t, n) => {
                    const o = e.split(/\n\n/),
                        r = ((e, t) => {
                            let n = "<" + e;
                            const o = Ce(t, ((e, t) => t + '="' + Qs.encodeAllRaw(e) + '"'));
                            return o.length && (n += " " + o.join(" ")), n + ">"
                        })(t, n),
                        s = "</" + t + ">",
                        a = V(o, (e => e.split(/\n/).join("<br />")));
                    return 1 === a.length ? a[0] : V(a, (e => r + e + s)).join("")
                })(cs(o, Yd(e)), Rl(e), Al(e));
            CR(e, r, !1, !0, n)
        },
        kR = e => {
            const t = {};
            if (e && e.types)
                for (let n = 0; n < e.types.length; n++) {
                    const o = e.types[n];
                    try {
                        t[o] = e.getData(o)
                    } catch (e) {
                        t[o] = ""
                    }
                }
            return t
        },
        ER = (e, t) => t in e && e[t].length > 0,
        SR = e => ER(e, "text/html") || ER(e, "text/plain"),
        _R = (e, t, n) => {
            const o = "paste" === t.type ? t.clipboardData : t.dataTransfer;
            var r;
            if (zd(e) && o) {
                const s = ((e, t) => {
                    const n = t.items ? te(ce(t.items), (e => "file" === e.kind ? [e.getAsFile()] : [])) : [],
                        o = t.files ? ce(t.files) : [];
                    return G(n.length > 0 ? n : o, (e => {
                        const t = ac(e);
                        return e => He(e.type, "image/") && $(t, (t => (e => {
                            const t = e.toLowerCase(),
                                n = {
                                    jpg: "jpeg",
                                    jpe: "jpeg",
                                    jfi: "jpeg",
                                    jif: "jpeg",
                                    jfif: "jpeg",
                                    pjpeg: "jpeg",
                                    pjp: "jpeg",
                                    svg: "svg+xml"
                                };
                            return Dt.hasOwn(n, t) ? "image/" + n[t] : "image/" + t
                        })(t) === e.type))
                    })(e))
                })(e, o);
                if (s.length > 0) return t.preventDefault(), (r = s, Promise.all(V(r, (e => Dv(e).then((t => ({
                    file: e,
                    uri: t
                }))))))).then((t => {
                    n && e.selection.setRng(n), q(t, (t => {
                        ((e, t) => {
                            Tv(t.uri).each((({
                                data: n,
                                type: o,
                                base64Encoded: r
                            }) => {
                                const s = r ? n : btoa(n),
                                    a = t.file,
                                    i = e.editorUpload.blobCache,
                                    l = i.getByData(s, o),
                                    d = null != l ? l : ((e, t, n, o) => {
                                        const r = vR(),
                                            s = Ml(e) && C(n.name),
                                            a = s ? ((e, t) => {
                                                const n = t.match(/([\s\S]+?)(?:\.[a-z0-9.]+)$/i);
                                                return C(n) ? e.dom.encode(n[1]) : void 0
                                            })(e, n.name) : r,
                                            i = s ? n.name : void 0,
                                            l = t.create(r, n, o, a, i);
                                        return t.add(l), l
                                    })(e, i, a, s);
                                wR(e, `<img src="${d.blobUri()}">`, !1, !0)
                            }))
                        })(e, t)
                    }))
                })), !0
            }
            return !1
        },
        NR = (e, t, n, o, r) => {
            let s = mR(n);
            const a = ER(t, oR()) || aR(n),
                i = !a && (e => !/<(?:\/?(?!(?:div|p|br|span)>)\w+|(?:(?!(?:span style="white-space:\s?pre;?">)|br\s?\/>))\w+\s[^>]+)>/i.test(e))(s),
                l = pR(s);
            (cR(s) || !s.length || i && !l) && (o = !0), (o || l) && (s = ER(t, "text/plain") && i ? t["text/plain"] : (e => {
                const t = ca(),
                    n = nC({}, t);
                let o = "";
                const r = t.getVoidElements(),
                    s = Dt.makeMap("script noscript style textarea video audio iframe object", " "),
                    a = t.getBlockElements(),
                    i = e => {
                        const n = e.name,
                            l = e;
                        if ("br" !== n) {
                            if ("wbr" !== n)
                                if (r[n] && (o += " "), s[n]) o += " ";
                                else {
                                    if (3 === e.type && (o += e.value), !(e.name in t.getVoidElements())) {
                                        let t = e.firstChild;
                                        if (t)
                                            do {
                                                i(t)
                                            } while (t = t.next)
                                    }
                                    a[n] && l.next && (o += "\n", "p" === n && (o += "\n"))
                                }
                        } else o += "\n"
                    };
                return e = uR(e, [/<!\[[^\]]+\]>/g]), i(n.parse(e)), o
            })(s)), cR(s) || (o ? xR(e, s, r) : wR(e, s, a, r))
        },
        RR = (e, t, n) => {
            ((e, t, n) => {
                let o;
                e.on("keydown", (e => {
                    (e => tf.metaKeyPressed(e) && 86 === e.keyCode || e.shiftKey && 45 === e.keyCode)(e) && !e.isDefaultPrevented() && (o = e.shiftKey && 86 === e.keyCode)
                })), e.on("paste", (r => {
                    if (r.isDefaultPrevented() || (e => {
                            var t, n;
                            return At.os.isAndroid() && 0 === (null === (n = null === (t = e.clipboardData) || void 0 === t ? void 0 : t.items) || void 0 === n ? void 0 : n.length)
                        })(r)) return;
                    const s = "text" === n.get() || o;
                    o = !1;
                    const a = kR(r.clipboardData);
                    !SR(a) && _R(e, r, t.getLastRng() || e.selection.getRng()) || (ER(a, "text/html") ? (r.preventDefault(), NR(e, a, a["text/html"], s, !0)) : ER(a, "text/plain") && ER(a, "text/uri-list") ? (r.preventDefault(), NR(e, a, a["text/plain"], s, !0)) : (t.create(), fg.setEditorTimeout(e, (() => {
                        const n = t.getHtml();
                        t.remove(), NR(e, a, n, s, !1)
                    }), 0)))
                }))
            })(e, t, n), (e => {
                const t = e => He(e, "webkit-fake-url"),
                    n = e => He(e, "data:");
                e.parser.addNodeFilter("img", ((o, r, s) => {
                    if (!zd(e) && (e => {
                            var t;
                            return !0 === (null === (t = e.data) || void 0 === t ? void 0 : t.paste)
                        })(s))
                        for (const r of o) {
                            const o = r.attr("src");
                            m(o) && !r.attr("data-mce-object") && o !== At.transparentSrc && (t(o) || !Xd(e) && n(o)) && r.remove()
                        }
                }))
            })(e)
        },
        AR = (e, t, n, o) => {
            ((e, t, n) => {
                if (!e) return !1;
                try {
                    return e.clearData(), e.setData("text/html", t), e.setData("text/plain", n), e.setData(oR(), t), !0
                } catch (e) {
                    return !1
                }
            })(e.clipboardData, t.html, t.text) ? (e.preventDefault(), o()) : n(t.html, o)
        },
        OR = e => (t, n) => {
            const {
                dom: o,
                selection: r
            } = e, s = o.create("div", {
                contenteditable: "false",
                "data-mce-bogus": "all"
            }), a = o.create("div", {
                contenteditable: "true"
            }, t);
            o.setStyles(s, {
                position: "fixed",
                top: "0",
                left: "-3000px",
                width: "1000px",
                overflow: "hidden"
            }), s.appendChild(a), o.add(e.getBody(), s);
            const i = r.getRng();
            a.focus();
            const l = o.createRng();
            l.selectNodeContents(a), r.setRng(l), fg.setEditorTimeout(e, (() => {
                r.setRng(i), o.remove(s), n()
            }), 0)
        },
        TR = e => ({
            html: sR(e.selection.getContent({
                contextual: !0
            })),
            text: e.selection.getContent({
                format: "text"
            })
        }),
        BR = e => !e.selection.isCollapsed() || (e => !!e.dom.getParent(e.selection.getStart(), "td[data-mce-selected],th[data-mce-selected]", e.getBody()))(e),
        DR = (e, t) => {
            var n, o;
            return Pf.getCaretRangeFromPoint(null !== (n = t.clientX) && void 0 !== n ? n : 0, null !== (o = t.clientY) && void 0 !== o ? o : 0, e.getDoc())
        },
        PR = (e, t) => {
            e.focus(), t && e.selection.setRng(t)
        },
        LR = /rgb\s*\(\s*([0-9]+)\s*,\s*([0-9]+)\s*,\s*([0-9]+)\s*\)/gi,
        MR = e => Dt.trim(e).replace(LR, Ku).toLowerCase(),
        IR = (e, t, n) => {
            const o = Vd(e);
            if (n || "all" === o || !qd(e)) return t;
            const r = o ? o.split(/[, ]/) : [];
            if (r && "none" !== o) {
                const n = e.dom,
                    o = e.selection.getNode();
                t = t.replace(/(<[^>]+) style="([^"]*)"([^>]*>)/gi, ((e, t, s, a) => {
                    const i = n.parseStyle(n.decode(s)),
                        l = {};
                    for (let e = 0; e < r.length; e++) {
                        const t = i[r[e]];
                        let s = t,
                            a = n.getStyle(o, r[e], !0);
                        /color/.test(r[e]) && (s = MR(s), a = MR(a)), a !== s && (l[r[e]] = t)
                    }
                    const d = n.serializeStyle(l, "span");
                    return d ? t + ' style="' + d + '"' + a : t + a
                }))
            } else t = t.replace(/(<[^>]+) style="([^"]*)"([^>]*>)/gi, "$1$3");
            return t = t.replace(/(<[^>]+) data-mce-style="([^"]+)"([^>]*>)/gi, ((e, t, n, o) => t + ' style="' + n + '"' + o)), t
        },
        FR = e => {
            const t = Da(!1),
                n = Da(Gd(e) ? "text" : "html"),
                o = (e => {
                    const t = Da(null);
                    return {
                        create: () => ((e, t) => {
                            const {
                                dom: n,
                                selection: o
                            } = e, r = e.getBody();
                            t.set(o.getRng());
                            const s = n.add(e.getBody(), "div", {
                                id: "mcepastebin",
                                class: "mce-pastebin",
                                contentEditable: !0,
                                "data-mce-bogus": "all",
                                style: "position: fixed; top: 50%; width: 10px; height: 10px; overflow: hidden; opacity: 0"
                            }, iR);
                            At.browser.isFirefox() && n.setStyle(s, "left", "rtl" === n.getStyle(r, "direction", !0) ? 65535 : -65535), n.bind(s, "beforedeactivate focusin focusout", (e => {
                                e.stopPropagation()
                            })), s.focus(), o.select(s, !0)
                        })(e, t),
                        remove: () => ((e, t) => {
                            const n = e.dom;
                            if (lR(e)) {
                                let o;
                                const r = t.get();
                                for (; o = lR(e);) n.remove(o), n.unbind(o);
                                r && e.selection.setRng(r)
                            }
                            t.set(null)
                        })(e, t),
                        getEl: () => lR(e),
                        getHtml: () => (e => {
                            const t = e.dom,
                                n = (e, n) => {
                                    e.appendChild(n), t.remove(n, !0)
                                },
                                [o, ...r] = G(e.getBody().childNodes, dR);
                            q(r, (e => {
                                n(o, e)
                            }));
                            const s = t.select("div[id=mcepastebin]", o);
                            for (let e = s.length - 1; e >= 0; e--) {
                                const r = t.create("div");
                                o.insertBefore(r, s[e]), n(r, s[e])
                            }
                            return o ? o.innerHTML : ""
                        })(e),
                        getLastRng: t.get
                    }
                })(e);
            (e => {
                (At.browser.isChromium() || At.browser.isSafari()) && ((e, t) => {
                    e.on("PastePreProcess", (n => {
                        n.content = t(e, n.content, n.internal)
                    }))
                })(e, IR)
            })(e), ((e, t) => {
                e.addCommand("mceTogglePlainTextPaste", (() => {
                    ((e, t) => {
                        "text" === t.get() ? (t.set("html"), ef(e, !1)) : (t.set("text"), ef(e, !0)), e.focus()
                    })(e, t)
                })), e.addCommand("mceInsertClipboardContent", ((t, n) => {
                    n.html && wR(e, n.html, n.internal, !1), n.text && xR(e, n.text, !1)
                }))
            })(e, n), (e => {
                const t = t => n => {
                        t(e, n)
                    },
                    n = jd(e);
                w(n) && e.on("PastePreProcess", t(n));
                const o = Hd(e);
                w(o) && e.on("PastePostProcess", t(o))
            })(e), e.on("PreInit", (() => {
                (e => {
                    e.on("cut", (e => t => {
                        !t.isDefaultPrevented() && BR(e) && AR(t, TR(e), OR(e), (() => {
                            if (At.browser.isChromium() || At.browser.isFirefox()) {
                                const t = e.selection.getRng();
                                fg.setEditorTimeout(e, (() => {
                                    e.selection.setRng(t), e.execCommand("Delete")
                                }), 0)
                            } else e.execCommand("Delete")
                        }))
                    })(e)), e.on("copy", (e => t => {
                        !t.isDefaultPrevented() && BR(e) && AR(t, TR(e), OR(e), E)
                    })(e))
                })(e), ((e, t) => {
                    Ud(e) && e.on("dragend dragover draggesture dragdrop drop drag", (e => {
                        e.preventDefault(), e.stopPropagation()
                    })), zd(e) || e.on("drop", (e => {
                        const t = e.dataTransfer;
                        t && (e => $(e.files, (e => /^image\//.test(e.type))))(t) && e.preventDefault()
                    })), e.on("drop", (n => {
                        if (n.isDefaultPrevented()) return;
                        const o = DR(e, n);
                        if (y(o)) return;
                        const r = kR(n.dataTransfer),
                            s = ER(r, oR());
                        if ((!SR(r) || (e => {
                                const t = e["text/plain"];
                                return !!t && 0 === t.indexOf("file://")
                            })(r)) && _R(e, n, o)) return;
                        const a = r[oR()],
                            i = a || r["text/html"] || r["text/plain"],
                            l = ((e, t, n, o) => {
                                const r = e.getParent(n, (e => Ns(t, e)));
                                if (r && ke(o, "text/html")) {
                                    const e = (new DOMParser).parseFromString(o["text/html"], "text/html").body;
                                    return !h(e.querySelector(r.nodeName.toLowerCase()))
                                }
                                return !1
                            })(e.dom, e.schema, o.startContainer, r);
                        t.get() && !l || i && (n.preventDefault(), fg.setEditorTimeout(e, (() => {
                            e.undoManager.transact((() => {
                                a && e.execCommand("Delete"), PR(e, o);
                                const t = mR(i);
                                r["text/html"] ? wR(e, t, s, !0) : xR(e, t, !0)
                            }))
                        })))
                    })), e.on("dragstart", (e => {
                        t.set(!0)
                    })), e.on("dragover dragend", (n => {
                        zd(e) && !t.get() && (n.preventDefault(), PR(e, DR(e, n))), "dragend" === n.type && t.set(!1)
                    }))
                })(e, t), RR(e, o, n)
            }))
        },
        UR = e => Br(vn(e)),
        zR = (e, t) => {
            const n = t.getNode();
            v(n) || e.selection.setCursorLocation(n, t.offset())
        },
        jR = (e, t) => {
            var n;
            return 0 === e.startOffset && e.endOffset === (null === (n = t.textContent) || void 0 === n ? void 0 : n.length)
        },
        HR = xt(),
        $R = HR.browser,
        VR = HR.os,
        qR = $R.isSafari(),
        WR = VR.isMacOS() || VR.isiOS(),
        KR = (e, t) => C(e.getParent(t.container(), "details")),
        GR = (e, t) => {
            const n = e.dom.getParent(t.container(), "details");
            if (n && !n.open) {
                const t = e.dom.select("summary", n)[0];
                t && wu(t).each((t => zR(e, t)))
            } else zR(e, t)
        },
        YR = (e, t, n) => {
            const o = e.selection,
                r = o.getNode(),
                s = o.getRng(),
                a = n.keyCode === tf.BACKSPACE,
                i = n.keyCode === tf.DELETE,
                l = e.selection.isCollapsed(),
                d = Mi.fromRangeStart(s),
                c = e.getBody();
            return !((l || !((e, t) => {
                const n = t.startSummary.exists((t => t.contains(e.startContainer))),
                    o = t.startSummary.exists((t => t.contains(e.endContainer))),
                    r = t.startDetails.forall((e => t.endDetails.forall((t => e !== t))));
                return (n || o) && !(n && o) || r
            })(s, t)) && !(l && a && ((e, t) => t.startSummary.exists((t => ((e, t) => Cu(t).exists((t => t.isEqual(e))))(e, t))))(d, t)) && !(l && i && ((e, t) => t.startSummary.exists((t => ((e, t) => wu(t).exists((n => nr(n.getNode()) && yu(t, n).exists((t => t.isEqual(e))) || n.isEqual(e))))(e, t))))(d, t)) && !(l && a && ((e, t) => t.startDetails.exists((n => yu(n, e).forall((n => t.startSummary.exists((t => !t.contains(e.container()) && t.contains(n.container()))))))))(d, t)) && !(l && i && ((e, t, n) => n.startDetails.exists((n => vu(e, t).forall((e => !n.contains(e.container()))))))(c, d, t)) && (!qR || !ur(r) || (!l && jR(s, r) || hh(i, d, r) ? UR(r) : e.undoManager.transact((() => {
                const t = o.getSel();
                let {
                    anchorNode: s,
                    anchorOffset: i,
                    focusNode: d,
                    focusOffset: c
                } = null != t ? t : {};
                const u = () => {
                        C(s) && C(i) && C(d) && C(c) && (null == t || t.setBaseAndExtent(s, i, d, c))
                    },
                    m = (e, t) => {
                        q(e.childNodes, (e => {
                            sm(e) && t.appendChild(e)
                        }))
                    },
                    f = e.dom.create("span", {
                        "data-mce-bogus": "all"
                    });
                m(r, f), r.appendChild(f), u(), l && (WR && (n.altKey || a && n.metaKey) || !WR && n.ctrlKey) && (null == t || t.modify("extend", a ? "left" : "right", n.metaKey ? "line" : "word")), !o.isCollapsed() && jR(o.getRng(), f) ? UR(r) : (e.execCommand(a ? "Delete" : "ForwardDelete"), s = null == t ? void 0 : t.anchorNode, i = null == t ? void 0 : t.anchorOffset, d = null == t ? void 0 : t.focusNode, c = null == t ? void 0 : t.focusOffset, m(f, r), u()), e.dom.remove(f)
            })), 0)))
        },
        XR = e => {
            (e => {
                e.on("click", (t => {
                    e.dom.getParent(t.target, "details") && t.preventDefault()
                }))
            })(e), (e => {
                e.parser.addNodeFilter("details", (t => {
                    const n = lc(e);
                    q(t, (e => {
                        "expanded" === n ? e.attr("open", "open") : "collapsed" === n && e.attr("open", null)
                    }))
                })), e.serializer.addNodeFilter("details", (t => {
                    const n = dc(e);
                    q(t, (e => {
                        "expanded" === n ? e.attr("open", "open") : "collapsed" === n && e.attr("open", null)
                    }))
                }))
            })(e), (e => {
                e.on("keydown", (t => {
                    t.keyCode !== tf.BACKSPACE && t.keyCode !== tf.DELETE || ((e, t) => {
                        const n = I.from(e.getParent(t.startContainer, "details")),
                            o = I.from(e.getParent(t.endContainer, "details"));
                        if (n.isSome() || o.isSome()) {
                            const t = n.bind((t => I.from(e.select("summary", t)[0])));
                            return I.some({
                                startSummary: t,
                                startDetails: n,
                                endDetails: o
                            })
                        }
                        return I.none()
                    })(e.dom, e.selection.getRng()).fold((() => {
                        ((e, t) => {
                            const {
                                dom: n,
                                selection: o
                            } = e, r = e.getBody();
                            if (e.selection.isCollapsed()) {
                                const s = Mi.fromRangeStart(o.getRng()),
                                    a = n.getParent(s.container(), n.isBlock);
                                if (a && n.isEmpty(a))
                                    if (h(a.nextSibling)) {
                                        const o = yu(r, s).filter((e => KR(n, e)));
                                        if (o.isSome()) return o.each((n => {
                                            t || GR(e, n)
                                        })), !0
                                    } else if (h(a.previousSibling) && vu(r, s).filter((e => KR(n, e)))) return !0;
                                return pu(t, r, s).fold(L, (o => !!KR(n, o) && (a && n.isEmpty(a) && e.dom.remove(a), t || GR(e, o), !0)))
                            }
                            return !1
                        })(e, t.keyCode === tf.DELETE) && t.preventDefault()
                    }), (n => {
                        YR(e, n, t) && t.preventDefault()
                    }))
                }))
            })(e)
        },
        QR = nr,
        JR = Xo,
        ZR = e => sr(e.dom),
        eA = e => t => kn(vn(e), t),
        tA = (e, t) => Qn(vn(e), ZR, eA(t)),
        nA = (e, t, n) => {
            const o = new Fo(e, t),
                r = n ? o.next.bind(o) : o.prev.bind(o);
            let s = e;
            for (let t = n ? e : r(); t && !QR(t); t = r()) os(t) && (s = t);
            return s
        },
        oA = e => {
            const t = ((e, t) => {
                const n = Mi.fromRangeStart(e).getNode(),
                    o = ((e, t) => Qn(vn(e), (e => (e => rr(e.dom))(e) || Cr(e)), eA(t)).getOr(vn(t)).dom)(n, t),
                    r = nA(n, o, !1),
                    s = nA(n, o, !0),
                    a = document.createRange();
                return tA(r, o).fold((() => {
                    JR(r) ? a.setStart(r, 0) : a.setStartBefore(r)
                }), (e => a.setStartBefore(e.dom))), tA(s, o).fold((() => {
                    JR(s) ? a.setEnd(s, s.data.length) : a.setEndAfter(s)
                }), (e => a.setEndAfter(e.dom))), a
            })(e.selection.getRng(), e.getBody());
            e.selection.setRng(rb(t))
        };
    var rA;
    ! function(e) {
        e.Before = "before", e.After = "after"
    }(rA || (rA = {}));
    const sA = (e, t) => Math.abs(e.left - t),
        aA = (e, t) => Math.abs(e.right - t),
        iA = (e, t) => (e => X(e, ((e, t) => e.fold((() => I.some(t)), (e => {
            const n = Math.min(t.left, e.left),
                o = Math.min(t.top, e.top),
                r = Math.max(t.right, e.right),
                s = Math.max(t.bottom, e.bottom);
            return I.some({
                top: o,
                right: r,
                bottom: s,
                left: n,
                width: r - n,
                height: s - o
            })
        }))), I.none()))(G(e, (e => {
            return (n = t) >= (o = e).top && n <= o.bottom;
            var n, o
        }))).fold((() => [
            [], e
        ]), (t => {
            const {
                pass: n,
                fail: o
            } = K(e, (e => ((e, t) => {
                const n = ((e, t) => Math.max(0, Math.min(e.bottom, t.bottom) - Math.max(e.top, t.top)))(e, t) / Math.min(e.height, t.height);
                return ((e, t) => e.top < t.bottom && e.bottom > t.top)(e, t) && n > .5
            })(e, t)));
            return [n, o]
        })),
        lA = (e, t, n) => t > e.left && t < e.right ? 0 : Math.min(Math.abs(e.left - t), Math.abs(e.right - t)),
        dA = (e, t, n) => {
            const o = e => os(e.node) ? I.some(e) : jo(e.node) ? dA(ce(e.node.childNodes), t, n) : I.none(),
                r = (e, r) => {
                    const s = ae(e, ((e, o) => r(e, t, n) - r(o, t, n)));
                    return ((e, r) => {
                        if (e.length >= 2) {
                            const s = o(e[0]).getOr(e[0]),
                                a = o(e[1]).getOr(e[1]);
                            if (Math.abs(r(s, t, n) - r(a, t, n)) < 2) {
                                if (Xo(s.node)) return I.some(s);
                                if (Xo(a.node)) return I.some(a)
                            }
                        }
                        return I.none()
                    })(s, r).orThunk((() => ue(s, o)))
                },
                [s, a] = iA(yk(e), n),
                {
                    pass: i,
                    fail: l
                } = K(a, (e => e.top < n));
            return r(s, lA).orThunk((() => r(l, gi))).orThunk((() => r(i, gi)))
        },
        cA = (e, t, n) => ((e, t, n) => {
            const o = vn(e),
                r = _n(o),
                s = yn(r, t, n).filter((e => En(o, e))).getOr(o);
            return ((e, t, n, o) => {
                const r = (t, s) => {
                    const a = G(t.dom.childNodes, T((e => jo(e) && e.classList.contains("mce-drag-container"))));
                    return s.fold((() => dA(a, n, o)), (e => {
                        const t = G(a, (t => t !== e.dom));
                        return dA(t, n, o)
                    })).orThunk((() => (kn(t, e) ? I.none() : An(t)).bind((e => r(e, I.some(t))))))
                };
                return r(t, I.none())
            })(o, s, t, n)
        })(e, t, n).filter((e => Sc(e.node))).map((e => ((e, t) => ({
            node: e.node,
            position: sA(e, t) < aA(e, t) ? rA.Before : rA.After
        }))(e, t))),
        uA = e => {
            var t, n;
            const o = e.getBoundingClientRect(),
                r = e.ownerDocument,
                s = r.documentElement,
                a = r.defaultView;
            return {
                top: o.top + (null !== (t = null == a ? void 0 : a.scrollY) && void 0 !== t ? t : 0) - s.clientTop,
                left: o.left + (null !== (n = null == a ? void 0 : a.scrollX) && void 0 !== n ? n : 0) - s.clientLeft
            }
        },
        mA = e => ({
            target: e,
            srcElement: e
        }),
        fA = (e, t, n, o) => {
            const r = ((e, t) => {
                const n = (e => {
                    const t = eR(),
                        n = (e => {
                            const t = e;
                            return I.from(t[$N])
                        })(e);
                    return KN(e), UN(t), t.dropEffect = e.dropEffect, t.effectAllowed = e.effectAllowed, (e => {
                        const t = e;
                        return I.from(t[MN])
                    })(e).each((e => t.setDragImage(e.image, e.x, e.y))), q(e.types, (n => {
                        "Files" !== n && t.setData(n, e.getData(n))
                    })), q(e.files, (e => t.items.add(e))), (e => {
                        const t = e;
                        return I.from(t[IN])
                    })(e).each((e => {
                        ((e, t) => {
                            FN(t)(e)
                        })(t, e)
                    })), n.each((n => {
                        qN(e, n), qN(t, n)
                    })), t
                })(e);
                return "dragstart" === t ? (UN(n), WN(n)) : "drop" === t ? (zN(n), KN(n)) : (jN(n), GN(n)), n
            })(n, e);
            return v(o) ? ((e, t, n) => {
                const o = B("Function not supported on simulated event.");
                return {
                    bubbles: !0,
                    cancelBubble: !1,
                    cancelable: !0,
                    composed: !1,
                    currentTarget: null,
                    defaultPrevented: !1,
                    eventPhase: 0,
                    isTrusted: !0,
                    returnValue: !1,
                    timeStamp: 0,
                    type: e,
                    composedPath: o,
                    initEvent: o,
                    preventDefault: E,
                    stopImmediatePropagation: E,
                    stopPropagation: E,
                    AT_TARGET: window.Event.AT_TARGET,
                    BUBBLING_PHASE: window.Event.BUBBLING_PHASE,
                    CAPTURING_PHASE: window.Event.CAPTURING_PHASE,
                    NONE: window.Event.NONE,
                    altKey: !1,
                    button: 0,
                    buttons: 0,
                    clientX: 0,
                    clientY: 0,
                    ctrlKey: !1,
                    metaKey: !1,
                    movementX: 0,
                    movementY: 0,
                    offsetX: 0,
                    offsetY: 0,
                    pageX: 0,
                    pageY: 0,
                    relatedTarget: null,
                    screenX: 0,
                    screenY: 0,
                    shiftKey: !1,
                    x: 0,
                    y: 0,
                    detail: 0,
                    view: null,
                    which: 0,
                    initUIEvent: o,
                    initMouseEvent: o,
                    getModifierState: o,
                    dataTransfer: n,
                    ...mA(t)
                }
            })(e, t, r) : ((e, t, n, o) => ({
                ...t,
                dataTransfer: o,
                type: e,
                ...mA(n)
            }))(e, o, t, r)
        },
        gA = sr,
        pA = ((...e) => t => {
            for (let n = 0; n < e.length; n++)
                if (e[n](t)) return !0;
            return !1
        })(gA, rr),
        hA = (e, t, n, o) => {
            const r = e.dom,
                s = t.cloneNode(!0);
            r.setStyles(s, {
                width: n,
                height: o
            }), r.setAttrib(s, "data-mce-selected", null);
            const a = r.create("div", {
                class: "mce-drag-container",
                "data-mce-bogus": "all",
                unselectable: "on",
                contenteditable: "false"
            });
            return r.setStyles(a, {
                position: "absolute",
                opacity: .5,
                overflow: "hidden",
                border: 0,
                padding: 0,
                margin: 0,
                width: n,
                height: o
            }), r.setStyles(s, {
                margin: 0,
                boxSizing: "border-box"
            }), a.appendChild(s), a
        },
        bA = (e, t) => n => () => {
            const o = "left" === e ? n.scrollX : n.scrollY;
            n.scroll({
                [e]: o + t,
                behavior: "smooth"
            })
        },
        vA = bA("left", -32),
        yA = bA("left", 32),
        CA = bA("top", -32),
        wA = bA("top", 32),
        xA = e => {
            e && e.parentNode && e.parentNode.removeChild(e)
        },
        kA = (e, t, n, o, r) => {
            "dragstart" === t && tR(o, e.dom.getOuterHTML(n));
            const s = fA(t, n, o, r);
            return e.dispatch(t, s)
        },
        EA = (e, t) => {
            const n = ja(((e, n) => ((e, t, n) => {
                e._selectionOverrides.hideFakeCaret(), cA(e.getBody(), t, n).fold((() => e.selection.placeCaretAt(t, n)), (o => {
                    const r = e._selectionOverrides.showCaret(1, o.node, o.position === rA.Before, !1);
                    r ? e.selection.setRng(r) : e.selection.placeCaretAt(t, n)
                }))
            })(t, e, n)), 0);
            t.on("remove", n.cancel);
            const o = e;
            return r => e.on((e => {
                const s = Math.max(Math.abs(r.screenX - e.screenX), Math.abs(r.screenY - e.screenY));
                if (!e.dragging && s > 10) {
                    const n = kA(t, "dragstart", e.element, e.dataTransfer, r);
                    if (C(n.dataTransfer) && (e.dataTransfer = n.dataTransfer), n.isDefaultPrevented()) return;
                    e.dragging = !0, t.focus()
                }
                if (e.dragging) {
                    const s = r.currentTarget === t.getDoc().documentElement,
                        l = ((e, t) => ({
                            pageX: t.pageX - e.relX,
                            pageY: t.pageY + 5
                        }))(e, ((e, t) => {
                            return n = (e => e.inline ? uA(e.getBody()) : {
                                left: 0,
                                top: 0
                            })(e), o = (e => {
                                const t = e.getBody();
                                return e.inline ? {
                                    left: t.scrollLeft,
                                    top: t.scrollTop
                                } : {
                                    left: 0,
                                    top: 0
                                }
                            })(e), r = ((e, t) => {
                                if (t.target.ownerDocument !== e.getDoc()) {
                                    const n = uA(e.getContentAreaContainer()),
                                        o = (e => {
                                            const t = e.getBody(),
                                                n = e.getDoc().documentElement,
                                                o = {
                                                    left: t.scrollLeft,
                                                    top: t.scrollTop
                                                },
                                                r = {
                                                    left: t.scrollLeft || n.scrollLeft,
                                                    top: t.scrollTop || n.scrollTop
                                                };
                                            return e.inline ? o : r
                                        })(e);
                                    return {
                                        left: t.pageX - n.left + o.left,
                                        top: t.pageY - n.top + o.top
                                    }
                                }
                                return {
                                    left: t.pageX,
                                    top: t.pageY
                                }
                            })(e, t), {
                                pageX: r.left - n.left + o.left,
                                pageY: r.top - n.top + o.top
                            };
                            var n, o, r
                        })(t, r));
                    a = e.ghost, i = t.getBody(), a.parentNode !== i && i.appendChild(a), ((e, t, n, o, r, s, a, i, l, d, c, u) => {
                        let m = 0,
                            f = 0;
                        e.style.left = t.pageX + "px", e.style.top = t.pageY + "px", t.pageX + n > r && (m = t.pageX + n - r), t.pageY + o > s && (f = t.pageY + o - s), e.style.width = n - m + "px", e.style.height = o - f + "px";
                        const g = l.clientHeight,
                            p = l.clientWidth,
                            h = a + l.getBoundingClientRect().top,
                            b = i + l.getBoundingClientRect().left;
                        c.on((e => {
                            e.intervalId.clear(), e.dragging && u && (a + 8 >= g ? e.intervalId.set(wA(d)) : a - 8 <= 0 ? e.intervalId.set(CA(d)) : i + 8 >= p ? e.intervalId.set(yA(d)) : i - 8 <= 0 ? e.intervalId.set(vA(d)) : h + 16 >= window.innerHeight ? e.intervalId.set(wA(window)) : h - 16 <= 0 ? e.intervalId.set(CA(window)) : b + 16 >= window.innerWidth ? e.intervalId.set(yA(window)) : b - 16 <= 0 && e.intervalId.set(vA(window)))
                        }))
                    })(e.ghost, l, e.width, e.height, e.maxX, e.maxY, r.clientY, r.clientX, t.getContentAreaContainer(), t.getWin(), o, s), n.throttle(r.clientX, r.clientY)
                }
                var a, i
            }))
        },
        SA = (e, t, n) => {
            e.on((e => {
                e.intervalId.clear(), e.dragging && n.fold((() => kA(t, "dragend", e.element, e.dataTransfer)), (n => kA(t, "dragend", e.element, e.dataTransfer, n)))
            })), _A(e)
        },
        _A = e => {
            e.on((e => {
                e.intervalId.clear(), xA(e.ghost)
            })), e.clear()
        },
        NA = e => {
            const t = za(),
                n = Oa.DOM,
                o = document,
                r = ((e, t) => n => {
                    if ((e => 0 === e.button)(n)) {
                        const o = J(t.dom.getParents(n.target), pA).getOr(null);
                        if (C(o) && ((e, t, n) => gA(n) && n !== t && e.isEditable(n.parentElement))(t.dom, t.getBody(), o)) {
                            const r = t.dom.getPos(o),
                                s = t.getBody(),
                                a = t.getDoc().documentElement;
                            e.set({
                                element: o,
                                dataTransfer: eR(),
                                dragging: !1,
                                screenX: n.screenX,
                                screenY: n.screenY,
                                maxX: (t.inline ? s.scrollWidth : a.offsetWidth) - 2,
                                maxY: (t.inline ? s.scrollHeight : a.offsetHeight) - 2,
                                relX: n.pageX - r.x,
                                relY: n.pageY - r.y,
                                width: o.offsetWidth,
                                height: o.offsetHeight,
                                ghost: hA(t, o, o.offsetWidth, o.offsetHeight),
                                intervalId: Ua(100)
                            })
                        }
                    }
                })(t, e),
                s = EA(t, e),
                a = ((e, t) => n => {
                    e.on((e => {
                        var o;
                        if (e.intervalId.clear(), e.dragging) {
                            if (((e, t, n) => !y(t) && t !== n && !e.dom.isChildOf(t, n) && e.dom.isEditable(t))(t, (e => {
                                    const t = e.getSel();
                                    if (C(t)) {
                                        const e = t.getRangeAt(0).startContainer;
                                        return Xo(e) ? e.parentNode : e
                                    }
                                    return null
                                })(t.selection), e.element)) {
                                const r = null !== (o = t.getDoc().elementFromPoint(n.clientX, n.clientY)) && void 0 !== o ? o : t.getBody();
                                kA(t, "drop", r, e.dataTransfer, n).isDefaultPrevented() || t.undoManager.transact((() => {
                                    ((e, t) => {
                                        const n = e.getParent(t.parentNode, e.isBlock);
                                        xA(t), n && n !== e.getRoot() && e.isEmpty(n) && Br(vn(n))
                                    })(t.dom, e.element), (e => {
                                        const t = e.getData("text/html");
                                        return "" === t ? I.none() : I.some(t)
                                    })(e.dataTransfer).each((e => t.insertContent(e))), t._selectionOverrides.hideFakeCaret()
                                }))
                            }
                            kA(t, "dragend", t.getBody(), e.dataTransfer, n)
                        }
                    })), _A(e)
                })(t, e),
                i = ((e, t) => n => SA(e, t, I.some(n)))(t, e);
            e.on("mousedown", r), e.on("mousemove", s), e.on("mouseup", a), n.bind(o, "mousemove", s), n.bind(o, "mouseup", i), e.on("remove", (() => {
                n.unbind(o, "mousemove", s), n.unbind(o, "mouseup", i)
            })), e.on("keydown", (n => {
                n.keyCode === tf.ESC && SA(t, e, I.none())
            }))
        },
        RA = sr,
        AA = (e, t) => Vh(e.getBody(), t),
        OA = e => {
            const t = e.selection,
                n = e.dom,
                o = e.getBody(),
                r = xc(e, o, n.isBlock, (() => kg(e))),
                s = "sel-" + n.uniqueId(),
                a = "data-mce-selected";
            let i;
            const l = e => e !== o && (RA(e) || lr(e)) && n.isChildOf(e, o) && n.isEditable(e.parentNode),
                d = (n, o, s, a = !0) => e.dispatch("ShowCaret", {
                    target: o,
                    direction: n,
                    before: s
                }).isDefaultPrevented() ? null : (a && t.scrollIntoView(o, -1 === n), r.show(s, o)),
                c = e => jr(e) || qr(e) || Wr(e),
                u = e => c(e.startContainer) || c(e.endContainer),
                m = t => {
                    const o = e.schema.getVoidElements(),
                        r = n.createRng(),
                        s = t.startContainer,
                        a = t.startOffset,
                        i = t.endContainer,
                        l = t.endOffset;
                    return ke(o, s.nodeName.toLowerCase()) ? 0 === a ? r.setStartBefore(s) : r.setStartAfter(s) : r.setStart(s, a), ke(o, i.nodeName.toLowerCase()) ? 0 === l ? r.setEndBefore(i) : r.setEndAfter(i) : r.setEnd(i, l), r
                },
                f = (r, c) => {
                    if (!r) return null;
                    if (r.collapsed) {
                        if (!u(r)) {
                            const e = c ? 1 : -1,
                                t = Yc(e, o, r),
                                s = t.getNode(!c);
                            if (C(s)) {
                                if (Sc(s)) return d(e, s, !!c && !t.isAtEnd(), !1);
                                if (zr(s) && sr(s.nextSibling)) {
                                    const e = n.createRng();
                                    return e.setStart(s, 0), e.setEnd(s, 0), e
                                }
                            }
                            const a = t.getNode(c);
                            if (C(a)) {
                                if (Sc(a)) return d(e, a, !c && !t.isAtEnd(), !1);
                                if (zr(a) && sr(a.previousSibling)) {
                                    const e = n.createRng();
                                    return e.setStart(a, 1), e.setEnd(a, 1), e
                                }
                            }
                        }
                        return null
                    }
                    let m = r.startContainer,
                        f = r.startOffset;
                    const g = r.endOffset;
                    if (Xo(m) && 0 === f && RA(m.parentNode) && (m = m.parentNode, f = n.nodeIndex(m), m = m.parentNode), !jo(m)) return null;
                    if (g === f + 1 && m === r.endContainer) {
                        const o = m.childNodes[f];
                        if (l(o)) return (o => {
                            const r = o.cloneNode(!0),
                                l = e.dispatch("ObjectSelected", {
                                    target: o,
                                    targetClone: r
                                });
                            if (l.isDefaultPrevented()) return null;
                            const d = ((o, r) => {
                                    const a = vn(e.getBody()),
                                        i = e.getDoc(),
                                        l = Zn(a, "#" + s).getOrThunk((() => {
                                            const e = pn('<div data-mce-bogus="all" class="mce-offscreen-selection"></div>', i);
                                            return Qt(e, "id", s), ho(a, e), e
                                        })),
                                        d = n.createRng();
                                    yo(l), vo(l, [bn(fr, i), vn(r), bn(fr, i)]), d.setStart(l.dom.firstChild, 1), d.setEnd(l.dom.lastChild, 0), ao(l, {
                                        top: n.getPos(o, e.getBody()).y + "px"
                                    }), tg(l);
                                    const c = t.getSel();
                                    return c && (c.removeAllRanges(), c.addRange(d)), d
                                })(o, l.targetClone),
                                c = vn(o);
                            return q(Mo(vn(e.getBody()), `*[${a}]`), (e => {
                                kn(c, e) || nn(e, a)
                            })), n.getAttrib(o, a) || o.setAttribute(a, "1"), i = o, p(), d
                        })(o)
                    }
                    return null
                },
                g = () => {
                    i && i.removeAttribute(a), Zn(vn(e.getBody()), "#" + s).each(Co), i = null
                },
                p = () => {
                    r.hide()
                };
            return LC(e) || (e.on("click", (t => {
                n.isEditable(t.target) || (t.preventDefault(), e.focus())
            })), e.on("blur NewBlock", g), e.on("ResizeWindow FullscreenStateChanged", r.reposition), e.on("tap", (t => {
                const n = t.target,
                    o = AA(e, n);
                RA(o) ? (t.preventDefault(), cx(e, o).each(f)) : l(n) && cx(e, n).each(f)
            }), !0), e.on("mousedown", (r => {
                const s = r.target;
                if (s !== o && "HTML" !== s.nodeName && !n.isChildOf(s, o)) return;
                if (!((e, t, n) => {
                        const o = vn(e.getBody()),
                            r = e.inline ? o : vn(_n(o).dom.documentElement),
                            s = ((e, t, n, o) => {
                                const r = (e => e.dom.getBoundingClientRect())(t);
                                return {
                                    x: n - (e ? r.left + t.dom.clientLeft + gw(t) : 0),
                                    y: o - (e ? r.top + t.dom.clientTop + fw(t) : 0)
                                }
                            })(e.inline, r, t, n);
                        return ((e, t, n) => {
                            const o = uw(e),
                                r = mw(e);
                            return t >= 0 && n >= 0 && t <= o && n <= r
                        })(r, s.x, s.y)
                    })(e, r.clientX, r.clientY)) return;
                g(), p();
                const a = AA(e, s);
                RA(a) ? (r.preventDefault(), cx(e, a).each(f)) : cA(o, r.clientX, r.clientY).each((n => {
                    var o;
                    r.preventDefault(), (o = d(1, n.node, n.position === rA.Before, !1)) && t.setRng(o), jo(a) ? a.focus() : e.getBody().focus()
                }))
            })), e.on("keypress", (e => {
                tf.modifierPressed(e) || RA(t.getNode()) && e.preventDefault()
            })), e.on("GetSelectionRange", (e => {
                let t = e.range;
                if (i) {
                    if (!i.parentNode) return void(i = null);
                    t = t.cloneRange(), t.selectNode(i), e.range = t
                }
            })), e.on("SetSelectionRange", (e => {
                e.range = m(e.range);
                const t = f(e.range, e.forward);
                t && (e.range = t)
            })), e.on("AfterSetSelectionRange", (e => {
                const t = e.range,
                    o = t.startContainer.parentElement;
                var r;
                u(t) || jo(r = o) && "mcepastebin" === r.id || p(), (e => C(e) && n.hasClass(e, "mce-offscreen-selection"))(o) || g()
            })), (e => {
                NA(e), Rd(e) && (e => {
                    const t = t => {
                            if (!t.isDefaultPrevented()) {
                                const n = t.dataTransfer;
                                n && (H(n.types, "Files") || n.files.length > 0) && (t.preventDefault(), "drop" === t.type && Cw(e, "Dropped file type is not supported"))
                            }
                        },
                        n = n => {
                            bg(e, n.target) && t(n)
                        },
                        o = () => {
                            const o = Oa.DOM,
                                r = e.dom,
                                s = document,
                                a = e.inline ? e.getBody() : e.getDoc(),
                                i = ["drop", "dragover"];
                            q(i, (e => {
                                o.bind(s, e, n), r.bind(a, e, t)
                            })), e.on("remove", (() => {
                                q(i, (e => {
                                    o.unbind(s, e, n), r.unbind(a, e, t)
                                }))
                            }))
                        };
                    e.on("init", (() => {
                        fg.setEditorTimeout(e, o, 0)
                    }))
                })(e)
            })(e), (e => {
                const t = ja((() => {
                    if (!e.removed && e.getBody().contains(document.activeElement)) {
                        const t = e.selection.getRng();
                        if (t.collapsed) {
                            const n = ux(e, t, !1);
                            e.selection.setRng(n)
                        }
                    }
                }), 0);
                e.on("focus", (() => {
                    t.throttle()
                })), e.on("blur", (() => {
                    t.cancel()
                }))
            })(e), (e => {
                e.on("init", (() => {
                    e.on("focusin", (t => {
                        const n = t.target;
                        if (lr(n)) {
                            const t = Vh(e.getBody(), n),
                                o = sr(t) ? t : n;
                            e.selection.getNode() !== o && cx(e, o).each((t => e.selection.setRng(t)))
                        }
                    }))
                }))
            })(e)), {
                showCaret: d,
                showBlockCaretContainer: e => {
                    e.hasAttribute("data-mce-caret") && (Kr(e), t.scrollIntoView(e))
                },
                hideFakeCaret: p,
                destroy: () => {
                    r.destroy(), i = null
                }
            }
        },
        TA = (e, t) => {
            let n = t;
            for (let t = e.previousSibling; Xo(t); t = t.previousSibling) n += t.data.length;
            return n
        },
        BA = (e, t, n, o, r) => {
            if (Xo(n) && (o < 0 || o > n.data.length)) return [];
            const s = r && Xo(n) ? [TA(n, o)] : [o];
            let a = n;
            for (; a !== t && a.parentNode;) s.push(e.nodeIndex(a, r)), a = a.parentNode;
            return a === t ? s.reverse() : []
        },
        DA = (e, t, n, o, r, s, a = !1) => ({
            start: BA(e, t, n, o, a),
            end: BA(e, t, r, s, a)
        }),
        PA = (e, t) => {
            const n = t.slice(),
                o = n.pop();
            return x(o) ? X(n, ((e, t) => e.bind((e => I.from(e.childNodes[t])))), I.some(e)).bind((e => Xo(e) && (o < 0 || o > e.data.length) ? I.none() : I.some({
                node: e,
                offset: o
            }))) : I.none()
        },
        LA = (e, t) => PA(e, t.start).bind((({
            node: n,
            offset: o
        }) => PA(e, t.end).map((({
            node: e,
            offset: t
        }) => {
            const r = document.createRange();
            return r.setStart(n, o), r.setEnd(e, t), r
        })))),
        MA = (e, t, n) => {
            if (t && e.isEmpty(t) && !n(t)) {
                const o = t.parentNode;
                e.remove(t), MA(e, o, n)
            }
        },
        IA = (e, t, n, o = !0) => {
            const r = t.startContainer.parentNode,
                s = t.endContainer.parentNode;
            t.deleteContents(), o && !n(t.startContainer) && (Xo(t.startContainer) && 0 === t.startContainer.data.length && e.remove(t.startContainer), Xo(t.endContainer) && 0 === t.endContainer.data.length && e.remove(t.endContainer), MA(e, r, n), r !== s && MA(e, s, n))
        },
        FA = (e, t) => I.from(e.dom.getParent(t.startContainer, e.dom.isBlock)),
        UA = (e, t, n) => {
            const o = e.dynamicPatternsLookup({
                text: n,
                block: t
            });
            return {
                ...e,
                blockPatterns: ul(o).concat(e.blockPatterns),
                inlinePatterns: ml(o).concat(e.inlinePatterns)
            }
        },
        zA = (e, t, n, o) => {
            const r = e.createRng();
            return r.setStart(t, 0), r.setEnd(n, o), r.toString()
        },
        jA = (e, t, n) => {
            ((e, t, n) => {
                if (Xo(e) && 0 >= e.length) return I.some(uS(e, 0));
                {
                    const t = ii(mS);
                    return I.from(t.forwards(e, 0, fS(e), n)).map((e => uS(e.container, 0)))
                }
            })(t, 0, t).each((o => {
                const r = o.container;
                hS(r, n.start.length, t).each((n => {
                    const o = e.createRng();
                    o.setStart(r, 0), o.setEnd(n.container, n.offset), IA(e, o, (e => e === t))
                }));
                const s = vn(r),
                    a = hr(s);
                /^\s[^\s]/.test(a) && ((e, t) => {
                    pr.set(e, t)
                })(s, a.slice(1))
            }))
        },
        HA = (e, t) => e.create("span", {
            "data-mce-type": "bookmark",
            id: t
        }),
        $A = (e, t) => {
            const n = e.createRng();
            return n.setStartAfter(t.start), n.setEndBefore(t.end), n
        },
        VA = (e, t, n) => {
            const o = LA(e.getRoot(), n).getOrDie("Unable to resolve path range"),
                r = o.startContainer,
                s = o.endContainer,
                a = 0 === o.endOffset ? s : s.splitText(o.endOffset),
                i = 0 === o.startOffset ? r : r.splitText(o.startOffset),
                l = i.parentNode;
            return {
                prefix: t,
                end: a.parentNode.insertBefore(HA(e, t + "-end"), a),
                start: l.insertBefore(HA(e, t + "-start"), i)
            }
        },
        qA = (e, t, n) => {
            MA(e, e.get(t.prefix + "-end"), n), MA(e, e.get(t.prefix + "-start"), n)
        },
        WA = e => 0 === e.start.length,
        KA = (e, t, n, o) => {
            const r = t.start;
            var s;
            return bS(e, o.container, o.offset, (s = r, (e, t) => {
                const n = e.data.substring(0, t),
                    o = n.lastIndexOf(s.charAt(s.length - 1)),
                    r = n.lastIndexOf(s);
                return -1 !== r ? r + s.length : -1 !== o ? o + 1 : -1
            }), n).bind((o => {
                var s, a;
                const i = null !== (a = null === (s = n.textContent) || void 0 === s ? void 0 : s.indexOf(r)) && void 0 !== a ? a : -1;
                if (-1 !== i && o.offset >= i + r.length) {
                    const t = e.createRng();
                    return t.setStart(o.container, o.offset - r.length), t.setEnd(o.container, o.offset), I.some(t)
                } {
                    const s = o.offset - r.length;
                    return pS(o.container, s, n).map((t => {
                        const n = e.createRng();
                        return n.setStart(t.container, t.offset), n.setEnd(o.container, o.offset), n
                    })).filter((e => e.toString() === r)).orThunk((() => KA(e, t, n, uS(o.container, 0))))
                }
            }))
        },
        GA = (e, t, n, o) => {
            const r = e.dom,
                s = r.getRoot(),
                a = n.pattern,
                i = n.position.container,
                l = n.position.offset;
            return pS(i, l - n.pattern.end.length, t).bind((d => {
                const c = DA(r, s, d.container, d.offset, i, l, o);
                if (WA(a)) return I.some({
                    matches: [{
                        pattern: a,
                        startRng: c,
                        endRng: c
                    }],
                    position: d
                });
                {
                    const i = YA(e, n.remainingPatterns, d.container, d.offset, t, o),
                        l = i.getOr({
                            matches: [],
                            position: d
                        }),
                        u = l.position,
                        m = ((e, t, n, o, r, s = !1) => {
                            if (0 === t.start.length && !s) {
                                const t = e.createRng();
                                return t.setStart(n, o), t.setEnd(n, o), I.some(t)
                            }
                            return gS(n, o, r).bind((n => KA(e, t, r, n).bind((e => {
                                var t;
                                if (s) {
                                    if (e.endContainer === n.container && e.endOffset === n.offset) return I.none();
                                    if (0 === n.offset && (null === (t = e.endContainer.textContent) || void 0 === t ? void 0 : t.length) === e.endOffset) return I.none()
                                }
                                return I.some(e)
                            }))))
                        })(r, a, u.container, u.offset, t, i.isNone());
                    return m.map((e => {
                        const t = ((e, t, n, o = !1) => DA(e, t, n.startContainer, n.startOffset, n.endContainer, n.endOffset, o))(r, s, e, o);
                        return {
                            matches: l.matches.concat([{
                                pattern: a,
                                startRng: t,
                                endRng: c
                            }]),
                            position: uS(e.startContainer, e.startOffset)
                        }
                    }))
                }
            }))
        },
        YA = (e, t, n, o, r, s) => {
            const a = e.dom;
            return gS(n, o, a.getRoot()).bind((i => {
                const l = zA(a, r, n, o);
                for (let a = 0; a < t.length; a++) {
                    const d = t[a];
                    if (!$e(l, d.end)) continue;
                    const c = t.slice();
                    c.splice(a, 1);
                    const u = GA(e, r, {
                        pattern: d,
                        remainingPatterns: c,
                        position: i
                    }, s);
                    if (u.isNone() && o > 0) return YA(e, t, n, o - 1, r, s);
                    if (u.isSome()) return u
                }
                return I.none()
            }))
        },
        XA = (e, t, n) => {
            e.selection.setRng(n), "inline-format" === t.type ? q(t.format, (t => {
                e.formatter.apply(t)
            })) : e.execCommand(t.cmd, !1, t.value)
        },
        QA = (e, t, n, o, r, s) => {
            var a;
            return ((e, t) => {
                const n = ne(e, (e => $(t, (t => e.pattern.start === t.pattern.start && e.pattern.end === t.pattern.end))));
                return e.length === t.length ? n ? e : t : e.length > t.length ? e : t
            })(YA(e, r.inlinePatterns, n, o, t, s).fold((() => []), (e => e.matches)), YA(e, (a = r.inlinePatterns, ae(a, ((e, t) => t.end.length - e.end.length))), n, o, t, s).fold((() => []), (e => e.matches)))
        },
        JA = (e, t) => {
            if (0 === t.length) return;
            const n = e.dom,
                o = e.selection.getBookmark(),
                r = ((e, t) => {
                    const n = ti("mce_textpattern"),
                        o = Y(t, ((t, o) => {
                            const r = VA(e, n + `_end${t.length}`, o.endRng);
                            return t.concat([{
                                ...o,
                                endMarker: r
                            }])
                        }), []);
                    return Y(o, ((t, r) => {
                        const s = o.length - t.length - 1,
                            a = WA(r.pattern) ? r.endMarker : VA(e, n + `_start${s}`, r.startRng);
                        return t.concat([{
                            ...r,
                            startMarker: a
                        }])
                    }), [])
                })(n, t);
            q(r, (t => {
                const o = n.getParent(t.startMarker.start, n.isBlock),
                    r = e => e === o;
                WA(t.pattern) ? ((e, t, n, o) => {
                    const r = $A(e.dom, n);
                    IA(e.dom, r, o), XA(e, t, r)
                })(e, t.pattern, t.endMarker, r) : ((e, t, n, o, r) => {
                    const s = e.dom,
                        a = $A(s, o),
                        i = $A(s, n);
                    IA(s, i, r), IA(s, a, r);
                    const l = {
                            prefix: n.prefix,
                            start: n.end,
                            end: o.start
                        },
                        d = $A(s, l);
                    XA(e, t, d)
                })(e, t.pattern, t.startMarker, t.endMarker, r), qA(n, t.endMarker, r), qA(n, t.startMarker, r)
            })), e.selection.moveToBookmark(o)
        },
        ZA = (e, t) => {
            const n = e.selection.getRng();
            return FA(e, n).map((o => {
                var r;
                const s = Math.max(0, n.startOffset),
                    a = UA(t, o, null !== (r = o.textContent) && void 0 !== r ? r : ""),
                    i = QA(e, o, n.startContainer, s, a, !0),
                    l = ((e, t, n, o) => {
                        var r;
                        const s = e.dom,
                            a = Rl(e);
                        if (!s.is(t, a)) return [];
                        const i = null !== (r = t.textContent) && void 0 !== r ? r : "";
                        return ((e, t) => {
                            const n = (e => ae(e, ((e, t) => t.start.length - e.start.length)))(e),
                                o = t.replace(fr, " ");
                            return J(n, (e => 0 === t.indexOf(e.start) || 0 === o.indexOf(e.start)))
                        })(n.blockPatterns, i).map((e => Dt.trim(i).length === e.start.length ? [] : [{
                            pattern: e,
                            range: DA(s, s.getRoot(), t, 0, t, 0, true)
                        }])).getOr([])
                    })(e, o, a);
                return (l.length > 0 || i.length > 0) && (e.undoManager.add(), e.undoManager.extra((() => {
                    e.execCommand("mceInsertNewLine")
                }), (() => {
                    e.insertContent(mr), JA(e, i), ((e, t) => {
                        if (0 === t.length) return;
                        const n = e.selection.getBookmark();
                        q(t, (t => ((e, t) => {
                            const n = e.dom,
                                o = t.pattern,
                                r = LA(n.getRoot(), t.range).getOrDie("Unable to resolve path range");
                            return FA(e, r).each((t => {
                                "block-format" === o.type ? ((e, t) => {
                                    const n = t.get(e);
                                    return p(n) && le(n).exists((e => ke(e, "block")))
                                })(o.format, e.formatter) && e.undoManager.transact((() => {
                                    jA(e.dom, t, o), e.formatter.apply(o.format)
                                })) : "block-command" === o.type && e.undoManager.transact((() => {
                                    jA(e.dom, t, o), e.execCommand(o.cmd, !1, o.value)
                                }))
                            })), !0
                        })(e, t))), e.selection.moveToBookmark(n)
                    })(e, l);
                    const t = e.selection.getRng(),
                        n = gS(t.startContainer, t.startOffset, e.dom.getRoot());
                    e.execCommand("mceInsertNewLine"), n.each((t => {
                        const n = t.container;
                        n.data.charAt(t.offset - 1) === mr && (n.deleteData(t.offset - 1, 1), MA(e.dom, n.parentNode, (t => t === e.dom.getRoot())))
                    }))
                })), !0)
            })).getOr(!1)
        },
        eO = (e, t, n) => {
            for (let o = 0; o < e.length; o++)
                if (n(e[o], t)) return !0;
            return !1
        },
        tO = e => {
            const t = Dt.each,
                n = tf.BACKSPACE,
                o = tf.DELETE,
                r = e.dom,
                s = e.selection,
                a = e.parser,
                i = At.browser,
                l = i.isFirefox(),
                d = i.isChromium() || i.isSafari(),
                c = At.deviceType.isiPhone() || At.deviceType.isiPad(),
                u = At.os.isMacOS() || At.os.isiOS(),
                f = (t, n) => {
                    try {
                        e.getDoc().execCommand(t, !1, String(n))
                    } catch (e) {}
                },
                g = e => e.isDefaultPrevented(),
                p = () => {
                    e.shortcuts.add("meta+a", null, "SelectAll")
                },
                h = () => {
                    e.inline || r.bind(e.getDoc(), "mousedown mouseup", (t => {
                        let n;
                        if (t.target === e.getDoc().documentElement)
                            if (n = s.getRng(), e.getBody().focus(), "mousedown" === t.type) {
                                if (jr(n.startContainer)) return;
                                s.placeCaretAt(t.clientX, t.clientY)
                            } else s.setRng(n)
                    }))
                },
                b = () => {
                    Range.prototype.getClientRects || e.on("mousedown", (t => {
                        if (!g(t) && "HTML" === t.target.nodeName) {
                            const t = e.getBody();
                            t.blur(), fg.setEditorTimeout(e, (() => {
                                t.focus()
                            }))
                        }
                    }))
                },
                v = () => {
                    const t = Td(e);
                    e.on("click", (n => {
                        const o = n.target;
                        /^(IMG|HR)$/.test(o.nodeName) && r.isEditable(o.parentNode) && (n.preventDefault(), e.selection.select(o), e.nodeChanged()), "A" === o.nodeName && r.hasClass(o, t) && 0 === o.childNodes.length && r.isEditable(o.parentNode) && (n.preventDefault(), s.select(o))
                    }))
                },
                y = () => {
                    e.on("keydown", (e => {
                        if (!g(e) && e.keyCode === n && s.isCollapsed() && 0 === s.getRng().startOffset) {
                            const t = s.getNode().previousSibling;
                            if (t && t.nodeName && "table" === t.nodeName.toLowerCase()) return e.preventDefault(), !1
                        }
                        return !0
                    }))
                },
                C = () => {
                    kd(e) || e.on("BeforeExecCommand mousedown", (() => {
                        f("StyleWithCSS", !1), f("enableInlineTableEditing", !1), td(e) || f("enableObjectResizing", !1)
                    }))
                },
                w = () => {
                    e.contentStyles.push("img:-moz-broken {-moz-force-broken-image-icon:1;min-width:24px;min-height:24px}")
                },
                x = () => {
                    e.inline || e.on("keydown", (() => {
                        document.activeElement === document.body && e.getWin().focus()
                    }))
                },
                k = () => {
                    e.inline || (e.contentStyles.push("body {min-height: 150px}"), e.on("click", (t => {
                        let n;
                        "HTML" === t.target.nodeName && (n = e.selection.getRng(), e.getBody().focus(), e.selection.setRng(n), e.selection.normalize(), e.nodeChanged())
                    })))
                },
                S = () => {
                    u && e.on("keydown", (t => {
                        !tf.metaKeyPressed(t) || t.shiftKey || 37 !== t.keyCode && 39 !== t.keyCode || (t.preventDefault(), e.selection.getSel().modify("move", 37 === t.keyCode ? "backward" : "forward", "lineboundary"))
                    }))
                },
                _ = () => {
                    e.on("click", (e => {
                        let t = e.target;
                        do {
                            if ("A" === t.tagName) return void e.preventDefault()
                        } while (t = t.parentNode)
                    })), e.contentStyles.push(".mce-content-body {-webkit-touch-callout: none}")
                },
                N = () => {
                    e.on("init", (() => {
                        e.dom.bind(e.getBody(), "submit", (e => {
                            e.preventDefault()
                        }))
                    }))
                },
                R = E;
            return LC(e) ? (d && (h(), v(), N(), p(), c && (x(), k(), _())), l && (b(), C(), w(), S())) : (e.on("keydown", (t => {
                if (g(t) || t.keyCode !== tf.BACKSPACE) return;
                let n = s.getRng();
                const o = n.startContainer,
                    a = n.startOffset,
                    i = r.getRoot();
                let l = o;
                if (n.collapsed && 0 === a) {
                    for (; l.parentNode && l.parentNode.firstChild === l && l.parentNode !== i;) l = l.parentNode;
                    "BLOCKQUOTE" === l.nodeName && (e.formatter.toggle("blockquote", void 0, l), n = r.createRng(), n.setStart(o, 0), n.setEnd(o, 0), s.setRng(n))
                }
            })), (() => {
                const t = e => {
                    const t = r.create("body"),
                        n = e.cloneContents();
                    return t.appendChild(n), s.serializer.serialize(t, {
                        format: "html"
                    })
                };
                e.on("keydown", (s => {
                    const a = s.keyCode;
                    if (!g(s) && (a === o || a === n) && e.selection.isEditable()) {
                        const n = e.selection.isCollapsed(),
                            o = e.getBody();
                        if (n && !r.isEmpty(o)) return;
                        if (!n && !(n => {
                                const o = t(n),
                                    s = r.createRng();
                                return s.selectNode(e.getBody()), o === t(s)
                            })(e.selection.getRng())) return;
                        s.preventDefault(), e.setContent(""), o.firstChild && r.isBlock(o.firstChild) ? e.selection.setCursorLocation(o.firstChild, 0) : e.selection.setCursorLocation(o, 0), e.nodeChanged()
                    }
                }))
            })(), At.windowsPhone || e.on("keyup focusin mouseup", (t => {
                tf.modifierPressed(t) || (e => {
                    const t = e.getBody(),
                        n = e.selection.getRng();
                    return n.startContainer === n.endContainer && n.startContainer === t && 0 === n.startOffset && n.endOffset === t.childNodes.length
                })(e) || s.normalize()
            }), !0), d && (h(), v(), e.on("init", (() => {
                f("DefaultParagraphSeparator", Rl(e))
            })), N(), y(), a.addNodeFilter("br", (e => {
                let t = e.length;
                for (; t--;) "Apple-interchange-newline" === e[t].attr("class") && e[t].remove()
            })), c ? (x(), k(), _()) : p()), l && (e.on("keydown", (t => {
                if (!g(t) && t.keyCode === n) {
                    if (!e.getBody().getElementsByTagName("hr").length) return;
                    if (s.isCollapsed() && 0 === s.getRng().startOffset) {
                        const e = s.getNode(),
                            n = e.previousSibling;
                        if ("HR" === e.nodeName) return r.remove(e), void t.preventDefault();
                        n && n.nodeName && "hr" === n.nodeName.toLowerCase() && (r.remove(n), t.preventDefault())
                    }
                }
            })), b(), (() => {
                const n = () => {
                        const n = r.getAttribs(s.getStart().cloneNode(!1));
                        return () => {
                            const o = s.getStart();
                            o !== e.getBody() && (r.setAttrib(o, "style", null), t(n, (e => {
                                o.setAttributeNode(e.cloneNode(!0))
                            })))
                        }
                    },
                    o = () => !s.isCollapsed() && r.getParent(s.getStart(), r.isBlock) !== r.getParent(s.getEnd(), r.isBlock);
                e.on("keypress", (t => {
                    let r;
                    return !(!(g(t) || 8 !== t.keyCode && 46 !== t.keyCode) && o() && (r = n(), e.getDoc().execCommand("delete", !1), r(), t.preventDefault(), 1))
                })), r.bind(e.getDoc(), "cut", (t => {
                    if (!g(t) && o()) {
                        const t = n();
                        fg.setEditorTimeout(e, (() => {
                            t()
                        }))
                    }
                }))
            })(), C(), e.on("SetContent ExecCommand", (e => {
                "setcontent" !== e.type && "mceInsertLink" !== e.command || t(r.select("a:not([data-mce-block])"), (e => {
                    var t;
                    let n = e.parentNode;
                    const o = r.getRoot();
                    if ((null == n ? void 0 : n.lastChild) === e) {
                        for (; n && !r.isBlock(n);) {
                            if ((null === (t = n.parentNode) || void 0 === t ? void 0 : t.lastChild) !== n || n === o) return;
                            n = n.parentNode
                        }
                        r.add(n, "br", {
                            "data-mce-bogus": 1
                        })
                    }
                }))
            })), w(), S(), y(), e.on("drop", (t => {
                var n;
                const o = null === (n = t.dataTransfer) || void 0 === n ? void 0 : n.getData("text/html");
                m(o) && /^<img[^>]*>$/.test(o) && e.dispatch("dragend", new window.DragEvent("dragend", t))
            })))), {
                refreshContentEditable: R,
                isHidden: () => {
                    if (!l || e.removed) return !1;
                    const t = e.selection.getSel();
                    return !t || !t.rangeCount || 0 === t.rangeCount
                }
            }
        },
        nO = Oa.DOM,
        oO = e => e.inline ? e.getElement().nodeName.toLowerCase() : void 0,
        rO = e => ye(e, (e => !1 === v(e))),
        sO = e => {
            const t = e.options.get,
                n = e.editorUpload.blobCache;
            return rO({
                allow_conditional_comments: t("allow_conditional_comments"),
                allow_html_data_urls: t("allow_html_data_urls"),
                allow_svg_data_urls: t("allow_svg_data_urls"),
                allow_html_in_named_anchor: t("allow_html_in_named_anchor"),
                allow_script_urls: t("allow_script_urls"),
                allow_unsafe_link_target: t("allow_unsafe_link_target"),
                convert_fonts_to_spans: t("convert_fonts_to_spans"),
                fix_list_elements: t("fix_list_elements"),
                font_size_legacy_values: t("font_size_legacy_values"),
                forced_root_block: t("forced_root_block"),
                forced_root_block_attrs: t("forced_root_block_attrs"),
                preserve_cdata: t("preserve_cdata"),
                inline_styles: t("inline_styles"),
                root_name: oO(e),
                sanitize: t("xss_sanitization"),
                validate: !0,
                blob_cache: n,
                document: e.getDoc()
            })
        },
        aO = e => {
            const t = e.options.get;
            return rO({
                custom_elements: t("custom_elements"),
                extended_valid_elements: t("extended_valid_elements"),
                invalid_elements: t("invalid_elements"),
                invalid_styles: t("invalid_styles"),
                schema: t("schema"),
                valid_children: t("valid_children"),
                valid_classes: t("valid_classes"),
                valid_elements: t("valid_elements"),
                valid_styles: t("valid_styles"),
                verify_html: t("verify_html"),
                padd_empty_block_inline_children: t("format_empty_lines")
            })
        },
        iO = e => e.inline ? e.ui.styleSheetLoader : e.dom.styleSheetLoader,
        lO = e => {
            const t = iO(e),
                n = Jl(e),
                o = e.contentCSS,
                r = () => {
                    t.unloadAll(o), e.inline || e.ui.styleSheetLoader.unloadAll(n)
                },
                s = () => {
                    e.removed ? r() : e.on("remove", r)
                };
            if (e.contentStyles.length > 0) {
                let t = "";
                Dt.each(e.contentStyles, (e => {
                    t += e + "\r\n"
                })), e.dom.addStyle(t)
            }
            const a = Promise.all(((e, t, n) => {
                    const o = [iO(e).loadAll(t)];
                    return e.inline ? o : o.concat([e.ui.styleSheetLoader.loadAll(n)])
                })(e, o, n)).then(s).catch(s),
                i = Ql(e);
            return i && ((e, t) => {
                const n = vn(e.getBody()),
                    o = Vn($n(n)),
                    r = hn("style");
                Qt(r, "type", "text/css"), ho(r, bn(t)), ho(o, r), e.on("remove", (() => {
                    Co(r)
                }))
            })(e, i), a
        },
        dO = e => {
            !0 !== e.removed && ((e => {
                LC(e) || e.load({
                    initial: !0,
                    format: "html"
                }), e.startContent = e.getContent({
                    format: "raw"
                })
            })(e), (e => {
                e.bindPendingEventDelegates(), e.initialized = !0, (e => {
                    e.dispatch("Init")
                })(e), e.focus(!0), (e => {
                    const t = e.dom.getRoot();
                    e.inline || nm(e) && e.selection.getStart(!0) !== t || Cu(t).each((t => {
                        const n = t.getNode(),
                            o = Ko(n) ? Cu(n).getOr(t) : t;
                        e.selection.setRng(o.toRange())
                    }))
                })(e), e.nodeChanged({
                    initial: !0
                });
                const t = Pd(e);
                w(t) && t.call(e, e), (e => {
                    const t = Md(e);
                    t && fg.setEditorTimeout(e, (() => {
                        let n;
                        n = !0 === t ? e : e.editorManager.get(t), n && !n.destroyed && (n.focus(), n.selection.scrollIntoView())
                    }), 100)
                })(e)
            })(e))
        },
        cO = e => {
            const t = e.getElement();
            let n = e.getDoc();
            e.inline && (nO.addClass(t, "mce-content-body"), e.contentDocument = n = document, e.contentWindow = window, e.bodyElement = t, e.contentAreaContainer = t);
            const o = e.getBody();
            o.disabled = !0, e.readonly = kd(e), e._editableRoot = Ed(e), !e.readonly && e.hasEditableRoot() && (e.inline && "static" === nO.getStyle(o, "position", !0) && (o.style.position = "relative"), o.contentEditable = "true"), o.disabled = !1, e.editorUpload = Tw(e), e.schema = ca(aO(e)), e.dom = Oa(n, {
                keep_values: !0,
                url_converter: e.convertURL,
                url_converter_scope: e,
                update_styles: !0,
                root_element: e.inline ? e.getBody() : null,
                collect: e.inline,
                schema: e.schema,
                contentCssCors: Vl(e),
                referrerPolicy: ql(e),
                onSetAttrib: t => {
                    e.dispatch("SetAttrib", t)
                }
            }), e.parser = (e => {
                const t = nC(sO(e), e.schema);
                return t.addAttributeFilter("src,href,style,tabindex", ((t, n) => {
                    const o = e.dom,
                        r = "data-mce-" + n;
                    let s = t.length;
                    for (; s--;) {
                        const a = t[s];
                        let i = a.attr(n);
                        if (i && !a.attr(r)) {
                            if (0 === i.indexOf("data:") || 0 === i.indexOf("blob:")) continue;
                            "style" === n ? (i = o.serializeStyle(o.parseStyle(i), a.name), i.length || (i = null), a.attr(r, i), a.attr(n, i)) : "tabindex" === n ? (a.attr(r, i), a.attr(n, null)) : a.attr(r, e.convertURL(i, n, a.name))
                        }
                    }
                })), t.addNodeFilter("script", (e => {
                    let t = e.length;
                    for (; t--;) {
                        const n = e[t],
                            o = n.attr("type") || "no/type";
                        0 !== o.indexOf("mce-") && n.attr("type", "mce-" + o)
                    }
                })), nc(e) && t.addNodeFilter("#cdata", (t => {
                    var n;
                    let o = t.length;
                    for (; o--;) {
                        const r = t[o];
                        r.type = 8, r.name = "#comment", r.value = "[CDATA[" + e.dom.encode(null !== (n = r.value) && void 0 !== n ? n : "") + "]]"
                    }
                })), t.addNodeFilter("p,h1,h2,h3,h4,h5,h6,div", (t => {
                    let n = t.length;
                    const o = e.schema.getNonEmptyElements();
                    for (; n--;) {
                        const e = t[n];
                        e.isEmpty(o) && 0 === e.getAll("br").length && e.append(new Ug("br", 1))
                    }
                })), t
            })(e), e.serializer = WC((e => {
                const t = e.options.get;
                return {
                    ...sO(e),
                    ...aO(e),
                    ...rO({
                        remove_trailing_brs: t("remove_trailing_brs"),
                        url_converter: t("url_converter"),
                        url_converter_scope: t("url_converter_scope"),
                        element_format: t("element_format"),
                        entities: t("entities"),
                        entity_encoding: t("entity_encoding"),
                        indent: t("indent"),
                        indent_after: t("indent_after"),
                        indent_before: t("indent_before")
                    })
                }
            })(e), e), e.selection = $C(e.dom, e.getWin(), e.serializer, e), e.annotator = Wm(e), e.formatter = Hw(e), e.undoManager = Vw(e), e._nodeChangeDispatcher = new LN(e), e._selectionOverrides = OA(e), (e => {
                const t = za(),
                    n = Da(!1),
                    o = Ha((t => {
                        e.dispatch("longpress", {
                            ...t,
                            type: "longpress"
                        }), n.set(!0)
                    }), 400);
                e.on("touchstart", (e => {
                    pE(e).each((r => {
                        o.cancel();
                        const s = {
                            x: r.clientX,
                            y: r.clientY,
                            target: e.target
                        };
                        o.throttle(e), n.set(!1), t.set(s)
                    }))
                }), !0), e.on("touchmove", (r => {
                    o.cancel(), pE(r).each((o => {
                        t.on((r => {
                            ((e, t) => {
                                const n = Math.abs(e.clientX - t.x),
                                    o = Math.abs(e.clientY - t.y);
                                return n > 5 || o > 5
                            })(o, r) && (t.clear(), n.set(!1), e.dispatch("longpresscancel"))
                        }))
                    }))
                }), !0), e.on("touchend touchcancel", (r => {
                    o.cancel(), "touchcancel" !== r.type && t.get().filter((e => e.target.isEqualNode(r.target))).each((() => {
                        n.get() ? r.preventDefault() : e.dispatch("tap", {
                            ...r,
                            type: "tap"
                        })
                    }))
                }), !0)
            })(e), XR(e), (e => {
                const t = "contenteditable",
                    n = " " + Dt.trim(ec(e)) + " ",
                    o = " " + Dt.trim(Zd(e)) + " ",
                    r = xE(n),
                    s = xE(o),
                    a = tc(e);
                a.length > 0 && e.on("BeforeSetContent", (t => {
                    ((e, t, n) => {
                        let o = t.length,
                            r = n.content;
                        if ("raw" !== n.format) {
                            for (; o--;) r = r.replace(t[o], kE(e, r, Zd(e)));
                            n.content = r
                        }
                    })(e, a, t)
                })), e.parser.addAttributeFilter("class", (e => {
                    let n = e.length;
                    for (; n--;) {
                        const o = e[n];
                        r(o) ? o.attr(t, "true") : s(o) && o.attr(t, "false")
                    }
                })), e.serializer.addAttributeFilter(t, (e => {
                    let n = e.length;
                    for (; n--;) {
                        const o = e[n];
                        (r(o) || s(o)) && (a.length > 0 && o.attr("data-mce-content") ? (o.name = "#text", o.type = 3, o.raw = !0, o.value = o.attr("data-mce-content")) : o.attr(t, null))
                    }
                }))
            })(e), LC(e) || ((e => {
                e.on("mousedown", (t => {
                    t.detail >= 3 && (t.preventDefault(), oA(e))
                }))
            })(e), (e => {
                (e => {
                    const t = [",", ".", ";", ":", "!", "?"],
                        n = [32],
                        o = () => {
                            return t = Qd(e), n = Jd(e), {
                                inlinePatterns: ml(t),
                                blockPatterns: ul(t),
                                dynamicPatternsLookup: n
                            };
                            var t, n
                        },
                        r = () => (e => e.options.isSet("text_patterns_lookup"))(e);
                    e.on("keydown", (t => {
                        if (13 === t.keyCode && !tf.modifierPressed(t) && e.selection.isCollapsed()) {
                            const n = o();
                            (n.inlinePatterns.length > 0 || n.blockPatterns.length > 0 || r()) && ZA(e, n) && t.preventDefault()
                        }
                    }), !0);
                    const s = () => {
                        if (e.selection.isCollapsed()) {
                            const t = o();
                            (t.inlinePatterns.length > 0 || r()) && ((e, t) => {
                                const n = e.selection.getRng();
                                FA(e, n).map((o => {
                                    const r = Math.max(0, n.startOffset - 1),
                                        s = zA(e.dom, o, n.startContainer, r),
                                        a = UA(t, o, s),
                                        i = QA(e, o, n.startContainer, r, a, !1);
                                    i.length > 0 && e.undoManager.transact((() => {
                                        JA(e, i)
                                    }))
                                }))
                            })(e, t)
                        }
                    };
                    e.on("keyup", (e => {
                        eO(n, e, ((e, t) => e === t.keyCode && !tf.modifierPressed(t))) && s()
                    })), e.on("keypress", (n => {
                        eO(t, n, ((e, t) => e.charCodeAt(0) === t.charCode)) && fg.setEditorTimeout(e, s)
                    }))
                })(e)
            })(e));
            const r = PN(e);
            gE(e, r), (e => {
                e.on("NodeChange", O(CE, e))
            })(e), (e => {
                var t;
                const n = e.dom,
                    o = Rl(e),
                    r = null !== (t = od(e)) && void 0 !== t ? t : "",
                    s = (t, a) => {
                        if ((e => {
                                if (Kw(e)) {
                                    const t = e.keyCode;
                                    return !Gw(e) && (tf.metaKeyPressed(e) || e.altKey || t >= 112 && t <= 123 || H(qw, t))
                                }
                                return !1
                            })(t)) return;
                        const i = e.getBody(),
                            l = !(e => Kw(e) && !(Gw(e) || "keyup" === e.type && 229 === e.keyCode))(t) && ((e, t, n) => {
                                if (ps(vn(t), !1)) {
                                    const o = t.firstElementChild;
                                    return !o || !e.getStyle(t.firstElementChild, "padding-left") && !e.getStyle(t.firstElementChild, "padding-right") && n === o.nodeName.toLowerCase()
                                }
                                return !1
                            })(n, i, o);
                        ("" !== n.getAttrib(i, Ww) !== l || a) && (n.setAttrib(i, Ww, l ? r : null), n.setAttrib(i, "aria-placeholder", l ? r : null), ((e, t) => {
                            e.dispatch("PlaceholderToggle", {
                                state: t
                            })
                        })(e, l), e.on(l ? "keydown" : "keyup", s), e.off(l ? "keyup" : "keydown", s))
                    };
                Ge(r) && e.on("init", (t => {
                    s(t, !0), e.on("change SetContent ExecCommand", s), e.on("paste", (t => fg.setEditorTimeout(e, (() => s(t)))))
                }))
            })(e), FR(e);
            const s = (e => {
                const t = e;
                return (e => xe(e.plugins, "rtc").bind((e => I.from(e.setup))))(e).fold((() => (t.rtcInstance = PC(e), I.none())), (e => (t.rtcInstance = (() => {
                    const e = N(null),
                        t = N("");
                    return {
                        init: {
                            bindEvents: E
                        },
                        undoManager: {
                            beforeChange: E,
                            add: e,
                            undo: e,
                            redo: e,
                            clear: E,
                            reset: E,
                            hasUndo: L,
                            hasRedo: L,
                            transact: e,
                            ignore: E,
                            extra: E
                        },
                        formatter: {
                            match: L,
                            matchAll: N([]),
                            matchNode: N(void 0),
                            canApply: L,
                            closest: t,
                            apply: E,
                            remove: E,
                            toggle: E,
                            formatChanged: N({
                                unbind: E
                            })
                        },
                        editor: {
                            getContent: t,
                            setContent: N({
                                content: "",
                                html: ""
                            }),
                            insertContent: N(""),
                            addVisual: E
                        },
                        selection: {
                            getContent: t
                        },
                        autocompleter: {
                            addDecoration: E,
                            removeDecoration: E
                        },
                        raw: {
                            getModel: N(I.none())
                        }
                    }
                })(), I.some((() => e().then((e => (t.rtcInstance = (e => {
                    const t = e => f(e) ? e : {},
                        {
                            init: n,
                            undoManager: o,
                            formatter: r,
                            editor: s,
                            selection: a,
                            autocompleter: i,
                            raw: l
                        } = e;
                    return {
                        init: {
                            bindEvents: n.bindEvents
                        },
                        undoManager: {
                            beforeChange: o.beforeChange,
                            add: o.add,
                            undo: o.undo,
                            redo: o.redo,
                            clear: o.clear,
                            reset: o.reset,
                            hasUndo: o.hasUndo,
                            hasRedo: o.hasRedo,
                            transact: (e, t, n) => o.transact(n),
                            ignore: (e, t) => o.ignore(t),
                            extra: (e, t, n, r) => o.extra(n, r)
                        },
                        formatter: {
                            match: (e, n, o, s) => r.match(e, t(n), s),
                            matchAll: r.matchAll,
                            matchNode: r.matchNode,
                            canApply: e => r.canApply(e),
                            closest: e => r.closest(e),
                            apply: (e, n, o) => r.apply(e, t(n)),
                            remove: (e, n, o, s) => r.remove(e, t(n)),
                            toggle: (e, n, o) => r.toggle(e, t(n)),
                            formatChanged: (e, t, n, o, s) => r.formatChanged(t, n, o, s)
                        },
                        editor: {
                            getContent: e => s.getContent(e),
                            setContent: (e, t) => ({
                                content: s.setContent(e, t),
                                html: ""
                            }),
                            insertContent: (e, t) => (s.insertContent(e), ""),
                            addVisual: s.addVisual
                        },
                        selection: {
                            getContent: (e, t) => a.getContent(t)
                        },
                        autocompleter: {
                            addDecoration: i.addDecoration,
                            removeDecoration: i.removeDecoration
                        },
                        raw: {
                            getModel: () => I.some(l.getRawModel())
                        }
                    }
                })(e), e.rtc.isRemote))))))))
            })(e);
            (e => {
                const t = e.getDoc(),
                    n = e.getBody();
                (e => {
                    e.dispatch("PreInit")
                })(e), Id(e) || (t.body.spellcheck = !1, nO.setAttrib(n, "spellcheck", "false")), e.quirks = tO(e), (e => {
                    e.dispatch("PostRender")
                })(e);
                const o = Zl(e);
                void 0 !== o && (n.dir = o);
                const r = Fd(e);
                r && e.on("BeforeSetContent", (e => {
                    Dt.each(r, (t => {
                        e.content = e.content.replace(t, (e => "\x3c!--mce:protected " + escape(e) + "--\x3e"))
                    }))
                })), e.on("SetContent", (() => {
                    e.addVisual(e.getBody())
                })), e.on("compositionstart compositionend", (t => {
                    e.composing = "compositionstart" === t.type
                }))
            })(e), s.fold((() => {
                lO(e).then((() => dO(e)))
            }), (t => {
                e.setProgressState(!0), lO(e).then((() => {
                    t().then((t => {
                        e.setProgressState(!1), dO(e), FC(e)
                    }), (t => {
                        e.notificationManager.open({
                            type: "error",
                            text: String(t)
                        }), dO(e), FC(e)
                    }))
                }))
            }))
        },
        uO = M,
        mO = Oa.DOM,
        fO = Oa.DOM,
        gO = (e, t) => ({
            editorContainer: e,
            iframeContainer: t,
            api: {}
        }),
        pO = e => {
            const t = e.getElement();
            return e.inline ? gO(null) : (e => {
                const t = fO.create("div");
                return fO.insertAfter(t, e), gO(t, t)
            })(t)
        },
        hO = async e => {
            e.dispatch("ScriptsLoaded"), (e => {
                const t = Dt.trim(Fl(e)),
                    n = e.ui.registry.getAll().icons,
                    o = {
                        ...iw.get("default").icons,
                        ...iw.get(t).icons
                    };
                ge(o, ((t, o) => {
                    ke(n, o) || e.ui.registry.addIcon(o, t)
                }))
            })(e), (e => {
                const t = ad(e);
                if (m(t)) {
                    const n = bw.get(t);
                    e.theme = n(e, bw.urls[t]) || {}, w(e.theme.init) && e.theme.init(e, bw.urls[t] || e.documentBaseUrl.replace(/\/$/, ""))
                } else e.theme = {}
            })(e), (e => {
                const t = ld(e),
                    n = lw.get(t);
                e.model = n(e, lw.urls[t])
            })(e), (e => {
                const t = [];
                q(_d(e), (n => {
                    ((e, t, n) => {
                        const o = hw.get(n),
                            r = hw.urls[n] || e.documentBaseUrl.replace(/\/$/, "");
                        if (n = Dt.trim(n), o && -1 === Dt.inArray(t, n)) {
                            if (e.plugins[n]) return;
                            try {
                                const s = o(e, r) || {};
                                e.plugins[n] = s, w(s.init) && (s.init(e, r), t.push(n))
                            } catch (t) {
                                ((e, t, n) => {
                                    const o = Ia.translate(["Failed to initialize plugin: {0}", t]);
                                    Ym(e, "PluginLoadError", {
                                        message: o
                                    }), kw(o, n), Cw(e, o)
                                })(e, n, t)
                            }
                        }
                    })(e, t, (e => e.replace(/^\-/, ""))(n))
                }))
            })(e);
            const t = await (e => {
                const t = e.getElement();
                return e.orgDisplay = t.style.display, m(ad(e)) ? (e => {
                    const t = e.theme.renderUI;
                    return t ? t() : pO(e)
                })(e) : w(ad(e)) ? (e => {
                    const t = e.getElement(),
                        n = ad(e)(e, t);
                    return n.editorContainer.nodeType && (n.editorContainer.id = n.editorContainer.id || e.id + "_parent"), n.iframeContainer && n.iframeContainer.nodeType && (n.iframeContainer.id = n.iframeContainer.id || e.id + "_iframecontainer"), n.height = n.iframeHeight ? n.iframeHeight : t.offsetHeight, n
                })(e) : pO(e)
            })(e);
            ((e, t) => {
                const n = {
                    show: I.from(t.show).getOr(E),
                    hide: I.from(t.hide).getOr(E),
                    isEnabled: I.from(t.isEnabled).getOr(M),
                    setEnabled: n => {
                        e.mode.isReadOnly() || I.from(t.setEnabled).each((e => e(n)))
                    }
                };
                e.ui = {
                    ...e.ui,
                    ...n
                }
            })(e, I.from(t.api).getOr({})), e.editorContainer = t.editorContainer, (e => {
                e.contentCSS = e.contentCSS.concat((e => Ew(e, Xl(e)))(e), (e => Ew(e, Jl(e)))(e))
            })(e), e.inline ? cO(e) : ((e, t) => {
                ((e, t) => {
                    const n = e.translate("Rich Text Area"),
                        o = en(vn(e.getElement()), "tabindex").bind(Xe),
                        r = ((e, t, n, o) => {
                            const r = hn("iframe");
                            return o.each((e => Qt(r, "tabindex", e))), Jt(r, n), Jt(r, {
                                id: e + "_ifr",
                                frameBorder: "0",
                                allowTransparency: "true",
                                title: t
                            }), cn(r, "tox-edit-area__iframe"), r
                        })(e.id, n, wl(e), o).dom;
                    r.onload = () => {
                        r.onload = null, e.dispatch("load")
                    }, e.contentAreaContainer = t.iframeContainer, e.iframeElement = r, e.iframeHTML = (e => {
                        let t = xl(e) + "<html><head>";
                        kl(e) !== e.documentBaseUrl && (t += '<base href="' + e.documentBaseURI.getURI() + '" />'), t += '<meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />';
                        const n = El(e),
                            o = Sl(e),
                            r = e.translate(Bd(e));
                        return _l(e) && (t += '<meta http-equiv="Content-Security-Policy" content="' + _l(e) + '" />'), t += `</head><body id="${n}" class="mce-content-body ${o}" data-id="${e.id}" aria-label="${r}"><br></body></html>`, t
                    })(e), mO.add(t.iframeContainer, r)
                })(e, t), t.editorContainer && (t.editorContainer.style.display = e.orgDisplay, e.hidden = mO.isHidden(t.editorContainer)), e.getElement().style.display = "none", mO.setAttrib(e.id, "aria-hidden", "true"), e.getElement().style.visibility = e.orgVisibility, (e => {
                    const t = e.iframeElement,
                        n = () => {
                            e.contentDocument = t.contentDocument, cO(e)
                        };
                    if (sc(e) || At.browser.isFirefox()) {
                        const t = e.getDoc();
                        t.open(), t.write(e.iframeHTML), t.close(), n()
                    } else {
                        const r = (o = vn(t), So(o, "load", uO, (() => {
                            r.unbind(), n()
                        })));
                        t.srcdoc = e.iframeHTML
                    }
                    var o
                })(e)
            })(e, {
                editorContainer: t.editorContainer,
                iframeContainer: t.iframeContainer
            })
        }, bO = Oa.DOM, vO = e => "-" === e.charAt(0), yO = (e, t, n) => I.from(t).filter((e => Ge(e) && !iw.has(e))).map((t => ({
            url: `${e.editorManager.baseURL}/icons/${t}/icons${n}.js`,
            name: I.some(t)
        }))), CO = (e, t) => {
            const n = Ba.ScriptLoader,
                o = () => {
                    !e.removed && (e => {
                        const t = ad(e);
                        return !m(t) || C(bw.get(t))
                    })(e) && (e => {
                        const t = ld(e);
                        return C(lw.get(t))
                    })(e) && hO(e)
                };
            ((e, t) => {
                const n = ad(e);
                if (m(n) && !vO(n) && !ke(bw.urls, n)) {
                    const o = id(e),
                        r = o ? e.documentBaseURI.toAbsolute(o) : `themes/${n}/theme${t}.js`;
                    bw.load(n, r).catch((() => {
                        ((e, t, n) => {
                            ww(e, "ThemeLoadError", xw("theme", t, n))
                        })(e, r, n)
                    }))
                }
            })(e, t), ((e, t) => {
                const n = ld(e);
                if ("plugin" !== n && !ke(lw.urls, n)) {
                    const o = dd(e),
                        r = m(o) ? e.documentBaseURI.toAbsolute(o) : `models/${n}/model${t}.js`;
                    lw.load(n, r).catch((() => {
                        ((e, t, n) => {
                            ww(e, "ModelLoadError", xw("model", t, n))
                        })(e, r, n)
                    }))
                }
            })(e, t), ((e, t) => {
                const n = Wl(t),
                    o = Kl(t);
                if (!Ia.hasCode(n) && "en" !== n) {
                    const r = Ge(o) ? o : `${t.editorManager.baseURL}/langs/${n}.js`;
                    e.add(r).catch((() => {
                        ((e, t, n) => {
                            ww(e, "LanguageLoadError", xw("language", t, n))
                        })(t, r, n)
                    }))
                }
            })(n, e), ((e, t, n) => {
                const o = yO(t, "default", n),
                    r = (e => I.from(Ul(e)).filter(Ge).map((e => ({
                        url: e,
                        name: I.none()
                    }))))(t).orThunk((() => yO(t, Fl(t), "")));
                q((e => {
                    const t = [],
                        n = e => {
                            t.push(e)
                        };
                    for (let t = 0; t < e.length; t++) e[t].each(n);
                    return t
                })([o, r]), (n => {
                    e.add(n.url).catch((() => {
                        ((e, t, n) => {
                            ww(e, "IconsLoadError", xw("icons", t, n))
                        })(t, n.url, n.name.getOrUndefined())
                    }))
                }))
            })(n, e, t), ((e, t) => {
                const n = (t, n) => {
                    hw.load(t, n).catch((() => {
                        ((e, t, n) => {
                            ww(e, "PluginLoadError", xw("plugin", t, n))
                        })(e, n, t)
                    }))
                };
                ge(Nd(e), ((t, o) => {
                    n(o, t), e.options.set("plugins", _d(e).concat(o))
                })), q(_d(e), (e => {
                    !(e = Dt.trim(e)) || hw.urls[e] || vO(e) || n(e, `plugins/${e}/plugin${t}.js`)
                }))
            })(e, t), n.loadQueue().then(o, o)
        }, wO = xt().deviceType, xO = wO.isPhone(), kO = wO.isTablet(), EO = e => {
            if (y(e)) return [];
            {
                const t = p(e) ? e : e.split(/[ ,]/),
                    n = V(t, qe);
                return G(n, Ge)
            }
        }, SO = (e, t) => {
            const n = ((t, n) => {
                const o = {},
                    r = {};
                return ve(t, ((t, n) => H(e, n)), be(o), be(r)), {
                    t: o,
                    f: r
                }
            })(t);
            return o = n.t, r = n.f, {
                sections: N(o),
                options: N(r)
            };
            var o, r
        }, _O = (e, t) => ke(e.sections(), t), NO = (e, t) => ({
            table_grid: !1,
            object_resizing: !1,
            resize: !1,
            toolbar_mode: xe(e, "toolbar_mode").getOr("scrolling"),
            toolbar_sticky: !1,
            ...t ? {
                menubar: !1
            } : {}
        }), RO = (e, t) => {
            var n;
            const o = null !== (n = t.external_plugins) && void 0 !== n ? n : {};
            return e && e.external_plugins ? Dt.extend({}, e.external_plugins, o) : o
        }, AO = (e, t, n, o, r) => {
            var s;
            const a = e ? {
                    mobile: NO(null !== (s = r.mobile) && void 0 !== s ? s : {}, t)
                } : {},
                i = SO(["mobile"], PS(a, r)),
                l = Dt.extend(n, o, i.options(), ((e, t) => e && _O(t, "mobile"))(e, i) ? ((e, t, n = {}) => {
                    const o = e.sections(),
                        r = xe(o, t).getOr({});
                    return Dt.extend({}, n, r)
                })(i, "mobile") : {}, {
                    external_plugins: RO(o, i.options())
                });
            return ((e, t, n, o) => {
                const r = EO(n.forced_plugins),
                    s = EO(o.plugins),
                    a = ((e, t) => _O(e, t) ? e.sections()[t] : {})(t, "mobile"),
                    i = ((e, t, n, o) => e && _O(t, "mobile") ? o : n)(e, t, s, a.plugins ? EO(a.plugins) : s),
                    l = ((e, t) => [...EO(e), ...EO(t)])(r, i);
                return Dt.extend(o, {
                    forced_plugins: r,
                    plugins: l
                })
            })(e, i, o, l)
        }, OO = e => {
            (e => {
                const t = t => () => {
                    q("left,center,right,justify".split(","), (n => {
                        t !== n && e.formatter.remove("align" + n)
                    })), "none" !== t && ((t, n) => {
                        e.formatter.toggle(t, void 0), e.nodeChanged()
                    })("align" + t)
                };
                e.editorCommands.addCommands({
                    JustifyLeft: t("left"),
                    JustifyCenter: t("center"),
                    JustifyRight: t("right"),
                    JustifyFull: t("justify"),
                    JustifyNone: t("none")
                })
            })(e), (e => {
                const t = t => () => {
                    const n = e.selection,
                        o = n.isCollapsed() ? [e.dom.getParent(n.getNode(), e.dom.isBlock)] : n.getSelectedBlocks();
                    return $(o, (n => C(e.formatter.matchNode(n, t))))
                };
                e.editorCommands.addCommands({
                    JustifyLeft: t("alignleft"),
                    JustifyCenter: t("aligncenter"),
                    JustifyRight: t("alignright"),
                    JustifyFull: t("alignjustify")
                }, "state")
            })(e)
        }, TO = (e, t) => {
            const n = e.selection,
                o = e.dom;
            return /^ | $/.test(t) ? ((e, t, n) => {
                const o = vn(e.getRoot());
                return n = Fp(o, Mi.fromRangeStart(t)) ? n.replace(/^ /, "&nbsp;") : n.replace(/^&nbsp;/, " "), Up(o, Mi.fromRangeEnd(t)) ? n.replace(/(&nbsp;| )(<br( \/)>)?$/, "&nbsp;") : n.replace(/&nbsp;(<br( \/)?>)?$/, " ")
            })(o, n.getRng(), t) : t
        }, BO = (e, t) => {
            if (e.selection.isEditable()) {
                const {
                    content: n,
                    details: o
                } = (e => {
                    if ("string" != typeof e) {
                        const t = Dt.extend({
                            paste: e.paste,
                            data: {
                                paste: e.paste
                            }
                        }, e);
                        return {
                            content: e.content,
                            details: t
                        }
                    }
                    return {
                        content: e,
                        details: {}
                    }
                })(t);
                aC(e, {
                    ...o,
                    content: TO(e, n),
                    format: "html",
                    set: !1,
                    selection: !0
                }).each((t => {
                    const n = ((e, t, n) => MC(e).editor.insertContent(t, n))(e, t.content, o);
                    iC(e, n, t), e.addVisual()
                }))
            }
        }, DO = {
            "font-size": "size",
            "font-family": "face"
        }, PO = Yt("font"), LO = e => (t, n) => I.from(n).map(vn).filter(qt).bind((n => ((e, t, n) => bb(vn(n), (t => (t => co(t, e).orThunk((() => PO(t) ? xe(DO, e).bind((e => en(t, e))) : I.none())))(t)), (e => kn(vn(t), e))))(e, t, n.dom).or(((e, t) => I.from(Oa.DOM.getStyle(t, e, !0)))(e, n.dom)))).getOr(""), MO = LO("font-size"), IO = S((e => e.replace(/[\'\"\\]/g, "").replace(/,\s+/g, ",")), LO("font-family")), FO = e => Cu(e.getBody()).bind((e => {
            const t = e.container();
            return I.from(Xo(t) ? t.parentNode : t)
        })), UO = (e, t) => ((e, t) => (e => I.from(e.selection.getRng()).bind((t => {
            const n = e.getBody();
            return t.startContainer === n && 0 === t.startOffset ? I.none() : I.from(e.selection.getStart(!0))
        })))(e).orThunk(O(FO, e)).map(vn).filter(qt).bind(t))(e, _(I.some, t)), zO = (e, t) => {
            if (/^[0-9.]+$/.test(t)) {
                const n = parseInt(t, 10);
                if (n >= 1 && n <= 7) {
                    const o = (e => Dt.explode(e.options.get("font_size_style_values")))(e),
                        r = (e => Dt.explode(e.options.get("font_size_classes")))(e);
                    return r.length > 0 ? r[n - 1] || t : o[n - 1] || t
                }
                return t
            }
            return t
        }, jO = e => {
            const t = e.split(/\s*,\s*/);
            return V(t, (e => -1 === e.indexOf(" ") || He(e, '"') || He(e, "'") ? e : `'${e}'`)).join(",")
        }, HO = e => {
            OO(e), (e => {
                e.editorCommands.addCommands({
                    "Cut,Copy,Paste": t => {
                        const n = e.getDoc();
                        let o;
                        try {
                            n.execCommand(t)
                        } catch (e) {
                            o = !0
                        }
                        if ("paste" !== t || n.queryCommandEnabled(t) || (o = !0), o || !n.queryCommandSupported(t)) {
                            let t = e.translate("Your browser doesn't support direct access to the clipboard. Please use the Ctrl+X/C/V keyboard shortcuts instead.");
                            (At.os.isMacOS() || At.os.isiOS()) && (t = t.replace(/Ctrl\+/g, "\u2318+")), e.notificationManager.open({
                                text: t,
                                type: "error"
                            })
                        }
                    }
                })
            })(e), (e => {
                e.editorCommands.addCommands({
                    mceAddUndoLevel: () => {
                        e.undoManager.add()
                    },
                    mceEndUndoLevel: () => {
                        e.undoManager.add()
                    },
                    Undo: () => {
                        e.undoManager.undo()
                    },
                    Redo: () => {
                        e.undoManager.redo()
                    }
                })
            })(e), (e => {
                e.editorCommands.addCommands({
                    mceSelectNodeDepth: (t, n, o) => {
                        let r = 0;
                        e.dom.getParent(e.selection.getNode(), (t => !jo(t) || r++ !== o || (e.selection.select(t), !1)), e.getBody())
                    },
                    mceSelectNode: (t, n, o) => {
                        e.selection.select(o)
                    },
                    selectAll: () => {
                        const t = e.dom.getParent(e.selection.getStart(), rr);
                        if (t) {
                            const n = e.dom.createRng();
                            n.selectNodeContents(t), e.selection.setRng(n)
                        }
                    }
                })
            })(e), (e => {
                e.editorCommands.addCommands({
                    mceCleanup: () => {
                        const t = e.selection.getBookmark();
                        e.setContent(e.getContent()), e.selection.moveToBookmark(t)
                    },
                    insertImage: (t, n, o) => {
                        BO(e, e.dom.createHTML("img", {
                            src: o
                        }))
                    },
                    insertHorizontalRule: () => {
                        e.execCommand("mceInsertContent", !1, "<hr>")
                    },
                    insertText: (t, n, o) => {
                        BO(e, e.dom.encode(o))
                    },
                    insertHTML: (t, n, o) => {
                        BO(e, o)
                    },
                    mceInsertContent: (t, n, o) => {
                        BO(e, o)
                    },
                    mceSetContent: (t, n, o) => {
                        e.setContent(o)
                    },
                    mceReplaceContent: (t, n, o) => {
                        e.execCommand("mceInsertContent", !1, o.replace(/\{\$selection\}/g, e.selection.getContent({
                            format: "text"
                        })))
                    },
                    mceNewDocument: () => {
                        e.setContent($d(e))
                    }
                })
            })(e), (e => {
                const t = (t, n, o) => {
                    const r = m(o) ? {
                            href: o
                        } : o,
                        s = e.dom.getParent(e.selection.getNode(), "a");
                    f(r) && m(r.href) && (r.href = r.href.replace(/ /g, "%20"), s && r.href || e.formatter.remove("link"), r.href && e.formatter.apply("link", r, s))
                };
                e.editorCommands.addCommands({
                    unlink: () => {
                        if (e.selection.isEditable()) {
                            if (e.selection.isCollapsed()) {
                                const t = e.dom.getParent(e.selection.getStart(), "a");
                                return void(t && e.dom.remove(t, !0))
                            }
                            e.formatter.remove("link")
                        }
                    },
                    mceInsertLink: t,
                    createLink: t
                })
            })(e), (e => {
                e.editorCommands.addCommands({
                    Indent: () => {
                        (e => {
                            cE(e, "indent")
                        })(e)
                    },
                    Outdent: () => {
                        uE(e)
                    }
                }), e.editorCommands.addCommands({
                    Outdent: () => iE(e)
                }, "state")
            })(e), (e => {
                e.editorCommands.addCommands({
                    insertParagraph: () => {
                        vN(X_, e)
                    },
                    mceInsertNewLine: (t, n, o) => {
                        yN(e, o)
                    },
                    InsertLineBreak: (t, n, o) => {
                        vN(rN, e)
                    }
                })
            })(e), (e => {
                (e => {
                    e.editorCommands.addCommands({
                        "InsertUnorderedList,InsertOrderedList": t => {
                            e.getDoc().execCommand(t);
                            const n = e.dom.getParent(e.selection.getNode(), "ol,ul");
                            if (n) {
                                const t = n.parentNode;
                                if (t && /^(H[1-6]|P|ADDRESS|PRE)$/.test(t.nodeName)) {
                                    const o = e.selection.getBookmark();
                                    e.dom.split(t, n), e.selection.moveToBookmark(o)
                                }
                            }
                        }
                    })
                })(e), (e => {
                    e.editorCommands.addCommands({
                        "InsertUnorderedList,InsertOrderedList": t => {
                            const n = e.dom.getParent(e.selection.getNode(), "ul,ol");
                            return n && ("insertunorderedlist" === t && "UL" === n.tagName || "insertorderedlist" === t && "OL" === n.tagName)
                        }
                    }, "state")
                })(e)
            })(e), (e => {
                (e => {
                    const t = (t, n) => {
                        e.formatter.toggle(t, n), e.nodeChanged()
                    };
                    e.editorCommands.addCommands({
                        "Bold,Italic,Underline,Strikethrough,Superscript,Subscript": e => {
                            t(e)
                        },
                        "ForeColor,HiliteColor": (e, n, o) => {
                            t(e, {
                                value: o
                            })
                        },
                        BackColor: (e, n, o) => {
                            t("hilitecolor", {
                                value: o
                            })
                        },
                        FontName: (t, n, o) => {
                            ((e, t) => {
                                const n = zO(e, t);
                                e.formatter.toggle("fontname", {
                                    value: jO(n)
                                }), e.nodeChanged()
                            })(e, o)
                        },
                        FontSize: (t, n, o) => {
                            ((e, t) => {
                                e.formatter.toggle("fontsize", {
                                    value: zO(e, t)
                                }), e.nodeChanged()
                            })(e, o)
                        },
                        LineHeight: (t, n, o) => {
                            ((e, t) => {
                                e.formatter.toggle("lineheight", {
                                    value: String(t)
                                }), e.nodeChanged()
                            })(e, o)
                        },
                        Lang: (e, n, o) => {
                            var r;
                            t(e, {
                                value: o.code,
                                customValue: null !== (r = o.customCode) && void 0 !== r ? r : null
                            })
                        },
                        RemoveFormat: t => {
                            e.formatter.remove(t)
                        },
                        mceBlockQuote: () => {
                            t("blockquote")
                        },
                        FormatBlock: (e, n, o) => {
                            t(m(o) ? o : "p")
                        },
                        mceToggleFormat: (e, n, o) => {
                            t(o)
                        }
                    })
                })(e), (e => {
                    const t = t => e.formatter.match(t);
                    e.editorCommands.addCommands({
                        "Bold,Italic,Underline,Strikethrough,Superscript,Subscript": e => t(e),
                        mceBlockQuote: () => t("blockquote")
                    }, "state"), e.editorCommands.addQueryValueHandler("FontName", (() => (e => UO(e, (t => IO(e.getBody(), t.dom))).getOr(""))(e))), e.editorCommands.addQueryValueHandler("FontSize", (() => (e => UO(e, (t => MO(e.getBody(), t.dom))).getOr(""))(e))), e.editorCommands.addQueryValueHandler("LineHeight", (() => (e => UO(e, (t => {
                        const n = vn(e.getBody()),
                            o = bb(t, (e => co(e, "line-height")), O(kn, n));
                        return o.getOrThunk((() => {
                            const e = parseFloat(io(t, "line-height")),
                                n = parseFloat(io(t, "font-size"));
                            return String(e / n)
                        }))
                    })).getOr(""))(e)))
                })(e)
            })(e), (e => {
                e.editorCommands.addCommands({
                    mceRemoveNode: (t, n, o) => {
                        const r = null != o ? o : e.selection.getNode();
                        if (r !== e.getBody()) {
                            const t = e.selection.getBookmark();
                            e.dom.remove(r, !0), e.selection.moveToBookmark(t)
                        }
                    },
                    mcePrint: () => {
                        e.getWin().print()
                    },
                    mceFocus: (t, n, o) => {
                        ((e, t) => {
                            e.removed || (t ? Eg(e) : (e => {
                                const t = e.selection,
                                    n = e.getBody();
                                let o = t.getRng();
                                e.quirks.refreshContentEditable(), C(e.bookmark) && !kg(e) && ug(e).each((t => {
                                    e.selection.setRng(t), o = t
                                }));
                                const r = ((e, t) => e.dom.getParent(t, (t => "true" === e.dom.getContentEditable(t))))(e, t.getNode());
                                if (r && e.dom.isChildOf(r, n)) return xg(r), wg(e, o), void Eg(e);
                                e.inline || (At.browser.isOpera() || xg(n), e.getWin().focus()), (At.browser.isFirefox() || e.inline) && (xg(n), wg(e, o)), Eg(e)
                            })(e))
                        })(e, !0 === o)
                    },
                    mceToggleVisualAid: () => {
                        e.hasVisual = !e.hasVisual, e.addVisual()
                    }
                })
            })(e)
        }, $O = ["toggleview"], VO = e => H($O, e.toLowerCase());
    class qO {
        constructor(e) {
            this.commands = {
                state: {},
                exec: {},
                value: {}
            }, this.editor = e
        }
        execCommand(e, t = !1, n, o) {
            const r = this.editor,
                s = e.toLowerCase(),
                a = null == o ? void 0 : o.skip_focus;
            if (r.removed) return !1;
            if ("mcefocus" !== s && (/^(mceAddUndoLevel|mceEndUndoLevel)$/i.test(s) || a ? (e => {
                    ug(e).each((t => e.selection.setRng(t)))
                })(r) : r.focus()), r.dispatch("BeforeExecCommand", {
                    command: e,
                    ui: t,
                    value: n
                }).isDefaultPrevented()) return !1;
            const i = this.commands.exec[s];
            return !!w(i) && (i(s, t, n), r.dispatch("ExecCommand", {
                command: e,
                ui: t,
                value: n
            }), !0)
        }
        queryCommandState(e) {
            if (!VO(e) && this.editor.quirks.isHidden() || this.editor.removed) return !1;
            const t = e.toLowerCase(),
                n = this.commands.state[t];
            return !!w(n) && n(t)
        }
        queryCommandValue(e) {
            if (!VO(e) && this.editor.quirks.isHidden() || this.editor.removed) return "";
            const t = e.toLowerCase(),
                n = this.commands.value[t];
            return w(n) ? n(t) : ""
        }
        addCommands(e, t = "exec") {
            const n = this.commands;
            ge(e, ((e, o) => {
                q(o.toLowerCase().split(","), (o => {
                    n[t][o] = e
                }))
            }))
        }
        addCommand(e, t, n) {
            const o = e.toLowerCase();
            this.commands.exec[o] = (e, o, r) => t.call(null != n ? n : this.editor, o, r)
        }
        queryCommandSupported(e) {
            const t = e.toLowerCase();
            return !!this.commands.exec[t]
        }
        addQueryStateHandler(e, t, n) {
            this.commands.state[e.toLowerCase()] = () => t.call(null != n ? n : this.editor)
        }
        addQueryValueHandler(e, t, n) {
            this.commands.value[e.toLowerCase()] = () => t.call(null != n ? n : this.editor)
        }
    }
    const WO = "data-mce-contenteditable",
        KO = (e, t, n) => {
            try {
                e.getDoc().execCommand(t, !1, String(n))
            } catch (e) {}
        },
        GO = (e, t) => {
            e.dom.contentEditable = t ? "true" : "false"
        },
        YO = (e, t) => {
            const n = vn(e.getBody());
            ((e, t, n) => {
                fn(e, t) && !n ? mn(e, t) : n && cn(e, t)
            })(n, "mce-content-readonly", t), t ? (e.selection.controlSelection.hideResizeRect(), e._selectionOverrides.hideFakeCaret(), (e => {
                I.from(e.selection.getNode()).each((e => {
                    e.removeAttribute("data-mce-selected")
                }))
            })(e), e.readonly = !0, GO(n, !1), q(Mo(n, '*[contenteditable="true"]'), (e => {
                Qt(e, WO, "true"), GO(e, !1)
            }))) : (e.readonly = !1, e.hasEditableRoot() && GO(n, !0), q(Mo(n, `*[${WO}="true"]`), (e => {
                nn(e, WO), GO(e, !0)
            })), KO(e, "StyleWithCSS", !1), KO(e, "enableInlineTableEditing", !1), KO(e, "enableObjectResizing", !1), (e => kg(e) || (e => {
                const t = $n(vn(e.getElement()));
                return og(t).filter((t => !hg(t.dom) && bg(e, t.dom))).isSome()
            })(e))(e) && e.focus(), (e => {
                e.selection.setRng(e.selection.getRng())
            })(e), e.nodeChanged())
        },
        XO = e => e.readonly,
        QO = e => {
            e.parser.addAttributeFilter("contenteditable", (t => {
                XO(e) && q(t, (e => {
                    e.attr(WO, e.attr("contenteditable")), e.attr("contenteditable", "false")
                }))
            })), e.serializer.addAttributeFilter(WO, (t => {
                XO(e) && q(t, (e => {
                    e.attr("contenteditable", e.attr(WO))
                }))
            })), e.serializer.addTempAttr(WO)
        },
        JO = ["copy"],
        ZO = Dt.makeMap("focus blur focusin focusout click dblclick mousedown mouseup mousemove mouseover beforepaste paste cut copy selectionchange mouseout mouseenter mouseleave wheel keydown keypress keyup input beforeinput contextmenu dragstart dragend dragover draggesture dragdrop drop drag submit compositionstart compositionend compositionupdate touchstart touchmove touchend touchcancel", " ");
    class eT {
        static isNative(e) {
            return !!ZO[e.toLowerCase()]
        }
        constructor(e) {
            this.bindings = {}, this.settings = e || {}, this.scope = this.settings.scope || this, this.toggleEvent = this.settings.toggleEvent || L
        }
        fire(e, t) {
            return this.dispatch(e, t)
        }
        dispatch(e, t) {
            const n = e.toLowerCase(),
                o = ga(n, null != t ? t : {}, this.scope);
            this.settings.beforeFire && this.settings.beforeFire(o);
            const r = this.bindings[n];
            if (r)
                for (let e = 0, t = r.length; e < t; e++) {
                    const t = r[e];
                    if (!t.removed) {
                        if (t.once && this.off(n, t.func), o.isImmediatePropagationStopped()) return o;
                        if (!1 === t.func.call(this.scope, o)) return o.preventDefault(), o
                    }
                }
            return o
        }
        on(e, t, n, o) {
            if (!1 === t && (t = L), t) {
                const r = {
                    func: t,
                    removed: !1
                };
                o && Dt.extend(r, o);
                const s = e.toLowerCase().split(" ");
                let a = s.length;
                for (; a--;) {
                    const e = s[a];
                    let t = this.bindings[e];
                    t || (t = [], this.toggleEvent(e, !0)), t = n ? [r, ...t] : [...t, r], this.bindings[e] = t
                }
            }
            return this
        }
        off(e, t) {
            if (e) {
                const n = e.toLowerCase().split(" ");
                let o = n.length;
                for (; o--;) {
                    const r = n[o];
                    let s = this.bindings[r];
                    if (!r) return ge(this.bindings, ((e, t) => {
                        this.toggleEvent(t, !1), delete this.bindings[t]
                    })), this;
                    if (s) {
                        if (t) {
                            const e = K(s, (e => e.func === t));
                            s = e.fail, this.bindings[r] = s, q(e.pass, (e => {
                                e.removed = !0
                            }))
                        } else s.length = 0;
                        s.length || (this.toggleEvent(e, !1), delete this.bindings[r])
                    }
                }
            } else ge(this.bindings, ((e, t) => {
                this.toggleEvent(t, !1)
            })), this.bindings = {};
            return this
        }
        once(e, t, n) {
            return this.on(e, t, n, {
                once: !0
            })
        }
        has(e) {
            e = e.toLowerCase();
            const t = this.bindings[e];
            return !(!t || 0 === t.length)
        }
    }
    const tT = e => (e._eventDispatcher || (e._eventDispatcher = new eT({
            scope: e,
            toggleEvent: (t, n) => {
                eT.isNative(t) && e.toggleNativeEvent && e.toggleNativeEvent(t, n)
            }
        })), e._eventDispatcher),
        nT = {
            fire(e, t, n) {
                return this.dispatch(e, t, n)
            },
            dispatch(e, t, n) {
                const o = this;
                if (o.removed && "remove" !== e && "detach" !== e) return ga(e.toLowerCase(), null != t ? t : {}, o);
                const r = tT(o).dispatch(e, t);
                if (!1 !== n && o.parent) {
                    let t = o.parent();
                    for (; t && !r.isPropagationStopped();) t.dispatch(e, r, !1), t = t.parent ? t.parent() : void 0
                }
                return r
            },
            on(e, t, n) {
                return tT(this).on(e, t, n)
            },
            off(e, t) {
                return tT(this).off(e, t)
            },
            once(e, t) {
                return tT(this).once(e, t)
            },
            hasEventListeners(e) {
                return tT(this).has(e)
            }
        },
        oT = Oa.DOM;
    let rT;
    const sT = (e, t) => {
            if ("selectionchange" === t) return e.getDoc();
            if (!e.inline && /^(?:mouse|touch|click|contextmenu|drop|dragover|dragend)/.test(t)) return e.getDoc().documentElement;
            const n = rd(e);
            return n ? (e.eventRoot || (e.eventRoot = oT.select(n)[0]), e.eventRoot) : e.getBody()
        },
        aT = (e, t, n) => {
            (e => !e.hidden && !XO(e))(e) ? e.dispatch(t, n): XO(e) && ((e, t) => {
                if ((e => "click" === e.type)(t) && !tf.metaKeyPressed(t)) {
                    const n = vn(t.target);
                    ((e, t) => eo(t, "a", (t => kn(t, vn(e.getBody())))).bind((e => en(e, "href"))))(e, n).each((n => {
                        if (t.preventDefault(), /^#/.test(n)) {
                            const t = e.dom.select(`${n},[name="${ze(n,"#")}"]`);
                            t.length && e.selection.scrollIntoView(t[0], !0)
                        } else window.open(n, "_blank", "rel=noopener noreferrer,menubar=yes,toolbar=yes,location=yes,status=yes,resizable=yes,scrollbars=yes")
                    }))
                } else(e => H(JO, e.type))(t) && e.dispatch(t.type, t)
            })(e, n)
        },
        iT = (e, t) => {
            if (e.delegates || (e.delegates = {}), e.delegates[t] || e.removed) return;
            const n = sT(e, t);
            if (rd(e)) {
                if (rT || (rT = {}, e.editorManager.on("removeEditor", (() => {
                        e.editorManager.activeEditor || rT && (ge(rT, ((t, n) => {
                            e.dom.unbind(sT(e, n))
                        })), rT = null)
                    }))), rT[t]) return;
                const o = n => {
                    const o = n.target,
                        r = e.editorManager.get();
                    let s = r.length;
                    for (; s--;) {
                        const e = r[s].getBody();
                        (e === o || oT.isChildOf(o, e)) && aT(r[s], t, n)
                    }
                };
                rT[t] = o, oT.bind(n, t, o)
            } else {
                const o = n => {
                    aT(e, t, n)
                };
                oT.bind(n, t, o), e.delegates[t] = o
            }
        },
        lT = {
            ...nT,
            bindPendingEventDelegates() {
                const e = this;
                Dt.each(e._pendingNativeEvents, (t => {
                    iT(e, t)
                }))
            },
            toggleNativeEvent(e, t) {
                const n = this;
                "focus" !== e && "blur" !== e && (n.removed || (t ? n.initialized ? iT(n, e) : n._pendingNativeEvents ? n._pendingNativeEvents.push(e) : n._pendingNativeEvents = [e] : n.initialized && n.delegates && (n.dom.unbind(sT(n, e), e, n.delegates[e]), delete n.delegates[e])))
            },
            unbindAllNativeEvents() {
                const e = this,
                    t = e.getBody(),
                    n = e.dom;
                e.delegates && (ge(e.delegates, ((t, n) => {
                    e.dom.unbind(sT(e, n), n, t)
                })), delete e.delegates), !e.inline && t && n && (t.onload = null, n.unbind(e.getWin()), n.unbind(e.getDoc())), n && (n.unbind(t), n.unbind(e.getContainer()))
            }
        },
        dT = e => m(e) ? {
            value: e.split(/[ ,]/),
            valid: !0
        } : k(e, m) ? {
            value: e,
            valid: !0
        } : {
            valid: !1,
            message: "The value must be a string[] or a comma/space separated string."
        },
        cT = (e, t) => e + (Ye(t.message) ? "" : `. ${t.message}`),
        uT = e => e.valid,
        mT = (e, t, n = "") => {
            const o = t(e);
            return b(o) ? o ? {
                value: e,
                valid: !0
            } : {
                valid: !1,
                message: n
            } : o
        },
        fT = ["design", "readonly"],
        gT = (e, t, n, o) => {
            const r = n[t.get()],
                s = n[o];
            try {
                s.activate()
            } catch (e) {
                return void console.error(`problem while activating editor mode ${o}:`, e)
            }
            r.deactivate(), r.editorReadOnly !== s.editorReadOnly && YO(e, s.editorReadOnly), t.set(o), ((e, t) => {
                e.dispatch("SwitchMode", {
                    mode: t
                })
            })(e, o)
        },
        pT = Dt.each,
        hT = Dt.explode,
        bT = {
            f1: 112,
            f2: 113,
            f3: 114,
            f4: 115,
            f5: 116,
            f6: 117,
            f7: 118,
            f8: 119,
            f9: 120,
            f10: 121,
            f11: 122,
            f12: 123
        },
        vT = Dt.makeMap("alt,ctrl,shift,meta,access"),
        yT = e => {
            const t = {},
                n = At.os.isMacOS() || At.os.isiOS();
            pT(hT(e.toLowerCase(), "+"), (e => {
                (e => e in vT)(e) ? t[e] = !0: /^[0-9]{2,}$/.test(e) ? t.keyCode = parseInt(e, 10) : (t.charCode = e.charCodeAt(0), t.keyCode = bT[e] || e.toUpperCase().charCodeAt(0))
            }));
            const o = [t.keyCode];
            let r;
            for (r in vT) t[r] ? o.push(r) : t[r] = !1;
            return t.id = o.join(","), t.access && (t.alt = !0, n ? t.ctrl = !0 : t.shift = !0), t.meta && (n ? t.meta = !0 : (t.ctrl = !0, t.meta = !1)), t
        };
    class CT {
        constructor(e) {
            this.shortcuts = {}, this.pendingPatterns = [], this.editor = e;
            const t = this;
            e.on("keyup keypress keydown", (e => {
                !t.hasModifier(e) && !t.isFunctionKey(e) || e.isDefaultPrevented() || (pT(t.shortcuts, (n => {
                    t.matchShortcut(e, n) && (t.pendingPatterns = n.subpatterns.slice(0), "keydown" === e.type && t.executeShortcutAction(n))
                })), t.matchShortcut(e, t.pendingPatterns[0]) && (1 === t.pendingPatterns.length && "keydown" === e.type && t.executeShortcutAction(t.pendingPatterns[0]), t.pendingPatterns.shift()))
            }))
        }
        add(e, t, n, o) {
            const r = this,
                s = r.normalizeCommandFunc(n);
            return pT(hT(Dt.trim(e)), (e => {
                const n = r.createShortcut(e, t, s, o);
                r.shortcuts[n.id] = n
            })), !0
        }
        remove(e) {
            const t = this.createShortcut(e);
            return !!this.shortcuts[t.id] && (delete this.shortcuts[t.id], !0)
        }
        normalizeCommandFunc(e) {
            const t = this,
                n = e;
            return "string" == typeof n ? () => {
                t.editor.execCommand(n, !1, null)
            } : Dt.isArray(n) ? () => {
                t.editor.execCommand(n[0], n[1], n[2])
            } : n
        }
        createShortcut(e, t, n, o) {
            const r = Dt.map(hT(e, ">"), yT);
            return r[r.length - 1] = Dt.extend(r[r.length - 1], {
                func: n,
                scope: o || this.editor
            }), Dt.extend(r[0], {
                desc: this.editor.translate(t),
                subpatterns: r.slice(1)
            })
        }
        hasModifier(e) {
            return e.altKey || e.ctrlKey || e.metaKey
        }
        isFunctionKey(e) {
            return "keydown" === e.type && e.keyCode >= 112 && e.keyCode <= 123
        }
        matchShortcut(e, t) {
            return !!t && t.ctrl === e.ctrlKey && t.meta === e.metaKey && t.alt === e.altKey && t.shift === e.shiftKey && !!(e.keyCode === t.keyCode || e.charCode && e.charCode === t.charCode) && (e.preventDefault(), !0)
        }
        executeShortcutAction(e) {
            return e.func ? e.func.call(e.scope) : null
        }
    }
    const wT = () => {
            const e = (() => {
                const e = {},
                    t = {},
                    n = {},
                    o = {},
                    r = {},
                    s = {},
                    a = {},
                    i = {},
                    l = (e, t) => (n, o) => {
                        e[n.toLowerCase()] = {
                            ...o,
                            type: t
                        }
                    };
                return {
                    addButton: l(e, "button"),
                    addGroupToolbarButton: l(e, "grouptoolbarbutton"),
                    addToggleButton: l(e, "togglebutton"),
                    addMenuButton: l(e, "menubutton"),
                    addSplitButton: l(e, "splitbutton"),
                    addMenuItem: l(t, "menuitem"),
                    addNestedMenuItem: l(t, "nestedmenuitem"),
                    addToggleMenuItem: l(t, "togglemenuitem"),
                    addAutocompleter: l(n, "autocompleter"),
                    addContextMenu: l(r, "contextmenu"),
                    addContextToolbar: l(s, "contexttoolbar"),
                    addContextForm: l(s, "contextform"),
                    addSidebar: l(a, "sidebar"),
                    addView: l(i, "views"),
                    addIcon: (e, t) => o[e.toLowerCase()] = t,
                    getAll: () => ({
                        buttons: e,
                        menuItems: t,
                        icons: o,
                        popups: n,
                        contextMenus: r,
                        contextToolbars: s,
                        sidebars: a,
                        views: i
                    })
                }
            })();
            return {
                addAutocompleter: e.addAutocompleter,
                addButton: e.addButton,
                addContextForm: e.addContextForm,
                addContextMenu: e.addContextMenu,
                addContextToolbar: e.addContextToolbar,
                addIcon: e.addIcon,
                addMenuButton: e.addMenuButton,
                addMenuItem: e.addMenuItem,
                addNestedMenuItem: e.addNestedMenuItem,
                addSidebar: e.addSidebar,
                addSplitButton: e.addSplitButton,
                addToggleButton: e.addToggleButton,
                addGroupToolbarButton: e.addGroupToolbarButton,
                addToggleMenuItem: e.addToggleMenuItem,
                addView: e.addView,
                getAll: e.getAll
            }
        },
        xT = Oa.DOM,
        kT = Dt.extend,
        ET = Dt.each;
    class ST {
        constructor(e, t, n) {
            this.plugins = {}, this.contentCSS = [], this.contentStyles = [], this.loadedCSS = {}, this.isNotDirty = !1, this.composing = !1, this.destroyed = !1, this.hasHiddenInput = !1, this.iframeElement = null, this.initialized = !1, this.readonly = !1, this.removed = !1, this.startContent = "", this._pendingNativeEvents = [], this._skinLoaded = !1, this._editableRoot = !0, this.editorManager = n, this.documentBaseUrl = n.documentBaseURL, kT(this, lT);
            const o = this;
            this.id = e, this.hidden = !1;
            const r = ((e, t) => AO(xO || kO, xO, t, e, t))(n.defaultOptions, t);
            this.options = ((e, t) => {
                const n = {},
                    o = {},
                    r = (e, t, n) => {
                        const r = mT(t, n);
                        return uT(r) ? (o[e] = r.value, !0) : (console.warn(cT(`Invalid value passed for the ${e} option`, r)), !1)
                    },
                    s = e => ke(n, e);
                return {
                    register: (e, s) => {
                        const a = (e => m(e.processor))(s) ? (e => {
                                const t = (() => {
                                    switch (e) {
                                        case "array":
                                            return p;
                                        case "boolean":
                                            return b;
                                        case "function":
                                            return w;
                                        case "number":
                                            return x;
                                        case "object":
                                            return f;
                                        case "string":
                                            return m;
                                        case "string[]":
                                            return dT;
                                        case "object[]":
                                            return e => k(e, f);
                                        case "regexp":
                                            return e => u(e, RegExp);
                                        default:
                                            return M
                                    }
                                })();
                                return n => mT(n, t, `The value must be a ${e}.`)
                            })(s.processor) : s.processor,
                            i = ((e, t, n) => {
                                if (!v(t)) {
                                    const o = mT(t, n);
                                    if (uT(o)) return o.value;
                                    console.error(cT(`Invalid default value passed for the "${e}" option`, o))
                                }
                            })(e, s.default, a);
                        n[e] = {
                            ...s,
                            default: i,
                            processor: a
                        }, xe(o, e).orThunk((() => xe(t, e))).each((t => r(e, t, a)))
                    },
                    isRegistered: s,
                    get: e => xe(o, e).orThunk((() => xe(n, e).map((e => e.default)))).getOrUndefined(),
                    set: (e, t) => {
                        if (s(e)) {
                            const o = n[e];
                            return o.immutable ? (console.error(`"${e}" is an immutable option and cannot be updated`), !1) : r(e, t, o.processor)
                        }
                        return console.warn(`"${e}" is not a registered option. Ensure the option has been registered before setting a value.`), !1
                    },
                    unset: e => {
                        const t = s(e);
                        return t && delete o[e], t
                    },
                    isSet: e => ke(o, e)
                }
            })(0, r), (e => {
                const t = e.options.register;
                t("id", {
                    processor: "string",
                    default: e.id
                }), t("selector", {
                    processor: "string"
                }), t("target", {
                    processor: "object"
                }), t("suffix", {
                    processor: "string"
                }), t("cache_suffix", {
                    processor: "string"
                }), t("base_url", {
                    processor: "string"
                }), t("referrer_policy", {
                    processor: "string",
                    default: ""
                }), t("language_load", {
                    processor: "boolean",
                    default: !0
                }), t("inline", {
                    processor: "boolean",
                    default: !1
                }), t("iframe_attrs", {
                    processor: "object",
                    default: {}
                }), t("doctype", {
                    processor: "string",
                    default: "<!DOCTYPE html>"
                }), t("document_base_url", {
                    processor: "string",
                    default: e.documentBaseUrl
                }), t("body_id", {
                    processor: Cl(e, "tinymce"),
                    default: "tinymce"
                }), t("body_class", {
                    processor: Cl(e),
                    default: ""
                }), t("content_security_policy", {
                    processor: "string",
                    default: ""
                }), t("br_in_pre", {
                    processor: "boolean",
                    default: !0
                }), t("forced_root_block", {
                    processor: e => {
                        const t = m(e) && Ge(e);
                        return t ? {
                            value: e,
                            valid: t
                        } : {
                            valid: !1,
                            message: "Must be a non-empty string."
                        }
                    },
                    default: "p"
                }), t("forced_root_block_attrs", {
                    processor: "object",
                    default: {}
                }), t("newline_behavior", {
                    processor: e => {
                        const t = H(["block", "linebreak", "invert", "default"], e);
                        return t ? {
                            value: e,
                            valid: t
                        } : {
                            valid: !1,
                            message: "Must be one of: block, linebreak, invert or default."
                        }
                    },
                    default: "default"
                }), t("br_newline_selector", {
                    processor: "string",
                    default: ".mce-toc h2,figcaption,caption"
                }), t("no_newline_selector", {
                    processor: "string",
                    default: ""
                }), t("keep_styles", {
                    processor: "boolean",
                    default: !0
                }), t("end_container_on_empty_block", {
                    processor: e => b(e) || m(e) ? {
                        valid: !0,
                        value: e
                    } : {
                        valid: !1,
                        message: "Must be boolean or a string"
                    },
                    default: "blockquote"
                }), t("font_size_style_values", {
                    processor: "string",
                    default: "xx-small,x-small,small,medium,large,x-large,xx-large"
                }), t("font_size_legacy_values", {
                    processor: "string",
                    default: "xx-small,small,medium,large,x-large,xx-large,300%"
                }), t("font_size_classes", {
                    processor: "string",
                    default: ""
                }), t("automatic_uploads", {
                    processor: "boolean",
                    default: !0
                }), t("images_reuse_filename", {
                    processor: "boolean",
                    default: !1
                }), t("images_replace_blob_uris", {
                    processor: "boolean",
                    default: !0
                }), t("icons", {
                    processor: "string",
                    default: ""
                }), t("icons_url", {
                    processor: "string",
                    default: ""
                }), t("images_upload_url", {
                    processor: "string",
                    default: ""
                }), t("images_upload_base_path", {
                    processor: "string",
                    default: ""
                }), t("images_upload_credentials", {
                    processor: "boolean",
                    default: !1
                }), t("images_upload_handler", {
                    processor: "function"
                }), t("language", {
                    processor: "string",
                    default: "en"
                }), t("language_url", {
                    processor: "string",
                    default: ""
                }), t("entity_encoding", {
                    processor: "string",
                    default: "named"
                }), t("indent", {
                    processor: "boolean",
                    default: !0
                }), t("indent_before", {
                    processor: "string",
                    default: "p,h1,h2,h3,h4,h5,h6,blockquote,div,title,style,pre,script,td,th,ul,ol,li,dl,dt,dd,area,table,thead,tfoot,tbody,tr,section,details,summary,article,hgroup,aside,figure,figcaption,option,optgroup,datalist"
                }), t("indent_after", {
                    processor: "string",
                    default: "p,h1,h2,h3,h4,h5,h6,blockquote,div,title,style,pre,script,td,th,ul,ol,li,dl,dt,dd,area,table,thead,tfoot,tbody,tr,section,details,summary,article,hgroup,aside,figure,figcaption,option,optgroup,datalist"
                }), t("indent_use_margin", {
                    processor: "boolean",
                    default: !1
                }), t("indentation", {
                    processor: "string",
                    default: "40px"
                }), t("content_css", {
                    processor: e => {
                        const t = !1 === e || m(e) || k(e, m);
                        return t ? m(e) ? {
                            value: V(e.split(","), qe),
                            valid: t
                        } : p(e) ? {
                            value: e,
                            valid: t
                        } : !1 === e ? {
                            value: [],
                            valid: t
                        } : {
                            value: e,
                            valid: t
                        } : {
                            valid: !1,
                            message: "Must be false, a string or an array of strings."
                        }
                    },
                    default: hd(e) ? [] : ["default"]
                }), t("content_style", {
                    processor: "string"
                }), t("content_css_cors", {
                    processor: "boolean",
                    default: !1
                }), t("font_css", {
                    processor: e => {
                        const t = m(e) || k(e, m);
                        return t ? {
                            value: p(e) ? e : V(e.split(","), qe),
                            valid: t
                        } : {
                            valid: !1,
                            message: "Must be a string or an array of strings."
                        }
                    },
                    default: []
                }), t("inline_boundaries", {
                    processor: "boolean",
                    default: !0
                }), t("inline_boundaries_selector", {
                    processor: "string",
                    default: "a[href],code,span.mce-annotation"
                }), t("object_resizing", {
                    processor: e => {
                        const t = b(e) || m(e);
                        return t ? !1 === e || gl.isiPhone() || gl.isiPad() ? {
                            value: "",
                            valid: t
                        } : {
                            value: !0 === e ? "table,img,figure.image,div,video,iframe" : e,
                            valid: t
                        } : {
                            valid: !1,
                            message: "Must be boolean or a string"
                        }
                    },
                    default: !pl
                }), t("resize_img_proportional", {
                    processor: "boolean",
                    default: !0
                }), t("event_root", {
                    processor: "object"
                }), t("service_message", {
                    processor: "string"
                }), t("theme", {
                    processor: e => !1 === e || m(e) || w(e),
                    default: "silver"
                }), t("theme_url", {
                    processor: "string"
                }), t("formats", {
                    processor: "object"
                }), t("format_empty_lines", {
                    processor: "boolean",
                    default: !1
                }), t("format_noneditable_selector", {
                    processor: "string",
                    default: ""
                }), t("preview_styles", {
                    processor: e => {
                        const t = !1 === e || m(e);
                        return t ? {
                            value: !1 === e ? "" : e,
                            valid: t
                        } : {
                            valid: !1,
                            message: "Must be false or a string"
                        }
                    },
                    default: "font-family font-size font-weight font-style text-decoration text-transform color background-color border border-radius outline text-shadow"
                }), t("custom_ui_selector", {
                    processor: "string",
                    default: ""
                }), t("hidden_input", {
                    processor: "boolean",
                    default: !0
                }), t("submit_patch", {
                    processor: "boolean",
                    default: !0
                }), t("encoding", {
                    processor: "string"
                }), t("add_form_submit_trigger", {
                    processor: "boolean",
                    default: !0
                }), t("add_unload_trigger", {
                    processor: "boolean",
                    default: !0
                }), t("custom_undo_redo_levels", {
                    processor: "number",
                    default: 0
                }), t("disable_nodechange", {
                    processor: "boolean",
                    default: !1
                }), t("readonly", {
                    processor: "boolean",
                    default: !1
                }), t("editable_root", {
                    processor: "boolean",
                    default: !0
                }), t("plugins", {
                    processor: "string[]",
                    default: []
                }), t("external_plugins", {
                    processor: "object"
                }), t("forced_plugins", {
                    processor: "string[]"
                }), t("model", {
                    processor: "string",
                    default: e.hasPlugin("rtc") ? "plugin" : "dom"
                }), t("model_url", {
                    processor: "string"
                }), t("block_unsupported_drop", {
                    processor: "boolean",
                    default: !0
                }), t("visual", {
                    processor: "boolean",
                    default: !0
                }), t("visual_table_class", {
                    processor: "string",
                    default: "mce-item-table"
                }), t("visual_anchor_class", {
                    processor: "string",
                    default: "mce-item-anchor"
                }), t("iframe_aria_text", {
                    processor: "string",
                    default: "Rich Text Area. Press ALT-0 for help."
                }), t("setup", {
                    processor: "function"
                }), t("init_instance_callback", {
                    processor: "function"
                }), t("url_converter", {
                    processor: "function",
                    default: e.convertURL
                }), t("url_converter_scope", {
                    processor: "object",
                    default: e
                }), t("urlconverter_callback", {
                    processor: "function"
                }), t("allow_conditional_comments", {
                    processor: "boolean",
                    default: !1
                }), t("allow_html_data_urls", {
                    processor: "boolean",
                    default: !1
                }), t("allow_svg_data_urls", {
                    processor: "boolean"
                }), t("allow_html_in_named_anchor", {
                    processor: "boolean",
                    default: !1
                }), t("allow_script_urls", {
                    processor: "boolean",
                    default: !1
                }), t("allow_unsafe_link_target", {
                    processor: "boolean",
                    default: !1
                }), t("convert_fonts_to_spans", {
                    processor: "boolean",
                    default: !0,
                    deprecated: !0
                }), t("fix_list_elements", {
                    processor: "boolean",
                    default: !1
                }), t("preserve_cdata", {
                    processor: "boolean",
                    default: !1
                }), t("remove_trailing_brs", {
                    processor: "boolean",
                    default: !0
                }), t("inline_styles", {
                    processor: "boolean",
                    default: !0,
                    deprecated: !0
                }), t("element_format", {
                    processor: "string",
                    default: "html"
                }), t("entities", {
                    processor: "string"
                }), t("schema", {
                    processor: "string",
                    default: "html5"
                }), t("convert_urls", {
                    processor: "boolean",
                    default: !0
                }), t("relative_urls", {
                    processor: "boolean",
                    default: !0
                }), t("remove_script_host", {
                    processor: "boolean",
                    default: !0
                }), t("custom_elements", {
                    processor: "string"
                }), t("extended_valid_elements", {
                    processor: "string"
                }), t("invalid_elements", {
                    processor: "string"
                }), t("invalid_styles", {
                    processor: yl
                }), t("valid_children", {
                    processor: "string"
                }), t("valid_classes", {
                    processor: yl
                }), t("valid_elements", {
                    processor: "string"
                }), t("valid_styles", {
                    processor: yl
                }), t("verify_html", {
                    processor: "boolean",
                    default: !0
                }), t("auto_focus", {
                    processor: e => m(e) || !0 === e
                }), t("browser_spellcheck", {
                    processor: "boolean",
                    default: !1
                }), t("protect", {
                    processor: "array"
                }), t("images_file_types", {
                    processor: "string",
                    default: "jpeg,jpg,jpe,jfi,jif,jfif,png,gif,bmp,webp"
                }), t("deprecation_warnings", {
                    processor: "boolean",
                    default: !0
                }), t("a11y_advanced_options", {
                    processor: "boolean",
                    default: !1
                }), t("api_key", {
                    processor: "string"
                }), t("paste_block_drop", {
                    processor: "boolean",
                    default: !1
                }), t("paste_data_images", {
                    processor: "boolean",
                    default: !0
                }), t("paste_preprocess", {
                    processor: "function"
                }), t("paste_postprocess", {
                    processor: "function"
                }), t("paste_webkit_styles", {
                    processor: "string",
                    default: "none"
                }), t("paste_remove_styles_if_webkit", {
                    processor: "boolean",
                    default: !0
                }), t("paste_merge_formats", {
                    processor: "boolean",
                    default: !0
                }), t("smart_paste", {
                    processor: "boolean",
                    default: !0
                }), t("paste_as_text", {
                    processor: "boolean",
                    default: !1
                }), t("paste_tab_spaces", {
                    processor: "number",
                    default: 4
                }), t("text_patterns", {
                    processor: e => k(e, f) || !1 === e ? {
                        value: fl(!1 === e ? [] : e),
                        valid: !0
                    } : {
                        valid: !1,
                        message: "Must be an array of objects or false."
                    },
                    default: [{
                        start: "*",
                        end: "*",
                        format: "italic"
                    }, {
                        start: "**",
                        end: "**",
                        format: "bold"
                    }, {
                        start: "#",
                        format: "h1"
                    }, {
                        start: "##",
                        format: "h2"
                    }, {
                        start: "###",
                        format: "h3"
                    }, {
                        start: "####",
                        format: "h4"
                    }, {
                        start: "#####",
                        format: "h5"
                    }, {
                        start: "######",
                        format: "h6"
                    }, {
                        start: "1. ",
                        cmd: "InsertOrderedList"
                    }, {
                        start: "* ",
                        cmd: "InsertUnorderedList"
                    }, {
                        start: "- ",
                        cmd: "InsertUnorderedList"
                    }]
                }), t("text_patterns_lookup", {
                    processor: e => {
                        return w(e) ? {
                            value: (t = e, e => {
                                const n = t(e);
                                return fl(n)
                            }),
                            valid: !0
                        } : {
                            valid: !1,
                            message: "Must be a single function"
                        };
                        var t
                    },
                    default: e => []
                }), t("noneditable_class", {
                    processor: "string",
                    default: "mceNonEditable"
                }), t("editable_class", {
                    processor: "string",
                    default: "mceEditable"
                }), t("noneditable_regexp", {
                    processor: e => k(e, bl) ? {
                        value: e,
                        valid: !0
                    } : bl(e) ? {
                        value: [e],
                        valid: !0
                    } : {
                        valid: !1,
                        message: "Must be a RegExp or an array of RegExp."
                    },
                    default: []
                }), t("table_tab_navigation", {
                    processor: "boolean",
                    default: !0
                }), t("highlight_on_focus", {
                    processor: "boolean",
                    default: !1
                }), t("xss_sanitization", {
                    processor: "boolean",
                    default: !0
                }), t("details_initial_state", {
                    processor: e => {
                        const t = H(["inherited", "collapsed", "expanded"], e);
                        return t ? {
                            value: e,
                            valid: t
                        } : {
                            valid: !1,
                            message: "Must be one of: inherited, collapsed, or expanded."
                        }
                    },
                    default: "inherited"
                }), t("details_serialized_state", {
                    processor: e => {
                        const t = H(["inherited", "collapsed", "expanded"], e);
                        return t ? {
                            value: e,
                            valid: t
                        } : {
                            valid: !1,
                            message: "Must be one of: inherited, collapsed, or expanded."
                        }
                    },
                    default: "inherited"
                }), t("init_content_sync", {
                    processor: "boolean",
                    default: !1
                }), t("newdocument_content", {
                    processor: "string",
                    default: ""
                }), e.on("ScriptsLoaded", (() => {
                    t("directionality", {
                        processor: "string",
                        default: Ia.isRtl() ? "rtl" : void 0
                    }), t("placeholder", {
                        processor: "string",
                        default: hl.getAttrib(e.getElement(), "placeholder")
                    })
                }))
            })(o);
            const s = this.options.get;
            s("deprecation_warnings") && ((e, t) => {
                ((e, t) => {
                    const n = ZC(e),
                        o = nw(t),
                        r = o.length > 0,
                        s = n.length > 0,
                        a = "mobile" === t.theme;
                    if (r || s || a) {
                        const e = "\n- ",
                            t = a ? `\n\nThemes:${e}mobile` : "",
                            i = r ? `\n\nPlugins:${e}${o.join(e)}` : "",
                            l = s ? `\n\nOptions:${e}${n.join(e)}` : "";
                        console.warn("The following deprecated features are currently enabled and have been removed in TinyMCE 6.0. These features will no longer work and should be removed from the TinyMCE configuration. See https://www.tiny.cloud/docs/tinymce/6/migration-from-5x/ for more information." + t + i + l)
                    }
                })(e, t), ((e, t) => {
                    const n = ew(e),
                        o = ow(t),
                        r = o.length > 0,
                        s = n.length > 0;
                    if (r || s) {
                        const e = "\n- ",
                            t = r ? `\n\nPlugins:${e}${o.map(rw).join(e)}` : "",
                            a = s ? `\n\nOptions:${e}${n.join(e)}` : "";
                        console.warn("The following deprecated features are currently enabled but will be removed soon." + t + a)
                    }
                })(e, t)
            })(t, r);
            const a = s("suffix");
            a && (n.suffix = a), this.suffix = n.suffix;
            const i = s("base_url");
            i && n._setBaseUrl(i), this.baseUri = n.baseURI;
            const l = ql(o);
            l && (Ba.ScriptLoader._setReferrerPolicy(l), Oa.DOM.styleSheetLoader._setReferrerPolicy(l));
            const d = Sd(o);
            C(d) && Oa.DOM.styleSheetLoader._setContentCssCors(d), Fa.languageLoad = s("language_load"), Fa.baseURL = n.baseURL, this.setDirty(!1), this.documentBaseURI = new $y(kl(o), {
                base_uri: this.baseUri
            }), this.baseURI = this.baseUri, this.inline = hd(o), this.hasVisual = Ad(o), this.shortcuts = new CT(this), this.editorCommands = new qO(this), HO(this);
            const c = s("cache_suffix");
            c && (At.cacheSuffix = c.replace(/^[\?\&]+/, "")), this.ui = {
                registry: wT(),
                styleSheetLoader: void 0,
                show: E,
                hide: E,
                setEnabled: E,
                isEnabled: M
            }, this.mode = (e => {
                const t = Da("design"),
                    n = Da({
                        design: {
                            activate: E,
                            deactivate: E,
                            editorReadOnly: !1
                        },
                        readonly: {
                            activate: E,
                            deactivate: E,
                            editorReadOnly: !0
                        }
                    });
                return (e => {
                    e.serializer ? QO(e) : e.on("PreInit", (() => {
                        QO(e)
                    }))
                })(e), (e => {
                    e.on("ShowCaret", (t => {
                        XO(e) && t.preventDefault()
                    })), e.on("ObjectSelected", (t => {
                        XO(e) && t.preventDefault()
                    }))
                })(e), {
                    isReadOnly: () => XO(e),
                    set: o => ((e, t, n, o) => {
                        if (o !== n.get()) {
                            if (!ke(t, o)) throw new Error(`Editor mode '${o}' is invalid`);
                            e.initialized ? gT(e, n, t, o) : e.on("init", (() => gT(e, n, t, o)))
                        }
                    })(e, n.get(), t, o),
                    get: () => t.get(),
                    register: (e, t) => {
                        n.set(((e, t, n) => {
                            if (H(fT, t)) throw new Error(`Cannot override default mode ${t}`);
                            return {
                                ...e,
                                [t]: {
                                    ...n,
                                    deactivate: () => {
                                        try {
                                            n.deactivate()
                                        } catch (e) {
                                            console.error(`problem while deactivating editor mode ${t}:`, e)
                                        }
                                    }
                                }
                            }
                        })(n.get(), e, t))
                    }
                }
            })(o), n.dispatch("SetupEditor", {
                editor: this
            });
            const g = Dd(o);
            w(g) && g.call(o, o)
        }
        render() {
            (e => {
                const t = e.id;
                Ia.setCode(Wl(e));
                const n = () => {
                    bO.unbind(window, "ready", n), e.render()
                };
                if (!Ca.Event.domLoaded) return void bO.bind(window, "ready", n);
                if (!e.getElement()) return;
                const o = vn(e.getElement()),
                    r = on(o);
                e.on("remove", (() => {
                    W(o.dom.attributes, (e => nn(o, e.name))), Jt(o, r)
                })), e.ui.styleSheetLoader = ((e, t) => Ps.forElement(e, {
                    contentCssCors: Sd(t),
                    referrerPolicy: ql(t)
                }))(o, e), hd(e) ? e.inline = !0 : (e.orgVisibility = e.getElement().style.visibility, e.getElement().style.visibility = "hidden");
                const s = e.getElement().form || bO.getParent(t, "form");
                s && (e.formElement = s, bd(e) && !Yo(e.getElement()) && (bO.insertAfter(bO.create("input", {
                    type: "hidden",
                    name: t
                }), t), e.hasHiddenInput = !0), e.formEventDelegate = t => {
                    e.dispatch(t.type, t)
                }, bO.bind(s, "submit reset", e.formEventDelegate), e.on("reset", (() => {
                    e.resetContent()
                })), !vd(e) || s.submit.nodeType || s.submit.length || s._mceOldSubmit || (s._mceOldSubmit = s.submit, s.submit = () => (e.editorManager.triggerSave(), e.setDirty(!1), s._mceOldSubmit(s)))), e.windowManager = vw(e), e.notificationManager = pw(e), (e => "xml" === e.options.get("encoding"))(e) && e.on("GetContent", (e => {
                    e.save && (e.content = bO.encode(e.content))
                })), yd(e) && e.on("submit", (() => {
                    e.initialized && e.save()
                })), Cd(e) && (e._beforeUnload = () => {
                    !e.initialized || e.destroyed || e.isHidden() || e.save({
                        format: "raw",
                        no_events: !0,
                        set_dirty: !1
                    })
                }, e.editorManager.on("BeforeUnload", e._beforeUnload)), e.editorManager.add(e), CO(e, e.suffix)
            })(this)
        }
        focus(e) {
            this.execCommand("mceFocus", !1, e)
        }
        hasFocus() {
            return kg(this)
        }
        translate(e) {
            return Ia.translate(e)
        }
        getParam(e, t, n) {
            const o = this.options;
            return o.isRegistered(e) || (C(n) ? o.register(e, {
                processor: n,
                default: t
            }) : o.register(e, {
                processor: M,
                default: t
            })), o.isSet(e) || v(t) ? o.get(e) : t
        }
        hasPlugin(e, t) {
            return !(!H(_d(this), e) || t && void 0 === hw.get(e))
        }
        nodeChanged(e) {
            this._nodeChangeDispatcher.nodeChanged(e)
        }
        addCommand(e, t, n) {
            this.editorCommands.addCommand(e, t, n)
        }
        addQueryStateHandler(e, t, n) {
            this.editorCommands.addQueryStateHandler(e, t, n)
        }
        addQueryValueHandler(e, t, n) {
            this.editorCommands.addQueryValueHandler(e, t, n)
        }
        addShortcut(e, t, n, o) {
            this.shortcuts.add(e, t, n, o)
        }
        execCommand(e, t, n, o) {
            return this.editorCommands.execCommand(e, t, n, o)
        }
        queryCommandState(e) {
            return this.editorCommands.queryCommandState(e)
        }
        queryCommandValue(e) {
            return this.editorCommands.queryCommandValue(e)
        }
        queryCommandSupported(e) {
            return this.editorCommands.queryCommandSupported(e)
        }
        show() {
            const e = this;
            e.hidden && (e.hidden = !1, e.inline ? e.getBody().contentEditable = "true" : (xT.show(e.getContainer()), xT.hide(e.id)), e.load(), e.dispatch("show"))
        }
        hide() {
            const e = this;
            e.hidden || (e.save(), e.inline ? (e.getBody().contentEditable = "false", e === e.editorManager.focusedEditor && (e.editorManager.focusedEditor = null)) : (xT.hide(e.getContainer()), xT.setStyle(e.id, "display", e.orgDisplay)), e.hidden = !0, e.dispatch("hide"))
        }
        isHidden() {
            return this.hidden
        }
        setProgressState(e, t) {
            this.dispatch("ProgressState", {
                state: e,
                time: t
            })
        }
        load(e = {}) {
            const t = this,
                n = t.getElement();
            if (t.removed) return "";
            if (n) {
                const o = {
                        ...e,
                        load: !0
                    },
                    r = Yo(n) ? n.value : n.innerHTML,
                    s = t.setContent(r, o);
                return o.no_events || t.dispatch("LoadContent", {
                    ...o,
                    element: n
                }), s
            }
            return ""
        }
        save(e = {}) {
            const t = this;
            let n = t.getElement();
            if (!n || !t.initialized || t.removed) return "";
            const o = {
                ...e,
                save: !0,
                element: n
            };
            let r = t.getContent(o);
            const s = {
                ...o,
                content: r
            };
            if (s.no_events || t.dispatch("SaveContent", s), "raw" === s.format && t.dispatch("RawSaveContent", s), r = s.content, Yo(n)) n.value = r;
            else {
                !e.is_removing && t.inline || (n.innerHTML = r);
                const o = xT.getParent(t.id, "form");
                o && ET(o.elements, (e => e.name !== t.id || (e.value = r, !1)))
            }
            return s.element = o.element = n = null, !1 !== s.set_dirty && t.setDirty(!1), r
        }
        setContent(e, t) {
            return KC(this, e, t)
        }
        getContent(e) {
            return ((e, t = {}) => {
                const n = ((e, t) => ({
                    ...e,
                    format: t,
                    get: !0,
                    getInner: !0
                }))(t, t.format ? t.format : "html");
                return rC(e, n).fold(R, (t => {
                    const n = ((e, t) => MC(e).editor.getContent(t))(e, t);
                    return sC(e, n, t)
                }))
            })(this, e)
        }
        insertContent(e, t) {
            t && (e = kT({
                content: e
            }, t)), this.execCommand("mceInsertContent", !1, e)
        }
        resetContent(e) {
            void 0 === e ? KC(this, this.startContent, {
                format: "raw"
            }) : KC(this, e), this.undoManager.reset(), this.setDirty(!1), this.nodeChanged()
        }
        isDirty() {
            return !this.isNotDirty
        }
        setDirty(e) {
            const t = !this.isNotDirty;
            this.isNotDirty = !e, e && e !== t && this.dispatch("dirty")
        }
        getContainer() {
            const e = this;
            return e.container || (e.container = e.editorContainer || xT.get(e.id + "_parent")), e.container
        }
        getContentAreaContainer() {
            return this.contentAreaContainer
        }
        getElement() {
            return this.targetElm || (this.targetElm = xT.get(this.id)), this.targetElm
        }
        getWin() {
            const e = this;
            if (!e.contentWindow) {
                const t = e.iframeElement;
                t && (e.contentWindow = t.contentWindow)
            }
            return e.contentWindow
        }
        getDoc() {
            const e = this;
            if (!e.contentDocument) {
                const t = e.getWin();
                t && (e.contentDocument = t.document)
            }
            return e.contentDocument
        }
        getBody() {
            var e, t;
            const n = this.getDoc();
            return null !== (t = null !== (e = this.bodyElement) && void 0 !== e ? e : null == n ? void 0 : n.body) && void 0 !== t ? t : null
        }
        convertURL(e, t, n) {
            const o = this,
                r = o.options.get,
                s = Ld(o);
            return w(s) ? s.call(o, e, n, !0, t) : !r("convert_urls") || "link" === n || f(n) && "LINK" === n.nodeName || 0 === e.indexOf("file:") || 0 === e.length ? e : r("relative_urls") ? o.documentBaseURI.toRelative(e) : e = o.documentBaseURI.toAbsolute(e, r("remove_script_host"))
        }
        addVisual(e) {
            ((e, t) => {
                ((e, t) => {
                    IC(e).editor.addVisual(t)
                })(e, t)
            })(this, e)
        }
        setEditableRoot(e) {
            ((e, t) => {
                e._editableRoot !== t && (e._editableRoot = t, e.readonly || (e.getBody().contentEditable = String(e.hasEditableRoot()), e.nodeChanged()), ((e, t) => {
                    e.dispatch("EditableRootStateChange", {
                        state: t
                    })
                })(e, t))
            })(this, e)
        }
        hasEditableRoot() {
            return this._editableRoot
        }
        remove() {
            (e => {
                if (!e.removed) {
                    const {
                        _selectionOverrides: t,
                        editorUpload: n
                    } = e, o = e.getBody(), r = e.getElement();
                    o && e.save({
                        is_removing: !0
                    }), e.removed = !0, e.unbindAllNativeEvents(), e.hasHiddenInput && C(null == r ? void 0 : r.nextSibling) && sw.remove(r.nextSibling), (e => {
                        e.dispatch("remove")
                    })(e), e.editorManager.remove(e), !e.inline && o && (e => {
                        sw.setStyle(e.id, "display", e.orgDisplay)
                    })(e), (e => {
                        e.dispatch("detach")
                    })(e), sw.remove(e.getContainer()), aw(t), aw(n), e.destroy()
                }
            })(this)
        }
        destroy(e) {
            ((e, t) => {
                const {
                    selection: n,
                    dom: o
                } = e;
                e.destroyed || (t || e.removed ? (t || (e.editorManager.off("beforeunload", e._beforeUnload), e.theme && e.theme.destroy && e.theme.destroy(), aw(n), aw(o)), (e => {
                    const t = e.formElement;
                    t && (t._mceOldSubmit && (t.submit = t._mceOldSubmit, delete t._mceOldSubmit), sw.unbind(t, "submit reset", e.formEventDelegate))
                })(e), (e => {
                    const t = e;
                    t.contentAreaContainer = t.formElement = t.container = t.editorContainer = null, t.bodyElement = t.contentDocument = t.contentWindow = null, t.iframeElement = t.targetElm = null;
                    const n = e.selection;
                    if (n) {
                        const e = n.dom;
                        t.selection = n.win = n.dom = e.doc = null
                    }
                })(e), e.destroyed = !0) : e.remove())
            })(this, e)
        }
        uploadImages() {
            return this.editorUpload.uploadImages()
        }
        _scanForImages() {
            return this.editorUpload.scanForImages()
        }
    }
    const _T = Oa.DOM,
        NT = Dt.each;
    let RT, AT = !1,
        OT = [];
    const TT = e => {
            const t = e.type;
            NT(LT.get(), (n => {
                switch (t) {
                    case "scroll":
                        n.dispatch("ScrollWindow", e);
                        break;
                    case "resize":
                        n.dispatch("ResizeWindow", e)
                }
            }))
        },
        BT = e => {
            if (e !== AT) {
                const t = Oa.DOM;
                e ? (t.bind(window, "resize", TT), t.bind(window, "scroll", TT)) : (t.unbind(window, "resize", TT), t.unbind(window, "scroll", TT)), AT = e
            }
        },
        DT = e => {
            const t = OT;
            return OT = G(OT, (t => e !== t)), LT.activeEditor === e && (LT.activeEditor = OT.length > 0 ? OT[0] : null), LT.focusedEditor === e && (LT.focusedEditor = null), t.length !== OT.length
        },
        PT = "CSS1Compat" !== document.compatMode,
        LT = {
            ...nT,
            baseURI: null,
            baseURL: null,
            defaultOptions: {},
            documentBaseURL: null,
            suffix: null,
            majorVersion: "6",
            minorVersion: "5.1",
            releaseDate: "2023-06-19",
            i18n: Ia,
            activeEditor: null,
            focusedEditor: null,
            setup() {
                const e = this;
                let t = "",
                    n = "",
                    o = $y.getDocumentBaseUrl(document.location);
                /^[^:]+:\/\/\/?[^\/]+\//.test(o) && (o = o.replace(/[\?#].*$/, "").replace(/[\/\\][^\/]+$/, ""), /[\/\\]$/.test(o) || (o += "/"));
                const r = window.tinymce || window.tinyMCEPreInit;
                if (r) t = r.base || r.baseURL, n = r.suffix;
                else {
                    const e = document.getElementsByTagName("script");
                    for (let o = 0; o < e.length; o++) {
                        const r = e[o].src || "";
                        if ("" === r) continue;
                        const s = r.substring(r.lastIndexOf("/"));
                        if (/tinymce(\.full|\.jquery|)(\.min|\.dev|)\.js/.test(r)) {
                            -1 !== s.indexOf(".min") && (n = ".min"), t = r.substring(0, r.lastIndexOf("/"));
                            break
                        }
                    }
                    if (!t && document.currentScript) {
                        const e = document.currentScript.src; - 1 !== e.indexOf(".min") && (n = ".min"), t = e.substring(0, e.lastIndexOf("/"))
                    }
                }
                var s;
                e.baseURL = new $y(o).toAbsolute(t), e.documentBaseURL = o, e.baseURI = new $y(e.baseURL), e.suffix = n, (s = e).on("AddEditor", O(yg, s)), s.on("RemoveEditor", O(Cg, s))
            },
            overrideDefaults(e) {
                const t = e.base_url;
                t && this._setBaseUrl(t);
                const n = e.suffix;
                n && (this.suffix = n), this.defaultOptions = e;
                const o = e.plugin_base_urls;
                void 0 !== o && ge(o, ((e, t) => {
                    Fa.PluginManager.urls[t] = e
                }))
            },
            init(e) {
                const t = this;
                let n;
                const o = Dt.makeMap("area base basefont br col frame hr img input isindex link meta param embed source wbr track colgroup option table tbody tfoot thead tr th td script noscript style textarea video audio iframe object menu", " ");
                let r = e => {
                    n = e
                };
                const s = () => {
                    let n = 0;
                    const a = [];
                    let i;
                    _T.unbind(window, "ready", s), (n => {
                        const o = e.onpageload;
                        o && o.apply(t, [])
                    })(), i = ((e, t) => {
                        const n = [],
                            o = w(t) ? e => $(n, (n => t(n, e))) : e => H(n, e);
                        for (let t = 0, r = e.length; t < r; t++) {
                            const r = e[t];
                            o(r) || n.push(r)
                        }
                        return n
                    })((e => At.browser.isIE() || At.browser.isEdge() ? (kw("TinyMCE does not support the browser you are using. For a list of supported browsers please see: https://www.tiny.cloud/docs/tinymce/6/support/#supportedwebbrowsers"), []) : PT ? (kw("Failed to initialize the editor as the document is not in standards mode. TinyMCE requires standards mode."), []) : m(e.selector) ? _T.select(e.selector) : C(e.target) ? [e.target] : [])(e)), Dt.each(i, (e => {
                        var n;
                        (n = t.get(e.id)) && n.initialized && !(n.getContainer() || n.getBody()).parentNode && (DT(n), n.unbindAllNativeEvents(), n.destroy(!0), n.removed = !0)
                    })), i = Dt.grep(i, (e => !t.get(e.id))), 0 === i.length ? r([]) : NT(i, (s => {
                        ((e, t) => e.inline && t.tagName.toLowerCase() in o)(e, s) ? kw("Could not initialize inline editor on invalid inline target element", s): ((e, o, s) => {
                            const l = new ST(e, o, t);
                            a.push(l), l.on("init", (() => {
                                ++n === i.length && r(a)
                            })), l.targetElm = l.targetElm || s, l.render()
                        })((e => {
                            let t = e.id;
                            return t || (t = xe(e, "name").filter((e => !_T.get(e))).getOrThunk(_T.uniqueId), e.setAttribute("id", t)), t
                        })(s), e, s)
                    }))
                };
                return _T.bind(window, "ready", s), new Promise((e => {
                    n ? e(n) : r = t => {
                        e(t)
                    }
                }))
            },
            get(e) {
                return 0 === arguments.length ? OT.slice(0) : m(e) ? J(OT, (t => t.id === e)).getOr(null) : x(e) && OT[e] ? OT[e] : null
            },
            add(e) {
                const t = this,
                    n = t.get(e.id);
                return n === e || (null === n && OT.push(e), BT(!0), t.activeEditor = e, t.dispatch("AddEditor", {
                    editor: e
                }), RT || (RT = e => {
                    const n = t.dispatch("BeforeUnload");
                    if (n.returnValue) return e.preventDefault(), e.returnValue = n.returnValue, n.returnValue
                }, window.addEventListener("beforeunload", RT))), e
            },
            createEditor(e, t) {
                return this.add(new ST(e, t, this))
            },
            remove(e) {
                const t = this;
                let n;
                if (e) {
                    if (!m(e)) return n = e, h(t.get(n.id)) ? null : (DT(n) && t.dispatch("RemoveEditor", {
                        editor: n
                    }), 0 === OT.length && window.removeEventListener("beforeunload", RT), n.remove(), BT(OT.length > 0), n);
                    NT(_T.select(e), (e => {
                        n = t.get(e.id), n && t.remove(n)
                    }))
                } else
                    for (let e = OT.length - 1; e >= 0; e--) t.remove(OT[e])
            },
            execCommand(e, t, n) {
                var o;
                const r = this,
                    s = f(n) ? null !== (o = n.id) && void 0 !== o ? o : n.index : n;
                switch (e) {
                    case "mceAddEditor":
                        if (!r.get(s)) {
                            const e = n.options;
                            new ST(s, e, r).render()
                        }
                        return !0;
                    case "mceRemoveEditor": {
                        const e = r.get(s);
                        return e && e.remove(), !0
                    }
                    case "mceToggleEditor": {
                        const e = r.get(s);
                        return e ? (e.isHidden() ? e.show() : e.hide(), !0) : (r.execCommand("mceAddEditor", !1, n), !0)
                    }
                }
                return !!r.activeEditor && r.activeEditor.execCommand(e, t, n)
            },
            triggerSave: () => {
                NT(OT, (e => {
                    e.save()
                }))
            },
            addI18n: (e, t) => {
                Ia.add(e, t)
            },
            translate: e => Ia.translate(e),
            setActive(e) {
                const t = this.activeEditor;
                this.activeEditor !== e && (t && t.dispatch("deactivate", {
                    relatedTarget: e
                }), e.dispatch("activate", {
                    relatedTarget: t
                })), this.activeEditor = e
            },
            _setBaseUrl(e) {
                this.baseURL = new $y(this.documentBaseURL).toAbsolute(e.replace(/\/+$/, "")), this.baseURI = new $y(this.baseURL)
            }
        };
    LT.setup();
    const MT = (() => {
            const e = za();
            return {
                FakeClipboardItem: e => ({
                    items: e,
                    types: me(e),
                    getType: t => xe(e, t).getOrUndefined()
                }),
                write: t => {
                    e.set(t)
                },
                read: () => e.get().getOrUndefined(),
                clear: e.clear
            }
        })(),
        IT = Math.min,
        FT = Math.max,
        UT = Math.round,
        zT = (e, t, n) => {
            let o = t.x,
                r = t.y;
            const s = e.w,
                a = e.h,
                i = t.w,
                l = t.h,
                d = (n || "").split("");
            return "b" === d[0] && (r += l), "r" === d[1] && (o += i), "c" === d[0] && (r += UT(l / 2)), "c" === d[1] && (o += UT(i / 2)), "b" === d[3] && (r -= a), "r" === d[4] && (o -= s), "c" === d[3] && (r -= UT(a / 2)), "c" === d[4] && (o -= UT(s / 2)), jT(o, r, s, a)
        },
        jT = (e, t, n, o) => ({
            x: e,
            y: t,
            w: n,
            h: o
        }),
        HT = {
            inflate: (e, t, n) => jT(e.x - t, e.y - n, e.w + 2 * t, e.h + 2 * n),
            relativePosition: zT,
            findBestRelativePosition: (e, t, n, o) => {
                for (let r = 0; r < o.length; r++) {
                    const s = zT(e, t, o[r]);
                    if (s.x >= n.x && s.x + s.w <= n.w + n.x && s.y >= n.y && s.y + s.h <= n.h + n.y) return o[r]
                }
                return null
            },
            intersect: (e, t) => {
                const n = FT(e.x, t.x),
                    o = FT(e.y, t.y),
                    r = IT(e.x + e.w, t.x + t.w),
                    s = IT(e.y + e.h, t.y + t.h);
                return r - n < 0 || s - o < 0 ? null : jT(n, o, r - n, s - o)
            },
            clamp: (e, t, n) => {
                let o = e.x,
                    r = e.y,
                    s = e.x + e.w,
                    a = e.y + e.h;
                const i = t.x + t.w,
                    l = t.y + t.h,
                    d = FT(0, t.x - o),
                    c = FT(0, t.y - r),
                    u = FT(0, s - i),
                    m = FT(0, a - l);
                return o += d, r += c, n && (s += d, a += c, o -= u, r -= m), s -= u, a -= m, jT(o, r, s - o, a - r)
            },
            create: jT,
            fromClientRect: e => jT(e.left, e.top, e.width, e.height)
        },
        $T = (() => {
            const e = {},
                t = {};
            return {
                load: (n, o) => {
                    const r = `Script at URL "${o}" failed to load`,
                        s = `Script at URL "${o}" did not call \`tinymce.Resource.add('${n}', data)\` within 1 second`;
                    if (void 0 !== e[n]) return e[n];
                    {
                        const a = new Promise(((e, a) => {
                            const i = ((e, t, n = 1e3) => {
                                let o = !1,
                                    r = null;
                                const s = e => (...t) => {
                                        o || (o = !0, null !== r && (clearTimeout(r), r = null), e.apply(null, t))
                                    },
                                    a = s(e),
                                    i = s(t);
                                return {
                                    start: (...e) => {
                                        o || null !== r || (r = setTimeout((() => i.apply(null, e)), n))
                                    },
                                    resolve: a,
                                    reject: i
                                }
                            })(e, a);
                            t[n] = i.resolve, Ba.ScriptLoader.loadScript(o).then((() => i.start(s)), (() => i.reject(r)))
                        }));
                        return e[n] = a, a
                    }
                },
                add: (n, o) => {
                    void 0 !== t[n] && (t[n](o), delete t[n]), e[n] = Promise.resolve(o)
                },
                unload: t => {
                    delete e[t]
                }
            }
        })();
    let VT;
    try {
        const e = "__storage_test__";
        VT = window.localStorage, VT.setItem(e, e), VT.removeItem(e)
    } catch (e) {
        VT = (() => {
            let e = {},
                t = [];
            const n = {
                getItem: t => e[t] || null,
                setItem: (n, o) => {
                    t.push(n), e[n] = String(o)
                },
                key: e => t[e],
                removeItem: n => {
                    t = t.filter((e => e === n)), delete e[n]
                },
                clear: () => {
                    t = [], e = {}
                },
                length: 0
            };
            return Object.defineProperty(n, "length", {
                get: () => t.length,
                configurable: !1,
                enumerable: !1
            }), n
        })()
    }
    const qT = {
            geom: {
                Rect: HT
            },
            util: {
                Delay: fg,
                Tools: Dt,
                VK: tf,
                URI: $y,
                EventDispatcher: eT,
                Observable: nT,
                I18n: Ia,
                LocalStorage: VT,
                ImageUploader: e => {
                    const t = _w(),
                        n = Ow(e, t);
                    return {
                        upload: (t, o = !0) => n.upload(t, o ? Aw(e) : void 0)
                    }
                }
            },
            dom: {
                EventUtils: Ca,
                TreeWalker: Fo,
                TextSeeker: ii,
                DOMUtils: Oa,
                ScriptLoader: Ba,
                RangeUtils: Pf,
                Serializer: WC,
                StyleSheetLoader: Ds,
                ControlSelection: af,
                BookmarkManager: Km,
                Selection: $C,
                Event: Ca.Event
            },
            html: {
                Styles: ua,
                Entities: Qs,
                Node: Ug,
                Schema: ca,
                DomParser: nC,
                Writer: Gg,
                Serializer: Yg
            },
            Env: At,
            AddOnManager: Fa,
            Annotator: Wm,
            Formatter: Hw,
            UndoManager: Vw,
            EditorCommands: qO,
            WindowManager: vw,
            NotificationManager: pw,
            EditorObservable: lT,
            Shortcuts: CT,
            Editor: ST,
            FocusManager: mg,
            EditorManager: LT,
            DOM: Oa.DOM,
            ScriptLoader: Ba.ScriptLoader,
            PluginManager: hw,
            ThemeManager: bw,
            ModelManager: lw,
            IconManager: iw,
            Resource: $T,
            FakeClipboard: MT,
            trim: Dt.trim,
            isArray: Dt.isArray,
            is: Dt.is,
            toArray: Dt.toArray,
            makeMap: Dt.makeMap,
            each: Dt.each,
            map: Dt.map,
            grep: Dt.grep,
            inArray: Dt.inArray,
            extend: Dt.extend,
            walk: Dt.walk,
            resolve: Dt.resolve,
            explode: Dt.explode,
            _addCacheSuffix: Dt._addCacheSuffix
        },
        WT = Dt.extend(LT, qT);
    (e => {
        window.tinymce = e, window.tinyMCE = e
    })(WT), (e => {
        if ("object" == typeof module) try {
            module.exports = e
        } catch (e) {}
    })(WT)
}();