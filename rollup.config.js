// import { nodeResolve } from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import json from '@rollup/plugin-json'
import myBanner from './rollup-plugin-banner';

export default {
    input: 'src/index.js',
    output: {
        file: 'bin/index.js',
        format: 'cjs',
        // banner: '#! /usr/bin/env node'
    },
    plugins: [
        // nodeResolve(),
        commonjs(),
        json(),
        myBanner()
    ]
}