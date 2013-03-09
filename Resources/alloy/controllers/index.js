function Controller() {
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    $model = arguments[0] ? arguments[0].$model : null;
    var $ = this, exports = {}, __defers = {};
    $.__views.win = Ti.UI.createWindow({
        backgroundColor: "#00f",
        id: "win"
    });
    $.addTopLevelView($.__views.win);
    $.__views.osLabel = Ti.UI.createLabel(function() {
        var o = {};
        _.extend(o, {
            color: "#fff",
            height: Ti.UI.SIZE,
            width: Ti.UI.SIZE,
            textAlign: "center",
            font: {
                fontSize: 48,
                fontWeight: "bold"
            }
        });
        Alloy.isTablet && _.extend(o, {
            font: {
                fontSize: 96,
                fontWeight: "bold"
            }
        });
        _.extend(o, {
            text: "Mobileweb",
            id: "osLabel"
        });
        return o;
    }());
    $.__views.win.add($.__views.osLabel);
    exports.destroy = function() {};
    _.extend($, $.__views);
    $.win.open();
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._, $model;

module.exports = Controller;