package com.masiloic.cybedu.data.repositoriesImpl

import com.masiloic.cybedu.domain.models.Article
import com.masiloic.cybedu.domain.repositories.ArticleRepository

class ArticleRepositoryImpl : ArticleRepository {

    override fun getArticles(): List<Article> {
        return mockArticleList
    }

    override fun getArticleById(id: Int): Article {
        return mockArticleList.find { it.id == id } ?: throw IllegalArgumentException("Article not found")
    }
}

val mockArticleList = listOf(
    Article(
        id = 1,
        title = "Comprendre le phishing",
        description = "Un aperçu clair des techniques utilisées dans les attaques de phishing, avec des exemples concrets et les meilleures pratiques pour s'en protéger.",
        content = """
Le phishing est aujourd’hui l’une des techniques les plus utilisées par les cybercriminels pour tromper les utilisateurs. 
Le principe est simple : pousser la victime à cliquer sur un lien, télécharger une pièce jointe ou communiquer des informations sensibles.

Les hackers jouent souvent sur l’urgence ou l’émotion : faux emails de livraison, messages bancaires alarmants, faux remboursements, etc.
Pour s’en protéger, il est important de vérifier l’expéditeur, l’URL derrière les liens, et de ne jamais fournir d’informations sensibles sans vérifier la source. 
L’authentification à deux facteurs reste également une défense essentielle.
""",
        resource = "https://example.com/phishing-guide"
    ),
    Article(
        id = 2,
        title = "Sécuriser son mot de passe",
        description = "Pourquoi utiliser un mot de passe complexe ? Cet article explique les risques liés aux mots de passe faibles et propose des méthodes pour les renforcer.",
        content = """
Les mots de passe simples ou réutilisés sont la cause de milliers de comptes compromis chaque jour. 
Un bon mot de passe doit être long, unique et imprévisible. 
L'utilisation d'une phrase secrète est aujourd’hui recommandée : plus facile à retenir, mais beaucoup plus difficile à casser.

Les gestionnaires de mots de passe sont également une excellente solution pour conserver des identifiants uniques sans avoir à tous les mémoriser.
Enfin, activer l’authentification multifactorielle réduit drastiquement les risques d’intrusion, même en cas de fuite d’un mot de passe.
""",
        resource = "https://example.com/password-security"
    ),
    Article(
        id = 3,
        title = "Les malwares en 2025",
        description = "Un panorama des menaces actuelles : ransomware, spyware, trojans, et leurs vecteurs d’attaque principaux.",
        content = """
Les malwares ont évolué rapidement ces dernières années, devenant plus furtifs et plus automatisés. 
Les ransomwares ciblent désormais des entreprises de toutes tailles grâce à des attaques opportunistes.
Les spywares se dissimulent dans des applications ou extensions douteuses pour récolter des données personnelles.

Les principaux vecteurs restent les emails piégés, les téléchargements illégitimes, les clés USB infectées et les failles dans les logiciels non mis à jour.
La prévention repose sur la vigilance, les mises à jour régulières et l’utilisation d’antivirus fiables.
""",
        resource = "https://example.com/malware-2025"
    ),
    Article(
        id = 4,
        title = "VPN : utile ou non ?",
        description = "Détails sur l’usage d’un VPN, ses avantages en matière de confidentialité et ses limites.",
        content = """
Un VPN crée un tunnel chiffré entre votre appareil et un serveur distant, ce qui rend difficile l'interception de vos données. 
C'est particulièrement utile sur les réseaux Wi-Fi publics, où les attaquants peuvent espionner les communications.

Cependant, un VPN ne rend pas anonyme à 100 %, ne protège pas des malwares et ne compense pas des mauvaises pratiques. 
Il doit être considéré comme un outil de confidentialité, et non comme une solution de sécurité complète.
""",
        resource = "https://example.com/vpn-usage"
    ),
    Article(
        id = 5,
        title = "Sécurité mobile",
        description = "Comment protéger son smartphone contre les applications malveillantes, le vol et les fuites de données.",
        content = """
Les smartphones contiennent aujourd’hui plus d’informations personnelles qu’un ordinateur. 
Installer des applications depuis des sources douteuses, accéder à des Wi-Fi publics ou ne pas verrouiller son téléphone expose à des risques importants.

Pour se protéger :
- installer uniquement depuis les stores officiels,
- activer le code, la biométrie et le chiffrement,
- éviter les permissions excessives,
- garder le système à jour.

La sauvegarde régulière et l’activation du service de localisation peuvent également sauver la mise en cas de vol.
""",
        resource = "https://example.com/mobile-security"
    ),
    Article(
        id = 6,
        title = "Reconnaître un faux site",
        description = "Techniques simples pour identifier un site frauduleux, grâce à l’analyse de l’URL, du certificat SSL et de la mise en page.",
        content = """
Les faux sites imitent presque parfaitement les sites légitimes pour voler identifiants et informations bancaires. 
Pour les repérer, il faut analyser :
- l’URL exacte et ses variations subtiles,
- la présence d’un certificat valide (cadenas),
- la qualité de la mise en page,
- les fautes d’orthographe,
- les demandes inhabituelles d’informations.

Si un site demande trop d'informations trop vite, c’est généralement mauvais signe.
""",
        resource = "https://example.com/fake-website-detection"
    ),
    Article(
        id = 7,
        title = "L’ingénierie sociale",
        description = "Comprendre les manipulations psychologiques utilisées par les cybercriminels pour obtenir des informations.",
        content = """
L’ingénierie sociale repose sur la manipulation. 
Plutôt que d’attaquer un système informatique, les cybercriminels attaquent les humains : 
appels téléphoniques, usurpation d’identité, faux techniciens, messages pressants...

L’objectif est d’amener la victime à agir sans réfléchir. 
Pour s’en protéger, il faut adopter un réflexe simple : *vérifier systématiquement*. 
Un collègue peut-il prouver son identité ?  
Une demande inhabituelle semble-elle logique ?  
Ne jamais céder à la pression ou à l’urgence.
""",
        resource = "https://example.com/social-engineering"
    ),
    Article(
        id = 8,
        title = "Les cyberattaques les plus courantes",
        description = "Un top des attaques les plus répandues : DDoS, phishing, injection SQL, malware…",
        content = """
Chaque année, les attaques évoluent, mais certaines restent incontournables. 
Les DDoS visent à rendre un service indisponible. 
Les injections SQL exploitent des failles dans les formulaires web. 
Les malwares pénètrent via des fichiers infectés.

Comprendre ces attaques permet de mieux les prévenir, notamment grâce aux mises à jour, aux filtres anti-spam, à l’analyse des entrées utilisateurs et à des sauvegardes régulières.
""",
        resource = "https://example.com/common-attacks"
    ),
    Article(
        id = 9,
        title = "Sécuriser son réseau Wi-Fi",
        description = "Astuce pour éviter les intrusions dans son réseau personnel : chiffrement WPA3, filtrage MAC, gestion du routeur.",
        content = """
Le Wi-Fi est souvent la première porte d’entrée pour un attaquant. 
Utiliser un chiffrement WPA3, modifier le mot de passe par défaut du routeur et désactiver le WPS sont des mesures essentielles.

Le filtrage MAC et la segmentation du réseau peuvent ajouter un niveau de sécurité supplémentaire, notamment pour les objets connectés souvent vulnérables.
""",
        resource = "https://example.com/secure-wifi"
    ),
    Article(
        id = 10,
        title = "RGPD : ce que vous devez savoir",
        description = "Les bases du Règlement Général sur la Protection des Données expliquées simplement.",
        content = """
Le RGPD encadre la collecte, le stockage et l’utilisation des données personnelles. 
Chaque personne a des droits : accès, rectification, effacement et portabilité. 
Les entreprises ont des obligations strictes : informer clairement, sécuriser les données, documenter leurs traitements.

Comprendre le RGPD permet aux utilisateurs de maîtriser leur vie numérique, et aux entreprises de respecter la loi.
""",
        resource = "https://example.com/rgpd-basics"
    ),
    Article(
        id = 11,
        title = "Sauvegardes et restauration",
        description = "Pourquoi et comment effectuer des sauvegardes régulières pour éviter la perte de données.",
        content = """
Une sauvegarde régulière protège de la perte de données due à un accident, un vol ou une attaque ransomware. 
Elle peut être locale (disque dur) ou en ligne (cloud). 
Une bonne règle est la stratégie 3-2-1 :  
3 copies,  
2 supports différents,  
1 hors ligne.

Tester régulièrement la restauration est tout aussi important que sauvegarder.
""",
        resource = "https://example.com/backup-guide"
    ),
    Article(
        id = 12,
        title = "Comprendre le ransomware",
        description = "Le fonctionnement d’un ransomware, les risques encourus et comment s'en prémunir efficacement.",
        content = """
Les ransomwares chiffrent vos fichiers et exigent une rançon pour les récupérer. 
Ils se propagent via des emails frauduleux, des sites compromis ou des logiciels piratés.

Pour s’en protéger :
- faire des sauvegardes régulières,
- éviter les pièces jointes suspectes,
- maintenir le système à jour,
- limiter les droits utilisateurs.

Payer ne garantit **jamais** le déchiffrement.
""",
        resource = "https://example.com/ransomware"
    ),
    Article(
        id = 13,
        title = "Sécurité dans le cloud",
        description = "Les bonnes pratiques pour stocker ses données dans le cloud sans risque.",
        content = """
Le cloud est pratique, mais il faut respecter certaines règles : 
choisir un fournisseur fiable, activer le chiffrement, limiter les partages et surveiller les accès.

Beaucoup oublient que le cloud n’est pas une sauvegarde : si vous supprimez un fichier, il peut disparaître partout. 
Activer l’historique des versions est donc essentiel.
""",
        resource = "https://example.com/cloud-security"
    ),
    Article(
        id = 14,
        title = "Les mises à jour : essentielles",
        description = "Pourquoi il est crucial de maintenir ses logiciels, OS et applications à jour.",
        content = """
Les mises à jour corrigent des failles que les cybercriminels exploitent activement. 
Repousser ces mises à jour laisse une porte ouverte. 
Les attaques ‘zero-day’ sont particulièrement dangereuses car elles exploitent des vulnérabilités encore inconnues.

Activer les mises à jour automatiques est l’un des gestes les plus simples mais les plus efficaces en cybersécurité.
""",
        resource = "https://example.com/updates-importance"
    ),
    Article(
        id = 15,
        title = "Cybersécurité au travail",
        description = "Rôle de chaque employé dans la sécurité informatique et conseils pour éviter les erreurs courantes.",
        content = """
La sécurité en entreprise ne dépend pas uniquement de la DSI : chaque employé joue un rôle. 
Les erreurs courantes incluent le partage de mots de passe, le stockage de données sensibles sur des supports non chiffrés ou encore l’ouverture de pièces jointes douteuses.

Une bonne hygiène numérique, des formations régulières et une communication interne claire renforcent la sécurité globale.
""",
        resource = "https://example.com/workplace-cybersecurity"
    )
)