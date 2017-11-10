"use strict";

jQuery.fn.extend({ everyTime: function everyTime(e, r, t, i, n) {
    return this.each(function () {
      jQuery.timer.add(this, e, r, t, i, n);
    });
  }, oneTime: function oneTime(e, r, t) {
    return this.each(function () {
      jQuery.timer.add(this, e, r, t, 1);
    });
  }, stopTime: function stopTime(e, r) {
    return this.each(function () {
      jQuery.timer.remove(this, e, r);
    });
  } }), jQuery.event.special, jQuery.extend({ timer: { global: [], guid: 1, dataKey: "jQuery.timer", regex: /^([0-9]+(?:\.[0-9]*)?)\s*(.*s)?$/, powers: { ms: 1, cs: 10, ds: 100, s: 1e3, das: 1e4, hs: 1e5, ks: 1e6 }, timeParse: function timeParse(e) {
      if (void 0 == e || null == e) return null;var r = this.regex.exec(jQuery.trim(e.toString()));if (r[2]) {
        var t = parseFloat(r[1]),
            i = this.powers[r[2]] || 1;return t * i;
      }return e;
    }, add: function add(e, r, t, i, n, a) {
      var u = 0;if (jQuery.isFunction(t) && (n || (n = i), i = t, t = r), r = jQuery.timer.timeParse(r), !("number" != typeof r || isNaN(r) || r <= 0)) {
        n && n.constructor != Number && (a = !!n, n = 0), n = n || 0, a = a || !1;var s = jQuery.data(e, this.dataKey) || jQuery.data(e, this.dataKey, {});s[t] || (s[t] = {}), i.timerID = i.timerID || this.guid++;var o = function o() {
          a && this.inProgress || (this.inProgress = !0, (++u > n && 0 !== n || i.call(e, u) === !1) && jQuery.timer.remove(e, t, i), this.inProgress = !1);
        };o.timerID = i.timerID, s[t][i.timerID] || (s[t][i.timerID] = window.setInterval(o, r)), this.global.push(e);
      }
    }, remove: function remove(e, r, t) {
      var i,
          n = jQuery.data(e, this.dataKey);if (n) {
        if (r) {
          if (n[r]) {
            if (t) t.timerID && (window.clearInterval(n[r][t.timerID]), delete n[r][t.timerID]);else for (var t in n[r]) {
              window.clearInterval(n[r][t]), delete n[r][t];
            }for (i in n[r]) {
              break;
            }i || (i = null, delete n[r]);
          }
        } else for (r in n) {
          this.remove(e, r, t);
        }for (i in n) {
          break;
        }i || jQuery.removeData(e, this.dataKey);
      }
    } } }), jQuery(window).bind("unload", function () {
  jQuery.each(jQuery.timer.global, function (e, r) {
    jQuery.timer.remove(r);
  });
});