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
  { name: 'همراه اول', category: 'اپراتور تلفن', url: 'https://mci.ir/', icon: 'mci', color: 'mci-logo' },
  { name: 'ایرانسل', category: 'اپراتور تلفن', url: 'https://irancell.ir/', icon: 'irancell', color: 'irancell-logo' },
  { name: 'رایتل', category: 'اپراتور تلفن', url: 'https://rightel.ir/', icon: 'rightel', color: 'rightel-logo' },
  { name: 'کالابرگ', category: 'خدمات حمایتی', url: 'https://my.gov.ir/', icon: '🛒', color: 'mint' }
];

const app = document.querySelector('#app');

app.innerHTML = `
  <style>
    .auth-wrap{max-width:520px;margin:28px auto;padding:clamp(18px,5vw,30px);border-radius:28px;background:rgba(2,12,38,.88);border:1px solid #087bff;box-shadow:0 0 35px #006bff2b,inset 0 0 28px #073a7b30;color:#e8f5ff;backdrop-filter:blur(16px)}
    .auth-hero{text-align:center;padding:14px 0 25px}.key-orb{width:116px;height:116px;margin:0 auto 12px;border-radius:50%;display:grid;place-items:center;font-size:68px;color:#e9fbff;background:radial-gradient(circle at 35% 25%,#1b8bff,#00245c 65%);border:3px solid #14d8ff;box-shadow:0 0 18px #008cff,0 0 50px #006aff80,inset 0 0 20px #52dfff70}.auth-hero h2{font-size:38px;margin:4px 0;color:#fff;text-shadow:0 0 18px #168dff}.auth-hero p{margin:0;color:#36cfff;font-size:14px}
    .auth-tabs{display:flex;gap:8px;padding:5px;background:#001431;border:1px solid #0756ad;border-radius:16px;margin-bottom:18px}.auth-tabs button{flex:1!important;width:auto!important;margin:0!important;background:transparent!important;color:#9bc9ff!important;border:1px solid transparent!important;padding:12px!important}.auth-tabs button.active{background:linear-gradient(120deg,#0069ff,#087bff)!important;color:#fff!important;border-color:#22d7ff!important;box-shadow:0 0 16px #008cff70}
    .auth-wrap h3{margin:12px 0;text-align:center;color:#eaf7ff}.auth-wrap input,.auth-wrap button,.auth-wrap select{box-sizing:border-box;width:100%;padding:14px;margin:7px 0;border-radius:14px;border:1px solid #286bc0;background:#041a3c;color:#f4faff;font:inherit;outline:none}.auth-wrap input::placeholder{color:#82a7d5}.auth-wrap input:focus{border-color:#18d7ff;box-shadow:0 0 0 3px #008cff25}.auth-wrap button{cursor:pointer;background:linear-gradient(110deg,#0062ff,#087cff);color:white;border:1px solid #14d8ff;box-shadow:0 0 17px #006dff55;font-weight:700}.auth-wrap button.secondary{background:#061a3b;color:#9ecbff;border-color:#174b8b;box-shadow:none}.auth-wrap .hint{font-size:11px;opacity:.8;line-height:1.9;color:#9cbbe4}.auth-wrap .msg{padding:10px;border-radius:10px;line-height:1.8;overflow-wrap:anywhere}.auth-wrap .error{background:#401a32;color:#ffc3d6}.auth-wrap .ok{background:#073e43;color:#b8fff5}.auth-wrap .row{display:flex;gap:8px}.auth-wrap .row button{flex:1}.auth-hidden{display:none!important}
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
      <div class="auth-hero">
        <div class="key-orb" aria-hidden="true">⚿</div>
        <h2>کلید</h2>
        <p>همه‌ی خدمات، در یک کلید</p>
      </div>
      <div class="auth-tabs">
        <button id="show-login" class="active" type="button">ورود</button>
        <button id="show-signup" class="secondary" type="button">ثبت‌نام</button>
      </div>
      <div id="auth-form"></div>
      <div id="auth-message" role="status"></div>
    </section>

    <section id="profile-panel" class="auth-wrap auth-hidden" aria-label="پروفایل">
      <h2>پروفایل من</h2>
      <div class="avatar-area"><div class="avatar-frame"><img id="avatar-preview" alt="" /><span id="avatar-placeholder">👤</span></div><label for="avatar-file" class="avatar-pick">انتخاب عکس</label><input id="avatar-file" type="file" accept="image/*" hidden /></div>
      <div id="profile-message" role="status"></div>
      <input id="profile-first" placeholder="نام" /><input id="profile-last" placeholder="نام خانوادگی" />
      <input id="profile-username" placeholder="نام کاربری (انگلیسی)" /><input id="profile-phone" placeholder="شماره موبایل" inputmode="tel" />
      <input id="profile-age" type="number" min="1" max="120" inputmode="numeric" placeholder="سن (اختیاری)" />
      <p>جنسیت</p><div class="gender-options"><button type="button" data-gender="مرد">مرد</button><button type="button" data-gender="زن">زن</button></div>
      <input id="profile-password" type="password" placeholder="رمز جدید (اختیاری)" />
      <button id="save-profile" type="button">ذخیره تغییرات</button><button id="logout-button" type="button">خروج از حساب</button><button id="close-profile" class="secondary" type="button">بازگشت به خدمات</button>
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
        <button id="profile-button" type="button">👤 پروفایل</button>
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
let signupGender = '';
let profileGender = '';

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

  $('#show-login').classList.toggle('active', !signup);
  $('#show-signup').classList.toggle('active', signup);
  authForm.innerHTML = `
    <h3>${signup ? 'ساخت حساب جدید' : 'ورود به حساب'}</h3>
    ${signup ? `
      <input id="first-name" placeholder="نام" autocomplete="given-name" required>
      <input id="last-name" placeholder="نام خانوادگی" autocomplete="family-name" required>
      <input id="username" placeholder="نام کاربری (۳ تا ۲۰ نویسه انگلیسی)" autocomplete="username" required>
      <div class="gender-options signup-gender"><button type="button" data-signup-gender="مرد">مرد</button><button type="button" data-signup-gender="زن">زن</button></div>
    ` : ''}
    <input id="phone" inputmode="tel" placeholder="${signup ? 'شماره موبایل (مثلاً 09123456789)' : 'شماره موبایل یا نام کاربری'}" autocomplete="${signup ? 'tel' : 'username'}" required>
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
      const identifier = $('#phone').value.trim();
      const password = $('#password').value;
      if (password.length < 8) throw new Error('رمز عبور باید حداقل ۸ نویسه باشد.');

      const accounts = readAccounts();
      let phone = '';
      if (signup) {
        phone = normalizePhone(identifier);
        const username = $('#username').value.trim().toLowerCase();
        if (!/^[a-zA-Z0-9_.-]{3,20}$/.test(username)) throw new Error('نام کاربری باید ۳ تا ۲۰ نویسه انگلیسی، عدد یا . _ - باشد.');
        if (!signupGender) throw new Error('جنسیت را انتخاب کن.');
        if (Object.values(accounts).some((a) => (a.username || '').toLowerCase() === username)) throw new Error('این نام کاربری قبلاً استفاده شده است.');
        const firstName = $('#first-name').value.trim();
        const lastName = $('#last-name').value.trim();
        if (!firstName || !lastName) throw new Error('نام و نام خانوادگی را وارد کن.');
        if (accounts[phone]) throw new Error('برای این شماره قبلاً حساب ساخته شده؛ وارد شو.');

        const saltBytes = crypto.getRandomValues(new Uint8Array(16));
        const salt = bytesToHex(saltBytes);
        accounts[phone] = {
          firstName, lastName, username, gender: signupGender, avatar: '', salt,
          passwordHash: await hashPassword(password, salt),
          createdAt: new Date().toISOString()
        };
        writeAccounts(accounts);
      } else {
        try { phone = normalizePhone(identifier); } catch { const found = Object.entries(accounts).find(([, a]) => (a.username || '').toLowerCase() === identifier.toLowerCase()); phone = found ? found[0] : ''; }
        const account = phone ? accounts[phone] : null;
        if (!account) throw new Error('حسابی با این شماره یا نام کاربری روی این گوشی پیدا نشد.');
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

function showProfile() {
  if (!currentProfile) return;
  home.classList.add('auth-hidden'); $('#profile-panel').classList.remove('auth-hidden');
  $('#profile-message').textContent = '';
  $('#profile-first').value = currentProfile.firstName || ''; $('#profile-last').value = currentProfile.lastName || '';
  $('#profile-username').value = currentProfile.username || ''; $('#profile-phone').value = currentProfile.phone || '';
  $('#profile-age').value = currentProfile.age || '';
  profileGender = currentProfile.gender || '';
  $('#profile-panel').querySelectorAll('[data-gender]').forEach(b => b.classList.toggle('active', b.dataset.gender === profileGender));
  const img = $('#avatar-preview');
  const savedAvatar = typeof currentProfile.avatar === 'string' ? currentProfile.avatar : '';
  img.onerror = () => { img.classList.remove('has-avatar'); $('#avatar-placeholder').classList.remove('hidden'); };
  img.onload = () => { img.classList.add('has-avatar'); $('#avatar-placeholder').classList.add('hidden'); };
  img.classList.remove('has-avatar');
  $('#avatar-placeholder').classList.toggle('hidden', !savedAvatar);
  if (savedAvatar) { img.src = savedAvatar; } else { img.removeAttribute('src'); $('#avatar-placeholder').classList.remove('hidden'); }
}
$('#profile-button').addEventListener('click', showProfile);
$('#close-profile').addEventListener('click', () => { $('#profile-panel').classList.add('auth-hidden'); home.classList.remove('auth-hidden'); });
$('#profile-panel').querySelectorAll('[data-gender]').forEach(b => b.addEventListener('click', () => { profileGender = b.dataset.gender; $('#profile-panel').querySelectorAll('[data-gender]').forEach(x => x.classList.toggle('active', x === b)); }));
$('#avatar-file').addEventListener('change', () => {
  const file = $('#avatar-file').files?.[0]; if (!file) return;
  if (!file.type.startsWith('image/')) { $('#profile-message').textContent = 'لطفاً یک فایل تصویری انتخاب کن.'; return; }
  if (file.size > 10 * 1024 * 1024) { $('#profile-message').textContent = 'حجم عکس نباید بیشتر از ۱۰ مگابایت باشد.'; return; }
  const reader = new FileReader();
  reader.onerror = () => { $('#profile-message').textContent = 'خواندن عکس ناموفق بود؛ دوباره امتحان کن.'; };
  reader.onload = () => {
    const source = new Image();
    source.onerror = () => { $('#profile-message').textContent = 'باز کردن این عکس ممکن نشد؛ عکس دیگری انتخاب کن.'; };
    source.onload = () => {
      const maxSide = 512, scale = Math.min(1, maxSide / Math.max(source.naturalWidth, source.naturalHeight));
      const canvas = document.createElement('canvas');
      canvas.width = Math.max(1, Math.round(source.naturalWidth * scale));
      canvas.height = Math.max(1, Math.round(source.naturalHeight * scale));
      const ctx = canvas.getContext('2d');
      if (!ctx) { $('#profile-message').textContent = 'پردازش عکس در این دستگاه ممکن نشد.'; return; }
      ctx.drawImage(source, 0, 0, canvas.width, canvas.height);
      const compressed = canvas.toDataURL('image/jpeg', 0.78);
      const img = $('#avatar-preview');
      img.onload = () => { img.classList.add('has-avatar'); $('#avatar-placeholder').classList.add('hidden'); };
      img.onerror = () => { $('#profile-message').textContent = 'نمایش این عکس ممکن نشد؛ عکس دیگری انتخاب کن.'; };
      img.src = compressed; img.dataset.changed = '1';
      $('#profile-message').textContent = 'عکس انتخاب شد؛ با ذخیره تغییرات ثبت می‌شود.';
    };
    source.src = reader.result;
  };
  reader.readAsDataURL(file);
});
$('#save-profile').addEventListener('click', async () => {
  try {
    const accounts = readAccounts(), oldPhone = localStorage.getItem('kelid.sessionPhone'), account = accounts[oldPhone];
    if (!account) throw new Error('حساب پیدا نشد؛ دوباره وارد شو.');
    const firstName = $('#profile-first').value.trim(), lastName = $('#profile-last').value.trim(), username = $('#profile-username').value.trim().toLowerCase(), newPhone = normalizePhone($('#profile-phone').value), password = $('#profile-password').value, ageText = $('#profile-age').value.trim(), age = ageText ? Number(ageText) : '';
    if (!firstName || !lastName) throw new Error('نام و نام خانوادگی را وارد کن.');
    if (!/^[a-zA-Z0-9_.-]{3,20}$/.test(username)) throw new Error('نام کاربری باید ۳ تا ۲۰ نویسه معتبر باشد.');
    if (!profileGender) throw new Error('جنسیت را انتخاب کن.');
    if (age !== '' && (!Number.isInteger(age) || age < 16 || age > 120)) throw new Error('سن باید بیشتر از ۱۵ سال باشد (حداقل ۱۶ سال).');
    if (password && password.length < 8) throw new Error('رمز جدید باید حداقل ۸ نویسه باشد.');
    if (Object.entries(accounts).some(([p,a]) => p !== oldPhone && (p === newPhone || (a.username || '').toLowerCase() === username))) throw new Error('شماره یا نام کاربری قبلاً استفاده شده است.');
    const avatarImg = $('#avatar-preview');
    const updated = {...account, firstName, lastName, username, gender: profileGender, age, avatar: avatarImg.dataset.changed === '1' ? avatarImg.src : (account.avatar || '')};
    if (password) { const salt = bytesToHex(crypto.getRandomValues(new Uint8Array(16))); updated.salt = salt; updated.passwordHash = await hashPassword(password, salt); }
    if (newPhone !== oldPhone) delete accounts[oldPhone]; accounts[newPhone] = updated; writeAccounts(accounts); localStorage.setItem('kelid.sessionPhone', newPhone);
    currentProfile = {...updated, phone:newPhone}; $('#welcome-title').textContent = 'سلام ' + firstName + ' عزیز!'; $('#profile-message').textContent = 'تغییرات ذخیره شد.'; showToast('پروفایل به‌روزرسانی شد.');
  } catch (e) { $('#profile-message').textContent = e.message || 'ذخیره انجام نشد.'; }
});
$('#show-signup').addEventListener('click', () => showForm('signup'));
authForm.addEventListener('click', (event) => { const b = event.target.closest('[data-signup-gender]'); if (!b) return; signupGender = b.dataset.signupGender; authForm.querySelectorAll('[data-signup-gender]').forEach(x => x.classList.toggle('active', x === b)); });

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
      <span class="site-icon ${site.color}">${['mci','irancell','rightel'].includes(site.icon) ? `<span class="operator-wordmark ${site.icon}">${site.icon === 'mci' ? 'MCI' : site.icon === 'irancell' ? 'ایرانسل' : 'رایتل'}</span>` : site.icon}</span>
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


function updateWelcomeAvatar() {
  const image = $('#welcome-avatar'), fallback = $('#welcome-avatar-fallback');
  const avatar = currentProfile?.avatar || '';
  image.onerror = () => { image.classList.remove('visible'); fallback.classList.remove('hidden'); };
  image.onload = () => { image.classList.add('visible'); fallback.classList.add('hidden'); };
  if (avatar) image.src = avatar;
  else { image.removeAttribute('src'); image.classList.remove('visible'); }
  fallback.textContent = currentProfile?.firstName ? currentProfile.firstName.trim().slice(0, 1) : '👤';
  if (!avatar) fallback.classList.remove('hidden');
}

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
  $('#profile-panel').classList.add('auth-hidden');
  home.classList.remove('auth-hidden');
  $('#welcome-title').textContent = `سلام ${account.firstName} عزیز!`;
  updateWelcomeAvatar();
  renderServices();
}

$('#logout-button').addEventListener('click', () => {
  localStorage.removeItem('kelid.sessionPhone');
  currentProfile = null;
  authForm.innerHTML = '';
  authMessage.textContent = '';
  $('#show-login').classList.add('active');
  $('#show-signup').classList.remove('active');
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
