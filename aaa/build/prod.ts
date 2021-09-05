
import commonConfig from './base';
import { merge } from 'webpack-merge';
import { BundleAnalyzerPlugin } from 'webpack-bundle-analyzer';

module.exports = merge(commonConfig, {
  mode: 'production',
  optimization: {
    minimize: true
  },
  plugins: [
    new BundleAnalyzerPlugin()
  ]
});