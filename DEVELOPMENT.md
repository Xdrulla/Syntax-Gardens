# Syntax Gardens - Documentação de Desenvolvimento

## Visão Geral

Syntax Gardens é um jogo educacional de simulação de jardim onde conceitos de programação são representados como plantas que crescem através da prática de código real. O jogador planta sementes, rega as plantas resolvendo desafios de código, e colhe recompensas ao completar o ciclo de crescimento.

---

## Status Atual: MVP Funcional

### Data: Janeiro 2026
### Versão: 0.1.0 (Alpha)

---

## Arquitetura Implementada

### Stack Técnica

| Camada | Tecnologia | Versão |
|--------|------------|--------|
| Frontend | React | 18.x |
| Linguagem | TypeScript | 5.x |
| Bundler | Vite | 7.x |
| Estilização | Tailwind CSS | 4.x |
| Estado Global | Zustand | 5.x |
| Animações | Framer Motion | 12.x |
| Ícones | Lucide React | 0.56x |
| Validação | Zod | 4.x |
| Monorepo | pnpm + Turborepo | - |

### Estrutura de Pastas

```
syntax-gardens/
├── apps/
│   └── web/                          # Aplicação Frontend
│       ├── public/                   # Assets estáticos
│       └── src/
│           ├── components/
│           │   ├── game/             # Componentes do jogo
│           │   │   ├── Garden.tsx    # Grid principal do jardim
│           │   │   └── Plot.tsx      # Canteiro individual
│           │   ├── challenges/       # Sistema de desafios
│           │   │   ├── ChallengeModal.tsx
│           │   │   ├── CodeEditor.tsx
│           │   │   ├── TestResults.tsx
│           │   │   └── HintSystem.tsx
│           │   ├── ui/               # Componentes reutilizáveis
│           │   │   ├── Button.tsx
│           │   │   ├── Modal.tsx
│           │   │   └── ProgressBar.tsx
│           │   └── layout/           # Layout da aplicação
│           │       └── HUD.tsx
│           ├── features/
│           │   ├── inventory/        # Sistema de inventário
│           │   │   └── SeedBag.tsx
│           │   └── shop/             # Sistema de loja
│           │       ├── ShopModal.tsx
│           │       ├── ShopItem.tsx
│           │       └── index.ts
│           ├── stores/               # Estado global (Zustand)
│           │   ├── playerStore.ts    # Dados do jogador
│           │   ├── gardenStore.ts    # Estado do jardim
│           │   ├── inventoryStore.ts # Inventário
│           │   └── shopStore.ts      # Estado da loja
│           ├── data/                 # Dados estáticos do jogo
│           │   ├── plants/           # Definições de plantas
│           │   │   └── basic.ts
│           │   └── challenges/       # Desafios de código
│           │       ├── variables.ts
│           │       ├── functions.ts
│           │       ├── loops.ts
│           │       ├── objects.ts
│           │       ├── arrays.ts
│           │       ├── conditionals.ts    # Desafios de condicionais
│           │       ├── strings.ts         # Desafios de strings
│           │       ├── math.ts            # Desafios de matemática
│           │       ├── arrayMethods.ts    # Métodos avançados de array
│           │       ├── destructuring.ts   # Destructuring
│           │       ├── spreadRest.ts      # Spread/Rest operators
│           │       ├── arrowFunctions.ts  # Arrow functions avançadas
│           │       └── index.ts
│           ├── lib/
│           │   └── validators/       # Validação de código
│           │       └── codeValidator.ts
│           ├── types/                # Tipos TypeScript
│           │   ├── plant.ts
│           │   ├── challenge.ts
│           │   ├── player.ts
│           │   └── game.ts
│           ├── App.tsx
│           └── main.tsx
├── packages/
│   └── shared/                       # Código compartilhado (futuro)
├── turbo.json                        # Configuração Turborepo
├── pnpm-workspace.yaml               # Configuração monorepo
└── package.json
```

---

## Funcionalidades Implementadas

### 1. Sistema de Jardim

**Arquivo:** `src/components/game/Garden.tsx`

- Grid 3x3 de canteiros interativos
- Suporte para expansão futura do jardim
- Gerenciamento de seleção de canteiros
- Integração com sistema de plantio e colheita

**Arquivo:** `src/components/game/Plot.tsx`

- Representação visual de cada canteiro
- Estados visuais: vazio, semente, broto, crescendo, maduro
- Barra de progresso de crescimento
- Indicador de planta pronta para colheita
- Animações de interação (hover, click)

### 2. Sistema de Plantio

**Arquivo:** `src/stores/gardenStore.ts`

- Plantar sementes em canteiros vazios
- Consumir sementes do inventário ao plantar
- Rastrear estado de crescimento de cada planta
- Calcular estágio de crescimento baseado em regas

**Fluxo:**
1. Jogador seleciona uma semente no inventário
2. Clica em um canteiro vazio
3. Semente é consumida e planta aparece no canteiro

### 3. Sistema de Rega via Desafios

**Arquivo:** `src/components/challenges/ChallengeModal.tsx`

- Modal fullscreen para resolução de desafios
- Exibe instruções e descrição do desafio
- Integrado com editor de código
- Botões de testar e completar

**Arquivo:** `src/components/challenges/CodeEditor.tsx`

- Editor de código com numeração de linhas
- Suporte a indentação com Tab
- Syntax highlighting básico (fundo escuro)
- Responsivo e acessível

**Arquivo:** `src/components/challenges/TestResults.tsx`

- Exibe resultados dos testes
- Feedback visual de sucesso/falha
- Lista erros detalhados quando falha
- Animações de transição

**Arquivo:** `src/components/challenges/HintSystem.tsx`

- Sistema de dicas progressivas
- Revela uma dica por vez
- Interface expansível/colapsável
- Incentiva tentativa antes de ver dicas

### 4. Validador de Código

**Arquivo:** `src/lib/validators/codeValidator.ts`

- Sanitização de código (remove keywords perigosos)
- Execução em contexto isolado
- Timeout de 3 segundos para prevenir loops infinitos
- Comparação de outputs esperados vs recebidos
- Lista de keywords bloqueados:
  - eval, Function, import, require
  - process, global, window, document
  - localStorage, sessionStorage
  - fetch, XMLHttpRequest, Worker, WebSocket

### 5. Sistema de Progressão do Jogador

**Arquivo:** `src/stores/playerStore.ts`

- Nível e experiência (100 XP por nível)
- Sistema de moedas
- Contagem de dias e estações
- Estatísticas:
  - Total de plantas colhidas
  - Total de desafios completados
  - Tempo de jogo
  - Streak atual e melhor streak

### 6. Sistema de Inventário

**Arquivo:** `src/stores/inventoryStore.ts`

- Gerenciamento de itens (sementes, ferramentas, decorações)
- Adicionar e remover itens
- Verificar quantidade disponível
- Seleção de semente para plantio

**Arquivo:** `src/features/inventory/SeedBag.tsx`

- Interface visual do inventário de sementes
- Seleção de semente com feedback visual
- Exibe quantidade de cada tipo
- Instruções contextuais

### 7. HUD (Heads-Up Display)

**Arquivo:** `src/components/layout/HUD.tsx`

- Barra superior com informações do jogador
- Exibe: nível, XP, moedas, estação, dia
- Estatísticas rápidas (plantas colhidas, desafios)
- Botão de acesso à loja
- Design responsivo
- Animações em mudanças de valor

### 8. Sistema de Loja

**Arquivo:** `src/features/shop/ShopModal.tsx`

- Modal com grid de sementes disponíveis
- Exibe saldo atual do jogador
- Compra de sementes com moedas
- Sistema de desbloqueio por nível
- Feedback visual animado de compra
- Mostra quantidade de sementes já possuídas

**Arquivo:** `src/features/shop/ShopItem.tsx`

- Card individual para cada tipo de semente
- Indicador visual de tier (cores por nível)
- Informações: nome, descrição, preço, valor, XP
- Estado bloqueado com motivo do bloqueio
- Botão de compra com verificação de saldo

**Arquivo:** `src/stores/shopStore.ts`

- Controle de abertura/fechamento do modal
- Estado simples sem persistência

### 9. Persistência de Dados

- Todos os stores usam `zustand/middleware/persist`
- Dados salvos automaticamente no LocalStorage
- Chaves de storage:
  - `syntax-gardens-player`
  - `syntax-gardens-garden`
  - `syntax-gardens-inventory`

---

## Dados do Jogo

### Plantas Implementadas

| ID | Nome | Tipo | Tier | Regas | Valor | XP |
|----|------|------|------|-------|-------|-----|
| var-seedling | Muda de Variável | variable | 1 | 3 | 10 | 5 |
| func-flower | Flor de Função | function | 2 | 5 | 25 | 15 |
| loop-vine | Trepadeira de Loop | loop | 2 | 5 | 30 | 20 |
| object-tree | Árvore de Objeto | object | 3 | 7 | 50 | 35 |
| array-patch | Canteiro de Array | array | 3 | 7 | 55 | 40 |
| cond-cactus | Cacto Condicional | conditional | 1 | 4 | 15 | 8 |
| string-vine | Cipó de String | string | 1 | 4 | 15 | 8 |
| math-crystal | Cristal Numérico | math | 2 | 5 | 25 | 15 |
| data-garden | Jardim de Dados | array-methods | 3 | 6 | 45 | 30 |
| fragment-flower | Flor Fragmentada | destructuring | 2 | 5 | 30 | 20 |
| spread-seed | Semente Expansiva | spread-rest | 2 | 5 | 30 | 20 |
| arrow-rose | Rosa Aérea | arrow-functions | 2 | 5 | 30 | 20 |
| ancestor-tree | Árvore Ancestral | class | 4 | 8 | 70 | 50 |
| temporal-orchid | Orquídea Temporal | async | 4 | 8 | 75 | 55 |
| wrapping-vine | Videira Envolvente | closure | 3 | 7 | 60 | 45 |
| defensive-cactus | Cacto Defensivo | error-handling | 3 | 6 | 55 | 40 |
| primordial-root | Raiz Primordial | prototype | 5 | 10 | 100 | 75 |
| infinite-flower | Flor Infinita | generator | 5 | 10 | 100 | 75 |
| magic-mirror | Espelho Mágico | proxy | 5 | 10 | 100 | 75 |
| ephemeral-memory | Memória Efêmera | weak-collection | 4 | 8 | 80 | 60 |

### Desafios Implementados

**Variáveis (var-1, var-2, var-3):**

1. **Primeira Variável** - Declarar variável `water = 10`
2. **Calculando Crescimento** - Operações matemáticas
3. **Tipos de Dados** - String, boolean, number

**Funções (func-1 a func-5):**

1. **Primeira Função** - Criar função simples que retorna string
2. **Função com Parâmetro** - Função que recebe e usa parâmetro
3. **Calculando Água** - Função com múltiplos parâmetros
4. **Arrow Functions** - Sintaxe moderna de funções
5. **Função de Crescimento** - Função com valor padrão de parâmetro

**Loops (loop-1 a loop-5):**

1. **Primeiro Loop** - Loop for básico para somar números
2. **Loop While** - Loop while para drenar água
3. **Contando Plantas** - Loop para contar elementos em array
4. **For...of Loop** - Iteração moderna de arrays
5. **Loop Aninhado** - Loops dentro de loops

**Objetos (obj-1 a obj-5):**

1. **Primeiro Objeto** - Criar objeto com propriedades
2. **Acessando Propriedades** - Ler dados de objetos
3. **Modificando Objetos** - Alterar e adicionar propriedades
4. **Objetos Aninhados** - Objetos dentro de objetos
5. **Métodos de Objeto** - Funções como propriedades

**Arrays (arr-1 a arr-5):**

1. **Primeiro Array** - Criar array simples
2. **Acessando Elementos** - Acessar primeiro e último elemento
3. **Modificando Arrays** - push, shift e manipulação
4. **Método Map** - Transformar elementos do array
5. **Método Filter** - Filtrar elementos do array

**Conditionals (cond-1 a cond-15):**

1. **If Simples** - Verificar se água > 0
2. **If/Else** - Escolher entre regar ou não
3. **If/Else If/Else** - Classificar nível de água
4. **Operadores de Comparação** - ==, ===, !=, !==, <, >, <=, >=
5. **Operador AND (&&)** - Verificar múltiplas condições
6. **Operador OR (||)** - Verificar alternativas
7. **Operador NOT (!)** - Inverter condições
8. **Condições Aninhadas** - If dentro de if
9. **Operador Ternário** - Forma curta de if/else
10. **Ternário Aninhado** - Múltiplas condições em linha
11. **Switch/Case Básico** - Escolher estação
12. **Switch com Default** - Classificar tipo de planta
13. **Truthy/Falsy** - Valores que viram true/false
14. **Comparação com Null/Undefined** - Verificar valores nulos
15. **Sistema de Irrigação** - Desafio combinado

**Strings (str-1 a str-18):**

1. **Concatenação com +** - Juntar mensagens
2. **Template Literals Básico** - Interpolação de variáveis
3. **Template Literals Multi-linha** - Strings com quebras de linha
4. **Propriedade Length** - Contar caracteres
5. **toUpperCase/toLowerCase** - Converter case
6. **charAt e Acesso por Índice** - Acessar caracteres
7. **Método slice()** - Extrair substring
8. **substring e substr** - Outras formas de extrair
9. **Método split()** - Dividir string em array
10. **Método join()** - Juntar array em string
11. **Método includes()** - Verificar se contém
12. **indexOf/lastIndexOf** - Encontrar posição
13. **startsWith/endsWith** - Verificar início/fim
14. **Método replace()** - Substituir texto
15. **trim/trimStart/trimEnd** - Remover espaços
16. **Método repeat()** - Repetir string
17. **padStart/padEnd** - Adicionar padding
18. **Formatador de Nomes** - Desafio combinado

**Math e Numbers (math-1 a math-16):**

1. **Math.round()** - Arredondar para inteiro mais próximo
2. **Math.floor()** - Arredondar para baixo
3. **Math.ceil()** - Arredondar para cima
4. **Math.random()** - Gerar número aleatório 0-1
5. **Random Range** - Número aleatório em intervalo
6. **Math.max/min** - Maior e menor valor
7. **Math.abs()** - Valor absoluto
8. **Math.pow e **\*\*** - Potenciação
9. **Math.sqrt()** - Raiz quadrada
10. **parseInt()** - Converter string para int
11. **parseFloat()** - Converter string para float
12. **Number()** - Converter para número
13. **toFixed()** - Limitar casas decimais
14. **isNaN/isFinite** - Validar números
15. **Math.PI e Math.E** - Constantes matemáticas
16. **Calculadora de Crescimento** - Desafio combinado

**Array Methods Avançados (arr-adv-1 a arr-adv-23):**

1. **reduce() Básico** - Somar valores
2. **reduce() com Objeto** - Agrupar dados
3. **reduce() para Flatten** - Achatar array
4. **find()** - Encontrar primeiro elemento
5. **findIndex()** - Encontrar índice
6. **findLast/findLastIndex** - Buscar do fim
7. **some()** - Verificar se algum satisfaz
8. **every()** - Verificar se todos satisfazem
9. **sort() com Números** - Ordenar crescente/decrescente
10. **sort() com Strings** - Ordenar alfabeticamente
11. **sort() com Comparador** - Ordenar objetos
12. **reverse()** - Inverter array
13. **flat()** - Achatar array aninhado
14. **flatMap()** - map + flat
15. **includes()** - Verificar se contém
16. **indexOf/lastIndexOf** - Encontrar índice
17. **slice() vs splice()** - Extrair vs modificar
18. **concat()** - Juntar arrays
19. **Array.from()** - Criar de iterável
20. **Array.isArray()** - Verificar se é array
21. **Encadeamento filter+map+reduce**
22. **Encadeamento sort+slice** - Top N
23. **Análise Completa do Jardim** - Desafio combinado

**Destructuring (destr-1 a destr-15):**

1. **Destructuring de Array Básico** - [a, b] = arr
2. **Pular Elementos** - [a, , c] = arr
3. **Rest em Array** - [first, ...rest]
4. **Valores Padrão em Array** - [a = 1]
5. **Swap de Variáveis** - [a, b] = [b, a]
6. **Destructuring de Objeto** - {name, water}
7. **Renomear Propriedades** - {name: plantName}
8. **Valores Padrão em Objeto** - {a = 0}
9. **Destructuring Aninhado**
10. **Em Parâmetros de Função**
11. **Rest em Objeto** - {...rest}
12. **Em Loops** - for (const {name} of arr)
13. **De Arrays Retornados**
14. **De Objetos Retornados**
15. **Processamento Completo** - Desafio combinado

**Spread/Rest (spread-1 a spread-15):**

1. **Spread em Arrays** - [...arr1, ...arr2]
2. **Copiar Array** - [...original]
3. **Adicionar Elementos** - [...arr, item]
4. **Spread em Objetos** - {...obj1, ...obj2}
5. **Copiar Objeto** - {...original}
6. **Merge com Override**
7. **Adicionar Propriedades** - {...obj, prop}
8. **Rest Parameters** - (...args)
9. **Rest com Parâmetros Fixos**
10. **Spread em Chamada** - fn(...args)
11. **Spread com Math.max/min**
12. **Cópia Superficial de Array**
13. **Cópia Profunda com Spread**
14. **Remover Propriedade** - {remove, ...keep}
15. **Sistema de Merge** - Desafio combinado

**Arrow Functions Avançadas (arrow-1 a arrow-15):**

1. **Implicit Return** - x => x * 2
2. **Retornar Objeto** - x => ({})
3. **Sem Parâmetros** - () => value
4. **Um Parâmetro** - x => x + 1
5. **Múltiplos Parâmetros** - (a, b) => a + b
6. **Em map()** - arr.map(x => x * 2)
7. **Em filter()** - arr.filter(x => x > 0)
8. **Em reduce()**
9. **Em sort()**
10. **Como Callback**
11. **This em Arrow Functions**
12. **Quando NÃO Usar Arrow**
13. **Currying** - x => y => x + y
14. **Higher-Order Function**
15. **Pipeline de Transformações** - Desafio combinado

**Classes e OOP (class-1 a class-15):**

1. **Primeira Classe** - Declaração básica de classe
2. **Constructor** - Constructor com parâmetros
3. **Propriedades da Instância** - Definir propriedades padrão
4. **Métodos de Classe** - Funções dentro da classe
5. **Getter Methods** - Propriedades calculadas
6. **Setter Methods** - Validação ao atribuir
7. **Métodos Estáticos** - Métodos da classe
8. **Propriedades Estáticas** - Compartilhadas por instâncias
9. **Herança com Extends** - Classes baseadas em outras
10. **Super no Constructor** - Chamar constructor pai
11. **Override de Métodos** - Sobrescrever métodos
12. **Chamar Método do Pai** - super.method()
13. **Campos Privados** - #field
14. **Padrão Protected** - _field
15. **Hierarquia de Plantas** - Desafio combinado

**Async/Await (async-1 a async-15):**

1. **Primeira Promise** - new Promise básica
2. **Promise.resolve/reject** - Criar promises resolvidas
3. **Then e Catch** - Handlers de promise
4. **Encadear Then** - Múltiplos .then()
5. **Async Function** - Funções assíncronas
6. **Await Básico** - Esperar promises
7. **Try/Catch Async** - Tratamento de erros
8. **Finally Async** - Cleanup sempre executado
9. **Promise.all** - Esperar múltiplas
10. **Promise.race** - Primeira a completar
11. **Promise.allSettled** - Todas independente de erro
12. **Promise.any** - Primeira com sucesso
13. **Async em Loop** - for...of com await
14. **Paralelo vs Sequencial** - Diferentes padrões
15. **Sistema de Rega Async** - Desafio combinado

**Closures e Scope (closure-1 a closure-15):**

1. **Escopo de Bloco** - let/const
2. **Escopo de Função** - var
3. **Escopo Léxico** - Acesso a variáveis externas
4. **Closure Simples** - Função retorna função
5. **Variável Privada** - Encapsulamento
6. **Counter com Closure** - Estado interno
7. **Factory Function** - Criar objetos com closure
8. **Module Pattern** - IIFE + closure
9. **IIFE** - Função auto-executável
10. **Closure em Loops** - Problema clássico
11. **Closure em Callbacks** - Capturar dados
12. **Memoization** - Cache com closure
13. **Contador com Delay** - Estado assíncrono
14. **Closure vs This** - Diferenças de captura
15. **Sistema de Cache** - Desafio combinado

**Error Handling (error-1 a error-15):**

1. **Try/Catch Básico** - Capturar erros
2. **Finally Block** - Sempre executa
3. **Throw Error** - Lançar erros
4. **Mensagens de Erro** - e.message
5. **Propriedades do Error** - name e message
6. **Verificar Tipo de Erro** - instanceof
7. **Re-lançar Erros** - Processar e repassar
8. **Função Segura** - Validação com throw
9. **Classe de Erro Customizada** - extends Error
10. **Tipos de Erro Padrão** - TypeError, RangeError, etc.
11. **Validação de Input** - Múltiplas validações
12. **Função Wrapper Segura** - Higher-order safe
13. **Handler de Erros** - Centralizar tratamento
14. **Log de Erros** - Formatação
15. **Sistema Robusto de Rega** - Desafio combinado

**Prototypes (proto-1 a proto-13):**

1. **Entendendo __proto__** - Descobrir o prototype de um objeto
2. **Cadeia de Prototypes** - Herança via prototype chain
3. **Object.getPrototypeOf()** - Inspecionar prototypes
4. **Object.setPrototypeOf()** - Alterar prototype existente
5. **Constructor.prototype** - Propriedade prototype de construtores
6. **Métodos no Prototype** - Adicionar métodos compartilhados
7. **Object.create() Básico** - Criar objetos com prototype específico
8. **Object.create() com Propriedades** - Property descriptors
9. **Herança Prototípica Manual** - Herança entre construtores
10. **hasOwnProperty vs in** - Propriedades próprias vs herdadas
11. **Object.keys vs for...in** - Iteração de propriedades
12. **Prototype Pollution** - Entender o problema de segurança
13. **Sistema de Herança de Plantas** - Desafio combinado

**Generators e Iterators (gen-1 a gen-13):**

1. **Primeira Generator Function** - function* syntax
2. **Usando yield** - Pausar execução
3. **Método next()** - Consumir valores
4. **Generator Finito** - Produzir quantidade limitada
5. **Generator Infinito** - Lazy evaluation infinita
6. **yield* Delegação** - Delegar para outro generator
7. **Comunicação Bidirecional** - Passar valores via next()
8. **Método return()** - Finalizar prematuramente
9. **Método throw()** - Lançar exceções
10. **Iterator Protocol** - Symbol.iterator
11. **Iterador Customizado** - Classe com iterador
12. **Generator Fibonacci** - Sequência infinita
13. **Sequência de Crescimento** - Desafio combinado

**Proxies e Reflect (proxy-1 a proxy-14):**

1. **Primeiro Proxy** - new Proxy() básico
2. **Get Trap** - Interceptar leituras
3. **Set Trap** - Interceptar escritas
4. **Has Trap** - Interceptar operador 'in'
5. **DeleteProperty Trap** - Interceptar delete
6. **Apply Trap** - Interceptar chamadas de função
7. **Construct Trap** - Interceptar new
8. **Reflect API Básico** - Operações com Reflect
9. **Reflect.get e Reflect.set** - Usar Reflect em traps
10. **Reflect.has e deleteProperty** - Verificação e deleção
11. **Reflect.apply** - Chamar funções com contexto
12. **Proxy para Validação** - Sistema de validação
13. **Proxy para Logging** - Logging automático
14. **Sistema Observável de Plantas** - Desafio combinado

**WeakMap/WeakSet (weak-1 a weak-11):**

1. **Map vs WeakMap** - Diferenças básicas
2. **Criando WeakMap** - Inicialização
3. **Métodos do WeakMap** - set/get/has/delete
4. **Garbage Collection** - Referências fracas
5. **Dados Privados com WeakMap** - Encapsulamento
6. **Cache com WeakMap** - Cache sem memory leaks
7. **Set vs WeakSet** - Diferenças básicas
8. **Criando WeakSet** - Inicialização
9. **Métodos do WeakSet** - add/has/delete
10. **Rastreamento com WeakSet** - Marcar objetos processados
11. **Sistema de Referências Fracas** - Desafio combinado

---

## Componentes UI Reutilizáveis

### Button
- Variantes: primary, secondary, success, danger
- Tamanhos: sm, md, lg
- Estado de loading
- Animações com Framer Motion

### Modal
- Tamanhos: sm, md, lg, xl
- Overlay com blur
- Animação de entrada/saída
- Botão de fechar

### ProgressBar
- Cores: green, blue, yellow, red
- Tamanhos: sm, md, lg
- Label opcional
- Animação de preenchimento

---

## Como Executar

```bash
# Instalar dependências
cd syntax-gardens
pnpm install

# Rodar em desenvolvimento
pnpm dev

# Build para produção
pnpm build

# Type-check
pnpm exec tsc --noEmit
```

**URL de desenvolvimento:** http://localhost:5173

---

## Próximos Passos de Desenvolvimento

### Fase 1.5: Sistema de Progressão Inteligente (Prioridade URGENTE)

**Objetivo**: Corrigir a seleção aleatória de desafios e implementar sistema de introdução de conceitos para garantir progressão educacional adequada.

> **⚠️ CRÍTICO**: Atualmente o sistema seleciona desafios **aleatoriamente** do pool da planta, fazendo um iniciante pular de um desafio básico para um avançado. Isso quebra completamente a experiência educacional. Esta fase deve ser implementada ANTES de qualquer outra expansão.

#### 1.5.1 Problema Identificado

**Código problemático em `Garden.tsx:70-73`:**
```typescript
// PROBLEMA: Seleção completamente aleatória
const randomIndex = Math.floor(Math.random() * challenges.length);
const challengeId = challenges[randomIndex];
```

**Impacto:**
- Usuário pode receber `cond-15` (Sistema de Irrigação Inteligente - Master) antes de `cond-1` (If Simples - Beginner)
- Não há garantia de progressão educacional
- Frustra iniciantes que não aprenderam os conceitos básicos

#### 1.5.2 Sistema de Progressão Sequencial

- [x] **Refatorar seleção de desafios para ser progressiva** ✅ IMPLEMENTADO
  - [x] Criar novo store `challengeProgressionStore.ts`
  - [x] Rastrear último desafio completado por planta/conceito
  - [x] Desafios devem seguir ordem: Beginner → Practitioner → Master
  - [x] Permitir repetir desafios já completados (revisão)
  - [x] Só desbloquear próximo nível após completar anterior

- [x] **Lógica de seleção inteligente** ✅ IMPLEMENTADO
  - Arquivo: `src/stores/challengeProgressionStore.ts`
  - Função `getNextChallenge(plantType)` retorna o próximo desafio na sequência
  - Ordena desafios por dificuldade (difficulty: 1-5)
  - Se todos completados, retorna aleatório para revisão
  - Integrado com `Garden.tsx` para seleção de desafios

- [x] **Indicador visual de progresso na planta** ✅ IMPLEMENTADO
  - [x] Mostrar "Desafio 3/15" no modal de desafio (`ChallengeModal.tsx`)
  - [x] Indicador X/Y no canteiro (`Plot.tsx`)
  - [x] Badge de tier atual (Iniciante/Praticante/Mestre) no modal
  - [x] Indicador de "Revisão" quando desafio já foi completado

#### 1.5.3 Sistema de Introdução de Conceitos (Concept Tutorials) ✅ IMPLEMENTADO

- [x] **Criar estrutura de tutoriais por conceito** ✅ IMPLEMENTADO
  - Arquivo: `src/data/tutorials/index.ts`
  - Cada conceito tem um mini-tutorial antes do primeiro desafio
  - Conteúdo: explicação + exemplo + analogia com jardim + pontos-chave

- [x] **Estrutura do tutorial** ✅ IMPLEMENTADO
  ```typescript
  interface ConceptTutorial {
    conceptId: string;
    title: string;
    introduction: string;        // Explicação simples (2-3 parágrafos)
    analogy: string;             // Analogia com jardinagem
    codeExample: string;         // Código demonstrativo
    codeExplanation: string;     // Explicação do código
    keyPoints: string[];         // Pontos-chave para memorizar
    icon: string;                // Emoji para representar visualmente
  }
  ```

- [x] **Tutoriais implementados para todos os conceitos** ✅ IMPLEMENTADO
  - `variable`: O que são variáveis (caixas que guardam valores)
  - `conditional`: Tomando decisões no código (se/senão)
  - `string`: Trabalhando com textos
  - `function`: Criando blocos reutilizáveis
  - `loop`: Repetindo ações automaticamente
  - `array`: Listas de valores
  - `object`: Agrupando dados relacionados
  - `math`: Cálculos e números
  - `array-methods`: Métodos avançados de array
  - `destructuring`: Extraindo valores
  - `spread-rest`: Expandindo e coletando
  - `arrow-functions`: Sintaxe moderna
  - `class`: Programação orientada a objetos
  - `async`: Código assíncrono
  - `closure`: Funções que lembram
  - `error-handling`: Tratamento de erros
  - `prototype`: A base do JavaScript
  - `generator`: Produção sob demanda
  - `proxy`: Metaprogramação
  - `weak-collection`: Referências fracas

- [x] **Componente TutorialModal** ✅ IMPLEMENTADO
  - Arquivo: `src/components/tutorials/TutorialModal.tsx`
  - Aparece automaticamente antes do primeiro desafio de um conceito
  - Navegação em 4 etapas: Introdução → Analogia → Código → Pontos-chave
  - Barra de progresso visual com navegação por clique
  - Opção "Não mostrar tutoriais" para usuários avançados
  - Botão "Iniciar Desafio" ao final
  - Animações suaves com Framer Motion

- [x] **Integração com fluxo de jogo** ✅ IMPLEMENTADO
  - Arquivo modificado: `src/components/game/Garden.tsx`
  - Antes de `setActiveChallenge()`, verifica se tutorial foi visto
  - Se não visto: mostra TutorialModal primeiro
  - Se já visto: vai direto para o desafio
  - Store: `src/stores/tutorialStore.ts` com `hasSeenTutorial(conceptId)`
  - Persistência no localStorage: `syntax-gardens-tutorials`

#### 1.5.4 Melhorias no Sistema de Dificuldade

- [ ] **Padronizar dificuldade em todos os desafios**
  - Revisar todos arquivos em `src/data/challenges/`
  - Garantir que `difficulty: 1-5` corresponde ao tier
  - Adicionar `difficultyTier: 'beginner' | 'practitioner' | 'master'` explicitamente

- [ ] **Distribuição de dificuldade por conceito**
  ```
  Beginner (30%):     difficulty 1-2, desafios introdutórios
  Practitioner (50%): difficulty 3-4, aplicação prática
  Master (20%):       difficulty 5, desafios combinados/complexos
  ```

- [ ] **Indicador visual de dificuldade no modal de desafio**
  - Mostrar tier atual com ícone (Semente/Broto/Flor)
  - Mostrar posição no conceito (ex: "Beginner 2/5")
  - Cor do border do modal baseado na dificuldade

#### 1.5.5 Sistema de "Primeiro Contato" (First-Time Experience)

- [ ] **Onboarding inicial do jogo**
  - Tela de boas-vindas explicando a metáfora jardim = código
  - "Cada planta representa um conceito de programação"
  - "Regar = resolver desafios de código"
  - "Colher = dominar o conceito"
  - Duração: ~2 minutos, pode pular

- [ ] **Primeiro plantio guiado**
  - Forçar primeira planta ser `var-seedling` (variáveis)
  - Highlight no canteiro central
  - Tooltip explicando cada passo
  - Celebração ao completar primeiro desafio

- [ ] **Tooltips de primeira vez**
  - Primeira vez vendo a loja: explicar moedas/preços
  - Primeira vez vendo inventário: explicar sementes
  - Primeira vez vendo HUD: explicar XP/nível
  - Persistir tooltips vistos no localStorage

#### 1.5.6 Refatoração do Garden.tsx

- [x] **Substituir seleção aleatória** ✅ IMPLEMENTADO
  - Arquivo modificado: `src/components/game/Garden.tsx`
  - Usa `useChallengeProgressionStore().getNextChallenge()` para seleção progressiva

- [x] **Adicionar verificação de tutorial** ✅ IMPLEMENTADO
  - Verifica `isFirstOfConcept` do próximo desafio
  - Se primeiro e tutorial não visto: mostra TutorialModal
  - Após tutorial: abre o desafio automaticamente
  - Integrado com `useTutorialStore`

#### 1.5.7 Arquivos a Criar/Modificar

**Novos arquivos:**
- [x] `src/stores/challengeProgressionStore.ts` - Lógica de progressão ✅ CRIADO
- [x] `src/stores/tutorialStore.ts` - Controle de tutoriais vistos ✅ CRIADO
- [x] `src/data/tutorials/index.ts` - Definições de tutoriais ✅ CRIADO
- [x] `src/data/tutorials/variable.ts` - Tutorial de variáveis ✅ CRIADO
- [x] `src/data/tutorials/conditional.ts` - Tutorial de condicionais ✅ CRIADO
- [x] `src/data/tutorials/string.ts` - Tutorial de strings ✅ CRIADO
- [x] `src/data/tutorials/function.ts` - Tutorial de funções ✅ CRIADO
- [x] `src/data/tutorials/loop.ts` - Tutorial de loops ✅ CRIADO
- [x] `src/data/tutorials/array.ts` - Tutorial de arrays ✅ CRIADO
- [x] `src/data/tutorials/object.ts` - Tutorial de objetos ✅ CRIADO
- [x] `src/data/tutorials/math.ts` - Tutorial de math ✅ CRIADO
- [x] `src/data/tutorials/arrayMethods.ts` - Tutorial de métodos avançados ✅ CRIADO
- [x] `src/data/tutorials/destructuring.ts` - Tutorial de destructuring ✅ CRIADO
- [x] `src/data/tutorials/spreadRest.ts` - Tutorial de spread/rest ✅ CRIADO
- [x] `src/data/tutorials/arrowFunctions.ts` - Tutorial de arrow functions ✅ CRIADO
- [x] `src/data/tutorials/class.ts` - Tutorial de classes ✅ CRIADO
- [x] `src/data/tutorials/async.ts` - Tutorial de async/await ✅ CRIADO
- [x] `src/data/tutorials/closure.ts` - Tutorial de closures ✅ CRIADO
- [x] `src/data/tutorials/errorHandling.ts` - Tutorial de error handling ✅ CRIADO
- [x] `src/data/tutorials/prototype.ts` - Tutorial de prototypes ✅ CRIADO
- [x] `src/data/tutorials/generator.ts` - Tutorial de generators ✅ CRIADO
- [x] `src/data/tutorials/proxy.ts` - Tutorial de proxy ✅ CRIADO
- [x] `src/data/tutorials/weakCollection.ts` - Tutorial de WeakMap/WeakSet ✅ CRIADO
- [x] `src/components/tutorials/TutorialModal.tsx` - Modal de tutorial ✅ CRIADO
- [x] `src/components/tutorials/index.ts` - Export do componente ✅ CRIADO
- [ ] `src/components/onboarding/WelcomeScreen.tsx` - Tela inicial (pendente 1.5.5)
- [ ] `src/components/onboarding/FirstPlantGuide.tsx` - Guia do primeiro plantio (pendente 1.5.5)

**Arquivos modificados:**
- [x] `src/components/game/Garden.tsx` - Refatorar handleWaterPlant ✅ MODIFICADO
- [x] `src/components/game/Plot.tsx` - Adicionar indicador de progresso ✅ MODIFICADO
- [x] `src/components/challenges/ChallengeModal.tsx` - Mostrar tier/posição ✅ MODIFICADO
- [x] `src/stores/index.ts` - Exportar novo store ✅ MODIFICADO
- [ ] `src/data/challenges/*.ts` - Padronizar dificuldades (parcialmente feito)

#### 1.5.8 Critérios de Conclusão

- [x] Desafios seguem ordem progressiva (não mais aleatório) ✅ IMPLEMENTADO
- [x] Tutorial aparece antes do primeiro desafio de cada conceito ✅ IMPLEMENTADO
- [x] Usuário pode ver visualmente seu progresso em cada conceito ✅ IMPLEMENTADO
- [ ] Onboarding guia novos jogadores nos primeiros passos (pendente 1.5.5)
- [ ] Sistema testado com usuário que "não sabe nada de programação"

---

### Fase 2: Expansão de Conteúdo Core (Prioridade CRÍTICA)

**Objetivo**: Cobrir todos os conceitos fundamentais de JavaScript de forma progressiva e completa.

> **⚠️ IMPORTANTE**: Esta é a fase mais crítica do projeto. Sem conteúdo educacional robusto, o jogo não cumpre sua função principal. Todas as outras fases dependem de ter um catálogo completo de conceitos e desafios.

#### 2.1 Conceitos Básicos - Tier 1-5 (Nível 1-5)

**Conditionals (if/else) - Cacto Condicional** ✅ IMPLEMENTADO
- [x] Criar planta "Cacto Condicional" (tier 1, 4 regas)
- [x] Desafio 1: if simples - verificar se água > 0
- [x] Desafio 2: if/else - escolher entre regar ou não
- [x] Desafio 3: if/else if/else - classificar nível de água (baixo/médio/alto)
- [x] Desafio 4: Operadores de comparação (==, ===, !=, !==, <, >, <=, >=)
- [x] Desafio 5: Operadores lógicos AND (&&) - verificar múltiplas condições
- [x] Desafio 6: Operadores lógicos OR (||) - verificar alternativas
- [x] Desafio 7: Operador NOT (!) - inverter condições
- [x] Desafio 8: Condições aninhadas - if dentro de if
- [x] Desafio 9: Ternário simples - condição ? verdadeiro : falso
- [x] Desafio 10: Ternário aninhado - múltiplas condições
- [x] Desafio 11: Switch/case básico - escolher estação
- [x] Desafio 12: Switch com default - classificar tipo de planta
- [x] Desafio 13: Truthy/Falsy - valores que viram true/false
- [x] Desafio 14: Comparação com null e undefined
- [x] Desafio 15: Desafio combinado - sistema de irrigação inteligente

**Strings - Cipó de String** ✅ IMPLEMENTADO
- [x] Criar planta "Cipó de String" (tier 1, 4 regas)
- [x] Desafio 1: Concatenação com + - juntar mensagens
- [x] Desafio 2: Template literals básico - `Olá ${nome}`
- [x] Desafio 3: Template literals multi-linha
- [x] Desafio 4: length - contar caracteres
- [x] Desafio 5: toUpperCase() e toLowerCase() - converter case
- [x] Desafio 6: charAt() e charCodeAt() - acessar caractere
- [x] Desafio 7: slice() - extrair substring
- [x] Desafio 8: substring() e substr() - outras formas de extrair
- [x] Desafio 9: split() - dividir string em array
- [x] Desafio 10: join() - juntar array em string
- [x] Desafio 11: includes() - verificar se contém substring
- [x] Desafio 12: indexOf() e lastIndexOf() - encontrar posição
- [x] Desafio 13: startsWith() e endsWith() - verificar início/fim
- [x] Desafio 14: replace() - substituir texto
- [x] Desafio 15: trim(), trimStart(), trimEnd() - remover espaços
- [x] Desafio 16: repeat() - repetir string
- [x] Desafio 17: padStart() e padEnd() - adicionar padding
- [x] Desafio 18: Desafio combinado - formatador de nomes de plantas

**Math e Numbers - Cristal Numérico** ✅ IMPLEMENTADO
- [x] Criar planta "Cristal Numérico" (tier 2, 5 regas)
- [x] Desafio 1: Math.round() - arredondar para inteiro mais próximo
- [x] Desafio 2: Math.floor() - arredondar para baixo
- [x] Desafio 3: Math.ceil() - arredondar para cima
- [x] Desafio 4: Math.random() - gerar número aleatório 0-1
- [x] Desafio 5: Random range - número aleatório em intervalo
- [x] Desafio 6: Math.max() e Math.min() - maior e menor
- [x] Desafio 7: Math.abs() - valor absoluto
- [x] Desafio 8: Math.pow() e ** - potenciação
- [x] Desafio 9: Math.sqrt() - raiz quadrada
- [x] Desafio 10: parseInt() - converter string para int
- [x] Desafio 11: parseFloat() - converter string para float
- [x] Desafio 12: Number() - converter para número
- [x] Desafio 13: toFixed() - limitar casas decimais
- [x] Desafio 14: isNaN() e isFinite() - validar números
- [x] Desafio 15: Math.PI e Math.E - constantes matemáticas
- [x] Desafio 16: Desafio combinado - calculadora de crescimento de plantas

#### 2.2 Conceitos Intermediários - Tier 6-12 (Nível 6-12)

**Array Methods Avançados - Jardim de Dados** ✅ IMPLEMENTADO
- [x] Criar planta "Jardim de Dados" (tier 3, 6 regas)
- [x] Desafio 1: reduce() básico - somar valores
- [x] Desafio 2: reduce() com objeto - agrupar dados
- [x] Desafio 3: reduce() para flatten - achatar array
- [x] Desafio 4: find() - encontrar primeiro elemento
- [x] Desafio 5: findIndex() - encontrar índice do primeiro elemento
- [x] Desafio 6: findLast() e findLastIndex() - buscar do fim
- [x] Desafio 7: some() - verificar se algum satisfaz condição
- [x] Desafio 8: every() - verificar se todos satisfazem condição
- [x] Desafio 9: sort() com números - ordenar crescente/decrescente
- [x] Desafio 10: sort() com strings - ordenar alfabeticamente
- [x] Desafio 11: sort() com comparador customizado - ordenar objetos
- [x] Desafio 12: reverse() - inverter array
- [x] Desafio 13: flat() - achatar array aninhado
- [x] Desafio 14: flatMap() - map + flat em um passo
- [x] Desafio 15: includes() - verificar se contém elemento
- [x] Desafio 16: indexOf() e lastIndexOf() - encontrar índice
- [x] Desafio 17: slice() vs splice() - extrair vs modificar
- [x] Desafio 18: concat() - juntar arrays
- [x] Desafio 19: Array.from() - criar array de iterável
- [x] Desafio 20: Array.isArray() - verificar se é array
- [x] Desafio 21: Encadeamento: filter + map + reduce
- [x] Desafio 22: Encadeamento: sort + slice - top N elementos
- [x] Desafio 23: Desafio combinado - análise de jardim completo

**Destructuring - Flor Fragmentada** ✅ IMPLEMENTADO
- [x] Criar planta "Flor Fragmentada" (tier 2, 5 regas)
- [x] Desafio 1: Destructuring básico de array - [a, b] = arr
- [x] Desafio 2: Pular elementos em array - [a, , c] = arr
- [x] Desafio 3: Rest em array - [first, ...rest] = arr
- [x] Desafio 4: Default values em array - [a = 1, b = 2] = arr
- [x] Desafio 5: Swap de variáveis - [a, b] = [b, a]
- [x] Desafio 6: Destructuring básico de objeto - {name, age} = obj
- [x] Desafio 7: Renomear propriedades - {name: plantName} = obj
- [x] Desafio 8: Default values em objeto - {name = 'Unknown'} = obj
- [x] Desafio 9: Destructuring aninhado - objeto dentro de objeto
- [x] Desafio 10: Destructuring em parâmetros de função
- [x] Desafio 11: Destructuring com rest - {a, b, ...rest} = obj
- [x] Desafio 12: Destructuring em loops - for (const {name} of plants)
- [x] Desafio 13: Destructuring de arrays retornados
- [x] Desafio 14: Destructuring de objetos retornados
- [x] Desafio 15: Desafio combinado - processar dados de plantas

**Spread/Rest - Semente Expansiva** ✅ IMPLEMENTADO
- [x] Criar planta "Semente Expansiva" (tier 2, 5 regas)
- [x] Desafio 1: Spread em arrays - [...arr1, ...arr2]
- [x] Desafio 2: Copiar array - [...original]
- [x] Desafio 3: Adicionar elementos - [...arr, newItem]
- [x] Desafio 4: Spread em objetos - {...obj1, ...obj2}
- [x] Desafio 5: Copiar objeto - {...original}
- [x] Desafio 6: Merge de objetos com override
- [x] Desafio 7: Adicionar propriedades - {...obj, newProp: value}
- [x] Desafio 8: Rest parameters em função - (...args)
- [x] Desafio 9: Rest com outros parâmetros - (first, ...rest)
- [x] Desafio 10: Spread em chamada de função - fn(...args)
- [x] Desafio 11: Spread com Math.max/min
- [x] Desafio 12: Clonar array aninhado (shallow vs deep)
- [x] Desafio 13: Clonar objeto aninhado (shallow vs deep)
- [x] Desafio 14: Spread para remover propriedade - const {remove, ...keep} = obj
- [x] Desafio 15: Desafio combinado - sistema de merge de plantas

**Arrow Functions Avançadas - Rosa Aérea** ✅ IMPLEMENTADO
- [x] Criar planta "Rosa Aérea" (tier 2, 5 regas)
- [x] Desafio 1: Implicit return simples - x => x * 2
- [x] Desafio 2: Implicit return de objeto - x => ({value: x})
- [x] Desafio 3: Arrow function sem parâmetros - () => value
- [x] Desafio 4: Arrow function com um parâmetro - x => x + 1
- [x] Desafio 5: Arrow function com múltiplos parâmetros - (a, b) => a + b
- [x] Desafio 6: Arrow function em map - arr.map(x => x * 2)
- [x] Desafio 7: Arrow function em filter - arr.filter(x => x > 0)
- [x] Desafio 8: Arrow function em reduce
- [x] Desafio 9: Arrow function em sort
- [x] Desafio 10: Arrow function como callback - setTimeout(() => {})
- [x] Desafio 11: This binding - comparar arrow vs function
- [x] Desafio 12: Arrow em métodos de objeto - quando NÃO usar
- [x] Desafio 13: Currying com arrows - x => y => x + y
- [x] Desafio 14: Higher-order function retornando arrow
- [x] Desafio 15: Desafio combinado - pipeline de transformações

#### 2.3 Conceitos Avançados - Tier 13-20 (Nível 13-20) ✅ IMPLEMENTADO

**Classes e OOP - Árvore Ancestral** ✅ IMPLEMENTADO
- [x] Criar planta "Árvore Ancestral" (tier 4, 8 regas)
- [x] Desafio 1: Declaração básica de classe
- [x] Desafio 2: Constructor com parâmetros
- [x] Desafio 3: Propriedades da instância
- [x] Desafio 4: Métodos da classe
- [x] Desafio 5: Getter methods
- [x] Desafio 6: Setter methods
- [x] Desafio 7: Static methods
- [x] Desafio 8: Static properties
- [x] Desafio 9: Herança com extends
- [x] Desafio 10: Super() no constructor
- [x] Desafio 11: Override de métodos
- [x] Desafio 12: Super.method() - chamar método da classe pai
- [x] Desafio 13: Private fields (#field)
- [x] Desafio 14: Protected pattern (_field)
- [x] Desafio 15: Desafio combinado - sistema de hierarquia de plantas

**Async/Await - Orquídea Temporal** ✅ IMPLEMENTADO
- [x] Criar planta "Orquídea Temporal" (tier 4, 8 regas)
- [x] Desafio 1: Criar Promise básica
- [x] Desafio 2: Promise.resolve e Promise.reject
- [x] Desafio 3: .then() e .catch()
- [x] Desafio 4: Encadear .then()
- [x] Desafio 5: Async function básica
- [x] Desafio 6: Await básico
- [x] Desafio 7: Try/catch com async/await
- [x] Desafio 8: Finally block
- [x] Desafio 9: Promise.all - esperar múltiplas promises
- [x] Desafio 10: Promise.race - primeira a resolver
- [x] Desafio 11: Promise.allSettled - esperar todas independente do resultado
- [x] Desafio 12: Promise.any - primeira a resolver com sucesso
- [x] Desafio 13: Async em loops - for await of
- [x] Desafio 14: Parallel vs Sequential async
- [x] Desafio 15: Desafio combinado - sistema de rega assíncrono

**Closures e Scope - Videira Envolvente** ✅ IMPLEMENTADO
- [x] Criar planta "Videira Envolvente" (tier 3, 7 regas)
- [x] Desafio 1: Entender escopo de bloco (let/const)
- [x] Desafio 2: Entender escopo de função (var)
- [x] Desafio 3: Lexical scope básico
- [x] Desafio 4: Closure simples - função retorna função
- [x] Desafio 5: Closure com variável privada
- [x] Desafio 6: Counter com closure
- [x] Desafio 7: Factory function com closure
- [x] Desafio 8: Module pattern
- [x] Desafio 9: IIFE (Immediately Invoked Function Expression)
- [x] Desafio 10: Closure em loops (problema clássico)
- [x] Desafio 11: Closure em event handlers
- [x] Desafio 12: Closure para memoization
- [x] Desafio 13: Closure para debounce/throttle
- [x] Desafio 14: Closure vs Arrow functions
- [x] Desafio 15: Desafio combinado - sistema de cache de crescimento

**Error Handling - Cacto Defensivo** ✅ IMPLEMENTADO
- [x] Criar planta "Cacto Defensivo" (tier 3, 6 regas)
- [x] Desafio 1: Try/catch básico
- [x] Desafio 2: Finally block
- [x] Desafio 3: Throw new Error()
- [x] Desafio 4: Custom error messages
- [x] Desafio 5: Error.name e Error.message
- [x] Desafio 6: Multiple catch blocks (tipo de erro)
- [x] Desafio 7: Re-throwing errors
- [x] Desafio 8: Error em async functions
- [x] Desafio 9: Custom Error classes
- [x] Desafio 10: TypeError, ReferenceError, SyntaxError
- [x] Desafio 11: Validação de inputs com throw
- [x] Desafio 12: Error boundaries pattern
- [x] Desafio 13: Global error handling
- [x] Desafio 14: Logging de erros
- [x] Desafio 15: Desafio combinado - sistema robusto de rega

#### 2.4 Conceitos Expert - Tier 21+ (Nível 21+) ✅ IMPLEMENTADO

**Prototypes - Raiz Primordial** ✅ IMPLEMENTADO
- [x] Criar planta "Raiz Primordial" (tier 5, 10 regas)
- [x] Desafio 1: Entender __proto__
- [x] Desafio 2: Prototype chain básica
- [x] Desafio 3: Object.getPrototypeOf()
- [x] Desafio 4: Object.setPrototypeOf()
- [x] Desafio 5: Constructor.prototype
- [x] Desafio 6: Adicionar métodos ao prototype
- [x] Desafio 7: Object.create() básico
- [x] Desafio 8: Object.create() com propriedades
- [x] Desafio 9: Herança prototípica manual
- [x] Desafio 10: hasOwnProperty vs in
- [x] Desafio 11: Object.keys vs for...in
- [x] Desafio 12: Prototype pollution (entender o problema)
- [x] Desafio 13: Desafio combinado - sistema de herança de plantas

**Generators e Iterators - Flor Infinita** ✅ IMPLEMENTADO
- [x] Criar planta "Flor Infinita" (tier 5, 10 regas)
- [x] Desafio 1: function* syntax básica
- [x] Desafio 2: yield simples
- [x] Desafio 3: next() e value
- [x] Desafio 4: Generator que retorna valores finitos
- [x] Desafio 5: Generator infinito
- [x] Desafio 6: yield* para delegar
- [x] Desafio 7: Passar valores para next()
- [x] Desafio 8: return() em generator
- [x] Desafio 9: throw() em generator
- [x] Desafio 10: Iterator protocol - Symbol.iterator
- [x] Desafio 11: Criar iterador customizado
- [x] Desafio 12: Generator para Fibonacci
- [x] Desafio 13: Desafio combinado - sequência de crescimento

**Proxies e Reflect - Espelho Mágico** ✅ IMPLEMENTADO
- [x] Criar planta "Espelho Mágico" (tier 5, 10 regas)
- [x] Desafio 1: new Proxy() básico
- [x] Desafio 2: get trap - interceptar leitura
- [x] Desafio 3: set trap - interceptar escrita
- [x] Desafio 4: has trap - interceptar 'in' operator
- [x] Desafio 5: deleteProperty trap
- [x] Desafio 6: apply trap - interceptar chamadas de função
- [x] Desafio 7: construct trap - interceptar 'new'
- [x] Desafio 8: Reflect API básico
- [x] Desafio 9: Reflect.get/set
- [x] Desafio 10: Reflect.has e Reflect.deleteProperty
- [x] Desafio 11: Reflect.apply
- [x] Desafio 12: Proxy para validação
- [x] Desafio 13: Proxy para logging
- [x] Desafio 14: Desafio combinado - sistema observável de plantas

**WeakMap/WeakSet - Memória Efêmera** ✅ IMPLEMENTADO
- [x] Criar planta "Memória Efêmera" (tier 4, 8 regas)
- [x] Desafio 1: Map vs WeakMap - diferenças básicas
- [x] Desafio 2: Criar WeakMap
- [x] Desafio 3: set/get/has/delete no WeakMap
- [x] Desafio 4: Entender garbage collection com WeakMap
- [x] Desafio 5: WeakMap para dados privados
- [x] Desafio 6: WeakMap para cache
- [x] Desafio 7: Set vs WeakSet
- [x] Desafio 8: Criar WeakSet
- [x] Desafio 9: add/has/delete no WeakSet
- [x] Desafio 10: WeakSet para rastrear objetos
- [x] Desafio 11: Desafio combinado - sistema de referências fracas

#### 2.5 Sistema de Progressão Educacional

- [x] **Níveis de dificuldade por conceito** ✅ IMPLEMENTADO
  - Cada conceito terá 3 níveis: Iniciante (30%), Praticante (50%), Mestre (20%)
  - Desafios escalam em complexidade dentro do mesmo conceito
  - Visual badges: Bronze/Prata/Ouro para cada conceito
  - Arquivos: `conceptProgressStore.ts`, `ConceptBadge.tsx`, tipos em `challenge.ts`

- [x] **Sistema de pré-requisitos inteligente** ✅ IMPLEMENTADO
  - Criar grafo de dependências entre conceitos
  - Ex: Async/Await requer Functions + Promises + Error Handling
  - Mostrar path de aprendizado sugerido
  - Bloquear conceitos avançados até completar básicos
  - Arquivo: `conceptProgressStore.ts` - CONCEPT_PREREQUISITES, isConceptUnlocked(), getSuggestedLearningPath()

- [x] **Desafios combinados (Cross-Concept)** ✅ IMPLEMENTADO
  - Criar 20+ desafios que misturam múltiplos conceitos
  - Recompensas 2x maiores (XP e moedas)
  - Desbloqueiam após dominar conceitos individuais
  - Ex: "Sistema de Jardim Assíncrono" = Async + Classes + Arrays
  - Arquivo: `crossConcept.ts` com 8 desafios combinados e mapeamento de requisitos

- [x] **Modo Revisão** ✅ IMPLEMENTADO
  - Gerar desafio aleatório de conceitos já aprendidos
  - Recompensa menor mas mantém conhecimento fresco (50%)
  - Sistema de spaced repetition (algoritmo SM-2)
  - Notificação se não praticar por 3+ dias
  - Arquivo: `reviewStore.ts` com getNextReviewChallenge, getDueReviews, shouldShowReviewReminder

- [x] **Curva de aprendizado inteligente** ✅ IMPLEMENTADO
  - Rastrear tempo médio por desafio
  - Se jogador travar 3+ tentativas, oferecer dica automática
  - Se completar muito rápido, sugerir nível acima
  - Adaptive difficulty baseado em performance
  - Arquivo: `learningCurveStore.ts` com shouldShowAutoHint, shouldSuggestHigherDifficulty, getPerformanceLevel

---

### Fase 3: Sistema de Progressão e Retenção (Prioridade Alta)

**Objetivo**: Manter jogadores engajados através de sistemas de recompensa, feedback e objetivos claros.

#### 3.1 Sistema de Loja Expandido

- [x] Compra de sementes básicas
- [ ] **Upgrades de ferramentas**
  - Regador automático (rega 2 plantas por desafio)
  - Fertilizante (reduz regas necessárias em 1)
  - Pá dourada (chance de dobrar colheita)
  - Lupa (revela 1 dica grátis por desafio)
- [ ] **Power-ups consumíveis**
  - Boost de XP (2x XP por 1 hora)
  - Boost de moedas (2x moedas por 1 hora)
  - Skip de rega (avança 1 rega instantaneamente)
- [ ] **Decorações de jardim**
  - Cercas, pedras, fontes (puramente estético)
  - Backgrounds temáticos por estação
  - Efeitos de partículas (folhas caindo, borboletas)
- [ ] **Expansão de terreno**
  - Desbloquear grid 4x4 (nível 10)
  - Desbloquear grid 5x5 (nível 20)
  - Desbloquear grid 6x6 (nível 30)

#### 3.2 Colheita e Feedback Aprimorado

- [x] Animação de colheita básica
- [x] Sistema de qualidade (poor/normal/perfect)
- [ ] **Combo System**
  - Colher múltiplas plantas seguidas aumenta multiplicador
  - Combo 3x = 1.5x moedas
  - Combo 5x = 2x moedas
  - Combo 10x = 3x moedas + XP bonus
  - Combo quebra se esperar 5+ segundos entre colheitas
- [ ] **Recompensas especiais aleatórias**
  - 5% chance de dobrar moedas na colheita
  - 3% chance de encontrar semente rara
  - 1% chance de encontrar semente lendária
  - Animação especial com brilho e som diferente
- [ ] **Estatísticas de colheita**
  - Rastrear maior combo conseguido
  - Total de colheitas perfect
  - Planta mais colhida
  - Estação mais produtiva

#### 3.3 Sistema de Conquistas

- [ ] **Conquistas de progressão (10)**
  - Primeira planta colhida
  - 10, 50, 100, 500 plantas colhidas
  - Alcançar nível 5, 10, 20, 50
  - Completar todos desafios de um conceito
  - Dominar todos conceitos de um tier
- [ ] **Conquistas de maestria (15)**
  - Completar desafio sem ver dicas
  - Completar 10 desafios seguidos sem erro
  - Conseguir 100% em todos testes de um desafio
  - Colher 5 plantas perfect seguidas
  - Alcançar combo 10x
- [ ] **Conquistas de colecionador (10)**
  - Colher todos tipos de planta
  - Ter 1000 moedas
  - Comprar todos upgrades de ferramentas
  - Plantar 100 sementes
  - Desbloquear todas plantas do tier 1, 2, 3, 4, 5
- [ ] **Conquistas secretas/easter eggs (5)**
  - Plantar 3 do mesmo tipo em linha
  - Colher tudo no jardim de uma vez
  - Completar desafio em menos de 30 segundos
  - Alcançar streak de 30 dias
  - Descobrir código secreto no editor
- [ ] **Sistema de badges**
  - Badge visual único para cada conquista
  - Exibir no perfil do jogador
  - Recompensas: moedas, XP, sementes raras
  - Notificação animada ao desbloquear

#### 3.4 Desafios Diários e Eventos

- [ ] **Desafio diário**
  - 1 desafio especial por dia, conceito aleatório
  - Dificuldade baseada no nível do jogador
  - Recompensa: 3x XP + 2x moedas + semente rara
  - Expira em 24h
  - Visual destacado no HUD
- [ ] **Sistema de streak**
  - Rastrear dias consecutivos completando desafio diário
  - Streak 7 dias = recompensa especial
  - Streak 30 dias = conquista + título
  - Notificação se streak em risco
- [ ] **Eventos semanais**
  - "Semana das Funções" - desafios só de functions, recompensas 2x
  - "Maratona de Loops" - completar 20 desafios de loop
  - "Fim de semana double XP" - todo XP duplicado
  - Rotação semanal, nunca repete 2 semanas seguidas
- [ ] **Calendário de eventos**
  - Interface mostrando eventos ativos
  - Cronômetro de tempo restante
  - Progresso atual no evento
  - Recompensas já conquistadas vs pendentes

---

### Fase 4: Features de Engajamento (Prioridade Média)

**Objetivo**: Adicionar profundidade e variedade à experiência, aumentando tempo de jogo e replayability.

#### 4.1 Sistema de Estações Completo

- [x] Ciclo de 7 dias por estação (Primavera, Verão, Outono, Inverno)
- [ ] **Plantas sazonais especiais**
  - Primavera: Flores de cerejeira (bonus XP)
  - Verão: Girassol gigante (bonus moedas)
  - Outono: Abóbora de código (bonus itens raros)
  - Inverno: Pinheiro eterno (não murcha)
- [ ] **Eventos sazonais automáticos**
  - Primavera: "Festival das Flores" - flores crescem 2x mais rápido
  - Verão: "Onda de calor" - plantas precisam de água extra
  - Outono: "Colheita abundante" - dobro de moedas
  - Inverno: "Neve mágica" - chance de sementes bonus
- [ ] **Clima dinâmico**
  - Sol, nuvens, chuva, neve (visual only no MVP)
  - Futuro: chuva rega automaticamente (reduz 1 desafio)
  - Tempestade murcha plantas não maduras (cria urgência)
- [ ] **Transições visuais**
  - Paleta de cores muda com estação
  - Partículas sazonais (pétalas, folhas, neve)
  - Animação suave de 2 segundos na transição

#### 4.2 Tutorial e Onboarding

- [ ] **Tutorial interativo (5-10 minutos)**
  - Welcome screen explicando o conceito do jogo
  - Passo 1: Plantar primeira semente (guiado)
  - Passo 2: Completar primeiro desafio var-1 (assistido)
  - Passo 3: Colher primeira planta (celebração)
  - Passo 4: Comprar semente na loja (introduzir economia)
  - Passo 5: Tour rápido do HUD e features
- [ ] **Tooltips contextuais**
  - Aparecem na primeira vez que jogador vê cada elemento
  - Seta apontando + texto curto
  - Pode ser fechado e não aparece novamente
  - Exemplos: primeira vez vendo Shop, Seed Bag, Plot vazio
- [ ] **Sistema de missões iniciais**
  - "Bem-vindo ao Jardim" - complete tutorial (recompensa: 50 moedas)
  - "Primeiro Broto" - colha 3 plantas (recompensa: 5 sementes variadas)
  - "Estudante Dedicado" - complete 5 desafios (recompensa: 100 XP)
  - "Mestre da Loja" - compre 10 sementes (recompensa: upgrade grátis)
  - Missões marcadas como completas, visíveis em aba separada

#### 4.3 UX e Polish

- [ ] **Animações avançadas com Framer Motion**
  - Page transitions (fade in/out)
  - Stagger animations em grids
  - Spring animations em botões
  - Parallax scrolling no background
  - Shake animation em erro de teste
- [ ] **Sistema de partículas com tsParticles**
  - Partículas de colheita (moedas voando, sparkles)
  - Partículas de level up (explosão de confetti)
  - Partículas ambientes por estação
  - Partículas de erro (fumaça vermelha)
- [ ] **Feedback sonoro**
  - Som de plantio (seed drop)
  - Som de rega/desafio completo (water splash)
  - Som de colheita (coin collect)
  - Som de level up (fanfare)
  - Som de erro (buzzer suave)
  - Som de UI (click, hover)
  - Volume ajustável, mute toggle
- [ ] **Micro-interações**
  - Hover effects em todos botões
  - Active states (press down)
  - Loading states animados
  - Skeleton screens durante carregamento
  - Toast notifications elegantes

#### 4.4 Sistema de Perfil do Jogador

- [ ] **Tela de perfil**
  - Avatar/foto (escolher entre preset de ícones)
  - Username editável
  - Estatísticas principais destacadas
  - Gráfico de progresso por conceito
  - Lista de conquistas com progresso
- [ ] **Estatísticas detalhadas**
  - Total de desafios por conceito
  - Accuracy rate (% de acertos)
  - Tempo médio por desafio
  - Conceito favorito (mais praticado)
  - Dias ativos vs total
- [ ] **Histórico de atividade**
  - Últimas 10 plantas colhidas
  - Últimos 5 desafios completados
  - Gráfico de XP ganho por dia (últimos 7 dias)

---

### Fase 5: Backend e Persistência (Prioridade Média)

**Objetivo**: Migrar de LocalStorage para backend real, permitindo sincronização entre dispositivos e features multiplayer futuras.

#### 5.1 Setup do Backend

- [ ] **Criar apps/api com Fastify**
  - Setup inicial do projeto
  - Configurar TypeScript
  - CORS configurado
  - Environment variables (.env)
  - Estrutura de pastas: routes, controllers, services, models
- [ ] **Configurar Prisma com PostgreSQL**
  - Instalar Prisma CLI
  - Conectar com PostgreSQL (local ou Railway)
  - Definir schema.prisma
  - Migrations setup
- [ ] **Schema do banco**
  - User: id, email, username, password_hash, created_at, updated_at
  - Player: id, user_id, level, xp, coins, season, day, stats (JSON)
  - Garden: id, user_id, plots (JSON array), updated_at
  - Inventory: id, user_id, items (JSON)
  - ChallengeProgress: id, user_id, challenge_id, completed, attempts, best_time
  - Achievement: id, user_id, achievement_id, unlocked_at
  - DailyChallenge: id, user_id, date, challenge_id, completed

#### 5.2 Autenticação

- [ ] **Registro de usuário**
  - POST /auth/register - email, username, password
  - Hash de senha com bcrypt
  - Validação de email único
  - Validação de senha forte (min 8 chars)
  - Retorna JWT token + user data
- [ ] **Login**
  - POST /auth/login - email, password
  - Verificar hash de senha
  - Retornar JWT token
  - Refresh token opcional
- [ ] **JWT Middleware**
  - Verificar token em rotas protegidas
  - Extrair user_id do token
  - Anexar ao request como req.userId
- [ ] **Logout** (client-side)
  - Remover token do localStorage
  - Limpar Zustand stores

#### 5.3 API Endpoints

**Players**
- [ ] GET /players/me - Buscar dados do jogador atual
- [ ] PATCH /players/me - Atualizar dados (level, xp, coins, stats)
- [ ] POST /players/level-up - Calcular level up

**Garden**
- [ ] GET /gardens/me - Buscar estado do jardim
- [ ] POST /gardens/plant - Plantar semente em plot
- [ ] POST /gardens/water - Regar planta (completar desafio)
- [ ] POST /gardens/harvest - Colher planta

**Inventory**
- [ ] GET /inventory/me - Buscar inventário
- [ ] POST /inventory/add - Adicionar item
- [ ] POST /inventory/remove - Remover item

**Shop**
- [ ] GET /shop/seeds - Listar sementes disponíveis
- [ ] POST /shop/buy - Comprar semente

**Challenges**
- [ ] GET /challenges - Listar todos desafios
- [ ] GET /challenges/:id - Buscar desafio específico
- [ ] POST /challenges/:id/complete - Marcar desafio como completo
- [ ] GET /challenges/progress - Progresso do jogador em todos desafios

**Achievements**
- [ ] GET /achievements - Listar todas conquistas
- [ ] GET /achievements/me - Conquistas do jogador
- [ ] POST /achievements/unlock - Desbloquear conquista

**Leaderboard**
- [ ] GET /leaderboard/global - Top 100 jogadores por XP
- [ ] GET /leaderboard/weekly - Top 100 da semana
- [ ] GET /leaderboard/concept/:concept - Ranking por conceito

**Daily Challenge**
- [ ] GET /daily - Buscar desafio diário atual
- [ ] POST /daily/complete - Completar desafio diário

#### 5.4 Sincronização e Migração

- [ ] **Migração de LocalStorage para API**
  - Criar endpoint POST /players/import-local - recebe dados do localStorage
  - Validar e sanitizar dados antes de salvar
  - Mesclar com dados existentes se usuário já registrado
- [ ] **Sync offline/online**
  - Detectar quando ficar offline
  - Continuar salvando em localStorage
  - Quando voltar online, sincronizar mudanças
  - Resolver conflitos (last-write-wins ou merge inteligente)
- [ ] **Indicador de sync status**
  - Ícone no HUD: verde (synced), amarelo (syncing), vermelho (offline)
  - Toast notification quando sync completa
  - Retry automático se falhar

---

### Fase 6: Otimização e Qualidade (Prioridade Baixa)

**Objetivo**: Melhorar performance, acessibilidade e experiência mobile.

#### 6.1 Responsividade e Mobile

- [ ] **Layout responsivo**
  - Breakpoints: mobile (<640px), tablet (640-1024px), desktop (>1024px)
  - Grid ajustável: 2x3 mobile, 3x3 tablet, 3x3+ desktop
  - HUD adaptativo: vertical mobile, horizontal desktop
- [ ] **Touch gestures**
  - Tap para selecionar/plantar/colher
  - Swipe para navegar entre modals
  - Long press para ver detalhes de planta
  - Pinch to zoom no jardim (futuro)
- [ ] **PWA (Progressive Web App)**
  - Manifest.json configurado
  - Service Worker para cache
  - Ícones para todas plataformas
  - Splash screens
  - "Add to Home Screen" prompt
- [ ] **Offline support**
  - Cache de assets estáticos
  - Cache de dados críticos
  - Queue de ações para sync posterior
  - Mensagem clara de modo offline

#### 6.2 Performance

- [ ] **Code splitting**
  - Lazy load de modais (Shop, Challenge)
  - Lazy load de features não-críticas
  - React.lazy e Suspense
- [ ] **Lazy loading de componentes**
  - Carregar desafios sob demanda
  - Carregar plantas conforme necessário
- [ ] **Bundle optimization**
  - Tree shaking configurado
  - Minificação em produção
  - Compression (gzip/brotli)
  - Análise de bundle size com Vite Bundle Analyzer
- [ ] **Otimização de imagens**
  - Usar WebP quando possível
  - Lazy load de imagens
  - Sprites para ícones pequenos

#### 6.3 Acessibilidade

- [ ] **Keyboard navigation**
  - Tab order lógico
  - Enter/Space para ações
  - Esc para fechar modais
  - Atalhos de teclado (?, H para help)
- [ ] **Screen reader support**
  - ARIA labels em todos elementos interativos
  - ARIA live regions para notificações
  - Role attributes corretos
  - Alt text em imagens
- [ ] **Contraste e cores**
  - WCAG AA compliance mínimo
  - Modo de alto contraste opcional
  - Não depender só de cor para informação
- [ ] **Modo escuro** (opcional)
  - Toggle de dark/light mode
  - Persistir preferência
  - Respeitar preferência do sistema

#### 6.4 Testes

- [ ] **Testes unitários (Vitest)**
  - Testar validador de código
  - Testar Zustand stores
  - Testar utility functions
  - Coverage mínimo de 70%
- [ ] **Testes de componente**
  - Testar componentes UI isolados
  - Testar interações de usuário
  - React Testing Library
- [ ] **Testes E2E (Playwright)**
  - Fluxo completo: plantar → regar → colher
  - Fluxo de compra na loja
  - Fluxo de desafio completo
  - Testes de regressão críticos

---

### Fase 7: Deploy e Infraestrutura (Prioridade Baixa)

**Objetivo**: Colocar o jogo em produção de forma automatizada e monitorada.

#### 7.1 CI/CD

- [ ] **GitHub Actions para CI**
  - Workflow de teste em cada PR
  - Lint e type-check
  - Build de teste
  - Rodar testes unitários
- [ ] **Deploy automático**
  - Deploy frontend em merge para main
  - Deploy backend em merge para main
  - Preview deployments para PRs
- [ ] **Versionamento**
  - Semantic versioning (major.minor.patch)
  - Changelog automático
  - Git tags para releases

#### 7.2 Hospedagem

- [ ] **Frontend no Vercel**
  - Conectar repositório GitHub
  - Configurar environment variables
  - Custom domain (syntaxgardens.com)
  - SSL automático via Vercel
- [ ] **Backend no Railway**
  - Conectar repositório GitHub
  - PostgreSQL database provisionado
  - Environment variables configuradas
  - Auto-scaling se necessário
- [ ] **CDN para assets**
  - Cloudflare ou Vercel Edge
  - Cache agressivo de imagens/fonts
  - Servir de múltiplas regiões

#### 7.3 Monitoramento

- [ ] **Error tracking com Sentry**
  - Capturar erros de JavaScript
  - Capturar erros de API
  - Source maps para debug
  - Alertas por email/Slack
- [ ] **Analytics com Plausible**
  - Rastrear pageviews
  - Eventos customizados (plantar, colher, completar desafio)
  - Funil de conversão (registro → primeiro desafio → primeira colheita)
  - Respeitar privacidade (GDPR compliant)
- [ ] **Logs estruturados**
  - Pino.js no backend
  - Logs em JSON
  - Níveis: error, warn, info, debug
  - Integração com serviço de logs (Logtail, Papertrail)
- [ ] **Uptime monitoring**
  - Ping a cada 5 minutos
  - Alertas se down por >2 minutos
  - Status page público

#### 7.4 Documentação

- [ ] **README atualizado**
  - Descrição do projeto
  - Screenshots
  - Como rodar localmente
  - Como contribuir
- [ ] **Documentação da API**
  - Swagger/OpenAPI spec
  - Exemplos de requests/responses
  - Códigos de erro
- [ ] **Contributing guide**
  - Como reportar bugs
  - Como sugerir features
  - Code style guide
  - PR template

---

## Decisões Técnicas

### Por que Zustand ao invés de Redux?
- API mais simples e menos boilerplate
- Melhor integração com TypeScript
- Persist middleware incluso
- Performance excelente para este tamanho de projeto
- Curva de aprendizado menor para novos contribuidores

### Por que Tailwind CSS?
- Desenvolvimento rápido com classes utilitárias
- Consistência visual garantida
- Bundle otimizado (purge CSS remove classes não usadas)
- Excelente para prototipação rápida
- Design system embutido (cores, espaçamentos)

### Por que validação client-side de código?
- Resposta instantânea para o jogador
- Sem necessidade de backend para MVP
- Suficiente para desafios educacionais simples
- Fácil de migrar para backend depois se necessário
- Reduz custos de infraestrutura inicialmente

### Por que LocalStorage para persistência inicial?
- Zero configuração de backend
- Funciona offline por padrão
- Suficiente para single-player MVP
- Migrar para API é transparente com Zustand persist
- Permite validar o produto antes de investir em infra

### Por que monorepo com Turborepo?
- Compartilhar código entre frontend/backend facilmente
- Build e cache inteligente
- Preparado para escalar (mobile app, admin panel no futuro)
- TypeScript types compartilhados

### Por que PostgreSQL?
- Relacional é mais adequado para dados estruturados do jogo
- JSON support para flexibilidade (stats, inventory)
- Excelente integração com Prisma
- Escalável e confiável
- Gratuito no Railway para começar

---

## Métricas de Sucesso

| Categoria | Métrica | Meta Mês 1 | Meta Mês 3 | Meta Mês 6 |
|-----------|---------|------------|------------|------------|
| **Aquisição** | Usuários registrados | 100 | 500 | 2000 |
| **Ativação** | Completam tutorial | 70% | 80% | 85% |
| | Completam 5 desafios | 40% | 50% | 60% |
| **Retenção** | D1 (retornam no dia seguinte) | 30% | 40% | 50% |
| | D7 (retornam após 7 dias) | 15% | 20% | 30% |
| | D30 (retornam após 30 dias) | 5% | 10% | 15% |
| **Engajamento** | Tempo médio de sessão | 10 min | 15 min | 20 min |
| | Desafios por usuário/dia | 3 | 5 | 8 |
| | Plantas colhidas/usuário/semana | 5 | 10 | 20 |
| **Progressão** | % que chega nível 5 | 30% | 40% | 50% |
| | % que chega nível 10 | 10% | 20% | 30% |
| | Conceitos dominados (média) | 2 | 5 | 10 |
| **Monetização** | Conversão para premium (futuro) | - | 2% | 5% |
| **Satisfação** | NPS | 40 | 50 | 60 |
| | Reviews 4+ estrelas | 70% | 80% | 85% |

### Dashboards de Analytics

**Dashboard Principal:**
- MAU (Monthly Active Users)
- DAU (Daily Active Users)
- DAU/MAU ratio (stickiness)
- New signups por dia
- Churn rate

**Dashboard de Engajamento:**
- Desafios completados por hora do dia
- Conceitos mais populares
- Taxa de abandono por conceito
- Tempo médio por desafio
- Taxa de uso de hints

**Dashboard de Progressão:**
- Distribuição de níveis dos jogadores
- Funil de progressão (nível 1 → 5 → 10 → 20)
- Conceitos por tier (quantos % dos jogadores dominam cada tier)
- Plantas mais colhidas
- Conquistas mais raras

---

## Contribuindo

### Como Contribuir

1. **Fork o repositório**
   ```bash
   git clone https://github.com/seu-usuario/syntax-gardens.git
   ```

2. **Crie uma branch**
   ```bash
   git checkout -b feature/nome-da-feature
   ```

3. **Faça suas mudanças**
   - Siga o style guide (Prettier + ESLint)
   - Adicione testes se aplicável
   - Atualize documentação se necessário

4. **Commit suas mudanças**
   ```bash
   git commit -m 'feat: adiciona nova feature X'
   ```
   Use conventional commits: `feat:`, `fix:`, `docs:`, `style:`, `refactor:`, `test:`, `chore:`

5. **Push para a branch**
   ```bash
   git push origin feature/nome-da-feature
   ```

6. **Abra um Pull Request**
   - Descreva o que foi feito
   - Adicione screenshots se mudança visual
   - Referencie issues relacionadas

### Áreas que Precisam de Ajuda

- **Conteúdo Educacional**: Criar novos desafios de código
- **Arte/Design**: Sprites de plantas, ícones, backgrounds
- **UX Writing**: Melhorar textos, dicas, tutoriais
- **Tradução**: i18n para Português, Espanhol, etc
- **Testing**: Escrever testes unitários e E2E
- **Acessibilidade**: Melhorar suporte a screen readers

---

## Roadmap de Longo Prazo (Além de 6 meses)

### Expansões de Conteúdo
- [ ] **Modo Multiplayer**
  - Jardins compartilhados (co-op)
  - Competições semanais
  - Trocar plantas com amigos
  - Chat in-game
- [ ] **Novos Conceitos Avançados**
  - TypeScript types
  - Regex patterns
  - Web APIs (Fetch, LocalStorage, etc)
  - Node.js específicos (fs, path, etc)
- [ ] **Sistema de Pets**
  - Mascotes que ajudam (regam automaticamente, etc)
  - Evoluem com o tempo
  - Customizáveis
- [ ] **Modo História**
  - Narrativa linear com NPCs
  - Desafios em sequência
  - Boss fights (desafios muito difíceis)

### Monetização (se necessário)
- [ ] **Modelo Freemium**
  - Versão grátis: conceitos básicos (tier 1-3)
  - Premium ($5/mês): todos conceitos + features extras
  - Lifetime ($30): acesso permanente
- [ ] **Cosmetics opcionais**
  - Skins de plantas
  - Temas de jardim
  - Emotes e animações
  - Puramente estético, sem pay-to-win

### Plataformas
- [ ] **Mobile App (React Native)**
  - iOS e Android
  - Sync com web
  - Notificações push (desafio diário pronto)
- [ ] **Desktop App (Electron)**
  - Windows, Mac, Linux
  - Offline-first

---

## Licença

MIT License - veja LICENSE para detalhes.

---

## Contato e Suporte

- **Website**: https://syntaxgardens.com (futuro)
- **Email**: suporte@syntaxgardens.com (futuro)
- **GitHub Issues**: Para bugs e feature requests
- **Discord**: Comunidade de jogadores e devs (futuro)

---

**Última atualização**: 23 Janeiro 2026
**Versão do documento**: 2.5
**Próxima revisão planejada**: Fevereiro 2026