describe('Ensure that a checkbox is not checked when the row is invalidated', function () {
	var table;

	dt.libs({
		js: ['datatables', 'select'],
		css: ['datatables', 'select']
	});

	dt.html('basic');

	it('A class of `selectable` enables OS style selection', function () {
		table = new DataTable('#example', {
			columnDefs: [
				{
					orderable: false,
					render: DataTable.render.select(),
					targets: 0
				}
			],
			select: {
				style: 'os',
				selector: 'td:first-child'
			},
			data: [[1, 2, 3, 4, 5, 6]],
			order: [[1, 'asc']]
		});

		expect(document.querySelector('input.dt-select-checkbox').checked).toBe(
			false
		);
	});

	it('Invalidate the row - make sure it stays unchecked', function () {
		table.rows().deselect().invalidate();

		expect(document.querySelector('input.dt-select-checkbox').checked).toBe(
			false
		);
	});
});
