# CondoManager

### **🏗️ Estrutura do Sistema:**

**1. Banco de Dados Completo:**
- Usuários com 3 níveis de acesso (Administrador, Síndico, Morador)
- Condomínios e unidades
- Espaços/amenidades (salões de festa, playground, área pet)
- Sistema de reservas
- Pagamentos com multas automáticas
- Chat entre usuários
- Solicitações de manutenção

**2. Sistema de Autenticação:**
- Login/cadastro seguro
- Onboarding personalizado por tipo de usuário
- Controle de acesso baseado em roles

**3. Dashboards Personalizados:**

**👨‍💼 ADMINISTRADOR:**
- Controle total de todos os condomínios
- Gestão de usuários (síndicos e moradores)
- Dashboard financeiro geral
- Chat central com todos os usuários
- Relatórios do sistema

**🏢 SÍNDICO:**
- Gestão do seu condomínio
- Cadastro e controle de moradores
- Gestão de unidades (proprietários, inquilinos, vagas)
- Controle de espaços e reservas
- Geração de boletos e controle de pagamentos
- Aplicação automática de multas por atraso
- Solicitações de manutenção
- Chat com moradores e administrador

**🏠 MORADOR:**
- Acesso apenas ao seu condomínio
- Reserva de espaços (salão de festas, etc.)
- Visualização e pagamento de boletos
- Histórico de pagamentos
- Chat com síndico e administrador
- Relatórios pessoais

### **🚀 Como Usar:**

1. **Primeiro Acesso:**
   - Acesse `/create-admin` para criar o primeiro administrador
   - Faça login com as credenciais criadas
   - **IMPORTANTE:** Delete a página `/create-admin` após criar o primeiro admin

2. **Fluxo de Cadastro:**
   - Administrador cria síndicos
   - Síndicos cadastram condomínios e moradores
   - Moradores fazem login e completam o perfil

3. **Funcionalidades Principais:**
   - **Pagamentos:** Sistema automático de multas por dia de atraso
   - **Reservas:** Aprovação de reservas pelo síndico
   - **Chat:** Comunicação entre todos os níveis
   - **Relatórios:** Financeiros e operacionais

### **💡 Recursos Implementados:**

✅ **Gestão de Condomínios** - Cadastro completo com síndicos
✅ **Gestão de Moradores** - Proprietários, inquilinos e unidades vagas  
✅ **Sistema de Pagamentos** - Com multas automáticas por atraso
✅ **Reserva de Espaços** - Salões, playground, área pet
✅ **Chat Integrado** - Comunicação entre todos os usuários
✅ **Dashboards Personalizados** - Por tipo de usuário
✅ **Controle de Acesso** - Baseado em roles
✅ **Relatórios** - Financeiros e operacionais
✅ **Manutenção** - Solicitações e controle
✅ **Interface Responsiva** - Funciona em desktop e mobile