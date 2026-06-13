import { h } from 'vue';
import DefaultTheme from 'vitepress/theme';
import 'knocking-borders/borders';
import 'knocking-borders/text';
import './custom.css';
import FeatureBorders from './FeatureBorders.vue';

export default {
  extends: DefaultTheme,
  Layout: () =>
    h(DefaultTheme.Layout, null, {
      'home-features-after': () => h(FeatureBorders),
    }),
};
