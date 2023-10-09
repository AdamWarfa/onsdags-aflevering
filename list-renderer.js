function construct(list, container, itemRenderer) {
  const ListRenderer = {
    renderers: [],
    container: document.querySelector(container),
    filterProperty: "",
    filterValue: "",
    sortBy: undefined,
    sortDir: "asc",
    sortType: undefined,
    items: list,
    clear() {
      this.renderers = [];
      this.container.innerHTML = "";
    },

    render() {
      for (const item of this.items) {
        const renderer = Object.create(itemRenderer);
        renderer.item = item;
        this.renderers.push(renderer);
      }

      let renderers = this.renderers;

      const filteredList = renderers.filter((renderer) => renderer.item.active == "Ja");
      console.log(filteredList);

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
    sort(sortBy, sortType) {
      try {
        if (this.sortBy === sortBy && this.sortDir === "asc") {
          list = list.reverse();
          this.sortDir = "desc";
        } else if (this.sortBy === sortBy && this.sortDir === "desc") {
          list = list.reverse();
          this.sortDir = "asc";
        } else {
          if (sortType == "number") {
            list.sort((a, b) => a[`${sortBy}`] - b[`${sortBy}`]);
          } else if (sortType == "string") {
            list.sort((a, b) => a[`${sortBy}`].localeCompare(b[`${sortBy}`]));
          }
        }

        console.log(list);
      } catch (error) {}
      this.sortBy = sortBy;
      this.clear();

      this.render();
    },
    filter(filterProperty, filterValue) {
      console.log(filterProperty);
      console.log(filterValue);
      this.clear();
      this.render();
    },
  };

  return ListRenderer;
}

export { construct };
