## 初中化学的特点

贝多芬（背多分）

## 成绩好的秘诀

**快！** 永远要快人一步！能初二卷完就不要等初三！

未来永远都不确定，只有自律，快人一步，才能脱颖而出！

## LaTex化学公式

### 介绍

LaTeX 中的普通化学公式主要依靠 `mhchem` 宏包完成。而有机化学相关的公式主要利用 `chemfig` 完成，`chemfig` 的使用比较复杂，目前用不到所以这里不做介绍。

### 使用

语法：`$\ce{化学式}$`

### 示例

#### 1. 分子、离子

| 语法              | 显示              | 说明               |
| :---------------- | :---------------- | :----------------- |
| `\ce{Fe(OH)2}`    | $\ce{Fe(OH)2}$    | 氢氧化亚铁         |
| `\ce{CaCO3}`      | $\ce{CaCO3}$      | 碳酸钙             |
| `\ce{H2O}`        | $\ce{H2O}$        | 水                 |
| `\ce{H+}`         | $\ce{H+}$         | 氢离子             |
| `\ce{NO3-}`       | $\ce{NO3-}$       | 硝酸根             |
| `\ce{Ca2+}`       | $\ce{Ca2+}$       | 钙离子（错误写法） |
| `\ce{Ca^2+}`      | $\ce{Ca^2+}$      | 钙离子（正确写法） |
| `\ce{CuSO4.5H2O}` | $\ce{CuSO4.5H2O}$ | 五水硫酸铜         |

**语法规则：**

- 形如$\ce{H2SO4}$的化学式不再需要使用`^`和`_`表示上下标，而可以直接书写为`H2SO4`。
- 输入离子时，先下标后上标
  - 若上标超过1个字符，则需要在上标前加上`^`，否则会显示为以上的错误示范。
- 使用`.`或`*`表示配合物中的“**·**”



#### 2. 化合价和文字说明

可以使用`\overset{顶部文字}{元素}`表示化合价，`\underset{底部分子}{元素}`表示说明。



在该语法中使用上标或下标，需要使用`^`和`_`

| 语法                                        | 显示                                        | 说明       |
| :------------------------------------------ | :------------------------------------------ | :--------- |
| `\ce{\overset{+2}{Fe}\overset{+3}{Fe}_2O4}` | $\ce{\overset{+2}{Fe}\overset{+3}{Fe}_2O4}$ | 四氧化三铁 |
| `\ce{Ca\overset{-1}{H}_2}`                  | $\ce{Ca\overset{-1}{H}_2}$                  | 氢化钙     |
| `\underset{\text{葡萄糖}}{\ce{C6H12O6}}`    | $\underset{\text{葡萄糖}}{\ce{C6H12O6}}$    | 葡萄糖     |



#### 3. 化学方程式

| 语法                                                    | 显示                                                    | 说明       |
| :------------------------------------------------------ | :------------------------------------------------------ | :--------- |
| `\ce{Ba^2+ + SO4^2- = BaSO4 v}`                         | $\ce{Ba^2+ + SO4^{2-} = BaSO4 v}$                       | 硫酸钡沉淀 |
| `\ce{2KClO3 \xlongequal[\triangle]{MnO2} 2KCl + 3O2 ^}` | $\ce{2KClO3 \xlongequal[\triangle]{MnO2} 2KCl + 3O2 ^}$ | 氯酸钾分解 |

**语法规则：**

- 使用`化学式 + 空格 + v`来表示沉淀，使用``化学式 + 空格 + ^`来表示气体
- 使用`\xlongequal[线下方内容]{线上方内容}`来显示长等号
- 使用`\triangle`来表示$\triangle$



#### 4. 箭头

| 语法                  | 显示                     | 说明   |
| :-------------------- | :----------------------- | :----- |
| `\ce{A -> B}`         | $\ce{A->B}$              | 单箭头 |
| `\ce{A <=> B}`        | $\ce{A<=>B}$             | 双箭头 |
| `\ce{A ->[x]B}`       | $\ce{A ->[x]B}$          |        |
| `\ce{A ->[上][下] B}` | $\ce{A ->T[上][下] B}$   |        |
| `\ce{A ->[H2O] B}`    | $\ce{A ->[\ce{+H2O}] B}$ |        |



### 参考资料

- [LaTex化学公式（一）插件的引入和使用 - 清北博客 (tsinbei.com)](https://blog.tsinbei.com/archives/968/)
- [LaTex化学公式（二）基本语法 - 清北博客 (tsinbei.com)](https://blog.tsinbei.com/archives/981/)
- [LaTex化学公式（三）特殊符号 - 清北博客 (tsinbei.com)](https://blog.tsinbei.com/archives/999/)



## MAC上快速输入`$\ce{}$`的方法

经常输化学公式的小伙伴应该知道，频繁的打`$\ce{}$`是一件非常麻烦的事情，这里提供一个优雅的解决方案。

**实现效果**

1. 输入H2SO4，并选中
2. 按下ctrl + w
3. H2SO4变为`$\ce{H2SO4}$`

**设置方法**

1. 按下alt + 空格，搜索`自动操作`并打开

2. 选择文稿类型：点`快速操作`，点右下角`选取`

3. 左边变量搜索栏搜索`shell`，拖到右边的工作流程区

4. 右边依次更改，位于改为`typora`，勾选`用输出内容替换所选内容`，shell改为`/bin/bash`，传递输入改为`作为自变量`

5. 将以下代码粘贴进去

   ```bash
   for f in "$@"
   do
       echo '$\ce{'"$f"'}$'
   done
   ```

6. 右上角选择`文件` - `存储`，自己输一个文件名
7. 打开mac的`设置` - `键盘` - `键盘快捷键` - `服务` - `文本`
8. 找到刚才创建的自动操作并设置快捷键