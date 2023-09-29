import { initTabs } from "./tabs.js";
import * as result from "./resultConstruct.js";
import * as member from "./memberConstruct.js";
import * as renderer from "./list-renderer.js";
import { memberRenderer } from "./memberRenderer.js";
import { resultRenderer } from "./resultRenderer.js";

window.addEventListener("load", initApp);

let resultList = [];
let memberList = [];

async function initApp() {
  // document.querySelector("#members-age").addEventListener("click", sortMembersByAge);
  initTabs();

  await buildMembersList();
  await buildResultsList();

  console.log(memberList);
  console.log(resultList);

  resultList.sort((a, b) => a.convertedTime - b.convertedTime);

  const memberRendered = renderer.construct(memberList, "table#members tbody", memberRenderer);
  memberRendered.render();

  const resultRendered = renderer.construct(resultList, "table#results tbody", resultRenderer);
  resultRendered.render();

  const memberSortValues = ["name", "active", "birthday", "age", "ageGroup"];

  for (const value of memberSortValues) {
    let sortType = "";
    if (value == "birthday" || value == "age") {
      sortType = "number";
    } else {
      sortType = "string";
    }
    document.querySelector(`#members-${value}`).addEventListener("click", () => {
      memberRendered.sort(value, sortType);
    });
  }
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

function findMember(id) {
  const member = memberList.find((member) => member.id == id);
  return member;
}

export { memberList, resultList, findMember };
