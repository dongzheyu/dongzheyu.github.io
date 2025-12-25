import{d as n,c as l,a as t,i as o,f as d,w as u,h as i,g as r,o as s,_ as c}from"./index-DsLVC-y7.js";const p={class:"container py-5"},v={class:"row"},g={class:"col-lg-8 mx-auto"},q={class:"blog-post"},h={class:"mt-5"},m={class:"d-flex justify-content-between align-items-center"},b=n({__name:"CPPGuideView",setup(f){return(x,e)=>{const a=i("router-link");return s(),l("div",p,[t("div",v,[t("div",g,[t("article",q,[e[2]||(e[2]=o(`<header class="mb-4" data-v-e7ea9180><h1 class="fw-bold" data-v-e7ea9180>C++完全入门指南：从Hello World到结构体</h1><div class="text-muted mb-3" data-v-e7ea9180><time datetime="2025-12-24" data-v-e7ea9180>2025-12-24</time> · 作者：JetCPP Team </div></header><div class="blog-content" data-v-e7ea9180><h2 data-v-e7ea9180>引言</h2><p data-v-e7ea9180> C++是一门强大的编程语言，它结合了高级编程特性和底层系统编程能力。 从1983年由Bjarne Stroustrup发明至今，C++已经广泛应用于系统软件、游戏开发、 嵌入式系统、高性能计算等领域。本指南将带你从零开始，逐步学习C++编程。 </p><h2 data-v-e7ea9180>1. Hello World程序详解</h2><p data-v-e7ea9180> 学习任何编程语言的第一步都是编写Hello World程序。这不仅是传统，更是 检查开发环境是否配置正确的有效方法。让我们从一个简单的C++程序开始： </p><pre data-v-e7ea9180><code class="language-cpp" data-v-e7ea9180>#include &lt;iostream&gt;

int main() {
    std::cout &lt;&lt; &quot;Hello, World!&quot; &lt;&lt; std::endl;
    return 0;
}</code></pre><h3 data-v-e7ea9180>1.1 代码解析</h3><ul data-v-e7ea9180><li data-v-e7ea9180><strong data-v-e7ea9180>#include &lt;iostream&gt;</strong>：这是一个预处理指令， 告诉编译器包含输入输出流库。iostream库提供了输入输出功能， 如std::cout（输出）和std::cin（输入）。 </li><li data-v-e7ea9180><strong data-v-e7ea9180>int main()</strong>：这是程序的入口点。每个C++程序 都必须有一个main函数，操作系统从这里开始执行程序。 </li><li data-v-e7ea9180><strong data-v-e7ea9180>std::cout</strong>：这是标准输出流对象，用于向屏幕 输出文本。&quot;std::&quot;表示使用标准命名空间。 </li><li data-v-e7ea9180><strong data-v-e7ea9180>&lt;&lt;</strong>：这是流插入操作符，用于将数据 插入到输出流中。 </li><li data-v-e7ea9180><strong data-v-e7ea9180>std::endl</strong>：这不仅输出一个换行符，还刷新 输出缓冲区，确保内容立即显示。 </li><li data-v-e7ea9180><strong data-v-e7ea9180>return 0;</strong>：表示程序正常结束。返回值0通常 表示成功执行。 </li></ul><h3 data-v-e7ea9180>1.2 编译和运行</h3><p data-v-e7ea9180> 要编译这个程序，你需要一个C++编译器（如g++、clang++或MSVC）。 使用命令行编译和运行： </p><pre data-v-e7ea9180><code class="language-bash" data-v-e7ea9180># 编译
g++ -o hello hello.cpp

# 运行
./hello</code></pre><h2 data-v-e7ea9180>2. 变量和数据类型</h2><p data-v-e7ea9180> C++提供了丰富的数据类型来处理不同类型的数据。了解这些类型是 编程的基础。 </p><h3 data-v-e7ea9180>2.1 基本数据类型</h3><ul data-v-e7ea9180><li data-v-e7ea9180><strong data-v-e7ea9180>int</strong>：整数类型，通常为32位</li><li data-v-e7ea9180><strong data-v-e7ea9180>float</strong>：单精度浮点数</li><li data-v-e7ea9180><strong data-v-e7ea9180>double</strong>：双精度浮点数</li><li data-v-e7ea9180><strong data-v-e7ea9180>char</strong>：字符类型</li><li data-v-e7ea9180><strong data-v-e7ea9180>bool</strong>：布尔类型（true/false）</li></ul><pre data-v-e7ea9180><code class="language-cpp" data-v-e7ea9180>#include &lt;iostream&gt;
using namespace std;

int main() {
    int age = 25;
    float price = 19.99f;
    double precise = 3.141592653589793;
    char grade = &#39;A&#39;;
    bool isStudent = true;
    
    cout &lt;&lt; &quot;年龄: &quot; &lt;&lt; age &lt;&lt; endl;
    cout &lt;&lt; &quot;价格: $&quot; &lt;&lt; price &lt;&lt; endl;
    cout &lt;&lt; &quot;圆周率: &quot; &lt;&lt; precise &lt;&lt; endl;
    cout &lt;&lt; &quot;等级: &quot; &lt;&lt; grade &lt;&lt; endl;
    cout &lt;&lt; &quot;是否学生: &quot; &lt;&lt; isStudent &lt;&lt; endl;
    
    return 0;
}</code></pre><h3 data-v-e7ea9180>2.2 变量命名规则</h3><ul data-v-e7ea9180><li data-v-e7ea9180>必须以字母或下划线开头</li><li data-v-e7ea9180>不能使用C++关键字（如int、return等）</li><li data-v-e7ea9180>区分大小写</li><li data-v-e7ea9180>推荐使用有意义的名字</li></ul><h3 data-v-e7ea9180>2.3 常量</h3><p data-v-e7ea9180> 使用const关键字声明常量，一旦初始化就不能修改： </p><pre data-v-e7ea9180><code class="language-cpp" data-v-e7ea9180>const int MAX_SIZE = 100;
const double PI = 3.14159;</code></pre><h2 data-v-e7ea9180>3. 运算符</h2><p data-v-e7ea9180> C++提供了丰富的运算符来执行各种计算和操作。 </p><h3 data-v-e7ea9180>3.1 算术运算符</h3><ul data-v-e7ea9180><li data-v-e7ea9180><strong data-v-e7ea9180>+</strong>：加法</li><li data-v-e7ea9180><strong data-v-e7ea9180>-</strong>：减法</li><li data-v-e7ea9180><strong data-v-e7ea9180>*</strong>：乘法</li><li data-v-e7ea9180><strong data-v-e7ea9180>/</strong>：除法</li><li data-v-e7ea9180><strong data-v-e7ea9180>%</strong>：取模（求余数）</li></ul><pre data-v-e7ea9180><code class="language-cpp" data-v-e7ea9180>int a = 10, b = 3;
cout &lt;&lt; &quot;a + b = &quot; &lt;&lt; (a + b) &lt;&lt; endl;  // 13
cout &lt;&lt; &quot;a - b = &quot; &lt;&lt; (a - b) &lt;&lt; endl;  // 7
cout &lt;&lt; &quot;a * b = &quot; &lt;&lt; (a * b) &lt;&lt; endl;  // 30
cout &lt;&lt; &quot;a / b = &quot; &lt;&lt; (a / b) &lt;&lt; endl;  // 3 (整数除法)
cout &lt;&lt; &quot;a % b = &quot; &lt;&lt; (a % b) &lt;&lt; endl;  // 1</code></pre><h3 data-v-e7ea9180>3.2 比较运算符</h3><ul data-v-e7ea9180><li data-v-e7ea9180><strong data-v-e7ea9180>==</strong>：相等</li><li data-v-e7ea9180><strong data-v-e7ea9180>!=</strong>：不等</li><li data-v-e7ea9180><strong data-v-e7ea9180>&lt;</strong>：小于</li><li data-v-e7ea9180><strong data-v-e7ea9180>&gt;</strong>：大于</li><li data-v-e7ea9180><strong data-v-e7ea9180>&lt;=</strong>：小于等于</li><li data-v-e7ea9180><strong data-v-e7ea9180>&gt;=</strong>：大于等于</li></ul><h3 data-v-e7ea9180>3.3 逻辑运算符</h3><ul data-v-e7ea9180><li data-v-e7ea9180><strong data-v-e7ea9180>&amp;&amp;</strong>：逻辑与</li><li data-v-e7ea9180><strong data-v-e7ea9180>||</strong>：逻辑或</li><li data-v-e7ea9180><strong data-v-e7ea9180>!</strong>：逻辑非</li></ul><h3 data-v-e7ea9180>3.4 赋值运算符</h3><pre data-v-e7ea9180><code class="language-cpp" data-v-e7ea9180>int x = 5;      // 基本赋值
x += 3;         // 等同于 x = x + 3
x -= 2;         // 等同于 x = x - 2
x *= 4;         // 等同于 x = x * 4
x /= 2;         // 等同于 x = x / 2</code></pre><h2 data-v-e7ea9180>4. 控制流语句</h2><p data-v-e7ea9180> 控制流语句允许程序根据条件执行不同的代码块或重复执行某些代码。 </p><h3 data-v-e7ea9180>4.1 if-else语句</h3><pre data-v-e7ea9180><code class="language-cpp" data-v-e7ea9180>int score = 85;

if (score &gt;= 90) {
    cout &lt;&lt; &quot;优秀&quot; &lt;&lt; endl;
} else if (score &gt;= 80) {
    cout &lt;&lt; &quot;良好&quot; &lt;&lt; endl;
} else if (score &gt;= 70) {
    cout &lt;&lt; &quot;中等&quot; &lt;&lt; endl;
} else {
    cout &lt;&lt; &quot;需要努力&quot; &lt;&lt; endl;
}</code></pre><h3 data-v-e7ea9180>4.2 switch语句</h3><pre data-v-e7ea9180><code class="language-cpp" data-v-e7ea9180>int day = 3;
switch (day) {
    case 1:
        cout &lt;&lt; &quot;星期一&quot; &lt;&lt; endl;
        break;
    case 2:
        cout &lt;&lt; &quot;星期二&quot; &lt;&lt; endl;
        break;
    case 3:
        cout &lt;&lt; &quot;星期三&quot; &lt;&lt; endl;
        break;
    default:
        cout &lt;&lt; &quot;其他日子&quot; &lt;&lt; endl;
}</code></pre><h3 data-v-e7ea9180>4.3 循环语句</h3><h4 data-v-e7ea9180>4.3.1 for循环</h4><pre data-v-e7ea9180><code class="language-cpp" data-v-e7ea9180>// 打印0到9
for (int i = 0; i &lt; 10; i++) {
    cout &lt;&lt; i &lt;&lt; &quot; &quot;;
}

// 打印9到0
for (int i = 9; i &gt;= 0; i--) {
    cout &lt;&lt; i &lt;&lt; &quot; &quot;;
}</code></pre><h4 data-v-e7ea9180>4.3.2 while循环</h4><pre data-v-e7ea9180><code class="language-cpp" data-v-e7ea9180>int count = 0;
while (count &lt; 5) {
    cout &lt;&lt; &quot;计数: &quot; &lt;&lt; count &lt;&lt; endl;
    count++;
}</code></pre><h4 data-v-e7ea9180>4.3.3 do-while循环</h4><pre data-v-e7ea9180><code class="language-cpp" data-v-e7ea9180>int i = 0;
do {
    cout &lt;&lt; i &lt;&lt; &quot; &quot;;
    i++;
} while (i &lt; 5);</code></pre><h3 data-v-e7ea9180>4.4 break和continue</h3><ul data-v-e7ea9180><li data-v-e7ea9180><strong data-v-e7ea9180>break</strong>：立即退出循环或switch语句</li><li data-v-e7ea9180><strong data-v-e7ea9180>continue</strong>：跳过当前循环迭代，继续下一次迭代</li></ul><pre data-v-e7ea9180><code class="language-cpp" data-v-e7ea9180>// 使用break
for (int i = 0; i &lt; 10; i++) {
    if (i == 5) {
        break;  // 当i为5时退出循环
    }
    cout &lt;&lt; i &lt;&lt; &quot; &quot;;
}  // 输出: 0 1 2 3 4

// 使用continue
for (int i = 0; i &lt; 10; i++) {
    if (i % 2 == 0) {
        continue;  // 跳过偶数
    }
    cout &lt;&lt; i &lt;&lt; &quot; &quot;;  // 输出: 1 3 5 7 9
}</code></pre><h2 data-v-e7ea9180>5. 数组</h2><p data-v-e7ea9180> 数组是存储相同类型元素的集合。它们在处理大量数据时非常有用。 </p><h3 data-v-e7ea9180>5.1 一维数组</h3><pre data-v-e7ea9180><code class="language-cpp" data-v-e7ea9180>// 声明并初始化数组
int numbers[5] = {1, 2, 3, 4, 5};
double prices[3] = {19.99, 25.50, 30.00};
char vowels[5] = {&#39;a&#39;, &#39;e&#39;, &#39;i&#39;, &#39;o&#39;, &#39;u&#39;};

// 访问数组元素（索引从0开始）
cout &lt;&lt; &quot;第一个数字: &quot; &lt;&lt; numbers[0] &lt;&lt; endl;  // 1
cout &lt;&lt; &quot;第三个数字: &quot; &lt;&lt; numbers[2] &lt;&lt; endl;  // 3

// 修改数组元素
numbers[0] = 10;
cout &lt;&lt; &quot;修改后第一个数字: &quot; &lt;&lt; numbers[0] &lt;&lt; endl;  // 10

// 遍历数组
for (int i = 0; i &lt; 5; i++) {
    cout &lt;&lt; numbers[i] &lt;&lt; &quot; &quot;;
}</code></pre><h3 data-v-e7ea9180>5.2 二维数组</h3><pre data-v-e7ea9180><code class="language-cpp" data-v-e7ea9180>// 声明二维数组
int matrix[3][3] = {
    {1, 2, 3},
    {4, 5, 6},
    {7, 8, 9}
};

// 访问二维数组元素
cout &lt;&lt; &quot;matrix[0][0]: &quot; &lt;&lt; matrix[0][0] &lt;&lt; endl;  // 1
cout &lt;&lt; &quot;matrix[1][2]: &quot; &lt;&lt; matrix[1][2] &lt;&lt; endl;  // 6

// 遍历二维数组
for (int i = 0; i &lt; 3; i++) {
    for (int j = 0; j &lt; 3; j++) {
        cout &lt;&lt; matrix[i][j] &lt;&lt; &quot; &quot;;
    }
    cout &lt;&lt; endl;
}</code></pre><h3 data-v-e7ea9180>5.3 字符串处理</h3><p data-v-e7ea9180> C++提供了两种处理字符串的方式：C风格字符串和C++ string类。 </p><pre data-v-e7ea9180><code class="language-cpp" data-v-e7ea9180>#include &lt;iostream&gt;
#include &lt;string&gt;
using namespace std;

int main() {
    // C++ string类（推荐）
    string name = &quot;张三&quot;;
    string greeting = &quot;Hello, &quot; + name + &quot;!&quot;;
    cout &lt;&lt; greeting &lt;&lt; endl;
    
    // 字符串长度
    cout &lt;&lt; &quot;姓名长度: &quot; &lt;&lt; name.length() &lt;&lt; endl;
    
    // 字符串连接
    string fullName = name + &quot; &quot; + &quot;李四&quot;;
    cout &lt;&lt; &quot;全名: &quot; &lt;&lt; fullName &lt;&lt; endl;
    
    // 访问单个字符
    cout &lt;&lt; &quot;第一个字符: &quot; &lt;&lt; name[0] &lt;&lt; endl;
    
    // 字符串比较
    if (name == &quot;张三&quot;) {
        cout &lt;&lt; &quot;匹配成功!&quot; &lt;&lt; endl;
    }
    
    return 0;
}</code></pre><h2 data-v-e7ea9180>6. 函数</h2><p data-v-e7ea9180> 函数是执行特定任务的代码块。它们提高了代码的可重用性和可维护性。 </p><h3 data-v-e7ea9180>6.1 函数定义和调用</h3><pre data-v-e7ea9180><code class="language-cpp" data-v-e7ea9180>#include &lt;iostream&gt;
using namespace std;

// 函数定义
int add(int a, int b) {
    return a + b;
}

// 无返回值函数
void printHello() {
    cout &lt;&lt; &quot;Hello from function!&quot; &lt;&lt; endl;
}

// 带默认参数的函数
int multiply(int x, int y = 1) {
    return x * y;
}

int main() {
    // 调用函数
    int sum = add(5, 3);
    cout &lt;&lt; &quot;5 + 3 = &quot; &lt;&lt; sum &lt;&lt; endl;  // 8
    
    printHello();  // 输出: Hello from function!
    
    cout &lt;&lt; multiply(5) &lt;&lt; endl;     // 使用默认参数: 5
    cout &lt;&lt; multiply(5, 3) &lt;&lt; endl;  // 指定参数: 15
    
    return 0;
}</code></pre><h3 data-v-e7ea9180>6.2 函数参数传递</h3><h4 data-v-e7ea9180>6.2.1 按值传递</h4><pre data-v-e7ea9180><code class="language-cpp" data-v-e7ea9180>void modifyValue(int x) {
    x = 100;  // 只修改副本，不影响原变量
}

int main() {
    int num = 50;
    cout &lt;&lt; &quot;修改前: &quot; &lt;&lt; num &lt;&lt; endl;  // 50
    modifyValue(num);
    cout &lt;&lt; &quot;修改后: &quot; &lt;&lt; num &lt;&lt; endl;  // 仍然是50
    return 0;
}</code></pre><h4 data-v-e7ea9180>6.2.2 按引用传递</h4><pre data-v-e7ea9180><code class="language-cpp" data-v-e7ea9180>void modifyValue(int&amp; x) {  // 注意&amp;符号
    x = 100;  // 修改原变量
}

int main() {
    int num = 50;
    cout &lt;&lt; &quot;修改前: &quot; &lt;&lt; num &lt;&lt; endl;  // 50
    modifyValue(num);
    cout &lt;&lt; &quot;修改后: &quot; &lt;&lt; num &lt;&lt; endl;  // 100
    return 0;
}</code></pre><h3 data-v-e7ea9180>6.3 递归函数</h3><pre data-v-e7ea9180><code class="language-cpp" data-v-e7ea9180>// 计算阶乘的递归函数
int factorial(int n) {
    if (n &lt;= 1) {
        return 1;  // 基础情况
    }
    return n * factorial(n - 1);  // 递归调用
}

int main() {
    cout &lt;&lt; &quot;5! = &quot; &lt;&lt; factorial(5) &lt;&lt; endl;  // 120
    return 0;
}</code></pre><h2 data-v-e7ea9180>7. 指针</h2><p data-v-e7ea9180> 指针是C++中一个强大但容易混淆的概念。指针存储变量的内存地址。 </p><h3 data-v-e7ea9180>7.1 指针基础</h3><pre data-v-e7ea9180><code class="language-cpp" data-v-e7ea9180>#include &lt;iostream&gt;
using namespace std;

int main() {
    int value = 42;
    int* ptr = &amp;value;  // ptr指向value的地址
    
    cout &lt;&lt; &quot;值: &quot; &lt;&lt; value &lt;&lt; endl;           // 42
    cout &lt;&lt; &quot;地址: &quot; &lt;&lt; &amp;value &lt;&lt; endl;        // value的地址
    cout &lt;&lt; &quot;指针值: &quot; &lt;&lt; ptr &lt;&lt; endl;         // ptr存储的地址
    cout &lt;&lt; &quot;解引用: &quot; &lt;&lt; *ptr &lt;&lt; endl;        // 通过指针访问值
    
    // 通过指针修改值
    *ptr = 100;
    cout &lt;&lt; &quot;修改后: &quot; &lt;&lt; value &lt;&lt; endl;       // 100
    
    return 0;
}</code></pre><h3 data-v-e7ea9180>7.2 指针与数组</h3><pre data-v-e7ea9180><code class="language-cpp" data-v-e7ea9180>int arr[] = {10, 20, 30, 40, 50};
int* ptr = arr;  // 指针指向数组第一个元素

// 通过指针访问数组元素
cout &lt;&lt; &quot;arr[0]: &quot; &lt;&lt; *ptr &lt;&lt; endl;        // 10
cout &lt;&lt; &quot;arr[1]: &quot; &lt;&lt; *(ptr + 1) &lt;&lt; endl;  // 20
cout &lt;&lt; &quot;arr[2]: &quot; &lt;&lt; *(ptr + 2) &lt;&lt; endl;  // 30

// 遍历数组
for (int i = 0; i &lt; 5; i++) {
    cout &lt;&lt; *(ptr + i) &lt;&lt; &quot; &quot;;  // 等同于 arr[i]
}</code></pre><h3 data-v-e7ea9180>7.3 动态内存分配</h3><pre data-v-e7ea9180><code class="language-cpp" data-v-e7ea9180>#include &lt;iostream&gt;
using namespace std;

int main() {
    // 动态分配内存
    int* ptr = new int(42);
    cout &lt;&lt; &quot;动态分配的值: &quot; &lt;&lt; *ptr &lt;&lt; endl;  // 42
    
    // 动态分配数组
    int size = 5;
    int* arr = new int[size];
    
    // 初始化数组
    for (int i = 0; i &lt; size; i++) {
        arr[i] = i * i;
    }
    
    // 输出数组
    for (int i = 0; i &lt; size; i++) {
        cout &lt;&lt; arr[i] &lt;&lt; &quot; &quot;;
    }
    
    // 释放内存
    delete ptr;
    delete[] arr;  // 注意使用delete[]释放数组
    
    return 0;
}</code></pre><h2 data-v-e7ea9180>8. 结构体</h2><p data-v-e7ea9180> 结构体(struct)是C++中定义自定义数据类型的一种方式，它允许将不同类型的数据组合在一起。 </p><h3 data-v-e7ea9180>8.1 基本结构体</h3><pre data-v-e7ea9180><code class="language-cpp" data-v-e7ea9180>#include &lt;iostream&gt;
#include &lt;string&gt;
using namespace std;

// 定义结构体
struct Student {
    string name;
    int age;
    double gpa;
    char grade;
};

int main() {
    // 创建结构体实例
    Student s1;
    s1.name = &quot;张三&quot;;
    s1.age = 20;
    s1.gpa = 3.75;
    s1.grade = &#39;A&#39;;
    
    // 访问结构体成员
    cout &lt;&lt; &quot;姓名: &quot; &lt;&lt; s1.name &lt;&lt; endl;
    cout &lt;&lt; &quot;年龄: &quot; &lt;&lt; s1.age &lt;&lt; endl;
    cout &lt;&lt; &quot;GPA: &quot; &lt;&lt; s1.gpa &lt;&lt; endl;
    cout &lt;&lt; &quot;等级: &quot; &lt;&lt; s1.grade &lt;&lt; endl;
    
    // 另一种初始化方式
    Student s2 = {&quot;李四&quot;, 21, 3.85, &#39;A&#39;};
    
    return 0;
}</code></pre><h3 data-v-e7ea9180>8.2 结构体数组</h3><pre data-v-e7ea9180><code class="language-cpp" data-v-e7ea9180>struct Book {
    string title;
    string author;
    int year;
    double price;
};

int main() {
    // 结构体数组
    Book library[3] = {
        {&quot;C++ Primer&quot;, &quot;Stanley Lippman&quot;, 2012, 59.99},
        {&quot;Effective C++&quot;, &quot;Scott Meyers&quot;, 2005, 45.50},
        {&quot;The C++ Programming Language&quot;, &quot;Bjarne Stroustrup&quot;, 2013, 65.00}
    };
    
    // 遍历结构体数组
    for (int i = 0; i &lt; 3; i++) {
        cout &lt;&lt; &quot;书名: &quot; &lt;&lt; library[i].title &lt;&lt; endl;
        cout &lt;&lt; &quot;作者: &quot; &lt;&lt; library[i].author &lt;&lt; endl;
        cout &lt;&lt; &quot;年份: &quot; &lt;&lt; library[i].year &lt;&lt; endl;
        cout &lt;&lt; &quot;价格: $&quot; &lt;&lt; library[i].price &lt;&lt; endl;
        cout &lt;&lt; &quot;---------&quot; &lt;&lt; endl;
    }
    
    return 0;
}</code></pre><h3 data-v-e7ea9180>8.3 结构体与函数</h3><pre data-v-e7ea9180><code class="language-cpp" data-v-e7ea9180>struct Rectangle {
    double width;
    double height;
};

// 计算面积的函数
double calculateArea(Rectangle rect) {
    return rect.width * rect.height;
}

// 修改结构体的函数（按引用传递）
void scaleRectangle(Rectangle&amp; rect, double factor) {
    rect.width *= factor;
    rect.height *= factor;
}

int main() {
    Rectangle r = {5.0, 3.0};
    
    cout &lt;&lt; &quot;面积: &quot; &lt;&lt; calculateArea(r) &lt;&lt; endl;  // 15
    
    scaleRectangle(r, 2.0);
    cout &lt;&lt; &quot;缩放后的面积: &quot; &lt;&lt; calculateArea(r) &lt;&lt; endl;  // 60
    
    return 0;
}</code></pre><h3 data-v-e7ea9180>8.4 结构体嵌套</h3><pre data-v-e7ea9180><code class="language-cpp" data-v-e7ea9180>struct Address {
    string street;
    string city;
    string state;
    int zipCode;
};

struct Person {
    string name;
    int age;
    Address address;  // 结构体作为成员
};

int main() {
    Person p = {
        &quot;王五&quot;,
        25,
        {&quot;123 Main St&quot;, &quot;北京&quot;, &quot;北京&quot;, 100001}
    };
    
    cout &lt;&lt; &quot;姓名: &quot; &lt;&lt; p.name &lt;&lt; endl;
    cout &lt;&lt; &quot;地址: &quot; &lt;&lt; p.address.street &lt;&lt; &quot;, &quot; 
         &lt;&lt; p.address.city &lt;&lt; &quot;, &quot; &lt;&lt; p.address.state 
         &lt;&lt; &quot; &quot; &lt;&lt; p.address.zipCode &lt;&lt; endl;
    
    return 0;
}</code></pre><h3 data-v-e7ea9180>8.5 typedef和结构体</h3><pre data-v-e7ea9180><code class="language-cpp" data-v-e7ea9180>// 为结构体定义别名
typedef struct Point {
    double x;
    double y;
} Point;

// 或者使用更现代的方式
struct Point3D {
    double x, y, z;
};

using Point3DPtr = Point3D*;  // 使用using定义别名

int main() {
    Point p = {1.0, 2.0};
    Point3D p3d = {1.0, 2.0, 3.0};
    
    Point3DPtr ptr = &amp;p3d;  // 使用别名定义指针
    
    cout &lt;&lt; &quot;点 (&quot; &lt;&lt; p.x &lt;&lt; &quot;, &quot; &lt;&lt; p.y &lt;&lt; &quot;)&quot; &lt;&lt; endl;
    
    return 0;
}</code></pre><h2 data-v-e7ea9180>总结</h2><p data-v-e7ea9180> 本指南涵盖了C++编程的基础知识，从最简单的Hello World程序到结构体的概念。 学习C++需要时间和实践，建议您： </p><ul data-v-e7ea9180><li data-v-e7ea9180>多编写代码并运行测试</li><li data-v-e7ea9180>理解每个概念的实际应用</li><li data-v-e7ea9180>逐步构建更复杂的程序</li><li data-v-e7ea9180>阅读优秀的C++代码和文档</li><li data-v-e7ea9180>实践是掌握编程语言的最好方法</li></ul><p data-v-e7ea9180> 掌握了这些基础知识后，您可以继续学习更高级的主题，如类和对象、继承、 多态、模板、STL标准库等。C++是一门功能强大的语言，掌握它将为您的 编程生涯打开许多门。 </p><p data-v-e7ea9180> 记住，编程是一门实践性很强的技能。不要只是阅读教程，要动手编写代码， 尝试修改示例，创建自己的小项目。通过实践，您将更好地理解和掌握C++编程。 </p></div>`,2)),t("footer",h,[t("div",m,[e[1]||(e[1]=t("div",{class:"tags"},[t("span",{class:"badge bg-primary me-1"},"C++"),t("span",{class:"badge bg-secondary me-1"},"教程"),t("span",{class:"badge bg-info"},"编程入门")],-1)),d(a,{to:"/blog",class:"btn btn-outline-primary"},{default:u(()=>[...e[0]||(e[0]=[t("i",{class:"bi bi-arrow-left"},null,-1),r(" 返回博客列表 ",-1)])]),_:1})])])])])])])}}}),y=c(b,[["__scopeId","data-v-e7ea9180"]]);export{y as default};
