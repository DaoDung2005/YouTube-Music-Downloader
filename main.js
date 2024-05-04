var YouTube = document.querySelector('.YouTube');
var idList = document.querySelector('.idList');
var hidden = document.querySelector('.hidden');
function Get(){
  if(YouTube.value.indexOf("https://youtu.be/") != -1){
               var YTurl = YouTube.value.replace("https://youtu.be/","");
               document.querySelector('.idList').value = YTurl;
               Music();
             }
             else if(YouTube.value.indexOf("https://www.youtube.com/watch?v=") != -1){
                var YTurl = YouTube.value.replace("https://www.youtube.com/watch?v=","");
                document.querySelector('.idList').value = YTurl;
                Music();
                }
             else if(YouTube.value.indexOf("https://youtube.com/watch?v=") != -1){
                var YTurl = YouTube.value.replace("https://youtube.com/watch?v=","");
                document.querySelector('.idList').value = YTurl;
                Music();
              }
           
              else if(YouTube.value.indexOf("https://m.youtube.com/watch?v=") != -1){
                var YTurl = YouTube.value.replace("https://m.youtube.com/watch?v=","");
                document.querySelector('.idList').value = YTurl;
                Music();
              }
             else if(YouTube.value.indexOf("https://youtube.com/shorts/") != -1){
               var YTurl = YouTube.value.replace("https://youtube.com/shorts/","");
               var YTurl2 = YTurl.replace("?feature=share","");
               document.querySelector('.idList').value = YTurl2;
               Music();
             }
             else{
               alert('Enter Your YouTube Url...');
             }
        }
function Music() {
    const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': 'd24e43945cmshda3cd58fdbe3e78p110606jsnb2350bf37f51',
            'X-RapidAPI-Host': 'youtube-mp36.p.rapidapi.com'
        }
    };

    var urlLink = 'https://youtube-mp36.p.rapidapi.com/dl?id=' + idList.value;

    // Lấy thông tin về video từ YouTube Data API
    

    // Tiếp tục như thông thường để lấy link download
    fetch(urlLink, options)
        .then(response => {
            return response.json();
        })
        .then(data => {
            console.log(data);
            hidden.classList.add('active');
            document.querySelector('.form-control').value = data.link;
        })
        .catch(err => console.error(err));

        fetch('https://www.googleapis.com/youtube/v3/videos?part=snippet&id=' + idList.value + '&key=AIzaSyCut28qePs8i1Il-MllszWkOMQb2x1ttpw')
        .then(response => response.json())
        .then(data => {
            // Kiểm tra hình ảnh maxres
            let thumbnailUrl = data.items[0].snippet.thumbnails.maxres.url;
            if (!thumbnailUrl) {
                // Nếu không có hình ảnh maxres, thử sử dụng hình ảnh high
                thumbnailUrl = data.items[0].snippet.thumbnails.high.url;
                if (!thumbnailUrl) {
                    // Nếu không có hình ảnh high, sử dụng hình ảnh mặc định
                    thumbnailUrl = data.items[0].snippet.thumbnails.default.url;
                }
            }
            document.querySelector('.video-thumbnail').src = thumbnailUrl;
        })
        .catch(err => console.error(err));



}
var url = document.querySelector('.form-control');
function download(){
      const anchor = document.createElement("a");
      anchor.href =  url.value;
      anchor.download = 'MWC.mp3';
      document.body.appendChild(anchor);
      anchor.click();
      document.body.removeChild(anchor);
 }
