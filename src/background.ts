chrome.runtime.onMessage.addListener(({ action, data }, sender, sendRes) => {
  if (action === 'sendGoogleResults') {
    fetch('http://localhost:3000/results/google', {
      method: 'POST',
      headers: {
        Accepts: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        ...data,
        userId: '1644d3b7-e7bc-4869-b9df-ea0e10317881',
      }),
    })
      .then((res) => res.text());
  }
});
