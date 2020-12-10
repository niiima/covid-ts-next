function Pollution(props) {
    let currentCountry = props.selected;
    
    return (
        <footer className="footer-bs">
            <div className="row">
                <div className="col-md-3 footer-brand animated fadeInLeft hidden">{currentCountry}</div>
            </div>
        </footer>
    )
}

export default Pollution;