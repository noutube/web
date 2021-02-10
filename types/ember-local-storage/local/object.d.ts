/**
 * Simplified version of `ObjectProxy`:
 * - only cares about `content`'s keys,
 * - removes `| undefined` from `get`'s return type since we always have defaults,
 * - adds `set`
 */
declare class StorageObject<T> {
  get<K extends keyof T>(key: K): T[K];
  set<K extends keyof T>(key: K, value: T[K]): T[K];
}

export default StorageObject;
