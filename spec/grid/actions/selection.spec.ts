/**
 * Grid Selection spec document
 */
import { Browser, EmitType } from '@syncfusion/ej2-base';
import { createElement, remove } from '@syncfusion/ej2-base/dom';
import { Grid } from '../../../src/grid/base/grid';
import { Selection } from '../../../src/grid/actions/selection';
import { Page } from '../../../src/grid/actions/page';
import { data } from '../base/datasource.spec';
import { Group } from '../../../src/grid/actions/group';
import { Sort } from '../../../src/grid/actions/sort';
import '../../../node_modules/es6-promise/dist/es6-promise';

Grid.Inject(Selection, Page, Sort, Group);

describe('Selection Shortcuts testing', () => {
    let gridObj: Grid;
    let preventDefault: Function = new Function();
    let elem: HTMLElement = createElement('div', { id: 'Grid' });
    let selectionModule: Selection;
    let rows: Element[];
    beforeAll((done: Function) => {
        let dataBound: EmitType<Object> = () => { done(); };
        document.body.appendChild(elem);
        gridObj = new Grid(
            {
                dataSource: data, dataBound: dataBound,
                columns: [{ field: 'OrderID' }, { field: 'CustomerID' }, { field: 'EmployeeID' }, { field: 'Freight' },
                { field: 'ShipCity' }],
                allowPaging: true,
                pageSettings: { pageSize: 8, pageCount: 4, currentPage: 1 },
                allowSelection: true,
                selectionSettings: { type: 'multiple', mode: 'both' },
            });
        gridObj.appendTo('#Grid');
    });

    it('shiftDown intial cell, row shortcut testing', () => {
        let args: any = { action: 'shiftDown', preventDefault: preventDefault };
        let len: number = 5;
        gridObj.element.focus();
        selectionModule = gridObj.selectionModule;
        rows = gridObj.getRows();
        gridObj.keyBoardModule.keyAction(args);
        for (let i: number = 0; i <= 1; i++) {
            if (i === 1) {
                len = 1;
            }
            for (let j: number = 0; j < len; j++) {
                expect(rows[i].querySelectorAll('.e-rowcell')[j].classList.contains('e-cellselectionbackground')).toEqual(true);
            }
        }
        expect(rows[0].firstElementChild.classList.contains('e-selectionbackground')).toEqual(true);
        gridObj.clearSelection();
    });

    it('downarrow shortcut testing', () => {
        let args: any = { action: 'downArrow', preventDefault: preventDefault };
        (gridObj.getRows()[1].querySelector('.e-rowcell') as HTMLElement).click();
        gridObj.keyBoardModule.keyAction(args);
        expect(gridObj.element.querySelectorAll('[aria-selected="true"]')[0].getAttribute('aria-rowindex')).toEqual('2');
        expect(rows[2].firstElementChild.classList.contains('e-selectionbackground')).toEqual(true);
        expect(gridObj.getSelectedRecords().length).toEqual(1);
        expect(gridObj.getSelectedRowIndexes().length).toEqual(1);
        expect(rows[2].firstElementChild.classList.contains('e-cellselectionbackground')).toEqual(true);
        expect(gridObj.getSelectedRowCellIndexes().length).toEqual(1);
    });

    it('upArrow shortcut testing', () => {
        let args: any = { action: 'upArrow', preventDefault: preventDefault };
        gridObj.keyBoardModule.keyAction(args);
        expect(gridObj.element.querySelectorAll('[aria-selected="true"]')[0].getAttribute('aria-rowindex')).toEqual('1');
        expect(rows[1].firstElementChild.classList.contains('e-selectionbackground')).toEqual(true);
        expect(selectionModule.selectedRecords.length).toEqual(1);
        expect(selectionModule.selectedRowIndexes.length).toEqual(1);
        expect(rows[1].firstElementChild.classList.contains('e-cellselectionbackground')).toEqual(true);
        expect(selectionModule.selectedRowCellIndexes.length).toEqual(1);
    });

    it('rightArrow shortcut testing', () => {
        let args: any = { action: 'rightArrow', preventDefault: preventDefault };
        gridObj.keyBoardModule.keyAction(args);
        expect(rows[1].firstElementChild.classList.contains('e-selectionbackground')).toEqual(true);
        expect((rows[1].querySelector('.e-cellselectionbackground') as HTMLTableCellElement).cellIndex).toEqual(1);
    });

    it('rightArrow shortcut next row testing', () => {
        let args: any = { action: 'rightArrow', preventDefault: preventDefault };
        selectionModule.selectCell({ rowIndex: 0, cellIndex: 4 });
        gridObj.keyBoardModule.keyAction(args);
        expect(rows[1].firstElementChild.classList.contains('e-selectionbackground')).toEqual(true);
        expect((rows[1].querySelector('.e-cellselectionbackground') as HTMLTableCellElement).cellIndex).toEqual(0);
    });

    it('leftarrow shortcut prev row testing', () => {
        let args: any = { action: 'leftArrow', preventDefault: preventDefault };
        gridObj.keyBoardModule.keyAction(args);
        expect((rows[0].querySelector('.e-cellselectionbackground') as HTMLTableCellElement).cellIndex).toEqual(4);
    });

    it('leftarrow shortcut testing', () => {
        let args: any = { action: 'leftArrow', preventDefault: preventDefault };
        gridObj.keyBoardModule.keyAction(args);
        expect(rows[1].firstElementChild.classList.contains('e-selectionbackground')).toEqual(true);
        expect((rows[0].querySelector('.e-cellselectionbackground') as HTMLTableCellElement).cellIndex).toEqual(3);
    });

    it('home shortcut testing', () => {
        let args: any = { action: 'home', preventDefault: preventDefault };
        gridObj.keyBoardModule.keyAction(args);
        expect(gridObj.element.querySelectorAll('[aria-selected="true"]')[0].getAttribute('aria-rowindex')).toEqual('1');
        expect(rows[1].firstElementChild.classList.contains('e-selectionbackground')).toEqual(true);
        expect((rows[0].querySelector('.e-cellselectionbackground') as HTMLTableCellElement).cellIndex).toEqual(0);
    });

    it('end shortcut testing', () => {
        let args: any = { action: 'end', preventDefault: preventDefault };
        gridObj.keyBoardModule.keyAction(args);
        expect(gridObj.element.querySelectorAll('[aria-selected="true"]')[0].getAttribute('aria-rowindex')).toEqual('1');
        expect(rows[1].firstElementChild.classList.contains('e-selectionbackground')).toEqual(true);
        expect((rows[7].querySelector('.e-cellselectionbackground') as HTMLTableCellElement).cellIndex).toEqual(4);
    });

    it('ctrlHome shortcut testing', () => {
        let args: any = { action: 'ctrlHome', preventDefault: preventDefault };
        gridObj.keyBoardModule.keyAction(args);
        expect(gridObj.element.querySelectorAll('[aria-selected="true"]')[0].getAttribute('aria-rowindex')).toEqual('0');
        expect(rows[0].firstElementChild.classList.contains('e-selectionbackground')).toEqual(true);
        expect((rows[0].querySelector('.e-cellselectionbackground') as HTMLTableCellElement).cellIndex).toEqual(0);
    });

    it('ctrlEnd shortcut testing', () => {
        let args: any = { action: 'ctrlEnd', preventDefault: preventDefault };
        gridObj.keyBoardModule.keyAction(args);
        expect(gridObj.element.querySelectorAll('[aria-selected="true"]')[0].getAttribute('aria-rowindex')).toEqual('7');
        expect(rows[7].firstElementChild.classList.contains('e-selectionbackground')).toEqual(true);
        expect((rows[7].querySelector('.e-cellselectionbackground') as HTMLTableCellElement).cellIndex).toEqual(4);
    });

    it('shiftUp row shortcut testing', () => {
        let args: any = { action: 'shiftUp', preventDefault: preventDefault };
        gridObj.selectRow(3);
        gridObj.keyBoardModule.keyAction(args);
        expect(gridObj.element.querySelectorAll('[aria-selected="true"]')[0].getAttribute('aria-rowindex')).toEqual('2');
        expect(gridObj.element.querySelectorAll('[aria-selected="true"]')[1].getAttribute('aria-rowindex')).toEqual('3');
        expect(rows[2].firstElementChild.classList.contains('e-selectionbackground')).toEqual(true);
        expect(rows[3].firstElementChild.classList.contains('e-selectionbackground')).toEqual(true);
        expect(rows[7].querySelectorAll('.e-rowcell')[4].classList.contains('e-cellselectionbackground')).toEqual(true);
    });

    it('shiftDown row shortcut testing', () => {
        let args: any = { action: 'shiftDown', preventDefault: preventDefault };
        gridObj.keyBoardModule.keyAction(args);
        gridObj.keyBoardModule.keyAction(args);
        expect(gridObj.element.querySelectorAll('[aria-selected="true"]')[0].getAttribute('aria-rowindex')).toEqual('3');
        expect(gridObj.element.querySelectorAll('[aria-selected="true"]')[1].getAttribute('aria-rowindex')).toEqual('4');
        expect(rows[2].firstElementChild.classList.contains('e-selectionbackground')).toEqual(false);
        expect(rows[3].firstElementChild.classList.contains('e-selectionbackground')).toEqual(true);
        expect(rows[4].firstElementChild.classList.contains('e-selectionbackground')).toEqual(true);
        expect(rows[7].querySelectorAll('.e-rowcell')[4].classList.contains('e-cellselectionbackground')).toEqual(true);
    });

    it('shiftUp row shortcut reverse testing', () => {
        let args: any = { action: 'shiftUp', preventDefault: preventDefault };
        gridObj.keyBoardModule.keyAction(args);
        expect(gridObj.element.querySelectorAll('[aria-selected="true"]')[0].getAttribute('aria-rowindex')).toEqual('3');
        expect(rows[3].firstElementChild.classList.contains('e-selectionbackground')).toEqual(true);
        expect(rows[4].firstElementChild.classList.contains('e-selectionbackground')).toEqual(false);
        expect(rows[7].querySelectorAll('.e-rowcell')[4].classList.contains('e-cellselectionbackground')).toEqual(true);
    });


    it('shiftLeft cell shortcut testing', () => {
        let args: any = { action: 'shiftLeft', preventDefault: preventDefault };
        selectionModule.selectCell({ rowIndex: 1, cellIndex: 1 });
        gridObj.keyBoardModule.keyAction(args);
        expect(rows[1].querySelectorAll('.e-rowcell')[1].classList.contains('e-cellselectionbackground')).toEqual(true);
        expect(rows[1].querySelectorAll('.e-rowcell')[0].classList.contains('e-cellselectionbackground')).toEqual(true);
    });

    it('shiftRight cell shortcut testing', () => {
        let args: any = { action: 'shiftRight', preventDefault: preventDefault };
        gridObj.keyBoardModule.keyAction(args);
        gridObj.keyBoardModule.keyAction(args);
        expect(rows[1].querySelectorAll('.e-rowcell')[1].classList.contains('e-cellselectionbackground')).toEqual(true);
        expect(rows[1].querySelectorAll('.e-rowcell')[2].classList.contains('e-cellselectionbackground')).toEqual(true);
        expect(rows[1].querySelectorAll('.e-rowcell')[0].classList.contains('e-cellselectionbackground')).toEqual(false);
    });


    it('shiftUp cell shortcut testing', () => {
        let args: any = { action: 'shiftUp', preventDefault: preventDefault };
        let st: number = 2;
        let len: number = 2;
        gridObj.keyBoardModule.keyAction(args);
        for (let i: number = 0; i <= 1; i++) {
            if (i === 1) {
                st = 0;
                len = 1;
            }
            for (let j: number = st; j < len; j++) {
                expect(rows[i].querySelectorAll('.e-rowcell')[j].classList.contains('e-cellselectionbackground')).toEqual(true);
            }
        }
    });

    it('shiftDown cell shortcut testing', () => {
        let args: any = { action: 'shiftDown', preventDefault: preventDefault };
        let st: number = 1;
        let len: number = 3;
        gridObj.keyBoardModule.keyAction(args);
        gridObj.keyBoardModule.keyAction(args);
        for (let i: number = 1; i <= 2; i++) {
            if (i === 2) {
                st = 0;
                len = 2;
            }
            for (let j: number = st; j < len; j++) {
                expect(rows[i].querySelectorAll('.e-rowcell')[j].classList.contains('e-cellselectionbackground')).toEqual(true);
            }
        }
    });

    it('escape shortcut testing', () => {
        let args: any = { action: 'escape', preventDefault: preventDefault };
        gridObj.selectRows([0, 1, 2]);
        gridObj.keyBoardModule.keyAction(args);
        expect(gridObj.getSelectedRecords().length).toEqual(0);
        expect(gridObj.getSelectedRowIndexes().length).toEqual(0);
    });

    it('ctrl + A shortcut testing', () => {
        let args: any = { action: 'ctrlPlusA', preventDefault: preventDefault };
        gridObj.keyBoardModule.keyAction(args);
        expect(gridObj.element.querySelectorAll('.e-cellselectionbackground').length).toEqual(gridObj.element.querySelectorAll('.e-rowcell').length);
        expect(gridObj.element.querySelectorAll('.e-selectionbackground').length).toEqual(gridObj.element.querySelectorAll('.e-rowcell').length);
        //for coverage
        gridObj.selectionSettings.mode = 'cell';
        gridObj.dataBind();
        (<any>gridObj.selectionModule).applyShiftLeftRightKey(1, false);
        gridObj.keyBoardModule.keyAction(args);
        gridObj.selectionSettings.mode = 'row';
        gridObj.dataBind();
        gridObj.keyBoardModule.keyAction(args);
        (<any>gridObj.selectionModule).applyShiftLeftRightKey(1, false);
        gridObj.selectionSettings.mode = 'both';
        gridObj.dataBind();
    });

    afterAll(() => {
        remove(elem);
    });
});


describe('Grid Selection module', () => {
    describe('grid single seletion functionalities', () => {
        let gridObj: Grid;
        let elem: HTMLElement = createElement('div', { id: 'Grid' });
        let selectionModule: Selection;
        let rows: Element[];
        beforeAll((done: Function) => {
            let dataBound: EmitType<Object> = () => { done(); };
            document.body.appendChild(elem);
            gridObj = new Grid(
                {
                    dataSource: data, dataBound: dataBound,
                    columns: [
                        { headerText: 'OrderID', field: 'OrderID' },
                        { headerText: 'CustomerID', field: 'CustomerID' },
                        { headerText: 'EmployeeID', field: 'EmployeeID' },
                        { headerText: 'ShipCountry', field: 'ShipCountry' },
                        { headerText: 'ShipCity', field: 'ShipCity' },
                    ],
                    allowSelection: true,
                    selectionSettings: { type: 'single', mode: 'both' },
                });
            gridObj.appendTo('#Grid');
        });

        it('single row - selectRow testing', () => {
            selectionModule = gridObj.selectionModule;
            rows = gridObj.getRows();
            selectionModule.selectRow(0);
            expect(rows[0].hasAttribute('aria-selected')).toEqual(true);
            expect(rows[0].firstElementChild.classList.contains('e-selectionbackground')).toEqual(true);
            expect(gridObj.element.querySelectorAll('.e-selectionbackground').length).toEqual(5);
            expect(selectionModule.selectedRecords.length).toEqual(1);
            expect(selectionModule.selectedRowIndexes.length).toEqual(1);
        });

        it('single row testing', () => {
            selectionModule.selectRow(2);
            expect(rows[2].hasAttribute('aria-selected')).toEqual(true);
            expect(rows[2].firstElementChild.classList.contains('e-selectionbackground')).toEqual(true);
            expect(selectionModule.selectedRecords.length).toEqual(1);
            expect(selectionModule.selectedRowIndexes.length).toEqual(1);
            expect(rows[1].hasAttribute('aria-selected')).toEqual(false);
            expect(rows[1].firstElementChild.classList.contains('e-selectionbackground')).toEqual(false);
        });

        it('single row - selectRowsByRange  testing', () => {
            selectionModule.clearRowSelection();
            selectionModule.selectRowsByRange(3, 4);
            expect(rows[3].hasAttribute('aria-selected')).toEqual(false);
            expect(rows[3].firstElementChild.classList.contains('e-selectionbackground')).toEqual(false);
            expect(selectionModule.selectedRecords.length).toEqual(0);
            expect(selectionModule.selectedRowIndexes.length).toEqual(0);
        });

        it('single row - selectRows  testing', () => {
            selectionModule.clearRowSelection();
            gridObj.selectRows([1, 2]);
            expect(rows[1].hasAttribute('aria-selected')).toEqual(false);
            expect(rows[1].firstElementChild.classList.contains('e-selectionbackground')).toEqual(false);
            expect(selectionModule.selectedRecords.length).toEqual(0);
            expect(selectionModule.selectedRowIndexes.length).toEqual(0);
        });

        it('single row - addRowsToSelection  testing', () => {
            selectionModule.clearRowSelection();
            selectionModule.addRowsToSelection([2]);
            expect(rows[1].hasAttribute('aria-selected')).toEqual(false);
            expect(rows[1].firstElementChild.classList.contains('e-selectionbackground')).toEqual(false);
            expect(selectionModule.selectedRecords.length).toEqual(0);
            expect(selectionModule.selectedRowIndexes.length).toEqual(0);
        });

        it('clear row selection testing', () => {
            selectionModule.selectRow(1);
            selectionModule.clearRowSelection();
            expect(gridObj.element.querySelectorAll('.e-selectionbackground').length).toEqual(0);
            expect(selectionModule.selectedRecords.length).toEqual(0);
            expect(selectionModule.selectedRowIndexes.length).toEqual(0);
            expect(selectionModule.selectedRowIndexes.length).toEqual(0);
            expect(selectionModule.selectedRowCellIndexes.length).toEqual(0);
        });

        it('single cell - selectCell testing', () => {
            gridObj.selectCell({ rowIndex: 0, cellIndex: 0 });
            expect((rows[0].querySelector('.e-cellselectionbackground') as HTMLTableCellElement).cellIndex).toEqual(0);
            expect(selectionModule.selectedRowCellIndexes.length).toEqual(1);
        });

        it('single cell testing', () => {
            selectionModule.selectCell({ rowIndex: 1, cellIndex: 1 });
            expect((rows[1].querySelector('.e-cellselectionbackground') as HTMLTableCellElement).cellIndex).toEqual(1);
            expect(selectionModule.selectedRowCellIndexes.length).toEqual(1);
            expect(rows[0].querySelectorAll('.e-cellselectionbackground').length).toEqual(0);
        });

        it('single cell - selectCellsByRange testing', () => {
            selectionModule.clearCellSelection();
            selectionModule.selectCellsByRange({ rowIndex: 0, cellIndex: 0 }, { rowIndex: 1, cellIndex: 1 });
            expect(gridObj.element.querySelectorAll('.e-cellselectionbackground').length).toEqual(0);
            expect(selectionModule.selectedRowCellIndexes.length).toEqual(0);
        });

        it('single cell - selectCellsByRange box mode testing', () => {
            selectionModule.clearCellSelection();
            gridObj.selectionSettings.cellSelectionMode = 'box';
            gridObj.dataBind();
            selectionModule.selectCellsByRange({ rowIndex: 1, cellIndex: 1 }, { rowIndex: 2, cellIndex: 2 });
            expect(gridObj.element.querySelectorAll('.e-cellselectionbackground').length).toEqual(0);
            expect(selectionModule.selectedRowCellIndexes.length).toEqual(0);
        });

        it('single cell - selectCells testing', () => {
            selectionModule.clearCellSelection();
            selectionModule.selectCells([{ rowIndex: 0, cellIndexes: [0] }, { rowIndex: 1, cellIndexes: [1] }]);
            expect(gridObj.element.querySelectorAll('.e-cellselectionbackground').length).toEqual(0);
            expect(selectionModule.selectedRowCellIndexes.length).toEqual(0);
        });

        it('single cell - addCellsToSelection testing', () => {
            selectionModule.clearCellSelection();
            selectionModule.addCellsToSelection([{ rowIndex: 0, cellIndex: 0 }]);
            expect(gridObj.element.querySelectorAll('.e-cellselectionbackground').length).toEqual(0);
            expect(selectionModule.selectedRowCellIndexes.length).toEqual(0);
        });

        it('clear cell selection testing', () => {
            selectionModule.selectCell({ rowIndex: 1, cellIndex: 1 });
            selectionModule.clearCellSelection();
            expect(gridObj.element.querySelectorAll('.e-cellselectionbackground').length).toEqual(0);
            expect(selectionModule.selectedRecords.length).toEqual(0);
            expect(selectionModule.selectedRowIndexes.length).toEqual(0);
            expect(selectionModule.selectedRowCellIndexes.length).toEqual(0);
        });

        afterAll(() => {
            remove(elem);
        });
    });
});


describe('Grid Selection module', () => {
    describe('grid row multiple seletion functionalities', () => {
        let gridObj: Grid;
        let elem: HTMLElement = createElement('div', { id: 'Grid' });
        let selectionModule: Selection;
        let rows: Element[];
        let shiftEvt: MouseEvent = document.createEvent('MouseEvent');
        shiftEvt.initMouseEvent(
            'click',
            true /* bubble */, true /* cancelable */,
            window, null,
            0, 0, 0, 0, /* coordinates */
            false, false, true, false, /* modifier keys */
            0 /*left*/, null
        );
        let ctrlEvt: MouseEvent = document.createEvent('MouseEvent');
        ctrlEvt.initMouseEvent(
            'click',
            true /* bubble */, true /* cancelable */,
            window, null,
            0, 0, 0, 0, /* coordinates */
            true, false, false, false, /* modifier keys */
            0 /*left*/, null
        );
        let rowSelecting: (e?: Object) => void;
        let rowSelected: (e?: Object) => void;
        beforeAll((done: Function) => {
            let dataBound: EmitType<Object> = () => { done(); };
            document.body.appendChild(elem);
            gridObj = new Grid(
                {
                    dataSource: data, dataBound: dataBound,
                    columns: [
                        { headerText: 'OrderID', field: 'OrderID' },
                        { headerText: 'CustomerID', field: 'CustomerID' },
                        { headerText: 'EmployeeID', field: 'EmployeeID' },
                        { headerText: 'ShipCountry', field: 'ShipCountry' },
                        { headerText: 'ShipCity', field: 'ShipCity' },
                    ],
                    allowSelection: true,
                    selectionSettings: { type: 'multiple', mode: 'row' },
                    rowSelecting: rowSelecting,
                    rowSelected: rowSelected,
                });
            gridObj.appendTo('#Grid');
        });

        it('multi row - selectRow testing', () => {
            selectionModule = gridObj.selectionModule;
            rows = gridObj.getRows();
            selectionModule.selectRowsByRange(0, 1);
            expect(rows[0].hasAttribute('aria-selected')).toEqual(true);
            expect(rows[1].hasAttribute('aria-selected')).toEqual(true);
            expect(rows[0].firstElementChild.classList.contains('e-selectionbackground')).toEqual(true);
            expect(rows[1].firstElementChild.classList.contains('e-selectionbackground')).toEqual(true);
            expect(selectionModule.selectedRecords.length).toEqual(2);
            expect(selectionModule.selectedRowIndexes.length).toEqual(2);
        });

        it('single row testing', () => {
            selectionModule.selectRow(2);
            expect(rows[2].hasAttribute('aria-selected')).toEqual(true);
            expect(rows[2].firstElementChild.classList.contains('e-selectionbackground')).toEqual(true);
            expect(selectionModule.selectedRecords.length).toEqual(1);
            expect(selectionModule.selectedRowIndexes.length).toEqual(1);
            expect(rows[1].hasAttribute('aria-selected')).toEqual(false);
            expect(rows[1].firstElementChild.classList.contains('e-selectionbackground')).toEqual(false);
        });

        it('multi row - addRowsToSelection  testing', () => {
            selectionModule.addRowsToSelection([4]);
            expect(rows[4].hasAttribute('aria-selected')).toEqual(true);
            expect(rows[4].firstElementChild.classList.contains('e-selectionbackground')).toEqual(true);
            expect(rows[2].hasAttribute('aria-selected')).toEqual(true);
            expect(rows[2].firstElementChild.classList.contains('e-selectionbackground')).toEqual(true);
            expect(selectionModule.selectedRecords.length).toEqual(2);
            expect(selectionModule.selectedRowIndexes.length).toEqual(2);
        });

        it('multi row - ctrl click testing', () => {
            rows[0].firstChild.dispatchEvent(ctrlEvt);
            expect(rows[4].hasAttribute('aria-selected')).toEqual(true);
            expect(rows[4].firstElementChild.classList.contains('e-selectionbackground')).toEqual(true);
            expect(rows[2].hasAttribute('aria-selected')).toEqual(true);
            expect(rows[2].firstElementChild.classList.contains('e-selectionbackground')).toEqual(true);
            expect(rows[0].hasAttribute('aria-selected')).toEqual(true);
            expect(rows[0].firstElementChild.classList.contains('e-selectionbackground')).toEqual(true);
            expect(selectionModule.selectedRecords.length).toEqual(3);
            expect(selectionModule.selectedRowIndexes.length).toEqual(3);
        });

        it('multi row toogle - ctrl click testing', () => {
            rows[4].firstChild.dispatchEvent(ctrlEvt);
            expect(rows[4].hasAttribute('aria-selected')).toEqual(false);
            expect(rows[4].firstElementChild.classList.contains('e-selectionbackground')).toEqual(false);
            expect(selectionModule.selectedRecords.length).toEqual(2);
            expect(selectionModule.selectedRowIndexes.length).toEqual(2);
        });

        it('clear row selection testing', () => {
            selectionModule.clearRowSelection();
            expect(gridObj.element.querySelectorAll('.e-selectionbackground').length).toEqual(0);
            expect(selectionModule.selectedRecords.length).toEqual(0);
            expect(selectionModule.selectedRowIndexes.length).toEqual(0);
            expect(selectionModule.selectedRowCellIndexes.length).toEqual(0);
        });

        it('multi row - shift click  testing', () => {
            (rows[4].firstChild as HTMLElement).click();
            rows[3].firstChild.dispatchEvent(shiftEvt);
            expect(rows[3].hasAttribute('aria-selected')).toEqual(true);
            expect(rows[4].hasAttribute('aria-selected')).toEqual(true);
            expect(rows[3].firstElementChild.classList.contains('e-selectionbackground')).toEqual(true);
            expect(rows[4].firstElementChild.classList.contains('e-selectionbackground')).toEqual(true);
            expect(rows[4].firstElementChild.classList.contains('e-selectionbackground')).toEqual(true);
            expect(selectionModule.selectedRecords.length).toEqual(2);
            expect(selectionModule.selectedRowIndexes.length).toEqual(2);
        });

        it('multi row - shift click testing', () => {
            rows[5].firstChild.dispatchEvent(shiftEvt);
            expect(rows[4].hasAttribute('aria-selected')).toEqual(true);
            expect(rows[5].hasAttribute('aria-selected')).toEqual(true);
            expect(rows[4].firstElementChild.classList.contains('e-selectionbackground')).toEqual(true);
            expect(rows[5].firstElementChild.classList.contains('e-cellselectionbackground')).toEqual(false);
            expect(selectionModule.selectedRecords.length).toEqual(2);
            expect(selectionModule.selectedRowIndexes.length).toEqual(2);
        });

        it('multi row - shift click  testing', () => {
            rows[2].firstChild.dispatchEvent(shiftEvt);
            expect(rows[2].hasAttribute('aria-selected')).toEqual(true);
            expect(rows[3].hasAttribute('aria-selected')).toEqual(true);
            expect(rows[4].hasAttribute('aria-selected')).toEqual(true);
            expect(rows[2].firstElementChild.classList.contains('e-selectionbackground')).toEqual(true);
            expect(rows[3].firstElementChild.classList.contains('e-selectionbackground')).toEqual(true);
            expect(rows[4].firstElementChild.classList.contains('e-selectionbackground')).toEqual(true);
            expect(selectionModule.selectedRecords.length).toEqual(3);
            expect(selectionModule.selectedRowIndexes.length).toEqual(3);
        });

        it('rowSelecting event call', () => {
            let spyFn: (e?: Object) => void = jasmine.createSpy('begin');
            gridObj.rowSelecting = spyFn;
            selectionModule.selectRow(2);
            expect(spyFn).toHaveBeenCalled();
        });

        it('rowSelected event call', () => {
            let spyFn: (e?: Object) => void = jasmine.createSpy('begin');
            gridObj.rowSelected = spyFn;
            selectionModule.selectRow(3);
            expect(spyFn).toHaveBeenCalled();
        });

        it('multi cell - selectRows testing', () => {
            selectionModule.clearRowSelection();
            selectionModule.selectRows([0, 2])
            expect(rows[0].firstElementChild.classList.contains('e-selectionbackground')).toEqual(true);
            expect(rows[2].firstElementChild.classList.contains('e-selectionbackground')).toEqual(true);
            expect(selectionModule.selectedRowIndexes.length).toEqual(2);
        });

        afterAll(() => {
            remove(elem);
        });
    });
});

describe('Grid Selection module', () => {
    describe('grid cell multiple seletion functionalities', () => {
        let gridObj: Grid;
        let elem: HTMLElement = createElement('div', { id: 'Grid' });
        let selectionModule: Selection;
        let rows: Element[];
        let cells: NodeListOf<Element>;
        let shiftEvt: MouseEvent = document.createEvent('MouseEvent');
        shiftEvt.initMouseEvent(
            'click',
            true /* bubble */, true /* cancelable */,
            window, null,
            0, 0, 0, 0, /* coordinates */
            false, false, true, false, /* modifier keys */
            0 /*left*/, null
        );
        let ctrlEvt: MouseEvent = document.createEvent('MouseEvent');
        ctrlEvt.initMouseEvent(
            'click',
            true /* bubble */, true /* cancelable */,
            window, null,
            0, 0, 0, 0, /* coordinates */
            true, false, false, false, /* modifier keys */
            0 /*left*/, null
        );
        let cellSelecting: (e?: Object) => void;
        let cellSelected: (e?: Object) => void;
        beforeAll((done: Function) => {
            let dataBound: EmitType<Object> = () => { done(); };
            document.body.appendChild(elem);
            gridObj = new Grid(
                {
                    dataSource: data, dataBound: dataBound,
                    columns: [
                        { headerText: 'OrderID', field: 'OrderID' },
                        { headerText: 'CustomerID', field: 'CustomerID' },
                        { headerText: 'EmployeeID', field: 'EmployeeID' },
                        { headerText: 'ShipCountry', field: 'ShipCountry' },
                        { headerText: 'ShipCity', field: 'ShipCity' },
                    ],
                    allowSelection: true,
                    selectionSettings: { type: 'multiple', mode: 'cell' },
                    cellSelecting: cellSelecting,
                    cellSelected: cellSelected,
                });
            gridObj.appendTo('#Grid');
        });

        it('multi cell - selectCellsByRange testing', () => {
            selectionModule = gridObj.selectionModule;
            rows = gridObj.getRows();
            selectionModule.selectCellsByRange({ rowIndex: 0, cellIndex: 0 }, { rowIndex: 1, cellIndex: 1 });
            let len = gridObj.getColumns().length;
            for (let i: number = 0; i <= 1; i++) {
                cells = rows[i].querySelectorAll('.e-rowcell');
                if (i === 1) {
                    len = 2;
                }
                for (let j: number = 0; j < len; j++) {
                    expect(cells[j].classList.contains('e-cellselectionbackground')).toEqual(true);
                }
            }
            expect(selectionModule.selectedRowCellIndexes.length).toEqual(2);
            expect(rows[0].querySelectorAll('.e-rowcell')[0].classList.contains('e-cellselectionbackground')).toEqual(true);
            expect(rows[0].querySelectorAll('.e-rowcell')[1].classList.contains('e-cellselectionbackground')).toEqual(true);
        });

        it('multi cell - selectCellsByRange box mode testing', () => {
            gridObj.selectionSettings.cellSelectionMode = 'box';
            gridObj.dataBind();
            selectionModule = gridObj.selectionModule;
            rows = gridObj.getRows();
            selectionModule.selectCellsByRange({ rowIndex: 0, cellIndex: 2 }, { rowIndex: 1, cellIndex: 3 });
            for (let i: number = 0; i <= 1; i++) {
                cells = rows[i].querySelectorAll('.e-rowcell');
                for (let j: number = 2; j < 4; j++) {
                    expect(cells[j].classList.contains('e-cellselectionbackground')).toEqual(true);
                }
            }
            expect(selectionModule.selectedRowCellIndexes.length).toEqual(2);
            expect(rows[0].querySelectorAll('.e-rowcell')[0].classList.contains('e-cellselectionbackground')).toEqual(false);
            expect(rows[0].querySelectorAll('.e-rowcell')[4].classList.contains('e-cellselectionbackground')).toEqual(false);
            gridObj.selectionSettings.cellSelectionMode = 'flow';
            gridObj.dataBind();
        });

        it('single cell testing', () => {
            selectionModule.selectCell({ rowIndex: 2, cellIndex: 2 });
            expect(rows[2].querySelectorAll('.e-rowcell')[2].classList.contains('e-cellselectionbackground')).toEqual(true);
            expect(selectionModule.selectedRowCellIndexes.length).toEqual(1);
            expect(rows[0].querySelectorAll('.e-rowcell')[0].classList.contains('e-cellselectionbackground')).toEqual(false);
        });

        it('multi cell - addCellsToSelection  testing', () => {
            selectionModule.addCellsToSelection([{ rowIndex: 1, cellIndex: 1 }]);
            expect(rows[2].querySelectorAll('.e-rowcell')[2].classList.contains('e-cellselectionbackground')).toEqual(true);
            expect(rows[1].querySelectorAll('.e-rowcell')[1].classList.contains('e-cellselectionbackground')).toEqual(true);
            expect(selectionModule.selectedRowCellIndexes.length).toEqual(2);
        });

        it('multi cell - addRowsToSelection click testing', () => {
            rows[0].firstChild.dispatchEvent(ctrlEvt);
            expect(rows[2].querySelectorAll('.e-rowcell')[2].classList.contains('e-cellselectionbackground')).toEqual(true);
            expect(rows[1].querySelectorAll('.e-rowcell')[1].classList.contains('e-cellselectionbackground')).toEqual(true);
            expect(rows[0].querySelectorAll('.e-rowcell')[0].classList.contains('e-cellselectionbackground')).toEqual(true);
            expect(selectionModule.selectedRowCellIndexes.length).toEqual(3);
        });

        it('multi cell toogle - addRowsToSelection click testing', () => {
            rows[0].firstChild.dispatchEvent(ctrlEvt);
            expect(rows[0].querySelectorAll('.e-rowcell')[0].classList.contains('e-cellselectionbackground')).toEqual(false);
        });

        it('selection on same row - addRowsToSelection click testing', () => {
            rows[0].querySelectorAll('.e-rowcell')[1].dispatchEvent(ctrlEvt);
            expect(rows[0].querySelectorAll('.e-rowcell')[1].classList.contains('e-cellselectionbackground')).toEqual(true);
        });

        it('clear cell selection testing', () => {
            selectionModule.clearCellSelection();
            expect(selectionModule.selectedRowIndexes.length).toEqual(0);
            expect(selectionModule.selectedRowCellIndexes.length).toEqual(0);
        });

        it('multi cell - shift click  testing', () => {
            (rows[1].querySelectorAll('.e-rowcell')[1] as HTMLElement).click();
            rows[2].querySelectorAll('.e-rowcell')[2].dispatchEvent(shiftEvt);
            let cellIndex: number = 1;
            let len: number = 5;
            for (let i: number = 1; i <= 2; i++) {
                cells = rows[i].querySelectorAll('.e-rowcell');
                if (i === 1) {
                    cellIndex = 2;
                    len = 3;
                }
                for (let j: number = cellIndex; j < len; j++) {
                    expect(cells[j].classList.contains('e-cellselectionbackground')).toEqual(true);
                }
            }
            expect(rows[1].firstElementChild.classList.contains('e-selectionbackground')).toEqual(false);
            expect(selectionModule.selectedRowCellIndexes.length).toEqual(2);
        });

        it('multi cell - shift click testing', () => {
            rows[0].querySelectorAll('.e-rowcell')[0].dispatchEvent(shiftEvt);
            let len: number = gridObj.getColumns().length;
            for (let i: number = 0; i <= 1; i++) {
                cells = rows[i].querySelectorAll('.e-rowcell');
                if (i === 1) {
                    len = 2;
                }
                for (let j: number = 0; j < len; j++) {
                    expect(cells[j].classList.contains('e-cellselectionbackground')).toEqual(true);
                }
            }
            expect(selectionModule.selectedRowCellIndexes.length).toEqual(2);
        });

        it('multi cell - shift click  testing', () => {
            rows[2].querySelectorAll('.e-rowcell')[2].dispatchEvent(shiftEvt);
            let cellIndex: number = 1;
            let len: number = 5;
            for (let i: number = 1; i <= 2; i++) {
                cells = rows[i].querySelectorAll('.e-rowcell');
                if (i === 1) {
                    cellIndex = 2;
                    len = 3;
                }
                for (let j: number = cellIndex; j < len; j++) {
                    expect(cells[j].classList.contains('e-cellselectionbackground')).toEqual(true);
                }
            }
            expect(selectionModule.selectedRowCellIndexes.length).toEqual(2);
        });

        it('cellSelecting event call', () => {
            let spyFn: (e?: Object) => void = jasmine.createSpy('begin');
            gridObj.cellSelecting = spyFn;
            selectionModule.selectCell({ rowIndex: 0, cellIndex: 0 });
            expect(spyFn).toHaveBeenCalled();
        });

        it('cellSelected event call', () => {
            let spyFn: (e?: Object) => void = jasmine.createSpy('begin');
            gridObj.cellSelected = spyFn;
            selectionModule.selectCell({ rowIndex: 0, cellIndex: 1 });
            expect(spyFn).toHaveBeenCalled();
        });


        it('multi cell - selectCells testing', () => {
            selectionModule.clearCellSelection();
            selectionModule.selectCells([{ rowIndex: 0, cellIndexes: [0] }, { rowIndex: 1, cellIndexes: [1] }, { rowIndex: 2, cellIndexes: [2] }])
            for (let i: number = 0; i <= 2; i++) {
                cells = rows[i].querySelectorAll('.e-rowcell');
                expect(cells[i].classList.contains('e-cellselectionbackground')).toEqual(true);
            }
            expect(selectionModule.selectedRowCellIndexes.length).toEqual(3);
        });

        afterAll(() => {
            remove(elem);
        });

    });
});



describe('Grid Selection module', () => {
    describe('clear selection cases', () => {
        let gridObj: Grid;
        let elem: HTMLElement = createElement('div', { id: 'Grid' });
        let selectionModule: Selection;
        let rows: Element[];
        let cell: HTMLElement;
        beforeAll((done: Function) => {
            let dataBound: EmitType<Object> = () => { done(); };
            document.body.appendChild(elem);
            gridObj = new Grid(
                {
                    dataSource: data, dataBound: dataBound,
                    columns: [
                        { headerText: 'OrderID', field: 'OrderID' },
                        { headerText: 'CustomerID', field: 'CustomerID' },
                        { headerText: 'EmployeeID', field: 'EmployeeID' },
                        { headerText: 'ShipCountry', field: 'ShipCountry' },
                        { headerText: 'ShipCity', field: 'ShipCity' },
                    ],
                    allowSelection: true,
                    selectionSettings: { type: 'multiple', mode: 'both' },
                });
            gridObj.appendTo('#Grid');
        });

        it('select cell and clear row selection testing', () => {
            selectionModule = gridObj.selectionModule;
            rows = gridObj.getRows();
            cell = rows[0].firstChild as HTMLElement;
            selectionModule.selectCell({ rowIndex: 1, cellIndex: 0 });
            expect(rows[1].firstElementChild.classList.contains('e-selectionbackground')).toEqual(false);
            expect(rows[1].firstElementChild.classList.contains('e-cellselectionbackground')).toEqual(true);
            cell.click();
            expect(cell.classList.contains('e-selectionbackground')).toEqual(true);
            expect(cell.classList.contains('e-cellselectionbackground')).toEqual(true);
            expect(rows[1].firstElementChild.classList.contains('e-cellselectionbackground')).toEqual(false);
        });

        it('row and cell toogle testing', () => {
            selectionModule.clearSelection();
            cell.click();
            expect(cell.classList.contains('e-selectionbackground')).toEqual(true);
            expect(cell.classList.contains('e-cellselectionbackground')).toEqual(true);
            cell.click();
            expect(cell.classList.contains('e-selectionbackground')).toEqual(false);
            expect(cell.classList.contains('e-cellselectionbackground')).toEqual(false);
        });

        it('row and cell same row testing', () => {
            selectionModule.clearSelection();
            cell.click();
            expect(cell.classList.contains('e-selectionbackground')).toEqual(true);
            expect(cell.classList.contains('e-cellselectionbackground')).toEqual(true);
            (rows[0].querySelectorAll('.e-rowcell')[1] as HTMLElement).click();
            expect(cell.classList.contains('e-selectionbackground')).toEqual(false);
            expect(cell.classList.contains('e-cellselectionbackground')).toEqual(false);
            expect(rows[0].querySelectorAll('.e-rowcell')[1].classList.contains('e-cellselectionbackground')).toEqual(true);
            (rows[0].querySelectorAll('.e-rowcell')[1] as HTMLElement).click();
            expect(cell.classList.contains('e-selectionbackground')).toEqual(true);
            expect(cell.classList.contains('e-cellselectionbackground')).toEqual(false);
            expect(rows[0].querySelectorAll('.e-rowcell')[1].classList.contains('e-cellselectionbackground')).toEqual(false);
            (rows[0].querySelectorAll('.e-rowcell')[1] as HTMLElement).click();
            expect(cell.classList.contains('e-selectionbackground')).toEqual(false);
            expect(rows[0].querySelectorAll('.e-rowcell')[1].classList.contains('e-cellselectionbackground')).toEqual(true);
        });

        it('allowSelection false testing', () => {
            gridObj.allowSelection = false;
            gridObj.dataBind();
            cell.click();
            expect(cell.classList.contains('e-selectionbackground')).toEqual(false);
            gridObj.selectionSettings.type = 'single'; //for coverage
            gridObj.dataBind();
        });

        it('Row select false testing', () => {
            (gridObj.element.querySelectorAll('.e-row')[0].firstChild as HTMLElement).click();
            expect(gridObj.element.querySelectorAll('.e-row')[0].hasAttribute('aria-selected')).toEqual(false);
        });

        it('keydown selection false testing', () => {
            let preventDefault: Function = new Function();
            let args: any = { action: 'downArrow', preventDefault: preventDefault };
            gridObj.keyBoardModule.keyAction(args);
            expect(gridObj.element.querySelectorAll('.e-row')[0].hasAttribute('aria-selected')).toEqual(false);

            //for coverage
            gridObj.selectionSettings.mode = 'row';
            gridObj.dataBind();
            (<any>gridObj.selectionModule).applyDownUpKey(1, false, false);
            (<any>gridObj.selectionModule).applyRightLeftKey(1, false, false);
            gridObj.selectionModule.shiftUpKey();
            gridObj.selectionModule.shiftDownKey();
            gridObj.selectionSettings.mode = 'cell';
            (<any>gridObj.selectionModule).applyDownUpKey(1, false, false);
            (<any>gridObj.selectionModule).applyCtrlHomeEndKey(1);
            gridObj.selectionModule.shiftUpKey();
            gridObj.dataBind();
            gridObj.selectionModule.shiftDownKey();
            (<any>gridObj.selectionModule).mouseDownHandler({ target: gridObj.element, preventDefault: () => { } });
            gridObj.allowRowDragAndDrop = true;
            gridObj.dataBind();
            (<any>gridObj.selectionModule).mouseDownHandler({ target: gridObj.element, preventDefault: () => { } });
            gridObj.isDestroyed = true;
            (<any>gridObj.selectionModule).addEventListener();
            gridObj.selectionModule.selectCell({ rowIndex: 1, cellIndex: 1 });
            (<any>gridObj.selectionModule).isTrigger = true;
            gridObj.selectionModule.clearCellSelection();
            (<any>gridObj.selectionModule).isTrigger = false;
            gridObj.selectRow(1);
            (<any>gridObj.selectionModule).isRowSelected = true;
            (<any>gridObj.selectionModule).isTrigger = true;
            gridObj.selectionModule.clearRowSelection();
            (<any>gridObj.selectionModule).isTrigger = false;
            (<any>gridObj.selectionModule).prevECIdxs = undefined;
            gridObj.selectionModule.selectCell({ rowIndex: 1, cellIndex: 1 });
            (<any>gridObj.selectionModule).prevECIdxs = undefined;
            gridObj.selectionModule.selectCellsByRange({ rowIndex: 0, cellIndex: 0 }, { rowIndex: 1, cellIndex: 1 });
            (<any>gridObj.selectionModule).prevECIdxs = undefined;
            gridObj.selectionModule.selectCells([{ rowIndex: 0, cellIndexes: [0] }]);
            (<any>gridObj.selectionModule).prevECIdxs = undefined;
            gridObj.selectionModule.addCellsToSelection([{ rowIndex: 0, cellIndex: 0 }]);
            gridObj.selectionSettings.mode = 'row';
            gridObj.dataBind();
            (<any>gridObj.selectionModule).applyHomeEndKey();
            gridObj.allowRowDragAndDrop = true;
            gridObj.dataBind();
            (<any>gridObj.selectionModule).element = createElement('div');
            (<any>gridObj.selectionModule).mouseMoveHandler({ target: gridObj.element, preventDefault: () => { }, clientX: 10, clientY: 10 });
            gridObj.selectionModule.destroy();
        });


        afterAll(() => {
            remove(elem);
        });
    });

    describe('Model changes', () => {
        let gridObj: Grid;
        let elem: HTMLElement = createElement('div', { id: 'Grid' });
        let selectionModule: Selection;
        let rows: Element[];
        let cell: HTMLElement;
        beforeAll((done: Function) => {
            let dataBound: EmitType<Object> = () => { done(); };
            document.body.appendChild(elem);
            gridObj = new Grid(
                {
                    dataSource: data, dataBound: dataBound,
                    columns: [
                        { headerText: 'OrderID', field: 'OrderID' },
                        { headerText: 'CustomerID', field: 'CustomerID' },
                        { headerText: 'EmployeeID', field: 'EmployeeID' },
                        { headerText: 'ShipCountry', field: 'ShipCountry' },
                        { headerText: 'ShipCity', field: 'ShipCity' },
                    ],
                    allowSelection: false,
                    selectionSettings: { type: 'multiple', mode: 'both' },
                });
            gridObj.appendTo('#Grid');
        });

        it('enable selection testing', () => {
            gridObj.allowSelection = true;
            gridObj.dataBind();
            selectionModule = gridObj.selectionModule;
            rows = gridObj.getRows();
            cell = rows[0].firstChild as HTMLElement;
            selectionModule.selectRows([0, 1]);
            expect(cell.classList.contains('e-selectionbackground')).toEqual(true);
        });


        it('selction type change row testing', () => {
            gridObj.selectionSettings.type = 'single';
            gridObj.dataBind();
            expect(cell.classList.contains('e-selectionbackground')).toEqual(false);
            gridObj.selectionSettings.type = 'multiple';
            gridObj.dataBind();
        });

        it('cell selection testing', () => {
            selectionModule.selectCellsByRange({ rowIndex: 0, cellIndex: 0 }, { rowIndex: 1, cellIndex: 0 });
            expect(cell.classList.contains('e-cellselectionbackground')).toEqual(true);
        });

        it('selction type change row testing', () => {
            gridObj.selectionSettings.type = 'single';
            gridObj.dataBind();
            expect(cell.classList.contains('e-cellselectionbackground')).toEqual(false);
        });

        it('selection mode change to row', () => {
            gridObj.selectionSettings.mode = 'row';
            gridObj.dataBind();
            expect(cell.classList.contains('e-cellselectionbackground')).toEqual(false);
        });
        it('select a row with wrong row index', () => {
            gridObj.selectRow(20);
            gridObj.dataBind();
            expect(gridObj.getContent().querySelectorAll('.e-selectionbackground').length).toEqual(0);
        });
        it('selction type change row testing', () => {
            gridObj.selectionSettings.type = 'multiple';
            gridObj.dataBind();
            expect(cell.classList.contains('e-selectionbackground')).toEqual(false);
        });
        it('select multiple row with wrong index', () => {
            gridObj.selectRows([1, 3, 5, 15, 20]);
            gridObj.dataBind();
            expect(gridObj.getContent().querySelectorAll('.e-selectionbackground').length).toEqual(3 * gridObj.columns.length);
        });
        it('change selection mode row to cell', () => {
            gridObj.selectionSettings.mode = 'cell';
            gridObj.dataBind();
            expect(gridObj.getContent().querySelectorAll('.e-selectionbackground').length).toEqual(0);
        })
        it('select a cell with wrong object ', () => {
            gridObj.selectionModule.selectCell({ rowIndex: 0, cellIndex: 12 });
            gridObj.dataBind();
            expect(gridObj.getContent().querySelectorAll('.e-cellselectionbackground').length).toEqual(0);
        });
        it('select cells with wrong object ', () => {
            gridObj.selectionModule.selectCells([{ rowIndex: 0, cellIndexes: [12, 15] }, { rowIndex: 5, cellIndexes: [1, 2] }]);
            gridObj.dataBind();
            expect(gridObj.getContent().querySelectorAll('.e-cellselectionbackground').length).toEqual(2);
        });
        it('select cells with selectCellsByRange method ', () => {
            gridObj.selectionModule.selectCellsByRange({ rowIndex: 0, cellIndex: 12 }, { rowIndex: 6, cellIndex: 12 });
            gridObj.dataBind();
            expect(gridObj.getContent().querySelectorAll('.e-cellselectionbackground').length).toEqual(31);
        });


        afterAll(() => {
            remove(elem);
        });
    });
});


describe('Grid Touch Selection', () => {
    describe('touch selection', () => {
        let gridObj: Grid;
        let elem: HTMLElement = createElement('div', { id: 'Grid' });
        let selectionModule: Selection;
        let rows: Element[];
        let cell: HTMLElement;
        let gridPopUp: HTMLElement;
        let spanElement: Element;
        let androidPhoneUa: string = 'Mozilla/5.0 (Linux; Android 4.3; Nexus 7 Build/JWR66Y) ' +
            'AppleWebKit/537.36 (KHTML, like Gecko) Chrome/30.0.1599.92 Safari/537.36';
        beforeAll((done: Function) => {
            Browser.userAgent = androidPhoneUa;
            let dataBound: EmitType<Object> = () => { done(); };
            document.body.appendChild(elem);
            gridObj = new Grid(
                {
                    dataSource: data, dataBound: dataBound,
                    columns: [
                        { headerText: 'OrderID', field: 'OrderID' },
                        { headerText: 'CustomerID', field: 'CustomerID' },
                        { headerText: 'EmployeeID', field: 'EmployeeID' },
                        { headerText: 'ShipCountry', field: 'ShipCountry' },
                        { headerText: 'ShipCity', field: 'ShipCity' },
                    ],
                    allowSelection: true,
                    selectionSettings: { type: 'multiple', mode: 'both' },
                });
            gridObj.appendTo('#Grid');
        });

        it('gridPopUp display testing', () => {
            rows = gridObj.getRows();
            selectionModule = gridObj.selectionModule;
            gridPopUp = gridObj.element.querySelector('.e-gridpopup') as HTMLElement;
            spanElement = gridPopUp.querySelector('span');
            expect(gridPopUp.style.display).toEqual('none');
        });

        it('single row testing', () => {
            (gridObj.getRows()[0].querySelector('.e-rowcell') as HTMLElement).click();
            expect(rows[0].firstElementChild.classList.contains('e-selectionbackground')).toEqual(true);
            expect(selectionModule.selectedRowIndexes.length).toEqual(1);
            expect(gridPopUp.style.display).toEqual('');
            expect(spanElement.classList.contains('e-rowselect')).toEqual(true);
        });

        it('multi row  testing', () => {
            (spanElement as HTMLElement).click();
            expect(spanElement.classList.contains('e-spanclicked')).toEqual(true);
            (gridObj.getRows()[1].querySelector('.e-rowcell') as HTMLElement).click();
            expect(rows[0].firstElementChild.classList.contains('e-selectionbackground')).toEqual(true);
            expect(rows[1].firstElementChild.classList.contains('e-selectionbackground')).toEqual(true);
            expect(selectionModule.selectedRowIndexes.length).toEqual(2);
            expect(gridPopUp.style.display).toEqual('');
            expect(spanElement.classList.contains('e-rowselect')).toEqual(true);
        });

        it('gridpopup hide testing', () => {
            (spanElement as HTMLElement).click();
            expect(gridPopUp.style.display).toEqual('none');
        });

        afterAll(() => {
            remove(elem);
        });
    });

    describe('select Row after grouping', () => {
        let gridObj: Grid;
        let elem: HTMLElement = createElement('div', { id: 'Grid' });
        let actionBegin: () => void;
        let actionComplete: () => void;
        let columns: any;
        beforeAll((done: Function) => {
            let dataBound: EmitType<Object> = () => { done(); };
            document.body.appendChild(elem);
            gridObj = new Grid(
                {
                    dataSource: data,
                    columns: [{ field: 'OrderID', headerText: 'Order ID' },
                    { field: 'CustomerID', headerText: 'CustomerID' },
                    { field: 'EmployeeID', headerText: 'Employee ID' },
                    { field: 'Freight', headerText: 'Freight' },
                    { field: 'ShipCity', headerText: 'Ship City' },
                    { field: 'ShipCountry', headerText: 'Ship Country' }],
                    allowGrouping: true,
                    groupSettings: { columns: ['EmployeeID', 'ShipCity'] },
                    allowSorting: true,
                    allowPaging: true,
                    actionBegin: actionBegin,
                    actionComplete: actionComplete,
                    dataBound: dataBound
                });
            gridObj.appendTo('#Grid');
        });

        it('initial check', () => {
            expect(gridObj.element.querySelectorAll('.e-groupdroparea').length).toEqual(1);
            expect(gridObj.element.querySelectorAll('.e-groupdroparea')[0].children.length).toEqual(2);
            expect(gridObj.element.querySelectorAll('.e-groupdroparea')[0].querySelectorAll('.e-ungroupbutton').length).toEqual(2);
            expect(gridObj.getHeaderContent().querySelectorAll('.e-ascending').length).toEqual(2);
            expect(gridObj.getHeaderContent().querySelectorAll('.e-grouptopleftcell').length).toEqual(2);
            expect(gridObj.getContentTable().querySelectorAll('.e-indentcell').length > 0).toEqual(true);
            expect(gridObj.groupSettings.columns.length).toEqual(2);
        });
        it('select a row', (done: Function) => {
            let rowSelected = () => {
                expect((<HTMLTableCellElement>gridObj.getContent().querySelectorAll('.e-selectionbackground')[0]).innerHTML).
                    toEqual(gridObj.currentViewData['records'][0]['OrderID'].toString());
                done();
            };
            gridObj.rowSelected = rowSelected;
            gridObj.selectRow(0);
            gridObj.dataBind();
        });
        it('Check selected records', () => {
            let selectedData: Object[] = gridObj.getSelectedRecords();
            gridObj.dataBind();
            expect((<HTMLTableCellElement>gridObj.getContent().querySelectorAll('.e-selectionbackground')[0]).innerHTML).
                toEqual(selectedData[0]['OrderID'].toString());
        });
        afterAll(() => {
            remove(elem);
        });
    });
});