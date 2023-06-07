describe('Select - Button - selectCells', function() {
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
				buttons: ['selectCells']
			});

			expect($('button.dt-button').length).toBe(1);
			expect($('button.buttons-select-cells').length).toBe(1);
			expect($('button.buttons-select-cells').text()).toBe('Select cells');
		});
		it('Not active originally (default is rows', function() {
			expect($('button.buttons-select-cells').hasClass('dt-button-active')).toBe(false);
		});
	});

	describe('Functional tests', function() {
		dt.html('basic_id');
		it('Button on page', function() {
			table = $('#example').DataTable({
				dom: 'Blfrtip',
				select: true,
				buttons: ['selectCells'],
				language: {
					buttons: {
						selectCells: 'test select cells'
					}
				}
			});

			expect($('button.dt-button').length).toBe(1);
			expect($('button.buttons-select-cells').length).toBe(1);
		});
		it('Language options', function() {
			expect($('button.buttons-select-cells').text()).toBe('test select cells');
		});
		it('Nothing selected before the click', function() {
			expect(table.rows({ selected: true }).count()).toBe(0);
			expect(table.cells({ selected: true }).count()).toBe(0);
		});
		it('Clicking on cell selects row', function() {
			$('tbody tr:eq(2) td:eq(2)').click();
			expect(table.rows({ selected: true }).count()).toBe(1);
			expect(table.cells({ selected: true }).count()).toBe(0);
		});
		it('Clicking makes it active', function() {
			$('button.buttons-select-cells').click();
			expect($('button.buttons-select-cells').hasClass('dt-button-active')).toBe(true);
		});
		it('Clicking on cell now selects cell', function() {
			$('tbody tr:eq(9) td:eq(2)').click();
			expect(table.rows({ selected: true }).count()).toBe(1);
			expect(table.cells({ selected: true }).count()).toBe(1);
		});
		it('Changing via API makes it inactive', function() {
			table.select.items('row');
			expect($('button.buttons-select-cells').hasClass('dt-button-active')).toBe(false);
		});
	});
});
