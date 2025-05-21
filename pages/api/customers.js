export default async function handler(req, res) {
  const csvUrl =
    'https://docs.google.com/spreadsheets/d/e/2PACX-1vRVlcs2TzuXsMhjOR6wZR8BMcjMBNwOBDQ2v3yjj-S8CUGZ_xiAJMVGdn-8tbRHTXcTNP2IyYhnvCop/pub?output=csv';

  try {
    const response = await fetch(csvUrl);
    const text = await response.text();

    const rows = text.trim().split('\n');
    const headers = rows[0].split(',');

    const data = rows.slice(1).map((row) => {
      const values = row.split(',');
      const obj = {};
      headers.forEach((h, i) => {
        obj[h.trim()] = values[i]?.trim();
      });
      return obj;
    });

    res.status(200).json(data);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch data' });
  }
}
