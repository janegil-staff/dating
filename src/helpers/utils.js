export const calculateAge = date => {
  var today = new Date();
  var birthDate = new Date(date);
  var ageNow = today.getFullYear() - birthDate.getFullYear();
  var m = today.getMonth() - birthDate.getMonth();
  if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
    ageNow--;
  }

  return ageNow;
};
