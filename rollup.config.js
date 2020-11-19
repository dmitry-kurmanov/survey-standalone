import { terser } from 'rollup-plugin-terser';
import autoPreprocess from 'svelte-preprocess';
import babel from 'rollup-plugin-babel';
import commonjs from 'rollup-plugin-commonjs';
import livereload from 'rollup-plugin-livereload';
import pkg from './package.json';
import resolve from 'rollup-plugin-node-resolve';
import svelte from 'rollup-plugin-svelte';

const production = !process.env.ROLLUP_WATCH;
const name = 'Survey';

const cssOutputPath = production ? 'dist/survey-standalone.css' : 'public/survey-standalone.css';

export default {
	input: 'src/index.js',
	output: !production
		? {
				sourcemap: true,
				format: 'iife',
				name,
				file: 'public/survey-standalone.js',
		  }
		: [
				{
					file: pkg.module,
					format: 'es',
					sourcemap: true,
					name,
				},
				{
					file: pkg.main,
					format: 'umd',
					sourcemap: true,
					name,
				},
		  ],
	plugins: [
		babel({
			runtimeHelpers: true,
		}),
		svelte({
			// enable run-time checks when not in production
			dev: !production,
			// we'll extract any component CSS out into
			// a separate file — better for performance
			css: (css) => {
				css.write(cssOutputPath);
			},
			/**
			 * Auto preprocess supported languages with
			 * '<template>'/'external src files' support
			 **/
			preprocess: autoPreprocess({
				postcss: true,
				scss: { includePaths: ['src', 'node_modules'] },
			}),
			accessors: true,
		}),

		// If you have external dependencies installed from
		// npm, you'll most likely need these plugins. In
		// some cases you'll need additional configuration —
		// consult the documentation for details:
		// https://github.com/rollup/rollup-plugin-commonjs
		resolve({
			browser: true,
			dedupe: ['svelte'],
		}),
		commonjs({
			include: ['node_modules/**'],
		}),

		// In dev mode, call `npm run start` once
		// the bundle has been generated
		!production && serve(),

		// Watch the `public` directory and refresh the
		// browser on changes when not in production
		!production && livereload('public'),

		// If we're building for production (npm run build
		// instead of npm run dev), minify
		production && terser(),
	],
	watch: {
		clearScreen: false,
	},
};

function serve() {
	let started = false;

	return {
		writeBundle() {
			if (!started) {
				started = true;

				require('child_process').spawn(
					'npm',
					['run', 'start', '--', '--dev'],
					{
						stdio: ['ignore', 'inherit', 'inherit'],
						shell: true,
					}
				);
			}
		},
	};
}
