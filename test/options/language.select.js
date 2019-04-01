describe('Select - language.select', function() {
	let table;

	dt.libs({
		js: ['jquery', 'datatables', 'select'],
		css: ['datatables', 'select']
	});

	describe('Functional tests', function() {
		dt.html('basic');
		it('Single string - nothing selected', function() {
			table = $('#example').DataTable({
				select: {
					style: 'multi'
				},
				language: {
					select: {
						cells: '%d test cells',
						rows: '%d test rows',
						columns: '%d test columns'
					}
				}
			});

			expect($('span.select-item:eq(0)').text()).toBe('0 test rows');
			expect($('span.select-item:eq(1)').text()).toBe('0 test columns');
			expect($('span.select-item:eq(2)').text()).toBe('0 test cells');
		});
		it('Single string - single', function() {
			table.select.items('row');
			$('#example tbody tr:eq(2) td:eq(1)').click();
			table.select.items('cell');
			$('#example tbody tr:eq(3) td:eq(1)').click();
			table.select.items('column');
			$('#example tbody tr:eq(4) td:eq(2)').click();

			expect($('span.select-item:eq(0)').text()).toBe('1 test rows');
			expect($('span.select-item:eq(1)').text()).toBe('1 test columns');
			expect($('span.select-item:eq(2)').text()).toBe('1 test cells');
		});
		it('Single string - multiple', function() {
			table.select.items('row');
			$('#example tbody tr:eq(5) td:eq(1)').click();
			table.select.items('cell');
			$('#example tbody tr:eq(6) td:eq(1)').click();
			table.select.items('column');
			$('#example tbody tr:eq(7) td:eq(3)').click();

			expect($('span.select-item:eq(0)').text()).toBe('2 test rows');
			expect($('span.select-item:eq(1)').text()).toBe('2 test columns');
			expect($('span.select-item:eq(2)').text()).toBe('2 test cells');
		});

		dt.html('basic');
		it('Multiple strings - nothing selected', function() {
			table = $('#example').DataTable({
				select: {
					style: 'multi'
				},
				language: {
					select: {
						cells: {
							_: 'test no cells',
							1: '%d test cell',
							2: '%d test cells'
						},
						rows: {
							_: 'test no rows',
							1: '%d test row',
							2: '%d test rows'
						},
						columns: {
							_: 'test no columns',
							1: '%d test column',
							2: '%d test columns'
						}
					}
				}
			});

			expect($('span.select-item:eq(0)').text()).toBe('test no rows');
			expect($('span.select-item:eq(1)').text()).toBe('test no columns');
			expect($('span.select-item:eq(2)').text()).toBe('test no cells');
		});
		it('Multiple strings - single', function() {
			table.select.items('row');
			$('#example tbody tr:eq(2) td:eq(1)').click();
			table.select.items('cell');
			$('#example tbody tr:eq(3) td:eq(1)').click();
			table.select.items('column');
			$('#example tbody tr:eq(4) td:eq(2)').click();

			expect($('span.select-item:eq(0)').text()).toBe('1 test row');
			expect($('span.select-item:eq(1)').text()).toBe('1 test column');
			expect($('span.select-item:eq(2)').text()).toBe('1 test cell');
		});
		it('Multiple strings - multiple', function() {
			table.select.items('row');
			$('#example tbody tr:eq(5) td:eq(1)').click();
			table.select.items('cell');
			$('#example tbody tr:eq(6) td:eq(1)').click();
			table.select.items('column');
			$('#example tbody tr:eq(7) td:eq(3)').click();

			expect($('span.select-item:eq(0)').text()).toBe('2 test rows');
			expect($('span.select-item:eq(1)').text()).toBe('2 test columns');
			expect($('span.select-item:eq(2)').text()).toBe('2 test cells');
		});
	});
});
