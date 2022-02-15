describe('Select - row().selected()', function () {
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
			expect(typeof table.row().selected).toBe('function');
		});

		it('Returns a boolean', function () {
			expect(typeof table.row().selected()).toBe('boolean');
		});
	});

	describe('Check the behaviour', function () {
		dt.html('basic');
		let table;
		it('No rows selected initially', function () {
			table = $('#example').DataTable({
				select: {
					style: 'single'
				}
			});

			expect(table.row(2).selected()).toBe(false);
			expect(table.row(4).selected()).toBe(false);
		});
		it('Select a single row (single select)', function () {
			table.row(2).select();
			expect(table.row(2).selected()).toBe(true);
			expect(table.row(4).selected()).toBe(false);
		});
		it('Select another row (single select)', function () {
			table.row(4).select();
			expect(table.row(2).selected()).toBe(false);
			expect(table.row(4).selected()).toBe(true);
		});

		dt.html('basic');
		it('No rows selected initially', function () {
			table = $('#example').DataTable({
				select: {
					style: 'multi'
				}
			});

			expect(table.row(2).selected()).toBe(false);
			expect(table.row(4).selected()).toBe(false);
		});
		it('Select a single row (single select)', function () {
			table.row(2).select();
			expect(table.row(2).selected()).toBe(true);
			expect(table.row(4).selected()).toBe(false);
		});
		it('Select another row (single select)', function () {
			table.row(4).select();
			expect(table.row(2).selected()).toBe(true);
			expect(table.row(4).selected()).toBe(true);
		});
	});
});
