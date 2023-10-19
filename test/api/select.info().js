describe('Select - select.info()', function() {
	let table;

	dt.libs({
		js: ['jquery', 'datatables', 'select'],
		css: ['datatables', 'select']
	});

	describe('Check the defaults', function() {
		dt.html('basic');
		it('Exists and is a function', function() {
			table = $('#example').DataTable({
				select: {
					info: true
				}
			});
			expect(typeof table.select.info).toBe('function');
		});
		it('Getter returns a boolean', function() {
			expect(typeof table.select.info()).toBe('boolean');
		});
		it('Setter returns API instance', function() {
			expect(table.select.info(false) instanceof $.fn.dataTable.Api).toBe(true);
		});
	});

	describe('Functional tests', function() {
		dt.html('basic');
		it('Info originally', function() {
			table = $('#example').DataTable({
				select: {
					info: true
				}
			});

			$('#example tbody tr:eq(2) td:eq(1)').click();
			expect($('div.dt-info span.select-info').length).toBe(1);
		});
		it('Getter', function() {
			expect(table.select.info()).toBe(true);
		});
		it('... then disable', function() {
			table.select.info(false).draw();
			expect($('div.dt-info span.select-info').length).toBe(0);
		});
		it('Getter', function() {
			expect(table.select.info()).toBe(false);
		});
		it('... and click a row', function() {
			$('#example tbody tr:eq(3) td:eq(1)').click();
			expect($('div.dt-info span.select-info').length).toBe(0);
		});

		dt.html('basic');
		it('Info removed originally', function() {
			table = $('#example').DataTable({
				select: {
					info: false
				}
			});

			$('#example tbody tr:eq(2) td:eq(1)').click();
			expect($('div.dt-info span.select-info').length).toBe(0);
		});
		it('Getter', function() {
			expect(table.select.info()).toBe(false);
		});
		it('... then enable', function() {
			table.select.info(true).draw();
			expect($('div.dt-info span.select-info').length).toBe(1);
		});
		it('Getter', function() {
			expect(table.select.info()).toBe(true);
		});
		it('... and click a row', function() {
			$('#example tbody tr:eq(3) td:eq(1)').click();
			expect($('div.dt-info span.select-info').length).toBe(1);
		});
	});
});
