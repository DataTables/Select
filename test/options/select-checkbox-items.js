describe('Select - type - select-checkbox items is row', function() {
	let table;

	dt.libs({
		js: ['jquery', 'datatables', 'select'],
		css: ['datatables', 'select']
	});

	describe('Functional tests', function() {
		dt.html('basic');

		it('No info', function() {
			var cols = dt.getTestColumns();
			cols[0].data = null;
			cols[0].defaultContent = '';
			cols[0].render = DataTable.render.select();

			table = $('#example').DataTable({
				select: {
					items: 'row',
					style: 'multi',
					selector: 'td:first-child',
				},
				columns: cols,
				order: [1, 'desc'],
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

		it('Checkbox is unchecked before selection', function() {
			expect($('tbody tr:eq(7) td:eq(0) input').prop('checked')).toBe(false);
		});

		it('Checkbox is checked when row is selected', function() {
			$('tbody tr:eq(7) td:eq(0)').click();
			expect($('tbody tr:eq(7)').hasClass('selected')).toBe(true);
			expect($('tbody tr:eq(7) td:eq(0) input').prop('checked')).toBe(true);
		});

		it('Other rows remain unchecked', function() {
			expect($('tbody tr:eq(0) td:eq(0) input').prop('checked')).toBe(false);
			expect($('tbody tr:eq(1) td:eq(0) input').prop('checked')).toBe(false);
		});

		it('Checkbox is unchecked when row is deselected', function() {
			$('tbody tr:eq(7) td:eq(0)').click();
			expect($('tbody tr:eq(7)').hasClass('selected')).toBe(false);
			expect($('tbody tr:eq(7) td:eq(0) input').prop('checked')).toBe(false);
		});
	});
});

describe('Select - type - select-checkbox items is cell ', function() {
	let table;

	dt.libs({
		js: ['jquery', 'datatables', 'select'],
		css: ['datatables', 'select']
	});

	describe('Functional tests', function() {
		dt.html('basic');

		it('No info', function() {
			var cols = dt.getTestColumns();
			cols[0].data = null;
			cols[0].defaultContent = '';
			cols[0].render = DataTable.render.select();

			table = $('#example').DataTable({
				select: {
					items: 'cell',
					style: 'multi',
					selector: 'td:first-child',
				},
				columns: cols,
				order: [1, 'desc'],
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

		it('Checkbox is unchecked before selection', function() {
			expect($('tbody tr:eq(7) td:eq(0) input').prop('checked')).toBe(false);
		});

		it('Checkbox is checked when cell is selected', function() {
			$('tbody tr:eq(1) td:eq(0)').click();
			expect($('tbody tr:eq(1) td:eq(0)').hasClass('selected')).toBe(true);
			expect($('tbody tr:eq(1) td:eq(0) input').prop('checked')).toBe(true);
		});

		it('Other rows remain unchecked', function() {
			expect($('tbody tr:eq(0) td:eq(0) input').prop('checked')).toBe(false);
			expect($('tbody tr:eq(1) td:eq(0) input').prop('checked')).toBe(false);
		});

		it('Checkbox is unchecked when cell is deselected', function() {
			$('tbody tr:eq(7) td:eq(0)').click();
			expect($('tbody tr:eq(7) td:eq(0)').hasClass('selected')).toBe(false);
			expect($('tbody tr:eq(7) td:eq(0) input').prop('checked')).toBe(false);
		});
	});
});
