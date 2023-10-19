describe('Select - select.className', function() {
	let table;

	dt.libs({
		js: ['jquery', 'datatables', 'select'],
		css: ['datatables', 'select']
	});

	describe('Check the defaults', function() {
		dt.html('basic_id');
		it('Default class is selected', function() {
			table = $('#example').DataTable({
				select: true
			});

			$('tbody tr:eq(2) td:eq(1)').click();
			expect($('tbody tr:eq(2)').attr('class')).toBe('selected');
		});
	});

	describe('Functional tests', function() {
		dt.html('basic');
		it('Check row', function() {
			table = $('#example').DataTable({
				select: {
					className: 'unit_test',
					items: 'row'
				}
			});

			$('tbody tr:eq(2) td:eq(1)').click();
			expect($('tbody tr:eq(2)').attr('class')).toBe('unit_test');
		});
		it('Can still query selected', function() {
			expect(table.rows({ selected: true }).count()).toBe(1);
			expect(table.rows({ selected: true }).data()[0][0]).toBe('Ashton Cox');
		});

		dt.html('basic');
		it('Check column', function() {
			table = $('#example').DataTable({
				select: {
					className: 'unit_test',
					items: 'column'
				}
			});

			$('tbody tr:eq(2) td:eq(1)').click();
			expect($('tbody tr:eq(2) td:eq(1)').attr('class')).toBe('unit_test');
		});
		it('Can still query selected', function() {
			expect(table.columns({ selected: true }).count()).toBe(1);
			expect(table.columns({ selected: true }).data()[0][0]).toBe('Accountant');
		});

		dt.html('basic');
		it('Check cell', function() {
			table = $('#example').DataTable({
				select: {
					className: 'unit_test',
					items: 'cell'
				}
			});

			$('tbody tr:eq(2) td:eq(1)').click();
			expect($('tbody tr:eq(2) td:eq(1)').attr('class')).toBe('unit_test');
		});
		it('Can still query selected', function() {
			expect(table.cells({ selected: true }).count()).toBe(1);
			expect(table.cells({ selected: true }).data()[0]).toBe('Junior Technical Author');
		});
	});
});
