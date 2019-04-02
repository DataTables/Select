describe('Select - select.selector()', function() {
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
			expect(typeof table.select.selector).toBe('function');
		});
		it('Getter returns a boolean', function() {
			expect(typeof table.select.selector()).toBe('string');
		});
		it('Setter returns API instance', function() {
			expect(table.select.selector('td') instanceof $.fn.dataTable.Api).toBe(true);
		});
	});

	describe('Functional tests', function() {
		dt.html('basic');
		it('Default selector', function() {
			table = $('#example').DataTable({
				select: true
			});

			expect(table.select.selector()).toBe('td, th');
		});
		it('Change it', function() {
			table.select.selector('td:first-child');
			expect(table.select.selector()).toBe('td:first-child');
		});
		it('Being honoured', function() {
			$('tbody tr:eq(2) td:eq(1)').click();
			expect($('tr.selected').length).toBe(0);

			$('tbody tr:eq(2) td:eq(0)').click();
			expect($('tr.selected').length).toBe(1);
		});
	});
});
