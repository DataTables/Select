describe('Select - Events - slectStyle', function() {
	var table;

	dt.libs({
		js: ['jquery', 'datatables', 'select'],
		css: ['datatables', 'select']
	});

	describe('Check the defaults', function() {
		let params = undefined;

		dt.html('basic_id');
		it('Set stuff up', function() {
			table = $('#example')
				.DataTable()
				.on('selectStyle', function() {
					params = arguments;
				});

			expect(params).toBe(undefined);
		});

		it('Is called with the right parameters', function() {
			table.select.style('multi');

			expect(params.length).toBe(3);
			expect(params[0] instanceof $.Event).toBe(true);
			expect(params[1] instanceof $.fn.dataTable.Api).toBe(true);
			expect(typeof params[2]).toBe('string');
		});
	});

	describe('Functional tests', function() {
		let params = undefined;

		dt.html('basic_id');
		it('Set stuff up', function() {
			table = $('#example')
				.DataTable({
					select: {
						style: 'api'
					}
				})
				.on('selectStyle', function() {
					params = arguments;
				});

			expect(params).toBe(undefined);
		});

		it('Set to api', function() {
			table.select.style('api');
			expect(params[2]).toBe('api');
		});
		it('Set to single', function() {
			table.select.style('single');
			expect(params[2]).toBe('single');
		});
		it('Set to multi', function() {
			table.select.style('multi');
			expect(params[2]).toBe('multi');
		});
		it('Set to os', function() {
			table.select.style('os');
			expect(params[2]).toBe('os');
		});
		it('Set to multi+shift', function() {
			table.select.style('multi+shift');
			expect(params[2]).toBe('multi+shift');
		});
		it('Set to unknown', function() {
			table.select.style('unknown');
			expect(params[2]).toBe('unknown');
		});
	});
});
