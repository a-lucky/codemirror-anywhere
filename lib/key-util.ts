
export class KeyUtil {
  private static isUseMacOS() {
    const ua = window.navigator.userAgent.toLowerCase();
    return ua.indexOf("mac os x") !== -1;
  }

  static isModKey(event) {
    return KeyUtil.isUseMacOS() ? event.metaKey : event.ctrlKey;
  }

  static withoutMacOS(listener) {
    if (!KeyUtil.isUseMacOS()) {
      return listener;
    }
  }
}