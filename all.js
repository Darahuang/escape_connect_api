const apiUrl = 'https://hex-escape-room.herokuapp.com';
const apiPath = '/api/cors/news';
const cors = 'https://newsapi-cors-anywhere.herokuapp.com';

const newsList = document.querySelector('.js-news-list');
const returnBtn = document.querySelector('.js-return-btn');
const newsDetail = document.querySelector('.js-news-details');
const newsDetailContent = document.querySelector('.js-detail-content');

let newsData = [];
let newsDetailObj = {};
// 取得新聞列表
async function getNewsData() {
  const res = await axios.get(`${apiUrl}${apiPath}`);
  newsData = res.data.data;
  renderNewsData();
}
getNewsData();
// 渲染新聞
function renderNewsData() {
  let str = '';
  newsData.forEach((item) => {
    str += `
    <div class="col">
    <div class="card bg-dark text-white card-gradient">
    <img src="${item.urlToImage}" class="card-img" alt="...">
      <div class="card-img-overlay">
        <h5 class="card-title">${item.title}</h5>
        <p class="card-text">${formatTime(item.publishedAt)}</p><a href="#" class="stretched-link" data-id="${item.id}"></a>
      </div>
    </div>
  </div>
    `;
  });
  newsList.innerHTML = str;
}

// 時間處理
function formatTime(time) {
  dayjs.locale('zh-cn');
  return dayjs(time)
    .format('YYYY-MM-DD Ahh:mm:ss'); // A: AM或PM
}

// 取得單一新聞
async function getNewsDetail(id) {
  const res = await axios.get(`${cors}/${apiUrl}${apiPath}/${id}`);
  newsDetailObj = res.data.data;
  renderNewsDetail();
}

// 渲染單一新聞
function renderNewsDetail() {
  const str = `
  <h2 class="mt-3">${newsDetailObj.title}</h2>
          <span>${newsDetailObj.publishedAt}</span>
          <img src="${newsDetailObj.urlToImage}" class="img-fluid" alt="">
          <p>${newsDetailObj.description}</p>
          <a href="${newsDetailObj.url}" target="blank">看更多</a>`;
  newsDetailContent.innerHTML = str;
  newsDetail.classList.remove('d-none');
}

newsList.addEventListener('click', (e) => {
  if (e.target.nodeName === 'A') {
    const { id } = e.target.dataset;
    getNewsDetail(id);
  }
});

returnBtn.addEventListener('click', () => {
  newsDetail.classList.add('d-none');
});
