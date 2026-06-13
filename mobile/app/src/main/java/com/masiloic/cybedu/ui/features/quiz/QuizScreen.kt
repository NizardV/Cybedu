package com.masiloic.cybedu.ui.features.quiz

import android.R.attr.text
import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.Spacer
import androidx.compose.foundation.layout.fillMaxHeight
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.height
import androidx.compose.foundation.layout.padding
import androidx.compose.material3.Button
import androidx.compose.material3.ButtonDefaults
import androidx.compose.material3.LinearProgressIndicator
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.runtime.LaunchedEffect
import androidx.compose.runtime.collectAsState
import androidx.compose.runtime.getValue
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.res.colorResource
import androidx.compose.ui.unit.dp
import androidx.navigation.NavController
import com.masiloic.cybedu.R
import com.masiloic.cybedu.ui.components.topbar.SearchTopBar
import com.masiloic.cybedu.ui.navigation.Destination
import org.koin.androidx.compose.koinViewModel

@Composable
fun QuizScreen(
    navController: NavController,
    articleId: Int,
    resource: String,
    modifier: Modifier = Modifier
) {
    val viewModel: QuizViewModel = koinViewModel()
    val state by viewModel.state.collectAsState()

    LaunchedEffect(articleId) {
        viewModel.loadQuiz(articleId)
    }

    LaunchedEffect(state.isFinished) {
        if (state.isFinished) {
            navController.navigate(
                Destination.EndQuiz(
                    score = state.score,
                    total = state.questions.size,
                    resource = resource
                )
            )
        }
    }

    Column(
        modifier = modifier
            .fillMaxHeight()
            .fillMaxWidth()
    ) {
        SearchTopBar(onBackClick = { navController.popBackStack() })

        when {
            state.isLoading -> {
                Text(
                    text = "Chargement du quiz...",
                    modifier = Modifier.padding(24.dp)
                )
            }

            state.errorMessage != null -> {
                Column(
                    modifier = Modifier
                        .fillMaxSize()
                        .padding(24.dp),
                    verticalArrangement = Arrangement.spacedBy(12.dp)
                ) {
                    Text(text = state.errorMessage ?: "Erreur inconnue", color = colorResource(R.color.on_background))
                    Button(onClick = { viewModel.loadQuiz(articleId) }) {
                        Text("Réessayer")
                    }
                }
            }

            state.questions.isEmpty() -> {
                Text(
                    text = "Aucune question disponible pour ce quiz.",
                    modifier = Modifier.padding(24.dp),
                    color = colorResource(R.color.on_background)
                )
            }

            else -> {
                val question = state.questions.getOrNull(state.currentIndex) ?: return@Column
                val isLastQuestion = state.currentIndex == state.questions.lastIndex
                val correctAnswer = question.answers.firstOrNull { it.id == question.correctAnswerId }

                Column(
                    modifier = Modifier
                        .fillMaxSize()
                        .padding(24.dp),
                    verticalArrangement = Arrangement.SpaceBetween
                ) {

                    Column(verticalArrangement = Arrangement.spacedBy(12.dp)) {
                        Text(
                            text = "Question ${state.currentIndex + 1}/${state.questions.size}",
                            color = Color.Gray
                        )
                        Text(
                            text = question.questionText,
                            style = MaterialTheme.typography.titleLarge
                        )

                        Spacer(modifier = Modifier.height(8.dp))

                        question.answers.forEach { answer ->
                            val isSelected = state.selectedAnswerId == answer.id
                            val baseColor = MaterialTheme.colorScheme.primary
                            val green = Color(0xFF2E7D32)
                            val red = Color(0xFFC62828)

                            val containerColor = when {
                                !state.hasAnswered -> baseColor
                                isSelected && answer.id == question.correctAnswerId -> green
                                isSelected -> red
                                answer.id == question.correctAnswerId -> green.copy(alpha = 0.2f)
                                else -> baseColor
                            }

                            Button(
                                onClick = { viewModel.selectAnswer(answer.id) },
                                enabled = !state.hasAnswered,
                                modifier = Modifier
                                    .fillMaxWidth(),
                                colors = ButtonDefaults.buttonColors(
                                    containerColor = containerColor,
                                    contentColor = Color.White
                                )
                            ) {
                                Text(text = answer.answerText)
                            }
                        }

                        if (state.hasAnswered) {
                            val isCorrect = state.selectedAnswerId == question.correctAnswerId
                            val feedbackColor = if (isCorrect) Color(0xFF2E7D32) else Color(0xFFC62828)
                            Text(
                                text = if (isCorrect) {
                                    "Bonne réponse !"
                                } else {
                                    "Mauvaise réponse. La bonne réponse : ${correctAnswer?.answerText ?: ""}"
                                },
                                color = feedbackColor
                            )
                        }
                    }

                    Column(verticalArrangement = Arrangement.spacedBy(12.dp)) {
                        Text(
                            text = "Score : ${state.score}/${state.questions.size}",
                            color = Color.Gray
                        )
                        Button(
                            onClick = { viewModel.next() },
                            enabled = state.hasAnswered,
                            modifier = Modifier.fillMaxWidth()
                        ) {
                            Text(text = if (isLastQuestion) "Voir mon score" else "Question suivante")
                        }
                    }
                }
            }
        }
    }
}
