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

  chrome.runtime.sendMessage({
    action: 'sendGoogleResults',
    data: { query, items },
  });
})();
