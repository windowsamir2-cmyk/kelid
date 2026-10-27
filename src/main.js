import { Browser } from '@capacitor/browser';
import { Capacitor } from '@capacitor/core';
import './style.css';

const sites = [
  { name: 'تأمین اجتماعی', category: 'خدمات دولتی', url: 'https://es.tamin.ir/', icon: '🩺', color: 'mint' },
  { name: 'بیمه سلامت', category: 'بیمه', url: 'https://ihio.gov.ir/', icon: '🏥', color: 'blue' },
  { name: 'ثبت احوال', category: 'مدارک هویتی', url: 'https://sabteahval.ir/', icon: '🪪', color: 'purple' },
  { name: 'پلیس +۱۰', category: 'خدمات انتظامی', url: 'https://epolice.ir/', icon: '👮', color: 'gold' },
  { name: 'سازمان امور مالیاتی', category: 'مالیات', url: 'https://my.tax.gov.ir/', icon: '🧾', color: 'mint' },
  { name: 'پست', category: 'پیگیری مرسوله', url: 'https://post.ir/', icon: '📦', color: 'blue' },
  { name: 'دولت من', category: 'خدمات دولتی', url: 'https://my.gov.ir/', icon: '🇮🇷', color: 'purple' },
  { name: 'بیمه ایران', category: 'بیمه', url: 'https://bimehiran.com/', icon: '🛡️', color: 'gold' },
  { name: 'مدیو', category: 'آموزش و پرورش', url: 'https://medu.ir/', icon: '🎓', color: 'blue' },
  { name: 'همراه اول', category: 'اپراتور تلفن', url: 'https://mci.ir/', icon: '📱', color: 'mint' },
  { name: 'ایرانسل', category: 'اپراتور تلفن', url: 'https://irancell.ir/', icon: '📶', color: 'gold' },
  { name: 'رایتل', category: 'اپراتور تلفن', url: 'https://rightel.ir/', icon: '📡', color: 'purple' },
  { name: 'کالابرگ', category: 'خدمات حمایتی', url: 'https://kalabarg.ir/', icon: '🛒', color: 'mint' },
];

const app = document.querySelector('#app');
app.innerHTML = `
  <main class="shell">
    <header class="top">
      <div class="brand-mark">ر</div>
      <div class="brand-copy"><h1>کلید</h1><p>خدمات پرکاربرد، یک‌جا و سریع</p></div>
      <span class="flag">IR</span>
    </header>
    <section class="welcome">
      <div><span class="eyebrow">خوش اومدی 👋</span><h2>کجا می‌خوای بری؟</h2>
      <p>سرویس موردنظرت رو انتخاب کن تا بازش کنیم.</p></div>
      <div class="welcome-art">✦</div>
    </section>
    <label class="search"><span>⌕</span><input id="search" type="search" placeholder="جست‌وجوی خدمات..." autocomplete="off"><kbd>/</kbd></label>
    <div class="section-heading"><h3>دسترسی سریع</h3><span id="count"></span></div>
    <nav class="filters" aria-label="دسته‌بندی">
      <button class="filter active" data-filter="همه">همه</button>
      <button class="filter" data-filter="خدمات دولتی">دولتی</button>
      <button class="filter" data-filter="بیمه">بیمه</button>
      <button class="filter" data-filter="اپراتور تلفن">اپراتورها</button>
      <button class="filter" data-filter="آموزش و پرورش">آموزش</button>
    </nav>
    <section id="grid" class="grid" aria-live="polite"></section>
    <footer><span class="footer-dot"></span> لینک‌ها به وب‌سایت‌های رسمی یا معرفی‌شده هدایت می‌شوند.</footer>
  </main>
  <div id="toast" role="status" class="toast"></div>
`;

let selectedCategory = 'همه';
const grid = document.querySelector('#grid');
const search = document.querySelector('#search');
const count = document.querySelector('#count');
const toast = document.querySelector('#toast');

function render() {
  const query = search.value.trim().toLocaleLowerCase('fa');
  const shown = sites.filter(s =>
    (selectedCategory === 'همه' || s.category === selectedCategory) &&
    (s.name.toLocaleLowerCase('fa').includes(query) || s.category.toLocaleLowerCase('fa').includes(query))
  );
  count.textContent = `${shown.length} سرویس`;
  grid.innerHTML = shown.map((s) => `
    <button class="site-card" data-url="${s.url}" aria-label="باز کردن ${s.name}">
      <span class="site-icon ${s.color}">${s.icon}</span>
      <span class="site-name">${s.name}</span>
      <span class="site-category">${s.category}</span>
      <span class="card-arrow">↗</span>
    </button>
  `).join('') || '<p class="empty">چیزی پیدا نشد؛ عبارت دیگه‌ای رو امتحان کن.</p>';
}

document.querySelector('.filters').addEventListener('click', (e) => {
  const btn = e.target.closest('[data-filter]');
  if (!btn) return;
  selectedCategory = btn.dataset.filter;
  document.querySelectorAll('.filter').forEach(b => b.classList.toggle('active', b === btn));
  render();
});
search.addEventListener('input', render);
grid.addEventListener('click', async (e) => {
  const card = e.target.closest('[data-url]');
  if (!card) return;
  const url = card.dataset.url;
  try {
    if (Capacitor.isNativePlatform()) {
      await Browser.open({ url, presentationStyle: 'popover' });
    } else {
      window.open(url, '_blank', 'noopener,noreferrer');
    }
  } catch {
    toast.textContent = 'باز کردن سایت ممکن نشد. اتصال اینترنت رو بررسی کن.';
    toast.classList.add('show');
    setTimeout(() => toast.classList.remove('show'), 2800);
  }
});
document.addEventListener('keydown', (e) => {
  if (e.key === '/' && !['INPUT', 'TEXTAREA'].includes(document.activeElement.tagName)) {
    e.preventDefault(); search.focus();
  }
});
render();
