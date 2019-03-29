describe('Select - Events - selectItems', function() {
	let table;

	dt.libs({
		js: ['jquery', 'datatables', 'select'],
		css: ['datatables', 'select']
	});

	describe('Check the defaults', function() {
		let params = undefined;

		dt.html('basic_id');
		it('Set stuff up', function() {
			table = $('#example')
				.DataTable()
				.on('selectItems', function() {
					params = arguments;
				});

			expect(params).toBe(undefined);
		});
		it('Is called with the right parameters', function() {
			table.select.items('columns');

			expect(params.length).toBe(3);
			expect(params[0] instanceof $.Event).toBe(true);
			expect(params[1] instanceof $.fn.dataTable.Api).toBe(true);
			expect(typeof params[2]).toBe('string');
		});
	});

	describe('Functional tests', function() {
		let params = undefined;

		dt.html('basic_id');
		it('Set stuff up', function() {
			table = $('#example')
				.DataTable({
					select: {
						style: 'api'
					}
				})
				.on('selectItems', function() {
					params = arguments;
				});

			expect(params).toBe(undefined);
		});
		it('Set to column', function() {
			table.select.items('column');
			expect(params[2]).toBe('column');
		});
		it('Set to row', function() {
			table.select.items('row');
			expect(params[2]).toBe('row');
		});
		it('Set to cell', function() {
			table.select.items('cell');
			expect(params[2]).toBe('cell');
		});
		it('Set to unknown', function() {
			table.select.items('unknown');
			expect(params[2]).toBe('unknown');
		});
	});
});
