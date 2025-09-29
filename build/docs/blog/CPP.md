# C++入门指北

这篇文档将为您从入门到熟练学习C++

## 准备工作

C++是一个编译型语言，需要编译器才能运行。

这里我们使用Jetbains CLion，这是最常用的C++编译器。

首先下载Clion安装包，附件里有。打开安装包，选择安装位置，然后点击下一步，把添加到PATH环境变量打开，其他默认，选择安装。

安装完成后，打开Clion，会有一个欢迎界面，点击开始使用，会有一个注册向导，选择免费就行（如果你需要用到code with me，请转移到本网站的项目页下载JetBrains Crack破解）

注册完成后，新建一个项目，语法选择C++20，点击创建

这样我们就可以开始编写C++程序了

后续工作（可选）:

由于Clion附带的MinGW版本比较老，我们需要安装一个新版本的MinGW编译器。

首先，下载msys2并安装，附件里有下载链接

打开msys2的MinGW64终端，先输入pacman -Syu更新一下包

更新完成后，再输入pacman -S mingw-w64-x86_64-gcc mingw-w64-x86_64-gdb安装最新版GCC和GDB

安装完成后，打开Clion设置，选择构建、执行、部署，选择工具链，路径选择你安装msys2里的MinGW64路径

这样，我们就可以使用新的GCC和GDB了

附件：

- [CLion下载地址](https://www.jetbrains.com.cn/clion/download/?section=windows)
- [msys2下载地址](https://mirrors.tuna.tsinghua.edu.cn/msys2/distrib/x86_64/msys2-x86_64-20250221.exe)
- [msys2下载地址（备用）](https://github.whrstudio.top/https://github.com/msys2/msys2-installer/releases/download/2025-02-21/msys2-x86_64-20250221.exe)

## 基础语法介绍

### 1.数据类型：int,float,double,char,bool,string,long long

首先是整数类型，整数类型有int和long long。

int的字节大小为4字节，long long的字节大小为8字节。

所以，int可以存的值范围是-2^31到2^31-1。long long可以存-2^63到2^63-1。

long long存的数字比int大，所以long long可以存更多的数。

float和double都是浮点数类型，double的字节大小为8字节，float的字节大小为4字节。

double可以存更多的数，但是float只能存小数。

char是字符类型，字节大小为1字节。定义要用单引号
如：`char a='a';`

bool是布尔类型，字节大小为1字节。用于判断是否，0为否，1为是，或者true和false。

例如：`bool n=true;`或者`bool n=1`

string是字符串类型，字节大小为字符串的长度。

它可以存储任意长度的字符串，但是不能存储emoji，还可以存储中文。
例如：`string s="hello";     string s="你好"`

### 2.标识符

标识符是C++中的变量名，函数名，类名等等。

标识符必须以字母开头，后面可以有数字，下划线，不能有特殊字符。

例如：`int a;`

标识符的大小写敏感，所以a和A是两个不同的变量。

### 3.运算符

运算符是C++中的符号，用于计算。

运算符有：++ -- + - * / % < > <= >= == != && || & | ^ !

我来解释一下：

++：自增运算符，将变量加1。

--：自减运算符，将变量减1。

+：加法运算符，将两个数相加。

-：减法运算符，将两个数相减。

*：乘法运算符，将两个数相乘。

/：除法运算符，将两个数相除。

%：取余运算符，将两个数相除，并返回余数。

<：小于运算符，判断两个数是否小于。

>：大于运算符，判断两个数是否大于。

<=：小于等于运算符，判断两个数是否小于等于。

>=：大于等于运算符，判断两个数是否大于等于。

==：等于运算符，判断两个数是否相等。

!=：不等于运算符，判断两个数是否不相等。

&&：逻辑与运算符，判断两个条件是否都为真。

||：逻辑或运算符，判断两个条件是否至少有一个为真。

&：按位与运算符，判断两个数位是否都为1。

|：按位或运算符，判断两个数位是否至少有一个为1。

^：按位异或运算符，判断两个数位是否相同。

!：逻辑非运算符，将一个条件取反。

### 4.二进制换算

二进制换算，将十进制数转换为二进制数。

将十进制数除以2，记录余数；
用商继续除以2，再次记录余数；
重复上述步骤，直到商为0；
将所有余数倒序排列，即为对应的二进制数。

### 5.循环

C++中的循环有for，while,do while。

先只讲for，while循环，do while循环以后再说

for循环:

for循环的格式为：for(初始化;条件;更新)

简单点讲，初始化就是循环开始前的初始值，可以是你自己定义的，也可以是已经定义的变量。

条件就是循环结束的条件，如果条件为真，则循环继续，否则循环结束。

更新就是你前面初始化的变量，每次循环结束后，都会更新这个变量。可以用++、--、+=、-=、*=、/=来更新变量。

来看个例子：

```cpp
for(int i=0;i<10;i++)
```

这个for循环，初始化i为0，条件为i<10，更新i为i+1。

while循环:

while循环的格式为：while(条件)

while循环和for循环一样，也是循环，但是while循环不需要初始化，也不需要更新。(PS:如果需要更新的话你可以直接定义一个变量在while循环里面来更新)

来看个例子：

```cpp
int i=0;
while(i<10){
    i++;
}
```

这个while循环，条件为i<10，每次循环结束后，都会更新i为i+1。

### 6.判断

C++中的判断有if，else，switch。

if判断:

if判断的格式为：if(条件)

if判断只有条件，如果条件为真，则执行if后面的代码，否则不执行。

来看个例子：

```cpp
if(i<10){
    cout<<"i小于10"<< endl ;
}
```

这个if判断，条件为i<10，如果i小于10，则输出"i小于10"。

else判断:

else判断的格式为：if(条件){} else{}

else判断和if判断一样，但是else判断只有else，如果if判断条件为假，则执行else后面的代码，否则不执行。

来看个例子：

```cpp
if(i<10){
    cout<<"i小于10"<< endl;
} else{
    cout<<"i大于等于10"<< endl;
}
```

这个else判断，条件为i<10，如果i小于10，则输出"i小于10"，否则输出"i大于等于10"。

switch判断:

switch判断的格式为：switch(表达式)

switch判断和if判断一样，但是switch判断有多个case，case表示一个条件，如果case满足，则执行case后面的代码，否则继续执行下一个case。

来看个例子：

```cpp
switch(i){
    case 1:
        cout<<"i等于1"<< endl;
        break;
    case 2:
        cout<<"i等于2"<< endl;
        break;
    default:
        cout<<"i不等于1和2"<< endl;
}
```

这个switch判断，表达式为i，case为1和2，如果i等于1，则输出"i等于1"，如果i等于2，则输出"i等于2"，否则输出"i不等于1和2"。

## 数组

C++中的数组有int[]、char[]、float[]、double[]、string[]。

数组的格式为：数据类型 数组名[数组大小]

来看个例子：

```cpp
int a[10];
char b[10];
float c[10];
double d[10];
string e[10];
```

这个例子，定义了10个int、char、float、double、string类型的数组。

数组的访问：

数组的访问格式为：数组名[索引]

还有vector数组，vector数组的格式为：vector<数据类型> 数组名;

来看个例子：

```cpp
vector<int> a;
vector<char> b;
vector<float> c;
vector<double> d;
vector<string> e;
```

这个例子，定义了10个int、char、float、double、string类型的vector数组。

vector数组的访问：

vector数组的访问格式为：数组名[索引]

以上就是C++的运算符、数据类型、变量、常量、运算符、二进制换算、循环、判断、数组。

## 简单程序

现在，我们了解了C++的基础知识，我们可以开始编写简单的程序了。

### 你好世界

你好世界是一个简单的程序，它是所有编程的第一个程序，它的功能是输出"Hello World!"。

创建一个名为hello.cpp的文件。

来了解一下c++程序的结构：

头文件

引用命名空间

其他函数（可选）

主函数

头文件的格式为：#include <头文件名>

引用命名空间的格式为：using namespace <命名空间名>

主函数的格式为：int main(){}

(PS:补充一下，cin是输入函数，cout是输出函数)

知道这些，我们开始编写程序。

```cpp
#include <iostream>
using namespace std;
int main(){
    cout<<"Hello World!"<< endl;
    return 0;
}
```

(PS:iostream是c++标准库，用于输入输出。std是c++标准库的命名空间。输出标识符直接输入标识符名，其他需要加双引号)

这个程序，输出"Hello World!"。

## 变量测试

### 整数的和

题目描述：求3个整数的和

输入a、b、c这3个整数，求它们的和。

[提交链接](https://ybt.ssoier.cn/problem_show.php?pid=2065)

### 交换值

【题目描述】
输入两个正整数a和b，试交换a、b的值（使a的值等于b，b的值等于a）。

【输入】
输入两个正整数a和b。

【输出】
输出a与b交换值后的结果。

[提交链接](https://ybt.ssoier.cn/problem_show.php?pid=2065)

### 买图书

【题目描述】
已知小明有n元，他买了一本书，这本书原价为m元，现在打8折出售。求小明还剩多少钱(保留2位小数)。

【输入】
输入n,m。

【输出】
小明还剩多少钱(保留2位小数)。

【输入样例】
100 100
【输出样例】
20.00

[提交链接](https://ybt.ssoier.cn/problem_show.php?pid=2066)

### 计算(a+b)×c的值

【题目描述】
给定3个整数a、b、c，计算表达式(a+b)×c的值。

【输入】
输入仅一行，包括三个整数a、b、c, 数与数之间以一个空格分开。(－10,000<a,b,c<10,000)

【输出】
输出一行，即表达式的值。

【输入样例】
2 3 5
【输出样例】
25

[提交链接](https://ybt.ssoier.cn/problem_show.php?pid=1007)

### 计算(a+b)/c的值

【题目描述】
给定3个整数a、b、c，计算表达式a+bc的值。

【输入】
输入仅一行，包括三个整数a、b、c, 数与数之间以一个空格分开。(－10,000<a,b,c<10,000, c不等于0)

【输出】
输出一行，即表达式的值。

【输入样例】
1 1 3
【输出样例】
0

## 函数

函数, 函数是C++的基础，函数的格式为：

```cpp
返回值类型 函数名(参数列表){
    函数体
    return 返回值;
}
```

函数的参数列表为函数的参数，参数列表为空时，参数列表为()。

函数的返回值类型为函数的返回值类型，返回值类型为void时，返回值类型为()。

返回值类型可以为int、char、float、double、string、bool、void等。

我们可以在函数中定义变量，变量的作用域为函数内。这是局部变量

函数的调用格式为：函数名(参数列表)

了解了这些后，我们就可以开始编写函数了。

简单a+b示例:

```cpp
#include <iostream>
using namespace std;
int add(int a, int b){
    return a+b;
}
int main(){
    int a, b;
    cin>>a>>b;
    cout<< add(a, b)<< endl;
    return 0;
}
```

## 结构体

结构体, 结构体是C++的基础，结构体的格式为：

```cpp
struct 结构体名{
    成员变量1;
    成员变量2;
    ...
}
```

结构体的成员变量为结构体的成员变量，成员变量为变量。

我们可以在结构体中定义变量，变量的作用域为结构体内。这是局部变量

结构体的调用格式为：结构体名.成员变量名

了解了这些后，我们就可以开始编写结构体了。

简单结构体示例:

```cpp
#include <iostream>
using namespace std;
struct Person{
    string name;
    int age;
    double height;
}
int main(){
    Person person;
    cin>>person.name>>person.age>>person.height;
    cout<< person.name<< " "<< person.age<< " "<< person.height<< endl;

}
```

结构体也可以嵌套结构体。

嵌套结构体示例:

```cpp
#include <iostream>
using namespace std;
struct Person{
    string name;
    int age;
    double height;
}
struct Student{
    Person person;
    int grade;
}
int main(){
    Student student;
    cin>>student.person.name>>student.person.age>>student.person.height>>student.grade;
    cout<< student.person.name<< " "<< student.person.age<< " "<< student.person.height<< " "<< student.grade<< endl;

}
```

结构体也可以定义数组。

结构体数组的调用格式为：结构体名[数组索引]

了解了这些后，我们就可以开始编写结构体数组了。

简单结构体数组示例:

```cpp
#include <iostream>
using namespace std;
struct Person{
    string name;
    int age;
    double height;
}
int main(){
    Person person[10];
    for(int i=0; i<10; i++){
        cin>>person[i].name>>person[i].age>>person[i].height;
    }
    for(int i=0; i<10; i++){
        cout<< person[i].name<< " "<< person[i].age<< " "<< person[i].height<< endl;
    }
}
```

结构体也可以定义指针。

结构体指针的调用格式为：结构体名*指针名

了解了这些后，我们就可以开始编写结构体指针了。

简单结构体指针示例:

```cpp
#include <iostream>
using namespace std;
struct Person{
    string name;
    int age;
    double height;
}
int main(){
    Person *person;
    person = new Person;
    cin>>person->name>>person->age>>person->height;
    cout<< person->name<< " "<< person->age<< " "<< person->height<< endl;
    delete person;
}
```