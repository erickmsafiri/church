import React__default, { useCallback } from 'react';
import { useLinkInterception } from './_useLinkInterception.js';
import { useListInteraction } from './_useListInteraction.js';
import Box from '../../Box/Box.js';
import Spinner from '../../Spinner/Spinner.js';

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
  const [htmlContainer, setHtmlContainer] = React__default.useState();
  const htmlContainerRef = React__default.useCallback(node => {
    if (!node) return;
    setHtmlContainer(node);
  }, []);
  const onChange = useCallback(async value => {
    try {
      await (externalOnChange === null || externalOnChange === void 0 ? void 0 : externalOnChange(value));
    } catch (error) {
      if (htmlContainer) {
        htmlContainer.innerHTML = dangerousRenderedHTML.__html;
      }
    }
  }, [externalOnChange, htmlContainer, dangerousRenderedHTML]);
  useListInteraction({
    onChange,
    disabled: disabled || !externalOnChange,
    htmlContainer,
    markdownValue,
    dependencies: [dangerousRenderedHTML]
  });
  useLinkInterception({
    htmlContainer,
    onLinkClick,
    openLinksInNewTab
  });
  return loading ? /*#__PURE__*/React__default.createElement(Box, {
    sx: {
      display: 'flex',
      justifyContent: 'space-around',
      p: 2
    }
  }, /*#__PURE__*/React__default.createElement(Spinner, {
    "aria-label": "Loading content..."
  })) : /*#__PURE__*/React__default.createElement(Box, {
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

export { MarkdownViewer$1 as default };
