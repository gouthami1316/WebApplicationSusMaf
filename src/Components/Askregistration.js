import React from 'react'
import { useForm } from "react-hook-form";
import { Form, Button, Container } from "react-bootstrap";
import { useNavigate, Navigate } from 'react-router-dom';

function Askregistration() {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();
    const onFormSubmit = (userObj) => {
        console.log(userObj)

    }
    return (
        <>
            <div className="display-2 text-center text-info">Ask Registration</div>
            <div className='row'>
                <div className='col-12 col-sm-8 col-md-6 mx-auto'>
                    <Form className="w-50 mx-auto" onSubmit={handleSubmit(onFormSubmit)}>
                        <Form.Group className="mb-3">
                            <Form.Label>ASK_ID</Form.Label>


                            <Form.Control type="number" placeholder="Enter id" {...register("ASK_ID", { required: true })} />
                            {errors.id && <p className="text-danger">Id is required</p>}
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>ASK_CATEGORY</Form.Label>


                            <Form.Control type="text" placeholder="Enter category" {...register("ASK_CATEGORY", { required: true })} />
                            {errors.username && <p className="text-danger">ASK_CATEGORY is required</p>}
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>ASK_SUBJECT</Form.Label>
                            <Form.Control type="text" placeholder="Enter subject" {...register("ASK_SUBJECT", { required: true })} />
                            {errors.password && <p className="text-danger">ASK_SUBJECT is required</p>}
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>ASK_DESC</Form.Label>
                            <Form.Control type="text" placeholder="Enter desc" {...register("ASK_DESC", { required: true })} />
                            {errors.email && <p className="text-danger">ASK_DESC is required</p>}
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>ASK_CLOSEDATE</Form.Label>
                            <Form.Control type="text" placeholder="Enter Closedate" {...register("ASK_CLOSEDATE", { required: true })} />
                            {errors.city && <p className="text-danger">ASK_CLOSEDATE is required</p>}
                        </Form.Group>
                        
                        <Form.Group>
                            <Form.Label>ASK_ORG</Form.Label>
                            <Form.Control type="text" placeholder="Ask Organisation" {...register("ASK_ORG", { required: true })} />
                            {errors.city && <p className="text-danger">ASK_ORG is required</p>}
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Preference Domain</Form.Label>
                            <Form.Control type="text" placeholder="Ask Theme" {...register("ASK_THEME", { required: true })} />
                            {errors.city && <p className="text-danger">ASK_THEME is required</p>}
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Coins</Form.Label>
                            <Form.Control type="text" placeholder="Coins" {...register("COINS", { required: true })} />
                            {errors.city && <p className="text-danger">COINS is required</p>}
                        </Form.Group>
                       
                       
                        <Button variant="primary" type="submit">
                            Register
                        </Button>
                    </Form>
                </div>
            </div>
        </>
    )
}


export default Askregistration