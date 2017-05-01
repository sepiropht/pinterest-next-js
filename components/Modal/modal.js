import React from "react";
import ReactDOM from "react-dom";
import Modal from "react-modal";
import { Field, reduxForm } from "redux-form";
import { connect } from "react-redux";
import { addRemoteImage } from "../../actions/Images";

const mapStateToProps = state => ({
  user: state.User
});
const customStyles = {
  content: {
    top: "8%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)"
  }
};
class modal extends React.Component {
  constructor(props) {
    super(props);
    console.log(this.props);
    this.state = {
      modalIsOpen: false,
      description: "",
      url: "",
      user: this.props.user
    };

    this.openModal = this.openModal.bind(this);
    this.afterOpenModal = this.afterOpenModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleSubmit(event) {
    event.preventDefault();
    const imageInfo = {
      url: this.state.url,
      title: this.state.description,
      userId: this.state.user.user_id
    };
    this.props.dispatch(addRemoteImage(imageInfo));
  }
  openModal() {
    this.setState({ modalIsOpen: true });
    console.log(this.state);
  }
  componentDidMount() {
    Modal.setAppElement(".App");
  }
  handleInputChange(event) {
    const target = event.target;
    switch (target.id) {
      case "url":
        this.setState({
          url: event.target.value
        });
        break;
      case "description":
        this.setState({
          description: event.target.value
        });
        break;
    }
  }
  afterOpenModal() {
    // references are now sync'd and can be accessed.
    this.refs.subtitle.style.color = "#f00";
  }

  closeModal(values) {
    this.setState({ modalIsOpen: false });
  }
  render() {
    return (
      <div>
        <button onClick={this.openModal}>Add Image</button>
        <Modal
          isOpen={this.state.modalIsOpen}
          onAfterOpen={this.afterOpenModal}
          onRequestClose={this.closeModal}
          style={customStyles}
          contentLabel="Example Modal"
        >

          <h2 ref="subtitle">Hello</h2>
          <button onClick={this.closeModal}>close</button>
          <div>I am a modal</div>

          <form onSubmit={this.handleSubmit}>
            <ul>
              <li>
                <label htmlFor="url">Url</label>
                <input
                  id="url"
                  name="url"
                  value={this.state.url}
                  onChange={e => this.handleInputChange(e)}
                  type="text"
                />
              </li>
              <li>
                <label htmlFor="description">description</label>
                <input
                  id="description"
                  name="description"
                  value={this.state.description}
                  onChange={e => this.handleInputChange(e)}
                  type="text"
                  maxLength="10"
                />
              </li>
              <input type="submit" value="Submit" />
            </ul>
          </form>
        </Modal>
      </div>
    );
  }
}
const moda = connect(mapStateToProps)(modal);
export default moda;
