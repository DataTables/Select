describe('Select - column().select()', function() {
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
			expect(typeof table.column().select).toBe('function');
		});

		it('Returns an API instance', function() {
			expect(table.column().select() instanceof $.fn.dataTable.Api).toBe(true);
		});
	});

	describe('Check the behaviour', function() {
		dt.html('basic');
		let table;
		it('Nothing selected initially', function() {
			table = $('#example').DataTable({
				select: {
					style: 'single',
					items: 'column'
				}
			});

			expect($('td.selected').length).toBe(0);
		});
		it('Select a single column (single select)', function() {
			table.column(2).select();
			expect($('td.selected').length).toBe(10);
			expect($('td.selected:eq(0)').text()).toBe('Tokyo');
		});
		it('Select another column (single select)', function() {
			table.column(4).select();
			expect($('td.selected').length).toBe(10);
			expect($('td.selected:eq(0)').text()).toBe('2008/11/28');
		});

		dt.html('basic');
		it('No columns selected initially (multi select)', function() {
			table = $('#example').DataTable({
				select: {
					style: 'multi',
					items: 'column'
				}
			});

			expect($('td.selected').length).toBe(0);
		});
		it('Select a single column (multi select)', function() {
			table.column(2).select();
			expect($('td.selected').length).toBe(10);
			expect($('td.selected:eq(0)').text()).toBe('Tokyo');
		});
		it('Select another column (multi select)', function() {
			table.column(4).select();
			expect($('td.selected').length).toBe(20);
			expect($('td.selected:eq(0)').text()).toBe('Tokyo');
			expect($('td.selected:eq(1)').text()).toBe('2008/11/28');
		});
	});
});
