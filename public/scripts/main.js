
console.log('Hello')

var xhr = new XMLHttpRequest()

function myAjax() {
  
  post_length = document.querySelectorAll(".post").length;

  xhr.open('get', '/ajax/dev?read_first_num=' + post_length)
  xhr.send()

  // 通信中
  if (xhr.readyState === XMLHttpRequest.OPENED) {
    console.log("通信中...")

    // ロードアニメーションを起動するための、クラス付与
    obj = document.getElementById('target')
    obj.setAttribute('class', 'loading-animation')
  }

  xhr.onreadystatechange = function () {

    // 通信完了
    if (xhr.readyState === 4) {
      if (xhr.status === 200) {
        
        res = JSON.parse(xhr.responseText)
        // 受けったresで表示内容を更新
        reDraw_posts(res)
        
        // console.log(res); // dev

        // ロードアニメーションのクラスを消す
        obj.removeAttribute('class')
      }
    }
  };
}

function reDraw_posts(res) {
  parent = document.getElementById('home')
  
  content = ""
  for (var i = 0; i < res.length; i++) {
    content += ""
    + "<div class='post'>"
    +   "<div class='post_img'>"
    +     "<img src='/images/" + res[i]['slide_num'] + ".jpg'>"
    +   "</div>"
    +   "<div class='post_content'>"
    +     "<div class='img_title'>"
    +       "<p>" + res[i]['title'] + "</p>"
    +     "</div>"
    +     "<div class='description'>"
    +       "<p>" + res[i]['content'] + "</p>"
    +     "</div>"
    +   "</div>"
    + "</div>"
  }
  
  parent.innerHTML += content
  
}

// 初回起動
window.onload = function() {
  myAjax();
}

window.addEventListener('scroll', () => {

  // 通信中でなければ
  if (xhr.readyState !== 3) {

    var window_height = document.documentElement.scrollHeight; // ページ全体の高さ
    var scroll_height = window.pageYOffset; // 現在のスクロール位置
    var difference = window_height - scroll_height;

    // console.log("s: " + scroll_height)
    // console.log("w: " + window_height)
    // console.log("d: " + difference)
    if (difference < 800) {
    // if (difference < 750) {
      // console.log("画面下");
      myAjax();
    } else {
      // console.log('画面');
    }

  }
}, false);
