// Bootstrap Icons 到 Iconify 图标的映射
export const iconMap: Record<string, string> = {
  // 箭头
  'bi-arrow-left': 'mdi:arrow-left',
  'bi-arrow-right': 'mdi:arrow-right',
  'bi-arrow-up': 'mdi:arrow-up',

  // 用户相关
  'bi-person': 'mdi:account',
  'bi-person-circle': 'mdi:account-circle',
  'bi-person-fill': 'mdi:account',

  // 搜索
  'bi-search': 'mdi:magnify',

  // 关闭
  'bi-x-lg': 'mdi:close',
  'bi-x': 'mdi:close',

  // 太阳/月亮（主题）
  'bi-sun-fill': 'mdi:weather-sunny',
  'bi-moon-stars-fill': 'mdi:weather-night',
  'bi-circle-half': 'mdi:brightness-auto',

  // 社交
  'bi-github': 'mdi:github',
  'bi-git': 'mdi:git',
  'bi-play-circle': 'mdi:youtube',

  // 登录/登出
  'bi-box-arrow-right': 'mdi:logout',
  'bi-box-arrow-in-right': 'mdi:login',

  // 其他
  'bi-heart': 'mdi:heart',
  'bi-chat-left-text': 'mdi:comment-text-outline',
  'bi-chat-square-quote': 'mdi:comment-quote',
  'bi-lock': 'mdi:lock',
  'bi-trash': 'mdi:delete',
  'bi-exclamation-circle': 'mdi:alert-circle',
  'bi-check-circle': 'mdi:check-circle',
  'bi-code-slash': 'mdi:code-tags',
  'bi-controller': 'mdi:gamepad-variant',
  'bi-wrench-adjustable-circle': 'mdi:wrench',
  'bi-journal-richtext': 'mdi:newspaper-variant',
  'bi-globe2': 'mdi:web',
  'bi-mortarboard-fill': 'mdi:school',
  'bi-rocket-takeoff-fill': 'mdi:rocket-launch',
  'bi-calendar3': 'mdi:calendar',
  'bi-calendar': 'mdi:calendar',
  'bi-tag-fill': 'mdi:tag',
  'bi-pencil-square': 'mdi:pencil',
  'bi-pencil': 'mdi:pencil',
  'bi-folder-fill': 'mdi:folder',
  'bi-folder-x': 'mdi:folder-remove',
  'bi-file-text': 'mdi:text-box-outline',
  'bi-image': 'mdi:image',
  'bi-link': 'mdi:link',
  'bi-list-ul': 'mdi:format-list-bulleted',
  'bi-type-bold': 'mdi:format-bold',
  'bi-type-italic': 'mdi:format-italic',
  'bi-type-h1': 'mdi:format-header-1',
  'bi-chat-quote': 'mdi:format-quote-close',
  'bi-exclamation-triangle': 'mdi:alert',
  'bi-info-circle': 'mdi:information',
}

/**
 * 将 Bootstrap Icons 类名转换为 Iconify 图标名称
 * @param biClass Bootstrap Icons 类名，如 'bi-arrow-left'
 * @returns Iconify 图标名称，如 'mdi:arrow-left'
 */
export function getIconFromBi(biClass: string): string {
  return iconMap[biClass] || biClass
}
