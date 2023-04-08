describe('Select - Button - showSelected', function () {
	let table;

	dt.libs({
		js: ['jquery', 'datatables', 'buttons', 'select'],
		css: ['datatables', 'buttons', 'select']
	});

	describe('Check the defaults', function () {
		dt.html('basic_id');
		it('Check defaults', function () {
			table = $('#example').DataTable({
				dom: 'Blfrtip',
				buttons: ['showSelected']
			});

			expect($('button.dt-button').length).toBe(1);
			expect($('button.buttons-show-selected').length).toBe(1);
			expect($('button.buttons-show-selected').text()).toBe('Show only selected');
		});
	});

	describe('Functional tests', function () {
		dt.html('basic_id');
		it('Button on page', function () {
			table = $('#example').DataTable({
				dom: 'Blfrtip',
				select: true,
				buttons: ['showSelected'],
				language: {
					buttons: {
						showSelected: 'test show selected'
					}
				}
			});

			expect($('button.dt-button').length).toBe(1);
			expect($('button.buttons-show-selected').length).toBe(1);
		});
		it('Language options', function () {
			expect($('button.buttons-show-selected').text()).toBe('test show selected');
		});
		it('Nothing shown if no rows selected', function () {
			$('button.buttons-show-selected').click();
			expect($('tbody td:eq(0)').text()).toBe('No matching records found');
		});
		it('Full table shown when unselected', function () {
			$('button.buttons-show-selected').click();
			expect($('tbody td:eq(0)').text()).toBe('Airi Satou');
		});
		it('Select single row', function () {
			table.row(2).select();
			$('button.buttons-show-selected').click();
			expect($('tbody tr').length).toBe(1);
			expect($('tbody td:eq(0)').text()).toBe('Ashton Cox');
		});
		it('Full table shown when unselected again', function () {
			$('button.buttons-show-selected').click();
			expect($('tbody td:eq(0)').text()).toBe('Airi Satou');
			expect(table.rows({ selected: true }).length).toBe(1);
		});
		it('Select multiple rows', function () {
			table.rows([2, 15]).select();
			$('button.buttons-show-selected').click();
			expect($('tbody tr').length).toBe(2);
			expect($('tbody tr:eq(0) td:eq(0)').text()).toBe('Ashton Cox');
			expect($('tbody tr:eq(1) td:eq(0)').text()).toBe('Michael Silva');
		});
	});
});
