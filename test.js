function testFunction() {
  const spreadsheet = SpreadsheetApp.openById('1HKcsDHTRnDkLbTA0Mw6dO0LiIqShql-Am6tznbLLuGI');
  const kabdata = spreadsheet.getSheetByName('kabdata');
  const userdata = spreadsheet.getSheetByName('userdata');
  
  const label = 'time';
  console.time(label);
  const targetRange = userdata.getRange("A1:F1").getValues();
  const num = targetRange[0].indexOf('dummy5');
  userdata.deleteColumn(num+1);
  console.timeEnd(label);
  
//  const targetRange = userdata.getRange("A1:U1");
//  targetRange.activate();
//  const finder = targetRange.createTextFinder('dummy10');
//  const cnt = finder.replaceAllWith("");
}

