package com.masiloic.cybedu.ui.features.article_list

import androidx.lifecycle.ViewModel
import androidx.lifecycle.viewModelScope
import com.masiloic.cybedu.domain.models.Article
import com.masiloic.cybedu.domain.repositories.ArticleRepository
import kotlinx.coroutines.flow.MutableStateFlow
import kotlinx.coroutines.flow.StateFlow
import kotlinx.coroutines.flow.asStateFlow
import kotlinx.coroutines.flow.update
import kotlinx.coroutines.launch

class ArticleListViewModel(
    private val articleRespository: ArticleRepository
) : ViewModel() {
    private val _state = MutableStateFlow(ArticleListState(isLoading = true))
    val state: StateFlow<ArticleListState> = _state.asStateFlow()

    fun loadArticleList(){
        viewModelScope.launch {
            _state.update { it.copy(isLoading = true, errorMessage = null) }
            try{
                // TODO : faire une fonction qui retourne tous les articles
                val articleList: List<Article> = articleRespository.getArticles()
                _state.update {
                    it.copy(
                        isLoading = false,
                        articles = articleList,
                        errorMessage = null
                    )
                }
            } catch (e: Exception){
                _state.update {
                    it.copy(
                        isLoading = false,
                        articles = null,
                        errorMessage = e.message ?: "Impossible de charger la liste des articles"
                    )
                }
            }
        }
    }
}