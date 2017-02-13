import R from 'ramda';
const phrases = [
  'новая вакансия на moikrug.ru',
  'новое сообщение',
  'новый контакт',
  'запрос контактных данных',
  'подтверждение пароля',
  'погода на завтра...;',
  'формат диска через 10 сек',
  'подписка на сервис истекает через 10 дней',
  'приглашение в группу \'анонимные разработчики\'',
  'обновление лицензионной политики приложения'
];

export function getFakePhrase() {
  const id = parseInt(Math.random() * phrases.length, 10);
  return phrases[id];
}

export function getNextEventId(events) {
  if(!events || !events.length) return 1;

  return Math.max.apply(null, R.pluck('id', events)) + 1 || 1;
}

const getTime = event => new Date(event).getTime();
const sortedByDate = R.compose(R.reverse, R.sortBy(R.compose(getTime, R.prop('datetime'))));
export const takeLastFive = R.compose(R.take(5), sortedByDate);
