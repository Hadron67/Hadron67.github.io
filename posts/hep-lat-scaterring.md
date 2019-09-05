---
layout: post
date: 2019-9-2 16:46:57 +0800
title: 'Lattice simulation of Hadron Scattering in Non-rest Frame'
category: Note
tags:
- hep-lat
---

Hadron resonance scattering amplitudes can be calculated from the energy level of the system. Luscher introduced a method that relates the phase shift with the energy level of the scattering system in centre of mass (CM) frame, while Gotlieb generalized this method to non-rest frame, including the lab frame.

<!-- more -->

## Wavefunctions in CM and lab frame
Since the total momentum of a two-particle system is conserved even when the interaction is turned on, the wavefunction has the form
$$
\psi(x_1, x_2) = e^{-iP\cdot(x_1 + x_2) / 2} \phi(x_1 - x_2).
$$
In the CM and lab frame cases the system has vanishing and non-vanishing momenta, respectively, thus the wavefunctions have the forms
$$
    \begin{aligned}
        \psi_{\mathrm{CM}}(t, \vec x) & = e^{-iE_{\mathrm{CM}}t}\phi_{\mathrm{CM}}(\vec x),\\
        \psi_L(x, X) & = e^{-iP\cdot X}\phi_L(x)
    \end{aligned}
$$
where $X = (x_1 + x_2) / 2$, $t = X^0$, $x = x_1 - x_2$. Suppose the lab frame coordinate $x$ and CM frame coordinate $x^\ast$ are related by the transformation $x^\ast = \Lambda x$, where
$$
\begin{aligned}
    x^{\ast0} & = \gamma(x^0 + \vec v\cdot\vec x),\\
    \vec x^\ast & = \Lambda\vec x \equiv \vec x_\perp + \gamma(\vec x_\parallel + \vec v x^0),
\end{aligned}
$$
and using the transformation rule of wavefunctions
$$ \psi(x) = \psi'(x') = \psi'(\Lambda x), $$
the wavefunctions in the CM and lab frame can then be related as
$$ \phi_L(x) = \phi_{\mathrm{CM}}(\Lambda \vec x). $$
Since we are interested in the case where the time coordinates of the two particles are equal, so that we have
$$ \phi_L(x^0 = 0, \vec x) = \phi_{\mathrm{CM}}(\Lambda\vec x). $$

## d-periodicity
Assume the system is in a box of size $L^3$, the lab frame wavefunction must satifies the perioicity relation
$$ \psi_L(\vec x_1, \vec x_2) = \psi_L(\vec x_1 + \vec m L, \vec x_2 + \vec n L), \qquad \vec m, \vec n \in Z^3. $$
This implies that
$$
\begin{aligned}
    \vec P & = \frac{2\pi}{L} \vec d,\\
    \phi_L(\vec x) & = (-)^{\vec d\cdot\vec n} \phi_L(\vec x + \vec nL).
\end{aligned}
$$
So the CM frame wavefunction $\phi_{\mathrm{CM}}$ satisfies
$$ \phi_{\mathrm{CM}}(\vec x) = (-)^{\vec d\cdot\vec n}\phi_{\mathrm{CM}}(\vec x + \Lambda\vec n L). $$
Functions obeying this property is called *d-periodic* function. Our next task is to find solution of the Helmholtz equation
$$ (\nabla^2 + p^2)\phi_{\mathrm{CM}} = 0 $$
that satisfies this periodicity rule. This equation can be solved by defining the Green function
$$
G^{\vec d}(\vec x, p) = \frac{1}{\gamma L^3} \sum_{\vec n \in \Gamma_{\vec d}} \frac{e^{i\vec k\cdot\vec x}}{\vec k^2 - p^2},
$$
where the lattice $\Gamma_{\vec d}$ is
$$ \Gamma_{\vec d} = \left\{\vec k \in R^3 \middle| \vec k = \frac{2\pi}{L} \Lambda^{-1}(\vec n + \frac12\vec d), \vec n \in Z^3 \right\}. $$
It's obviously d-periodic, thus a solution of the Helmholtz equation. Generic solutions can be obtained by
$$
G^{\vec d}_{lm}(\vec x, p) = \mathcal{Y}_{lm}(\vec\nabla) G^{\vec d}(\vec x, p),
$$
where $\mathcal{Y}_{lm}(\vec x) = x^l Y_{lm}(\theta, \varphi)$. It can be expanded in terms of spherical harmonics as
$$
G^{\vec d}_{lm}(\vec x, p) = \frac{(-)^l p^{l + 1}}{4\pi}\left[
    n_l(px) Y_{lm}(\theta, \varphi) + \sum_{l' = 0}^\infty \sum_{m' = -l'}^l M^{\vec d}_{lm, l'm'}(p) j_{l'}(px) Y_{l'm'}(\theta, \varphi)
\right].
$$
Comparing with harmonic expansion
$$
\phi_{\mathrm{CM}}(\vec x) = \sum_{l = 0}^\infty \sum_{m = -l}^l c_{lm}
Y_{lm}(\theta, \varphi)\left[a_l(p) j_l(px) + b_l(p) n_l(px)\right],
$$
which gives the phase shift
$$
e^{2i\delta_l} = \frac{a_l + ib_l}{a_l - ib_l},
$$
the phase shift can be solved in terms of $M^{\vec d}_{lm, l'm'}$ as
$$ \det\left[e^{2i\delta_l}(M - i) - (M + i)\right] = 0. $$
The term $M^{\vec d}_{lm, l'm'}$ is given by
$$
M^{\vec d}_{lm, l'm'}(p) = \gamma^{-1} \frac{(-)^l}{\pi^{3/2}}
\sum_{j = |l - l'|}^{l + l'} \sum_{s = -j}^j \frac{i^j}{q^{j + 1}} Z^{\vec d}_{js}(1, \vec q) C_{lm, js, l'm'},
$$
where $q = pL / 2\pi$ and
$$
C_{lm, js, l'm'} = (-)^{m'}i^{l - j + l'} \sqrt{(2l + 1)(2j + 1)(2l' + 1)}\begin{pmatrix}
    l & j & l' \\
    m & s & -m'
\end{pmatrix} \begin{pmatrix}
    l & j & l'\\
    0 & 0 & 0
\end{pmatrix}.
$$
The $Z^{\vec d}_{lm}(s, q)$ is the generalized zeta function, given by
$$
Z^{\vec d}_{lm}(s, q) = \sum_{\vec n \in \Gamma_{\vec d}} \mathcal{Y}_{lm}(\vec n)(\vec n^2 - q^2)^s.
$$

## Symmetries
To compute the phase shift we need energy levels of states with given quantum numbers to get the CM frame momenta, and states with different quantum numbers should belong to representations of the lattice group.

If $\vec d \neq 0$ the lattice $\Gamma_{\vec d}$ no longer has the cubic symmetry $O_4$, but reduced to some subgroup of it. To compute the engergy levels we need to construct states that belongs to the representations of these groups. 

To construct the states, define Fourier transformations of the field
$$ \tilde\phi(t, \vec p) = \frac{1}{L^3}\sum_{\vec x}\phi(t, \vec x) e^{i\vec p\cdot\vec x}. $$
For $\vec d = 0$, the state operators with $l = 0$ can be constructed by
$$
O_{0, i}(t) = \frac{1}{N_i} \sum_{\vec n} \delta_{\vec n^2, i - 1} \tilde\phi(t, \vec n)\tilde\phi(t, -\vec n),
$$
they belong to the $A_1^+$ representation of the cubic group. States with higher $l$ can be constructed from successive representations:
$$
\begin{aligned}
    \Gamma^{(1)} & = A_2^- \oplus E^-\\
    \Gamma^{(2)} & = A_1^+ \oplus B_1^+ \oplus B_2^+ \oplus E^+\\
    \Gamma^{(3)} & = A_2^- \oplus B_1^- \oplus B_2^- \oplus 2E^-.
\end{aligned}
$$
While in $\vec d = (0, 0, 1)$ sector, the tetragonal group $D_{4h}$ should be considered. For $l = 0$, the representation is again $A_1^+$, and the operators
$$
\begin{aligned}
    O_{\vec d, 1} & = \tilde\phi(\vec d) \tilde\phi(0)\\
    O_{\vec d, 2} & = \frac14 \sum_{\vec n}\delta_{\vec d, \vec n}\delta_{\vec n^2, 1} \tilde\phi(\vec d + \vec n) \tilde\phi(-\vec n)\\
    O_{\vec d, 3} & = \tilde\phi(2\vec d) \tilde\phi(-\vec d)\\
    O_{\vec d, 4} & = \frac14 \sum_{\vec n}\delta_{\vec n, \vec d}\delta_{\vec n^2, 2} \tilde\phi(\vec n + \vec d) \tilde\phi(-\vec n).
\end{aligned}
$$
Next goal is to find the representation of the trigonal group $D_{3d}$, for the momentum $\vec d = (1, 1, 1)$.