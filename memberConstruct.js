export function constructMember(memberdata) {
  const MemberObject = {
    name: memberdata.firstName + " " + memberdata.lastName,
    active: memberdata.isActiveMember,
    competitive: memberdata.isCompetitive,
    birthday: new Date(memberdata.dateOfBirth),
    email: memberdata.email,
    gender: memberdata.gender,
    image: memberdata.image,
    hasPayed: memberdata.hasPayed,
    id: memberdata.id,

    set age(newAge) {
      this._age = newAge;
    },
    get age() {
      return this._age;
    },
    getJuniorSeniorStatus() {
      if (this.age < 18) {
        return "Junior";
      }
      return "Senior";
    },
  };

  switch (MemberObject.active) {
    case true:
      MemberObject.active = "Ja";
      break;
    case false:
      MemberObject.active = "Nej";
      break;
  }

  MemberObject.age = calculateAge(MemberObject.birthday);
  MemberObject.ageGroup = MemberObject.getJuniorSeniorStatus();
  return MemberObject;
}

function calculateAge(birthday) {
  const today = new Date();
  const birthDate = new Date(birthday);
  let age = today.getFullYear() - birthDate.getFullYear();
  const m = today.getMonth() - birthDate.getMonth();
  if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
    age--;
  }
  return age;
}
