package com.masiloic.cybedu.di

import com.masiloic.cybedu.data.repositoriesImpl.ArticleRepositoryImpl
import com.masiloic.cybedu.data.repositoriesImpl.QuizRepositoryImpl
import com.masiloic.cybedu.domain.models.Article
import com.masiloic.cybedu.domain.repositories.ArticleRepository
import com.masiloic.cybedu.domain.repositories.QuizRepository
import com.masiloic.cybedu.ui.features.article.ArticleViewModel
import com.masiloic.cybedu.ui.features.article_list.ArticleListViewModel
import com.masiloic.cybedu.ui.features.quiz.QuizViewModel
import io.ktor.client.HttpClient
import org.koin.dsl.module
import org.koin.androidx.viewmodel.dsl.viewModel

private const val MYAPI_URL = "http://example.com"

//val dataModule = module {
//    single<HttpClient> {
//
//    }
//}

val dataModule = module {

    single<ArticleRepository> { ArticleRepositoryImpl() }
    single<QuizRepository> { QuizRepositoryImpl() }

    viewModel { ArticleListViewModel(get()) }
    viewModel { ArticleViewModel(get()) }
    viewModel { QuizViewModel(get()) }
}