export const fetchUploadImage = async (user, base64Image) => {
  const response = await fetch("/api/profile/image-upload", {
    method: "POST",
    body: JSON.stringify({ user, base64Image }),
    headers: {
      "Content-Type": "application/json",
    },
  });

  const data = await response.json();
  return data.message;
};

export const updateUser = async (user, options) => {
    const response = await fetch("/api/profile/update", {
      method: "PUT",
      body: JSON.stringify({ user, options }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    console.log(response);
  };