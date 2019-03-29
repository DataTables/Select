describe('Select - Events - user-select', function() {
	let table;
	let params = undefined;

	dt.libs({
		js: ['jquery', 'datatables', 'select'],
		css: ['datatables', 'select']
	});

	describe('Check the defaults', function() {
		let selected = undefined;

		dt.html('basic_id');
		it('Set stuff up', function() {
			table = $('#example')
				.DataTable({
					select: true
				})
				.on('user-select', function() {
					params = arguments;
					selected = $('.selected');
				});

			expect(params).toBe(undefined);
		});
		it('Is called with the right parameters', function() {
			$('tbody tr:eq(2) td:eq(0)').click();

			expect(params.length).toBe(5);
			expect(params[0] instanceof $.Event).toBe(true);
			expect(params[1] instanceof $.fn.dataTable.Api).toBe(true);
			expect(typeof params[2]).toBe('string');
			expect(params[3] instanceof $.fn.dataTable.Api).toBe(true);
			expect(params[4] instanceof $.Event).toBe(true);
		});
		it('Called before selection', function() {
			expect(selected.length).toBe(0);
		});
	});

	describe('Functional tests', function() {
		let prevent = false;

		dt.html('basic_id');
		it('API selects have no effect', function() {
			params = undefined;
			table = $('#example')
				.DataTable({
					select: {
						items: 'cell'
					}
				})
				.on('user-select', function(e, dt, type, cell, originalEvent) {
					params = arguments;
					if (prevent) {
						e.preventDefault();
					}
				});

			table.cell(2, 2).select();
			expect(params).toBeUndefined();
		});
		it('Click affects cell', function() {
			$('tbody tr:eq(2) td:eq(1)').click();
			expect(params[2]).toBe('cell');
			expect(params[3][0]).toEqual([{ row: 2, column: 1 }]);
			expect($('tbody tr:eq(2) td:eq(1)').hasClass('selected')).toBe(true);
		});
		it('Can prevent selection', function() {
			prevent = true;
			$('tbody tr:eq(2) td:eq(2)').click();
			expect(params[2]).toBe('cell');
			expect(params[3][0]).toEqual([{ row: 2, column: 2 }]);
			expect($('tbody tr:eq(2) td:eq(1)').hasClass('selected')).toBe(true);
			expect($('tbody tr:eq(2) td:eq(2)').hasClass('selected')).toBe(false);
		});

		dt.html('basic_id');
		it('Click affects row', function() {
			prevent = false;
			table = $('#example')
				.DataTable({
					select: {
						items: 'row'
					}
				})
				.on('user-select', function(e, dt, type, cell, originalEvent) {
					params = arguments;
					if (prevent) {
						e.preventDefault();
					}
				});

			$('tbody tr:eq(2) td:eq(1)').click();
			expect(params[2]).toBe('row');
			expect(params[3][0]).toEqual([{ row: 2, column: 1 }]);
			expect($('tbody tr:eq(2)').hasClass('selected')).toBe(true);
		});
		it('Can prevent selection', function() {
			prevent = true;
			$('tbody tr:eq(9) td:eq(1)').click();
			expect(params[2]).toBe('row');
			expect(params[3][0]).toEqual([{ row: 3, column: 1 }]);
			expect($('tbody tr:eq(2)').hasClass('selected')).toBe(true);
			expect($('tbody tr:eq(9)').hasClass('selected')).toBe(false);
		});

		dt.html('basic_id');
		it('Click affects column', function() {
			prevent = false;
			table = $('#example')
				.DataTable({
					select: {
						items: 'column'
					}
				})
				.on('user-select', function(e, dt, type, cell, originalEvent) {
					params = arguments;
					if (prevent) {
						e.preventDefault();
					}
				});

			$('tbody tr:eq(2) td:eq(3)').click();
			expect(params[2]).toBe('column');
			expect(params[3][0]).toEqual([{ row: 2, column: 3 }]);
			expect($('tbody tr:eq(2) td:eq(3)').hasClass('selected')).toBe(true);
		});
		it('Can prevent selection', function() {
			prevent = true;
			$('tbody tr:eq(2) td:eq(1)').click();
			expect(params[2]).toBe('column');
			expect(params[3][0]).toEqual([{ row: 2, column: 1 }]);
			expect($('tbody tr:eq(2) td:eq(3)').hasClass('selected')).toBe(true);
			expect($('tbody tr:eq(2) td:eq(1)').hasClass('selected')).toBe(false);
		});

		dt.html('basic_id');
		it('Click not selectable', function() {
			params = undefined;
			table = $('#example')
				.DataTable({
					select: {
						selector: 'td:first-child'
					}
				})
				.on('user-select', function(e, dt, type, cell, originalEvent) {
					params = arguments;
				});

			$('tbody tr:eq(2) td:eq(1)').click();
			expect(params).toBeUndefined();
		});

		dt.html('basic_id');
		it('Click selectable', function() {
			params = undefined;
			table = $('#example')
				.DataTable({
					select: {
						selector: 'td:first-child'
					}
				})
				.on('user-select', function(e, dt, type, cell, originalEvent) {
					params = arguments;
				});

			$('tbody tr:eq(2) td:eq(0)').click();
			expect(params[2]).toBe('row');
			expect(params[3][0]).toEqual([{ row: 2, column: 0 }]);
		});
	});
});
