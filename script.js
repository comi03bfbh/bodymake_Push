// =====================
// ヘッダー：スクロール時にシャドウ付与
// =====================
const header = document.getElementById('header');

window.addEventListener('scroll', () => {
  if (window.scrollY > 10) {
    header.classList.add('scrolled');
  } else {
    header.classList.remove('scrolled');
  }
});

// =====================
// フェードイン・アウト（IntersectionObserver）
// =====================
const fadeItems = document.querySelectorAll('.fade-item');

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        entry.target.classList.remove('hidden');
      } else {
        // スクロールで通り過ぎたらフェードアウト
        entry.target.classList.remove('visible');
        entry.target.classList.add('hidden');
      }
    });
  },
  {
    threshold: 0.15,
    rootMargin: '0px 0px -60px 0px',
  }
);

fadeItems.forEach((item) => observer.observe(item));

// =====================
// スムーズスクロール（ヘッダー高さ分オフセット）
// =====================
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener('click', (e) => {
    e.preventDefault();
    const targetId = anchor.getAttribute('href');
    const target = document.querySelector(targetId);
    if (!target) return;

    const headerHeight = document.getElementById('header').offsetHeight;
    const targetTop = target.getBoundingClientRect().top + window.scrollY - headerHeight;

    window.scrollTo({ top: targetTop, behavior: 'smooth' });
  });
});
