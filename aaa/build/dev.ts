import commonConfig from './base';
import { merge } from 'webpack-merge';
module.exports = merge(commonConfig, {
  mode: 'development',
});