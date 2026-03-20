import React__default from 'react';
import { VisuallyHidden } from './VisuallyHidden.js';

const LiveRegionContext = /*#__PURE__*/React__default.createContext(null);
function useLiveRegion() {
  const context = React__default.useContext(LiveRegionContext);
  if (!context) {
    throw new Error('useLiveRegion() must be used within a <LiveRegion>');
  }
  return context;
}
function LiveRegion({
  children
}) {
  const [message, setMessage] = React__default.useState('');
  const value = React__default.useMemo(() => {
    return {
      announce: setMessage,
      message
    };
  }, [message]);
  return /*#__PURE__*/React__default.createElement(LiveRegionContext.Provider, {
    value: value
  }, children);
}
LiveRegion.displayName = "LiveRegion";
function LiveRegionOutlet() {
  const liveRegion = useLiveRegion();
  return /*#__PURE__*/React__default.createElement(VisuallyHidden, {
    role: "status",
    "aria-live": "polite",
    "aria-atomic": true
  }, liveRegion.message);
}
LiveRegionOutlet.displayName = "LiveRegionOutlet";
function Message({
  value
}) {
  const liveRegion = useLiveRegion();
  const savedLiveRegion = React__default.useRef(liveRegion);
  const committedRef = React__default.useRef(false);
  React__default.useEffect(() => {
    savedLiveRegion.current = liveRegion;
  }, [liveRegion]);
  React__default.useEffect(() => {
    if (committedRef.current !== true) {
      return;
    }
    const timeoutId = setTimeout(() => {
      savedLiveRegion.current.announce(value);
    }, 750);
    return () => {
      clearTimeout(timeoutId);
    };
  }, [value]);
  React__default.useEffect(() => {
    committedRef.current = true;
    return () => {
      committedRef.current = false;
    };
  }, []);
  return null;
}

export { LiveRegion, LiveRegionOutlet, Message, useLiveRegion };
