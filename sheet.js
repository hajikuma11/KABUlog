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
  return sheet.getRange(rowNum, rowNum).getNextDataCell(SpreadsheetApp.Direction.NEXT).getColumn();
}

/**
 * 指定した列の最終行を返す関数
 * @param {number} colNum 列を指定する値
 * @param sheet 操作するシート
 * @returns 最終行の数値
 */
function lastRow (sheet,colNum) {
  return sheet.getRange(colNum, colNum).getNextDataCell(SpreadsheetApp.Direction.DOWN).getRow();
}

/**
 * 数値をスプレッドシートの列番号に対応したアルファベットに変換
 * @param {number} anum 変換する数値
 * @param {string} aalp 変換後の文字列
 */
function toAlphabet (anum) {
  anum = anum - 1;
  let alp = "";
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