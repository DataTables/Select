describe('Select - cells().deselect()', function() {
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
			expect(typeof table.cells().deselect).toBe('function');
		});
		it('Returns an API instance', function() {
			table.cells(2, '*').select();
			expect(table.cells(2, '*').deselect() instanceof $.fn.dataTable.Api).toBe(true);
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

			table.cells(2, '*').select();
			table.cells(3, '*').select();

			expect($('td.selected').length).toBe(12);
			expect($('td.selected:eq(0)').text()).toBe('Ashton Cox');
		});
		it('Deselect one', function() {
			table.cells(2, '*').deselect();
			expect($('td.selected').length).toBe(6);
			expect($('td.selected:eq(0)').text()).toBe('Cedric Kelly');
		});
		it('Deselect another', function() {
			table.cells(3, '*').deselect();
			expect($('td.selected').length).toBe(0);
		});
	});
});
