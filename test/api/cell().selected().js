describe('Select - cell().selected()', function () {
	var table;

	dt.libs({
		js: ['jquery', 'datatables', 'select'],
		css: ['datatables', 'select']
	});

	describe('Check the defaults', function () {
		dt.html('basic');
		let table;
		it('Exists and is a function', function () {
			table = $('#example').DataTable();
			expect(typeof table.cell().selected).toBe('function');
		});

		it('Returns a boolean', function () {
			expect(typeof table.cell().selected()).toBe('boolean');
		});
	});

	describe('Check the behaviour', function () {
		dt.html('basic');
		let table;
		it('Nothing selected initially', function () {
			table = $('#example').DataTable({
				select: {
					style: 'single',
					items: 'cell'
				}
			});
			expect(table.cell(2, 0).selected()).toBe(false);
			expect(table.cell(2, 2).selected()).toBe(false);
		});
		it('Select a single cell (single select)', function () {
			table.cell(2, 0).select();
			expect(table.cell(2, 0).selected()).toBe(true);
			expect(table.cell(2, 2).selected()).toBe(false);
		});
		it('Select another (single select)', function () {
			table.cell(2, 2).select();
			expect(table.cell(2, 0).selected()).toBe(false);
			expect(table.cell(2, 2).selected()).toBe(true);
		});

		dt.html('basic');
		it('No columns selected initially (multi select)', function () {
			table = $('#example').DataTable({
				select: {
					style: 'multi',
					items: 'cell'
				}
			});

			expect(table.cell(2, 0).selected()).toBe(false);
			expect(table.cell(2, 2).selected()).toBe(false);
		});
		it('Select a single cell (multi select)', function () {
			table.cell(2, 0).select();
			expect($('td.selected').length).toBe(1);
			expect(table.cell(2, 0).selected()).toBe(true);
			expect(table.cell(2, 2).selected()).toBe(false);
		});
		it('Select another (multi select)', function () {
			table.cell(2, 2).select();
			expect(table.cell(2, 0).selected()).toBe(true);
			expect(table.cell(2, 2).selected()).toBe(true);
		});
	});
});
