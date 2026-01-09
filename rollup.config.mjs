import { dts } from 'rollup-plugin-dts';

export default [
	{
		input: 'dist/dataTables.select.js',
		output: {
			file: 'dist/dataTables.select.js',
			format: 'es'
		},
		plugins: [],
		external: ['datatables.net']
	},
	{
		// Create a single .d.ts file
		input: './dist/interface.d.ts',
		output: [{ file: 'dist/types.d.ts', format: 'es' }],
		plugins: [dts()]
	}
];
