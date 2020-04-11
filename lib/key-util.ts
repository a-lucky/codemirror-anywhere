export class KeyUtil {
  private static isUseMacOS() {
    const ua = window.navigator.userAgent.toLowerCase();
    return ua.indexOf("mac os x") !== -1;
  }

  static isModKey(event: KeyboardEvent) {
    return KeyUtil.isUseMacOS() ? event.metaKey : event.ctrlKey;
  }

  static withoutMacOS<T extends CodeMirror.Editor>(listener: (cm: T)　=> void): ((cm: T)　=> void) | false {
    if (!KeyUtil.isUseMacOS()) {
      return listener;
    }
    return false;
  }
}