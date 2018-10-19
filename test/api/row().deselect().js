describe('Select - row().select()', function() {
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
			expect(typeof table.row().deselect).toBe('function');
		});

		it('Returns an API instance', function() {
			expect(table.row().deselect() instanceof $.fn.dataTable.Api).toBe(true);
		});
	});

	describe('Check the behaviour', function() {
		dt.html('basic');
		let table;
		it('Two rows selected initially', function() {
			table = $('#example').DataTable({
				select: {
					style: 'multi'
				}
			});

			table.rows([2,4]).select();
			expect($('tr.selected').length).toBe(2);
		});
		it('Deselect a row', function() {
			table.row(2).deselect();
			expect($('tr.selected').length).toBe(1);
			expect($('tr.selected td:eq(0)').text()).toBe('Airi Satou');
		});
		it('Deselect another row', function() {
			table.row(4).deselect();
			expect($('tr.selected').length).toBe(0);
		});
	});
});
