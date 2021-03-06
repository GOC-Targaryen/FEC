import React, {useState, useEffect, useRef} from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import axios from 'axios';
import {Axios} from "../../AxiosConfig.js"
import SelectSizeModal from './SelectSizeModal.jsx'
import {Select} from '../../styles/Forms.jsx';
import Button from '../../styles/Buttons.jsx';
import {FiShoppingCart} from 'react-icons/fi';
import {Title, Wrapper, Header2, Header3, Header4, Text} from '../../styles/Headers.jsx'
import {CartContainer, RowContainer, ColumnContainer, AlignmentWrapper} from '../../styles/Boxes.jsx';
import {ShoppingCart} from '../../styles/Icons.jsx'
import {FaTwitter, FaFacebookSquare, FaPinterest} from 'react-icons/fa'


const StyleQuantityCartContainer = styled(ColumnContainer)`
justify-content: space-between;
max-height: 240px;
border-left: none;
border-right: none;
border-top: none;
`
const StyleQuantityContainer = styled(RowContainer)`
justify-content: space-between;
`
const SizeSelect = styled(Select)`
  height: 50px;
  width: 60%;
  background: #FAFAFA;
  border: 2px solid #AFA9A9;
  box-sizing: border-box;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  font-size: 16px;
  margin: 0 10px 0 0 ;
  border-radius: 12px;
  ${props => !props.disabled&&`
    &:hover {
      transition: all .3s linear;
      transform: scale(1.1);
    };
  `}
`
const QuantitySelect = styled(SizeSelect)`
  width: 40%;
`
const AddtoCartButton = styled(FiShoppingCart)`
  height: 50px;
  width: 40%;
  background: #e4e4e4;
  color:  #3e3e3e;
  border-radius: 3px;
  font-size:20px;
  cursor: ${props => props.disabled ? 'default' : 'pointer'};

  ${props => !props.disabled&&`
    &:hover {
    transition-duration: .3s;
    transform: scale(1.1);
    background: #3e3e3e;
    color: #e4e4e4;
  };
  `}
  border-radius: 12px;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
`;

const SocialButonRow = styled(RowContainer)`
  justify-content:flex-start;
  column-gap: 20px;
`
const TwitterButton = styled(FaTwitter)`
  width: 20%;
  height: 40px;
  background: #e4e4e4;
  color:  #3e3e3e;
  border-radius: 12px;
  &:hover {
    transition-duration: .3s;
    transform: scale(1.1);
    background: #3e3e3e;
    color: #e4e4e4;
  };
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
`
const FacebookButton = styled(FaFacebookSquare)`
  width: 20%;
  height: 40px;
  background: #e4e4e4;
  color:  #3e3e3e;
  border-radius: 12px;
  &:hover {
    transition-duration: .3s;
    transform: scale(1.1);
    background: #3e3e3e;
    color: #e4e4e4;
  };
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
`
const PinterestButton = styled(FaPinterest)`
  width: 20%;
  height: 40px;
  background: #e4e4e4;
  color:  #3e3e3e;
  border-radius: 12px;
  &:hover {
    transition-duration: .3s;
    transform: scale(1.1);
    background: #3e3e3e;
    color: #e4e4e4;
  };
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
`
const AddToCart = (props) => {
  var skus_ids = Object.keys(props.selectedStyle.skus)
  var {skus} = props.selectedStyle
  const [currentSku, setSku] = useState('Select Size')
  const [quantity, setQuantity] = useState('Select Quantity')

  const [stock , setStock] = useState(false)
  const [openSizeModal, setOpenSizeModal] = useState(false)
  // const [selectSizePosition, setSelectSizePosition] = useState(null)
  const cartButtonRef = useRef()
  const selectSizeRef = useRef()
  const selectQuantityRef = useRef()
  let thereIsStock = skus_ids.some(sku => {
    return skus[sku].quantity > 0
  })

  useEffect(() => {

    setStock(thereIsStock ? thereIsStock : thereIsStock)
    // setSelectSizePosition(selectSizeRef.current.getBoundingClientRect())
  })

  const settingSku = (sku, quantity) => {
    setSku(sku)
    setQuantity(quantity === 'Select Quantity' ? 1 : quantity)
  }

  // const handleOpenModal = (e) => {
  //   setOpenSizeModal(false)
  //   // document.removeEventListener('click', handleOpenModal)
  // }

  const postCart = () => {
    setOpenSizeModal(currentSku !== 'Select Size' ? false : true)
    if (!openSizeModal) {
      Axios.post("/cart", {sku_id: currentSku})
      .then(result => {
      })
      .catch(err => {
        console.log(err)
      })
    }
  }
  const test = () => {
    document.getElementById("selectSize")
    // document.getElementById("selectSize").dispatchEvent(new MouseEvent('mousedown'));
  }
  const runThis = () => {
    var dropdown = document.getElementById('selectSize');
    showDropdown(dropdown);
  };
  const showDropdown = (element) => {
    var event;
    event = document.createEvent('MouseEvents');



    event.initMouseEvent('mousedown', true, true, window);
    element.dispatchEvent(event);
  };


  return (
    <StyleQuantityCartContainer border = {false}>
      <AlignmentWrapper>
        <StyleQuantityContainer>
            <SizeSelect value = {currentSku}
              id = "selectSize"
              ref = {selectSizeRef}
              disabled = {!stock}
              onChange = {(e) => {settingSku(e.target.value)}}>
              {stock ? <option>Select Size</option> : <option>Currently out of stock</option>}
              {stock ? skus_ids.map(sku => {
                if (skus[sku].quantity > 0) {
                  return <option
                  key = {sku}
                  value = {sku}
                  > Size - {skus[sku].size}</option>
                }
              }) : null}
            </SizeSelect>

            <QuantitySelect
              ref = {selectQuantityRef}
              disabled = {!stock}
              onChange = {(e) => {setQuantity(e.target.value)}}
              value = {quantity}>
              {!(skus[currentSku]) ? <option>Select Quantity</option> : [...Array(skus[currentSku].quantity).keys()].map(x => {
                if (x !== 0 && x <= 15) {
                  return <option key = {x}>{x}</option>
                }})}
            </ QuantitySelect>

        </StyleQuantityContainer>
      </AlignmentWrapper>

      <AlignmentWrapper>
        <RowContainer>
          <AddtoCartButton
            ref = {cartButtonRef}
            onClick = {() => (postCart())}
            disabled = {!stock}
            aria-label = "add to cart button"
            >{stock ? <ShoppingCart></ShoppingCart> :" Out of Stock"}
          </AddtoCartButton>
        </RowContainer>


        {openSizeModal ? <SelectSizeModal
          cartButtonRef = {cartButtonRef}
          selectSizeRef = {selectSizeRef}
          setOpenSizeModal = {setOpenSizeModal.bind(this)}
          skus = {skus}
          settingSku = {settingSku.bind(this)}
          openSizeModal = {openSizeModal}/> : null}

      </AlignmentWrapper>

      <AlignmentWrapper>
        <SocialButonRow>
            <TwitterButton>Facebook</TwitterButton>
            <FacebookButton>Pinterest</FacebookButton>
            <PinterestButton>Twitter</PinterestButton>
        </SocialButonRow>

      </AlignmentWrapper>
    </StyleQuantityCartContainer>
  );
};

AddToCart.propTypes = {
  selectedStyle: PropTypes.object,
}

export default AddToCart;