package com.masiloic.cybedu.ui.features.profile

import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.ui.Modifier
import androidx.navigation.NavController
import com.masiloic.cybedu.ui.components.topbar.SearchTopBar

@Composable
fun ProfileScreen(
    navController: NavController,
    modifier: Modifier = Modifier
) {
    SearchTopBar(
        onBackClick = { navController.popBackStack() }
    )

}