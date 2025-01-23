export async function convertResume(file: File, apiOrigin: string) {
  const formData = new FormData();
  formData.append('file', file);

  const response = await fetch(`${apiOrigin}/api/v1/resumes`, {
    method: 'POST',
    body: formData,
  });

  if (!response.ok) {
    const contentType = response.headers.get('content-type');
    if (contentType && contentType.includes('application/json')) {
      const error = await response.json();
      throw new Error(error.error || 'Failed to convert resume');
    } else {
      const text = await response.text();
      if (response.status === 429) {
        throw new Error('Rate limit exceeded. Please try again later.');
      } else if (response.status === 500) {
        throw new Error('Server error: The AI service is temporarily unavailable. Please try again later.');
      } else {
        throw new Error(`Server error: ${response.status}`);
      }
    }
  }

  const data = await response.json();
  return { latex: data.latex, request_id: data.request_id };
} 