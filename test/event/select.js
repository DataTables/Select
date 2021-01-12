describe('Select - Events - select', function () {
	let table;

	dt.libs({
		js: ['jquery', 'datatables', 'select'],
		css: ['datatables', 'select']
	});

	describe('Check the defaults', function () {
		let params = undefined;
		let selected = undefined;

		dt.html('basic_id');
		it('Set stuff up', function () {
			table = $('#example')
				.DataTable({
					select: true
				})
				.on('select', function () {
					params = arguments;
					selected = $('.selected');
				});

			expect(params).toBe(undefined);
		});
		it('Is called with the right parameters', function () {
			table.row(2).select();

			expect(params.length).toBe(4);
			expect(params[0] instanceof $.Event).toBe(true);
			expect(params[1] instanceof $.fn.dataTable.Api).toBe(true);
			expect(typeof params[2]).toBe('string');
			expect(params[3] instanceof Array).toBe(true);
		});
		it('Called after selection', function () {
			expect(selected.length).toBe(1);
		});
	});

	describe('Functional tests - api', function () {
		let params = undefined;

		dt.html('basic_id');
		it('Set stuff up', function () {
			table = $('#example')
				.DataTable({
					select: {
						style: 'multi'
					}
				})
				.on('select', function () {
					params = arguments;
				});

			expect(params).toBe(undefined);
		});
		it('cell', function () {
			table.cell(2, 1).select();
			expect(params[2]).toBe('cell');
			expect(params[3]).toEqual([{row: 2, column: 1, columnVisible: 1}]);
		});
		it('same cell (event triggered again)', function () {
			table.cell(2, 1).select();
			expect(params[2]).toBe('cell');
			expect(params[3]).toEqual([{row: 2, column: 1, columnVisible: 1}]);
		});
		it('cells', function () {
			table
				.cells([
					{row: 2, column: 2},
					{row: 2, column: 0}
				])
				.select();
			expect(params[2]).toBe('cell');
			expect(params[3]).toEqual([
				{row: 2, column: 2, columnVisible: 2},
				{row: 2, column: 0, columnVisible: 0}
			]);
		});
		it('row', function () {
			table.row(3).select();
			expect(params[2]).toBe('row');
			expect(params[3]).toEqual([3]);
		});
		it('rows', function () {
			table.rows([5, 50]).select();
			expect(params[2]).toBe('row');
			expect(params[3]).toEqual([5, 50]);
		});
		it('column', function () {
			table.column(3).select();
			expect(params[2]).toBe('column');
			expect(params[3]).toEqual([3]);
		});
		it('columns', function () {
			table.column(3).select();
			expect(params[2]).toBe('column');
			expect(params[3]).toEqual([3]);
		});
	});

	describe('Functional tests - clicks', function () {
		dt.html('basic_id');
		it('Click affects cell', function () {
			params = undefined;
			table = $('#example')
				.DataTable({
					select: {
						items: 'cell'
					}
				})
				.on('select', function () {
					params = arguments;
				});

			$('tbody tr:eq(2) td:eq(1)').click();
			expect(params[2]).toBe('cell');

			// DD-856
			// expect(params[3]).toEqual([{ row: 2, column: 1 }]);
			expect(params[3]).toEqual([{row: 2, column: 1, columnVisible: 1}]);
		});

		dt.html('basic_id');
		it('Click affects row', function () {
			params = undefined;
			table = $('#example')
				.DataTable({
					select: {
						items: 'row'
					}
				})
				.on('select', function () {
					params = arguments;
				});

			$('tbody tr:eq(2) td:eq(1)').click();
			expect(params[2]).toBe('row');
			expect(params[3]).toEqual([2]);
		});

		dt.html('basic_id');
		it('Click affects column', function () {
			params = undefined;
			table = $('#example')
				.DataTable({
					select: {
						items: 'column'
					}
				})
				.on('select', function () {
					params = arguments;
				});

			$('tbody tr:eq(2) td:eq(1)').click();
			expect(params[2]).toBe('column');
			expect(params[3]).toEqual([1]);
		});

		dt.html('basic_id');
		it('Click not selectable', function () {
			params = undefined;
			table = $('#example')
				.DataTable({
					select: {
						selector: 'td:first-child'
					}
				})
				.on('select', function () {
					params = arguments;
				});

			$('tbody tr:eq(2) td:eq(1)').click();
			expect(params).toBeUndefined();
		});

		dt.html('basic_id');
		it('Click selectable', function () {
			params = undefined;
			table = $('#example')
				.DataTable({
					select: {
						selector: 'td:first-child'
					}
				})
				.on('select', function () {
					params = arguments;
				});

			$('tbody tr:eq(2) td:eq(0)').click();
			expect(params[2]).toBe('row');
			expect(params[3]).toEqual([2]);
		});
	});
});
