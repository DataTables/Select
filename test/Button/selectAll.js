describe('Select - Button - selectAll', function() {
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
				buttons: ['selectAll']
			});

			expect($('button.dt-button').length).toBe(1);
			expect($('button.buttons-select-all').length).toBe(1);
			expect($('button.buttons-select-all').text()).toBe('Select all');
		});
	});

	describe('Functional tests', function() {
		dt.html('basic_id');
		it('Button on page', function() {
			table = $('#example').DataTable({
				dom: 'Blfrtip',
				buttons: ['selectAll'],
				language: {
					buttons: {
						selectAll: 'test select all'
					}
				}
			});

			expect($('button.dt-button').length).toBe(1);
			expect($('button.buttons-select-all').length).toBe(1);
		});
		it('Language options', function() {
			expect($('button.buttons-select-all').text()).toBe('test select all');
		});
		it('Nothing selected before the click', function() {
			expect(table.rows({ selected: true }).count()).toBe(0);
		});
		it('Does select everything', function() {
			$('button.buttons-select-all').click();
			expect(table.rows({ selected: true }).count()).toBe(57);
		});
	});
});
