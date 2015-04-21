/* Select for DataTables
 * 2015 SpryMedia Ltd - datatables.net/license
 */
(function(window, document, undefined) {


var factory = function( $, DataTable ) {
"use strict";

DataTable.select = {};
DataTable.select.version = '0.0.1-dev';


function rowColumnRange( dt, type, idx, last )
{
	// Add a range of rows from the last selected row to this
	// one
	var indexes = dt[type+'s']( { search: 'applied' } ).indexes();
	var idx1 = $.inArray( last, indexes );
	var idx2 = $.inArray( idx, indexes );

	if ( ! dt[type+'s']( { selected: true } ).any() && idx1 === -1 ) {
		// select from top to here - slightly odd, but both
		// Windows and Mac OS do this
		indexes.splice( $.inArray( idx, indexes )+1, indexes.length );
	}
	else {
		// reverse so we can shift click 'up' as well as down
		if ( idx1 > idx2 ) {
			var tmp = idx2;
			idx2 = idx1;
			idx1 = tmp;
		}

		indexes.splice( idx2+1, indexes.length );
		indexes.splice( 0, idx1 );
	}

	if ( ! dt[type]( idx, { selected: true } ).any() ) {
		// Select range
		dt[type+'s']( indexes ).select();
	}
	else {
		// Deselect range - need to keep the clicked on row selected
		indexes.splice( $.inArray( idx, indexes ), 1 );
		dt[type+'s']( indexes ).deselect();
	}
}


function cellRange( dt, type, idx, last )
{
	// Cell range is more complicated than row and column as we want to select
	// in the visible grid rather than by index in sequence. For example, if you
	// click first in cell 1-1 and then shift click in 2-2 - cells 1-2 and 2-1
	// should also be selected (and not 1-3, 1-4. etc)
	var indexes;
	var columnIndexes;
	var rowIndexes;
	var selectColumns = function ( start, end ) {
		if ( start > end ) {
			var tmp = end;
			end = start;
			start = tmp;
		}
		
		var record = false;
		return dt.columns( ':visible' ).indexes().filter( function (i) {
			if ( i === start ) {
				record = true;
			}
			
			if ( i === end ) { // not else if, as start might === end
				record = false;
				return true;
			}

			return record;
		} );
	};

	var selectRows = function ( start, end ) {
		var indexes = dt.rows( { search: 'applied' } ).indexes();

		// Which comes first - might need to swap
		if ( indexes.indexOf( start ) > indexes.indexOf( end ) ) {
			var tmp = end;
			end = start;
			start = tmp;
		}

		var record = false;
		return indexes.filter( function (i) {
			if ( i === start ) {
				record = true;
			}
			
			if ( i === end ) {
				record = false;
				return true;
			}

			return record;
		} );
	};

	if ( ! dt.cells( { selected: true } ).any() && ! last ) {
		// select from the top left cell to this one
		columnIndexes = selectColumns( 0, idx.column );
		rowIndexes = selectRows( 0 , idx.row );
	}
	else {
		// Get column indexes between old and new
		columnIndexes = selectColumns( last.column, idx.column );
		rowIndexes = selectRows( last.row , idx.row );
	}

	indexes = dt.cells( rowIndexes, columnIndexes ).flatten();

	if ( ! dt.cells( idx, { selected: true } ).any() ) {
		// Select range
		dt.cells( indexes ).select();
	}
	else {
		// Deselect range
		dt.cells( indexes ).deselect();
	}
}


function typeSelect ( e, dt, ctx, type, idx )
{
	var style = dt.select.style();
	var isSelected = dt[type]( idx, { selected: true } ).any();

	if ( style === 'os' ) {
		if ( e.ctrlKey || e.metaKey ) {
			// Add or remove from the selection
			dt[type]( idx ).select( ! isSelected );
		}
		else if ( e.shiftKey ) {
			if ( type === 'cell' ) {
				cellRange( dt, type, idx, ctx._select_lastCell || null );
			}
			else {
				rowColumnRange( dt, type, idx, ctx._select_lastCell ?
					ctx._select_lastCell[type] :
					null
				);
			}
		}
		else {
			// No cmd or shift click - deselect if selected, or select
			// this row only
			var selected = dt[type+'s']( { selected: true } );

			if ( isSelected && selected.flatten().length === 1 ) {
				dt[type]( idx ).deselect();
			}
			else {
				selected.deselect();
				dt[type]( idx ).select();
			}
		}
	}
	else {
		dt[ type ]( idx ).select( ! isSelected );
	}
}


function enableMouseSelection ( dt )
{
	// xxx what about FixedColumns?
	// xxx select events

	var body = $( dt.table().body() );

	body
		.on( 'mousedown.dtSelect', 'td, th', function(e) {
			// Disallow text selection for shift clicking on the table so multi
			// element selection doesn't look terrible!
			if ( e.shiftKey ) {
				body
					.css( '-moz-user-select', 'none' )
					.one('selectstart.dtSelect', 'td, th', function () {
						return false;
					} );
			}
		} )
		.on( 'mouseup.dtSelect', 'td, th', function(e) {
			// Allow text selection to occur again, Mozilla style (tested in FF
			// 35.0.1 - still required)
			body.css( '-moz-user-select', '' );
		} )
		.on( 'click.dtSelect', 'td, th', function ( e ) {
			// what mode are we operating in?
			var mode = dt.select.mode();
			var cellIndex = dt.cell( this ).index();
			var idx;

			var ctx = dt.settings()[0];

			// Ignore clicks inside a sub-table
			if ( $(e.target).closest('tbody')[0] != body[0] ) {
				return;
			}

			// Check the cell actually belongs to the host DataTable (so child rows,
			// etc, are ignored)
			if ( ! dt.cell( e.target ).any() ) {
				return;
			}

			if ( mode === 'row' ) {
				idx = cellIndex.row;
				typeSelect( e, dt, ctx, 'row', idx );
			}
			else if ( mode === 'column' ) {
				idx = dt.cell( e.target ).index().column;
				typeSelect( e, dt, ctx, 'column', idx );
			}
			else if ( mode === 'cell' ) {
				idx = dt.cell( e.target ).index();
				typeSelect( e, dt, ctx, 'cell', idx );
			}

			ctx._select_lastCell = cellIndex;
		} );

	// Blurable
	$('body').on( 'click.dtSelect', function ( e ) {
		var ctx = dt.settings()[0];

		if ( ctx._select_blurable ) {
			if ( $.inArray( dt.table().node(), $(e.target).parents('table').toArray() ) === -1 ) {
				_selectClear( ctx, true );
			}
		}
	} );

	// Destroy tidy up
	dt.on( 'destroy.dtSelect.dt', function () {
		disableMouseSelection( dt );
	} );
}


function disableMouseSelection( dt )
{
	$( dt.table().body() )
		.off( 'mousedown.dtSelect', 'td, th' )
		.off( 'mouseup.dtSelect', 'td, th' )
		.off( 'click.dtSelect', 'td, th' );

	$('body').on( 'click.dtSelect' );

	dt.off( 'destroy.dtSelect' );
}


function _selectClear( ctx, force )
{
	if ( force || ctx._select_style === 'single' ) {
		var api = new DataTable.Api( ctx );
		
		api.rows( { selected: true } ).deselect();
		api.columns( { selected: true } ).deselect();
		api.cells( { selected: true } ).deselect();
	}
}


// row and column are basically identical just assigned to different properties
// and checking a different array, so we can dynamically create the functions to
// reduce the code size
$.each( [
	{ type: 'row', prop: 'aoData' },
	{ type: 'column', prop: 'aoColumns' }
], function ( i, o ) {
	DataTable.ext.selector[ o.type ].push( function ( settings, opts, indexes ) {
		var selected = opts.selected;
		var data;
		var out = [];

		if ( selected === undefined ) {
			return indexes;
		}

		for ( var i=0, ien=indexes.length ; i<ien ; i++ ) {
			data = settings[ o.prop ][ indexes[i] ];

			if ( (selected === true && data._select_selected === true) ||
				 (selected === false && ! data._select_selected )
			) {
				out.push( indexes[i] );
			}
		}

		return out;
	} );
} );


DataTable.ext.selector.cell.push( function ( settings, opts, cells ) {
	var selected = opts.selected;
	var rowData;
	var out = [];

	if ( selected === undefined ) {
		return cells;
	}

	for ( var i=0, ien=cells.length ; i<ien ; i++ ) {
		rowData = settings.aoData[ cells[i].row ];

		if ( (selected === true && rowData._selected_cells && rowData._selected_cells[ cells[i].column ] === true) ||
			 (selected === false && ( ! rowData._selected_cells || ! rowData._selected_cells[ cells[i].column ] ) )
		) {
			out.push( cells[i] );
		}
	}

	return out;
} );



// This will occur _after_ the initial DataTables initialisation, although
// before Ajax data is rendered, if there is ajax data
function selectInit ( ctx ) {
	// Row callback so that classes can be added to rows and cells if the item
	// was selected before the element was created. This will happen with the
	// `deferRender` option enabled.
	// 
	// This method of attaching to `aoRowCreatedCallback` is a hack until
	// DataTables has proper events for row manipulation If you are reviewing
	// this code to create your own plug-ins, please do not do this!
	ctx.aoRowCreatedCallback.push( {
		fn: function ( row, data, index ) {
			var i, ien;
			var d = ctx.aoData[ index ];

			// Row
			if ( d._select_selected ) {
				$( row ).addClass( 'selected' );
			}

			// Cells and columns - if separated out, we would need to do two
			// loops, so it makes sense to combine them into a single one
			for ( i=0, ien=ctx.aoColumns.length ; i<ien ; i++ ) {
				if ( ctx.aoColumns[i]._select_selected || (d._selected_cells && d._selected_cells[i]) ) {
					$(d.anCells[i]).addClass( 'selected' );
				}
			}
		},
		sName: 'select-deferRender'
	} );
}

/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
 * DataTables API
 *
 * For complete documentation, please refer to the docs/api directory or the
 * DataTables site
 */

DataTable.Api.register( 'select()', function () {} );

DataTable.Api.register( 'select.mode()', function ( type ) {
	if ( type === undefined ) {
		return this.context[0]._select_mode;
	}

	return this.iterator( 'table', function ( ctx ) {
		ctx._select_mode = type;
	} );
} );

// Takes effect from the _next_ selection. None disables future selection, but
// does not clear the current selection. Use the `deselect` methods for that
DataTable.Api.register( 'select.style()', function ( style ) {
	if ( style === undefined ) {
		return this.context[0]._select_style;
	}

	return this.iterator( 'table', function ( ctx ) {
		ctx._select_style = style;

		if ( ! ctx._select_init ) {
			selectInit( ctx );
		}

		// Add / remove mouse event handlers. They aren't required when only
		// API selection is available, so they should be removed.
		if ( style === 'api' ) {
			ctx._select_listeners = false;
			disableMouseSelection( new DataTable.Api( ctx ) );
		}
		else {
			if ( ! ctx._select_listeners ) {
				enableMouseSelection( new DataTable.Api( ctx ) );
			}
		}
	} );
} );

// click outside the datatable to clear selection
DataTable.Api.register( 'select.blurable()', function ( flag ) {
	if ( flag === undefined ) {
		return this.context[0]._select_blurable;
	}

	return this.iterator( 'table', function ( ctx ) {
		ctx._select_blurable = flag;
	} );
} );


DataTable.Api.registerPlural( 'rows().select()', 'row().select()', function ( select ) {
	if ( select === false ) {
		return this.deselect();
	}

	return this.iterator( 'row', function ( ctx, idx ) {
		_selectClear( ctx );

		ctx.aoData[ idx ]._select_selected = true;
		$( ctx.aoData[ idx ].nTr ).addClass( 'selected' );
	} );
} );

DataTable.Api.registerPlural( 'columns().select()', 'column().select()', function ( select ) {
	if ( select === false ) {
		return this.deselect();
	}

	return this.iterator( 'column', function ( ctx, idx ) {
		_selectClear( ctx );

		ctx.aoColumns[ idx ]._select_selected = true;

		// xxx need a new row listener to add the class

		var column = new DataTable.Api( ctx ).column( idx );

		$( column.header() ).addClass( 'selected' );
		$( column.footer() ).addClass( 'selected' );

		column.nodes().to$().addClass( 'selected' );
	} );
} );

DataTable.Api.registerPlural( 'cells().select()', 'cell().select()', function ( select ) {
	if ( select === false ) {
		return this.deselect();
	}

	return this.iterator( 'cell', function ( ctx, rowIdx, colIdx ) {
		_selectClear( ctx );

		var data = ctx.aoData[ rowIdx ];

		if ( data._selected_cells === undefined ) {
			data._selected_cells = [];
		}

		data._selected_cells[ colIdx ] = true;

		if ( data.anCells ) {
			$( data.anCells[ colIdx ] ).addClass( 'selected' );
		}
	} );
} );


DataTable.Api.registerPlural( 'rows().deselect()', 'row().deselect()', function () {
	return this.iterator( 'row', function ( ctx, idx ) {
		ctx.aoData[ idx ]._select_selected = false;
		$( ctx.aoData[ idx ].nTr ).removeClass( 'selected' );
	} );
} );

DataTable.Api.registerPlural( 'columns().deselect()', 'column().deselect()', function () {
	return this.iterator( 'column', function ( ctx, idx ) {
		ctx.aoColumns[ idx ]._select_selected = false;

		var column = new DataTable.Api( ctx ).column( idx );

		$( column.header() ).removeClass( 'selected' );
		$( column.footer() ).removeClass( 'selected' );

		// xxx what if they are cell selected?
		column.nodes().to$().removeClass( 'selected' );
	} );
} );

DataTable.Api.registerPlural( 'cells().deselect()', 'cell().deselect()', function () {
	return this.iterator( 'cell', function ( ctx, rowIdx, colIdx ) {
		var data = ctx.aoData[ rowIdx ];

		data._selected_cells[ colIdx ] = false;

		// xxx what if they are column selected?
		if ( data.anCells ) {
			$( data.anCells[ colIdx ] ).removeClass( 'selected' );
		}
	} );
} );


/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
 * Buttons
 */


// -- buttons
// select (alias of selectMulti?)
// selectSingle
// selectAllRows | Columns | Cells
// selectNone Rows | Columns | Cells
// selectMode Rows | Columns | Cells




/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
 * Initialisation
 */

// DataTables creation - check if the buttons have been defined for this table,
// they will have been if the `B` option was used in `dom`, otherwise we should
// create the buttons instance here so they can be inserted into the document
// using the API
$(document).on( 'init.dt.dtSelect', function (e, ctx, json) {
	if ( e.namespace !== 'dt' ) {
		return;
	}

	var opts = ctx.oInit.select || DataTable.defaults.select;
	var dt = new DataTable.Api( ctx );

	// Set defaults
	ctx._select_mode = 'row';
	ctx._select_style = 'api';
	ctx._select_blurable = false;

	// Initialisation customisations
	if ( opts === true ) {
		dt.select.style( 'os' );
	}
	else if ( typeof opts === 'string' ) {
		dt.select.style( opts );
	}
	else if ( $.isPlainObject( opts ) ) {
		dt.select.style( opts.style || 'os' );
		dt.select.mode( opts.mode || 'row' );
		dt.select.blurable( opts.blurable || false );
	}

	// If the init options haven't enabled select, but there is a selectable
	// class name, then enable
	if ( $( dt.table().node() ).hasClass( 'selectable' ) ) {
		dt.select.style( 'os' );
	}
} );


}; // /factory


// Define as an AMD module if possible
if ( typeof define === 'function' && define.amd ) {
	define( ['jquery', 'datatables'], factory );
}
else if ( typeof exports === 'object' ) {
    // Node/CommonJS
    factory( require('jquery'), require('datatables') );
}
else if ( jQuery && !jQuery.fn.dataTable.select ) {
	// Otherwise simply initialise as normal, stopping multiple evaluation
	factory( jQuery, jQuery.fn.dataTable );
}


})(window, document);

