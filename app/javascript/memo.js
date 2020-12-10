document.addEventListener('DOMContentLoaded', () =>  {
  const submit = document.getElementById("submit");
  submit.addEventListener("click", (e) => {
  const formData = new FormData(document.getElementById("form"));
    fetch("/posts", {
      method: "POST",
      body: formData,
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
    }).catch(error => {
      console.error(error);
      });
    e.preventDefault();
  });
});

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