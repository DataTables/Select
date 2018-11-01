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
			expect(typeof table.row().select).toBe('function');
		});

		it('Returns an API instance', function() {
			expect(table.row().select() instanceof $.fn.dataTable.Api).toBe(true);
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
			table.row(2).select();
			expect($('tr.selected').length).toBe(1);
			expect($('tr.selected td:eq(0)').text()).toBe('Ashton Cox');
		});
		it('Select another row (single select)', function() {
			table.row(4).select();
			expect($('tr.selected').length).toBe(1);
			expect($('tr.selected td:eq(0)').text()).toBe('Airi Satou');
		});

		dt.html('basic');
		it('No rows selected initially', function() {
			table = $('#example').DataTable({
				select: {
					style: 'multi'
				}
			});

			expect($('tr.selected').length).toBe(0);
		});
		it('Select a single row (single select)', function() {
			table.row(2).select();
			expect($('tr.selected').length).toBe(1);
			expect($('tr.selected td:eq(0)').text()).toBe('Ashton Cox');
		});
		it('Select another row (single select)', function() {
			table.row(4).select();
			expect($('tr.selected').length).toBe(2);
			expect($('tr.selected:eq(0) td:eq(0)').text()).toBe('Airi Satou');
			expect($('tr.selected:eq(1) td:eq(0)').text()).toBe('Ashton Cox');
		});
	});
});
