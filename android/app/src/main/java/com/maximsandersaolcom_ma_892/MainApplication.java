package com.crowdbotics.maximfitness5250;

import android.app.Application;

import com.facebook.react.ReactApplication;
import com.facebook.reactnative.androidsdk.FBSDKPackage;
import com.facebook.CallbackManager;
import com.brentvatne.react.ReactVideoPackage;
import com.swmansion.gesturehandler.react.RNGestureHandlerPackage;
import com.facebook.react.ReactNativeHost;
import com.facebook.react.ReactPackage;
import com.facebook.react.shell.MainReactPackage;
import com.facebook.soloader.SoLoader;
import co.apptailor.googlesignin.RNGoogleSigninPackage;
import org.reactnative.camera.RNCameraPackage;
import io.invertase.firebase.RNFirebasePackage;  /* react-native-firebase */
import io.invertase.firebase.messaging.RNFirebaseMessagingPackage;  /* react-native-firebase */
import io.invertase.firebase.notifications.RNFirebaseNotificationsPackage; /* react-native-firebase */
import com.cmcewen.blurview.BlurViewPackage;
import com.horcrux.svg.SvgPackage;

import java.util.Arrays;
import java.util.List;

public class MainApplication extends Application implements ReactApplication {
  private static CallbackManager mCallbackManager = CallbackManager.Factory.create();
  
  protected static CallbackManager getCallbackManager() {
        return mCallbackManager;
    }
  

  private final ReactNativeHost mReactNativeHost = new ReactNativeHost(this) {
    @Override
    public boolean getUseDeveloperSupport() {
      return BuildConfig.DEBUG;
    }

    @Override
    protected List<ReactPackage> getPackages() {
      return Arrays.<ReactPackage>asList(
          new MainReactPackage(),
            new FBSDKPackage(mCallbackManager),
            new ReactVideoPackage(),
            new RNGestureHandlerPackage(),
            new RNGoogleSigninPackage(),
            new RNCameraPackage(),
            new RNFirebasePackage(), /* react-native-firebase */
            new RNFirebaseMessagingPackage(), /* react-native-firebase */
            new RNFirebaseNotificationsPackage(), /* react-native-firebase */
            new BlurViewPackage(),
            new SvgPackage()
      );
    }

    @Override
    protected String getJSMainModuleName() {
      return "index";
    }
  };

  @Override
  public ReactNativeHost getReactNativeHost() {
    return mReactNativeHost;
  }

  @Override
  public void onCreate() {
    super.onCreate();
    SoLoader.init(this, /* native exopackage */ false);
  }
}
