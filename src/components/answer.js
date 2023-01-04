export default function Answer(props) {
  const styles = {
    background: props.selected ? '#D6DBF5' : 'transparent',
    borderColor: props.selected ? 'transparent' : '#293264',
  }

  if (props.right || props.wrong) {
    styles.background = props.right
      ? ' rgb(102, 234, 216)'
      : '#F8BCBC'
    styles.borderColor = 'transparent'
    styles.opacity = props.right ? ' 1' : ' 0.5'
  }

  return (
    <p className="answer" style={styles} onClick={props.handleChoice}>
      {props.body}
    </p>
  )
}
