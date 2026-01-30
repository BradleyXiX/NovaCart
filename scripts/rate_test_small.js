(async () => {
  const url = 'http://localhost:3000/api/products';
  const total = 5;
  for (let i = 0; i < total; i++) {
    try {
      const res = await fetch(url, { method: 'GET' });
      let body = '';
      try {
        body = await res.text();
      } catch (e) {
        body = '';
      }
      console.log(`[${i + 1}/${total}] status=${res.status}${body ? ' body=' + body.trim().slice(0,200) : ''}`);
    } catch (err) {
      console.log(`[${i + 1}/${total}] ERROR - ${err.message}`);
    }
    await new Promise((r) => setTimeout(r, 50));
  }
})();