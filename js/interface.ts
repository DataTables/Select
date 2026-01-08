// Type definitions for DataTables Select
//
// Project: https://datatables.net/extensions/select/, https://datatables.net
// Definitions by:
//   SpryMedia
//   Jared Szechy <https://github.com/szechyjs>

/// <reference types="jquery" />

import DataTables, { CellIdx } from 'datatables.net';

export default DataTables;

export type StyleType = 'api' | 'single' | 'multi' | 'os' | 'multi+shift';

export type Selectable = (data: any, tr: HTMLElement, idx: number) => boolean;

export type HeaderCheckbox = boolean | 'none' | 'select-all' | 'select-page';

declare module 'datatables.net' {
	interface Config {
		/*
		 * Select extension options
		 */
		select?: boolean | string | ConfigSelect;
	}

	interface ConfigLanguage {
		/**
		 * Select language options
		 */
		select?: ConfigSelectLanguage;
	}

	interface Api<T> {
		select: ApiSelect<Api<T>>
	}

	interface ApiSelectorModifier {
		/**
		 * Pick rows / columns / cells which are selected
		 */
		selected?: boolean | undefined;
	}

	interface ApiRowMethods<T> {
		/**
		 * Blur a row
		 */
		blur(): ApiRowMethods<T>;

		/**
		 * Deselect a row
		 */
		deselect(): ApiRowMethods<T>;

		/**
		 * Keyboard focus on a row
		 */
		focus(): ApiRowMethods<T>;

		/**
		 * Select a row
		 */
		select(): ApiRowMethods<T>;

		/**
		 * Is a row selected
		 */
		selected(): boolean;
	}

	interface ApiRowsMethods<T> {
		/**
		 * Select multiple rows
		 * 
		 * @param toggle Can be false to deselect
		 */
		select(this: ApiRowsMethods<T>, toggle?: boolean): ApiRowsMethods<T>;

		/**
		 * Deselect a row
		 */
		deselect(this: ApiRowsMethods<T>): ApiRowsMethods<T>;
	}

	interface ApiCellMethods<T> {
		/**
		 * Select cell
		 */
		select(): ApiCellMethods<T>;

		/**
		 * Deselect a cell
		 */
		deselect(): ApiCellMethods<T>;
	}

	interface ApiColumnsMethods<T> {
		/**
		 * Select multiple columns
		 * 
		 * @param toggle Can be false to deselect
		 */
		select(this: ApiColumnsMethods<T>, toggle?: boolean): ApiColumnsMethods<T>;

		/**
		 * Deselect columns
		 */
		deselect(this: ApiColumnsMethods<T>): ApiColumnsMethods<T>;
	}

	interface ApiColumnMethods<T> {
		/**
		 * Select a column
		 */
		select(): ApiColumnMethods<T>;

		/**
		 * Deselect a column
		 */
		deselect(): ApiColumnMethods<T>;
	}

	interface ApiCellsMethods<T> {
		/**
		 * Select multiple cells
		 * 
		 * @param toggle Can be false to deselect
		 */
		select(this: ApiCellsMethods<T>, toggle?: boolean): ApiCellsMethods<T>;

		/**
		 * Deselect cells
		 */
		deselect(this: ApiCellsMethods<T>): ApiCellsMethods<T>;
	}

	interface DataTablesStatic {
		/**
		 * Select static methods
		 */
		select: {
			/**
			 * Class names used by Select
			 */
			classes: {
				/**
				 * Class name(s) to use for the checkbox. Space separated.
				 */
				checkbox: string;
			}

			/**
			 * Initialise Select (for use on tables which were not in the document
			 * when they were initialised).
			 */
			init: <T=any>(api: Api<T>) => void;

			/**
			 * Select version
			 */
			version: string;
		}
	}

	interface DataTablesStaticRender {
		/**
		 * Display a checkbox in the column's cells to be used for and represent
		 * row selection.
		 */
		select(): any;

		/**
		 * Display a checkbox in the column's cells to be used for and represent
		 * row selection, with the `value` and `name` attributes for the checkbox
		 * `input` being set by properties from the row's data object.
		 *
		 * @param valueProp Name of the data property where the `value` for the
		 *   checkbox is.
		 * @param nameProp Name of the data property where the `name` for the
		 *   checkbox is.
		 */
		select(valueProp: string, nameProp: string): any;
	}

	interface Buttons {
		/** Select all rows in the table */
		selectAll: {
			extend: 'selectAll';
			selectorModifier?: ApiSelectorModifier;
		}

		/** Change selection type to cells. Shows as active when cell selection is enabled */
		selectCells: {
			extend: 'selectCells';
		}

		/** Change selection type to columns. Shows as active when cell selection is enabled */
		selectColumns: {
			extend: 'selectColumns';
		}

		/** Button which is enabled only when one or more rows are selected. Provide your own action function. */
		selected: {
			extend: 'selected';
			limitTo?: string[];
		}

		/** Button which is enabled only when a single row is selected. Provide your own action function. */
		selectedSingle: {
			extend: 'selected';
		}

		/** Deselect all currently selected rows. */
		selectNone: {
			extend: 'selectNone';
		}

		/** Change selection type to rows. Shows as active when cell selection is enabled */
		selectRows: {
			extend: 'selectRows';
		}

		/**
		 * Toggle a filter that will reduce the rows displayed to just those which are selected. Uses
		 * its own action function - don't provide your own.
		 */
		showSelected: {
			extend: 'showSelected';
		}
	}

	interface Context {
		_select_lastCell: CellIdx;
		_select: {
			blurable?: boolean;
			className?: string;
			info?: boolean;
			infoEls: HTMLElement[];
			items?: string;
			keys?: boolean;
			keysWrap?: boolean;
			selector?: string;
			selectable?: Selectable;
			style?: string;
			toggleable?: boolean;
		}
		_select_mode: 'additive' | 'subtractive';
		_select_set: string[];
		_select_init: boolean;
	}

	interface RowContext {
		_select_selected: boolean;
		_selected_cells: boolean[];
	}

	interface ColumnContext {
		_select_selected: boolean;
	}
}

interface ConfigSelect {
	/**
	 * Indicate if the selected items will be removed when clicking outside of the table
	 */
	blurable?: boolean;

	/**
	 * Set the class name that will be applied to selected items
	 */
	className?: string;

	/** Control automatic addition of header checkbox */
	headerCheckbox?: HeaderCheckbox;

	/**
	 * Enable / disable the display for item selection information in the table summary
	 */
	info?: boolean;

	/**
	 * Set which table items to select (rows, columns or cells)
	 */
	items?: string;

	/** Set keyboard accessability (tab and arrow keys) */
	keys?: boolean;

	/** Allow keyboard navigation to wrap */
	keysWrap?: boolean;

	/** Set a function that will determine if a row should be selectable. */
	selectable?: (data: any, tr: HTMLTableRowElement | null, index: number) => boolean;

	/**
	 * Set the element selector used for mouse event capture to select items
	 */
	selector?: string;

	/**
	 * Set the selection style for end user interaction with the table
	 */
	style?: StyleType;

	/** Disable the deselection of selected rows when clicked */
	toggleable?: boolean;
}

interface ConfigSelectLanguage {
	/** AIRA strings */
	aria?: {
		/** Text to use as the aria-label for the header checkbox */
		headerCheckbox?: string;

		/** Text to use as the aria-label for the row selection checkboxes */
		rowCheckbox?: string;
	};

	/** Table information summary string for the number of cells selected */
	cells?: string | IPlural;

	/** Table information summary string for the number of columns selected */
	columns?: string | IPlural;

	/** Table information summary string for the number of rows selected */
	rows?: string | IPlural;
}

interface ApiSelect<Api> {
	/**
	 * Initialise Select for a DataTable after the DataTable has been constructed.
	 * 
	 * @returns DataTables Api instance
	 */
	(): Api;

	/**
	 * Get the blurable state for the table.
	 * 
	 * @returns Current state - true if blurable, false otherwise. Note that if multiple tables are defined in the API's context, only the blurable state of the first table will be returned.
	 */
	blurable(): boolean;

	/**
	 * Set the blurable state for the table's selection options.
	 * 
	 * @param flag Value to set for the blurable option - true to enable, false to disable.
	 * @returns DataTables Api instance for chaining
	 */
	blurable(flag: boolean): Api;

	/**
	 * Get the summary information display state for the table.
	 * 
	 * @returns Current state - true if information summary shown, false otherwise. Note that if multiple tables are defined in the API's context, only the information state of the first table will be returned.
	 */
	info(): boolean;

	/**
	 * Set the information summary display state for the table's selection options.
	 * 
	 * @param flag Value to set for the information summary display state - true to enable, false to disable.
	 * @returns DataTables API instance for chaining.
	 */
	info(flag: boolean): Api;

	/**
	 * Get the items that will be selected by user interaction (i.e. a click on the table).
	 * 
	 * @returns The current item that will be selected when the user interacts with Select's event listeners - this will be the value row, column or cell.
	 */
	items(): string;

	/**
	 * Set the item type that will be selected by user interaction.
	 * 
	 * @param set Items to select - this must be one of row, column or cells.
	 * @returns DataTables API instance for chaining.
	 */
	items(set: string): Api;

	/**
	 * Get Select's keyboard navigation state
	 * 
	 * @returns The keyboard navigation state of Select
	 */
	keys(): boolean;

	/**
	 * Set Select's keyboard navigation state
	 * 
	 * @param set Enable (true) or disable (false) row keyboard navigation
	 * @param wrap Allow wrapping or not (default)
	 * @returns DataTables API instance for chaining.
	 */
	keys(set: boolean, wrap?: boolean): Api;

	/**
	 * Get the function used to determine if a row should be selectable.
	 */
	selectable(): Selectable;

	/**
	 * Set the function used to determine if a row should be selectable.
	 *
	 * @param set Function
	 */
	selectable(set: Selectable): Api;

	/**
	 * Get the current item selector string applied to the table.
	 * 
	 * @returns the item selector string being used for the table.
	 */
	selector(): string;

	/**
	 * Set the table's item selector string. Note that any old selectors will be automatically removed if this is used as a selector to ensure that there are no memory leaks in unattached event listeners.
	 * 
	 * @param set jQuery selector that will select the cells that can trigger item selection.
	 */
	selector(set: string): Api;

	/**
	* Get the current selection style applied to the table
	* 
	* @returns The current selection style, this will be one of "api", "single", "multi" or "os".
	*/
	style(): StyleType;

	/**
	* Set the table's selection style
	* 
	* @param s Selection style to set - this must be one of "api", "single", "multi" or "os".
	* @returns DataTables API instance for chaining.
	*/
	style(s: StyleType): Api;

	/**
	 * Get the toggle state of Select for the given DataTable.
	 * 
	 * @returns true if the item can be deselected when clicked on, false if it cannot be.
	 */
	toggleable(): boolean;

	/**
	 * Set the toggle state of Select for the DataTable.
	 * 
	 * @param set true to allow item deselection, false to disallow.
	 * @returns DataTables API instance for chaining.
	 */
	toggleable(set: boolean): Api;
}

interface IPlural {
	/** Default if there is no specific number given. Use %d where you want the number to show */
	_: string;

	/** Specific replacement, e.g. for 0 or 1 commonly. */
	[num: number]: string;
}
