---
layout: post
date: 2019-3-30 14:28:38 +0800
title: Test
category: Note
disabled: true
---
```mathjax-defs
\def\dd{\mathrm{d}}
\def\pd#1#2{\frac{\partial #1}{\partial #2}}
% \def\vec#1{\overrightarrow{#1}}
```
**This is just a test post, it doesn't contain anything make sense, just ignore it...**

This is a test page $\vec B = \nabla\times\vec A$ **Scientia gravis est, praeter non mens et anima est.** Vestibulum tortor quam, *feugiat vitae*, ultricies eget, tempor sit amet, ante. Donec eu libero sit amet quam egestas semper. Aenean ultricies mi vitae est. Mauris placerat eleifend leo. Quisque sit amet est et sapien ullamcorper pharetra. Vestibulum erat wisi, condimentum sed rtherth.

我能吞下玻璃而不伤身体。

The quick brown fox jumps over the lazy dog.

<!-- more -->
## A title in excerpt

[Wikipedia](https://wikipedia.com)
Maxwell's equations:
$$
\begin{cases}
    \nabla\times\vec B & = \epsilon_0\mu_0\vec j + \epsilon_0\pd{\vec E}t\\
    \nabla\times\vec E & = -\pd{\vec B}t\\
    \nabla\cdot\vec B & = 0\\
    \nabla\cdot\vec E & = \frac{\rho_f}{\epsilon_0}
\end{cases}
$$
Exterior differential form:
$$
\begin{cases}
    \dd{}^\star F & = \mu_0{}^\star J\\
    \dd F & = 0
\end{cases}
$$

## A title containing equation $\Omega$
> Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus magna. Cras in mi at felis aliquet congue. Ut a est eget ligula molestie gravida. Curabitur massa. Donec eleifend, libero at sagittis mollis, tellus est malesuada tellus, at luctus turpis elit sit amet quam. Vivamus pretium ornare est.

<GithubImage src="hkm" />

<![CDATA[]]>

## Some old blog
### 一次方程
和三维空间一样，我们来讨论一下四维空间中直线、面、当然，还有胞的方程。
直线方程和胞方程都比较简单，直线可以类比三维空间的，胞由于有法向量，所以可以类比三维的平面方程。关键是平面方程，四维的平面没有法向量，不能直接类比。
* 参数方程　最容易想到的应该是参数式方程，如果有两个在面中而且不平行的矢量$\vec{a},\vec{b}$，那么面中发的任何一个矢量都可是表示成$\vec{l}=\mu\vec{a}+\lambda\vec{b}$，只要我们再知道平面过的任何一点的坐标，就可以写出它的参数方程。
* 点法式方程 虽然四维中的平面没有法矢量，但它有法平面，即与它绝对垂直的平面。一个平面的“方向矢量”可以用**2-矢量**（可以先看一下[这里](http://wxyhly.github.io/2016/04/16/bivector4ds/)还有[这里](/2016/04/21/axial-vectors/)）来表示。所以，对于一个法2-矢量为${\bf F}$的平面，任何一个矢量$\vec{r}$在面中的条件就是它与法2-矢量正交，即满足${\bf F}\cdot\vec{r}={\bf 0}$，在加上面中一点的坐标就可以写出完整的方程。注意上面2-矢量与矢量间的张量内积的结果依然是矢量，所以点法式方程写出来会有4个。

* $x^2+y^2+z^2=t$
这个方程对应的曲胞我们称为**旋转抛物胞**，是四维“山”的“盆地”，因为xyz都是“高度”t增大的方向。如果我们把t反个号就得到“山峰”，这时三个方向就都是“高度”减小的方向。
从t轴方向去截它就得到一个半径在变化的球，从侧面截就得到旋转抛物面。并且它是旋转抛物面在任意一个过t轴且垂直于它对称轴的面中旋转得到的曲胞。
* $x^2+y^2-z^2=t$
这个又有点抽象了，它是马鞍面的类比，我们把它称为**旋转双曲抛物胞**，是四维“山”的“山谷”。我们知道三维的山谷是沿某个方向（如x）是高度增大的方向，另一个垂直的方向（如y）是减小的方向。而在四维中反而有点对称破缺，沿x和y这两个方向是t增大，z则是t减小的方向。同样的，如果把t反号，那么就是两个减小，一个增大。
从方程来看它是把$x^2-z^2=t$中的$x^2$换成了$x^2+y^2$（注意此时y成了第四维），所以它可以看成是马鞍面在$Oxy$中旋转成的曲胞，x轴方向恰好就是马鞍面上升地最快的方向。


下一篇文章我们就会用到这两种四维“基本地形”。

$$\Gamma\left(TM^n\right) = \left\{X\mid X:M^n\to TM^n \text{是个切向量场}\right\}.$$

## 思考题
请找出环面（即甜甜圈形）的四维类比并想出截面动画。你会发现如果用解析法会更容易得出答案，但缺乏直观性。
***
上次的答案：
类比三维空间可以知道16胞体相邻两个胞的法向量分别为$n_{1}=(1,1,1,1)$以及$n_{2}=(1,1,1,-1)$，所以夹角余弦值为
$$
\cos\theta={n_1\cdot n_2 \over \vert n_1\vert\vert n_2 \vert}={1\over 2}\to\theta=60^{\circ}
$$
由于这两个法向量都是指向多胞体外部的，所以$\theta$其实是夹角的补角，真正的应该夹角为$120^{\circ}$.

