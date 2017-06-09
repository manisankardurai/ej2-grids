/**
 * Grid detail template spec document
 */
import { EmitType } from '@syncfusion/ej2-base';
import { createElement, remove } from '@syncfusion/ej2-base/dom';
import { Grid } from '../../../src/grid/base/grid';
import { Sort } from '../../../src/grid/actions/sort';
import { Group } from '../../../src/grid/actions/group';
import { Selection } from '../../../src/grid/actions/selection';
import { Filter } from '../../../src/grid/actions/filter';
import { Page } from '../../../src/grid/actions/page';
import { DetailsRow } from '../../../src/grid/actions/details-row';
import { filterData, employeeData, customerData } from '../base/datasource.spec';
import '../../../node_modules/es6-promise/dist/es6-promise';

Grid.Inject(Sort, Page, Filter, DetailsRow, Group, Selection);

describe('Detail template module', () => {

    function detail(e: any): void {
        let data: any = [];
        for (let i = 0; i < filterData.length; i++) {
            if (filterData[i]['EmployeeID'] === e.data.EmployeeID) {
                data.push(filterData[i]);
            }
        }
        let grid1: Grid = new Grid(
            {
                dataSource: filterData,
                selectionSettings: { type: 'multiple', mode: 'row' },
                allowSorting: true,
                allowPaging: true,
                pageSettings: { pageSize: 3 },
                allowGrouping: true,
                allowReordering: true,
                allowTextWrap: true,
                allowFiltering: true,
                columns: [
                    { field: 'OrderID', headerText: 'Order ID', width: 120, textAlign: 'right' },
                    { field: 'CustomerID', headerText: 'Customer ID', width: 125 },
                    { field: 'Freight', width: 120, format: 'C', textAlign: 'right' },
                    { field: 'ShipCity', headerText: 'Ship City', width: 150 }
                ],
            });
        grid1.appendTo((e.detailsElement as Element).querySelector('#detailgrid') as HTMLElement);
    }

    describe('Render with invalid id testing', () => {
        let gridObj: Grid;
        let elem: HTMLElement = createElement('div', { id: 'Grid' });
        let actionComplete: Function;

        beforeAll((done: Function) => {
            let dataBound: EmitType<Object> = () => { done(); };
            document.body.appendChild(elem);
            gridObj = new Grid(
                {
                    dataSource: filterData,
                    allowPaging: true,
                    detailsTemplate: '#detailtemplate1',
                    detailsDataBound: detail,
                    allowGrouping: true,
                    selectionSettings: { type: 'multiple', mode: 'row' },
                    allowFiltering: true,
                    allowSorting: true,
                    allowReordering: true,
                    columns: [
                        { field: 'OrderID', headerText: 'Order ID', width: 120, textAlign: 'right' },
                        { field: 'CustomerID', headerText: 'Customer ID', width: 125 },
                        { field: 'Freight', width: 120, format: 'C', textAlign: 'right' },
                        { field: 'ShipCity', headerText: 'Ship City', width: 150 }
                    ],
                    dataBound: dataBound
                });
            gridObj.appendTo('#Grid');
        });

        it('Detail row render testing', () => {
            expect(gridObj.getContentTable().querySelectorAll('.e-detailsrowcollapse').length).toEqual(12);
            expect(gridObj.getHeaderTable().querySelectorAll('.e-detailheadercell').length).toEqual(1);
            expect(gridObj.getHeaderTable().querySelectorAll('.e-mastercell').length).toEqual(1);
            expect(gridObj.getHeaderTable().querySelectorAll('.e-mastercell')[0].classList.contains('e-filterbarcell')).toEqual(true);
        });

        it('Detail row expand testing', () => {
            (gridObj.getDataRows()[0].querySelector('.e-detailsrowcollapse') as HTMLElement).click();
            expect(gridObj.getContentTable().querySelectorAll('.e-detailrow').length).toEqual(0);
            expect(gridObj.getDataRows()[0].querySelectorAll('.e-detailsrowexpand').length).toEqual(1);
        });

        it('Detail collapse testing', () => {
            (gridObj.getDataRows()[0].querySelector('.e-detailsrowexpand') as HTMLElement).click();
            expect(gridObj.getContentTable().querySelectorAll('.e-detailrow').length).toEqual(0);
            expect(gridObj.getDataRows()[0].querySelectorAll('.e-detailsrowcollapse').length).toEqual(1);
        });

        afterAll(() => {
            elem.remove();
        });
    });

    describe('Render testing', () => {
        let gridObj: Grid;
        let elem: HTMLElement = createElement('div', { id: 'Grid' });
        let template: HTMLElement = createElement('script', { id: 'detailtemplate' });
        template.appendChild(createElement('div', { id: 'detailgrid' }));
        document.body.appendChild(template);
        let actionComplete: () => void;

        beforeAll((done: Function) => {
            let dataBound: EmitType<Object> = () => { done(); };
            document.body.appendChild(elem);
            gridObj = new Grid(
                {
                    dataSource: filterData,
                    allowPaging: true,
                    detailsTemplate: '#detailtemplate',
                    detailsDataBound: detail,
                    allowGrouping: true,
                    selectionSettings: { type: 'multiple', mode: 'row' },
                    allowFiltering: true,
                    allowSorting: true,
                    allowReordering: true,
                    actionComplete: actionComplete,
                    columns: [
                        { field: 'OrderID', headerText: 'Order ID', width: 120, textAlign: 'right' },
                        { field: 'CustomerID', headerText: 'Customer ID', width: 125 },
                        { field: 'Freight', width: 120, format: 'C', textAlign: 'right' },
                        { field: 'ShipCity', headerText: 'Ship City', width: 150 }
                    ],
                    dataBound: dataBound
                });
            gridObj.appendTo('#Grid');
        });

        it('Detail row render testing', () => {
            expect(gridObj.getContentTable().querySelectorAll('.e-detailsrowcollapse').length).toEqual(12);
            expect(gridObj.getHeaderTable().querySelectorAll('.e-detailheadercell').length).toEqual(1);
            expect(gridObj.getHeaderTable().querySelectorAll('.e-mastercell').length).toEqual(1);
            expect(gridObj.getHeaderTable().querySelectorAll('.e-mastercell')[0].classList.contains('e-filterbarcell')).toEqual(true);
        });

        it('Detail row expand testing', () => {
            expect(gridObj.getDataRows()[0].querySelectorAll('.e-detailsrowcollapse')[0].getAttribute('aria-expanded')).toEqual("false");
            (gridObj.getDataRows()[0].querySelector('.e-detailsrowcollapse') as HTMLElement).click();
            expect(gridObj.getContentTable().querySelectorAll('.e-detailrow').length).toEqual(1);
            expect((gridObj.getContentTable().querySelectorAll('.e-detailrow')[0] as HTMLElement).style.display).toEqual('');
            expect(gridObj.getDataRows()[0].querySelectorAll('.e-detailsrowexpand').length).toEqual(1);
            expect(gridObj.getDataRows()[0].querySelectorAll('.e-detailsrowcollapse').length).toEqual(0);
            expect(gridObj.getDataRows()[0].querySelectorAll('.e-detailsrowexpand')[0].getAttribute('aria-expanded')).toEqual("true");
        });

        it('Detail collapse testing', () => {
            (gridObj.getDataRows()[0].querySelector('.e-detailsrowexpand') as HTMLElement).click();
            expect(gridObj.getContentTable().querySelectorAll('.e-detailrow').length).toEqual(1);
            expect(gridObj.getDataRows()[0].querySelectorAll('.e-detailsrowcollapse').length).toEqual(1);
            expect((gridObj.getContentTable().querySelectorAll('.e-detailrow')[0] as HTMLElement).style.display).toEqual('none');
            expect(gridObj.getDataRows()[0].querySelectorAll('.e-detailsrowexpand').length).toEqual(0);
            expect(gridObj.getDataRows()[0].querySelectorAll('.e-detailsrowcollapse')[0].getAttribute('aria-expanded')).toEqual("false");
        });

        it('Expand method testing', () => {
            gridObj.detailsRowModule.expand(gridObj.getDataRows()[1].querySelector('.e-detailsrowcollapse'));
            expect(gridObj.getContentTable().querySelectorAll('.e-detailrow').length).toEqual(2);
            expect(gridObj.getDataRows()[1].querySelectorAll('.e-detailsrowexpand').length).toEqual(1);
            expect((gridObj.getContentTable().querySelectorAll('.e-detailrow')[1] as HTMLElement).style.display).toEqual('');

            gridObj.detailsRowModule.expand(gridObj.getDataRows()[1].querySelector('.e-detailsrowexpand'));
            expect(gridObj.getDataRows()[1].querySelectorAll('.e-detailsrowexpand').length).toEqual(1);
        });

        it('Collapse method testing', () => {
            gridObj.detailsRowModule.collapse(gridObj.getDataRows()[1].querySelector('.e-detailsrowexpand'));
            expect(gridObj.getContentTable().querySelectorAll('.e-detailrow').length).toEqual(2);
            expect(gridObj.getDataRows()[1].querySelectorAll('.e-detailsrowcollapse').length).toEqual(1);
            expect((gridObj.getContentTable().querySelectorAll('.e-detailrow')[1] as HTMLElement).style.display).toEqual('none');

            gridObj.detailsRowModule.collapse(gridObj.getDataRows()[1].querySelector('.e-detailsrowcollapse'));
            expect(gridObj.getDataRows()[1].querySelectorAll('.e-detailsrowcollapse').length).toEqual(1);
        });

        it('Alt Down shortcut testing', () => {
            let args: any = { action: 'altDownArrow', preventDefault: () => { }, target: createElement('div') };
            gridObj.selectRow(2);
            gridObj.keyBoardModule.keyAction(args);
            expect(gridObj.getContentTable().querySelectorAll('.e-detailrow').length).toEqual(3);
            expect(gridObj.getDataRows()[2].querySelectorAll('.e-detailsrowexpand').length).toEqual(1);
            expect((gridObj.getContentTable().querySelectorAll('.e-detailrow')[2] as HTMLElement).style.display).toEqual('');

            gridObj.keyBoardModule.keyAction(args);
            expect(gridObj.getDataRows()[2].querySelectorAll('.e-detailsrowexpand').length).toEqual(1);
        });

        it('Alt Up shortcut testing', () => {
            let args: any = { action: 'altUpArrow', preventDefault: () => { }, target: createElement('div') };
            gridObj.keyBoardModule.keyAction(args);
            expect(gridObj.getContentTable().querySelectorAll('.e-detailrow').length).toEqual(3);
            expect(gridObj.getDataRows()[2].querySelectorAll('.e-detailsrowcollapse').length).toEqual(1);
            expect((gridObj.getContentTable().querySelectorAll('.e-detailrow')[2] as HTMLElement).style.display).toEqual('none');

            gridObj.keyBoardModule.keyAction(args);
            expect(gridObj.getDataRows()[2].querySelectorAll('.e-detailsrowcollapse').length).toEqual(1);
        });

        it('ctrlDownArrow shortcut testing', () => {
            let args: any = { action: 'ctrlDownArrow', preventDefault: () => { }, target: createElement('div') };
            gridObj.selectRow(3);
            gridObj.keyBoardModule.keyAction(args);
            expect(gridObj.getContentTable().querySelectorAll('.e-detailrow').length).toEqual(12);
            expect(gridObj.getDataRows()[3].querySelectorAll('.e-detailsrowexpand').length).toEqual(1);
            expect(gridObj.getDataRows()[4].querySelectorAll('.e-detailsrowexpand').length).toEqual(1);
            expect((gridObj.getContentTable().querySelectorAll('.e-detailrow')[3] as HTMLElement).style.display).toEqual('');
            expect((gridObj.getContentTable().querySelectorAll('.e-detailrow')[4] as HTMLElement).style.display).toEqual('');
        });

        it('ctrlUpArrow shortcut testing', () => {
            let args: any = { action: 'ctrlUpArrow', preventDefault: () => { }, target: createElement('div') };
            gridObj.keyBoardModule.keyAction(args);
            expect(gridObj.getContentTable().querySelectorAll('.e-detailrow').length).toEqual(12);
            expect(gridObj.getDataRows()[3].querySelectorAll('.e-detailsrowcollapse').length).toEqual(1);
            expect(gridObj.getDataRows()[4].querySelectorAll('.e-detailsrowcollapse').length).toEqual(1);
            expect((gridObj.getContentTable().querySelectorAll('.e-detailrow')[3] as HTMLElement).style.display).toEqual('none');
            expect((gridObj.getContentTable().querySelectorAll('.e-detailrow')[4] as HTMLElement).style.display).toEqual('none');
        });

        it('Alt Down shortcut with selection disabled testing', () => {
            gridObj.allowSelection = false;
            gridObj.dataBind();
            let args: any = { action: 'altDownArrow', preventDefault: () => { }, target: createElement('div') };
            gridObj.keyBoardModule.keyAction(args);
            expect((gridObj.getContentTable().querySelectorAll('.e-detailrow')[2] as HTMLElement).style.display).toEqual('none');

            gridObj.keyBoardModule.keyAction(args);
            expect(gridObj.getDataRows()[2].querySelectorAll('.e-detailsrowexpand').length).toEqual(0);
        });


        it('Single column group testing', (done: Function) => {
            actionComplete = (args?: any): void => {
                if (args.requestType === 'grouping') {
                    let grpHIndent = gridObj.getHeaderContent().querySelectorAll('.e-grouptopleftcell');
                    let content = gridObj.getContent().querySelectorAll('tr');

                    expect(grpHIndent[0].querySelector('.e-headercelldiv').classList.contains('e-emptycell')).toEqual(true);
                    expect(gridObj.getHeaderTable().querySelectorAll('.e-detailheadercell').length).toEqual(1);
                    expect(content[1].querySelectorAll('.e-indentcell').length).toEqual(1);
                    done();
                }
            };
            gridObj.actionComplete = actionComplete;
            gridObj.groupModule.groupColumn('OrderID');
        });

        it('Alt Down shortcut with grouping testing', () => {
            gridObj.allowSelection = true;
            gridObj.dataBind();
            gridObj.selectRow(1);
            let args: any = { action: 'altDownArrow', preventDefault: () => { }, target: createElement('div') };
            gridObj.keyBoardModule.keyAction(args);
            expect((gridObj.getContentTable().querySelectorAll('.e-detailrow')[0] as HTMLElement).style.display).toEqual('');
        });

        it('Expand method with grouping testing', () => {
            gridObj.detailsRowModule.expand(gridObj.getDataRows()[0].querySelector('.e-detailsrowcollapse'));
            expect(gridObj.getContentTable().querySelectorAll('.e-detailrow').length).toEqual(2);
            expect(gridObj.getDataRows()[0].querySelectorAll('.e-detailsrowexpand').length).toEqual(1);
            expect((gridObj.getContentTable().querySelectorAll('.e-detailrow')[0] as HTMLElement).style.display).toEqual('');
        });

        it('expandcollapse group rows method testing', () => {
            gridObj.groupModule.expandCollapseRows(gridObj.getContent().querySelectorAll('.e-recordplusexpand')[4]);
            //     expect(gridObj.getContent().querySelectorAll('tr:not([style*="display: none"])').length).toEqual(33);
        });

        it('toogleExpandcollapse with invalid element testing', () => {
            (gridObj.detailsRowModule as any).toogleExpandcollapse(gridObj.getDataRows()[1].querySelector('.e-rowcell'));
            expect(gridObj.getContentTable().querySelectorAll('.e-detailrow').length).toEqual(2);
            expect(gridObj.getDataRows()[1].querySelectorAll('.e-detailsrowexpand').length).toEqual(1);
            expect((gridObj.getContentTable().querySelectorAll('.e-detailrow')[1] as HTMLElement).style.display).toEqual('');
        });


        afterAll(() => {
            remove(document.getElementById('detailtemplate'));
            elem.remove();
        });
    });

    describe('Hierarchy Render testing', () => {
        let gridObj: Grid;
        let elem: HTMLElement = createElement('div', { id: 'Grid' });
        let actionComplete: () => void;

        beforeAll((done: Function) => {
            let dataBound: EmitType<Object> = () => { done(); };
            document.body.appendChild(elem);
            gridObj = new Grid(
                {
                    dataSource: employeeData,
                    allowPaging: true,
                    allowGrouping: true,
                    selectionSettings: { type: 'multiple', mode: 'row' },
                    allowFiltering: true,
                    allowSorting: true,
                    allowReordering: true,
                    actionComplete: actionComplete,
                    columns: [
                        { field: 'EmployeeID', headerText: 'Employee ID', textAlign: 'right', width: 75 },
                        { field: 'FirstName', headerText: 'First Name', textAlign: 'left', width: 100 },
                        { field: 'Title', headerText: 'Title', textAlign: 'left', width: 120 },
                        { field: 'City', headerText: 'City', textAlign: 'left', width: 100 },
                        { field: 'Country', headerText: 'Country', textAlign: 'left', width: 100 }
                    ],
                    childGrid: {
                        dataSource: filterData, queryString: 'EmployeeID',
                        allowPaging: true,
                        allowGrouping: true,
                        selectionSettings: { type: 'multiple', mode: 'row' },
                        pageSettings: { pageCount: 5, pageSize: 5 },
                        allowFiltering: true,
                        allowSorting: true,
                        groupSettings: { showGroupedColumn: false },
                        allowReordering: true,
                        allowTextWrap: true,
                        columns: [
                            { field: 'OrderID', headerText: 'Order ID', textAlign: 'right', width: 75 },
                            { field: 'EmployeeID', headerText: 'Employee ID', textAlign: 'right', width: 75 },
                            { field: 'ShipCity', headerText: 'Ship City', textAlign: 'left', width: 100 },
                            { field: 'Freight', headerText: 'Freight', textAlign: 'left', width: 120 },
                            { field: 'ShipName', headerText: 'Ship Name', textAlign: 'left', width: 100 }
                        ],
                        childGrid: {
                            dataSource: customerData,
                            allowPaging: true,
                            allowGrouping: true,
                            selectionSettings: { type: 'multiple', mode: 'row' },
                            pageSettings: { pageCount: 5, pageSize: 5 },
                            allowFiltering: true,
                            allowSorting: true,
                            groupSettings: { showGroupedColumn: false },
                            allowReordering: true,
                            allowTextWrap: true,
                            queryString: 'CustomerID',
                            columns: [
                                { field: 'CustomerID', headerText: 'Customer ID', textAlign: 'right', width: 75 },
                                { field: 'Phone', headerText: 'Phone', textAlign: 'left', width: 100 },
                                { field: 'Address', headerText: 'Address', textAlign: 'left', width: 120 },
                                { field: 'Country', headerText: 'Country', textAlign: 'left', width: 100 }
                            ],
                        },
                    },
                    dataBound: dataBound
                });
            gridObj.appendTo('#Grid');
        });

        it('Hierarchy row render testing', () => {
            expect(gridObj.getContentTable().querySelectorAll('.e-detailsrowcollapse').length).toEqual(9);
            expect(gridObj.getHeaderTable().querySelectorAll('.e-detailheadercell').length).toEqual(1);
            expect(gridObj.getHeaderTable().querySelectorAll('.e-mastercell').length).toEqual(1);
            expect(gridObj.getHeaderTable().querySelectorAll('.e-mastercell')[0].classList.contains('e-filterbarcell')).toEqual(true);
        });

        it('Hierarchy row expand testing', () => {
            expect(gridObj.getDataRows()[0].querySelectorAll('.e-detailsrowcollapse')[0].getAttribute('aria-expanded')).toEqual('false');
            (gridObj.getDataRows()[0].querySelector('.e-detailsrowcollapse') as HTMLElement).click();
            expect(gridObj.getContentTable().querySelectorAll('.e-detailrow').length).toEqual(1);
            expect(gridObj.getContentTable().querySelectorAll('.e-detailrow')[0].querySelectorAll('.e-grid').length).toEqual(1);
            expect((gridObj.getContentTable().querySelectorAll('.e-detailrow')[0] as HTMLElement).style.display).toEqual('');
            expect(gridObj.getDataRows()[0].querySelectorAll('.e-detailsrowexpand').length).toEqual(1);
            expect(gridObj.getDataRows()[0].querySelectorAll('.e-detailsrowcollapse').length).toEqual(0);
            expect(gridObj.getDataRows()[0].querySelectorAll('.e-detailsrowexpand')[0].getAttribute('aria-expanded')).toEqual('true');
        });

        it('Hierarchy collapse testing', () => {
            (gridObj.getDataRows()[0].querySelector('.e-detailsrowexpand') as HTMLElement).click();
            expect(gridObj.getContentTable().querySelectorAll('.e-detailrow').length).toEqual(1);
            expect(gridObj.getDataRows()[0].querySelectorAll('.e-detailsrowcollapse').length).toEqual(1);
            expect(gridObj.getContentTable().querySelectorAll('.e-detailrow')[0].querySelectorAll('.e-grid').length).toEqual(1);
            expect((gridObj.getContentTable().querySelectorAll('.e-detailrow')[0] as HTMLElement).style.display).toEqual('none');
            expect(gridObj.getDataRows()[0].querySelectorAll('.e-detailsrowexpand').length).toEqual(0);
            expect(gridObj.getDataRows()[0].querySelectorAll('.e-detailsrowcollapse')[0].getAttribute('aria-expanded')).toEqual('false');
        });

        it('Expand method testing', () => {
            gridObj.detailsRowModule.expand(gridObj.getDataRows()[1].querySelector('.e-detailsrowcollapse'));
            expect(gridObj.getContentTable().querySelectorAll('.e-detailrow').length).toEqual(2);
            expect(gridObj.getDataRows()[1].querySelectorAll('.e-detailsrowexpand').length).toEqual(1);
            expect(gridObj.getContentTable().querySelectorAll('.e-detailrow')[1].querySelectorAll('.e-grid').length).toEqual(1);
            expect((gridObj.getContentTable().querySelectorAll('.e-detailrow')[1] as HTMLElement).style.display).toEqual('');

            gridObj.detailsRowModule.expand(gridObj.getDataRows()[1].querySelector('.e-detailsrowexpand'));
            expect(gridObj.getDataRows()[1].querySelectorAll('.e-detailsrowexpand').length).toEqual(1);
        });

        it('Collapse method testing', () => {
            gridObj.detailsRowModule.collapse(gridObj.getDataRows()[1].querySelector('.e-detailsrowexpand'));
            expect(gridObj.getContentTable().querySelectorAll('.e-detailrow').length).toEqual(2);
            expect(gridObj.getDataRows()[1].querySelectorAll('.e-detailsrowcollapse').length).toEqual(1);
            expect(gridObj.getContentTable().querySelectorAll('.e-detailrow')[1].querySelectorAll('.e-grid').length).toEqual(1);
            expect((gridObj.getContentTable().querySelectorAll('.e-detailrow')[1] as HTMLElement).style.display).toEqual('none');

            gridObj.detailsRowModule.collapse(gridObj.getDataRows()[1].querySelector('.e-detailsrowcollapse'));
            expect(gridObj.getDataRows()[1].querySelectorAll('.e-detailsrowcollapse').length).toEqual(1);
        });

        it('Expand method with number args testing', () => {
            gridObj.detailsRowModule.expand(1);
            expect(gridObj.getContentTable().querySelectorAll('.e-detailrow').length).toEqual(2);
            expect(gridObj.getDataRows()[1].querySelectorAll('.e-detailsrowexpand').length).toEqual(1);
            expect(gridObj.getContentTable().querySelectorAll('.e-detailrow')[1].querySelectorAll('.e-grid').length).toEqual(1);
            expect((gridObj.getContentTable().querySelectorAll('.e-detailrow')[1] as HTMLElement).style.display).toEqual('');

            gridObj.detailsRowModule.expand(gridObj.getDataRows()[1].querySelector('.e-detailsrowexpand'));
            expect(gridObj.getDataRows()[1].querySelectorAll('.e-detailsrowexpand').length).toEqual(1);
        });

        it('Collapse method with number args testing', () => {
            gridObj.detailsRowModule.collapse(1);
            expect(gridObj.getContentTable().querySelectorAll('.e-detailrow').length).toEqual(2);
            expect(gridObj.getDataRows()[1].querySelectorAll('.e-detailsrowcollapse').length).toEqual(1);
            expect(gridObj.getContentTable().querySelectorAll('.e-detailrow')[1].querySelectorAll('.e-grid').length).toEqual(1);
            expect((gridObj.getContentTable().querySelectorAll('.e-detailrow')[1] as HTMLElement).style.display).toEqual('none');

            gridObj.detailsRowModule.collapse(gridObj.getDataRows()[1].querySelector('.e-detailsrowcollapse'));
            expect(gridObj.getDataRows()[1].querySelectorAll('.e-detailsrowcollapse').length).toEqual(1);
        });

        it('Alt Down shortcut testing', () => {
            let args: any = { action: 'altDownArrow', preventDefault: () => { }, target: createElement('div') };
            gridObj.selectRow(2);
            gridObj.keyBoardModule.keyAction(args);
            expect(gridObj.getContentTable().querySelectorAll('.e-detailrow').length).toEqual(3);
            expect(gridObj.getDataRows()[2].querySelectorAll('.e-detailsrowexpand').length).toEqual(1);
            expect(gridObj.getContentTable().querySelectorAll('.e-detailrow')[2].querySelectorAll('.e-grid').length).toEqual(1);
            expect((gridObj.getContentTable().querySelectorAll('.e-detailrow')[2] as HTMLElement).style.display).toEqual('');

            gridObj.keyBoardModule.keyAction(args);
            expect(gridObj.getDataRows()[2].querySelectorAll('.e-detailsrowexpand').length).toEqual(1);
        });

        it('Alt Up shortcut testing', () => {
            let args: any = { action: 'altUpArrow', preventDefault: () => { }, target: createElement('div') };
            gridObj.keyBoardModule.keyAction(args);
            expect(gridObj.getContentTable().querySelectorAll('.e-detailrow').length).toEqual(3);
            expect(gridObj.getDataRows()[2].querySelectorAll('.e-detailsrowcollapse').length).toEqual(1);
            expect(gridObj.getContentTable().querySelectorAll('.e-detailrow')[2].querySelectorAll('.e-grid').length).toEqual(1);
            expect((gridObj.getContentTable().querySelectorAll('.e-detailrow')[2] as HTMLElement).style.display).toEqual('none');

            gridObj.keyBoardModule.keyAction(args);
            expect(gridObj.getDataRows()[2].querySelectorAll('.e-detailsrowcollapse').length).toEqual(1);
        });

        it('ctrlDownArrow shortcut testing', () => {
            let args: any = { action: 'ctrlDownArrow', preventDefault: () => { }, target: createElement('div') };
            gridObj.selectRow(3);
            gridObj.keyBoardModule.keyAction(args);
            expect(gridObj.getContentTable().querySelectorAll('.e-detailrow').length).toEqual(9);
            expect(gridObj.getDataRows()[3].querySelectorAll('.e-detailsrowexpand').length).toEqual(1);
            expect(gridObj.getDataRows()[4].querySelectorAll('.e-detailsrowexpand').length).toEqual(1);
            expect(gridObj.getContentTable().querySelectorAll('.e-grid').length).toEqual(9);
            expect((gridObj.getContentTable().querySelectorAll('.e-detailrow')[3] as HTMLElement).style.display).toEqual('');
            expect((gridObj.getContentTable().querySelectorAll('.e-detailrow')[4] as HTMLElement).style.display).toEqual('');
        });

        it('ctrlUpArrow shortcut testing', () => {
            let args: any = { action: 'ctrlUpArrow', preventDefault: () => { }, target: createElement('div') };
            gridObj.keyBoardModule.keyAction(args);
            expect(gridObj.getContentTable().querySelectorAll('.e-detailrow').length).toEqual(9);
            expect(gridObj.getDataRows()[3].querySelectorAll('.e-detailsrowcollapse').length).toEqual(1);
            expect(gridObj.getDataRows()[4].querySelectorAll('.e-detailsrowcollapse').length).toEqual(1);
            expect(gridObj.getContentTable().querySelectorAll('.e-grid').length).toEqual(9);
            expect((gridObj.getContentTable().querySelectorAll('.e-detailrow')[3] as HTMLElement).style.display).toEqual('none');
            expect((gridObj.getContentTable().querySelectorAll('.e-detailrow')[4] as HTMLElement).style.display).toEqual('none');
        });

        it('Alt Down shortcut with selection disabled testing', () => {
            gridObj.allowSelection = false;
            gridObj.dataBind();
            let args: any = { action: 'altDownArrow', preventDefault: () => { }, target: createElement('div') };
            gridObj.keyBoardModule.keyAction(args);
            expect((gridObj.getContentTable().querySelectorAll('.e-detailrow')[2] as HTMLElement).style.display).toEqual('none');

            gridObj.keyBoardModule.keyAction(args);
            expect(gridObj.getDataRows()[2].querySelectorAll('.e-detailsrowexpand').length).toEqual(0);
        });


        it('Single column group testing', (done: Function) => {
            actionComplete = (args?: any): void => {
                if (args.requestType === 'grouping') {
                    let grpHIndent = gridObj.getHeaderContent().querySelectorAll('.e-grouptopleftcell');
                    let content = gridObj.getContent().querySelectorAll('tr');

                    expect(grpHIndent[0].querySelector('.e-headercelldiv').classList.contains('e-emptycell')).toEqual(true);
                    expect(gridObj.getHeaderTable().querySelectorAll('.e-detailheadercell').length).toEqual(1);
                    expect(content[1].querySelectorAll('.e-indentcell').length).toEqual(1);
                    done();
                }
            };
            gridObj.actionComplete = actionComplete;
            gridObj.groupModule.groupColumn('EmployeeID');
        });

        it('Alt Down shortcut with grouping testing', () => {
            gridObj.allowSelection = true;
            gridObj.dataBind();
            gridObj.selectRow(1);
            let args: any = { action: 'altDownArrow', preventDefault: () => { }, target: createElement('div') };
            gridObj.keyBoardModule.keyAction(args);
            expect((gridObj.getContentTable().querySelectorAll('.e-detailrow')[0] as HTMLElement).style.display).toEqual('');
        });

        it('Expand method with grouping testing', () => {
            gridObj.detailsRowModule.expand(gridObj.getDataRows()[0].querySelector('.e-detailsrowcollapse'));
            expect(gridObj.getContentTable().querySelectorAll('.e-detailrow').length).toEqual(2);
            expect(gridObj.getDataRows()[0].querySelectorAll('.e-detailsrowexpand').length).toEqual(1);
            expect((gridObj.getContentTable().querySelectorAll('.e-detailrow')[0] as HTMLElement).style.display).toEqual('');
        });

        it('expandcollapse group rows method testing', () => {
            gridObj.groupModule.expandCollapseRows(gridObj.getContent().querySelectorAll('.e-recordplusexpand')[4]);
            expect(gridObj.getContent().querySelectorAll('tr:not([style*="display: none"])').length).toEqual(27);
        });

        it('toogleExpandcollapse with invalid element testing', () => {
            (gridObj.detailsRowModule as any).toogleExpandcollapse(gridObj.getDataRows()[1].querySelector('.e-rowcell'));
            expect(gridObj.getContentTable().querySelectorAll('.e-detailrow').length).toEqual(2);
            expect(gridObj.getDataRows()[1].querySelectorAll('.e-detailsrowexpand').length).toEqual(1);
            expect((gridObj.getContentTable().querySelectorAll('.e-detailrow')[1] as HTMLElement).style.display).toEqual('');
        });


        afterAll(() => {
            (gridObj.detailsRowModule as any).destroy();
            elem.remove();
        });
    });


});