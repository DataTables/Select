
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
	// {
	// 	// Create a single .d.ts file
	// 	input: './types/types.d.ts',
	// 	output: [{ file: 'dist/types.d.ts', format: 'es' }],
	// 	plugins: [dts()]
	// }
];
