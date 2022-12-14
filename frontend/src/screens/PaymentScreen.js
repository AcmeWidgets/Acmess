import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Form, Button, Col } from 'react-bootstrap';
import FormContainer from '../components/FormContainer';
import CheckoutSteps from '../components/CheckoutSteps';
import { savePaymentMethod } from '../actions/cartActions';


const PaymentScreen = ({ history }) => {
    const cart = useSelector((state) => state.cart);
    const { shippingAddress } = cart;

    if (!shippingAddress) {
        history.push('/shipping');
    }

    const [paymentMethod, setPaymentMethod] = useState('');


    const dispatch = useDispatch();

    const submitHandler = (e) => {
        e.preventDefault();


        dispatch(savePaymentMethod(paymentMethod));

        paymentMethod === 'wallet' 
        ? history.push('/placeorder-wallet')
        : history.push('/placeorder');

    };

    return (
        <FormContainer>
            <CheckoutSteps step1 step2 step3 />
            <h1>Payment Method</h1>
            <Form onSubmit={submitHandler}>
                <Form.Group className='mb-3'>
                    <Form.Label as='legend'>Select Method</Form.Label>
                    <Col>
                        <Form.Check
                            type='radio'
                            label='Wallet'
                            id='wallet'
                            name='paymentMethod'
                            value='wallet'

                            
                            onChange={(e) => setPaymentMethod('wallet')}

                        ></Form.Check>
                    </Col>
                    <Col>
                        <Form.Check
                            type='radio'
                            label='PayPal or Credit Card'
                            id='paypal'
                            name='paymentMethod'

                            value='paypal'
                            
                            onChange={(e) => setPaymentMethod('paypal')}

                        ></Form.Check>
                    </Col>
                </Form.Group>
                <Button type='submit' variant='success'>
                    CONTINUE
                </Button>
            </Form>
        </FormContainer>
    );
};

export default PaymentScreen;
