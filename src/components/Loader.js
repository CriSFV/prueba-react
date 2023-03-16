import '../styles/Loader.sass';
const Loader = () => {
    return(
        <div className="lds-ellipsis">
        <div className="lds-ellipsis-div" />
        <div className="lds-ellipsis-div" />
        <div className="lds-ellipsis-div" />
      </div>
    )
}
export default Loader