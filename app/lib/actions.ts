
export async function getPosts() {    
    const res = await fetch('https://dummyjson.com/products')
    if (!res.ok) {
      throw new Error('Failed to fetch data')
    }
    const result = await res.json();
    return result
  }

export async function getPost(id : string) {
  const res = await fetch(`https://dummyjson.com/products/${id}`);
  if (!res.ok) {
      throw new Error('fetching is failed')
  }
  const result = res.json();
  return result;
}

export const getWhether = async () => {
  try {
    const response = await fetch('https://api.gismeteo.net/v2/search/cities/?lang=ru&query=москв', {
      headers: {
        'X-Gismeteo-Token': '56b30cb255.3443075',
      },
    });

    if (response.ok) {
      const result = await response.json();
      return result;
    } else {
      console.error('Failed to fetch data');
    }
  } catch (error) {
    console.error('Error during fetch:', error);
  }
};