describe('Select - column().deselect()', function() {
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
			expect(typeof table.column().deselect).toBe('function');
		});

		it('Returns an API instance', function() {
			expect(table.column().deselect() instanceof $.fn.dataTable.Api).toBe(true);
		});
	});

	describe('Check the behaviour', function() {
		dt.html('basic');
		let table;
		it('Nothing selected initially', function() {
			table = $('#example').DataTable({
				select: {
					items: 'column'
				}
			});

			table.columns([2, 4]).select();

			expect($('td.selected').length).toBe(20);
			expect($('td.selected:eq(0)').text()).toBe('Tokyo');
		});
		it('Deselect one', function() {
			table.column(2).deselect();
			expect($('td.selected').length).toBe(10);
			expect($('td.selected:eq(0)').text()).toBe('2008/11/28');
		});
		it('Deselect another', function() {
			table.column(4).deselect();
			expect($('td.selected').length).toBe(0);
		});
	});
});
