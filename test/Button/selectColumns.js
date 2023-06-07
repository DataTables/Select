describe('Select - Button - selectColumns', function() {
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
				buttons: ['selectColumns']
			});

			expect($('button.dt-button').length).toBe(1);
			expect($('button.buttons-select-columns').length).toBe(1);
			expect($('button.buttons-select-columns').text()).toBe('Select columns');
		});
		it('Not active originally (default is rows', function() {
			expect($('button.buttons-select-columns').hasClass('dt-button-active')).toBe(false);
		});
	});

	describe('Functional tests', function() {
		dt.html('basic_id');
		it('Button on page', function() {
			table = $('#example').DataTable({
				dom: 'Blfrtip',
				select: true,
				buttons: ['selectColumns'],
				language: {
					buttons: {
						selectColumns: 'test select columns'
					}
				}
			});

			expect($('button.dt-button').length).toBe(1);
			expect($('button.buttons-select-columns').length).toBe(1);
		});
		it('Language options', function() {
			expect($('button.buttons-select-columns').text()).toBe('test select columns');
		});
		it('Nothing selected before the click', function() {
			expect(table.rows({ selected: true }).count()).toBe(0);
			expect(table.columns({ selected: true }).count()).toBe(0);
		});
		it('Clicking on cell selects row', function() {
			$('tbody tr:eq(2) td:eq(2)').click();
			expect(table.rows({ selected: true }).count()).toBe(1);
			expect(table.columns({ selected: true }).count()).toBe(0);
		});
		it('Clicking makes it active', function() {
			$('button.buttons-select-columns').click();
			expect($('button.buttons-select-columns').hasClass('dt-button-active')).toBe(true);
		});
		it('Clicking on cell now selects columns', function() {
			$('tbody tr:eq(9) td:eq(2)').click();
			expect(table.rows({ selected: true }).count()).toBe(1);
			expect(table.columns({ selected: true }).count()).toBe(1);
		});
		it('Changing via API makes it inactive', function() {
			table.select.items('row');
			expect($('button.buttons-select-columns').hasClass('dt-button-active')).toBe(false);
		});
	});
});
