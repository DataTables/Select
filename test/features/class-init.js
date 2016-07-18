describe( 'Initialisation via class name', function() {
	var table;

	dt.libs( {
		js:  [ 'jquery', 'datatables', 'select' ],
		css: [ 'datatables', 'select' ]
	} );

	dt.html( 'basic' );

	it( 'A class of `selectable` enables OS style selection', function () {
		$('#example').addClass( 'selectable' );
		table = $('#example').DataTable();

		expect( table.select.style() ).toBe( 'os' );
	} );


	dt.html( 'basic' );

	it( 'Selectable class can be used with a custom style', function () {
		$('#example').addClass( 'selectable' );
		table = $('#example').DataTable( {
			select: {
				style: 'single'
			}
		} );

		expect( table.select.style() ).toBe( 'single' );
	} );


	dt.html( 'basic' );

	it( 'Selectable class can be used with api style specified', function () {
		$('#example').addClass( 'selectable' );
		table = $('#example').DataTable( {
			select: {
				style: 'api'
			}
		} );

		expect( table.select.style() ).toBe( 'api' );
	} );
} );