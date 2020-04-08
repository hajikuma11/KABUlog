function testFunction() {
  const spreadsheet = SpreadsheetApp.openById('1HKcsDHTRnDkLbTA0Mw6dO0LiIqShql-Am6tznbLLuGI');
  const kabdata = spreadsheet.getSheetByName('kabdata');
  const userdata = spreadsheet.getSheetByName('userdata');
  userid = 'test';
  kabLastColumn = lastColumn(kabdata, 1);
  console.log(kabLastColumn);
    kabLastColumn++;
  console.log(kabLastColumn);
//    kabdata.getRange(toAlphabet(kabLastColumn) + "1").setValue(userid);
//    userdata.getRange(toAlphabet(kabLastColumn) + "1").setValue(userid);
  console.log(toAlphabet(kabLastColumn) + "1");
}

