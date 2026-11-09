/* LP360 central site configuration
 * แก้ URL /exec หลักของทุกเว็บไซต์ และ Student Profile เฉพาะเว็บไซต์ที่ใช้งาน ที่ไฟล์นี้ไฟล์เดียว
 * เว็บไซต์ที่ใช้งาน: อำเภอเมืองลพบุรี, ตำบลทะเลชุบศร และ User 1
 */
(() => {
  'use strict';
  // ===== Global shared icon =====
  // แก้ URL รูปที่นี่จุดเดียว แล้วใช้ร่วมกันกับเว็บอำเภอ/ตำบล/ห้องสมุด และ /user/*.html
  const GLOBAL_ICON_URL = 'https://static.wixstatic.com/media/a503e5_55b0959c5ce64be9bc2e8cb06ad4fcd0~mv2.png';

  // ===== User iframe pages =====
  // หน้า User ที่ใช้งาน: /user/1.html
  const USER_PAGES = Object.freeze({
    '1': Object.freeze({
      EXEC_URL: 'https://script.google.com/macros/s/AKfycbykZh8IUDLwRStAvvoh_ISosL0TT_BiChm-c6P5tBdKUph2V3hEXSDtiOyYHpfHI6mz/exec',
      SEO_TITLE: 'ศกร.ระดับตำบลโคกลำพาน',
      SEO_DESCRIPTION: 'ศกร.ระดับตำบลโคกลำพาน'
    })
  });

  const SITES = Object.freeze({
    district: Object.freeze({
      SITE_TYPE: 'DISTRICT',
      SEO_TITLE: "เว็บไซต์ สกร.ระดับอำเภอเมืองลพบุรี",
      SEO_DESCRIPTION: "เว็บไซต์ศูนย์ส่งเสริมการเรียนรู้ระดับอำเภอเมืองลพบุรี",
      MAIN_EXEC_URL: 'https://script.google.com/macros/s/AKfycbyGRs8U6Y_90v4vp-b89DbPys6XdK10wNfk6wr9GlOodS56eCmt9mRAQaor06sPXSyw/exec',
      STUDENT_PROFILE_EXEC_URL: 'https://script.google.com/macros/s/AKfycbwSh6yjzEbHKVTQ4yELx6tHZsHY9NSOb53IohWwt84RuCl8hDYxQYJHho-bSNmRbwxB/exec',
      CACHE_PREFIX: 'LP360:DISTRICT:ROOT:'
    }),
    "thalechupsorn": Object.freeze({
      SITE_TYPE: 'TAMBOL',
      SEO_TITLE: "ศกร.ระดับตำบลทะเลชุบศร",
      SEO_DESCRIPTION: "เว็บไซต์ศูนย์การเรียนรู้ระดับตำบล เรียนรู้ทุกที่ ทุกเวลา ทุกช่วงวัย",
      MAIN_EXEC_URL: "https://script.google.com/macros/s/AKfycby9AOhUnKjAbgfGfQzm5T_p7tyd2Lq3ubj8lp3zUUGdRPkmw9QpJOmiftj9RvKajyfRBA/exec",
      STUDENT_PROFILE_EXEC_URL: "https://script.google.com/macros/s/AKfycbyKHDdsyMFt5PpxKLF7nIeffzUiEKK6Na5-onqsE1pJZMUEJOiS74cij6EZQEa5IdqB/exec",
      CACHE_PREFIX: "LP360:TAMBOL:THALECHUPSORN:"
    })
  });

  function detectSiteKey() {
    const script = document.currentScript;
    let basePath = '/';
    try {
      if (script && script.src) basePath = new URL('.', script.src).pathname;
    } catch (_) {}
    let path = location.pathname || '/';
    if (path.startsWith(basePath)) path = path.slice(basePath.length);
    path = path.replace(/^\/+/, '');
    const first = (path.split('/')[0] || '').toLowerCase();
    if (first && Object.prototype.hasOwnProperty.call(SITES, first)) return first;
    return 'district';
  }

  const SITE_KEY = detectSiteKey();
  const site = SITES[SITE_KEY] || SITES.district;
  const cfg = Object.freeze({
    SITE_KEY,
    SITE_TYPE: site.SITE_TYPE,
    SEO_TITLE: site.SEO_TITLE || '',
    SEO_DESCRIPTION: site.SEO_DESCRIPTION || '',
    EXEC_URL: site.MAIN_EXEC_URL,
    API_URL: site.MAIN_EXEC_URL,
    MAIN_EXEC_URL: site.MAIN_EXEC_URL,
    STUDENT_PROFILE_EXEC_URL: site.STUDENT_PROFILE_EXEC_URL || '',
    CACHE_PREFIX: site.CACHE_PREFIX,
    GLOBAL_ICON_URL: GLOBAL_ICON_URL
  });

  function applyGlobalIcon_() {
    if (!GLOBAL_ICON_URL || !document || !document.head) return;
    const defs = [
      ['icon', 'image/png'],
      ['shortcut icon', 'image/png'],
      ['apple-touch-icon', ''],
      ['apple-touch-icon-precomposed', '']
    ];
    defs.forEach(([rel, type]) => {
      let el = document.head.querySelector('link[data-lp360-global-icon="' + rel + '"]');
      if (!el) {
        el = document.createElement('link');
        el.rel = rel;
        el.setAttribute('data-lp360-global-icon', rel);
        document.head.appendChild(el);
      }
      if (type) el.type = type;
      el.href = GLOBAL_ICON_URL;
    });
  }

  window.LP360_SITES_CONFIG = SITES;
  window.LP360_USER_PAGES_CONFIG = USER_PAGES;
  window.LP360_GLOBAL_ICON_URL = GLOBAL_ICON_URL;
  window.LP360_CURRENT_SITE_KEY = SITE_KEY;
  window.APP_CONFIG = cfg;
  if (cfg.STUDENT_PROFILE_EXEC_URL) {
    window.STUDENT_PROFILE_WEB_APP_URL = cfg.STUDENT_PROFILE_EXEC_URL;
  }
  applyGlobalIcon_();
})();
