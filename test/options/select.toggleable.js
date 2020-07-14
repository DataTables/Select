describe('Select - select.toggleable', function() {
	let table;

	dt.libs({
		js: ['jquery', 'datatables', 'select'],
		css: ['datatables', 'select']
	});

	describe('Functional tests', function() {
		dt.html('basic');
		it('Default allows deselection', function() {
			table = $('#example').DataTable({
				select: true
			});

			$('tbody tr:eq(2) td:eq(1)').click();

			expect($('tr.selected').length).toBe(1);
			expect($('tr.selected td:eq(0)').text()).toBe('Ashton Cox');
		});
		it('... and can deselect', function() {
			$('tbody tr:eq(2) td:eq(1)').click();

			expect($('tr.selected').length).toBe(0);
		});

		dt.html('basic');
		it('Disable deselection', function() {
			table = $('#example').DataTable({
				select: {
					toggleable: false
				}
			});

			$('tbody tr:eq(2) td:eq(1)').click();

			expect($('tr.selected').length).toBe(1);
			expect($('tr.selected td:eq(0)').text()).toBe('Ashton Cox');
		});
		it('... and can deselect', function() {
			$('tbody tr:eq(2) td:eq(1)').click();

			expect($('tr.selected').length).toBe(1);
			expect($('tr.selected td:eq(0)').text()).toBe('Ashton Cox');
		});
	});
});
