import { StatusBar as ExpoStatusBar } from 'expo-status-bar/src/NativeStatusBarWrapper';
import React, { useEffect } from 'react';
import { Appearance, useColorScheme } from 'react-native';

function postColorToParent(color) {
  try {
    window.parent.postMessage(
      {
        type: 'sandbox:mobile:statusbarcolor',
        color: color,
        timestamp: Date.now(),
      },
      '*'
    );
  } catch {
    console.warn('Color was not sent to parent');
  }
}

function styleToBarStyle(style = 'auto', colorScheme = Appearance.getColorScheme()) {
  const actualColorScheme = colorScheme || 'light';

  let resolvedStyle = style;
  if (style === 'auto') {
    resolvedStyle = actualColorScheme === 'light' ? 'dark' : 'light';
  } else if (style === 'inverted') {
    resolvedStyle = actualColorScheme === 'light' ? 'light' : 'dark';
  }

  return resolvedStyle === 'light' ? '#FFFFFF' : '#000000';
}

export const StatusBar = React.forwardRef(({ style = 'auto', ...props }, forwardedRef) => {
  const colorScheme = useColorScheme();
  useEffect(() => {
    postColorToParent(styleToBarStyle(style, colorScheme));
  }, [style, colorScheme]);

  return <ExpoStatusBar ref={forwardedRef} style={style} {...props} />;
});

StatusBar.displayName = 'StatusBar';

export {
  setStatusBarStyle,
  setStatusBarHidden,
  setStatusBarBackgroundColor,
  setStatusBarNetworkActivityIndicatorVisible,
  setStatusBarTranslucent,
} from 'expo-status-bar/src/NativeStatusBarWrapper';

export { StatusBarStyle, StatusBarAnimation, StatusBarProps } from 'expo-status-bar/src/types';
