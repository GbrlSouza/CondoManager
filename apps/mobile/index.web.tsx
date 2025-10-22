import '@expo/metro-runtime';
import './__create/consoleToParent';
import { renderRootComponent } from 'expo-router/build/renderRootComponent';

import { LoadSkiaWeb } from '@shopify/react-native-skia/lib/module/web';
import './__create/reset.css';
import CreateApp from './App';

LoadSkiaWeb().then(async () => {
  renderRootComponent(CreateApp);
});
