import { initTabs } from "./tabs.js";
import * as result from "./resultConstruct.js";
import * as member from "./memberConstruct.js";

window.addEventListener("load", initApp);

let resultList = [];
let memberList = [];

async function initApp() {
  initTabs();

  await buildMembersList();
  await buildResultsList();

  console.log(memberList);
  console.log(resultList);

  resultList.sort((a, b) => a.convertedTime - b.convertedTime);
  displayResults(resultList);
  displayMembers(memberList);
}

async function fetchResults() {
  const resp = await fetch("./data/results.json");
  const data = await resp.json();
  return data;
}

async function fetchMembers() {
  const resp = await fetch("./data/members.json");
  const data = await resp.json();
  return data;
}

async function buildResultsList() {
  const originalResults = await fetchResults();

  for (const jsonObj of originalResults) {
    const resultObj = result.constructResult(jsonObj);
    resultList.push(resultObj);
  }
}

async function buildMembersList() {
  const originalMembers = await fetchMembers();

  for (const jsonObj of originalMembers) {
    const memberObj = member.constructMember(jsonObj);
    memberList.push(memberObj);
  }
}

function displayResults(results) {
  const table = document.querySelector("table#results tbody");
  table.innerHTML = "";
  for (const result of results) {
    const html = /*html*/ `
    <tbody>
      <td>${result.date.toLocaleString("da-DK", { month: "long" })}</td>
      <td>${result.memberId}</td>
      <td>${result.discipline}</td>
      <td>${result.resultType}</td>
      <td>${result.time}</td>
    </tbody>`;

    table.insertAdjacentHTML("beforeend", html);
  }
}

function displayMembers(members) {
  const table = document.querySelector("table#members tbody");
  table.innerHTML = "";
  for (const member of members) {
    const html = /*html*/ `
    <tr>
      <td>${member.name}</td>
      <td>${member.active}</td>
      <td>${member.birthday.toLocaleString("da-DK", { month: "long" })}</td>
      <td>${member.age}</td>
      <td>${member.ageGroup}</td>
    </tr>`;

    table.insertAdjacentHTML("beforeend", html);
  }
}

export { memberList, resultList };
