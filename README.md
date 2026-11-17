# 🎓 Portal EducaSE | Plataforma Integrada DIES, Gestão Acadêmica e Diário Docente (SEDUC/SEED Sergipe)

Bem-vindo(a) ao repositório do **Portal EducaSE**! Esta aplicação foi construída com **React JS** moderno, utilizando a identidade visual e o padrão cromático oficial da **Secretaria de Estado da Educação e da Cultura de Sergipe — SEDUC/SEED** ([https://seduc.se.gov.br/](https://seduc.se.gov.br/)).

> 💡 **Guia para Estudantes do 2º Período:**
> Todo o projeto foi arquitetado de forma modular, limpa e amplamente comentada para facilitar a leitura, manutenção e evolução por alunos que estão aprendendo **React JS, Componentização, Hooks e Estado Global**.

---

## 🎨 Identidade Visual e UX (Portal Command-Center)

Esta versão adota uma interface **Command-Center Horizontal + Bento Cards**, estruturada com:
1. **Faixa Tricolor de Sergipe (`Verde #2AC034`, `Amarelo Ouro #FFB900`, `Azul #164194`)** no topo da página.
2. **Cabeçalho Unificado com Dock Segmentado de Perfis** para alternar em tempo real entre **ADM • DIES**, **ADM • Gestão Acadêmica** e **Diário do Professor**.
3. **Ribbon Horizontal de Sub-Navegação** que adapta os atalhos e indicadores conforme o perfil ativo.
4. **Modos de Visualização Interativos:**
   - **Quadro Kanban de 3 Colunas** vs **Lista Detalhada** na deliberação de aulas excepcionais.
   - **Chamada Rápida em Cartões (Fast-Tap Cards)** vs **Lista Compacta** no Diário Eletrônico do Professor.
   - **Galeria Bento de Escolas e Portarias** com formulários retráteis no módulo DIES.

---

## 👥 Perfis de Usuário e Módulos do Sistema

### 1. 🏛️ ADM — DIES (Diretoria de Inspeção Escolar)
* **Portarias e Credenciamento Escolar (`DiesDashboard.jsx`):** Publica portarias normativas DIES/SEDUC e credencia novas unidades escolares na rede estadual de Sergipe.
* **Catálogo de Cursos e Disciplinas (`CoursesManager.jsx`):** Cadastro e manutenção de cursos técnicos/médios e componentes curriculares (código, área da BNCC e carga horária semanal/anual).
* **Homologação de Matrizes Curriculares (`MatricesManager.jsx`):** Montagem de grades curriculares e autorização normativa pela DIES para liberar o uso pela Gestão Acadêmica.

### 2. 🏫 ADM — Gestão Acadêmica (Secretaria / Coordenação)
* **Implementação Escolar e Calendário (`SchoolImplementation.jsx`):** Recebe as definições autorizadas pela DIES, implementa as matrizes nas escolas e administra o Calendário Letivo (unidades bimestrais, sábados letivos e feriados sergipanos).
* **Turmas, Limite de Vagas e Horários (`ClassesManager.jsx`):** Criação de turmas com controle visual da capacidade máxima de vagas e montagem do quadro de horários semanal.
* **Orquestração de Carga Horária e Distribuição de Professores (`TeacherAllocation.jsx`):** Painel anti-ociosidade que monitora a carga contratada em regência de cada professor vs. horas alocadas, destacando docentes com horas ociosas.
* **Deliberação de Aulas Excepcionais (`ExceptionalClassesReview.jsx`):** Análise em lista ou **Quadro Kanban** dos pedidos de reposição/antecipação enviados pelos professores, com emissão de parecer e decisão de **Deferimento** ou **Indeferimento**.

### 3. 👨‍🏫 Professor (Diário Eletrônico)
* **Diário de Frequência e Tópicos Ministrados (`AttendanceDiary.jsx`):** Chamada ágil em **Modo Cartões** ou **Modo Tabela** (`P`, `F`, `FJ`), botão *"Todos Presentes"*, alerta de assiduidade mínima LDB (`75%`) e registro de conteúdo programático.
* **Pauta de Notas e Avaliações (`GradesEntry.jsx`):** Lançamento de notas por Unidade Letiva (`AV1`, `AV2`, `Qualitativa` e `Recuperação Paralela`) com cálculo instantâneo de média.
* **Requerimento de Aulas Excepcionais (`ExceptionalClassRequest.jsx`):** Solicitação de **Reposição de Aula** ou **Antecipação de Aula** com acompanhamento em tempo real do parecer da Gestão Acadêmica.

---

## 🚀 Como Executar o Projeto

Certifique-se de ter o **Node.js (v18+)** instalado.

```bash
# 1. Acesse a pasta do projeto
cd seed-sergipe-academico

# 2. Instale as dependências
npm install

# 3. Inicie o servidor de desenvolvimento
npm run dev
```

Acesse a URL exibida no terminal (por padrão `http://localhost:5173`).

---

## 📂 Arquitetura de Pastas

```text
seed-sergipe-academico/
├── index.html                  # Documento HTML principal
├── package.json                # Dependências e scripts npm
├── vite.config.js              # Configuração do Vite
└── src/
    ├── main.jsx                # Inicialização do React
    ├── App.jsx                 # Shell do Portal EducaSE (Header + Ribbon + Workspace + Footer)
    ├── styles/
    │   └── seduc-theme.css     # Design System SEDUC-SE (Variáveis CSS, Bento Grid, Kanban)
    ├── data/
    │   └── mockData.js         # Dados iniciais da Rede Estadual de Sergipe
    ├── context/
    │   └── AcademicContext.jsx # Estado global compartilhado (Context API + localStorage)
    ├── components/
    │   ├── common/             # StatCard.jsx e Toast.jsx
    │   └── layout/             # GovTopBar.jsx e Header.jsx (com Ribbon Horizontal)
    └── pages/
        ├── dies/               # Telas do perfil ADM - DIES
        ├── gestao/             # Telas do perfil ADM - Gestão Acadêmica
        └── professor/          # Telas do perfil Professor (Diário Eletrônico)
```

---

## 🎯 Desafios e Tarefas Propostas (Roteiro Prático para a Turma)

Abaixo estão **9 desafios exclusivos** organizados em três níveis de complexidade para você praticar manutenção e evolução de software com **React JS**:

### 🟢 Nível 1 — Iniciante (Praticando JSX, `Props`, `.filter()` e `useState`)
- [ ] **Desafio 1.1 — Filtro Rápido por Turno nas Turmas (`src/pages/gestao/ClassesManager.jsx`):**
  Crie uma barra de botões (`Todos`, `Integral`, `Matutino`, `Vespertino`, `Noturno`) acima da listagem de turmas ativas para filtrar os cartões pelo turno e exibir na tela o somatório total de vagas oferecidas naquele turno.
- [ ] **Desafio 1.2 — Alerta Pedagógico de Quórum Baixo na Chamada (`src/pages/professor/AttendanceDiary.jsx`):**
  Calcule em tempo real a porcentagem de alunos presentes no dia (`presentToday / classStudents.length`). Se a presença do dia cair abaixo de **70%**, exiba um banner amarelo de alerta sugerindo ao professor registrar uma atividade de revisão.
- [ ] **Desafio 1.3 — Ordenação de Disciplinas por Carga Horária (`src/pages/dies/CoursesManager.jsx`):**
  Adicione um botão na tabela de disciplinas que alterne a ordenação da lista entre **Maior Carga Horária (`↓`)** e **Menor Carga Horária (`↑`)** ou ordem alfabética (`A-Z`), utilizando uma cópia do array (`[...disciplines].sort(...)`).

### 🟡 Nível 2 — Intermediário (Regras de Negócio, Datas e Estado Derivado)
- [ ] **Desafio 2.1 — Validação Cronológica de Reposição vs. Antecipação (`src/pages/professor/ExceptionalClassRequest.jsx`):**
  No formulário de solicitação de aula excepcional, valide as datas antes de enviar:
  - Se o tipo selecionado for **Antecipação de Aula**, a `proposedDate` (Nova Data) deve ser obrigatoriamente **anterior** à `originalDate`.
  - Se for **Reposição de Aula**, a `proposedDate` deve ser **posterior** à `originalDate`.
  Exiba uma mensagem clara de erro caso a regra não seja cumprida!
- [ ] **Desafio 2.2 — Calculadora de "Nota Necessária na Recuperação" (`src/pages/professor/GradesEntry.jsx`):**
  Para estudantes cuja média parcial (`(AV1 + AV2 + QUAL) / 3`) esteja abaixo de `6.0` e que ainda não possuam nota lançada em `REC`, calcule e mostre em um badge ao lado do campo `REC` qual nota mínima o estudante precisa tirar na Recuperação Paralela para alcançar a média `6.0`.
- [ ] **Desafio 2.3 — Edição e Revogação de Portarias na DIES (`src/context/AcademicContext.jsx` e `src/pages/dies/DiesDashboard.jsx`):**
  Crie no `AcademicContext` uma função `toggleOrdinanceStatus(ordinanceId)` que alterne o status de uma portaria entre `'Vigente'` e `'Revogada'`, e adicione o botão correspondente em cada cartão de portaria na tela da DIES.

### 🔴 Nível 3 — Avançado (Automação, Novos Componentes e Analytics)
- [ ] **Desafio 3.1 — Botão de "Alocação Inteligente Automática" (`src/pages/gestao/TeacherAllocation.jsx`):**
  Crie um botão **"Preencher Sugestão Anti-Ociosidade"** no Orquestrador de Carga Horária que localize automaticamente o professor com maior saldo de horas ociosas (`idleHours > 0`) e pré-selecione no formulário uma disciplina compatível com a especialidade dele.
- [ ] **Desafio 3.2 — Painel de Raio-X de Assiduidade do Estudante (`src/pages/professor/AttendanceDiary.jsx`):**
  Ao clicar sobre o nome de um aluno na chamada, abra um cartão detalhado (ou Modal) informando: total de aulas ministradas, faltas acumuladas e **quantas faltas o aluno ainda pode ter** antes de atingir o limite máximo de 25% de ausências permitido pela LDB.
- [ ] **Desafio 3.3 — Nova Aba de Indicadores Gerais da Rede (`src/pages/gestao/NetworkOverview.jsx`):**
  Crie um novo componente e adicione-o no menu horizontal (`Header.jsx`) para exibir um painel gerencial contendo: taxa média de ocupação das vagas por escola, percentual de solicitações de aulas excepcionais deferidas e ranking de média geral por turma.

---

Desenvolvido para o ensino prático de Engenharia de Software e Desenvolvimento Web Front-End com React JS. 🇧🇷
