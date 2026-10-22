// Mídias de cada projeto (abertas no modal "Mídias" / "Galeria").
// type: 'video' | 'image'. Textos em { pt, en } seguem o idioma escolhido no site.
const SEM_CONTEXTO = 'assets/projetos/sem-contexto/';

const projectMedia = {
    // A ordem importa: os prints da seção do jogo abrem a galeria pelo índice (data-index).
    semContexto: [
        {
            type: 'image',
            title: { pt: 'Quiosque da Praia', en: 'Beach kiosk' },
            description: { pt: 'Versão 1.0: mesa cheia com 12 jogadores, cartas na mão e água de coco na mesa.', en: 'Version 1.0: a full table of 12 players, cards in hand and coconut water on the table.' },
            path: SEM_CONTEXTO + 'telas/mesa-praia.jpg'
        },
        {
            type: 'image',
            title: { pt: 'Partida no Boteco', en: 'A match at the Boteco' },
            description: { pt: 'A frase da rodada no topo, o placar ao lado e os atalhos de expressão, bebida e petisco.', en: "The round's sentence on top, the scoreboard on the side and the shortcuts for expressions, drinks and snacks." },
            path: SEM_CONTEXTO + 'telas/partida-boteco.jpg'
        },
        {
            type: 'image',
            title: { pt: 'Menu no Pub', en: 'Pub menu' },
            description: { pt: 'Tela inicial: crie uma sala, entre com código ou veja as salas abertas e escolha seu personagem.', en: 'Home screen: create a room, join with a code or browse open rooms, and pick your character.' },
            path: SEM_CONTEXTO + 'telas/menu-pub.jpg'
        },
        {
            type: 'image',
            title: { pt: 'Sala de espera', en: 'Waiting room' },
            description: { pt: 'O anfitrião escolhe bar, modo (Casual ou +18) e rodadas; os amigos entram pelo código, inclusive pelo navegador.', en: 'The host picks the bar, the mode (Casual or 18+) and the rounds; friends join with the code, browser included.' },
            path: SEM_CONTEXTO + 'telas/sala-praia.jpg'
        },
        {
            type: 'image',
            title: { pt: 'Touro com as cartas', en: 'The Bull holding his cards' },
            description: { pt: 'Cada personagem segura a própria mão de cartas durante a rodada.', en: 'Every character holds their own hand of cards during the round.' },
            path: SEM_CONTEXTO + 'telas/touro-cartas.jpg'
        },
        {
            type: 'image',
            title: { pt: 'Protótipo — primeira mesa', en: 'Prototype — first table' },
            description: { pt: 'O começo: bonecos de cápsula, uma mesa e o loop de rodada funcionando contra bots.', en: 'The beginning: capsule characters, a table and the round loop running against bots.' },
            path: SEM_CONTEXTO + 'evolucao/prototipo-1.jpg'
        },
        {
            type: 'image',
            title: { pt: 'Protótipo — mesa grande', en: 'Prototype — long table' },
            description: { pt: 'Testando a mesa para vários jogadores e a mão de cartas de cada um.', en: 'Testing the table for many players and each one’s hand of cards.' },
            path: SEM_CONTEXTO + 'evolucao/prototipo-2.jpg'
        },
        {
            type: 'image',
            title: { pt: 'Protótipo — cartas na mão', en: 'Prototype — cards in hand' },
            description: { pt: 'Primeiras animações dos personagens segurando e jogando cartas.', en: 'First animations of characters holding and playing cards.' },
            path: SEM_CONTEXTO + 'evolucao/prototipo-3.jpg'
        },
        {
            type: 'image',
            title: { pt: 'Protótipo — votação', en: 'Prototype — voting' },
            description: { pt: 'Pergunta no centro, respostas na mesa e placar: a regra completa já funcionava.', en: 'Question in the middle, answers on the table and a scoreboard: the full ruleset already worked.' },
            path: SEM_CONTEXTO + 'evolucao/prototipo-4.jpg'
        },
        {
            type: 'image',
            title: { pt: 'Primeiro Boteco — sala', en: 'First Boteco — room' },
            description: { pt: 'Primeiro cenário e interface própria, ainda com os “bichinhos” coloridos.', en: 'First scene and custom interface, still with the colorful placeholder critters.' },
            path: SEM_CONTEXTO + 'evolucao/boteco-sala.jpg'
        },
        {
            type: 'image',
            title: { pt: 'Primeiro Boteco — votação', en: 'First Boteco — voting' },
            description: { pt: 'Rodada bônus, cronômetro, placar e as cartas de resposta na tela.', en: 'Bonus round, timer, scoreboard and answer cards on screen.' },
            path: SEM_CONTEXTO + 'evolucao/boteco-votacao.jpg'
        },
        {
            type: 'image',
            title: { pt: 'Menu no editor', en: 'Menu in the editor' },
            description: { pt: 'O menu principal tomando forma dentro da Unity, ainda testando contra o servidor local.', en: 'The main menu taking shape inside Unity, still testing against the local server.' },
            path: SEM_CONTEXTO + 'evolucao/boteco-menu.jpg'
        },
        {
            type: 'video',
            title: { pt: 'Bastidores no editor', en: 'Behind the scenes in the editor' },
            description: { pt: 'Uma partida rodando na Unity na fase de transição: os bichinhos antigos dividindo a mesa com os novos personagens 3D.', en: 'A match running in Unity during the transition: the old critters sharing the table with the new 3D characters.' },
            path: SEM_CONTEXTO + 'video/bastidores-editor.mp4',
            thumbnail: SEM_CONTEXTO + 'video/bastidores-editor.jpg'
        },
        {
            type: 'image',
            title: { pt: 'O Pub com a turma completa', en: 'The Pub with the full crew' },
            description: { pt: 'Os 12 personagens procedurais à mesa, vistos pela câmera de cena da Unity.', en: 'All 12 procedural characters at the table, seen from the Unity scene camera.' },
            path: SEM_CONTEXTO + 'evolucao/pub-editor.jpg'
        }
    ],
    hextech: [
        {
            type: 'video',
            title: { pt: 'Apresentação do site', en: 'Website walkthrough' },
            description: { pt: 'Visão geral completa do site institucional da Hextech Solutions.', en: 'Complete overview of the Hextech Solutions institutional website.' },
            path: 'assets/projetos/hextech/HexTech.mp4',
            thumbnail: 'assets/projetos/hextech/baner.png'
        }
    ],
    karaoke: [
        {
            type: 'video',
            title: { pt: 'Demonstração do Karaoke', en: 'Karaoke demo' },
            description: { pt: 'Visão geral do sistema de karaokê online.', en: 'Overview of the online karaoke system.' },
            path: 'assets/projetos/karaoke/apresentacao.mp4',
            thumbnail: 'assets/projetos/karaoke/baner.png'
        },
        {
            type: 'video',
            title: { pt: 'Outra demonstração', en: 'Another demo' },
            description: { pt: 'Outra apresentação do sistema.', en: 'Another walkthrough of the system.' },
            path: 'assets/projetos/karaoke/apresentacao2.mp4',
            thumbnail: 'assets/projetos/karaoke/baner.png'
        }
    ],
    corporativos: [
        {
            type: 'image',
            title: { pt: 'Tech Health', en: 'Tech Health' },
            description: { pt: 'Sistema de automação para saúde.', en: 'Healthcare automation system.' },
            path: 'assets/projetos/corporativos/TechHealth/Dashboard.png'
        },
        {
            type: 'image',
            title: { pt: 'Assinatura de e-mail — Tela principal', en: 'Email signature — Main screen' },
            description: { pt: 'Interface principal do sistema de geração de assinaturas de e-mail.', en: 'Main interface of the email signature generator.' },
            path: 'assets/projetos/corporativos/Assinatura/Assinatura.png'
        },
        {
            type: 'image',
            title: { pt: 'Assinatura de e-mail — Visualização', en: 'Email signature — Preview' },
            description: { pt: 'Visualização da assinatura gerada.', en: 'Preview of the generated signature.' },
            path: 'assets/projetos/corporativos/Assinatura/AssinaturaView.png'
        }
    ],
    agendaClinica: [
        {
            type: 'video',
            title: { pt: 'Demonstração da Agenda Clínica', en: 'Clinic Scheduler demo' },
            description: { pt: 'Visão geral do sistema de agendamento de consultas clínicas.', en: 'Overview of the clinic appointment booking system.' },
            path: 'assets/projetos/agendaClinica/apresentacao.mp4',
            thumbnail: 'assets/projetos/agendaClinica/baner.png'
        }
    ]
};
