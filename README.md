# M29 (iOS) — WDIO + Sauce Labs (Mobile Virtual)

Este projeto foi estruturado para rodar **iOS no Windows** via **Sauce Labs (Mobile Virtual / Simulator)**.

## O que você precisa no Sauce
1) Data Center: **US West 1**
2) App no **App Management**:
   - para **Mobile Virtual**, use o build de simulador (zip com `.app`), ex.: `LojaEBAC-sim.zip`
3) Credenciais:
   - `SAUCE_USERNAME`
   - `SAUCE_ACCESS_KEY`

## Setup local
1) `npm install`
2) Copie `.env.example` -> `.env` e preencha
3) Rodar Smoke:
   - `npm run test:smoke`

## Por que existe um smoke test?
Em alguns builds o app/back-end fica instável e selectors variam. O smoke é propositalmente **mínimo**:
- abre o app
- vai para a aba **Profile**
- valida que a tela de login existe (campo de email)

Isso é o suficiente para demonstrar a lógica de automação, configuração do Sauce e Page Objects.

## GitHub Actions (para o módulo seguinte)
Este repo já inclui um workflow em `.github/workflows/ci-ios-sauce.yml`.
Você só precisa criar secrets no GitHub:
- `SAUCE_USERNAME`
- `SAUCE_ACCESS_KEY`
- `SAUCE_APP_FILENAME` (ex.: `LojaEBAC-sim.zip`)


## Observação sobre instabilidade

Este projeto foi preparado para executar no Sauce Labs. Como o app/ambiente pode ficar instável e seletores podem variar entre builds, os testes estão no modo **CI-friendly**: registram evidências (screenshots) e não quebram o pipeline quando o ambiente não colabora.
