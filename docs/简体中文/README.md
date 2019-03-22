
`@ltd/j-toml`
=============

`@ltd/j-toml` 是龙腾道为 [汤小明语](https://ZhuanLan.ZhiHu.com/p/50412485)（“汤小明的小巧明晰语言”）写的实现。  
——这 TM 可能是“我”见过最好的配置文件书写格式了。  
——对于亲手折腾到爆炸的人而言。

Node.js
-------

```shell
npm install @ltd/j-toml
```

```javascript
const TOML = require('@ltd/j-toml');

const 源内容           = `
      "一个普通的键名" = "..."
      hasOwnProperty   = "..."
      constructor      = "..."
      __proto__        = "..."
`;

const 根表 = TOML.parse(源内容, 0.5, '\n');

根表.一个普通的键名 // "..."
根表.hasOwnProperty // "..."
根表.constructor    // "..."
根表.__proto__      // "..."
```

`TOML.parse`
------------

```
TOML.parse(源内容, 遵循规范版本, 多行拼接字符[, 使用BigInt=true[, 超级选项]]);
```

```typescript
function parse (
         源内容       :string | Buffer,
         遵循规范版本 :0.5 | 0.4,
         多行拼接字符 :string,
         使用BigInt?  :boolean | number = true,
         超级选项?    :object
) :Table;
```

### `arguments`

0.  #### `源内容`
    
    *   类型：`string` / `Buffer(UTF-8)`
    *   必需
    
    你可以传入 `string`，也可以传入文件原始的二进制 `Buffer`。
    
    一个区别是，当传入 `string` 时，只会根据规范检查所有字符是否均为有效的 Unicode 字符（未配对的 UCS-4 字符码是无效的）；  
    而传入 `Buffer` 时，还会额外检查是否存在未知码点（而这在 `string` 状态下已经被自动替换为 `U+FFFD`）。
    
    另一个区别是，`Buffer` 允许以 UTF BOM 开头，这会用于文件编码的确认（但它必须是 UTF-8 编码的，这不是技术问题，而是规范的要求），并在正式解析前跳过；  
    而 `string` 不允许，因为 BOM 属于 UTF 而非 TOML。
    
1.  #### `遵循规范版本`
    
    *   类型：`0.5` / `0.4`
    *   必需
    
    如果没有特殊理由（例如为了处理历史遗留文件），建议使用最新的版本。
    
2.  #### `多行拼接字符`
    
    *   类型：`string`
    *   必需
    
    对于多行字符串，用什么来拼接各行。  
    注意在解析 TOML 源时，按照 TOML 规范的要求，行分隔符总是 `"\n"` 或 `"\r\n"`。
    
3.  #### `使用BigInt`
    
    *   类型：`boolean` / `number`
    *   默认值：`true`
    
    指定你是否要用 `BigInt` 来实现整数类型的值。`number` 类型的参数允许你精确控制超过多少才使用 `BigInt`，例如 `Number.MAX_SAFE_INTEGER`（自动通过 `-useBigInt` 获取负向界限，如果 `useBigInt>=0`；否则通过 `-useBigInt-1` 获取正向界限）。
    
4.  #### `超级选项`
    
    *   类型：`object`
    
    标准中所没有的扩展功能。  
    包括保持表中键值对的顺序、超出长整型的整数、保留注释信息、`null` 值、跨行行内表及尾逗号甚至省略逗号、混合类型的数组、插值字符串、自定义构造器等。  
    私有实验期功能，不建议随意使用。  
    详见 [超级选项](https://GitHub.com/LongTengDao/j-toml/blob/master/docs/简体中文/xOptions.md)。

### `return`

*   类型：`Table`

返回根表（本实现解析出的表，是没有任何继承属性的对象）。

### `throw`

*   类型：`Error`

如果参数不符合要求，会抛出错误；如果源文本有错误，错误对象会有 `lineIndex` 和 `lineNumber` 两个数值属性来帮助定位。
