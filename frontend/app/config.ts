// In production, we use relative paths since everything is on the same domain
// In development, we can override with VITE_API_URL for local backend
let API_URL = process.env.VITE_API_URL || '';

if (!API_URL) {
  // Use relative paths - the Load Balancer will handle routing
  API_URL = '';
}

export { API_URL }; 