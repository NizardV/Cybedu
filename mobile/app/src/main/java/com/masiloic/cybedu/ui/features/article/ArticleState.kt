package com.masiloic.cybedu.ui.features.article

import com.masiloic.cybedu.domain.models.Article

data class ArticleState(
    val isLoading: Boolean = false,
    val article: Article? = null,
    val errorMessage: String? = null
)