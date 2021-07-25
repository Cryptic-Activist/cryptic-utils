import fetch from 'node-fetch';

export async function fetcher(
  endpoint: string,
  method: 'GET' | 'POST' | 'PUT' | 'DELETE',
  body?: object,
): Promise<any> {
  const response = await fetch(
    endpoint,
    {
      method,
      mode: 'cors',
      cache: 'no-cache',
      credentials: 'same-origin',
      headers: {
        'Content-Type': 'application/json',
      },
      body,
    },
  );

  const data = await response.json();
  return data;
}

export async function fetcherAuth(
  endpoint: string,
  method: 'GET' | 'POST' | 'PUT' | 'DELETE',
  authorization: string,
  body?: object,
): Promise<any> {
  const response = await fetch(
    endpoint,
    {
      method,
      mode: 'cors',
      cache: 'no-cache',
      credentials: 'same-origin',
      headers: {
        'Content-Type': 'application/json',
        Authorization: authorization,
      },
      body,
    },
  );

  const data = await response.json();
  return data;
}
