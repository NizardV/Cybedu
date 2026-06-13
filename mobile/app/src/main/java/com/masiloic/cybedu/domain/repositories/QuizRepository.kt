package com.masiloic.cybedu.domain.repositories

import com.masiloic.cybedu.domain.models.Quiz

interface QuizRepository {
    fun getQuizById(id: Int): Quiz
}