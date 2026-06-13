package com.masiloic.cybedu

import android.os.Bundle
import androidx.activity.ComponentActivity
import androidx.activity.compose.setContent
import androidx.activity.enableEdgeToEdge
import androidx.compose.foundation.background
import androidx.compose.ui.Modifier
import androidx.compose.ui.res.colorResource
import androidx.navigation.compose.NavHost
import androidx.navigation.compose.composable
import androidx.navigation.compose.rememberNavController
import androidx.navigation.toRoute
import com.masiloic.cybedu.ui.features.article.ArticleScreen
import com.masiloic.cybedu.ui.features.article_list.ArticleListScreen
import com.masiloic.cybedu.ui.features.connection.ConnectionScreen
import com.masiloic.cybedu.ui.features.login.LoginScreen
import com.masiloic.cybedu.ui.features.profile.ProfileScreen
import com.masiloic.cybedu.ui.features.quiz.EndQuizScreen
import com.masiloic.cybedu.ui.features.quiz.QuizScreen
import com.masiloic.cybedu.ui.navigation.Destination
import com.masiloic.cybedu.ui.theme.CybeduTheme

class MainActivity : ComponentActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        enableEdgeToEdge()
        setContent {
            CybeduTheme {
                val navController = rememberNavController()
                NavHost(
                    navController = navController,
                    startDestination = Destination.Connection,
                    modifier = Modifier.background(colorResource( R.color.background))
                ) {
                    composable<Destination.Connection> {
                        ConnectionScreen(navController = navController)
                    }
                    composable<Destination.Login> {
                        LoginScreen(navController = navController)
                    }
                    composable<Destination.ArticleList> {
                        ArticleListScreen(navController = navController)
                    }
                    composable<Destination.Article> { entry ->
                        val articleId = entry.toRoute<Destination.Article>().articleId
                        ArticleScreen(
                            navController = navController,
                            articleId = articleId
                        )
                    }
                    composable<Destination.Quiz> { entry ->
                        val args = entry.toRoute<Destination.Quiz>()
                        QuizScreen(
                            navController = navController,
                            articleId = args.articleId,
                            resource = args.resource
                        )
                    }
                    composable<Destination.EndQuiz> { entry ->
                        val args = entry.toRoute<Destination.EndQuiz>()
                        EndQuizScreen(
                            navController = navController,
                            score = args.score,
                            total = args.total,
                            resource = args.resource
                        )
                    }
                    composable<Destination.Profile> {
                        ProfileScreen(navController = navController)
                    }
                }
            }
        }
    }
}
