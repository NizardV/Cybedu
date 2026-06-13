package com.masiloic.cybedu

import android.app.Application
import com.masiloic.cybedu.di.dataModule
import org.koin.android.ext.koin.androidContext
import org.koin.core.context.startKoin

class CybeduApplication : Application() {
    override fun onCreate() {
        super.onCreate()

        // TODO: Start depedency injection
        startKoin {
            androidContext(this@CybeduApplication)
            modules(dataModule)
        }
        // TODO: Start tracking
    }

    override fun onTerminate() {
        super.onTerminate()
    }
}