
import TestUtils from "./TestUtils.ts"; import path from 'path'
import ExcelJS from "exceljs";
import { filePaths } from "./FilePath.ts";
import { log } from "./Logger.ts";

export class dynamicData {

  static noOFRows: number = 0;
  static columns: string[] = [
    'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O'
  ];

  static async dataFiller(path: string) {
    log("Started Editing Bid Form")
    this.noOFRows = TestUtils.getRandomInRange(5, 20) - 3;
    log(`Master sheet location: ${filePaths.masterSheet}`);
    log(`Added data for number of rows: ${this.noOFRows} from master sheet`);

    const workbook = new ExcelJS.Workbook();
    await workbook.xlsx.readFile(path);
    const sheet1 = workbook.getWorksheet("Product Details");
    if (!sheet1) {
      throw new Error("Worksheet 'Product Details' not found");
    }
    const sheet2 = workbook.getWorksheet("Overview");
    if (!sheet2) {
      throw new Error("Worksheet 'Overview' not found");
    }
    sheet2.getCell("D7").value = TestUtils.getFullName();
    sheet2.getCell("D8").value = TestUtils.getAddress();
    sheet2.getCell("D9").value = "Singapore";
    sheet2.getCell("D10").value = "2026/12/12";
    sheet2.getCell("D16").value = TestUtils.getStatement();

    for (let i = 0; i < this.columns.length; i++) {
      for (let k = 3; k <= this.noOFRows; k++) {
        if (this.columns[i] === 'A') {
          sheet1.getCell(`${this.columns[i]}${k}`).value = (await TestUtils.readExcelAndGetData('Product Details', filePaths.masterSheet)).getCell(`A${TestUtils.getRandomInRange(3, 21)}`).value
        }
        if (this.columns[i] === 'B') {
          sheet1.getCell(`${this.columns[i]}${k}`).value = (await TestUtils.readExcelAndGetData('Product Details', filePaths.masterSheet)).getCell(`B${TestUtils.getRandomInRange(3, 21)}`).value
        }
        if (this.columns[i] === 'C') {
          sheet1.getCell(`${this.columns[i]}${k}`).value = (await TestUtils.readExcelAndGetData('Product Details', filePaths.masterSheet)).getCell(`C${TestUtils.getRandomInRange(3, 21)}`).value
        }
        if (this.columns[i] === 'D') {
          sheet1.getCell(`${this.columns[i]}${k}`).value = (await TestUtils.readExcelAndGetData('Product Details', filePaths.masterSheet)).getCell(`D${TestUtils.getRandomInRange(3, 21)}`).value
        }
        if (this.columns[i] === 'E') {
          sheet1.getCell(`${this.columns[i]}${k}`).value = (await TestUtils.readExcelAndGetData('Product Details', filePaths.masterSheet)).getCell(`E${TestUtils.getRandomInRange(3, 21)}`).value
        }
        if (this.columns[i] === 'F') {
          sheet1.getCell(`${this.columns[i]}${k}`).value = (await TestUtils.readExcelAndGetData('Product Details', filePaths.masterSheet)).getCell(`F${TestUtils.getRandomInRange(3, 21)}`).value
        }
        if (this.columns[i] === 'G') {
          sheet1.getCell(`${this.columns[i]}${k}`).value = (await TestUtils.readExcelAndGetData('Product Details', filePaths.masterSheet)).getCell(`G${TestUtils.getRandomInRange(3, 21)}`).value
        }
        if (this.columns[i] === 'H') {
          sheet1.getCell(`${this.columns[i]}${k}`).value = (await TestUtils.readExcelAndGetData('Product Details', filePaths.masterSheet)).getCell(`H${TestUtils.getRandomInRange(3, 21)}`).value
        }
        if (this.columns[i] === 'I') {
          sheet1.getCell(`${this.columns[i]}${k}`).value = (await TestUtils.readExcelAndGetData('Product Details', filePaths.masterSheet)).getCell(`I${TestUtils.getRandomInRange(3, 21)}`).value
        }
        if (this.columns[i] === 'J') {
          sheet1.getCell(`${this.columns[i]}${k}`).value = (await TestUtils.readExcelAndGetData('Product Details', filePaths.masterSheet)).getCell(`J${TestUtils.getRandomInRange(3, 21)}`).value
        }
        if (this.columns[i] === 'K') {
          sheet1.getCell(`${this.columns[i]}${k}`).value = (await TestUtils.readExcelAndGetData('Product Details', filePaths.masterSheet)).getCell(`K${TestUtils.getRandomInRange(3, 21)}`).value
        }
        if (this.columns[i] === 'L') {
          sheet1.getCell(`${this.columns[i]}${k}`).value = (await TestUtils.readExcelAndGetData('Product Details', filePaths.masterSheet)).getCell(`L${TestUtils.getRandomInRange(3, 21)}`).value
        }
        if (this.columns[i] === 'M') {
          sheet1.getCell(`${this.columns[i]}${k}`).value = (await TestUtils.readExcelAndGetData('Product Details', filePaths.masterSheet)).getCell(`M${TestUtils.getRandomInRange(3, 21)}`).value
        }
        if (this.columns[i] === 'N') {
          sheet1.getCell(`${this.columns[i]}${k}`).value = (await TestUtils.readExcelAndGetData('Product Details', filePaths.masterSheet)).getCell(`N${TestUtils.getRandomInRange(3, 21)}`).value
        }
        if (this.columns[i] === 'O') {
          sheet1.getCell(`${this.columns[i]}${k}`).value = (await TestUtils.readExcelAndGetData('Product Details', filePaths.masterSheet)).getCell(`O${TestUtils.getRandomInRange(3, 21)}`).value
        }
      }
    }
    await workbook.xlsx.writeFile(path);
    log("Completed Editing Bid Form")

  }

}



