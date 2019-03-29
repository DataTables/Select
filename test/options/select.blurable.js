describe('Select - select.blurable', function() {
	let table;
	let rows;

	dt.libs({
		js: ['jquery', 'datatables', 'select'],
		css: ['datatables', 'select']
	});

	describe('Functional tests', function() {
		dt.html('basic');
		it('Default', function() {
			$('div').prepend('<p id="click">Click me</p>');
			table = $('#example').DataTable({
				select: true
			});

			$('#example tbody tr:eq(2) td:eq(1)').click();

			rows = table.rows({ selected: true });
			expect(rows.count()).toBe(1);
			expect(rows.data()[0][0]).toBe('Ashton Cox');
		});
		it('Does not blur', function() {
			$('#click').click();

			rows = table.rows({ selected: true });
			expect(rows.count()).toBe(1);
			expect(rows.data()[0][0]).toBe('Ashton Cox');
		});

		dt.html('basic');
		it('False', function() {
			$('div').prepend('<p id="click">Click me</p>');
			table = $('#example').DataTable({
				select: {
					blurable: false
				}
			});

			$('#example tbody tr:eq(2) td:eq(1)').click();

			rows = table.rows({ selected: true });
			expect(rows.count()).toBe(1);
			expect(rows.data()[0][0]).toBe('Ashton Cox');
		});
		it('Does not blur', function() {
			$('#click').click();

			rows = table.rows({ selected: true });
			expect(rows.count()).toBe(1);
			expect(rows.data()[0][0]).toBe('Ashton Cox');
		});

		dt.html('basic');
		it('True', function() {
			$('div').prepend('<p id="click">Click me</p>');
			table = $('#example').DataTable({
				select: {
					blurable: true
				}
			});

			$('#example tbody tr:eq(2) td:eq(1)').click();

			rows = table.rows({ selected: true });
			expect(rows.count()).toBe(1);
			expect(rows.data()[0][0]).toBe('Ashton Cox');
		});
		it('Blurs', function() {
			$('#click').click();

			rows = table.rows({ selected: true });
			expect(rows.count()).toBe(0);
		});
	});
});
