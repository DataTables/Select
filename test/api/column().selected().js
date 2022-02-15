describe('Select - column().select()', function () {
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
			expect(typeof table.column().selected).toBe('function');
		});

		it('Returns a boolean', function () {
			expect(typeof table.column().selected()).toBe('boolean');
		});
	});

	describe('Check the behaviour', function () {
		dt.html('basic');
		let table;
		it('Nothing selected initially', function () {
			table = $('#example').DataTable({
				select: {
					style: 'single',
					items: 'column'
				}
			});

			expect(table.column(2).selected()).toBe(false);
			expect(table.column(4).selected()).toBe(false);
		});
		it('Select a single column (single select)', function () {
			table.column(2).select();
			expect(table.column(2).selected()).toBe(true);
			expect(table.column(4).selected()).toBe(false);
		});
		it('Select another column (single select)', function () {
			table.column(4).select();
			expect(table.column(2).selected()).toBe(false);
			expect(table.column(4).selected()).toBe(true);
		});

		dt.html('basic');
		it('No columns selected initially (multi select)', function () {
			table = $('#example').DataTable({
				select: {
					style: 'multi',
					items: 'column'
				}
			});

			expect(table.column(2).selected()).toBe(false);
			expect(table.column(4).selected()).toBe(false);
		});
		it('Select a single column (multi select)', function () {
			table.column(2).select();
			expect(table.column(2).selected()).toBe(true);
			expect(table.column(4).selected()).toBe(false);
		});
		it('Select another column (multi select)', function () {
			table.column(4).select();
			expect(table.column(2).selected()).toBe(true);
			expect(table.column(4).selected()).toBe(true);
		});
	});
});
