# Checklist: Primeiro Deploy de Teste (FTP isolado)

Passos para validar o deploy automático das Landing Pages via GitHub Action.

## 1. Configurar secrets FTP no repositório

- [ ] Acessar Settings → Secrets and variables → Actions
- [ ] Criar/confirmar os três secrets (mesmos do site institucional):
  - `FTP_SERVER`: endereço do servidor (ex.: `ftp.seuhost.com`)
  - `FTP_USERNAME`: usuário FTP
  - `FTP_PASSWORD`: senha FTP

## 2. Configurar variáveis de ambiente de build (GitHub Secrets)

O CI faz checkout de um repositório limpo — o arquivo `.env` é ignorado pelo git e nunca chega ao build.
As variáveis precisam estar configuradas como **GitHub repository secrets** (Settings → Secrets and variables → Actions):

- [ ] `PUBLIC_WHATSAPP_NUMERO`: número de WhatsApp para contato (ex.: `5548999999999`)
- [ ] `PUBLIC_META_PIXEL_ID`: ID do Pixel Meta para rastreamento
- [ ] `PUBLIC_LEADS_ENDPOINT`: URL da intranet para receber leads (ex.: `https://intranet.ramonantonio.adv.br/api/public/leads`)

> **Desenvolvimento local:** use `.env.local` (ignorado pelo git) para rodar `npm run dev`.
> Em produção, apenas os secrets do GitHub alimentam o build.

## 3. Disparar o workflow manualmente

- [ ] Ir a Actions → "Deploy Landing Pages (FTP)"
- [ ] Clicar em "Run workflow" (workflow_dispatch)
- [ ] Aguardar conclusão (build + deploy FTP)
- [ ] Verificar no log que o `state-name` `.ftp-deploy-sync-state-landing.json` aparece

## 4. Verificar que as LPs abrem E o site institucional continua intacto

- [ ] Abrir `https://ramonantonio.adv.br/bpc-loas` e confirmar que carrega corretamente
- [ ] Acessar home do site institucional (`https://ramonantonio.adv.br/`) e verificar que está intacta
- [ ] Conferir blog (`https://ramonantonio.adv.br/blog`) — deve estar funcional

## 5. Testar o formulário gravando lead na intranet

- [ ] Preencher e submeter o formulário de contato na LP (ex.: BPC/Loas)
- [ ] Acessar a intranet-ramon e confirmar que o lead foi criado na base
- [ ] Verificar que campos (nome, telefone, WhatsApp, etc.) vieram corretos

## 6. Testar WhatsApp e eventos do Pixel (Meta Events Manager)

- [ ] Confirmar que a notificação de WhatsApp é enviada ao número configurado
  - [ ] Texto deve conter os dados do lead (nome, telefone, serviço)
- [ ] Acessar Meta Events Manager (Gerenciador de Eventos)
  - [ ] Verificar que o evento de `Lead` foi disparado corretamente
  - [ ] Confirmar que o Pixel rastreou o envio do formulário

---

## ✅ Conclusão

Se todos os passos acima passarem, o deploy isolado está **pronto para produção**.
O sistema está seguro de que:
- O FTP deploy **não apaga** os arquivos do site institucional
- As LPs chegam no docroot correto (`public_html/bpc-loas/`, etc.)
- Lead capture, WhatsApp e Pixel estão funcionais end-to-end
