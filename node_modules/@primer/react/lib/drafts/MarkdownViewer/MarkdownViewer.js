'use strict';

var React = require('react');
var _useLinkInterception = require('./_useLinkInterception.js');
var _useListInteraction = require('./_useListInteraction.js');
var Box = require('../../Box/Box.js');
var Spinner = require('../../Spinner/Spinner.js');

function _interopDefault (e) { return e && e.__esModule ? e : { default: e }; }

var React__default = /*#__PURE__*/_interopDefault(React);

const MarkdownViewer = ({
  dangerousRenderedHTML,
  loading = false,
  markdownValue = '',
  onChange: externalOnChange,
  disabled = false,
  onLinkClick,
  openLinksInNewTab = false
}) => {
  // We're using state to store the HTML container because we want the value
  // to re-run effects when it changes
  const [htmlContainer, setHtmlContainer] = React__default.default.useState();
  const htmlContainerRef = React__default.default.useCallback(node => {
    if (!node) return;
    setHtmlContainer(node);
  }, []);
  const onChange = React.useCallback(async value => {
    try {
      await (externalOnChange === null || externalOnChange === void 0 ? void 0 : externalOnChange(value));
    } catch (error) {
      if (htmlContainer) {
        htmlContainer.innerHTML = dangerousRenderedHTML.__html;
      }
    }
  }, [externalOnChange, htmlContainer, dangerousRenderedHTML]);
  _useListInteraction.useListInteraction({
    onChange,
    disabled: disabled || !externalOnChange,
    htmlContainer,
    markdownValue,
    dependencies: [dangerousRenderedHTML]
  });
  _useLinkInterception.useLinkInterception({
    htmlContainer,
    onLinkClick,
    openLinksInNewTab
  });
  return loading ? /*#__PURE__*/React__default.default.createElement(Box, {
    sx: {
      display: 'flex',
      justifyContent: 'space-around',
      p: 2
    }
  }, /*#__PURE__*/React__default.default.createElement(Spinner, {
    "aria-label": "Loading content..."
  })) : /*#__PURE__*/React__default.default.createElement(Box, {
    ref: htmlContainerRef,
    className: "markdown-body",
    sx: {
      fontSize: 1,
      maxWidth: '100%',
      '& > div > :last-child': {
        mb: 0
      }
    },
    dangerouslySetInnerHTML: dangerousRenderedHTML
  });
};
var MarkdownViewer$1 = MarkdownViewer;

module.exports = MarkdownViewer$1;
