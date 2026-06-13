package com.masiloic.cybedu.ui.features.article_list

import com.masiloic.cybedu.domain.models.Article

data class ArticleListState(
    val isLoading: Boolean = false,
    val articles: List<Article>? = null,
    val errorMessage: String? = null
)