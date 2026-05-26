import { AppDataSource } from "./database/data-source.js";
import { Role } from "./modules/roles/role.entity.js";
import { User } from "./modules/users/user.entity.js";
import { Article } from "./modules/articles/article.entity.js";
import { Quiz } from "./modules/quiz/quiz.entity.js";
import { Question } from "./modules/questions/question.entity.js";
import { Answer } from "./modules/answers/answer.entity.js";
import { UserQuiz } from "./modules/user_quiz/userQuiz.entity.js";
import { UserAnswer } from "./modules/user_answers/userAnswser.entity.js";
import bcrypt from "bcrypt";

type AnswerSeed = {
  text: string;
  isCorrect: boolean;
};

type QuestionSeed = {
  text: string;
  answers: AnswerSeed[];
};

type QuizSeedDefinition = {
  slug: string;
  article: {
    title: string;
    content: string;
  };
  quiz: {
    title: string;
    questions: QuestionSeed[];
  };
};

type SavedQuizReference = {
  quiz: Quiz;
  questions: {
    question: Question;
    answers: Answer[];
  }[];
};

type QuizSimulation = {
  user: User;
  quizSlug: string;
  picks: number[];
  description: string;
};

async function seed() {
  await AppDataSource.initialize();
  console.log("[seed] Database connected");

  const roleRepo = AppDataSource.getRepository(Role);
  const userRepo = AppDataSource.getRepository(User);
  const articleRepo = AppDataSource.getRepository(Article);
  const quizRepo = AppDataSource.getRepository(Quiz);
  const questionRepo = AppDataSource.getRepository(Question);
  const answerRepo = AppDataSource.getRepository(Answer);
  const userQuizRepo = AppDataSource.getRepository(UserQuiz);
  const userAnswerRepo = AppDataSource.getRepository(UserAnswer);

  await AppDataSource.synchronize(true);
  console.log("[seed] Database cleaned");

  const adminRole = roleRepo.create({ name: "admin" });
  const userRole = roleRepo.create({ name: "user" });
  await roleRepo.save([adminRole, userRole]);

  const adminPassword = await bcrypt.hash("admin123", 10);
  const coachPassword = await bcrypt.hash("coach123", 10);
  const learnerPassword = await bcrypt.hash("learner123", 10);

  const admin = userRepo.create({
    email: "admin@example.com",
    password: adminPassword,
    roles: [adminRole],
  });
  const coach = userRepo.create({
    email: "coach@example.com",
    password: coachPassword,
    roles: [userRole],
  });
  const learner = userRepo.create({
    email: "learner@example.com",
    password: learnerPassword,
    roles: [userRole],
  });

  await userRepo.save([admin, coach, learner]);
  console.log("[seed] Users and roles created");

  const trainingContent: QuizSeedDefinition[] = [
    {
      slug: "phishing-basics",
      article: {
        title: "Identifier un email de phishing",
        content:
          "Ce guide explique comment reconnaitre un message frauduleux a partir de l'expediteur, des liens suspects et du ton employe.\n\nPartagez cet article avec les nouveaux collaborateurs et encouragez-les a signaler tout email douteux.",
      },
      quiz: {
        title: "Quiz - Scenario phishing",
        questions: [
          {
            text: "Quel est un signe courant d'un email de phishing ?",
            answers: [
              {
                text: "Une adresse d'expediteur similaire mais incorrecte par rapport au domaine officiel",
                isCorrect: true,
              },
              {
                text: "Une invitation interne a un afterwork prevu",
                isCorrect: false,
              },
              {
                text: "Un email attendu du service comptable",
                isCorrect: false,
              },
            ],
          },
          {
            text: "Que faire quand un lien parait suspect dans un message ?",
            answers: [
              {
                text: "Survoler le lien pour verifier l'URL avant de cliquer",
                isCorrect: true,
              },
              {
                text: "Cliquer rapidement depuis son telephone personnel",
                isCorrect: false,
              },
              {
                text: "Transmettre le message a toute l'equipe",
                isCorrect: false,
              },
            ],
          },
          {
            text: "Pourquoi limiter les informations personnelles publiees en ligne ?",
            answers: [
              {
                text: "Pour eviter que des attaquants reutilisent ces donnees dans l'ingenierie sociale",
                isCorrect: true,
              },
              {
                text: "Parce que seule la direction doit connaitre ces details",
                isCorrect: false,
              },
              {
                text: "Cela n'a aucun impact sur la securite",
                isCorrect: false,
              },
            ],
          },
        ],
      },
    },
    {
      slug: "password-basics",
      article: {
        title: "Construire des mots de passe solides",
        content:
          "Apprenez comment creer et stocker des mots de passe complexes, quand les renouveler et comment expliquer ces bonnes pratiques aux equipes.",
      },
      quiz: {
        title: "Quiz - Mots de passe",
        questions: [
          {
            text: "Quel mot de passe est le plus robuste ?",
            answers: [
              {
                text: "Une phrase aleatoire de 16 caracteres avec lettres, chiffres et symboles",
                isCorrect: true,
              },
              {
                text: "Le prenom de son enfant suivi de 123",
                isCorrect: false,
              },
              {
                text: "Sa date de naissance",
                isCorrect: false,
              },
            ],
          },
          {
            text: "Quel est l'interet d'un gestionnaire de mots de passe ?",
            answers: [
              {
                text: "Il enregistre les codes dans un document partage",
                isCorrect: false,
              },
              {
                text: "Il genere et stocke des secrets uniques dans un coffre chiffre",
                isCorrect: true,
              },
              {
                text: "Il permet de partager un compte par email",
                isCorrect: false,
              },
            ],
          },
          {
            text: "Pourquoi activer l'authentification multifacteur ?",
            answers: [
              {
                text: "Pour ajouter une verification meme si le mot de passe est compromis",
                isCorrect: true,
              },
              {
                text: "Pour ne plus avoir a changer ses mots de passe",
                isCorrect: false,
              },
              {
                text: "Pour pouvoir reutiliser le meme code partout",
                isCorrect: false,
              },
            ],
          },
        ],
      },
    },
    {
      slug: "incident-response",
      article: {
        title: "Reagir face a un incident",
        content:
          "Cette fiche rappelle les bons reflexes quand un poste semble infecte ou quand un comportement anormal est detecte sur le reseau.",
      },
      quiz: {
        title: "Quiz - Reponse a incident",
        questions: [
          {
            text: "Quel est le premier reflexe en cas de ransomware sur un poste ?",
            answers: [
              {
                text: "Deconnecter la machine du reseau et prevenir l'equipe securite",
                isCorrect: true,
              },
              {
                text: "Patienter jusqu'a la fin de la journee",
                isCorrect: false,
              },
              {
                text: "Continuer a travailler pour terminer le dossier",
                isCorrect: false,
              },
            ],
          },
          {
            text: "Quel canal utiliser pour signaler un incident critique ?",
            answers: [
              {
                text: "Poster un message sur le canal social de l'entreprise",
                isCorrect: false,
              },
              {
                text: "Utiliser la hotline securite ou l'outil de ticketing dedie",
                isCorrect: true,
              },
              {
                text: "Attendre la prochaine reunion hebdomadaire",
                isCorrect: false,
              },
            ],
          },
          {
            text: "Pourquoi documenter les actions realisees pendant l'incident ?",
            answers: [
              {
                text: "Pour garder une chronologie et faciliter le retour d'experience",
                isCorrect: true,
              },
              {
                text: "Pour pouvoir partager les mots de passe utilises",
                isCorrect: false,
              },
              {
                text: "Cela n'a pas d'utilite une fois le service relance",
                isCorrect: false,
              },
            ],
          },
        ],
      },
    },
  ];

  const createdQuizzes: Record<string, SavedQuizReference> = {};

  for (const content of trainingContent) {
    const savedArticle = await articleRepo.save(
      articleRepo.create(content.article),
    );

    const savedQuiz = await quizRepo.save(
      quizRepo.create({
        title: content.quiz.title,
        article: savedArticle,
      }),
    );

    const questionRefs: SavedQuizReference["questions"] = [];

    for (const questionSeed of content.quiz.questions) {
      const savedQuestion = await questionRepo.save(
        questionRepo.create({
          text: questionSeed.text,
          quiz: savedQuiz,
        }),
      );

      const savedAnswers = await answerRepo.save(
        questionSeed.answers.map((answerSeed) =>
          answerRepo.create({
            text: answerSeed.text,
            isCorrect: answerSeed.isCorrect,
            question: savedQuestion,
          }),
        ),
      );

      questionRefs.push({
        question: savedQuestion,
        answers: savedAnswers,
      });
    }

    createdQuizzes[content.slug] = {
      quiz: savedQuiz,
      questions: questionRefs,
    };

    console.log(
      `[seed] Article "${content.article.title}" et quiz "${content.quiz.title}" ajoutes`,
    );
  }

  const quizSimulations: QuizSimulation[] = [
    {
      user: learner,
      quizSlug: "phishing-basics",
      picks: [0, 0, 0],
      description: "Learner termine le parcours phishing",
    },
    {
      user: coach,
      quizSlug: "password-basics",
      picks: [0, 1, 2],
      description: "Coach teste le quiz mots de passe",
    },
    {
      user: learner,
      quizSlug: "incident-response",
      picks: [0, 1, 0],
      description: "Learner valide la reponse a incident",
    },
  ];

  for (const simulation of quizSimulations) {
    const quizReference = createdQuizzes[simulation.quizSlug];

    if (!quizReference) {
      console.warn(
        `[seed] Quiz ${simulation.quizSlug} introuvable pour la simulation`,
      );
      continue;
    }

    const savedUserQuiz = await userQuizRepo.save(
      userQuizRepo.create({
        user: simulation.user,
        quiz: quizReference.quiz,
      }),
    );

    let correctAnswers = 0;
    let answeredQuestions = 0;
    const storedAnswers: UserAnswer[] = [];

    for (
      let i = 0;
      i < quizReference.questions.length && i < simulation.picks.length;
      i += 1
    ) {
      const questionRef = quizReference.questions[i];
      const selectedAnswer = questionRef.answers[simulation.picks[i]];

      if (!selectedAnswer) {
        continue;
      }

      answeredQuestions += 1;
      if (selectedAnswer.isCorrect) {
        correctAnswers += 1;
      }

      storedAnswers.push(
        userAnswerRepo.create({
          user: simulation.user,
          userQuiz: savedUserQuiz,
          question: questionRef.question,
          answer: selectedAnswer,
        }),
      );
    }

    if (storedAnswers.length > 0) {
      await userAnswerRepo.save(storedAnswers);
    }

    const rawScore =
      answeredQuestions > 0
        ? (correctAnswers / answeredQuestions) * 100
        : 0;

    savedUserQuiz.score = Math.round(rawScore * 100) / 100;
    await userQuizRepo.save(savedUserQuiz);

    console.log(
      `[seed] ${simulation.description}: ${correctAnswers}/${answeredQuestions} -> ${savedUserQuiz.score}%`,
    );
  }

  await AppDataSource.destroy();
  console.log("[seed] Seed termine");
}

seed().catch((err) => {
  console.error(err);
  process.exit(1);
});
