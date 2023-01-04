export default function Answer(props) {
  const styles = {
    background: props.selected ? 'rgb(180, 111, 245)' : 'transparent',
  }
  return (
    <p className="answer" style={styles} onClick={props.handleChoice}>
      {props.body}
    </p>
  )
}
