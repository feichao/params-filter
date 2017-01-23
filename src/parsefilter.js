(function () {
  'use strict';
  var ParamsUtil = {};
  ParamsUtil.DATA_TYPE = {
    INT: 'int',
    NUMBER: 'number',
    STRING: 'string',
    BOOLEAN: 'boolean',
    ARRAY: 'array',
    OBJECT: 'object'
  };
  ParamsUtil.isNumber = function (p) {
    return typeof p === 'number';
  };
  ParamsUtil.isString = function (p) {
    return typeof p === 'string';
  };
  ParamsUtil.isBoolean = function (p) {
    return typeof p === 'boolean';
  };
  ParamsUtil.isArray = Array.isArray;
  ParamsUtil.isObject = function (p) {
    return typeof p === 'object' && !ParamsUtil.isArray(p);
  };

  function Params(params, options) {
    this.params = params;
  }
  Params.prototype.filter = function (data) {
    if (ParamsUtil.isObject(this.params) && ParamsUtil.isArray(data)) {
      var params = this.params;
      return data.map(function (d) {
        return filterObject(params, d, {});
      });
    }
    if (ParamsUtil.isArray(this.params) && ParamsUtil.isArray(data)) {
      return filterArray(this.params, data, []);
    }
    if (ParamsUtil.isObject(this.params) && ParamsUtil.isObject(data)) {
      return filterObject(this.params, data, {});
    }
  };

  function filterObject(params, data, result) {
    for (var pKey in params) {
      if (params.hasOwnProperty(pKey)) {
        var pValue = params[pKey];
        if (pValue instanceof Params) {
          result[pKey] = Params.prototype.filter.call(pValue, data[pKey]);
        } else {
          result[pKey] = getLeftParams(pValue, data[pKey]);
        }
      }
    }
    return result;
  }

  function filterArray(params, data, result) {
    result = data.map(function (d, index) {
      if (params[index] instanceof Params) {
        return Params.prototype.filter.call(params[index], d);
      } else {
        return filterOthers(params[index], d);
      }
    });
    return result;
  }

  function filterOthers(params, data) {
    if (ParamsUtil.isArray(params)) {
      return filterArray(params, data, []);
    }
    if (ParamsUtil.isObject(params)) {
      return filterObject(params, data, {});
    }
    return getLeftParams(params, data);
  }

  function getLeftParams(pValue, dValue) {
    switch (pValue) {
      case ParamsUtil.DATA_TYPE.INT:
        return (typeof + dValue === 'number' && +dValue === +dValue) ? parseInt(+dValue) : parseInt(dValue);
      case ParamsUtil.DATA_TYPE.NUMBER:
        return +dValue;
      case ParamsUtil.DATA_TYPE.STRING:
        return dValue !== null && dValue !== undefined ? dValue.toString() : dValue;
      case ParamsUtil.DATA_TYPE.BOOLEAN:
        return !!dValue;
      case ParamsUtil.DATA_TYPE.ARRAY:
      case ParamsUtil.DATA_TYPE.OBJECT:
        return dValue;
      default:
        return dValue;
    }
  }

  var g;
  try {
    g = window;
  } catch (e) {
    g = global;
  }

  g.$PF = g.ParamsFilter = {
    Params: Params,
    DT: ParamsUtil.DATA_TYPE
  };

})();

(function () {
  'use strict';

  if (!window.angular) {
    return;
  }

  function PFilter() {
    var pf = window.$PF || window.ParamsFilter;
    var pFilter = {};
    pFilter.DT = pf.DT;

    pFilter.create = function (params, options) {
      return new pf.Params(params, options);
    };

    pFilter.filter = function (pfIns, data) {
      if (pfIns instanceof pf.Params) {
        return pfIns.filter(data);
      } else {
        return data;
      }
    };

    return pFilter;
  }

  angular
    .module('pFilter')
    .factory('PFilter', PFilter);

})();
