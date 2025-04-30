<script>
async function loadCSV() {
  const response = await fetch('word-of-the-day.csv');
  const text = await response.text();

  const results = Papa.parse(text, {
    header: true,
    skipEmptyLines: true
  });

  const entries = results.data;

  // 今日の日付から通し番号を決定（1〜366）
  const today = new Date();
  const start = new Date(today.getFullYear(), 0, 0);
  const diff = today - start;
  const dayOfYear = Math.floor(diff / (1000 * 60 * 60 * 24));

  const entry = entries[(dayOfYear - 1) % entries.length];

  document.getElementById('word').textContent = entry.word;
  document.getElementById('meaning').textContent = entry.meaning;
  document.getElementById('sentence').textContent = entry.example_en;
  document.getElementById('translation').textContent = entry.example_ja;
}

loadCSV();
</script>
