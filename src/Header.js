const Header = ({cardInfo}) => {
    return (
        <header className='header__card-container'>
            <section className='card-back'>
                <img 
                    className='header__card-back' 
                    src={require('./images/bg-card-back.png')} 
                    alt='card-back' 
                    width='447' 
                    height='245'
                />
                <section className='header__card-back-info'>
                    <p>
                        {cardInfo.cvc === '' ? ('FELICIA LEIRE') : (cardInfo.cvc)}                    
                    </p>
                </section>
            </section>
            <section className='card-front'>
               <img 
                    className="header__card-front"
                    src={require('./images/bg-card-front.png')}
                    alt="card-front"
                    width='447'
                    height='245'
                />
                <section className='header__card-front-info'>
                    <img src={require('./images/card-logo.svg').default} alt='logo'/>
                    <p className='card-number'>
                        {cardInfo.cardNumber === '' ? ('0000 0000 0000 0000') : (cardInfo.cardNumber)}                    
                    </p>
                    <div>
                        <p className='card-name'>
                            {cardInfo.fullName === '' ? ('JAKE APPLESEED') : ((cardInfo.fullName).toUpperCase())}                    
                        </p>
                        <p className='card-exp'>
                            {cardInfo.expMM === '' ? ('00') : cardInfo.expMM}/{cardInfo.expYY === '' ? ('00') : cardInfo.expYY}
                        </p>
                    </div>
                </section>
            </section>   
        </header>
    )
}

export default Header
