webpackHotUpdate(0,{

/***/ 933:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(1);

var _react2 = _interopRequireDefault(_react);

var _semanticUiReact = __webpack_require__(226);

var _MenuBar = __webpack_require__(458);

var _MenuBar2 = _interopRequireDefault(_MenuBar);

__webpack_require__(939);

var _isomorphicFetch = __webpack_require__(537);

var _isomorphicFetch2 = _interopRequireDefault(_isomorphicFetch);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } // Import React Components


// Import Semantic-UI and CSS Components


// Import Local Components


var Profile = function (_Component) {
  _inherits(Profile, _Component);

  function Profile(props) {
    _classCallCheck(this, Profile);

    var _this = _possibleConstructorReturn(this, (Profile.__proto__ || Object.getPrototypeOf(Profile)).call(this, props));

    _this.state = {
      currentUser: []
    };
    return _this;
  }

  _createClass(Profile, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      var _this2 = this;

      (0, _isomorphicFetch2.default)('auth/loggedIn', { credentials: 'include' }).then(function (res) {
        console.log();
        return res.json();
      }).then(function (data) {
        if (data === false) {
          window.location = '/';
        }
        _this2.setState({
          currentUser: data
        });
      });
    }
  }, {
    key: 'render',
    value: function render() {
      return _react2.default.createElement(
        'div',
        null,
        _react2.default.createElement(_MenuBar2.default, null),
        _react2.default.createElement(
          _semanticUiReact.Container,
          { width: 16 },
          _react2.default.createElement(
            _semanticUiReact.Grid,
            { stackable: true },
            _react2.default.createElement(
              _semanticUiReact.Grid.Column,
              { width: 4 },
              _react2.default.createElement(_semanticUiReact.Image, { shape: 'rounded', src: this.state.currentUser.img_url })
            ),
            _react2.default.createElement(
              _semanticUiReact.Grid.Column,
              { width: 12, className: 'userInfo', verticalAlign: 'middle', textAlign: 'center' },
              _react2.default.createElement(
                _semanticUiReact.Segment,
                { vertical: true },
                _react2.default.createElement(
                  _semanticUiReact.Header,
                  { as: 'h1', color: 'teal' },
                  this.state.currentUser.display_name
                )
              ),
              _react2.default.createElement(
                _semanticUiReact.Segment,
                { vertical: true },
                _react2.default.createElement(
                  _semanticUiReact.Header,
                  { as: 'h2', color: 'teal' },
                  this.state.currentUser.age
                )
              )
            )
          )
        )
      );
    }
  }]);

  return Profile;
}(_react.Component);

exports.default = Profile;

/***/ })

})
//# sourceMappingURL=0.d072184ec34b60e08604.hot-update.js.map