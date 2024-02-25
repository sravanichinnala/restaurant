import './index.css'
const index = ({tabs, changeSubMenuFood}) => {
  return (
    <div className="food-tabs-section">
      <ul className="food-tabs-list">
        {tabs.map((tab, index) => (
          <li>
            <button
              type="button"
              key={index}
              onClick={() => changeSubMenuFood(index)}
            >
              {tab.menu_category}
            </button>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default index
