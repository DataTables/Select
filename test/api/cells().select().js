describe('Select - cells().select()', function() {
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
			expect(typeof table.cells().select).toBe('function');
		});

		it('Returns an API instance', function() {
			expect(table.cells().select() instanceof $.fn.dataTable.Api).toBe(true);
		});
	});

	describe('Check the behaviour', function() {
		dt.html('basic');
		let table;
		it('Nothing selected initially', function() {
			table = $('#example').DataTable({
				select: {
					style: 'single',
					items: 'cell'
				}
			});
			expect($('td.selected').length).toBe(0);
		});
		it('Select many cells (single select)', function() {
			table.cells(2, '*').select();
			expect($('td.selected').length).toBe(1);
			expect($('td.selected:eq(0)').text()).toBe('$86,000');
		});
		it('Select another (single select)', function() {
			table.cells(3, '*').select();
			expect($('td.selected').length).toBe(1);
			expect($('td.selected:eq(0)').text()).toBe('$433,060');
		});

		dt.html('basic');
		it('No columns selected initially (multi select)', function() {
			table = $('#example').DataTable({
				select: {
					style: 'multi',
					items: 'cell'
				}
			});

			expect($('td.selected').length).toBe(0);
		});
		it('Select a single cell (multi select)', function() {
			table.cells(2, '*').select();
			expect($('td.selected').length).toBe(6);
			expect($('td.selected:eq(0)').text()).toBe('Ashton Cox');
		});
		it('Select another (multi select)', function() {
			table.cells(3, '*').select();
			expect($('td.selected').length).toBe(12);
			expect($('td.selected:eq(0)').text()).toBe('Ashton Cox');
			expect($('td.selected:eq(1)').text()).toBe('Junior Technical Author');
		});
	});
});
