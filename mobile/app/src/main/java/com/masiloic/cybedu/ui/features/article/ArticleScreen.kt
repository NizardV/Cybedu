package com.masiloic.cybedu.ui.features.article

import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.fillMaxHeight
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.rememberScrollState
import androidx.compose.foundation.verticalScroll
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.runtime.LaunchedEffect
import androidx.compose.runtime.collectAsState
import androidx.compose.ui.Modifier
import androidx.compose.ui.res.colorResource
import androidx.compose.ui.res.stringResource
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.text.style.TextAlign
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import androidx.lifecycle.viewmodel.compose.viewModel
import androidx.navigation.NavController
import com.masiloic.cybedu.R
import com.masiloic.cybedu.ui.components.button.PrimaryButton
import com.masiloic.cybedu.ui.components.topbar.SearchTopBar
import com.masiloic.cybedu.ui.navigation.Destination
import org.koin.androidx.compose.koinViewModel

@Composable
fun ArticleScreen(
    navController: NavController,
    articleId: Int,
) {
    // Récupération de notre ViewModel
    val viewModel: ArticleViewModel = koinViewModel()
    // Récupération du state depuis le ViewModel
    val state = viewModel.state.collectAsState()

    // Charger l’article au premier affichage
    LaunchedEffect(articleId) {
        viewModel.loadArticle(articleId)
    }

    Column(
        modifier = Modifier
            .fillMaxHeight()
            .verticalScroll(rememberScrollState())
    ) {
        SearchTopBar(
            onBackClick = { navController.popBackStack() }
        )

        Column(
            modifier = Modifier
                .fillMaxWidth()
                .padding(horizontal = 24.dp)
        ) {

            // ------------------ LOADING ------------------
            if (state.value.isLoading) {
                Text(
                    text = "Chargement...",
                    modifier = Modifier.padding(top = 16.dp),
                    color = colorResource(R.color.on_background)
                )
                return@Column
            }

            // ------------------ ERREUR ------------------
            state.value.errorMessage?.let { error ->
                Text(
                    text = error,
                    color = colorResource(R.color.on_background),
                    modifier = Modifier.padding(top = 16.dp)
                )
                return@Column
            }

            // ------------------ ARTICLE ------------------
            state.value.article?.let { article ->
                // ---- TITRE ----
                Text(
                    text = article.title,
                    color = colorResource(R.color.on_background),
                    fontSize = 26.sp,
                    fontWeight = FontWeight.Bold,
                    modifier = Modifier
                        .fillMaxWidth()
                        .padding(top = 24.dp, bottom = 12.dp),
                    textAlign = TextAlign.Center
                )

                // ---- CONTENU ----
                Text(
                    text = article.content,
                    color = colorResource(R.color.on_background),
                    fontSize = 18.sp,
                    lineHeight = 26.sp,
                    modifier = Modifier
                        .fillMaxWidth()
                        .padding(vertical = 16.dp),
                    textAlign = TextAlign.Start
                )

                // Ajout du bouton d'accès au quiz
                PrimaryButton(
                    text = stringResource(R.string.knowledge_test),
                    buttonAction = {
                        navController.navigate(
                            Destination.Quiz(
                                articleId = article.id,
                                resource = article.resource
                            )
                        )
                    }
                )
            }
        }
    }
}
