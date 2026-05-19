import path from 'path';
import { JsonHelper } from './jsonHelper';
import { ExcelHelper } from './excel-helper';

export class TestDataHelper {
  static async loadJson<T = any>(relativeFilePath: string): Promise<T> {
    const absolutePath = path.resolve(relativeFilePath);
    return JsonHelper.readJson<T>(absolutePath);
  }

  static async loadExcelSheet(
    relativeFilePath: string,
    sheetName: string
  ): Promise<Record<string, string>[]> {
    const absolutePath = path.resolve(relativeFilePath);
    const excelHelper = new ExcelHelper();
    return excelHelper.readSheet(absolutePath, sheetName);
  }

  static findByKey<T = any>(
    data: T[],
    key: keyof T,
    value: unknown
  ): T | undefined {
    return data.find((item) => item[key] === value);
  }

  static getValue<T = any, K extends keyof T = keyof T>(
    data: T,
    key: K,
    defaultValue?: T[K]
  ): T[K] | undefined {
    return data[key] ?? defaultValue;
  }
}

export default TestDataHelper;
