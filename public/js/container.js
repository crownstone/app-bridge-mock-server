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

    _this.state = {};
    return _this;
  }

  _createClass(BluenetCallListing, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      var _this2 = this;

      setInterval(function () {
        window.fetch(pathPrefix + 'calls', { method: "GET", headers: defaultHeaders }).then(function (data) {
          return data.json();
        }).then(function (result) {
          console.log('result', result);
          _this2.processData(result);
        }).catch(function (err) {
          console.log("Err", err);
        });
      }, 1500);
    }
  }, {
    key: 'processData',
    value: function processData(data) {
      var pending = Object.values(data.pending);
      var finished = Object.values(data.finished);

      pending.sort(function (a, b) {
        return a.tStart - b.tStart;
      });
      finished.sort(function (a, b) {
        return a.tStart - b.tStart;
      });

      this.pending = pending;
      this.finished = finished;

      this.forceUpdate();
    }
  }, {
    key: 'drawLists',
    value: function drawLists(list) {
      var result = [];
      var even = false;
      var _iteratorNormalCompletion = true;
      var _didIteratorError = false;
      var _iteratorError = undefined;

      try {
        for (var _iterator = list[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
          var item = _step.value;

          result.push(React.createElement(CallListing, {
            key: '' + item.function + item.tStart,
            'function': item.function,
            args: item.args,
            tStart: item.tStart,
            tEnd: item.tEnd,
            even: even
          }));
          even = !even;
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
        React.createElement(CallListing, {
          header: true,
          backgroundColor: '#21a4a4',
          'function': 'function',
          args: ["handle", "arguments"],
          tStart: 'start',
          tEnd: 'end'
        }),
        this.drawLists(this.pending),
        React.createElement('br', null),
        this.drawLists(this.finished)
      );
    }
  }]);

  return BluenetCallListing;
}(React.Component);

var CallListing = function (_React$Component2) {
  _inherits(CallListing, _React$Component2);

  function CallListing() {
    _classCallCheck(this, CallListing);

    return _possibleConstructorReturn(this, (CallListing.__proto__ || Object.getPrototypeOf(CallListing)).apply(this, arguments));
  }

  _createClass(CallListing, [{
    key: 'render',
    value: function render() {
      var textStyle = this.props.header ? { fontWeight: 'bold', color: '#fff' } : { color: "#000" };
      var padding = 10;

      return React.createElement(
        'div',
        { style: { display: 'flex', flexDirection: 'row', backgroundColor: this.props.backgroundColor || (this.props.even ? '#cbe5e5' : "#fff"), borderRadius: 10 } },
        React.createElement(
          'div',
          { style: Object.assign({ display: 'flex', padding: padding, width: 200 }, textStyle) },
          this.props.function
        ),
        React.createElement(
          'div',
          { style: Object.assign({ display: 'flex', padding: padding, width: 250 }, textStyle) },
          this.props.args[0] ? this.props.args[0] : ''
        ),
        React.createElement(
          'div',
          { style: Object.assign({ display: 'flex', width: 500, padding: padding }, textStyle) },
          JSON.stringify(this.props.args.slice(1))
        ),
        React.createElement(
          'div',
          { style: Object.assign({ display: 'flex', padding: padding, width: 200 }, textStyle) },
          typeof this.props.tStart == 'string' ? this.props.tStart : new Date(this.props.tStart).toISOString()
        ),
        React.createElement(
          'div',
          { style: Object.assign({ display: 'flex', padding: padding, width: 200 }, textStyle) },
          typeof this.props.tStart == 'string' ? this.props.tEnd : this.props.tEnd ? new Date(this.props.tEnd).toISOString() : "pending"
        )
      );
    }
  }]);

  return CallListing;
}(React.Component);

var domContainer = document.querySelector('#management_container');
ReactDOM.render(React.createElement(BluenetCallListing, null), domContainer);