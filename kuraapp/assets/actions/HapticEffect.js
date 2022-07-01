
import ReactNativeHapticFeedback from "react-native-haptic-feedback";
const options = {
    enableVibrateFallback: true,
    ignoreAndroidSystemSettings: false,
    clockTick:true
  };
  const HapticEffect = () =>{
    ReactNativeHapticFeedback.trigger("impactLight", options)

  }
  export default HapticEffect