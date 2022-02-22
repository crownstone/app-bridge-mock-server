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

// let testData = {"pending":{"dfa4c14-85ec-6e8-8d87-9fcf428030b4":{"function":"setKeySets","args":[[{"adminKey":"0af563936e7bc5f799e480cf8035356e","memberKey":"56232deeb8f42dc08cc148f46093bdc1","basicKey":"2e66046a68b3251066f7cd4f21dbf6bd","localizationKey":"6e68bbf277f29be2d286e260667686b3","serviceDataKey":"0ca97b1b5522a3618039cd36edcaea0e","referenceId":"d8094738-9cb1-8f7a-cdeb-5e5b3098bb19","iBeaconUuid":"fb0ae746-01a3-4ae1-aa25-2413bdcaf120"}]],"tStart":1645196131551,"tEnd":null},"7c65ec1b-78b3-7c7e-3d91-5fdaba13edbd":{"function":"setKeySets","args":[[{"adminKey":"0af563936e7bc5f799e480cf8035356e","memberKey":"56232deeb8f42dc08cc148f46093bdc1","basicKey":"2e66046a68b3251066f7cd4f21dbf6bd","localizationKey":"6e68bbf277f29be2d286e260667686b3","serviceDataKey":"0ca97b1b5522a3618039cd36edcaea0e","referenceId":"d8094738-9cb1-8f7a-cdeb-5e5b3098bb19","iBeaconUuid":"fb0ae746-01a3-4ae1-aa25-2413bdcaf120"}]],"tStart":1645196131711,"tEnd":null}},"finished":{"1bd19abf-cc38-eec5-d6df-35c956dc9b24":{"function":"canUseDynamicBackgroundBroadcasts","args":[],"tStart":1645196125878,"tEnd":1645196125878,"autoResolve":true},"2e8672f5-4e54-b06b-173a-8c699e1ccebe":{"function":"requestLocation","args":[],"tStart":1645196125913,"tEnd":1645196125916,"autoResolve":true},"bb6cac86-6f03-4e27-53f2-ae8a5f426c1b":{"function":"clearTrackedBeacons","args":[],"tStart":1645196129296,"tEnd":1645196129298,"autoResolve":true},"4abeef2f-af68-d558-4758-a3ff4814ee6":{"function":"isReady","args":[],"tStart":1645196129317,"tEnd":1645196129317,"autoResolve":true},"65d0bf9a-d280-c1f9-4061-fdb4f721d0c9":{"function":"clearFingerprintsPromise","args":[],"tStart":1645196129367,"tEnd":1645196129367,"autoResolve":true},"a919b435-9857-9266-d94b-766ccacbbad0":{"function":"isPeripheralReady","args":[],"tStart":1645196131567,"tEnd":1645196131567,"autoResolve":true},"336672d5-a20a-f00c-326e-d65c105d51ba":{"function":"clearTrackedBeacons","args":[],"tStart":1645196131569,"tEnd":1645196131569,"autoResolve":true},"c4e72878-da74-4589-505f-3563bb34b85b":{"function":"isReady","args":[],"tStart":1645196131572,"tEnd":1645196131572,"autoResolve":true},"a9e39895-113c-5435-9b46-7f6429979425":{"function":"isReady","args":[],"tStart":1645196131578,"tEnd":1645196131578,"autoResolve":true},"8652413b-cfd0-d755-b613-31ffe050ef06":{"function":"clearFingerprintsPromise","args":[],"tStart":1645196131583,"tEnd":1645196131583,"autoResolve":true}},"bluenet":[{"function":"batterySaving","args":[true],"tCalled":1645195042021},{"function":"batterySaving","args":[false],"tStart":1645195192151},{"function":"enableLoggingToFile","args":[true],"tStart":1645195192151},{"function":"requestLocationPermission","args":[],"tStart":1645195193361},{"function":"trackIBeacon","args":["ed28687c-47f9-4452-be69-0e312f047766","a965d911-f028-2cf1-d7d9-1954a1f6d99e"],"tStart":1645195193367},{"function":"startIndoorLocalization","args":[],"tStart":1645195193367},{"function":"requestBleState","args":[],"tStart":1645195195623},{"function":"setCrownstoneNames","args":[{"a965d911-f028-2cf1-d7d9-1954a1f6d99e":{}}],"tStart":1645195195623},{"function":"enableLoggingToFile","args":[true],"tStart":1645195195624},{"function":"batterySaving","args":[false],"tStart":1645195195624},{"function":"initBroadcasting","args":[],"tStart":1645195195626},{"function":"requestLocationPermission","args":[],"tStart":1645195195627},{"function":"startScanningForCrownstonesUniqueOnly","args":[],"tStart":1645195195638},{"function":"startAdvertising","args":[],"tStart":1645195195641},{"function":"setLocationState","args":[48,0,0,0,"a965d911-f028-2cf1-d7d9-1954a1f6d99e"],"tStart":1645195195642},{"function":"setDevicePreferences","args":[0,false,false,5393572,false],"tStart":1645195195643},{"function":"trackIBeacon","args":["ed28687c-47f9-4452-be69-0e312f047766","a965d911-f028-2cf1-d7d9-1954a1f6d99e"],"tStart":1645195195646},{"function":"startIndoorLocalization","args":[],"tStart":1645195195648},{"function":"setLocationState","args":[48,0,0,0,"a965d911-f028-2cf1-d7d9-1954a1f6d99e"],"tStart":1645195195720},{"function":"setDevicePreferences","args":[0,false,false,0,false],"tStart":1645195796737},{"function":"batterySaving","args":[true],"tStart":1645196095690},{"function":"batterySaving","args":[false],"tStart":1645196127969},{"function":"enableLoggingToFile","args":[true],"tStart":1645196127973},{"function":"requestLocationPermission","args":[],"tStart":1645196129292},{"function":"trackIBeacon","args":["fb0ae746-01a3-4ae1-aa25-2413bdcaf120","d8094738-9cb1-8f7a-cdeb-5e5b3098bb19"],"tStart":1645196129299},{"function":"startIndoorLocalization","args":[],"tStart":1645196129301},{"function":"setCrownstoneNames","args":[{"d8094738-9cb1-8f7a-cdeb-5e5b3098bb19":{}}],"tStart":1645196131552},{"function":"requestBleState","args":[],"tStart":1645196131552},{"function":"enableLoggingToFile","args":[true],"tStart":1645196131553},{"function":"initBroadcasting","args":[],"tStart":1645196131556},{"function":"requestLocationPermission","args":[],"tStart":1645196131556},{"function":"batterySaving","args":[false],"tStart":1645196131554},{"function":"setLocationState","args":[215,0,0,0,"d8094738-9cb1-8f7a-cdeb-5e5b3098bb19"],"tStart":1645196131570},{"function":"startAdvertising","args":[],"tStart":1645196131569},{"function":"setDevicePreferences","args":[0,false,false,16700918,false],"tStart":1645196131571},{"function":"trackIBeacon","args":["fb0ae746-01a3-4ae1-aa25-2413bdcaf120","d8094738-9cb1-8f7a-cdeb-5e5b3098bb19"],"tStart":1645196131573},{"function":"startIndoorLocalization","args":[],"tStart":1645196131574},{"function":"startScanningForCrownstonesUniqueOnly","args":[],"tStart":1645196131576},{"function":"setLocationState","args":[215,0,0,0,"d8094738-9cb1-8f7a-cdeb-5e5b3098bb19"],"tStart":1645196131698}]}

var BluenetCallListing = function (_React$Component) {
  _inherits(BluenetCallListing, _React$Component);

  function BluenetCallListing(props) {
    _classCallCheck(this, BluenetCallListing);

    var _this = _possibleConstructorReturn(this, (BluenetCallListing.__proto__ || Object.getPrototypeOf(BluenetCallListing)).call(this, props));

    _this.pending = [];
    _this.finished = [];
    _this.bluenet = [];

    _this.state = { loaded: false };
    // this.processData(testData)
    return _this;
  }

  _createClass(BluenetCallListing, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      var _this2 = this;

      setInterval(function () {
        _this2.update();
      }, 1500);
    }
  }, {
    key: 'update',
    value: function update() {
      var _this3 = this;

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
      if (this.props.autoResolve !== false && this.props.tEnd) {
        textStyle.fontStyle = 'italic';
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