/**
 * 『GASでLINEbotを作る』
 * https://qiita.com/ttexan/items/749bed9a60313e51b4c8
 * 参考にさせていただいた記事
 */

/**
 * 送られてきたメッセージを処理してポストする関数
 * @param e POSTされたデータ
 */
function doPost(e) {
  /**
   * POSTデータのメイン要素
   */
  const event = JSON.parse(e.postData.contents).events[0];
  console.info(event);
  const replyToken= event.replyToken;
  const userId = event.source.userId;
  
  if (event.type == 'unfollow') {
    signOut(userId);
    console.log('test');
  }
  
  // エラー処理
  if (typeof replyToken === 'undefined') {
    return;
  }
  
  const nickname = getUserProfile(userId);

  // ユーザーにbotがフォローされた場合に起きる処理
  //  if(event.type == 'follow') {
  //  }
  
  if(event.type == 'message') {
    //基本はオウム返し、特定の言葉で異なった処理を行う。
    let replyMessages = ['','',''];
    const userMessage = event.message.text;
    replyMessages[0] = userMessage + 'だに～';
    
    switch (true) {
      case /signup/.test(userMessage):
        if (signUp(userId)) {
          replyMessages[0] = '登録しただに～';
        } else {
          replyMessages[0] = '登録失敗だに～';
        }
      break;

      case /[0-9０-９]+[ベル 円 ドル]$/.test(userMessage):
        if (kabValReg(userId,userMessage.replace(/[^0-9]/g, ''))) {
          replyMessages[0] = userMessage + "を登録しただに～";
          replyMessages[1] = "カブ　カブ　あがれ～";
        } else {
          replyMessages[0] = "登録失敗だに～";
          replyMessages[1] = "ユーザー登録はしただに？\nユーザー登録には「signup」と送ってほしいだに";
        }
      break;

      case /reference/.test(userMessage):
        const data = referenceData(userId);
    }

    //replyMessagesの数によってmessagesを作成

    const url = 'https://api.line.me/v2/bot/message/reply';
    let messages = [];
    replyMessages.forEach(msg => {
      if (msg != '') {
        messages.push({'type':'text','text':msg});
      }
    });

    UrlFetchApp.fetch(url, {
      'headers': {
        'Content-Type': 'application/json; charset=UTF-8',
        'Authorization': 'Bearer ' + CHANNEL_ACCESS_TOKEN,
      },
      'method': 'post',
      'payload': JSON.stringify({
        'replyToken': replyToken,
        'messages': messages,
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
