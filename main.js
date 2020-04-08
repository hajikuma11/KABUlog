/**
 * 『GASでLINEbotを作る』
 * https://qiita.com/ttexan/items/749bed9a60313e51b4c8
 * 参考にさせていただいた記事
 */

/**
 * LINEのチャンネルアクセストークン
 * @type {string}
 */
const CHANNEL_ACCESS_TOKEN = 'ZXl3ygFenENGMEGBe8VBZYOvivh8DIhRib5Ocl6nINNjvDNlzSZ3vNmA9bT3sk1JMLuC1ognMTjOVX2XxVBVU373OpkTcXFOuZZIaomkLQbcpgkerRQVojLr2FwzOpAhkdz2LMoEGwPp6HSwEtcGEwdB04t89/1O/w1cDnyilFU=';

/**
 * 送られてきたメッセージを処理してポストする関数
 * @param e POSTされたデータ
 */
function doPost(e) {
  /**
   * POSTデータのメイン要素
   */
  const event = JSON.parse(e.postData.contents).events[0];
  const replyToken= event.replyToken;
  // エラー処理
  if (typeof replyToken === 'undefined') {
    return;
  }

  const userId = event.source.userId;
  const nickname = getUserProfile(userId);

  // ユーザーにbotがフォローされた場合に起きる処理
  if(event.type == 'follow') {
  }

  if (event.type == 'unfollow') {
    signOut(userID);
  }

  if(event.type == 'message') {
    //基本はオウム返し、特定の言葉で異なった処理を行う。
    const userMessage = event.message.text;
    let replyMessage = userMessage + 'だに～';
    if (userMessage == 'signup') {
      if (signUp(userId)) {
        replyMessage = '登録しただに～';
      } else {
        replyMessage = '登録失敗だに～';
      }
    }

    // もし届いたユーザーからのメッセージによって他にやりたい処理
    // (ex: spread sheetへの記入など)がある場合は、ここに入れて下さい。

    const url = 'https://api.line.me/v2/bot/message/reply';

    UrlFetchApp.fetch(url, {
      'headers': {
        'Content-Type': 'application/json; charset=UTF-8',
        'Authorization': 'Bearer ' + CHANNEL_ACCESS_TOKEN,
      },
      'method': 'post',
      'payload': JSON.stringify({
        'replyToken': replyToken,
        'messages': [{
          'type': 'text',
          'text': replyMessage,
        }],
      }),
    });
    return ContentService.createTextOutput(
      JSON.stringify({'content': 'post ok'})
    ).setMimeType(ContentService.MimeType.JSON);
  }
}

/**
 * ユーザーのプロフィールを取得する関数
 * @param userId ユーザーID
 */
function getUserProfile(userId){
  const url = 'https://api.line.me/v2/bot/profile/' + userId;
  const userProfile = UrlFetchApp.fetch(url,{
    'headers': {
      'Authorization' :  'Bearer ' + CHANNEL_ACCESS_TOKEN,
    },
  })
  return JSON.parse(userProfile).displayName;
}
