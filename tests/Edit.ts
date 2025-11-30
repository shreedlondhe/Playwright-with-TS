import ExcelJS from "exceljs";



async function updateCell() {
  const workbook = new ExcelJS.Workbook();
  await workbook.xlsx.readFile("C:\\Users\\Admin\\Downloads\\6291_Bid_Form.xlsx");

  const sheet1 = workbook.getWorksheet("Overview");

  if (!sheet1) {
    throw new Error("Worksheet 'Overview' not found");
  }

  // Set value in D19
  sheet1.getCell("D19").value = 500;

  const sheet2 = workbook.getWorksheet("Product Details");

  if (!sheet2) {
    throw new Error("Worksheet 'Product Details' not found");
  }


   sheet2.getCell("P3").value = 500;
  sheet2.getCell("P4").value = 500;
  sheet2.getCell("Q3").value = 500;
  sheet2.getCell("Q4").value = 500;

  await workbook.xlsx.writeFile("C:\\Users\\Admin\\Downloads\\6291_Bid_Form.xlsx");

  console.log("Successfully updated D19 = 500");
}
updateCell();
