import React, { useState } from 'react'
import '../App'
import { Form } from './Form';

const Auth = () => {
  return (
    <div className="container mt-5">
      <Form  title={"Login"}  />
      <div className="col-2"></div>
      <Form  title={"Registration"}/>
    </div>
  )
}

export default Auth