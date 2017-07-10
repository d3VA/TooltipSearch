(function() {
    var e;
    (function() {
        function t(t, s, r) {
            this.id_name = t, this.margin = r, this.id = "#" + this.id_name, d3.select(s).append("div").attr("id", this.id_name).attr("class", "tooltip ui-widget-content").style("top", this.margin.top + "px").style("width", this.margin.width + "px").style("left", this.margin.left + "px"), 
            $("#" + this.id_name).css("zoom", this.margin.zoom), d3.select("#" + this.id_name).style("z-index", 170), 
            this.createDraggable(this.id_name), $("#file_select").on("change", function(e) {
                return function() {
                    return e.updatePosition();
                };
            }(this)), this.searchClass = new e(), this.hide();
        }
        t.prototype.search_mode = "regexp", t.prototype.margin = null, t.prototype.id_name = null, 
        t.prototype.id = null, t.prototype.createDraggable = function(e) {
            var t;
            return t = $("#" + e).css("zoom"), $("#" + e).draggable({
                handle: "div.tooltip_bar",
                zIndex: 130,
                drag: function(e, s) {
                    var r;
                    return r = 1 / t - 1, s.position.top += Math.round((s.position.top - s.originalPosition.top) * r), 
                    s.position.left += Math.round((s.position.left - s.originalPosition.left) * r);
                }
            });
        }, t.prototype.show = function(e, t) {
            var s, r;
            return d3.select(this.id).html(""), r = Math.min(18 * t + 7, this.margin.max_height), 
            r /= this.margin.zoom, s = d3.select(this.id).style("height", r + 70 + "px").append("div").attr("class", "tooltip_bar").style("cursor", "move"), 
            this.createCloseBtn(s), s.append("p").style("font-size", "15px").style("font-weight", "bold").text("Found items: " + t), 
            d3.select(this.id).append("div").attr("class", "svg_div tooltip_main_scroll").style("height", r + "px").append("div").style("margin", "2px 5px 5px").selectAll("a").data(e).enter().append("div").style("display", "block").append("a").attr("href", function(e) {
                return e.full_link;
            }).attr("target", "_blank").style("display", "inline-block").html(function(e) {
                return e.name;
            }), d3.select("#tooltip_search").selectAll("a").on("mouseover", function() {
                return d3.select(this).classed("highlighted", !0);
            }).on("mouseout", function() {
                return d3.select(this).classed("highlighted", !1);
            }), $(this.id).show();
        }, t.prototype.hide = function() {
            return $(this.id).hide();
        }, t.prototype.updatePosition = function() {
            return this.hide(), $(this.id).css("top", this.margin.top).css("left", this.margin.left);
        }, t.prototype.updateSearch = function(e) {
            var t, s, r;
            return this.searchClass.start(e, this.search_mode), (s = d3.select("#vis").selectAll("circle.node")).each(function(e) {
                return e.searched = !1;
            }), r = [], this.searchClass.empty_search || s.filter(function(t) {
                return function(s) {
                    var r;
                    return r = t.searchClass.search(s), e.length > 0 && r >= 0;
                };
            }(this)).each(function(e) {
                return e.searched = !0, r.push(e);
            }), t = r.length, t > 0 ? this.show(r, t) : this.hide();
        }, t.prototype.createCloseBtn = function(e) {
            return e.append("p").attr("class", "close").append("span").style("font-size", "20px").html("&times;").on("click", function(e) {
                return function() {
                    return $(e.id).hide(), $("#search").val("");
                };
            }(this));
        };
    })(), e = function() {
        function e() {}
        return e.prototype.empty_search = null, e.prototype.searchRegEx = null, e.prototype.nr_search_terms = null, 
        e.prototype.searchTerm = null, e.prototype.search_mode = null, e.prototype.start = function(e, t) {
            var s;
            if (this.searchTerm = e, this.search_mode = t, this.empty_search = !1, this.searchRegEx = null, 
            this.nr_search_terms = null, "" === (s = this.searchTerm.toLowerCase().replace(/(^\s+|\s+$)/g, "")) && (this.empty_search = !0), 
            !this.empty_search) switch (this.search_mode) {
              case "name":
              case "description":
              case "repo":
                return this.searchRegEx = new RegExp(s);

              case "extended":
                return s = s.replace(/\s+/g, "|"), this.searchRegEx = new RegExp(s);

              case "regexp":
                return s = s.replace(/\s+/g, "|"), this.searchRegEx = new RegExp(s, "g"), this.nr_search_terms = s.split("|").length;
            }
        }, e.prototype.search = function(e) {
            var t, s, r, i, n, a;
            switch (t = -1, this.search_mode) {
              case "description":
                t = e.description.toLowerCase().search(this.searchRegEx);
                break;

              case "name":
                t = e.name.toLowerCase().search(this.searchRegEx);
                break;

              case "repo":
                t = e.book.toLowerCase().search(this.searchRegEx);
                break;

              case "multiple":
                s = " " + e.name.toLowerCase() + " ", n = new RegExp(s), t = (" " + searchTerm.toLowerCase() + " ").search(n);
                break;

              case "extended":
                a = (a = e.description + " " + e.book + " " + e.artist).toLowerCase(), this.searchRegEx.test(a) && (t = 1);
                break;

              case "regexp":
                i = [], null != (r = (a = (a = e.description + " " + e.book + " " + e.artist).toLowerCase()).match(this.searchRegEx)) && (i = this.get_array_of_unique_values(r)), 
                this.nr_search_terms === i.length && (t = this.nr_search_terms);
            }
            return t;
        }, e.prototype.get_array_of_unique_values = function(e) {
            var t;
            return t = {}, e.forEach(function(e) {
                return null == t[e] && (t[e] = 0), t[e] += 1;
            }), d3.keys(t);
        }, e;
    }();
}).call(this);