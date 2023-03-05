export default async function fetchApi<T>(
  url: string,
  params?: RequestInit
): Promise<T> {
  return (await fetch(url, params)).json();
}
