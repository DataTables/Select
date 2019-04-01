describe('Select - select.selector', function() {
	let table;

	dt.libs({
		js: ['jquery', 'datatables', 'select'],
		css: ['datatables', 'select']
	});

	function selectAllColumns() {
		var clickEvent;
		for (let i = 0; i < 6; i++) {
			clickEvent = $.Event('click');
			clickEvent.shiftKey = true;
			$('tbody tr:eq(' + i + ') td:eq(' + i + ')').trigger(clickEvent);
		}
	}

	describe('Functional tests', function() {
		dt.html('basic');
		it('Default allows all cells to be selected', function() {
			table = $('#example').DataTable({
				select: true
			});

			selectAllColumns();
			expect($('tr.selected').length).toBe(6);
		});

		dt.html('basic');
		it('Restrict to just first column', function() {
			table = $('#example').DataTable({
				select: {
					selector: 'td:first-child'
				}
			});

			selectAllColumns();
			expect($('tr.selected').length).toBe(1);
			expect($('tr.selected td:eq(0)').text()).toBe('Airi Satou');
		});

		dt.html('basic');
		it('Disallow on last column', function() {
			table = $('#example').DataTable({
				select: {
					selector: 'td:not(:last-child)'
				}
			});

			selectAllColumns();
			expect($('tr.selected').length).toBe(5);
			expect($('tbody tr:eq(5)').hasClass('selected')).toBe(false);
		});
	});
});
