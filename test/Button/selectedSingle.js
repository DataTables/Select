describe('Select - Button - selectedSingle', function() {
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
				buttons: ['selectedSingle']
			});

			expect($('button.dt-button').length).toBe(1);
			expect($('button.buttons-selected-single').length).toBe(1);
			expect($('button.buttons-selected-single').text()).toBe('Selected single');
		});
		it('Disabled if nothing selected', function() {
			expect($('button.buttons-selected-single').hasClass('disabled')).toBe(true);
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
						extend: 'selectedSingle',
						action: function() {
							called = true;
						}
					}
				],
				language: {
					buttons: {
						selectedSingle: 'test selectedSingle'
					}
				}
			});

			expect($('button.dt-button').length).toBe(1);
			expect($('button.buttons-selected-single').length).toBe(1);
		});
		it('Language options', function() {
			expect($('button.buttons-selected-single').text()).toBe('test selectedSingle');
		});
		it('Enabled when row selected', function() {
			$('tbody tr:eq(2) td:eq(0)').click();
			expect($('button.buttons-selected-single').hasClass('disabled')).toBe(false);
		});
		it('Calls action when click', function() {
			expect(called).toBe(false);
			$('button.buttons-selected-single').click();
			expect(called).toBe(true);
		});
		it('Disabled when additional row selected', function() {
			var clickEvent = $.Event('click');
			clickEvent.shiftKey = true;
			$('tbody tr:eq(3) td:eq(0)').trigger(clickEvent);
			expect($('button.buttons-selected-single').hasClass('disabled')).toBe(true);
		});
	});
});
