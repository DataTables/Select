describe('Select - Button - selectNone', function() {
	let table;

	dt.libs({
		js: ['jquery', 'datatables', 'buttons', 'select'],
		css: ['datatables', 'buttons', 'select']
	});

	describe('Check the defaults', function() {
		dt.html('basic_id');
		it('Check defaults', function() {
			table = $('#example').DataTable({
				dom: 'Blfrtip',
				buttons: ['selectNone']
			});

			expect($('button.dt-button').length).toBe(1);
			expect($('button.buttons-select-none').length).toBe(1);
			expect($('button.buttons-select-none').text()).toBe('Deselect all');
		});
		it('Disabled if nothing selected', function() {
			expect($('button.buttons-select-none').hasClass('disabled')).toBe(true);
		});
	});

	describe('Functional tests', function() {
		dt.html('basic_id');
		it('Button on page', function() {
			table = $('#example').DataTable({
				dom: 'Blfrtip',
				select: true,
				buttons: ['selectNone'],
				language: {
					buttons: {
						selectNone: 'test deselect all'
					}
				}
			});

			expect($('button.dt-button').length).toBe(1);
			expect($('button.buttons-select-none').length).toBe(1);
		});
		it('Language options', function() {
			expect($('button.buttons-select-none').text()).toBe('test deselect all');
		});
		it('Enabled when row selected', function() {
			table.row(2).select();
			expect(table.rows({ selected: true }).count()).toBe(1);
			expect($('button.buttons-select-none').hasClass('disabled')).toBe(false);
		});
		it('Deselects single row', function() {
			$('button.buttons-select-none').click();
			expect(table.rows({ selected: true }).count()).toBe(0);
		});
		it('Deselects all rows', function() {
			table.rows().select();
			expect(table.rows({ selected: true }).count()).toBe(57);

			$('button.buttons-select-none').click();
			expect(table.rows({ selected: true }).count()).toBe(0);
		});
	});
});
