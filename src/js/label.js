import {
  ATTACHMENT, COMMENT, CHECKLIST, DATE,
} from './const';

export default function someLabels() {
  const labelArr = [ATTACHMENT, COMMENT, CHECKLIST, DATE];
  const randomCount = Math.floor(1 + Math.random() * labelArr.length);
  const arr = [];
  for (let i = 0; i < randomCount; i += 1) {
    arr.push(labelArr[i]);
  }
  return arr;
}
