document.addEventListener('DOMContentLoaded', () =>  {
  const submit = document.getElementById("submit");
  submit.addEventListener("click", (e) => {
    // formDataはfomrで入力された値を取得するオブジェクト
    const formData = new FormData(document.getElementById("form"));
    // コントローラーへのリクエスト？
    const XHR = new XMLHttpRequest();
    // ①/items/:item_id/commentsのようになったときは？(商品に対するコメント)
    XHR.open("POST", "/posts", true);
    XHR.responseType = "json";
    // リクエストサーバーに送信
    
    XHR.send(formData);
    console.log(formData);
    // 応答に対するイベント
    XHR.onload = () => {
      // console.log(this);
      if (XHR.status != 200) {
        alert(`Error ${XHR.status}: ${XHR.statusText}`);
        return null;
      }
      // ②コントローラーからのレスポンスをitemという変数に代入
      const item = XHR.response.post;
      // console.log(XHR.response)
      const list = document.getElementById("list");
      const formText = document.getElementById("content");
      const HTML = `
        <div class="post" data-id=${item.id}>
          <div class="post-date">
            投稿日時：${item.created_at}
          </div>
          <div class="post-content">
          ${item.content}
          </div>
        </div>`;
      list.insertAdjacentHTML("afterend", HTML);
      formText.value = "";
    };
    e.preventDefault();
  });
 });