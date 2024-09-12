export default async function deleteImage(imageId, token, userId, role) {
  const formData = new FormData();
  formData.append("imageId", imageId);
  formData.append("token", token);
  formData.append("role", role);
  formData.append("userId", userId);
  console.log(formData);

  try {
    console.log("about to fetch");
    const response = await fetch("http://localhost:5000/api/deleteImage", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: formData,
    });

    if (!response.ok) {
      throw new Error(`Error: ${response.statusText}`);
    }
    console.log("after fetch");
    const result = await response.json();
    console.log("returning response");
    return result;
  } catch (e) {
    console.error("Error in deleteImage function", e.message);
    return { success: false, message: e.message };
  }
}
