// Language switcher functionality
const languageConfig = {
    'zh-CN': {
        'JetCPP Studio': 'JetCPP Studio',
        '代码重塑世界 · 创新驱动未来': '代码重塑世界 · 创新驱动未来',
        '首页': '首页',
        '项目': '项目',
        '博客': '博客',
        '关于我们': '关于我们',
        '语言': '语言',
        '这是什么': '这是什么',
        '这是JetCPP Stidio的的新网页，由VitePress构建': '这是JetCPP Stidio的的新网页，由VitePress构建',
        '加入我们': '加入我们',
        '一起来开发有趣的项目吧！': '一起来开发有趣的项目吧！',
        '注意': '注意',
        '由于网页logo及背景在GitHub, 打开网页加载可能稍慢。': '由于网页logo及背景在GitHub, 打开网页加载可能稍慢。',
        '了解我们': '了解我们',
        '查看项目': '查看项目'
    },
    'zh-TW': {
        'JetCPP Studio': 'JetCPP Studio',
        '代码重塑世界 · 创新驱动未来': '代碼重塑世界 · 創新驅動未來',
        '首页': '首頁',
        '项目': '項目',
        '博客': '部落格',
        '关于我们': '關於我們',
        '语言': '語言',
        '这是什么': '這是什麼',
        '这是JetCPP Stidio的的新网页，由VitePress构建': '這是JetCPP Stidio的新網頁，由VitePress構建',
        '加入我们': '加入我們',
        '一起来开发有趣的项目吧！': '一起來開發有趣的專案吧！',
        '注意': '注意',
        '由于网页logo及背景在GitHub, 打开网页加载可能稍慢。': '由於網頁logo及背景在GitHub, 打開網頁載入可能稍慢。',
        '了解我们': '了解我們',
        '查看项目': '查看項目'
    },
    'en': {
        'JetCPP Studio': 'JetCPP Studio',
        '代码重塑世界 · 创新驱动未来': 'Code Reshapes the World · Innovation Drives the Future',
        '首页': 'Home',
        '项目': 'Projects',
        '博客': 'Blog',
        '关于我们': 'About Us',
        '语言': 'Language',
        '这是什么': 'What is this',
        '这是JetCPP Stidio的的新网页，由VitePress构建': 'This is JetCPP Studio\'s new website, built with VitePress',
        '加入我们': 'Join Us',
        '一起来开发有趣的项目吧！': 'Let\'s develop interesting projects together!',
        '注意': 'Note',
        '由于网页logo及背景在GitHub, 打开网页加载可能稍慢。': 'Due to the logo and background being hosted on GitHub, page loading may be slightly slow.',
        '了解我们': 'Learn More',
        '查看项目': 'View Projects'
    }
};

function switchLanguage(lang) {
    // Save language preference
    localStorage.setItem('preferredLanguage', lang);
    
    // Update page content
    updatePageContent(lang);
    
    // Update URL parameter
    updateUrlParameter(lang);
    
    // Show feedback
    showLanguageFeedback(lang);
    
    // Update dropdown visual indication
    updateLanguageDropdown(lang);
}

function updatePageContent(lang) {
    const config = languageConfig[lang];
    if (!config) return;
    
    // Update navigation items with proper link handling
    document.querySelectorAll('nav a, .VPSidebar a, .VPLocalNav a').forEach(element => {
        const text = element.textContent.trim();
        if (config[text]) {
            element.textContent = config[text];
        }
        
        // Update href for language-specific links if needed
        if (element.getAttribute('data-lang-link')) {
            const originalHref = element.getAttribute('data-original-href') || element.href;
            element.setAttribute('data-original-href', originalHref);
            
            // Add language parameter to maintain state
            const url = new URL(originalHref, window.location.origin);
            url.searchParams.set('lang', lang);
            element.href = url.toString();
        }
    });
    
    // Update hero section
    const heroText = document.querySelector('.VPHomeHero .text');
    const heroTagline = document.querySelector('.VPHomeHero .tagline');
    const heroActions = document.querySelectorAll('.VPHomeHero .action');
    
    if (heroText) {
        const text = heroText.textContent.trim();
        if (config[text]) {
            heroText.textContent = config[text];
        }
    }
    
    if (heroTagline) {
        const text = heroTagline.textContent.trim();
        if (config[text]) {
            heroTagline.textContent = config[text];
        }
    }
    
    heroActions.forEach(action => {
        const text = action.textContent.trim();
        if (config[text]) {
            action.textContent = config[text];
        }
    });
    
    // Update features
    document.querySelectorAll('.VPFeature .title, .VPFeature h2, .VPFeature h3').forEach(title => {
        const text = title.textContent.trim();
        if (config[text]) {
            title.textContent = config[text];
        }
    });
    
    document.querySelectorAll('.VPFeature .details, .VPFeature p, .VPFeature .description').forEach(detail => {
        const text = detail.textContent.trim();
        if (config[text]) {
            detail.textContent = config[text];
        }
    });
    
    // Update page titles and headings
    document.querySelectorAll('h1, h2, h3, h4, h5, h6').forEach(heading => {
        const text = heading.textContent.trim();
        if (config[text]) {
            heading.textContent = config[text];
        }
    });
    
    // Update buttons and interactive elements
    document.querySelectorAll('button, .btn, .button, [role="button"]').forEach(button => {
        const text = button.textContent.trim();
        if (config[text]) {
            button.textContent = config[text];
        }
    });
}

function updateUrlParameter(lang) {
    const url = new URL(window.location);
    url.searchParams.set('lang', lang);
    window.history.replaceState({}, '', url);
}

function showLanguageFeedback(lang) {
    const messages = {
        'zh-CN': '语言已切换为简体中文',
        'zh-TW': '語言已切換為繁體中文',
        'en': 'Language switched to English'
    };
    
    // Create or update notification
    let notification = document.getElementById('language-notification');
    if (!notification) {
        notification = document.createElement('div');
        notification.id = 'language-notification';
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: #4CAF50;
            color: white;
            padding: 12px 20px;
            border-radius: 4px;
            z-index: 10000;
            font-size: 14px;
            box-shadow: 0 2px 10px rgba(0,0,0,0.2);
        `;
        document.body.appendChild(notification);
    }
    
    notification.textContent = messages[lang] || 'Language switched';
    
    // Auto-hide after 3 seconds
    setTimeout(() => {
        notification.style.opacity = '0';
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

function detectLanguage() {
    // Check URL parameter first (highest priority)
    const urlParams = new URLSearchParams(window.location.search);
    const urlLang = urlParams.get('lang');
    if (urlLang && ['zh-CN', 'zh-TW', 'en'].includes(urlLang)) {
        return urlLang;
    }
    
    // Check localStorage (medium priority)
    const storedLang = localStorage.getItem('preferredLanguage');
    if (storedLang && ['zh-CN', 'zh-TW', 'en'].includes(storedLang)) {
        return storedLang;
    }
    
    // Check browser language (lowest priority)
    const browserLang = navigator.language || navigator.userLanguage || 'zh-CN';
    
    if (browserLang.startsWith('zh')) {
        return browserLang.includes('TW') || browserLang.includes('HK') || 
               browserLang.includes('MO') ? 'zh-TW' : 'zh-CN';
    }
    
    if (browserLang.startsWith('en')) {
        return 'en';
    }
    
    // Default to Simplified Chinese
    return 'zh-CN';
}

function updateLanguageDropdown(currentLang) {
    // Simple function to update visual indication in language dropdown
    // This can be enhanced once the page structure is fully loaded
    console.log('Current language set to:', currentLang);
}

// Create language dropdown in navigation
function createLanguageDropdown() {
    // Find the navigation container
    const navContainer = document.querySelector('.VPNavBarMenu');
    if (!navContainer) return;
    
    // Create language dropdown element
    const dropdown = document.createElement('div');
    dropdown.className = 'language-dropdown';
    dropdown.style.cssText = `
        position: relative;
        display: inline-block;
        margin-left: 1rem;
    `;
    
    // Create dropdown button
    const button = document.createElement('button');
    button.className = 'VPLink link VPNavBarMenuLink';
    button.textContent = '语言';
    button.style.cssText = `
        cursor: pointer;
        border: none;
        background: none;
        color: inherit;
        font: inherit;
        padding: 0;
        margin: 0 0.5rem;
    `;
    
    // Create dropdown menu
    const menu = document.createElement('div');
    menu.className = 'language-menu';
    menu.style.cssText = `
        position: absolute;
        top: 100%;
        right: 0;
        background: white;
        border: 1px solid #e5e7eb;
        border-radius: 0.375rem;
        box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
        min-width: 120px;
        z-index: 1000;
        display: none;
    `;
    
    // Add language options
    const languages = [
        { code: 'zh-CN', name: '简体中文' },
        { code: 'zh-TW', name: '繁體中文' },
        { code: 'en', name: 'English' }
    ];
    
    languages.forEach(lang => {
        const option = document.createElement('a');
        option.href = '#';
        option.textContent = lang.name;
        option.style.cssText = `
            display: block;
            padding: 0.5rem 1rem;
            color: #374151;
            text-decoration: none;
            cursor: pointer;
        `;
        option.onclick = (e) => {
            e.preventDefault();
            switchLanguage(lang.code);
            menu.style.display = 'none';
        };
        
        option.onmouseover = () => {
            option.style.background = '#f3f4f6';
        };
        
        option.onmouseout = () => {
            option.style.background = '';
        };
        
        menu.appendChild(option);
    });
    
    // Toggle menu on button click
    button.onclick = (e) => {
        e.preventDefault();
        menu.style.display = menu.style.display === 'none' ? 'block' : 'none';
    };
    
    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!dropdown.contains(e.target)) {
            menu.style.display = 'none';
        }
    });
    
    dropdown.appendChild(button);
    dropdown.appendChild(menu);
    navContainer.appendChild(dropdown);
}

// Initialize language on page load
document.addEventListener('DOMContentLoaded', function() {
    createLanguageDropdown();
    
    const lang = detectLanguage();
    if (lang !== 'zh-CN') { // Default is zh-CN
        switchLanguage(lang);
    } else {
        // Still update dropdown for default language
        updateLanguageDropdown(lang);
    }
});

// Make function globally available
window.switchLanguage = switchLanguage;