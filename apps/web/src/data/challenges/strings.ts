import type { ChallengeDefinition } from '../../types';

export const stringChallenges: ChallengeDefinition[] = [
  {
    id: 'str-1',
    plantType: 'string',
    difficulty: 1,
    difficultyTier: 'beginner',
    title: 'Concatenacao com +',
    description: 'Junte strings usando o operador +.',
    instructions: `Concatene as strings para criar uma mensagem completa.
Junte greeting, " ", e plantName para criar message.

Resultado esperado: "Ola Rosa"`,
    starterCode: `let greeting = "Ola";
let plantName = "Rosa";

// Concatene as strings
let message = `,
    testCases: [
      {
        input: null,
        expectedOutput: 'Ola Rosa',
        description: 'message deve ser "Ola Rosa"',
      },
    ],
    hints: [
      'Use + para juntar strings',
      'Nao esqueca o espaco entre as palavras',
      'greeting + " " + plantName',
    ],
    solution: `let greeting = "Ola";
let plantName = "Rosa";

let message = greeting + " " + plantName;`,
    experienceReward: 5,
  },
  {
    id: 'str-2',
    plantType: 'string',
    difficulty: 1,
    difficultyTier: 'beginner',
    title: 'Template Literals Basico',
    description: 'Use template literals para interpolar variaveis.',
    instructions: `Use template literals (crases) para criar a mensagem:
"A planta Rosa tem 5 dias de idade"

Use as variaveis plantName e age.`,
    starterCode: `let plantName = "Rosa";
let age = 5;

// Use template literal com \`\`
let message = `,
    testCases: [
      {
        input: null,
        expectedOutput: 'A planta Rosa tem 5 dias de idade',
        description: 'message deve usar template literal corretamente',
      },
    ],
    hints: [
      'Template literals usam crases: `texto`',
      'Interpole variaveis com ${variavel}',
      '`A planta ${plantName} tem ${age} dias de idade`',
    ],
    solution: 'let plantName = "Rosa";\nlet age = 5;\n\nlet message = `A planta ${plantName} tem ${age} dias de idade`;',
    experienceReward: 8,
  },
  {
    id: 'str-3',
    plantType: 'string',
    difficulty: 1,
    difficultyTier: 'beginner',
    title: 'Template Literals Multi-linha',
    description: 'Crie strings com multiplas linhas.',
    instructions: `Crie uma descricao em multiplas linhas usando template literals:

Linha 1: "Planta: Rosa"
Linha 2: "Tipo: Flor"
Linha 3: "Status: Saudavel"

Use \\n ou quebras de linha reais dentro das crases.`,
    starterCode: `// Crie a descricao multi-linha
let description = `,
    testCases: [
      {
        input: null,
        expectedOutput: 'Planta: Rosa\nTipo: Flor\nStatus: Saudavel',
        description: 'description deve ter 3 linhas',
      },
    ],
    hints: [
      'Template literals preservam quebras de linha',
      'Basta apertar Enter dentro das crases',
      'Ou use \\n para nova linha',
    ],
    solution: 'let description = `Planta: Rosa\nTipo: Flor\nStatus: Saudavel`;',
    experienceReward: 8,
  },
  {
    id: 'str-4',
    plantType: 'string',
    difficulty: 1,
    difficultyTier: 'beginner',
    title: 'Propriedade Length',
    description: 'Descubra o tamanho de uma string.',
    instructions: `Use a propriedade .length para descobrir:
- nameLength: quantos caracteres tem plantName
- emptyLength: quantos caracteres tem emptyString`,
    starterCode: `let plantName = "Samambaia";
let emptyString = "";

// Use .length
let nameLength =
let emptyLength = `,
    testCases: [
      {
        input: null,
        expectedOutput: { nameLength: 9, emptyLength: 0 },
        description: 'nameLength deve ser 9, emptyLength deve ser 0',
      },
    ],
    hints: [
      '.length retorna o numero de caracteres',
      'string.length (sem parenteses)',
      'String vazia tem length 0',
    ],
    solution: `let plantName = "Samambaia";
let emptyString = "";

let nameLength = plantName.length;
let emptyLength = emptyString.length;`,
    experienceReward: 5,
  },
  {
    id: 'str-5',
    plantType: 'string',
    difficulty: 1,
    difficultyTier: 'beginner',
    title: 'toUpperCase e toLowerCase',
    description: 'Converta strings para maiusculas ou minusculas.',
    instructions: `Converta as strings:
- upperName: plantName em MAIUSCULAS
- lowerName: plantName em minusculas`,
    starterCode: `let plantName = "Rosa Vermelha";

// Converta o case
let upperName =
let lowerName = `,
    testCases: [
      {
        input: null,
        expectedOutput: { upperName: 'ROSA VERMELHA', lowerName: 'rosa vermelha' },
        description: 'Conversoes de case corretas',
      },
    ],
    hints: [
      '.toUpperCase() converte para maiusculas',
      '.toLowerCase() converte para minusculas',
      'Sao metodos, precisam de ()',
    ],
    solution: `let plantName = "Rosa Vermelha";

let upperName = plantName.toUpperCase();
let lowerName = plantName.toLowerCase();`,
    experienceReward: 5,
  },
  {
    id: 'str-6',
    plantType: 'string',
    difficulty: 2,
    difficultyTier: 'beginner',
    title: 'charAt e Acesso por Indice',
    description: 'Acesse caracteres individuais de uma string.',
    instructions: `Acesse caracteres da string plantName:
- firstChar: primeiro caractere (indice 0)
- lastChar: ultimo caractere
- thirdChar: terceiro caractere (indice 2)

Use charAt() ou notacao de colchetes [].`,
    starterCode: `let plantName = "Girassol";

// Acesse os caracteres
let firstChar =
let lastChar =
let thirdChar = `,
    testCases: [
      {
        input: null,
        expectedOutput: { firstChar: 'G', lastChar: 'l', thirdChar: 'r' },
        description: 'Caracteres acessados corretamente',
      },
    ],
    hints: [
      'Indices comecam em 0',
      'Ultimo indice e length - 1',
      'plantName[0] ou plantName.charAt(0)',
    ],
    solution: `let plantName = "Girassol";

let firstChar = plantName.charAt(0);
let lastChar = plantName.charAt(plantName.length - 1);
let thirdChar = plantName.charAt(2);`,
    experienceReward: 10,
  },
  {
    id: 'str-7',
    plantType: 'string',
    difficulty: 2,
    difficultyTier: 'beginner',
    title: 'Metodo slice()',
    description: 'Extraia partes de uma string com slice.',
    instructions: `Use slice() para extrair partes da string:
- beginning: primeiros 4 caracteres ("Jard")
- ending: ultimos 3 caracteres ("gem")
- middle: caracteres do indice 2 ao 5 ("rdin")`,
    starterCode: `let word = "Jardinagem";

// Use slice() para extrair
let beginning =
let ending =
let middle = `,
    testCases: [
      {
        input: null,
        expectedOutput: { beginning: 'Jard', ending: 'gem', middle: 'rdin' },
        description: 'Substrings extraidas corretamente',
      },
    ],
    hints: [
      'slice(inicio, fim) - fim nao e incluido',
      'slice(0, 4) pega indices 0,1,2,3',
      'Indices negativos contam do final: slice(-3)',
    ],
    solution: `let word = "Jardinagem";

let beginning = word.slice(0, 4);
let ending = word.slice(-3);
let middle = word.slice(2, 6);`,
    experienceReward: 12,
  },
  {
    id: 'str-8',
    plantType: 'string',
    difficulty: 2,
    difficultyTier: 'beginner',
    title: 'Metodos substring e substr',
    description: 'Outras formas de extrair substrings.',
    instructions: `Compare slice, substring e substr:
- sub1: Use substring(0, 5) em text
- sub2: Use substr(6, 4) em text (comeca no 6, pega 4 chars)

Nota: substr e deprecated, mas ainda e bom conhecer.`,
    starterCode: `let text = "Planta Verde Bonita";

// Use os diferentes metodos
let sub1 =
let sub2 = `,
    testCases: [
      {
        input: null,
        expectedOutput: { sub1: 'Plant', sub2: 'Verd' },
        description: 'Substrings extraidas corretamente',
      },
    ],
    hints: [
      'substring(inicio, fim) - similar ao slice',
      'substr(inicio, quantidade) - diferente!',
      'Em substr, o segundo param e a quantidade de chars',
    ],
    solution: `let text = "Planta Verde Bonita";

let sub1 = text.substring(0, 5);
let sub2 = text.substr(7, 4);`,
    experienceReward: 10,
  },
  {
    id: 'str-9',
    plantType: 'string',
    difficulty: 2,
    difficultyTier: 'beginner',
    title: 'Metodo split()',
    description: 'Divida uma string em um array.',
    instructions: `Use split() para dividir strings:
- words: divida sentence por espacos
- letters: divida plantName em caracteres individuais
- parts: divida data por "-"`,
    starterCode: `let sentence = "O jardim esta florido";
let plantName = "Rosa";
let data = "2024-01-15";

// Use split() para dividir
let words =
let letters =
let parts = `,
    testCases: [
      {
        input: null,
        expectedOutput: {
          words: ['O', 'jardim', 'esta', 'florido'],
          letters: ['R', 'o', 's', 'a'],
          parts: ['2024', '01', '15'],
        },
        description: 'Arrays criados corretamente',
      },
    ],
    hints: [
      'split(" ") divide por espacos',
      'split("") divide cada caractere',
      'split("-") divide por hifens',
    ],
    solution: `let sentence = "O jardim esta florido";
let plantName = "Rosa";
let data = "2024-01-15";

let words = sentence.split(" ");
let letters = plantName.split("");
let parts = data.split("-");`,
    experienceReward: 12,
  },
  {
    id: 'str-10',
    plantType: 'string',
    difficulty: 2,
    difficultyTier: 'beginner',
    title: 'Metodo join()',
    description: 'Junte elementos de um array em uma string.',
    instructions: `Use join() para juntar arrays em strings:
- sentence: junte words com espacos
- path: junte folders com "/"
- csv: junte numbers com ","`,
    starterCode: `let words = ["Planta", "bonita", "e", "saudavel"];
let folders = ["home", "user", "jardim"];
let numbers = [1, 2, 3, 4, 5];

// Use join() para juntar
let sentence =
let path =
let csv = `,
    testCases: [
      {
        input: null,
        expectedOutput: {
          sentence: 'Planta bonita e saudavel',
          path: 'home/user/jardim',
          csv: '1,2,3,4,5',
        },
        description: 'Strings juntadas corretamente',
      },
    ],
    hints: [
      'join(" ") junta com espacos',
      'join("/") junta com barras',
      'join(",") junta com virgulas',
    ],
    solution: `let words = ["Planta", "bonita", "e", "saudavel"];
let folders = ["home", "user", "jardim"];
let numbers = [1, 2, 3, 4, 5];

let sentence = words.join(" ");
let path = folders.join("/");
let csv = numbers.join(",");`,
    experienceReward: 10,
  },
  {
    id: 'str-11',
    plantType: 'string',
    difficulty: 2,
    difficultyTier: 'beginner',
    title: 'Metodo includes()',
    description: 'Verifique se uma string contem outra.',
    instructions: `Use includes() para verificar:
- hasRosa: se garden contem "rosa"
- hasOrquidea: se garden contem "orquidea"
- hasCacto: se garden contem "cacto" (case sensitive!)`,
    starterCode: `let garden = "Meu jardim tem rosa e tulipa";

// Use includes() para verificar
let hasRosa =
let hasOrquidea =
let hasCacto = `,
    testCases: [
      {
        input: null,
        expectedOutput: { hasRosa: true, hasOrquidea: false, hasCacto: false },
        description: 'Verificacoes de includes corretas',
      },
    ],
    hints: [
      'includes() retorna true ou false',
      'E case sensitive (maiusculas importam)',
      'garden.includes("rosa")',
    ],
    solution: `let garden = "Meu jardim tem rosa e tulipa";

let hasRosa = garden.includes("rosa");
let hasOrquidea = garden.includes("orquidea");
let hasCacto = garden.includes("cacto");`,
    experienceReward: 8,
  },
  {
    id: 'str-12',
    plantType: 'string',
    difficulty: 2,
    difficultyTier: 'beginner',
    title: 'indexOf e lastIndexOf',
    description: 'Encontre a posicao de substrings.',
    instructions: `Encontre posicoes na string:
- firstA: posicao do primeiro "a"
- lastA: posicao do ultimo "a"
- notFound: posicao de "z" (retorna -1 se nao encontrar)`,
    starterCode: `let text = "Abracadabra";

// Encontre as posicoes
let firstA =
let lastA =
let notFound = `,
    testCases: [
      {
        input: null,
        expectedOutput: { firstA: 0, lastA: 10, notFound: -1 },
        description: 'Posicoes encontradas corretamente',
      },
    ],
    hints: [
      'indexOf() encontra a primeira ocorrencia',
      'lastIndexOf() encontra a ultima',
      'Ambos retornam -1 se nao encontrar',
    ],
    solution: `let text = "Abracadabra";

let firstA = text.indexOf("A");
let lastA = text.lastIndexOf("a");
let notFound = text.indexOf("z");`,
    experienceReward: 10,
  },
  {
    id: 'str-13',
    plantType: 'string',
    difficulty: 2,
    difficultyTier: 'beginner',
    title: 'startsWith e endsWith',
    description: 'Verifique inicio e fim de strings.',
    instructions: `Verifique a string filename:
- isImage: se termina com ".jpg"
- isPlant: se comeca com "planta"
- isBackup: se comeca com "backup"`,
    starterCode: `let filename = "planta_rosa.jpg";

// Verifique inicio e fim
let isImage =
let isPlant =
let isBackup = `,
    testCases: [
      {
        input: null,
        expectedOutput: { isImage: true, isPlant: true, isBackup: false },
        description: 'Verificacoes de inicio/fim corretas',
      },
    ],
    hints: [
      'startsWith() verifica o inicio',
      'endsWith() verifica o final',
      'Ambos sao case sensitive',
    ],
    solution: `let filename = "planta_rosa.jpg";

let isImage = filename.endsWith(".jpg");
let isPlant = filename.startsWith("planta");
let isBackup = filename.startsWith("backup");`,
    experienceReward: 8,
  },
  {
    id: 'str-14',
    plantType: 'string',
    difficulty: 2,
    difficultyTier: 'beginner',
    title: 'Metodo replace()',
    description: 'Substitua partes de uma string.',
    instructions: `Use replace() para fazer substituicoes:
- fixed: substitua "murcha" por "saudavel" em status
- updated: substitua "2023" por "2024" em date

Nota: replace() so substitui a primeira ocorrencia.`,
    starterCode: `let status = "A planta esta murcha";
let date = "2023-01-15";

// Use replace()
let fixed =
let updated = `,
    testCases: [
      {
        input: null,
        expectedOutput: {
          fixed: 'A planta esta saudavel',
          updated: '2024-01-15',
        },
        description: 'Substituicoes feitas corretamente',
      },
    ],
    hints: [
      'replace(antigo, novo)',
      'Nao modifica a string original',
      'Retorna uma nova string',
    ],
    solution: `let status = "A planta esta murcha";
let date = "2023-01-15";

let fixed = status.replace("murcha", "saudavel");
let updated = date.replace("2023", "2024");`,
    experienceReward: 10,
  },
  {
    id: 'str-15',
    plantType: 'string',
    difficulty: 2,
    difficultyTier: 'beginner',
    title: 'trim, trimStart, trimEnd',
    description: 'Remova espacos extras de strings.',
    instructions: `Limpe a string input:
- trimmed: remova espacos do inicio E do fim
- trimStart: remova espacos so do inicio
- trimEnd: remova espacos so do fim`,
    starterCode: `let input = "   Rosa Vermelha   ";

// Remova os espacos
let trimmed =
let trimStart =
let trimEnd = `,
    testCases: [
      {
        input: null,
        expectedOutput: {
          trimmed: 'Rosa Vermelha',
          trimStart: 'Rosa Vermelha   ',
          trimEnd: '   Rosa Vermelha',
        },
        description: 'Espacos removidos corretamente',
      },
    ],
    hints: [
      'trim() remove de ambos os lados',
      'trimStart() so do inicio',
      'trimEnd() so do final',
    ],
    solution: `let input = "   Rosa Vermelha   ";

let trimmed = input.trim();
let trimStart = input.trimStart();
let trimEnd = input.trimEnd();`,
    experienceReward: 8,
  },
  {
    id: 'str-16',
    plantType: 'string',
    difficulty: 2,
    difficultyTier: 'beginner',
    title: 'Metodo repeat()',
    description: 'Repita uma string varias vezes.',
    instructions: `Use repeat() para criar padroes:
- border: repita "-" 20 vezes
- pattern: repita "* " 5 vezes
- emphasis: repita "!" 3 vezes`,
    starterCode: `// Use repeat() para criar
let border =
let pattern =
let emphasis = `,
    testCases: [
      {
        input: null,
        expectedOutput: {
          border: '--------------------',
          pattern: '* * * * * ',
          emphasis: '!!!',
        },
        description: 'Repeticoes criadas corretamente',
      },
    ],
    hints: [
      'repeat(n) repete a string n vezes',
      '"-".repeat(20) cria 20 hifens',
      'Funciona com qualquer string',
    ],
    solution: `let border = "-".repeat(20);
let pattern = "* ".repeat(5);
let emphasis = "!".repeat(3);`,
    experienceReward: 5,
  },
  {
    id: 'str-17',
    plantType: 'string',
    difficulty: 3,
    difficultyTier: 'practitioner',
    title: 'padStart e padEnd',
    description: 'Adicione padding a strings.',
    instructions: `Formate os valores com padding:
- paddedNum: "42" com padding de zeros a esquerda, total 5 chars ("00042")
- paddedName: "Rosa" com padding de espacos a direita, total 10 chars
- paddedPrice: "9.99" com padding de espacos a esquerda, total 8 chars`,
    starterCode: `let num = "42";
let name = "Rosa";
let price = "9.99";

// Use padStart e padEnd
let paddedNum =
let paddedName =
let paddedPrice = `,
    testCases: [
      {
        input: null,
        expectedOutput: {
          paddedNum: '00042',
          paddedName: 'Rosa      ',
          paddedPrice: '    9.99',
        },
        description: 'Padding aplicado corretamente',
      },
    ],
    hints: [
      'padStart(tamanho, caractere) adiciona no inicio',
      'padEnd(tamanho, caractere) adiciona no final',
      'Se nao especificar caractere, usa espaco',
    ],
    solution: `let num = "42";
let name = "Rosa";
let price = "9.99";

let paddedNum = num.padStart(5, "0");
let paddedName = name.padEnd(10);
let paddedPrice = price.padStart(8);`,
    experienceReward: 12,
  },
  {
    id: 'str-18',
    plantType: 'string',
    difficulty: 3,
    difficultyTier: 'practitioner',
    title: 'Formatador de Nomes de Plantas',
    description: 'Combine metodos para formatar nomes.',
    instructions: `Crie um formatador de nomes de plantas:

Input: "  rosa VERMELHA  "
Output esperado:
- formatted: "Rosa Vermelha" (capitalizado corretamente)
- slug: "rosa-vermelha" (minusculas, espacos viram hifens)
- code: "ROSA_VERMELHA" (maiusculas, espacos viram underscores)

Dica: Voce precisara combinar varios metodos.`,
    starterCode: `let input = "  rosa VERMELHA  ";

// Formate o nome
let formatted =
let slug =
let code = `,
    testCases: [
      {
        input: null,
        expectedOutput: {
          formatted: 'Rosa Vermelha',
          slug: 'rosa-vermelha',
          code: 'ROSA_VERMELHA',
        },
        description: 'Todas as formatacoes corretas',
      },
    ],
    hints: [
      'Comece com trim() para remover espacos',
      'Para capitalizar: primeira letra upper + resto lower',
      'split() + map() + join() pode ajudar no formatted',
      'replace() com toLowerCase() para slug',
    ],
    solution: `let input = "  rosa VERMELHA  ";

let clean = input.trim();
let words = clean.split(" ");
let formatted = words.map(word =>
  word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
).join(" ");
let slug = clean.toLowerCase().replace(" ", "-");
let code = clean.toUpperCase().replace(" ", "_");`,
    experienceReward: 25,
  },
];

export const getStringChallengeById = (id: string): ChallengeDefinition | undefined => {
  return stringChallenges.find((challenge) => challenge.id === id);
};
