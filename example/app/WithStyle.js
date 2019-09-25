import { HStack, Button } from 'declarative-react/src';

function BaseButton(content) {
  return Button(content).style(styles.baseButton);
}

export default function WithStyle() {
  return HStack(
    BaseButton('Primary').style(styles.buttonPrimary),
    BaseButton('Secondary').style(styles.buttonSuccess),
  )
    .margin({ top: 10 })
    .build();
}

const styles = {
  baseButton: {
    padding: '6px 11px',
    marginRight: 8,
    borderWidth: 0,
    borderRadius: 4,
  },
  buttonPrimary: {
    color: 'white',
    backgroundColor: '#698AAB',
  },
  buttonSuccess: {
    color: 'white',
    backgroundColor: '#82AE46',
  },
};
