



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







async function streamAudio(url) {
    try {
        // 创建一个MediaSource实例用于流式传输
        const mediaSource = new MediaSource();
        const audioPlayer = document.getElementById('audioPlayer');
        audioPlayer.src = URL.createObjectURL(mediaSource);

        mediaSource.addEventListener('sourceopen', async () => {
            const sourceBuffer = mediaSource.addSourceBuffer('audio/mpeg');
            
            // 获取音频流
            const response = await fetch(url);
            const reader = response.body.getReader();

            // 逐块读取音频数据并将其追加到SourceBuffer
            while (true) {
                const { done, value } = await reader.read();
                if (done) {
                    // 标记流的结束
                    mediaSource.endOfStream();
                    break;
                }

                // 将读取的数据块追加到SourceBuffer
                sourceBuffer.appendBuffer(new Uint8Array(value));
            }
        });
    } catch (err) {
        console.error("Error streaming audio:", err);
    }
}

// 立即调用流式播放函数（不等待其他资源加载）
const audioUrl = './1.mp3';  // 音频文件路径
streamAudio(audioUrl);
