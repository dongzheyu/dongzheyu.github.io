import{_ as t,c as i,a as l,i as e,g as n,f as s,w as r,h as o,o as c}from"./index-C3VXxQ9W.js";const b={},d={class:"container py-5"},g={class:"row"},h={class:"col-lg-8 mx-auto"},p={class:"project-detail"},m={class:"mt-5"},v={class:"d-flex justify-content-between align-items-center"};function _(I,a){const u=o("router-link");return c(),i("div",d,[l("div",g,[l("div",h,[l("article",p,[a[2]||(a[2]=e('<header class="mb-4" data-v-b5e683aa><h1 class="fw-bold" data-v-b5e683aa>Jetbrains-Crack</h1><div class="text-muted mb-3" data-v-b5e683aa><span class="badge bg-primary me-2" data-v-b5e683aa>开发工具</span><span class="badge bg-warning me-2" data-v-b5e683aa>工具</span><span class="badge bg-info" data-v-b5e683aa>Java</span></div></header>',1)),a[3]||(a[3]=l("div",{class:"project-content"},[l("h2",null,"项目简介"),l("p",null,"Jetbrains-Crack是一个JetBrains系列IDE激活工具，支持IntelliJ IDEA、PyCharm、WebStorm、CLion等所有JetBrains产品。该工具旨在为开发者提供便捷的IDE激活解决方案。"),l("div",{class:"alert alert-warning",role:"alert"},[l("i",{class:"bi bi-exclamation-triangle me-2"}),l("strong",null,"免责声明："),n("本项目仅供学习和研究使用，请支持正版软件。商业使用请购买官方授权。 ")]),l("h2",null,"支持的产品"),l("ul",null,[l("li",null,[l("strong",null,"IntelliJ IDEA"),n("：Ultimate和Community版本")]),l("li",null,[l("strong",null,"PyCharm"),n("：Professional和Community版本")]),l("li",null,[l("strong",null,"WebStorm"),n("：JavaScript/TypeScript IDE")]),l("li",null,[l("strong",null,"CLion"),n("：C/C++ IDE")]),l("li",null,[l("strong",null,"DataGrip"),n("：数据库管理工具")]),l("li",null,[l("strong",null,"RubyMine"),n("：Ruby和Rails IDE")]),l("li",null,[l("strong",null,"PhpStorm"),n("：PHP IDE")]),l("li",null,[l("strong",null,"GoLand"),n("：Go语言IDE")]),l("li",null,[l("strong",null,"Rider"),n("：.NET IDE")])]),l("h2",null,"主要功能"),l("ul",null,[l("li",null,[l("strong",null,"一键激活"),n("：简单快捷的激活流程")]),l("li",null,[l("strong",null,"自动检测"),n("：自动识别已安装的JetBrains产品")]),l("li",null,[l("strong",null,"版本兼容"),n("：支持最新版本和旧版本")]),l("li",null,[l("strong",null,"重置试用"),n("：重置30天试用期")]),l("li",null,[l("strong",null,"离线激活"),n("：支持离线环境激活")])]),l("h2",null,"技术实现"),l("h3",null,"激活原理"),l("p",null,"基于JetBrains IDE的许可证验证机制："),l("ul",null,[l("li",null,"修改许可证验证逻辑"),l("li",null,"模拟许可证服务器响应"),l("li",null,"绕过在线验证检查")]),l("h3",null,"核心代码结构"),l("pre",null,[l("code",null,`├── jetbrains-crack/
│   ├── src/
│   │   ├── main/
│   │   │   ├── java/
│   │   │   │   └── com/jetcpp/cracker/
│   │   │   │       ├── core/        # 核心激活逻辑
│   │   │   │       ├── utils/       # 工具类
│   │   │   │       ├── config/      # 配置管理
│   │   │   │       └── ui/          # 用户界面
│   │   │   └── resources/
│   │   └── test/
│   ├── agent/                         # Java Agent
│   └── scripts/                       # 安装脚本`)]),l("h2",null,"使用方法"),l("h3",null,"系统要求"),l("ul",null,[l("li",null,"Java 8或更高版本"),l("li",null,"Windows 10/11, macOS 10.14+, Linux"),l("li",null,"已安装JetBrains IDE")]),l("h3",null,"激活步骤"),l("ol",null,[l("li",null,"下载最新版本的Jetbrains-Crack"),l("li",null,"关闭所有JetBrains IDE"),l("li",null,"运行激活工具"),l("li",null,"选择要激活的IDE"),l("li",null,'点击"激活"按钮'),l("li",null,"启动IDE验证激活状态")]),l("h3",null,"重置试用"),l("pre",null,[l("code",null,`# 使用命令行重置
java -jar jetbrains-crack.jar --reset-trial

# 或使用图形界面
1. 启动工具
2. 选择"重置试用"选项
3. 选择目标IDE
4. 确认重置`)]),l("h2",null,"配置选项"),l("h3",null,"激活配置"),l("pre",null,[l("code",null,`{
    "license": {
        "type": "commercial",
        "user": "JetCPP User",
        "expiration": "2099-12-31"
    },
    "auto_update": true,
        "backup_original": true,
    "log_level": "INFO"
}`)]),l("h3",null,"高级选项"),l("ul",null,[l("li",null,[l("strong",null,"自动更新"),n("：自动检查和更新激活状态")]),l("li",null,[l("strong",null,"备份原文件"),n("：激活前备份原始文件")]),l("li",null,[l("strong",null,"日志记录"),n("：详细的操作日志")]),l("li",null,[l("strong",null,"静默模式"),n("：后台运行无界面")])]),l("h2",null,"故障排除"),l("h3",null,"常见问题"),l("ul",null,[l("li",null,[l("strong",null,"激活失败"),n("：检查IDE版本和权限")]),l("li",null,[l("strong",null,"许可证过期"),n("：重新运行激活工具")]),l("li",null,[l("strong",null,"无法启动"),n("：检查Java环境和防火墙")])]),l("h3",null,"调试模式"),l("pre",null,[l("code",null,`# 启用调试日志
java -jar jetbrains-crack.jar --debug

# 查看详细错误信息
java -jar jetbrains-crack.jar --verbose`)]),l("h2",null,"安全说明"),l("h3",null,"隐私保护"),l("ul",null,[l("li",null,"不收集用户个人信息"),l("li",null,"不上传使用数据到远程服务器"),l("li",null,"本地计算激活码")]),l("h3",null,"安全建议"),l("ul",null,[l("li",null,"从官方渠道下载"),l("li",null,"验证文件完整性"),l("li",null,"定期更新工具")]),l("h2",null,"更新日志"),l("h3",null,"v2.5.0 (2024-01-15)"),l("ul",null,[l("li",null,"支持2024.1版本IDE"),l("li",null,"改进激活稳定性"),l("li",null,"修复macOS兼容性问题")]),l("h3",null,"v2.4.0 (2023-12-20)"),l("ul",null,[l("li",null,"新增RustRover支持"),l("li",null,"优化激活速度"),l("li",null,"添加自动备份功能")]),l("h2",null,"开发计划"),l("ul",null,[l("li",null,"[ ] 支持更多JetBrains新产品"),l("li",null,"[ ] Web管理界面"),l("li",null,"[ ] 批量激活功能"),l("li",null,"[ ] 企业版功能")]),l("h2",null,"技术支持"),l("p",null,"如遇到问题，可以通过以下方式获取帮助："),l("ul",null,[l("li",null,"查看FAQ文档"),l("li",null,"提交Issue到GitHub"),l("li",null,"加入技术交流群")]),l("div",{class:"alert alert-info",role:"alert"},[l("i",{class:"bi bi-info-circle me-2"}),l("strong",null,"提示："),n("为了获得最佳体验和完整功能支持，建议购买JetBrains官方正版授权。 ")])],-1)),l("footer",m,[l("div",v,[a[1]||(a[1]=l("div",null,[l("a",{href:"https://github.com/dongzheyu/jetbrains-crack",target:"_blank",class:"btn btn-primary me-2"},[l("i",{class:"bi bi-github"}),n(" 查看源码 ")]),l("a",{href:"https://github.com/dongzheyu/jetbrains-crack/releases",target:"_blank",class:"btn btn-outline-primary"},[l("i",{class:"bi bi-download"}),n(" 下载 ")])],-1)),s(u,{to:"/projects",class:"btn btn-outline-secondary"},{default:r(()=>[...a[0]||(a[0]=[l("i",{class:"bi bi-arrow-left"},null,-1),n(" 返回项目列表 ",-1)])]),_:1})])])])])])])}const f=t(b,[["render",_],["__scopeId","data-v-b5e683aa"]]);export{f as default};
