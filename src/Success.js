const Success = () => {
    return (
        <section className="success">
            <img src={require('./images/icon-complete.svg').default} alt='complete'/>
            <h2>THANK YOU!</h2>
            <p>We've added your card details</p>
            <button>Continue</button>
        </section>
    )
}

export default Success
