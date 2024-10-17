
  var YouTube = document.querySelector('.YouTube');
  var YouTube2 = document.querySelector('.YouTube2');
  var idList = document.querySelector('.idList');
  var idList2 = document.querySelector('.idList2');
  var hidden = document.querySelector('.hidden');
  var hidden2 = document.querySelector('.hidden2');
  
  var typingTimerYouTube; // biến theo dõi thời gian nhập liệu cho YouTube
  var typingTimerYouTube2; // biến theo dõi thời gian nhập liệu cho YouTube2
  var doneTypingInterval = 1000; // 1 giây để tự động ấn "Get" khi không nhập nữa
  var repeatInterval = 3000; // 3 giây sau khi ấn "Get" để lặp lại hành động
  
  // Hàm tự động ấn nút "Get" cho form YouTube
  function autoClickGetYouTube() {
    processUrl(YouTube.value, idList, hidden, '.form-control', '.video-thumbnail', '.video-title');
  }
  
  // Hàm tự động ấn nút "Get" cho form YouTube2
  function autoClickGetYouTube2() {
    processUrl(YouTube2.value, idList2, hidden2, '.form-control2', '.video-thumbnail2', '.video-title2');
  }
  
  // Kiểm tra khi người dùng nhập vào YouTube
  YouTube.addEventListener('input', function() {
    clearTimeout(typingTimerYouTube); // xóa timeout cũ nếu người dùng tiếp tục nhập
    if (YouTube.value) {
      // Nếu người dùng nhập, đợi 1 giây rồi tự động nhấn "Get"
      typingTimerYouTube = setTimeout(autoClickGetYouTube, doneTypingInterval);
    }
  });

  // Kiểm tra khi người dùng nhập vào YouTube2
  YouTube2.addEventListener('input', function() {
    clearTimeout(typingTimerYouTube2); // xóa timeout cũ nếu người dùng tiếp tục nhập
    if (YouTube2.value) {
      // Nếu người dùng nhập, đợi 1 giây rồi tự động nhấn "Get"
      typingTimerYouTube2 = setTimeout(autoClickGetYouTube2, doneTypingInterval);
    }
  });

  // Hàm xử lý URL khi người dùng nhập vào ô input
  function processUrl(url, idElement, hiddenElement, formControlSelector, thumbnailSelector, titleSelector) {
      var YTurl = '';
  
      if (url.indexOf("https://youtu.be/") !== -1) {
          YTurl = url.replace("https://youtu.be/", "");
      } else if (url.indexOf("https://www.youtube.com/watch?v=") !== -1) {
          YTurl = url.replace("https://www.youtube.com/watch?v=", "");
      } else if (url.indexOf("https://youtube.com/watch?v=") !== -1) {
          YTurl = url.replace("https://youtube.com/watch?v=", "");
      } else if (url.indexOf("https://m.youtube.com/watch?v=") !== -1) {
          YTurl = url.replace("https://m.youtube.com/watch?v=", "");
      } else if (url.indexOf("https://youtube.com/shorts/") !== -1) {
          YTurl = url.replace("https://youtube.com/shorts/", "").replace("?feature=share", "");
      } else {
          alert('Enter a valid YouTube URL...');
          return;
      }
  
      idElement.value = YTurl;
      fetchMusicData(YTurl, hiddenElement, formControlSelector, thumbnailSelector, titleSelector);
  }

  function fetchMusicData(YTurl, hiddenElement, formControlSelector, thumbnailSelector, titleSelector) {
      const options = {
          method: 'GET',
          headers: {
              'X-RapidAPI-Key': 'd24e43945cmshda3cd58fdbe3e78p110606jsnb2350bf37f51',
              'X-RapidAPI-Host': 'youtube-mp36.p.rapidapi.com'
          }
      };
  
      var urlLink = 'https://youtube-mp36.p.rapidapi.com/dl?id=' + YTurl;
  
      fetch(urlLink, options)
          .then(response => response.json())
          .then(data => {
              console.log(data);
              hiddenElement.classList.add('active');
              document.querySelector(formControlSelector).value = data.link;
          })
          .catch(err => console.error(err));
  
      fetch('https://www.googleapis.com/youtube/v3/videos?part=snippet&id=' + YTurl + '&key=AIzaSyCut28qePs8i1Il-MllszWkOMQb2x1ttpw')
          .then(response => response.json())
          .then(data => {
              let videoTitle = data.items[0].snippet.title;
              let thumbnailUrl = data.items[0].snippet.thumbnails.maxres?.url || 
                                 data.items[0].snippet.thumbnails.high?.url || 
                                 data.items[0].snippet.thumbnails.default?.url;
              document.querySelector(thumbnailSelector).src = thumbnailUrl;
              document.querySelector(titleSelector).textContent = videoTitle;
          })
          .catch(err => console.error(err));
  }

  // Tự động tải nhạc khi người dùng không nhập gì sau 1 giây
  function download() {
      const url = document.querySelector('.form-control').value;
      const anchor = document.createElement("a");
      anchor.href = url;
      anchor.download = 'Music.mp3';
      document.body.appendChild(anchor);
      anchor.click();
      document.body.removeChild(anchor);
  }
  
  // Tự động tải nhạc khi người dùng không nhập gì sau 1 giây (cho YouTube2)
  function download2() {
      const url = document.querySelector('.form-control2').value;
      const anchor = document.createElement("a");
      anchor.href = url;
      anchor.download = 'Music.mp3';
      document.body.appendChild(anchor);
      anchor.click();
      document.body.removeChild(anchor);
  }
  
  function copyTextToClipboard() {
    // Lấy giá trị từ trường nhập liệu
    var textToCopy = document.getElementById("textToCopy").value;

    // Tạo một phần tử textarea ẩn
    var tempTextArea = document.createElement("textarea");
    tempTextArea.value = textToCopy;
    document.body.appendChild(tempTextArea);

    // Lựa chọn toàn bộ nội dung của textarea
    tempTextArea.select();

    // Sao chép nội dung đã chọn vào bộ nhớ đệm
    document.execCommand("copy");

    // Xóa phần tử textarea ẩn
    document.body.removeChild(tempTextArea);
}

