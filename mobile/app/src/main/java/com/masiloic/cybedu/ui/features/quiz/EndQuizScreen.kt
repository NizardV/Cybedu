package com.masiloic.cybedu.ui.features.quiz

import android.content.Intent
import android.net.Uri
import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.rememberScrollState
import androidx.compose.foundation.verticalScroll
import androidx.compose.material3.Button
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.ui.Modifier
import androidx.compose.ui.platform.LocalContext
import androidx.compose.ui.res.colorResource
import androidx.compose.ui.unit.dp
import androidx.navigation.NavController
import com.masiloic.cybedu.R
import com.masiloic.cybedu.ui.components.topbar.SearchTopBar

@Composable
fun EndQuizScreen(
    navController: NavController,
    score: Int,
    total: Int,
    resource: String,
    modifier: Modifier = Modifier
) {
    val context = LocalContext.current
    Column(
        modifier = modifier
            .fillMaxSize()
            .verticalScroll(rememberScrollState())
    ) {
        SearchTopBar(onBackClick = { navController.popBackStack() })

        Column(
            modifier = Modifier
                .fillMaxWidth()
                .padding(24.dp),
            verticalArrangement = Arrangement.spacedBy(16.dp)
        ) {
            Text(
                text = "Votre score : $score / $total",
                style = MaterialTheme.typography.headlineSmall,
                color = colorResource(R.color.on_background)
            )
            Text(
                text = "Consultez la ressource pour approfondir le sujet.",
                style = MaterialTheme.typography.bodyMedium,
                color = colorResource(R.color.on_background)
            )

            Button(
                onClick = {
                    context.startActivity(
                        Intent(Intent.ACTION_VIEW, Uri.parse(resource))
                    )
                },
                modifier = Modifier.fillMaxWidth()
            ) {
                Text(text = "Ouvrir la ressource")
            }

            Button(
                onClick = { navController.popBackStack() },
                modifier = Modifier.fillMaxWidth()
            ) {
                Text(text = "Retour")
            }
        }
    }
}
