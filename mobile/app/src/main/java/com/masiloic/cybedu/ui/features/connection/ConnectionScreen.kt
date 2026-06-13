package com.masiloic.cybedu.ui.features.connection

import androidx.compose.foundation.background
import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.fillMaxHeight
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.padding
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.res.colorResource
import androidx.compose.ui.res.stringResource
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import androidx.navigation.NavHostController
import com.masiloic.cybedu.R
import com.masiloic.cybedu.ui.components.button.PrimaryButton
import com.masiloic.cybedu.ui.navigation.Destination

@Composable
fun ConnectionScreen(
    navController: NavHostController
) {
    Column(
        modifier = Modifier
            .fillMaxWidth()
            .fillMaxHeight()
            .background(
                color = colorResource(R.color.background),
            ),
        verticalArrangement = Arrangement.SpaceBetween
    ){
        Text(text = stringResource(R.string.app_name),
            color = Color(0xFFFFEEFF),
            fontSize = 36.sp,
            modifier = Modifier
                .padding(top = 135.dp)
                .align(Alignment.CenterHorizontally)
        )
        PrimaryButton(
            buttonAction = {
                navController.navigate(Destination.Login)
            },
            text = stringResource(R.string.connection)
        )
    }
}