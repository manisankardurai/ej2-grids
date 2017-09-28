import { isNullOrUndefined, extend } from '@syncfusion/ej2-base';
import { createElement, attributes as addAttributes } from '@syncfusion/ej2-base';
import { rowDataBound, queryCellInfo } from '../base/constant';
import { setStyleAndAttributes } from '../base/util';
import { CellType } from '../base/enum';
var RowRenderer = (function () {
    function RowRenderer(serviceLocator, cellType, parent) {
        this.element = createElement('tr', { attrs: { role: 'row' } });
        this.cellType = cellType;
        this.serviceLocator = serviceLocator;
        this.parent = parent;
    }
    RowRenderer.prototype.render = function (row, columns, attributes, rowTemplate) {
        return this.refreshRow(row, columns, attributes, rowTemplate);
    };
    RowRenderer.prototype.refresh = function (row, columns, isChanged, attributes, rowTemplate) {
        if (isChanged) {
            row.data = extend({}, row.changes);
        }
        var node = this.parent.getContent().querySelector('[data-uid=' + row.uid + ']');
        var tr = this.refreshRow(row, columns, attributes, rowTemplate);
        var cells = [].slice.call(tr.cells);
        node.innerHTML = '';
        for (var _i = 0, cells_1 = cells; _i < cells_1.length; _i++) {
            var cell = cells_1[_i];
            node.appendChild(cell);
        }
    };
    RowRenderer.prototype.refreshRow = function (row, columns, attributes, rowTemplate) {
        var tr = this.element.cloneNode();
        var rowArgs = { data: row.data };
        var cellArgs = { data: row.data };
        var attrCopy = extend({}, attributes, {});
        if (row.isDataRow) {
            row.isSelected = this.parent.getSelectedRowIndexes().indexOf(row.index) > -1;
        }
        this.buildAttributeFromRow(tr, row);
        addAttributes(tr, attrCopy);
        setStyleAndAttributes(tr, row.attributes);
        var cellRendererFact = this.serviceLocator.getService('cellRendererFactory');
        for (var i = 0, len = row.cells.length; i < len; i++) {
            var cell = row.cells[i];
            cell.isSelected = row.isSelected;
            var cellRenderer = cellRendererFact.getCellRenderer(row.cells[i].cellType || CellType.Data);
            var td = cellRenderer.render(row.cells[i], row.data, { 'index': !isNullOrUndefined(row.index) ? row.index.toString() : '' });
            tr.appendChild(td);
            if (row.cells[i].cellType === CellType.Data) {
                this.parent.trigger(queryCellInfo, extend(cellArgs, { cell: td, column: cell.column }));
            }
        }
        if (row.isDataRow) {
            this.parent.trigger(rowDataBound, extend(rowArgs, { row: tr }));
        }
        if (row.cssClass) {
            tr.classList.add(row.cssClass);
        }
        return tr;
    };
    RowRenderer.prototype.buildAttributeFromRow = function (tr, row) {
        var attr = {};
        var prop = { 'rowindex': 'aria-rowindex', 'dataUID': 'data-uid', 'ariaSelected': 'aria-selected' };
        var classes = [];
        if (row.isDataRow) {
            classes.push('e-row');
        }
        if (row.isAltRow) {
            classes.push('e-altrow');
        }
        if (!isNullOrUndefined(row.index)) {
            attr[prop.rowindex] = row.index;
        }
        if (row.rowSpan) {
            attr.rowSpan = row.rowSpan;
        }
        if (row.uid) {
            attr[prop.dataUID] = row.uid;
        }
        if (row.isSelected) {
            attr[prop.ariaSelected] = true;
        }
        if (row.visible === false) {
            classes.push('e-hide');
        }
        attr.class = classes;
        setStyleAndAttributes(tr, attr);
    };
    return RowRenderer;
}());
export { RowRenderer };