import React from "react";

const withDataFetching = props => WrappedComponent => {
  class WihDataFetching extends React.Component {
    constructor() {
      super();
      this.state = {
        data: [],
        loading: false,
        error: ""
      };
    }

    async componentDidMount() {
      try {
        const data = await fetch(props.dataSource);
        const dataJSON = await data.json();

        if (data.json) {
          this.setState({
            data: dataJSON,
            loading: false
          });
        }
      } catch (error) {
        this.setState({
          loading: false,
          error: error.message
        });
      }
    }

    render() {
      const { data, loading, error } = this.state;

      return (
        <WrappedComponent
          data={data}
          loading={loading}
          error={error}
          {...this.props}
        ></WrappedComponent>
      );
    }
  }

  WihDataFetching.displayName = `withFetching(${WrappedComponent.nane})`;

  return WihDataFetching;
};

export default withDataFetching;
