package com.masiloic.cybedu.ui.features.article

import androidx.lifecycle.ViewModel
import androidx.lifecycle.viewModelScope
import com.masiloic.cybedu.domain.models.Article
import com.masiloic.cybedu.domain.repositories.ArticleRepository
import kotlinx.coroutines.flow.MutableStateFlow
import kotlinx.coroutines.flow.StateFlow
import kotlinx.coroutines.flow.asStateFlow
import kotlinx.coroutines.flow.update
import kotlinx.coroutines.launch

class ArticleViewModel(
    private val articleRepository: ArticleRepository
) : ViewModel() {

    private val _state = MutableStateFlow(ArticleState(isLoading = true))
    val state: StateFlow<ArticleState> = _state.asStateFlow()

    fun loadArticle(id: Int) {
        viewModelScope.launch {
            _state.update { it.copy(isLoading = true, errorMessage = null) }

            try {
                val article: Article = articleRepository.getArticleById(id)
                _state.update {
                    it.copy(
                        isLoading = false,
                        article = article,
                        errorMessage = null
                    )
                }
            } catch (ex: Exception) {
                _state.update {
                    it.copy(
                        isLoading = false,
                        article = null,
                        errorMessage = ex.message ?: "Impossible de charger l'article"
                    )
                }
            }
        }
    }
}