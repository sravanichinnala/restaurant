import {Component} from 'react'
import './index.css'
class index extends Component {
  state = {
    itemCount: 0,
  }
  addItem = () => {
    const {addCartItem} = this.props
    this.setState(
      prevState => {
        return {
          ...prevState,
          itemCount: prevState.itemCount + 1,
        }
      },
      () => {
        addCartItem()
      },
    )
  }
  removeItem = () => {
    const {removeCartItem} = this.props
    const {itemCount} = this.state
    if (itemCount !== 0) {
      this.setState(
        prevState => {
          return {
            ...prevState,
            itemCount: prevState.itemCount - 1,
          }
        },
        () => {
          removeCartItem()
        },
      )
    }
  }
  render() {
    const {
      dish_name: dishName,
      dish_price: dishPrice,
      dish_description: dishDescription,
      addonCat,
      dish_calories: dishCalories,
      dish_image: dishImage,
      dish_currency: dishCurrency,
      dish_Availability: dishAvailability,
    } = this.props.itemData
    const {itemCount} = this.state
    return (
      <div className="food-item-card">
        <div className="food-item-details">
          <h1>{dishName}</h1>
          <p>
            {dishCurrency} {dishPrice}
          </p>
          <p>{dishDescription}</p>
          {dishAvailability ? (
            <div className="item-count-container">
              <button type="button" onClick={this.removeItem}>
                -
              </button>
              <p>{itemCount}</p>
              <button type="button" onClick={this.addItem}>
                +
              </button>
            </div>
          ) : (
            <p style={{color: 'red'}}>Not available</p>
          )}
          {addonCat.length > 0 ? <p>Customizations Available</p> : <></>}
        </div>
        <div style={{display: 'flex', alignItems: 'center'}}>
          <div className="food-item-calories-container">
            <p>{dishCalories} calories</p>
          </div>
          <div className="food-item-image-container">
            <img src={dishImage} alt={dishName} />
          </div>
        </div>
      </div>
    )
  }
}

export default index
