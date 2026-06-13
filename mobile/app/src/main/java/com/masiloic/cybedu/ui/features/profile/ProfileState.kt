package com.masiloic.cybedu.ui.features.profile

import com.masiloic.cybedu.domain.models.User

data class ProfileState(
    val isLoading: Boolean = false,
    val user: User? = null,
    val errorMessage: String? = null
)