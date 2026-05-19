import fs from 'fs';
import path from 'path';

export class JsonHelper {
  static readJson<T = any>(relativeFilePath: string): T {
    const absolutePath = path.resolve(relativeFilePath);
    if (!fs.existsSync(absolutePath)) {
      throw new Error(`JSON file not found: ${absolutePath}`);
    }

    const raw = fs.readFileSync(absolutePath, 'utf-8');
    return JSON.parse(raw) as T;
  }

  static writeJson(
    relativeFilePath: string,
    data: unknown,
    spacing = 2
  ): void {
    const absolutePath = path.resolve(relativeFilePath);
    const json = JSON.stringify(data, null, spacing);
    fs.writeFileSync(absolutePath, json, 'utf-8');
  }

  static updateJson<T = any>(
    relativeFilePath: string,
    updates: Partial<T>
  ): T {
    const original = this.readJson<T>(relativeFilePath);
    const updated = {
      ...original,
      ...updates
    };
    this.writeJson(relativeFilePath, updated);
    return updated as T;
  }

  static hasFile(relativeFilePath: string): boolean {
    const absolutePath = path.resolve(relativeFilePath);
    return fs.existsSync(absolutePath);
  }
}

export default JsonHelper;
