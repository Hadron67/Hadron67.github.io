---
title: 四维几何学 2－从超立方体说起
tags:
  - 几何
  - 四维
date: 2016-04-12 23:54:13
keywords: 四维空间,超立方体,几何学,四维几何学
category: Old blog/四维几何学
layout: post
indent: true
---

相信大家在看了[上一篇文章](/article/2016/04/09/la-dimension-quatre-premier/)之后已经对四维空间有一个基本的概念了，对它的研究方法也比较熟悉了，下面我们继续深入讨论四维空间中点、线、面以及胞之间的位置关系．在这篇文章中我们将着重探讨超立方体的结构，通过探讨它里面各个元素的关系来引出四维几何学的一些基本定理．

![超立方体的透视投影－维基百科](https://upload.wikimedia.org/wikipedia/commons/d/d7/8-cell.gif)
记得高中立体几何里面我最喜欢做的就是在立方体里面的题了，经常图都不用画直接在心里想都可以得到答案。四维空间也一样，正交赋予了它很多很直观的几何特性，在超立方体里面讨论问题就会使问题变得简单许多，想象也更加容易。

<!-- more -->

## 超立方体的正交投影
在探讨超立方体之前，我们先来进一步熟悉一下超立方体的正交投影，下面的讨论我们就靠它了。像三维的直角坐标系一样，我在超立方体上画出了四维直角坐标系，方便大家想象。（注意t并不代表时间！）
这个投影其实很容易画出来，先画中间那四个垂直的线，再把它们补成正方形，然后再把剩下的线连起来。
![坐标系和超立方体的正交投影](2016/h-avec-axis.png)

我们看到，它是由两个正方体对应顶点相连组成的，正好是正方体的投影，即两个正方形相连的类比。注意组成它的那些正方体是被投影扭曲了，即使看上去不是正方体，我们在讨论的时候要仍然认为它们是正方形，比如，由于每个顶点都是被三个正方体共享的，所以每个顶点所发出的四条棱是两两垂直的！显然这在三维空间里面是做不到的，正是由于这个结论导致了很多有趣的结论。下面我们就从线和胞的关系开始吧。
## 线－胞关系
![线与胞的位置关系](2016/line-cell.png)
其实所有和胞的关系都是很简单的，用类比法就够了。我们现在来看直线AE,EF,AG与正方体胞ABCD-A'B'C'D'的位置关系。先从AE开始吧。刚才我们知道了从一个顶点发出的四条棱是两两垂直的，所以AE同时垂直于AA',AB,AD，由于这三条线又两两不平行，因此可以证明AE垂直于胞中的所有直线（用向量法，胞中的所有向量都可以用AA',AB,AD的线性叠加表示，然后就简单了）。类似于三维空间中的线面垂直，我们说AE是**垂直**于胞ABCD-A'B'C'D'，同时，它也是这个胞的**法线**。

下面我们再来看EF。从EF所在的正方体来看，EF是平行于AA'的。在立体几何中我们知道，如果一条直线平行于平面内的任意一条直线，那么它就平行于这个平面。可不可以类比到四维空间，即EF平行于胞ABCD-A'B'C'D'呢？答案是肯定的。简单的想，因为EF和法线AE是垂直的，类比立体几何的结论，我们可以知道EF是平行于整个胞的，在以后的系列文章里面我们还会给出严密的证明。

那么，AG的位置关系是什么？也许你已经猜到了，它就是普通的斜交而已。类比线面角，我们可以将**线胞角**定义为直线与它在胞中的射影的夹角。由于GD也是胞ABCD-A'B'C'D'的法线，所以AG的射影就是AD，因此线胞角为45度。简单吧？

注意，AE和AG与胞ABCD-A'B'C'D'只交于一点A！因为如果不是，那么我们可以把胞补全，这样使得整条直线都在胞内。而实际上AG和AG并没有在胞ABCD-A'B'C'D'内。
综上，线胞关系有这几种可能：
* 平行，即没有交点；
* 垂直，一个交点；
* 斜交，一个交点；
* 直线包含于胞中。

## 面－胞关系
![平面与胞的位置关系](2016/plane-cell.png)
面与胞的关系和线胞关系非常类似。仿照立体几何，我们可以把面胞平行定义为没有公共点；把面胞角定义为在平面中和胞中垂直于交线的夹角，当面胞角等于90度时就垂直。

上图中我们可以看到面ADGE是垂直于胞ABCD-A'B'C'D'的，因为垂直于交线的两条线AE和AB是相互垂直的，注意它与胞也是只交于一条直线。面EFHG是平行于胞ABCD-A'B'C'D'的，因为它平行于胞中的平面AA'C'D。

对于斜交的平面，如面A'EGC'（图中没画出来），我们也可以使用定义计算出它的面胞角为45度。由于胞也有法线，因此射影面积定理也可以计算面胞角。

综上，面胞关系有这几种可能：
* 平行，没有公共点；
* 斜交，交于一条直线；
* 垂直，交于一条线；
* 平面包含于胞中。

## 胞－胞关系
![胞与胞的位置关系](2016/cell-cell.png)
胞胞关系与上面的两个关系非常类似，此处就不详细说了。不同的只有两个胞会交于一个平面，因此胞胞角可以定义为在两个胞中垂直于交面的两条直线的夹角。

上图中胞ABCD-A'B'C'D'与胞ABCD-EKLG垂直，它们交面于ABCD；胞ABCD-A'B'C'D'与胞EKLG-FIJH是平行的。综上，胞胞关系有这几种可能：
* 平行，没有公共点；
* 斜交，交于一个平面；
* 垂直，交于一平面；
* 重合。

## 二面关系
好了，现在让我们来讨论四维空间中最复杂的位置关系－－二面关系。你也许会把二面关系想的很简单：不外乎就平行、垂直嘛。其实，胞与其他元素位置关系之所以简单，是因为胞存在法线，或者说法向量，这使得我们可以把胞与其他元素的位置关系转化为它的法线与其他的位置关系。然而，下面我们将看到，**四维空间中平面并没有法向量**！也就是说我们不能用它的法向量来定义它与其他元素的位置关系，只能硬着头皮直接上。

### 二面平行
![二面关系](2016/plane-plane1.png)
现在，我们先从二面平行开始吧。图中面ABCD与面EFHG在同一个正方体胞中是平行的，我们可不可以说它们就是平行的呢？这要看四维空间中怎么定义平行了。如果按照后面讲的二面角定义，情况就比较复杂（看[这篇文章](http://wxyhly.github.io/archives/geometry4ds/)）。我把平行定义成**如果两个平面通过平移可以相互重合，那么就平行**，这样面ABCD与面EFHG就是平行的了。

为什么要这样定义平行？这是为了类比三维空间。因为三维空间中两条直线没有公共点并不能说明它们平行，它们还可能异面。等等，既然直线可以异面，那么平面是不是可以**异胞**？没错！就是它们不在同一个胞中。
### 二面垂直
下面开始就更有意思了，我们来看面EDJI与面ABCD的关系。由于我们知道DA,DC,DE,DJ是两两垂直的，所以DE和DJ都是垂直于面ABCD的，而DE和DJ是面EDJI中的两条相交直线，所以根据向量法的思路我们很快得出：面EDJI与面ABCD中的任意两条直线都是垂直的！哇，这个有点考想象哦，完全没有了三维空间的类比。我们把这样的垂直关系叫做**绝对垂直**，相互绝对垂直的两个面互为**法平面**；而只满足三维空间的垂直定义的两个面，即一个面过与另一个面垂直的直线，称为**半垂直**，如面ABCD与面BCFH。绝对垂直是半垂直的充分不必要条件。

如果两个平面是绝对垂直的，那么它们就一定异胞，而且**交于一点**。这很好理解，因为胞外平面与胞可以交于一条直线，胞内平面与这条直线就交于一点。如面EDJI就与面ABCD交于D点。
### 二面角
还剩下最后一个问题，也是最难的问题：四维空间中的二面角。开始时，我也想类比三维空间的定义，结果发现根本类比不过去：如果两个平面交于一条直线还好说，但上面说过了它们还可能交于一点！射影面积定理也不管用，因为半垂直和绝对垂直的射影一个是一条直线一个是点，得到的面积比是一样的！这暗示了简单的用一个角度来衡量四维二面角是不够的。

那么到底该怎么定义二面角呢？之所以我们不能类比三维空间中二面角的定义，就是因为这个定义没有体现出二面角的本质。于是，为了能在四维空间中类比三维的定义，我们重新改写一下二面角的定义：

**在其中一个平面中任取一条直线，这条直线与另一个平面的最大夹角就是二面角的大小。**

容易验证这与一般的二面角定义是相容的。由于三维空间中最小夹角是0，所以不用管。四维空间呢？情况就不同了！虽然四维线面角自然不成问题，如果它们异胞的话我们也可以通过平移使它们共胞，但四维空间中**最小夹角可能不为0**！此时对应的情况就是它们交于一点。这也就是说，我们要用两个角，即最大角与最小角来描述四维二面角！在下面的讨论中我们分别把最大角与最小角记为$\theta_{1}$和$\theta_{2}$。
![最大角与最小角示意图](2016/plane-plane2.png)
这就是一般情况下最大角与最小角的示意图。其中直线AB就是面$\beta$与面$\alpha$所在胞的交线。

好了，有了二面角的定义，我们现在来重新用二面角定义一下二面关系：
* $\theta_{1}=\theta_{2}=90^{\circ}$，即不管那条直线怎么转角度都是90度，很明显，是绝对垂直；
* $\theta_{1}=90^{\circ}$，即此时两个面符合三维的面面垂直定义（三维二面角为90度），因此为半垂直；
* $\theta_{2}=0$，说明它们交于一条直线，为共胞；
* $\theta_{1}=\theta_{2}=0$，为平行；
* 其余情况为异胞。

特别地，如果$\theta_{1}=\theta_{2}$，我们就说这两个平面互为**等角平面**。

### 二面角的计算
#### 单位圆法
现在有了定义，下一步就是如何计算的了。关于计算，[这篇论文](http://www.cnki.com.cn/Article/CJFDTotal-FXKY198501013.htm)介绍了一种直观但复杂的单位圆投影法。具体做法就是在一个面里面作一个单位圆，然后投影到另一个平面里面。由于投影变换是线性的，所以投影一定是椭圆，而椭圆就有长轴和短轴，这就使得方向发生了极化，因此长轴就等于$\cos \theta_{2}$，短轴就等于$\cos \theta_{1}$。然而这个计算就涉及到二次曲线方程，很复杂。不过这又告诉了我们一个规律：**取得最大和最小角的两个方向是垂直的**。
![投影法](2016/plane-plane3.png)
#### 2-形式法
在三维空间里面我们可以用向量法来求二面角，虽然这个方法并不适合于四维空间，因为平面没有法向量，但我们可以定义一种新的“向量类似物”－－2-形式，[这篇文章](http://wxyhly.github.io/archives/bivector4ds/)有详细的介绍。
#### 几何法与射影面积定理
记得高中做立体几何时非常喜欢几何法，就算题目给的是坐标都还是想用几何法，总有些看不起向量和解析法。四维空间里面也有相应的几何法，下面我们通过一个例子来了解一下它。
![几何法例题](2016/plane-plane4.png)

设超立方体边长为1，我们分别在直线AE和CF上取两点P和K，使得AP=x，CP=y，求面ABCD与面DPK二面角的最大角与最小角的余弦值。

由于DK和DP所在的平面是相互绝对垂直的，所以$DK\bot DP$，因此它们与ABCD所成的二面角可能一个是最大角一个是最小角。这里我们先假设它们是。于是我们的结论是
$$\cos \theta_{1}=\min({1 \over \sqrt{1+x^2}},{1 \over \sqrt{1+y^2}})$$
$$\cos \theta_{2}=\max({1 \over \sqrt{1+x^2}},{1 \over \sqrt{1+y^2}})$$
射影面积定理真的没用了吗？不是的！根据上面说到的单位圆法，单位圆投影之后的面积为原面积的$\cos \theta_{1}\cos \theta_{2}$倍，因此，四维空间中的射影面积定义被修改为了：

**射影面积与原面积的比值为最大角与最小角的余弦值的乘积**

因此，上面例题中面积比值为${1 \over \sqrt{1+x^2}\sqrt{1+y^2}}$，正好是两个余弦值的乘积，因此我们的假设是正确的。
可能你会说射影面积定理列出的方程有两个未知数，不能求出结果，但实际上你可以再做一步：将原面再投影到法平面上，这时得到的面积比值就是$\sin\theta_{1}\sin\theta_{2}$，然后就可以分别解出最大角与最小角了。这样做所依据的定理将在下一篇系列文章中证明。

本来四维就难想，几何法又比较考思维能力，如果情况复杂了，恐怕2-形式法是唯一的选择。
[返回目录](#目录)
## 思考题
从这篇系列文章开始呢，每篇文章的最后我都会出一道简单的思考题，每次的答案会在下一次系列文章公布，大家可以试试自己的理解程度。

请找出与下面两个平面**绝对垂直**的面：
![思考题](2016/exercise.png)
***
## 结束语
看完这篇文章，你已经了解了四维空间的基本结构了，要是哪天不小心进入了四维世界，看懂四维文明的地图应该不成问题了吧。下一篇系列文章中我们将总结并补充这篇文章中提到的各种定理，以及它们的证明。

> 我的文章讲的相对较简单，大家如果有兴趣可以去看一下[这篇文章](http://wxyhly.github.io/archives/geometry4ds/)，里面有更加深入的介绍。