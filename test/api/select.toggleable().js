describe('Select - select.toggleable()', function() {
	let table;

	dt.libs({
		js: ['jquery', 'datatables', 'select'],
		css: ['datatables', 'select']
	});

	describe('Check the defaults', function() {
		dt.html('basic');
		it('Exists and is a function', function() {
			table = $('#example').DataTable({ select: true });
			expect(typeof table.select.toggleable).toBe('function');
		});
		it('Getter returns a boolean', function() {
			expect(typeof table.select.toggleable()).toBe('boolean');
		});
		it('Default is true', function() {
			expect(table.select.toggleable()).toBe(true);
		});
		it('Setter returns an API instance', function() {
			expect(table.select.toggleable(false) instanceof $.fn.dataTable.Api).toBe(true);
		});
	});

	describe('Check the behaviour - toggleable option not set', function() {
		dt.html('basic');
		it('No rows selected initially', function() {
			table = $('#example').DataTable({
				select: true
			});
			expect(table.rows({ selected: true }).count()).toBe(0);
		});
		it('... can select', function() {
			$('tbody tr:eq(2) td:eq(1)').click();

			expect($('tr.selected').length).toBe(1);
			expect($('tr.selected td:eq(0)').text()).toBe('Ashton Cox');
		});
		it('... and can deselect', function() {
			$('tbody tr:eq(2) td:eq(1)').click();

			expect($('tr.selected').length).toBe(0);
		});
		it('... can select and disabling', function() {
			table.select.toggleable(false);

			$('tbody tr:eq(2) td:eq(1)').click();

			expect($('tr.selected').length).toBe(1);
			expect($('tr.selected td:eq(0)').text()).toBe('Ashton Cox');
		});
		it('... and cannot deselect', function() {
			$('tbody tr:eq(2) td:eq(1)').click();

			expect($('tr.selected').length).toBe(1);
			expect($('tr.selected td:eq(0)').text()).toBe('Ashton Cox');
		});
		it('... but can after allowing ', function() {
			table.select.toggleable(true);

			$('tbody tr:eq(2) td:eq(1)').click();

			expect($('tr.selected').length).toBe(0);
		});
	});

	describe('Check the behaviour - toggleable option set', function() {
		dt.html('basic');
		it('No rows selected initially', function() {
			table = $('#example').DataTable({
				select: {
					toggleable: false
				}
			});
			expect(table.rows({ selected: true }).count()).toBe(0);
		});
		it('... can select', function() {
			$('tbody tr:eq(2) td:eq(1)').click();

			expect($('tr.selected').length).toBe(1);
			expect($('tr.selected td:eq(0)').text()).toBe('Ashton Cox');
		});
		it('... and cannot deselect', function() {
			$('tbody tr:eq(2) td:eq(1)').click();

			expect($('tr.selected').length).toBe(1);
			expect($('tr.selected td:eq(0)').text()).toBe('Ashton Cox');
		});
		it('... but can deselect and disabling', function() {
			table.select.toggleable(true);

			$('tbody tr:eq(2) td:eq(1)').click();

			expect($('tr.selected').length).toBe(0);
		});
	});
});
