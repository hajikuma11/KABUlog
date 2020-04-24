function testFunction() {
  const spreadsheet = SpreadsheetApp.openById('1HKcsDHTRnDkLbTA0Mw6dO0LiIqShql-Am6tznbLLuGI');
  const kabdata = spreadsheet.getSheetByName('kabdata');
  const userdata = spreadsheet.getSheetByName('userdata');
  
  const label = 'time';
  console.time(label);
  const res = referenceData('testid');
  console.timeEnd(label);
  
//  const targetRange = userdata.getRange("A1:U1");
//  targetRange.activate();
//  const finder = targetRange.createTextFinder('dummy10');
//  const cnt = finder.replaceAllWith("");
}