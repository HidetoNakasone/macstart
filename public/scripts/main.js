
console.log('Hello')

var xhr = new XMLHttpRequest()

function myAjax() {
  
  post_length = document.querySelectorAll(".post").length;

  xhr.open('get', '/ajax/dev?read_first_num=' + post_length)
  xhr.send()

  xhr.onreadystatechange = function () {
    if (xhr.readyState === 4) {
      if (xhr.status === 200) {
        
        res = JSON.parse(xhr.responseText)
        // 受けったresで表示内容を更新
        reDraw_posts(res)
        
        // console.log(res); // dev
        
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
    +     "<img src='/images/" + res[i]['slide_num'] + ".png'>"
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

window.addEventListener('scroll', () => {
  if (xhr.readyState !== 3) {

    var window_height = document.documentElement.scrollHeight; // ページ全体の高さ
    var scroll_height = window.pageYOffset; // 現在のスクロール位置
    var difference = window_height - scroll_height;

    // console.log("s: " + scroll_height)
    // console.log("w: " + window_height)
    // console.log("d: " + difference)
    if (difference < 760) {
      // console.log("画面下");
      myAjax();
    } else {
      // console.log('画面');
    }

  }
}, false);