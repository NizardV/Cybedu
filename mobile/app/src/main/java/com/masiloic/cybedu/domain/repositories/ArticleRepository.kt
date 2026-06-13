package com.masiloic.cybedu.domain.repositories

import com.masiloic.cybedu.domain.models.Article

interface ArticleRepository {
    fun getArticles(): List<Article>
    fun getArticleById(id: Int): Article
}
