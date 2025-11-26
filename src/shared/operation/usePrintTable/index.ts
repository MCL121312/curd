interface ColumnsConfig {
  title: string;
  field: string;
  width?: string;
  formatter?: (value: any) => string;
}

interface Config<T extends any> {
  data: T[];
  columnsConfig?: ColumnsConfig[];
}

export function useTablePrint<T extends any>({ data, columnsConfig }: Config<T>) {
  const cols = columnsConfig || [];

  function createTable(tableData: T[], tableCols: ColumnsConfig[]) {
    const header = createTableHeader(tableCols);
    const body = createTableBody(tableData, tableCols);
    const table = `<table class="print-item-table">
             ${header}
             ${body}
                    </table>`;

    return table.trim();
  }

  function createTableHeader(tableCols: ColumnsConfig[]) {
    const header = ` <thead>
                        <tr style="width: 100%">
                            ${
                              tableCols &&
                              tableCols.reduce(
                                (result, col) =>
                                  (result += `<th style="width: ${col.width || 'auto'}"> ${col.title} </th>`),
                                '',
                              )
                            }
                       </tr>
                    </thead>`;

    return header;
  }

  function createTableBody(tableData: T[], tableCols: ColumnsConfig[]) {
    const tbody = ` <tbody>
          ${
            tableData &&
            tableData.reduce(
              (result, row) =>
                (result += `<tr> ${tableCols.reduce(
                  (rowResult, col) =>
                    (rowResult += `<td > ${col.formatter ? col.formatter((row as Record<string, any>)[col.field]) : (row as Record<string, any>)[col.field]} </td>`),
                  '',
                )} </tr>`),
              '',
            )
          }
      </tbody>`;

    return tbody;
  }

  function printTable() {
    // 创建打印容器
    const printContainer = document.createElement('div');
    printContainer.id = 'print-container';
    printContainer.innerHTML = createTable(data, cols);

    // 添加到DOM
    document.body.appendChild(printContainer);

    // 触发打印
    window.print();

    // 打印完成后移除容器
    printContainer.remove();
  }

  return {
    printTable,
    createTable,
  };
}
