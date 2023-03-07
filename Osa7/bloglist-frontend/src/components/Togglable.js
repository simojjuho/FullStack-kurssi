import { useState } from 'react'
import Button from 'react-bootstrap/Button'
import Stack from 'react-bootstrap/Stack'
import Collapse from 'react-bootstrap/Collapse'

const Togglable = (props) => {
  const [visible, setVisible] = useState(true)

  const buttonText = () => {
    if (!visible) return 'Add new'
    else return 'Cancel'
  }

  return (
    <>
      <Button
        onClick={() => setVisible(!visible)}
        aria-controls="collapse-element"
        aria-expanded={visible}
      >
        {buttonText()}
      </Button>
      <Collapse in={visible}>
        <div id="collapse-element">
          <Stack direction="horizontal" gap="5">
            {props.heading}
          </Stack>
          {props.children}
        </div>
      </Collapse>
    </>
  )
}

export default Togglable
