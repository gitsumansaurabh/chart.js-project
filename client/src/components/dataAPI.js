export function fetchData() {
  return new Promise(async (resolve) => {
    const response = await fetch("/data");
    const data = await response.json();
    resolve({ data });
  });
}

export function fetchDataByFilter(filter) {
  let query = "";
  for (let key in filter) {
    query += `${key}=${filter[key]}&`;
  }

  return new Promise(async (resolve) => {
    const response = await fetch("/data?" + query);
    const data = await response.json();
    resolve({ data });
  });
}
