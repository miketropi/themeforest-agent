// utils/fetchWithAuth.ts

export async function fetchWithAuth(input, init) {
  const doFetch = async () => {
    return fetch(input, {
      ...init,
      credentials: 'include', // required to send cookie
      headers: {
        'Content-Type': 'application/json',
        ...(init?.headers || {}),
      },
    });
  };

  let res = await doFetch();

  if (res.status === 401) {
    // Token may have expired → call refresh API
    const refreshRes = await fetch('/api/v1/refresh', {
      method: 'POST',
      credentials: 'include',
    });

    if (refreshRes.ok) {
      // Refresh successful → call the initial request
      res = await doFetch();
    } else {
      // Refresh token also expired → redirect to login
      if (typeof window !== 'undefined') {
        window.location.href = '/';
      }
    }
  }

  return res;
}
