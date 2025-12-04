import TestUtils from "../utils/TestUtils";
import {productTypes,manufacturers,modelNumbers,productQuantities,functionalConditionalGrades,modelYears,processorTypes,processorQuantities,memoryTypeSizes,memoryQuantities,driveTypes,driveSize,driveQuantities,gpuTypeSizes,gpuQuantity} from "../utils/dynamicDataStore";
import path from 'path'
import ExcelJS from "exceljs";
import { filePaths } from "../utils/FilePath.ts";




export class dynamicData {

  //static constFilePath = path.resolve("C:\\Users\\Admin\\Desktop\\inventory_form\\Input.xlsx");

  static alphabets: string[] = [
    'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O'
  ];

  static async iterateAlphabets(path:string) {
console.log("inside inventory form edit section")

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
sheet2.getCell("D7").value =TestUtils.getFullName();
sheet2.getCell("D8").value =TestUtils.getAddress();
sheet2.getCell("D9").value ="Singapore";
sheet2.getCell("D10").value ="2025/12/12";
sheet2.getCell("D16").value =TestUtils.getStatement();

    for (let i = 0; i < this.alphabets.length; i++) {
     for (let k = 3; k < 13; k++) {
if (this.alphabets[i] === 'A') {
    sheet1.getCell(`${this.alphabets[i]}${k}`).value = productTypes[TestUtils.getRandomInRange(1, 10)];
}
if (this.alphabets[i] === 'B') {
         sheet1.getCell(`${this.alphabets[i]}${k}`).value = manufacturers[TestUtils.getRandomInRange(1, 10)];
}
 if (this.alphabets[i] === 'C') {
    sheet1.getCell(`${this.alphabets[i]}${k}`).value = modelNumbers[TestUtils.getRandomInRange(1, 10)];
}
if (this.alphabets[i] === 'D') {
          sheet1.getCell(`${this.alphabets[i]}${k}`).value = productQuantities[TestUtils.getRandomInRange(1, 10)];
}
if (this.alphabets[i] === 'E') {
          sheet1.getCell(`${this.alphabets[i]}${k}`).value = functionalConditionalGrades[TestUtils.getRandomInRange(1, 10)];
}
if (this.alphabets[i] === 'F') {
          sheet1.getCell(`${this.alphabets[i]}${k}`).value = modelYears[TestUtils.getRandomInRange(1, 10)];
}
if (this.alphabets[i] === 'G') {
          sheet1.getCell(`${this.alphabets[i]}${k}`).value = processorTypes[TestUtils.getRandomInRange(1, 10)];
}
if (this.alphabets[i] === 'H') {
          sheet1.getCell(`${this.alphabets[i]}${k}`).value = processorQuantities[TestUtils.getRandomInRange(1, 10)];
}
if (this.alphabets[i] === 'I') {
          sheet1.getCell(`${this.alphabets[i]}${k}`).value = memoryTypeSizes[TestUtils.getRandomInRange(1, 10)];
}
if (this.alphabets[i] === 'J') {
          sheet1.getCell(`${this.alphabets[i]}${k}`).value = memoryQuantities[TestUtils.getRandomInRange(1, 10)];
 }
if (this.alphabets[i] === 'K') {
          sheet1.getCell(`${this.alphabets[i]}${k}`).value = driveTypes[TestUtils.getRandomInRange(1, 10)];
}
if (this.alphabets[i] === 'L') {
          sheet1.getCell(`${this.alphabets[i]}${k}`).value = driveSize[TestUtils.getRandomInRange(1, 10)];
}
if (this.alphabets[i] === 'M') {
          sheet1.getCell(`${this.alphabets[i]}${k}`).value = driveQuantities[TestUtils.getRandomInRange(1, 10)];
}
if (this.alphabets[i] === 'N') {
          sheet1.getCell(`${this.alphabets[i]}${k}`).value = gpuTypeSizes[TestUtils.getRandomInRange(1, 10)];
}
if (this.alphabets[i] === 'O') {
          sheet1.getCell(`${this.alphabets[i]}${k}`).value = gpuQuantity[TestUtils.getRandomInRange(1, 10)];
}
 }
    }
     await workbook.xlsx.writeFile(path);
     console.log("Done with inventory form edit")
  }
  
}


//dynamicData.iterateAlphabets();



