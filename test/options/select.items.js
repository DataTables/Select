describe('Select - select.items', function() {
	var table;

	dt.libs({
		js: ['jquery', 'datatables', 'select'],
		css: ['datatables', 'select']
	});

	describe('Functional tests', function() {
		let table;
		
		dt.html('basic');
		it('Check row', function() {
			table = $('#example').DataTable({
				select: {
					style: 'single',
					items: 'row'
				}
			});

			expect(table.rows({ selected: true }).count()).toBe(0);
			$('#example tbody tr:eq(2) td:eq(1)').click();
			expect(table.rows({ selected: true }).count()).toBe(1);
			expect(table.rows({ selected: true }).data()[0][0]).toBe('Ashton Cox');
		});

		dt.html('basic');
		it('Check column', function() {
			table = $('#example').DataTable({
				select: {
					style: 'single',
					items: 'column'
				}
			});

			expect(table.columns({ selected: true }).count()).toBe(0);
			$('#example tbody tr:eq(2) td:eq(1)').click();
			expect(table.columns({ selected: true }).count()).toBe(1);
			expect(table.columns({ selected: true }).data()[0][0]).toBe('Accountant');
		});

		dt.html('basic');
		it('Check cell', function() {
			table = $('#example').DataTable({
				select: {
					style: 'single',
					items: 'cell'
				}
			});

			expect(table.cells({ selected: true }).count()).toBe(0);
			$('#example tbody tr:eq(2) td:eq(1)').click();
			expect(table.cells({ selected: true }).count()).toBe(1);
			expect(table.cells({ selected: true }).data()[0]).toBe('Junior Technical Author');
		});
	});
});
