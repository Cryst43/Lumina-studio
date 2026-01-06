/* ---------- Firebase Configuration ---------- */
// 🔥 الخطوة 1: استبدل هذه البيانات ببيانات مشروعك في Firebase
// 🔥 الخطوة 2: اذهب إلى console.firebase.google.com وأنشئ مشروع
// 🔥 الخطوة 3: أضف تطبيق ويب واحصل على بيانات التكوين
const firebaseConfig = {
  apiKey: "AIzaSyALohL69p-dfiV3Oua4EYtDlTvtRQmViLY",
  authDomain: "my-project-f5a64.firebaseapp.com",
  projectId: "my-project-f5a64",
  storageBucket: "my-project-f5a64.firebasestorage.app",
  messagingSenderId: "514130850636",
  appId: "1:514130850636:web:87025e1c2e1180a5c155e9",
  measurementId: "G-47X5ERBDY0"
};

// Initialize Firebase
let firebaseApp;
let firebaseAuth;
let firestore;

try {
  firebaseApp = firebase.initializeApp(firebaseConfig);
  firebaseAuth = firebaseApp.auth();
  firestore = firebase.firestore(); // Initialize Firestore
  console.log("Firebase initialized successfully");
} catch (error) {
  console.error("Firebase initialization error:", error);
  // Fallback to mock authentication if Firebase fails
}

/* ---------- Application State ---------- */
const state = {
  colors: ['#6366F1','#A855F7','#EC4899'],
  steps: 15,
  vivid: false,
  theme: 'dark',
  generated: [],
  language: 'ar', // Default to Arabic
  userGradients: [], // سيتم تعبئتها من Firebase أو localStorage
  lastHarmonySeed: 0,
  user: JSON.parse(localStorage.getItem('luminaUser') || 'null'),
  userPreferences: JSON.parse(localStorage.getItem('luminaUserPreferences') || '{}'),
  firebaseAvailable: !!firebaseApp
};

const DOM = {
  colorList: document.getElementById('colorList'),
  stepsSlider: document.getElementById('stepsInput'),
  stepsVal: document.getElementById('stepsVal'),
  stepsDecrease: document.getElementById('stepsDecrease'),
  stepsIncrease: document.getElementById('stepsIncrease'),
  vividFlag: document.getElementById('checkVivid'),
  genBase: document.getElementById('genBaseColor'),
  genHex: document.getElementById('genBaseHex'),
  genMode: document.getElementById('genMode'),
  basePosition: document.getElementById('basePosition'),
  btnGen: document.getElementById('btnSmartGenerate'),
  btnAdd: document.getElementById('btnAddColor'),
  btnRandom: document.getElementById('btnRandom'),
  preview: document.getElementById('previewBox'),
  cssText: document.getElementById('cssPreviewText'),
  cssTrigger: document.getElementById('cssPreviewTrigger'),
  strip: document.getElementById('stepsGrid'),
  // Export
  exportToggle: document.getElementById('btnExportToggle'),
  exportMenu: document.getElementById('exportMenu'),
  actions: {
    css: document.getElementById('actCopyCSS'),
    tw: document.getElementById('actCopyTailwind'),
    dlCss: document.getElementById('actDownloadCSS'),
    dlPng: document.getElementById('actDownloadPNG')
  },
  // Modals
  presetsBtn: document.getElementById('openPresetsBtn'),
  presetsModal: document.getElementById('presetsModal'),
  presetsGrid: document.getElementById('presetsGrid'),
  breakdownBtn: document.getElementById('openBreakdownBtn'),
  breakdownModal: document.getElementById('breakdownModal'),
  breakGrid: document.getElementById('breakGrid'),
  // User Gradients
  saveGradientBtn: document.getElementById('saveGradientBtn'),
  userGradientsGrid: document.getElementById('userGradientsGrid'),
  clearSavedGradients: document.getElementById('clearSavedGradients'),
  // Auth
  userAccountBtn: document.getElementById('userAccountBtn'),
  userName: document.getElementById('userName'),
  userAvatar: document.getElementById('userAvatar'),
  authModal: document.getElementById('authModal'),
  authModalTitle: document.getElementById('authModalTitle'),
  authError: document.getElementById('authError'),
  signInForm: document.getElementById('signInForm'),
  signUpForm: document.getElementById('signUpForm'),
  userProfile: document.getElementById('userProfile'),
  signInEmail: document.getElementById('signInEmail'),
  signInPassword: document.getElementById('signInPassword'),
  signInBtn: document.getElementById('signInBtn'),
  signUpName: document.getElementById('signUpName'),
  signUpEmail: document.getElementById('signUpEmail'),
  signUpPassword: document.getElementById('signUpPassword'),
  signUpConfirmPassword: document.getElementById('signUpConfirmPassword'),
  signUpBtn: document.getElementById('signUpBtn'),
  googleSignInBtn: document.getElementById('googleSignInBtn'),
  googleSignUpBtn: document.getElementById('googleSignUpBtn'),
  switchToSignUp: document.getElementById('switchToSignUp'),
  switchToSignIn: document.getElementById('switchToSignIn'),
  updateProfileBtn: document.getElementById('updateProfileBtn'),
  profileName: document.getElementById('profileName'),
  profileEmail: document.getElementById('profileEmail'),
  signOutBtn: document.getElementById('signOutBtn'),
  profileUserName: document.getElementById('profileUserName'),
  profileUserEmail: document.getElementById('profileUserEmail'),
  // Utils
  toast: document.getElementById('toast'),
  canvas: document.getElementById('exportCanvas'),
  themeToggle: document.getElementById('themeToggle'),
  langToggle: document.getElementById('langToggle'),
  langDropdown: document.getElementById('langDropdown'),
  langOptions: document.querySelectorAll('.lang-option'),
  body: document.body,
  baseColorPreview: document.getElementById('baseColorPreview')
};

/* ---------- Language Support ---------- */
const translations = {
  en: {
    appTitle: "Lumina Studio",
    smartGenerator: "Harmony Generator",
    baseColor: "Base Color",
    harmonyMode: "Color Count",
    generatePalette: "Generate New Harmony",
    colorStops: "Color Stops",
    randomize: "Randomize All",
    addStop: "Add Stop",
    configuration: "Configuration",
    stepsPrecision: "Steps / Precision",
    vividMode: "Vivid Mode (LAB)",
    vividDescription: "Perceptually uniform interpolation preventing 'gray dead zones' in gradients.",
    gallery: "Gallery",
    analyze: "Analyze",
    saveGradient: "Save Gradient",
    downloadExport: "Download / Export",
    copyCSS: "📋 Copy CSS",
    copyTailwind: "💨 Copy Tailwind",
    downloadCSS: "📄 Download .CSS",
    downloadPNG: "🖼️ Download .PNG",
    gradientSpectrum: "Gradient Spectrum",
    spectrumHint: "Hover to identify, click to copy",
    gradientGallery: "Gradient Gallery",
    colorAnalysis: "Color Analysis",
    clickToCopy: "CLICK TO COPY",
    clickToCopyTitle: "Click to copy",
    randomCount: "Random (2-5)",
    twoColors: "2 Colors",
    threeColors: "3 Colors",
    fourColors: "4 Colors",
    fiveColors: "5 Colors",
    basePosition: "Base Color Position",
    atStart: "At Start",
    atEnd: "At End",
    inMiddle: "In Middle",
    randomPosition: "Random",
    builtinGradients: "Built-in Gradients",
    mySavedGradients: "My Saved Gradients",
    clearAll: "Clear All",
    signIn: "Sign In",
    signUp: "Sign Up",
    signOut: "Sign Out",
    welcomeBack: "Welcome Back",
    signInToContinue: "Sign in to continue to Lumina Studio",
    emailAddress: "Email Address",
    password: "Password",
    signInWithGoogle: "Sign in with Google",
    dontHaveAccount: "Don't have an account?",
    createAccount: "Create Account",
    joinLuminaStudio: "Join Lumina Studio to save your work",
    fullName: "Full Name",
    confirmPassword: "Confirm Password",
    signUpWithGoogle: "Sign up with Google",
    alreadyHaveAccount: "Already have an account?",
    updateProfile: "Update Profile",
    accountSynced: "Your data is automatically synced to your account",
    orContinueWith: "Or continue with",
    profile: "Profile",
    loading: "Loading...",
    noSavedGradients: "No saved gradients yet. Create one and click 'Save Gradient'!",
    signInToSaveGradients: "Sign in to save and view your gradients"
  },
  ar: {
    appTitle: "Lumina Studio",
    smartGenerator: "مولد التناغم",
    baseColor: "اللون الأساسي",
    harmonyMode: "عدد الألوان",
    generatePalette: "إنشاء تناغم جديد",
    colorStops: "نقاط الألوان",
    randomize: "عشوائي كلي",
    addStop: "إضافة نقطة",
    configuration: "الإعدادات",
    stepsPrecision: "الخطوات / الدقة",
    vividMode: "الوضع الحيوي (LAB)",
    vividDescription: "استيفاء موحد إدراكياً يمنع 'المناطق الرمادية الميتة' في التدرجات.",
    gallery: "المعرض",
    analyze: "تحليل",
    saveGradient: "حفظ التدرج",
    downloadExport: "تنزيل / تصدير",
    copyCSS: "📋 نسخ CSS",
    copyTailwind: "💨 نسخ Tailwind",
    downloadCSS: "📄 تنزيل .CSS",
    downloadPNG: "🖼️ تنزيل .PNG",
    gradientSpectrum: "طيف التدرج",
    spectrumHint: "مرر للتحديد، انقر للنسخ",
    gradientGallery: "معرض التدرجات",
    colorAnalysis: "تحليل الألوان",
    clickToCopy: "انقر للنسخ",
    clickToCopyTitle: "انقر للنسخ",
    randomCount: "عشوائي (2-5)",
    twoColors: "لونين",
    threeColors: "3 ألوان",
    fourColors: "4 ألوان",
    fiveColors: "5 ألوان",
    basePosition: "موقع اللون الأساسي",
    atStart: "في البداية",
    atEnd: "في النهاية",
    inMiddle: "في المنتصف",
    randomPosition: "عشوائي",
    builtinGradients: "التدرجات المضمنة",
    mySavedGradients: "تدرجاتي المحفوظة",
    clearAll: "مسح الكل",
    signIn: "تسجيل الدخول",
    signUp: "إنشاء حساب",
    signOut: "تسجيل الخروج",
    welcomeBack: "مرحباً بعودتك",
    signInToContinue: "سجل الدخول للمتابعة إلى Lumina Studio",
    emailAddress: "البريد الإلكتروني",
    password: "كلمة المرور",
    signInWithGoogle: "تسجيل الدخول بواسطة Google",
    dontHaveAccount: "ليس لديك حساب؟",
    createAccount: "إنشاء حساب",
    joinLuminaStudio: "انضم إلى Lumina Studio لحفظ عملك",
    fullName: "الاسم الكامل",
    confirmPassword: "تأكيد كلمة المرور",
    signUpWithGoogle: "التسجيل بواسطة Google",
    alreadyHaveAccount: "لديك حساب بالفعل؟",
    updateProfile: "تحديث الملف الشخصي",
    accountSynced: "بياناتك متزامنة تلقائياً مع حسابك",
    orContinueWith: "أو تابع باستخدام",
    profile: "الملف الشخصي",
    loading: "جاري التحميل...",
    noSavedGradients: "لا توجد تدرجات محفوظة بعد. قم بإنشاء واحدة وانقر على 'حفظ التدرج'!",
    signInToSaveGradients: "سجل الدخول لحفظ ومشاهدة تدرجاتك"
  }
};

/* ---------- Language Auto-detection ---------- */
function detectBrowserLanguage() {
  const browserLang = navigator.language || navigator.userLanguage;
  const langCode = browserLang.split('-')[0];
  
  // Supported languages
  const supportedLangs = ['en', 'ar', 'fr', 'es', 'de', 'zh', 'ja', 'ru', 'tr', 'pt', 'hi', 'ko', 'it'];
  
  if (supportedLangs.includes(langCode)) {
    return langCode;
  }
  
  return 'ar'; // Default to Arabic
}

function setLanguage(lang) {
  state.language = lang;
  DOM.body.setAttribute('dir', lang === 'ar' ? 'rtl' : 'ltr');
  
  const langNames = {
    en: "EN", ar: "AR", fr: "FR", es: "ES", 
    de: "DE", zh: "ZH", ja: "JA", ru: "RU",
    tr: "TR", pt: "PT", hi: "HI", ko: "KO", it: "IT"
  };
  DOM.langToggle.textContent = `🌐 ${langNames[lang]}`;
  
  DOM.langOptions.forEach(option => {
    if (option.dataset.lang === lang) {
      option.classList.add('active');
    } else {
      option.classList.remove('active');
    }
  });
  
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n');
    if (translations[lang] && translations[lang][key]) {
      el.textContent = translations[lang][key];
    } else if (translations['en'][key]) {
      el.textContent = translations['en'][key];
    }
  });
  
  document.querySelectorAll('[data-i18n-title]').forEach(el => {
    const key = el.getAttribute('data-i18n-title');
    if (translations[lang] && translations[lang][key]) {
      el.title = translations[lang][key];
    } else if (translations['en'][key]) {
      el.title = translations['en'][key];
    }
  });
  
  document.querySelectorAll('select option').forEach(option => {
    const key = option.getAttribute('data-i18n');
    if (key && translations[lang] && translations[lang][key]) {
      option.textContent = translations[lang][key];
    } else if (key && translations['en'][key]) {
      option.textContent = translations['en'][key];
    }
  });
  
  // Save language preference
  saveUserPreferences();
  
  // Update button text for loading states
  updateButtonLoadingStates();
}

// Helper function to update button loading states
function updateButtonLoadingStates() {
  const buttons = [
    { btn: DOM.signInBtn, textKey: 'signIn' },
    { btn: DOM.signUpBtn, textKey: 'createAccount' },
    { btn: DOM.updateProfileBtn, textKey: 'updateProfile' }
  ];
  
  buttons.forEach(({ btn, textKey }) => {
    if (btn) {
      const btnText = btn.querySelector('.btn-text');
      if (btnText) {
        btnText.textContent = translations[state.language][textKey] || translations['en'][textKey];
      }
    }
  });
}

// Helper function to get localized messages
function getMessage(key) {
  const messages = {
    languageChanged: {
      en: 'Language changed to English',
      ar: 'تم تغيير اللغة إلى العربية',
      fr: 'Langue changée en français',
      es: 'Idioma cambiado a español',
      de: 'Sprache zu Deutsch geändert',
      zh: '语言已更改为中文',
      ja: '言語が日本語に変更されました',
      ru: 'Язык изменen на русский',
      tr: 'Dil Türkçe olarak değiştirildi',
      pt: 'Idioma alterado para português',
      hi: 'भाषा हिंदी में बदली गई',
      ko: '언어가 한국어로 변경되었습니다',
      it: 'Lingua cambiata in italiano'
    },
    paletteGenerated: {
      en: 'New harmonious palette generated',
      ar: 'تم إنشاء لوحة ألوان متناسقة جديدة',
      fr: 'Nouvelle palette harmonieuse générée',
      es: 'Nueva paleta armónica generada',
      de: 'Neue harmonische Palette erstellt',
      zh: '新的和谐调色板已生成',
      ja: '新しい調和パレットが生成されました',
      ru: 'Новая гармоничная палитра создана',
      tr: 'Yeni uyumlu palet oluşturuldu',
      pt: 'Nova paleta harmoniosa gerada',
      hi: 'नया सामंजस्यपूर्ण पैलेट उत्पन्न हुआ',
      ko: '새로운 조화로운 팔레트 생성됨',
      it: 'Nuova palette armoniosa generata'
    },
    gradientSaved: {
      en: 'Gradient saved to your gallery',
      ar: 'تم حفظ التدرج في معرضك',
      fr: 'Dégradé enregistré dans votre galerie',
      es: 'Degradado guardado en tu galería',
      de: 'Verlauf in deiner Galerie gespeichert',
      zh: '渐变已保存到您的画廊',
      ja: 'グラデーションがギャラリーに保存されました',
      ru: 'Градиент сохранен в вашу галерею',
      tr: 'Gradyan galerinize kaydedildi',
      pt: 'Gradiente guardado na sua galeria',
      hi: 'ग्रेडिएंट आपकी गैलरी में सहेजा गया',
      ko: '그라데이션이 갤러리에 저장되었습니다',
      it: 'Gradiente salvato nella tua galleria'
    },
    signedIn: {
      en: 'Signed in successfully',
      ar: 'تم تسجيل الدخول بنجاح',
      fr: 'Connecté avec succès',
      es: 'Inició sesión con éxito',
      de: 'Erfolgreich angemeldet',
      zh: '登录成功',
      ja: 'ログインに成功しました',
      ru: 'Вход выполнен успешно',
      tr: 'Başarıyla giriş yapıldı',
      pt: 'Sessão iniciada com sucesso',
      hi: 'सफलतापूर्वक साइन इन किया गया',
      ko: '로그인에 성공했습니다',
      it: 'Accesso eseguito con successo'
    },
    signedOut: {
      en: 'Signed out successfully',
      ar: 'تم تسجيل الخروج بنجاح',
      fr: 'Déconnecté avec succès',
      es: 'Cerró sesión con éxito',
      de: 'Erfolgreich abgemeldet',
      zh: '退出登录成功',
      ja: 'ログアウトに成功しました',
      ru: 'Выход выполнен успешно',
      tr: 'Başarıyla çıkış yapıldı',
      pt: 'Sessão terminada com sucesso',
      hi: 'सफलतापूर्वक साइन आउट किया गया',
      ko: '로그아웃에 성공했습니다',
      it: 'Uscita eseguita con successo'
    },
    accountCreated: {
      en: 'Account created successfully',
      ar: 'تم إنشاء الحساب بنجاح',
      fr: 'Compte créé avec succès',
      es: 'Cuenta creada con éxito',
      de: 'Konto успешно erstellt',
      zh: '账户创建成功',
      ja: 'アカウントが正常に作成されました',
      ru: 'Аккаунт успешно создан',
      tr: 'Hesap başarıyla oluşturuldu',
      pt: 'Conta criada com sucesso',
      hi: 'खाता सफलतापूर्वक बनाया गया',
      ko: '계정이 성공적으로 생성되었습니다',
      it: 'Account creato con successo'
    }
  };
  return messages[key] && messages[key][state.language] ? messages[key][state.language] : messages[key].en;
}

/* ---------- Color Utilities ---------- */
const clamp = (v,a,b) => Math.max(a,Math.min(b,v));
const normHex = (h) => {
  if(!h) return '#000000';
  h = String(h).trim().toUpperCase();
  if(!h.startsWith('#')) h = '#'+h;
  if(/^#[0-9A-F]{3}$/i.test(h)) h = '#'+h.slice(1).split('').map(x=>x+x).join('');
  return /^#[0-9A-F]{6}$/i.test(h) ? h : '#000000';
};
const hexToRgb = (hex) => {
  hex = normHex(hex).slice(1);
  return {r:parseInt(hex.slice(0,2),16), g:parseInt(hex.slice(2,4),16), b:parseInt(hex.slice(4,6),16)};
};
const rgbToHex = (r,g,b) => '#'+[r,g,b].map(x=>clamp(Math.round(x),0,255).toString(16).padStart(2,'0')).join('').toUpperCase();

// RGB to HSL conversion
function rgbToHsl(r, g, b) {
  r /= 255; g /= 255; b /= 255;
  const max = Math.max(r, g, b), min = Math.min(r, g, b);
  let h, s, l = (max + min) / 2;
  
  if (max === min) {
    h = s = 0;
  } else {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    switch(max) {
      case r: h = (g - b) / d + (g < b ? 6 : 0); break;
      case g: h = (b - r) / d + 2; break;
      case b: h = (r - g) / d + 4; break;
    }
    h /= 6;
  }
  return [h, s, l];
}

// HSL to RGB conversion
function hslToRgb(h, s, l) {
  let r, g, b;
  
  if (s === 0) {
    r = g = b = l;
  } else {
    const hue2rgb = (p, q, t) => {
      if (t < 0) t += 1;
      if (t > 1) t -= 1;
      if (t < 1/6) return p + (q - p) * 6 * t;
      if (t < 1/2) return q;
      if (t < 2/3) return p + (q - p) * (2/3 - t) * 6;
      return p;
    };
    
    const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
    const p = 2 * l - q;
    r = hue2rgb(p, q, h + 1/3);
    g = hue2rgb(p, q, h);
    b = hue2rgb(p, q, h - 1/3);
  }
  
  return [r * 255, g * 255, b * 255];
}

// Generate new random harmonious colors based on base color
function generateNewHarmoniousColors(baseColor) {
  const baseRgb = hexToRgb(baseColor);
  const [h, s, l] = rgbToHsl(baseRgb.r, baseRgb.g, baseRgb.b);
  
  // Increment seed for different results each time
  state.lastHarmonySeed = (state.lastHarmonySeed + 1) % 1000;
  
  // Get color count
  let count;
  if (DOM.genMode.value === 'random') {
    count = Math.floor(Math.random() * 4) + 2; // 2-5 colors
  } else {
    count = parseInt(DOM.genMode.value);
  }
  
  // Get base position
  const position = DOM.basePosition.value;
  
  const colors = [];
  
  // Generate harmonious colors with different variations each time
  for (let i = 0; i < count; i++) {
    // Use seed to create deterministic but different results
    const seed = state.lastHarmonySeed + i * 123;
    const randomFactor = Math.sin(seed) * 0.5 + 0.5; // 0-1 range
    
    // Create variations by adjusting hue, saturation, and lightness
    let newH = (h + (randomFactor * 0.4)) % 1; // Different hue shift each time
    let newS = clamp(s + (Math.sin(seed * 1.3) * 0.3 - 0.15), 0.3, 0.9);
    let newL = clamp(l + (Math.cos(seed * 0.7) * 0.3 - 0.15), 0.2, 0.8);
    
    // For complementary colors (every other color)
    if (i % 2 === 1 && count > 2) {
      newH = (h + 0.5 + randomFactor * 0.1) % 1; // Complementary with variation
      newL = clamp(l + 0.1 + Math.sin(seed) * 0.1, 0.2, 0.8);
    }
    
    const [r, g, b] = hslToRgb(newH, newS, newL);
    colors.push(rgbToHex(Math.round(r), Math.round(g), Math.round(b)));
  }
  
  // Place base color according to position
  const baseColorHex = normHex(baseColor);
  let finalColors = [...colors];
  
  switch(position) {
    case 'start':
      finalColors = [baseColorHex, ...colors.slice(0, count-1)];
      break;
    case 'end':
      finalColors = [...colors.slice(0, count-1), baseColorHex];
      break;
    case 'middle':
      const middleIndex = Math.floor(count / 2);
      finalColors[middleIndex] = baseColorHex;
      break;
    case 'random':
      const randomIndex = Math.floor(Math.random() * count);
      finalColors[randomIndex] = baseColorHex;
      break;
  }
  
  return finalColors.slice(0, count);
}

// Simple Linear Blend
function blendHex(a,b,t){
  const A=hexToRgb(a), B=hexToRgb(b);
  return rgbToHex(
    A.r+(B.r-A.r)*t,
    A.g+(B.g-A.g)*t,
    A.b+(B.b-A.b)*t
  );
}

// LAB-based blend (perceptually uniform)
function labBlendHex(a,b,t){
  // Simplified version - in production you'd want a full LAB conversion
  // This is a placeholder that approximates LAB blending
  const A=hexToRgb(a), B=hexToRgb(b);
  
  // Convert to linear RGB
  const toLinear = (c) => {
    c /= 255;
    return c <= 0.04045 ? c/12.92 : Math.pow((c+0.055)/1.055, 2.4);
  };
  
  // Convert back to sRGB
  const toGamma = (c) => {
    return c <= 0.0031308 ? 12.92*c : 1.055*Math.pow(c,1/2.4)-0.055;
  };
  
  const r1 = toLinear(A.r), g1 = toLinear(A.g), b1 = toLinear(A.b);
  const r2 = toLinear(B.r), g2 = toLinear(B.g), b2 = toLinear(B.b);
  
  const r = toGamma(r1 + (r2 - r1) * t) * 255;
  const g = toGamma(g1 + (g2 - g1) * t) * 255;
  const b = toGamma(b1 + (b2 - b1) * t) * 255;
  
  return rgbToHex(clamp(r,0,255), clamp(g,0,255), clamp(b,0,255));
}

/* ---------- Firebase Firestore Functions ---------- */

// Save gradient to Firestore
async function saveGradientToFirestore(gradient) {
  if (!state.firebaseAvailable || !state.user) return null;
  
  try {
    const gradientRef = firestore.collection('users').doc(state.user.uid).collection('gradients').doc();
    const gradientData = {
      ...gradient,
      id: gradientRef.id,
      userId: state.user.uid,
      createdAt: firebase.firestore.FieldValue.serverTimestamp(),
      updatedAt: firebase.firestore.FieldValue.serverTimestamp()
    };
    
    await gradientRef.set(gradientData);
    console.log('Gradient saved to Firestore:', gradientData.id);
    return gradientData;
  } catch (error) {
    console.error('Error saving gradient to Firestore:', error);
    return null;
  }
}

// Load user gradients from Firestore
async function loadUserGradientsFromFirestore() {
  if (!state.firebaseAvailable || !state.user) return [];
  
  try {
    const gradientsRef = firestore.collection('users').doc(state.user.uid).collection('gradients');
    const snapshot = await gradientsRef.orderBy('createdAt', 'desc').get();
    
    const gradients = [];
    snapshot.forEach(doc => {
      gradients.push({
        id: doc.id,
        ...doc.data()
      });
    });
    
    console.log('Loaded gradients from Firestore:', gradients.length);
    return gradients;
  } catch (error) {
    console.error('Error loading gradients from Firestore:', error);
    return [];
  }
}

// Delete gradient from Firestore
async function deleteGradientFromFirestore(gradientId) {
  if (!state.firebaseAvailable || !state.user) return false;
  
  try {
    await firestore.collection('users').doc(state.user.uid).collection('gradients').doc(gradientId).delete();
    console.log('Gradient deleted from Firestore:', gradientId);
    return true;
  } catch (error) {
    console.error('Error deleting gradient from Firestore:', error);
    return false;
  }
}

// Clear all user gradients from Firestore
async function clearAllUserGradientsFromFirestore() {
  if (!state.firebaseAvailable || !state.user) return false;
  
  try {
    const gradientsRef = firestore.collection('users').doc(state.user.uid).collection('gradients');
    const snapshot = await gradientsRef.get();
    
    const batch = firestore.batch();
    snapshot.forEach(doc => {
      batch.delete(doc.ref);
    });
    
    await batch.commit();
    console.log('All gradients deleted from Firestore');
    return true;
  } catch (error) {
    console.error('Error clearing gradients from Firestore:', error);
    return false;
  }
}

/* ---------- Gradient Management ---------- */

// Save gradient locally and to Firestore
async function saveGradient() {
  const gradient = {
    colors: [...state.colors],
    steps: state.steps,
    vivid: state.vivid,
    createdAt: new Date().toISOString(),
    name: `Gradient ${new Date().toLocaleDateString()}`
  };
  
  // Save to local state
  state.userGradients.unshift(gradient);
  
  // Save to localStorage (for offline use)
  localStorage.setItem('luminaUserGradients', JSON.stringify(state.userGradients));
  
  // Save to Firestore if user is logged in
  if (state.firebaseAvailable && state.user) {
    const savedGradient = await saveGradientToFirestore(gradient);
    if (savedGradient) {
      gradient.id = savedGradient.id;
    }
  }
  
  // Update UI
  renderUserGradients();
  showToast(getMessage('gradientSaved'));
}

// Load user gradients from both localStorage and Firestore
async function loadUserGradients() {
  // Load from localStorage first
  const localGradients = JSON.parse(localStorage.getItem('luminaUserGradients') || '[]');
  
  // Load from Firestore if user is logged in
  let firestoreGradients = [];
  if (state.firebaseAvailable && state.user) {
    firestoreGradients = await loadUserGradientsFromFirestore();
    
    // Merge gradients, preferring Firestore data
    const mergedGradients = [...firestoreGradients];
    
    // Add local gradients that don't exist in Firestore
    localGradients.forEach(localGrad => {
      if (!localGrad.id && !mergedGradients.some(g => 
        g.colors.join(',') === localGrad.colors.join(',') && 
        g.steps === localGrad.steps
      )) {
        mergedGradients.push(localGrad);
      }
    });
    
    state.userGradients = mergedGradients;
  } else {
    // Not logged in, use local gradients only
    state.userGradients = localGradients;
  }
  
  // Save back to localStorage for consistency
  localStorage.setItem('luminaUserGradients', JSON.stringify(state.userGradients));
  
  // Update UI
  renderUserGradients();
}

// Clear all saved gradients
async function clearSavedGradients() {
  if (confirm(state.language === 'ar' ? 'هل أنت متأكد من مسح جميع التدرجات المحفوظة؟' : 'Are you sure you want to clear all saved gradients?')) {
    // Clear from Firestore
    if (state.firebaseAvailable && state.user) {
      await clearAllUserGradientsFromFirestore();
    }
    
    // Clear from local state and storage
    state.userGradients = [];
    localStorage.removeItem('luminaUserGradients');
    
    // Update UI
    renderUserGradients();
    showToast(state.language === 'ar' ? 'تم مسح جميع التدرجات' : 'All gradients cleared');
  }
}

// Delete a single gradient
async function deleteGradient(gradientId) {
  // Delete from Firestore
  if (state.firebaseAvailable && state.user && gradientId) {
    await deleteGradientFromFirestore(gradientId);
  }
  
  // Delete from local state
  state.userGradients = state.userGradients.filter(g => g.id !== gradientId);
  
  // Update localStorage
  localStorage.setItem('luminaUserGradients', JSON.stringify(state.userGradients));
  
  // Update UI
  renderUserGradients();
}

/* ---------- UI Rendering ---------- */

// Render user gradients in the gallery
function renderUserGradients() {
  const container = DOM.userGradientsGrid;
  if (!container) return;
  
  if (state.userGradients.length === 0) {
    const messageKey = state.user ? 'noSavedGradients' : 'signInToSaveGradients';
    container.innerHTML = `
      <div class="no-gradients-message">
        <p data-i18n="${messageKey}">${translations[state.language][messageKey]}</p>
      </div>
    `;
    return;
  }
  
  let html = '';
  state.userGradients.forEach((grad, idx) => {
    const gradientCSS = generateGradientCSS(grad.colors, grad.steps, grad.vivid);
    const colorStops = grad.colors.map(c => `<div class="preset-strip" style="background-color:${c}"></div>`).join('');
    
    html += `
      <div class="preset-item" data-id="${grad.id || idx}">
        <div class="preset-preview">
          ${colorStops}
        </div>
        <div class="preset-info spread">
          <span>${grad.name || `Gradient ${idx + 1}`}</span>
          <button class="btn-icon delete-gradient" title="${state.language === 'ar' ? 'حذف' : 'Delete'}" style="font-size:12px">🗑️</button>
        </div>
      </div>
    `;
  });
  
  container.innerHTML = html;
  
  // Add event listeners for gradient items
  container.querySelectorAll('.preset-item').forEach(item => {
    const gradientId = item.dataset.id;
    const gradient = state.userGradients.find(g => g.id === gradientId || 
      (!g.id && state.userGradients.indexOf(g).toString() === gradientId));
    
    if (gradient) {
      item.addEventListener('click', (e) => {
        if (!e.target.closest('.delete-gradient')) {
          loadGradient(gradient);
          closeModal(DOM.presetsModal);
        }
      });
      
      const deleteBtn = item.querySelector('.delete-gradient');
      if (deleteBtn) {
        deleteBtn.addEventListener('click', async (e) => {
          e.stopPropagation();
          await deleteGradient(gradientId);
        });
      }
    }
  });
}

// Load a gradient into the editor
function loadGradient(gradient) {
  state.colors = [...gradient.colors];
  state.steps = gradient.steps;
  state.vivid = gradient.vivid || false;
  
  // Update UI controls
  DOM.stepsSlider.value = state.steps;
  DOM.stepsVal.textContent = state.steps;
  DOM.vividFlag.checked = state.vivid;
  
  // Render color list
  renderColorList();
  
  // Update preview
  updatePreview();
  updateStrip();
  updateCSS();
  
  showToast(state.language === 'ar' ? 'تم تحميل التدرج' : 'Gradient loaded');
}

/* ---------- User Authentication ---------- */

// Save user preferences to Firestore
async function saveUserPreferences() {
  if (!state.firebaseAvailable || !state.user) return;
  
  try {
    const userRef = firestore.collection('users').doc(state.user.uid);
    await userRef.set({
      preferences: state.userPreferences,
      language: state.language,
      updatedAt: firebase.firestore.FieldValue.serverTimestamp()
    }, { merge: true });
  } catch (error) {
    console.error('Error saving user preferences:', error);
  }
}

// Load user preferences from Firestore
async function loadUserPreferences() {
  if (!state.firebaseAvailable || !state.user) return;
  
  try {
    const userRef = firestore.collection('users').doc(state.user.uid);
    const doc = await userRef.get();
    
    if (doc.exists) {
      const data = doc.data();
      if (data.preferences) {
        state.userPreferences = { ...state.userPreferences, ...data.preferences };
      }
      if (data.language) {
        setLanguage(data.language);
      }
    }
  } catch (error) {
    console.error('Error loading user preferences:', error);
  }
}

// Update user profile
async function updateUserProfile() {
  if (!state.firebaseAvailable || !state.user) return;
  
  try {
    const user = firebaseAuth.currentUser;
    await user.updateProfile({
      displayName: DOM.profileName.value
    });
    
    showToast(getMessage('updateProfile'));
    updateUserUI();
  } catch (error) {
    console.error('Error updating profile:', error);
    showAuthError(error.message);
  }
}

// Sign in with email/password
async function signInWithEmail(email, password) {
  try {
    setAuthLoading(true, DOM.signInBtn);
    const userCredential = await firebaseAuth.signInWithEmailAndPassword(email, password);
    state.user = userCredential.user;
    
    // Save to localStorage
    localStorage.setItem('luminaUser', JSON.stringify({
      uid: state.user.uid,
      email: state.user.email,
      displayName: state.user.displayName
    }));
    
    // Load user data
    await loadUserPreferences();
    await loadUserGradients();
    
    updateUserUI();
    closeAuthModal();
    showToast(getMessage('signedIn'));
  } catch (error) {
    showAuthError(error.message);
  } finally {
    setAuthLoading(false, DOM.signInBtn);
  }
}

// Sign up with email/password
async function signUpWithEmail(name, email, password) {
  try {
    setAuthLoading(true, DOM.signUpBtn);
    const userCredential = await firebaseAuth.createUserWithEmailAndPassword(email, password);
    
    // Update profile with name
    await userCredential.user.updateProfile({
      displayName: name
    });
    
    state.user = userCredential.user;
    
    // Save to localStorage
    localStorage.setItem('luminaUser', JSON.stringify({
      uid: state.user.uid,
      email: state.user.email,
      displayName: state.user.displayName
    }));
    
    // Create user document in Firestore
    await firestore.collection('users').doc(state.user.uid).set({
      displayName: name,
      email: email,
      createdAt: firebase.firestore.FieldValue.serverTimestamp(),
      preferences: state.userPreferences
    });
    
    updateUserUI();
    closeAuthModal();
    showToast(getMessage('accountCreated'));
  } catch (error) {
    showAuthError(error.message);
  } finally {
    setAuthLoading(false, DOM.signUpBtn);
  }
}

// Sign in with Google
async function signInWithGoogle() {
  try {
    const provider = new firebase.auth.GoogleAuthProvider();
    const userCredential = await firebaseAuth.signInWithPopup(provider);
    state.user = userCredential.user;
    
    // Save to localStorage
    localStorage.setItem('luminaUser', JSON.stringify({
      uid: state.user.uid,
      email: state.user.email,
      displayName: state.user.displayName
    }));
    
    // Create user document if it doesn't exist
    const userRef = firestore.collection('users').doc(state.user.uid);
    const doc = await userRef.get();
    
    if (!doc.exists) {
      await userRef.set({
        displayName: state.user.displayName,
        email: state.user.email,
        createdAt: firebase.firestore.FieldValue.serverTimestamp(),
        preferences: state.userPreferences
      });
    }
    
    // Load user data
    await loadUserPreferences();
    await loadUserGradients();
    
    updateUserUI();
    closeAuthModal();
    showToast(getMessage('signedIn'));
  } catch (error) {
    showAuthError(error.message);
  }
}

// Sign out
async function signOut() {
  try {
    await firebaseAuth.signOut();
    state.user = null;
    localStorage.removeItem('luminaUser');
    
    // Keep local gradients but clear the Firestore-loaded ones
    const localGradients = JSON.parse(localStorage.getItem('luminaUserGradients') || '[]')
      .filter(g => !g.id); // Keep only gradients without IDs (local ones)
    
    state.userGradients = localGradients;
    localStorage.setItem('luminaUserGradients', JSON.stringify(localGradients));
    
    updateUserUI();
    renderUserGradients();
    showToast(getMessage('signedOut'));
  } catch (error) {
    console.error('Error signing out:', error);
  }
}

// Update user UI
function updateUserUI() {
  if (state.user) {
    DOM.userName.textContent = state.user.displayName || state.user.email;
    DOM.userAvatar.textContent = state.user.displayName ? state.user.displayName.charAt(0).toUpperCase() : '👤';
    DOM.profileName.value = state.user.displayName || '';
    DOM.profileEmail.value = state.user.email || '';
    DOM.profileUserName.textContent = state.user.displayName || state.user.email;
    DOM.profileUserEmail.textContent = state.user.email || '';
  } else {
    DOM.userName.textContent = translations[state.language].signIn;
    DOM.userAvatar.textContent = '👤';
  }
}

/* ---------- UI Functions ---------- */

// Show toast message
function showToast(message) {
  DOM.toast.textContent = message;
  DOM.toast.classList.add('show');
  setTimeout(() => DOM.toast.classList.remove('show'), 3000);
}

// Show auth error
function showAuthError(message) {
  DOM.authError.textContent = message;
  DOM.authError.classList.add('show');
  setTimeout(() => DOM.authError.classList.remove('show'), 5000);
}

// Set auth loading state
function setAuthLoading(isLoading, button) {
  const btnText = button.querySelector('.btn-text');
  const spinner = button.querySelector('.spinner');
  
  if (isLoading) {
    btnText.style.display = 'none';
    spinner.style.display = 'inline-block';
    button.disabled = true;
  } else {
    btnText.style.display = 'inline';
    spinner.style.display = 'none';
    button.disabled = false;
  }
}

// Close auth modal
function closeAuthModal() {
  DOM.authModal.classList.remove('active');
  DOM.body.classList.remove('modal-open');
  DOM.authError.classList.remove('show');
}

/* ---------- Initialization ---------- */

// Initialize the app
async function init() {
  // Set initial language
  const savedLang = localStorage.getItem('luminaLanguage') || detectBrowserLanguage();
  setLanguage(savedLang);
  
  // Load user gradients
  await loadUserGradients();
  
  // Set up event listeners
  setupEventListeners();
  
  // Initial render
  renderColorList();
  updatePreview();
  updateStrip();
  updateCSS();
  
  // Update user UI
  updateUserUI();
}

// Set up all event listeners
function setupEventListeners() {
  // Language toggle
  DOM.langToggle.addEventListener('click', () => {
    DOM.langDropdown.classList.toggle('show');
  });
  
  DOM.langOptions.forEach(option => {
    option.addEventListener('click', () => {
      const lang = option.dataset.lang;
      setLanguage(lang);
      localStorage.setItem('luminaLanguage', lang);
      DOM.langDropdown.classList.remove('show');
      showToast(getMessage('languageChanged'));
    });
  });
  
  // Close language dropdown when clicking outside
  document.addEventListener('click', (e) => {
    if (!DOM.langToggle.contains(e.target) && !DOM.langDropdown.contains(e.target)) {
      DOM.langDropdown.classList.remove('show');
    }
  });
  
  // User account button
  DOM.userAccountBtn.addEventListener('click', () => {
    if (state.user) {
      // Show profile
      DOM.signInForm.style.display = 'none';
      DOM.signUpForm.style.display = 'none';
      DOM.userProfile.style.display = 'block';
      DOM.authModalTitle.textContent = translations[state.language].profile;
    } else {
      // Show sign in
      DOM.signInForm.style.display = 'block';
      DOM.signUpForm.style.display = 'none';
      DOM.userProfile.style.display = 'none';
      DOM.authModalTitle.textContent = translations[state.language].signIn;
    }
    DOM.authModal.classList.add('active');
    DOM.body.classList.add('modal-open');
  });
  
  // Close modals
  document.querySelectorAll('.close-modal, .close-breakdown, .close-auth-modal').forEach(btn => {
    btn.addEventListener('click', () => {
      DOM.presetsModal.classList.remove('active');
      DOM.breakdownModal.classList.remove('active');
      DOM.authModal.classList.remove('active');
      DOM.body.classList.remove('modal-open');
    });
  });
  
  // Auth form switching
  DOM.switchToSignUp.addEventListener('click', (e) => {
    e.preventDefault();
    DOM.signInForm.style.display = 'none';
    DOM.signUpForm.style.display = 'block';
    DOM.authModalTitle.textContent = translations[state.language].signUp;
  });
  
  DOM.switchToSignIn.addEventListener('click', (e) => {
    e.preventDefault();
    DOM.signUpForm.style.display = 'none';
    DOM.signInForm.style.display = 'block';
    DOM.authModalTitle.textContent = translations[state.language].signIn;
  });
  
  // Sign in
  DOM.signInBtn.addEventListener('click', () => {
    const email = DOM.signInEmail.value;
    const password = DOM.signInPassword.value;
    
    if (!email || !password) {
      showAuthError(state.language === 'ar' ? 'الرجاء إدخال البريد الإلكتروني وكلمة المرور' : 'Please enter email and password');
      return;
    }
    
    signInWithEmail(email, password);
  });
  
  // Sign up
  DOM.signUpBtn.addEventListener('click', () => {
    const name = DOM.signUpName.value;
    const email = DOM.signUpEmail.value;
    const password = DOM.signUpPassword.value;
    const confirmPassword = DOM.signUpConfirmPassword.value;
    
    if (!name || !email || !password) {
      showAuthError(state.language === 'ar' ? 'الرجاء ملء جميع الحقول' : 'Please fill all fields');
      return;
    }
    
    if (password !== confirmPassword) {
      showAuthError(state.language === 'ar' ? 'كلمات المرور غير متطابقة' : 'Passwords do not match');
      return;
    }
    
    if (password.length < 6) {
      showAuthError(state.language === 'ar' ? 'كلمة المرور يجب أن تكون 6 أحرف على الأقل' : 'Password must be at least 6 characters');
      return;
    }
    
    signUpWithEmail(name, email, password);
  });
  
  // Google sign in/up
  DOM.googleSignInBtn.addEventListener('click', signInWithGoogle);
  DOM.googleSignUpBtn.addEventListener('click', signInWithGoogle);
  
  // Update profile
  DOM.updateProfileBtn.addEventListener('click', updateUserProfile);
  
  // Sign out
  DOM.signOutBtn.addEventListener('click', signOut);
  
  // Save gradient button
  DOM.saveGradientBtn.addEventListener('click', saveGradient);
  
  // Clear saved gradients
  DOM.clearSavedGradients.addEventListener('click', clearSavedGradients);
  
  // Other existing event listeners...
  // ... (keep all your existing event listeners for color pickers, sliders, etc.)
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', init);