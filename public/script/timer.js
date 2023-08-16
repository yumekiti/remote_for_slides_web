// タイマー関数
function updateTimer() {
  if (stopFlag) {
    diff = stopTime;
  } else {
    now = Date.now();
    diff = now - startTime;
  }
  const h = Math.floor(diff / 1000 / 60 / 60);
  const m = Math.floor((diff / 1000 / 60) % 60);
  const s = Math.floor((diff / 1000) % 60);
  // 0埋め
  const hStr = h.toString().padStart(2, "0");
  const mStr = m.toString().padStart(2, "0");
  const sStr = s.toString().padStart(2, "0");
  timer.textContent = `${hStr}:${mStr}:${sStr}`;
}

// タイマー要素と各変数の初期化
const timer = document.getElementById("timer");
let startTime = Date.now();
let now = Date.now();
let diff = now - startTime;
let stopTime = 0;
let stopFlag = false;
let timerInterval;

// タイマーの更新間隔を設定
timerInterval = setInterval(updateTimer, 1000);

// 開始ボタン
const start = document.getElementById("start");
const stop = document.getElementById("stop");
const reset = document.getElementById("reset");
start.style.display = "none";
reset.style.display = "none";

// 非表示
start.addEventListener("click", () => {
  if (stopFlag) {
    startTime = Date.now() - stopTime;
    stopTime = 0;
    stopFlag = false;
    timerInterval = setInterval(updateTimer, 1000);
  }
  stop.style.display = "block";
  start.style.display = "none";
  reset.style.display = "none";
});

// 停止ボタン
stop.addEventListener("click", () => {
  if (!stopFlag) {
    stopTime = diff;
    stopFlag = true;
    clearInterval(timerInterval);
  }
  stop.style.display = "none";
  start.style.display = "block";
  reset.style.display = "block";
});

// リセットボタン
reset.addEventListener("click", () => {
  startTime = Date.now();
  now = Date.now();
  diff = now - startTime;
  stopTime = 0;
  stopFlag = false;
  clearInterval(timerInterval);
  timerInterval = setInterval(updateTimer, 1000);
  stop.style.display = "block";
  start.style.display = "none";
  reset.style.display = "none";
  timer.textContent = "00:00:00";
});