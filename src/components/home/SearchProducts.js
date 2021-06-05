import React from 'react'
import './home.css'
import { useHistory } from 'react-router-dom'

export default function SearchProducts({ item, offModal }) {
    const history=useHistory()
    let x = item.price
    var price = x.replace(/\B(?=(\d{3})+(?!\d))/g, ".")
    const off = () => {
        offModal()
        history.push('/details/'+item._id)
    }
    return (
        <div className="s-product" onClick={off}>
            <div><img src={item.image} style={{ maxHeight: 5 + 'em', maxWidth: 5 + 'em' }} /></div>
            <div>
                <span>{item.name}</span><br />
                <span style={{ color: "red" }}>{price}</span>
            </div>
        </div>
    )
}
