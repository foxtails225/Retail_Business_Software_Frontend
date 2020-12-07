import moment from "moment-timezone";


export function errorHandler(errors) {
  if (errors) {
    errors = Object.values(errors);
  } else {
    errors = ['There is a network connection error.'];
  }

  return errors = errors.join('<br/> ');
}

export function baseName(str) {
  var base = new String(str).substring(str.lastIndexOf('/') + 1);
  if (base.lastIndexOf(".") != -1)
    base = base.substring(0, base.lastIndexOf("."));
  return base;
}

export function baseSideName(str) {
  let base = str.toString().split('/').find(item => item.includes('l_artwork:'));
  base = base.split(':')[1].split(',')[0];
  return base;
}

export function toTimeZone(time) {
  var format = 'YYYY/MM/DD HH:mm:ss';
  var zone = "Australia/Melbourne";
  return moment.tz(time, "UTC").tz(zone).format(format).toLocaleString();
}