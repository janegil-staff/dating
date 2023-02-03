export const createUser = async props => {
    const { email, password, setError } = props;
    const response = await fetch("/api/auth/signup", {
      method: "POST",
      body: JSON.stringify({ email, password }),
      headers: {
        "Content-Type": "application/json",
      },
    });
  
    const data = await response.json();
  
    if (!response.ok) {
      setError(data.message || 'Noe gikk galt!');
    }
  
    return data;
  };