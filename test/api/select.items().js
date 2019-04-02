describe('Select - select.items()', function() {
	let  table;

	dt.libs({
		js: ['jquery', 'datatables', 'select'],
		css: ['datatables', 'select']
	});

	describe('Check the defaults', function() {
		dt.html('basic');
		it('Exists and is a function', function() {
			table = $('#example').DataTable({ select: true });
			expect(typeof table.select.items).toBe('function');
		});
		it('Getter returns a string', function() {
			expect(typeof table.select.items()).toBe('string');
		});
		it('Default is row', function() {
			expect(table.select.items()).toBe('row');
		});
		it('Setter returns an API instance', function() {
			expect(table.select.items('cell') instanceof $.fn.dataTable.Api).toBe(true);
		});
	});

	describe('Check the behaviour - rows', function() {
		dt.html('basic');
		it('Nothing selected initially', function() {
			table = $('#example').DataTable({
				select: {
					style: 'single',
					items: 'cell'
				}
			});
			expect(table.select.items()).toBe('cell');
		});
		it('Change to row', function() {
			table.select.items('row');
			expect(table.select.items()).toBe('row');
		});
		it('Can click', function() {
			$('#example tbody tr:eq(2) td:eq(1)').click();
			expect(table.rows({ selected: true }).count()).toBe(1);
			expect(table.rows({ selected: true }).data()[0][0]).toBe('Ashton Cox');
		});
		it('No columns selected', function() {
			expect(table.columns({ selected: true }).count()).toBe(0);
		});
		it('No cells selected', function() {
			expect(table.cells({ selected: true }).count()).toBe(0);
		});
	});

	describe('Check the behaviour - columns', function() {
		let table;

		dt.html('basic');
		it('Nothing selected initially', function() {
			table = $('#example').DataTable({
				select: {
					style: 'single',
					items: 'row'
				}
			});
			expect(table.select.items()).toBe('row');
		});
		it('Change to column', function() {
			table.select.items('column');
			expect(table.select.items()).toBe('column');
		});
		it('Can click', function() {
			$('#example tbody tr:eq(2) td:eq(1)').click();
			expect(table.columns({ selected: true }).count()).toBe(1);
			expect(table.columns({ selected: true }).data()[0][0]).toBe('Accountant');
		});
		it('No rows selected', function() {
			expect(table.rows({ selected: true }).count()).toBe(0);
		});
		it('No cells selected', function() {
			expect(table.cells({ selected: true }).count()).toBe(0);
		});
	});

	describe('Check the behaviour - cell', function() {
		let table;

		dt.html('basic');
		it('Nothing selected initially', function() {
			table = $('#example').DataTable({
				select: {
					style: 'single',
					items: 'column'
				}
			});
			expect(table.select.items()).toBe('column');
		});
		it('Change to cell', function() {
			table.select.items('cell');
			expect(table.select.items()).toBe('cell');
		});
		it('Can click', function() {
			$('#example tbody tr:eq(2) td:eq(1)').click();
			expect(table.cells({ selected: true }).count()).toBe(1);
			expect(table.cells({ selected: true }).data()[0]).toBe('Junior Technical Author');
		});
		it('No rows selected', function() {
			expect(table.rows({ selected: true }).count()).toBe(0);
		});
		it('No columns selected', function() {
			expect(table.columns({ selected: true }).count()).toBe(0);
		});
	});
});
