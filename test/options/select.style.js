describe('Select - select.items', function() {
	var table;

	dt.libs({
		js: ['jquery', 'datatables', 'select'],
		css: ['datatables', 'select']
	});

	describe('Functional tests', function() {
		let table;
		let rows;

		dt.html('basic');
		it('api - clicking does nothing', function() {
			table = $('#example').DataTable({
				select: {
					style: 'api'
				}
			});

			$('#example tbody tr:eq(2) td:eq(1)').click();
			expect(table.rows({ selected: true }).count()).toBe(0);
		});
		it('api', function() {
			table.row(2).select();

			rows = table.rows({ selected: true });
			expect(rows.count()).toBe(1);
			expect(rows.data()[0][0]).toBe('Ashton Cox');
		});

		dt.html('basic');
		it('single', function() {
			table = $('#example').DataTable({
				select: {
					style: 'single'
				}
			});

			$('#example tbody tr:eq(2) td:eq(1)').click();

			rows = table.rows({ selected: true });
			expect(rows.count()).toBe(1);
			expect(rows.data()[0][0]).toBe('Ashton Cox');
		});
		it('single - another row', function() {
			$('#example tbody tr:eq(9) td:eq(1)').click();

			rows = table.rows({ selected: true });
			expect(rows.count()).toBe(1);
			expect(rows.data()[0][0]).toBe('Cedric Kelly');
		});

		dt.html('basic');
		it('multi', function() {
			table = $('#example').DataTable({
				select: {
					style: 'multi'
				}
			});

			$('#example tbody tr:eq(2) td:eq(1)').click();

			rows = table.rows({ selected: true });
			expect(rows.count()).toBe(1);
			expect(rows.data()[0][0]).toBe('Ashton Cox');
		});
		it('single - another row', function() {
			$('#example tbody tr:eq(9) td:eq(1)').click();

			rows = table.rows({ selected: true });
			expect(rows.count()).toBe(2);
			expect(rows.data()[0][0]).toBe('Ashton Cox');
			expect(rows.data()[1][0]).toBe('Cedric Kelly');
		});

		dt.html('basic');
		it('os', function() {
			table = $('#example').DataTable({
				select: {
					style: 'os'
				}
			});

			$('#example tbody tr:eq(2) td:eq(1)').click();

			rows = table.rows({ selected: true });
			expect(rows.count()).toBe(1);
			expect(rows.data()[0][0]).toBe('Ashton Cox');
		});
		it('os - another row', function() {
			$('#example tbody tr:eq(9) td:eq(1)').click();

			rows = table.rows({ selected: true });
			expect(rows.count()).toBe(1);
			expect(rows.data()[0][0]).toBe('Cedric Kelly');
		});
		it('os - another row with shift', function() {
			var clickEvent = $.Event('click');
			clickEvent.shiftKey = true;
			$('#example tbody tr:eq(1) td:eq(1)').trigger(clickEvent);

			rows = table.rows({ selected: false, page: 'current' });
			expect(rows.count()).toBe(1);
			expect(rows.data()[0][0]).toBe('Airi Satou');
		});

		dt.html('basic');
		it('multi+shift', function() {
			table = $('#example').DataTable({
				select: {
					style: 'multi+shift'
				}
			});

			$('#example tbody tr:eq(2) td:eq(1)').click();

			rows = table.rows({ selected: true });
			expect(rows.count()).toBe(1);
			expect(rows.data()[0][0]).toBe('Ashton Cox');
		});
		it('multi+shift - another row', function() {
			$('#example tbody tr:eq(9) td:eq(1)').click();

			rows = table.rows({ selected: true });
			expect(rows.count()).toBe(2);
			expect(rows.data()[0][0]).toBe('Ashton Cox');
			expect(rows.data()[1][0]).toBe('Cedric Kelly');
		});
		it('multi+shift - another row with shift', function() {
			var clickEvent = $.Event('click');
			clickEvent.shiftKey = true;
			$('#example tbody tr:eq(3) td:eq(1)').trigger(clickEvent);

			rows = table.rows({ selected: false, page: 'current' });
			expect(rows.count()).toBe(2);
			expect(rows.data()[0][0]).toBe('Airi Satou');
			expect(rows.data()[1][0]).toBe('Angelica Ramos');
		});
	});
});
