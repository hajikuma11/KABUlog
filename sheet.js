const spreadsheet = SpreadsheetApp.openById('1HKcsDHTRnDkLbTA0Mw6dO0LiIqShql-Am6tznbLLuGI');
const kabdata = spreadsheet.getSheetByName('kabdata');
const userdata = spreadsheet.getSheetByName('userdata');

/**
 * 指定した行の最終列を返す関数
 * @param {number} rowNum 行を指定する値
 * @param sheet 操作するシート
 * @returns 最終列の数値
 */
function lastColumn (sheet,rowNum) {
  const lastCell = sheet.getRange(rowNum,1).getNextDataCell(SpreadsheetApp.Direction.NEXT);
  vals = Object.values(lastCell.getValues());
  if (vals[0] == '') {
    if (!sheet.getRange(rowNum,1).getValue()) {
      return 0;
    } else {
      return 1;
    }
  } else {
    return sheet.getRange(rowNum, 1).getNextDataCell(SpreadsheetApp.Direction.NEXT).getColumn();
  }
}

/**
 * 指定した列の最終行を返す関数
 * @param {number} colNum 列を指定する値
 * @param sheet 操作するシート
 * @returns 最終行の数値
 */
function lastRow (sheet,colNum) {
  const lastCell = sheet.getRange(1, colNum).getNextDataCell(SpreadsheetApp.Direction.DOWN);
  vals = Object.values(lastCell.getValues());
  if (vals[0] == '') {
    if (!sheet.getRange(1, colNum).getValue()) {
      return 0;
    } else {
      return 1;
    }
  } else {
    return sheet.getRange(1, colNum).getNextDataCell(SpreadsheetApp.Direction.DOWN).getRow();
  }
  
}

/**
 * 数値をスプレッドシートの列番号に対応したアルファベットに変換
 * @param {number} anum 変換する数値
 * @param {string} aalp 変換後の文字列
 */
function toAlphabet (anum) {
  anum = anum - 1;
  let aalp = "";
  let a = 0;
  let b = 0;

  a = parseInt((anum / 26), 10);
  b = anum - (a * 26);
  if(a > 0) {
    aalp = String.fromCharCode(a + 64);
  }
  if(b >= 0) {
    aalp = aalp + String.fromCharCode(b + 65);
  }
  return aalp;
}

/**
 * スプレッドシートの列番号に対応したアルファベットを数値に変換
 * @param {string} nalp 変換後の文字列
 * @param {number} nnum 変換する数値
 */
function toNumber(nalp) {
  let nnum = 0;
  let ntmp = 0;
   
  nalp = nalp.toUpperCase();
  for (i = nalp.length - 1;i >= 0;i--) {
    ntmp = nalp.charCodeAt(i) - 65;
    if(i != nalp.length - 1) {
      tmp = (tmp + 1) * Math.pow(26,(i + 1));
    }
    nnum = nnum + tmp;
  }
  return nnum + 1;
}

/**
 * シートにIDを登録
 * @param userid ユーザーID
 * @returns true:登録成功, false:登録失敗
 */
function signUp(userid) {
  let kabLastColumn = lastColumn(kabdata, 1);
  const vals = kabdata.getRange("A1:"+ toAlphabet(kabLastColumn) +"1").getValues();
  const num = vals[0].indexOf(userid);

  if (num == -1) {
    kabdata.insertColumnAfter(kabLastColumn);
    userdata.insertColumnAfter(kabLastColumn);
    kabLastColumn++;
    kabdata.getRange(toAlphabet(kabLastColumn) + "1").setValue(userid);
    userdata.getRange(toAlphabet(kabLastColumn) + "1").setValue(userid);
    return true;
  } else {
    return false;
  }
}

/**
 * シートから指定したIDのデータを削除
 * @param {string} userid ユーザーID
 */
function signOut(userid) {
  const targetRange = kabdata.getRange("A1:"+ toAlphabet(lastColumn(kabdata, 1)) +"1").getValues();
  const num = targetRange[0].indexOf(userid);
  kabdata.deleteColumn(num+1);
  userdata.deleteColumn(num+1);
}

function kabValReg(userid,value) {
  const targetRange = kabdata.getRange("A1:"+ toAlphabet(lastColumn(kabdata, 1)) +"1").getValues();
  const num = targetRange[0].indexOf(userid) + 1;
  const lastNum = lastRow(kabdata, num);

  const alp = toAlphabet(num);
  if (lastNum == 29) {
    const range = kabdata.getRange(alp + "3:" + alp + "29").getValues();
    kabdata.getRange(alp + "2").clear();
    kabdata.getRange(alp + "2:" + alp + "28").setValues(range);
    kabdata.getRange(alp + "29").setValue(value);
    return 0;
  }
  if (lastNum < 2) {
    kabdata.getRange(alp + 2).setValue(value);
    return 0;
  }
  kabdata.getRange(alp + (lastNum+1)).setValue(value);
  return 0;
}