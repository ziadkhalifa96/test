import { useEffect } from 'react';

export function usePageEffects(dependency?: any) {
  // Scroll progress bar update
  useEffect(() => {
    const bar = document.getElementById('scroll-progress');
    const onScroll = () => {
      if (!bar) return;
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const pct = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
      bar.style.width = `${pct}%`;
    };
    window.addEventListener('scroll', onScroll);
    onScroll(); 
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Scroll reveal observer setup
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('revealed');
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -60px 0px' }
    );

    const observeElements = () => {
      const elements = document.querySelectorAll('.animate-reveal, .animate-reveal-left, .animate-reveal-right, .animate-scale-in');
      elements.forEach((el) => {
        if (!el.classList.contains('revealed')) {
          observer.observe(el);
        }
      });
    };

    // Initial observation
    observeElements();

    // Use MutationObserver to detect when new AJAX content is added
    const mutationObserver = new MutationObserver(() => {
      observeElements();
    });

    mutationObserver.observe(document.body, {
      childList: true,
      subtree: true
    });

    return () => {
      observer.disconnect();
      mutationObserver.disconnect();
    };
  }, [dependency]);
}
