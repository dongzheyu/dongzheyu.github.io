// 语言切换功能
function initLanguageSwitcher() {
  const languages = [
    { code: 'zh', name: '中文' },
    { code: 'en', name: 'English' }
  ];
  
  let currentLang = localStorage.getItem('language') || 'zh';
  
  // 创建语言切换按钮
  function createLanguageSwitcher() {
    const switcher = document.createElement('div');
    switcher.className = 'language-switcher position-fixed';
    switcher.style.cssText = 'top: 80px; right: 20px; z-index: 1000;';
    
    const select = document.createElement('select');
    select.className = 'form-select form-select-sm';
    select.style.cssText = 'width: auto;';
    
    languages.forEach(lang => {
      const option = document.createElement('option');
      option.value = lang.code;
      option.textContent = lang.name;
      option.selected = lang.code === currentLang;
      select.appendChild(option);
    });
    
    select.addEventListener('change', (e) => {
      currentLang = e.target.value;
      localStorage.setItem('language', currentLang);
      updateLanguage();
    });
    
    switcher.appendChild(select);
    document.body.appendChild(switcher);
  }
  
  function updateLanguage() {
    // 这里可以添加页面内容的多语言切换逻辑
    console.log('Language switched to:', currentLang);
  }
  
  // 页面加载完成后初始化
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', createLanguageSwitcher);
  } else {
    createLanguageSwitcher();
  }
}

// 初始化语言切换器
initLanguageSwitcher();