import {Component} from 'react'

import Loader from 'react-loader-spinner'

import './App.css'

// Replace your code here
class App extends Component {
  state = {isLoading: true, travelGuideData: ''}

  componentDidMount() {
    this.getTravelGuide()
  }

  getTravelGuide = async () => {
    const apiUrl = 'https://apis.ccbp.in/tg/packages'

    const response = await fetch(apiUrl)

    const data = await response.json()

    const updatedData = data.packages.map(eachPackage => ({
      id: eachPackage.id,
      name: eachPackage.name,
      imageUrl: eachPackage.image_url,
      description: eachPackage.description,
    }))

    this.setState({isLoading: false, travelGuideData: updatedData})
  }

  renderLoadingView = () => (
    <div data-testid="loader">
      <Loader type="TailSpin" color="#00BFFF" height={50} width={50} />
    </div>
  )

  renderTravelGuideView = () => {
    const {travelGuideData} = this.state

    return (
      <ul className="travel-guide-items-container">
        {travelGuideData.map(eachItem => (
          <li key={eachItem.id} className="travel-guide-item">
            <img
              src={eachItem.imageUrl}
              alt={eachItem.name}
              className="travel-guide-item-image"
            />
            <div className="travel-guide-item-content">
              <h1 className="travel-guide-item-heading"> {eachItem.name} </h1>
              <p className="travel-guide-item-description">
                {eachItem.description}
              </p>
            </div>
          </li>
        ))}
      </ul>
    )
  }

  render() {
    const {isLoading} = this.state

    return (
      <div className="travel-guide">
        <h1 className="travel-guide-heading"> Travel Guide </h1>
        <div className="travel-guide-view">
          {isLoading ? this.renderLoadingView() : this.renderTravelGuideView()}
        </div>
      </div>
    )
  }
}

export default App
