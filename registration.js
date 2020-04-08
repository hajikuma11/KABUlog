/**
 * シートにIDと初期データを登録
 * @param userid ユーザーID
 * @returns true:登録成功, false:登録失敗
 */
function signUp(userid) {
  kabLastColumn = lastColumn(kabdata, 1);

  if (kabLastColumn == lastColumn(userdata, 1)) {
    kabLastColumn++;
    kabdata.getRange(toAlphabet(kabLastColumn) + "1").setValue(userid);
    userdata.getRange(toAlphabet(kabLastColumn) + "1").setValue(userid);
    return true;
  } else {
    return false;
  }
}