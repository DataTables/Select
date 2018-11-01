describe('Select - select.style()', function() {
	var table;

	dt.libs({
		js: ['jquery', 'datatables', 'select'],
		css: ['datatables', 'select']
	});

	describe('Check the defaults', function() {
		dt.html('basic');
		let table;
		it('Exists and is a function', function() {
			table = $('#example').DataTable({ select: true });
			expect(typeof table.select.style).toBe('function');
		});
		it('Getter returns a string', function() {
			expect(typeof table.select.style()).toBe('string');
		});
		it('Default is os', function() {
			expect(table.select.style()).toBe('os');
		});
		it('Setter returns an API instance', function() {
			expect(table.select.style('api') instanceof $.fn.dataTable.Api).toBe(true);
		});
	});

	describe('Check the behaviour - api', function() {
		let table;

		dt.html('basic');
		it('No rows selected initially', function() {
			table = $('#example').DataTable({
				select: {
					style: 'api'
				}
			});
			expect(table.rows({ selected: true }).count()).toBe(0);
		});
		it('Clicking on a row does nothing', function() {
			$('#example tbody tr:eq(2) td:eq(0)').click();
			expect(table.rows({ selected: true }).count()).toBe(0);
		});
		it('Selecting through API leaves one selected', function() {
			table.row(2).select();
			expect(table.rows({ selected: true }).count()).toBe(1);
			expect(table.rows({ selected: true }).data()[0][0]).toBe('Ashton Cox');
		});
		it('Selecting another through API selects both', function() {
			table.row(3).select();
			expect(table.rows({ selected: true }).count()).toBe(2);
			expect(table.rows({ selected: true }).data()[0][0]).toBe('Ashton Cox');
			expect(table.rows({ selected: true }).data()[1][0]).toBe('Cedric Kelly');
		});
	});

	describe('Check the behaviour - single', function() {
		let table;

		dt.html('basic');
		it('No rows selected initially', function() {
			table = $('#example').DataTable({
				select: {
					style: 'single'
				}
			});
			expect(table.rows({ selected: true }).count()).toBe(0);
		});
		it('Can click on a row', function() {
			$('#example tbody tr:eq(2) td:eq(0)').click();
			expect(table.rows({ selected: true }).count()).toBe(1);
			expect(table.rows({ selected: true }).data()[0][0]).toBe('Ashton Cox');
		});
		it('Clicking same row deselects it', function() {
			$('#example tbody tr:eq(2) td:eq(0)').click();
			expect(table.rows({ selected: true }).count()).toBe(0);
		});
		it('Clicking two rows selects only a single', function() {
			$('#example tbody tr:eq(1) td:eq(0)').click();
			$('#example tbody tr:eq(2) td:eq(0)').click();
			expect(table.rows({ selected: true }).count()).toBe(1);
			expect(table.rows({ selected: true }).data()[0][0]).toBe('Ashton Cox');
		});
		it('Shift clicking row selects just the one', function() {
			var clickEvent = $.Event('click');
			clickEvent.shiftKey = true;

			$('#example tbody tr:eq(1) td:eq(0)').trigger(clickEvent);
			expect(table.rows({ selected: true }).count()).toBe(1);
			expect(table.rows({ selected: true }).data()[0][0]).toBe('Angelica Ramos');
		});
		it('Selecting through API leaves one selected', function() {
			table.row(2).select();
			expect(table.rows({ selected: true }).count()).toBe(1);
			expect(table.rows({ selected: true }).data()[0][0]).toBe('Ashton Cox');
		});
		it('Selecting another through API leaves one selected', function() {
			table.row(3).select();
			expect(table.rows({ selected: true }).count()).toBe(1);
			expect(table.rows({ selected: true }).data()[0][0]).toBe('Cedric Kelly');
		});
	});

	describe('Check the behaviour - multi', function() {
		let table;

		dt.html('basic');
		it('No rows selected initially', function() {
			table = $('#example').DataTable({
				select: {
					style: 'multi'
				}
			});
			expect(table.rows({ selected: true }).count()).toBe(0);
		});
		it('Can click on a row', function() {
			$('#example tbody tr:eq(2) td:eq(0)').click();
			expect(table.rows({ selected: true }).count()).toBe(1);
			expect(table.rows({ selected: true }).data()[0][0]).toBe('Ashton Cox');
		});
		it('Clicking same row deselects it', function() {
			$('#example tbody tr:eq(2) td:eq(0)').click();
			expect(table.rows({ selected: true }).count()).toBe(0);
		});
		it('Clicking two rows selects both', function() {
			$('#example tbody tr:eq(1) td:eq(0)').click();
			$('#example tbody tr:eq(2) td:eq(0)').click();
			expect(table.rows({ selected: true }).count()).toBe(2);
			expect(table.rows({ selected: true }).data()[0][0]).toBe('Angelica Ramos');
			expect(table.rows({ selected: true }).data()[1][0]).toBe('Ashton Cox');
		});
		it('Shift clicking also selects more', function() {
			var clickEvent = $.Event('click');
			clickEvent.shiftKey = true;

			$('#example tbody tr:eq(6) td:eq(0)').trigger(clickEvent);
			expect(table.rows({ selected: true }).count()).toBe(3);
			expect(table.rows({ selected: true }).data()[0][0]).toBe('Angelica Ramos');
			expect(table.rows({ selected: true }).data()[1][0]).toBe('Ashton Cox');
			expect(table.rows({ selected: true }).data()[2][0]).toBe('Bruno Nash');
		});
		it('Selecting through API leaves one selected', function() {
			table.row(3).select();
			expect(table.rows({ selected: true }).count()).toBe(4);
			expect(table.rows({ selected: true }).data()[0][0]).toBe('Angelica Ramos');
			expect(table.rows({ selected: true }).data()[1][0]).toBe('Ashton Cox');
			expect(table.rows({ selected: true }).data()[2][0]).toBe('Bruno Nash');
			expect(table.rows({ selected: true }).data()[3][0]).toBe('Cedric Kelly');
		});
		it('Selecting another through API leaves one selected', function() {
			table.row(5).select();
			expect(table.rows({ selected: true }).count()).toBe(5);
		});
	});

	describe('Check the behaviour - os', function() {
		let table;

		dt.html('basic');
		it('No rows selected initially', function() {
			table = $('#example').DataTable({
				select: {
					style: 'os'
				}
			});
			expect(table.rows({ selected: true }).count()).toBe(0);
		});
		it('Can click on a row', function() {
			$('#example tbody tr:eq(2) td:eq(0)').click();
			expect(table.rows({ selected: true }).count()).toBe(1);
			expect(table.rows({ selected: true }).data()[0][0]).toBe('Ashton Cox');
		});
		it('Clicking same row deselects it', function() {
			$('#example tbody tr:eq(2) td:eq(0)').click();
			expect(table.rows({ selected: true }).count()).toBe(0);
		});
		it('Clicking two rows selects only a single', function() {
			$('#example tbody tr:eq(1) td:eq(0)').click();
			$('#example tbody tr:eq(2) td:eq(0)').click();
			expect(table.rows({ selected: true }).count()).toBe(1);
			expect(table.rows({ selected: true }).data()[0][0]).toBe('Ashton Cox');
		});
		it('Shift clicking row selects range (after)', function() {
			var clickEvent = $.Event('click');
			clickEvent.shiftKey = true;

			$('#example tbody tr:eq(4) td:eq(0)').trigger(clickEvent);
			expect(table.rows({ selected: true }).count()).toBe(3);
			expect(table.rows({ selected: true }).data()[0][0]).toBe('Ashton Cox');
			expect(table.rows({ selected: true }).data()[1][0]).toBe('Bradley Greer');
			expect(table.rows({ selected: true }).data()[2][0]).toBe('Brenden Wagner');
		});
		it('Shift clicking row selects range (before)', function() {
			var clickEvent = $.Event('click');
			clickEvent.shiftKey = true;

			$('#example tbody tr:eq(2) td:eq(0)').click();
			$('#example tbody tr:eq(0) td:eq(0)').trigger(clickEvent);
			expect(table.rows({ selected: true }).count()).toBe(3);
			expect(table.rows({ selected: true }).data()[0][0]).toBe('Airi Satou');
			expect(table.rows({ selected: true }).data()[1][0]).toBe('Angelica Ramos');
			expect(table.rows({ selected: true }).data()[2][0]).toBe('Ashton Cox');
		});
		it('Control click adds to the selection', function() {
			var clickEvent = $.Event('click');
			clickEvent.ctrlKey = true;

			$('#example tbody tr:eq(1) td:eq(0)').click();
			$('#example tbody tr:eq(2) td:eq(0)').trigger(clickEvent);
			expect(table.rows({ selected: true }).count()).toBe(2);
			expect(table.rows({ selected: true }).data()[0][0]).toBe('Angelica Ramos');
			expect(table.rows({ selected: true }).data()[1][0]).toBe('Ashton Cox');
		});
		it('Selecting through API leaves one selected', function() {
			table.row(3).select();
			expect(table.rows({ selected: true }).count()).toBe(3);
			expect(table.rows({ selected: true }).data()[0][0]).toBe('Angelica Ramos');
			expect(table.rows({ selected: true }).data()[1][0]).toBe('Ashton Cox');
			expect(table.rows({ selected: true }).data()[2][0]).toBe('Cedric Kelly');
		});	
	});
});
