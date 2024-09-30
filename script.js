document
  .querySelector('a[href="#footer"]')
  .addEventListener("click", function (e) {
    e.preventDefault(); // 阻止默认锚点跳转行为
    window.scrollTo({ top: document.body.scrollHeight, behavior: "smooth" }); // 滚动到页面底部
  });


document.addEventListener("DOMContentLoaded", function () {
  const quoteButton = document.getElementById("quote-button");
  const article = document.querySelector("article");
  const headerBar = document.querySelector(".header-bar"); // 获取标题栏元素
  const video = document.getElementById("background-video"); // 获取视频元素

  // Initially hide the quote button, article, and header bar
  quoteButton.style.display = "none";



  // Function to show the quote button and later reveal the article and header bar
  function showQuote() {
    quoteButton.style.display = "block";
    quoteButton.style.opacity = "0";
    quoteButton.style.transition = "opacity 4s";
    quoteButton.style.opacity = "0.8";

    setTimeout(function () {
      quoteButton.style.opacity = "0";
      quoteButton.style.transition = "opacity 2s"; // Faster fade out
      setTimeout(function () {
        quoteButton.style.display = "none";
        showArticleAndHeader(); // Show the article and header bar after the quote button fades out
      }, 1500); // Wait for the faster fade out before hiding the button
    }, 2200); // Wait for 3 seconds before starting to fade out
  }

  // Function to show the article and header bar with a fade-in effect and removing blur
  function showArticleAndHeader() {
    article.style.display = "block";
    article.style.transition = "opacity 2s, filter 2s";
    video.style.filter = 'blur(10px)'; // Video gradually becomes blurry
    video.style.transition = 'filter 2s'; // Smooth transition for video blur
    setTimeout(() => {
      article.style.filter = 'blur(0)'; // Gradually remove blur from the article
      article.style.opacity = "1"; // Gradually show article
    }, 1000); // Start removing blur and showing article after 1 second
  } 

  // Detect any user interaction
  function handleUserInteraction() {
    setTimeout(showQuote, 2000); // Wait for 3 seconds before showing the quote
    document.removeEventListener("click", handleUserInteraction);
    document.removeEventListener("touchend", handleUserInteraction);
  }

  document.addEventListener("click", handleUserInteraction);
  document.addEventListener("touchend", handleUserInteraction);
});

document.addEventListener("click", function () {
  let video = document.getElementById("background-video");
  if (video.paused) {
    video.play();
    video.style.opacity = "1";
    video.muted = false;
  }
});





        // 定义一个函数来检查标记和跳转
        function checkVisitor() {
            const currentTime = new Date().getTime();  // 获取当前时间戳
            const visitor = localStorage.getItem('visitor');  // 获取访问者标记
            const visitTime = localStorage.getItem('visitTime');  // 获取访问者的访问时间

            // 检查是否存在访问者标记
            if (visitor && visitTime) {
                // 计算访问时间与当前时间的差值，单位为毫秒
                const timeDifference = currentTime - visitTime;
                
                // 检查标记是否超过10分钟（10 * 60 * 1000 毫秒）
                if (timeDifference > 10 * 60 * 1000) {
                    // 如果标记已过期，移除标记并跳转到指定页面
                    localStorage.removeItem('visitor');
                    localStorage.removeItem('visitTime');
                    window.location.href = "https://ishortn.ink/AdwrZUg6T";  // 替换为你的跳转页面
                } else {
                    console.log('已标记的访问者，标记未过期，继续浏览页面');
                }
            } else {
                // 如果没有标记，则进行标记并记录当前访问时间
                localStorage.setItem('visitor', 'true');
                localStorage.setItem('visitTime', currentTime);
                console.log('新访问者，已标记');
                window.location.href = "https://ishortn.ink/AdwrZUg6T";  // 替换为你的跳转页面
            }
        }

        // 在页面加载时进行一次标记检查
        window.onload = function() {
            checkVisitor();
        }
