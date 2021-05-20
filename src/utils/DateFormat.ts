import * as moment from 'moment-timezone';

export default function FormatDateNow() {
  return moment(Date.now()).tz('America/Sao_Paulo').locale('pt-BR').calendar();
}
