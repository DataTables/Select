describe('Select - type - select-checkbox', function() {
	let table;

	dt.libs({
		js: ['jquery', 'datatables', 'select'],
		css: ['datatables', 'select']
	});

	describe('Functional tests', function() {
		dt.html('basic');

		it('No info', function() {
			var cols = dt.getTestColumns();
			cols[5].data = null;
			cols[5].defaultContent = '';

			table = $('#example').DataTable({
				select: {
					style: 'multi',
					selector: 'td:last-child'
				},
				columns: cols,
				order: [5, 'desc'],
				columnDefs: [
					{
						orderable: true,
						className: 'select-checkbox',
						targets: -1,
						orderDataType: 'select-checkbox'
					}
				]
			});
		});

		it('Combination of selections - multiple', function() {
			$('tbody tr:eq(2) td:eq(5)').click();
			$('tbody tr:eq(7) td:eq(5)').click();
			table.draw();

			expect($('tbody tr:eq(0) td:eq(0)').text()).toBe('Shad Decker');
			expect($('tbody tr:eq(1) td:eq(0)').text()).toBe('Jennifer Acosta');
			expect($('tbody tr:eq(2) td:eq(0)').text()).toBe('Donna Snider');
		});
	});
});
