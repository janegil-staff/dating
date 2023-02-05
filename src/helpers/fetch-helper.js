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

export const updateUserImages = async (user, imageUrl, type) => {
  if (type === "PUSH") {
    const response = await fetch("/api/profile/update-user-images", {
      method: "PUT",
      body: JSON.stringify({ user, imageUrl, type }),
      headers: {
        "Content-Type": "application/json",
      },
    });
  }
};
