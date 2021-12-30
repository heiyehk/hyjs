// rollup babel插件
import { babel } from '@rollup/plugin-babel';
// 将json 文件转换为ES6 模块
import json from '@rollup/plugin-json';
import replace from '@rollup/plugin-replace';
import fs from 'fs-extra';
// 在node_模块中查找并绑定第三方依赖项
// import resolve from '@rollup/plugin-node-resolve';
import path from 'path';
// 删除工具
// import rm from 'rimraf';
// 将CommonJS模块转换为ES6
import commonjs from 'rollup-plugin-commonjs';
// 优化代码
import { terser } from 'rollup-plugin-terser';

const production = !process.env.ROLLUP_WATCH;
const umd = process.env.UMD;

const packages = fs.readdirSync(path.resolve(__dirname, 'packages'));

const configs = packages
  .map((key) => {
    const pkg = fs.readJsonSync(`./packages/${key}/package.json`);
    if (pkg.private) return [];

    const inputFile = path.resolve('packages', key, 'lib/index.js');
    const umdName = key.startsWith('plugin-') ? _.camelCase(`bytemd-${key}`) : 'bytemd';

    /** @type {import('rollup').RollupOptions} */
    const common = {
      input: inputFile,
      plugins: [
        commonjs(),
        json(),
        replace({
          preventAssignment: true,
          'process.env.NODE_ENV': JSON.stringify(production ? 'production' : 'development')
        })
      ]
      // watch: {
      //   clearScreen: false,
      // },
    };

    /** @type {import('rollup').RollupOptions} */
    const config = {
      ...common,
      output: [
        {
          format: 'es',
          sourcemap: true,
          file: path.resolve('packages', key, pkg.module)
        },
        {
          format: 'cjs',
          sourcemap: true,
          file: path.resolve('packages', key, pkg.main),
          exports: 'auto' // fix warning
        }
      ],
      external: [...Object.keys(pkg.dependencies || {}), ...Object.keys(pkg.peerDependencies || {})]
    };

    /** @type {import('rollup').OutputOptions} */
    const umdOutputOption = {
      format: 'umd',
      name: umdName,
      sourcemap: true,
      inlineDynamicImports: true
    };

    /** @type {import('rollup').RollupOptions} */
    const umdConfig = {
      ...common,
      output: [
        {
          ...umdOutputOption,
          file: path.resolve('packages', key, 'dist/index.js')
        },
        {
          ...umdOutputOption,
          file: path.resolve('packages', key, 'dist/index.min.js'),
          plugins: [terser()]
        }
      ],
      external: Object.keys(pkg.peerDependencies || {})
    };

    /** @type {import('rollup').RollupOptions} */
    const es5Config = {
      ...common,
      input: path.resolve('packages', key, 'lib/index.js'),
      output: [
        {
          ...umdOutputOption,
          file: path.resolve('packages', key, 'dist/index.es5.js')
        },
        {
          ...umdOutputOption,
          file: path.resolve('packages', key, 'dist/index.es5.min.js'),
          plugins: [terser()]
        }
      ],
      plugins: [
        ...common.plugins,
        babel({
          babelHelpers: 'runtime',
          extensions: ['.js', '.mjs', '.html', '.svelte']
        }),
        terser()
      ]
    };

    if (umd) {
      console.log([config, umdConfig, es5Config]);
      return [config, umdConfig, es5Config];
    } else {
      console.log([config]);
      return [config];
    }
  })
  .flat();

export default [...configs];
