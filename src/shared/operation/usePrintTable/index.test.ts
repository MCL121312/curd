import { describe, test, beforeEach, vi, expect } from 'vitest';
import { useTablePrint } from '.';

describe('useTablePrint', () => {
  beforeEach(() => {
    vi.resetAllMocks();
    // 清理DOM
    const container = document.getElementById('print-container');
    if (container) {
      container.remove();
    }
  });

  test('should create table correctly', () => {
    const testData = [
      {
        doctorNo: 'mcldoctor',
        doctorName: 'mcl',
        taskQuantity: '23',
        completedQuantity: '0',
        completedProgress: '0',
      },
    ];

    const columnsConfig = [
      {
        title: '医生姓名',
        field: 'doctorName',
        width: '30%',
      },
      {
        title: '任务数量',
        field: 'taskQuantity',
        width: '10%',
      },
    ];

    const { createTable } = useTablePrint({
      data: testData,
      columnsConfig,
    });

    const table = createTable(testData, columnsConfig);

    expect(table).toContain('<table class="print-item-table">');
    expect(table).toContain('医生姓名');
    expect(table).toContain('mcl');
    expect(table).toContain('</table>');
  });

  test('should apply formatter correctly', () => {
    const testData = [
      {
        doctorNo: 'mcldoctor',
        doctorName: 'mcl',
        taskQuantity: '23',
        completedQuantity: '0',
        completedProgress: '50',
      },
    ];

    const columnsConfig = [
      {
        title: '完成进度',
        field: 'completedProgress',
        width: '30%',
        formatter: (value: string) => `${value}%`,
      },
    ];

    const { createTable } = useTablePrint({
      data: testData,
      columnsConfig,
    });

    const table = createTable(testData, columnsConfig);
    expect(table).toContain('50%');
  });

  test('should create print container and trigger print', () => {
    vi.spyOn(window, 'print').mockImplementation(() => {});

    const testData = [
      {
        doctorNo: 'mcldoctor',
        doctorName: 'mcl',
        taskQuantity: '23',
        completedQuantity: '0',
        completedProgress: '0',
      },
    ];

    const columnsConfig = [
      {
        title: '医生姓名',
        field: 'doctorName',
        width: '30%',
      },
    ];

    const { printTable } = useTablePrint({
      data: testData,
      columnsConfig,
    });

    printTable();

    // 验证window.print被调用
    expect(window.print).toHaveBeenCalled();

    // 验证打印容器已被移除
    const container = document.getElementById('print-container');
    expect(container).toBeNull();
  });
});
