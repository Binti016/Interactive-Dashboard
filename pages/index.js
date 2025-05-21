import { useEffect } from 'react';
import { useRouter } from 'next/router';

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (user) {
      router.replace('/dashboard'); 
    } else {
      router.replace('/login'); 
    }
  }, []);

  return null; 
}
