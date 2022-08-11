import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useEffect, useState } from 'react';
import { Checkbox } from 'react-daisyui';
import { useAppSelector } from '../redux/hooks';


function ItemCheckbox(props: { addHandlerShoppingList: any, handleClickRemove: any, data: { name: string, quantity: string, unit: string } }) {

  const [checked, setChecked] = useState<boolean>(false)

  const items = useAppSelector(state => state.items)
  const { data, addHandlerShoppingList, handleClickRemove } = props;

  useEffect(() => {
    const result = items.find(item => {
      return item.name == data.name && item.quantity == data.quantity && item.unit == data.unit
    })
    if (!result) {
      setChecked(false)
    } else {
      setChecked(true);
    }
  }, [items])

  return (
    <Checkbox checked={checked} className="px-2" onClick={() => {
      checked ? handleClickRemove(data) : addHandlerShoppingList(data)
    }} />
  )

}

export default ItemCheckbox