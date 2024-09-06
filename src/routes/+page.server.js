import fetchJson from "$lib/fetch-json"

export async function load() {
  const url = 'https://fdnd.directus.app/items/person/?filter={"id":20}'

  const persons = await fetchJson(url)

  return {
    ...persons.data[0]
  }
}
