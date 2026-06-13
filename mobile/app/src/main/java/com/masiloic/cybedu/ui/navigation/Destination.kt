package com.masiloic.cybedu.ui.navigation

import kotlinx.serialization.Serializable

@Serializable
sealed interface Destination {
    @Serializable
    data object Connection : Destination
    @Serializable
    data object Login : Destination
    @Serializable
    data object ArticleList : Destination
    @Serializable
    data class Article(val articleId: Int) : Destination
    @Serializable
    data class Quiz(val articleId: Int, val resource: String) : Destination
    @Serializable
    data class EndQuiz(val score: Int, val total: Int, val resource: String) : Destination
    @Serializable
    data object Profile : Destination
}
