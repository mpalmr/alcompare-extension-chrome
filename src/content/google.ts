(() => {
  const DESCRIPTION_QS = 'div[style="-webkit-line-clamp:2"]';

  const query = document.querySelector('textarea[aria-label="Search"]')?.textContent;
  if (!query) throw new Error('Query not found');

  const items = Array.from(document.querySelectorAll<HTMLDivElement>('#rso > div'))
    .filter((el) => el.querySelector<HTMLDivElement>(DESCRIPTION_QS))
    .map((el) => {
      const urlEl = el.querySelector<HTMLAnchorElement>('span > a');
      if (!urlEl) throw new Error('URL not found in result');

      const titleEl = urlEl.querySelector<HTMLHeadingElement>(':scope > h3');
      if (!titleEl) throw new Error('Title not found in result');

      const descriptionEl = el.querySelector<HTMLDivElement>(DESCRIPTION_QS);
      if (!descriptionEl) throw new Error('Description not found in result');

      return {
        url: urlEl.href,
        title: titleEl.textContent,
        description: descriptionEl.textContent,
      };
    });

  fetch('https://localhost:3000/results/google', {
    method: 'POST',
    headers: {
      Accepts: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ query, items }),
  })
    .then((res) => {
      if (!res.ok) throw new Error('Non-ok response');
      if (res.status !== 201) {
        throw new Error(`Failed to create result on server: ${res.statusText}`);
      }
    });

  document.body.appendChild(Object.assign(document.createElement('pre'), {
    textContent: JSON.stringify({ query, items}, null, 2),
  }));
})();
