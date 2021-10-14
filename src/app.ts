class App {
  constructor(private readonly root: HTMLDivElement) {}
}

new App(document.querySelector('#root')! as HTMLDivElement);
