package com.masiloic.cybedu.ui.features.quiz

import androidx.lifecycle.ViewModel
import com.masiloic.cybedu.domain.repositories.QuizRepository
import kotlinx.coroutines.flow.MutableStateFlow
import kotlinx.coroutines.flow.asStateFlow
import kotlinx.coroutines.flow.update

class QuizViewModel(
    private val quizRepository: QuizRepository
) : ViewModel() {

    private val _state = MutableStateFlow(QuizState())
    val state = _state.asStateFlow()

    fun loadQuiz(quizId: Int) {
        _state.update {
            it.copy(
                isLoading = true,
                errorMessage = null,
                currentIndex = 0,
                selectedAnswerId = null,
                hasAnswered = false,
                isFinished = false,
                score = 0
            )
        }
        try {
            val quiz = quizRepository.getQuizById(quizId)
            _state.update {
                it.copy(
                    questions = quiz.questions,
                    isLoading = false
                )
            }
        } catch (ex: Exception) {
            _state.update {
                it.copy(
                    isLoading = false,
                    errorMessage = ex.message ?: "Impossible de charger le quiz"
                )
            }
        }
    }

    fun selectAnswer(id: Int) {
        val currentState = _state.value
        if (currentState.hasAnswered || currentState.isFinished) return

        val currentQuestion = currentState.questions.getOrNull(currentState.currentIndex) ?: return
        val isCorrect = currentQuestion.correctAnswerId == id

        _state.update {
            it.copy(
                selectedAnswerId = id,
                hasAnswered = true,
                score = if (isCorrect) it.score + 1 else it.score
            )
        }
    }

    fun next() {
        val st = _state.value
        if (!st.hasAnswered) return

        if (st.currentIndex + 1 < st.questions.size) {
            _state.update {
                it.copy(
                    currentIndex = it.currentIndex + 1,
                    selectedAnswerId = null,
                    hasAnswered = false
                )
            }
        } else {
            _state.update { it.copy(isFinished = true) }
        }
    }
}
