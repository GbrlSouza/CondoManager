import { isErrorLike, serializeError } from 'serialize-error';
import React, { type ReactNode, useEffect, useState, useCallback, useRef } from 'react';
import { Animated, Text, View } from 'react-native';

export function SharedErrorBoundary({
  isOpen,
  children,
  description,
}: {
  isOpen: boolean;
  children?: ReactNode;
  description?: string;
}): React.ReactElement {
  const animation = useRef(new Animated.Value(isOpen ? 1 : 0)).current;
  const [contentHeight, setContentHeight] = useState<number>(0);

  useEffect(() => {
    Animated.timing(animation, {
      toValue: isOpen ? 1 : 0,
      duration: 250,
      useNativeDriver: true,
    }).start();
  }, [isOpen, animation]);

  const translateY = animation.interpolate({
    inputRange: [0, 1],
    // fallback 100 if height not measured yet so it starts off-screen
    outputRange: [Math.max(contentHeight + 34, 100), 0],
  });

  const opacity = animation;

  return (
    <Animated.View
      pointerEvents={isOpen ? 'auto' : 'none'}
      style={{
        position: 'absolute',
        bottom: 34,
        transform: [
          {
            translateY,
          },
        ],
        zIndex: 50,
        alignItems: 'center',
        justifyContent: 'center',
        left: '5%',
        width: '90%',
      }}
    >
      <View
        onLayout={(e) => setContentHeight(e.nativeEvent.layout.height)}
        style={{
          backgroundColor: '#18191B',
          borderRadius: 8,
          padding: 16,
          maxWidth: 448,
          width: '100%',
          marginHorizontal: 16,
          boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.15)',
        }}
      >
        <View style={{ flexDirection: 'row', gap: 12, alignItems: 'flex-start' }}>
          <View style={{ flexShrink: 0 }}>
            <View
              style={{
                width: 32,
                height: 32,
                backgroundColor: '#F2F2F2',
                borderRadius: 16,
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <Text style={{ color: '#000', fontSize: 18, lineHeight: 18 }}>⚠</Text>
            </View>
          </View>

          <View style={{ flex: 1, gap: 8 }}>
            <View style={{ gap: 4 }}>
              <Text style={{ color: '#F2F2F2', fontSize: 14, fontWeight: '300' }}>
                App Error Detected
              </Text>
              <Text style={{ color: '#959697', fontSize: 14, fontWeight: '300' }}>
                {description ?? 'It looks like an error occurred while trying to use your app.'}
              </Text>
            </View>
            {children}
          </View>
        </View>
      </View>
    </Animated.View>
  );
}
export function Button({
  color = 'primary',
  onPress = () => {},
  children,
}: {
  color?: 'primary' | 'secondary';
  onPress?: () => void;
  children: string;
}): React.ReactElement {
  return (
    <View
      style={{
        backgroundColor: color === 'secondary' ? '#2C2D2F' : '#F9F9F9',
        borderRadius: 8,
        borderWidth: 1,
        borderColor: color === 'secondary' ? '#414243' : '#C4C4C4',
        padding: 4,
        paddingHorizontal: 8,
      }}
    >
      <Text
        style={{ color: color === 'secondary' ? 'white' : '#18191B', fontSize: 14 }}
        onPress={onPress}
      >
        {children}
      </Text>
    </View>
  );
}

function InternalErrorBoundary({
  error: errorArg = null,
}: {
  error: unknown | null;
}) {
  const [isOpen, setIsOpen] = useState(true);
  const handleShowLogsClick = useCallback(() => {
    window.parent.postMessage(
      {
        type: 'sandbox:web:show-logs',
      },
      '*'
    );
  }, []);
  const handleFixClick = useCallback(() => {
    window.parent.postMessage(
      {
        type: 'sandbox:web:fix',
        error: serializeError(errorArg),
      },
      '*'
    );
    setIsOpen(false);
  }, [errorArg]);
  const handleCopyError = useCallback(() => {
    const serializedError = serializeError(errorArg);
    const text = isErrorLike(serializedError)
      ? `${serializedError.message}\n\n${serializedError.stack}`
      : JSON.stringify(serializedError, null, 2);
    navigator.clipboard.writeText(text);
    setIsOpen(false);
  }, [errorArg]);

  function isInIframe() {
    try {
      return window.parent !== window;
    } catch {
      return true;
    }
  }
  return (
    <SharedErrorBoundary isOpen={isOpen}>
      <View style={{ flexDirection: 'row', gap: 8 }}>
        {isInIframe() ? (
          <>
            <Button color="primary" onPress={handleFixClick}>
              Try to fix
            </Button>
            <Button color="secondary" onPress={handleShowLogsClick}>
              Show logs
            </Button>
          </>
        ) : (
          <Button color="primary" onPress={handleCopyError}>
            Copy error
          </Button>
        )}
      </View>
    </SharedErrorBoundary>
  );
}

type ErrorBoundaryState = { hasError: boolean; error: unknown | null };

export class ErrorBoundaryWrapper extends React.Component<
  {
    children: ReactNode;
  },
  ErrorBoundaryState
> {
  state: ErrorBoundaryState = { hasError: false, error: null };

  static getDerivedStateFromError(error: unknown): ErrorBoundaryState {
    return { hasError: true, error };
  }

  componentDidCatch(error: unknown, info: unknown) {
    console.warn(error, info);
  }

  render() {
    if (this.state.hasError) {
      return <InternalErrorBoundary error={this.state.error} />;
    }
    return this.props.children;
  }
}
