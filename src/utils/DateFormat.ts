import * as moment from 'moment-timezone';

export default function FormatDateNow() {
  return moment(Date.now()).tz('America/Cuiaba').locale('pt-BR').calendar();
}
