package com.masiloic.cybedu.domain.models

data class Question(
    val id: Int,
    val questionText: String,
    val answers: List<Answer>,
    val correctAnswerId: Int
)