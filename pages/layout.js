import React from "react";
import { Logo, Button, Card, Footer, CheckBox, Filter, Donate, Form, Notification, Profile, Login, ForgotPassword, Header, SignUp, Upload, Product } from "../Components";

const layout = () => {
    return (
        <div className="home">
            <Header />
            <Product />
            <Upload />
            <Logo />
            <Button />
            <Notification />
            <Filter />
            <Card />
            <Donate />
            <Form />
            <Login />
            <ForgotPassword />
            <SignUp />
            <Profile />
            <CheckBox />
            <Footer />
        </div>
    )
}

export default layout;