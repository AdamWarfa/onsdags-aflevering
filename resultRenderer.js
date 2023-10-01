import { findMember } from "./script.js";

const resultRenderer = {
  render() {
    const result = this.item;
    const member = findMember(result.memberId);

    const html = /*html*/ `
    <tbody>
      <td>${result.date.toLocaleString("da-DK", { year: "numeric", month: "long", day: "numeric" })}</td>
      <td>${result.memberName}</td>
      <td>${result.discipline}</td>
      <td>${result.resultType}</td>
      <td>${result.time}</td>
    </tbody>`;

    return html;
  },
};

export { resultRenderer };
