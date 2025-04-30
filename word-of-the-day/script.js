async function loadCSV() {
  const response = await fetch('word-of-the-day.csv'); // 同フォルダにCSVを置いてください
  const text = await response.text();
  const lines = text.trim().split('\n');
  const entries = lines.slice(1).map(line => {
    const [index, word, meaning, example_en, example_ja] = line.split(',');
    return { index, word, meaning, example_en, example_ja };
  });

  // 今日の日付から通し番号を決定（1〜366）
  const today = new Date();
  const start = new Date(today.getFullYear(), 0, 0);
  const diff = today - start;
  const dayOfYear = Math.floor(diff / (1000 * 60 * 60 * 24));

  // 範囲外の番号には対応（例：365超えたらループ）
  const entry = entries[(dayOfYear - 1) % entries.length];

  // 表示部分に代入
  document.getElementById('word').textContent = entry.word;
  document.getElementById('meaning').textContent = entry.meaning;
  document.getElementById('sentence').textContent = entry.example_en;
  document.getElementById('translation').textContent = entry.example_ja;
}

loadCSV();
