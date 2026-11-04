import { useSyncExternalStore } from "react";

// A value kept in localStorage that React components can subscribe to.
// Pass key null for a memory-only value. Storage errors (private mode, blocked
// cookies) fall back to memory too.
export function createStore<T>(key: string | null, fallback: T) {
  let value: T | undefined;
  const listeners = new Set<() => void>();
  return {
    fallback,
    get(): T {
      if (value === undefined) {
        try {
          const raw = key === null ? null : localStorage.getItem(key);
          const parsed: unknown = raw === null ? fallback : JSON.parse(raw);
          // Ignore stored values of the wrong shape (edited by hand, older format).
          const sameShape =
            typeof parsed === typeof fallback && Array.isArray(parsed) === Array.isArray(fallback);
          value = sameShape ? (parsed as T) : fallback;
        } catch {
          value = fallback;
        }
      }
      return value;
    },
    set(next: T) {
      value = next;
      try {
        if (key !== null) localStorage.setItem(key, JSON.stringify(next));
      } catch {}
      listeners.forEach((cb) => cb());
    },
    subscribe(cb: () => void) {
      // Pick up changes made in other tabs.
      const onStorage = (e: StorageEvent) => {
        if (key !== null && e.key === key) {
          value = undefined;
          cb();
        }
      };
      listeners.add(cb);
      window.addEventListener("storage", onStorage);
      return () => {
        listeners.delete(cb);
        window.removeEventListener("storage", onStorage);
      };
    },
  };
}

export type Store<T> = ReturnType<typeof createStore<T>>;

export const useStore = <T,>(store: Store<T>) =>
  useSyncExternalStore(store.subscribe, store.get, () => store.fallback);
