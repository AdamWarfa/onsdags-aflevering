function construct(list, container, itemRenderer) {
  const ListRenderer = {
    renderers: [],
    container: document.querySelector(container),
    filterProperty: "",
    filterValue: "",
    sortBy: undefined,
    sortDir: "asc",

    render() {
      for (const item of list) {
        const renderer = Object.create(itemRenderer);
        renderer.item = item;
        this.renderers.push(renderer);
      }

      let renderers = this.renderers;

      for (const renderer of renderers) {
        try {
          const html = renderer.render();
          this.container.insertAdjacentHTML("beforeend", html);

          const element = this.container.lastElementChild;

          if (renderer.postRender) {
            renderer.postRender(element);
          }
        } catch (error) {
          console.log(error);
        }
      }
    },
  };

  return ListRenderer;
}

export { construct };
