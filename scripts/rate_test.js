const url = 'http://localhost:3000/api/products';
const total = 40;
const delayMs = 10; // small delay between requests

(async () => {
  const results = [];
  for (let i = 0; i < total; i++) {
    try {
      const res = await fetch(url, { method: 'GET' });
      let body = '';
      if (!res.ok) {
        try {
          body = await res.text();
        } catch (e) {
          body = '';
        }
      }
      results.push(res.status);
      console.log(`[${i + 1}/${total}] ${res.status}${body ? ' - ' + body.trim() : ''}`);
    } catch (err) {
      results.push('ERR');
      console.log(`[${i + 1}/${total}] ERR - ${err.message}`);
    }
    // small delay to create a burst but still sequential
    await new Promise((r) => setTimeout(r, delayMs));
  }

  const counts = results.reduce((acc, s) => {
    acc[s] = (acc[s] || 0) + 1;
    return acc;
  }, {});

  console.log('Total requests:', total);
  console.log('Status counts:', counts);
  console.log('Statuses:', results.join(' '));
})();
