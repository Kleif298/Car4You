import React from 'react'
import Header from '../../components/header/Header'
import PaymentMethod from '../../components/payment-method/Payment-method'

export default function Payment() {
    return (
        <div className="page-content">
            <Header />
            <PaymentMethod />
        </div>
    )
}
