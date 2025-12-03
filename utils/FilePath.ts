import path from 'path'


export const filePaths = {

  // path for Bid form to be downloaded and edited
 fileToUpload : path.resolve('C:\\Users\\Admin\\Desktop\\PyxTech_Demo\\UploadForm.xlsx'),
   filePathForEdit: '',
   downloadPath: path.resolve('C:\\Users\\Admin\\Downloads\\VendorDownloads'),


// path for upload inventory intake form
     inventoryIntake : path.resolve('C:\\Users\\Admin\\Desktop\\PyxTech_Demo\\Input-template.xlsx'),
     chooseFilePath :"//input[@type='file' and contains(@accept,'.xlsx, .xls')]"

   
};