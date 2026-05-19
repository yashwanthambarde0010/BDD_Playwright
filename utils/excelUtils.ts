import * as XLSX from 'xlsx';
import path from 'path';

export class ExcelUtils {

  /**
   * Read complete sheet data
   */
  static async readExcel(
    filePath: string,
    sheetName: string
  ): Promise<any[]> {

    try {

      const resolvedPath = path.resolve(filePath);

      const workbook = XLSX.readFile(resolvedPath);

      const worksheet = workbook.Sheets[sheetName];

      if (!worksheet) {
        throw new Error(
          `Sheet "${sheetName}" not found`
        );
      }

      return XLSX.utils.sheet_to_json(worksheet);

    } catch (error) {

      console.error(
        'Error Reading Excel File:',
        error
      );

      throw error;
    }
  }

  /**
   * Get all sheet names
   */
  static async getSheetNames(
    filePath: string
  ): Promise<string[]> {

    const resolvedPath = path.resolve(filePath);

    const workbook = XLSX.readFile(resolvedPath);

    return workbook.SheetNames;
  }

  /**
   * Read specific row data
   */
  static async readRowData(
    filePath: string,
    sheetName: string,
    rowNumber: number
  ): Promise<any> {

    const data = await this.readExcel(
      filePath,
      sheetName
    );

    return data[rowNumber - 1];
  }

  /**
   * Read specific column data
   */
  static async readColumnData(
    filePath: string,
    sheetName: string,
    columnName: string
  ): Promise<any[]> {

    const data = await this.readExcel(
      filePath,
      sheetName
    );

    return data.map((row) => row[columnName]);
  }

  /**
   * Get total row count
   */
  static async getRowCount(
    filePath: string,
    sheetName: string
  ): Promise<number> {

    const data = await this.readExcel(
      filePath,
      sheetName
    );

    return data.length;
  }

  /**
   * Get total column count
   */
  static async getColumnCount(
    filePath: string,
    sheetName: string
  ): Promise<number> {

    const data = await this.readExcel(
      filePath,
      sheetName
    );

    if (data.length === 0) return 0;

    return Object.keys(data[0]).length;
  }

  /**
   * Read cell value
   */
  static async readCellValue(
    filePath: string,
    sheetName: string,
    rowNumber: number,
    columnName: string
  ): Promise<any> {

    const rowData = await this.readRowData(
      filePath,
      sheetName,
      rowNumber
    );

    return rowData?.[columnName];
  }

  /**
   * Convert sheet data to JSON
   */
  static async convertSheetToJSON(
    filePath: string,
    sheetName: string
  ): Promise<string> {

    const data = await this.readExcel(
      filePath,
      sheetName
    );

    return JSON.stringify(data, null, 2);
  }

  /**
   * Validate sheet exists
   */
  static async isSheetExists(
    filePath: string,
    sheetName: string
  ): Promise<boolean> {

    const sheets = await this.getSheetNames(filePath);

    return sheets.includes(sheetName);
  }

  /**
   * Read Excel data by key/value
   */
  static async getRowByColumnValue(
    filePath: string,
    sheetName: string,
    columnName: string,
    expectedValue: any
  ): Promise<any> {

    const data = await this.readExcel(
      filePath,
      sheetName
    );

    return data.find(
      (row) => row[columnName] === expectedValue
    );
  }

  /**
   * Read multiple sheets
   */
  static async readMultipleSheets(
    filePath: string
  ): Promise<Record<string, any[]>> {

    const resolvedPath = path.resolve(filePath);

    const workbook = XLSX.readFile(resolvedPath);

    const result: Record<string, any[]> = {};

    workbook.SheetNames.forEach((sheet: string) => {

      const worksheet = workbook.Sheets[sheet];

      result[sheet] =
        XLSX.utils.sheet_to_json(worksheet);
    });

    return result;
  }

  /**
   * Write data to Excel file
   */
  static async writeExcel(
    filePath: string,
    sheetName: string,
    data: any[]
  ): Promise<void> {

    const workbook = XLSX.utils.book_new();

    const worksheet =
      XLSX.utils.json_to_sheet(data);

    XLSX.utils.book_append_sheet(
      workbook,
      worksheet,
      sheetName
    );

    XLSX.writeFile(workbook, filePath);
  }

  /**
   * Append data to existing sheet
   */
  static async appendDataToSheet(
    filePath: string,
    sheetName: string,
    newData: any[]
  ): Promise<void> {

    const resolvedPath = path.resolve(filePath);

    const workbook = XLSX.readFile(resolvedPath);

    const existingSheet =
      workbook.Sheets[sheetName];

    const existingData =
      XLSX.utils.sheet_to_json(existingSheet);

    const updatedData = [
      ...existingData,
      ...newData
    ];

    const updatedSheet =
      XLSX.utils.json_to_sheet(updatedData);

    workbook.Sheets[sheetName] = updatedSheet;

    XLSX.writeFile(workbook, resolvedPath);
  }

  /**
   * Create new sheet
   */
  static async createSheet(
    filePath: string,
    sheetName: string,
    data: any[]
  ): Promise<void> {

    const workbook = XLSX.readFile(filePath);

    const worksheet =
      XLSX.utils.json_to_sheet(data);

    XLSX.utils.book_append_sheet(
      workbook,
      worksheet,
      sheetName
    );

    XLSX.writeFile(workbook, filePath);
  }

  /**
   * Delete sheet
   */
  static async deleteSheet(
    filePath: string,
    sheetName: string
  ): Promise<void> {

    const workbook = XLSX.readFile(filePath);

    delete workbook.Sheets[sheetName];

    workbook.SheetNames =
      workbook.SheetNames.filter(
        (sheet: string) => sheet !== sheetName
      );

    XLSX.writeFile(workbook, filePath);
  }
}

export default ExcelUtils;