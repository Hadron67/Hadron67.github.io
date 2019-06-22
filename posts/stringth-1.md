---
layout: post
date: 2019-6-12 19:09:23 +0800
title: 'Notes on String Theory (1)'
category: Note/String
draft: true
---
$$ %hidden
\gdef\dd{\mathrm{d}}
\gdef\od#1#2{\frac{\dd #1}{\dd #2}}
\gdef\pd#1#2{\frac{\partial #1}{\partial #2}}
\gdef\vd#1#2{\frac{\delta #1}{\delta #2}}
\gdef\ket#1{\left|#1\right\rangle}
\gdef\braket#1#2#3{\left\langle #1 \middle| #2 \middle| #3 \right\rangle}
\gdef\abs#1{\left|#1\right|}
$$

In this note we'll discuss classical bosonic strings, and briefly introduce the quantization procedure.

This note follows *Superstring Theory* by Edward Witten, and *Introduction to String Theory and M-Theory* by Michio Kaku.

<!-- more -->

## Bosonic string actions
Before considering the string action, we first study the action of a relativistic point particle, it shares many properties with the bosonic string action.
### Point particle action
The action is given by the length of the world line:
$$ S = -m\int \sqrt{-\dot x^2}\dd\tau. $$
Notice that it has reparameterization invariance:
$$ x'^\mu(\tau') = x^\mu(\tau), $$
the action changes as
$$
\begin{aligned}
    S' & = -m\int \sqrt{-\dot x'^2}\dd\tau\\
    & = -m\int \sqrt{-\left[\od{x'^\mu(\tau')}{\tau'}\right]^2}\dd\tau'\\
    & = -m\int \sqrt{-\left(\od{\tau}{\tau'}\right)^2 \dot x^2(\tau)}\od{\tau'}{\tau}\dd\tau\\
    & = S.
\end{aligned}
$$
In infinitesimal form, the reparameterization is
$$ \delta x^\mu = \dot x^\mu \delta\tau. $$
This invariance is gauge invariance, so gauge fixing procedure is required, which is simple in classical case, but quit non-trivial in quantum theory.

Note that the cannonical momentum
$$ p_\mu = \vd{S}{\dot x^\mu} = m \frac{\dot x_\mu}{\sqrt{-\dot x^2}}, $$
satisfies
$$
p^2 = -m^2, \qquad p\cdot \dot x = -m\sqrt{-\dot x^2} = L,
$$
leads to a vanishing Hamitonian
$$ H = p\cdot \dot x - L = 0, $$
which is not only nonsense in classical theory, but also would result in serious problems in quantization. This is a result of gauge invariance, the four components of the momentum are not all physical, there are redundant degrees of freedom.

Dirac resolved this problem by treating $p^2 + m^2 = 0$ as an constraint, and write the Lagrangian as
$$ L = p\cdot \dot x - \frac12 e(p^2 + m^2), $$
where $e$ is a Lagrangian multiplier. There's no kinetic terms in $p_\mu$, so we can solve for $p_\mu$ gives
$$ p^\mu = \frac1e \dot x^\mu, $$
substitute back to Lagrangian gives
$$ L = \frac12 \left(e^{-1} \dot x^2 - em^2\right). $$
The equation for $e$ reads
$$ \dot x^2 + e^2m^2 = 0, $$
solve for $e$ and substitute it into above, we recover the original Lagrangian. Note that this new Lagrangian still has reparameterization invariance:
$$
x'^\mu(\tau') = x^\mu(\tau), \qquad 
e'(\tau') = \od{\tau}{\tau'} e(\tau).
$$
Notice $e$ changes covariantly, so can be regarded as some sort of "metric" on the world line, and reparameterization is a change of coordinate, similiar to the diffeomorphism invariance of general relativity. Since $e$ has one gauge freedom, we can make a gauge choice by setting $e = 1/m$, the momentum and equation for $e$ becomes
$$ p^\mu = m\dot x^\mu, \qquad \dot x^2 = -1, $$
the former is the familiar definition of 4-momentum, and the latter is the normalize condition of 4-velocity.

### The Nambu-Goto action
Now consider string case. We use $(\tau, \sigma)$ to parameterize the world sheet sweeped by the string, where $\tau$ is the timelike direction, and $\sigma$ is the spacelike, ranging from $0$ to $\pi$. Thus the spacetime position of a point on the string can be denoted by $X^\mu(\tau, \sigma)$.

By anology from point particle, whose action is the length of the world line, the action of a string can be defined by the *area* of its world sheet. We can write the action, which is proportional to the world sheet area, as
$$ S = -T\int \sqrt{-h} \, \dd^2\sigma, $$
where $h_{AB}$ (we use capital Latin letters to number the world sheet coordinate) is the induced metric on the world sheet
$$
h_{AB} = \begin{pmatrix}
    \dot X^2 & \dot X\cdot X'\\
    \dot X\cdot X' & X'^2
\end{pmatrix}.
$$
So 
$$ S = -T\int \sqrt{(\dot X\cdot X')^2 - \dot X^2 X'^2} \, \dd^2\sigma. $$
This is the **Nambu-Goto action**. $T$ is a constant which we'll later see is the string tension.

Similiar to particle case, this action has reparameterization invariance
$$ X'^\mu(\tau', \sigma') = X^\mu(\tau, \sigma). $$
The canonical momentum
$$
P_\mu = \vd{S}{X^\mu} = -T\frac{X'_\mu \dot X\cdot X' - \dot X_\mu X'^2}{\sqrt{(\dot X\cdot X')^2 - \dot X^2X'^2}},
$$
which satisfies
$$
P^2 = -T^2 X'^2, \quad
P\cdot X' = 0, \quad
P\cdot \dot X = L,
$$
also leads to a vanishing Hamitonian
$$ H = P\cdot \dot X - L = 0. $$

As in the particle case, we introduce $P^\mu$ by constraints. But now we need two Lagrange multipliers:
$$ L = P\cdot \dot X + \frac12 \alpha \left(P^2 + T^2 X'^2\right) + \beta P\cdot X'. $$
Solve the equation for $P^\mu$, we get
$$ P_\mu = -\frac{\dot X_\mu + \beta X'_\mu}{\alpha}, $$
substitute back to $L$ gives
$$ 
L = -\frac{1}{2\alpha}\dot X^2 - \frac{\beta}{\alpha}\dot X\cdot X' + \frac12\left(\alpha T^2 - \frac{\beta^2}{\alpha}\right)X'^2.
$$
If we write the Lagrangian in the form
$$ L = C^{AB}\partial_A X^\mu \partial_B X_\mu, $$
then the matrix $C^{AB}$ is
$$
C^{AB} = \begin{pmatrix}
    -\frac{1}{2\alpha} & -\frac{\beta}{2\alpha}\\
    -\frac{\beta}{2\alpha} & \frac12\alpha T^2 - \frac{\beta^2}{2\alpha}
\end{pmatrix},
$$
which satisfies $\det C = -T^2 / 4$. So we can introduce a "metric" $h_{AB}$ on the world sheet by setting 
$$ -\frac{T}{2}\sqrt{-h} \, h^{AB} = C^{AB}, $$
the Nambu-Goto action then becomes
$$
S = -\frac{T}{2}\int \sqrt{-h} \, h^{AB} \partial_A X^\mu \partial_B X_\mu \, \dd^2\sigma.
$$
Again, this action also posesses reparametrization invariance
$$
\begin{aligned}
    X'^\mu(\sigma') & = X^\mu(\sigma), \\
    h'_{AB}(\sigma') & = \frac{\partial\sigma^C}{\partial\sigma'^A}\frac{\partial\sigma^D}{\partial\sigma'^B}h_{CD}(\sigma),
\end{aligned}
$$
or in infinitesimal form
$$
\begin{aligned}
    \delta X^\mu & = \epsilon^A \partial_A X^\mu\\
    \delta h^{AB} & = \epsilon^C \partial_C h^{AB} - \partial_C \epsilon^A h^{CB} - \partial_C\epsilon^B h^{AC}.
\end{aligned}
$$

## Classical solutions
Since the action has gauge freedom, we can fix the gauge by setting
$$
h_{AB} = \eta_{AB} = \begin{pmatrix}
    -1 & 0 \\ 0 & 1
\end{pmatrix},
$$
the action then becomes
$$ S = \frac{T}{2}\int \left(\dot X^2 - X'^2\right)\dd^2\sigma. $$
Since the coordinate $\sigma$ has finite range, the variation of the action would give a surface term
$$ \int \dd\tau \, \left.X'\cdot \delta X\right|_{\sigma = 0}^{\sigma = \pi}. $$ 
This term automatically vanishes in the closed string case, but for open string, we need to impose either the Neumann boundary condition
$$ X'^\mu(0) = X'^\mu(\pi) = 0, $$
or the Dirichlet boundary condition
$$ X^\mu(0) = \text{const}, \qquad X^\mu(\pi) = \text{const}. $$
For now, we'll only consider the Neumann boundary condition.

The equation of motion is then
$$ \left(\frac{\partial^2}{\partial \tau^2} - \frac{\partial^2}{\partial\sigma^2}\right) X^\mu = 0. $$
Introduce a new set of coordinate $\sigma^\pm = \tau \pm \sigma$, so that $\partial_\pm = (\partial_\tau \pm \partial_\sigma) / 2$, the above can be written as
$$ \partial_+ \partial_- X^\mu = 0, $$
so that the solution is
$$ X^\mu = X_R^\mu(\sigma^-) + X_L^\mu(\sigma^+). $$

But in addition to the equation of motion, we still need to impose the equation of $h_{AB}$:
$$ \vd{S}{h^{AB}} = 0, $$
which is equivalent to the vanishing of the energy-momentum tensor
$$ T_{AB} = -\frac{2}{T}\frac{1}{\sqrt{-h}}\vd{S}{h^{AB}}. $$
Using the fact that
$$ \frac{\partial h}{\partial h^{AB}} = -hh_{AB}, $$
the energy-momentum tensor is given by
$$ T_{AB} = \partial_A X^\mu \partial_B X_\mu - \frac12 h_{AB} h^{A'B'}\partial_{A'}X^\mu \partial_{B'}X_\mu. $$
Its components are
$$
\begin{aligned}
    T_{00} & = T_{11} = \frac12 \left(\dot X^2 + X'^2\right),\\
    T_{10} & = T_{01} = \dot X\cdot X'.
\end{aligned}
$$
we can express the components of $T_{AB}$ in coordinate $\sigma^\pm$ as
$$
\begin{aligned}
    T_{+-} & = T_{-+} = T_{11} - T_{00} = 0,\\
    T_{++} & = \frac14 \left(\dot X^\mu + X'^\mu\right)^2 = \left(\partial_+ X\right)^2,\\
    T_{--} & = \left(\partial_- X\right)^2.
\end{aligned}
$$
So the constraint from $h^{AB}$ becomes
$$ X_R'^2 = X_L'^2 = 0. $$

### Neother currents
It is easy to see that the string action has Poincaré invariance
$$ X^\mu \to X^\mu + F^\mu = X^\mu + \omega^\mu{}_\nu X^\nu + a^\mu, $$
so there are associated Neother currents, just like in field theory. Using similiar method, we can find the Neother currents associated with translation and rotation are
$$
\begin{aligned}
    P^\mu_A & = \vd{S}{(\partial^A X^\nu)} \pd{F^\nu}{a^\mu} = T\partial_A X^\mu,\\
    J^{\mu\nu}_A & = \vd{S}{(\partial^A X^\nu)} \pd{F^\nu}{\omega^{\mu\nu}} = T(X^\mu \partial_A X^\nu - X^\nu \partial_A X^\mu).
\end{aligned}
$$
They can be interpreted as momentum and angular momentum respectively.

### Regge trajectory
We now consider the solution of an open string rotating in the $Oxy$ plane:
$$
X^\mu = \left(R\tau, R \cos\sigma \cos\tau, R\cos\sigma \sin\tau, 0\right).
$$
It is easy to verify this solution satisfies the equation of motion and constraints. The total energy and angular momentum are given by
$$
\begin{aligned}
    E & = \int_0^\pi P^0_0 \, \dd\sigma = \pi RT,\\
    J & = \int_0^\pi J_0^{12} \, \dd\sigma = \frac{\pi}{2} R^2 T,
\end{aligned}
$$
we found that $E^2$ is proportional to $J$
$$ J = \frac{1}{2\pi T}E^2. $$
This relation is known as the **Regge trajectory**, $\alpha' = 1/2\pi T$ is the **Regge slope**.

### Mode expansion
For closed strings, since $\sigma$ is periodic in $[0, \pi]$, we can write the solution as
$$
\begin{aligned}
    X_R^\mu & = \frac12 x^\mu + \frac12 l^2 p^\mu \sigma^- + \frac{i}{2}l\sum_{n \neq 0} \frac1n \alpha_n^\mu e^{-2in\sigma^-},\\
    X_L^\mu & = \frac12 x^\mu + \frac12 l^2p^\mu\sigma^+ + \frac{i}{2}l\sum_{n \neq 0}\frac1n \tilde\alpha_n^\mu e^{-2in\sigma^+},
\end{aligned}
$$
where constant $l$ is given by
$$ l = \frac{1}{\sqrt{\pi T}}, $$
and $\alpha_n$ are Fourier coefficients, requiring $X_{L, R}$ to be real gives
$$
(\alpha_n^\mu)^\ast = \alpha_{-n}^\mu, \qquad
(\tilde\alpha_n^\mu)^\ast = \tilde\alpha_{-n}^\mu.
$$
Solution for open string can be obtained by rewriting the closed string solution for $\sigma \in [0, 2\pi]$, and setting
$$ X^\mu(\tau, \sigma) = X^\mu(\tau, -\sigma), \tag{*} $$
so that the Neumann boundary condition is automatically satisfied, and we also get
$$ \alpha_n^\mu = \tilde\alpha_n^\mu, $$
the open string solution is then
$$ X^\mu = x^\mu + l^2 p^\mu\tau + il\sum_{n \neq 0}\frac1n \alpha_n^\mu e^{-in\tau}\cos\sigma. $$

The constraint condition for closed string reads
$$
\begin{aligned}
    \partial_- X^\mu & = \frac12 l^2p^\mu + l\sum_{n \neq 0}\alpha_n^\mu e^{-in\sigma^-} = l\sum_{n} \alpha_n^\mu e^{-2in\sigma^-},\\
    \partial_+ X^\mu & = l\sum_{n} \tilde\alpha_n^\mu e^{-2in\sigma^+},
\end{aligned}
$$
where we have set $\alpha_0^\mu = \tilde\alpha_0^\mu = \frac12 l p^\mu$. Similiarly for open string
$$ \partial_\pm X^\mu = l\sum_n \alpha_n^\mu e^{-in\sigma^\pm}. $$

We can now express the constraints in terms of the Fourier components (evaluated at $\tau = 0$)
$$
\begin{aligned}
    L_m & = \frac{T}{2}\int_0^\pi (\partial_+ X)^2 e^{-2im\sigma}\dd\sigma = \frac12 \sum_n \alpha_{m - n} \cdot \alpha_n,\\
    \tilde L_m & = \frac{T}{2}\int_0^\pi (\partial_- X)^2 e^{-2im\sigma}\dd\sigma = \frac12 \sum_n \tilde\alpha_{m - n} \cdot \tilde\alpha_n,
\end{aligned}
$$
for closed string. For open string, since it's not periodic in $[0, \pi]$ but in $[0, 2\pi]$, we have
$$
L_m = T\int_{-\pi}^\pi (\partial_+ X)^2 e^{-im\sigma}\dd\sigma = \frac12 \sum_n \alpha_{m - n} \cdot \alpha_n.
$$

## Canonical quantization
We begin by imposing the canonical commutation relation
$$ [X^\mu(\tau, \sigma), P^\nu(\tau, \sigma')] = i\eta^{\mu\nu}\delta(\sigma - \sigma'), $$
where
$$ P_\mu = \vd{S}{\dot X^\mu} = T\dot X_\mu $$
is the canonical momentum. This commutator implies
$$
[x^\mu, p^\nu] = i\eta^{\mu\nu}, \quad
[\alpha_n^\mu, \alpha_m^\nu] = [\tilde\alpha_n^\mu, \tilde\alpha_m^\nu] = n\delta_{m + n}\eta^{\mu\nu},
$$
while all others vanish. The operator $a_n^\mu = \alpha_n^\mu / \sqrt{n}$ thus can be regarded as mode ladder operators. We may denote the vacuum state with momentum $k^\mu$ by $\ket{0, k^\mu}$, satisfies
$$ p^\mu\ket{0, p^\mu} = k^\mu\ket{0, p^\mu}, \quad \alpha_n^\mu \ket{0, k^\mu} = \alpha_n^\mu \ket{0, k^\mu} = 0 \quad (n \geqslant 1). $$
Excited states can be created by action the vacuum state by $\alpha_{-n}$ or $\tilde\alpha_{-n}$.

The Hamitonian is then given by
$$ 
\begin{aligned}
    H = P\cdot \dot X - L & = \frac{T}{2}\int_0^\pi (\dot X^2 + X'^2) \, \dd\sigma\\ 
    & = \frac12\sum_n(\alpha_{-n}\cdot \alpha_n + \tilde\alpha_{-n}\cdot \tilde\alpha_n)
\end{aligned}
$$
for closed string, and
$$
\begin{aligned}
    H & = \frac{T}{2}\int_0^\pi (\dot X^2 + X'^2)\dd\sigma = \frac{T}{4}\int_{-\pi}^\pi(\dot X^2 + X'^2)\dd\sigma\\
    & = \frac12 \sum_n \alpha_{-n}\cdot\alpha_n.
\end{aligned}
$$
for open string.

### Constraints and Virasoro algebra
Not all the states created by $\alpha_{-n}$ are physical, they must also satisfy constraints. If we directly regard the constraint $L_m = 0$ as an operator relation, this would be too restricted. So, like the weak Lorentz condition imposed in the quantization of Maxwell field, we impose the constraint by
$$ \braket{\psi'}{L_m}{\psi} = 0, $$
where $\ket\psi$ and $\ket{\psi'}$ are physical states, these's a similiar constraint about $\tilde L_n$ for closed strings. Since $L_m^\dagger = L_{-m}$, this condition is true if
$$ L_m \ket\psi = 0, \quad \text{for} \, m \geqslant 0. $$
But since $\alpha_n$ and $\alpha_{-n}$ do not commute, the expression for $L_m$ should be considered carefully. This commuting ambiguity only arises for $L_0$, so we *define* $L_0$ (similiarly for $\tilde L_0$) to be
$$ L_0 = \frac12 \alpha_0^2 + \sum_{n = 1}^\infty \alpha_{-n}\cdot \alpha_n, $$
and write the constraint for $L_0$ as $(L_0 - a)\ket\psi = 0$, where $a$ is an undetermined constant. Since $\alpha_0^\mu$ is proportional to the momentum operator, this constraint gives the mass-shell condition
$$
m^2 = -p^2 = \frac{4}{\alpha'}\left(\sum_{n = 1}^\infty \alpha_{-n}\cdot\alpha_n - a\right)
$$
for closed string, and
$$ m^2 = \frac{1}{\alpha'}\left(\sum_{n = 1}^\infty \alpha_{-n}\cdot\alpha_n - a\right) $$
for open string.

The commutator between $L_m$ generates an important algebra called the **Virasoro algebra**. 
$$
\begin{aligned}
    [L_m, L_n] & = \frac14 \sum_{k, k'}[\alpha_{m - k}\cdot\alpha_k, \alpha_{n - k'}\cdot\alpha_{k'}]\\
    & = 
    \frac14\sum_{k, k'}\left[
        k\alpha_{m - k}\cdot\alpha_{n - k'}\delta_{k + k'} + 
        k\alpha_{m - k}\cdot\alpha_{k'}\delta_{k + n - k'}\right.\\
        &\left. \qquad + 
        (m - k)\alpha_{n - k'}\cdot\alpha_k\delta_{m - k + k'} +
        (m - k)\alpha_{k'}\cdot\alpha_k\delta_{m + n - k - k'}
    \right].
\end{aligned}
$$
No commutation ambiguity arise if $m + n \neq 0$, so that
$$
\begin{aligned}
    [L_m, L_n] & = \frac12 \sum_k\left[k\alpha_{m - k}\cdot\alpha_{n + k} + (m - k)\alpha_{m + n - k}\cdot\alpha_k\right]\\
    & = (m - n)\sum_k \alpha_{m + n - k}\cdot\alpha_k\\
    & = (m - n)L_{m + n},
\end{aligned}
$$
this is the *Witt algebra*. The case $m + n = 0$ should be carried out more carefully. We first introduce a regulator for $L_m$:
$$ L_m = \sum_{k = -N}^N\alpha_{m - k}\cdot\alpha_k, $$
so that
$$
\begin{aligned}
    [L_n, L_{-n}] & = 
    \frac14 \sum_{k = -N}^N k\alpha_{n - k}\cdot\alpha_{k - n}
    + \frac14 \sum_{k = -N + n}^{N}k \alpha_{n - k}\cdot\alpha_{k - n}\\
    & \qquad + \frac14 \sum_{k = -N + n}^N (n - k)\alpha_{-k}\cdot\alpha_k + 
    \frac14 \sum_{k = -N}^N (n - k)\alpha_{-k}\cdot\alpha_k\\
    & = n\alpha_0^2 + 
    \frac12 \sum_{k = 1}^{N - n}(n + k)\alpha_{-k}\cdot\alpha_k + \frac12 \sum_{k = 1}^N(n - k)\alpha_{-k}\cdot\alpha_k\\
    & \qquad +
    \frac{D}4 \left(\sum_{k = 1}^{N + n} + \sum_{k = 1}^N\right) (n - k)k
    + \frac{D}4 \left(\sum_{k = 1}^{N - n} + \sum_{k = 1}^N\right)(n - k)k\\
    & = n\alpha_0^2 + 
    \frac12 \sum_{k = 1}^{N - n}(n + k)\alpha_{-k}\cdot\alpha_k + \frac12 \sum_{k = 1}^N(n - k)\alpha_{-k}\cdot\alpha_k\\
    & \qquad
    - \frac{D}4 n\sum_{k = 1}^N k + \frac{D}{12}n(n^2 - 1).
\end{aligned}
$$
When $N \to \infty$, the first line of the last step becomes $nL_0$, the divergent term is actually a result of normal ordering:
$$
\begin{aligned}
L_0 & = \frac12 \alpha_0^2 + \frac12\sum_{k = 1}^\infty(\alpha_{-k}\cdot\alpha_k + \alpha_k\cdot\alpha_{-k})\\
& = \frac12 \alpha_0^2 + \sum_{k = 2}^\infty \alpha_{-k}\cdot\alpha_k + \frac{D}2 \sum_{k = 1}^\infty k.
\end{aligned}
$$
So we get
$$ [L_n, L_{-n}] = 2nL_0 + \frac{D}{12}n(n^2 - 1). $$
The commutator $[L_m, L_n]$ thus can be summarized as
$$ [L_m, L_n] = (m - n)L_{m + n} + \frac{D}{12}m(m^2 - 1)\delta_{m, 0}. $$
This is the *Virasoro algebra*.

### Ghost elimination
Consider the first exited open string state $\ket{\psi_1} = \epsilon\cdot\alpha_{-n}\ket{0, k^\mu}$ where $\epsilon^\mu$ is the polarization vector. Its norm is then given by
$$ \braket{0, k^\mu}{(\epsilon^\ast\cdot\alpha_n)(\epsilon\cdot\alpha_{-n})}{0, k^\mu} = n \epsilon^\ast_\mu \epsilon^\mu, $$
which might be negative, since $\eta_{\mu\nu}$ is not positive definite. Negative norm states are called *ghost*, they're unfavourable in a sensible theory.

But under certain conditions, the constraints would exclude all the ghosts from the physical space. Consider $\ket{\psi_1}$ again, mass-shell condition gives $\alpha'k^2 = a - n$, while constraint of $L_m$ gives
$$ L_m \epsilon\cdot\alpha_{-n} \ket{0, k^\mu} = -n\epsilon\cdot\alpha_{m - n}\ket{0, k^\mu} = 0. $$
This implies $n \leqslant 1$ and $\epsilon\cdot k = 0$, leaves only $D - 1$ possible polarizations. We may let the $D - 2$ polarization vectors to be othogonal to the $k-t$ plane so they're all spacelike, giving a positive norm. While the last polarization is in the $k-t$ plane, $k^\mu$ must not be spacelike otherwise the polarization is timelike and has a negative norm. So for the theory to be ghost-free, $a$ must satisfies
$$ a \leqslant 1. $$
Under this condition, the ground state $\ket{0, k^\mu}$, whose mass-shell condition is $\alpha'k^2 = a$, becomes a tachyon state. 

We'll prove in later notes that the condition of no-ghost is $a < 1$ and $D < 26$ or $a = 1$ and $D = 26$.