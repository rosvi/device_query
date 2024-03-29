function S4() {
    return ((1 + Math.random()) * 65536 | 0).toString(16).substring(1);
}

function guid() {
    return S4() + S4() + "-" + S4() + "-" + S4() + "-" + S4() + "-" + S4() + S4() + S4();
}

function InitAdapter(config) {}

function Sync(method, model, opts) {
    function storeModel(data) {
        localStorage.setItem(name, JSON.stringify(data));
    }
    var name = model.config.adapter.collection_name, data = model.config.data, resp = null;
    switch (method) {
      case "create":
        if (!model.id) {
            model.id = guid();
            model.set(model.idAttribute, model.id);
        }
        data[model.id] = model;
        storeModel(data);
        resp = model.toJSON();
        break;
      case "read":
        var store = localStorage.getItem(name), store_data = store && JSON.parse(store) || {}, len = 0;
        for (var key in store_data) {
            var m = new model.config.Model(store_data[key]);
            model.models.push(m);
            len++;
        }
        model.length = len;
        len === 1 ? resp = model.models[0] : resp = model.models;
        break;
      case "update":
        data[model.id] = model;
        storeModel(data);
        resp = model.toJSON();
        break;
      case "delete":
        delete data[model.id];
        storeModel(data);
        resp = model.toJSON();
    }
    if (resp) {
        _.isFunction(opts.success) && opts.success(resp);
        method === "read" && model.trigger("fetch");
    } else _.isFunction(opts.error) && opts.error(resp);
}

var _ = require("alloy/underscore")._;

module.exports.sync = Sync;

module.exports.beforeModelCreate = function(config) {
    config = config || {};
    config.data = {};
    InitAdapter(config);
    return config;
};

module.exports.afterModelCreate = function(Model) {
    Model = Model || {};
    Model.prototype.config.Model = Model;
    return Model;
};