---
# https://vitepress.dev/reference/default-theme-home-page
layout: home

hero:
  name: "项目展示"
  text: "开源作品与技术实践"
  tagline: "探索创新项目，分享技术成果"
  actions:
    - theme: alt
      text: English Listen WinUI - 现代化英语听写训练
      link: /english-listen-winui
    - theme: alt
      text: English Listen (Qt6) - 英语听写训练工具
      link: /english-listen
    - theme: alt
      text: SniShaper (Go)
      link: /snishaper

features:
  - title: English Listen WinUI
    icon: >-
      &#x1F3AF;
    details: 基于 WinUI 3 + C# + C++ 混合开发的现代化英语听写训练工具，MVVM架构，Mica材质，百度翻译集成
    link: /english-listen-winui
  - title: English Listen (Qt6)
    icon: >-
      &#x1F4D6;
    details: 专业英语听写训练工具，基于C++和Qt6开发的现代化听写软件，智能词库管理、个性化训练控制
    link: /english-listen
  - title: 开源精神
    icon: >-
      &#x2B50;
    details: 所有项目遵循开源理念，欢迎社区参与和贡献，共同完善项目

---

<style>
.project-list {
  max-width: 800px;
  margin: 2rem auto;
  padding: 0 1rem;
}

.project-list h2 {
  color: #2c3e50;
  border-bottom: 2px solid #42b883;
  padding-bottom: 0.5rem;
  margin-bottom: 1.5rem;
}

.project-list ul {
  list-style: none;
  padding: 0;
}

.project-list li {
  background: #f9f9f9;
  border: 1px solid #eaeaea;
  border-radius: 8px;
  padding: 1.2rem;
  margin-bottom: 1rem;
  transition: box-shadow 0.3s ease;
}

.project-list li:hover {
  box-shadow: 0 4px 8px rgba(0,0,0,0.1);
}

.project-list h3 {
  margin-top: 0;
  margin-bottom: 0.5rem;
}

.project-list h3 a {
  color: #2779bd;
  text-decoration: none;
  font-size: 1.2rem;
}

.project-list h3 a:hover {
  color: #2c5282;
  text-decoration: underline;
}

.project-meta {
  margin-top: 0.5rem;
}

.project-meta .category {
  color: #7f8c8d;
  font-size: 0.9rem;
}

.home-link-container {
  text-align: center;
  margin: 2rem 0;
}

.home-link {
  display: inline-block;
  background: #42b883;
  color: white;
  padding: 0.8rem 1.5rem;
  border-radius: 20px;
  text-decoration: none;
  font-weight: bold;
  transition: background 0.3s ease;
}

.home-link:hover {
  background: #369870;
}
</style>