package com.masiloic.cybedu.ui.features.article_list

import androidx.compose.foundation.clickable
import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Box
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.Spacer
import androidx.compose.foundation.layout.WindowInsets
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.height
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.layout.statusBars
import androidx.compose.foundation.layout.windowInsetsTopHeight
import androidx.compose.foundation.rememberScrollState
import androidx.compose.foundation.verticalScroll
import androidx.compose.material3.CircularProgressIndicator
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.runtime.LaunchedEffect
import androidx.compose.runtime.collectAsState
import androidx.compose.runtime.getValue
import androidx.compose.runtime.mutableStateOf
import androidx.compose.runtime.saveable.rememberSaveable
import androidx.compose.runtime.setValue
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.res.colorResource
import androidx.compose.ui.unit.dp
import androidx.navigation.NavController
import com.masiloic.cybedu.R
import com.masiloic.cybedu.ui.components.card.ArticleCard
import com.masiloic.cybedu.ui.components.footer.WaveFooter
import com.masiloic.cybedu.ui.components.topbar.SearchTopBar
import com.masiloic.cybedu.ui.navigation.Destination
import org.koin.androidx.compose.koinViewModel

@Composable
fun ArticleListScreen(
    modifier: Modifier = Modifier,
    navController: NavController
) {
    // ---- Injection KOIN ----
    val viewModel: ArticleListViewModel = koinViewModel()
    val state by viewModel.state.collectAsState()

    var searchQuery by rememberSaveable { mutableStateOf("") }

    LaunchedEffect(Unit) {
        viewModel.loadArticleList()
    }

    Box(modifier = Modifier.fillMaxSize()) {

        if (state.isLoading) {

            Column(
                modifier = Modifier
                    .fillMaxSize()
                    .padding(horizontal = 24.dp),
                verticalArrangement = Arrangement.Center,
                horizontalAlignment = Alignment.CenterHorizontally
            ) {
                CircularProgressIndicator()
                Spacer(modifier = Modifier.height(16.dp))
                Text(
                    text = "Chargement en cours...",
                    color = colorResource(R.color.on_background)
                )
            }

        } else {

            Column(
                modifier = Modifier
                    .fillMaxSize()
                    .verticalScroll(rememberScrollState())
            ) {

                SearchTopBar(
                    searchText = searchQuery,
                    onSearchChange = { searchQuery = it },
                    onBackClick = { navController.popBackStack() }
                )

                Spacer(
                    modifier = Modifier
                        .fillMaxWidth()
                        .windowInsetsTopHeight(WindowInsets.statusBars)
                )

                state.errorMessage?.let { error ->
                    Text(
                        text = error,
                        color = colorResource(R.color.on_background),
                        modifier = Modifier.padding(16.dp)
                    )
                }

                state.articles?.forEach { article ->
                    ArticleCard(
                        title = article.title,
                        description = article.description,
                        modifier = Modifier
                            .fillMaxWidth()
                            .padding(horizontal = 16.dp)
                            .clickable {
                                navController.navigate(
                                    Destination.Article(article.id)
                                )
                            }
                    )
                }

                WaveFooter()
            }
        }
    }
}
