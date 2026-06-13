package com.masiloic.cybedu.domain.models

data class Article(
    val id: Int,
    val title: String,
    val description: String,
    val content: String,
    val resource: String
)
