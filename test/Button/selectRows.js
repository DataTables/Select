describe('Select - Button - selectRows', function() {
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
				buttons: ['selectRows']
			});

			expect($('button.dt-button').length).toBe(1);
			expect($('button.buttons-select-rows').length).toBe(1);
			expect($('button.buttons-select-rows').text()).toBe('Select rows');
		});
		it('Active originally (default is rows', function() {
			expect($('button.buttons-select-rows').hasClass('dt-button-active')).toBe(true);
		});
	});

	describe('Functional tests', function() {
		dt.html('basic_id');
		it('Button on page', function() {
			table = $('#example').DataTable({
				dom: 'Blfrtip',
				select: true,
				buttons: ['selectRows'],
				language: {
					buttons: {
						selectRows: 'test select rows'
					}
				}
			});

			expect($('button.dt-button').length).toBe(1);
			expect($('button.buttons-select-rows').length).toBe(1);
		});
		it('Language options', function() {
			expect($('button.buttons-select-rows').text()).toBe('test select rows');
		});
		it('Nothing selected before the click', function() {
			expect(table.rows({ selected: true }).count()).toBe(0);
			expect(table.cells({ selected: true }).count()).toBe(0);
		});
		it('Changing via API makes it inactive', function() {
			table.select.items('cell');
			expect($('button.buttons-select-rows').hasClass('dt-button-active')).toBe(false);
		});
		it('Clicking on cell selects cell', function() {
			$('tbody tr:eq(2) td:eq(2)').click();
			expect(table.rows({ selected: true }).count()).toBe(0);
			expect(table.cells({ selected: true }).count()).toBe(1);
		});
		it('Clicking makes it active', function() {
			$('button.buttons-select-rows').click();
			expect($('button.buttons-select-rows').hasClass('dt-button-active')).toBe(true);
		});
		it('Clicking on cell selects row', function() {
			$('tbody tr:eq(9) td:eq(2)').click();
			expect(table.rows({ selected: true }).count()).toBe(1);
			expect(table.cells({ selected: true }).count()).toBe(1);
		});
	});
});
