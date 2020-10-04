package com.crowdbotics.maximfitness5250;

import android.app.Application;
import android.content.Context;
import com.facebook.react.PackageList;
import com.facebook.react.ReactApplication;
import com.facebook.react.ReactInstanceManager;
import com.facebook.reactnative.androidsdk.FBSDKPackage;
import com.facebook.CallbackManager;
import com.brentvatne.react.ReactVideoPackage;
import com.swmansion.reanimated.ReanimatedPackage;
import com.swmansion.gesturehandler.react.RNGestureHandlerPackage;
import com.facebook.react.ReactNativeHost;
import com.facebook.react.ReactPackage;
import com.facebook.soloader.SoLoader;
import co.apptailor.googlesignin.RNGoogleSigninPackage;
import org.reactnative.camera.RNCameraPackage;
import io.invertase.firebase.RNFirebasePackage;  /* react-native-firebase */
import io.invertase.firebase.messaging.RNFirebaseMessagingPackage;  /* react-native-firebase */
import io.invertase.firebase.notifications.RNFirebaseNotificationsPackage; /* react-native-firebase */
import com.cmcewen.blurview.BlurViewPackage;
import com.horcrux.svg.SvgPackage;
import cl.json.RNSharePackage;
import cl.json.ShareApplication;
import com.BV.LinearGradient.LinearGradientPackage;
import com.wenkesj.voice.VoicePackage; // <------ Add this!
import com.reactcommunity.rndatetimepicker.RNDateTimePickerPackage;
import com.reactnativecommunity.asyncstorage.AsyncStoragePackage;
import com.imagepicker.ImagePickerPackage;

import java.lang.reflect.InvocationTargetException;
import java.util.List;

public class MainApplication extends Application implements ReactApplication {
  private static CallbackManager mCallbackManager = CallbackManager.Factory.create();

  protected static CallbackManager getCallbackManager() {
        return mCallbackManager;
    }


   private final ReactNativeHost mReactNativeHost =
      new ReactNativeHost(this) {
        @Override
        public boolean getUseDeveloperSupport() {
          return BuildConfig.DEBUG;
        }

                @Override
        protected List<ReactPackage> getPackages() {
          @SuppressWarnings("UnnecessaryLocalVariable")
          List<ReactPackage> packages = new PackageList(this).getPackages();
          // Packages that cannot be autolinked yet can be added manually here, for example:
          // packages.add(new MyReactNativePackage());
          return packages;
        }

    // @Override
    // protected List<ReactPackage> getPackages() {
    //   return Arrays.<ReactPackage>asList(
    //       new MainReactPackage(),
    //         new FBSDKPackage(mCallbackManager),
    //         new ReactVideoPackage(),
    //         new RNGestureHandlerPackage(),
    //         new RNGoogleSigninPackage(),
    //         new RNCameraPackage(),
    //         new RNFirebasePackage(), /* react-native-firebase */
    //         new RNFirebaseMessagingPackage(), /* react-native-firebase */
    //         new RNFirebaseNotificationsPackage(), /* react-native-firebase */
    //         new BlurViewPackage(),
    //         new SvgPackage(),
    //         new RNSharePackage(),
    //         new LinearGradientPackage(),
    //         new VoicePackage(),
    //         new ReanimatedPackage(),
    //         new RNDateTimePickerPackage(),
    //         new AsyncStoragePackage(),
    //         new ImagePickerPackage(),
    //   );
    // }

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
    initializeFlipper(this, getReactNativeHost().getReactInstanceManager());
  }
  /**
   * Loads Flipper in React Native templates. Call this in the onCreate method with something like
   * initializeFlipper(this, getReactNativeHost().getReactInstanceManager());
   *
   * @param context
   * @param reactInstanceManager
   */
  private static void initializeFlipper(
      Context context, ReactInstanceManager reactInstanceManager) {
    if (BuildConfig.DEBUG) {
      try {
        /*
         We use reflection here to pick up the class that initializes Flipper,
        since Flipper library is not available in release mode
        */
        Class<?> aClass = Class.forName("com.rndiffapp.ReactNativeFlipper");
        aClass
            .getMethod("initializeFlipper", Context.class, ReactInstanceManager.class)
            .invoke(null, context, reactInstanceManager);
      } catch (ClassNotFoundException e) {
        e.printStackTrace();
      } catch (NoSuchMethodException e) {
        e.printStackTrace();
      } catch (IllegalAccessException e) {
        e.printStackTrace();
      } catch (InvocationTargetException e) {
        e.printStackTrace();
      }
    }
  }
}
