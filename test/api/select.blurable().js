describe('Select - select.blurable()', function() {
	let table;

	dt.libs({
		js: ['jquery', 'datatables', 'select'],
		css: ['datatables', 'select']
	});

	describe('Check the defaults', function() {
		dt.html('basic');
		it('Exists and is a function', function() {
			table = $('#example').DataTable({
				select: true
			});
			expect(typeof table.select.blurable).toBe('function');
		});
		it('Getter returns a boolean', function() {
			expect(typeof table.select.blurable()).toBe('boolean');
		});
		it('Setter returns API instance', function() {
			expect(table.select.blurable(false) instanceof $.fn.dataTable.Api).toBe(true);
		});
	});

	describe('Functional tests', function() {
		dt.html('basic');
		it('Default is blurable', function() {
			$('div').prepend('<p id="click">Click me</p>');
			table = $('#example').DataTable({
				select: true
			});
			expect(table.select.blurable()).toBe(false);
		});
		it('Does not blur', function() {
			$('#example tbody tr:eq(2) td:eq(1)').click();
			$('#click').click();
			expect(table.rows({ selected: true }).count()).toBe(1);
		});
		it('Change it so it does blur', function() {
			table.select.blurable(true);
			expect(table.select.blurable()).toBe(true);
		});
		it('Being honoured', function() {
			expect(table.rows({ selected: true }).count()).toBe(1);
			$('#click').click();
			expect(table.rows({ selected: true }).count()).toBe(0);
		});
	});
});
