async function loadJSON() {
  const response = await fetch('word-of-the-day.json');
  const data = await response.json();

  const today = new Date();
  const start = new Date(today.getFullYear(), 0, 0);
  const diff = today - start;
  const dayOfYear = Math.floor(diff / (1000 * 60 * 60 * 24));

  const entry = data.find(item => item["日"] === (dayOfYear % data.length) + 1);

  if (entry) {
    document.getElementById('word').textContent = entry["単語"];
    document.getElementById('meaning').textContent = entry["意味"];
    document.getElementById('sentence').textContent = entry["例文（英語）"];
    document.getElementById('translation').textContent = entry["例文（日本語訳）"];
  } else {
    console.error("対応する単語が見つかりませんでした。");
  }
}

loadJSON();
