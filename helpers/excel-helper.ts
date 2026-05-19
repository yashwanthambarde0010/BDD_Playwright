import ExcelJS from 'exceljs';

export interface ExcelRow {
  [key: string]: string;
}

export class ExcelHelper {
  async readSheet(filePath: string, sheetName: string): Promise<ExcelRow[]> {
    const workbook = new ExcelJS.Workbook();
    await workbook.xlsx.readFile(filePath);
    const sheet = workbook.getWorksheet(sheetName);
    if (!sheet) {
      throw new Error(`Excel sheet not found: ${sheetName}`);
    }

    const rows: ExcelRow[] = [];
    const headerRow = sheet.getRow(1);
    const headerValues = Array.isArray(headerRow.values) ? headerRow.values.slice(1) : [];
    const headers = headerValues.map((cellValue) => String(cellValue || '').trim());

    sheet.eachRow((row, index) => {
      if (index === 1) return;
      const rowData: ExcelRow = {};
      const rowValues = Array.isArray(row.values) ? row.values.slice(1) : [];
      rowValues.forEach((cellValue, cellIndex) => {
        rowData[headers[cellIndex]] = cellValue ? String(cellValue).trim() : '';
      });
      rows.push(rowData);
    });

    return rows;
  }
}
