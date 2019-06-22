---
layout: post
title: Curvature 2-forms and tetrad method
date: 2019-3-31 16:28:12 +0800
category: Note
tags:
- General relativity
- Differential geometry
---
$$ %hidden
\gdef\tensor#1{{\bf #1}}
\gdef\dd{\mathrm{d}}
$$
In differential geometry, and especially in general relativity, the Riemann curvature tensor is an important object for the geometric property of a manifold, solving the Enstein's equation one always needs to calculate the curvature tensor. But the component expression of Riemann tensor is too complicated, making it painful to calculate it by hand, and less powerful when dealing with various problems. Instead,  using curvature 2-form would somehow be better.

<!-- more -->

## Definitions
Among textbooks and lectures, there're two different yet equivalent definitions of Riemann curvature tensor:
$$
\begin{aligned}
2\nabla_{[a}\nabla_{b]}\omega_c & = R_{abc}{}^d \omega_d; \\
2\nabla_{[a}\nabla_{b]}v^c & = R^c{}_{dab} v^d.
\end{aligned}
$$
From which we can write their component expressions:
$$
\begin{aligned}
    R_{\mu\nu\lambda}{}^\rho & = -2\partial_{[\mu}\Gamma^\rho_{\nu]\lambda} + 2\Gamma^\sigma_{[\mu|\lambda}\Gamma^\rho_{\nu]\sigma};\\
    R^\rho{}_{\lambda\mu\nu} & = 2\partial_{[\mu}\Gamma^\rho_{\nu]\lambda} + 2\Gamma^\rho_{[\mu|\sigma|}\Gamma^\sigma_{\nu]\lambda}.
\end{aligned}
$$
Since the second is more common, we will use it in the rest of this article.

### Connection 1-form
Instead of work in the coordinate tetrad, as one usually did in general relativity, we choose an arbitary tetrad $\{e_\mu\}$, in which case the connection is $\gamma^\mu_{\alpha\beta}$, satisfies
$$
\nabla_\mu e_\nu = \gamma^\alpha_{\mu\nu}e_\alpha, \qquad
\nabla_\mu \sigma^\nu = -\gamma^\nu_{\mu\alpha}\sigma^\alpha.
$$
Where $\{\sigma^\mu\}$ is the dual basis. Define **connection 1-form** by
$$
\omega^\nu{}_\mu \equiv \gamma^\nu_{\rho\mu} \sigma^\rho,
$$
which can be regarded as an $N \times N$ matrix with 1-form entries.
If the connection is torsion-free, it then satisfies
$$
(\omega^\mu{}_\nu \wedge \sigma^\nu)_{ab} = 2\gamma^\mu_{\rho\nu} (\sigma^\rho)_{[a} (\sigma^\nu)_{b]} = -2\nabla_{[a} (\sigma^\mu)_{b]}
= -(\dd \sigma^\mu)_{ab}.
$$
This is the **Cartan's first structural equation**.
> The last step of above isn't true when the connection has a non-vanishing torsion, and will contribute an additional torsion term. We can derive it in the following way:
> $$
> \begin{aligned}
> \dd\sigma^\mu(e_\nu, e_\rho) &= e_\nu(\sigma^\mu(e_\rho)) - e_\rho(\sigma^\mu(e_\nu)) - \sigma^\mu([e_\nu, e_\rho])\\
> & = -\sigma^\mu(\nabla_{e_\nu}e_\rho - \nabla_{e_\rho}e_\nu - T(e_\nu, e_\rho))\\
> & = -(\gamma^\mu_{\nu\rho} - \gamma^\mu_{\rho\nu}) + T^\mu_{\nu\rho},
> \end{aligned}
> $$
> where we have used the definition of torsion tensor
> $$ T(X, Y) = \nabla_XY - \nabla_YX - [X, Y]. $$
> So $\dd\sigma^\mu$ can be written as
> $$
> \dd\sigma^\mu = -\omega^\mu{}_\nu\wedge\sigma^\nu + \Theta^\mu,
> $$
> where
> $$ \Theta^\mu = \frac12 T^\mu_{\nu\rho}\sigma^\nu\wedge\sigma^\rho $$
> is the torsion 2-from.

Written in matrix form, the above result is simply
$$ \dd\sigma = -\omega\wedge\sigma + \Theta, $$
where $\sigma$ and $\Theta$ are column vectors whose entries are $\{\sigma^\mu\}$ and $\{\Theta^\mu\}$.

It might be suprising at this point, since the exterier derivative has no dependency on the connection. In fact, the above result doesn't fully determine the connection 1-form, it's just a constraint on it, more equations are required if we wish to calculate the connection.

Now consider the Levi-Civita connection. If $\{e_\mu\}$ is *rigid tetrad*, i.e., the metric's components $g_{\mu\nu} \equiv g(e_\mu, e_\nu)$ are all constant on this tetrad, then $\omega^\nu{}_\mu$ satisfies
$$
\begin{aligned}
    0 = \nabla_a g & = \nabla_a (g_{\mu\nu} \sigma^\mu \otimes \sigma^\nu)\\
    & = -g_{\mu\nu} \omega^\mu{}_\rho \sigma^\rho \otimes \sigma^\nu - g_{\mu\nu} \omega^\nu{}_\rho \sigma^\mu \otimes \sigma^\rho\\
    & = -(\omega_{\mu\rho} + \omega_{\rho\mu}) \sigma^\rho \otimes \sigma^\mu\\
    & \implies \omega_{\mu\nu} = -\omega_{\nu\mu}.
\end{aligned}
$$
This property, together with the previous one, completely determines the connection 1-form. So if we choose the tetrad so that $g_{\mu\nu}$ is diagonal, then we have $g_{\bar\mu\bar\mu}\omega^\mu{}_\nu = -g_{\bar\nu\bar\nu}\omega^\nu{}_\mu$. In the Riemannian case (not pseudo-Riemannian), for instance, this means $\omega$ is antisymmetric. 

As an exmple, let us calculate the connection 1-form of $S^2$:
$$ \dd l^2 = R^2(\dd\theta^2 + \sin^2\theta\dd\varphi^2). $$
We first choose an othonormal basis
$$
\sigma = \begin{pmatrix}
    R\dd\theta \\ R\sin\theta\dd\varphi
\end{pmatrix}.
$$
So we have
$$
\dd\sigma = \begin{pmatrix}
    0 \\ R \cos\theta \dd\theta \wedge \dd\varphi
\end{pmatrix} = -\omega \wedge \begin{pmatrix}
    R\dd\theta \\ R\sin\theta\dd\varphi
\end{pmatrix},
$$
since $\omega$ is antisymmetric in this case, let 
$$
\omega = \begin{pmatrix}
    0 & A \\ -A & 0
\end{pmatrix},
$$
substitute into above, we have
$$
\begin{cases}
    -R\sin\theta A\wedge\dd\varphi = 0\\
    R A \wedge \dd\theta = R \cos\theta \dd\theta \wedge \dd\varphi
\end{cases}
$$
So that $A = -\cos\theta\dd\varphi$.

### Curvature 2-form
Curvature 2-form is defined by
$$ \Omega^\mu{}_\nu = \dd\omega^\mu{}_\nu + \omega^\mu{}_\rho \wedge \omega^\rho{}_\nu, $$
which can also be regarded as an $N\times N$ matrix. This relation is the **Cartan's second structural equation**. Direct calculation shows its relation with the Riemann curvature tensor:
$$
\begin{aligned}
    \Omega^\mu{}_\nu & = \partial_\alpha \gamma^\mu_{\beta\nu} \sigma^\alpha \wedge \sigma^\beta + \gamma^\mu_{\alpha\rho}\gamma^\rho_{\beta\nu}\sigma^\alpha \wedge \sigma^\beta\\
    & = \frac12\left(\partial_{[\alpha}\gamma^\mu_{\beta]\nu}
    + \gamma^\mu_{[\alpha|\rho|}\gamma^\rho_{\beta]\nu}\right)\sigma^\alpha\wedge\sigma^\beta\\
    & = \frac12 \widehat R^\mu{}_{\nu\alpha\beta}\sigma^\alpha\wedge\sigma^\beta,
\end{aligned}
$$
where $\widehat R^\mu{}_{\nu\alpha\beta}$ is the components of the Riemann curvature tensor in the tetrad $\{e_\mu\}$. It is easy to verify that $\Omega_{\mu\nu} \equiv g_{\mu\rho}\Omega^\rho{}_\nu$ is antisymmetric in rigid tetrad:
$$
\begin{aligned}
    \Omega_{\mu\nu} & = g_{\mu\rho}\Omega^\rho{}_\nu = \dd\omega_{\mu\nu} + \omega_{\mu\rho} \wedge \omega^\rho{}_\nu,\\
    \Omega_{\nu\mu} & = -\dd\omega_{\mu\nu} + \omega_{\nu\rho} \wedge \omega^\rho{}_\mu\\
    & = -\dd\omega_{\mu\nu} - \omega_{\mu\rho} \wedge \omega^\rho{}_\nu\\
    & = -\Omega_{\mu\nu}.
\end{aligned}
$$

Matrix form of the curvature 2-form is simply
$$ \Omega = \dd\omega + \omega \wedge \omega. $$
> This expression is very similiar to the field strength of Yang-Mills gauge theory
> $$ F = \dd A + A \wedge A. $$
> In fact, the gauge field $A$ is also a kind of connection, it's the connection on the **principal bundle**, and $F$ can also be regarded as curvature.

The Ricci tensor can also be calculated from the curvature 2-form. Since
$$
\Omega^\mu{}_\nu(e_\mu) = \frac12 R^\mu{}_{\nu\alpha\beta}(\delta^\alpha_\mu\sigma^\beta - \delta^\beta_\mu\sigma^\alpha)
= R_{\nu\alpha}\sigma^\alpha,
$$
thus
$$ \bar R = \Omega^\mu{}_\nu(e_\mu) \otimes \sigma^\nu = R_{\mu\nu}\sigma^\mu\otimes\sigma^\nu, $$
(we add a bar to distinguish it with the scalar curvature). In matrix form
$$ \bar R = i_e \Omega \otimes \sigma, $$
here $e$ should be a row vector, $i_e\Omega$ means $e$ also contracts with $\Omega$ when doing matrix multiplication.

Again, as an example, we calculate the curvature 2-form and Ricci tensor of $S^2$.
$$
\begin{aligned}
    e & = \left(\frac1R \partial_\theta \qquad \frac{1}{R\sin\theta}\partial_\varphi\right)\\
    \Omega & = \dd\omega + \omega \wedge \omega = \begin{pmatrix}
        0 & \sin\theta \dd\theta \wedge \dd\varphi\\
        -\sin\theta \dd\theta \wedge \dd\varphi & 0
    \end{pmatrix}\\
    \bar R & = \left( \frac1R\dd\theta \qquad \frac{\sin\theta}{R}\dd\varphi \right)\begin{pmatrix}
        R\dd\theta \\ R\sin\theta\dd\varphi
    \end{pmatrix}
    = \dd\theta^2 + \sin^2\theta\dd\varphi^2.
\end{aligned}
$$
Notice that $g = \bar RR$.

## Spherical decomposition
When calculating curvature tensors in spherical coordinate, sometimes we actually don't need to compute all the components of the Riemann curvature tensor. For example, when solving Einstein's equation in 4 dimensional spacetime, we see that the Ricci tensor components $R_{\theta\theta}$ and $R_{\varphi\varphi}$ gives the same equation. This indicates the spherical part of the coordinate can be treated as a whole. The tetrad method above gives a (maybe) useful trick to these problems.

We'll explain this method by an example. Consider $(n + 1)$-dimensional spherical symmetric static spacetime, metric in spherical coordinate has the form
$$ \dd s^2 = -e^{2A(r)}\dd t^2 + e^{2B(r)}\dd r^2 + r^2\dd\Omega^2, $$
where
$$ \dd\Omega^2 = \dd\theta^2 + \sin^2\theta\dd\varphi^2 $$
is the spherical part. In higher dimensions only the form of $\dd\Omega^2$ will be different. We may choose a **rigid** tetrad on the sphere, so that the spherical part of the metric can be written as
$$ \dd\Omega^2 = g_{ij}H^i H^j \equiv H' H, $$
where $H$ is a column vector with 1-form entries $H^i$, they can be regarded as the dual basis of the sphere, and $g_{ij}$ is the metric of unit sphere $S^{n - 1}$ in this tetrad. In the case above we have 
$$
H = \begin{pmatrix}
    \dd\theta \\ \sin\theta\dd\varphi
\end{pmatrix},
$$
and $H'$ is a row vector whose components are given by 
$$ H'_i = g_{ij}H^j. $$
Let $h_i$ be the dual of $H^i$, i.e. $H^i(h_j) = \delta^i_j$, we can write the othonormal basis as
$$
e = \left(e^{-A}\partial_t \quad e^{-B}\partial_r \quad \frac1r h\right), \qquad
\sigma = \begin{pmatrix}
    e^A \dd t \\ e^B \dd r \\ rH
\end{pmatrix}.
$$
The Cantan's first structural equation reads
$$
\dd\sigma = \begin{pmatrix}
    e^A A'\dd r\wedge\dd t\\
    0\\
    \dd r \wedge H + r\dd H
\end{pmatrix} = -\omega \wedge \begin{pmatrix}
    e^A \dd t \\ e^B \dd r \\ rH
\end{pmatrix},
$$
which solves to
$$
\omega = \begin{pmatrix}
    0 & e^{A - B}A'\dd t & 0\\
    e^{A - B}A'\dd t & 0 & -e^{-B}H'\\
    0 & e^{-B}H & M
\end{pmatrix},
$$
where $M$ satisfies 
$$ \dd H = -M \wedge H, $$
that is, it's the connection of $S^{n - 1}$. A similiar relation holds for $H'$
$$ \dd H'_i = -g_{ik} M^k{}_j \wedge H^j = g_{jk}M^k{}_i \wedge H^j = -H'_k \wedge M^k{}_i, $$
i.e.
$$ \dd H' = -H'\wedge M. $$ 
The two terms of $\Omega$ are
$$
\begin{aligned}
    \dd\omega & = \begin{pmatrix}
        0 & F \dd r\wedge \dd t & 0 \\
        F \dd r\wedge \dd t & 0 & e^{-B}B'\dd r\wedge H' - e^{-B}\dd H'\\
        0 & -e^{-B}B'\dd r\wedge H + e^{-B}\dd H & \dd M
    \end{pmatrix}\\
    \omega\wedge\omega & = \begin{pmatrix}
        0 & 0 & -G\dd t\wedge H'\\
        0 & 0 & -e^{-B}H'\wedge M\\
        -G\dd t\wedge H & e^{-B}M\wedge H & -e^{-2B}H\wedge H' + M\wedge M
    \end{pmatrix},
\end{aligned}
$$
where $F = (A'' + A'^2 - A'B')e^{A - B}$, $G = A'e^{A - 2B}$.

Summing these terms gives the curvature 3-form. But we still have an undetermined matrix $M$. To find an expression for $M$, consider the metric of Euclidean space $R^n$ in spherical coordinate
$$ \dd l^2 = \dd r^2 + r^2 H'H. $$
A similiar calculation gives the curvature 2-form
$$
\Omega_0 = \begin{pmatrix}
    0 & 0 \\
    0 & \dd M + M \wedge M - H \wedge H'
\end{pmatrix}.
$$
which should vanish since it's euclidean space, so we get
$$ \dd M + M \wedge M = H \wedge H'. $$
Now the curvature 2-form reads
$$
\Omega = \begin{pmatrix}
    0 & F\dd r\wedge\dd t & -G\dd t\wedge H'\\
    F\dd r\wedge \dd t & 0 & e^{-B}B'\dd r\wedge H'\\
    -G\dd t\wedge H & -e^{-B}B'\dd r\wedge H & (1 - e^{-2B})H\wedge H'
\end{pmatrix}.
$$
To calculate the Ricci tensor, note that
$$
\begin{aligned}
    i_hH & = H^i(h_i) = n - 1,\\
    [i_h(H\wedge H')]_j & = H^i(h_i)H'_j - H^iH'_j(h_i)\\
    & = (n - 1)H'_j - g_{ij}H^i\\
    & = (n - 2)H'_j.
\end{aligned}
$$
From which we can calculate the Ricci tensor
$$
\begin{aligned}
    \bar R & = \begin{pmatrix}
        \left[A'' + A'^2 - A'B' + (n - 1)\frac{A'}{r}\right]e^{A - 2B}\dd t\\
        \left[-A'' - A'^2 + A'B' + (n - 1)\frac{B'}{r}\right]e^{-B}\dd r\\
        \left[-A' + B' + (n - 2)\frac{e^{2B} - 1}{r}\right]H'e^{-2B}
    \end{pmatrix}^T \sigma\\
    & = \left[A'' + A'^2 - A'B' + (n - 1)\frac{A'}{r}\right]e^{2A - 2B}\dd t^2\\
    & \qquad + \left[-A'' - A'^2 + A'B' + (n - 1)\frac{B'}{r}\right]\dd r^2\\
    & \qquad + \left[n - 2 - e^{-2B}\left(n - 2 + (A' - B')r\right)\right]H'H.
\end{aligned}
$$
The vacuum Einstein's equation $\bar R = 0$ then reads
$$
\begin{cases}
    A'' + A'^2 - A'B' + (n - 1)\frac{A'}{r} = 0;\\
    -A'' - A'^2 + A'B' + (n - 1)\frac{B'}{r} = 0;\\
    n - 2 - e^{-2B}\left(n - 2 + (A' - B')r\right) = 0,
\end{cases}
$$
which solves to
$$
A = -B + c_1, \qquad 
e^{2B} = \frac{1}{1 + c_2 r^{2 - n}},
$$
where $c_1$ and $c_2$ are two constants. When $n = 3$, we get the well-known Schwartchild solution.

