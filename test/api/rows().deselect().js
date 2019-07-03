describe('Select - rows().deselect()', function() {
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
			expect(typeof table.rows().deselect).toBe('function');
		});

		it('Returns an API instance', function() {
			expect(table.rows().deselect() instanceof $.fn.dataTable.Api).toBe(true);
		});
	});

	describe('Check the behaviour', function() {
		dt.html('basic');
		let table;
		it('No rows selected initially', function() {
			table = $('#example').DataTable({
				select: {
					style: 'single'
				}
			});

			expect($('tr.selected').length).toBe(0);
		});
		it('Select a single row (single select)', function() {
			table.rows(2).select();
			expect($('tr.selected').length).toBe(1);
			expect($('tr.selected td:eq(0)').text()).toBe('Ashton Cox');
		});
		it('Deselect it (single select)', function() {
			table.rows(2).deselect();
			expect($('tr.selected').length).toBe(0);
		});

		dt.html('basic');
		it('No rows selected initially (multi select)', function() {
			table = $('#example').DataTable({
				select: {
					style: 'multi'
				}
			});

			table.rows([2, 3, 4]).select();
			expect($('tr.selected').length).toBe(3);
			expect($('tr.selected:eq(0) td:eq(0)').text()).toBe('Airi Satou');
			expect($('tr.selected:eq(1) td:eq(0)').text()).toBe('Ashton Cox');
			expect($('tr.selected:eq(2) td:eq(0)').text()).toBe('Cedric Kelly');
		});
		it('Deselect a single row (multi select)', function() {
			table.rows(2).deselect();
			expect($('tr.selected').length).toBe(2);
			expect($('tr.selected:eq(0) td:eq(0)').text()).toBe('Airi Satou');
			expect($('tr.selected:eq(1) td:eq(0)').text()).toBe('Cedric Kelly');
		});
		it('Deselect two rows (multi select)', function() {
			table.rows([3, 4]).deselect();
			expect($('tr.selected').length).toBe(0);
		});
	});
});
