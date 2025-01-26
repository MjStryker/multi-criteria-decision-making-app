export abstract class AbstractEvent<T> extends CustomEvent<T> {
  constructor(
    protected _key: string,
    protected _detail: T
  ) {
    super(_key, { detail: _detail });
  }

  get key(): string {
    return this._key;
  }

  get detail(): T {
    return this._detail;
  }
}
