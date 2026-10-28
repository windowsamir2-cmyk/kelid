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
  { name: 'بیمه ایران', category: 'بیمه', url: 'https://iraninsurance.ir/', icon: '🛡️', color: 'gold' },
  { name: 'مدیو', category: 'آموزش و پرورش', url: 'https://medu.ir/', icon: '🎓', color: 'blue' },
  { name: 'همراه اول', category: 'اپراتور تلفن', url: 'https://mci.ir/', icon: '📱', color: 'mint' },
  { name: 'ایرانسل', category: 'اپراتور تلفن', url: 'https://irancell.ir/', icon: '📶', color: 'gold' },
  { name: 'رایتل', category: 'اپراتور تلفن', url: 'https://rightel.ir/', icon: '📡', color: 'purple' },
  { name: 'کالابرگ', category: 'خدمات حمایتی', url: 'https://ble.ir/6369', icon: '🛒', color: 'mint' }
];

const app = document.querySelector('#app');

app.innerHTML = `
  <style>
    .auth-wrap {
      max-width: 440px;
      margin: 28px auto;
      padding: 22px;
      border-radius: 22px;
      background: var(--card, #fff);
      box-shadow: 0 8px 28px #00000012;
    }
    .auth-wrap h2, .auth-wrap p { text-align: center; }
    .auth-wrap input, .auth-wrap button, .auth-wrap select {
      box-sizing: border-box;
      width: 100%;
      padding: 13px;
      margin: 7px 0;
      border-radius: 12px;
      border: 1px solid #d5dbe3;
      font: inherit;
    }
    .auth-wrap button {
      cursor: pointer;
      background: #176b55;
      color: white;
      border: 0;
    }
    .auth-wrap button.secondary {
      background: #e9f3ef;
      color: #176b55;
    }
    .auth-wrap .hint {
      font-size: 13px;
      opacity: .8;
      line-height: 1.9;
    }
    .auth-wrap .msg {
      padding: 10px;
      border-radius: 10px;
      line-height: 1.8;
      overflow-wrap: anywhere;
    }
    .auth-wrap .error {
      background: #ffeded;
      color: #9b2020;
    }
    .auth-wrap .ok {
      background: #e8f8ed;
      color: #176b35;
    }
    .auth-wrap .row { display: flex; gap: 8px; }
    .auth-wrap .row button { flex: 1; }
    .auth-hidden { display: none !important; }
  </style>

  <main class="shell">
    <header class="top">
      <div class="brand-mark">ر</div>
      <div class="brand-copy">
        <h1>کلید</h1>
        <p>خدمات پرکاربرد، یک‌جا و سریع</p>
      </div>
      <span class="flag">IR</span>
    </header>

    <section id="auth" class="auth-wrap">
      <h2>به کلید خوش آمدی 🔑</h2>
      <p>برای ادامه، یکی از گزینه‌ها را انتخاب کن.</p>
      <button id="show-login">ورود به حساب</button>
      <button id="show-signup" class="secondary">ثبت‌نام کاربر جدید</button>
      <div id="auth-form"></div>
      <div id="auth-message" role="status"></div>
    </section>

    <section id="home" class="auth-hidden">
      <div class="welcome">
        <div>
          <span class="eyebrow">خوش اومدی 👋</span>
          <h2 id="welcome-title">کجا می‌خوای بری؟</h2>
          <p>سرویس موردنظرت رو انتخاب کن تا بازش کنیم.</p>
        </div>
        <div class="welcome-art">✦</div>
      </div>

      <div style="display:flex;gap:8px;flex-wrap:wrap;margin:12px 0">
        <button id="logout-button">خروج از حساب</button>
      </div>

      <label class="search">
        <span>⌕</span>
        <input
          id="search"
          type="search"
          placeholder="جست‌وجوی خدمات..."
          autocomplete="off"
          aria-label="جست‌وجوی خدمات"
        >
        <kbd>/</kbd>
      </label>

      <div class="section-heading">
        <h3>دسترسی سریع</h3>
        <span id="count"></span>
      </div>

      <nav class="filters" aria-label="دسته‌بندی">
        <button class="filter active" data-filter="همه">همه</button>
        <button class="filter" data-filter="خدمات دولتی">دولتی</button>
        <button class="filter" data-filter="بیمه">بیمه</button>
        <button class="filter" data-filter="اپراتور تلفن">اپراتورها</button>
        <button class="filter" data-filter="آموزش و پرورش">آموزش</button>
      </nav>

      <section id="grid" class="grid" aria-live="polite"></section>
      <footer>
        <span class="footer-dot"></span>
        لینک‌ها به وب‌سایت‌ها یا سرویس‌های مربوط هدایت می‌شوند.
      </footer>
    </section>
  </main>

  <div id="toast" role="status" class="toast"></div>
`;

const $ = (selector) => document.querySelector(selector);

const authBox = $('#auth');
const authForm = $('#auth-form');
const authMessage = $('#auth-message');
const home = $('#home');
const grid = $('#grid');
const search = $('#search');
const count = $('#count');
const toast = $('#toast');

let selectedCategory = 'همه';
let currentProfile = null;
let toastTimer;

function showMessage(message, error = false) {
  authMessage.className = `msg ${error ? 'error' : 'ok'}`;
  authMessage.textContent = message;
}

function showToast(message) {
  toast.textContent = message;
  toast.classList.add('show');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toast.classList.remove('show'), 3000);
}

// ورود با شماره موبایل بدون ارسال پیامک
function normalizePhone(value) {
  let phone = value.replace(/[^\d+]/g, '');

  if (phone.startsWith('0098')) {
    phone = '+98' + phone.slice(4);
  } else if (phone.startsWith('98')) {
    phone = '+' + phone;
  } else if (phone.startsWith('0')) {
    phone = '+98' + phone.slice(1);
  } else if (phone.startsWith('9')) {
    phone = '+98' + phone;
  }

  if (!/^\+989\d{9}$/.test(phone)) {
    throw new Error('شماره موبایل معتبر ایران وارد کن؛ مثل 09123456789');
  }

  return phone;
}

function readAccounts() {
  try {
    return JSON.parse(localStorage.getItem('kelid.accounts.v1') || '{}');
  } catch {
    return {};
  }
}

function writeAccounts(accounts) {
  localStorage.setItem('kelid.accounts.v1', JSON.stringify(accounts));
}

function bytesToHex(bytes) {
  return Array.from(bytes, (byte) => byte.toString(16).padStart(2, '0')).join('');
}

async function hashPassword(password, salt) {
  const bytes = new TextEncoder().encode(salt + ':' + password);
  const digest = await crypto.subtle.digest('SHA-256', bytes);
  return bytesToHex(new Uint8Array(digest));
}

function showForm(mode) {
  authMessage.textContent = '';
  const signup = mode === 'signup';

  authForm.innerHTML = `
    <h3>${signup ? 'ثبت‌نام' : 'ورود به حساب'}</h3>
    ${signup ? `
      <input id="first-name" placeholder="نام" autocomplete="given-name" required>
      <input id="last-name" placeholder="نام خانوادگی" autocomplete="family-name" required>
    ` : ''}
    <input id="phone" inputmode="tel" placeholder="شماره موبایل (مثلاً 09123456789)" autocomplete="tel" required>
    <input id="password" type="password" placeholder="رمز عبور (حداقل ۸ نویسه)" autocomplete="${signup ? 'new-password' : 'current-password'}" required>
    <button id="submit-auth">${signup ? 'ساخت حساب' : 'ورود'}</button>
    <button id="back-auth" class="secondary">بازگشت</button>
    <p class="hint">حساب فقط روی همین گوشی ذخیره می‌شود؛ پیامک ارسال نمی‌شود و شماره تلفن تأیید نمی‌شود. با پاک کردن اطلاعات برنامه یا حذف آن، حساب محلی ممکن است از بین برود.</p>
  `;

  $('#back-auth').addEventListener('click', () => {
    authForm.innerHTML = '';
    authMessage.textContent = '';
  });

  $('#submit-auth').addEventListener('click', async () => {
    const button = $('#submit-auth');
    button.disabled = true;
    button.textContent = 'لطفاً صبر کن...';
    try {
      const phone = normalizePhone($('#phone').value);
      const password = $('#password').value;
      if (password.length < 8) throw new Error('رمز عبور باید حداقل ۸ نویسه باشد.');

      const accounts = readAccounts();
      if (signup) {
        const firstName = $('#first-name').value.trim();
        const lastName = $('#last-name').value.trim();
        if (!firstName || !lastName) throw new Error('نام و نام خانوادگی را وارد کن.');
        if (accounts[phone]) throw new Error('برای این شماره قبلاً حساب ساخته شده؛ وارد شو.');

        const saltBytes = crypto.getRandomValues(new Uint8Array(16));
        const salt = bytesToHex(saltBytes);
        accounts[phone] = {
          firstName, lastName, salt,
          passwordHash: await hashPassword(password, salt),
          createdAt: new Date().toISOString()
        };
        writeAccounts(accounts);
      } else {
        const account = accounts[phone];
        if (!account) throw new Error('برای این شماره حسابی روی این گوشی پیدا نشد.');
        const hash = await hashPassword(password, account.salt);
        if (hash !== account.passwordHash) throw new Error('شماره موبایل یا رمز عبور اشتباه است.');
      }

      localStorage.setItem('kelid.sessionPhone', phone);
      await loadCurrentUser();
    } catch (error) {
      console.error('خطای ورود یا ثبت‌نام:', error);
      showMessage(error.message || 'مشکلی پیش آمد. دوباره تلاش کن.', true);
    } finally {
      button.disabled = false;
      button.textContent = signup ? 'ساخت حساب' : 'ورود';
    }
  });
}

$('#show-login').addEventListener('click', () => showForm('login'));
$('#show-signup').addEventListener('click', () => showForm('signup'));

function renderServices() {
  const query = search.value.trim().toLocaleLowerCase('fa');

  const shown = sites.filter((site) => {
    const categoryMatches =
      selectedCategory === 'همه' ||
      site.category === selectedCategory;

    const searchMatches =
      site.name.toLocaleLowerCase('fa').includes(query) ||
      site.category.toLocaleLowerCase('fa').includes(query);

    return categoryMatches && searchMatches;
  });

  count.textContent = `${shown.length} سرویس`;

  grid.innerHTML = shown.map((site) => `
    <button
      class="site-card"
      data-url="${site.url}"
      aria-label="باز کردن ${site.name}"
      type="button"
    >
      <span class="site-icon ${site.color}">${site.icon}</span>
      <span class="site-name">${site.name}</span>
      <span class="site-category">${site.category}</span>
      <span class="card-arrow">↗</span>
    </button>
  `).join('') ||
    '<p class="empty">چیزی پیدا نشد؛ عبارت دیگری را امتحان کن.</p>';
}

document.querySelector('.filters').addEventListener('click', (event) => {
  const button = event.target.closest('[data-filter]');
  if (!button) return;

  selectedCategory = button.dataset.filter;

  document.querySelectorAll('.filter').forEach((item) => {
    item.classList.toggle('active', item === button);
  });

  renderServices();
});

search.addEventListener('input', renderServices);

grid.addEventListener('click', async (event) => {
  const card = event.target.closest('[data-url]');
  if (!card) return;

  const url = card.dataset.url;

  if (!sites.some((site) => site.url === url)) {
    showToast('آدرس این سرویس معتبر نیست.');
    return;
  }

  try {
    if (Capacitor.isNativePlatform()) {
      await Browser.open({ url });
    } else {
      const opened = window.open(url, '_blank', 'noopener,noreferrer');

      if (!opened) {
        showToast('مرورگر اجازه باز کردن صفحه را نداد.');
      }
    }
  } catch (error) {
    console.error('خطای باز کردن سایت:', error);
    showToast('باز کردن سایت ممکن نشد. اینترنت را بررسی کن.');
  }
});

async function loadCurrentUser() {
  const phone = localStorage.getItem('kelid.sessionPhone');
  const account = phone ? readAccounts()[phone] : null;
  if (!account) {
    currentProfile = null;
    authBox.classList.remove('auth-hidden');
    home.classList.add('auth-hidden');
    return;
  }

  currentProfile = { ...account, phone };
  authBox.classList.add('auth-hidden');
  home.classList.remove('auth-hidden');
  $('#welcome-title').textContent = `سلام ${account.firstName} عزیز!`;
  renderServices();
}

$('#logout-button').addEventListener('click', () => {
  localStorage.removeItem('kelid.sessionPhone');
  currentProfile = null;
  authForm.innerHTML = '';
  authMessage.textContent = '';
  authBox.classList.remove('auth-hidden');
  home.classList.add('auth-hidden');
  showToast('از حساب خارج شدی.');
});

function escapeHtml(value) {
  return String(value).replace(/[&<>"']/g, (char) => ({
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#39;'
  })[char]);
}

document.addEventListener('keydown', (event) => {
  const activeTag = document.activeElement?.tagName;

  if (
    event.key === '/' &&
    !['INPUT', 'TEXTAREA'].includes(activeTag)
  ) {
    event.preventDefault();

    if (!home.classList.contains('auth-hidden')) {
      search.focus();
    }
  }
});

// نشست محلی روی همین گوشی نگه داشته می‌شود؛ برای خروج از حساب، دکمه خروج را بزن.
loadCurrentUser().catch((error) => {
  console.error('خطا در بارگذاری حساب محلی:', error);
  showMessage('خواندن اطلاعات محلی ممکن نشد. فضای ذخیره‌سازی برنامه را بررسی کن.', true);
});
