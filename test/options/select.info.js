describe('Select - select.info', function() {
	let table;

	dt.libs({
		js: ['jquery', 'datatables', 'select'],
		css: ['datatables', 'select']
	});

	describe('Functional tests', function() {
		dt.html('basic');
		it('No info', function() {
			table = $('#example').DataTable({
				select: {
					info: false
				}
			});

			$('#example tbody tr:eq(2) td:eq(1)').click();
			expect($('div.dt-info span.select-info').length).toBe(0);
		});

		dt.html('basic');
		it('Rows', function() {
			table = $('#example').DataTable({
				select: {
					info: true,
					items: 'row'
				}
			});

			$('#example tbody tr:eq(2) td:eq(1)').click();
			expect($('div.dt-info span.select-info').length).toBe(1);
			expect($('span.select-info span.select-item').length).toBe(3);
			expect($('span.select-item:eq(0)').text()).toBe('1 row selected');
			expect($('span.select-item:eq(1)').text()).toBe('');
			expect($('span.select-item:eq(2)').text()).toBe('');
		});

		dt.html('basic');
		it('Columns', function() {
			table = $('#example').DataTable({
				select: {
					info: true,
					items: 'column'
				}
			});

			$('#example tbody tr:eq(2) td:eq(1)').click();
			expect($('div.dt-info span.select-info').length).toBe(1);
			expect($('span.select-info span.select-item').length).toBe(3);
			expect($('span.select-item:eq(0)').text()).toBe('');
			expect($('span.select-item:eq(1)').text()).toBe('1 column selected');
			expect($('span.select-item:eq(2)').text()).toBe('');
		});

		dt.html('basic');
		it('Columns', function() {
			table = $('#example').DataTable({
				select: {
					info: true,
					items: 'cell'
				}
			});

			$('#example tbody tr:eq(2) td:eq(1)').click();
			expect($('div.dt-info span.select-info').length).toBe(1);
			expect($('span.select-info span.select-item').length).toBe(3);
			expect($('span.select-item:eq(0)').text()).toBe('');
			expect($('span.select-item:eq(1)').text()).toBe('');
			expect($('span.select-item:eq(2)').text()).toBe('1 cell selected');
		});

		dt.html('basic');
		it('Combination of selections - nothing selected', function() {
			table = $('#example').DataTable({
				select: {
					info: true,
					style: 'multi'
				}
			});

			expect($('span.select-item:eq(0)').text()).toBe('');
			expect($('span.select-item:eq(1)').text()).toBe('');
			expect($('span.select-item:eq(2)').text()).toBe('');
		});
		it('Combination of selections - single', function() {
			table.select.items('row');
			$('#example tbody tr:eq(2) td:eq(1)').click();
			table.select.items('cell');
			$('#example tbody tr:eq(3) td:eq(1)').click();
			table.select.items('column');
			$('#example tbody tr:eq(4) td:eq(2)').click();

			expect($('span.select-item:eq(0)').text()).toBe('1 row selected');
			expect($('span.select-item:eq(1)').text()).toBe('1 column selected');
			expect($('span.select-item:eq(2)').text()).toBe('1 cell selected');
		});
		it('Combination of selections - multiple', function() {
			table.select.items('row');
			$('#example tbody tr:eq(5) td:eq(1)').click();
			table.select.items('cell');
			$('#example tbody tr:eq(6) td:eq(1)').click();
			table.select.items('column');
			$('#example tbody tr:eq(7) td:eq(3)').click();

			expect($('span.select-item:eq(0)').text()).toBe('2 rows selected');
			expect($('span.select-item:eq(1)').text()).toBe('2 columns selected');
			expect($('span.select-item:eq(2)').text()).toBe('2 cells selected');
		});
	});
});
