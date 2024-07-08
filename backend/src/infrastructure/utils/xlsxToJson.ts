import * as XLSX from "xlsx";

const convertXlsxToJson = (file: Express.Multer.File): any => {
  // Read the file buffer
  const workbook = XLSX.read(file.buffer, { type: "buffer" });

  // Get the first sheet name
  const sheetName = workbook.SheetNames[0];

  // Get the first sheet
  const sheet = workbook.Sheets[sheetName];

  // Convert sheet to JSON
  const jsonData = XLSX.utils.sheet_to_json(sheet);

  return jsonData;
};

export { convertXlsxToJson };
