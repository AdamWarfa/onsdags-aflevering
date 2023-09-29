const memberRenderer = {
  item: undefined,

  render() {
    const member = this.item;
    const html = /*html*/ `
    <tr>
      <td>${member.name}</td>
      <td>${member.active}</td>
      <td>${member.birthday.toLocaleString("da-DK", { year: "numeric", month: "long", day: "numeric" })}</td>
      <td>${member.age}</td>
      <td>${member.ageGroup}</td>
    </tr>`;

    return html;
  },
  postRender(element) {
    element.addEventListener("click", () => {
      this.deleteMember();
    });
  },
  deleteMember() {
    console.log("delete " + this.item.name);
  },
};

export { memberRenderer };
