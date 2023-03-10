export const calculateAge = (date) => {
  var today = new Date();
  var birthDate = new Date(date);
  var ageNow = today.getFullYear() - birthDate.getFullYear();
  var m = today.getMonth() - birthDate.getMonth();
  if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
    ageNow--;
  }

  return ageNow;
};

export const isValidDate = (date) => {
  let age = calculateAge(date);

  return age > 17 && age < 100;
};

const diffMinutes = (dt2, dt1) => {
  var diff = (dt2.getTime() - dt1.getTime()) / 1000;
  diff /= 60;
  return Math.abs(Math.round(diff));
};

export const isActive = (date) => {
  console.log(date);
  let dateNow = new Date();
console.log('Diff minutes_:_' + diffMinutes(date, dateNow));
  return diffMinutes(date, dateNow) < 15;
};
