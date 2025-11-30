#  Tianniu CLI - AI驱动的企业级脚手架

Tianniu CLI 是一个现代化的企业级脚手架工具，集成了AI能力，旨在帮助开发者快速搭建项目骨架、生成代码模板和测试样例。它支持多种主流技术栈，提供统一的项目结构和开发体验。

###  项目结构

```
tianniu-cli/
├── packages/
│   ├── cli/          # CLI核心包
│   │   ├── src/
│   │   │   ├── commands/     # 命令实现
│   │   │   ├── utils/       # 工具函数
│   │   │   └── types/       # 类型定义
│   │   └── templates/       # 项目模板
│   └── ai/           # AI服务包
│       ├── src/
│       │   ├── client.ts    # AI客户端
│       │   └── prompts.ts   # AI提示词
│       └── package.json
├── package.json      # 根包配置
├── tsconfig.json     # TypeScript配置
└── README.md         # 项目文档
```

```bash
# 克隆项目
git clone [https://github.com/your-org/tianniu-cli.git](https://github.com/opteOG/tianniu-cli.git)

# 安装依赖
pnpm install

# 构建项目
pnpm build

# 链接到全局
pnpm link --global

# 测试CLI
tianniu --help
```

## 命令介绍
```bash
# 查看所有命令
tianniu -h

# 查看当前版本
tianniu version

# 查看脚手架信息
tianniu info

# 创建项目（根据模板）
tianniu create

# 启动开发环境
tianniu serve

# 打包构建
tianniu build

# 生成组件StoryBook文档
tianniu text:gen

# 生成测试文件
tianniu test:gen

# 开启预览
tianniu preview

# lighthouse审计性能指标
tianniu audit

```
# 要使用AI功能需要在全局文件.env下配置OPENAI_API_KEY和BASE_URL
<img width="1847" height="905" alt="image" src="https://github.com/user-attachments/assets/7353873a-3502-4439-89a4-0ec6b5bcf958" />

![clideo_editor_0528cac7920f4e8a948774da390723cb](https://github.com/user-attachments/assets/0ab2453c-8f35-4c1c-8371-5f533830da79)

## 审计功能使用流程
1、tianniu preview启动预览
2、tianniu audit启动审计

![clideo_editor_097ac6094b1b4a2baafa4349219961fb](https://github.com/user-attachments/assets/ce0d3475-4b6e-4220-8bb0-5d72b2a094e8)

