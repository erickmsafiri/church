'use strict';

var React = require('react');
require('../sx.js');
var _VisuallyHidden = require('../_VisuallyHidden.js');
var defaultSxProp = require('../utils/defaultSxProp.js');
var Box = require('../Box/Box.js');
var merge = require('deepmerge');

function _interopDefault (e) { return e && e.__esModule ? e : { default: e }; }

var React__default = /*#__PURE__*/_interopDefault(React);
var merge__default = /*#__PURE__*/_interopDefault(merge);

function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }
const CounterLabel = /*#__PURE__*/React.forwardRef(({
  scheme = 'secondary',
  sx = defaultSxProp.defaultSxProp,
  children,
  ...props
}, forwardedRef) => {
  return /*#__PURE__*/React__default.default.createElement(React__default.default.Fragment, null, /*#__PURE__*/React__default.default.createElement(Box, _extends({
    "aria-hidden": "true",
    sx: merge__default.default({
      display: 'inline-block',
      padding: '2px 5px',
      fontSize: 0,
      fontWeight: 'bold',
      lineHeight: 'condensedUltra',
      borderRadius: '20px',
      backgroundColor: scheme === 'primary' ? 'neutral.emphasis' : 'neutral.muted',
      color: scheme === 'primary' ? 'fg.onEmphasis' : 'fg.default',
      '&:empty': {
        display: 'none'
      }
    }, sx)
  }, props, {
    as: "span"
    // @ts-expect-error Box is expecting a divelement, but this component forces a span element
    ,
    ref: forwardedRef
  }), children), /*#__PURE__*/React__default.default.createElement(_VisuallyHidden, null, "\xA0(", children, ")"));
});
CounterLabel.displayName = 'CounterLabel';
var CounterLabel$1 = CounterLabel;

module.exports = CounterLabel$1;
