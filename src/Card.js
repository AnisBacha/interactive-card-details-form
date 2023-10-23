import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom";
const Card = ({cardInfo, setCardInfo}) => {
    const [shouldSubmit, setShouldSubmit] = useState(false);
    const [isEmpty, setIsEmpty] = useState({
        fullName: null,
        cardNumber: null,
        exp: null,
        cvc: null
    });
    const [isWrongFormat, setIsWrongFormat] = useState({
        cardNumber: null,
        expMM: null,
        expYY: null,
        cvc: null
    })
    const handleEmptyInput = () => {
        let emptyFields = {
            fullName: cardInfo.fullName === '',
            cardNumber: cardInfo.cardNumber === '',
            exp: cardInfo.expMM === '' || cardInfo.expYY === '',
            cvc: cardInfo.cvc === ''
        };
        setIsEmpty(emptyFields);
    }
    const handleWrongFormat = () => {
        const today = new Date();
        const cardNumberFormat = /^\d{4} ?\d{4} ?\d{4} ?\d{4}$/;
        const expMMFormat = /^(0[1-9]|1[0-2])$/;
        const expYYFormat = /^\d{2}$/;
        const cvcFormat = /^\d{3}$/;

        let wrongFormat = {
            cardNumber: !cardNumberFormat.test(cardInfo.cardNumber),
            expMM: !expMMFormat.test(cardInfo.expMM),
            expYY: !(expYYFormat.test(cardInfo.expYY) && cardInfo.expYY >= today.getFullYear() % 100),
            cvc: !cvcFormat.test(cardInfo.cvc)
        } 
        setIsWrongFormat(wrongFormat);
    }
    const navigate = useNavigate();
    const handleSubmit = (e) => {
        e.preventDefault();
        handleEmptyInput();
        handleWrongFormat();
        setShouldSubmit(true);
    }
    useEffect(() => {
        const errorObject = { ...isEmpty, ...isWrongFormat };
        const isThereIsAnyErrors = Object.values(errorObject).some(Boolean);
        if(isThereIsAnyErrors === false && shouldSubmit){
            navigate('/success')
        } 
    }, [isEmpty, isWrongFormat, shouldSubmit])
    return (
        <form className='form' onSubmit={handleSubmit}>
            <section className='main__name'>
                <label htmlFor='name'>CARDHOLDER NAME</label>
                <input 
                    type='text'
                    id='name'
                    placeholder='e.g. Jane Appleseed'
                    value={cardInfo.fullName}
                    onChange={(e) => setCardInfo({...cardInfo, fullName: e.target.value})}                
                />
                {isEmpty.fullName === true && <p className="empty">Can't be blank</p>}
            </section>
            
            <section className='main__number'>
                <label htmlFor='card-number'>CARD NUMBER</label>
                <input 
                    type='text'
                    id='card-number'
                    placeholder='e.g. 1234 5678 9123 0000'
                    value={cardInfo.cardNumber}
                    onChange={(e) => setCardInfo({...cardInfo, cardNumber: e.target.value})}
                />
                {isEmpty.cardNumber === true && <p className="empty">Can't be blank</p>}
                {isWrongFormat.cardNumber === true && isEmpty.cardNumber === false && <p className="wrong-format">Wrong format, numbers only</p>}
            </section>

            <section className='main__exp-cvc'>
                <div className="exp">
                    <label htmlFor='exp'>EXP. DATE (MM/YY)</label>
                    <div className="main__exp">
                        <input 
                            type='text'
                            id='exp'
                            placeholder='MM'
                            value={cardInfo.expMM}
                            onChange={(e) => setCardInfo({...cardInfo, expMM: e.target.value})}
                        />
                        <input 
                            type='text'
                            id='expYY'
                            placeholder='YY'
                            value={cardInfo.expYY}
                            onChange={(e) => setCardInfo({...cardInfo, expYY: e.target.value})}
                        />
                    </div>
                    {isEmpty.exp === true && <p className="empty">Can't be blank</p>}
                    {(isWrongFormat.expMM === true || isWrongFormat.expYY === true) && isEmpty.exp === false &&
                         <p className="wrong-format">Wrong format, invalid date</p>
                    }
                </div>
                <div className="cvc">
                    <label htmlFor='cvc'>CVC</label>
                    <input 
                        type='text'
                        id='cvc'
                        placeholder='e.g. 123'
                        value={cardInfo.cvc}
                        onChange={(e) => setCardInfo({...cardInfo, cvc: e.target.value})}
                    />
                    {isEmpty.cvc === true && <p className="empty">Can't be blank</p>}
                    {isWrongFormat.cvc === true && isEmpty.cvc === false && <p className="wrong-format">Wrong format</p>}

                </div>
                
            </section>
            <button>Confirm</button>          
        </form>
    )
}

export default Card
