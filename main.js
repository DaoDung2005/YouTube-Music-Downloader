var YouTube = document.querySelector('.YouTube');
      var YouTube2 = document.querySelector('.YouTube2');
      var idList = document.querySelector('.idList');
      var idList2 = document.querySelector('.idList2');
      var hidden = document.querySelector('.hidden');
      var hidden2 = document.querySelector('.hidden2');
      
      var timeout1, timeout2;

      function Get() {
        // Kiểm tra nếu chỉ có 1 ô nhập liệu có giá trị, thì chỉ xử lý form đó
        if (YouTube.value.trim() !== "") {
          processUrl(YouTube.value, idList, hidden, '.form-control', '.video-thumbnail', '.video-title');
        }
        if (YouTube2.value.trim() !== "") {
          processUrl(YouTube2.value, idList2, hidden2, '.form-control2', '.video-thumbnail2', '.video-title2');
        }
      }

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
      if (data && data.link) {
        console.log(data);  // Kiểm tra dữ liệu trả về từ API
        hiddenElement.classList.add('active');
        document.querySelector(formControlSelector).value = data.link;
      } else {
        console.error('Error: API returned no music link');
      }
    })
    .catch(err => console.error('Error fetching music data:', err));

  // Fetch video info from YouTube
  fetch('https://www.googleapis.com/youtube/v3/videos?part=snippet&id=' + YTurl + '&key=AIzaSyCut28qePs8i1Il-MllszWkOMQb2x1ttpw')
    .then(response => response.json())
    .then(data => {
      if (data.items && data.items.length > 0) {
        let videoTitle = data.items[0].snippet.title;
        let thumbnailUrl = data.items[0].snippet.thumbnails.maxres?.url || 
                           data.items[0].snippet.thumbnails.high?.url || 
                           data.items[0].snippet.thumbnails.default?.url;
        document.querySelector(thumbnailSelector).src = thumbnailUrl;
        document.querySelector(titleSelector).textContent = videoTitle;
      } else {
        console.error('Error: No video data returned from YouTube API');
      }
    })
    .catch(err => console.error('Error fetching YouTube video info:', err));
}

      function download() {
        // Ngăn chặn hành động submit form mặc định
        event.preventDefault();
        
        const url = document.querySelector('.form-control').value;
        const anchor = document.createElement("a");
        anchor.href = url;
        anchor.download = 'Music.mp3';
        document.body.appendChild(anchor);
        anchor.click();
        document.body.removeChild(anchor);
      }

      function download2() {
        // Ngăn chặn hành động submit form mặc định
        event.preventDefault();
        
        const url = document.querySelector('.form-control2').value;
        const anchor = document.createElement("a");
        anchor.href = url;
        anchor.download = 'Music.mp3';
        document.body.appendChild(anchor);
        anchor.click();
        document.body.removeChild(anchor);
      }

      function copyTextToClipboard() {
        var textToCopy = document.getElementById("textToCopy").value;
        var tempTextArea = document.createElement("textarea");
        tempTextArea.value = textToCopy;
        document.body.appendChild(tempTextArea);
        tempTextArea.select();
        document.execCommand("copy");
        document.body.removeChild(tempTextArea);
      }

      // Detect khi người dùng dừng gõ trong 1 giây và tự động nhấn nút "Get"
      YouTube.addEventListener('input', function() {
        clearTimeout(timeout1);
        timeout1 = setTimeout(function() {
          if (YouTube.value.trim() !== "") {
            Get();
          }
        }, 1000); // Sau 1 giây nếu không có input mới
      });

      YouTube2.addEventListener('input', function() {
        clearTimeout(timeout2);
        timeout2 = setTimeout(function() {
          if (YouTube2.value.trim() !== "") {
            Get();
          }
        }, 1000); // Sau 1 giây nếu không có input mới
      });