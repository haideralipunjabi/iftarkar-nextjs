import React from "react"

class ErrorBoundary extends React.Component {
    constructor(props) {
      super(props)
  
      // Define a state variable to track whether is an error or not
      this.state = { hasError: false }
    }
    static getDerivedStateFromError(error) {
      // Update state so the next render will show the fallback UI
  
      return { hasError: true }
    }
    componentDidCatch(error, errorInfo) {
      // You can use your own error logging service here
      console.log({ error, errorInfo })
    }
    render() {
      // Check if the error is thrown
      if (this.state.hasError) {
        // You can render any custom fallback UI
        return (
          <div className="is-flex is-flex-direction-column is-justify-content-center container has-text-centered">
            <h2 className="is-size-1">Oops, there is an error!</h2>
            <p className="is-size-5 mb-3">Try "Refresh". If that doesn't work, Reset your Settings.</p>
            <div>
            <button
              className="button is-primary mx-3"
              onClick={()=>{
                window.location.reload();
              }}
            >
              Refresh
            </button>
            <button
              className="button is-primary mx-3"
              onClick={() => {
                this.setState({ hasError: false });
                localStorage.clear();
                window.location.reload();
              }}
            >
              Reset Settings
            </button>
            
            </div>
          </div>
        )
      }
  
      // Return children components in case of no error
  
      return this.props.children
    }
  }
  
  export default ErrorBoundary