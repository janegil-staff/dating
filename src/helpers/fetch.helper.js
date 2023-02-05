export const fetcher = async (props) => {
  const { uri, method, body, headers } = props;
  try {
    const response = await fetch(uri, {
      method,
      body: JSON.stringify(body),
      headers,
    });
  
    const data = await response.json();
    return data.message;
  } catch(error) {
    return error.message;
  }
};
