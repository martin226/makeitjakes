const API_URL = process.env.API_URL || 'http://localhost:3000';

export async function convertResume(file: File) {
  const formData = new FormData();
  formData.append('file', file);

  const response = await fetch(`${API_URL}/api/v1/resumes`, {
    method: 'POST',
    body: formData,
    credentials: 'include',
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || 'Failed to convert resume');
  }

  const data = await response.json();
  return data.latex;
} 