import {Component} from 'react'
import Loader from 'react-loader-spinner'
import Navbar from '../Navbar'
import FoodMenuTabs from '../FoodMenuTabs'
import FoodItemCard from '../FoodItemCard'

class index extends Component {
  state = {
    cartOrdersCount: 0,
    foodMenuList: [],
    renderFoodItems: [],
    pageStatus: 'initial',
    activeTab: 0,
  }
  getFoodMenuList = async () => {
    try {
      const urlPath =
        'https://run.mocky.io/v3/77a7e71b-804a-4fbd-822c-3e365d3482cc'
      const response = await fetch(urlPath)
      const data = await response.json()
      this.setState({
        foodMenuList: data[0].table_menu_list,
        renderFoodItems: data[0].table_menu_list[0].category_dishes,
        pageStatus: 'success',
      })
    } catch (e) {
      console.log(e)
    }
  }
  getSubMenuFood = index => {
    const {foodMenuList} = this.state
    this.setState({
      activeTab: index,
      renderFoodItems: foodMenuList[index].category_dishes,
    })
  }
  addCartItem = () => {
    this.setState(prevState => {
      return {
        ...prevState,
        cartOrdersCount: prevState.cartOrdersCount + 1,
      }
    })
  }
  removeCartItem = () => {
    this.setState(prevState => {
      return {
        ...prevState,
        cartOrdersCount: prevState.cartOrdersCount - 1,
      }
    })
  }
  displayFoodItems = () => {
    const {renderFoodItems} = this.state
    const renderData = renderFoodItems.map(item => {
      return (
        <FoodItemCard
          itemData={item}
          addCartItem={this.addCartItem}
          removeCartItem={this.removeCartItem}
          key={item.dish_id}
        />
      )
    })
    return renderData
  }

  renderLoadingView = () => (
    <div
      className="loader-container"
      data-testid="loader"
      style={{
        display: 'flex',
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100%',
      }}
    >
      <Loader type="ThreeDots" color="black" height="50" width="50" />
    </div>
  )

  componentDidMount() {
    this.getFoodMenuList()
  }
  renderSuccess() {
    const {cartOrdersCount, foodMenuList, activeTab} = this.state
    return (
      <div className="restaurant-page-container">
        <Navbar cartOrdersCount={cartOrdersCount} />
        <FoodMenuTabs
          tabs={foodMenuList}
          changeSubMenuFood={this.getSubMenuFood}
          activeTab={activeTab}
        />
        {this.displayFoodItems()}
      </div>
    )
  }

  render() {
    const {pageStatus} = this.state
    return (
      <>
        {pageStatus === 'initial'
          ? this.renderLoadingView()
          : this.renderSuccess()}
      </>
    )
  }
}
export default index
