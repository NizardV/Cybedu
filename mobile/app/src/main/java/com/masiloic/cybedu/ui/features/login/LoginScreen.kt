package com.masiloic.cybedu.ui.features.login

import androidx.compose.foundation.background
import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Box
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.navigationBarsPadding
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.layout.statusBarsPadding
import androidx.compose.foundation.text.KeyboardOptions
import androidx.compose.material3.Icon
import androidx.compose.material3.IconButton
import androidx.compose.material3.Text
import androidx.compose.material3.TextField
import androidx.compose.material3.TextFieldDefaults
import androidx.compose.runtime.Composable
import androidx.compose.runtime.mutableStateOf
import androidx.compose.runtime.remember
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.res.colorResource
import androidx.compose.ui.res.painterResource
import androidx.compose.ui.res.stringResource
import androidx.compose.ui.text.input.KeyboardType
import androidx.compose.ui.text.input.PasswordVisualTransformation
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import androidx.navigation.NavController
import com.masiloic.cybedu.R
import com.masiloic.cybedu.ui.components.button.PrimaryButton
import com.masiloic.cybedu.ui.navigation.Destination

@Composable
fun LoginScreen(
    navController: NavController
) {
    var login = remember { mutableStateOf("") }
    var password = remember { mutableStateOf("") }

    Box(
        modifier = Modifier
            .fillMaxSize()
            .background(colorResource(R.color.background))
            .statusBarsPadding()
            .navigationBarsPadding()
    ) {

        // --- CONTENU ---
        Column(
            modifier = Modifier
                .fillMaxSize()
                .padding(horizontal = 24.dp),
            verticalArrangement = Arrangement.SpaceBetween
        ) {
            // ---------- HEADER ----------
            Column {
                IconButton(
                    onClick = { navController.navigate(Destination.Connection) },
                    modifier = Modifier.padding(top = 8.dp)
                ) {
                    Icon(
                        painter = painterResource(R.drawable.ic_arrow_left_black),
                        contentDescription = "Retour",
                        tint = Color.White
                    )
                }

                Text(
                    text = stringResource(R.string.app_name),
                    color = Color.White,
                    fontSize = 36.sp,
                    modifier = Modifier
                        .padding(top = 60.dp)
                        .align(Alignment.CenterHorizontally)
                )

                // --- Inputs ---
                TextField(
                    value = login.value,
                    onValueChange = { login.value = it },
                    label = { Text(stringResource(R.string.userId)) },
                    placeholder = { Text("example@diiage.org") },
                    singleLine = true,
                    modifier = Modifier
                        .fillMaxWidth()
                        .padding(top = 48.dp),
                    colors = TextFieldDefaults.colors(
                        focusedTextColor = Color.White,
                        unfocusedTextColor = Color.White,
                        focusedContainerColor = Color(0xFF1B1B1B),
                        unfocusedContainerColor = Color(0xFF1B1B1B),
                        focusedLabelColor = Color(0xFFE6E0E9),
                        unfocusedLabelColor = Color(0xFFAAA7B0),
                        cursorColor = Color(0xFF743AA2)
                    )
                )

                TextField(
                    value = password.value,
                    onValueChange = { password.value = it },
                    label = { Text(stringResource(R.string.password)) },
                    visualTransformation = PasswordVisualTransformation(),
                    keyboardOptions = KeyboardOptions(keyboardType = KeyboardType.Password),
                    singleLine = true,
                    modifier = Modifier
                        .fillMaxWidth()
                        .padding(top = 24.dp),
                    isError = password.value.isNotEmpty() && password.value.length < 8,
                    colors = TextFieldDefaults.colors(
                        focusedTextColor = Color.White,
                        unfocusedTextColor = Color.White,
                        focusedContainerColor = Color(0xFF1B1B1B),
                        unfocusedContainerColor = Color(0xFF1B1B1B),
                        cursorColor = Color(0xFF743AA2)
                    )
                )
            }

            // ---------- BOUTON ----------
            PrimaryButton(
                text = stringResource(R.string.connection),
                buttonAction = {
                    navController.navigate(Destination.ArticleList)
                }
            )
        }
    }
}
