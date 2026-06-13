package com.masiloic.cybedu.data.repositoriesImpl

import com.masiloic.cybedu.domain.models.Answer
import com.masiloic.cybedu.domain.models.Question
import com.masiloic.cybedu.domain.models.Quiz
import com.masiloic.cybedu.domain.repositories.QuizRepository

class QuizRepositoryImpl : QuizRepository {
    override fun getQuizById(id: Int): Quiz {
        return mockQuiz.find { it.id == id} ?: throw IllegalArgumentException("Quiz not found")
    }
}

val mockQuiz = listOf<Quiz>(
    Quiz(
        id = 1,
        questions = listOf(
            Question(
                id = 1,
                questionText = "Quel est l’objectif principal d’une attaque de phishing ?",
                answers = listOf(
                    Answer(1, "Tromper la victime pour obtenir des informations sensibles"),
                    Answer(2, "Surcharger un serveur pour le rendre indisponible")
                ),
                correctAnswerId = 1
            ),
            Question(
                id = 2,
                questionText = "Quel réflexe aide à détecter un email de phishing ?",
                answers = listOf(
                    Answer(1, "Vérifier l'expéditeur et l'URL derrière les liens"),
                    Answer(2, "Ouvrir la pièce jointe pour vérifier son contenu")
                ),
                correctAnswerId = 1
            ),
            Question(
                id = 3,
                questionText = "Quel outil renforce la protection contre le phishing ?",
                answers = listOf(
                    Answer(1, "Un VPN"),
                    Answer(2, "L’authentification à deux facteurs")
                ),
                correctAnswerId = 2
            )
        )
    ),

    Quiz(
        id = 2,
        questions = listOf(
            Question(
                id = 4,
                questionText = "Quel est un risque majeur d’un mot de passe faible ?",
                answers = listOf(
                    Answer(1, "La compromission d’un compte"),
                    Answer(2, "Une baisse des performances du système")
                ),
                correctAnswerId = 1
            ),
            Question(
                id = 5,
                questionText = "Quelle méthode est recommandée pour créer un mot de passe robuste ?",
                answers = listOf(
                    Answer(1, "Utiliser une phrase secrète"),
                    Answer(2, "Utiliser son prénom et sa date de naissance")
                ),
                correctAnswerId = 1
            ),
            Question(
                id = 6,
                questionText = "Quel outil aide à gérer plusieurs mots de passe uniques ?",
                answers = listOf(
                    Answer(1, "Un gestionnaire de mots de passe"),
                    Answer(2, "Un navigateur web")
                ),
                correctAnswerId = 1
            )
        )
    ),

    Quiz(
        id = 3,
        questions = listOf(
            Question(
                id = 7,
                questionText = "Quel type de malware chiffre les données pour demander une rançon ?",
                answers = listOf(
                    Answer(1, "Spyware"),
                    Answer(2, "Ransomware")
                ),
                correctAnswerId = 2
            ),
            Question(
                id = 8,
                questionText = "Quel vecteur d’infection est courant pour les malwares ?",
                answers = listOf(
                    Answer(1, "Emails piégés"),
                    Answer(2, "Mises à jour automatiques")
                ),
                correctAnswerId = 1
            ),
            Question(
                id = 9,
                questionText = "Quel moyen aide à se protéger contre les malwares ?",
                answers = listOf(
                    Answer(1, "Installer un antivirus"),
                    Answer(2, "Ignorer les mises à jour")
                ),
                correctAnswerId = 1
            )
        )
    ),

    Quiz(
        id = 4,
        questions = listOf(
            Question(
                id = 10,
                questionText = "À quoi sert principalement un VPN ?",
                answers = listOf(
                    Answer(1, "Chiffrer la connexion internet"),
                    Answer(2, "Bloquer les virus")
                ),
                correctAnswerId = 1
            ),
            Question(
                id = 11,
                questionText = "Dans quel contexte un VPN est-il particulièrement utile ?",
                answers = listOf(
                    Answer(1, "Sur un réseau Wi-Fi public"),
                    Answer(2, "Lors de l’installation d’applications")
                ),
                correctAnswerId = 1
            ),
            Question(
                id = 12,
                questionText = "Que ne garantit PAS un VPN ?",
                answers = listOf(
                    Answer(1, "L'anonymat total"),
                    Answer(2, "Une connexion chiffrée")
                ),
                correctAnswerId = 1
            )
        )
    ),

    Quiz(
        id = 5,
        questions = listOf(
            Question(
                id = 13,
                questionText = "Quel est un risque courant sur smartphone ?",
                answers = listOf(
                    Answer(1, "Installer des applications depuis des sources douteuses"),
                    Answer(2, "Utiliser le mode avion")
                ),
                correctAnswerId = 1
            ),
            Question(
                id = 14,
                questionText = "Quelle bonne pratique améliore la sécurité mobile ?",
                answers = listOf(
                    Answer(1, "Activer le chiffrement et la biométrie"),
                    Answer(2, "Désactiver le code de verrouillage")
                ),
                correctAnswerId = 1
            ),
            Question(
                id = 15,
                questionText = "Quel outil peut aider en cas de vol ?",
                answers = listOf(
                    Answer(1, "La localisation du téléphone"),
                    Answer(2, "Le mode silencieux")
                ),
                correctAnswerId = 1
            )
        )
    ),

    Quiz(
        id = 6,
        questions = listOf(
            Question(
                id = 16,
                questionText = "Quelle est une caractéristique d’un faux site ?",
                answers = listOf(
                    Answer(1, "Une URL légèrement modifiée"),
                    Answer(2, "Un certificat SSL toujours valide")
                ),
                correctAnswerId = 1
            ),
            Question(
                id = 17,
                questionText = "Quel signe peut révéler un site frauduleux ?",
                answers = listOf(
                    Answer(1, "Des fautes d’orthographe"),
                    Answer(2, "Un design professionnel")
                ),
                correctAnswerId = 1
            ),
            Question(
                id = 18,
                questionText = "Quel comportement est suspect sur un site ?",
                answers = listOf(
                    Answer(1, "Demander beaucoup d’informations rapidement"),
                    Answer(2, "Afficher un cadenas SSL")
                ),
                correctAnswerId = 1
            )
        )
    ),

    Quiz(
        id = 7,
        questions = listOf(
            Question(
                id = 19,
                questionText = "Sur quoi repose l’ingénierie sociale ?",
                answers = listOf(
                    Answer(1, "La manipulation psychologique"),
                    Answer(2, "Le piratage de serveurs")
                ),
                correctAnswerId = 1
            ),
            Question(
                id = 20,
                questionText = "Quel est un exemple d’ingénierie sociale ?",
                answers = listOf(
                    Answer(1, "Un faux technicien qui appelle"),
                    Answer(2, "Une mise à jour logicielle")
                ),
                correctAnswerId = 1
            ),
            Question(
                id = 21,
                questionText = "Quel réflexe est recommandé pour s’en protéger ?",
                answers = listOf(
                    Answer(1, "Vérifier systématiquement l’identité"),
                    Answer(2, "Répondre rapidement pour éviter un problème")
                ),
                correctAnswerId = 1
            )
        )
    ),

    Quiz(
        id = 8,
        questions = listOf(
            Question(
                id = 22,
                questionText = "Quel type d'attaque vise à rendre un service indisponible ?",
                answers = listOf(
                    Answer(1, "DDoS"),
                    Answer(2, "Injection SQL")
                ),
                correctAnswerId = 1
            ),
            Question(
                id = 23,
                questionText = "Quel type d'attaque exploite des failles dans les formulaires web ?",
                answers = listOf(
                    Answer(1, "Phishing"),
                    Answer(2, "Injection SQL")
                ),
                correctAnswerId = 2
            ),
            Question(
                id = 24,
                questionText = "Comment prévenir les attaques courantes ?",
                answers = listOf(
                    Answer(1, "En maintenant les systèmes à jour"),
                    Answer(2, "En désactivant l’antivirus")
                ),
                correctAnswerId = 1
            )
        )
    ),

    Quiz(
        id = 9,
        questions = listOf(
            Question(
                id = 25,
                questionText = "Quel chiffrement est recommandé pour un réseau Wi-Fi ?",
                answers = listOf(
                    Answer(1, "WPA3"),
                    Answer(2, "WEP")
                ),
                correctAnswerId = 1
            ),
            Question(
                id = 26,
                questionText = "Quel réglage doit être désactivé pour plus de sécurité ?",
                answers = listOf(
                    Answer(1, "Le WPS"),
                    Answer(2, "Le WPA3")
                ),
                correctAnswerId = 1
            ),
            Question(
                id = 27,
                questionText = "Pourquoi segmenter un réseau ?",
                answers = listOf(
                    Answer(1, "Pour isoler les objets connectés vulnérables"),
                    Answer(2, "Pour augmenter la vitesse du Wi-Fi")
                ),
                correctAnswerId = 1
            )
        )
    ),

    Quiz(
        id = 10,
        questions = listOf(
            Question(
                id = 28,
                questionText = "Quel droit est garanti par le RGPD ?",
                answers = listOf(
                    Answer(1, "Le droit d’accès aux données"),
                    Answer(2, "Le droit de supprimer des logiciels")
                ),
                correctAnswerId = 1
            ),
            Question(
                id = 29,
                questionText = "Quelle obligation incombe aux entreprises ?",
                answers = listOf(
                    Answer(1, "Informer clairement les utilisateurs"),
                    Answer(2, "Partager les données avec des partenaires")
                ),
                correctAnswerId = 1
            ),
            Question(
                id = 30,
                questionText = "À quoi sert le RGPD ?",
                answers = listOf(
                    Answer(1, "Protéger les données personnelles"),
                    Answer(2, "Améliorer les performances réseaux")
                ),
                correctAnswerId = 1
            )
        )
    ),

    Quiz(
        id = 11,
        questions = listOf(
            Question(
                id = 31,
                questionText = "À quoi sert une sauvegarde régulière ?",
                answers = listOf(
                    Answer(1, "Protéger contre la perte de données"),
                    Answer(2, "Augmenter la mémoire RAM")
                ),
                correctAnswerId = 1
            ),
            Question(
                id = 32,
                questionText = "Quelle est la règle 3-2-1 ?",
                answers = listOf(
                    Answer(1, "3 copies, 2 supports, 1 hors ligne"),
                    Answer(2, "3 mots de passe, 2 comptes, 1 antivirus")
                ),
                correctAnswerId = 1
            ),
            Question(
                id = 33,
                questionText = "Que faut-il tester régulièrement ?",
                answers = listOf(
                    Answer(1, "La restauration des sauvegardes"),
                    Answer(2, "Les performances graphiques")
                ),
                correctAnswerId = 1
            )
        )
    ),

    Quiz(
        id = 12,
        questions = listOf(
            Question(
                id = 34,
                questionText = "Qu’est-ce qu’un ransomware fait ?",
                answers = listOf(
                    Answer(1, "Il chiffre les fichiers"),
                    Answer(2, "Il accélère le système")
                ),
                correctAnswerId = 1
            ),
            Question(
                id = 35,
                questionText = "Quel comportement réduit les risques ?",
                answers = listOf(
                    Answer(1, "Éviter les pièces jointes suspectes"),
                    Answer(2, "Désactiver les sauvegardes")
                ),
                correctAnswerId = 1
            ),
            Question(
                id = 36,
                questionText = "Payer une rançon garantit-il la récupération des données ?",
                answers = listOf(
                    Answer(1, "Oui"),
                    Answer(2, "Non")
                ),
                correctAnswerId = 2
            )
        )
    ),

    Quiz(
        id = 13,
        questions = listOf(
            Question(
                id = 37,
                questionText = "Quelle précaution est essentielle avec le cloud ?",
                answers = listOf(
                    Answer(1, "Activer le chiffrement"),
                    Answer(2, "Partager tous les fichiers")
                ),
                correctAnswerId = 1
            ),
            Question(
                id = 38,
                questionText = "Que beaucoup d’utilisateurs oublient-ils ?",
                answers = listOf(
                    Answer(1, "Le cloud n’est pas une sauvegarde"),
                    Answer(2, "Le cloud accélère l’ordinateur")
                ),
                correctAnswerId = 1
            ),
            Question(
                id = 39,
                questionText = "Quel réglage aide à récupérer des fichiers supprimés ?",
                answers = listOf(
                    Answer(1, "L’historique des versions"),
                    Answer(2, "Le mode sombre")
                ),
                correctAnswerId = 1
            )
        )
    ),

    Quiz(
        id = 14,
        questions = listOf(
            Question(
                id = 40,
                questionText = "À quoi servent les mises à jour ?",
                answers = listOf(
                    Answer(1, "Corriger des failles de sécurité"),
                    Answer(2, "Augmenter le volume sonore")
                ),
                correctAnswerId = 1
            ),
            Question(
                id = 41,
                questionText = "Quel type d’attaque exploite des failles inconnues ?",
                answers = listOf(
                    Answer(1, "Zero-day"),
                    Answer(2, "Phishing")
                ),
                correctAnswerId = 1
            ),
            Question(
                id = 42,
                questionText = "Quelle action est recommandée ?",
                answers = listOf(
                    Answer(1, "Activer les mises à jour automatiques"),
                    Answer(2, "Les repousser régulièrement")
                ),
                correctAnswerId = 1
            )
        )
    ),

    Quiz(
        id = 15,
        questions = listOf(
            Question(
                id = 43,
                questionText = "Qui est responsable de la cybersécurité en entreprise ?",
                answers = listOf(
                    Answer(1, "Tous les employés"),
                    Answer(2, "Uniquement la DSI")
                ),
                correctAnswerId = 1
            ),
            Question(
                id = 44,
                questionText = "Quelle erreur courante fragilise une entreprise ?",
                answers = listOf(
                    Answer(1, "Partager des mots de passe"),
                    Answer(2, "Utiliser un VPN")
                ),
                correctAnswerId = 1
            ),
            Question(
                id = 45,
                questionText = "Quel moyen renforce la sécurité globale ?",
                answers = listOf(
                    Answer(1, "Des formations régulières"),
                    Answer(2, "Ignorer les consignes internes")
                ),
                correctAnswerId = 1
            )
        )
    )
)
