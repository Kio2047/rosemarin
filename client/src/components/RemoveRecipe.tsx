import React, { useState, useEffect } from "react"
import { Button, Modal } from "react-daisyui"


function RemoveRecipe(props: { toggleVisible: any, visible: boolean }) {
  const { toggleVisible, visible } = props

  return (
    <div className="font-sans">
      <Modal open={visible}>
        <Modal.Header className="font-bold">
          Are you sure?
        </Modal.Header>

        <Modal.Body>
          You are removing a recipe. <br />
          If you created it yourself, it will be irreversible.
        </Modal.Body>

        <Modal.Actions>
          <Button onClick={() => toggleVisible('remove')}>Remove</Button>
          <Button onClick={() => toggleVisible('keep')}>Keep</Button>
        </Modal.Actions>
      </Modal>
    </div>
  )
}

export default RemoveRecipe