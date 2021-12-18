/* eslint-disable */
type State = {
  [key: string]: any;
};

export abstract class Component {
  state: State;

  constructor(readonly target: HTMLElement, readonly props?: State) {
    this.state = {};
    this.setup();
    this.setEvent();
    this.render();
  }

  setup(): void {}

  mounted(): void {}

  setEvent(): void {}

  template(): string {
    return "";
  }

  render(): void {
    this.target.innerHTML = this.template();
    this.mounted();
  }

  setState(nextState: State): void {
    this.state = { ...this.state, ...nextState };
    this.render();
  }

  addEvent<K extends keyof HTMLElementEventMap>(
    eventType: K,
    selector: string,
    callback: (event: any) => void
  ): void {
    const children = [...this.target.querySelectorAll(selector)];

    const isTarget = (target: HTMLElement) =>
      children.includes(target) || target.closest(selector);

    this.target.addEventListener(eventType, (event: any) => {
      if (!isTarget(event.target)) {
        return;
      }
      callback(event);
    });
  }
}
