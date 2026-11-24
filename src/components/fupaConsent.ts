// Stored FuPa consent (two-click solution). Access is wrapped in try/catch
// because localStorage can throw (private mode, blocked storage).

const STORAGE_KEY = 'intermainz-fupa-consent';

export function readFupaConsent(): boolean {
  try {
    return window.localStorage.getItem(STORAGE_KEY) === '1';
  } catch {
    return false;
  }
}

export function storeFupaConsent(): void {
  try {
    window.localStorage.setItem(STORAGE_KEY, '1');
  } catch {
    // ignore: consent still applies to the current page view
  }
}

export function revokeFupaConsent(): void {
  try {
    window.localStorage.removeItem(STORAGE_KEY);
  } catch {
    // ignore
  }
}
