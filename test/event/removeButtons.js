describe('Select events removed with buttons', function() {
	let table;

	dt.libs({
		js: ['jquery', 'datatables', 'buttons', 'select'],
		css: ['datatables', 'buttons', 'select']
	});

	dt.html('basic');
	it('Create DataTable with buttons that use selected events', function() {
		table = $('#example').DataTable({
			select: true,
			dom: 'Bfrtip',
			buttons: ['selected', 'selectedSingle', 'selectNone']
		});

		expect(table.buttons().count()).toBe(3);
	});
	it('Remove buttons', function() {
		table.buttons().remove();
		expect(table.buttons().count()).toBe(0);
	});
	it('Select a row', function() {
		table.row(':eq(0)').select();
		expect(table.rows({ selected: true }).count()).toBe(1);
	});
	it('Deselect the row', function() {
		table.row(':eq(0)').deselect();
		expect(table.rows({ selected: true }).count()).toBe(0);
	});
});
