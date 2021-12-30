import fs from 'fs-extra';
import path from 'path';
import commonjs from 'rollup-plugin-commonjs';
import json from '@rollup/plugin-json';
// import { terser } from 'rollup-plugin-terser';
import replace from '@rollup/plugin-replace';
import { babel } from '@rollup/plugin-babel';

const packages = fs.readdirSync(path.resolve(__dirname, 'packages'));
const production = !process.env.ROLLUP_WATCH;
const umd = process.env.UMD;

const configs = packages.map(key => {
  const pkg = fs.readJsonSync(`./packages/${key}/package.json`);
  const umdName = 'heiye';

  if (pkg.private) return [];

  const inputFile = path.resolve('packages', key, 'lib/index.js');

  /** @type {import('rollup').RollupOptions} */
  const common = {
    input: inputFile,
    sourcemap: false,
    plugins: [
      commonjs(),
      json(),
      replace({
        preventAssignment: true,
        'process.env.NODE_ENV': JSON.stringify(production ? 'production' : 'development')
      }),
      // terser()
    ],
    onwarn: function (warning) {
      if (warning.code === 'THIS_IS_UNDEFINED') {
        return;
      }
      console.error(`\n[rollup message]: ${warning.message}\n`);
    }
  };

  /** @type {import('rollup').RollupOptions} */
  const config = {
    ...common,
    output: [
      {
        format: 'es',
        sourcemap: false,
        file: path.resolve('packages', key, pkg.module)
      },
      {
        format: 'cjs',
        sourcemap: false,
        file: path.resolve('packages', key, pkg.main),
        exports: 'auto'
      },
    ],
    external: [...Object.keys(pkg.dependencies || {}), ...Object.keys(pkg.peerDependencies || {})]
  };

  /** @type {import('rollup').OutputOptions} */
  const umdOutputOption = {
    format: 'umd',
    name: umdName,
    sourcemap: false,
    inlineDynamicImports: true,
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
        file: path.resolve('packages', key, 'dist/index.min.js')
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
        file: path.resolve('packages', key, 'dist/index.es5.js'),
      },
      {
        ...umdOutputOption,
        file: path.resolve('packages', key, 'dist/index.es5.min.js')
      }
    ],
    plugins: [
      ...common.plugins,
      babel({
        babelHelpers: 'runtime',
        extensions: ['.js'],
      })
    ]
  };

  if (umd) {
    return [config, umdConfig, es5Config];
  } else {
    return [config];
  }
}).flat();

export default [...configs];
