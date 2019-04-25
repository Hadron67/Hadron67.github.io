---
layout: post
title: (In progress) Curvature 2-forms and tetrad method
date: 2019-3-31 16:28:12 +0800
category: Note
tags:
- General relativity
- Differential geometry
---
```mathjax-defs
\def\tensor#1{{\bf #1}}
```
In differential geometry, and especially in general relativity, the Riemann curvature tensor is an important object for the geometric property of a manifold, solving the Enstein's equation one always needs to calculate the curvature tensor. But the component expression of Riemann tensor is too complicated, making it painful to calculate it by hand, and less powerful when dealing with various problems. This is where curvature 1-form comes out.

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
    R^\rho{}_{\lambda\mu\nu} & = 2\partial_{[\mu}\Gamma^\rho_{\nu]\lambda} + \Gamma^\rho_{[\mu|\sigma}\Gamma^\sigma_{\nu]\lambda}.
\end{aligned}
$$
Since the second is more common, we will use it in the rest of this article.

### Connection 1-form
Instead of work in the coordinate tetrad, as one usually did in general relativity, we choose an othonormal tetrad $\{e_\mu\}$, in which case the connection is $\gamma^\mu_{\alpha\beta}$, satisfies
$$
\nabla_a e_\mu = \gamma^\nu_{a\mu} e_\nu = (\omega^\nu{}_\mu)_a e_\nu,
$$
where $\omega^\nu{}_\mu \equiv \gamma^\nu_{\rho\mu} e^\rho$ is **connection 1-form**. If $\{e_\mu\}$ is *rigid tetrad*, i.e., the metric's components $g_{\mu\nu} \equiv g(e_\mu, e_\nu)$ are all constant on this tetrad, then $\omega^\nu{}_\mu$ satisfies
$$
\begin{aligned}
    0 = \nabla_a g & = \nabla_a (g_{\mu\nu} e^\mu \otimes e^\nu)\\
    & = -g_{\mu\nu} \omega^\mu{}_\rho e^\rho \otimes e^\nu - g_{\mu\nu} \omega^\nu{}_\rho e^\mu \otimes e^\rho\\
    & = -(\omega_{\mu\rho} + \omega_{\rho\mu}) e^\rho \otimes e^\mu\\
    & \implies \omega_{\mu\nu} = -\omega_{\nu\mu}.
\end{aligned}
$$
