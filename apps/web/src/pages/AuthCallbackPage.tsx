import { useEffect } from 'react';

export default function AuthCallbackPage() {
  useEffect(() => {
    const redirect = localStorage.getItem('redirect_after_login') || '/';
    localStorage.removeItem('redirect_after_login');

    window.location.href = redirect;
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
        <p className="text-gray-600 font-medium">Signing you in...</p>
      </div>
    </div>
  );
}
