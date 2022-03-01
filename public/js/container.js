'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var styles = {
  input: {
    width: 450,
    height: 35,
    padding: 5,
    borderRadius: 5,
    borderColor: '#eee',
    borderWidth: 1
  },
  warningButton: {
    width: 450,
    height: 35,
    padding: 5,
    borderRadius: 5,
    borderColor: '#9b601d',
    borderWidth: 2,
    backgroundColor: "#ff9c2c"
  }
};
var defaultHeaders = {
  'Accept': 'application/json',
  'Content-Type': 'application/json',
  'Authorization': null
};

var pathPrefix = "http://127.0.0.1:3100/";

var BluenetCallListing = function (_React$Component) {
  _inherits(BluenetCallListing, _React$Component);

  function BluenetCallListing(props) {
    _classCallCheck(this, BluenetCallListing);

    var _this = _possibleConstructorReturn(this, (BluenetCallListing.__proto__ || Object.getPrototypeOf(BluenetCallListing)).call(this, props));

    _this.pending = [];
    _this.finished = [];
    _this.bluenet = [];
    _this.updating = false;
    _this.updatePending = false;

    _this.state = { loaded: false };
    return _this;
  }

  _createClass(BluenetCallListing, [{
    key: 'openEvenSource',
    value: function openEvenSource() {
      var _this2 = this;

      this.eventSource = new EventSource("http://localhost:3100/sse");
      this.eventSource.addEventListener('open', function (event) {
        console.log("Opened SSE connection to bridge mock server.");
        _this2.update();
      });
      this.eventSource.addEventListener('message', function (event) {
        console.log("Incoming SSE:", event);
        if (event && event.data) {
          var message = JSON.parse(event.data);
          if (message.type === "callAdded") {
            _this2.update();
          }
        }
      });
      this.eventSource.addEventListener('error', function (error) {
        console.log("Error with SSE connection", error);
        _this2.eventSource.close();
        setTimeout(function () {
          console.log("Retrying SSE connection...");
          _this2.openEvenSource();
        }, 1000);
      });
    }
  }, {
    key: 'componentDidMount',
    value: function componentDidMount() {
      this.openEvenSource();
    }
  }, {
    key: 'update',
    value: function update() {
      var _this3 = this;

      if (this.updating === true) {
        this.updatePending = true;
        return;
      }

      this.updatePending = false;
      this.updating = true;

      window.fetch(pathPrefix + 'calls', { method: "GET", headers: defaultHeaders }).then(function (data) {
        return data.json();
      }).then(function (result) {
        console.log("gotsy Data", result);
        _this3.processData(result);
        if (_this3.state.loaded === false) {
          _this3.setState({ loaded: true });
        }
      }).catch(function (err) {
        console.log("Err", err);
      }).then(function () {
        _this3.updating = false;
        if (_this3.updatePending) {
          _this3.update();
        }
      });
    }
  }, {
    key: 'processData',
    value: function processData(data) {
      var pending = [];
      var finished = [];

      for (var id in data.pending) {
        pending.push(Object.assign({ id: id }, data.pending[id]));
      }
      for (var _id in data.finished) {
        finished.push(Object.assign({ id: _id, finished: true, type: 'promise' }, data.finished[_id]));
      }
      var _iteratorNormalCompletion = true;
      var _didIteratorError = false;
      var _iteratorError = undefined;

      try {
        for (var _iterator = data.bluenet[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
          var item = _step.value;
          finished.push(Object.assign({ finished: true, type: 'direct' }, item));
        }
      } catch (err) {
        _didIteratorError = true;
        _iteratorError = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion && _iterator.return) {
            _iterator.return();
          }
        } finally {
          if (_didIteratorError) {
            throw _iteratorError;
          }
        }
      }

      ;

      pending.sort(function (a, b) {
        return b.tStart - a.tStart;
      });
      finished.sort(function (a, b) {
        return b.tStart - a.tStart;
      });

      this.pending = pending;
      this.finished = finished;

      this.forceUpdate();
    }
  }, {
    key: 'drawLists',
    value: function drawLists(list) {
      var _this4 = this;

      var result = [];
      var even = false;
      var _iteratorNormalCompletion2 = true;
      var _didIteratorError2 = false;
      var _iteratorError2 = undefined;

      try {
        for (var _iterator2 = list[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
          var item = _step2.value;

          result.push(React.createElement(PromiseCallListing, Object.assign({
            key: '' + item.function + item.tStart
          }, item, {
            update: function update() {
              _this4.update();
            },
            even: even
          })));
          even = !even;
        }
      } catch (err) {
        _didIteratorError2 = true;
        _iteratorError2 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion2 && _iterator2.return) {
            _iterator2.return();
          }
        } finally {
          if (_didIteratorError2) {
            throw _iteratorError2;
          }
        }
      }

      return result;
    }
  }, {
    key: 'render',
    value: function render() {
      return React.createElement(
        'div',
        { style: { display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' } },
        React.createElement(
          'h1',
          null,
          'Bluenet Promise Calls'
        ),
        React.createElement('br', null),
        React.createElement(PromiseCallListingLegend, null),
        this.state.loaded === false && React.createElement(
          'h3',
          null,
          'Loading...'
        ),
        this.drawLists(this.pending),
        React.createElement('br', null),
        this.finished.length > 0 && React.createElement(
          'h3',
          null,
          'Finished tasks:'
        ),
        this.drawLists(this.finished)
      );
    }
  }]);

  return BluenetCallListing;
}(React.Component);

var PromiseCallListingLegend = function (_React$Component2) {
  _inherits(PromiseCallListingLegend, _React$Component2);

  function PromiseCallListingLegend() {
    _classCallCheck(this, PromiseCallListingLegend);

    return _possibleConstructorReturn(this, (PromiseCallListingLegend.__proto__ || Object.getPrototypeOf(PromiseCallListingLegend)).apply(this, arguments));
  }

  _createClass(PromiseCallListingLegend, [{
    key: 'render',
    value: function render() {
      var textStyle = { fontWeight: 'bold', color: '#fff' };
      var padding = 10;

      return React.createElement(
        'div',
        { style: { display: 'flex', flexDirection: 'row', backgroundColor: '#21a4a4', borderRadius: 10 } },
        React.createElement(
          'div',
          { style: Object.assign({ display: 'flex', padding: padding, width: 300 }, textStyle) },
          'function'
        ),
        React.createElement(
          'div',
          { style: Object.assign({ display: 'flex', width: 800, padding: padding }, textStyle) },
          'arguments[]'
        ),
        React.createElement(
          'div',
          { style: Object.assign({ display: 'flex', padding: padding, width: 100 }, textStyle) },
          'start'
        ),
        React.createElement(
          'div',
          { style: Object.assign({ display: 'flex', padding: padding, width: 100 }, textStyle) },
          'finished'
        ),
        React.createElement(
          'div',
          { style: Object.assign({ display: 'flex', padding: padding, width: 100 }, textStyle) },
          'control'
        )
      );
    }
  }]);

  return PromiseCallListingLegend;
}(React.Component);

var PromiseCallListing = function (_React$Component3) {
  _inherits(PromiseCallListing, _React$Component3);

  function PromiseCallListing(props) {
    _classCallCheck(this, PromiseCallListing);

    var _this6 = _possibleConstructorReturn(this, (PromiseCallListing.__proto__ || Object.getPrototypeOf(PromiseCallListing)).call(this, props));

    _this6.state = { height: 40, expanded: false };
    return _this6;
  }

  _createClass(PromiseCallListing, [{
    key: 'resolve',
    value: function resolve(id) {
      var _this7 = this;

      window.fetch(pathPrefix + 'successById', { method: "POST", headers: defaultHeaders, body: JSON.stringify({
          id: id, data: null
        }) }).then(function (result) {
        _this7.props.update();
      }).catch(function (err) {
        console.log("Err", err);
      });
    }
  }, {
    key: 'expand',
    value: function expand() {
      if (this.state.expanded) {
        this.setState({ height: 40, expanded: false });
        return;
      }

      var args = JSON.stringify(this.props.args);
      if (args.length > 95) {
        var prettyArgs = JSON.stringify(this.props.args, null, 2);
        var lines = prettyArgs.match(/\n/g).length;
        this.setState({ expanded: true, height: 40 + 20 * lines });
      }
    }
  }, {
    key: 'render',
    value: function render() {
      var _this8 = this;

      var textStyle = this.props.header ? { fontWeight: 'bold', color: '#fff' } : { color: "#000" };
      if (this.props.resolveType === 'autoResolve' && this.props.tEnd) {
        textStyle.fontStyle = 'italic';
      }
      if (this.props.resolveType === 'native' && this.props.tEnd) {
        textStyle.fontStyle = 'italic';
        textStyle.fontWeight = 'bold';
      }
      var padding = 10;
      var button = React.createElement(
        'button',
        { onClick: function onClick() {
            _this8.resolve(_this8.props.id);
          }, style: { margin: 0, width: 80 } },
        'Resolve'
      );
      var args = JSON.stringify(this.props.args);
      var usedArgs = args;
      var length = 95;
      if (args.length > length) {
        usedArgs = usedArgs.substring(0, length) + "...";
      }

      return React.createElement(
        'div',
        { style: { display: 'flex', height: this.state.height, flexDirection: 'row', backgroundColor: this.props.backgroundColor || (this.props.even ? '#cbe5e5' : "#fff"), borderRadius: 10 } },
        React.createElement(
          'div',
          { style: Object.assign({ display: 'flex', padding: padding, width: 300 }, textStyle) },
          this.props.function
        ),
        React.createElement(
          'div',
          { style: Object.assign({ display: 'flex', width: 800, padding: padding, whiteSpace: this.state.expanded ? 'pre' : undefined }, textStyle), onClick: function onClick() {
              _this8.expand();
            } },
          this.state.expanded ? JSON.stringify(this.props.args, null, 2) : usedArgs
        ),
        React.createElement(
          'div',
          { style: Object.assign({ display: 'flex', padding: padding, width: 100 }, textStyle) },
          new Date(this.props.tStart).toLocaleTimeString()
        ),
        React.createElement(
          'div',
          { style: Object.assign({ display: 'flex', padding: padding, width: 100 }, textStyle) },
          this.props.finished ? this.props.tEnd && new Date(this.props.tEnd).toLocaleTimeString() : "pending"
        ),
        React.createElement(
          'div',
          { style: Object.assign({ display: 'flex', padding: 6, width: 100 }, textStyle) },
          this.props.finished ? this.props.type : button
        )
      );
    }
  }]);

  return PromiseCallListing;
}(React.Component);

var domContainer = document.querySelector('#management_container');
ReactDOM.render(React.createElement(BluenetCallListing, null), domContainer);