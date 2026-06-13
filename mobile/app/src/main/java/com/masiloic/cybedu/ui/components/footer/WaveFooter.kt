package com.masiloic.cybedu.ui.components.footer

import androidx.compose.animation.core.LinearEasing
import androidx.compose.animation.core.RepeatMode
import androidx.compose.animation.core.animateFloat
import androidx.compose.animation.core.infiniteRepeatable
import androidx.compose.animation.core.rememberInfiniteTransition
import androidx.compose.animation.core.tween
import androidx.compose.foundation.Canvas
import androidx.compose.foundation.layout.Box
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.height
import androidx.compose.runtime.Composable
import androidx.compose.runtime.getValue
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.graphics.Path
import androidx.compose.ui.res.colorResource
import androidx.compose.ui.unit.dp
import com.masiloic.cybedu.R
import kotlin.math.sin

@Composable
fun WaveFooter(
    modifier: Modifier = Modifier,
    color1: Color = colorResource(R.color.purple_700),
    color2: Color = colorResource(R.color.purple_500),
    color3: Color = colorResource(R.color.purple_200)
) {
    val infiniteTransition = rememberInfiniteTransition()

    val offset1 by infiniteTransition.animateFloat(
        initialValue = 0f,
        targetValue = 360f,
        animationSpec = infiniteRepeatable(
            tween(durationMillis = 6000, easing = LinearEasing),
            RepeatMode.Restart
        )
    )

    val offset2 by infiniteTransition.animateFloat(
        initialValue = 0f,
        targetValue = 360f,
        animationSpec = infiniteRepeatable(
            tween(durationMillis = 9000, easing = LinearEasing),
            RepeatMode.Restart
        )
    )

    val offset3 by infiniteTransition.animateFloat(
        initialValue = 0f,
        targetValue = 360f,
        animationSpec = infiniteRepeatable(
            tween(durationMillis = 12000, easing = LinearEasing),
            RepeatMode.Restart
        )
    )

    Box(
        modifier = modifier
            .fillMaxWidth()
            .height(80.dp)
    ) {
        WaveLayer(color1, offset1, amplitude = 18f, phase = 0f, alpha = 0.8f)
        WaveLayer(color2, offset2, amplitude = 25f, phase = 40f, alpha = 0.7f)
        WaveLayer(color3, offset3, amplitude = 32f, phase = 80f, alpha = 0.6f)
    }
}

@Composable
fun WaveLayer(
    color: Color,
    offset: Float,
    amplitude: Float,
    phase: Float,
    alpha: Float
) {
    Canvas(
        modifier = Modifier
            .fillMaxSize()
    ) {
        val width = size.width
        val height = size.height

        val path = Path()
        path.moveTo(0f, height / 2)

        for (x in 0 until width.toInt()) {
            val y = (sin((x + offset + phase) * (Math.PI / 180)) * amplitude + (height * 0.6f))
            path.lineTo(x.toFloat(), y.toFloat())
        }

        path.lineTo(width, height)
        path.lineTo(0f, height)
        path.close()

        drawPath(path, color.copy(alpha = alpha))
    }
}
