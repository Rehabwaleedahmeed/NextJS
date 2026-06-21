import { useEffect } from 'react';
import toast from 'react-hot-toast';

export default function ToastFeed({ news = [], quotes = [] }) {
  useEffect(() => {
    news.forEach((item) => toast.success(item, { id: `news-${item}` }));
    quotes.forEach((item) => toast(item, { icon: '💬', id: `quote-${item}` }));
  }, [news, quotes]);

  return null;
}