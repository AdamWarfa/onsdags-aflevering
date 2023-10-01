import { findMember } from "./script.js";

export function constructResult(resultData) {
  const resultObject = {
    id: resultData.id,
    competitionLocation: resultData.competitionLocation,
    competitionName: resultData.competitionName,
    competitionPlacement: resultData.competitionPlacement,
    date: new Date(resultData.date),
    discipline: resultData.discipline,
    memberId: resultData.memberId,
    resultType: resultData.resultType,
    time: resultData.time,
    member: findMember(resultData.memberId),
    memberName: "",

    isTraining() {
      if (this.resultType === "Training") {
        return true;
      } else {
        return false;
      }
    },

    convertToMs() {
      const oldTime = this.time;
      const newTime = oldTime.split(":");
      const minutes = Number(newTime[0]);
      const secAndMs = newTime[1].split(".");

      const seconds = Number(secAndMs[0]);
      const ms = Number(secAndMs[1]);
      const totalTime = minutes * 60000 + seconds * 1000 + ms;
      return totalTime;
    },
  };

  switch (resultObject.isTraining()) {
    case true:
      resultObject.resultType = "Træning";
      break;
    case false:
      resultObject.resultType = "Konkurrence";
      break;
  }

  switch (resultObject.discipline) {
    case "freestyle":
      resultObject.discipline = "Fri";
      break;
    case "backstroke":
      resultObject.discipline = "Ryg";
      break;
    case "breaststroke":
      resultObject.discipline = "Bryst";
      break;
    case "butterfly":
      resultObject.discipline = "Butterfly";
      break;
  }
  try {
    resultObject.memberName = resultObject.member.name;
  } catch (error) {}
  resultObject.convertedTime = resultObject.convertToMs();

  return resultObject;
}
