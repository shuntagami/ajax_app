function memo() {
  const submit = document.getElementById("submit");
  submit.addEventListener("click", (e) => {
    fetch("/posts", {
      method: "POST",
      body: new FormData(document.getElementById("form")),
    }).then(response => {
      // エラーレスポンスが返されたことを検知する
      if (!response.ok) {
          console.error("エラーレスポンス", response);
      } else {
        return response.json().then(item => {
          const list = document.getElementById("list");
          const formText = document.getElementById("content");
          const HTML = escapeHTML`
          <div class="post" data-id=${item.post.id}>
            <div class="post-date">
              投稿日時：${item.post.created_at}
            </div>
            <div class="post-content">
              ${item.post.content}
            </div>
          </div>
            `;
            // HTMLの挿入
          list.insertAdjacentHTML("afterend", HTML);
          formText.value = "";
        });
      }
    // HTTP通信に失敗した時（例外処理）
    }).catch(error => {
      console.error(error);
      });
    e.preventDefault();
  });
}
document.addEventListener("DOMContentLoaded", memo);

function escapeSpecialChars(str) {
  return str
  .replace(/&/g, "&amp;")
  .replace(/</g, "&lt;")
  .replace(/>/g, "&gt;")
  .replace(/"/g, "&quot;")
  .replace(/'/g, "&#039;");
}

function escapeHTML(strings, ...values) {
  return strings.reduce((result, str, i) => {
    const value = values[i - 1];
    if (typeof value === "string") {
        return result + escapeSpecialChars(value) + str;
    } else {
        return result + String(value) + str;
    }
  });  
}


// XMLHttpRequesで上記と同じ実装 
// function memo() {
//  const submit = document.getElementById("submit");
//  submit.addEventListener("click", (e) => {
//    const formData = new FormData(document.getElementById("form"));
//    const XHR = new XMLHttpRequest();
//    XHR.open("POST", "/posts", true);
//    XHR.responseType = "json";
//    XHR.send(formData);
//    XHR.onload = () => {
//      if (XHR.status != 200) {
//        alert(`Error ${XHR.status}: ${XHR.statusText}`);
//        return null;
//      }
//      console.log(XHR.response);
//      const item = XHR.response.post;
//      console.log(item);
//      const list = document.getElementById("list");
//      const formText = document.getElementById("content");
//      const HTML = `
//        <div class="post" data-id=${item.id}>
//          <div class="post-date">
//            投稿日時：${item.created_at}
//          </div>
//          <div class="post-content">
//          ${item.content}
//          </div>
//        </div>`;
//      list.insertAdjacentHTML("afterend", HTML);
//      formText.value = "";
//    };
//    e.preventDefault();
//  });
// }
// window.addEventListener("load", memo);