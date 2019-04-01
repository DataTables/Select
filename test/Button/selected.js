describe('Select - Button - selected', function() {
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
				buttons: ['selected']
			});

			expect($('button.dt-button').length).toBe(1);
			expect($('button.buttons-selected').length).toBe(1);
			expect($('button.buttons-selected').text()).toBe('Selected');
		});
		it('Disabled if nothing selected', function() {
			expect($('button.buttons-selected').hasClass('disabled')).toBe(true);
		});
	});

	describe('Functional tests', function() {
		let called = false;

		dt.html('basic_id');
		it('Button on page', function() {
			table = $('#example').DataTable({
				dom: 'Blfrtip',
				select: true,
				buttons: [
					{
						extend: 'selected',
						action: function() {
							called = true;
						}
					}
				],
				language: {
					buttons: {
						selected: 'test selected'
					}
				}
			});

			expect($('button.dt-button').length).toBe(1);
			expect($('button.buttons-selected').length).toBe(1);
		});
		it('Language options', function() {
			expect($('button.buttons-selected').text()).toBe('test selected');
		});
		it('Enabled when row selected', function() {
			$('tbody tr:eq(2) td:eq(0)').click();
			expect($('button.buttons-selected').hasClass('disabled')).toBe(false);
		});
		it('Calls action when click', function() {
			expect(called).toBe(false);
			$('button.buttons-selected').click();
			expect(called).toBe(true);
		});
		it('Enabled when row selected', function() {
			$('tbody tr:eq(3) td:eq(0)').click();
			expect($('button.buttons-selected').hasClass('disabled')).toBe(false);
		});
	});
});
