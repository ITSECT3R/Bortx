import { h } from 'vue';
import DefaultTheme from 'vitepress/theme';
import 'bortx/borders';
import 'bortx/text';
import './custom.css';
import FeatureBorders from './FeatureBorders.vue';
import VortexLogo from './VortexLogo.vue';

export default {
  extends: DefaultTheme,
  Layout: () =>
    h(DefaultTheme.Layout, null, {
      'home-hero-image': () => h(VortexLogo),
      'home-features-after': () => h(FeatureBorders),
    }),
  enhanceApp({ app }) {
    app.component('VortexLogo', VortexLogo);
  },
};
