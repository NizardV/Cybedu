package com.masiloic.cybedu.domain.models

data class Quiz (
    val id: Int,
    val questions: List<Question>
)