describe('Select - cell().deselect()', function() {
	var table;

	dt.libs({
		js: ['jquery', 'datatables', 'select'],
		css: ['datatables', 'select']
	});

	describe('Check the defaults', function() {
		dt.html('basic');
		let table;
		it('Exists and is a function', function() {
			table = $('#example').DataTable();
			expect(typeof table.cell().deselect).toBe('function');
		});
		it('Returns an API instance', function() {
			table.cell(2, 0).select();
			expect(table.cell(2, 0).deselect() instanceof $.fn.dataTable.Api).toBe(true);
		});
	});

	describe('Check the behaviour', function() {
		dt.html('basic');
		let table;
		it('Cells selected initially', function() {
			table = $('#example').DataTable({
				select: {
					style: 'multi',
					items: 'cell'
				}
			});

			table.cells(2, 0).select();
			table.cells(2, 2).select();

			expect($('td.selected').length).toBe(2);
			expect($('td.selected:eq(0)').text()).toBe('Ashton Cox');
		});
		it('Deselect one', function() {
			table.cell(2, 0).deselect();
			expect($('td.selected').length).toBe(1);
			expect($('td.selected:eq(0)').text()).toBe('San Francisco');
		});
		it('Deselect another', function() {
			table.cell(2, 2).deselect();
			expect($('td.selected').length).toBe(0);
		});
	});
});
