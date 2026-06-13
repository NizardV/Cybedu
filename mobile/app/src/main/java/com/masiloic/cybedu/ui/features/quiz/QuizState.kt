package com.masiloic.cybedu.ui.features.quiz

import com.masiloic.cybedu.domain.models.Question

data class QuizState(
    val currentIndex: Int = 0,
    val questions: List<Question> = emptyList(),
    val selectedAnswerId: Int? = null,
    val hasAnswered: Boolean = false,
    val isFinished: Boolean = false,
    val score: Int = 0,
    val isLoading: Boolean = true,
    val errorMessage: String? = null
)
