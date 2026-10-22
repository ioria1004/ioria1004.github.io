// 명언 목록 (페이지를 열 때마다 하나씩 랜덤으로 보여줌)
const quotes = [
  { text: "삶이 있는 한 희망은 있다.", author: "키케로" },
  { text: "피할 수 없으면 즐겨라.", author: "로버트 엘리엇" },
  { text: "성공은 매일 반복한 작은 노력들의 합이다.", author: "로버트 콜리어" },
  { text: "천 리 길도 한 걸음부터.", author: "노자" },
  { text: "오늘 할 수 있는 일을 내일로 미루지 마라.", author: "벤자민 프랭클린" },
  { text: "배움에는 끝이 없다.", author: "세네카" },
  { text: "시작이 반이다.", author: "아리스토텔레스" },
  { text: "꿈을 계속 간직하고 있으면 반드시 실현할 때가 온다.", author: "괴테" },
  { text: "행동은 모든 성공의 기초이다.", author: "파블로 피카소" },
  { text: "가장 큰 위험은 아무런 위험도 감수하지 않는 것이다.", author: "마크 저커버그" }
];

function showRandomQuote() {
  const pick = quotes[Math.floor(Math.random() * quotes.length)];
  document.getElementById("quote").textContent = `"${pick.text}" - ${pick.author}`;
}

// Open-Meteo 날씨 코드 -> 한글 설명
const weatherText = {
  0: "맑음 ☀️",
  1: "대체로 맑음 🌤️",
  2: "부분 흐림 ⛅",
  3: "흐림 ☁️",
  45: "안개 🌫️",
  48: "안개 🌫️",
  51: "가벼운 이슬비 🌧️",
  53: "이슬비 🌧️",
  55: "강한 이슬비 🌧️",
  56: "언 이슬비 🌧️",
  57: "언 이슬비 🌧️",
  61: "가벼운 비 🌧️",
  63: "비 🌧️",
  65: "강한 비 🌧️",
  66: "언 비 🌧️",
  67: "언 비 🌧️",
  71: "가벼운 눈 ❄️",
  73: "눈 ❄️",
  75: "강한 눈 ❄️",
  77: "싸락눈 ❄️",
  80: "가벼운 소나기 🌦️",
  81: "소나기 🌦️",
  82: "강한 소나기 🌦️",
  85: "눈 소나기 🌨️",
  86: "강한 눈 소나기 🌨️",
  95: "천둥번개 ⛈️",
  96: "천둥번개와 우박 ⛈️",
  99: "강한 천둥번개와 우박 ⛈️"
};

// 날씨 가져오기 (Open-Meteo, 키 없이 사용 가능)
// 가끔 응답이 늦거나 끊기는 경우가 있어서 실패하면 한 번 더 시도함
async function loadWeather(lat, lon, elementId, cityName, retry = 1) {
  const box = document.getElementById(elementId);
  try {
    const url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current_weather=true&timezone=auto`;
    const res = await fetch(url);
    if (!res.ok) throw new Error("응답 오류");
    const data = await res.json();
    const temp = data.current_weather.temperature;
    const code = data.current_weather.weathercode;
    box.textContent = `${cityName}: ${temp}°C ${weatherText[code] || ""}`;
  } catch (e) {
    if (retry > 0) {
      setTimeout(() => loadWeather(lat, lon, elementId, cityName, retry - 1), 1500);
    } else {
      box.textContent = `${cityName}: 날씨 정보 없음`;
    }
  }
}

document.addEventListener("DOMContentLoaded", () => {
  showRandomQuote();
  loadWeather(37.5665, 126.9780, "weather-seoul", "서울");
  loadWeather(33.4996, 126.5312, "weather-jeju", "제주");

  // I'm Feeling Lucky: 검색어가 있으면 구글 운좋은 검색, 없으면 구글 두들 페이지
  document.getElementById("lucky-btn").addEventListener("click", () => {
    const q = document.getElementById("search-input").value.trim();
    if (q) {
      window.location.href = "https://www.google.com/search?btnI=1&q=" + encodeURIComponent(q);
    } else {
      window.location.href = "https://doodles.google/";
    }
  });
});
