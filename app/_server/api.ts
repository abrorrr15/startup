export async function getPosts() {
  try {
    const response = await fetch("http://localhost:8000/api/posts");
    if (!response.ok) {
      throw new Error("Failed to fetch posts");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching posts:", error);
    throw error;
  }
}

async function uploadImage(file: string) {
  const formData = new FormData();
  formData.append("image", file);

  const response = await fetch("http://localhost:8000/api/upload/image", {
    method: "POST",
    body: formData,
  });

  if (!response.ok) {
    throw new Error("Failed to upload image");
  }

  const data = await response.json();
  console.log("Uploaded image path:", data.path);
  return data.path;
}

