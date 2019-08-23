describe('Select - cell().select()', function() {
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
			expect(typeof table.cell().select).toBe('function');
		});

		it('Returns an API instance', function() {
			expect(table.cell().select() instanceof $.fn.dataTable.Api).toBe(true);
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
		it('Select a single cell (single select)', function() {
			table.cell(2, 0).select();
			expect($('td.selected').length).toBe(1);
			expect($('td.selected:eq(0)').text()).toBe('Ashton Cox');
		});
		it('Select another (single select)', function() {
			table.cell(2, 2).select();
			expect($('td.selected').length).toBe(1);
			expect($('td.selected:eq(0)').text()).toBe('San Francisco');
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
			table.cell(2, 0).select();
			expect($('td.selected').length).toBe(1);
			expect($('td.selected:eq(0)').text()).toBe('Ashton Cox');
		});
		it('Select another (multi select)', function() {
			table.cell(2, 2).select();
			expect($('td.selected').length).toBe(2);
			expect($('td.selected:eq(0)').text()).toBe('Ashton Cox');
			expect($('td.selected:eq(1)').text()).toBe('San Francisco');
		});
	});
});
