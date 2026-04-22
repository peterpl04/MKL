import { API_BASE_URL } from "../utils/constants";
import { getToken } from "../utils/storage";

export async function uploadImage(file: File) {
  const formData = new FormData();
  formData.append("file", file);

  const token = getToken();

  const response = await fetch(`${API_BASE_URL}/upload/image`, {
    method: "POST",
    headers: {
      Authorization: token ? `Bearer ${token}` : ""
    },
    body: formData
  });

  if (!response.ok) {
    throw new Error("Falha ao enviar imagem");
  }

  const data = (await response.json()) as { url: string };
  return data.url;
}
