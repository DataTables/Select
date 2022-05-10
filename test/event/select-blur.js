describe('Select - Events - select-blur', function () {
	let table;
	let params = undefined;

	dt.libs({
		js: ['jquery', 'datatables', 'select'],
		css: ['datatables', 'select']
	});

	describe('Check the defaults', function () {
		dt.html('basic_id');
		it('Setup initial test', function () {
			$('#dt-test-loader-container').prepend('<div id="test">test</div>');

			table = $('#example')
				.DataTable({
					select: {
						blurable: true
					}
				})
				.on('select-blur', function () {
					params = arguments;
				});

			expect(params).toBe(undefined);
		});
		it('Not called when deselected by API', function () {
			table.row(2).select().deselect();
			expect(params).toBe(undefined);
		});
		it('Triggered when blurred', function () {
			table.row(2).select();
			$('#test').click();

			expect(params.length).toBe(4);
			expect(params[0] instanceof $.Event).toBe(true);
			expect(params[1] instanceof $.fn.dataTable.Api).toBe(true);
			expect(typeof params[2]).toBe('object');
			expect(params[3] instanceof $.Event).toBe(true);
		});
	});

	describe('Functional tests', function () {
		let cancel = false;

		dt.html('basic_id');
		it('Set stuff up', function () {
			$('#dt-test-loader-container').prepend('<div id="test">test</div>');

			params = undefined;
			table = $('#example')
				.DataTable({
					select: {
						blurable: true
					}
				})
				.on('select-blur', function () {
					params = arguments;

					if (cancel) {
						params[0].preventDefault();
					}
				});

			expect(params).toBe(undefined);
		});
		it('Deselection occurs by default', function () {
			params = undefined;
			table.row(2).select();
			$('#test').click();

			expect(params.length).toBe(4);
			expect(table.rows({ selected: true }).count()).toBe(0);
		});
		it('Deselection can be cancelled', function () {
			params = undefined;
			cancel = true;
			table.row(2).select();
			$('#test').click();

			expect(params.length).toBe(4);
			expect(table.rows({ selected: true }).count()).toBe(1);
		});
	});
});
