<template>
  <div class="container py-5">
    <div class="row">
      <div class="col-lg-8 mx-auto">
        <article class="blog-post">
          <header class="mb-4">
            <h1 class="fw-bold">C++高性能编程技巧</h1>
            <div class="text-muted mb-3">
              <time datetime="2024-01-15">2024年1月15日</time> · 作者：JetCPP Team
            </div>
          </header>
          
          <div class="blog-content">
            <h2>引言</h2>
            <p>C++作为一门高性能编程语言，在系统编程、游戏开发、金融交易等领域有着广泛的应用。本文将分享一些实用的C++性能优化技巧，帮助开发者编写更高效的代码。</p>
            
            <h2>内存管理优化</h2>
            <h3>1. 避免不必要的内存分配</h3>
            <p>频繁的内存分配和释放是性能瓶颈的主要原因之一。可以考虑以下优化策略：</p>
            <ul>
              <li>使用对象池模式重用对象</li>
              <li>预分配足够大的内存空间</li>
              <li>使用栈分配代替堆分配（适用于小对象）</li>
            </ul>
            
            <h3>2. 智能指针的选择</h3>
            <p>根据使用场景选择合适的智能指针：</p>
            <ul>
              <li><code>std::unique_ptr</code>：独占所有权，零开销</li>
              <li><code>std::shared_ptr</code>：共享所有权，有引用计数开销</li>
              <li><code>std::weak_ptr</code>：避免循环引用</li>
            </ul>
            
            <h2>算法优化</h2>
            <h3>1. 选择合适的容器</h3>
            <p>根据操作特点选择最适合的STL容器：</p>
            <ul>
              <li><code>std::vector</code>：连续内存，缓存友好，适用于随机访问</li>
              <li><code>std::deque</code>：两端插入删除高效</li>
              <li><code>std::list</code>：任意位置插入删除高效，但缓存不友好</li>
              <li><code>std::unordered_map</code>：O(1)查找，适用于哈希表场景</li>
            </ul>
            
            <h3>2. 移动语义</h3>
            <p>C++11引入的移动语义可以显著提升性能：</p>
            <pre><code>std::vector&lt;std::string&gt; createStrings() {
    std::vector&lt;std::string&gt; result;
    result.reserve(1000);
    // 填充数据
    return result; // 移动语义，避免拷贝
}</code></pre>
            
            <h2>编译器优化</h2>
            <h3>1. 编译优化选项</h3>
            <p>合理使用编译器优化选项：</p>
            <ul>
              <li><code>-O2</code>：常规优化级别</li>
              <li><code>-O3</code>：更激进的优化</li>
              <li><code>-flto</code>：链接时优化</li>
            </ul>
            
            <h3>2. Profile-guided optimization (PGO)</h3>
            <p>通过实际运行时的性能数据指导编译器优化：</p>
            <ol>
              <li>编译生成可执行文件（包含性能分析信息）</li>
              <li>运行程序收集性能数据</li>
              <li>使用性能数据重新编译优化</li>
            </ol>
            
            <h2>并发编程</h2>
            <h3>1. 多线程优化</h3>
            <p>充分利用多核处理器：</p>
            <ul>
              <li>使用<code>std::thread</code>创建线程</li>
              <li>使用<code>std::async</code>进行异步操作</li>
              <li>考虑线程池避免频繁创建销毁线程</li>
            </ul>
            
            <h3>2. 避免假共享</h3>
            <p>多线程访问同一缓存行的不同数据会导致性能下降：</p>
            <pre><code>struct alignas(64) ThreadData {  // 确保每个线程独占缓存行
    std::atomic&lt;int&gt; counter;
    char padding[64 - sizeof(std::atomic&lt;int&gt;)];
};</code></pre>
            
            <h2>总结</h2>
            <p>C++性能优化是一个系统工程，需要从多个维度考虑：</p>
            <ul>
              <li>合理的数据结构和算法选择</li>
              <li>高效的内存管理</li>
              <li>充分利用现代硬件特性</li>
              <li>使用性能分析工具定位瓶颈</li>
            </ul>
            <p>记住："过早的优化是万恶之源"，在保证正确性的基础上，针对实际瓶颈进行优化。</p>
          </div>
          
          <footer class="mt-5">
            <div class="d-flex justify-content-between align-items-center">
              <div class="tags">
                <span class="badge bg-primary me-1">C++</span>
                <span class="badge bg-secondary me-1">性能优化</span>
                <span class="badge bg-info">编程技巧</span>
              </div>
              <router-link to="/blog" class="btn btn-outline-primary">
                <i class="bi bi-arrow-left"></i> 返回博客列表
              </router-link>
            </div>
          </footer>
        </article>
      </div>
    </div>
  </div>
</template>

<style scoped>
.blog-post {
  line-height: 1.8;
}

.blog-content h2 {
  margin-top: 2.5rem;
  margin-bottom: 1rem;
  padding-bottom: 0.5rem;
  border-bottom: 2px solid #e9ecef;
}

.blog-content h3 {
  margin-top: 2rem;
  margin-bottom: 1rem;
}

.blog-content pre {
  background-color: #f8f9fa;
  border: 1px solid #e9ecef;
  border-radius: 0.375rem;
  padding: 1rem;
  margin: 1rem 0;
  overflow-x: auto;
}

.blog-content code {
  background-color: #e9ecef;
  padding: 0.125rem 0.25rem;
  border-radius: 0.25rem;
  font-size: 0.875em;
}

.blog-content ul, .blog-content ol {
  margin-bottom: 1rem;
}

.blog-content li {
  margin-bottom: 0.5rem;
}

[data-bs-theme="dark"] .blog-content pre {
  background-color: #2d3748;
  border-color: #4a5568;
}

[data-bs-theme="dark"] .blog-content code {
  background-color: #4a5568;
  color: #e2e8f0;
}
</style>