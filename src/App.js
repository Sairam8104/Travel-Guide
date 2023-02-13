import {Component} from 'react'
import Loader from 'react-loader-spinner'
import './App.css'

class App extends Component {
  state = {isLoading: true, travelData: []}

  componentDidMount() {
    this.renderApi()
  }

  renderApi = async () => {
    const response = await fetch('https://apis.ccbp.in/tg/packages')

    const data = await response.json()

    const formattedData = data.packages.map(eachItem => ({
      id: eachItem.id,
      name: eachItem.name,
      imageUrl: eachItem.image_url,
      description: eachItem.description,
    }))
    this.setState({travelData: formattedData, isLoading: false})
  }

  render() {
    const {isLoading, travelData} = this.state
    return (
      <div className="app-container">
        <div className="container">
          <h1 className="heading">Travel Guide</h1>
          <hr className="line" />
          <div>
            {isLoading ? (
              <div data-testid="loader">
                <Loader
                  type="TailSpin"
                  color="#00BFFF"
                  height={50}
                  width={50}
                />
              </div>
            ) : (
              <div>
                <ul className="list-container">
                  {travelData.map(each => (
                    <li key={each.id} className="package-item">
                      <img
                        src={each.imageUrl}
                        alt={each.name}
                        className="logo"
                      />
                      <div className="name-des-container">
                        <h1 className="name">{each.name}</h1>
                        <p className="des">{each.description}</p>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>
    )
  }
}

export default App
