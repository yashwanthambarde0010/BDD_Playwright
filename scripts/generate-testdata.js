const ExcelJS = require('exceljs');
const path = require('path');
const fs = require('fs');

(async () => {
  const testDataDir = path.join(process.cwd(), 'test-data');
  if (!fs.existsSync(testDataDir)) {
    fs.mkdirSync(testDataDir, { recursive: true });
  }

  const workbook = new ExcelJS.Workbook();
  const sheet = workbook.addWorksheet('LoginData');
  sheet.addRow(['username', 'password', 'expectedUrlContains']);
  sheet.addRow(['testuser@example.com', 'Password123', 'way2automation.com']);
  const filePath = path.join(testDataDir, 'testdata.xlsx');
  await workbook.xlsx.writeFile(filePath);
  console.log('Created', filePath);
})();
