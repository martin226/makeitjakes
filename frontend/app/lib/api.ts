export async function convertResume(file: File, apiUrl: string) {
  const formData = new FormData();
  formData.append('file', file);

  const response = await fetch(`${apiUrl}/api/v1/resumes`, {
    method: 'POST',
    body: formData,
    credentials: 'include',
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || 'Failed to convert resume');
  }

  const data = await response.json();
  return { latex: data.latex, request_id: data.request_id };
} 