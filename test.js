function testFunction() {
  const spreadsheet = SpreadsheetApp.openById('1HKcsDHTRnDkLbTA0Mw6dO0LiIqShql-Am6tznbLLuGI');
  const kabdata = spreadsheet.getSheetByName('kabdata');
  const userdata = spreadsheet.getSheetByName('userdata');
  
  const label = 'time';
  console.time(label);
  const userid = "U813df51ee88c3bc92299dfe1a5add465";
  const value = 777;
  const sheet = kabdata;
  const colNum = 3;
  const lastCell = sheet.getRange(1, colNum).getNextDataCell(SpreadsheetApp.Direction.NEXT);
  vals = Object.values(lastCell.getValues());
  console.log(vals);
  if (vals[0] == '') {
    if (!sheet.getRange(1, colNum).getValue()) {
      console.log(0);
    } else {
      console.log(1);
    }
  } else {
      console.log(sheet.getRange(1, colNum).getNextDataCell(SpreadsheetApp.Direction.DOWN).getRow());
  }
  console.timeEnd(label);
  
//  const targetRange = userdata.getRange("A1:U1");
//  targetRange.activate();
//  const finder = targetRange.createTextFinder('dummy10');
//  const cnt = finder.replaceAllWith("");
}