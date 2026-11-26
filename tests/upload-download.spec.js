import {test, expect} from '@playwright/test';
const ExcelJs = require('exceljs');

async function writeExcelTest(searchText,replacedText,change,filePath)
{

    const Workbook = new ExcelJs.Workbook();
    await Workbook.xlsx.readFile(filePath);
    const worksheet = Workbook.getWorksheet('Sheet1');
    const output = await readExcel(worksheet, searchText);
    
    const cell = worksheet.getCell(output.row, output.column+change.colChange);
    cell.value = replacedText;
    await Workbook.xlsx.writeFile(filePath);

}

async function readExcel(worksheet, searchText)
{
    let output = {
        row: -1,
        column: -1
    };

    worksheet.eachRow((row,rowNumber) =>
    {
        row.eachCell((cell, colNumber) =>
        {
            if(cell.value === searchText)
            {
                output.row=rowNumber;
                output.column=colNumber;
            }
        })
    })
    return output;
}


//writeExcelTest("Mango", 300, {rowChange:0, colChange:2}, "C:\\Users\\HP\\Downloads\\excelDownloadT.xlsx");




test("Upload & Download Excel validation", async({page})=>{

    const textSearch = "Banana";
    const updateValue = '200';
    const filePath = "C:\\Users\\HP\\Downloads\\download.xlsx";

    await page.goto("https://rahulshettyacademy.com/upload-download-test/index.html");

    const downloadPromise = page.waitForEvent('download');
    await page.getByRole('button', {name: 'Download'}).click();
    const download = await downloadPromise;

    // Save the downloaded Excel file
    await download.saveAs(filePath);

    await writeExcelTest(textSearch, updateValue, {rowChange:0, colChange:2}, filePath);

    await page.locator("#fileinput").click();
    await page.locator("#fileinput").setInputFiles(filePath);

    const textLocator = page.getByText(textSearch);
    const desiredRow = await page.getByRole('row').filter({has: textLocator});

    await expect(desiredRow.locator("#cell-4-undefined")).toContainText(updateValue);

});