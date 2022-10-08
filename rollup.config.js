import { babel } from '@rollup/plugin-babel'
import commonjs from '@rollup/plugin-commonjs'
import { nodeResolve } from '@rollup/plugin-node-resolve'
import external from 'rollup-plugin-peer-deps-external'
import nodePolyfills from 'rollup-plugin-polyfill-node'
import postcss from 'rollup-plugin-postcss'

import pkg from './package.json'

export default {
    external: ['react', 'react-dom', 'react-is', 'prop-types'],
    input: 'src/index.js',
    output: [
        {
            file: pkg.main,
            format: 'cjs',
            sourcemap: true,
        },
        {
            file: pkg.module,
            format: 'es',
            sourcemap: true,
        },
    ],
    plugins: [
        nodeResolve(),
        external(),
        postcss({
            modules: true,
        }),
        // url(),
        babel({
            babelHelpers: 'runtime',
            exclude: 'node_modules/**',
            plugins: ['@babel/plugin-transform-runtime'],
            // plugins: ['@babel/plugin-external-helpers'],
        }),
        commonjs(),
        nodePolyfills(),
    ],
}
